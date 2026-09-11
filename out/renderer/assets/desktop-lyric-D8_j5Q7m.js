import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode, x as defineComponent, w as watch, k as onMounted, L as onBeforeUnmount, A as normalizeStyle, v as unref, M as normalizeClass, F as Fragment, N as renderList, O as toDisplayString, r as ref, c as computed, n as nextTick, B as createCommentVNode, D as createVNode, P as createBlock, Q as withCtx, R as resolveDynamicComponent, S as TransitionGroup, f as reactive, K as createApp } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { _ as __unplugin_components_11 } from "./x-Cd6Sow4a.js";
import { I as IconLucideSettings } from "./settings-Bkp-h7-N.js";
import { _ as __unplugin_components_5$1, a as __unplugin_components_9 } from "./skip-back-B9n6BSsM.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { I as IconLucidePause } from "./pause-u3QmqHX9.js";
import { g as getNowPlayingCurrentMs, a as getWordSweepProgress, u as useNowPlayingSync, p as pickPrimaryIndex } from "./useNowPlayingSync-BmSamylX.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { f as formatArtists } from "./track-CvXd5ION.js";
import { a as isLinux } from "./config-Yl8G-1j0.js";
const _hoisted_1$3 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("rect", {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2"
      }),
      createBaseVNode("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
    ], -1)
  ])]);
}
const __unplugin_components_6 = markRaw({ name: "lucide-lock", render: render$1 });
const _hoisted_1$2 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("rect", {
        width: "18",
        height: "11",
        x: "3",
        y: "11",
        rx: "2",
        ry: "2"
      }),
      createBaseVNode("path", { d: "M7 11V7a5 5 0 0 1 9.9-1" })
    ], -1)
  ])]);
}
const __unplugin_components_5 = markRaw({ name: "lucide-unlock", render });
const computeHorizontalScrollRange = (containerWidth, contentWidth, contentLeft) => {
  const distance = contentWidth - containerWidth;
  if (distance <= 0.5) return { startOffset: 0, distance: 0 };
  return { startOffset: contentLeft === 0 ? 0 : -contentLeft, distance };
};
const measureHorizontalScrollRange = (container, content) => computeHorizontalScrollRange(container.clientWidth, content.scrollWidth, content.offsetLeft);
const HORIZONTAL_SCROLL_START_RATIO = 0.3;
const HORIZONTAL_SCROLL_END_MARGIN_MS = 2e3;
const HORIZONTAL_SCROLL_END_MARGIN_RATIO = 0.2;
const MIN_HORIZONTAL_SCROLL_DURATION_MS = 1200;
const computeHorizontalScrollOffset = (options) => {
  const { currentMs, activatedAtMs, lineStartTime, lineEndTime, startOffset, distance } = options;
  if (distance <= 0) return startOffset;
  const scrollStartTime = Math.max(lineStartTime, activatedAtMs);
  const naturalDuration = Math.max(0, lineEndTime - scrollStartTime);
  const duration = Math.max(MIN_HORIZONTAL_SCROLL_DURATION_MS, naturalDuration);
  const endMargin = Math.min(
    HORIZONTAL_SCROLL_END_MARGIN_MS,
    duration * HORIZONTAL_SCROLL_END_MARGIN_RATIO
  );
  const motionDuration = Math.max(1, duration - endMargin);
  const progress = Math.max(0, Math.min(1, (currentMs - scrollStartTime) / motionDuration));
  if (progress <= HORIZONTAL_SCROLL_START_RATIO) return startOffset;
  const ratio = (progress - HORIZONTAL_SCROLL_START_RATIO) / (1 - HORIZONTAL_SCROLL_START_RATIO);
  return startOffset - distance * ratio;
};
const hasRealWordTiming = (line) => {
  if (line.words.length <= 1) return false;
  const first = line.words[0];
  return first.endTime > first.startTime;
};
const makePlaceholderLine = (text) => ({
  words: [{ word: text, startTime: 0, endTime: 0 }],
  translatedLyric: "",
  romanLyric: "",
  startTime: 0,
  endTime: 0,
  isBG: false,
  isDuet: false
});
const getLineTop = (index, fontSize) => {
  if (index === 0) return "0px";
  return `${Math.round(fontSize * 1.6)}px`;
};
const MIN_FONT_SIZE = 20;
const MAX_FONT_SIZE = 96;
const MIN_WINDOW_HEIGHT = 140;
const MAX_WINDOW_HEIGHT = 360;
const computeWindowHeight = (fontSize) => {
  const clamped = Math.min(Math.max(Math.round(fontSize), MIN_FONT_SIZE), MAX_FONT_SIZE);
  const ratio = (clamped - MIN_FONT_SIZE) / (MAX_FONT_SIZE - MIN_FONT_SIZE);
  return Math.round(MIN_WINDOW_HEIGHT + ratio * (MAX_WINDOW_HEIGHT - MIN_WINDOW_HEIGHT));
};
const resolveAlign = (index, baseAlign) => {
  if (baseAlign !== "justify") return baseAlign;
  return index % 2 === 0 ? "left" : "right";
};
const resolveWordByWord = (config, item) => {
  if (!config.wordByWord) return false;
  if (item.isPlaceholder) return false;
  if (config.autoGenerateWordByWord) return true;
  return hasRealWordTiming(item.line);
};
const _hoisted_1$1 = { class: "dl-text" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LyricLine",
  props: {
    line: {},
    fontSize: {},
    fontWeight: {},
    align: {},
    wordByWord: { type: Boolean },
    scrollEnabled: { type: Boolean },
    isNext: { type: Boolean },
    backgroundMask: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const containerRef = ref(null);
    const contentRef = ref(null);
    const wordRefs = [];
    const overflowPx = ref(0);
    const scrollStartPx = ref(0);
    const getWordProgress = (word, currentMs) => {
      const progress = getWordSweepProgress(word, props.line.startTime, currentMs);
      const pct = (progress * 100).toFixed(1);
      const px = progress * 6 - 3;
      const signed = px >= 0 ? `+ ${px.toFixed(2)}px` : `- ${(-px).toFixed(2)}px`;
      return `calc(${pct}% ${signed})`;
    };
    const lineStyle = computed(() => ({
      fontSize: `${props.fontSize}px`,
      fontWeight: props.fontWeight,
      textAlign: props.align
    }));
    const blockStyle = computed(() => ({
      "--dl-origin": props.align === "left" ? "var(--dl-pad)" : props.align === "right" ? "calc(100% - var(--dl-pad))" : "50%"
    }));
    const getScrollTransform = (currentMs) => {
      const overflow = overflowPx.value;
      if (overflow <= 0) return "translateX(0)";
      const { startTime, endTime } = props.line;
      const offset = computeHorizontalScrollOffset({
        currentMs,
        activatedAtMs: scrollActivatedAtMs,
        lineStartTime: startTime,
        lineEndTime: endTime,
        startOffset: scrollStartPx.value,
        distance: overflow
      });
      return `translateX(${offset.toFixed(3)}px)`;
    };
    const measure = () => {
      const outer = containerRef.value;
      const inner = contentRef.value;
      if (!outer || !inner) {
        overflowPx.value = 0;
        scrollStartPx.value = 0;
        return;
      }
      const range = measureHorizontalScrollRange(outer, inner);
      overflowPx.value = range.distance;
      scrollStartPx.value = range.startOffset;
    };
    const setWordRef = (el, index) => {
      const target = el instanceof Element ? el : el?.$el ?? null;
      if (target instanceof HTMLSpanElement) {
        wordRefs[index] = target;
      } else {
        delete wordRefs[index];
      }
    };
    let resizeObs = null;
    let rafId = 0;
    let lastTransform = "";
    let lastWordProgress = [];
    let scrollActivatedAtMs = props.line.startTime;
    const resetRenderCache = () => {
      lastTransform = "";
      lastWordProgress = [];
    };
    const needsRaf = () => props.wordByWord || props.scrollEnabled && overflowPx.value > 0;
    const resetScrollPosition = () => {
      const inner = contentRef.value;
      if (!inner) return;
      const transform = overflowPx.value > 0 ? `translateX(${scrollStartPx.value.toFixed(3)}px)` : "translateX(0)";
      lastTransform = transform;
      inner.style.transform = transform;
    };
    const activateScroll = () => {
      scrollActivatedAtMs = Math.max(props.line.startTime, getNowPlayingCurrentMs());
      resetRenderCache();
      resetScrollPosition();
    };
    const renderFrame = () => {
      if (!needsRaf()) {
        rafId = 0;
        return;
      }
      const currentMs = getNowPlayingCurrentMs();
      if (props.scrollEnabled && contentRef.value && overflowPx.value > 0) {
        const transform = getScrollTransform(currentMs);
        if (transform !== lastTransform) {
          lastTransform = transform;
          contentRef.value.style.transform = transform;
        }
      }
      if (props.wordByWord) {
        for (let i = 0; i < props.line.words.length; i++) {
          const el = wordRefs[i];
          if (!el) continue;
          const progress = getWordProgress(props.line.words[i], currentMs);
          if (lastWordProgress[i] !== progress) {
            lastWordProgress[i] = progress;
            el.style.setProperty("--p", progress);
          }
        }
      }
      rafId = requestAnimationFrame(renderFrame);
    };
    const startRenderLoop = () => {
      if (rafId === 0 && needsRaf()) {
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
      () => [props.fontSize, props.fontWeight, props.align, props.backgroundMask],
      () => nextTick(measure)
    );
    watch(
      () => [props.wordByWord, overflowPx.value, scrollStartPx.value],
      () => {
        resetRenderCache();
        if (needsRaf()) {
          startRenderLoop();
        } else {
          stopRenderLoop();
          resetScrollPosition();
        }
      }
    );
    watch(
      () => props.scrollEnabled,
      (enabled) => {
        if (enabled) {
          activateScroll();
        } else {
          resetRenderCache();
          resetScrollPosition();
        }
        if (needsRaf()) startRenderLoop();
        else stopRenderLoop();
      }
    );
    watch(
      () => props.line,
      () => {
        scrollActivatedAtMs = props.scrollEnabled ? Math.max(props.line.startTime, getNowPlayingCurrentMs()) : props.line.startTime;
        resetRenderCache();
        nextTick(() => {
          measure();
          resetScrollPosition();
          startRenderLoop();
        });
      }
    );
    const onTransitionEnd = (event) => {
      if (event.propertyName === "font-size") measure();
    };
    onMounted(() => {
      measure();
      scrollActivatedAtMs = props.scrollEnabled ? Math.max(props.line.startTime, getNowPlayingCurrentMs()) : props.line.startTime;
      resetScrollPosition();
      resizeObs = new ResizeObserver(measure);
      if (containerRef.value) {
        resizeObs.observe(containerRef.value);
        containerRef.value.addEventListener("transitionend", onTransitionEnd);
      }
      if (contentRef.value) resizeObs.observe(contentRef.value);
      startRenderLoop();
    });
    onBeforeUnmount(() => {
      stopRenderLoop();
      resizeObs?.disconnect();
      resizeObs = null;
      containerRef.value?.removeEventListener("transitionend", onTransitionEnd);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "dl-line-block",
        style: normalizeStyle(unref(blockStyle))
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: containerRef,
          class: "dl-line",
          style: normalizeStyle(unref(lineStyle))
        }, [
          createBaseVNode("span", {
            ref_key: "contentRef",
            ref: contentRef,
            class: normalizeClass(["dl-line-inner", { "has-mask": __props.backgroundMask }])
          }, [
            createBaseVNode("span", _hoisted_1$1, [
              __props.wordByWord ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.line.words, (word, i) => {
                return openBlock(), createElementBlock("span", {
                  key: i,
                  ref_for: true,
                  ref: (el) => setWordRef(el, i),
                  class: "dl-word"
                }, toDisplayString(word.word), 1);
              }), 128)) : (openBlock(), createElementBlock("span", {
                key: 1,
                class: normalizeClass(["dl-static", { "is-unplayed": __props.isNext }])
              }, toDisplayString(__props.line.words.map((w) => w.word).join("")), 3))
            ])
          ], 2)
        ], 4)
      ], 4);
    };
  }
});
const LyricLine = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1142a893"]]);
const RESIZE_BORDER_WIDTH = 8;
const useDragWindow = (isDisabled) => {
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
    window.api.desktopLyric.move(pendingX, pendingY);
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
    window.api.desktopLyric.saveState();
  };
  const onRootPointerDown = (event) => {
    if (isDisabled()) return;
    if (event.button !== 0) return;
    const inResizeBorder = event.clientX <= RESIZE_BORDER_WIDTH || event.clientX >= window.innerWidth - RESIZE_BORDER_WIDTH || event.clientY <= RESIZE_BORDER_WIDTH || event.clientY >= window.innerHeight - RESIZE_BORDER_WIDTH;
    if (inResizeBorder) return;
    const target = event.target;
    if (!target || target.closest(".header-btn")) return;
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
const useHoverState = () => {
  const isHovered = ref(false);
  let unsubscribe = null;
  onMounted(() => {
    unsubscribe = window.api.desktopLyric.onCursorInside((inside) => {
      isHovered.value = inside;
    });
  });
  onBeforeUnmount(() => {
    unsubscribe?.();
    unsubscribe = null;
  });
  return { isHovered };
};
const _hoisted_1 = { class: "name" };
const _hoisted_2 = {
  key: 0,
  class: "artist"
};
const _hoisted_3 = { class: "header" };
const _hoisted_4 = { class: "header-section header-left" };
const _hoisted_5 = { class: "song-info" };
const _hoisted_6 = { class: "song-title" };
const _hoisted_7 = {
  key: 0,
  class: "song-artist"
};
const _hoisted_8 = { class: "header-section header-center" };
const _hoisted_9 = { class: "header-section header-right" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const config = reactive({
      fontSize: 24,
      fontWeight: 600,
      fontFamily: "",
      showTranslation: true,
      doubleLine: true,
      align: "center",
      wordByWord: true,
      autoGenerateWordByWord: true,
      playedColor: "#ffffff",
      unplayedColor: "#7d7d7d",
      strokeColor: "rgba(0, 0, 0, 0.5)",
      backgroundMask: false,
      backgroundMaskColor: "rgba(0, 0, 0, 0.3)",
      alwaysShowSongInfo: false,
      limitBounds: false,
      animation: true,
      alwaysOnTop: true,
      locked: false,
      useCSSDrag: false
    });
    const { track, lyric, playing, primaryIndex } = useNowPlayingSync({
      pickIndex: pickPrimaryIndex,
      logTag: "desktop-lyric"
    });
    const cssDragEnabled = computed(() => config.useCSSDrag && isLinux);
    const { onRootPointerDown } = useDragWindow(() => config.locked || cssDragEnabled.value);
    const { isHovered } = useHoverState();
    const lockButton = ref(null);
    const placeholder = (key, mainText, subText) => {
      const align = config.align === "justify" ? "center" : config.align;
      const items = [
        {
          key,
          index: -1,
          line: makePlaceholderLine(mainText),
          align,
          isPlaceholder: true
        }
      ];
      if (config.doubleLine && subText) {
        items.push({
          key: `${key}-sub`,
          index: -1,
          line: makePlaceholderLine(subText),
          align,
          isPlaceholder: true,
          isNext: true
        });
      }
      return items;
    };
    const artistsText = computed(() => formatArtists(track.value?.artists) || "未知艺术家");
    const displayItems = computed(() => {
      const lines = lyric.value;
      const cur = track.value;
      if (!cur) return placeholder("ph-idle", "SPlayer Next Desktop Lyric");
      const trackKey = cur.id ?? cur.title;
      const subText = artistsText.value || void 0;
      if (lines.length === 0) {
        return placeholder(`ph-meta-${trackKey}`, cur.title, subText);
      }
      const primary = primaryIndex.value;
      if (primary < 0) {
        return placeholder(`ph-title-${trackKey}`, cur.title, subText);
      }
      const items = [
        {
          key: `m-${primary}`,
          index: primary,
          line: lines[primary],
          align: resolveAlign(primary, config.align),
          scrollEnabled: true
        }
      ];
      const current = lines[primary];
      if (config.showTranslation && current.translatedLyric) {
        items.push({
          key: `t-${primary}`,
          index: primary,
          line: {
            ...makePlaceholderLine(current.translatedLyric),
            startTime: current.startTime,
            endTime: current.endTime
          },
          align: resolveAlign(primary, config.align),
          scrollEnabled: true,
          isPlaceholder: true,
          isNext: true
        });
        return items;
      }
      if (config.doubleLine) {
        const nextIdx = primary + 1;
        if (nextIdx < lines.length) {
          items.push({
            key: `m-${nextIdx}`,
            index: nextIdx,
            line: lines[nextIdx],
            align: resolveAlign(nextIdx, config.align),
            scrollEnabled: true,
            isNext: true
          });
        }
      }
      return items;
    });
    const rootStyle = computed(() => ({
      "--dl-played": config.playedColor,
      "--dl-unplayed": config.unplayedColor,
      "--dl-stroke": config.strokeColor,
      "--dl-mask": config.backgroundMaskColor,
      "--dl-mask-pad-x": `${config.fontSize * 0.4}px`,
      "--dl-anim": config.animation ? "0.4s" : "0s",
      fontFamily: config.fontFamily || void 0,
      "-webkit-app-region": !config.locked && cssDragEnabled.value ? "drag" : "no-drag"
    }));
    const persistentTextAlign = computed(
      () => config.align === "justify" ? "center" : config.align
    );
    const pushWindowHeight = () => {
      const target = computeWindowHeight(config.fontSize);
      window.api.desktopLyric.setHeight(target).catch((error) => {
        console.error("[desktop-lyric] setHeight failed", error);
      });
    };
    watch(() => config.fontSize, pushWindowHeight);
    const onHeaderAction = (action) => {
      switch (action) {
        case "focus-main":
          window.api.system.focusMainWindow().catch(() => {
          });
          break;
        case "prev":
        case "next":
          window.api.player.dispatch(action);
          break;
        case "toggle-play":
          window.api.player.dispatch(playing.value ? "pause" : "play");
          break;
        case "open-settings":
          window.api.system.openSettings("externalLyric", "desktopLyricEnabled").catch(() => {
          });
          break;
        case "toggle-locked":
          window.api.config.set("desktopLyric.locked", !config.locked).catch(() => {
          });
          break;
        case "close":
          window.api.window.closeDesktopLyric().catch(() => {
          });
          break;
      }
    };
    const reportUnlockButtonBounds = () => {
      const button = lockButton.value;
      if (!button) return;
      const bounds = button.getBoundingClientRect();
      window.api.desktopLyric.setUnlockButtonBounds({
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height
      });
    };
    let unsubConfig = null;
    onMounted(async () => {
      try {
        const saved = await window.api.config.get("desktopLyric");
        Object.assign(config, saved);
      } catch (error) {
        console.error("[desktop-lyric] load config failed", error);
      }
      pushWindowHeight();
      unsubConfig = window.api.desktopLyric.onConfigChange((next) => Object.assign(config, next));
      await nextTick();
      reportUnlockButtonBounds();
      window.addEventListener("resize", reportUnlockButtonBounds);
    });
    onBeforeUnmount(() => {
      unsubConfig?.();
      unsubConfig = null;
      window.removeEventListener("resize", reportUnlockButtonBounds);
    });
    return (_ctx, _cache) => {
      const _component_IconLucideSkipBack = __unplugin_components_5$1;
      const _component_IconLucidePause = IconLucidePause;
      const _component_IconLucidePlay = __unplugin_components_0;
      const _component_IconLucideSkipForward = __unplugin_components_9;
      const _component_IconLucideSettings = IconLucideSettings;
      const _component_IconLucideUnlock = __unplugin_components_5;
      const _component_IconLucideLock = __unplugin_components_6;
      const _component_IconLucideX = __unplugin_components_11;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["root", { hovered: unref(isHovered), locked: unref(config).locked }]),
        style: normalizeStyle(unref(rootStyle)),
        onPointerdown: _cache[7] || (_cache[7] = //@ts-ignore
        (...args) => unref(onRootPointerDown) && unref(onRootPointerDown)(...args))
      }, [
        unref(track) && unref(config).alwaysShowSongInfo ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(["persistent-info", { hidden: unref(isHovered) }]),
          style: normalizeStyle({ textAlign: unref(persistentTextAlign) })
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["info-box", { "has-mask": unref(config).backgroundMask }])
          }, [
            createBaseVNode("div", _hoisted_1, toDisplayString(unref(track).title), 1),
            unref(artistsText) ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(unref(artistsText)), 1)) : createCommentVNode("", true)
          ], 2)
        ], 6)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("button", {
              class: "header-btn logo-btn",
              onClick: _cache[0] || (_cache[0] = ($event) => onHeaderAction("focus-main"))
            }, [..._cache[8] || (_cache[8] = [
              createBaseVNode("svg", {
                viewBox: "0 0 1024 1024",
                xmlns: "http://www.w3.org/2000/svg"
              }, [
                createBaseVNode("path", {
                  class: "logo-primary",
                  d: "M511.764091 131.708086a446.145957 446.145957 0 1 0 446.145957 446.145957 446.145957 446.145957 0 0 0-446.145957-446.145957z m0 519.76004A71.829499 71.829499 0 1 1 583.59359 580.530919 72.275645 72.275645 0 0 1 511.764091 651.468126z"
                }),
                createBaseVNode("path", {
                  class: "logo-secondary",
                  d: "M802.205109 0.541175l-168.197026 37.030114a67.814185 67.814185 0 0 0-53.091369 66.029602V223.614153l3.569168 349.778431h114.213365V223.614153h108.859613a26.322611 26.322611 0 0 0 26.768758-26.322611V26.863786a26.768757 26.768757 0 0 0-32.122509-26.322611z"
                }),
                createBaseVNode("path", {
                  class: "logo-secondary",
                  d: "M511.764091 386.457428a186.935156 186.935156 0 1 0 186.935156 186.48901A186.935156 186.935156 0 0 0 511.764091 386.457428z m0 264.564552a71.383353 71.383353 0 1 1 71.383353-71.383353 71.383353 71.383353 0 0 1-71.383353 71.383353z"
                })
              ], -1)
            ])]),
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, toDisplayString(unref(track)?.title ?? "SPlayer Next Desktop Lyric"), 1),
              unref(track) ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(unref(artistsText) || "未知艺术家"), 1)) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("div", _hoisted_8, [
            createBaseVNode("button", {
              class: "header-btn",
              onClick: _cache[1] || (_cache[1] = ($event) => onHeaderAction("prev"))
            }, [
              createVNode(_component_IconLucideSkipBack)
            ]),
            createBaseVNode("button", {
              class: "header-btn",
              onClick: _cache[2] || (_cache[2] = ($event) => onHeaderAction("toggle-play"))
            }, [
              unref(playing) ? (openBlock(), createBlock(_component_IconLucidePause, { key: 0 })) : (openBlock(), createBlock(_component_IconLucidePlay, { key: 1 }))
            ]),
            createBaseVNode("button", {
              class: "header-btn",
              onClick: _cache[3] || (_cache[3] = ($event) => onHeaderAction("next"))
            }, [
              createVNode(_component_IconLucideSkipForward)
            ])
          ]),
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("button", {
              class: "header-btn",
              onClick: _cache[4] || (_cache[4] = ($event) => onHeaderAction("open-settings"))
            }, [
              createVNode(_component_IconLucideSettings)
            ]),
            createBaseVNode("button", {
              ref_key: "lockButton",
              ref: lockButton,
              class: "header-btn lock-btn",
              onClick: _cache[5] || (_cache[5] = ($event) => onHeaderAction("toggle-locked"))
            }, [
              unref(config).locked ? (openBlock(), createBlock(_component_IconLucideUnlock, { key: 0 })) : (openBlock(), createBlock(_component_IconLucideLock, { key: 1 }))
            ], 512),
            createBaseVNode("button", {
              class: "header-btn",
              onClick: _cache[6] || (_cache[6] = ($event) => onHeaderAction("close"))
            }, [
              createVNode(_component_IconLucideX)
            ])
          ])
        ]),
        (openBlock(), createBlock(resolveDynamicComponent(unref(config).animation ? TransitionGroup : "div"), {
          tag: "div",
          name: "dl-line",
          class: "stage"
        }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(displayItems), (item, index) => {
              return openBlock(), createBlock(LyricLine, {
                key: item.key,
                line: item.line,
                "font-size": unref(config).fontSize,
                "font-weight": unref(config).fontWeight,
                align: item.align,
                "word-by-word": unref(resolveWordByWord)(unref(config), item),
                "scroll-enabled": !!item.scrollEnabled,
                "is-next": !!item.isNext,
                "background-mask": unref(config).backgroundMask,
                style: normalizeStyle({
                  "--dl-y": unref(getLineTop)(index, unref(config).fontSize),
                  "--dl-scale": item.isNext ? 0.8 : 1
                })
              }, null, 8, ["line", "font-size", "font-weight", "align", "word-by-word", "scroll-enabled", "is-next", "background-mask", "style"]);
            }), 128))
          ]),
          _: 1
        }))
      ], 38);
    };
  }
});
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a7fa9435"]]);
createApp(App).mount("#app");
