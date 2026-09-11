import { x as defineComponent, w as watch, k as onMounted, L as onBeforeUnmount, C as openBlock, y as createElementBlock, A as normalizeStyle, v as unref, z as createBaseVNode, F as Fragment, N as renderList, O as toDisplayString, c as computed, r as ref, B as createCommentVNode, M as normalizeClass, D as createVNode, Q as withCtx, P as createBlock, U as Transition, f as reactive, q as shallowRef, K as createApp } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { D as DYNAMIC_ISLAND_BASE_HEIGHT } from "./settings-pA0nXw5U.js";
import { D as DEFAULT_COVER } from "./song-BGJnBQIx.js";
import { a as getWordSweepProgress, g as getNowPlayingCurrentMs, u as useNowPlayingSync, b as pickAdvanceOnEndIndex } from "./useNowPlayingSync-BmSamylX.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { i as isMac } from "./config-Yl8G-1j0.js";
import { f as formatArtists } from "./track-CvXd5ION.js";
const _hoisted_1$1 = { class: "dl-line-inner" };
const _hoisted_2$1 = {
  key: 1,
  class: "dl-static"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "IslandLyricLine",
  props: {
    line: {},
    fontSize: {},
    fontWeight: {},
    wordByWord: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const wordRefs = [];
    const getWordProgress = (word, currentMs) => {
      const progress = getWordSweepProgress(word, props.line.startTime, currentMs);
      const pct = (progress * 100).toFixed(1);
      const px = progress * 4 - 2;
      const signed = px >= 0 ? `+ ${px.toFixed(2)}px` : `- ${(-px).toFixed(2)}px`;
      return `calc(${pct}% ${signed})`;
    };
    const lineStyle = computed(() => ({
      fontSize: `${props.fontSize}px`,
      fontWeight: props.fontWeight
    }));
    const setWordRef = (el, index) => {
      const target = el instanceof Element ? el : el?.$el ?? null;
      if (target instanceof HTMLSpanElement) {
        wordRefs[index] = target;
      } else {
        delete wordRefs[index];
      }
    };
    let rafId = 0;
    let lastWordProgress = [];
    const resetRenderCache = () => {
      lastWordProgress = [];
      wordRefs.length = 0;
    };
    const renderFrame = () => {
      if (!props.wordByWord) {
        rafId = 0;
        return;
      }
      const currentMs = getNowPlayingCurrentMs();
      for (let i = 0; i < props.line.words.length; i++) {
        const el = wordRefs[i];
        if (!el) continue;
        const progress = getWordProgress(props.line.words[i], currentMs);
        if (lastWordProgress[i] !== progress) {
          lastWordProgress[i] = progress;
          el.style.setProperty("--p", progress);
        }
      }
      rafId = requestAnimationFrame(renderFrame);
    };
    const startRenderLoop = () => {
      if (rafId === 0 && props.wordByWord) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };
    const stopRenderLoop = () => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };
    watch(
      () => props.wordByWord,
      (enabled) => {
        resetRenderCache();
        if (enabled) startRenderLoop();
        else stopRenderLoop();
      }
    );
    watch(() => props.line, resetRenderCache);
    onMounted(startRenderLoop);
    onBeforeUnmount(stopRenderLoop);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "dl-line",
        style: normalizeStyle(unref(lineStyle))
      }, [
        createBaseVNode("span", _hoisted_1$1, [
          __props.wordByWord ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.line.words, (word, i) => {
            return openBlock(), createElementBlock("span", {
              key: i,
              ref_for: true,
              ref: (el) => setWordRef(el, i),
              class: "dl-word"
            }, toDisplayString(word.word), 1);
          }), 128)) : (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(__props.line.words.map((w) => w.word).join("")), 1))
        ])
      ], 4);
    };
  }
});
const IslandLyricLine = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a590faea"]]);
const useDragWindow = () => {
  let dragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let dragPointerId = -1;
  let dragTarget = null;
  let moveRafPending = false;
  let pendingX = 0;
  let pendingY = 0;
  const flushMove = () => {
    moveRafPending = false;
    window.api.dynamicIsland.move(pendingX, pendingY);
  };
  const onPointerMove = (event) => {
    if (!dragging) return;
    pendingX = Math.round(event.screenX - dragOffsetX);
    pendingY = Math.round(event.screenY - dragOffsetY);
    if (!moveRafPending) {
      moveRafPending = true;
      requestAnimationFrame(flushMove);
    }
  };
  const onPointerUp = () => {
    if (!dragging) return;
    dragging = false;
    if (dragTarget && dragPointerId !== -1) {
      try {
        dragTarget.releasePointerCapture(dragPointerId);
      } catch {
      }
    }
    dragTarget?.removeEventListener("pointermove", onPointerMove);
    dragTarget?.removeEventListener("pointerup", onPointerUp);
    dragTarget?.removeEventListener("pointercancel", onPointerUp);
    dragTarget = null;
    dragPointerId = -1;
    window.api.dynamicIsland.saveState();
  };
  const onRootPointerDown = (event) => {
    if (event.button !== 0) return;
    const target = event.target;
    if (!target || target.closest(".no-drag")) return;
    dragging = true;
    dragOffsetX = event.clientX;
    dragOffsetY = event.clientY;
    dragPointerId = event.pointerId;
    dragTarget = target;
    try {
      target.setPointerCapture(event.pointerId);
    } catch {
    }
    target.addEventListener("pointermove", onPointerMove);
    target.addEventListener("pointerup", onPointerUp);
    target.addEventListener("pointercancel", onPointerUp);
    event.preventDefault();
  };
  onBeforeUnmount(() => {
    if (dragTarget) {
      dragTarget.removeEventListener("pointermove", onPointerMove);
      dragTarget.removeEventListener("pointerup", onPointerUp);
      dragTarget.removeEventListener("pointercancel", onPointerUp);
    }
  });
  return { onRootPointerDown };
};
const _hoisted_1 = ["viewBox"];
const _hoisted_2 = ["d"];
const _hoisted_3 = { class: "content" };
const _hoisted_4 = { class: "cover" };
const _hoisted_5 = ["src"];
const _hoisted_6 = { class: "main-line" };
const NOTCH_WIDTH = 181;
const NOTCH_HEIGHT = 29;
const NOTCH_TOP_FILL = 3;
const SHAPE_SIDE_OVERHANG = 5;
const MAX_WINDOW_WIDTH = 620;
const MAX_WINDOW_WIDTH_RATIO = 0.55;
const MIN_LYRIC_SCALE = 0.78;
const BOUNCE_OVERSHOOT = 0.15;
const SMOOTH_OVERSHOOT = 0.15;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const config = reactive({
      scale: 1,
      fontWeight: 500,
      fontFamily: "",
      wordByWord: true,
      transition: "bounce",
      playedColor: "rgba(255, 255, 255, 1)",
      unplayedColor: "rgba(255, 255, 255, 0.5)",
      backgroundColor: "rgba(0, 0, 0, 1)",
      alwaysOnTop: true,
      snapCentered: true,
      notchFusion: false,
      nonOcclusive: false,
      doubleLine: false,
      showTranslation: false,
      useCSSDrag: false
    });
    const MIN_SHAPE_WIDTH = NOTCH_WIDTH + SHAPE_SIDE_OVERHANG * 2;
    const hovering = ref(false);
    const mainRowHeight = computed(() => Math.round(DYNAMIC_ISLAND_BASE_HEIGHT * config.scale));
    const padX = computed(() => Math.round(mainRowHeight.value * 0.4));
    const gap = computed(() => Math.round(mainRowHeight.value * 0.25));
    const coverSize = computed(() => Math.round(mainRowHeight.value * 0.65));
    const coverRadius = computed(() => Math.max(6, Math.round(coverSize.value * 0.35)));
    const fontSize = computed(() => Math.max(13, Math.round(mainRowHeight.value * 0.5)));
    const snapRadius = computed(() => Math.round(mainRowHeight.value * 0.6));
    const shapeBottomRadius = computed(() => Math.max(14, Math.round(coverRadius.value * 2)));
    const subFontSize = computed(() => Math.max(11, Math.round(fontSize.value * 0.65)));
    const subRowHeight = computed(() => Math.round(subFontSize.value * 1.2));
    const { track, lyric, primaryIndex } = useNowPlayingSync({
      pickIndex: pickAdvanceOnEndIndex,
      logTag: "dynamic-island"
    });
    const { onRootPointerDown } = useDragWindow();
    const mode = ref("snapped");
    const viewportWidth = ref(Math.max(MIN_SHAPE_WIDTH, window.innerWidth || MIN_SHAPE_WIDTH));
    const viewportHeight = ref(Math.max(NOTCH_HEIGHT, window.innerHeight || NOTCH_HEIGHT));
    const animatedShapeWidth = ref(viewportWidth.value);
    let smoothShapeWidth = viewportWidth.value;
    const notchFusionEnabled = computed(() => isMac && config.notchFusion && mode.value === "snapped");
    const measureCtx = document.createElement("canvas").getContext("2d");
    const measureTextWidth = (text, sizePx = fontSize.value) => {
      const family = config.fontFamily || getComputedStyle(document.documentElement).fontFamily;
      measureCtx.font = `${config.fontWeight} ${sizePx}px ${family}`;
      return Math.ceil(measureCtx.measureText(text).width);
    };
    const artistsText = computed(() => formatArtists(track.value?.artists) || "未知艺术家");
    const currentLine = computed(() => {
      const idx = primaryIndex.value;
      if (idx < 0) return null;
      return lyric.value[idx] ?? null;
    });
    const fallbackText = computed(() => {
      const t = track.value;
      if (!t) return "SPlayer Next";
      return artistsText.value ? `${t.title} - ${artistsText.value}` : t.title;
    });
    const displayLine = shallowRef(null);
    const displayFallback = ref("SPlayer Next");
    const displayIndex = ref(-1);
    const displaySubText = ref("");
    const showSubLine = computed(() => config.doubleLine || displaySubText.value !== "");
    const contentHeight = computed(
      () => mainRowHeight.value + (showSubLine.value ? subRowHeight.value : 0)
    );
    const windowHeight = computed(
      () => contentHeight.value + (notchFusionEnabled.value ? NOTCH_HEIGHT + NOTCH_TOP_FILL : 0)
    );
    const rawLyricWidth = ref(measureTextWidth(displayFallback.value));
    const lyricWidth = ref(rawLyricWidth.value);
    const lyricOpacity = ref(1);
    const shrinking = ref(false);
    let phase = "idle";
    let hasPainted = false;
    const lineText = (line) => line.words.map((w) => w.word).join("");
    const computeSubText = (idx, line) => {
      if (config.showTranslation && line?.translatedLyric) return line.translatedLyric;
      if (!config.doubleLine || idx < 0) return "";
      const next = lyric.value[idx + 1];
      return next ? lineText(next) : "";
    };
    const measureTarget = () => {
      const line = currentLine.value;
      const mainText = line ? lineText(line) : fallbackText.value;
      const mainPx = Math.max(1, measureTextWidth(mainText));
      const subText = computeSubText(primaryIndex.value, line);
      const subPx = subText ? measureTextWidth(subText, subFontSize.value) : 0;
      return Math.max(mainPx, subPx);
    };
    const getRendererWindowLimit = () => Math.max(
      MIN_SHAPE_WIDTH,
      Math.min(MAX_WINDOW_WIDTH, Math.floor(window.screen.width * MAX_WINDOW_WIDTH_RATIO))
    );
    const fixedContentWidth = computed(() => padX.value * 2 + coverSize.value + gap.value);
    const shapeExtraWidth = computed(() => notchFusionEnabled.value ? SHAPE_SIDE_OVERHANG * 2 : 0);
    const maxLyricSlotWidth = computed(() => {
      const windowLimit = getRendererWindowLimit();
      const currentWindowWidth = Math.max(MIN_SHAPE_WIDTH, viewportWidth.value);
      return Math.max(
        1,
        Math.min(windowLimit, currentWindowWidth) - fixedContentWidth.value - shapeExtraWidth.value
      );
    });
    const getLyricSlotWidth = (lyricPx) => notchFusionEnabled.value ? Math.min(Math.max(1, Math.round(lyricPx)), maxLyricSlotWidth.value) : Math.max(1, Math.round(lyricPx));
    const computeWindowWidth = (lyricPx) => {
      const overshoot = config.transition === "bounce" ? BOUNCE_OVERSHOOT : config.transition === "smooth" && !notchFusionEnabled.value ? SMOOTH_OVERSHOOT : 0;
      const overshootExtra = Math.ceil(lyricPx * overshoot);
      return Math.max(
        notchFusionEnabled.value ? MIN_SHAPE_WIDTH : 1,
        fixedContentWidth.value + lyricPx + overshootExtra + shapeExtraWidth.value
      );
    };
    const resizeWindow = (lyricPx) => {
      const targetWidth = computeWindowWidth(lyricPx);
      if (config.transition === "smooth" && !notchFusionEnabled.value) {
        if (pendingWindowShrinkTimer !== null) {
          window.clearTimeout(pendingWindowShrinkTimer);
          pendingWindowShrinkTimer = null;
        }
        const currentWidth2 = Math.max(1, viewportWidth.value);
        if (targetWidth >= currentWidth2) {
          window.api.dynamicIsland.resize(targetWidth);
        }
        if (targetWidth >= smoothShapeWidth) {
          smoothShapeWidth = targetWidth;
          window.api.dynamicIsland.setShape(targetWidth);
        } else {
          pendingWindowShrinkTimer = window.setTimeout(() => {
            pendingWindowShrinkTimer = null;
            if (config.transition === "smooth" && !notchFusionEnabled.value) {
              smoothShapeWidth = targetWidth;
              window.api.dynamicIsland.setShape(targetWidth);
            }
          }, 520);
        }
        return;
      }
      smoothShapeWidth = viewportWidth.value;
      window.api.dynamicIsland.setShape(null);
      if (!notchFusionEnabled.value) {
        if (pendingWindowShrinkTimer !== null) {
          window.clearTimeout(pendingWindowShrinkTimer);
          pendingWindowShrinkTimer = null;
        }
        window.api.dynamicIsland.resize(targetWidth);
        return;
      }
      const currentWidth = Math.max(MIN_SHAPE_WIDTH, viewportWidth.value);
      if (targetWidth >= currentWidth) {
        if (pendingWindowShrinkTimer !== null) {
          window.clearTimeout(pendingWindowShrinkTimer);
          pendingWindowShrinkTimer = null;
        }
        window.api.dynamicIsland.resize(targetWidth);
        requestAnimationFrame(() => {
          animatedShapeWidth.value = targetWidth;
        });
        return;
      }
      animatedShapeWidth.value = targetWidth;
      if (pendingWindowShrinkTimer !== null) {
        window.clearTimeout(pendingWindowShrinkTimer);
      }
      pendingWindowShrinkTimer = window.setTimeout(() => {
        pendingWindowShrinkTimer = null;
        if (notchFusionEnabled.value) {
          window.api.dynamicIsland.resize(targetWidth);
        }
      }, 520);
    };
    const applyMeasuredWidth = (targetPx) => {
      rawLyricWidth.value = targetPx;
      lyricWidth.value = getLyricSlotWidth(targetPx);
      resizeWindow(targetPx);
    };
    const truncateTextToWidth = (text, maxWidth, sizePx) => {
      if (!text || measureTextWidth(text, sizePx) <= maxWidth) return text;
      const ellipsis = "...";
      const ellipsisWidth = measureTextWidth(ellipsis, sizePx);
      if (maxWidth <= ellipsisWidth) return ellipsis;
      let low = 0;
      let high = text.length;
      while (low < high) {
        const mid = Math.ceil((low + high) / 2);
        if (measureTextWidth(`${text.slice(0, mid)}${ellipsis}`, sizePx) <= maxWidth) {
          low = mid;
        } else {
          high = mid - 1;
        }
      }
      return `${text.slice(0, low)}${ellipsis}`;
    };
    const applyImmediate = () => {
      displayLine.value = currentLine.value;
      displayFallback.value = fallbackText.value;
      displayIndex.value = primaryIndex.value;
      displaySubText.value = computeSubText(primaryIndex.value, currentLine.value);
      const targetPx = measureTarget();
      shrinking.value = false;
      lyricOpacity.value = 1;
      applyMeasuredWidth(targetPx);
      phase = "expanding";
    };
    const startSwapAnimation = () => {
      phase = "shrinking";
      shrinking.value = true;
      lyricWidth.value = 0;
      lyricOpacity.value = 0;
    };
    const startSmoothAnimation = () => {
      displayLine.value = currentLine.value;
      displayFallback.value = fallbackText.value;
      displayIndex.value = primaryIndex.value;
      displaySubText.value = computeSubText(primaryIndex.value, currentLine.value);
      applyMeasuredWidth(measureTarget());
      phase = "idle";
    };
    const onLyricTransitionEnd = (event) => {
      if (event.propertyName !== "width") return;
      if (phase === "shrinking") {
        displayLine.value = currentLine.value;
        displayFallback.value = fallbackText.value;
        displayIndex.value = primaryIndex.value;
        displaySubText.value = computeSubText(primaryIndex.value, currentLine.value);
        const targetPx = measureTarget();
        rawLyricWidth.value = targetPx;
        resizeWindow(targetPx);
        requestAnimationFrame(() => {
          if (phase !== "shrinking") return;
          shrinking.value = false;
          requestAnimationFrame(() => {
            if (phase !== "shrinking") return;
            phase = "expanding";
            lyricOpacity.value = 1;
            lyricWidth.value = getLyricSlotWidth(targetPx);
          });
        });
      } else if (phase === "expanding") {
        phase = "idle";
      }
    };
    watch([() => config.doubleLine, () => config.showTranslation], () => {
      displaySubText.value = computeSubText(displayIndex.value, displayLine.value);
      if (phase !== "idle") return;
      const targetPx = measureTarget();
      applyMeasuredWidth(targetPx);
    });
    watch([() => config.scale, () => config.fontWeight, () => config.fontFamily], () => {
      if (phase !== "idle") return;
      const targetPx = measureTarget();
      applyMeasuredWidth(targetPx);
    });
    watch(notchFusionEnabled, () => {
      if (phase !== "idle") return;
      const targetPx = measureTarget();
      applyMeasuredWidth(targetPx);
    });
    watch([currentLine, fallbackText], () => {
      const newLine = currentLine.value;
      const changed = newLine ? displayIndex.value !== primaryIndex.value : displayFallback.value !== fallbackText.value;
      if (!changed) return;
      if (config.transition === "smooth") {
        startSmoothAnimation();
        return;
      }
      if (phase === "shrinking") return;
      if (!hasPainted || lyricWidth.value === 0) {
        applyImmediate();
        return;
      }
      startSwapAnimation();
    });
    watch(
      () => config.transition,
      () => {
        shrinking.value = false;
        lyricOpacity.value = 1;
        phase = "idle";
        startSmoothAnimation();
      }
    );
    const lyricScale = computed(() => {
      if (!notchFusionEnabled.value) return 1;
      const rawWidth = Math.max(1, rawLyricWidth.value);
      const slotWidth = Math.max(1, lyricWidth.value);
      return Math.max(MIN_LYRIC_SCALE, Math.min(1, slotWidth / rawWidth));
    });
    const lyricLayoutWidth = computed(
      () => Math.max(1, Math.floor(Math.max(1, lyricWidth.value) / lyricScale.value))
    );
    const displayMainText = computed(
      () => displayLine.value ? lineText(displayLine.value) : displayFallback.value
    );
    const lyricContentKey = computed(
      () => displayLine.value ? `line-${displayIndex.value}` : `fallback-${displayFallback.value}`
    );
    const fittedMainText = computed(
      () => notchFusionEnabled.value ? truncateTextToWidth(displayMainText.value, lyricLayoutWidth.value, fontSize.value) : displayMainText.value
    );
    const mainTextTruncated = computed(() => fittedMainText.value !== displayMainText.value);
    const fittedDisplayLine = computed(() => {
      const line = displayLine.value;
      if (!line || !mainTextTruncated.value) return line;
      return {
        ...line,
        words: [
          {
            startTime: line.startTime,
            endTime: line.endTime,
            word: fittedMainText.value
          }
        ]
      };
    });
    const fittedSubText = computed(
      () => notchFusionEnabled.value ? truncateTextToWidth(displaySubText.value, lyricLayoutWidth.value, subFontSize.value) : displaySubText.value
    );
    const shapeWidth = computed(
      () => Math.max(
        MIN_SHAPE_WIDTH,
        Math.round(notchFusionEnabled.value ? animatedShapeWidth.value : viewportWidth.value)
      )
    );
    const shapeHeight = computed(() => Math.max(windowHeight.value, Math.round(viewportHeight.value)));
    const notchPath = computed(() => {
      const width = shapeWidth.value;
      const height = shapeHeight.value;
      const overhang = Math.min(SHAPE_SIDE_OVERHANG, width / 4);
      const bodyLeft = overhang;
      const bodyRight = width - overhang;
      const topArc = Math.min(overhang, height / 4);
      const bottomRadius = Math.min(shapeBottomRadius.value, width / 2, height / 2);
      return [
        "M 0 0",
        `L ${width} 0`,
        `Q ${bodyRight} 0 ${bodyRight} ${topArc}`,
        `L ${bodyRight} ${height - bottomRadius}`,
        `Q ${bodyRight} ${height} ${bodyRight - bottomRadius} ${height}`,
        `L ${bodyLeft + bottomRadius} ${height}`,
        `Q ${bodyLeft} ${height} ${bodyLeft} ${height - bottomRadius}`,
        `L ${bodyLeft} ${topArc}`,
        `Q ${bodyLeft} 0 0 0`,
        "Z"
      ].join(" ");
    });
    const rootStyle = computed(() => ({
      "--di-played": config.playedColor,
      "--di-unplayed": config.unplayedColor,
      "--di-bg": config.backgroundColor,
      "--di-padx": `${padX.value}px`,
      "--di-gap": `${gap.value}px`,
      "--di-cover": `${coverSize.value}px`,
      "--di-cover-radius": `${coverRadius.value}px`,
      "--di-side-overhang": `${notchFusionEnabled.value ? SHAPE_SIDE_OVERHANG : 0}px`,
      "--di-row": `${mainRowHeight.value}px`,
      "--di-content-height": `${contentHeight.value}px`,
      "--di-notch": `${NOTCH_HEIGHT}px`,
      "--di-shape-width": `${shapeWidth.value}px`,
      "--di-fusion-content-width": `${Math.max(1, shapeWidth.value - SHAPE_SIDE_OVERHANG * 2)}px`,
      "--di-snap-radius": `${snapRadius.value}px`,
      "--di-lyric-scale": lyricScale.value,
      fontFamily: config.fontFamily || void 0,
      "-webkit-app-region": config.useCSSDrag ? "drag" : "no-drag"
    }));
    const syncViewportSize = () => {
      viewportWidth.value = Math.max(MIN_SHAPE_WIDTH, window.innerWidth || MIN_SHAPE_WIDTH);
      viewportHeight.value = Math.max(NOTCH_HEIGHT, window.innerHeight || NOTCH_HEIGHT);
      if (!notchFusionEnabled.value) {
        animatedShapeWidth.value = viewportWidth.value;
      }
    };
    watch(
      maxLyricSlotWidth,
      () => {
        if (phase === "shrinking") return;
        lyricWidth.value = getLyricSlotWidth(rawLyricWidth.value);
      },
      { flush: "post" }
    );
    let unsubConfig = null;
    let unsubMode = null;
    let unsubCursor = null;
    let pendingWindowShrinkTimer = null;
    watch(
      windowHeight,
      (h) => {
        window.api.dynamicIsland.setHeight(h);
      },
      /* flush: "post" 让同一批响应式变化合并后只发一次 IPC */
      { flush: "post" }
    );
    onMounted(async () => {
      syncViewportSize();
      window.addEventListener("resize", syncViewportSize);
      resizeWindow(rawLyricWidth.value);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          hasPainted = true;
        });
      });
      try {
        const [saved, currentMode] = await Promise.all([
          window.api.config.get("dynamicIsland"),
          window.api.dynamicIsland.getMode()
        ]);
        Object.assign(config, saved);
        mode.value = currentMode;
      } catch (error) {
        console.error("[dynamic-island] load state failed", error);
      }
      unsubConfig = window.api.dynamicIsland.onConfigChange(
        (next) => Object.assign(config, next)
      );
      unsubMode = window.api.dynamicIsland.onModeChange((next) => {
        mode.value = next;
      });
      unsubCursor = window.api.dynamicIsland.onCursorInside((inside) => {
        hovering.value = inside;
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", syncViewportSize);
      if (pendingWindowShrinkTimer !== null) {
        window.clearTimeout(pendingWindowShrinkTimer);
        pendingWindowShrinkTimer = null;
      }
      unsubConfig?.();
      unsubConfig = null;
      unsubMode?.();
      unsubMode = null;
      unsubCursor?.();
      unsubCursor = null;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["root", [
          unref(mode) === "snapped" ? "is-snapped" : "is-floating",
          {
            "is-hidden": unref(config).nonOcclusive && unref(hovering),
            "is-notch-fusion": unref(notchFusionEnabled),
            "is-smooth": unref(config).transition === "smooth"
          }
        ]]),
        style: normalizeStyle(unref(rootStyle)),
        onPointerdown: _cache[1] || (_cache[1] = //@ts-ignore
        (...args) => unref(onRootPointerDown) && unref(onRootPointerDown)(...args))
      }, [
        unref(notchFusionEnabled) ? (openBlock(), createElementBlock("svg", {
          key: 0,
          class: "notch-shape",
          viewBox: `0 0 ${unref(shapeWidth)} ${unref(shapeHeight)}`,
          preserveAspectRatio: "none",
          "aria-hidden": "true"
        }, [
          createBaseVNode("path", {
            d: unref(notchPath),
            fill: "var(--di-bg)"
          }, null, 8, _hoisted_2)
        ], 8, _hoisted_1)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("img", {
              src: unref(track)?.cover || unref(DEFAULT_COVER),
              alt: "cover",
              draggable: "false",
              decoding: "async",
              onError: _cache[0] || (_cache[0] = ($event) => $event.target.src = unref(DEFAULT_COVER))
            }, null, 40, _hoisted_5)
          ]),
          createBaseVNode("div", {
            class: normalizeClass(["lyric", { "is-shrinking": unref(shrinking) }]),
            style: normalizeStyle({ width: `${unref(lyricWidth)}px`, opacity: unref(lyricOpacity) }),
            onTransitionend: onLyricTransitionEnd
          }, [
            createBaseVNode("div", {
              class: "lyric-scale",
              style: normalizeStyle(
                unref(notchFusionEnabled) ? { width: `${unref(lyricLayoutWidth)}px`, transform: `scale(${unref(lyricScale)})` } : {}
              )
            }, [
              createVNode(Transition, { name: "lyric-roll" }, {
                default: withCtx(() => [
                  (openBlock(), createElementBlock("div", {
                    key: unref(lyricContentKey),
                    class: "lyric-content"
                  }, [
                    createBaseVNode("div", _hoisted_6, [
                      unref(fittedDisplayLine) ? (openBlock(), createBlock(IslandLyricLine, {
                        key: 0,
                        line: unref(fittedDisplayLine),
                        "font-size": unref(fontSize),
                        "font-weight": unref(config).fontWeight,
                        "word-by-word": unref(config).wordByWord && !unref(mainTextTruncated)
                      }, null, 8, ["line", "font-size", "font-weight", "word-by-word"])) : (openBlock(), createElementBlock("div", {
                        key: 1,
                        class: "fallback",
                        style: normalizeStyle({ fontSize: `${unref(fontSize)}px` })
                      }, toDisplayString(unref(fittedMainText)), 5))
                    ]),
                    unref(showSubLine) ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: "sub-line",
                      style: normalizeStyle({ fontSize: `${unref(subFontSize)}px` })
                    }, toDisplayString(unref(fittedSubText)), 5)) : createCommentVNode("", true)
                  ]))
                ]),
                _: 1
              })
            ], 4)
          ], 38)
        ])
      ], 38);
    };
  }
});
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e7dab834"]]);
createApp(App).mount("#app");
