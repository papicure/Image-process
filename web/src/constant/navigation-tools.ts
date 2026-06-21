import { FileText, ImagePlus, Images, LayoutDashboard, Maximize2, Video } from "lucide-react";

export const navigationTools = [
    {
        slug: "",
        labelKey: "nav.overview",
        icon: LayoutDashboard,
    },
    {
        slug: "canvas",
        labelKey: "nav.canvas",
        icon: Maximize2,
    },
    {
        slug: "image",
        labelKey: "nav.generate",
        icon: ImagePlus,
    },
    {
        slug: "video",
        labelKey: "nav.video",
        icon: Video,
    },
    {
        slug: "prompts",
        labelKey: "nav.prompts",
        icon: FileText,
    },
    {
        slug: "assets",
        labelKey: "nav.assets",
        icon: Images,
    },
] as const;

export type NavigationToolSlug = (typeof navigationTools)[number]["slug"];
