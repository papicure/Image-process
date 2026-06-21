"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { App, Button } from "antd";
import { Download, FileUp, Plus, Trash2 } from "lucide-react";

import { readZip } from "@/lib/zip";
import { setMediaBlob } from "@/services/file-storage";
import { setImageBlob } from "@/services/image-storage";
import { CanvasDeleteProjectsDialog } from "./components/canvas-delete-projects-dialog";
import { CanvasProjectCard } from "./components/canvas-project-card";
import type { CanvasExportFile } from "./export-types";
import { useI18n } from "@/i18n/i18n-provider";
import { useCanvasStore } from "./stores/use-canvas-store";
import { useCanvasUiStore } from "./stores/use-canvas-ui-store";
import { exportCanvasProjects } from "./utils/canvas-export";

export default function CanvasPage() {
    const { t } = useI18n();
    const { message } = App.useApp();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const hydrated = useCanvasStore((state) => state.hydrated);
    const projects = useCanvasStore((state) => state.projects);
    const createProject = useCanvasStore((state) => state.createProject);
    const importProject = useCanvasStore((state) => state.importProject);
    const selectedIds = useCanvasUiStore((state) => state.selectedProjectIds);
    const setDeleteIds = useCanvasUiStore((state) => state.setDeleteProjectIds);

    const enterProject = (id: string) => {
        router.push(`/canvas/${id}`);
    };

    const createAndEnter = () => enterProject(createProject(t("canvas.store.newCanvasTitle", { index: projects.length + 1 })));

    const importCanvas = async (file?: File) => {
        if (!file) return;
        try {
            const zip = await readZip(file);
            const projectFile = zip.get("projects.json");
            if (!projectFile) throw new Error("missing projects.json");
            const data = JSON.parse(await projectFile.text()) as CanvasExportFile;
            await Promise.all(
                data.projects.flatMap((project) =>
                    project.files.map(async (item) => {
                        const blob = zip.get(item.path);
                        if (!blob) return;
                        const typedBlob = blob.type ? blob : blob.slice(0, blob.size, item.mimeType);
                        await (item.storageKey.startsWith("image:") ? setImageBlob(item.storageKey, typedBlob) : setMediaBlob(item.storageKey, typedBlob));
                    }),
                ),
            );
            data.projects.forEach((item) => importProject(item.project));
            message.success(t("canvas.page.imported", { count: data.projects.length }));
        } catch {
            message.error(t("canvas.page.importFailed"));
        } finally {
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    return (
        <main className="papi-workbench-bg h-full overflow-auto text-[var(--papi-ink)]">
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-3 py-4 sm:px-5">
                <header className="papi-panel flex flex-wrap items-end justify-between gap-4 rounded-lg p-4">
                    <div>
                        <p className="papi-terminal-text text-[var(--papi-accent)]">{t("canvas.page.kicker")}</p>
                        <h1 className="mt-2 text-2xl font-semibold">{t("canvas.page.title")}</h1>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--papi-muted)]">{t("canvas.page.description")}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        {selectedIds.length ? (
                            <>
                                <Button disabled={!hydrated} icon={<Download className="size-4" />} onClick={() => void exportCanvasProjects(projects.filter((project) => selectedIds.includes(project.id)), `PapiCanvas-${selectedIds.length}-projects`)}>
                                    {t("canvas.page.exportSelected")}
                                </Button>
                                <Button disabled={!hydrated} icon={<Trash2 className="size-4" />} onClick={() => setDeleteIds(selectedIds)}>
                                    {t("canvas.page.deleteSelected")}
                                </Button>
                            </>
                        ) : null}
                        {projects.length ? (
                            <Button disabled={!hydrated} onClick={() => setDeleteIds(projects.map((project) => project.id))}>
                                {t("canvas.page.deleteAll")}
                            </Button>
                        ) : null}
                        <Button disabled={!hydrated} icon={<FileUp className="size-4" />} onClick={() => inputRef.current?.click()}>
                            {t("common.import")}
                        </Button>
                        <Button disabled={!hydrated} type="primary" icon={<Plus className="size-4" />} onClick={createAndEnter}>
                            {t("canvas.page.newCanvas")}
                        </Button>
                    </div>
                </header>

                {!hydrated ? (
                    <section className="papi-panel flex min-h-[360px] items-center justify-center rounded-lg text-sm text-[var(--papi-muted)]">{t("canvas.page.loading")}</section>
                ) : projects.length ? (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {projects.map((project) => (
                            <CanvasProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <section className="papi-panel flex min-h-[360px] flex-col items-center justify-center rounded-lg px-6 text-center">
                        <h2 className="text-xl font-semibold">{t("canvas.page.emptyTitle")}</h2>
                        <p className="mt-3 max-w-md text-sm leading-6 text-[var(--papi-muted)]">{t("canvas.page.emptyDesc")}</p>
                        <Button type="primary" className="mt-6" icon={<Plus className="size-4" />} onClick={createAndEnter}>
                            {t("canvas.page.newCanvas")}
                        </Button>
                    </section>
                )}
            </div>

            <input ref={inputRef} type="file" accept="application/zip,.zip" className="hidden" onChange={(event) => void importCanvas(event.target.files?.[0])} />
            <CanvasDeleteProjectsDialog />
        </main>
    );
}
