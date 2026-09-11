import { _ as __unplugin_components_5 } from "./SLoading-C4RltnK4.js";
import { br as vRipple } from "./index-DVKNk9gd.js";
import { x as defineComponent, a0 as withDirectives, v as unref, y as createElementBlock, A as normalizeStyle, M as normalizeClass, P as createBlock, _ as renderSlot, B as createCommentVNode, c as computed, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const _hoisted_1 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SButton",
  props: {
    type: { default: "default" },
    variant: { default: "filled" },
    dashed: { type: Boolean },
    round: { type: Boolean },
    circle: { type: Boolean },
    size: { default: "medium" },
    iconSize: {},
    disabled: { type: Boolean },
    loading: { type: Boolean },
    block: { type: Boolean },
    strong: { type: Boolean },
    ripple: { type: Boolean },
    static: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const isDisabled = computed(() => props.disabled || props.loading);
    const enableRipple = computed(() => props.ripple && !props.disabled && !props.loading);
    const pressScale = computed(() => props.static ? void 0 : "not-disabled:active:scale-96");
    const circleSizePresets = {
      tiny: "w-6 h-6 text-xs",
      small: "w-8 h-8 text-sm",
      medium: "w-9 h-9 text-sm",
      large: "w-10 h-10 text-base"
    };
    const normalSizePresets = {
      tiny: "px-1.5 h-6 text-xs",
      small: "px-2.5 h-8 text-sm",
      medium: "px-3.5 h-9 text-sm",
      large: "px-4.5 h-10 text-base"
    };
    const iconSizePresets = {
      tiny: "size-3.5",
      small: "size-4",
      medium: "size-4.5",
      large: "size-5"
    };
    const isNumericSize = computed(() => typeof props.size === "number");
    const sizeClass = computed(() => {
      if (isNumericSize.value || props.size === "auto") return void 0;
      const preset = props.size;
      return props.circle ? circleSizePresets[preset] : normalSizePresets[preset];
    });
    const numericSizeStyle = computed(() => {
      if (!isNumericSize.value) return void 0;
      const px = `${props.size}px`;
      return props.circle ? { width: px, height: px } : {
        height: px,
        paddingLeft: `${props.size * 0.35}px`,
        paddingRight: `${props.size * 0.35}px`
      };
    });
    const iconSizeClass = computed(() => {
      if (isNumericSize.value || props.size === "auto") return void 0;
      return iconSizePresets[props.size];
    });
    const numericIconStyle = computed(() => {
      if (typeof props.iconSize === "number") {
        const px = `${props.iconSize}px`;
        return { width: px, height: px };
      }
      if (!isNumericSize.value) return void 0;
      const iconPx = `${Math.round(props.size * 0.5)}px`;
      return { width: iconPx, height: iconPx };
    });
    const variantStyles = {
      filled: {
        default: "bg-on-surface text-surface not-disabled:hover:bg-on-surface/90 not-disabled:active:bg-on-surface/80",
        primary: "bg-primary text-on-primary not-disabled:hover:bg-primary/90 not-disabled:active:bg-primary/80",
        cover: "bg-cover/100 text-white not-disabled:hover:bg-cover/90 not-disabled:active:bg-cover/80",
        info: "bg-blue-500 text-white not-disabled:hover:bg-blue-500/90 not-disabled:active:bg-blue-500/80",
        success: "bg-green-600 text-white not-disabled:hover:bg-green-600/90 not-disabled:active:bg-green-600/80",
        warning: "bg-amber-500 text-white not-disabled:hover:bg-amber-500/90 not-disabled:active:bg-amber-500/80",
        error: "bg-red-500 text-white not-disabled:hover:bg-red-500/90 not-disabled:active:bg-red-500/80"
      },
      outline: {
        default: "has-border border-solid border-outline-variant text-on-surface not-disabled:hover:bg-on-surface/6 not-disabled:active:bg-on-surface/10",
        primary: "has-border border-solid border-primary/15 bg-primary/5 text-primary not-disabled:hover:bg-primary/10 not-disabled:active:bg-primary/16",
        cover: "has-border border-solid border-cover/15 bg-cover/5 text-cover not-disabled:hover:bg-cover/10 not-disabled:active:bg-cover/16",
        info: "has-border border-solid border-blue-500/15 bg-blue-500/5 text-blue-500 not-disabled:hover:bg-blue-500/10 not-disabled:active:bg-blue-500/16",
        success: "has-border border-solid border-green-600/15 bg-green-600/5 text-green-600 not-disabled:hover:bg-green-600/10 not-disabled:active:bg-green-600/16",
        warning: "has-border border-solid border-amber-500/15 bg-amber-500/5 text-amber-600 not-disabled:hover:bg-amber-500/10 not-disabled:active:bg-amber-500/16",
        error: "has-border border-solid border-red-500/15 bg-red-500/5 text-red-500 not-disabled:hover:bg-red-500/10 not-disabled:active:bg-red-500/16"
      },
      bordered: {
        default: "has-border border-solid border-outline-variant text-on-surface not-disabled:hover:border-outline not-disabled:active:border-on-surface/30",
        primary: "has-border border-solid border-primary/30 text-primary not-disabled:hover:border-primary/20 not-disabled:active:border-primary/14",
        cover: "has-border border-solid border-cover/30 text-cover not-disabled:hover:border-cover/20 not-disabled:active:border-cover/14",
        info: "has-border border-solid border-blue-500/30 text-blue-500 not-disabled:hover:border-blue-500/20 not-disabled:active:border-blue-500/14",
        success: "has-border border-solid border-green-600/30 text-green-600 not-disabled:hover:border-green-600/20 not-disabled:active:border-green-600/14",
        warning: "has-border border-solid border-amber-500/30 text-amber-600 not-disabled:hover:border-amber-500/20 not-disabled:active:border-amber-500/14",
        error: "has-border border-solid border-red-500/30 text-red-500 not-disabled:hover:border-red-500/20 not-disabled:active:border-red-500/14"
      },
      secondary: {
        default: "bg-on-surface/12 text-on-surface not-disabled:hover:bg-on-surface/18 not-disabled:active:bg-on-surface/24",
        primary: "bg-primary/16 text-primary not-disabled:hover:bg-primary/22 not-disabled:active:bg-primary/28",
        cover: "bg-cover/16 text-cover not-disabled:hover:bg-cover/22 not-disabled:active:bg-cover/28",
        info: "bg-blue-500/16 text-blue-500 not-disabled:hover:bg-blue-500/22 not-disabled:active:bg-blue-500/28",
        success: "bg-green-600/16 text-green-600 not-disabled:hover:bg-green-600/22 not-disabled:active:bg-green-600/28",
        warning: "bg-amber-500/16 text-amber-600 not-disabled:hover:bg-amber-500/22 not-disabled:active:bg-amber-500/28",
        error: "bg-red-500/16 text-red-500 not-disabled:hover:bg-red-500/22 not-disabled:active:bg-red-500/28"
      },
      tertiary: {
        default: "bg-on-surface/5 text-on-surface not-disabled:hover:bg-on-surface/10 not-disabled:active:bg-on-surface/16",
        primary: "bg-primary/8 text-primary not-disabled:hover:bg-primary/14 not-disabled:active:bg-primary/20",
        cover: "bg-cover/8 text-cover not-disabled:hover:bg-cover/14 not-disabled:active:bg-cover/20",
        info: "bg-blue-500/8 text-blue-500 not-disabled:hover:bg-blue-500/14 not-disabled:active:bg-blue-500/20",
        success: "bg-green-600/8 text-green-600 not-disabled:hover:bg-green-600/14 not-disabled:active:bg-green-600/20",
        warning: "bg-amber-500/8 text-amber-600 not-disabled:hover:bg-amber-500/14 not-disabled:active:bg-amber-500/20",
        error: "bg-red-500/8 text-red-500 not-disabled:hover:bg-red-500/14 not-disabled:active:bg-red-500/20"
      },
      ghost: {
        default: "text-on-surface not-disabled:hover:bg-on-surface/8 not-disabled:active:bg-on-surface/14",
        primary: "text-primary not-disabled:hover:bg-primary/10 not-disabled:active:bg-primary/16",
        cover: "text-cover not-disabled:hover:bg-cover/10 not-disabled:active:bg-cover/16",
        info: "text-blue-500 not-disabled:hover:bg-blue-500/10 not-disabled:active:bg-blue-500/16",
        success: "text-green-600 not-disabled:hover:bg-green-600/10 not-disabled:active:bg-green-600/16",
        warning: "text-amber-600 not-disabled:hover:bg-amber-500/10 not-disabled:active:bg-amber-500/16",
        error: "text-red-500 not-disabled:hover:bg-red-500/10 not-disabled:active:bg-red-500/16"
      },
      text: {
        default: "text-on-surface not-disabled:hover:text-primary",
        primary: "text-primary not-disabled:hover:text-primary/70",
        cover: "text-cover not-disabled:hover:text-cover/70",
        info: "text-blue-500 not-disabled:hover:text-blue-400",
        success: "text-green-600 not-disabled:hover:text-green-500",
        warning: "text-amber-600 not-disabled:hover:text-amber-500",
        error: "text-red-500 not-disabled:hover:text-red-400"
      }
    };
    const variantClass = computed(() => {
      const styles = variantStyles[props.variant];
      const semanticType = props.type in styles ? props.type : "default";
      const classes = [styles[semanticType]];
      if (props.dashed && (props.variant === "outline" || props.variant === "bordered")) {
        classes.push("border-dashed");
      }
      return classes;
    });
    return (_ctx, _cache) => {
      const _component_SLoading = __unplugin_components_5;
      return withDirectives((openBlock(), createElementBlock("button", {
        disabled: unref(isDisabled),
        class: normalizeClass(["s-button inline-flex items-center gap-1.5 font-sans select-none outline-none cursor-pointer transition-[color,background-color,border-color,opacity,transform] duration-200 disabled:cursor-not-allowed disabled:op-50", [
          __props.block && "w-full",
          __props.strong && "font-semibold",
          __props.size === "auto" && !__props.circle ? "justify-start" : "justify-center",
          __props.circle || __props.round ? "rounded-full" : "rounded-1.5",
          unref(pressScale),
          unref(sizeClass),
          unref(variantClass)
        ]]),
        style: normalizeStyle(unref(numericSizeStyle))
      }, [
        _ctx.$slots.icon || __props.loading ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(["shrink-0 flex items-center justify-center overflow-hidden *:size-full", unref(iconSizeClass)]),
          style: normalizeStyle(unref(numericIconStyle))
        }, [
          __props.loading ? (openBlock(), createBlock(_component_SLoading, { key: 0 })) : renderSlot(_ctx.$slots, "icon", {}, void 0, void 0, 1)
        ], 6)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default")
      ], 14, _hoisted_1)), [
        [unref(vRipple), unref(enableRipple)]
      ]);
    };
  }
});
export {
  _sfc_main as _
};
