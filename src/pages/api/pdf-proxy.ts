import type { APIRoute } from "astro";

export const prerender = false;

const ALLOWED_HOST = "admin.crystalight.com.sg";

export const GET: APIRoute = async ({ request, url }) => {
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response("Missing url parameter", { status: 400 });
  }

  let targetUrl: URL;
  try {
    targetUrl = new URL(target);
  } catch {
    return new Response("Invalid url parameter", { status: 400 });
  }

  if (targetUrl.hostname !== ALLOWED_HOST) {
    return new Response("Forbidden host", { status: 403 });
  }

  const range = request.headers.get("range");
  const upstream = await fetch(targetUrl, {
    headers: range ? { Range: range } : undefined,
  });

  const headers = new Headers();
  for (const key of [
    "content-type",
    "content-length",
    "content-range",
    "accept-ranges",
  ]) {
    const value = upstream.headers.get(key);
    if (value) headers.set(key, value);
  }
  headers.set("Content-Disposition", "inline");

  return new Response(upstream.body, {
    status: upstream.status,
    headers,
  });
};
