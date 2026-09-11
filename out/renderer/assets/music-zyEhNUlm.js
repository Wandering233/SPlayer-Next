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
      createBaseVNode("path", { d: "M9 18V5l12-2v13" }),
      createBaseVNode("circle", {
        cx: "6",
        cy: "18",
        r: "3"
      }),
      createBaseVNode("circle", {
        cx: "18",
        cy: "16",
        r: "3"
      })
    ], -1)
  ])]);
}
const __unplugin_components_4 = markRaw({ name: "lucide-music", render });
export {
  __unplugin_components_4 as _
};
