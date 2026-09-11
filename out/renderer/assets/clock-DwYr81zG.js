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
        cy: "12",
        r: "10"
      }),
      createBaseVNode("path", { d: "M12 6v6l4 2" })
    ], -1)
  ])]);
}
const IconLucideClock = markRaw({ name: "lucide-clock", render });
export {
  IconLucideClock as I
};
