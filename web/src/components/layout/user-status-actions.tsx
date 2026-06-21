"use client";

import type { CSSProperties } from "react";
import { Keyboard, Languages, Settings2 } from "lucide-react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useI18n } from "@/i18n/i18n-provider";
import { canvasThemes } from "@/lib/canvas-theme";
import { cn } from "@/lib/utils";
import { useConfigStore } from "@/stores/use-config-store";
import { useThemeStore } from "@/stores/use-theme-store";

type UserStatusActionsProps = {
    showConfig?: boolean;
    compactOnMobile?: boolean;
    variant?: "default" | "canvas";
    onOpenShortcuts?: () => void;
};

export function UserStatusActions({ showConfig = true, compactOnMobile = false, variant = "default", onOpenShortcuts }: UserStatusActionsProps) {
    const { locale, setLocale, t } = useI18n();
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);
    const openConfigDialog = useConfigStore((state) => state.openConfigDialog);
    const canvasTheme = canvasThemes[theme];
    const iconClass =
        "inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent text-[var(--papi-muted)] transition hover:border-[var(--papi-border)] hover:bg-[var(--papi-panel)] hover:text-[var(--papi-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--papi-accent)] [&_svg]:size-4";
    const iconStyle: CSSProperties | undefined = variant === "canvas" ? { color: canvasTheme.node.text } : undefined;

    return (
        <div className="inline-flex shrink-0 items-center gap-1">
            {showConfig ? (
                <button type="button" className={iconClass} style={iconStyle} onClick={() => openConfigDialog(false)} aria-label={t("common.settings")} title={t("common.settings")}>
                    <Settings2 className="size-4" />
                </button>
            ) : null}
            <button type="button" className={cn(iconClass, compactOnMobile && "hidden sm:inline-flex")} style={iconStyle} onClick={() => setLocale(locale === "zh-CN" ? "en" : "zh-CN")} aria-label={t("common.language")} title={locale === "zh-CN" ? t("common.switchToEnglish") : t("common.switchToChinese")}>
                <Languages className="size-4" />
            </button>
            <AnimatedThemeToggler theme={theme} onThemeChange={setTheme} className={cn(iconClass, compactOnMobile && "hidden sm:inline-flex")} style={iconStyle} aria-label={theme === "dark" ? t("common.switchToLightTheme") : t("common.switchToDarkTheme")} title={theme === "dark" ? t("common.lightTheme") : t("common.darkTheme")} />
            {onOpenShortcuts ? (
                <button type="button" className={iconClass} style={iconStyle} onClick={onOpenShortcuts} aria-label={t("common.shortcuts")} title={t("common.shortcuts")}>
                    <Keyboard className="size-4" />
                </button>
            ) : null}
        </div>
    );
}
