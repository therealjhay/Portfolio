import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = new Set(["bettapay-tech.vercel.app"]);

const FALLBACK_BETTAPAY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>BettaPay — Merchant Payment & Settlement</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0d0e0d;
      color: #f4f3ef;
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100vh;
    }
    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 16px;
    }
    .brand { font-weight: 700; font-size: 16px; letter-spacing: -0.02em; }
    .pill {
      font-size: 11px;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(255,255,255,0.08);
      color: #d6d4ce;
    }
    .hero { margin: auto 0; max-width: 520px; }
    h1 { font-size: 28px; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 12px; }
    p { font-size: 14px; line-height: 1.55; color: #a3a19a; }
    .metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 16px;
    }
    .metric-label { font-size: 11px; color: #8c8a84; text-transform: uppercase; }
    .metric-val { font-size: 14px; font-weight: 600; margin-top: 4px; }
  </style>
</head>
<body>
  <div class="nav">
    <span class="brand">BettaPay</span>
    <span class="pill">Stellar · Soroban Settlement</span>
  </div>
  <div class="hero">
    <h1>Non-custodial merchant payments & automated settlement across Africa.</h1>
    <p>Accept cross-border payments with programmable fee splits, instant Stellar finality, and transparent reconciliation references.</p>
  </div>
  <div class="metrics">
    <div><div class="metric-label">Architecture</div><div class="metric-val">Non-Custodial</div></div>
    <div><div class="metric-label">Fee Routing</div><div class="metric-val">4-Tier Splits</div></div>
    <div><div class="metric-label">Network</div><div class="metric-val">Stellar / Soroban</div></div>
  </div>
</body>
</html>`;

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

    if (!res.ok) {
      throw new Error(`Status ${res.status}`);
    }

    let html = await res.text();
    const origin = `${parsed.protocol}//${parsed.host}`;

    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${origin}/" />`,
    );
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
    return new NextResponse(FALLBACK_BETTAPAY_HTML, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  }
}
