import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode, x as defineComponent, M as normalizeClass, v as unref, P as createBlock, R as resolveDynamicComponent, B as createCommentVNode, O as toDisplayString, _ as renderSlot, c as computed } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const _hoisted_1$4 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M12.713 16.713Q13 16.425 13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17t.713-.288m0-8Q13 8.425 13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9t.713-.288M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
    }, null, -1)
  ])]);
}
const __unplugin_components_2 = markRaw({ name: "material-symbols-info-rounded", render: render$3 });
const _hoisted_1$3 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
    }, null, -1)
  ])]);
}
const __unplugin_components_3 = markRaw({ name: "material-symbols-check-circle-rounded", render: render$2 });
const _hoisted_1$2 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M12.713 16.713Q13 16.425 13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17t.713-.288m0-4Q13 12.425 13 12V8q0-.425-.288-.712T12 7t-.712.288T11 8v4q0 .425.288.713T12 13t.713-.288M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
    }, null, -1)
  ])]);
}
const __unplugin_components_4 = markRaw({ name: "material-symbols-error-rounded", render: render$1 });
const _hoisted_1$1 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
    }, null, -1)
  ])]);
}
const __unplugin_components_5 = markRaw({ name: "material-symbols-cancel-rounded", render });
const _hoisted_1 = { class: "flex-1 min-w-0" };
const _hoisted_2 = {
  key: 0,
  class: "text-sm font-semibold mb-1"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SAlert",
  props: {
    type: { default: "default" },
    variant: { default: "soft" },
    title: {},
    icon: {},
    hideIcon: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const defaultIcon = computed(() => {
      switch (props.type) {
        case "success":
          return __unplugin_components_3;
        case "warning":
          return __unplugin_components_4;
        case "error":
          return __unplugin_components_5;
        default:
          return __unplugin_components_2;
      }
    });
    const textIconClasses = computed(() => {
      switch (props.type) {
        case "info":
          return "text-blue-700 dark:text-blue-400 [&_.alert-icon]:text-blue-600 dark:[&_.alert-icon]:text-blue-400";
        case "success":
          return "text-green-700 dark:text-green-400 [&_.alert-icon]:text-green-600 dark:[&_.alert-icon]:text-green-400";
        case "warning":
          return "text-amber-700 dark:text-amber-400 [&_.alert-icon]:text-amber-600 dark:[&_.alert-icon]:text-amber-400";
        case "error":
          return "text-red-700 dark:text-red-400 [&_.alert-icon]:text-red-600 dark:[&_.alert-icon]:text-red-400";
        default:
          return "text-on-surface [&_.alert-icon]:text-primary";
      }
    });
    const softBgClass = computed(() => {
      switch (props.type) {
        case "info":
          return "bg-blue-500/8";
        case "success":
          return "bg-green-500/8";
        case "warning":
          return "bg-amber-500/10";
        case "error":
          return "bg-red-500/8";
        default:
          return "bg-primary/8";
      }
    });
    const outlineBorderClass = computed(() => {
      switch (props.type) {
        case "info":
          return "border-blue-500";
        case "success":
          return "border-green-500";
        case "warning":
          return "border-amber-500";
        case "error":
          return "border-red-500";
        default:
          return "border-primary";
      }
    });
    const containerClasses = computed(
      () => props.variant === "outline" ? [
        "border-0 border-l-4 border-solid bg-on-surface/3 rounded-lg",
        outlineBorderClass.value,
        textIconClasses.value
      ] : ["rounded-lg", softBgClass.value, textIconClasses.value]
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["flex gap-2 p-3 text-xs leading-relaxed", unref(containerClasses)])
      }, [
        !__props.hideIcon ? (openBlock(), createBlock(resolveDynamicComponent(__props.icon ?? unref(defaultIcon)), {
          key: 0,
          class: "alert-icon size-4 shrink-0 mt-0.5"
        })) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_1, [
          __props.title ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(__props.title), 1)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default")
        ])
      ], 2);
    };
  }
});
export {
  _sfc_main as _,
  __unplugin_components_2 as a,
  __unplugin_components_3 as b,
  __unplugin_components_4 as c,
  __unplugin_components_5 as d
};
