const BRANDING = {
  developer: "NexGen Tech Zone || Dark Empire",
  owner: "Sardar Daud Arain",
  website: "https://nexgen-tech-pk.vercel.app"
};

const USER_AGENT =
  "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36";

const PRESETS = {
  treat: {
    headline: (name) => `${name} REFUSES TO GIVE TREAT AGAIN!`,
    ticker: (name) => `${name} REFUSES TO GIVE TREAT AGAIN • FRIENDS DEMAND EMERGENCY MEETING • WALLET STILL FULL`
  },
  shadi: {
    headline: (name) => `${name} KA SECRET NIKAH CONFIRMED`,
    ticker: (name) => `${name} KA SECRET NIKAH CONFIRMED • INVITATION CARDS READY • FULL COVERAGE LIVE`
  },
  exam: {
    headline: (name) => `${name} OPENED BOOK 1 HOUR BEFORE EXAM`,
    ticker: (name) => `${name} OPENED BOOK 1 HOUR BEFORE EXAM • TEACHERS STUNNED • LAST MINUTE MIRACLE`
  },
  chai: {
    headline: (name) => `${name} DRANK 12 CUPS OF CHAI TODAY`,
    ticker: (name) => `${name} DRANK 12 CUPS OF CHAI TODAY • CAFFEINE OVERLOAD • NO SLEEP TONIGHT`
  },
  missing: {
    headline: (name) => `${name} SEEN ONLINE, STILL NO REPLY`,
    ticker: (name) => `${name} SEEN ONLINE, STILL NO REPLY • BLUE TICKS CONFIRMED • SEARCH TEAM ON DUTY`
  }
};

const THEMES = {
  classic: {
    bgTop: "#131c2b",
    bgBot: "#080c14",
    liveBg: "#eab308",
    liveText: "#090d16",
    viewerBg: "#111622",
    viewerText: "#f8fafc",
    channelBg: "#111622",
    channelTitle: "#ffffff",
    channelSub: "#cbd5e1",
    tagBg: "#eab308",
    tagText: "#090d16",
    boxBg: "#0d111a",
    boxBorder: "#eab308",
    accentBar: "#ef4444",
    headlineColor: "#ffffff",
    creditColor: "#e2e8f0",
    tickerBg: "#dc2626",
    tickerText: "#ffffff"
  },
  cyber: {
    bgTop: "#061b15",
    bgBot: "#030b09",
    liveBg: "#10b981",
    liveText: "#03120c",
    viewerBg: "#071612",
    viewerText: "#ecfdf5",
    channelBg: "#071612",
    channelTitle: "#34d399",
    channelSub: "#a7f3d0",
    tagBg: "#10b981",
    tagText: "#03120c",
    boxBg: "#06120f",
    boxBorder: "#10b981",
    accentBar: "#38bdf8",
    headlineColor: "#ffffff",
    creditColor: "#a7f3d0",
    tickerBg: "#059669",
    tickerText: "#ffffff"
  },
  alert: {
    bgTop: "#1f1606",
    bgBot: "#0b0803",
    liveBg: "#f59e0b",
    liveText: "#090d16",
    viewerBg: "#141008",
    viewerText: "#fefce8",
    channelBg: "#141008",
    channelTitle: "#fbbf24",
    channelSub: "#fde68a",
    tagBg: "#ef4444",
    tagText: "#ffffff",
    boxBg: "#120e07",
    boxBorder: "#f59e0b",
    accentBar: "#ef4444",
    headlineColor: "#ffffff",
    creditColor: "#fde68a",
    tickerBg: "#b91c1c",
    tickerText: "#ffffff"
  },
  blue: {
    bgTop: "#091e3a",
    bgBot: "#040d1a",
    liveBg: "#38bdf8",
    liveText: "#041322",
    viewerBg: "#091526",
    viewerText: "#f8fafc",
    channelBg: "#091526",
    channelTitle: "#7dd3fc",
    channelSub: "#bae6fd",
    tagBg: "#0284c7",
    tagText: "#ffffff",
    boxBg: "#071120",
    boxBorder: "#38bdf8",
    accentBar: "#facc15",
    headlineColor: "#ffffff",
    creditColor: "#bae6fd",
    tickerBg: "#0369a1",
    tickerText: "#ffffff"
  },
  drama: {
    bgTop: "#270a24",
    bgBot: "#0f040e",
    liveBg: "#ec4899",
    liveText: "#ffffff",
    viewerBg: "#170816",
    viewerText: "#fdf2f8",
    channelBg: "#170816",
    channelTitle: "#f472b6",
    channelSub: "#f5d0fe",
    tagBg: "#db2777",
    tagText: "#ffffff",
    boxBg: "#140713",
    boxBorder: "#f472b6",
    accentBar: "#c084fc",
    headlineColor: "#ffffff",
    creditColor: "#f5d0fe",
    tickerBg: "#be185d",
    tickerText: "#ffffff"
  }
};

