import { x as defineComponent, Z as useSlots, w as watch, k as onMounted, n as nextTick, y as createElementBlock, F as Fragment, z as createBaseVNode, A as normalizeStyle, M as normalizeClass, B as createCommentVNode, v as unref, N as renderList, D as createVNode, U as Transition, Q as withCtx, q as shallowRef, r as ref, c as computed, O as toDisplayString, _ as renderSlot, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { ai as useResizeObserver } from "./index-DVKNk9gd.js";
const _hoisted_1 = {
  key: 0,
  class: "absolute inset-x-0 bottom-0 h-0.5 bg-outline-variant/65"
};
const _hoisted_2 = ["aria-selected", "aria-disabled", "onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "STabs",
  props: {
    modelValue: {},
    tabs: {},
    type: { default: "bar" },
    size: { default: "medium" },
    justifyContent: {},
    animated: { type: Boolean, default: false },
    round: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const containerRef = shallowRef(null);
    const tabsPaneWrapperRef = shallowRef(null);
    const indicatorStyle = ref({});
    const panelHeight = ref("auto");
    const panelDirection = ref("next");
    const tabRefs = shallowRef({});
    let fromHeight = 0;
    const setTabRef = (key, el) => {
      tabRefs.value[key] = el instanceof HTMLElement ? el : null;
    };
    const hasContent = computed(() => !!slots[props.modelValue]);
    const updateIndicator = () => {
      if (!containerRef.value) return;
      const active = tabRefs.value[props.modelValue];
      if (!active) {
        indicatorStyle.value = {};
        return;
      }
      if (props.type === "bar") {
        const barWidth = 24;
        const center = active.offsetLeft + active.offsetWidth / 2;
        indicatorStyle.value = {
          left: `${center - barWidth / 2}px`,
          width: `${barWidth}px`
        };
      } else if (props.type === "segment") {
        indicatorStyle.value = {
          left: `${active.offsetLeft}px`,
          top: `${active.offsetTop}px`,
          width: `${active.offsetWidth}px`,
          height: `${active.offsetHeight}px`
        };
      } else {
        indicatorStyle.value = {
          left: `${active.offsetLeft}px`,
          width: `${active.offsetWidth}px`
        };
      }
    };
    const onPanelBeforeLeave = (el) => {
      if (!props.animated) return;
      fromHeight = el.getBoundingClientRect().height;
      panelHeight.value = `${fromHeight}px`;
    };
    const onPanelEnter = (el) => {
      if (!props.animated) return;
      const to = el.getBoundingClientRect().height;
      if (Math.abs(fromHeight - to) < 1) {
        panelHeight.value = "auto";
        return;
      }
      void tabsPaneWrapperRef.value?.offsetHeight;
      panelHeight.value = `${to}px`;
    };
    const onPanelAfterEnter = () => {
      if (!props.animated) return;
      panelHeight.value = "auto";
    };
    const select = (tab) => {
      if (tab.disabled || tab.key === props.modelValue) return;
      emit("update:modelValue", tab.key);
    };
    watch(
      () => props.tabs,
      (value) => {
        if (!value.length) return;
        if (!value.some((tab) => tab.key === props.modelValue)) {
          const fallback = value.find((tab) => !tab.disabled) ?? value[0];
          if (fallback && fallback.key !== props.modelValue) {
            emit("update:modelValue", fallback.key);
          }
        }
        nextTick(updateIndicator);
      },
      { immediate: true }
    );
    watch(
      () => props.modelValue,
      (newValue, oldValue) => {
        const oldIndex = props.tabs.findIndex((tab) => tab.key === oldValue);
        const newIndex = props.tabs.findIndex((tab) => tab.key === newValue);
        if (oldIndex >= 0 && newIndex >= 0) {
          panelDirection.value = newIndex >= oldIndex ? "next" : "prev";
        }
        nextTick(updateIndicator);
      }
    );
    onMounted(() => {
      nextTick(updateIndicator);
      if (containerRef.value) {
        useResizeObserver(containerRef, () => nextTick(updateIndicator));
      }
    });
    const sizeClasses = {
      small: "text-xs h-7 px-2.5",
      medium: "text-sm h-8 px-3",
      large: "text-base h-10 px-3.5"
    };
    const segmentOuterHeight = {
      small: "h-8",
      medium: "h-9",
      large: "h-10"
    };
    const segmentTabClasses = {
      small: "text-xs px-2.5",
      medium: "text-sm px-3",
      large: "text-base px-3.5"
    };
    const panelTransitionClasses = computed(() => {
      const active = "transition-[transform,opacity] duration-240 ease-[cubic-bezier(0.4,0,0.2,1)]";
      if (panelDirection.value === "next") {
        return {
          enterActive: active,
          leaveActive: `${active} absolute top-0 left-0 right-0`,
          enterFrom: "translate-x-4 opacity-0",
          leaveTo: "-translate-x-4 opacity-0"
        };
      }
      return {
        enterActive: active,
        leaveActive: `${active} absolute top-0 left-0 right-0`,
        enterFrom: "-translate-x-4 opacity-0",
        leaveTo: "translate-x-4 opacity-0"
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: containerRef,
          role: "tablist",
          class: normalizeClass(["relative items-center select-none", [
            __props.type === "segment" && [
              "flex w-full gap-1 p-0.5 bg-on-surface/3 border border-solid border-on-surface/15",
              segmentOuterHeight[__props.size],
              __props.round ? "rounded-full" : "rounded-lg"
            ],
            __props.type === "line" && (__props.justifyContent ? "flex w-full pb-1" : "flex w-full justify-start gap-3 pb-1"),
            __props.type === "bar" && (__props.justifyContent ? "flex w-full pb-1" : "inline-flex shrink-0 gap-3 pb-1")
          ]]),
          style: normalizeStyle((__props.type === "line" || __props.type === "bar") && __props.justifyContent ? { justifyContent: __props.justifyContent } : void 0)
        }, [
          __props.type === "line" ? (openBlock(), createElementBlock("div", _hoisted_1)) : createCommentVNode("", true),
          unref(indicatorStyle).width ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass([
              "absolute pointer-events-none transition-[left,width] duration-320 ease-[cubic-bezier(0.4,0,0.2,1)]",
              __props.type === "segment" ? ["bg-primary/12", __props.round ? "rounded-full" : "rounded-md"] : "bottom-0.5 h-[3px] bg-primary rounded-full"
            ]),
            style: normalizeStyle(unref(indicatorStyle))
          }, null, 6)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.tabs, (tab) => {
            return openBlock(), createElementBlock("div", {
              key: tab.key,
              ref_for: true,
              ref: (el) => setTabRef(tab.key, el),
              role: "tab",
              "aria-selected": __props.modelValue === tab.key,
              "aria-disabled": tab.disabled ? "true" : "false",
              class: normalizeClass(["relative z-1 inline-flex items-center justify-center whitespace-nowrap outline-none transition-colors duration-200", [
                __props.type === "segment" ? ["flex-1 h-full", segmentTabClasses[__props.size]] : sizeClasses[__props.size],
                tab.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                __props.modelValue === tab.key ? {
                  bar: "text-primary font-medium",
                  line: "text-primary font-medium",
                  segment: "text-on-surface font-medium"
                }[__props.type] : {
                  bar: "text-on-surface-variant",
                  line: "text-on-surface-variant",
                  segment: "text-on-surface"
                }[__props.type]
              ]]),
              onClick: ($event) => select(tab)
            }, [
              createBaseVNode("span", null, toDisplayString(tab.label ?? tab.key), 1)
            ], 10, _hoisted_2);
          }), 128))
        ], 6),
        unref(hasContent) ? (openBlock(), createElementBlock("div", {
          key: 0,
          ref_key: "tabsPaneWrapperRef",
          ref: tabsPaneWrapperRef,
          style: normalizeStyle(
            __props.animated ? {
              height: unref(panelHeight),
              transition: "height 240ms cubic-bezier(0.4, 0, 0.2, 1)"
            } : void 0
          ),
          class: normalizeClass(__props.animated ? "relative overflow-hidden" : "")
        }, [
          createVNode(Transition, {
            css: __props.animated,
            "enter-active-class": unref(panelTransitionClasses).enterActive,
            "leave-active-class": unref(panelTransitionClasses).leaveActive,
            "enter-from-class": unref(panelTransitionClasses).enterFrom,
            "leave-to-class": unref(panelTransitionClasses).leaveTo,
            onBeforeLeave: onPanelBeforeLeave,
            onEnter: onPanelEnter,
            onAfterEnter: onPanelAfterEnter
          }, {
            default: withCtx(() => [
              (openBlock(), createElementBlock("div", { key: __props.modelValue }, [
                renderSlot(_ctx.$slots, __props.modelValue)
              ]))
            ]),
            _: 3
          }, 8, ["css", "enter-active-class", "leave-active-class", "enter-from-class", "leave-to-class"])
        ], 6)) : createCommentVNode("", true)
      ], 64);
    };
  }
});
export {
  _sfc_main as _
};
