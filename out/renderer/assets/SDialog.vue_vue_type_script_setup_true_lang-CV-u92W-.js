import { b as useVModel, d as createContext, e as useForwardExpose, P as Primitive, u as useId, D as DismissableLayer_default, s as useEmitAsProps, n as Presence_default, T as Teleport_default } from "./PopperContent-CPX94GL7.js";
import { x as defineComponent, j as toRefs, _ as renderSlot, v as unref, r as ref, C as openBlock, P as createBlock, Q as withCtx, $ as mergeProps, k as onMounted, D as createVNode, w as watch, c as computed, a0 as withDirectives, a1 as vShow, V as withModifiers, B as createCommentVNode, a6 as normalizeProps, a7 as guardReactiveProps, L as onBeforeUnmount, M as normalizeClass, y as createElementBlock, W as createTextVNode, O as toDisplayString, F as Fragment, z as createBaseVNode, A as normalizeStyle } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { g as getActiveElement, s as getOpenState, F as FocusScope_default, j as useHideOthers, f as useBodyScrollLock } from "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import { _ as _sfc_main$1 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as __unplugin_components_11 } from "./x-Cd6Sow4a.js";
const [injectDialogRootContext, provideDialogRootContext] = /* @__PURE__ */ createContext("DialogRoot");
var DialogRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "DialogRoot",
  props: {
    open: {
      type: Boolean,
      required: false,
      default: void 0
    },
    defaultOpen: {
      type: Boolean,
      required: false,
      default: false
    },
    modal: {
      type: Boolean,
      required: false,
      default: true
    },
    unmountOnHide: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = ref();
    const contentElement = ref();
    const { modal, unmountOnHide } = toRefs(props);
    provideDialogRootContext({
      open,
      modal,
      unmountOnHide,
      openModal: () => {
        open.value = true;
      },
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      contentId: "",
      titleId: "",
      descriptionId: "",
      triggerElement,
      contentElement
    });
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default", {
        open: unref(open),
        close: () => open.value = false
      });
    };
  }
});
var DialogRoot_default = DialogRoot_vue_vue_type_script_setup_true_lang_default;
var DialogClose_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogClose",
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
    useForwardExpose();
    const rootContext = injectDialogRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        type: _ctx.as === "button" ? "button" : void 0,
        onClick: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false))
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["type"]);
    };
  }
});
var DialogClose_default = DialogClose_vue_vue_type_script_setup_true_lang_default;
var DialogContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogContentImpl",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    trapFocus: {
      type: Boolean,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
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
    present: {
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
    const rootContext = injectDialogRootContext();
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    rootContext.titleId ||= useId(void 0, "reka-dialog-title");
    rootContext.descriptionId ||= useId(void 0, "reka-dialog-description");
    onMounted(() => {
      rootContext.contentElement = contentElement;
      if (getActiveElement() !== document.body) rootContext.triggerElement.value = getActiveElement();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FocusScope_default), {
        "as-child": "",
        loop: "",
        trapped: props.trapFocus,
        present: props.present,
        onMountAutoFocus: _cache[5] || (_cache[5] = ($event) => emits("openAutoFocus", $event)),
        onUnmountAutoFocus: _cache[6] || (_cache[6] = ($event) => emits("closeAutoFocus", $event))
      }, {
        default: withCtx(() => [createVNode(unref(DismissableLayer_default), mergeProps({
          id: unref(rootContext).contentId,
          ref: unref(forwardRef),
          as: _ctx.as,
          "as-child": _ctx.asChild,
          present: props.present,
          "disable-outside-pointer-events": _ctx.disableOutsidePointerEvents,
          role: "dialog",
          "aria-describedby": unref(rootContext).descriptionId,
          "aria-labelledby": unref(rootContext).titleId,
          "data-state": unref(getOpenState)(unref(rootContext).open.value)
        }, _ctx.$attrs, {
          onDismiss: _cache[0] || (_cache[0] = ($event) => unref(rootContext).onOpenChange(false)),
          onEscapeKeyDown: _cache[1] || (_cache[1] = ($event) => emits("escapeKeyDown", $event)),
          onFocusOutside: _cache[2] || (_cache[2] = ($event) => emits("focusOutside", $event)),
          onInteractOutside: _cache[3] || (_cache[3] = ($event) => emits("interactOutside", $event)),
          onPointerDownOutside: _cache[4] || (_cache[4] = ($event) => emits("pointerDownOutside", $event))
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "id",
          "as",
          "as-child",
          "present",
          "disable-outside-pointer-events",
          "aria-describedby",
          "aria-labelledby",
          "data-state"
        ])]),
        _: 3
      }, 8, ["trapped", "present"]);
    };
  }
});
var DialogContentImpl_default = DialogContentImpl_vue_vue_type_script_setup_true_lang_default;
var DialogContentModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogContentModal",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    trapFocus: {
      type: Boolean,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false,
      default: true
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    present: {
      type: Boolean,
      required: true
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
    const rootContext = injectDialogRootContext();
    const emitsAsProps = useEmitAsProps(emits);
    const { forwardRef, currentElement } = useForwardExpose();
    const ariaHiddenTarget = computed(() => props.present ? currentElement.value : void 0);
    useHideOthers(ariaHiddenTarget);
    const forwardedProps = computed(() => {
      const { present: _, ...rest } = props;
      return rest;
    });
    watch(() => props.present, (isPresent, wasPresent) => {
      if (!isPresent && wasPresent) rootContext.triggerElement.value?.focus();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(DialogContentImpl_default, mergeProps({
        ...forwardedProps.value,
        ...unref(emitsAsProps)
      }, {
        ref: unref(forwardRef),
        present: _ctx.present,
        "trap-focus": unref(rootContext).open.value,
        "disable-outside-pointer-events": props.disableOutsidePointerEvents,
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented) {
            event.preventDefault();
            unref(rootContext).triggerElement.value?.focus();
          }
        }),
        onPointerDownOutside: _cache[1] || (_cache[1] = (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: _cache[2] || (_cache[2] = (event) => {
          event.preventDefault();
        })
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "present",
        "trap-focus",
        "disable-outside-pointer-events"
      ]);
    };
  }
});
var DialogContentModal_default = DialogContentModal_vue_vue_type_script_setup_true_lang_default;
var DialogContentNonModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogContentNonModal",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    trapFocus: {
      type: Boolean,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
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
    present: {
      type: Boolean,
      required: true
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
    const emitsAsProps = useEmitAsProps(emits);
    useForwardExpose();
    const rootContext = injectDialogRootContext();
    const hasInteractedOutsideRef = ref(false);
    const hasPointerDownOutsideRef = ref(false);
    const forwardedProps = computed(() => {
      const { present: _, ...rest } = props;
      return rest;
    });
    watch(() => props.present, (isPresent, wasPresent) => {
      if (!isPresent && wasPresent) {
        if (!hasInteractedOutsideRef.value) rootContext.triggerElement.value?.focus();
        hasInteractedOutsideRef.value = false;
        hasPointerDownOutsideRef.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(DialogContentImpl_default, mergeProps({
        ...forwardedProps.value,
        ...unref(emitsAsProps)
      }, {
        present: _ctx.present,
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        onCloseAutoFocus: _cache[0] || (_cache[0] = (event) => {
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.value) unref(rootContext).triggerElement.value?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.value = false;
          hasPointerDownOutsideRef.value = false;
        }),
        onInteractOutside: _cache[1] || (_cache[1] = (event) => {
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
      }, 16, ["present"]);
    };
  }
});
var DialogContentNonModal_default = DialogContentNonModal_vue_vue_type_script_setup_true_lang_default;
var DialogContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogContent",
  props: {
    forceMount: {
      type: Boolean,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false,
      default: void 0
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
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectDialogRootContext();
    const emitsAsProps = useEmitAsProps(emits);
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence_default), {
        present: _ctx.forceMount || unref(rootContext).open.value,
        "force-mount": _ctx.forceMount || !unref(rootContext).unmountOnHide.value
      }, {
        default: withCtx(({ present }) => [unref(rootContext).modal.value ? withDirectives((openBlock(), createBlock(DialogContentModal_default, mergeProps({
          key: 0,
          ref: unref(forwardRef),
          present: unref(rootContext).unmountOnHide.value || present
        }, {
          ...props,
          ...unref(emitsAsProps),
          ..._ctx.$attrs
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 2
        }, 1040, ["present"])), [[vShow, unref(rootContext).unmountOnHide.value || present]]) : withDirectives((openBlock(), createBlock(DialogContentNonModal_default, mergeProps({
          key: 1,
          ref: unref(forwardRef),
          present: unref(rootContext).unmountOnHide.value || present
        }, {
          ...props,
          ...unref(emitsAsProps),
          ..._ctx.$attrs
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 2
        }, 1040, ["present"])), [[vShow, unref(rootContext).unmountOnHide.value || present]])]),
        _: 3
      }, 8, ["present", "force-mount"]);
    };
  }
});
var DialogContent_default = DialogContent_vue_vue_type_script_setup_true_lang_default;
var DialogDescription_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogDescription",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "p"
    }
  },
  setup(__props) {
    const props = __props;
    useForwardExpose();
    const rootContext = injectDialogRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(rootContext).descriptionId }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