const SIZES = {
  tv: { width: 1280, height: 720 },
  square: { width: 1080, height: 1080 },
  status: { width: 1080, height: 1920 }
};

function escapeXml(unsafe) {
  return String(unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function getPktTimeString() {
  try {
    return (
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      }).format(new Date()) + " PKT"
    );
  } catch {
    return "11:30 AM PKT";
  }
}

function wrapText(text, maxCharsPerLine, maxLines = 2) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return ["BREAKING NEWS UPDATE"];

  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word.length > maxCharsPerLine ? `${word.slice(0, maxCharsPerLine - 1)}…` : word;
      if (lines.length >= maxLines) break;
    }
  }

  if (lines.length < maxLines && current) {
    lines.push(current);
  } else if (lines.length === maxLines && current && lines[maxLines - 1] !== current) {
    const last = lines[maxLines - 1];
    lines[maxLines - 1] = last.length > 3 ? `${last.slice(0, -1)}…` : last;
  }

  return lines.slice(0, maxLines);
}

function normalizeDataUri(rawInput) {
  if (!rawInput || typeof rawInput !== "string") return null;
  const trimmed = rawInput.trim();
  if (trimmed.startsWith("data:image/")) return trimmed;
  const cleanBase64 = trimmed.replace(/\s+/g, "");
  if (/^[A-Za-z0-9+/=]{120,}$/.test(cleanBase64)) {
    return `data:image/jpeg;base64,${cleanBase64}`;
  }
  return null;
}

