import { tr } from "@/i18n/runtime";
import type { ReferenceImage } from "@/types/image";

export function imageReferenceLabel(index: number) {
    return tr("imageReference.label", { index: index + 1 });
}

export function buildImageReferencePromptText(prompt: string, references: ReferenceImage[]) {
    const text = prompt.trim();
    if (!references.length) return text;
    const labels = references.map((_, index) => imageReferenceLabel(index));
    return `${tr("imageReference.promptPrefix", { labels: labels.join(tr("imageReference.separator")) })}\n\n${text}`;
}
