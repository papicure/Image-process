import { useCallback, useMemo, useState } from "react";
import { App } from "antd";
import { APP_VERSION } from "@/constant/env";
import { tr } from "@/i18n/runtime";
import { parseChangelog, type ReleaseInfo } from "@/lib/release";

function readLocalReleases(): ReleaseInfo[] {
    try {
        return JSON.parse(process.env.NEXT_PUBLIC_APP_RELEASES || "[]");
    } catch {
        return [];
    }
}

export function useVersionCheck() {
    const currentVersion = APP_VERSION;
    const { message } = App.useApp();
    const localReleases = useMemo(readLocalReleases, []);
    const [latestVersion] = useState(currentVersion);
    const [releases, setReleases] = useState<ReleaseInfo[]>(localReleases);
    const [checking, setChecking] = useState(false);
    const [open, setOpen] = useState(false);
    const hasNewVersion = false;

    const checkLatestRelease = useCallback(
        async (showMessage = false) => {
            setChecking(true);
            try {
                const localChangelog = process.env.NEXT_PUBLIC_APP_CHANGELOG || "";
                setReleases(localChangelog.trim() ? parseChangelog(localChangelog) : localReleases);
                if (showMessage) message.success(tr("release.upToDate"));
                return true;
            } catch {
                setReleases(localReleases);
                if (showMessage) message.error(tr("release.readFailed"));
                return false;
            } finally {
                setChecking(false);
            }
        },
        [localReleases, message],
    );

    const openReleaseModal = useCallback(() => {
        setOpen(true);
        void checkLatestRelease();
    }, [checkLatestRelease]);

    return {
        open,
        setOpen,
        openReleaseModal,
        latestVersion,
        releases,
        checking,
        hasNewVersion,
        checkLatestRelease,
    };
}
