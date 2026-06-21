"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AppConfigModal } from "@/components/layout/app-config-modal";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { UserStatusActions } from "@/components/layout/user-status-actions";
import { navigationTools, type NavigationToolSlug } from "@/constant/navigation-tools";
import { useI18n } from "@/i18n/i18n-provider";
import { cn } from "@/lib/utils";

export function AppTopNav() {
    const { t } = useI18n();
    const pathname = usePathname();
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const hideHeader = /^\/canvas\/[^/]+/.test(pathname);
    const slug = pathname.split("/").filter(Boolean)[0] || "";
    const activeToolSlug = navigationTools.some((tool) => tool.slug === slug) ? (slug as NavigationToolSlug) : undefined;

    return (
        <>
            {!hideHeader ? (
                <header className="sticky top-0 z-20 h-14 w-full shrink-0 overflow-hidden border-b border-[var(--papi-border)] bg-[color-mix(in_oklab,var(--papi-bg)_92%,transparent)] shadow-[0_1px_0_rgba(255,255,255,0.035),0_0_24px_var(--papi-glow)] backdrop-blur-xl">
                    <div className="mx-auto flex h-full w-full min-w-0 max-w-[1600px] items-stretch justify-between gap-2 px-3 sm:gap-4 sm:px-5">
                        <div className="flex min-w-0 items-center">
                            <Link href="/" className="group flex h-full shrink-0 items-center text-[var(--papi-ink)] transition hover:text-[var(--papi-accent)]">
                                <span className="text-xl font-semibold leading-none">{t("common.appName")}</span>
                            </Link>

                            <button
                                type="button"
                                className="ml-3 inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-[var(--papi-border)] text-[var(--papi-muted)] transition hover:bg-[var(--papi-panel)] hover:text-[var(--papi-ink)] md:hidden"
                                onClick={() => setMobileNavOpen(true)}
                                aria-label={t("nav.open")}
                                title={t("nav.title")}
                            >
                                <Menu className="size-5" />
                            </button>

                            <nav className="hide-scrollbar ml-7 hidden h-14 min-w-0 items-center gap-1 overflow-x-auto md:flex">
                                {navigationTools.map((tool) => {
                                    const Icon = tool.icon;
                                    const active = tool.slug === activeToolSlug;
                                    return (
                                        <Link
                                            key={tool.slug || "overview"}
                                            href={tool.slug ? `/${tool.slug}` : "/"}
                                            className={cn(
                                                "relative inline-flex h-8 shrink-0 items-center gap-2 rounded-md border px-2.5 text-sm leading-6 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--papi-accent)]",
                                                active
                                                    ? "border-[color-mix(in_oklab,var(--papi-accent)_42%,var(--papi-border))] bg-[var(--papi-panel)] font-semibold text-[var(--papi-ink)] shadow-[0_0_18px_var(--papi-glow)]"
                                                    : "border-transparent text-[var(--papi-muted)] hover:border-[var(--papi-border)] hover:bg-[var(--papi-panel)] hover:text-[var(--papi-ink)]",
                                            )}
                                            >
                                            <Icon className="size-4" />
                                            <span className="truncate">{t(tool.labelKey)}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="my-auto flex h-9 min-w-0 items-center justify-end gap-2 justify-self-end whitespace-nowrap">
                            <UserStatusActions compactOnMobile />
                        </div>
                    </div>
                </header>
            ) : null}

            <MobileNavDrawer open={mobileNavOpen} activeToolSlug={activeToolSlug} onClose={() => setMobileNavOpen(false)} />
            <AppConfigModal />
        </>
    );
}
