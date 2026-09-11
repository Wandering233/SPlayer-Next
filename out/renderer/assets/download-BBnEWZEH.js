import { aC as useStreamingStore, aD as resolveNeteaseDownloadUrl, aE as resolveQQMusicUrl, aF as resolveKugouUrl, H as isPlatform, aG as resolveByPlugin, aH as parseLyric, aI as resolveLocalRepoLyric, aJ as isPluginLyricPreferred, aK as resolvePluginLyric, aL as resolveStreamingByPreference, aM as isBetterFormat, aN as resolveOnlineByPreference, aO as resolveTTMLOverlay, t as toast, aP as i18n, aQ as defineStore } from "./index-DVKNk9gd.js";
import { o as onScopeDispose, q as shallowRef, c as computed, r as ref } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const resolveDownloadSource = async (track, level, usePlaybackForDownload) => {
  if (track.source === "streaming") {
    try {
      const url = await useStreamingStore().getStreamUrl(track, {
        playSessionId: crypto.randomUUID()
      });
      return { url };
    } catch {
      return null;
    }
  }
  if (track.source === "netease") {
    try {
      const resolved = await resolveNeteaseDownloadUrl(track, level, usePlaybackForDownload);
      if (resolved) return resolved;
    } catch {
    }
  }
  if (track.source === "qqmusic") {
    const resolved = await resolveQQMusicUrl(track, level);
    if (resolved.available) return { url: resolved.url };
  }
  if (track.source === "kugou") {
    const resolved = await resolveKugouUrl(track, level);
    if (resolved.available) return { url: resolved.url };
  }
  if (isPlatform(track.source)) {
    const res = await resolveByPlugin(track, level);
    if (res.ok && !res.isTrial) return { url: res.url };
  }
  return null;
};
const pad2 = (value) => String(value).padStart(2, "0");
const pad3 = (value) => String(value).padStart(3, "0");
const formatLrcTime = (ms) => {
  const totalCs = Math.round(Math.max(0, ms) / 10);
  const cs = totalCs % 100;
  const totalSec = (totalCs - cs) / 100;
  const sec = totalSec % 60;
  const min = (totalSec - sec) / 60;
  return `${pad2(min)}:${pad2(sec)}.${pad2(cs)}`;
};
const formatTtmlTime = (ms) => {
  const total = Math.max(0, Math.round(ms));
  const msPart = total % 1e3;
  const totalSec = (total - msPart) / 1e3;
  const sec = totalSec % 60;
  const min = (totalSec - sec) / 60;
  return `${pad2(min)}:${pad2(sec)}.${pad3(msPart)}`;
};
const lineMainText = (line) => line.words.map((word) => word.word).join("").trim();
const toLrc = (lines) => {
  const out = [];
  for (const line of lines) {
    const text = lineMainText(line);
    if (!text) continue;
    const ts = `[${formatLrcTime(line.startTime)}]`;
    out.push(`${ts}${text}`);
    if (line.translatedLyric) out.push(`${ts}${line.translatedLyric}`);
  }
  return out.join("\n");
};
const toEnhancedLrc = (lines) => {
  const out = [];
  for (const line of lines) {
    if (line.words.length === 0) continue;
    const lineTs = `[${formatLrcTime(line.startTime)}]`;
    const body = line.words.map((word) => `<${formatLrcTime(word.startTime)}>${word.word}`).join("");
    if (!body.trim()) continue;
    out.push(`${lineTs}${body}`);
    if (line.translatedLyric) out.push(`${lineTs}${line.translatedLyric}`);
  }
  return out.join("\n");
};
const escapeXml = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const wordSpans = (line) => line.words.map(
  (word) => `<span begin="${formatTtmlTime(word.startTime)}" end="${formatTtmlTime(word.endTime)}">${escapeXml(word.word)}</span>`
).join("");
const roleSpan = (role, text) => text ? `<span ttm:role="${role}">${escapeXml(text)}</span>` : "";
const bgSpan = (bg) => `<span ttm:role="x-bg">${wordSpans(bg)}${roleSpan("x-translation", bg.translatedLyric)}${roleSpan("x-roman", bg.romanLyric)}</span>`;
const paragraph = (main, bgs) => {
  const agent = main.isDuet ? ' ttm:agent="v2"' : "";
  const inner = wordSpans(main) + roleSpan("x-translation", main.translatedLyric) + roleSpan("x-roman", main.romanLyric) + bgs.map(bgSpan).join("");
  return `<p begin="${formatTtmlTime(main.startTime)}" end="${formatTtmlTime(main.endTime)}"${agent}>${inner}</p>`;
};
const toTtml = (lines) => {
  const groups = [];
  for (const line of lines) {
    if (line.isBG && groups.length) groups[groups.length - 1].bg.push(line);
    else groups.push({ main: line, bg: [] });
  }
  const body = groups.map((group) => `      ${paragraph(group.main, group.bg)}`).join("\n");
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<tt xmlns="http://www.w3.org/ns/ttml" xmlns:ttm="http://www.w3.org/ns/ttml#metadata" xmlns:amll="http://www.example.com/ns/amll">',
    "  <body>",
    "    <div>",
    body,
    "    </div>",
    "  </body>",
    "</tt>"
  ].join("\n");
};
const buildDownloadLyric = (input, mainFormat, target) => {
  const lines = parseLyric(input, mainFormat);
  if (lines.length === 0) return null;
  if (target === "ttml") return toTtml(lines);
  const content = target === "enhanced-lrc" ? toEnhancedLrc(lines) : toLrc(lines);
  return content.trim() ? content : null;
};
const toDownloadLyric = (lyric) => ({
  format: lyric.source.format,
  ...lyric.input
});
const toUsableDownloadLyric = (lyric) => {
  if (!lyric) return null;
  const downloadLyric = toDownloadLyric(lyric);
  const hasContent = buildDownloadLyric(downloadLyric, downloadLyric.format, "lrc") || buildDownloadLyric(downloadLyric, downloadLyric.format, "ttml");
  return hasContent ? downloadLyric : null;
};
const resolveOnlineDownloadLyric = async (track, online) => {
  if (!online) return null;
  const ttml = await resolveTTMLOverlay(track, online);
  return toUsableDownloadLyric(ttml) ?? toUsableDownloadLyric({ source: online.source, input: online.input });
};
const resolveDownloadLyric = async (track) => {
  const local = toUsableDownloadLyric(await resolveLocalRepoLyric(track));
  if (local) return local;
  if (track.source === "streaming") {
    const pluginTask = isPluginLyricPreferred() ? resolvePluginLyric(track) : null;
    const streaming = toUsableDownloadLyric(await resolveStreamingByPreference(track));
    if (pluginTask) {
      const plugin = toUsableDownloadLyric(await pluginTask);
      if (plugin && isBetterFormat(plugin.format, streaming?.format ?? null)) return plugin;
      return streaming ?? plugin ?? null;
    }
    return streaming ?? toUsableDownloadLyric(await resolvePluginLyric(track));
  }
  if (isPlatform(track.source)) {
    const pluginTask = isPluginLyricPreferred() ? resolvePluginLyric(track) : null;
    const online = await resolveOnlineByPreference(track, { hasLocal: false, localFormat: null });
    const onlineLyric = await resolveOnlineDownloadLyric(track, online);
    if (pluginTask) {
      const plugin = toUsableDownloadLyric(await pluginTask);
      if (plugin && isBetterFormat(plugin.format, onlineLyric?.format ?? null)) return plugin;
      return onlineLyric ?? plugin ?? null;
    }
    return onlineLyric ?? toUsableDownloadLyric(await resolvePluginLyric(track));
  }
  return null;
};
const resolvePayload = async (payload) => {
  const source = await resolveDownloadSource(
    payload.track,
    payload.qualityLevel,
    payload.usePlaybackForDownload
  );
  if (!source) throw new Error("no download source");
  const { tagOptions } = payload;
  let lyricText;
  let ttmlText;
  if (tagOptions.embedLyric || tagOptions.writeLrc || tagOptions.saveTtml) {
    const lyric = await resolveDownloadLyric(payload.track);
    if (lyric) {
      const input = {
        content: lyric.content,
        translation: lyric.translation,
        translationFormat: lyric.translationFormat,
        romaji: lyric.romaji,
        romajiFormat: lyric.romajiFormat
      };
      if (tagOptions.embedLyric || tagOptions.writeLrc) {
        lyricText = buildDownloadLyric(input, lyric.format, payload.lyricFileFormat) ?? void 0;
      }
      if (tagOptions.saveTtml) {
        ttmlText = buildDownloadLyric(input, lyric.format, "ttml") ?? void 0;
      }
    }
  }
  return {
    url: source.url,
    declaredFormat: source.format,
    declaredSize: source.size,
    lyricText,
    ttmlText
  };
};
const initDownloadResolver = () => window.api.download.onResolve((payload) => {
  resolvePayload(payload).then((res) => window.api.download.submitResolution(payload.taskId, res)).catch(() => {
    toast.error(i18n.global.t("download.resolveFailed", { title: payload.track.title }));
    void window.api.download.failResolution(payload.taskId);
  });
});
const useDownloadStore = defineStore("download", () => {
  const isActive = (status) => status === "queued" || status === "downloading";
  const compareActive = (a, b) => {
    if (a.status !== b.status) return a.status === "downloading" ? -1 : 1;
    return a.createdAt - b.createdAt;
  };
  const compareHistory = (a, b) => (b.finishedAt ?? b.createdAt) - (a.finishedAt ?? a.createdAt);
  const activeTasks = shallowRef([]);
  const historyTasks = shallowRef([]);
  const initialized = ref(false);
  const unsubscribers = [];
  const activeCount = computed(() => activeTasks.value.length);
  const applyTask = (task) => {
    const active = activeTasks.value.filter((item) => item.taskId !== task.taskId);
    const history = historyTasks.value.filter((item) => item.taskId !== task.taskId);
    if (isActive(task.status)) {
      activeTasks.value = [...active, task].sort(compareActive);
      historyTasks.value = history;
      return;
    }
    activeTasks.value = active;
    historyTasks.value = [task, ...history].sort(compareHistory);
  };
  const applyProgress = (data) => {
    const idx = activeTasks.value.findIndex((item) => item.taskId === data.taskId);
    if (idx === -1) return;
    const next = activeTasks.value.slice();
    next[idx] = { ...next[idx], received: data.received, total: data.total };
    activeTasks.value = next;
  };
  const init = async () => {
    if (initialized.value) return;
    initialized.value = true;
    unsubscribers.push(initDownloadResolver());
    const tasks = await window.api.download.list();
    activeTasks.value = tasks.filter((task) => isActive(task.status)).sort(compareActive);
    historyTasks.value = tasks.filter((task) => !isActive(task.status)).sort(compareHistory);
    unsubscribers.push(window.api.download.onState(applyTask));
    unsubscribers.push(window.api.download.onProgress(applyProgress));
  };
  const cancel = (taskId) => void window.api.download.cancel(taskId);
  const remove = (taskId) => {
    activeTasks.value = activeTasks.value.filter((item) => item.taskId !== taskId);
    historyTasks.value = historyTasks.value.filter((item) => item.taskId !== taskId);
    void window.api.download.remove(taskId);
  };
  const clearFinished = () => {
    historyTasks.value = [];
    void window.api.download.clearFinished();
  };
  onScopeDispose(() => {
    for (const off of unsubscribers) off();
    unsubscribers.length = 0;
  });
  return { activeTasks, historyTasks, activeCount, init, cancel, remove, clearFinished };
});
export {
  useDownloadStore as u
};
