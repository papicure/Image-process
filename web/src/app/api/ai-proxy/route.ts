import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 900;

const AI_PROXY_TIMEOUT_MS = 15 * 60 * 1000;
const ALLOWED_METHODS = new Set(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"]);
const RESPONSE_HEADERS = ["content-type", "content-length", "cache-control", "etag", "last-modified", "retry-after", "x-request-id"];

export async function POST(request: NextRequest) {
    const target = request.headers.get("x-ai-proxy-target") || "";
    const method = (request.headers.get("x-ai-proxy-method") || "GET").toUpperCase();
    if (!target) return new Response("Missing x-ai-proxy-target", { status: 400 });
    if (!ALLOWED_METHODS.has(method)) return new Response("Unsupported AI proxy method", { status: 400 });

    const urlResult = validateTargetUrl(target);
    if (typeof urlResult === "string") return new Response(urlResult, { status: 400 });

    const headersResult = requestHeaders(request);
    if (typeof headersResult === "string") return new Response(headersResult, { status: 400 });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), AI_PROXY_TIMEOUT_MS);

    try {
        const body = method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer();
        const response = await fetch(urlResult, {
            method,
            headers: headersResult,
            body: body?.byteLength ? body : undefined,
            signal: controller.signal,
        });

        return new Response(method === "HEAD" ? null : response.body, {
            status: response.status,
            headers: responseHeaders(response.headers),
        });
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return new Response("AI proxy timeout", { status: 504 });
        return new Response(error instanceof Error ? error.message : "AI proxy error", { status: 502 });
    } finally {
        clearTimeout(timer);
    }
}

function validateTargetUrl(target: string) {
    let url: URL;
    try {
        url = new URL(target);
    } catch {
        return "Invalid x-ai-proxy-target";
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") return "Unsupported AI proxy target";
    if (isPrivateHost(url.hostname)) return "Private AI proxy target is not allowed";
    return url;
}

function requestHeaders(request: NextRequest) {
    const result = new Headers();
    const rawHeaders = request.headers.get("x-ai-proxy-headers");
    if (rawHeaders) {
        let parsed: unknown;
        try {
            parsed = JSON.parse(rawHeaders);
        } catch {
            return "Invalid x-ai-proxy-headers";
        }
        if (!Array.isArray(parsed)) return "Invalid x-ai-proxy-headers";
        for (const item of parsed) {
            if (!Array.isArray(item) || item.length !== 2) return "Invalid x-ai-proxy-headers";
            const [name, value] = item;
            if (typeof name !== "string" || typeof value !== "string") return "Invalid x-ai-proxy-headers";
            if (isForwardableHeader(name)) result.set(name, value);
        }
    }
    if (!result.has("content-type")) {
        const contentType = request.headers.get("content-type");
        if (contentType) result.set("Content-Type", contentType);
    }
    return result;
}

function responseHeaders(headers: Headers) {
    const result = new Headers();
    RESPONSE_HEADERS.forEach((key) => {
        const value = headers.get(key);
        if (value) result.set(key, value);
    });
    return result;
}

function isForwardableHeader(name: string) {
    const value = name.toLowerCase();
    return (
        value === "authorization" ||
        value === "content-type" ||
        value === "accept" ||
        value === "api-key" ||
        value === "x-api-key" ||
        value === "x-goog-api-key" ||
        value === "openai-beta" ||
        value.startsWith("x-stainless-") ||
        value.startsWith("anthropic-")
    );
}

function isPrivateHost(hostname: string) {
    const value = hostname.toLowerCase().replace(/^\[|\]$/g, "");
    if (value === "localhost" || value.endsWith(".localhost")) return true;
    if (value.includes(":") && (value === "::1" || value.startsWith("fc") || value.startsWith("fd") || value.startsWith("fe80"))) return true;

    const ipv4 = value.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
    if (!ipv4) return false;
    const parts = ipv4.slice(1).map(Number);
    if (parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return true;
    const [a, b] = parts;
    return a === 10 || a === 127 || a === 0 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 169 && b === 254);
}
