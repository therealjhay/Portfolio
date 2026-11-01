import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set(["bettapay-tech.vercel.app"]);

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url");
  if (!target) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return new NextResponse("Invalid url parameter", { status: 400 });
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return new NextResponse("Host not allowed", { status: 403 });
  }

  try {
    const res = await fetch(parsed.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    let html = await res.text();
    const origin = `${parsed.protocol}//${parsed.host}`;

    // Strip client script tags so cross-origin Next.js router hydration doesn't throw SecurityError,
    // while preserving the complete server-rendered UI, stylesheets, fonts, and images.
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

    // Ensure relative assets (/logo.png, /_next/static/css/...) resolve against the live deployment origin
    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${origin}/" />`,
    );

    // Enable dark class on html so theme tokens render accurately
    html = html.replace(
      /<html([^>]*?)class="([^"]*)"/i,
      `<html$1class="dark $2"`,
    );

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse("Failed to load live preview", { status: 502 });
  }
}
