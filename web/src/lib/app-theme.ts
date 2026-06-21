import type { ThemeConfig } from "antd";
import { theme as antdTheme } from "antd";

const neutral = {
    light: {
        primary: "#d97706",
        primaryHover: "#b45309",
        primaryText: "#ffffff",
        menuBg: "#eef0f3",
        menuText: "#111318",
        selectActiveBg: "#eef0f3",
        selectSelectedBg: "rgba(217, 119, 6, 0.14)",
        selectText: "#111318",
        tableSelectedBg: "rgba(217, 119, 6, 0.08)",
        tableSelectedHoverBg: "rgba(217, 119, 6, 0.12)",
    },
    dark: {
        primary: "#f59e0b",
        primaryHover: "#fbbf24",
        primaryText: "#060708",
        menuBg: "#131619",
        menuText: "#f4f4f5",
        selectActiveBg: "#131619",
        selectSelectedBg: "#191d21",
        selectText: "#f4f4f5",
        tableSelectedBg: "rgba(245, 158, 11, 0.12)",
        tableSelectedHoverBg: "rgba(245, 158, 11, 0.18)",
    },
};

export function getAntThemeConfig(dark: boolean): ThemeConfig {
    const color = dark ? neutral.dark : neutral.light;

    return {
        algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        cssVar: { key: dark ? "papicanvas-dark" : "papicanvas-light" },
        token: {
            colorPrimary: color.primary,
            colorInfo: color.primary,
            colorLink: color.primary,
            colorLinkHover: color.primaryHover,
            colorLinkActive: color.primary,
            colorTextLightSolid: color.primaryText,
        },
        components: {
            Button: {
                primaryShadow: "none",
            },
            Menu: {
                itemActiveBg: color.menuBg,
                itemHoverBg: color.menuBg,
                itemSelectedBg: color.menuBg,
                itemSelectedColor: color.menuText,
                darkItemHoverBg: neutral.dark.menuBg,
                darkItemSelectedBg: neutral.dark.menuBg,
                darkItemSelectedColor: neutral.dark.menuText,
            },
            Select: {
                optionActiveBg: color.selectActiveBg,
                optionSelectedBg: color.selectSelectedBg,
                optionSelectedColor: color.selectText,
            },
            Table: {
                rowSelectedBg: color.tableSelectedBg,
                rowSelectedHoverBg: color.tableSelectedHoverBg,
            },
        },
    };
}
