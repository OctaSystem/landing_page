import type {ContentManifest, JsonObject, JsonValue} from './types';

const MANIFEST_URL = '/content/content-manifest.json';
const CACHE_KEY_PREFIX = 'remote-content:';

let manifestPromise: Promise<ContentManifest> | null = null;
let commonContentPromise: Promise<JsonObject | null> | null = null;
const inMemoryContent = new Map<string, JsonObject>();

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url, {cache: 'no-store'});

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    return (await response.json()) as T;
}


export async function getContentManifest(): Promise<ContentManifest> {
    if (!manifestPromise) {
        manifestPromise = fetchJson<ContentManifest>(MANIFEST_URL);
    }

    return manifestPromise;
}

function normalizeLocale(locale: string, manifest: ContentManifest): string {
    if (manifest.files[locale]) {
        return locale;
    }

    const localeBase = locale.split('-')[0];
    const match = Object.keys(manifest.files).find((item) => item.startsWith(localeBase));

    return match ?? manifest.defaultLocale;
}

function isJsonObject(value: JsonValue | undefined): value is JsonObject {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergeJsonValues(base: JsonValue | undefined, override: JsonValue): JsonValue {
    if (Array.isArray(base) && Array.isArray(override)) {
        // Keep locale array shape, but merge each item with common content by index.
        return override.map((item, index) => mergeJsonValues(base[index], item));
    }

    if (isJsonObject(base) && isJsonObject(override)) {
        return mergeJsonObjects(base, override);
    }

    return override;
}

function mergeJsonObjects(base: JsonObject, override: JsonObject): JsonObject {
    const result: JsonObject = {...base};

    for (const [key, value] of Object.entries(override)) {
        result[key] = mergeJsonValues(result[key] as JsonValue | undefined, value as JsonValue);
    }

    return result;
}

async function getCommonContent(manifest: ContentManifest): Promise<JsonObject | null> {
    if (!manifest.commonFile) {
        return null;
    }

    if (!commonContentPromise) {
        const commonUrl = `${manifest.commonFile}?v=${encodeURIComponent(manifest.version)}`;
        commonContentPromise = fetchJson<JsonObject>(commonUrl);
    }

    return commonContentPromise;
}

function getFromLocalStorage(locale: string, version: string): JsonObject | null {
    if (process.env.DEV_MODE) return null;

    const raw = localStorage.getItem(`${CACHE_KEY_PREFIX}${locale}`);

    if (!raw) {
        return null;
    }

    try {
        const parsed = JSON.parse(raw) as { version: string; data: JsonObject };

        if (parsed.version !== version) {
            return null;
        }

        return parsed.data;
    } catch {
        return null;
    }
}

function saveToLocalStorage(locale: string, version: string, data: JsonObject): void {
    if (process.env.DEV_MODE)
        localStorage.setItem(
            `${CACHE_KEY_PREFIX}${locale}`,
            JSON.stringify({
                version,
                data,
            }),
        );
}

export async function getRemoteContent(locale: string): Promise<JsonObject> {
    const manifest = await getContentManifest();
    const resolvedLocale = normalizeLocale(locale, manifest);

    if (inMemoryContent.has(resolvedLocale)) {
        return inMemoryContent.get(resolvedLocale)!;
    }


    const cached = getFromLocalStorage(resolvedLocale, manifest.version);

    if (cached) {
        inMemoryContent.set(resolvedLocale, cached);
        return cached;
    }

    const fileUrl = manifest.files[resolvedLocale];
    const localizedContent = await fetchJson<JsonObject>(`${fileUrl}?v=${encodeURIComponent(manifest.version)}`);
    const commonContent = await getCommonContent(manifest);
    const content = commonContent
        ? mergeJsonObjects(commonContent, localizedContent)
        : localizedContent;

    inMemoryContent.set(resolvedLocale, content);
    saveToLocalStorage(resolvedLocale, manifest.version, content);

    return content;
}

export function getContentByPath<T extends JsonValue>(
    content: JsonObject,
    path: string,
): T | undefined {
    if (!path) {
        return undefined;
    }

    const chunks = path.split('.').filter(Boolean);
    let current: JsonValue = content;

    for (const chunk of chunks) {
        if (typeof current !== 'object' || current === null || Array.isArray(current)) {
            return undefined;
        }

        current = (current as JsonObject)[chunk] as JsonValue;
    }

    return current as T | undefined;
}

