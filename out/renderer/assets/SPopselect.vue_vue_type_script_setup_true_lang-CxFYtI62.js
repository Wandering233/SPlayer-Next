import { S as SelectRoot_default, l as SelectTrigger_default, m as SelectContent_default, n as SelectViewport_default, o as SelectItem_default, p as SelectItemText_default, q as SelectItemIndicator_default, r as SelectPortal_default } from "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import { _ as __unplugin_components_7 } from "./check-BXlOuXWK.js";
import { x as defineComponent, P as createBlock, Q as withCtx, D as createVNode, _ as renderSlot, z as createBaseVNode, O as toDisplayString, v as unref, M as normalizeClass, A as normalizeStyle, y as createElementBlock, N as renderList, W as createTextVNode, F as Fragment, c as computed, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const _hoisted_1 = { class: "inline-flex items-center text-sm text-on-surface-variant cursor-pointer" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SPopselect",
  props: {
    modelValue: { type: [String, Number, Boolean] },
    options: { default: () => [] },
    disabled: { type: Boolean, default: false },
    side: { default: "bottom" },
    align: { default: "center" },
    sideOffset: { default: 6 },
    cover: { type: Boolean, default: false },
    minWidth: { default: 120 }
  },
  emits: ["update:modelValue", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selectedOption = computed(() => props.options.find((o) => o.value === props.modelValue));
    const handleChange = (val) => {
      const opt = props.options.find((o) => String(o.value) === val);
      emit("update:modelValue", opt?.value ?? val);
    };
    return (_ctx, _cache) => {
      const _component_SelectTrigger = SelectTrigger_default;
      const _component_SelectItemText = SelectItemText_default;
      const _component_IconLucideCheck = __unplugin_components_7;
      const _component_SelectItemIndicator = SelectItemIndicator_default;
      const _component_SelectItem = SelectItem_default;
      const _component_SelectViewport = SelectViewport_default;
      const _component_SelectContent = SelectContent_default;
      const _component_SelectPortal = SelectPortal_default;
      const _component_SelectRoot = SelectRoot_default;
      return openBlock(), createBlock(_component_SelectRoot, {
        "model-value": String(__props.modelValue),
        disabled: __props.disabled,
        "onUpdate:modelValue": handleChange,
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => emit("update:open", $event))
      }, {
        default: withCtx(() => [
          createVNode(_component_SelectTrigger, {
            "as-child": "",
            disabled: __props.disabled
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "trigger", { selected: unref(selectedOption) }, () => [
                createBaseVNode("span", _hoisted_1, toDisplayString(unref(selectedOption)?.label ?? ""), 1)
              ])
            ]),
            _: 3
          }, 8, ["disabled"]),
          createVNode(_component_SelectPortal, null, {
            default: withCtx(() => [
              createVNode(_component_SelectContent, {
                position: "popper",
                side: __props.side,
                align: __props.align,
                "side-offset": __props.sideOffset,
                "collision-padding": 12,
                style: normalizeStyle({ minWidth: `${__props.minWidth}px` }),
                class: normalizeClass([
                  "z-400 rounded-lg shadow-lg text-sm data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out",
                  __props.cover ? "bg-black/55 backdrop-blur-xl backdrop-saturate-160 border border-solid border-white/10" : "bg-surface-bright"
                ])
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "header"),
                  createVNode(_component_SelectViewport, { class: "p-1 max-h-60" }, {
                    default: withCtx(() => [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (opt) => {
                        return openBlock(), createBlock(_component_SelectItem, {
                          key: String(opt.value),
                          value: String(opt.value),
                          title: opt.label,
                          class: normalizeClass([
                            "relative flex items-center h-8 px-2.5 pr-7 rounded-md cursor-pointer outline-none focus-visible:outline-none transition-colors duration-200",
                            __props.cover ? "data-[highlighted]:bg-white/10" : "data-[highlighted]:bg-on-surface/8",
                            opt.value === __props.modelValue ? __props.cover ? "text-cover" : "text-primary" : __props.cover ? "text-cover/80" : "text-on-surface"
                          ])
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_SelectItemText, { class: "flex-1 truncate" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(opt.label), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_SelectItemIndicator, { class: "absolute right-2" }, {
                              default: withCtx(() => [
                                createVNode(_component_IconLucideCheck, {
                                  class: normalizeClass(["size-3.5", __props.cover ? "text-cover" : "text-primary"])
                                }, null, 8, ["class"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["value", "title", "class"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 3
              }, 8, ["side", "align", "side-offset", "style", "class"])
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["model-value", "disabled"]);
    };
  }
});
export {
  _sfc_main as _
};
