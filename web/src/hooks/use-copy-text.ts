"use client";

import { App } from "antd";
import copy from "copy-to-clipboard";

import { useI18n } from "@/i18n/i18n-provider";

export function useCopyText() {
    const { message } = App.useApp();
    const { t } = useI18n();

    return (value: string, successText = t("copy.success")) => {
        copy(value);
        message.success(successText);
    };
}