async function fetchImageAsDataUri(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  const cleanUrl = rawUrl.trim();
  if (!/^https?:\/\//i.test(cleanUrl)) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const parsed = new URL(cleanUrl);
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0") return null;

    const res = await fetch(parsed.href, {
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT, Accept: "image/*,*/*;q=0.8" },
      redirect: "follow"
    });

    if (!res.ok) return null;
    const contentType = (res.headers.get("content-type") || "image/jpeg").split(";")[0].trim();
    if (!contentType.startsWith("image/")) return null;

    const arrayBuffer = await res.arrayBuffer();
    if (!arrayBuffer || arrayBuffer.byteLength === 0 || arrayBuffer.byteLength > 3_500_000) {
      return null;
    }

    return `data:${contentType};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function parseJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const chunks = [];
  let totalBytes = 0;
  for await (const chunk of req) {
    totalBytes += chunk.length;
    if (totalBytes > 5_000_000) throw new Error("Request body exceeds 5MB limit.");
    chunks.push(chunk);
  }
  if (chunks.length === 0) return {};
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function buildNewsSvg(cfg) {
  const { width, height } = SIZES[cfg.size] || SIZES.tv;
  const t = THEMES[cfg.theme] || THEMES.classic;
  const isVertical = height > width;
  const isSquare = width === height;

  const tickerH = isVertical ? 64 : 52;
  const boxH = isVertical ? 190 : isSquare ? 156 : 138;
  const tagH = 38;
  const marginX = isVertical ? 36 : 44;
  const boxW = width - marginX * 2;

  const boxY = height - tickerH - boxH - 22;
  const tagY = boxY - tagH - 12;

  const maxChars = isVertical ? 24 : isSquare ? 30 : 40;
  const lines = wrapText(cfg.headline, maxChars, 2);
  const fontSize = isVertical ? 48 : isSquare ? 44 : 46;
  const lineGap = Math.round(fontSize * 1.18);
  const textStartY =
    lines.length === 1
      ? boxY + Math.round(boxH / 2) + Math.round(fontSize * 0.34)
      : boxY + Math.round(boxH * 0.44);

  const filterAttr = cfg.filter === "bw" ? `filter="url(#bwFilter)"` : "";

  let bgMedia = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="url(#studioGrad)"/>
    <rect x="0" y="0" width="${width}" height="${height}" fill="url(#gridDots)"/>
  `;

  if (cfg.img1 && cfg.img2) {
    const halfW = Math.floor(width / 2);
    bgMedia = `
      <g ${filterAttr}>
        <image href="${escapeXml(cfg.img1)}" x="0" y="0" width="${halfW}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
        <image href="${escapeXml(cfg.img2)}" x="${halfW}" y="0" width="${width - halfW}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
      </g>
      <line x1="${halfW}" y1="0" x2="${halfW}" y2="${height}" stroke="${t.boxBorder}" stroke-width="4"/>
      <circle cx="${halfW}" cy="${Math.round(height * 0.44)}" r="30" fill="${t.accentBar}" stroke="#ffffff" stroke-width="3"/>
      <text x="${halfW}" y="${Math.round(height * 0.44) + 8}" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="21" font-weight="900">VS</text>
    `;
  } else if (cfg.img1) {
    bgMedia = `
      <g ${filterAttr}>
        <image href="${escapeXml(cfg.img1)}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
      </g>
    `;
  }

  const headlineSvg = lines
    .map(
      (line, idx) =>
        `<text x="${marginX + 28}" y="${textStartY + idx * lineGap}" fill="${t.headlineColor}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="0.4">${escapeXml(line)}</text>`
    )
    .join("\n    ");

  const repeatedTicker = `${cfg.ticker} • ${cfg.ticker} • ${cfg.ticker}`;
  const chBoxW = isVertical ? 320 : 350;
  const chBoxX = width - chBoxW - 24;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="studioGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${t.bgTop}"/>
      <stop offset="100%" stop-color="${t.bgBot}"/>
    </linearGradient>
    <pattern id="gridDots" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="#ffffff" fill-opacity="0.08"/>
    </pattern>
    <linearGradient id="lowerFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="62%" stop-color="#04070d" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#04070d" stop-opacity="0.72"/>
    </linearGradient>
    <filter id="bwFilter">
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>

  ${bgMedia}
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#lowerFade)"/>

  <!-- Top-Left LIVE Pill -->
  <rect x="24" y="22" width="118" height="44" rx="10" fill="${t.liveBg}"/>
  <circle cx="48" cy="44" r="7" fill="${t.liveText}"/>
  <text x="65" y="51" fill="${t.liveText}" font-family="Arial, sans-serif" font-size="21" font-weight="900">${escapeXml(cfg.liveTag)}</text>

  <!-- Top-Left Viewers Pill -->
  <rect x="154" y="22" width="114" height="44" rx="10" fill="${t.viewerBg}" fill-opacity="0.92" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1.2"/>
  <text x="211" y="51" text-anchor="middle" fill="${t.viewerText}" font-family="Arial, sans-serif" font-size="20" font-weight="800">👁 ${escapeXml(cfg.viewers)}</text>

  <!-- Top-Right Channel & Location/Time Box -->
  <rect x="${chBoxX}" y="22" width="${chBoxW}" height="74" rx="10" fill="${t.channelBg}" fill-opacity="0.93" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1.2"/>
  <text x="${chBoxX + chBoxW - 18}" y="53" text-anchor="end" fill="${t.channelTitle}" font-family="Arial, sans-serif" font-size="23" font-weight="900" letter-spacing="0.5">${escapeXml(cfg.channel)}</text>
  <text x="${chBoxX + chBoxW - 18}" y="80" text-anchor="end" fill="${t.channelSub}" font-family="Arial, sans-serif" font-size="15" font-weight="700">${escapeXml(cfg.location)} • ${escapeXml(cfg.time)}</text>

  <!-- Breaking News Tag Above Lower Third -->
  <rect x="${marginX}" y="${tagY}" width="226" height="${tagH}" rx="6" fill="${t.tagBg}"/>
  <text x="${marginX + 16}" y="${tagY + 26}" fill="${t.tagText}" font-family="Arial, sans-serif" font-size="18" font-weight="900" letter-spacing="0.6">${escapeXml(cfg.badge)}</text>

  <!-- Main Lower Third Headline Card -->
  <rect x="${marginX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="10" fill="${t.boxBg}" fill-opacity="0.94" stroke="${t.boxBorder}" stroke-width="2"/>
  <rect x="${marginX}" y="${boxY}" width="10" height="${boxH}" rx="4" fill="${t.accentBar}"/>

  ${headlineSvg}

  <text x="${marginX + boxW - 18}" y="${boxY + boxH - 14}" text-anchor="end" fill="${t.creditColor}" font-family="Arial, sans-serif" font-size="14" font-weight="700">${escapeXml(BRANDING.developer)}</text>

  <!-- Bottom News Ticker Strip -->
  <rect x="0" y="${height - tickerH}" width="${width}" height="${tickerH}" fill="${t.tickerBg}"/>
  <text x="24" y="${height - Math.round(tickerH * 0.34)}" fill="${t.tickerText}" font-family="Arial, sans-serif" font-size="${isVertical ? 21 : 18}" font-weight="900" letter-spacing="0.5">${escapeXml(repeatedTicker)}</text>
</svg>`;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const parsedUrl = new URL(req.url || "/", "http://localhost");
    const q = parsedUrl.searchParams;
    let body = {};

    if (req.method === "POST") {
      body = await parseJsonBody(req);
    }

    const pick = (key, fallback = "") => {
      const bVal = body && body[key] !== undefined ? String(body[key]) : "";
      const qVal = q.get(key);
      return (bVal || (qVal !== null ? qVal : "") || fallback).trim();
    };

    const presetKey = pick("preset").toLowerCase();
    const subjectName = (pick("name", "FIZAN") || "FIZAN").toUpperCase();
    const chosenPreset = PRESETS[presetKey];

    const defaultHeadline = chosenPreset
      ? chosenPreset.headline(subjectName)
      : `${subjectName} KA NUMBER BAN`;
    const defaultTicker = chosenPreset
      ? chosenPreset.ticker(subjectName)
      : `${subjectName} KA NUMBER BAN • GHUM KA MAHOL • ${subjectName} KA KIRA NIKL GYA`;

    const headline = (pick("headline", defaultHeadline) || defaultHeadline).toUpperCase();
    const ticker = (pick("ticker", defaultTicker) || defaultTicker).toUpperCase();
    const channel = (pick("channel", "EMPIRE NEWS") || "EMPIRE NEWS").toUpperCase();
    const badge = (pick("badge", "BREAKING NEWS") || "BREAKING NEWS").toUpperCase();
    const liveTag = (pick("live", "LIVE") || "LIVE").toUpperCase();
    const viewers = pick("viewers", "1M") || "1M";
    const location = (pick("location", "PAKISTAN") || "PAKISTAN").toUpperCase();
    const time = pick("time") || getPktTimeString();

    const rawTheme = pick("theme", "classic").toLowerCase();
    const theme = THEMES[rawTheme] ? rawTheme : "classic";

    const rawSize = pick("size", "tv").toLowerCase();
    const size = SIZES[rawSize] ? rawSize : "tv";

    const filter = pick("filter", "normal").toLowerCase() === "bw" ? "bw" : "normal";
    const mode = pick("mode", "svg").toLowerCase();

    const img1 =
      normalizeDataUri(pick("image1Base64") || pick("imageBase64")) ||
      (await fetchImageAsDataUri(pick("img1") || pick("img")));

    const img2 =
      normalizeDataUri(pick("image2Base64")) ||
      (await fetchImageAsDataUri(pick("img2")));

    const svg = buildNewsSvg({
      headline,
      ticker,
      channel,
      badge,
      liveTag,
      viewers,
      location,
      time,
      theme,
      size,
      filter,
      img1,
      img2
    });

    if (mode === "json") {
      return res.status(200).json({
        status: "success",
        api: "Breaking News TV Card Generator API",
        config: { headline, ticker, channel, badge, viewers, location, time, theme, size, filter },
        svg_data_uri: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
        branding: BRANDING
      });
    }

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(svg);
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err?.message || "Failed to generate breaking news card.",
      branding: BRANDING
    });
  }
}
