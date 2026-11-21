const BRANDING = {
  developer: "NexGen Tech Zone || Dark Empire",
  owner: "Sardar Daud Arain",
  website: "https://nexgen-tech-pk.vercel.app"
};

const USER_AGENT =
  "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36";

const PRESETS = {
  treat: {
    headline: (name) => `${name} REFUSES TO GIVE TREAT AGAIN`,
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
    bgTop: "#152033",
    bgBot: "#070b12",
    slashMain: "#dc2626",
    slashHi: "#f8fafc",
    liveBg: "#dc2626",
    liveText: "#ffffff",
    pillBg: "#0f1522",
    pillBorder: "#475569",
    pillText: "#f8fafc",
    channelBg: "#0f1522",
    channelBorder: "#475569",
    channelTitle: "#ffffff",
    channelSub: "#cbd5e1",
    tagBg: "#dc2626",
    tagText: "#ffffff",
    cardBg: "#ffffff",
    cardBorder: "#dc2626",
    leftBar: "#0f172a",
    headline: "#090d16",
    credit: "#475569",
    tickerBg: "#facc15",
    tickerText: "#090d16"
  },
  cyber: {
    bgTop: "#062119",
    bgBot: "#030a08",
    slashMain: "#10b981",
    slashHi: "#67e8f9",
    liveBg: "#10b981",
    liveText: "#03120c",
    pillBg: "#061612",
    pillBorder: "#10b981",
    pillText: "#ecfdf5",
    channelBg: "#061612",
    channelBorder: "#10b981",
    channelTitle: "#34d399",
    channelSub: "#a7f3d0",
    tagBg: "#10b981",
    tagText: "#03120c",
    cardBg: "#061310",
    cardBorder: "#22d3ee",
    leftBar: "#10b981",
    headline: "#ffffff",
    credit: "#67e8f9",
    tickerBg: "#22d3ee",
    tickerText: "#03120c"
  },
  alert: {
    bgTop: "#241906",
    bgBot: "#0a0702",
    slashMain: "#eab308",
    slashHi: "#ef4444",
    liveBg: "#dc2626",
    liveText: "#ffffff",
    pillBg: "#151007",
    pillBorder: "#eab308",
    pillText: "#fefce8",
    channelBg: "#151007",
    channelBorder: "#eab308",
    channelTitle: "#fbbf24",
    channelSub: "#fde68a",
    tagBg: "#eab308",
    tagText: "#090d16",
    cardBg: "#120e07",
    cardBorder: "#eab308",
    leftBar: "#ef4444",
    headline: "#ffffff",
    credit: "#fde68a",
    tickerBg: "#facc15",
    tickerText: "#090d16"
  },
  blue: {
    bgTop: "#092142",
    bgBot: "#030a17",
    slashMain: "#0284c7",
    slashHi: "#7dd3fc",
    liveBg: "#38bdf8",
    liveText: "#041322",
    pillBg: "#071429",
    pillBorder: "#38bdf8",
    pillText: "#f8fafc",
    channelBg: "#071429",
    channelBorder: "#38bdf8",
    channelTitle: "#ffffff",
    channelSub: "#7dd3fc",
    tagBg: "#0369a1",
    tagText: "#ffffff",
    cardBg: "#ffffff",
    cardBorder: "#0284c7",
    leftBar: "#0f172a",
    headline: "#090d16",
    credit: "#334155",
    tickerBg: "#38bdf8",
    tickerText: "#041322"
  },
  drama: {
    bgTop: "#2b0a28",
    bgBot: "#0d030c",
    slashMain: "#db2777",
    slashHi: "#f9a8d4",
    liveBg: "#ec4899",
    liveText: "#ffffff",
    pillBg: "#180617",
    pillBorder: "#ec4899",
    pillText: "#fdf2f8",
    channelBg: "#180617",
    channelBorder: "#ec4899",
    channelTitle: "#ffffff",
    channelSub: "#f9a8d4",
    tagBg: "#db2777",
    tagText: "#ffffff",
    cardBg: "#190818",
    cardBorder: "#f472b6",
    leftBar: "#ec4899",
    headline: "#ffffff",
    credit: "#f5d0fe",
    tickerBg: "#f9a8d4",
    tickerText: "#1b041c"
  }
};

const THEME_DEFAULTS = {
  blue: {
    channel: "NEXGEN WORLD",
    badge: "EXCLUSIVE REPORT"
  },
  drama: {
    channel: "EMPIRE GOSSIP",
    badge: "BIGGEST EXPOSE"
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
    return "11:40 AM PKT";
  }
}

