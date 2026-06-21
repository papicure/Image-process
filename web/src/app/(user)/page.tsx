"use client";

import { ArrowRight, Braces, ImagePlus, Images, Layers3, Maximize2, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";

import { useI18n } from "@/i18n/i18n-provider";

const quickActions = [
    {
        titleKey: "home.workspace.canvas.title",
        descriptionKey: "home.workspace.canvas.desc",
        href: "/canvas",
        icon: Maximize2,
    },
    {
        titleKey: "home.workspace.generate.title",
        descriptionKey: "home.workspace.generate.desc",
        href: "/image",
        icon: ImagePlus,
    },
    {
        titleKey: "home.workspace.assets.title",
        descriptionKey: "home.workspace.assets.desc",
        href: "/assets",
        icon: Images,
    },
    {
        titleKey: "home.workspace.prompts.title",
        descriptionKey: "home.workspace.prompts.desc",
        href: "/prompts",
        icon: Braces,
    },
];

export default function IndexPage() {
    const { t } = useI18n();

    return (
        <main className="papi-workbench-bg h-full w-full min-w-0 overflow-x-hidden overflow-y-auto text-[var(--papi-ink)]">
            <section className="mx-auto grid min-h-[calc(100dvh-3.5rem)] w-full min-w-0 max-w-[1600px] gap-4 px-3 py-4 sm:px-5 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)]">
                <aside className="papi-panel flex flex-col rounded-lg p-4 lg:min-h-0">
                    <div className="flex items-center gap-2 text-sm text-[var(--papi-muted)]">
                        <Sparkles className="size-4 text-[var(--papi-accent)]" />
                        <span>{t("home.heroAccent")}</span>
                    </div>
                    <h1 className="mt-5 break-words text-5xl font-semibold leading-none text-[var(--papi-ink)] sm:text-6xl">{t("home.headlineMain")}</h1>
                    <p className="mt-5 max-w-md break-words text-sm leading-6 text-[var(--papi-muted)]">{t("home.description")}</p>

                    <div className="mt-6 grid gap-2">
                        <Link href="/canvas" className="group inline-flex h-11 items-center justify-between rounded-md bg-[var(--papi-accent)] px-3 text-sm font-semibold text-black transition hover:bg-[var(--papi-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--papi-accent)]">
                            <span>{t("home.startCanvas")}</span>
                            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                        </Link>
                        <Link href="/image" className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[var(--papi-border)] bg-[var(--papi-panel)] px-3 text-sm font-semibold text-[var(--papi-ink)] transition hover:border-[color-mix(in_oklab,var(--papi-accent)_45%,var(--papi-border))] hover:shadow-[0_0_22px_var(--papi-glow)]">
                            <ImagePlus className="size-4 text-[var(--papi-accent)]" />
                            {t("home.newImageTask")}
                        </Link>
                    </div>

                    <div className="mt-auto grid grid-cols-2 gap-2 pt-8 sm:grid-cols-3">
                        <div className="papi-panel-muted rounded-md p-3">
                            <div className="text-sm font-semibold text-[var(--papi-ink)]">{t("home.metric.canvas.label")}</div>
                        </div>
                        <div className="papi-panel-muted rounded-md p-3">
                            <div className="text-sm font-semibold text-[var(--papi-ink)]">{t("home.metric.models.label")}</div>
                        </div>
                        <div className="papi-panel-muted rounded-md p-3">
                            <div className="text-sm font-semibold text-[var(--papi-ink)]">{t("home.metric.storage.label")}</div>
                        </div>
                    </div>
                </aside>

                <div className="grid min-w-0 gap-4 lg:min-h-0 lg:grid-rows-[minmax(360px,1fr)_auto]">
                    <section className="papi-panel papi-panel-glow overflow-hidden rounded-lg">
                        <div className="flex h-11 items-center justify-between border-b border-[var(--papi-border)] px-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-[var(--papi-ink)]">
                                <Layers3 className="size-4 text-[var(--papi-accent)]" />
                                {t("home.workspaces")}
                            </div>
                            <span className="papi-terminal-text text-[var(--papi-muted)]">{t("home.live")}</span>
                        </div>
                        <div className="grid min-h-[320px] min-w-0 gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                            <div className="relative min-w-0 overflow-hidden rounded-lg border border-[var(--papi-border)] bg-[var(--papi-bg)] p-4">
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:28px_28px]" />
                                <div className="relative grid min-h-[300px] min-w-0 gap-3 sm:h-full sm:grid-cols-6 sm:grid-rows-5">
                                    <div className="min-w-0 rounded-lg border border-[var(--papi-border)] bg-[var(--papi-surface)] p-4 shadow-[0_0_22px_rgba(0,0,0,0.18)] sm:col-span-4 sm:row-span-2">
                                        <div className="flex items-center gap-2 text-sm font-semibold">
                                            <Wand2 className="size-4 text-[var(--papi-accent)]" />
                                            {t("home.workspace.generate.title")}
                                        </div>
                                        <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--papi-muted)]">{t("home.workspace.generate.desc")}</p>
                                    </div>
                                    <div className="min-w-0 rounded-lg border border-[var(--papi-border)] bg-[var(--papi-panel)] p-3 sm:col-span-2 sm:row-span-3">
                                        <div className="aspect-[4/3] rounded-md bg-[radial-gradient(circle_at_30%_22%,rgba(251,191,36,0.82),transparent_32%),linear-gradient(135deg,rgba(245,158,11,0.55),rgba(116,167,201,0.42))] sm:aspect-square" />
                                        <div className="mt-3 text-sm font-semibold">{t("home.output")}</div>
                                    </div>
                                    <div className="min-w-0 rounded-lg border border-[var(--papi-border)] bg-[var(--papi-surface)] p-4 sm:col-span-3 sm:row-span-2">
                                        <div className="text-sm font-semibold">{t("home.workspace.assets.title")}</div>
                                        <div className="mt-4 grid grid-cols-3 gap-2">
                                            <div className="aspect-square rounded-md bg-[var(--papi-panel-strong)]" />
                                            <div className="aspect-square rounded-md bg-[var(--papi-panel)]" />
                                            <div className="aspect-square rounded-md bg-[var(--papi-panel-strong)]" />
                                        </div>
                                    </div>
                                    <div className="min-w-0 rounded-lg border border-[var(--papi-border)] bg-[var(--papi-surface)] p-4 sm:col-span-3 sm:row-span-2">
                                        <div className="text-sm font-semibold">{t("home.workspace.prompts.title")}</div>
                                        <div className="mt-4 space-y-2">
                                            <div className="h-2 rounded bg-[var(--papi-panel-strong)]" />
                                            <div className="h-2 w-3/4 rounded bg-[var(--papi-panel)]" />
                                            <div className="h-2 w-5/6 rounded bg-[var(--papi-panel-strong)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid content-start gap-3">
                                {quickActions.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link key={item.titleKey} href={item.href} className="group rounded-lg border border-[var(--papi-border)] bg-[var(--papi-surface)] p-4 transition hover:border-[color-mix(in_oklab,var(--papi-accent)_45%,var(--papi-border))] hover:shadow-[0_0_24px_var(--papi-glow)]">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-[var(--papi-border)] bg-[var(--papi-panel)] text-[var(--papi-accent)]">
                                                    <Icon className="size-4" />
                                                </span>
                                                <div className="min-w-0">
                                                    <h2 className="text-sm font-semibold text-[var(--papi-ink)]">{t(item.titleKey)}</h2>
                                                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--papi-muted)]">{t(item.descriptionKey)}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-3 md:grid-cols-3">
                        <Link href="/canvas" className="papi-panel-muted rounded-lg p-4 transition hover:border-[color-mix(in_oklab,var(--papi-accent)_45%,var(--papi-border))] hover:shadow-[0_0_20px_var(--papi-glow)]">
                            <div className="text-sm font-semibold">{t("home.metric.canvas.label")}</div>
                            <p className="mt-2 text-xs leading-5 text-[var(--papi-muted)]">{t("home.workspace.canvas.desc")}</p>
                        </Link>
                        <Link href="/image" className="papi-panel-muted rounded-lg p-4 transition hover:border-[color-mix(in_oklab,var(--papi-accent)_45%,var(--papi-border))] hover:shadow-[0_0_20px_var(--papi-glow)]">
                            <div className="text-sm font-semibold">{t("home.metric.models.label")}</div>
                            <p className="mt-2 text-xs leading-5 text-[var(--papi-muted)]">{t("home.workspace.generate.desc")}</p>
                        </Link>
                        <Link href="/assets" className="papi-panel-muted rounded-lg p-4 transition hover:border-[color-mix(in_oklab,var(--papi-accent)_45%,var(--papi-border))] hover:shadow-[0_0_20px_var(--papi-glow)]">
                            <div className="text-sm font-semibold">{t("home.metric.storage.label")}</div>
                            <p className="mt-2 text-xs leading-5 text-[var(--papi-muted)]">{t("home.workspace.assets.desc")}</p>
                        </Link>
                    </section>
                </div>
            </section>
        </main>
    );
}
