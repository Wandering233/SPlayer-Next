import { x as defineComponent, w as watch, k as onMounted, L as onBeforeUnmount, C as openBlock, y as createElementBlock, M as normalizeClass, v as unref, z as createBaseVNode, F as Fragment, N as renderList, O as toDisplayString, c as computed, r as ref, n as nextTick, B as createCommentVNode, V as withModifiers, D as createVNode, P as createBlock, R as resolveDynamicComponent, Q as withCtx, S as TransitionGroup, A as normalizeStyle, f as reactive, K as createApp } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { D as DEFAULT_COVER } from "./song-BGJnBQIx.js";
import { _ as __unplugin_components_5, a as __unplugin_components_9 } from "./skip-back-B9n6BSsM.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { I as IconLucidePause } from "./pause-u3QmqHX9.js";
import { a as getWordSweepProgress, g as getNowPlayingCurrentMs, u as useNowPlayingSync, p as pickPrimaryIndex } from "./useNowPlayingSync-BmSamylX.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { f as formatArtists } from "./track-CvXd5ION.js";
const _hoisted_1$1 = ["data-anchor"];
const _hoisted_2$1 = { key: 1 };
const SCROLL_START_AT = 0.3;
const END_MARGIN_MS = 2e3;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TaskbarLyricLine",
  props: {
    line: {},
    text: {},
    wordByWord: { type: Boolean, default: false },
    anchor: { default: "left" }
  },
  setup(__props) {
    const props = __props;
    const useKaraoke = computed(() => props.wordByWord && !!props.line);
    const plainText = computed(() => props.text ?? props.line?.words.map((w) => w.word).join("") ?? "");
    const wrapperRef = ref(null);
    const contentRef = ref(null);
    const overflowPx = ref(0);
    const isOverflow = computed(() => overflowPx.value > 0);
    const measure = () => {
      const outer = wrapperRef.value;
      const inner = contentRef.value;
      if (!outer || !inner) {
        overflowPx.value = 0;
        return;
      }
      const diff = inner.getBoundingClientRect().width - outer.getBoundingClientRect().width;
      overflowPx.value = diff > 0.5 ? diff : 0;
    };
    const getScrollTransform = (currentMs) => {
      const overflow = overflowPx.value;
      if (overflow <= 0 || !props.line) return "translateX(0)";
      const { startTime, endTime } = props.line;
      if (endTime <= startTime) return "translateX(0)";
      const end = Math.max(startTime + 1, endTime - END_MARGIN_MS);
      const duration = end - startTime;
      if (duration <= 0) return "translateX(0)";
      const progress = Math.max(0, Math.min(1, (currentMs - startTime) / duration));
      if (progress <= SCROLL_START_AT) return "translateX(0)";
      const ratio = (progress - SCROLL_START_AT) / (1 - SCROLL_START_AT);
      const offset = overflow * ratio;
      return `translateX(-${offset.toFixed(3)}px)`;
    };
    const wordRefs = [];
    const getWordProgress = (word, currentMs) => {
      const progress = getWordSweepProgress(word, props.line?.startTime ?? 0, currentMs);
      const pct = (progress * 100).toFixed(1);
      const px = progress * 4 - 2;
      const signed = px >= 0 ? `+ ${px.toFixed(2)}px` : `- ${(-px).toFixed(2)}px`;
      return `calc(${pct}% ${signed})`;
    };
    const setWordRef = (el, index) => {
      const target = el instanceof Element ? el : el?.$el ?? null;
      if (target instanceof HTMLSpanElement) {
        wordRefs[index] = target;
      } else {
        delete wordRefs[index];
      }
    };
    let resizeObserver = null;
    let rafId = 0;
    let lastTransform = "";
    let lastWordProgress = [];
    const resetRenderCache = () => {
      lastTransform = "";
      lastWordProgress = [];
      wordRefs.length = 0;
    };
    const renderFrame = () => {
      const currentMs = getNowPlayingCurrentMs();
      if (contentRef.value) {
        const transform = getScrollTransform(currentMs);
        if (transform !== lastTransform) {
          lastTransform = transform;
          contentRef.value.style.transform = transform;
        }
      }
      if (useKaraoke.value && props.line) {
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
    watch(
      () => props.line,
      () => {
        resetRenderCache();
        nextTick(measure);
      }
    );
    watch(
      () => props.text,
      () => nextTick(measure)
    );
    onMounted(() => {
      resizeObserver = new ResizeObserver(measure);
      if (wrapperRef.value) resizeObserver.observe(wrapperRef.value);
      if (contentRef.value) resizeObserver.observe(contentRef.value);
      measure();
      rafId = requestAnimationFrame(renderFrame);
    });
    onBeforeUnmount(() => {
      if (rafId !== 0) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      resizeObserver?.disconnect();
      resizeObserver = null;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "wrapperRef",
        ref: wrapperRef,
        class: normalizeClass(["scroll-wrapper", { "is-overflow": unref(isOverflow) }]),
        "data-anchor": __props.anchor
      }, [
        createBaseVNode("div", {
          ref_key: "contentRef",
          ref: contentRef,
          class: "scroll-content"
        }, [
          unref(useKaraoke) ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.line.words, (word, i) => {
            return openBlock(), createElementBlock("span", {
              key: i,
              ref_for: true,
              ref: (el) => setWordRef(el, i),
              class: "tb-word"
            }, toDisplayString(word.word), 1);
          }), 128)) : (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(unref(plainText)), 1))
        ], 512)
      ], 10, _hoisted_1$1);
    };
  }
});
const TaskbarLyricLine = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-f1ae06ef"]]);
const _hoisted_1 = ["data-align"];
const _hoisted_2 = ["data-theme", "data-align"];
const _hoisted_3 = {
  key: 0,
  class: "cover-wrapper"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = { class: "controls-wrapper" };
const _hoisted_6 = { class: "controls-inner" };
const _hoisted_7 = { class: "lyric-area" };
const _hoisted_8 = ["data-role"];
const _hoisted_9 = { class: "song-info" };
const _hoisted_10 = { class: "song-title" };
const _hoisted_11 = {
  key: 0,
  class: "song-artist"
};
const LYRIC_WIDTH_GUARD = 8;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  setup(__props) {
    const config = reactive({
      position: "auto",
      autoMaxWidth: true,
      autoAdjustOccupiedSpace: false,
      maxWidth: 400,
      leftMargin: 0,
      rightMargin: 0,
      colorMode: "taskbar",
      showBackground: false,
      doubleLine: true,
      showTranslation: true,
      showCover: true,
      wordByWord: true,
      fontSize: 14,
      fontWeight: 400,
      fontFamily: ""
    });
    const anchor = ref("left");
    const taskbarIsLight = ref(false);
    const isHovered = ref(false);
    const maxLayoutWidth = ref(400);
    const wrapperRef = ref(null);
    let hoverLeaveTimer = null;
    let widthReportRaf = 0;
    let lastReportedWidth = 0;
    const measureTargetTextWidth = (element) => {
      const line = element.closest(".lyric-line");
      if (!line) return element.scrollWidth;
      const currentFontSize = Number.parseFloat(getComputedStyle(line).fontSize);
      const targetFontSize = line.dataset.role === "secondary" ? config.fontSize * 0.82 : config.fontSize;
      if (!Number.isFinite(currentFontSize) || currentFontSize <= 0) return element.scrollWidth;
      return element.scrollWidth * (targetFontSize / currentFontSize);
    };
    const reportContentWidth = () => {
      widthReportRaf = 0;
      const wrapper = wrapperRef.value;
      if (!wrapper) return;
      if (isHovered.value) {
        const targetWidth2 = Math.ceil(maxLayoutWidth.value);
        if (targetWidth2 === lastReportedWidth) return;
        lastReportedWidth = targetWidth2;
        window.api.taskbarLyric.setContentWidth(targetWidth2);
        return;
      }
      const wrapperStyle = getComputedStyle(wrapper);
      const horizontalPadding = Number.parseFloat(wrapperStyle.paddingLeft) + Number.parseFloat(wrapperStyle.paddingRight);
      const coverWidth = config.showCover ? wrapper.querySelector(".cover-wrapper")?.offsetWidth ?? 0 : 0;
      const lyricArea = wrapper.querySelector(".lyric-area");
      const lyricStyle = lyricArea ? getComputedStyle(lyricArea) : null;
      const lyricMargins = lyricStyle ? Number.parseFloat(lyricStyle.marginLeft) + Number.parseFloat(lyricStyle.marginRight) : 0;
      const textElements = wrapper.querySelectorAll(".lyric-line .scroll-content");
      const naturalTextWidth = Math.max(0, ...Array.from(textElements, measureTargetTextWidth));
      const fixedWidth = horizontalPadding + coverWidth + lyricMargins;
      const availableTextWidth = Math.max(0, maxLayoutWidth.value - fixedWidth);
      const preferredTextWidth = naturalTextWidth + LYRIC_WIDTH_GUARD;
      const textWidth = Math.min(preferredTextWidth, availableTextWidth);
      const targetWidth = Math.ceil(Math.min(maxLayoutWidth.value, fixedWidth + textWidth));
      if (targetWidth === lastReportedWidth) return;
      lastReportedWidth = targetWidth;
      window.api.taskbarLyric.setContentWidth(targetWidth);
    };
    const scheduleContentWidthReport = () => {
      if (widthReportRaf) return;
      widthReportRaf = requestAnimationFrame(reportContentWidth);
    };
    const setContentHovered = (hovered) => {
      if (hoverLeaveTimer !== null) {
        window.clearTimeout(hoverLeaveTimer);
        hoverLeaveTimer = null;
      }
      if (hovered) {
        isHovered.value = true;
        nextTick(scheduleContentWidthReport);
        return;
      }
      hoverLeaveTimer = window.setTimeout(() => {
        hoverLeaveTimer = null;
        isHovered.value = false;
        nextTick(scheduleContentWidthReport);
      }, 40);
    };
    const { track, lyric, primaryIndex, playing } = useNowPlayingSync({
      pickIndex: pickPrimaryIndex,
      logTag: "taskbar-lyric"
    });
    const currentLine = computed(() => {
      const idx = primaryIndex.value;
      if (idx < 0) return null;
      return lyric.value[idx] ?? null;
    });
    const hasLyric = computed(() => lyric.value.length > 0 && primaryIndex.value >= 0);
    const titleText = computed(() => track.value?.title ?? "SPlayer Next");
    const artistsText = computed(() => formatArtists(track.value?.artists) || "未知艺术家");
    const effectiveTheme = computed(() => {
      if (config.colorMode === "light") return "light";
      if (config.colorMode === "dark") return "dark";
      if (config.colorMode === "taskbarInverse") return taskbarIsLight.value ? "dark" : "light";
      return taskbarIsLight.value ? "light" : "dark";
    });
    const items = computed(() => {
      if (hasLyric.value) {
        const idx = primaryIndex.value;
        const line = currentLine.value;
        const list2 = [
          {
            key: `line-${idx}`,
            role: "primary",
            text: line.words.map((w) => w.word).join(""),
            line
          }
        ];
        if (config.doubleLine) {
          const trans = config.showTranslation ? line.translatedLyric : "";
          if (trans) {
            list2.push({ key: `trans-${idx}`, role: "secondary", text: trans });
          } else {
            const next = lyric.value[idx + 1];
            if (next) {
              list2.push({
                key: `line-${idx + 1}`,
                role: "secondary",
                text: next.words.map((w) => w.word).join(""),
                line: next
              });
            }
          }
        }
        return list2;
      }
      const list = [{ key: "meta-title", role: "primary", text: titleText.value }];
      if (config.doubleLine) {
        list.push({ key: "meta-artist", role: "secondary", text: artistsText.value });
      }
      return list;
    });
    const rootStyle = computed(() => ({
      "--tbl-font-size": `${config.fontSize}px`,
      fontWeight: config.fontWeight,
      fontFamily: config.fontFamily || void 0
    }));
    const handlePrev = () => window.api.player.dispatch("prev");
    const handleNext = () => window.api.player.dispatch("next");
    const handleTogglePlay = () => window.api.player.dispatch(playing.value ? "pause" : "play");
    const handleFocusMain = () => {
      window.api.system.focusMainWindow().catch(() => {
      });
    };
    const unsubscribers = [];
    onMounted(async () => {
      try {
        const saved = await window.api.config.get("taskbarLyric");
        if (saved) Object.assign(config, saved);
        await nextTick();
        scheduleContentWidthReport();
      } catch (error) {
        console.error("[taskbar-lyric] load config failed", error);
      }
      unsubscribers.push(
        window.api.taskbarLyric.onLayout((data) => {
          anchor.value = data.anchor;
          taskbarIsLight.value = data.isLight;
          maxLayoutWidth.value = data.maxWidth;
          nextTick(scheduleContentWidthReport);
        }),
        window.api.taskbarLyric.onConfigChange((next) => {
          Object.assign(config, next);
          nextTick(scheduleContentWidthReport);
        })
      );
    });
    watch(items, () => nextTick(scheduleContentWidthReport));
    watch(
      () => [
        config.showCover,
        config.doubleLine,
        config.fontSize,
        config.fontWeight,
        config.fontFamily
      ],
      () => nextTick(scheduleContentWidthReport)
    );
    onBeforeUnmount(() => {
      if (widthReportRaf) cancelAnimationFrame(widthReportRaf);
      if (hoverLeaveTimer !== null) {
        window.clearTimeout(hoverLeaveTimer);
        hoverLeaveTimer = null;
      }
      for (const off of unsubscribers) off();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "wrapperRef",
        ref: wrapperRef,
        class: "wrapper",
        "data-align": unref(anchor),
        onMouseenter: _cache[4] || (_cache[4] = ($event) => setContentHovered(true)),
        onMouseleave: _cache[5] || (_cache[5] = ($event) => setContentHovered(false))
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["container", { "is-hovered": unref(isHovered), "shows-background": unref(config).showBackground }]),
          "data-theme": unref(effectiveTheme),
          "data-align": unref(anchor),
          style: normalizeStyle(unref(rootStyle)),
          onDblclick: handleFocusMain
        }, [
          unref(config).showCover ? (openBlock(), createElementBlock("div", _hoisted_3, [
            createBaseVNode("img", {
              class: "cover",
              src: unref(track)?.cover || unref(DEFAULT_COVER),
              alt: "",
              draggable: "false",
              onError: _cache[0] || (_cache[0] = ($event) => $event.target.src = unref(DEFAULT_COVER))
            }, null, 40, _hoisted_4)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("button", {
                class: "control-btn",
                type: "button",
                onClick: withModifiers(handlePrev, ["stop"]),
                onDblclick: _cache[1] || (_cache[1] = withModifiers(() => {
                }, ["stop"]))
              }, [
                createVNode(unref(__unplugin_components_5), { class: "control-icon" })
              ], 32),
              createBaseVNode("button", {
                class: "control-btn",
                type: "button",
                onClick: withModifiers(handleTogglePlay, ["stop"]),
                onDblclick: _cache[2] || (_cache[2] = withModifiers(() => {
                }, ["stop"]))
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(unref(playing) ? unref(IconLucidePause) : unref(__unplugin_components_0)), { class: "control-icon" }))
              ], 32),
              createBaseVNode("button", {
                class: "control-btn",
                type: "button",
                onClick: withModifiers(handleNext, ["stop"]),
                onDblclick: _cache[3] || (_cache[3] = withModifiers(() => {
                }, ["stop"]))
              }, [
                createVNode(unref(__unplugin_components_9), { class: "control-icon" })
              ], 32)
            ])
          ]),
          createBaseVNode("div", _hoisted_7, [
            createVNode(TransitionGroup, {
              tag: "div",
              name: "line",
              class: "lyric-column",
              onAfterLeave: scheduleContentWidthReport
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(items), (item) => {
                  return openBlock(), createElementBlock("div", {
                    key: item.key,
                    class: "lyric-line",
                    "data-role": item.role
                  }, [
                    createVNode(TaskbarLyricLine, {
                      line: item.line,
                      text: item.text,
                      "word-by-word": unref(config).wordByWord && !!item.line,
                      anchor: unref(anchor)
                    }, null, 8, ["line", "text", "word-by-word", "anchor"])
                  ], 8, _hoisted_8);
                }), 128))
              ]),
              _: 1
            }),
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, toDisplayString(unref(titleText)), 1),
              unref(config).doubleLine ? (openBlock(), createElementBlock("div", _hoisted_11, toDisplayString(unref(artistsText)), 1)) : createCommentVNode("", true)
            ])
          ])
        ], 46, _hoisted_2)
      ], 40, _hoisted_1);
    };
  }
});
createApp(_sfc_main).mount("#app");
