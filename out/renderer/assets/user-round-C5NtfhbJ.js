import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const _hoisted_1 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("circle", {
        cx: "12",
        cy: "8",
        r: "5"
      }),
      createBaseVNode("path", { d: "M20 21a8 8 0 0 0-16 0" })
    ], -1)
  ])]);
}
const __unplugin_components_1 = markRaw({ name: "lucide-user-round", render });
export {
  __unplugin_components_1 as _
};
