import { e as useForwardExpose, P as Primitive, v as injectPopperContentContext, a as useDirection, d as createContext, m as useForwardPropsEmits, s as useEmitAsProps, b as useVModel, g as PopperRoot_default, l as useForwardProps, w as reactiveOmit, D as DismissableLayer_default, j as PopperContent_default, u as useId, n as Presence_default, T as Teleport_default, o as PopperAnchor_default } from "./PopperContent-CPX94GL7.js";
import { x as defineComponent, C as openBlock, P as createBlock, Q as withCtx, _ as renderSlot, y as createElementBlock, $ as mergeProps, v as unref, D as createVNode, A as normalizeStyle, c as computed, j as toRefs, w as watch, r as ref, a6 as normalizeProps, a7 as guardReactiveProps, i as isRef, k as onMounted, F as Fragment, n as nextTick, V as withModifiers, R as resolveDynamicComponent, J as onUnmounted, z as createBaseVNode, M as normalizeClass, B as createCommentVNode, m as markRaw, q as shallowRef, O as toDisplayString, Y as withKeys, W as createTextVNode, N as renderList, b as toRaw, I as provide } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { h as useFocusGuards, F as FocusScope_default, f as useBodyScrollLock, j as useHideOthers } from "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import { aa as useUserStore, u as useI18n, t as toast, d as useStatusStore, a as useSettingsStore, be as usePluginsStore, bp as insertToQueue, af as playNow, c as useRouter } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$5 } from "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import { _ as _sfc_main$9 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as _sfc_main$a } from "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import { q as MenuRoot_default, r as MenuContent_default, s as MenuItem_default, t as MenuPortal_default, v as MenuSub_default, x as MenuSubContent_default, y as MenuSubTrigger_default, z as MenuAnchor_default, g as usePlaylistStore, _ as _sfc_main$6, a as _sfc_main$7, u as useCopyText, o as openExternal, d as __unplugin_components_2, I as IconLucideMoreHorizontal, p as IconPuzzle, c as _sfc_main$b, f as IconLucideChevronRight } from "./more-horizontal-BtOolk7_.js";
import { _ as _sfc_main$8 } from "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import { _ as __unplugin_components_4 } from "./plus-BEApKDpl.js";
import { e as buildDownloadQualityItems } from "./useDownload-DvR_TELr.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { a as IconLucideFolderOpen, I as IconLucideDownload } from "./folder-open-Cw_0c4cI.js";
import { I as IconCopy } from "./copy-DhNjJWGd.js";
import { I as IconLucideTrash2 } from "./trash-2-BKyCA-Fb.js";
import { r as radioGroupContextKey } from "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
const _hoisted_1$c = {
  key: 0,
  d: "M0 0L6 6L12 0"
};
const _hoisted_2$2 = {
  key: 1,
  d: "M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0"
};
var Arrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "Arrow",
  props: {
    width: {
      type: Number,
      required: false,
      default: 10
    },
    height: {
      type: Number,
      required: false,
      default: 5
    },
    rounded: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "svg"
    }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        width: _ctx.width,
        height: _ctx.height,
        viewBox: _ctx.asChild ? void 0 : "0 0 12 6",
        preserveAspectRatio: _ctx.asChild ? void 0 : "none"
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [!_ctx.rounded ? (openBlock(), createElementBlock("path", _hoisted_1$c)) : (openBlock(), createElementBlock("path", _hoisted_2$2))])]),
        _: 3
      }, 16, [
        "width",
        "height",
        "viewBox",
        "preserveAspectRatio"
      ]);
    };
  }
});
var Arrow_default = Arrow_vue_vue_type_script_setup_true_lang_default;
const OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "PopperArrow",
  props: {
    width: {
      type: Number,
      required: false
    },
    height: {
      type: Number,
      required: false
    },
    rounded: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "svg"
    }
  },
  setup(__props) {
    const { forwardRef } = useForwardExpose();
    const contentContext = injectPopperContentContext();
    const baseSide = computed(() => OPPOSITE_SIDE[contentContext.placedSide.value]);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        ref: (el) => {
          unref(contentContext).onArrowChange(el ?? void 0);
          return void 0;
        },
        style: normalizeStyle({
          position: "absolute",
          left: unref(contentContext).arrowX?.value ? `${unref(contentContext).arrowX?.value}px` : void 0,
          top: unref(contentContext).arrowY?.value ? `${unref(contentContext).arrowY?.value}px` : void 0,
          [baseSide.value]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[unref(contentContext).placedSide.value],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[unref(contentContext).placedSide.value],
          visibility: unref(contentContext).shouldHideArrow.value ? "hidden" : void 0
        })
      }, [createVNode(Arrow_default, mergeProps(_ctx.$attrs, {
        ref: unref(forwardRef),
        style: { display: "block" },
        as: _ctx.as,
        "as-child": _ctx.asChild,
        rounded: _ctx.rounded,
        width: _ctx.width,
        height: _ctx.height
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "rounded",
        "width",
        "height"
      ])], 4);
    };
  }
});
var PopperArrow_default = PopperArrow_vue_vue_type_script_setup_true_lang_default;
const [injectContextMenuRootContext, provideContextMenuRootContext] = /* @__PURE__ */ createContext("ContextMenuRoot");
var ContextMenuRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "ContextMenuRoot",
  props: {
    pressOpenDelay: {
      type: Number,
      required: false,
      default: 700
    },
    dir: {
      type: String,
      required: false
    },
    modal: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { dir: propDir, modal, pressOpenDelay } = toRefs(props);
    useForwardExpose();
    const dir = useDirection(propDir);
    const open = ref(false);
    const triggerElement = ref();
    provideContextMenuRootContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      dir,
      modal,
      triggerElement,
      pressOpenDelay
    });
    watch(open, (value) => {
      emits("update:open", value);
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MenuRoot_default), {
        open: open.value,
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => open.value = $event),
        dir: unref(dir),
        modal: unref(modal)
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "open",
        "dir",
        "modal"
      ]);
    };
  }
});
var ContextMenuRoot_default = ContextMenuRoot_vue_vue_type_script_setup_true_lang_default;
var ContextMenuContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "ContextMenuContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    loop: {
      type: Boolean,
      required: false
    },
    memoDependencies: {
      type: Array,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false,
      default: 0
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false,
      default: true
    },
    collisionBoundary: {
      type: null,
      required: false,
      default: () => []
    },
    collisionPadding: {
      type: [Number, Object],
      required: false,
      default: 0
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false,
      default: "partial"
    },
    hideWhenDetached: {
      type: Boolean,
      required: false,
      default: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    useForwardExpose();
    const rootContext = injectContextMenuRootContext();
    const hasInteractedOutside = ref(false);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MenuContent_default), mergeProps(unref(forwarded), {
        side: "right",
        "side-offset": 2,
        align: "start",
        "update-position-strategy": "always",
        style: {
          "--reka-context-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
          "--reka-context-menu-content-available-width": "var(--reka-popper-available-width)",
          "--reka-context-menu-content-available-height": "var(--reka-popper-available-height)",
          "--reka-context-menu-trigger-width": "var(--reka-popper-anchor-width)",
          "--reka-context-menu-trigger-height": "var(--reka-popper-anchor-height)"
        },
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented && hasInteractedOutside.value) event.preventDefault();
          hasInteractedOutside.value = false;
        }),
        onInteractOutside: _cache[1] || (_cache[1] = (event) => {
          const originalEvent = event.detail.originalEvent;
          if (originalEvent.button === 2 && event.target === unref(rootContext).triggerElement.value) event.preventDefault();
          if (!event.defaultPrevented && !unref(rootContext).modal.value) hasInteractedOutside.value = true;
        })
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var ContextMenuContent_default = ContextMenuContent_vue_vue_type_script_setup_true_lang_default;
var ContextMenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "ContextMenuItem",
  props: {
    disabled: {
      type: Boolean,
      required: false
    },
    textValue: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const emitsAsProps = useEmitAsProps(emits);
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MenuItem_default), normalizeProps(guardReactiveProps({
        ...props,
        ...unref(emitsAsProps)
      })), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var ContextMenuItem_default = ContextMenuItem_vue_vue_type_script_setup_true_lang_default;
var ContextMenuPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "ContextMenuPortal",
  props: {
    to: {
      type: null,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    defer: {
      type: Boolean,
      required: false
    },
    forceMount: {
      type: Boolean,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MenuPortal_default), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var ContextMenuPortal_default = ContextMenuPortal_vue_vue_type_script_setup_true_lang_default;
var ContextMenuSub_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "ContextMenuSub",
  props: {
    defaultOpen: {
      type: Boolean,
      required: false
    },
    open: {
      type: Boolean,
      required: false,
      default: void 0
    }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useForwardExpose();
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MenuSub_default), {
        open: unref(open),
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null)
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
        _: 3
      }, 8, ["open"]);
    };
  }
});
var ContextMenuSub_default = ContextMenuSub_vue_vue_type_script_setup_true_lang_default;
var ContextMenuSubContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "ContextMenuSubContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    loop: {
      type: Boolean,
      required: false
    },
    memoDependencies: {
      type: Array,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MenuSubContent_default), mergeProps(unref(forwarded), { style: {
        "--reka-context-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-context-menu-content-available-width": "var(--reka-popper-available-width)",
        "--reka-context-menu-content-available-height": "var(--reka-popper-available-height)",
        "--reka-context-menu-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-context-menu-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var ContextMenuSubContent_default = ContextMenuSubContent_vue_vue_type_script_setup_true_lang_default;
var ContextMenuSubTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "ContextMenuSubTrigger",
  props: {
    disabled: {
      type: Boolean,
      required: false
    },
    textValue: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MenuSubTrigger_default), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var ContextMenuSubTrigger_default = ContextMenuSubTrigger_vue_vue_type_script_setup_true_lang_default;
function isTouchOrPen(event) {
  return event.pointerType !== "mouse";
}
var ContextMenuTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "ContextMenuTrigger",
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "span"
    }
  },
  setup(__props) {
    const props = __props;
    const { disabled } = toRefs(props);
    const { forwardRef, currentElement } = useForwardExpose();
    const rootContext = injectContextMenuRootContext();
    const point = ref({
      x: 0,
      y: 0
    });
    const virtualEl = computed(() => ({ getBoundingClientRect: () => ({
      width: 0,
      height: 0,
      left: point.value.x,
      right: point.value.x,
      top: point.value.y,
      bottom: point.value.y,
      ...point.value
    }) }));
    const longPressTimer = ref(0);
    function clearLongPress() {
      window.clearTimeout(longPressTimer.value);
    }
    function handleOpen(event) {
      point.value = {
        x: event.clientX,
        y: event.clientY
      };
      rootContext.onOpenChange(true);
    }
    async function handleContextMenu(event) {
      if (!disabled.value) {
        await nextTick();
        if (!event.defaultPrevented) {
          clearLongPress();
          handleOpen(event);
          event.preventDefault();
        }
      }
    }
    async function handlePointerDown(event) {
      if (!disabled.value) {
        await nextTick();
        if (isTouchOrPen(event) && !event.defaultPrevented) {
          clearLongPress();
          longPressTimer.value = window.setTimeout(handleOpen, rootContext.pressOpenDelay.value, event);
        }
      }
    }
    async function handlePointerEvent(event) {
      if (!disabled.value) {
        await nextTick();
        if (isTouchOrPen(event) && !event.defaultPrevented) clearLongPress();
      }
    }
    onMounted(() => {
      if (currentElement.value) rootContext.triggerElement.value = currentElement.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(MenuAnchor_default), {
        as: "template",
        reference: virtualEl.value
      }, null, 8, ["reference"]), createVNode(unref(Primitive), mergeProps({
        ref: unref(forwardRef),
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-state": unref(rootContext).open.value ? "open" : "closed",
        "data-disabled": unref(disabled) ? "" : void 0,
        style: {
          WebkitTouchCallout: "none",
          pointerEvents: "auto"
        }
      }, _ctx.$attrs, {
        onContextmenu: handleContextMenu,
        onPointerdown: handlePointerDown,
        onPointermove: handlePointerEvent,
        onPointercancel: handlePointerEvent,
        onPointerup: handlePointerEvent
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "data-state",
        "data-disabled"
      ])], 64);
    };
  }
});
var ContextMenuTrigger_default = ContextMenuTrigger_vue_vue_type_script_setup_true_lang_default;
const [injectPopoverRootContext, providePopoverRootContext] = /* @__PURE__ */ createContext("PopoverRoot");
var PopoverRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "PopoverRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    open: {
      type: Boolean,
      required: false,
      default: void 0
    },
    modal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { modal } = toRefs(props);
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = ref();
    const hasCustomAnchor = ref(false);
    providePopoverRootContext({
      contentId: "",
      triggerId: "",
      modal,
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      triggerElement,
      hasCustomAnchor
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(PopperRoot_default), null, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
          open: unref(open),
          close: () => open.value = false
        })]),
        _: 3
      });
    };
  }
});
var PopoverRoot_default = PopoverRoot_vue_vue_type_script_setup_true_lang_default;
var PopoverArrow_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "PopoverArrow",
  props: {
    width: {
      type: Number,
      required: false,
      default: 10
    },
    height: {
      type: Number,
      required: false,
      default: 5
    },
    rounded: {
      type: Boolean,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "svg"
    }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(PopperArrow_default), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var PopoverArrow_default = PopoverArrow_vue_vue_type_script_setup_true_lang_default;
var PopoverContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "PopoverContentImpl",
  props: {
    trapFocus: {
      type: Boolean,
      required: false
    },
    memoDependencies: {
      type: Array,
      required: false
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    dir: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardProps(reactiveOmit(props, "trapFocus", "disableOutsidePointerEvents"));
    const { forwardRef } = useForwardExpose();
    const rootContext = injectPopoverRootContext();
    useFocusGuards();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FocusScope_default), {
        "as-child": "",
        loop: "",
        trapped: _ctx.trapFocus,
        onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
        onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
      }, {
        default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
          "as-child": "",
          "disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
          onPointerDownOutside: _cache[0] || (_cache[0] = ($event) => emits("pointerDownOutside", $event)),
          onInteractOutside: _cache[1] || (_cache[1] = ($event) => emits("interactOutside", $event)),
          onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
          onFocusOutside: _cache[3] || (_cache[3] = ($event) => emits("focusOutside", $event)),
          onDismiss: _cache[4] || (_cache[4] = ($event) => unref(rootContext).onOpenChange(false))
        }, {
          default: withCtx(() => [createVNode(unref(PopperContent_default), mergeProps(unref(forwarded), {
            id: unref(rootContext).contentId,
            ref: unref(forwardRef),
            "data-state": unref(rootContext).open.value ? "open" : "closed",
            "aria-labelledby": unref(rootContext).triggerId,
            style: {
              "--reka-popover-content-transform-origin": "var(--reka-popper-transform-origin)",
              "--reka-popover-content-available-width": "var(--reka-popper-available-width)",
              "--reka-popover-content-available-height": "var(--reka-popper-available-height)",
              "--reka-popover-trigger-width": "var(--reka-popper-anchor-width)",
              "--reka-popover-trigger-height": "var(--reka-popper-anchor-height)"
            },
            role: "dialog"
          }), {
            default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
            _: 3
          }, 16, [
            "id",
            "data-state",
            "aria-labelledby"
          ])]),
          _: 3
        }, 8, ["disable-outside-pointer-events"])]),
        _: 3
      }, 8, ["trapped"]);
    };
  }
});
var PopoverContentImpl_default = PopoverContentImpl_vue_vue_type_script_setup_true_lang_default;
var PopoverContentModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "PopoverContentModal",
  props: {
    memoDependencies: {
      type: Array,
      required: false
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    dir: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectPopoverRootContext();
    const isRightClickOutsideRef = ref(false);
    useBodyScrollLock(true);
    const forwarded = useForwardPropsEmits(props, emits);
    const { forwardRef, currentElement } = useForwardExpose();
    useHideOthers(currentElement);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(PopoverContentImpl_default, mergeProps(unref(forwarded), {
        ref: unref(forwardRef),
        "trap-focus": unref(rootContext).open.value,
        "disable-outside-pointer-events": "",
        onCloseAutoFocus: _cache[0] || (_cache[0] = withModifiers((event) => {
          emits("closeAutoFocus", event);
          if (!isRightClickOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
        }, ["prevent"])),
        onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
          emits("pointerDownOutside", event);
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          isRightClickOutsideRef.value = isRightClick;
        }),
        onFocusOutside: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["prevent"]))
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["trap-focus"]);
    };
  }
});
var PopoverContentModal_default = PopoverContentModal_vue_vue_type_script_setup_true_lang_default;
var PopoverContentNonModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "PopoverContentNonModal",
  props: {
    memoDependencies: {
      type: Array,
      required: false
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    dir: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectPopoverRootContext();
    const hasInteractedOutsideRef = ref(false);
    const hasPointerDownOutsideRef = ref(false);
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(PopoverContentImpl_default, mergeProps(unref(forwarded), {
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          emits("closeAutoFocus", event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.value = false;
          hasPointerDownOutsideRef.value = false;
        }),
        onInteractOutside: _cache[1] || (_cache[1] = async (event) => {
          emits("interactOutside", event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.value = true;
            if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.value = true;
          }
          const target = event.target;
          const targetIsTrigger = unref(rootContext).triggerElement.value?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.value) event.preventDefault();
        })
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var PopoverContentNonModal_default = PopoverContentNonModal_vue_vue_type_script_setup_true_lang_default;
var PopoverContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "PopoverContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    memoDependencies: {
      type: Array,
      required: false
    },
    side: {
      type: null,
      required: false
    },
    sideOffset: {
      type: Number,
      required: false
    },
    sideFlip: {
      type: Boolean,
      required: false
    },
    align: {
      type: null,
      required: false
    },
    alignOffset: {
      type: Number,
      required: false
    },
    alignFlip: {
      type: Boolean,
      required: false
    },
    avoidCollisions: {
      type: Boolean,
      required: false
    },
    collisionBoundary: {
      type: null,
      required: false
    },
    collisionPadding: {
      type: [Number, Object],
      required: false
    },
    arrowPadding: {
      type: Number,
      required: false
    },
    hideShiftedArrow: {
      type: Boolean,
      required: false
    },
    sticky: {
      type: String,
      required: false
    },
    hideWhenDetached: {
      type: Boolean,
      required: false
    },
    positionStrategy: {
      type: String,
      required: false
    },
    updatePositionStrategy: {
      type: String,
      required: false
    },
    disableUpdateOnLayoutShift: {
      type: Boolean,
      required: false
    },
    prioritizePosition: {
      type: Boolean,
      required: false
    },
    reference: {
      type: null,
      required: false
    },
    dir: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    }
  },
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectPopoverRootContext();
    const forwarded = useForwardPropsEmits(props, emits);
    const { forwardRef } = useForwardExpose();
    rootContext.contentId ||= useId(void 0, "reka-popover-content");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(rootContext).open.value }, {
        default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(PopoverContentModal_default, mergeProps({ key: 0 }, unref(forwarded), { ref: unref(forwardRef) }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16)) : (openBlock(), createBlock(PopoverContentNonModal_default, mergeProps({ key: 1 }, unref(forwarded), { ref: unref(forwardRef) }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16))]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var PopoverContent_default = PopoverContent_vue_vue_type_script_setup_true_lang_default;
var PopoverPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "PopoverPortal",
  props: {
    to: {
      type: null,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    defer: {
      type: Boolean,
      required: false
    },
    forceMount: {
      type: Boolean,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Teleport_default), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var PopoverPortal_default = PopoverPortal_vue_vue_type_script_setup_true_lang_default;
var PopoverTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "PopoverTrigger",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "button"
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectPopoverRootContext();
    const { forwardRef, currentElement: triggerElement } = useForwardExpose();
    rootContext.triggerId ||= useId(void 0, "reka-popover-trigger");
    onMounted(() => {
      rootContext.triggerElement.value = triggerElement.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(unref(rootContext).hasCustomAnchor.value ? unref(Primitive) : unref(PopperAnchor_default)), { "as-child": "" }, {
        default: withCtx(() => [createVNode(unref(Primitive), {
          id: unref(rootContext).triggerId,
          ref: unref(forwardRef),
          type: _ctx.as === "button" ? "button" : void 0,
          "aria-haspopup": "dialog",
          "aria-expanded": unref(rootContext).open.value,
          "aria-controls": unref(rootContext).contentId,
          "data-state": unref(rootContext).open.value ? "open" : "closed",
          as: _ctx.as,
          "as-child": props.asChild,
          onClick: unref(rootContext).onOpenToggle
        }, {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "id",
          "type",
          "aria-expanded",
          "aria-controls",
          "data-state",
          "as",
          "as-child",
          "onClick"
        ])]),
        _: 3
      });
    };
  }
});
var PopoverTrigger_default = PopoverTrigger_vue_vue_type_script_setup_true_lang_default;
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SPopover",
  props: {
    side: { default: "bottom" },
    align: { default: "center" },
    sideOffset: { default: 6 },
    trigger: { default: "click" },
    open: { type: Boolean },
    openDelay: { default: 0 },
    closeDelay: { default: 100 },
    arrow: { type: Boolean, default: false },
    cover: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    contentClass: { default: "" }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isOpen = ref(props.open ?? false);
    watch(
      () => props.open,
      (val) => {
        if (val !== void 0) isOpen.value = val;
      }
    );
    const setOpen = (val) => {
      isOpen.value = val;
      emit("update:open", val);
    };
    let openTimer = null;
    let closeTimer = null;
    const clearTimers = () => {
      if (openTimer) {
        clearTimeout(openTimer);
        openTimer = null;
      }
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    };
    const handlePointerEnter = () => {
      if (props.trigger !== "hover") return;
      clearTimers();
      openTimer = setTimeout(() => setOpen(true), props.openDelay);
    };
    const handlePointerLeave = () => {
      if (props.trigger !== "hover") return;
      clearTimers();
      closeTimer = setTimeout(() => setOpen(false), props.closeDelay);
    };
    const handleFocus = () => {
      if (props.trigger !== "focus") return;
      setOpen(true);
    };
    const handleBlur = () => {
      if (props.trigger !== "focus") return;
      setOpen(false);
    };
    onUnmounted(clearTimers);
    const bridgeClasses = computed(
      () => props.trigger === "hover" ? [
        `before:content-[''] before:absolute`,
        // 弹层在触发器上方 → 桥铺在弹层底部
        "data-[side=top]:before:inset-x-0 data-[side=top]:before:top-full data-[side=top]:before:h-3",
        // 弹层在触发器下方 → 桥铺在弹层顶部
        "data-[side=bottom]:before:inset-x-0 data-[side=bottom]:before:bottom-full data-[side=bottom]:before:h-3",
        // 弹层在触发器左侧 → 桥铺在弹层右侧
        "data-[side=left]:before:inset-y-0 data-[side=left]:before:left-full data-[side=left]:before:w-3",
        // 弹层在触发器右侧 → 桥铺在弹层左侧
        "data-[side=right]:before:inset-y-0 data-[side=right]:before:right-full data-[side=right]:before:w-3"
      ] : null
    );
    return (_ctx, _cache) => {
      const _component_PopoverTrigger = PopoverTrigger_default;
      const _component_PopoverArrow = PopoverArrow_default;
      const _component_PopoverContent = PopoverContent_default;
      const _component_PopoverPortal = PopoverPortal_default;
      const _component_PopoverRoot = PopoverRoot_default;
      return openBlock(), createBlock(_component_PopoverRoot, {
        open: unref(isOpen),
        "onUpdate:open": _cache[1] || (_cache[1] = ($event) => __props.trigger === "click" ? setOpen($event) : void 0)
      }, {
        default: withCtx(() => [
          createVNode(_component_PopoverTrigger, { "as-child": "" }, {
            default: withCtx(() => [
              createBaseVNode("span", {
                class: normalizeClass(__props.block ? "flex w-full" : "inline-flex"),
                onPointerenter: handlePointerEnter,
                onPointerleave: handlePointerLeave,
                onFocusin: handleFocus,
                onFocusout: handleBlur
              }, [
                renderSlot(_ctx.$slots, "trigger")
              ], 34)
            ]),
            _: 3
          }),
          createVNode(_component_PopoverPortal, null, {
            default: withCtx(() => [
              createVNode(_component_PopoverContent, {
                side: __props.side,
                align: __props.align,
                "side-offset": __props.sideOffset,
                "avoid-collisions": true,
                "collision-padding": 12,
                class: normalizeClass([
                  "z-300 rounded-xl shadow-lg p-3 text-sm data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out",
                  __props.cover ? "bg-black/55 backdrop-blur-xl backdrop-saturate-160 border border-solid border-white/10 text-cover" : "bg-surface-bright text-on-surface",
                  unref(bridgeClasses),
                  __props.contentClass
                ]),
                onPointerenter: handlePointerEnter,
                onPointerleave: handlePointerLeave,
                onEscapeKeyDown: _cache[0] || (_cache[0] = ($event) => setOpen(false))
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default"),
                  __props.arrow ? (openBlock(), createBlock(_component_PopoverArrow, {
                    key: 0,
                    class: normalizeClass(__props.cover ? "fill-black/60" : "fill-surface-bright")
                  }, null, 8, ["class"])) : createCommentVNode("", true)
                ]),
                _: 3
              }, 8, ["side", "align", "side-offset", "class"])
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["open"]);
    };
  }
});
const _hoisted_1$b = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$7(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$b, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("path", { d: "M2 12h3m14 0h3M12 2v3m0 14v3" }),
      createBaseVNode("circle", {
        cx: "12",
        cy: "12",
        r: "7"
      })
    ], -1)
  ])]);
}
const __unplugin_components_16 = markRaw({ name: "lucide-locate", render: render$7 });
const _hoisted_1$a = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$a, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092a10 10 0 1 0-4.777-4.719"
    }, null, -1)
  ])]);
}
const IconMessageCircle = markRaw({ name: "lucide-message-circle", render: render$6 });
const usePlaylistPicker = () => {
  const user = useUserStore();
  const { t } = useI18n();
  const open = ref(false);
  const tracks = shallowRef([]);
  const mode = ref("local");
  const openPicker = (items) => {
    if (items.length === 0) return;
    const scope = items[0].source === "netease" ? "online" : "local";
    if (scope === "online" && !user.isLoggedIn) {
      toast.warning(t("liked.toast.needLogin"));
      return;
    }
    tracks.value = items;
    mode.value = scope;
    open.value = true;
  };
  return { open, tracks, mode, openPicker };
};
const _hoisted_1$9 = { class: "flex flex-col gap-4 pt-4" };
const _hoisted_2$1 = { class: "flex flex-col gap-1" };
const _hoisted_3$1 = { class: "text-xs text-on-surface-variant" };
const _hoisted_4$1 = { class: "flex flex-col gap-4 pt-4" };
const _hoisted_5$1 = { class: "flex flex-col gap-1" };
const _hoisted_6$1 = { class: "text-xs text-on-surface-variant" };
const _hoisted_7$1 = { class: "flex items-center gap-2" };
const _hoisted_8 = { class: "text-on-surface" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PlaylistCreateDialog",
  props: {
    open: { type: Boolean },
    mode: {},
    initialName: {}
  },
  emits: ["update:open", "created"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const playlistStore = usePlaylistStore();
    const userStore = useUserStore();
    const scope = ref(props.mode);
    const name = ref("");
    const privacy = ref(0);
    const submitting = ref(false);
    const typeTabs = computed(() => [
      { key: "local", label: t("collection.localPlaylist") },
      { key: "online", label: t("collection.onlinePlaylist") }
    ]);
    const canSubmit = computed(() => Boolean(name.value.trim()));
    watch(
      () => props.open,
      (open) => {
        if (!open) return;
        scope.value = props.mode;
        name.value = props.initialName?.trim() ?? "";
        privacy.value = 0;
        submitting.value = false;
      }
    );
    const handleConfirm = async () => {
      const title = name.value.trim();
      if (!canSubmit.value || submitting.value) return;
      submitting.value = true;
      try {
        let id;
        if (scope.value === "local") {
          id = (await playlistStore.create(title)).id;
        } else {
          id = (await userStore.createPlaylist(title, privacy.value)).id;
        }
        if (!id) {
          toast.error(t("liked.toast.failed"));
          return;
        }
        emit("created", id, scope.value);
        emit("update:open", false);
      } catch (error) {
        const message = error instanceof Error && error.message ? error.message : t("liked.toast.failed");
        toast.error(message);
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _cache) => {
      const _component_SInput = _sfc_main$6;
      const _component_SSwitch = _sfc_main$7;
      const _component_STabs = _sfc_main$8;
      const _component_SButton = _sfc_main$9;
      const _component_SDialog = _sfc_main$5;
      return openBlock(), createBlock(_component_SDialog, {
        open: __props.open,
        title: unref(t)("collection.create", { type: unref(t)("collection.playlist") }),
        width: "480px",
        "onUpdate:open": _cache[4] || (_cache[4] = (value) => emit("update:open", value))
      }, {
        footer: withCtx(({ close }) => [
          createVNode(_component_SButton, {
            variant: "tertiary",
            disabled: unref(submitting),
            onClick: close
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("common.cancel")), 1)
            ]),
            _: 1
          }, 8, ["disabled", "onClick"]),
          createVNode(_component_SButton, {
            type: "primary",
            disabled: !unref(canSubmit),
            loading: unref(submitting),
            onClick: handleConfirm
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("common.confirm")), 1)
            ]),
            _: 1
          }, 8, ["disabled", "loading"])
        ]),
        default: withCtx(() => [
          createVNode(_component_STabs, {
            modelValue: unref(scope),
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(scope) ? scope.value = $event : null),
            tabs: unref(typeTabs),
            type: "segment",
            animated: ""
          }, {
            local: withCtx(() => [
              createBaseVNode("div", _hoisted_1$9, [
                createBaseVNode("label", _hoisted_2$1, [
                  createBaseVNode("span", _hoisted_3$1, toDisplayString(unref(t)("collection.name", { type: unref(t)("collection.playlist") })), 1),
                  createVNode(_component_SInput, {
                    modelValue: unref(name),
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(name) ? name.value = $event : null),
                    placeholder: unref(t)("collection.playlistNamePlaceholder"),
                    disabled: unref(submitting),
                    clearable: "",
                    onKeyup: withKeys(handleConfirm, ["enter"])
                  }, null, 8, ["modelValue", "placeholder", "disabled"])
                ])
              ])
            ]),
            online: withCtx(() => [
              createBaseVNode("div", _hoisted_4$1, [
                createBaseVNode("label", _hoisted_5$1, [
                  createBaseVNode("span", _hoisted_6$1, toDisplayString(unref(t)("collection.name", { type: unref(t)("collection.playlist") })), 1),
                  createVNode(_component_SInput, {
                    modelValue: unref(name),
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(name) ? name.value = $event : null),
                    placeholder: unref(t)("collection.playlistNamePlaceholder"),
                    disabled: unref(submitting),
                    clearable: "",
                    onKeyup: withKeys(handleConfirm, ["enter"])
                  }, null, 8, ["modelValue", "placeholder", "disabled"])
                ]),
                createBaseVNode("div", _hoisted_7$1, [
                  createBaseVNode("span", _hoisted_8, toDisplayString(unref(t)("collection.privacy.private")), 1),
                  createVNode(_component_SSwitch, {
                    "model-value": unref(privacy) === 10,
                    disabled: unref(submitting),
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = (value) => privacy.value = value ? 10 : 0)
                  }, null, 8, ["model-value", "disabled"])
                ])
              ])
            ]),
            _: 1
          }, 8, ["modelValue", "tabs"])
        ]),
        _: 1
      }, 8, ["open", "title"]);
    };
  }
});
const _hoisted_1$8 = { class: "max-h-96 overflow-y-auto flex flex-col" };
const _hoisted_2 = { class: "size-12 rounded-md shrink-0 flex items-center justify-center bg-primary/10 text-primary" };
const _hoisted_3 = { class: "text-sm text-on-surface" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = { class: "flex-1 min-w-0 flex flex-col gap-0.5" };
const _hoisted_6 = { class: "text-sm text-on-surface truncate" };
const _hoisted_7 = { class: "text-xs text-on-surface-variant/60 tabular-nums" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PlaylistPickerDialog",
  props: {
    open: { type: Boolean },
    mode: {},
    tracks: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const playlistStore = usePlaylistStore();
    const userStore = useUserStore();
    const entries = computed(() => {
      if (props.mode === "local") {
        return playlistStore.localPlaylists.map((pl) => ({
          id: pl.id,
          name: pl.title,
          cover: pl.cover,
          trackCount: pl.trackCount ?? 0
        }));
      }
      return userStore.createdPlaylists.filter(
        (pl) => !!pl.id && pl.id !== userStore.likedPlaylistId
      ).map((pl) => ({
        id: pl.id,
        name: pl.name,
        cover: pl.cover,
        trackCount: pl.trackCount ?? 0
      }));
    });
    const createDialogOpen = ref(false);
    const submitting = ref(false);
    const handlePick = async (playlistId) => {
      if (submitting.value) return;
      submitting.value = true;
      try {
        let count = 0;
        if (props.mode === "local") {
          count = await playlistStore.addTracks(playlistId, props.tracks);
        } else {
          const ids = props.tracks.map((track) => track.id);
          count = await userStore.addTracksToPlaylist(playlistId, ids);
        }
        if (count > 0) {
          toast.success(t("collection.tracksAdded", { count }));
        } else {
          toast.warning(t("collection.alreadyInPlaylist"));
        }
        emit("update:open", false);
      } catch (err) {
        const message = err instanceof Error && err.message ? err.message : t("liked.toast.failed");
        toast.error(message);
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _cache) => {
      const _component_SImg = _sfc_main$a;
      const _component_SButton = _sfc_main$9;
      const _component_SDialog = _sfc_main$5;
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_SDialog, {
          open: __props.open,
          title: unref(t)("collection.addTo", { type: unref(t)("collection.playlist") }),
          width: "420px",
          "onUpdate:open": _cache[1] || (_cache[1] = (v) => emit("update:open", v))
        }, {
          footer: withCtx(({ close }) => [
            createVNode(_component_SButton, {
              variant: "tertiary",
              onClick: close
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("common.cancel")), 1)
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$8, [
              createBaseVNode("div", {
                class: "flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-on-surface/5 transition-colors",
                onClick: _cache[0] || (_cache[0] = ($event) => createDialogOpen.value = true)
              }, [
                createBaseVNode("div", _hoisted_2, [
                  createVNode(unref(__unplugin_components_4), { class: "size-5" })
                ]),
                createBaseVNode("span", _hoisted_3, toDisplayString(unref(t)("collection.create", { type: unref(t)("collection.playlist") })), 1)
              ]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(entries), (entry) => {
                return openBlock(), createElementBlock("div", {
                  key: entry.id,
                  class: normalizeClass(["flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-on-surface/5 transition-colors", unref(submitting) ? "pointer-events-none opacity-50" : ""]),
                  onClick: ($event) => handlePick(entry.id)
                }, [
                  createVNode(_component_SImg, {
                    src: entry.cover,
                    alt: entry.name,
                    class: "size-12 rounded-md shrink-0"
                  }, null, 8, ["src", "alt"]),
                  createBaseVNode("div", _hoisted_5, [
                    createBaseVNode("span", _hoisted_6, toDisplayString(entry.name), 1),
                    createBaseVNode("span", _hoisted_7, toDisplayString(unref(t)("common.totalSongs", { count: entry.trackCount })), 1)
                  ])
                ], 10, _hoisted_4);
              }), 128))
            ])
          ]),
          _: 1
        }, 8, ["open", "title"]),
        createVNode(_sfc_main$3, {
          open: unref(createDialogOpen),
          "onUpdate:open": _cache[2] || (_cache[2] = ($event) => isRef(createDialogOpen) ? createDialogOpen.value = $event : null),
          mode: __props.mode
        }, null, 8, ["open", "mode"])
      ], 64);
    };
  }
});
const _hoisted_1$7 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$5(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$7, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      d: "M11.288 20.2q-.363-.125-.638-.4l-1.725-1.575q-2.65-2.425-4.787-4.812T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.537t2.5-.563q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125t-.712-.125"
    }, null, -1)
  ])]);
}
const IconMaterialSymbolsFavoriteRounded = markRaw({ name: "material-symbols-favorite-rounded", render: render$5 });
const _hoisted_1$6 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$6, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M16 5H3m8 7H3m13 7H3M18 9v6m3-3h-6"
    }, null, -1)
  ])]);
}
const IconLucideListPlus = markRaw({ name: "lucide-list-plus", render: render$4 });
const getTrackShareUrl = (track) => {
  if (!track?.id) return null;
  switch (track.source) {
    case "netease":
      return `https://music.163.com/#/song?id=${track.id}`;
    case "qqmusic":
      return `https://y.qq.com/n/ryqq_v2/songDetail/${track.id}`;
    case "kugou":
      return `https://www.kugou.com/mixsong/${track.id}.html`;
    default:
      return null;
  }
};
const getCollectionShareUrl = (collection) => {
  if (!collection?.id) return null;
  const urls = {
    album: {
      netease: `https://music.163.com/#/album?id=${collection.id}`,
      qqmusic: `https://y.qq.com/n/ryqq_v2/albumDetail/${collection.id}`,
      kugou: `https://www.kugou.com/album/info/${collection.id}/`,
      streaming: null,
      local: null
    },
    playlist: {
      netease: `https://music.163.com/#/playlist?id=${collection.id}`,
      qqmusic: `https://y.qq.com/n/ryqq_v2/playlist/${collection.id}`,
      kugou: `https://www.kugou.com/songlist/${collection.id}/`,
      streaming: null,
      local: null
    },
    radio: {
      netease: `https://music.163.com/#/djradio?id=${collection.id}`,
      qqmusic: `https://y.qq.com/n/ryqq_v2/player_radio#id=${collection.id}`,
      kugou: `https://www.kugou.com/song/#fm_id=${collection.id}`,
      streaming: null,
      local: null
    },
    cloud: {
      netease: null,
      qqmusic: null,
      kugou: null,
      streaming: null,
      local: null
    }
  };
  return urls[collection.type]?.[collection.source] ?? null;
};
const _hoisted_1$5 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$5, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("path", { d: "M16 5H3m13 7H3m6 7H3m13-3l-3 3l3 3" }),
      createBaseVNode("path", { d: "M21 5v12a2 2 0 0 1-2 2h-6" })
    ], -1)
  ])]);
}
const IconLucideListEnd = markRaw({ name: "lucide-list-end", render: render$3 });
const _hoisted_1$4 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
      createBaseVNode("path", { d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" })
    ], -1)
  ])]);
}
const IconSquarePen = markRaw({ name: "lucide-square-pen", render: render$2 });
const _hoisted_1$3 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M16 5H3m8 7H3m13 7H3m18-7h-6"
    }, null, -1)
  ])]);
}
const IconLucideListMinus = markRaw({ name: "lucide-list-minus", render: render$1 });
const _hoisted_1$2 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057m-2.926 2.753A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78M2 2l20 20"
    }, null, -1)
  ])]);
}
const IconLucideCloudOff = markRaw({ name: "lucide-cloud-off", render });
const useTrackMenu = (track, options = {}) => {
  const { t } = useI18n();
  const router = useRouter();
  const status = useStatusStore();
  const settings = useSettingsStore();
  const plugins = usePluginsStore();
  const { copy } = useCopyText();
  const isPlaylist = options.collectionType === "playlist";
  const isCloudView = options.collectionType === "cloud";
  const showPlay = !options.hidePlayActions;
  const canRemove = options.canRemove !== false;
  const items = computed(() => {
    const source = track.value?.source;
    const isLocal = source === "local";
    const isCue = !!track.value?.cuePath;
    const showCloudRemove = isCloudView && track.value?.cloud === true;
    const canAddToPlaylist = source === "local" || source === "netease";
    const isOnline = source !== "local" && source !== "streaming";
    const base = [
      { key: "play", label: t("songList.context.play"), icon: markRaw(__unplugin_components_0), show: showPlay },
      {
        key: "playNext",
        label: t("songList.context.playNext"),
        icon: markRaw(IconLucideListEnd),
        show: showPlay
      },
      {
        key: "addToPlaylist",
        label: t("collection.addTo", { type: t("collection.playlist") }),
        icon: markRaw(IconLucideListPlus),
        separator: showPlay,
        show: canAddToPlaylist
      },
      {
        key: "showInExplorer",
        label: t("songList.context.showInExplorer"),
        icon: markRaw(IconLucideFolderOpen),
        separator: true,
        show: isLocal
      },
      {
        key: "copyPath",
        label: t("songList.context.copyPath"),
        icon: markRaw(IconCopy),
        show: isLocal
      },
      {
        key: "editTags",
        label: t("songList.context.editTags"),
        icon: markRaw(IconSquarePen),
        show: isLocal && !isCue && !!options.onEditTags
      },
      {
        key: "download",
        label: t("songList.context.download"),
        icon: markRaw(IconLucideDownload),
        separator: true,
        show: !isLocal && !!options.onDownload && settings.system.download.enabled,
        children: buildDownloadQualityItems(t("download.qualityDefault"), "download:")
      },
      {
        key: "removeFromCollection",
        label: t("collection.removeFrom", { type: t("collection.playlist") }),
        icon: markRaw(IconLucideListMinus),
        separator: true,
        show: isPlaylist && canRemove
      },
      {
        key: "deleteFile",
        label: t("songList.context.deleteFile"),
        icon: markRaw(IconLucideTrash2),
        separator: !(isPlaylist && canRemove),
        show: isLocal && !isCue
      },
      {
        key: "removeFromCloud",
        label: t("cloud.removeAction"),
        icon: markRaw(IconLucideCloudOff),
        separator: true,
        show: showCloudRemove
      },
      {
        key: "searchSame",
        label: t("songList.context.searchSame"),
        icon: markRaw(__unplugin_components_2),
        separator: true
      },
      {
        key: "comments",
        label: t("comments.name"),
        icon: markRaw(IconMessageCircle)
      },
      {
        key: "more",
        label: t("songList.context.more"),
        icon: markRaw(IconLucideMoreHorizontal),
        children: [
          {
            key: "copyTitle",
            label: t("songList.context.copyTitle"),
            icon: markRaw(IconCopy)
          },
          {
            key: "copyId",
            label: t("songList.context.copyId"),
            icon: markRaw(IconCopy),
            show: !isLocal
          },
          {
            key: "copyUrl",
            label: t("songList.context.copyUrl"),
            icon: markRaw(IconCopy),
            show: isOnline
          }
        ]
      }
    ];
    const pluginGroups = [];
    for (const group of plugins.menuContributions) {
      const children = group.menus.filter((menu) => !menu.sources || menu.sources.includes(source ?? "")).map((menu) => ({ key: `plugin:${group.pluginId}:${menu.id}`, label: menu.label }));
      if (!children.length) continue;
      pluginGroups.push({
        key: `plugin:${group.pluginId}`,
        label: group.pluginName,
        icon: markRaw(IconPuzzle),
        separator: pluginGroups.length === 0,
        children
      });
    }
    return [...base, ...pluginGroups];
  });
  const handleSelect = async (key) => {
    const current = track.value;
    if (!current) return;
    if (key.startsWith("download:")) {
      const quality = key.slice("download:".length);
      options.onDownload?.(current, quality ? quality : void 0);
      return;
    }
    if (key.startsWith("plugin:")) {
      const rest = key.slice("plugin:".length);
      const sep = rest.indexOf(":");
      if (sep <= 0) return;
      const res = await window.api.plugins.invokeMenu({
        pluginId: rest.slice(0, sep),
        menuId: rest.slice(sep + 1),
        track: toRaw(current)
      });
      if (!res?.ok) {
        if (res?.error) toast.error(res.error);
        return;
      }
      if (res.copyText) await copy(res.copyText);
      if (res.openUrl) openExternal(res.openUrl);
      if (res.toast) toast.success(res.toast);
      return;
    }
    switch (key) {
      case "play":
        playNow(current, options.playbackContext?.value);
        break;
      case "playNext":
        insertToQueue(current, void 0, options.playbackContext?.value);
        toast.success(t("songList.toast.addedToNext"));
        break;
      case "addToPlaylist":
        options.onAddToPlaylist?.(current);
        break;
      case "showInExplorer":
        if (current.cueAudioPath ?? current.path) {
          window.api.system.showInExplorer(current.cueAudioPath ?? current.path);
        }
        break;
      case "copyPath":
        if (current.cueAudioPath ?? current.path)
          await copy(current.cueAudioPath ?? current.path);
        break;
      case "removeFromCollection":
        options.onRemove?.(current);
        break;
      case "deleteFile":
        options.onDeleteFile?.(current);
        break;
      case "editTags":
        options.onEditTags?.(current);
        break;
      case "removeFromCloud":
        options.onRemoveFromCloud?.(current);
        break;
      case "searchSame":
        router.push({ path: "/search", query: { q: current.title } });
        break;
      case "comments":
        status.showComments(current);
        break;
      case "copyTitle":
        await copy(current.title);
        break;
      case "copyId":
        await copy(current.id);
        break;
      case "copyUrl":
        await copy(getTrackShareUrl(current));
        break;
    }
  };
  return { items, handleSelect };
};
const _hoisted_1$1 = { class: "flex-1" };
const contentClass = "z-300 min-w-32 max-w-52 rounded-lg bg-surface-bright shadow-lg p-1 text-sm data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out";
const menuItemClass = "flex items-center gap-2 px-2 py-1.5 rounded-md text-on-surface outline-none select-none cursor-pointer data-[highlighted]:bg-on-surface/12 data-[disabled]:opacity-40 data-[disabled]:pointer-events-none";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SContextMenu",
  props: {
    items: {},
    alignOffset: { default: 0 }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const visibleItems = computed(
      () => props.items.map((item) => {
        if (item.children) {
          return { ...item, children: item.children.filter((child) => child.show !== false) };
        }
        return item;
      }).filter((item) => item.show !== false && (item.children?.length ?? 1) > 0)
    );
    const handleSelect = (item) => {
      if (item.disabled) return;
      emit("select", item.key);
    };
    return (_ctx, _cache) => {
      const _component_ContextMenuTrigger = ContextMenuTrigger_default;
      const _component_SDivider = _sfc_main$b;
      const _component_IconLucideChevronRight = IconLucideChevronRight;
      const _component_ContextMenuSubTrigger = ContextMenuSubTrigger_default;
      const _component_ContextMenuItem = ContextMenuItem_default;
      const _component_ContextMenuSubContent = ContextMenuSubContent_default;
      const _component_ContextMenuPortal = ContextMenuPortal_default;
      const _component_ContextMenuSub = ContextMenuSub_default;
      const _component_ContextMenuContent = ContextMenuContent_default;
      const _component_ContextMenuRoot = ContextMenuRoot_default;
      return openBlock(), createBlock(_component_ContextMenuRoot, null, {
        default: withCtx(() => [
          createVNode(_component_ContextMenuTrigger, {
            as: "div",
            class: "contents"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }),
          createVNode(_component_ContextMenuPortal, null, {
            default: withCtx(() => [
              createVNode(_component_ContextMenuContent, {
                "align-offset": __props.alignOffset,
                "avoid-collisions": true,
                "collision-padding": 12,
                class: normalizeClass(contentClass)
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "header"),
                  _ctx.$slots.header ? (openBlock(), createBlock(_component_SDivider, {
                    key: 0,
                    class: "mx-1.5 my-0.5"
                  })) : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(visibleItems), (item, index) => {
                    return openBlock(), createElementBlock(Fragment, {
                      key: item.key
                    }, [
                      item.separator && index > 0 ? (openBlock(), createBlock(_component_SDivider, {
                        key: 0,
                        class: "mx-1.5 my-0.5"
                      })) : createCommentVNode("", true),
                      item.children ? (openBlock(), createBlock(_component_ContextMenuSub, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode(_component_ContextMenuSubTrigger, {
                            disabled: item.disabled,
                            class: normalizeClass(menuItemClass)
                          }, {
                            default: withCtx(() => [
                              item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                key: 0,
                                class: "size-3.5 opacity-60 shrink-0"
                              })) : createCommentVNode("", true),
                              createBaseVNode("span", _hoisted_1$1, toDisplayString(item.label), 1),
                              createVNode(_component_IconLucideChevronRight, { class: "size-3 opacity-40 shrink-0" })
                            ]),
                            _: 2
                          }, 1032, ["disabled"]),
                          createVNode(_component_ContextMenuPortal, null, {
                            default: withCtx(() => [
                              createVNode(_component_ContextMenuSubContent, {
                                "side-offset": 4,
                                "avoid-collisions": true,
                                "collision-padding": 12,
                                class: normalizeClass([contentClass, "max-h-60 overflow-y-auto"])
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.children, (child, childIndex) => {
                                    return openBlock(), createElementBlock(Fragment, {
                                      key: child.key
                                    }, [
                                      child.separator && childIndex > 0 ? (openBlock(), createBlock(_component_SDivider, {
                                        key: 0,
                                        class: "mx-1.5 my-0.5"
                                      })) : (openBlock(), createBlock(_component_ContextMenuItem, {
                                        key: 1,
                                        disabled: child.disabled,
                                        class: normalizeClass(menuItemClass),
                                        onSelect: ($event) => handleSelect(child)
                                      }, {
                                        default: withCtx(() => [
                                          child.icon ? (openBlock(), createBlock(resolveDynamicComponent(child.icon), {
                                            key: 0,
                                            class: "size-3.5 opacity-60 shrink-0"
                                          })) : createCommentVNode("", true),
                                          createBaseVNode("span", null, toDisplayString(child.label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["disabled", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["class"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)) : (openBlock(), createBlock(_component_ContextMenuItem, {
                        key: 2,
                        disabled: item.disabled,
                        class: normalizeClass(menuItemClass),
                        onSelect: ($event) => handleSelect(item)
                      }, {
                        default: withCtx(() => [
                          item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                            key: 0,
                            class: "size-3.5 opacity-60 shrink-0"
                          })) : createCommentVNode("", true),
                          createBaseVNode("span", null, toDisplayString(item.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["disabled", "onSelect"]))
                    ], 64);
                  }), 128))
                ]),
                _: 3
              }, 8, ["align-offset"])
            ]),
            _: 3
          })
        ]),
        _: 3
      });
    };
  }
});
const _hoisted_1 = ["aria-disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SRadioGroup",
  props: {
    value: { type: [String, Number, Boolean, null], default: null },
    name: { default: void 0 },
    disabled: { type: Boolean, default: false },
    size: { default: void 0 }
  },
  emits: ["update:value"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const groupValue = computed(() => props.value);
    const groupName = computed(() => props.name);
    const groupDisabled = computed(() => props.disabled);
    const groupSize = computed(() => props.size);
    const select = (item) => {
      if (groupValue.value === item) return;
      emit("update:value", item);
    };
    provide(radioGroupContextKey, {
      value: groupValue,
      name: groupName,
      disabled: groupDisabled,
      size: groupSize,
      select
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "radiogroup",
        "aria-disabled": __props.disabled ? "true" : "false",
        class: normalizeClass(["inline-flex flex-wrap items-center gap-3", __props.disabled ? "opacity-60" : ""])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 10, _hoisted_1);
    };
  }
});
export {
  IconMaterialSymbolsFavoriteRounded as I,
  _sfc_main$4 as _,
  __unplugin_components_16 as a,
  _sfc_main$2 as b,
  IconMessageCircle as c,
  IconLucideListPlus as d,
  useTrackMenu as e,
  _sfc_main$1 as f,
  _sfc_main as g,
  _sfc_main$3 as h,
  getCollectionShareUrl as i,
  IconLucideListEnd as j,
  IconLucideListMinus as k,
  IconLucideCloudOff as l,
  usePlaylistPicker as u
};
