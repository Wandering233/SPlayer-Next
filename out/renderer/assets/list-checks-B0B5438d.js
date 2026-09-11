import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode } from "./runtime-dom.esm-bundler-qZya7aYr.js";
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
      d: "M13 5h8m-8 7h8m-8 7h8M3 17l2 2l4-4M3 7l2 2l4-4"
    }, null, -1)
  ])]);
}
const IconLucideListChecks = markRaw({ name: "lucide-list-checks", render });
export {
  IconLucideListChecks as I
};
