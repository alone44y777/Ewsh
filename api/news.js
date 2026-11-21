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
    ticker: (name) => `FRIENDS DEMAND EMERGENCY MEETING • SOURCES CONFIRM ${name}'S WALLET IS STILL FULL • NO MERCY`
  },
  shadi: {
    headline: (name) => `EXCLUSIVE: ${name}'S SECRET NIKAH CONFIRMED!`,
    ticker: (name) => `INVITATION CARDS PRINTED IN SECRET • ${name} DENIES ALL ALLEGATIONS • FULL REPORT COMING SOON`
  },
  exam: {
    headline: (name) => `SHOCKING: ${name} OPENED BOOK 1 HOUR BEFORE EXAM!`,
    ticker: (name) => `TEACHERS STUNNED • MIRACLE OR LAST-MINUTE PANIC? • ${name} DEMANDS EASY PAPER`
  },
  chai: {
    headline: (name) => `ALERT: ${name} CONSUMED 12 CUPS OF CHAI TODAY!`,
    ticker: (name) => `CAFFEINE LEVELS AT RECORD HIGH • ${name} RUNNING ON PURE CHAI • SLEEP CANCELLED TONIGHT`
  },
  missing: {
    headline: (name) => `URGENT: ${name} SEEN ONLINE, STILL NO REPLY!`,
    ticker: (name) => `BLUE TICKS CONFIRMED • SEARCH TEAM DISPATCHED • ${name} BLAMES BAD NETWORK SIGNAL`
  }
};

const THEMES = {
  classic: {
    bgDark: "#070b12",
    bgAccent: "#141e30",
    primary: "#dc2626",
    primaryDark: "#7f1d1d",
    secondary: "#facc15",
    textMain: "#ffffff",
    textSub: "#e2e8f0",
    tickerBg: "#facc15",
    tickerText: "#090d16",
    border: "#ef4444"
  },
  cyber: {
    bgDark: "#040b09",
    bgAccent: "#081f18",
    primary: "#10b981",
    primaryDark: "#064e3b",
    secondary: "#38bdf8",
    textMain: "#ecfdf5",
    textSub: "#a7f3d0",
    tickerBg: "#10b981",
    tickerText: "#03120c",
    border: "#34d399"
  },
  alert: {
    bgDark: "#0c0a04",
    bgAccent: "#241b05",
    primary: "#eab308",
    primaryDark: "#713f12",
    secondary: "#ef4444",
    textMain: "#fefce8",
    textSub: "#fde68a",
    tickerBg: "#ef4444",
    tickerText: "#ffffff",
    border: "#facc15"
  },
  blue: {
    bgDark: "#050d1a",
    bgAccent: "#0b2242",
    primary: "#0284c7",
    primaryDark: "#0c4a6e",
    secondary: "#38bdf8",
    textMain: "#f8fafc",
    textSub: "#bae6fd",
    tickerBg: "#38bdf8",
    tickerText: "#041322",
    border: "#38bdf8"
  },
  drama: {
    bgDark: "#120614",
    bgAccent: "#290c2e",
    primary: "#db2777",
    primaryDark: "#831843",
    secondary: "#c084fc",
    textMain: "#fdf2f8",
    textSub: "#f5d0fe",
    tickerBg: "#f472b6",
    tickerText: "#1b041c",
    border: "#ec4899"
  }
};

