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
      createBaseVNode("path", { d: "M8 2v4m8-4v4" }),
      createBaseVNode("rect", {
        width: "18",
        height: "18",
        x: "3",
        y: "4",
        rx: "2"
      }),
      createBaseVNode("path", { d: "M3 10h18" })
    ], -1)
  ])]);
}
const IconLucideCalendar = markRaw({ name: "lucide-calendar", render });
export {
  IconLucideCalendar as I
};
