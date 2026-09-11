import { x as defineComponent, Z as useSlots, y as createElementBlock, v as unref, F as Fragment, z as createBaseVNode, _ as renderSlot, B as createCommentVNode, M as normalizeClass, c as computed, W as createTextVNode, O as toDisplayString, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const _hoisted_1 = { class: "min-w-0 flex-1 text-base font-medium" };
const _hoisted_2 = {
  key: 0,
  class: "shrink-0"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SCard",
  props: {
    title: {},
    variant: { default: "default" },
    bordered: { type: Boolean, default: true },
    size: { default: "medium" },
    radius: { default: "lg" },
    hoverable: { type: Boolean },
    selected: { type: Boolean, default: false },
    flush: { type: Boolean }
  },
  setup(__props) {
    const variantClass = {
      default: { bg: "bg-surface-panel", border: "border-primary/20" },
      primary: { bg: "bg-primary/5", border: "border-primary/25" },
      settings: { bg: "bg-surface-panel dark:bg-on-surface/5", border: "border-primary/20" }
    };
    const sizePadding = {
      small: "px-3 py-2",
      medium: "px-4 py-3",
      large: "px-5 py-4"
    };
    const radiusClass = {
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl"
    };
    const slots = useSlots();
    const structured = computed(() => !!slots.header || !!slots["header-extra"] || !!slots.footer);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["transition-[background-color,border-color,box-shadow] duration-200", [
          variantClass[__props.variant].bg,
          radiusClass[__props.radius],
          __props.bordered && [
            "border border-solid",
            __props.selected ? "border-primary" : variantClass[__props.variant].border
          ],
          __props.hoverable && "cursor-pointer hover:shadow-md",
          !unref(structured) && !__props.title && !__props.flush && sizePadding[__props.size]
        ]])
      }, [
        unref(structured) || __props.title ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createBaseVNode("div", {
            class: normalizeClass(["flex items-center justify-between gap-2", [sizePadding[__props.size], _ctx.$slots.default && "pb-2"]])
          }, [
            createBaseVNode("div", _hoisted_1, [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createTextVNode(toDisplayString(__props.title), 1)
              ])
            ]),
            _ctx.$slots["header-extra"] ? (openBlock(), createElementBlock("div", _hoisted_2, [
              renderSlot(_ctx.$slots, "header-extra")
            ])) : createCommentVNode("", true)
          ], 2),
          _ctx.$slots.default ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass([sizePadding[__props.size], "pt-0", _ctx.$slots.footer && "pb-2"])
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)) : createCommentVNode("", true),
          _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass([sizePadding[__props.size], "pt-0"])
          }, [
            renderSlot(_ctx.$slots, "footer")
          ], 2)) : createCommentVNode("", true)
        ], 64)) : renderSlot(_ctx.$slots, "default", {}, void 0, void 0, 1)
      ], 2);
    };
  }
});
export {
  _sfc_main as _
};