const SIZES = {
  tv: { width: 1280, height: 720, label: "tv" },
  square: { width: 1080, height: 1080, label: "square" },
  status: { width: 1080, height: 1920, label: "status" }
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
    return new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    }).format(new Date()) + " PKT";
  } catch {
    return "LIVE PKT";
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
  if (trimmed.startsWith("data:image/")) {
    return trimmed;
  }
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
    if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0") {
      return null;
    }

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

    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function parseJsonBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }
  const chunks = [];
  let totalBytes = 0;
  for await (const chunk of req) {
    totalBytes += chunk.length;
    if (totalBytes > 5_000_000) {
      throw new Error("Request body exceeds 5MB limit.");
    }
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

  const maxChars = isVertical ? 22 : isSquare ? 26 : 34;
  const lines = wrapText(cfg.headline, maxChars, 2);
  const baseFontSize = isVertical ? 54 : isSquare ? 50 : 52;
  const lineGap = Math.round(baseFontSize * 1.18);

  const lowerHeight = isVertical ? 320 : isSquare ? 250 : 215;
  const tickerHeight = isVertical ? 64 : 52;
  const bannerTop = height - lowerHeight - tickerHeight;
  const headlineStartY = bannerTop + (isVertical ? 128 : 112);

  const filterAttr = cfg.filter === "bw" ? `filter="url(#bwFilter)"` : "";

  let photoLayer = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="url(#studioBg)"/>
    <rect x="0" y="0" width="${width}" height="${height}" fill="url(#gridPattern)"/>
  `;

  if (cfg.img1 && cfg.img2) {
    const halfW = Math.floor(width / 2);
    photoLayer = `
      <g ${filterAttr}>
        <image href="${escapeXml(cfg.img1)}" x="0" y="0" width="${halfW}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
        <image href="${escapeXml(cfg.img2)}" x="${halfW}" y="0" width="${width - halfW}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
      </g>
      <line x1="${halfW}" y1="0" x2="${halfW}" y2="${height}" stroke="${t.secondary}" stroke-width="5"/>
      <circle cx="${halfW}" cy="${Math.round(height * 0.42)}" r="34" fill="${t.primary}" stroke="#ffffff" stroke-width="3"/>
      <text x="${halfW}" y="${Math.round(height * 0.42) + 9}" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" font-weight="900">VS</text>
    `;
  } else if (cfg.img1) {
    photoLayer = `
      <g ${filterAttr}>
        <image href="${escapeXml(cfg.img1)}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
      </g>
    `;
  }

  const headlineSvg = lines
    .map(
      (line, idx) =>
        `<text x="48" y="${headlineStartY + idx * lineGap}" fill="${t.textMain}" font-family="Arial, Helvetica, sans-serif" font-size="${baseFontSize}" font-weight="900" letter-spacing="0.5">${escapeXml(line)}</text>`
    )
    .join("\n    ");

  const tickerText = `${cfg.ticker}   •   ${cfg.ticker}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="studioBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.bgDark}"/>
      <stop offset="100%" stop-color="${t.bgAccent}"/>
    </linearGradient>
    <pattern id="gridPattern" width="36" height="36" patternUnits="userSpaceOnUse">
      <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <linearGradient id="bottomShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.05"/>
      <stop offset="55%" stop-color="#05080f" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#05080f" stop-opacity="0.96"/>
    </linearGradient>
    <filter id="bwFilter">
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncR type="linear" slope="1.15" intercept="-0.04"/>
        <feFuncG type="linear" slope="1.15" intercept="-0.04"/>
        <feFuncB type="linear" slope="1.15" intercept="-0.04"/>
      </feComponentTransfer>
    </filter>
  </defs>

  ${photoLayer}

  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#bottomShade)"/>
  <rect x="8" y="8" width="${width - 16}" height="${height - 16}" rx="12" fill="none" stroke="${t.border}" stroke-opacity="0.55" stroke-width="2.5"/>

  <!-- Top Left LIVE & Viewers -->
  <rect x="32" y="28" width="116" height="44" rx="6" fill="${t.primary}"/>
  <circle cx="56" cy="50" r="8" fill="#ffffff"/>
  <text x="74" y="57" fill="#ffffff" font-family="Arial, sans-serif" font-size="22" font-weight="900">${escapeXml(cfg.liveTag)}</text>

  <rect x="160" y="28" width="142" height="44" rx="6" fill="#090d16" fill-opacity="0.85" stroke="${t.border}" stroke-width="1.5"/>
  <text x="231" y="57" text-anchor="middle" fill="${t.secondary}" font-family="Arial, sans-serif" font-size="20" font-weight="bold">👁 ${escapeXml(cfg.viewers)}</text>

  <!-- Top Right Channel, Location & Time -->
  <rect x="${width - 332}" y="28" width="300" height="66" rx="8" fill="#090d16" fill-opacity="0.88" stroke="${t.border}" stroke-width="1.5"/>
  <text x="${width - 46}" y="56" text-anchor="end" fill="${t.secondary}" font-family="Arial, sans-serif" font-size="21" font-weight="900">${escapeXml(cfg.channel)}</text>
  <text x="${width - 46}" y="82" text-anchor="end" fill="${t.textSub}" font-family="Arial, sans-serif" font-size="15" font-weight="bold">${escapeXml(cfg.location)} • ${escapeXml(cfg.time)}</text>

  <!-- Lower Third Breaking Banner -->
  <rect x="32" y="${bannerTop}" width="290" height="40" rx="5" fill="${t.primary}"/>
  <text x="46" y="${bannerTop + 27}" fill="#ffffff" font-family="Arial, sans-serif" font-size="20" font-weight="900" letter-spacing="1">${escapeXml(cfg.badge)}</text>

  <rect x="32" y="${bannerTop + 44}" width="${width - 64}" height="${lowerHeight - 52}" rx="8" fill="#070c14" fill-opacity="0.92" stroke="${t.border}" stroke-width="2"/>
  <rect x="32" y="${bannerTop + 44}" width="10" height="${lowerHeight - 52}" fill="${t.secondary}"/>

  ${headlineSvg}

  <text x="${width - 48}" y="${height - tickerHeight - 14}" text-anchor="end" fill="${t.textSub}" font-family="Arial, sans-serif" font-size="13" font-weight="bold">${escapeXml(BRANDING.developer)}</text>

  <!-- Bottom News Ticker -->
  <rect x="0" y="${height - tickerHeight}" width="${width}" height="${tickerHeight}" fill="${t.tickerBg}"/>
  <text x="28" y="${height - Math.round(tickerHeight * 0.33)}" fill="${t.tickerText}" font-family="Arial, sans-serif" font-size="${isVertical ? 23 : 20}" font-weight="900" letter-spacing="0.4">${escapeXml(tickerText)}</text>
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
    const subjectName = (pick("name", "BILAL") || "BILAL").toUpperCase();
    const chosenPreset = PRESETS[presetKey];

    const defaultHeadline = chosenPreset
      ? chosenPreset.headline(subjectName)
      : "BREAKING NEWS: SECRET PLAN LEAKED LIVE ON AIR!";
    const defaultTicker = chosenPreset
      ? chosenPreset.ticker(subjectName)
      : "SOURCES CONFIRM MAJOR DRAMA IN FRIENDS GROUP • STAY TUNED FOR FULL COVERAGE";

    const headline = (pick("headline", defaultHeadline) || defaultHeadline).toUpperCase();
    const ticker = (pick("ticker", defaultTicker) || defaultTicker).toUpperCase();
    const channel = (pick("channel", "NEXGEN NEWS") || "NEXGEN NEWS").toUpperCase();
    const badge = (pick("badge", "BREAKING NEWS") || "BREAKING NEWS").toUpperCase();
    const liveTag = (pick("live", "LIVE") || "LIVE").toUpperCase();
    const viewers = pick("viewers", "18.4K") || "18.4K";
    const location = (pick("location", "PAKISTAN") || "PAKISTAN").toUpperCase();
    const time = pick("time") || getPktTimeString();

    const rawTheme = pick("theme", "classic").toLowerCase();
    const theme = THEMES[rawTheme] ? rawTheme : "classic";

    const rawSize = pick("size", "tv").toLowerCase();
    const size = SIZES[rawSize] ? rawSize : "tv";

    const rawFilter = pick("filter", "normal").toLowerCase();
    const filter = rawFilter === "bw" ? "bw" : "normal";

    const mode = pick("mode", "svg").toLowerCase();

    const img1 =
      normalizeDataUri(pick("image1Base64") || pick("imageBase64")) ||
      (await fetchImageAsDataUri(pick("img1") || pick("img")));

    const img2 =
      normalizeDataUri(pick("image2Base64")) ||
      (await fetchImageAsDataUri(pick("img2")));

    const cfg = {
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
    };

    const svg = buildNewsSvg(cfg);

    if (mode === "json") {
      return res.status(200).json({
        status: "success",
        api: "Breaking News TV Card Generator API",
        config: {
          headline: cfg.headline,
          ticker: cfg.ticker,
          channel: cfg.channel,
          badge: cfg.badge,
          theme: cfg.theme,
          size: cfg.size,
          dimensions: SIZES[cfg.size],
          filter: cfg.filter,
          has_custom_photo: Boolean(cfg.img1),
          has_split_vs_photos: Boolean(cfg.img1 && cfg.img2)
        },
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