function wrapText(text, maxCharsPerLine, maxLines = 2) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return ["BREAKING NEWS"];

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
  const t = THEMES[cfg.theme] || THEMES.blue;
  const isVertical = height > width;
  const isSquare = width === height;

  const tickerH = isVertical ? 58 : 44;
  const maxChars = isVertical ? 22 : isSquare ? 28 : 38;
  const lines = wrapText(cfg.headline, maxChars, 2);

  const fontSize = isVertical ? 46 : isSquare ? 42 : 42;
  const lineGap = Math.round(fontSize * 1.2);
  const textBlockH = lines.length * lineGap;
  const cardH = Math.max(isVertical ? 120 : 94, textBlockH + 40);
  const tagH = 34;

  const marginX = isVertical ? 32 : 36;
  const cardW = width - marginX * 2;
  const cardY = height - tickerH - cardH - 14;
  const tagY = cardY - tagH - 6;

  const firstLineY =
    lines.length === 1
      ? cardY + Math.round(cardH / 2) + Math.round(fontSize * 0.34)
      : cardY + 32 + Math.round(fontSize * 0.8);

  const filterAttr = cfg.filter === "bw" ? `filter="url(#bwFilter)"` : "";

  let bgMedia = `
    <rect x="0" y="0" width="${width}" height="${height}" fill="url(#bgGrad)"/>
    <rect x="0" y="0" width="${width}" height="${height}" fill="url(#gridDots)"/>
  `;

  if (cfg.img1 && cfg.img2) {
    const halfW = Math.floor(width / 2);
    bgMedia = `
      <g ${filterAttr}>
        <image href="${escapeXml(cfg.img1)}" x="0" y="0" width="${halfW}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
        <image href="${escapeXml(cfg.img2)}" x="${halfW}" y="0" width="${width - halfW}" height="${height}" preserveAspectRatio="xMidYMid slice"/>
      </g>
      <line x1="${halfW}" y1="0" x2="${halfW}" y2="${height}" stroke="${t.slashHi}" stroke-width="3"/>
      <circle cx="${halfW}" cy="${Math.round(height * 0.43)}" r="26" fill="${t.slashMain}" stroke="#ffffff" stroke-width="2.5"/>
      <text x="${halfW}" y="${Math.round(height * 0.43) + 7}" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="18" font-weight="900">VS</text>
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
        `<text x="${marginX + 24}" y="${firstLineY + idx * lineGap}" fill="${t.headline}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="900" letter-spacing="0.3">${escapeXml(line)}</text>`
    )
    .join("\n    ");

  const repeatedTicker = `${cfg.ticker} • ${cfg.ticker} • ${cfg.ticker}`;
  const chW = isVertical ? 290 : 320;
  const chX = width - chW - 20;

  // Broadcast diagonal corner accents (Blue & Drama style)
  const slashLayer = `
    <polygon points="0,0 ${Math.round(width * 0.22)},0 ${Math.round(width * 0.08)},${height} 0,${height}" fill="${t.slashMain}" fill-opacity="0.28"/>
    <polygon points="${Math.round(width * 0.19)},0 ${Math.round(width * 0.21)},0 ${Math.round(width * 0.07)},${height} ${Math.round(width * 0.05)},${height}" fill="${t.slashHi}" fill-opacity="0.7"/>
    <polygon points="${width},${Math.round(height * 0.15)} ${width},${height} ${Math.round(width * 0.84)},${height}" fill="${t.slashMain}" fill-opacity="0.24"/>
    <line x1="${Math.round(width * 0.85)}" y1="${height}" x2="${width}" y2="${Math.round(height * 0.18)}" stroke="${t.slashHi}" stroke-opacity="0.65" stroke-width="3"/>
  `;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.bgTop}"/>
      <stop offset="100%" stop-color="${t.bgBot}"/>
    </linearGradient>
    <pattern id="gridDots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="#ffffff" fill-opacity="0.09"/>
    </pattern>
    <filter id="bwFilter">
      <feColorMatrix type="saturate" values="0"/>
    </filter>
  </defs>

  ${bgMedia}
  ${slashLayer}

  <!-- Top-Left LIVE Pill -->
  <rect x="20" y="18" width="112" height="40" rx="8" fill="${t.liveBg}"/>
  <circle cx="42" cy="38" r="6.5" fill="${t.liveText}"/>
  <text x="57" y="45" fill="${t.liveText}" font-family="Arial, sans-serif" font-size="19" font-weight="900">${escapeXml(cfg.liveTag)}</text>

  <!-- Top-Left Viewers Pill -->
  <rect x="142" y="18" width="106" height="40" rx="8" fill="${t.pillBg}" fill-opacity="0.92" stroke="${t.pillBorder}" stroke-width="1.2"/>
  <text x="195" y="45" text-anchor="middle" fill="${t.pillText}" font-family="Arial, sans-serif" font-size="18" font-weight="800">👁 ${escapeXml(cfg.viewers)}</text>

  <!-- Top-Right Channel & Location/Time -->
  <rect x="${chX}" y="18" width="${chW}" height="68" rx="8" fill="${t.channelBg}" fill-opacity="0.94" stroke="${t.channelBorder}" stroke-width="1.2"/>
  <text x="${chX + chW - 16}" y="47" text-anchor="end" fill="${t.channelTitle}" font-family="Arial, sans-serif" font-size="21" font-weight="900" letter-spacing="0.4">${escapeXml(cfg.channel)}</text>
  <text x="${chX + chW - 16}" y="72" text-anchor="end" fill="${t.channelSub}" font-family="Arial, sans-serif" font-size="13.5" font-weight="700">${escapeXml(cfg.location)} • ${escapeXml(cfg.time)}</text>

  <!-- Tag Above Lower Third -->
  <rect x="${marginX}" y="${tagY}" width="236" height="${tagH}" rx="5" fill="${t.tagBg}"/>
  <text x="${marginX + 14}" y="${tagY + 23}" fill="${t.tagText}" font-family="Arial, sans-serif" font-size="15.5" font-weight="900" letter-spacing="0.5">${escapeXml(cfg.badge)}</text>

  <!-- Lower Third Headline Box -->
  <rect x="${marginX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="8" fill="${t.cardBg}" fill-opacity="0.97" stroke="${t.cardBorder}" stroke-width="2"/>
  <rect x="${marginX}" y="${cardY}" width="9" height="${cardH}" rx="3" fill="${t.leftBar}"/>

  ${headlineSvg}

  <text x="${marginX + cardW - 14}" y="${cardY + cardH - 10}" text-anchor="end" fill="${t.credit}" font-family="Arial, sans-serif" font-size="12" font-weight="700">${escapeXml(BRANDING.developer)}</text>

  <!-- Bottom News Ticker -->
  <rect x="0" y="${height - tickerH}" width="${width}" height="${tickerH}" fill="${t.tickerBg}"/>
  <text x="20" y="${height - Math.round(tickerH * 0.34)}" fill="${t.tickerText}" font-family="Arial, sans-serif" font-size="${isVertical ? 19 : 16.5}" font-weight="900" letter-spacing="0.4">${escapeXml(repeatedTicker)}</text>
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

    const rawTheme = pick("theme", "blue").toLowerCase();
    const theme = THEMES[rawTheme] ? rawTheme : "blue";
    const tDef = THEME_DEFAULTS[theme] || {};

    const presetKey = pick("preset").toLowerCase();
    const subjectName = (pick("name", "BILAL") || "BILAL").toUpperCase();
    const chosenPreset = PRESETS[presetKey];

    const defaultHeadline = chosenPreset
      ? chosenPreset.headline(subjectName)
      : theme === "drama"
        ? "LAST SEEN ON AT 2 AM STILL NO REPLY"
        : "FINAL EXAM TIMETABLE MOVED UP BY ONE HOUR";

    const defaultTicker = chosenPreset
      ? chosenPreset.ticker(subjectName)
      : theme === "drama"
        ? "SOURCES CONFIRM SEEN STATUS ACTIVE • EXCUSES UNDER INVESTIGATION"
        : "STUDENTS RUSHING TO LIBRARY • COFFEE SHOPS EXTEND NIGHT HOURS";

    const headline = (pick("headline", defaultHeadline) || defaultHeadline).toUpperCase();
    const ticker = (pick("ticker", defaultTicker) || defaultTicker).toUpperCase();
    const channel = (pick("channel", tDef.channel || "NEXGEN WORLD") || "NEXGEN WORLD").toUpperCase();
    const badge = (pick("badge", tDef.badge || "EXCLUSIVE REPORT") || "EXCLUSIVE REPORT").toUpperCase();
    const liveTag = (pick("live", "LIVE") || "LIVE").toUpperCase();
    const viewers = pick("viewers", "18.4K") || "18.4K";
    const location = (pick("location", "PAKISTAN") || "PAKISTAN").toUpperCase();
    const time = pick("time") || getPktTimeString();

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