var DialogDescription_default = DialogDescription_vue_vue_type_script_setup_true_lang_default;
var DialogOverlayImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogOverlayImpl",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    },
    present: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectDialogRootContext();
    const scrollLocked = useBodyScrollLock(props.present);
    watch(() => props.present, (val) => scrollLocked.value = val);
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-state": unref(rootContext).open.value ? "open" : "closed",
        style: { "pointer-events": "auto" },
        onPointerdown: _cache[0] || (_cache[0] = withModifiers(() => {
        }, [
          "left",
          "self",
          "prevent"
        ]))
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "as",
        "as-child",
        "data-state"
      ]);
    };
  }
});
var DialogOverlayImpl_default = DialogOverlayImpl_vue_vue_type_script_setup_true_lang_default;
var DialogOverlay_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogOverlay",
  props: {
    forceMount: {
      type: Boolean,
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
    const rootContext = injectDialogRootContext();
    const { forwardRef } = useForwardExpose();
    return (_ctx, _cache) => {
      return unref(rootContext)?.modal.value ? (openBlock(), createBlock(unref(Presence_default), {
        key: 0,
        present: _ctx.forceMount || unref(rootContext).open.value,
        "force-mount": _ctx.forceMount || !unref(rootContext).unmountOnHide.value
      }, {
        default: withCtx(({ present }) => [withDirectives(createVNode(DialogOverlayImpl_default, mergeProps(_ctx.$attrs, {
          ref: unref(forwardRef),
          as: _ctx.as,
          "as-child": _ctx.asChild,
          present: unref(rootContext).unmountOnHide.value || present
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 2
        }, 1040, [
          "as",
          "as-child",
          "present"
        ]), [[vShow, unref(rootContext).unmountOnHide.value || present]])]),
        _: 3
      }, 8, ["present", "force-mount"])) : createCommentVNode("v-if", true);
    };
  }
});
var DialogOverlay_default = DialogOverlay_vue_vue_type_script_setup_true_lang_default;
var DialogPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogPortal",
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
var DialogPortal_default = DialogPortal_vue_vue_type_script_setup_true_lang_default;
var DialogTitle_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogTitle",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "h2"
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectDialogRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, { id: unref(rootContext).titleId }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id"]);
    };
  }
});
var DialogTitle_default = DialogTitle_vue_vue_type_script_setup_true_lang_default;
var DialogTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DialogTrigger",
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
    const rootContext = injectDialogRootContext();
    const { forwardRef, currentElement } = useForwardExpose();
    rootContext.contentId ||= useId(void 0, "reka-dialog-content");
    onMounted(() => {
      rootContext.triggerElement.value = currentElement.value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        ref: unref(forwardRef),
        type: _ctx.as === "button" ? "button" : void 0,
        "aria-haspopup": "dialog",
        "aria-expanded": unref(rootContext).open.value || false,
        "aria-controls": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
        "data-state": unref(rootContext).open.value ? "open" : "closed",
        onClick: unref(rootContext).onOpenToggle
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "type",
        "aria-expanded",
        "aria-controls",
        "data-state",
        "onClick"
      ]);
    };
  }
});
var DialogTrigger_default = DialogTrigger_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1 = {
  key: 0,
  class: "shrink-0 px-5 pt-4 pb-3 pr-12"
};
const _hoisted_2 = {
  key: 2,
  class: "shrink-0 px-5 pt-3 pb-4 flex items-center justify-end gap-2"
};
const DESTROY_DELAY_MS = 180;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SDialog",
  props: {
    open: { type: Boolean },
    modal: { type: Boolean, default: true },
    title: {},
    description: {},
    closable: { type: Boolean, default: true },
    cover: { type: Boolean, default: false },
    width: { default: "460px" },
    height: { default: "auto" },
    top: {},
    contentStyle: {},
    lazy: { type: Boolean, default: true },
    destroyOnClose: { type: Boolean, default: false }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const containerStyle = computed(() => ({
      width: props.width,
      height: props.height === "auto" ? void 0 : props.height,
      maxHeight: props.height === "auto" ? "85vh" : void 0,
      top: props.top
    }));
    const emit = __emit;
    const isOpen = ref(props.open ?? false);
    const mounted = ref(!props.lazy && !props.destroyOnClose || isOpen.value);
    let destroyTimer;
    const syncMounted = (open) => {
      if (destroyTimer) {
        clearTimeout(destroyTimer);
        destroyTimer = void 0;
      }
      if (open) {
        mounted.value = true;
        return;
      }
      if (!props.destroyOnClose) return;
      destroyTimer = setTimeout(() => {
        mounted.value = false;
        destroyTimer = void 0;
      }, DESTROY_DELAY_MS);
    };
    watch(
      () => props.open,
      (val) => {
        if (val !== void 0) isOpen.value = val;
      }
    );
    watch(isOpen, syncMounted, { immediate: true });
    onBeforeUnmount(() => {
      if (destroyTimer) clearTimeout(destroyTimer);
    });
    const setOpen = (val) => {
      isOpen.value = val;
      emit("update:open", val);
    };
    return (_ctx, _cache) => {
      const _component_DialogTrigger = DialogTrigger_default;
      const _component_DialogOverlay = DialogOverlay_default;
      const _component_DialogTitle = DialogTitle_default;
      const _component_DialogDescription = DialogDescription_default;
      const _component_IconLucideX = __unplugin_components_11;
      const _component_SButton = _sfc_main$1;
      const _component_DialogClose = DialogClose_default;
      const _component_DialogContent = DialogContent_default;
      const _component_DialogPortal = DialogPortal_default;
      const _component_DialogRoot = DialogRoot_default;
      return openBlock(), createBlock(_component_DialogRoot, {
        open: unref(isOpen),
        modal: __props.modal,
        "onUpdate:open": setOpen
      }, {
        default: withCtx(() => [
          _ctx.$slots.trigger ? (openBlock(), createBlock(_component_DialogTrigger, {
            key: 0,
            "as-child": ""
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "trigger")
            ]),
            _: 3
          })) : createCommentVNode("", true),
          unref(mounted) ? (openBlock(), createBlock(_component_DialogPortal, { key: 1 }, {
            default: withCtx(() => [
              createVNode(_component_DialogOverlay, {
                class: normalizeClass([
                  "fixed inset-0 z-300 data-[state=open]:animate-overlay-in data-[state=closed]:animate-overlay-out",
                  __props.cover ? "bg-black/50" : "bg-black/40"
                ])
              }, null, 8, ["class"]),
              createVNode(_component_DialogContent, {
                style: normalizeStyle(unref(containerStyle)),
                class: normalizeClass([
                  "fixed left-1/2 z-300 -translate-x-1/2",
                  __props.top ? "" : "top-1/2 -translate-y-1/2",
                  "rounded-xl shadow-xl overflow-hidden",
                  "flex flex-col",
                  __props.top ? "data-[state=open]:animate-dialog-in-top data-[state=closed]:animate-dialog-out-top" : "data-[state=open]:animate-dialog-in data-[state=closed]:animate-dialog-out",
                  "focus:outline-none",
                  __props.cover ? "bg-black/55 backdrop-blur-xl backdrop-saturate-160 border border-solid border-white/10 text-cover" : "bg-surface-alt border border-solid border-outline-variant/30 text-on-surface"
                ])
              }, {
                default: withCtx(() => [
                  __props.title ? (openBlock(), createElementBlock("div", _hoisted_1, [
                    createVNode(_component_DialogTitle, { class: "text-lg font-semibold" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.title), 1)
                      ]),
                      _: 1
                    }),
                    __props.description ? (openBlock(), createBlock(_component_DialogDescription, {
                      key: 0,
                      class: normalizeClass(["text-xs mt-1", __props.cover ? "text-cover/50" : "text-on-surface/50"])
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.description), 1)
                      ]),
                      _: 1
                    }, 8, ["class"])) : (openBlock(), createBlock(_component_DialogDescription, {
                      key: 1,
                      class: "sr-only"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.title), 1)
                      ]),
                      _: 1
                    }))
                  ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createVNode(_component_DialogTitle, { class: "sr-only" }, {
                      default: withCtx(() => [..._cache[0] || (_cache[0] = [
                        createTextVNode("Dialog", -1)
                      ])]),
                      _: 1
                    }),
                    createVNode(_component_DialogDescription, { class: "sr-only" })
                  ], 64)),
                  createBaseVNode("div", {
                    class: normalizeClass(["flex-1 min-h-0 overflow-y-auto text-sm", [
                      __props.height === "auto" && "px-5",
                      __props.height === "auto" && !__props.title && "pt-4",
                      __props.height === "auto" && !_ctx.$slots.footer && "pb-4"
                    ]]),
                    style: normalizeStyle(__props.contentStyle)
                  }, [
                    renderSlot(_ctx.$slots, "default")
                  ], 6),
                  _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_2, [
                    renderSlot(_ctx.$slots, "footer", {
                      close: () => setOpen(false)
                    })
                  ])) : createCommentVNode("", true),
                  __props.closable ? (openBlock(), createBlock(_component_DialogClose, {
                    key: 3,
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_SButton, {
                        type: __props.cover ? "cover" : "default",
                        variant: "ghost",
                        size: "small",
                        circle: "",
                        class: "absolute top-3 right-3"
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_IconLucideX)
                        ]),
                        _: 1
                      }, 8, ["type"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 3
              }, 8, ["style", "class"])
            ]),
            _: 3
          })) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["open", "modal"]);
    };
  }
});
export {
  _sfc_main as _
};
