import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import type {JsonObject, JsonValue} from './types';
import {getContentByPath, getRemoteContent} from "./contentClient.ts";

type RemoteContentState<T extends JsonValue> = {
    data: T;
    isLoading: boolean;
    error: Error | null;
};

async function load<T extends JsonValue>(
    language: string,
    path: string,
    fallbackData: T,
    stateUpdate: (state: RemoteContentState<T>) => void
): Promise<void> {
    try {
        const content = await getRemoteContent(language);
        const resolvedData = getContentByPath<T>(content as JsonObject, path) ?? fallbackData;

        stateUpdate({
            data: resolvedData,
            isLoading: false,
            error: null,
        });
    } catch (error) {
        stateUpdate({
            data: fallbackData,
            isLoading: false,
            error: error instanceof Error ? error : new Error('Failed to load content'),
        });
    }
}


export function useRemoteContent<T extends JsonValue>(
    path: string,
    fallbackData: T,
): RemoteContentState<T> {
    const {i18n} = useTranslation();

    const [state, setState] = useState<RemoteContentState<T>>({
        data: fallbackData,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        i18n.on('languageChanged', async (lng) => await load(lng, path, fallbackData, setState));
    }, [fallbackData, i18n, path]);

    useEffect(() => {
        load(i18n.language, path, fallbackData, setState).then(r => r);
    }, []);

    return state;
}


