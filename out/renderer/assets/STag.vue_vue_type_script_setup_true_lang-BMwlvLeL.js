import { x as defineComponent, y as createElementBlock, M as normalizeClass, v as unref, _ as renderSlot, P as createBlock, V as withModifiers, Q as withCtx, D as createVNode, B as createCommentVNode, c as computed, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { _ as _sfc_main$1 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as __unplugin_components_11 } from "./x-Cd6Sow4a.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "STag",
  props: {
    type: { default: "primary" },
    variant: { default: "soft" },
    size: { default: "medium" },
    round: { type: Boolean },
    closable: { type: Boolean }
  },
  emits: ["close"],
  setup(__props) {
    const props = __props;
    const sizePresets = {
      tiny: { base: "h-4 px-1 text-[10px]", closable: "h-4 pl-1 pr-0.5 gap-0.5 text-[10px]" },
      small: { base: "h-5 px-1.5 text-xs", closable: "h-5 pl-1.5 pr-0.5 gap-1 text-xs" },
      medium: { base: "h-6 px-2 text-sm", closable: "h-6 pl-2 pr-1 gap-1 text-sm" },
      large: { base: "h-7 px-2.5 text-sm", closable: "h-7 pl-2.5 pr-1 gap-1.5 text-sm" }
    };
    const closeBtnSize = {
      tiny: { btn: 12, icon: 8 },
      small: { btn: 14, icon: 10 },
      medium: { btn: 16, icon: 11 },
      large: { btn: 20, icon: 13 }
    };
    const variantStyles = {
      soft: {
        default: "bg-on-surface/12 text-on-surface",
        primary: "bg-primary/15 text-primary",
        cover: "bg-cover/15 text-cover",
        info: "bg-blue-500/15 text-blue-500",
        success: "bg-green-600/15 text-green-600",
        warning: "bg-amber-500/15 text-amber-600",
        error: "bg-red-500/15 text-red-500"
      },
      filled: {
        default: "bg-on-surface text-surface",
        primary: "bg-primary text-on-primary",
        cover: "bg-cover/100 text-white",
        info: "bg-blue-500 text-white",
        success: "bg-green-600 text-white",
        warning: "bg-amber-500 text-white",
        error: "bg-red-500 text-white"
      },
      outline: {
        default: "border border-solid border-outline-variant text-on-surface",
        primary: "border border-solid border-primary/30 text-primary",
        cover: "border border-solid border-cover/30 text-cover",
        info: "border border-solid border-blue-500/30 text-blue-500",
        success: "border border-solid border-green-600/30 text-green-600",
        warning: "border border-solid border-amber-500/30 text-amber-600",
        error: "border border-solid border-red-500/30 text-red-500"
      }
    };
    const sizeClass = computed(
      () => props.closable ? sizePresets[props.size].closable : sizePresets[props.size].base
    );
    const variantClass = computed(() => variantStyles[props.variant][props.type]);
    const closeBtn = computed(() => closeBtnSize[props.size]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(["inline-flex items-center justify-center font-medium select-none whitespace-nowrap", [__props.round ? "rounded-full" : "rounded-md", unref(sizeClass), unref(variantClass)]])
      }, [
        renderSlot(_ctx.$slots, "default"),
        __props.closable ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          type: __props.type,
          variant: "ghost",
          circle: "",
          size: unref(closeBtn).btn,
          "icon-size": unref(closeBtn).icon,
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.$emit("close"), ["stop"]))
        }, {
          icon: withCtx(() => [
            createVNode(unref(__unplugin_components_11))
          ]),
          _: 1
        }, 8, ["type", "size", "icon-size"])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
export {
  _sfc_main as _
};
