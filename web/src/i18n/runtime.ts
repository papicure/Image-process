import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, normalizeLocale, translations, type Locale } from "./translations";

type TranslateVars = Record<string, string | number>;

function currentLocale(): Locale {
    if (typeof window === "undefined") return DEFAULT_LOCALE;
    return normalizeLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY) || window.navigator.language);
}

function interpolate(value: string, vars?: TranslateVars) {
    if (!vars) return value;
    return value.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}

export function tr(key: string, vars?: TranslateVars) {
    const locale = currentLocale();
    const value = translations[locale][key] || translations[DEFAULT_LOCALE][key] || key;
    return interpolate(value, vars);
}

