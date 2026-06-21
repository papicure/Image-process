"use client";

import { Drawer } from "antd";
import Link from "next/link";

import { navigationTools, type NavigationToolSlug } from "@/constant/navigation-tools";
import { useI18n } from "@/i18n/i18n-provider";
import { cn } from "@/lib/utils";

type MobileNavDrawerProps = {
    open: boolean;
    activeToolSlug?: NavigationToolSlug;
    onClose: () => void;
};

export function MobileNavDrawer({ open, activeToolSlug, onClose }: MobileNavDrawerProps) {
    const { t } = useI18n();

    return (
        <Drawer title={<span className="text-lg font-semibold text-[var(--papi-ink)]">{t("common.appName")}</span>} placement="left" size={292} open={open} onClose={onClose} className="md:hidden">
            <div className="papi-panel mb-5 rounded-lg p-3">
                <div className="text-xs font-medium text-[var(--papi-muted)]">{t("mobile.workspace")}</div>
                <div className="mt-1 text-sm font-semibold text-[var(--papi-ink)]">{t("mobile.workspaceDesc")}</div>
            </div>
            <div className="space-y-1">
                {navigationTools.map((tool) => {
                    const Icon = tool.icon;
                    const active = tool.slug === activeToolSlug;
                    return (
                        <Link
                            key={tool.slug || "overview"}
                            href={tool.slug ? `/${tool.slug}` : "/"}
                            onClick={onClose}
                            className={cn(
                                "flex min-h-11 items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition",
                                active
                                    ? "border-[color-mix(in_oklab,var(--papi-accent)_42%,var(--papi-border))] bg-[var(--papi-panel)] font-semibold text-[var(--papi-ink)] shadow-[0_0_18px_var(--papi-glow)]"
                                    : "border-transparent text-[var(--papi-muted)] hover:border-[var(--papi-border)] hover:bg-[var(--papi-panel)] hover:text-[var(--papi-ink)]",
                            )}
                        >
                            <Icon className="size-4" />
                            <span>{t(tool.labelKey)}</span>
                        </Link>
                    );
                })}
            </div>
        </Drawer>
    );
}
