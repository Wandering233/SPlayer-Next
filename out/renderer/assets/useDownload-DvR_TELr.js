import { u as useI18n, t as toast, a as useSettingsStore, bq as QUALITY_LABELS } from "./index-DVKNk9gd.js";
const formatTime = (ms) => {
  const totalSec = Math.floor(ms / 1e3);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor(totalSec % 3600 / 60);
  const s = totalSec % 60;
  const pad = (n) => n.toString().padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
};
const formatTimeWithDeci = (ms) => {
  const totalDeci = Math.floor(ms / 100);
  const min = Math.floor(totalDeci / 600);
  const sec = Math.floor(totalDeci / 10) % 60;
  const deci = totalDeci % 10;
  return `${min}:${sec.toString().padStart(2, "0")}.${deci}`;
};
const formatDate = (time) => {
  if (!time) return "";
  return new Intl.DateTimeFormat(void 0, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(time));
};
const formatCountdown = (totalSec) => {
  const safe = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(safe / 3600);
  const m = Math.floor(safe % 3600 / 60);
  const s = safe % 60;
  const pad = (n) => n.toString().padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
};
const formatSignedSec = (ms) => {
  if (ms === 0) return "0";
  const sec = (ms / 1e3).toFixed(1).replace(/\.?0+$/, "");
  return ms > 0 ? `+${sec}` : sec;
};
const DOWNLOAD_QUALITY_LEVELS = ["hi-res", "lossless", "hq", "sq", "lq"];
const buildDownloadQualityItems = (defaultLabel, keyPrefix = "") => [
  { key: keyPrefix, label: defaultLabel },
  ...DOWNLOAD_QUALITY_LEVELS.map((quality) => ({
    key: `${keyPrefix}${quality}`,
    label: QUALITY_LABELS[quality]
  }))
];
const useDownload = () => {
  const { t } = useI18n();
  const prepareRequest = (track, opts) => {
    if (track.source === "local") return null;
    const download = useSettingsStore().system.download;
    const level = opts.quality ?? download.quality;
    const tagOptions = {
      embedCover: download.embedCover,
      embedMeta: download.embedMeta,
      embedLyric: download.embedLyric,
      writeLrc: download.writeLrc,
      saveTtml: download.saveTtml
    };
    return {
      taskId: opts.taskId ?? crypto.randomUUID(),
      track,
      qualityLevel: level,
      coverUrl: track.coverOriginal ?? track.cover,
      tagOptions,
      usePlaybackForDownload: download.usePlaybackForDownload,
      lyricFileFormat: download.lyricFileFormat
    };
  };
  const enqueue = async (track, opts = {}) => {
    const req = prepareRequest(track, opts);
    if (!req) return false;
    const res = opts.taskId ? await window.api.download.retry(req) : await window.api.download.start(req);
    if (!res.ok) {
      toast.warning(
        res.reason === "downloaded" ? t("download.alreadyDownloaded") : t("download.alreadyQueued")
      );
      return false;
    }
    if (opts.taskId === void 0) toast.success(t("download.started", { title: track.title }));
    return true;
  };
  const enqueueMany = async (tracks) => {
    const requests = tracks.map((track) => prepareRequest(track, {})).filter((req) => req !== null);
    const results = await window.api.download.startMany(requests).catch(() => []);
    const count = results.filter((result) => result?.ok).length;
    if (count > 0) toast.success(t("download.enqueued", { count }));
  };
  const retry = (task) => enqueue(task.track, { quality: task.qualityLevel, taskId: task.taskId });
  return { enqueue, enqueueMany, retry };
};
export {
  formatCountdown as a,
  formatTimeWithDeci as b,
  formatSignedSec as c,
  formatTime as d,
  buildDownloadQualityItems as e,
  formatDate as f,
  useDownload as u
};
