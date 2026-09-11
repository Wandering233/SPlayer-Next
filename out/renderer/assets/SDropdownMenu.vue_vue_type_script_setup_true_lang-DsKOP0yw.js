import { e as useForwardExpose, b as useVModel, a as useDirection, d as createContext, m as useForwardPropsEmits, u as useId, s as useEmitAsProps, P as Primitive } from "./PopperContent-CPX94GL7.js";
import { q as MenuRoot_default, r as MenuContent_default, s as MenuItem_default, t as MenuPortal_default, v as MenuSub_default, x as MenuSubContent_default, y as MenuSubTrigger_default, z as MenuAnchor_default, c as _sfc_main$1, f as IconLucideChevronRight } from "./more-horizontal-BtOolk7_.js";
import { x as defineComponent, j as toRefs, C as openBlock, P as createBlock, Q as withCtx, _ as renderSlot, v as unref, i as isRef, r as ref, $ as mergeProps, a6 as normalizeProps, a7 as guardReactiveProps, k as onMounted, D as createVNode, Y as withKeys, n as nextTick, M as normalizeClass, y as createElementBlock, N as renderList, F as Fragment, B as createCommentVNode, R as resolveDynamicComponent, z as createBaseVNode, O as toDisplayString, c as computed } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const [injectDropdownMenuRootContext, provideDropdownMenuRootContext] = /* @__PURE__ */ createContext("DropdownMenuRoot");
var DropdownMenuRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuRoot",
  props: {
    defaultOpen: {
      type: Boolean,
      required: false
    },
    open: {
      type: Boolean,
      required: false,
      default: void 0
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
    const emit = __emit;
    useForwardExpose();
    const open = useVModel(props, "open", emit, {
      defaultValue: props.defaultOpen,
      passive: props.open === void 0
    });
    const triggerElement = ref();
    const { modal, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    provideDropdownMenuRootContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      onOpenToggle: () => {
        open.value = !open.value;
      },
      triggerId: "",
      triggerElement,
      contentId: "",
      modal,
      dir
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MenuRoot_default), {
        open: unref(open),
        "onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(open) ? open.value = $event : null),
        dir: unref(dir),
        modal: unref(modal)
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", { open: unref(open) })]),
        _: 3
      }, 8, [
        "open",
        "dir",
        "modal"
      ]);
    };
  }
});
var DropdownMenuRoot_default = DropdownMenuRoot_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuContent",
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
    const rootContext = injectDropdownMenuRootContext();
    const hasInteractedOutsideRef = ref(false);
    function handleCloseAutoFocus(event) {
      if (event.defaultPrevented) return;
      if (!hasInteractedOutsideRef.value) setTimeout(() => {
        rootContext.triggerElement.value?.focus();
      }, 0);
      hasInteractedOutsideRef.value = false;
      event.preventDefault();
    }
    rootContext.contentId ||= useId(void 0, "reka-dropdown-menu-content");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MenuContent_default), mergeProps(unref(forwarded), {
        id: unref(rootContext).contentId,
        "aria-labelledby": unref(rootContext)?.triggerId,
        style: {
          "--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
          "--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
          "--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
          "--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
          "--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
        },
        onCloseAutoFocus: handleCloseAutoFocus,
        onInteractOutside: _cache[0] || (_cache[0] = (event) => {
          if (event.defaultPrevented) return;
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (!unref(rootContext).modal.value || isRightClick) hasInteractedOutsideRef.value = true;
          if (unref(rootContext).triggerElement.value?.contains(event.target)) event.preventDefault();
        })
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["id", "aria-labelledby"]);
    };
  }
});
var DropdownMenuContent_default = DropdownMenuContent_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuItem",
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
var DropdownMenuItem_default = DropdownMenuItem_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuPortal",
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
var DropdownMenuPortal_default = DropdownMenuPortal_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuSub_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSub",
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
    const open = useVModel(props, "open", emit, {
      passive: props.open === void 0,
      defaultValue: props.defaultOpen ?? false
    });
    useForwardExpose();
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
var DropdownMenuSub_default = DropdownMenuSub_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuSubContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSubContent",
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
        "--reka-dropdown-menu-content-transform-origin": "var(--reka-popper-transform-origin)",
        "--reka-dropdown-menu-content-available-width": "var(--reka-popper-available-width)",
        "--reka-dropdown-menu-content-available-height": "var(--reka-popper-available-height)",
        "--reka-dropdown-menu-trigger-width": "var(--reka-popper-anchor-width)",
        "--reka-dropdown-menu-trigger-height": "var(--reka-popper-anchor-height)"
      } }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var DropdownMenuSubContent_default = DropdownMenuSubContent_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuSubTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSubTrigger",
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
var DropdownMenuSubTrigger_default = DropdownMenuSubTrigger_vue_vue_type_script_setup_true_lang_default;
var DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuTrigger",
  props: {
    disabled: {
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
      default: "button"
    }
  },
  setup(__props) {
    const props = __props;
    const rootContext = injectDropdownMenuRootContext();
    const { forwardRef, currentElement: triggerElement } = useForwardExpose();
    onMounted(() => {
      rootContext.triggerElement = triggerElement;
    });
    rootContext.triggerId ||= useId(void 0, "reka-dropdown-menu-trigger");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(MenuAnchor_default), { "as-child": "" }, {
        default: withCtx(() => [createVNode(unref(Primitive), {
          id: unref(rootContext).triggerId,
          ref: unref(forwardRef),
          type: _ctx.as === "button" ? "button" : void 0,
          "as-child": props.asChild,
          as: _ctx.as,
          "aria-haspopup": "menu",
          "aria-expanded": unref(rootContext).open.value,
          "aria-controls": unref(rootContext).open.value ? unref(rootContext).contentId : void 0,
          "data-disabled": _ctx.disabled ? "" : void 0,
          disabled: _ctx.disabled,
          "data-state": unref(rootContext).open.value ? "open" : "closed",
          onClick: _cache[0] || (_cache[0] = async (event) => {
            if (!_ctx.disabled && event.button === 0 && event.ctrlKey === false) {
              unref(rootContext)?.onOpenToggle();
              await nextTick();
              if (unref(rootContext).open.value) event.preventDefault();
            }
          }),
          onKeydown: _cache[1] || (_cache[1] = withKeys((event) => {
            if (_ctx.disabled) return;
            if (["Enter", " "].includes(event.key)) unref(rootContext).onOpenToggle();
            if (event.key === "ArrowDown") unref(rootContext).onOpenChange(true);
            if ([
              "Enter",
              " ",
              "ArrowDown"
            ].includes(event.key)) event.preventDefault();
          }, [
            "enter",
            "space",
            "arrow-down"
          ]))
        }, {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "id",
          "type",
          "as-child",
          "as",
          "aria-expanded",
          "aria-controls",
          "data-disabled",
          "disabled",
          "data-state"
        ])]),
        _: 3
      });
    };
  }
});
var DropdownMenuTrigger_default = DropdownMenuTrigger_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1 = { class: "flex-1" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SDropdownMenu",
  props: {
    items: {},
    side: { default: "bottom" },
    align: { default: "center" },
    sideOffset: { default: 4 },
    cover: { type: Boolean, default: false }
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
    const contentClass = computed(
      () => [
        "z-300 min-w-32 rounded-lg shadow-lg p-1 text-sm data-[state=open]:animate-popover-in data-[state=closed]:animate-popover-out",
        props.cover ? "bg-black/55 backdrop-blur-xl backdrop-saturate-160 border border-solid border-white/10" : "bg-surface-bright"
      ].join(" ")
    );
    const menuItemClass = computed(
      () => [
        "flex items-center gap-2 px-2 py-1.5 rounded-md outline-none select-none cursor-pointer data-[disabled]:opacity-40 data-[disabled]:pointer-events-none",
        props.cover ? "text-cover data-[highlighted]:bg-cover/15" : "text-on-surface data-[highlighted]:bg-on-surface/12"
      ].join(" ")
    );
    return (_ctx, _cache) => {
      const _component_DropdownMenuTrigger = DropdownMenuTrigger_default;
      const _component_SDivider = _sfc_main$1;
      const _component_IconLucideChevronRight = IconLucideChevronRight;
      const _component_DropdownMenuSubTrigger = DropdownMenuSubTrigger_default;
      const _component_DropdownMenuItem = DropdownMenuItem_default;
      const _component_DropdownMenuSubContent = DropdownMenuSubContent_default;
      const _component_DropdownMenuPortal = DropdownMenuPortal_default;
      const _component_DropdownMenuSub = DropdownMenuSub_default;
      const _component_DropdownMenuContent = DropdownMenuContent_default;
      const _component_DropdownMenuRoot = DropdownMenuRoot_default;
      return openBlock(), createBlock(_component_DropdownMenuRoot, null, {
        default: withCtx(() => [
          createVNode(_component_DropdownMenuTrigger, {
            as: "div",
            class: "inline-flex"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "trigger")
            ]),
            _: 3
          }),
          createVNode(_component_DropdownMenuPortal, null, {
            default: withCtx(() => [
              createVNode(_component_DropdownMenuContent, {
                side: __props.side,
                align: __props.align,
                "side-offset": __props.sideOffset,
                "avoid-collisions": true,
                "collision-padding": 12,
                class: normalizeClass(unref(contentClass))
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(visibleItems), (item, index) => {
                    return openBlock(), createElementBlock(Fragment, {
                      key: item.key
                    }, [
                      item.separator && index > 0 ? (openBlock(), createBlock(_component_SDivider, {
                        key: 0,
                        class: "mx-1.5 my-0.5"
                      })) : createCommentVNode("", true),
                      item.children ? (openBlock(), createBlock(_component_DropdownMenuSub, { key: 1 }, {
                        default: withCtx(() => [
                          createVNode(_component_DropdownMenuSubTrigger, {
                            disabled: item.disabled,
                            class: normalizeClass(unref(menuItemClass))
                          }, {
                            default: withCtx(() => [
                              item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                key: 0,
                                class: "size-3.5 opacity-60 shrink-0"
                              })) : createCommentVNode("", true),
                              createBaseVNode("span", _hoisted_1, toDisplayString(item.label), 1),
                              createVNode(_component_IconLucideChevronRight, { class: "size-3 opacity-40 shrink-0" })
                            ]),
                            _: 2
                          }, 1032, ["disabled", "class"]),
                          createVNode(_component_DropdownMenuPortal, null, {
                            default: withCtx(() => [
                              createVNode(_component_DropdownMenuSubContent, {
                                "side-offset": 4,
                                "avoid-collisions": true,
                                "collision-padding": 12,
                                class: normalizeClass([unref(contentClass), "max-h-60 overflow-y-auto"])
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createElementBlock(Fragment, null, renderList(item.children, (child, childIndex) => {
                                    return openBlock(), createElementBlock(Fragment, {
                                      key: child.key
                                    }, [
                                      child.separator && childIndex > 0 ? (openBlock(), createBlock(_component_SDivider, {
                                        key: 0,
                                        class: "mx-1.5 my-0.5"
                                      })) : (openBlock(), createBlock(_component_DropdownMenuItem, {
                                        key: 1,
                                        disabled: child.disabled,
                                        class: normalizeClass(unref(menuItemClass)),
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
                                      }, 1032, ["disabled", "class", "onSelect"]))
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
                      }, 1024)) : (openBlock(), createBlock(_component_DropdownMenuItem, {
                        key: 2,
                        disabled: item.disabled,
                        class: normalizeClass(unref(menuItemClass)),
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
                      }, 1032, ["disabled", "class", "onSelect"]))
                    ], 64);
                  }), 128))
                ]),
                _: 1
              }, 8, ["side", "align", "side-offset", "class"])
            ]),
            _: 1
          })
        ]),
        _: 3
      });
    };
  }
});
export {
  _sfc_main as _
};
