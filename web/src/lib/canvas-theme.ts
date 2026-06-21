export type CanvasColorTheme = "light" | "dark";
export type CanvasBackgroundMode = "dots" | "lines" | "blank";

export const canvasThemes = {
    light: {
        canvas: {
            background: "#f6f7f8",
            dot: "rgba(17,24,39,.24)",
            line: "rgba(17,24,39,.08)",
            selectionStroke: "#d97706",
            selectionFill: "rgba(217,119,6,.10)",
        },
        node: {
            label: "#5f6672",
            fill: "#eef0f3",
            panel: "#ffffff",
            stroke: "rgba(17,24,39,.12)",
            activeStroke: "#d97706",
            placeholder: "#6b7280",
            text: "#111318",
            muted: "#5f6672",
            faint: "#8a93a0",
        },
        toolbar: {
            panel: "rgba(255,255,255,.96)",
            border: "rgba(17,24,39,.12)",
            item: "#5f6672",
            itemHover: "#eef0f3",
            activeBg: "rgba(217,119,6,.12)",
            activeText: "#111318",
        },
    },
    dark: {
        canvas: {
            background: "#060708",
            dot: "rgba(244,244,245,.18)",
            line: "rgba(244,244,245,.07)",
            selectionStroke: "#f59e0b",
            selectionFill: "rgba(245,158,11,.14)",
        },
        node: {
            label: "#a1a1aa",
            fill: "#131619",
            panel: "#0d0f10",
            stroke: "rgba(255,255,255,.10)",
            activeStroke: "#f59e0b",
            placeholder: "#71717a",
            text: "#f4f4f5",
            muted: "#a1a1aa",
            faint: "#71717a",
        },
        toolbar: {
            panel: "rgba(13,15,16,.96)",
            border: "rgba(255,255,255,.10)",
            item: "#a1a1aa",
            itemHover: "#131619",
            activeBg: "rgba(245,158,11,.14)",
            activeText: "#f4f4f5",
        },
    },
} as const;

export type CanvasTheme = (typeof canvasThemes)[CanvasColorTheme];
