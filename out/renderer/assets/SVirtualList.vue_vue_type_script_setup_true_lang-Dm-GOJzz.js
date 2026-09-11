import { x as defineComponent, w as watch, k as onMounted, n as nextTick, am as onDeactivated, ae as onActivated, J as onUnmounted, y as createElementBlock, A as normalizeStyle, v as unref, _ as renderSlot, F as Fragment, B as createCommentVNode, z as createBaseVNode, M as normalizeClass, a0 as withDirectives, a1 as vShow, N as renderList, r as ref, c as computed, ab as triggerRef, q as shallowRef, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { bt as useElementSize, ah as useDebounceFn } from "./index-DVKNk9gd.js";
const _hoisted_1 = {
  key: 0,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_2 = {
  key: 0,
  class: "shrink-0"
};
const _hoisted_3 = ["data-index"];
const _hoisted_4 = {
  key: 0,
  class: "shrink-0"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SVirtualList",
  props: {
    items: {},
    itemHeight: {},
    itemFixed: { type: Boolean, default: false },
    height: { default: "100%" },
    paddingTop: { default: 0 },
    paddingBottom: { default: 0 },
    bufferSize: { default: 5 },
    defaultScrollIndex: {},
    getItemKey: { type: Function, default: (_item, index) => index },
    hideScrollbar: { type: Boolean },
    cover: { type: Boolean }
  },
  emits: ["scroll", "reachBottom"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const wrapperRef = ref(null);
    const scrollRef = ref(null);
    const contentRef = ref(null);
    const itemRefs = ref([]);
    const scrollTop = ref(0);
    const { height: scrollViewportHeight } = useElementSize(scrollRef);
    const containerHeightStyle = computed(
      () => typeof props.height === "number" ? `${props.height}px` : props.height
    );
    const viewportHeight = computed(() => scrollViewportHeight.value || 0);
    const itemHeights = shallowRef([]);
    const itemTops = shallowRef([]);
    const initializeHeights = () => {
      if (props.itemFixed) return;
      const length = props.items.length;
      if (itemHeights.value.length !== length) {
        const old = itemHeights.value;
        itemHeights.value = Array.from({ length }, (_, idx) => old[idx] || props.itemHeight);
      }
      updateTops();
    };
    const updateTops = (fromIndex = 0) => {
      if (props.itemFixed) return;
      const heights = itemHeights.value;
      const tops = itemTops.value.length === heights.length ? itemTops.value : new Array(heights.length);
      let top = fromIndex > 0 ? tops[fromIndex - 1] + heights[fromIndex - 1] : 0;
      for (let idx = fromIndex; idx < heights.length; idx++) {
        tops[idx] = top;
        top += heights[idx];
      }
      itemTops.value = tops;
    };
    const totalHeight = computed(() => {
      if (props.itemFixed) {
        return props.items.length * props.itemHeight + props.paddingTop;
      }
      if (itemTops.value.length === 0) return props.paddingTop;
      const last = itemTops.value.length - 1;
      return itemTops.value[last] + itemHeights.value[last] + props.paddingTop;
    });
    const actualStartIndex = ref(0);
    const actualEndIndex = ref(0);
    const calculateVisibleRange = (currentScrollTop) => {
      if (props.items.length === 0) {
        actualStartIndex.value = 0;
        actualEndIndex.value = -1;
        return;
      }
      const vHeight = viewportHeight.value;
      if (!vHeight) return;
      const effectiveScroll = Math.max(0, currentScrollTop - props.paddingTop);
      let startIndex = 0;
      let endIndex = 0;
      if (props.itemFixed) {
        startIndex = Math.floor(effectiveScroll / props.itemHeight);
        endIndex = startIndex + Math.ceil(vHeight / props.itemHeight);
      } else {
        const tops = itemTops.value;
        const heights = itemHeights.value;
        const len = tops.length;
        let lo = 0;
        let hi = len - 1;
        while (lo <= hi) {
          const mid = lo + hi >>> 1;
          if (tops[mid] + heights[mid] > effectiveScroll) {
            startIndex = mid;
            hi = mid - 1;
          } else {
            lo = mid + 1;
          }
        }
        const viewportBottom = effectiveScroll + vHeight;
        lo = startIndex;
        hi = len - 1;
        endIndex = startIndex;
        while (lo <= hi) {
          const mid = lo + hi >>> 1;
          if (tops[mid] <= viewportBottom) {
            endIndex = mid;
            lo = mid + 1;
          } else {
            hi = mid - 1;
          }
        }
      }
      const newStart = Math.max(0, startIndex - props.bufferSize);
      const newEnd = Math.min(props.items.length - 1, endIndex + props.bufferSize);
      if (newStart !== actualStartIndex.value || newEnd !== actualEndIndex.value) {
        actualStartIndex.value = newStart;
        actualEndIndex.value = newEnd;
      }
    };
    const visibleItems = computed(() => {
      if (actualStartIndex.value > actualEndIndex.value) return [];
      return props.items.slice(actualStartIndex.value, actualEndIndex.value + 1);
    });
    const measureItemHeights = () => {
      if (props.itemFixed || !itemRefs.value.length || props.items.length === 0) return;
      let hasChanges = false;
      itemRefs.value.forEach((element) => {
        if (!element) return;
        const actualIndex = Number(element.dataset.index);
        if (!Number.isInteger(actualIndex) || actualIndex < 0 || actualIndex >= props.items.length)
          return;
        const height = element.getBoundingClientRect().height;
        if (height > 0 && Math.abs(height - itemHeights.value[actualIndex]) > 0.5) {
          itemHeights.value[actualIndex] = height;
          hasChanges = true;
        }
      });
      if (hasChanges) {
        triggerRef(itemHeights);
        updateTops();
      }
    };
    const debouncedMeasure = useDebounceFn(measureItemHeights, 50);
    let rafId = null;
    let pendingScrollTarget = null;
    const processScroll = () => {
      rafId = null;
      const target = pendingScrollTarget;
      if (!target) return;
      const { scrollTop: st, scrollHeight, clientHeight } = target;
      scrollTop.value = st;
      calculateVisibleRange(st);
      if (scrollHeight - st - clientHeight < 50) {
        emit("reachBottom");
      }
    };
    const handleScroll = (event) => {
      const target = event.target;
      if (!target) return;
      emit("scroll", event);
      pendingScrollTarget = target;
      if (rafId === null) {
        rafId = requestAnimationFrame(processScroll);
      }
    };
    const getItemTop = (index) => {
      if (props.itemFixed) return index * props.itemHeight + props.paddingTop;
      return (itemTops.value[index] || 0) + props.paddingTop;
    };
    const getDropInfoByOffset = (offsetY) => {
      const len = props.items.length;
      if (len === 0) return { index: 0, position: "top" };
      const adjusted = offsetY - props.paddingTop;
      if (props.itemFixed) {
        const index = Math.floor(adjusted / props.itemHeight);
        const remainder = (adjusted % props.itemHeight + props.itemHeight) % props.itemHeight;
        const position = remainder < props.itemHeight / 2 ? "top" : "bottom";
        return { index: Math.max(0, Math.min(index, len - 1)), position };
      }
      const tops = itemTops.value;
      const heights = itemHeights.value;
      if (adjusted <= 0) return { index: 0, position: "top" };
      if (adjusted >= tops[len - 1] + heights[len - 1]) return { index: len - 1, position: "bottom" };
      let low = 0;
      let high = len - 1;
      while (low <= high) {
        const mid = low + high >>> 1;
        const top = tops[mid];
        const bottom = top + heights[mid];
        if (adjusted >= top && adjusted < bottom) {
          const position = adjusted - top < heights[mid] / 2 ? "top" : "bottom";
          return { index: mid, position };
        } else if (adjusted < top) {
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }
      return { index: len - 1, position: "bottom" };
    };
    const scrollToPosition = (top, behavior = "auto") => {
      scrollRef.value?.scrollTo({ top, behavior });
    };
    const scrollToIndex = (index, behavior = "auto") => {
      if (props.items.length === 0) return;
      const targetIndex = Math.max(0, Math.min(index, props.items.length - 1));
      let top = 0;
      if (props.itemFixed) {
        top = targetIndex * props.itemHeight;
      } else {
        if (itemTops.value.length <= targetIndex) initializeHeights();
        top = itemTops.value[targetIndex] || 0;
      }
      scrollToPosition(top, behavior);
    };
    const getScrollTop = () => scrollTop.value;
    watch(
      () => props.items,
      () => {
        initializeHeights();
        calculateVisibleRange(scrollTop.value);
        nextTick(debouncedMeasure);
      },
      { deep: false }
    );
    watch(
      () => props.items.length,
      () => {
        initializeHeights();
        calculateVisibleRange(scrollTop.value);
      }
    );
    watch(viewportHeight, () => {
      calculateVisibleRange(scrollTop.value);
    });
    watch(
      () => [actualStartIndex.value, actualEndIndex.value],
      () => {
        if (!props.itemFixed) nextTick(debouncedMeasure);
      },
      { flush: "post" }
    );
    onMounted(() => {
      initializeHeights();
      calculateVisibleRange(0);
      if (props.defaultScrollIndex) scrollToIndex(props.defaultScrollIndex);
      nextTick(() => {
        if (!props.itemFixed) measureItemHeights();
        if (viewportHeight.value > 0) calculateVisibleRange(scrollTop.value);
      });
    });
    let savedScrollTop = 0;
    onDeactivated(() => {
      const domTop = scrollRef.value?.scrollTop;
      savedScrollTop = domTop && domTop > 0 ? domTop : scrollTop.value;
    });
    onActivated(() => {
      const targetTop = savedScrollTop > 0 ? savedScrollTop : scrollTop.value;
      if (targetTop > 0) {
        scrollTop.value = targetTop;
        calculateVisibleRange(targetTop);
        nextTick(() => {
          scrollRef.value?.scrollTo({ top: targetTop });
          calculateVisibleRange(targetTop);
        });
      }
    });
    onUnmounted(() => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });
    __expose({
      wrapperRef,
      scrollRef,
      contentRef,
      actualStartIndex,
      scrollTo: scrollToPosition,
      scrollToIndex,
      getScrollTop,
      getItemTop,
      getDropInfoByOffset
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "wrapperRef",
        ref: wrapperRef,
        class: "w-full flex flex-col [overflow-anchor:none] contain-[layout_paint]",
        style: normalizeStyle({ height: unref(containerHeightStyle) })
      }, [
        __props.items.length === 0 && _ctx.$slots.empty ? (openBlock(), createElementBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "empty")
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _ctx.$slots.header ? (openBlock(), createElementBlock("div", _hoisted_2, [
            renderSlot(_ctx.$slots, "header")
          ])) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "scrollRef",
            ref: scrollRef,
            class: normalizeClass(["flex-1 min-h-0 overflow-y-auto", [
              __props.hideScrollbar ? "[&::-webkit-scrollbar]:hidden" : "",
              __props.cover ? "[&::-webkit-scrollbar-thumb]:bg-cover/25 [&::-webkit-scrollbar-thumb:hover]:bg-cover/45" : ""
            ]]),
            onScroll: handleScroll
          }, [
            withDirectives(createBaseVNode("div", {
              style: normalizeStyle({
                height: `${unref(totalHeight)}px`,
                position: "relative",
                transition: "height 0.3s ease"
              })
            }, [
              createBaseVNode("div", {
                ref_key: "contentRef",
                ref: contentRef,
                class: "absolute inset-x-0 top-0"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(visibleItems), (item, visibleIdx) => {
                  return openBlock(), createElementBlock("div", {
                    key: __props.getItemKey(item, unref(actualStartIndex) + visibleIdx),
                    ref_for: true,
                    ref_key: "itemRefs",
                    ref: itemRefs,
                    "data-index": unref(actualStartIndex) + visibleIdx,
                    class: "absolute inset-x-0 top-0 contain-[layout_paint]",
                    style: normalizeStyle({ transform: `translateY(${getItemTop(unref(actualStartIndex) + visibleIdx)}px)` })
                  }, [
                    renderSlot(_ctx.$slots, "default", {
                      item,
                      index: unref(actualStartIndex) + visibleIdx
                    })
                  ], 12, _hoisted_3);
                }), 128))
              ], 512)
            ], 4), [
              [vShow, __props.items.length > 0]
            ]),
            _ctx.$slots.footer && __props.items.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_4, [
              renderSlot(_ctx.$slots, "footer")
            ])) : createCommentVNode("", true),
            __props.paddingBottom > 0 ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: "shrink-0",
              style: normalizeStyle({ height: `${__props.paddingBottom}px` })
            }, null, 4)) : createCommentVNode("", true)
          ], 34)
        ], 64))
      ], 4);
    };
  }
});
export {
  _sfc_main as _
};
