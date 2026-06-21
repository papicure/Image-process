"use client";

import { Home } from "lucide-react";
import Link from "next/link";

import { useI18n } from "@/i18n/i18n-provider";

export default function NotFound() {
    const { t } = useI18n();

    return (
        <div className="flex h-dvh flex-col overflow-hidden bg-[var(--papi-bg)] text-[var(--papi-ink)]">
            <main className="flex h-full min-h-0 items-center justify-center overflow-y-auto bg-[var(--papi-bg)] px-6 py-10 [background-size:16px_16px]" style={{ backgroundImage: "radial-gradient(var(--papi-border) 1px, transparent 1px)" }}>
                <section className="w-full max-w-md text-center">
                    <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-lg border border-[var(--papi-border)] bg-[var(--papi-panel)] text-2xl font-semibold shadow-[0_0_24px_var(--papi-glow)]">404</div>
                    <h1 className="text-3xl font-semibold tracking-normal">{t("notFound.title")}</h1>
                    <p className="mt-3 text-sm leading-6 text-[var(--papi-muted)]">{t("notFound.description")}</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link href="/" className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--papi-accent)] px-4 text-sm font-medium text-black transition hover:bg-[var(--papi-accent-strong)]">
                            <Home className="size-4" />
                            {t("notFound.backHome")}
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
