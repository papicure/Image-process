"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, normalizeLocale, translations, type Locale } from "./translations";

type TranslateVars = Record<string, string | number>;

type I18nContextValue = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, vars?: TranslateVars) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function detectLocale(): Locale {
    if (typeof window === "undefined") return DEFAULT_LOCALE;
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored) return normalizeLocale(stored);
    return normalizeLocale(window.navigator.language?.toLowerCase().startsWith("zh") ? "zh-CN" : "en");
}

function interpolate(value: string, vars?: TranslateVars) {
    if (!vars) return value;
    return value.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

    useEffect(() => {
        const detected = detectLocale();
        setLocaleState(detected);
    }, []);

    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.dataset.locale = locale;
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }, [locale]);

    const setLocale = useCallback((nextLocale: Locale) => {
        setLocaleState(normalizeLocale(nextLocale));
    }, []);

    const t = useCallback(
        (key: string, vars?: TranslateVars) => {
            const dictionary = translations[locale] || translations[DEFAULT_LOCALE];
            return interpolate(dictionary[key] || translations[DEFAULT_LOCALE][key] || key, vars);
        },
        [locale],
    );

    const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
    const value = useContext(I18nContext);
    if (!value) throw new Error("useI18n must be used inside I18nProvider");
    return value;
}

