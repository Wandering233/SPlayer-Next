import { h as _sfc_main$5, d as IconLucideListPlus } from "./SRadioGroup.vue_vue_type_script_setup_true_lang-CA7DTWUw.js";
import { i as injectRovingFocusGroupContext, j as getFocusIntent, w as wrapArray, k as focusFirst, R as RovingFocusGroup_default, M as MAP_KEY_TO_FOCUS_INTENT, g as usePlaylistStore, f as IconLucideChevronRight, c as _sfc_main$7 } from "./more-horizontal-BtOolk7_.js";
import { _ as _sfc_main$6 } from "./SDropdownMenu.vue_vue_type_script_setup_true_lang-DsKOP0yw.js";
import { _ as _sfc_main$4 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as _sfc_main$2 } from "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import { u as useId, P as Primitive, a as useDirection, b as useVModel, c as createEventHook, d as createContext, h as handleAndDispatchCustomEvent } from "./PopperContent-CPX94GL7.js";
import { u as useCollection, b as useTypeahead, g as getActiveElement } from "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import { f as findValuesBetween } from "./arrays-DjGQWcSj.js";
import { r as ref, x as defineComponent, k as onMounted, J as onUnmounted, w as watch, C as openBlock, P as createBlock, Q as withCtx, D as createVNode, v as unref, _ as renderSlot, c as computed, n as nextTick, j as toRefs, Y as withKeys, V as withModifiers, $ as mergeProps, y as createElementBlock, z as createBaseVNode, O as toDisplayString, W as createTextVNode, B as createCommentVNode, i as isRef, q as shallowRef, M as normalizeClass, R as resolveDynamicComponent, b as toRaw } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { u as useI18n, aA as useLibraryStore, s as storeToRefs, c as useRouter, at as playFrom, t as toast } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$3 } from "./SongList.vue_vue_type_script_setup_true_lang-Doyounvo.js";
import { I as IconLucideFolder } from "./folder-EonVPYpL.js";
import { a as IconLucideFolderOpen } from "./folder-open-Cw_0c4cI.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { I as IconLucideListChecks } from "./list-checks-B0B5438d.js";
import { I as IconLucideEllipsis } from "./ellipsis-D0hNWfJ2.js";
import "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import "./x-Cd6Sow4a.js";
import "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import "./song-BGJnBQIx.js";
import "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import "./plus-BEApKDpl.js";
import "./useDownload-DvR_TELr.js";
import "./copy-DhNjJWGd.js";
import "./trash-2-BKyCA-Fb.js";
import "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import "./check-BXlOuXWK.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./SLoading-C4RltnK4.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import "./format-DoPtjAAN.js";
import "./pause-u3QmqHX9.js";
import "./useFloatingPlayerBar-R2fVODYZ.js";
import "./arrow-up-down-Dw8Z8Wwk.js";
import "./favorite-outline-rounded-C5xed2i3.js";
function useSelectionBehavior(modelValue, props) {
  const firstValue = ref();
  const onSelectItem = (val, condition) => {
    if (props.multiple && Array.isArray(modelValue.value)) if (props.selectionBehavior === "replace") {
      modelValue.value = [val];
      firstValue.value = val;
    } else {
      const index = modelValue.value.findIndex((v) => condition(v));
      if (index !== -1) modelValue.value = modelValue.value.filter((_, i) => i !== index);
      else modelValue.value = [...modelValue.value, val];
    }
    else if (props.selectionBehavior === "replace") modelValue.value = { ...val };
    else if (!Array.isArray(modelValue.value) && condition(modelValue.value)) modelValue.value = void 0;
    else modelValue.value = { ...val };
    return modelValue.value;
  };
  function handleMultipleReplace(intent, currentElement, getItems, options) {
    if (!firstValue?.value || !props.multiple || !Array.isArray(modelValue.value)) return;
    const collection = getItems().filter((i) => i.ref.dataset.disabled !== "");
    const lastValue = collection.find((i) => i.ref === currentElement)?.value;
    if (!lastValue) return;
    let value = null;
    switch (intent) {
      case "prev":
      case "next": {
        value = findValuesBetween(options, firstValue.value, lastValue);
        break;
      }
      case "first": {
        value = findValuesBetween(options, firstValue.value, options?.[0]);
        break;
      }
      case "last": {
        value = findValuesBetween(options, firstValue.value, options.at(-1));
        break;
      }
    }
    modelValue.value = value;
  }
  return {
    firstValue,
    onSelectItem,
    handleMultipleReplace
  };
}
var RovingFocusItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "RovingFocusItem",
  props: {
    tabStopId: {
      type: String,
      required: false
    },
    focusable: {
      type: Boolean,
      required: false,
      default: true
    },
    active: {
      type: Boolean,
      required: false
    },
    allowShiftKey: {
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
      default: "span"
    }
  },
  setup(__props) {
    const props = __props;
    const context = injectRovingFocusGroupContext();
    const randomId = useId();
    const id = computed(() => props.tabStopId || randomId);
    const isCurrentTabStop = computed(() => context.currentTabStopId.value === id.value);
    const { getItems, CollectionItem } = useCollection();
    onMounted(() => {
      if (props.focusable) context.onFocusableItemAdd();
    });
    onUnmounted(() => {
      if (props.focusable) context.onFocusableItemRemove();
    });
    watch(() => props.focusable, (newVal, oldVal) => {
      if (newVal === oldVal) return;
      if (newVal) context.onFocusableItemAdd();
      else context.onFocusableItemRemove();
    });
    function handleKeydown(event) {
      if (event.key === "Tab" && event.shiftKey) {
        context.onItemShiftTab();
        return;
      }
      if (event.target !== event.currentTarget) return;
      const focusIntent = getFocusIntent(event, context.orientation.value, context.dir.value);
      if (focusIntent !== void 0) {
        if (event.metaKey || event.ctrlKey || event.altKey || (props.allowShiftKey ? false : event.shiftKey)) return;
        event.preventDefault();
        let candidateNodes = [...getItems().map((i) => i.ref).filter((i) => i.dataset.disabled !== "")];
        if (focusIntent === "last") candidateNodes.reverse();
        else if (focusIntent === "prev" || focusIntent === "next") {
          if (focusIntent === "prev") candidateNodes.reverse();
          const currentIndex = candidateNodes.indexOf(event.currentTarget);
          candidateNodes = context.loop.value ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
        }
        nextTick(() => focusFirst(candidateNodes));
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(CollectionItem), null, {
        default: withCtx(() => [createVNode(unref(Primitive), {
          tabindex: isCurrentTabStop.value ? 0 : -1,
          "data-orientation": unref(context).orientation.value,
          "data-active": _ctx.active ? "" : void 0,
          "data-disabled": !_ctx.focusable ? "" : void 0,
          as: _ctx.as,
          "as-child": _ctx.asChild,
          onMousedown: _cache[0] || (_cache[0] = (event) => {
            if (!_ctx.focusable) event.preventDefault();
            else unref(context).onItemFocus(id.value);
          }),
          onFocus: _cache[1] || (_cache[1] = ($event) => unref(context).onItemFocus(id.value)),
          onKeydown: handleKeydown
        }, {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
          _: 3
        }, 8, [
          "tabindex",
          "data-orientation",
          "data-active",
          "data-disabled",
          "as",
          "as-child"
        ])]),
        _: 3
      });
    };
  }
});
var RovingFocusItem_default = RovingFocusItem_vue_vue_type_script_setup_true_lang_default;
function flatten(items) {
  return items.reduce((acc, item) => {
    acc.push(item);
    if (item.children) acc.push(...flatten(item.children));
    return acc;
  }, []);
}
const [injectTreeRootContext, provideTreeRootContext] = /* @__PURE__ */ createContext("TreeRoot");
var TreeRoot_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  __name: "TreeRoot",
  props: {
    modelValue: {
      type: null,
      required: false
    },
    defaultValue: {
      type: null,
      required: false
    },
    items: {
      type: Array,
      required: false
    },
    expanded: {
      type: Array,
      required: false
    },
    defaultExpanded: {
      type: Array,
      required: false
    },
    getKey: {
      type: Function,
      required: true
    },
    getChildren: {
      type: Function,
      required: false,
      default: (val) => val.children
    },
    selectionBehavior: {
      type: String,
      required: false,
      default: "toggle"
    },
    multiple: {
      type: Boolean,
      required: false,
      skipCheck: true
    },
    dir: {
      type: String,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    propagateSelect: {
      type: Boolean,
      required: false
    },
    bubbleSelect: {
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
      default: "ul"
    }
  },
  emits: ["update:modelValue", "update:expanded"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { items, multiple, disabled, propagateSelect, dir: propDir, bubbleSelect } = toRefs(props);
    const { handleTypeaheadSearch } = useTypeahead();
    const dir = useDirection(propDir);
    const rovingFocusGroupRef = ref();
    const isVirtual = ref(false);
    const virtualKeydownHook = createEventHook();
    const modelValue = useVModel(props, "modelValue", emits, {
      defaultValue: props.defaultValue ?? (multiple.value ? [] : void 0),
      passive: true,
      deep: true
    });
    const expanded = useVModel(props, "expanded", emits, {
      defaultValue: props.defaultExpanded ?? [],
      passive: props.expanded === void 0,
      deep: true
    });
    const { onSelectItem, handleMultipleReplace } = useSelectionBehavior(modelValue, props);
    const selectedKeys = computed(() => {
      if (multiple.value && Array.isArray(modelValue.value)) return modelValue.value.map((i) => props.getKey(i));
      else return [props.getKey(modelValue.value ?? {})];
    });
    function flattenItems(items$1, level = 1, parentItem) {
      return items$1.reduce((acc, item, index) => {
        const key = props.getKey(item);
        const children = props.getChildren(item);
        const isExpanded = expanded.value.includes(key);
        const flattenedItem = {
          _id: key,
          value: item,
          index,
          level,
          parentItem,
          hasChildren: !!children,
          bind: {
            "value": item,
            level,
            "aria-setsize": items$1.length,
            "aria-posinset": index + 1
          }
        };
        acc.push(flattenedItem);
        if (children && isExpanded) acc.push(...flattenItems(children, level + 1, item));
        return acc;
      }, []);
    }
    const expandedItems = computed(() => {
      const items$1 = props.items;
      expanded.value.map((i) => i);
      return flattenItems(items$1 ?? []);
    });
    function handleKeydown(event) {
      if (isVirtual.value) virtualKeydownHook.trigger(event);
      else {
        const collections = rovingFocusGroupRef.value?.getItems() ?? [];
        handleTypeaheadSearch(event.key, collections);
      }
    }
    function handleKeydownNavigation(event) {
      if (isVirtual.value) return;
      const intent = MAP_KEY_TO_FOCUS_INTENT[event.key];
      nextTick(() => {
        handleMultipleReplace(intent, getActiveElement(), rovingFocusGroupRef.value?.getItems, expandedItems.value.map((i) => i.value));
      });
    }
    function handleBubbleSelect(item) {
      if (item.parentItem != null && Array.isArray(modelValue.value) && props.multiple) {
        const parentItem = expandedItems.value.find((i) => {
          return item.parentItem != null && props.getKey(i.value) === props.getKey(item.parentItem);
        });
        if (parentItem != null) {
          const areAllChilredOfParentSelected = props.getChildren(parentItem.value)?.every((i) => modelValue.value.find((v) => props.getKey(v) === props.getKey(i)));
          if (areAllChilredOfParentSelected) modelValue.value = [...modelValue.value, parentItem.value];
          else modelValue.value = modelValue.value.filter((v) => props.getKey(v) !== props.getKey(parentItem.value));
          handleBubbleSelect(parentItem);
        }
      }
    }
    provideTreeRootContext({
      modelValue,
      selectedKeys,
      onSelect: (val) => {
        const condition = (baseValue) => props.getKey(baseValue ?? {}) === props.getKey(val);
        const exist = props.multiple && Array.isArray(modelValue.value) ? modelValue.value?.findIndex(condition) !== -1 : void 0;
        onSelectItem(val, condition);
        if (props.bubbleSelect && props.multiple && Array.isArray(modelValue.value)) {
          const item = expandedItems.value.find((i) => {
            return props.getKey(i.value) === props.getKey(val);
          });
          if (item != null) handleBubbleSelect(item);
        }
        if (props.propagateSelect && props.multiple && Array.isArray(modelValue.value)) {
          const children = flatten(props.getChildren(val) ?? []);
          if (exist) modelValue.value = [...modelValue.value].filter((i) => !children.some((child) => props.getKey(i ?? {}) === props.getKey(child)));
          else modelValue.value = [...modelValue.value, ...children];
        }
      },
      expanded,
      onToggle(val) {
        const children = val ? props.getChildren(val) : void 0;
        if (!children) return;
        const key = props.getKey(val) ?? val;
        if (expanded.value.includes(key)) expanded.value = expanded.value.filter((val$1) => val$1 !== key);
        else expanded.value = [...expanded.value, key];
      },
      getKey: props.getKey,
      getChildren: props.getChildren,
      items,
      expandedItems,
      disabled,
      multiple,
      dir,
      propagateSelect,
      bubbleSelect,
      isVirtual,
      virtualKeydownHook,
      handleMultipleReplace
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(RovingFocusGroup_default), {
        ref_key: "rovingFocusGroupRef",
        ref: rovingFocusGroupRef,
        "as-child": "",
        orientation: "vertical",
        dir: unref(dir)
      }, {
        default: withCtx(() => [createVNode(unref(Primitive), {
          role: "tree",
          as: _ctx.as,
          "as-child": _ctx.asChild,
          "aria-multiselectable": unref(multiple) ? true : void 0,
          onKeydown: [handleKeydown, withKeys(withModifiers(handleKeydownNavigation, ["shift"]), ["up", "down"])]
        }, {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
            flattenItems: expandedItems.value,
            modelValue: unref(modelValue),
            expanded: unref(expanded)
          })]),
          _: 3
        }, 8, [
          "as",
          "as-child",
          "aria-multiselectable",
          "onKeydown"
        ])]),
        _: 3
      }, 8, ["dir"]);
    };
  }
});
var TreeRoot_default = TreeRoot_vue_vue_type_script_setup_true_lang_default;
const TREE_SELECT = "tree.select";
const TREE_TOGGLE = "tree.toggle";
var TreeItem_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "TreeItem",
  props: {
    value: {
      type: null,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
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
      default: "li"
    }
  },
  emits: ["select", "toggle"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const rootContext = injectTreeRootContext();
    const { getItems } = useCollection();
    const hasChildren = computed(() => !!rootContext.getChildren(props.value));
    const isExpanded = computed(() => {
      const key = rootContext.getKey(props.value);
      return rootContext.expanded.value.includes(key);
    });
    const isSelected = computed(() => {
      const key = rootContext.getKey(props.value);
      return rootContext.selectedKeys.value.includes(key);
    });
    const isIndeterminate = computed(() => {
      if (rootContext.bubbleSelect.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) {
        const children = flatten(rootContext.getChildren(props.value) || []);
        return children.some((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child))) && !children.every((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child)));
      } else if (rootContext.propagateSelect.value && isSelected.value && hasChildren.value && Array.isArray(rootContext.modelValue.value)) {
        const children = flatten(rootContext.getChildren(props.value) || []);
        return !children.every((child) => rootContext.modelValue.value.find((v) => rootContext.getKey(v) === rootContext.getKey(child)));
      } else return void 0;
    });
    const isDisabled = computed(() => rootContext.disabled.value || props.disabled);
    function handleKeydownRight(ev) {
      if (isDisabled.value) return;
      if (!hasChildren.value) return;
      if (isExpanded.value) {
        const collection = getItems().map((i) => i.ref);
        const currentElement = getActiveElement();
        const currentIndex = collection.indexOf(currentElement);
        const list = [...collection].slice(currentIndex);
        const nextElement = list.find((el) => Number(el.getAttribute("data-indent")) === props.level + 1);
        if (nextElement) nextElement.focus();
      } else handleToggleCustomEvent(ev);
    }
    function handleKeydownLeft(ev) {
      if (isDisabled.value) return;
      if (isExpanded.value) handleToggleCustomEvent(ev);
      else {
        const collection = getItems().map((i) => i.ref);
        const currentElement = getActiveElement();
        const currentIndex = collection.indexOf(currentElement);
        const list = [...collection].slice(0, currentIndex).reverse();
        const parentElement = list.find((el) => Number(el.getAttribute("data-indent")) === props.level - 1);
        if (parentElement) parentElement.focus();
      }
    }
    async function handleSelect(ev) {
      if (isDisabled.value) return;
      emits("select", ev);
      if (ev?.defaultPrevented) return;
      rootContext.onSelect(props.value);
    }
    async function handleToggle(ev) {
      if (isDisabled.value) return;
      emits("toggle", ev);
      if (ev?.defaultPrevented) return;
      rootContext.onToggle(props.value);
    }
    async function handleSelectCustomEvent(ev) {
      if (!ev) return;
      const eventDetail = {
        originalEvent: ev,
        value: props.value,
        isExpanded: isExpanded.value,
        isSelected: isSelected.value
      };
      handleAndDispatchCustomEvent(TREE_SELECT, handleSelect, eventDetail);
    }
    async function handleToggleCustomEvent(ev) {
      if (!ev) return;
      const eventDetail = {
        originalEvent: ev,
        value: props.value,
        isExpanded: isExpanded.value,
        isSelected: isSelected.value
      };
      handleAndDispatchCustomEvent(TREE_TOGGLE, handleToggle, eventDetail);
    }
    __expose({
      isExpanded,
      isSelected,
      isIndeterminate,
      isDisabled,
      handleToggle: () => rootContext.onToggle(props.value),
      handleSelect: () => rootContext.onSelect(props.value)
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(RovingFocusItem_default), {
        "as-child": "",
        value: _ctx.value,
        "allow-shift-key": "",
        focusable: !isDisabled.value
      }, {
        default: withCtx(() => [createVNode(unref(Primitive), mergeProps(_ctx.$attrs, {
          role: "treeitem",
          as: _ctx.as,
          "as-child": _ctx.asChild,
          "aria-selected": isSelected.value,
          "aria-expanded": hasChildren.value ? isExpanded.value : void 0,
          "aria-level": _ctx.level,
          "aria-disabled": isDisabled.value ? true : void 0,
          "data-indent": _ctx.level,
          "data-selected": isSelected.value ? "" : void 0,
          "data-expanded": isExpanded.value ? "" : void 0,
          "data-disabled": isDisabled.value ? "" : void 0,
          onKeydown: [
            withKeys(withModifiers(handleSelectCustomEvent, ["self", "prevent"]), ["enter", "space"]),
            _cache[0] || (_cache[0] = withKeys(withModifiers((ev) => unref(rootContext).dir.value === "ltr" ? handleKeydownRight(ev) : handleKeydownLeft(ev), ["prevent"]), ["right"])),
            _cache[1] || (_cache[1] = withKeys(withModifiers((ev) => unref(rootContext).dir.value === "ltr" ? handleKeydownLeft(ev) : handleKeydownRight(ev), ["prevent"]), ["left"]))
          ],
          onClick: _cache[2] || (_cache[2] = withModifiers((ev) => {
            handleSelectCustomEvent(ev);
            handleToggleCustomEvent(ev);
          }, ["stop"]))
        }), {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
            isExpanded: isExpanded.value,
            isSelected: isSelected.value,
            isIndeterminate: isIndeterminate.value,
            isDisabled: isDisabled.value,
            handleSelect: () => unref(rootContext).onSelect(_ctx.value),
            handleToggle: () => unref(rootContext).onToggle(_ctx.value)
          })]),
          _: 3
        }, 16, [
          "as",
          "as-child",
          "aria-selected",
          "aria-expanded",
          "aria-level",
          "aria-disabled",
          "data-indent",
          "data-selected",
          "data-expanded",
          "data-disabled",
          "onKeydown"
        ])]),
        _: 3
      }, 8, ["value", "focusable"]);
    };
  }
});
var TreeItem_default = TreeItem_vue_vue_type_script_setup_true_lang_default;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "STree",
  props: {
    items: {},
    getKey: {},
    getChildren: { type: Function, default: ((node) => node.children) },
    expanded: { default: void 0 },
    modelValue: { default: void 0 },
    indent: { default: 16 },
    itemHeight: { default: 40 }
  },
  emits: ["update:expanded", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const getFlatKey = (item) => item._id;
    return (_ctx, _cache) => {
      const _component_SVirtualList = _sfc_main$2;
      return openBlock(), createBlock(unref(TreeRoot_default), {
        as: "div",
        items: __props.items,
        "get-key": __props.getKey,
        "get-children": __props.getChildren,
        expanded: __props.expanded,
        "model-value": __props.modelValue,
        "selection-behavior": "replace",
        class: "size-full select-none py-2",
        "onUpdate:expanded": _cache[0] || (_cache[0] = ($event) => emit("update:expanded", $event)),
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => emit("update:modelValue", $event ?? null))
      }, {
        default: withCtx(({ flattenItems }) => [
          createVNode(_component_SVirtualList, {
            items: flattenItems,
            "item-height": __props.itemHeight,
            "get-item-key": getFlatKey,
            "item-fixed": "",
            height: "100%"
          }, {
            default: withCtx(({ item }) => [
              createVNode(unref(TreeItem_default), mergeProps(item.bind, {
                class: "group flex items-center gap-2 h-9 my-0.5 mx-2 rounded-lg outline-none cursor-pointer transition-colors duration-150 hover:bg-on-surface/6 active:bg-on-surface/10 data-[selected]:bg-primary/12 data-[selected]:text-primary",
                style: { paddingLeft: (item.level - 1) * __props.indent + 8 + "px", paddingRight: "8px" }
              }), {
                default: withCtx(({ isExpanded, isSelected }) => [
                  renderSlot(_ctx.$slots, "node", {
                    node: item.value,
                    level: item.level,
                    isExpanded,
                    isSelected,
                    hasChildren: item.hasChildren
                  })
                ]),
                _: 2
              }, 1040, ["style"])
            ]),
            _: 3
          }, 8, ["items", "item-height", "get-item-key"])
        ]),
        _: 3
      }, 8, ["items", "get-key", "get-children", "expanded", "model-value"]);
    };
  }
});
const _hoisted_1 = { class: "flex flex-col h-full" };
const _hoisted_2 = { class: "shrink-0 px-5 pb-2" };
const _hoisted_3 = { class: "flex items-baseline gap-4 mt-2 mb-4" };
const _hoisted_4 = { class: "text-3xl font-bold text-on-surface text-balance" };
const _hoisted_5 = {
  key: 0,
  class: "flex items-center gap-3 text-sm text-on-surface-variant/50"
};
const _hoisted_6 = { class: "flex items-center gap-1" };
const _hoisted_7 = { class: "flex items-center gap-1" };
const _hoisted_8 = {
  key: 0,
  class: "flex-1 min-h-0 flex"
};
const _hoisted_9 = { class: "w-64 shrink-0 bg-surface-panel border border-solid border-primary/12 rounded-xl ml-3 mb-3 overflow-hidden" };
const _hoisted_10 = {
  key: 1,
  class: "size-4 shrink-0"
};
const _hoisted_11 = { class: "flex-1 min-w-0 truncate text-sm" };
const _hoisted_12 = { class: "shrink-0 text-xs text-on-surface-variant/50 tabular-nums" };
const _hoisted_13 = { class: "flex-1 min-w-0" };
const _hoisted_14 = { class: "mx-3 mb-2 flex items-center gap-2 pl-3 pr-6 py-3 bg-surface-panel border-2 border-solid border-primary/12 rounded-xl" };
const _hoisted_15 = { class: "flex-1 min-w-0" };
const _hoisted_16 = { class: "text-sm font-medium truncate" };
const _hoisted_17 = { class: "text-xs text-on-surface-variant/60 truncate" };
const _hoisted_18 = { class: "shrink-0 flex items-center gap-1 text-xs text-on-surface-variant/60" };
const _hoisted_19 = {
  key: 1,
  class: "h-full flex items-center justify-center"
};
const _hoisted_20 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_21 = { class: "text-sm" };
const _hoisted_22 = {
  key: 1,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_23 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_24 = { class: "text-sm mb-1" };
const _hoisted_25 = { class: "text-xs mb-4 opacity-70" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "Folders" },
  __name: "Folders",
  setup(__props) {
    const { t } = useI18n();
    const router = useRouter();
    const libraryStore = useLibraryStore();
    const playlistStore = usePlaylistStore();
    const { tracks, initialized, folderTree, folderCount } = storeToRefs(libraryStore);
    const trackCount = computed(() => tracks.value.filter((tr) => !!tr.path).length);
    const expanded = ref([]);
    const selectedFolder = shallowRef(null);
    const songListRef = shallowRef(null);
    const createOpen = ref(false);
    const moreMenuItems = computed(() => [
      {
        key: "createPlaylist",
        label: t("collection.create", { type: t("collection.playlist") }),
        icon: IconLucideListPlus
      },
      { key: "batchManage", label: t("songList.batch.manage"), icon: IconLucideListChecks }
    ]);
    const handleMore = (key) => {
      if (key === "createPlaylist") createOpen.value = true;
      else if (key === "batchManage") songListRef.value?.enterBatch();
    };
    let defaultsApplied = false;
    const findFolder = (nodes, path) => {
      for (const node of nodes) {
        if (node.path === path) return node;
        const hit = findFolder(node.children, path);
        if (hit) return hit;
      }
      return null;
    };
    watch(
      [folderTree, initialized],
      ([current, init]) => {
        if (current.length === 0) {
          selectedFolder.value = null;
          defaultsApplied = false;
          return;
        }
        if (!defaultsApplied && init) {
          expanded.value = current.map((root) => root.path);
          selectedFolder.value = current[0];
          defaultsApplied = true;
          return;
        }
        if (selectedFolder.value) {
          const same = findFolder(current, selectedFolder.value.path);
          if (!same) selectedFolder.value = current[0];
          else if (same !== selectedFolder.value) selectedFolder.value = same;
        } else if (init) {
          selectedFolder.value = current[0];
        }
      },
      { immediate: true }
    );
    const selectedTracks = computed(() => {
      const folder = selectedFolder.value;
      return folder ? toRaw(folder.tracks) : [];
    });
    const handlePlayAll = () => {
      if (selectedTracks.value.length === 0) return;
      playFrom(selectedTracks.value, 0);
    };
    const handleCreated = async (playlistId) => {
      const count = await playlistStore.addTracks(playlistId, selectedTracks.value);
      toast.success(t("collection.tracksAdded", { count }));
    };
    const getKey = (node) => node.path;
    const getChildren = (node) => node.children.length > 0 ? node.children : void 0;
    onMounted(async () => {
      if (!initialized.value) await libraryStore.load();
    });
    return (_ctx, _cache) => {
      const _component_STree = _sfc_main$1;
      const _component_SButton = _sfc_main$4;
      const _component_SDropdownMenu = _sfc_main$6;
      const _component_SDivider = _sfc_main$7;
      const _component_PlaylistCreateDialog = _sfc_main$5;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h1", _hoisted_4, toDisplayString(unref(t)("folder.label")), 1),
            unref(trackCount) > 0 ? (openBlock(), createElementBlock("div", _hoisted_5, [
              createBaseVNode("span", _hoisted_6, [
                createVNode(unref(IconLucideFolder), { class: "size-3.5" }),
                createTextVNode(" " + toDisplayString(unref(t)("folder.totalFolders", { count: unref(folderCount) })), 1)
              ]),
              createBaseVNode("span", _hoisted_7, [
                createVNode(unref(__unplugin_components_4), { class: "size-3.5" }),
                createTextVNode(" " + toDisplayString(unref(t)("common.totalSongs", { count: unref(trackCount) })), 1)
              ])
            ])) : createCommentVNode("", true)
          ])
        ]),
        unref(folderTree).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createVNode(_component_STree, {
              modelValue: unref(selectedFolder),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(selectedFolder) ? selectedFolder.value = $event : null),
              expanded: unref(expanded),
              "onUpdate:expanded": _cache[1] || (_cache[1] = ($event) => isRef(expanded) ? expanded.value = $event : null),
              items: unref(folderTree),
              "get-key": getKey,
              "get-children": getChildren,
              indent: 16
            }, {
              node: withCtx(({ node, isExpanded, hasChildren }) => [
                hasChildren ? (openBlock(), createBlock(unref(IconLucideChevronRight), {
                  key: 0,
                  class: normalizeClass(["size-4 shrink-0 text-on-surface-variant/70 transition-transform duration-200", isExpanded ? "rotate-90" : ""])
                }, null, 8, ["class"])) : (openBlock(), createElementBlock("span", _hoisted_10)),
                (openBlock(), createBlock(resolveDynamicComponent(isExpanded && hasChildren ? unref(IconLucideFolderOpen) : unref(IconLucideFolder)), { class: "size-4 shrink-0" })),
                createBaseVNode("span", _hoisted_11, toDisplayString(node.name), 1),
                createBaseVNode("span", _hoisted_12, toDisplayString(node.tracks.length), 1)
              ]),
              _: 1
            }, 8, ["modelValue", "expanded", "items"])
          ]),
          createBaseVNode("div", _hoisted_13, [
            unref(selectedFolder) && unref(selectedTracks).length > 0 ? (openBlock(), createBlock(_sfc_main$3, {
              key: 0,
              ref_key: "songListRef",
              ref: songListRef,
              items: unref(selectedTracks),
              "show-album": "",
              "show-duration": "",
              "enable-sort": ""
            }, {
              topInfo: withCtx(() => [
                createBaseVNode("div", _hoisted_14, [
                  createVNode(_component_SButton, {
                    type: "primary",
                    variant: "secondary",
                    size: "small",
                    round: "",
                    disabled: unref(selectedTracks).length === 0,
                    onClick: handlePlayAll
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(__unplugin_components_0))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" " + toDisplayString(unref(t)("common.playAll")), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(_component_SDropdownMenu, {
                    items: unref(moreMenuItems),
                    align: "start",
                    onSelect: handleMore
                  }, {
                    trigger: withCtx(() => [
                      createVNode(_component_SButton, {
                        variant: "secondary",
                        circle: "",
                        size: "small",
                        disabled: unref(selectedTracks).length === 0
                      }, {
                        icon: withCtx(() => [
                          createVNode(unref(IconLucideEllipsis))
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  }, 8, ["items"]),
                  createVNode(_component_SDivider, {
                    vertical: "",
                    class: "h-6 mx-1"
                  }),
                  createVNode(unref(IconLucideFolderOpen), { class: "size-4 text-primary shrink-0" }),
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("div", _hoisted_16, toDisplayString(unref(selectedFolder).name), 1),
                    createBaseVNode("div", _hoisted_17, toDisplayString(unref(selectedFolder).path), 1)
                  ]),
                  createBaseVNode("span", _hoisted_18, [
                    createVNode(unref(__unplugin_components_4), { class: "size-3.5" }),
                    createTextVNode(" " + toDisplayString(unref(t)("common.totalSongs", { count: unref(selectedTracks).length })), 1)
                  ])
                ])
              ]),
              _: 1
            }, 8, ["items"])) : (openBlock(), createElementBlock("div", _hoisted_19, [
              createBaseVNode("div", _hoisted_20, [
                createVNode(unref(__unplugin_components_4), { class: "size-10 mx-auto mb-2 opacity-30" }),
                createBaseVNode("div", _hoisted_21, toDisplayString(unref(t)("common.noData")), 1)
              ])
            ]))
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_22, [
          createBaseVNode("div", _hoisted_23, [
            createVNode(unref(IconLucideFolder), { class: "size-12 mx-auto mb-3 opacity-30" }),
            createBaseVNode("div", _hoisted_24, toDisplayString(unref(t)("library.noLocalData")), 1),
            createBaseVNode("div", _hoisted_25, toDisplayString(unref(t)("library.noLocalDataHint")), 1),
            createVNode(_component_SButton, {
              type: "primary",
              variant: "secondary",
              onClick: _cache[2] || (_cache[2] = ($event) => unref(router).push("/library"))
            }, {
              icon: withCtx(() => [
                createVNode(unref(__unplugin_components_4))
              ]),
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(unref(t)("library.goLibrary")), 1)
              ]),
              _: 1
            })
          ])
        ])),
        createVNode(_component_PlaylistCreateDialog, {
          open: unref(createOpen),
          "onUpdate:open": _cache[3] || (_cache[3] = ($event) => isRef(createOpen) ? createOpen.value = $event : null),
          mode: "local",
          "initial-name": unref(selectedFolder)?.name,
          onCreated: handleCreated
        }, null, 8, ["open", "initial-name"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
