import { x as defineComponent, y as createElementBlock, z as createBaseVNode, O as toDisplayString, _ as renderSlot, B as createCommentVNode, C as openBlock, m as markRaw } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const _hoisted_1$1 = { class: "flex flex-col gap-1.5" };
const _hoisted_2 = { class: "text-sm text-on-surface ml-1" };
const _hoisted_3 = {
  key: 0,
  class: "text-xs text-on-surface-variant/50"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SFormItem",
  props: {
    label: {},
    description: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("label", _hoisted_2, toDisplayString(__props.label), 1),
        renderSlot(_ctx.$slots, "default"),
        __props.description ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(__props.description), 1)) : createCommentVNode("", true)
      ]);
    };
  }
});
const _hoisted_1 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"
    }, null, -1)
  ])]);
}
const IconLucidePencil = markRaw({ name: "lucide-pencil", render });
export {
  IconLucidePencil as I,
  _sfc_main as _
};
