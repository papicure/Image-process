"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

import { useI18n } from "@/i18n/i18n-provider";
import { formatDuration } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

export function ImageGenerationPending({ className, label, compact = false }: { className?: string; label?: string; compact?: boolean }) {
    const { t } = useI18n();
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
        return () => window.clearInterval(timer);
    }, []);

    const index = Math.floor(tick / 2) % 4;
    const progress = Math.min(98, 10 + (1 - Math.exp(-tick / 28)) * 88);

    return (
        <div className={cn("relative overflow-hidden bg-[var(--papi-panel)]", compact ? "min-h-24" : "aspect-[4/3]", className)}>
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    backgroundImage: "radial-gradient(circle, var(--papi-glow) 1.4px, transparent 1.6px)",
                    backgroundSize: "16px 16px",
                    maskImage: "radial-gradient(ellipse at 38% 68%, black 0%, black 28%, transparent 60%)",
                }}
            />
            <div className="absolute left-4 top-4 flex items-center gap-2 text-[15px] font-medium text-[var(--papi-muted)]">
                <LoaderCircle className="size-4 animate-spin" />
                <span>{label || t(`canvas.pending.image.${index}`)}</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
                <div className="mb-2 flex items-center justify-between text-xs text-[var(--papi-muted)]">
                    <span>{formatDuration(tick * 1000)}</span>
                    <span>{Math.floor(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--papi-bg)]">
                    <div className="h-full rounded-full bg-[var(--papi-accent)] shadow-[0_0_12px_var(--papi-glow)]" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
}
