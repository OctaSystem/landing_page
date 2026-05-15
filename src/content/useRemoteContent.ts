import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getContentByPath, getRemoteContent } from './contentClient';
import type { JsonObject, JsonValue } from './types';

type RemoteContentState<T extends JsonValue> = {
  data: T;
  isLoading: boolean;
  error: Error | null;
};

export function useRemoteContent<T extends JsonValue>(
  path: string,
  fallbackData: T,
): RemoteContentState<T> {
  const { i18n } = useTranslation();
  const locale = useMemo(
    () => i18n.resolvedLanguage ?? i18n.language ?? 'pt-BR',
    [i18n.language, i18n.resolvedLanguage],
  );

  const [state, setState] = useState<RemoteContentState<T>>({
    data: fallbackData,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const content = await getRemoteContent(locale);
        const resolvedData = getContentByPath<T>(content as JsonObject, path) ?? fallbackData;

        if (isMounted) {
          setState({
            data: resolvedData,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: fallbackData,
            isLoading: false,
            error: error instanceof Error ? error : new Error('Failed to load content'),
          });
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [fallbackData, locale, path]);

  return state;
}


