import 'server-only';
import type { Locale } from '../i18n.config';

export type Dictionary = typeof import('../dictionaries/pl.json');

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  pl: () => import('../dictionaries/pl.json').then((module) => module.default as Dictionary),
  en: () => import('../dictionaries/en.json').then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
    if (typeof dictionaries[locale] !== 'function') {
        return dictionaries['pl']();
    }
    return dictionaries[locale]();
};
