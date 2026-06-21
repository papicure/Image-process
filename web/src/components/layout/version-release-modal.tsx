"use client";

import type { CSSProperties } from "react";
import { Modal, Tag, Timeline } from "antd";
import { useVersionCheck } from "@/hooks/use-version-check";
import { APP_VERSION } from "@/constant/env";
import { useI18n } from "@/i18n/i18n-provider";

function getTagColor(type: string) {
    if (/new|added|feature/i.test(type)) return "green";
    if (/fix|bug/i.test(type)) return "red";
    if (/change|update|adjust/i.test(type)) return "blue";
    if (/doc/i.test(type)) return "purple";
    return "default";
}

type VersionReleaseModalProps = {
    className?: string;
    style?: CSSProperties;
};

export function VersionReleaseModal({ className, style }: VersionReleaseModalProps) {
    const { t } = useI18n();
    const { open, setOpen, openReleaseModal, latestVersion, releases, checking, hasNewVersion, checkLatestRelease } = useVersionCheck();

    return (
        <>
            <button
                type="button"
                className={className || "shrink-0 cursor-pointer rounded-md px-2 font-mono text-xs font-medium text-[var(--papi-muted)] transition hover:bg-[var(--papi-panel)] hover:text-[var(--papi-ink)]"}
                style={style}
                onClick={openReleaseModal}
                title={t("release.viewNotes")}
                aria-label={t("release.viewNotes")}
            >
                <span className="relative inline-flex">
                    {APP_VERSION}
                    {hasNewVersion ? <span className="absolute -right-1.5 -top-1 size-1.5 rounded-full bg-[var(--papi-success)]" /> : null}
                </span>
            </button>
            <Modal title={t("release.title")} open={open} width={680} centered footer={null} onCancel={() => setOpen(false)}>
                <div className="mb-5 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-[var(--papi-border)] p-3">
                        <div className="text-xs text-[var(--papi-muted)]">{t("release.currentVersion")}</div>
                        <div className="mt-1 text-base font-semibold text-[var(--papi-ink)]">{APP_VERSION}</div>
                    </div>
                    <div className="rounded-lg border border-[var(--papi-border)] p-3">
                        <div className="flex items-center justify-between gap-3">
                            <div className="text-xs text-[var(--papi-muted)]">{t("release.channel")}</div>
                            <button type="button" className="cursor-pointer bg-transparent p-0 text-[11px] font-normal text-[var(--papi-muted)] underline-offset-2 transition hover:text-[var(--papi-accent)] hover:underline" onClick={() => void checkLatestRelease(true)}>
                                {checking ? t("release.checking") : t("common.refresh")}
                            </button>
                        </div>
                        <div className="mt-1 text-base font-semibold text-[var(--papi-ink)]">{latestVersion}</div>
                    </div>
                </div>
                <div className="max-h-[56vh] overflow-y-auto pr-2">
                    {releases.length ? (
                        <Timeline
                            items={releases.map((release) => ({
                                content: (
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-semibold text-[var(--papi-ink)]">{release.version}</span>
                                            <span className="text-xs text-[var(--papi-muted)]">{release.date}</span>
                                            <div className="flex min-w-0 items-center gap-1.5">
                                                {release.version === latestVersion ? <Tag color="green">{t("release.current")}</Tag> : null}
                                                {release.version === APP_VERSION ? <Tag>{t("release.installed")}</Tag> : null}
                                            </div>
                                        </div>
                                        <div className="mt-2 space-y-1.5">
                                            {release.items.map((item, index) => (
                                                <div key={`${release.version}-${index}`} className="flex items-start gap-2 text-sm leading-6 text-[var(--papi-muted)]">
                                                    <Tag color={getTagColor(item.type)} className="m-0 mt-0.5 shrink-0 whitespace-nowrap">
                                                        {item.type}
                                                    </Tag>
                                                    <span className="min-w-0 flex-1">{item.content}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ),
                            }))}
                        />
                    ) : (
                        <div className="rounded-lg border border-[var(--papi-border)] bg-[var(--papi-panel)] p-4 text-sm leading-6 text-[var(--papi-muted)]">{t("release.privateEmpty")}</div>
                    )}
                </div>
            </Modal>
        </>
    );
}
