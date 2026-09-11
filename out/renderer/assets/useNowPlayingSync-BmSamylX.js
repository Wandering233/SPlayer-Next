import { k as onMounted, L as onBeforeUnmount, r as ref, q as shallowRef } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const pickLatestStartedIndex = (lines, time) => {
  if (lines.length === 0) return -1;
  let lo = 0;
  let hi = lines.length - 1;
  let result = -1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    if (lines[mid].startTime <= time) {
      result = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return result;
};
const pickAdvanceOnEndIndex = (lines, time) => {
  const idx = pickLatestStartedIndex(lines, time);
  if (idx >= 0 && idx + 1 < lines.length && lines[idx].endTime <= time) {
    return idx + 1;
  }
  return idx;
};
const pickPrimaryIndex = (lines, time) => {
  if (lines.length === 0) return -1;
  let lo = 0;
  let hi = lines.length - 1;
  let latest = -1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    if (lines[mid].startTime <= time) {
      latest = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  if (latest < 0) return -1;
  const latestActive = time < lines[latest].endTime;
  if (!latestActive) return latest;
  if (latest > 0) {
    const prev = lines[latest - 1];
    if (prev.startTime <= time && time < prev.endTime) return latest - 1;
  }
  return latest;
};
const getWordSweepProgress = (word, lineStartTime, currentMs) => {
  const wordDuration = Math.abs(word.endTime - word.startTime) || 1;
  const preRoll = Math.min(80, wordDuration * 0.3);
  const adjustedStart = Math.max(lineStartTime, word.startTime - preRoll);
  const adjustedDuration = Math.max(1, word.endTime - adjustedStart);
  return Math.max(0, Math.min(1, (currentMs - adjustedStart) / adjustedDuration));
};
const LAST_LINE_FALLBACK_MS = 8e3;
const clampLastLineEnd = (lines, trackDurationMs) => {
  if (lines.length === 0) return lines;
  const last = lines[lines.length - 1];
  const reasonable = typeof trackDurationMs === "number" && trackDurationMs > last.startTime ? trackDurationMs : last.startTime + LAST_LINE_FALLBACK_MS;
  if (last.endTime <= reasonable) return lines;
  const clamped = {
    ...last,
    endTime: reasonable,
    words: last.words.map(
      (w, i, arr) => i === arr.length - 1 && w.endTime > reasonable ? { ...w, endTime: reasonable } : w
    )
  };
  return [...lines.slice(0, -1), clamped];
};
const SYNC_DRIFT_THRESHOLD = 300;
let currentNowPlayingMs = 0;
const getNowPlayingCurrentMs = () => currentNowPlayingMs;
const useNowPlayingSync = (options) => {
  const { pickIndex, logTag } = options;
  const track = shallowRef(null);
  const lyric = shallowRef([]);
  const playing = ref(false);
  const primaryIndex = ref(-1);
  let anchorPos = 0;
  let anchorPerf = 0;
  let anchorInitialized = false;
  let rafId = null;
  let lyricOffsetMs = 0;
  let speed = 1;
  const resetAnchor = (positionMs, sendTimestamp) => {
    const ipcDelay = Math.max(0, Date.now() - sendTimestamp);
    anchorPos = positionMs + (playing.value ? ipcDelay : 0);
    anchorPerf = performance.now();
    currentNowPlayingMs = anchorPos + lyricOffsetMs;
    anchorInitialized = true;
  };
  const applySpeed = (nextSpeed) => {
    if (nextSpeed === speed) return;
    if (anchorInitialized && playing.value) {
      anchorPos += (performance.now() - anchorPerf) * speed;
      anchorPerf = performance.now();
    }
    speed = nextSpeed;
  };
  const applyAnchor = (positionMs, sendTimestamp, nextSpeed) => {
    applySpeed(nextSpeed);
    if (!anchorInitialized || !playing.value) {
      resetAnchor(positionMs, sendTimestamp);
      return;
    }
    const ipcDelay = Math.max(0, Date.now() - sendTimestamp);
    const candidate = positionMs + ipcDelay;
    const projected = anchorPos + (performance.now() - anchorPerf) * speed;
    if (Math.abs(candidate - projected) > SYNC_DRIFT_THRESHOLD) {
      resetAnchor(positionMs, sendTimestamp);
    }
  };
  const applySnapshot = (snap) => {
    track.value = snap.track;
    const mainLines = snap.lyric.filter((line) => !line.isBG);
    lyric.value = clampLastLineEnd(mainLines, snap.track?.duration);
    playing.value = snap.playing;
    speed = snap.speed;
    lyricOffsetMs = snap.lyricOffsetMs;
    primaryIndex.value = -1;
    resetAnchor(snap.position, snap.sendTimestamp);
  };
  const syncOnce = () => {
    const next = playing.value ? anchorPos + (performance.now() - anchorPerf) * speed : anchorPos;
    currentNowPlayingMs = next + lyricOffsetMs;
    const idx = pickIndex(lyric.value, currentNowPlayingMs);
    if (idx !== primaryIndex.value) primaryIndex.value = idx;
  };
  const tick = () => {
    syncOnce();
    rafId = playing.value ? requestAnimationFrame(tick) : null;
  };
  const kickTick = () => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(tick);
  };
  const unsubscribers = [];
  onMounted(async () => {
    try {
      const snap = await window.api.nowPlaying.requestSnapshot();
      applySnapshot(snap);
    } catch (error) {
      console.error(`[${logTag}] requestSnapshot failed`, error);
    }
    unsubscribers.push(
      window.api.nowPlaying.onLyricChange((snap) => {
        applySnapshot(snap);
        kickTick();
      }),
      window.api.nowPlaying.onPositionSync((data) => {
        playing.value = data.playing;
        applyAnchor(data.position, data.sendTimestamp, data.speed);
        kickTick();
      }),
      window.api.nowPlaying.onLyricOffsetChange(({ offsetMs }) => {
        lyricOffsetMs = offsetMs;
        syncOnce();
      })
    );
    kickTick();
  });
  onBeforeUnmount(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    for (const off of unsubscribers) off();
  });
  return { track, lyric, playing, primaryIndex };
};
export {
  getWordSweepProgress as a,
  pickAdvanceOnEndIndex as b,
  getNowPlayingCurrentMs as g,
  pickPrimaryIndex as p,
  useNowPlayingSync as u
};
