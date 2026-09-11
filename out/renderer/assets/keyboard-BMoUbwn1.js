import { x as defineComponent, y as createElementBlock, A as normalizeStyle, z as createBaseVNode, C as openBlock, m as markRaw } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SLogo",
  props: {
    size: { default: 30 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        style: normalizeStyle({ height: `${__props.size}px` }),
        viewBox: "0 0 1024 1024",
        xmlns: "http://www.w3.org/2000/svg"
      }, [..._cache[0] || (_cache[0] = [
        createBaseVNode("path", {
          class: "fill-primary/30",
          d: "M511.764091 131.708086a446.145957 446.145957 0 1 0 446.145957 446.145957 446.145957 446.145957 0 0 0-446.145957-446.145957z m0 519.76004A71.829499 71.829499 0 1 1 583.59359 580.530919 72.275645 72.275645 0 0 1 511.764091 651.468126z"
        }, null, -1),
        createBaseVNode("path", {
          class: "fill-primary",
          d: "M802.205109 0.541175l-168.197026 37.030114a67.814185 67.814185 0 0 0-53.091369 66.029602V223.614153l3.569168 349.778431h114.213365V223.614153h108.859613a26.322611 26.322611 0 0 0 26.768758-26.322611V26.863786a26.768757 26.768757 0 0 0-32.122509-26.322611z"
        }, null, -1),
        createBaseVNode("path", {
          class: "fill-primary",
          d: "M511.764091 386.457428a186.935156 186.935156 0 1 0 186.935156 186.48901A186.935156 186.935156 0 0 0 511.764091 386.457428z m0 264.564552a71.383353 71.383353 0 1 1 71.383353-71.383353 71.383353 71.383353 0 0 1-71.383353 71.383353z"
        }, null, -1)
      ])], 4);
    };
  }
});
const _hoisted_1$3 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("rect", {
        width: "20",
        height: "8",
        x: "2",
        y: "2",
        rx: "2",
        ry: "2"
      }),
      createBaseVNode("rect", {
        width: "20",
        height: "8",
        x: "2",
        y: "14",
        rx: "2",
        ry: "2"
      }),
      createBaseVNode("path", { d: "M6 6h.01M6 18h.01" })
    ], -1)
  ])]);
}
const IconLucideServer = markRaw({ name: "lucide-server", render: render$3 });
const LOCALES = [
  { value: "zh-CN", label: "简体中文" },
  { value: "en-US", label: "English" }
];
const _hoisted_1$2 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("path", { d: "M14 17H5M19 7h-9" }),
      createBaseVNode("circle", {
        cx: "17",
        cy: "17",
        r: "3"
      }),
      createBaseVNode("circle", {
        cx: "7",
        cy: "7",
        r: "3"
      })
    ], -1)
  ])]);
}
const IconLucideSettings2 = markRaw({ name: "lucide-settings-2", render: render$2 });
const _hoisted_1$1 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("rect", {
        width: "20",
        height: "14",
        x: "2",
        y: "3",
        rx: "2"
      }),
      createBaseVNode("path", { d: "M8 21h8m-4-4v4" })
    ], -1)
  ])]);
}
const IconMonitor = markRaw({ name: "lucide-monitor", render: render$1 });
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
      createBaseVNode("path", { d: "M10 8h.01M12 12h.01M14 8h.01M16 12h.01M18 8h.01M6 8h.01M7 16h10m-9-4h.01" }),
      createBaseVNode("rect", {
        width: "20",
        height: "16",
        x: "2",
        y: "4",
        rx: "2"
      })
    ], -1)
  ])]);
}
const IconLucideKeyboard = markRaw({ name: "lucide-keyboard", render });
export {
  IconLucideServer as I,
  LOCALES as L,
  _sfc_main as _,
  IconLucideSettings2 as a,
  IconMonitor as b,
  IconLucideKeyboard as c
};
