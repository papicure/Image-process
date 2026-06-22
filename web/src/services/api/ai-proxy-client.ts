const AI_PROXY_PATH = "/api/ai-proxy";

export async function aiProxyFetch(url: string, init: RequestInit = {}) {
    const method = (init.method || "GET").toUpperCase();
    const headers = new Headers(init.headers);
    const proxyHeaders = new Headers();
    proxyHeaders.set("x-ai-proxy-target", url);
    proxyHeaders.set("x-ai-proxy-method", method);

    const headerEntries = Array.from(headers.entries());
    if (headerEntries.length) {
        proxyHeaders.set("x-ai-proxy-headers", JSON.stringify(headerEntries));
        const contentType = headers.get("content-type");
        if (contentType) proxyHeaders.set("content-type", contentType);
    }

    return fetch(AI_PROXY_PATH, {
        method: "POST",
        headers: proxyHeaders,
        body: init.body,
        signal: init.signal,
    });
}
