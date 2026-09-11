import { x as injectConfigProviderContext, V as VisuallyHidden_default, a as useDirection, b as useVModel, P as Primitive, d as createContext, o as PopperAnchor_default, y as createSharedComposable, i as useEventListener, g as PopperRoot_default, e as useForwardExpose, D as DismissableLayer_default, j as PopperContent_default, z as PopperContentPropsDefaultValue, m as useForwardPropsEmits, n as Presence_default, T as Teleport_default, u as useId, A as reactiveComputed, p as isClient, c as createEventHook, B as unrefElement, C as isNullish } from "./PopperContent-CPX94GL7.js";
import { c as usePrimitiveElement, g as getActiveElement, u as useCollection, h as useFocusGuards, f as useBodyScrollLock, b as useTypeahead, s as getOpenState, F as FocusScope_default, t as isPointerInGraceArea, v as FIRST_LAST_KEYS, L as LAST_KEYS, w as focusFirst$1, x as isMouseEvent, y as SELECTION_KEYS, I as ITEM_SELECT, j as useHideOthers, z as SUB_CLOSE_KEYS, A as SUB_OPEN_KEYS, d as useFormControl, B as clamp, C as snapValueToStep } from "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import { n as nextTick, r as ref, l as getCurrentInstance, c as computed, x as defineComponent, w as watch, C as openBlock, P as createBlock, $ as mergeProps, y as createElementBlock, B as createCommentVNode, F as Fragment, N as renderList, j as toRefs, Q as withCtx, D as createVNode, v as unref, _ as renderSlot, a6 as normalizeProps, a7 as guardReactiveProps, k as onMounted, J as onUnmounted, af as mergeDefaults, V as withModifiers, u as watchEffect, Y as withKeys, M as normalizeClass, z as createBaseVNode, U as Transition, O as toDisplayString, m as markRaw, q as shallowRef } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { _ as __unplugin_components_11$1 } from "./x-Cd6Sow4a.js";
import { _ as __unplugin_components_4 } from "./plus-BEApKDpl.js";
import { _ as __unplugin_components_5 } from "./copy-DhNjJWGd.js";
import { aQ as defineStore, b1 as localforage, u as useI18n, t as toast } from "./index-DVKNk9gd.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const ignoredElement = ["INPUT", "TEXTAREA"];
function useArrowNavigation(e, currentElement, parentElement, options = {}) {
  if (!currentElement || options.enableIgnoredElement && ignoredElement.includes(currentElement.nodeName)) return null;
  const { arrowKeyOptions = "both", attributeName = "[data-reka-collection-item]", itemsArray = [], loop = true, dir = "ltr", preventScroll = true, focus = false } = options;
  const [right, left, up, down, home, end] = [
    e.key === "ArrowRight",
    e.key === "ArrowLeft",
    e.key === "ArrowUp",
    e.key === "ArrowDown",
    e.key === "Home",
    e.key === "End"
  ];
  const goingVertical = up || down;
  const goingHorizontal = right || left;
  if (!home && !end && (!goingVertical && !goingHorizontal || arrowKeyOptions === "vertical" && goingHorizontal || arrowKeyOptions === "horizontal" && goingVertical)) return null;
  const allCollectionItems = parentElement ? Array.from(parentElement.querySelectorAll(attributeName)) : itemsArray;
  if (!allCollectionItems.length) return null;
  if (preventScroll) e.preventDefault();
  let item = null;
  if (goingHorizontal || goingVertical) {
    const goForward = goingVertical ? down : dir === "ltr" ? right : left;
    item = findNextFocusableElement(allCollectionItems, currentElement, {
      goForward,
      loop
    });
  } else if (home) item = allCollectionItems.at(0) || null;
  else if (end) item = allCollectionItems.at(-1) || null;
  if (focus) item?.focus();
  return item;
}
function findNextFocusableElement(elements, currentElement, options, iterations = !elements.includes(currentElement) ? elements.length + 1 : elements.length) {
  if (--iterations === 0) return null;
  const index = elements.indexOf(currentElement);
  let newIndex;
  if (index === -1) newIndex = options.goForward ? 0 : elements.length - 1;
  else newIndex = options.goForward ? index + 1 : index - 1;
  if (!options.loop && (newIndex < 0 || newIndex >= elements.length)) return null;
  const adjustedNewIndex = (newIndex + elements.length) % elements.length;
  const candidate = elements[adjustedNewIndex];
  if (!candidate) return null;
  const isDisabled = candidate.hasAttribute("disabled") && candidate.getAttribute("disabled") !== "false";
  if (isDisabled) return findNextFocusableElement(elements, candidate, options, iterations);
  return candidate;
}
function useComposing(onEnd) {
  const isComposing = ref(false);
  function handleCompositionStart() {
    isComposing.value = true;
  }
  function handleCompositionEnd(event) {
    nextTick(() => {
      isComposing.value = false;
      onEnd?.(event);
    });
  }
  return {
    isComposing,
    handleCompositionStart,
    handleCompositionEnd
  };
}
function useForwardScopeId() {
  const scopeId = getCurrentInstance()?.vnode?.scopeId;
  return scopeId ? { [scopeId]: "" } : {};
}
function useKbd() {
  return {
    ALT: "Alt",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_UP: "ArrowUp",
    BACKSPACE: "Backspace",
    CAPS_LOCK: "CapsLock",
    CONTROL: "Control",
    DELETE: "Delete",
    END: "End",
    ENTER: "Enter",
    ESCAPE: "Escape",
    F1: "F1",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    HOME: "Home",
    META: "Meta",
    PAGE_DOWN: "PageDown",
    PAGE_UP: "PageUp",
    SHIFT: "Shift",
    SPACE: " ",
    TAB: "Tab",
    CTRL: "Control",
    ASTERISK: "*",
    SPACE_CODE: "Space"
  };
}
function useLocale(locale) {
  const context = injectConfigProviderContext({ locale: ref("en") });
  return computed(() => locale?.value || context.locale?.value || "en");
}
var VisuallyHiddenInputBubble_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "VisuallyHiddenInputBubble",
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: null,
      required: true
    },
    checked: {
      type: Boolean,
      required: false,
      default: void 0
    },
    required: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    feature: {
      type: String,
      required: false,
      default: "fully-hidden"
    }
  },
  setup(__props) {
    const props = __props;
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const valueState = computed(() => props.checked ?? props.value);
    watch(valueState, (cur, prev) => {
      if (!currentElement.value) return;
      const input = currentElement.value;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(inputProto, "value");
      const setValue = descriptor.set;
      if (setValue && cur !== prev) {
        const inputEvent = new Event("input", { bubbles: true });
        const changeEvent = new Event("change", { bubbles: true });
        setValue.call(input, cur);
        input.dispatchEvent(inputEvent);
        input.dispatchEvent(changeEvent);
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(VisuallyHidden_default, mergeProps({
        ref_key: "primitiveElement",
        ref: primitiveElement
      }, {
        ...props,
        ..._ctx.$attrs
      }, { as: "input" }), null, 16);
    };
  }
});
var VisuallyHiddenInputBubble_default = VisuallyHiddenInputBubble_vue_vue_type_script_setup_true_lang_default;
var VisuallyHiddenInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "VisuallyHiddenInput",
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: null,
      required: true
    },
    checked: {
      type: Boolean,
      required: false,
      default: void 0
    },
    required: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    feature: {
      type: String,
      required: false,
      default: "fully-hidden"
    }
  },
  setup(__props) {
    const props = __props;
    const isFormArrayEmptyAndRequired = computed(() => typeof props.value === "object" && Array.isArray(props.value) && props.value.length === 0 && props.required);
    const parsedValue = computed(() => {
      if (typeof props.value === "string" || typeof props.value === "number" || typeof props.value === "boolean" || props.value === null || props.value === void 0) return [{
        name: props.name,
        value: props.value
      }];
      else if (typeof props.value === "object" && Array.isArray(props.value)) return props.value.flatMap((obj, index) => {
        if (typeof obj === "object") return Object.entries(obj).map(([key, value]) => ({
          name: `${props.name}[${index}][${key}]`,
          value
        }));
        else return {
          name: `${props.name}[${index}]`,
          value: obj
        };
      });
      else if (props.value !== null && typeof props.value === "object" && !Array.isArray(props.value)) return Object.entries(props.value).map(([key, value]) => ({
        name: `${props.name}[${key}]`,
        value
      }));
      return [];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [createCommentVNode(" We render single input if it's required "), isFormArrayEmptyAndRequired.value ? (openBlock(), createBlock(VisuallyHiddenInputBubble_default, mergeProps({ key: _ctx.name }, {
        ...props,
        ..._ctx.$attrs
      }, {
        name: _ctx.name,
        value: _ctx.value
      }), null, 16, ["name", "value"])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(parsedValue.value, (parsed) => {
        return openBlock(), createBlock(VisuallyHiddenInputBubble_default, mergeProps({ key: parsed.name }, { ref_for: true }, {
          ...props,
          ..._ctx.$attrs
        }, {
          name: parsed.name,
          value: parsed.value
        }), null, 16, ["name", "value"]);
      }), 128))], 2112);
    };
  }
});
var VisuallyHiddenInput_default = VisuallyHiddenInput_vue_vue_type_script_setup_true_lang_default;
const ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
const EVENT_OPTIONS = {
  bubbles: false,
  cancelable: true
};
const MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = getActiveElement();
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (getActiveElement() !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
const [injectRovingFocusGroupContext, provideRovingFocusGroupContext] = /* @__PURE__ */ createContext("RovingFocusGroup");
var RovingFocusGroup_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "RovingFocusGroup",
  props: {
    orientation: {
      type: String,
      required: false,
      default: void 0
    },
    dir: {
      type: String,
      required: false
    },
    loop: {
      type: Boolean,
      required: false,
      default: false
    },
    currentTabStopId: {
      type: [String, null],
      required: false
    },
    defaultCurrentTabStopId: {
      type: String,
      required: false
    },
    preventScrollOnEntryFocus: {
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
      required: false
    }
  },
  emits: ["entryFocus", "update:currentTabStopId"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { loop, orientation, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    const currentTabStopId = useVModel(props, "currentTabStopId", emits, {
      defaultValue: props.defaultCurrentTabStopId,
      passive: props.currentTabStopId === void 0
    });
    const isTabbingBackOut = ref(false);
    const isClickFocus = ref(false);
    const focusableItemsCount = ref(0);
    const { getItems, CollectionSlot } = useCollection({ isProvider: true });
    function handleFocus(event) {
      const isKeyboardFocus = !isClickFocus.value;
      if (event.currentTarget && event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut.value) {
        const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
        event.currentTarget.dispatchEvent(entryFocusEvent);
        emits("entryFocus", entryFocusEvent);
        if (!entryFocusEvent.defaultPrevented) {
          const items = getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "");
          const activeItem = items.find((item) => item.getAttribute("data-active") === "");
          const highlightedItem = items.find((item) => item.getAttribute("data-highlighted") === "");
          const currentItem = items.find((item) => item.id === currentTabStopId.value);
          const candidateItems = [
            activeItem,
            highlightedItem,
            currentItem,
            ...items
          ].filter(Boolean);
          focusFirst(candidateItems, props.preventScrollOnEntryFocus);
        }
      }
      isClickFocus.value = false;
    }
    function handleMouseUp() {
      setTimeout(() => {
        isClickFocus.value = false;
      }, 1);
    }
    __expose({ getItems });
    provideRovingFocusGroupContext({
      loop,
      dir,
      orientation,
      currentTabStopId,
      onItemFocus: (tabStopId) => {
        currentTabStopId.value = tabStopId;
      },
      onItemShiftTab: () => {
        isTabbingBackOut.value = true;
      },
      onFocusableItemAdd: () => {
        focusableItemsCount.value++;
      },
      onFocusableItemRemove: () => {
        focusableItemsCount.value--;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionSlot), null, {
        default: withCtx(() => [createVNode(unref(Primitive), {
          tabindex: isTabbingBackOut.value || focusableItemsCount.value === 0 ? -1 : 0,
          "data-orientation": unref(orientation),
          as: _ctx.as,
          "as-child": _ctx.asChild,
          dir: unref(dir),
          style: { "outline": "none" },
          onMousedown: _cache[0] || (_cache[0] = ($event) => isClickFocus.value = true),
          onMouseup: handleMouseUp,
          onFocus: handleFocus,
          onBlur: _cache[1] || (_cache[1] = ($event) => isTabbingBackOut.value = false)
        }, {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "tabindex",
          "data-orientation",
          "as",
          "as-child",
          "dir"
        ])]),
        _: 3
      });
    };
  }
});
var RovingFocusGroup_default = RovingFocusGroup_vue_vue_type_script_setup_true_lang_default;
var MenuAnchor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "MenuAnchor",
  props: {
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
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(PopperAnchor_default), normalizeProps(guardReactiveProps(props)), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var MenuAnchor_default = MenuAnchor_vue_vue_type_script_setup_true_lang_default;
function useIsUsingKeyboardImpl() {
  const isUsingKeyboard = ref(false);
  onMounted(() => {
    useEventListener("keydown", () => {
      isUsingKeyboard.value = true;
    }, {
      capture: true,
      passive: true
    });
    useEventListener(["pointerdown", "pointermove"], () => {
      isUsingKeyboard.value = false;
    }, {
      capture: true,
      passive: true
    });
  });
  return isUsingKeyboard;
}
const useIsUsingKeyboard = createSharedComposable(useIsUsingKeyboardImpl);
const [injectMenuContext, provideMenuContext] = /* @__PURE__ */ createContext(["MenuRoot", "MenuSub"], "MenuContext");
const [injectMenuRootContext, provideMenuRootContext] = /* @__PURE__ */ createContext("MenuRoot");
var MenuRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "MenuRoot",
  props: {
    open: {
      type: Boolean,
      required: false,
      default: false
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
    const { modal, dir: propDir } = toRefs(props);
    const dir = useDirection(propDir);
    const open = useVModel(props, "open", emits);
    const content = ref();
    const isUsingKeyboardRef = useIsUsingKeyboard();
    provideMenuContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      content,
      onContentChange: (element) => {
        content.value = element;
      }
    });
    provideMenuRootContext({
      onClose: () => {
        open.value = false;
      },
      isUsingKeyboardRef,
      dir,
      modal
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(PopperRoot_default), null, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      });
    };
  }
});
var MenuRoot_default = MenuRoot_vue_vue_type_script_setup_true_lang_default;
const [injectMenuContentContext, provideMenuContentContext] = /* @__PURE__ */ createContext("MenuContent");
var MenuContentImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "MenuContentImpl",
  props: /* @__PURE__ */ mergeDefaults({
    loop: {
      type: Boolean,
      required: false
    },
    disableOutsidePointerEvents: {
      type: Boolean,
      required: false
    },
    disableOutsideScroll: {
      type: Boolean,
      required: false
    },
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
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false
    }
  }, { ...PopperContentPropsDefaultValue }),
  emits: [
    "escapeKeyDown",
    "pointerDownOutside",
    "focusOutside",
    "interactOutside",
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus",
    "dismiss"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const menuContext = injectMenuContext();
    const rootContext = injectMenuRootContext();
    const { trapFocus, disableOutsidePointerEvents, loop } = toRefs(props);
    useFocusGuards();
    useBodyScrollLock(disableOutsidePointerEvents.value);
    const searchRef = ref("");
    const timerRef = ref(0);
    const pointerGraceTimerRef = ref(0);
    const pointerGraceIntentRef = ref(null);
    const pointerDirRef = ref("right");
    const lastPointerXRef = ref(0);
    const currentItemId = ref(null);
    const rovingFocusGroupRef = ref();
    const { forwardRef, currentElement: contentElement } = useForwardExpose();
    const { handleTypeaheadSearch } = useTypeahead();
    const highlightedElement = ref();
    function onKeydownNavigation(event) {
      const el = useArrowNavigation(event, highlightedElement.value || getActiveElement(), contentElement.value, {
        loop: loop.value,
        arrowKeyOptions: "vertical",
        dir: rootContext?.dir.value,
        focus: false,
        attributeName: "[data-reka-collection-item]:not([data-disabled])"
      });
      if (el) {
        highlightedElement.value = el;
        el.scrollIntoView({ block: "nearest" });
      }
    }
    function onKeydownEnter() {
      if (highlightedElement.value) highlightedElement.value.click();
    }
    const filterElement = ref();
    const activeSubmenuContext = ref();
    watch(highlightedElement, (el) => {
      if (activeSubmenuContext.value && (el === void 0 || el !== activeSubmenuContext.value.trigger.value)) {
        if (el === void 0) return;
        activeSubmenuContext.value.onOpenChange(false);
        activeSubmenuContext.value = void 0;
      }
    });
    watch(contentElement, (el) => {
      menuContext.onContentChange(el);
    });
    onUnmounted(() => {
      window.clearTimeout(timerRef.value);
    });
    function isPointerMovingToSubmenu(event) {
      const isMovingTowards = pointerDirRef.value === pointerGraceIntentRef.value?.side;
      return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntentRef.value?.area);
    }
    async function handleMountAutoFocus(event) {
      emits("openAutoFocus", event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      contentElement.value?.focus({ preventScroll: true });
    }
    function handleKeyDown(event) {
      if (event.defaultPrevented) return;
      const target = event.target;
      const isKeyDownInside = target.closest("[data-reka-menu-content]") === event.currentTarget;
      const isKeyDownInTextField = ["input", "textarea"].includes(target.tagName.toLowerCase());
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
      const isCharacterKey = event.key.length === 1;
      const el = useArrowNavigation(event, getActiveElement(), contentElement.value, {
        loop: loop.value,
        arrowKeyOptions: "vertical",
        dir: rootContext?.dir.value,
        focus: true,
        attributeName: "[data-reka-collection-item]:not([data-disabled])"
      });
      if (el) return el?.focus();
      if (event.code === "Space") return;
      const collectionItems = rovingFocusGroupRef.value?.getItems() ?? [];
      if (isKeyDownInside) {
        if (event.key === "Tab" && rootContext.modal.value) event.preventDefault();
        if (!isModifierKey && isCharacterKey && !isKeyDownInTextField) handleTypeaheadSearch(event.key, collectionItems);
      }
      if (event.target !== contentElement.value) return;
      if (!FIRST_LAST_KEYS.includes(event.key)) return;
      event.preventDefault();
      const candidateNodes = [...collectionItems.map((item) => item.ref)];
      if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
      focusFirst$1(candidateNodes);
    }
    function handleBlur(event) {
      if (!event?.currentTarget?.contains?.(event.target)) {
        window.clearTimeout(timerRef.value);
        searchRef.value = "";
      }
    }
    function handlePointerMove(event) {
      if (!isMouseEvent(event)) return;
      const target = event.target;
      const pointerXHasChanged = lastPointerXRef.value !== event.clientX;
      if (event?.currentTarget?.contains(target) && pointerXHasChanged) {
        const newDir = event.clientX > lastPointerXRef.value ? "right" : "left";
        pointerDirRef.value = newDir;
        lastPointerXRef.value = event.clientX;
      }
    }
    function handlePointerEnter(event) {
      if (!isMouseEvent(event)) return;
      if (filterElement.value) filterElement.value.focus();
    }
    provideMenuContentContext({
      onItemEnter: (event) => {
        if (isPointerMovingToSubmenu(event)) return true;
        else return false;
      },
      onItemLeave: (event) => {
        if (isPointerMovingToSubmenu(event)) return true;
        const isInputFocused = ["INPUT", "TEXTAREA"].includes(getActiveElement()?.tagName || "");
        if (!isInputFocused) contentElement.value?.focus();
        currentItemId.value = null;
        return false;
      },
      onTriggerLeave: (event) => {
        if (isPointerMovingToSubmenu(event)) return true;
        else return false;
      },
      searchRef,
      highlightedElement,
      onKeydownNavigation,
      onKeydownEnter,
      filterElement,
      onFilterElementChange: (el) => {
        filterElement.value = el;
      },
      activeSubmenuContext,
      pointerGraceTimerRef,
      onPointerGraceIntentChange: (intent) => {
        pointerGraceIntentRef.value = intent;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FocusScope_default), {
        "as-child": "",
        trapped: unref(trapFocus),
        onMountAutoFocus: handleMountAutoFocus,
        onUnmountAutoFocus: _cache[7] || (_cache[7] = ($event) => emits("closeAutoFocus", $event))
      }, {
        default: withCtx(() => [createVNode(unref(DismissableLayer_default), {
          "as-child": "",
          "disable-outside-pointer-events": unref(disableOutsidePointerEvents),
          onEscapeKeyDown: _cache[2] || (_cache[2] = ($event) => emits("escapeKeyDown", $event)),
          onPointerDownOutside: _cache[3] || (_cache[3] = ($event) => emits("pointerDownOutside", $event)),
          onFocusOutside: _cache[4] || (_cache[4] = ($event) => emits("focusOutside", $event)),
          onInteractOutside: _cache[5] || (_cache[5] = ($event) => emits("interactOutside", $event)),
          onDismiss: _cache[6] || (_cache[6] = ($event) => emits("dismiss"))
        }, {
          default: withCtx(() => [createVNode(unref(RovingFocusGroup_default), {
            ref_key: "rovingFocusGroupRef",
            ref: rovingFocusGroupRef,
            "current-tab-stop-id": currentItemId.value,
            "onUpdate:currentTabStopId": _cache[0] || (_cache[0] = ($event) => currentItemId.value = $event),
            "as-child": "",
            orientation: "vertical",
            dir: unref(rootContext).dir.value,
            loop: unref(loop),
            onEntryFocus: _cache[1] || (_cache[1] = (event) => {
              emits("entryFocus", event);
              if (!unref(rootContext).isUsingKeyboardRef.value) event.preventDefault();
            })
          }, {
            default: withCtx(() => [createVNode(unref(PopperContent_default), {
              ref: unref(forwardRef),
              role: "menu",
              as: _ctx.as,
              "as-child": _ctx.asChild,
              "aria-orientation": "vertical",
              "data-reka-menu-content": "",
              "data-state": unref(getOpenState)(unref(menuContext).open.value),
              dir: unref(rootContext).dir.value,
              side: _ctx.side,
              "side-offset": _ctx.sideOffset,
              align: _ctx.align,
              "align-offset": _ctx.alignOffset,
              "avoid-collisions": _ctx.avoidCollisions,
              "collision-boundary": _ctx.collisionBoundary,
              "collision-padding": _ctx.collisionPadding,
              "arrow-padding": _ctx.arrowPadding,
              "prioritize-position": _ctx.prioritizePosition,
              "position-strategy": _ctx.positionStrategy,
              "update-position-strategy": _ctx.updatePositionStrategy,
              sticky: _ctx.sticky,
              "hide-when-detached": _ctx.hideWhenDetached,
              reference: _ctx.reference,
              onKeydown: handleKeyDown,
              onBlur: handleBlur,
              onPointermove: handlePointerMove,
              onPointerenter: handlePointerEnter
            }, {
              default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
              _: 3
            }, 8, [
              "as",
              "as-child",
              "data-state",
              "dir",
              "side",
              "side-offset",
              "align",
              "align-offset",
              "avoid-collisions",
              "collision-boundary",
              "collision-padding",
              "arrow-padding",
              "prioritize-position",
              "position-strategy",
              "update-position-strategy",
              "sticky",
              "hide-when-detached",
              "reference"
            ])]),
            _: 3
          }, 8, [
            "current-tab-stop-id",
            "dir",
            "loop"
          ])]),
          _: 3
        }, 8, ["disable-outside-pointer-events"])]),
        _: 3
      }, 8, ["trapped"]);
    };
  }
});
var MenuContentImpl_default = MenuContentImpl_vue_vue_type_script_setup_true_lang_default;
var MenuItemImpl_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "MenuItemImpl",
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
    const contentContext = injectMenuContentContext();
    const { forwardRef, currentElement } = useForwardExpose();
    const { CollectionItem } = useCollection();
    const isFocused = ref(false);
    const isHighlighted = computed(() => isFocused.value || currentElement.value != null && contentContext.highlightedElement.value === currentElement.value);
    async function handlePointerMove(event) {
      if (event.defaultPrevented || !isMouseEvent(event)) return;
      if (props.disabled) contentContext.onItemLeave(event);
      else {
        const defaultPrevented = contentContext.onItemEnter(event);
        if (!defaultPrevented) {
          const item = event.currentTarget;
          contentContext.highlightedElement.value = item;
          const isInputFocused = ["INPUT", "TEXTAREA"].includes(getActiveElement()?.tagName || "");
          if (!isInputFocused) item.focus({ preventScroll: true });
        }
      }
    }
    async function handlePointerLeave(event) {
      await nextTick();
      if (event.defaultPrevented) return;
      if (!isMouseEvent(event)) return;
      if (contentContext.highlightedElement.value !== currentElement.value) return;
      const isMovingToSubmenu = contentContext.onItemLeave(event);
      if (!isMovingToSubmenu && contentContext.highlightedElement.value === currentElement.value) contentContext.highlightedElement.value = void 0;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionItem), { value: { textValue: _ctx.textValue } }, {
        default: withCtx(() => [createVNode(unref(Primitive), mergeProps({
          ref: unref(forwardRef),
          role: "menuitem",
          tabindex: "-1"
        }, _ctx.$attrs, {
          as: _ctx.as,
          "as-child": _ctx.asChild,
          "aria-disabled": _ctx.disabled || void 0,
          "data-disabled": _ctx.disabled ? "" : void 0,
          "data-highlighted": isHighlighted.value ? "" : void 0,
          onPointermove: handlePointerMove,
          onPointerleave: handlePointerLeave,
          onFocus: _cache[0] || (_cache[0] = async (event) => {
            await nextTick();
            if (event.defaultPrevented || _ctx.disabled) return;
            isFocused.value = true;
            unref(contentContext).highlightedElement.value = event.currentTarget;
          }),
          onBlur: _cache[1] || (_cache[1] = async (event) => {
            await nextTick();
            if (event.defaultPrevented) return;
            isFocused.value = false;
          })
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "as",
          "as-child",
          "aria-disabled",
          "data-disabled",
          "data-highlighted"
        ])]),
        _: 3
      }, 8, ["value"]);
    };
  }
});
var MenuItemImpl_default = MenuItemImpl_vue_vue_type_script_setup_true_lang_default;
var MenuItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "MenuItem",
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
    const { forwardRef, currentElement } = useForwardExpose();
    const rootContext = injectMenuRootContext();
    const contentContext = injectMenuContentContext();
    const isPointerDownRef = ref(false);
    async function handleSelect() {
      const menuItem = currentElement.value;
      if (!props.disabled && menuItem) {
        const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
          bubbles: true,
          cancelable: true
        });
        emits("select", itemSelectEvent);
        await nextTick();
        if (itemSelectEvent.defaultPrevented) isPointerDownRef.value = false;
        else rootContext.onClose();
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(MenuItemImpl_default, mergeProps(props, {
        ref: unref(forwardRef),
        onClick: handleSelect,
        onPointerdown: _cache[0] || (_cache[0] = () => {
          isPointerDownRef.value = true;
        }),
        onPointerup: _cache[1] || (_cache[1] = async (event) => {
          await nextTick();
          if (event.defaultPrevented) return;
          if (!isPointerDownRef.value) event.currentTarget?.click();
        }),
        onKeydown: _cache[2] || (_cache[2] = async (event) => {
          const isTypingAhead = unref(contentContext).searchRef.value !== "";
          if (_ctx.disabled || isTypingAhead && event.key === " ") return;
          if (unref(SELECTION_KEYS).includes(event.key)) {
            event.currentTarget?.click();
            event.preventDefault();
          }
        })
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var MenuItem_default = MenuItem_vue_vue_type_script_setup_true_lang_default;
var MenuRootContentModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "MenuRootContentModal",
  props: {
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
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const menuContext = injectMenuContext();
    const { forwardRef, currentElement } = useForwardExpose();
    useHideOthers(currentElement);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(MenuContentImpl_default, mergeProps(unref(forwarded), {
        ref: unref(forwardRef),
        "trap-focus": unref(menuContext).open.value,
        "disable-outside-pointer-events": unref(menuContext).open.value,
        "disable-outside-scroll": true,
        onDismiss: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onOpenChange(false)),
        onFocusOutside: _cache[1] || (_cache[1] = withModifiers(($event) => emits("focusOutside", $event), ["prevent"]))
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["trap-focus", "disable-outside-pointer-events"]);
    };
  }
});
var MenuRootContentModal_default = MenuRootContentModal_vue_vue_type_script_setup_true_lang_default;
var MenuRootContentNonModal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "MenuRootContentNonModal",
  props: {
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
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const menuContext = injectMenuContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(MenuContentImpl_default, mergeProps(unref(forwarded), {
        "trap-focus": false,
        "disable-outside-pointer-events": false,
        "disable-outside-scroll": false,
        onDismiss: _cache[0] || (_cache[0] = ($event) => unref(menuContext).onOpenChange(false))
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16);
    };
  }
});
var MenuRootContentNonModal_default = MenuRootContentNonModal_vue_vue_type_script_setup_true_lang_default;
var MenuContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "MenuContent",
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
    "entryFocus",
    "openAutoFocus",
    "closeAutoFocus"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    const menuContext = injectMenuContext();
    const rootContext = injectMenuRootContext();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(menuContext).open.value }, {
        default: withCtx(() => [unref(rootContext).modal.value ? (openBlock(), createBlock(MenuRootContentModal_default, normalizeProps(mergeProps({ key: 0 }, {
          ..._ctx.$attrs,
          ...unref(forwarded)
        })), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16)) : (openBlock(), createBlock(MenuRootContentNonModal_default, normalizeProps(mergeProps({ key: 1 }, {
          ..._ctx.$attrs,
          ...unref(forwarded)
        })), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16))]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var MenuContent_default = MenuContent_vue_vue_type_script_setup_true_lang_default;
var MenuPortal_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "MenuPortal",
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
var MenuPortal_default = MenuPortal_vue_vue_type_script_setup_true_lang_default;
const [injectMenuSubContext, provideMenuSubContext] = /* @__PURE__ */ createContext("MenuSub");
var MenuSub_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "MenuSub",
  props: { open: {
    type: Boolean,
    required: false,
    default: void 0
  } },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const open = useVModel(props, "open", emits, {
      defaultValue: false,
      passive: props.open === void 0
    });
    const parentMenuContext = injectMenuContext();
    const trigger = ref();
    const content = ref();
    watchEffect((cleanupFn) => {
      if (parentMenuContext?.open.value === false) open.value = false;
      cleanupFn(() => open.value = false);
    });
    provideMenuContext({
      open,
      onOpenChange: (value) => {
        open.value = value;
      },
      content,
      onContentChange: (element) => {
        content.value = element;
      }
    });
    provideMenuSubContext({
      triggerId: "",
      contentId: "",
      trigger,
      onTriggerChange: (element) => {
        trigger.value = element;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(PopperRoot_default), null, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      });
    };
  }
});
var MenuSub_default = MenuSub_vue_vue_type_script_setup_true_lang_default;
var MenuSubContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "MenuSubContent",
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
      required: false,
      default: true
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
    const menuContext = injectMenuContext();
    const rootContext = injectMenuRootContext();
    const menuSubContext = injectMenuSubContext();
    const parentContentContext = injectMenuContentContext();
    const { forwardRef, currentElement: subContentElement } = useForwardExpose();
    menuSubContext.contentId ||= useId(void 0, "reka-menu-sub-content");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Presence_default), { present: _ctx.forceMount || unref(menuContext).open.value }, {
        default: withCtx(() => [createVNode(MenuContentImpl_default, mergeProps(unref(forwarded), {
          id: unref(menuSubContext).contentId,
          ref: unref(forwardRef),
          "aria-labelledby": unref(menuSubContext).triggerId,
          align: "start",
          side: unref(rootContext).dir.value === "rtl" ? "left" : "right",
          "disable-outside-pointer-events": false,
          "disable-outside-scroll": false,
          "trap-focus": false,
          onOpenAutoFocus: _cache[0] || (_cache[0] = withModifiers((event) => {
            if (unref(rootContext).isUsingKeyboardRef.value) unref(subContentElement)?.focus();
          }, ["prevent"])),
          onCloseAutoFocus: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["prevent"])),
          onFocusOutside: _cache[2] || (_cache[2] = (event) => {
            if (event.defaultPrevented) return;
            const isMovingToParentContent = unref(parentContentContext).filterElement.value?.contains(event.target);
            if (event.target !== unref(menuSubContext).trigger.value && !isMovingToParentContent) unref(menuContext).onOpenChange(false);
          }),
          onEscapeKeyDown: _cache[3] || (_cache[3] = (event) => {
            unref(rootContext).onClose();
            event.preventDefault();
          }),
          onKeydown: _cache[4] || (_cache[4] = (event) => {
            const isKeyDownInside = event.currentTarget?.contains(event.target);
            const isCloseKey = unref(SUB_CLOSE_KEYS)[unref(rootContext).dir.value].includes(event.key);
            if (isKeyDownInside && isCloseKey) {
              unref(menuContext).onOpenChange(false);
              if (unref(parentContentContext).filterElement.value) {
                unref(parentContentContext).filterElement.value.focus();
                unref(parentContentContext).highlightedElement.value = unref(menuSubContext).trigger.value;
                unref(menuSubContext).trigger.value?.scrollIntoView({ block: "nearest" });
              } else unref(menuSubContext).trigger.value?.focus();
              event.preventDefault();
            }
          })
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "id",
          "aria-labelledby",
          "side"
        ])]),
        _: 3
      }, 8, ["present"]);
    };
  }
});
var MenuSubContent_default = MenuSubContent_vue_vue_type_script_setup_true_lang_default;
var MenuSubTrigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "MenuSubTrigger",
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
    const menuContext = injectMenuContext();
    const rootContext = injectMenuRootContext();
    const subContext = injectMenuSubContext();
    const contentContext = injectMenuContentContext();
    watch(menuContext.open, (open) => {
      if (open) contentContext.activeSubmenuContext.value = {
        onOpenChange: menuContext.onOpenChange,
        trigger: subContext.trigger
      };
      else if (contentContext.activeSubmenuContext.value?.trigger.value === subContext.trigger.value) contentContext.activeSubmenuContext.value = void 0;
    });
    const openTimerRef = ref(null);
    subContext.triggerId ||= useId(void 0, "reka-menu-sub-trigger");
    function clearOpenTimer() {
      if (openTimerRef.value) window.clearTimeout(openTimerRef.value);
      openTimerRef.value = null;
    }
    onUnmounted(() => {
      clearOpenTimer();
    });
    function handlePointerMove(event) {
      if (!isMouseEvent(event)) return;
      const defaultPrevented = contentContext.onItemEnter(event);
      if (defaultPrevented) return;
      if (!props.disabled && !menuContext.open.value && !openTimerRef.value) {
        contentContext.onPointerGraceIntentChange(null);
        openTimerRef.value = window.setTimeout(() => {
          menuContext.onOpenChange(true);
          clearOpenTimer();
        }, 100);
      }
    }
    async function handlePointerLeave(event) {
      if (!isMouseEvent(event)) return;
      clearOpenTimer();
      const contentRect = menuContext.content.value?.getBoundingClientRect();
      if (contentRect?.width) {
        const side = menuContext.content.value?.dataset.side;
        const rightSide = side === "right";
        const bleed = rightSide ? -5 : 5;
        const contentNearEdge = contentRect[rightSide ? "left" : "right"];
        const contentFarEdge = contentRect[rightSide ? "right" : "left"];
        contentContext.onPointerGraceIntentChange({
          area: [
            {
              x: event.clientX + bleed,
              y: event.clientY
            },
            {
              x: contentNearEdge,
              y: contentRect.top
            },
            {
              x: contentFarEdge,
              y: contentRect.top
            },
            {
              x: contentFarEdge,
              y: contentRect.bottom
            },
            {
              x: contentNearEdge,
              y: contentRect.bottom
            }
          ],
          side
        });
        window.clearTimeout(contentContext.pointerGraceTimerRef.value);
        contentContext.pointerGraceTimerRef.value = window.setTimeout(() => contentContext.onPointerGraceIntentChange(null), 300);
      } else {
        const defaultPrevented = contentContext.onTriggerLeave(event);
        if (defaultPrevented) return;
        contentContext.onPointerGraceIntentChange(null);
      }
    }
    async function handleKeyDown(event) {
      const isTypingAhead = contentContext.searchRef.value !== "";
      if (props.disabled || isTypingAhead && event.key === " ") return;
      if (SUB_OPEN_KEYS[rootContext.dir.value].includes(event.key)) {
        menuContext.onOpenChange(true);
        await nextTick();
        menuContext.content.value?.focus();
        event.preventDefault();
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(MenuAnchor_default, { "as-child": "" }, {
        default: withCtx(() => [createVNode(MenuItemImpl_default, mergeProps(props, {
          id: unref(subContext).triggerId,
          ref: (vnode) => {
            if (!vnode) return void 0;
            unref(subContext)?.onTriggerChange(vnode?.$el);
            return void 0;
          },
          "aria-haspopup": "menu",
          "aria-expanded": unref(menuContext).open.value,
          "aria-controls": unref(subContext).contentId,
          "data-state": unref(getOpenState)(unref(menuContext).open.value),
          onClick: _cache[0] || (_cache[0] = async (event) => {
            if (props.disabled || event.defaultPrevented) return;
            event.currentTarget?.focus();
            if (!unref(menuContext).open.value) unref(menuContext).onOpenChange(true);
          }),
          onPointermove: handlePointerMove,
          onPointerleave: handlePointerLeave,
          onKeydown: handleKeyDown
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 16, [
          "id",
          "aria-expanded",
          "aria-controls",
          "data-state"
        ])]),
        _: 3
      });
    };
  }
});
var MenuSubTrigger_default = MenuSubTrigger_vue_vue_type_script_setup_true_lang_default;
let $1dfb119a85e764e5$var$formatterCache = /* @__PURE__ */ new Map();
let $1dfb119a85e764e5$var$supportsSignDisplay = false;
try {
  $1dfb119a85e764e5$var$supportsSignDisplay = new Intl.NumberFormat("de-DE", {
    signDisplay: "exceptZero"
  }).resolvedOptions().signDisplay === "exceptZero";
} catch {
}
let $1dfb119a85e764e5$var$supportsUnit = false;
try {
  $1dfb119a85e764e5$var$supportsUnit = new Intl.NumberFormat("de-DE", {
    style: "unit",
    unit: "degree"
  }).resolvedOptions().style === "unit";
} catch {
}
const $1dfb119a85e764e5$var$UNITS = {
  degree: {
    narrow: {
      default: "°",
      "ja-JP": " 度",
      "zh-TW": "度",
      "sl-SI": " °"
    }
  }
};
class $1dfb119a85e764e5$export$cc77c4ff7e8673c5 {
  constructor(locale, options = {}) {
    this.numberFormatter = $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options);
    this.options = options;
  }
  /**
  * Formats a number value as a string, according to the locale and options provided to the
  * constructor.
  */
  format(value) {
    let res = "";
    if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) res = $1dfb119a85e764e5$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value);
    else res = this.numberFormatter.format(value);
    if (this.options.style === "unit" && !$1dfb119a85e764e5$var$supportsUnit) {
      let { unit, unitDisplay = "short", locale } = this.resolvedOptions();
      if (!unit) return res;
      let values = $1dfb119a85e764e5$var$UNITS[unit]?.[unitDisplay];
      res += values[locale] || values.default;
    }
    return res;
  }
  /** Formats a number to an array of parts such as separators, digits, punctuation, and more. */
  formatToParts(value) {
    return this.numberFormatter.formatToParts(value);
  }
  /** Formats a number range as a string. */
  formatRange(start, end) {
    if (typeof this.numberFormatter.formatRange === "function") return this.numberFormatter.formatRange(start, end);
    if (end < start) throw new RangeError("End date must be >= start date");
    return `${this.format(start)} – ${this.format(end)}`;
  }
  /** Formats a number range as an array of parts. */
  formatRangeToParts(start, end) {
    if (typeof this.numberFormatter.formatRangeToParts === "function") return this.numberFormatter.formatRangeToParts(start, end);
    if (end < start) throw new RangeError("End date must be >= start date");
    let startParts = this.numberFormatter.formatToParts(start);
    let endParts = this.numberFormatter.formatToParts(end);
    return [
      ...startParts.map((p) => ({
        ...p,
        source: "startRange"
      })),
      {
        type: "literal",
        value: " – ",
        source: "shared"
      },
      ...endParts.map((p) => ({
        ...p,
        source: "endRange"
      }))
    ];
  }
  /** Returns the resolved formatting options based on the values passed to the constructor. */
  resolvedOptions() {
    let options = this.numberFormatter.resolvedOptions();
    if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) options = {
      ...options,
      signDisplay: this.options.signDisplay
    };
    if (!$1dfb119a85e764e5$var$supportsUnit && this.options.style === "unit") options = {
      ...options,
      style: "unit",
      unit: this.options.unit,
      unitDisplay: this.options.unitDisplay
    };
    return options;
  }
}
function $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options = {}) {
  let { numberingSystem } = options;
  if (numberingSystem && locale.includes("-nu-")) {
    if (!locale.includes("-u-")) locale += "-u-";
    locale += `-nu-${numberingSystem}`;
  }
  if (options.style === "unit" && !$1dfb119a85e764e5$var$supportsUnit) {
    let { unit, unitDisplay = "short" } = options;
    if (!unit) throw new Error('unit option must be provided with style: "unit"');
    if (!$1dfb119a85e764e5$var$UNITS[unit]?.[unitDisplay]) throw new Error(`Unsupported unit ${unit} with unitDisplay = ${unitDisplay}`);
    options = {
      ...options,
      style: "decimal"
    };
  }
  let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  if ($1dfb119a85e764e5$var$formatterCache.has(cacheKey)) return $1dfb119a85e764e5$var$formatterCache.get(cacheKey);
  let numberFormatter = new Intl.NumberFormat(locale, options);
  $1dfb119a85e764e5$var$formatterCache.set(cacheKey, numberFormatter);
  return numberFormatter;
}
function $1dfb119a85e764e5$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
  if (signDisplay === "auto") return numberFormat.format(num);
  else if (signDisplay === "never") return numberFormat.format(Math.abs(num));
  else {
    let needsPositiveSign = false;
    if (signDisplay === "always") needsPositiveSign = num > 0 || Object.is(num, 0);
    else if (signDisplay === "exceptZero") {
      if (Object.is(num, -0) || Object.is(num, 0)) num = Math.abs(num);
      else needsPositiveSign = num > 0;
    }
    if (needsPositiveSign) {
      let negative = numberFormat.format(-num);
      let noSign = numberFormat.format(num);
      let minus = negative.replace(noSign, "").replace(/\u200e|\u061C/, "");
      if ([
        ...minus
      ].length !== 1) console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case");
      let positive = negative.replace(noSign, "!!!").replace(minus, "+").replace("!!!", noSign);
      return positive;
    } else return numberFormat.format(num);
  }
}
const $eb76cf4feb040f77$var$CURRENCY_SIGN_REGEX = new RegExp("^.*\\(.*\\).*$");
const $eb76cf4feb040f77$var$NUMBERING_SYSTEMS = [
  "latn",
  "arab",
  "hanidec",
  "deva",
  "beng",
  "fullwide"
];
class $eb76cf4feb040f77$export$cd11ab140839f11d {
  constructor(locale, options = {}) {
    this.locale = locale;
    this.options = options;
  }
  /**
  * Parses the given string to a number. Returns NaN if a valid number could not be parsed.
  */
  parse(value) {
    return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).parse(value);
  }
  /**
  * Returns whether the given string could potentially be a valid number. This should be used to
  * validate user input as the user types. If a `minValue` or `maxValue` is provided, the validity
  * of the minus/plus sign characters can be checked.
  */
  isValidPartialNumber(value, minValue, maxValue) {
    return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).isValidPartialNumber(value, minValue, maxValue);
  }
  /**
  * Returns a numbering system for which the given string is valid in the current locale.
  * If no numbering system could be detected, the default numbering system for the current
  * locale is returned.
  */
  getNumberingSystem(value) {
    return $eb76cf4feb040f77$var$getNumberParserImpl(this.locale, this.options, value).options.numberingSystem;
  }
}
const $eb76cf4feb040f77$var$numberParserCache = /* @__PURE__ */ new Map();
function $eb76cf4feb040f77$var$getNumberParserImpl(locale, options, value) {
  let defaultParser = $eb76cf4feb040f77$var$getCachedNumberParser(locale, options);
  if (!locale.includes("-nu-") && !defaultParser.isValidPartialNumber(value)) {
    for (let numberingSystem of $eb76cf4feb040f77$var$NUMBERING_SYSTEMS) if (numberingSystem !== defaultParser.options.numberingSystem) {
      let parser = $eb76cf4feb040f77$var$getCachedNumberParser(locale + (locale.includes("-u-") ? "-nu-" : "-u-nu-") + numberingSystem, options);
      if (parser.isValidPartialNumber(value)) return parser;
    }
  }
  return defaultParser;
}
function $eb76cf4feb040f77$var$getCachedNumberParser(locale, options) {
  let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
  let parser = $eb76cf4feb040f77$var$numberParserCache.get(cacheKey);
  if (!parser) {
    parser = new $eb76cf4feb040f77$var$NumberParserImpl(locale, options);
    $eb76cf4feb040f77$var$numberParserCache.set(cacheKey, parser);
  }
  return parser;
}
class $eb76cf4feb040f77$var$NumberParserImpl {
  constructor(locale, options = {}) {
    this.locale = locale;
    if (options.roundingIncrement !== 1 && options.roundingIncrement != null) {
      if (options.maximumFractionDigits == null && options.minimumFractionDigits == null) {
        options.maximumFractionDigits = 0;
        options.minimumFractionDigits = 0;
      } else if (options.maximumFractionDigits == null) options.maximumFractionDigits = options.minimumFractionDigits;
      else if (options.minimumFractionDigits == null) options.minimumFractionDigits = options.maximumFractionDigits;
    }
    this.formatter = new Intl.NumberFormat(locale, options);
    this.options = this.formatter.resolvedOptions();
    this.symbols = $eb76cf4feb040f77$var$getSymbols(locale, this.formatter, this.options, options);
    if (this.options.style === "percent" && ((this.options.minimumFractionDigits ?? 0) > 18 || (this.options.maximumFractionDigits ?? 0) > 18)) console.warn("NumberParser cannot handle percentages with greater than 18 decimal places, please reduce the number in your options.");
  }
  parse(value) {
    let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
    let fullySanitizedValue = this.sanitize(value);
    if (!isGroupSymbolAllowed && this.symbols.group && fullySanitizedValue.includes(this.symbols.group)) return NaN;
    else if (this.symbols.group) fullySanitizedValue = fullySanitizedValue.replaceAll(this.symbols.group, "");
    if (this.symbols.decimal) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.decimal, ".");
    if (this.symbols.minusSign) fullySanitizedValue = fullySanitizedValue.replace(this.symbols.minusSign, "-");
    fullySanitizedValue = fullySanitizedValue.replace(this.symbols.numeral, this.symbols.index);
    if (this.options.style === "percent") {
      let isNegative = fullySanitizedValue.indexOf("-");
      fullySanitizedValue = fullySanitizedValue.replace("-", "");
      fullySanitizedValue = fullySanitizedValue.replace("+", "");
      let index = fullySanitizedValue.indexOf(".");
      if (index === -1) index = fullySanitizedValue.length;
      fullySanitizedValue = fullySanitizedValue.replace(".", "");
      if (index - 2 === 0) fullySanitizedValue = `0.${fullySanitizedValue}`;
      else if (index - 2 === -1) fullySanitizedValue = `0.0${fullySanitizedValue}`;
      else if (index - 2 === -2) fullySanitizedValue = "0.00";
      else fullySanitizedValue = `${fullySanitizedValue.slice(0, index - 2)}.${fullySanitizedValue.slice(index - 2)}`;
      if (isNegative > -1) fullySanitizedValue = `-${fullySanitizedValue}`;
    }
    let newValue = fullySanitizedValue ? +fullySanitizedValue : NaN;
    if (isNaN(newValue)) return NaN;
    if (this.options.style === "percent") {
      let options = {
        ...this.options,
        style: "decimal",
        minimumFractionDigits: Math.min((this.options.minimumFractionDigits ?? 0) + 2, 20),
        maximumFractionDigits: Math.min((this.options.maximumFractionDigits ?? 0) + 2, 20)
      };
      return new $eb76cf4feb040f77$export$cd11ab140839f11d(this.locale, options).parse(new $1dfb119a85e764e5$export$cc77c4ff7e8673c5(this.locale, options).format(newValue));
    }
    if (this.options.currencySign === "accounting" && $eb76cf4feb040f77$var$CURRENCY_SIGN_REGEX.test(value)) newValue = -1 * newValue;
    return newValue;
  }
  sanitize(value) {
    let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
    if (this.symbols.noNumeralUnits.length > 0 && this.symbols.noNumeralUnits.find((obj) => obj.unit === value)) return this.symbols.noNumeralUnits.find((obj) => obj.unit === value).value.toString();
    value = value.replace(this.symbols.literals, "");
    if (this.symbols.minusSign) value = value.replace("-", this.symbols.minusSign);
    if (this.options.numberingSystem === "arab") {
      if (this.symbols.decimal) {
        value = $eb76cf4feb040f77$var$replaceAll(value, ",", this.symbols.decimal);
        value = $eb76cf4feb040f77$var$replaceAll(value, String.fromCharCode(1548), this.symbols.decimal);
      }
      if (this.symbols.group && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, ".", this.symbols.group);
    }
    if (this.symbols.group === "’" && value.includes("'") && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, "'", this.symbols.group);
    if (this.symbols.group === "'" && value.includes("’") && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, "’", this.symbols.group);
    if (this.options.locale === "fr-FR" && this.symbols.group && isGroupSymbolAllowed) {
      value = $eb76cf4feb040f77$var$replaceAll(value, " ", this.symbols.group);
      value = $eb76cf4feb040f77$var$replaceAll(value, /\u00A0/g, this.symbols.group);
    }
    return value;
  }
  isValidPartialNumber(value, minValue = -Infinity, maxValue = Infinity) {
    let isGroupSymbolAllowed = this.formatter.resolvedOptions().useGrouping;
    value = this.sanitize(value);
    if (this.symbols.minusSign && value.startsWith(this.symbols.minusSign) && minValue < 0) value = value.slice(this.symbols.minusSign.length);
    else if (this.symbols.plusSign && value.startsWith(this.symbols.plusSign) && maxValue > 0) value = value.slice(this.symbols.plusSign.length);
    if (this.symbols.decimal && value.indexOf(this.symbols.decimal) > -1 && this.options.maximumFractionDigits === 0) return false;
    if (this.symbols.group && isGroupSymbolAllowed) value = $eb76cf4feb040f77$var$replaceAll(value, this.symbols.group, "");
    value = value.replace(this.symbols.numeral, "");
    if (this.symbols.decimal) value = value.replace(this.symbols.decimal, "");
    return value.length === 0;
  }
}
const $eb76cf4feb040f77$var$nonLiteralParts = /* @__PURE__ */ new Set([
  "decimal",
  "fraction",
  "integer",
  "minusSign",
  "plusSign",
  "group"
]);
const $eb76cf4feb040f77$var$pluralNumbers = [
  0,
  4,
  2,
  1,
  11,
  20,
  3,
  7,
  100,
  21,
  0.1,
  1.1
];
function $eb76cf4feb040f77$var$getSymbols(locale, formatter, intlOptions, originalOptions) {
  let symbolFormatter = new Intl.NumberFormat(locale, {
    ...intlOptions,
    // Resets so we get the full range of symbols
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 21,
    roundingIncrement: 1,
    roundingPriority: "auto",
    roundingMode: "halfExpand",
    useGrouping: true
  });
  let allParts = symbolFormatter.formatToParts(-10000.111);
  let posAllParts = symbolFormatter.formatToParts(10000.111);
  let pluralParts = $eb76cf4feb040f77$var$pluralNumbers.map((n) => symbolFormatter.formatToParts(n));
  let noNumeralUnits = pluralParts.map((p, i) => {
    let unit = p.find((p2) => p2.type === "unit");
    if (unit && !p.some((p2) => p2.type === "integer" || p2.type === "fraction")) return {
      unit: unit.value,
      value: $eb76cf4feb040f77$var$pluralNumbers[i]
    };
    return null;
  }).filter((p) => !!p);
  let minusSign = allParts.find((p) => p.type === "minusSign")?.value ?? "-";
  let plusSign = posAllParts.find((p) => p.type === "plusSign")?.value;
  if (!plusSign && (originalOptions?.signDisplay === "exceptZero" || originalOptions?.signDisplay === "always")) plusSign = "+";
  let decimalParts = new Intl.NumberFormat(locale, {
    ...intlOptions,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).formatToParts(1e-3);
  let decimal = decimalParts.find((p) => p.type === "decimal")?.value;
  let group = allParts.find((p) => p.type === "group")?.value;
  let allPartsLiterals = allParts.filter((p) => !$eb76cf4feb040f77$var$nonLiteralParts.has(p.type)).map((p) => $eb76cf4feb040f77$var$escapeRegex(p.value));
  let pluralPartsLiterals = pluralParts.flatMap((p) => p.filter((p2) => !$eb76cf4feb040f77$var$nonLiteralParts.has(p2.type)).map((p2) => $eb76cf4feb040f77$var$escapeRegex(p2.value)));
  let sortedLiterals = [
    .../* @__PURE__ */ new Set([
      ...allPartsLiterals,
      ...pluralPartsLiterals
    ])
  ].sort((a, b) => b.length - a.length);
  let literals = sortedLiterals.length === 0 ? new RegExp("\\p{White_Space}|\\p{Cf}", "gu") : new RegExp(`${sortedLiterals.join("|")}|\\p{White_Space}|\\p{Cf}`, "gu");
  let numerals = [
    ...new Intl.NumberFormat(intlOptions.locale, {
      useGrouping: false
    }).format(9876543210)
  ].reverse();
  let indexes = new Map(numerals.map((d, i) => [
    d,
    i
  ]));
  let numeral = new RegExp(`[${numerals.join("")}]`, "g");
  let index = (d) => String(indexes.get(d));
  return {
    minusSign,
    plusSign,
    decimal,
    group,
    literals,
    numeral,
    numerals,
    index,
    noNumeralUnits
  };
}
function $eb76cf4feb040f77$var$replaceAll(str, find, replace) {
  if (str.replaceAll) return str.replaceAll(find, replace);
  return str.split(find).join(replace);
}
function $eb76cf4feb040f77$var$escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function usePressedHold(options) {
  const { disabled } = options;
  const timeout = ref();
  const triggerHook = createEventHook();
  const resetTimeout = () => window.clearTimeout(timeout.value);
  const onIncrementPressStart = (delay) => {
    resetTimeout();
    if (disabled.value) return;
    triggerHook.trigger();
    timeout.value = window.setTimeout(() => {
      onIncrementPressStart(60);
    }, delay);
  };
  const handlePressStart = () => {
    onIncrementPressStart(400);
  };
  const handlePressEnd = () => {
    resetTimeout();
  };
  const isPressed = ref(false);
  const target = computed(() => unrefElement(options.target));
  const onPressStart = (event) => {
    if (event.button !== 0 || isPressed.value) return;
    event.preventDefault();
    isPressed.value = true;
    handlePressStart();
  };
  const onPressRelease = () => {
    isPressed.value = false;
    handlePressEnd();
  };
  if (isClient) {
    useEventListener(target || window, "pointerdown", onPressStart);
    useEventListener(window, "pointerup", onPressRelease);
    useEventListener(window, "pointercancel", onPressRelease);
  }
  return {
    isPressed,
    onTrigger: triggerHook.on
  };
}
function useNumberFormatter(locale, options = ref({})) {
  return reactiveComputed(() => new $1dfb119a85e764e5$export$cc77c4ff7e8673c5(locale.value, options.value));
}
function useNumberParser(locale, options = ref({})) {
  return reactiveComputed(() => new $eb76cf4feb040f77$export$cd11ab140839f11d(locale.value, options.value));
}
function handleDecimalOperation(operator, value1, value2) {
  let result = operator === "+" ? value1 + value2 : value1 - value2;
  if (value1 % 1 !== 0 || value2 % 1 !== 0) {
    const value1Decimal = value1.toString().split(".");
    const value2Decimal = value2.toString().split(".");
    const value1DecimalLength = value1Decimal[1] && value1Decimal[1].length || 0;
    const value2DecimalLength = value2Decimal[1] && value2Decimal[1].length || 0;
    const multiplier = 10 ** Math.max(value1DecimalLength, value2DecimalLength);
    value1 = Math.round(value1 * multiplier);
    value2 = Math.round(value2 * multiplier);
    result = operator === "+" ? value1 + value2 : value1 - value2;
    result /= multiplier;
  }
  return result;
}
const [injectNumberFieldRootContext, provideNumberFieldRootContext] = /* @__PURE__ */ createContext("NumberFieldRoot");
var NumberFieldRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "NumberFieldRoot",
  props: {
    defaultValue: {
      type: Number,
      required: false,
      default: void 0
    },
    modelValue: {
      type: [Number, null],
      required: false
    },
    min: {
      type: Number,
      required: false
    },
    max: {
      type: Number,
      required: false
    },
    step: {
      type: Number,
      required: false,
      default: 1
    },
    stepSnapping: {
      type: Boolean,
      required: false,
      default: true
    },
    focusOnChange: {
      type: Boolean,
      required: false,
      default: true
    },
    formatOptions: {
      type: null,
      required: false
    },
    locale: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    readonly: {
      type: Boolean,
      required: false
    },
    disableWheelChange: {
      type: Boolean,
      required: false
    },
    invertWheelChange: {
      type: Boolean,
      required: false
    },
    id: {
      type: String,
      required: false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "div"
    },
    name: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { disabled, readonly, disableWheelChange, invertWheelChange, min, max, step, stepSnapping, formatOptions, id, locale: propLocale } = toRefs(props);
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue,
      passive: props.modelValue === void 0
    });
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const locale = useLocale(propLocale);
    const isFormControl = useFormControl(currentElement);
    const inputEl = ref();
    const isDecreaseDisabled = computed(() => {
      if (isNullish(modelValue.value) || isNaN(modelValue.value)) return false;
      return getNextValue("decrease", modelValue.value) >= modelValue.value;
    });
    const isIncreaseDisabled = computed(() => {
      if (isNullish(modelValue.value) || isNaN(modelValue.value)) return false;
      return getNextValue("increase", modelValue.value) <= modelValue.value;
    });
    function getNextValue(type, from, multiplier = 1) {
      const stepValue = step.value ?? 1;
      const operator = type === "increase" ? "+" : "-";
      let nextValue;
      if (stepSnapping.value && !isNaN(stepValue)) {
        const snapped = snapValueToStep(from, min.value, max.value, stepValue);
        if (snapped === from) nextValue = handleDecimalOperation(operator, from, stepValue * multiplier);
        else {
          const aligned = type === "increase" ? snapped > from ? snapped : handleDecimalOperation("+", snapped, stepValue) : snapped < from ? snapped : handleDecimalOperation("-", snapped, stepValue);
          nextValue = multiplier > 1 ? handleDecimalOperation(operator, aligned, stepValue * (multiplier - 1)) : aligned;
        }
      } else nextValue = handleDecimalOperation(operator, from, stepValue * multiplier);
      return clampInputValue(nextValue);
    }
    function handleChangingValue(type, multiplier = 1) {
      if (props.focusOnChange) inputEl.value?.focus();
      if (props.disabled || props.readonly) return;
      const currentInputValue = numberParser.parse(inputEl.value?.value ?? "");
      if (isNaN(currentInputValue)) {
        modelValue.value = clampInputValue(min.value ?? 0);
        return;
      }
      modelValue.value = getNextValue(type, currentInputValue, multiplier);
    }
    function handleIncrease(multiplier = 1) {
      handleChangingValue("increase", multiplier);
    }
    function handleDecrease(multiplier = 1) {
      handleChangingValue("decrease", multiplier);
    }
    function handleMinMaxValue(type) {
      if (type === "min" && min.value !== void 0) modelValue.value = clampInputValue(min.value);
      else if (type === "max" && max.value !== void 0) modelValue.value = clampInputValue(max.value);
    }
    const numberFormatter = useNumberFormatter(locale, formatOptions);
    const numberParser = useNumberParser(locale, formatOptions);
    const inputMode = computed(() => {
      const hasDecimals = numberFormatter.resolvedOptions().maximumFractionDigits > 0;
      return hasDecimals ? "decimal" : "numeric";
    });
    const textValueFormatter = useNumberFormatter(locale, formatOptions);
    const textValue = computed(() => isNullish(modelValue.value) || isNaN(modelValue.value) ? "" : textValueFormatter.format(modelValue.value));
    function validate(val) {
      return numberParser.isValidPartialNumber(val, min.value, max.value);
    }
    function setInputValue(val) {
      if (inputEl.value) inputEl.value.value = val;
    }
    function clampInputValue(val) {
      let clampedValue;
      if (step.value === void 0 || isNaN(step.value) || !stepSnapping.value) clampedValue = clamp(val, min.value, max.value);
      else clampedValue = snapValueToStep(val, min.value, max.value, step.value);
      clampedValue = numberParser.parse(numberFormatter.format(clampedValue));
      return clampedValue;
    }
    function applyInputValue(val) {
      const parsedValue = numberParser.parse(val);
      modelValue.value = isNaN(parsedValue) ? void 0 : clampInputValue(parsedValue);
      if (!val.length) return setInputValue(val);
      if (isNaN(parsedValue)) return setInputValue(textValue.value);
      return setInputValue(textValue.value);
    }
    provideNumberFieldRootContext({
      modelValue,
      handleDecrease,
      handleIncrease,
      handleMinMaxValue,
      inputMode,
      inputEl,
      onInputElement: (el) => inputEl.value = el,
      textValue,
      readonly,
      validate,
      applyInputValue,
      disabled,
      disableWheelChange,
      invertWheelChange,
      max,
      min,
      isDecreaseDisabled,
      isIncreaseDisabled,
      id
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(_ctx.$attrs, {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        role: "group",
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-disabled": unref(disabled) ? "" : void 0,
        "data-readonly": unref(readonly) ? "" : void 0
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
          modelValue: unref(modelValue),
          textValue: textValue.value,
          readonly: unref(readonly)
        }), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), {
          key: 0,
          type: "text",
          value: unref(modelValue),
          name: _ctx.name,
          disabled: unref(disabled),
          readonly: unref(readonly),
          required: _ctx.required
        }, null, 8, [
          "value",
          "name",
          "disabled",
          "readonly",
          "required"
        ])) : createCommentVNode("v-if", true)]),
        _: 3
      }, 16, [
        "as",
        "as-child",
        "data-disabled",
        "data-readonly"
      ]);
    };
  }
});
var NumberFieldRoot_default = NumberFieldRoot_vue_vue_type_script_setup_true_lang_default;
var NumberFieldDecrement_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "NumberFieldDecrement",
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
    const rootContext = injectNumberFieldRootContext();
    const isDisabled = computed(() => rootContext.disabled?.value || rootContext.readonly.value || props.disabled || rootContext.isDecreaseDisabled.value);
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const { isPressed, onTrigger } = usePressedHold({
      target: currentElement,
      disabled: isDisabled
    });
    onTrigger(() => {
      rootContext.handleDecrease();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        tabindex: "-1",
        "aria-label": "Decrease",
        type: _ctx.as === "button" ? "button" : void 0,
        style: { userSelect: unref(isPressed) ? "none" : void 0 },
        disabled: isDisabled.value ? "" : void 0,
        "data-disabled": isDisabled.value ? "" : void 0,
        "data-pressed": unref(isPressed) ? "true" : void 0,
        onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["prevent"]))
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "type",
        "style",
        "disabled",
        "data-disabled",
        "data-pressed"
      ]);
    };
  }
});
var NumberFieldDecrement_default = NumberFieldDecrement_vue_vue_type_script_setup_true_lang_default;
var NumberFieldIncrement_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "NumberFieldIncrement",
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
    const rootContext = injectNumberFieldRootContext();
    const isDisabled = computed(() => rootContext.disabled?.value || rootContext.readonly.value || props.disabled || rootContext.isIncreaseDisabled.value);
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const { isPressed, onTrigger } = usePressedHold({
      target: currentElement,
      disabled: isDisabled
    });
    onTrigger(() => {
      rootContext.handleIncrease();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        ref_key: "primitiveElement",
        ref: primitiveElement,
        tabindex: "-1",
        "aria-label": "Increase",
        type: _ctx.as === "button" ? "button" : void 0,
        style: { userSelect: unref(isPressed) ? "none" : void 0 },
        disabled: isDisabled.value ? "" : void 0,
        "data-disabled": isDisabled.value ? "" : void 0,
        "data-pressed": unref(isPressed) ? "true" : void 0,
        onContextmenu: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["prevent"]))
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "type",
        "style",
        "disabled",
        "data-disabled",
        "data-pressed"
      ]);
    };
  }
});
var NumberFieldIncrement_default = NumberFieldIncrement_vue_vue_type_script_setup_true_lang_default;
var NumberFieldInput_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "NumberFieldInput",
  props: {
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "input"
    }
  },
  setup(__props) {
    const props = __props;
    const { primitiveElement, currentElement } = usePrimitiveElement();
    const rootContext = injectNumberFieldRootContext();
    const kbd = useKbd();
    const { isComposing, handleCompositionStart, handleCompositionEnd } = useComposing();
    function handleKeydown(event) {
      if (isComposing.value || event.isComposing) return;
      switch (event.key) {
        case kbd.ARROW_UP:
          event.preventDefault();
          rootContext.handleIncrease();
          break;
        case kbd.ARROW_DOWN:
          event.preventDefault();
          rootContext.handleDecrease();
          break;
        case kbd.PAGE_UP:
          event.preventDefault();
          rootContext.handleIncrease(10);
          break;
        case kbd.PAGE_DOWN:
          event.preventDefault();
          rootContext.handleDecrease(10);
          break;
        case kbd.HOME:
          event.preventDefault();
          rootContext.handleMinMaxValue("min");
          break;
        case kbd.END:
          event.preventDefault();
          rootContext.handleMinMaxValue("max");
          break;
        case kbd.ENTER:
          rootContext.applyInputValue(event.target?.value);
          break;
      }
    }
    function handleWheelEvent(event) {
      if (rootContext.disableWheelChange.value) return;
      if (event.target !== getActiveElement()) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      if (event.deltaY > 0) rootContext.invertWheelChange.value ? rootContext.handleDecrease() : rootContext.handleIncrease();
      else if (event.deltaY < 0) rootContext.invertWheelChange.value ? rootContext.handleIncrease() : rootContext.handleDecrease();
    }
    onMounted(() => {
      rootContext.onInputElement(currentElement.value);
    });
    const inputValue = ref(rootContext.textValue.value);
    watch(() => rootContext.textValue.value, () => {
      inputValue.value = rootContext.textValue.value;
    }, {
      immediate: true,
      deep: true
    });
    function handleChange() {
      requestAnimationFrame(() => {
        inputValue.value = rootContext.textValue.value;
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), mergeProps(props, {
        id: unref(rootContext).id.value,
        ref_key: "primitiveElement",
        ref: primitiveElement,
        value: inputValue.value,
        role: "spinbutton",
        type: "text",
        tabindex: "0",
        inputmode: unref(rootContext).inputMode.value,
        disabled: unref(rootContext).disabled.value ? "" : void 0,
        "data-disabled": unref(rootContext).disabled.value ? "" : void 0,
        readonly: unref(rootContext).readonly.value ? "" : void 0,
        "data-readonly": unref(rootContext).readonly.value ? "" : void 0,
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: "false",
        "aria-roledescription": "Number field",
        "aria-valuenow": unref(rootContext).modelValue.value,
        "aria-valuemin": unref(rootContext).min.value,
        "aria-valuemax": unref(rootContext).max.value,
        onKeydown: handleKeydown,
        onWheel: handleWheelEvent,
        onBeforeinput: _cache[0] || (_cache[0] = (event) => {
          if (event.isComposing) return;
          const target = event.target;
          let nextValue = target.value.slice(0, target.selectionStart ?? void 0) + (event.data ?? "") + target.value.slice(target.selectionEnd ?? void 0);
          if (!unref(rootContext).validate(nextValue)) event.preventDefault();
        }),
        onInput: _cache[1] || (_cache[1] = (event) => {
          const target = event.target;
          inputValue.value = target.value;
        }),
        onChange: handleChange,
        onBlur: _cache[2] || (_cache[2] = ($event) => unref(rootContext).applyInputValue($event.target?.value)),
        onCompositionstart: unref(handleCompositionStart),
        onCompositionend: unref(handleCompositionEnd)
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, [
        "id",
        "value",
        "inputmode",
        "disabled",
        "data-disabled",
        "readonly",
        "data-readonly",
        "aria-valuenow",
        "aria-valuemin",
        "aria-valuemax",
        "onCompositionstart",
        "onCompositionend"
      ]);
    };
  }
});
var NumberFieldInput_default = NumberFieldInput_vue_vue_type_script_setup_true_lang_default;
const [injectSwitchRootContext, provideSwitchRootContext] = /* @__PURE__ */ createContext("SwitchRoot");
var SwitchRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "SwitchRoot",
  props: {
    defaultValue: {
      type: null,
      required: false
    },
    modelValue: {
      type: null,
      required: false,
      default: void 0
    },
    disabled: {
      type: Boolean,
      required: false
    },
    id: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false,
      default: "on"
    },
    trueValue: {
      type: null,
      required: false,
      default: () => true
    },
    falseValue: {
      type: null,
      required: false,
      default: () => false
    },
    asChild: {
      type: Boolean,
      required: false
    },
    as: {
      type: null,
      required: false,
      default: "button"
    },
    name: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { disabled } = toRefs(props);
    const modelValue = useVModel(props, "modelValue", emit, {
      defaultValue: props.defaultValue ?? props.falseValue,
      passive: props.modelValue === void 0
    });
    const checked = computed(() => modelValue.value === props.trueValue);
    function toggleCheck() {
      if (disabled.value) return;
      modelValue.value = checked.value ? props.falseValue : props.trueValue;
    }
    const { forwardRef, currentElement } = useForwardExpose();
    const isFormControl = useFormControl(currentElement);
    const scopeIdAttrs = useForwardScopeId();
    const ariaLabel = computed(() => props.id && currentElement.value ? document.querySelector(`[for="${props.id}"]`)?.innerText : void 0);
    provideSwitchRootContext({
      checked,
      toggleCheck,
      disabled
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [createVNode(unref(Primitive), mergeProps({
        id: _ctx.id,
        ref: unref(forwardRef),
        role: "switch",
        type: _ctx.as === "button" ? "button" : void 0,
        value: _ctx.value,
        "aria-label": _ctx.$attrs["aria-label"] || ariaLabel.value,
        "aria-checked": checked.value,
        "aria-required": _ctx.required,
        "data-state": checked.value ? "checked" : "unchecked",
        "data-disabled": unref(disabled) ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as,
        disabled: unref(disabled)
      }, {
        ...unref(scopeIdAttrs),
        ..._ctx.$attrs
      }, {
        onClick: toggleCheck,
        onKeydown: withKeys(withModifiers(toggleCheck, ["prevent"]), ["enter"])
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
          modelValue: unref(modelValue),
          checked: checked.value
        })]),
        _: 3
      }, 16, [
        "id",
        "type",
        "value",
        "aria-label",
        "aria-checked",
        "aria-required",
        "data-state",
        "data-disabled",
        "as-child",
        "as",
        "disabled",
        "onKeydown"
      ]), unref(isFormControl) && _ctx.name ? (openBlock(), createBlock(unref(VisuallyHiddenInput_default), mergeProps({
        key: 0,
        type: "checkbox",
        name: _ctx.name,
        disabled: unref(disabled),
        required: _ctx.required,
        value: _ctx.value,
        checked: checked.value
      }, unref(scopeIdAttrs)), null, 16, [
        "name",
        "disabled",
        "required",
        "value",
        "checked"
      ])) : createCommentVNode("v-if", true)], 64);
    };
  }
});
var SwitchRoot_default = SwitchRoot_vue_vue_type_script_setup_true_lang_default;
var SwitchThumb_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "SwitchThumb",
  props: {
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
    const rootContext = injectSwitchRootContext();
    useForwardExpose();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(Primitive), {
        "data-state": unref(rootContext).checked.value ? "checked" : "unchecked",
        "data-disabled": unref(rootContext).disabled.value ? "" : void 0,
        "as-child": _ctx.asChild,
        as: _ctx.as
      }, {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 8, [
        "data-state",
        "data-disabled",
        "as-child",
        "as"
      ]);
    };
  }
});
var SwitchThumb_default = SwitchThumb_vue_vue_type_script_setup_true_lang_default;
const _hoisted_1$6 = ["value", "placeholder", "disabled", "readonly", "rows"];
const _hoisted_2 = ["value", "type", "placeholder", "disabled", "readonly"];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SInput",
  props: {
    modelValue: { default: "" },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    type: { default: "text" },
    rows: { default: 3 },
    resize: { default: "none" },
    size: { default: "medium" },
    status: { default: "default" },
    updateOn: { default: "input" }
  },
  emits: ["update:modelValue", "focus", "blur"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isTextarea = computed(() => props.type === "textarea");
    const resizeClass = computed(() => {
      switch (props.resize) {
        case "vertical":
          return "resize-y";
        case "horizontal":
          return "resize-x";
        case "both":
          return "resize";
        default:
          return "resize-none";
      }
    });
    const sizeClasses = computed(() => {
      if (isTextarea.value) {
        if (props.size === "small") return "px-2 py-1.5 text-xs";
        if (props.size === "large") return "px-4 py-2.5 text-base";
        return "px-3 py-2 text-sm";
      }
      if (props.size === "small") return "h-8 px-2 text-xs";
      if (props.size === "large") return "h-10 px-4 text-base";
      return "h-9 px-3 text-sm";
    });
    const emit = __emit;
    const isFocused = ref(false);
    const draftValue = ref(props.modelValue);
    const displayValue = computed(
      () => props.updateOn === "blur" ? draftValue.value : props.modelValue
    );
    const showClear = computed(
      () => props.clearable && displayValue.value.length > 0 && !props.disabled
    );
    watch(
      () => props.modelValue,
      (value) => {
        if (props.updateOn === "input" || !isFocused.value) draftValue.value = value;
      }
    );
    const commitValue = () => {
      if (draftValue.value !== props.modelValue) emit("update:modelValue", draftValue.value);
    };
    const rollbackValue = () => {
      draftValue.value = props.modelValue;
    };
    const handleInput = (value) => {
      if (props.updateOn === "input") {
        emit("update:modelValue", value);
        return;
      }
      draftValue.value = value;
    };
    const handleClear = () => {
      handleInput("");
    };
    const handleBlur = () => {
      isFocused.value = false;
      if (props.updateOn === "blur") commitValue();
      emit("blur");
    };
    const handleEnter = (event) => {
      if (props.updateOn !== "blur") return;
      commitValue();
      event.currentTarget.blur();
    };
    const handleEscape = (event) => {
      if (props.updateOn === "blur") rollbackValue();
      event.currentTarget.blur();
    };
    return (_ctx, _cache) => {
      const _component_IconLucideX = __unplugin_components_11$1;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["text-on-surface border border-solid transition-[border-color,box-shadow,background-color,width,opacity] duration-250", [
          unref(isTextarea) ? "relative block" : "flex items-center gap-2",
          unref(sizeClasses),
          __props.round ? "rounded-full" : "rounded-lg",
          unref(isFocused) ? __props.status === "error" ? "bg-on-surface/8 border-red-500 ring-2 ring-red-500/20" : "bg-on-surface/8 border-primary ring-2 ring-primary/20" : __props.status === "error" ? "bg-on-surface/3 border-red-500/60 hover:bg-on-surface/10" : "bg-on-surface/3 border-on-surface/15 hover:bg-on-surface/10 hover:border-on-surface/25",
          __props.disabled ? "opacity-50 cursor-not-allowed" : ""
        ]])
      }, [
        unref(isTextarea) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createBaseVNode("textarea", {
            value: unref(displayValue),
            placeholder: __props.placeholder,
            disabled: __props.disabled,
            readonly: __props.readonly,
            rows: __props.rows,
            class: normalizeClass(["w-full block bg-transparent outline-none border-none shadow-none text-on-surface placeholder:text-on-surface-variant/40 disabled:cursor-not-allowed", [unref(resizeClass), __props.readonly ? "cursor-pointer" : "", unref(showClear) ? "pr-5" : ""]]),
            onInput: _cache[0] || (_cache[0] = ($event) => handleInput($event.target.value)),
            onFocus: _cache[1] || (_cache[1] = ($event) => {
              isFocused.value = true;
              emit("focus");
            }),
            onBlur: handleBlur,
            onKeydown: withKeys(handleEscape, ["esc"])
          }, null, 42, _hoisted_1$6),
          createVNode(Transition, { name: "fade" }, {
            default: withCtx(() => [
              unref(showClear) ? (openBlock(), createBlock(_component_IconLucideX, {
                key: 0,
                class: "absolute top-2 right-2 size-3.5 text-on-surface-variant/50 cursor-pointer transition-colors duration-200 hover:text-on-surface",
                onMousedown: withModifiers(handleClear, ["prevent", "stop"])
              })) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          renderSlot(_ctx.$slots, "prefix"),
          createBaseVNode("input", {
            value: unref(displayValue),
            type: __props.type,
            placeholder: __props.placeholder,
            disabled: __props.disabled,
            readonly: __props.readonly,
            class: normalizeClass(["flex-1 min-w-0 h-full bg-transparent outline-none border-none shadow-none text-on-surface placeholder:text-on-surface-variant/40 disabled:cursor-not-allowed", __props.readonly ? "cursor-pointer" : ""]),
            onInput: _cache[2] || (_cache[2] = ($event) => handleInput($event.target.value)),
            onFocus: _cache[3] || (_cache[3] = ($event) => {
              isFocused.value = true;
              emit("focus");
            }),
            onBlur: handleBlur,
            onKeydown: [
              withKeys(handleEnter, ["enter"]),
              withKeys(handleEscape, ["esc"])
            ]
          }, null, 42, _hoisted_2),
          createVNode(Transition, { name: "fade" }, {
            default: withCtx(() => [
              unref(showClear) ? (openBlock(), createBlock(_component_IconLucideX, {
                key: 0,
                class: "size-3.5 text-on-surface-variant/50 shrink-0 cursor-pointer transition-colors duration-200 hover:text-on-surface",
                onMousedown: withModifiers(handleClear, ["prevent", "stop"])
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          renderSlot(_ctx.$slots, "suffix")
        ], 64))
      ], 2);
    };
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SNumberInput",
  props: {
    id: {},
    modelValue: { default: null },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    min: {},
    max: {},
    step: {},
    unit: {},
    size: { default: "medium" },
    status: { default: "default" },
    cover: { type: Boolean, default: false },
    updateOn: { default: "input" }
  },
  emits: ["update:modelValue", "focus", "blur"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isFocused = ref(false);
    const draftValue = ref(props.modelValue);
    const sizeClasses = computed(() => {
      if (props.size === "small") return "h-7 text-xs";
      if (props.size === "large") return "h-10 text-base";
      return "h-8.5 text-sm";
    });
    const stepperClass = computed(() => {
      if (props.size === "small") return "w-7";
      if (props.size === "large") return "w-10";
      return "w-8.5";
    });
    const displayValue = computed(
      () => props.updateOn === "blur" ? draftValue.value : props.modelValue
    );
    const innerValue = computed(
      () => displayValue.value == null ? void 0 : displayValue.value
    );
    watch(
      () => props.modelValue,
      (value) => {
        if (props.updateOn === "input" || !isFocused.value) draftValue.value = value;
      }
    );
    const onUpdate = (value) => {
      if (props.updateOn === "blur") {
        draftValue.value = value;
        return;
      }
      emit("update:modelValue", value);
    };
    const commitValue = () => {
      if (draftValue.value != null && draftValue.value !== props.modelValue) {
        emit("update:modelValue", draftValue.value);
      }
    };
    const rollbackValue = () => {
      draftValue.value = props.modelValue;
    };
    const handleBlur = () => {
      isFocused.value = false;
      if (props.updateOn === "blur") commitValue();
      emit("blur");
    };
    const handleEnter = (event) => {
      if (props.updateOn !== "blur") return;
      commitValue();
      event.currentTarget.blur();
    };
    const handleEscape = (event) => {
      if (props.updateOn !== "blur") return;
      rollbackValue();
      event.currentTarget.blur();
    };
    const commitAfterStep = () => {
      if (props.updateOn === "blur") void nextTick(commitValue);
    };
    return (_ctx, _cache) => {
      const _component_IconLucideMinus = __unplugin_components_5;
      const _component_NumberFieldDecrement = NumberFieldDecrement_default;
      const _component_NumberFieldInput = NumberFieldInput_default;
      const _component_IconLucidePlus = __unplugin_components_4;
      const _component_NumberFieldIncrement = NumberFieldIncrement_default;
      const _component_NumberFieldRoot = NumberFieldRoot_default;
      return openBlock(), createBlock(_component_NumberFieldRoot, {
        id: __props.id,
        "model-value": unref(innerValue),
        min: __props.min,
        max: __props.max,
        step: __props.step ?? 1,
        disabled: __props.disabled,
        "format-options": { useGrouping: false },
        class: normalizeClass(["inline-flex items-center border border-solid overflow-hidden transition-[border-color,box-shadow,background-color,width,opacity] duration-250", [
          unref(sizeClasses),
          __props.cover ? "text-cover" : "text-on-surface",
          __props.round ? "rounded-full" : "rounded-lg",
          __props.status === "error" ? unref(isFocused) ? "bg-on-surface/8 border-red-500 ring-2 ring-red-500/20" : "bg-on-surface/3 border-red-500/60 hover:bg-on-surface/10" : __props.cover ? unref(isFocused) ? "bg-cover/15 border-cover/60 ring-2 ring-cover/20" : "bg-cover/8 border-cover/30 hover:bg-cover/15 hover:border-cover/45" : unref(isFocused) ? "bg-on-surface/8 border-primary ring-2 ring-primary/20" : "bg-on-surface/3 border-on-surface/15 hover:bg-on-surface/10 hover:border-on-surface/25",
          __props.disabled ? "opacity-50 cursor-not-allowed" : ""
        ]]),
        "onUpdate:modelValue": onUpdate
      }, {
        default: withCtx(() => [
          createVNode(_component_NumberFieldDecrement, {
            class: normalizeClass([
              unref(stepperClass),
              "h-full inline-flex items-center justify-center shrink-0 bg-transparent border-none outline-none cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
              __props.cover ? "text-cover/70 hover:text-cover hover:bg-cover/10 disabled:hover:text-cover/70" : "text-on-surface-variant/70 hover:text-on-surface hover:bg-on-surface/8 disabled:hover:text-on-surface-variant/70"
            ]),
            onClick: commitAfterStep
          }, {
            default: withCtx(() => [
              createVNode(_component_IconLucideMinus, { class: "size-3.5" })
            ]),
            _: 1
          }, 8, ["class"]),
          renderSlot(_ctx.$slots, "prefix"),
          createVNode(_component_NumberFieldInput, {
            placeholder: __props.placeholder,
            class: normalizeClass([
              "flex-1 min-w-0 h-full px-1 bg-transparent outline-none border-none shadow-none text-center disabled:cursor-not-allowed",
              __props.cover ? "text-cover placeholder:text-cover/40 !selection:bg-cover/35 !selection:text-cover" : "text-on-surface placeholder:text-on-surface-variant/40"
            ]),
            onFocus: _cache[0] || (_cache[0] = ($event) => {
              isFocused.value = true;
              emit("focus");
            }),
            onBlur: _cache[1] || (_cache[1] = ($event) => handleBlur()),
            onKeydown: [
              withKeys(handleEnter, ["enter"]),
              withKeys(handleEscape, ["esc"])
            ]
          }, null, 8, ["placeholder", "class"]),
          renderSlot(_ctx.$slots, "suffix"),
          __props.unit ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(["text-xs mr-1", __props.cover ? "text-cover/60" : "text-on-surface-variant/60"])
          }, toDisplayString(__props.unit), 3)) : createCommentVNode("", true),
          createVNode(_component_NumberFieldIncrement, {
            class: normalizeClass([
              unref(stepperClass),
              "h-full inline-flex items-center justify-center shrink-0 bg-transparent border-none outline-none cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
              __props.cover ? "text-cover/70 hover:text-cover hover:bg-cover/10 disabled:hover:text-cover/70" : "text-on-surface-variant/70 hover:text-on-surface hover:bg-on-surface/8 disabled:hover:text-on-surface-variant/70"
            ]),
            onClick: commitAfterStep
          }, {
            default: withCtx(() => [
              createVNode(_component_IconLucidePlus, { class: "size-3.5" })
            ]),
            _: 1
          }, 8, ["class"])
        ]),
        _: 3
      }, 8, ["id", "model-value", "min", "max", "step", "disabled", "class"]);
    };
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SSwitch",
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    round: { type: Boolean, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _cache) => {
      const _component_SwitchThumb = SwitchThumb_default;
      const _component_SwitchRoot = SwitchRoot_default;
      return openBlock(), createBlock(_component_SwitchRoot, {
        "model-value": __props.modelValue,
        disabled: __props.disabled,
        class: normalizeClass(["group relative inline-flex items-center w-10 h-5.5 shrink-0 border-none p-0 cursor-pointer outline-none transition-[background-color] duration-300 disabled:opacity-40 disabled:cursor-not-allowed", [
          __props.modelValue ? "bg-primary/80 hover:bg-primary/70" : "bg-on-surface/20 hover:bg-on-surface/30",
          __props.round ? "rounded-full" : "rounded-lg"
        ]]),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("update:modelValue", $event))
      }, {
        default: withCtx(() => [
          createVNode(_component_SwitchThumb, {
            class: normalizeClass(["block h-4 w-4 bg-white pointer-events-none transition-[transform,width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-active:w-5", [
              __props.modelValue ? "translate-x-5.25 group-active:translate-x-4.25" : "translate-x-0.75",
              __props.round ? "rounded-full" : "rounded-md"
            ]])
          }, null, 8, ["class"])
        ]),
        _: 1
      }, 8, ["model-value", "disabled", "class"]);
    };
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SDivider",
  props: {
    vertical: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "separator",
        class: normalizeClass(["bg-on-surface/10 transition-background-color duration-300", __props.vertical ? "w-px h-4" : "h-px"])
      }, null, 2);
    };
  }
});
const _hoisted_1$5 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$5, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("path", { d: "m21 21l-4.34-4.34" }),
      createBaseVNode("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      })
    ], -1)
  ])]);
}
const __unplugin_components_2 = markRaw({ name: "lucide-search", render: render$4 });
const legacyDb = localforage.createInstance({ name: "splayer", storeName: "playlists" });
const usePlaylistStore = defineStore("playlist", () => {
  const playlists = shallowRef([]);
  const initialized = ref(false);
  const migrateLegacy = async () => {
    const records = [];
    await legacyDb.iterate((record) => {
      records.push({
        id: record.id,
        title: record.title,
        description: record.description,
        cover: record.cover,
        trackIds: record.trackIds,
        createTime: record.createTime,
        updateTime: record.updateTime
      });
    });
    if (records.length === 0) return;
    await window.api.playlist.importLegacy(records);
    await legacyDb.clear();
  };
  const load = async () => {
    await migrateLegacy();
    playlists.value = await window.api.playlist.list();
    initialized.value = true;
  };
  const get = async (id) => {
    const detail = await window.api.playlist.get(id);
    if (!detail || detail.type !== "local") return null;
    return {
      id: detail.id,
      type: "playlist",
      source: "local",
      title: detail.title,
      description: detail.description,
      cover: detail.cover,
      tracks: detail.tracks,
      trackCount: detail.tracks.length,
      createTime: detail.createTime,
      updateTime: detail.updateTime
    };
  };
  const create = async (title, description) => {
    const created = await window.api.playlist.create({
      type: "local",
      title,
      description
    });
    playlists.value = [created, ...playlists.value];
    return {
      id: created.id,
      type: "playlist",
      source: "local",
      title: created.title,
      description: created.description,
      cover: created.cover,
      tracks: [],
      trackCount: 0,
      createTime: created.createTime,
      updateTime: created.updateTime
    };
  };
  const update = async (id, data) => {
    const updated = await window.api.playlist.update(id, data);
    if (!updated) return;
    playlists.value = playlists.value.map((playlist) => playlist.id === id ? updated : playlist);
  };
  const remove = async (id) => {
    await window.api.playlist.remove(id);
    playlists.value = playlists.value.filter((playlist) => playlist.id !== id);
  };
  const addTracks = async (id, tracks) => {
    const count = await window.api.playlist.addTracks(
      id,
      tracks.map((track) => track.id)
    );
    if (count > 0) {
      const cover = tracks.find((track) => track.cover)?.cover;
      playlists.value = playlists.value.map(
        (playlist) => playlist.id === id ? {
          ...playlist,
          cover: cover ?? playlist.cover,
          trackCount: playlist.trackCount + count,
          updateTime: Date.now()
        } : playlist
      );
    }
    return count;
  };
  const removeTracks = async (id, trackIds) => {
    const count = await window.api.playlist.removeTracks(id, trackIds);
    if (count === 0) return;
    playlists.value = playlists.value.map((playlist) => {
      if (playlist.id !== id) return playlist;
      const trackCount = Math.max(0, playlist.trackCount - count);
      return {
        ...playlist,
        cover: trackCount === 0 ? void 0 : playlist.cover,
        trackCount,
        updateTime: Date.now()
      };
    });
  };
  const clear = async () => {
    await window.api.playlist.clear();
    await legacyDb.clear();
    playlists.value = [];
  };
  return {
    playlists,
    localPlaylists: playlists,
    initialized,
    load,
    get,
    create,
    update,
    remove,
    addTracks,
    removeTracks,
    clear
  };
});
const _hoisted_1$4 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m9 18l6-6l-6-6"
    }, null, -1)
  ])]);
}
const IconLucideChevronRight = markRaw({ name: "lucide-chevron-right", render: render$3 });
const _hoisted_1$3 = { class: "relative inline-flex items-center justify-center" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SIconSwap",
  props: {
    active: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", _hoisted_1$3, [
        createBaseVNode("span", {
          class: normalizeClass(["s-icon-swap absolute inset-0 inline-flex items-center justify-center *:size-full", { "s-icon-swap-hidden": !__props.active }])
        }, [
          renderSlot(_ctx.$slots, "on", {}, void 0, true)
        ], 2),
        createBaseVNode("span", {
          class: normalizeClass(["s-icon-swap absolute inset-0 inline-flex items-center justify-center *:size-full", { "s-icon-swap-hidden": __props.active }])
        }, [
          renderSlot(_ctx.$slots, "off", {}, void 0, true)
        ], 2)
      ]);
    };
  }
});
const __unplugin_components_11 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-58be9d33"]]);
const _hoisted_1$2 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9"
    }, null, -1)
  ])]);
}
const __unplugin_components_7 = markRaw({ name: "lucide-cloud", render: render$2 });
const isExternalUrl = (url) => !!url && /^https?:\/\//i.test(url);
const openExternal = (url) => {
  if (!isExternalUrl(url)) return;
  window.open(url, "_blank", "noopener,noreferrer");
};
const useCopyText = () => {
  const { t } = useI18n();
  const copy = async (text) => {
    if (!text) {
      toast.error(t("common.copyFailed"));
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t("common.copied"));
    } catch {
      toast.error(t("common.copyFailed"));
    }
  };
  return { copy };
};
const _hoisted_1$1 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15.39 4.39a1 1 0 0 0 1.68-.474a2.5 2.5 0 1 1 3.014 3.015a1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474a2.5 2.5 0 1 0-3.014 3.015a1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474a2.5 2.5 0 1 1-3.014-3.015a1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474a2.5 2.5 0 1 0 3.014-3.015a1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"
    }, null, -1)
  ])]);
}
const IconPuzzle = markRaw({ name: "lucide-puzzle", render: render$1 });
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
        r: "1"
      }),
      createBaseVNode("circle", {
        cx: "19",
        cy: "12",
        r: "1"
      }),
      createBaseVNode("circle", {
        cx: "5",
        cy: "12",
        r: "1"
      })
    ], -1)
  ])]);
}
const IconLucideMoreHorizontal = markRaw({ name: "lucide-more-horizontal", render });
export {
  IconLucideMoreHorizontal as I,
  MAP_KEY_TO_FOCUS_INTENT as M,
  RovingFocusGroup_default as R,
  VisuallyHiddenInput_default as V,
  _sfc_main$4 as _,
  _sfc_main$2 as a,
  _sfc_main$3 as b,
  _sfc_main$1 as c,
  __unplugin_components_2 as d,
  __unplugin_components_11 as e,
  IconLucideChevronRight as f,
  usePlaylistStore as g,
  __unplugin_components_7 as h,
  injectRovingFocusGroupContext as i,
  getFocusIntent as j,
  focusFirst as k,
  useKbd as l,
  useComposing as m,
  isExternalUrl as n,
  openExternal as o,
  IconPuzzle as p,
  MenuRoot_default as q,
  MenuContent_default as r,
  MenuItem_default as s,
  MenuPortal_default as t,
  useCopyText as u,
  MenuSub_default as v,
  wrapArray as w,
  MenuSubContent_default as x,
  MenuSubTrigger_default as y,
  MenuAnchor_default as z
};
