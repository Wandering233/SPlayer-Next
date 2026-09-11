import { x as defineComponent, y as createElementBlock, M as normalizeClass, v as unref, z as createBaseVNode, _ as renderSlot, W as createTextVNode, O as toDisplayString, B as createCommentVNode, d as inject, c as computed, C as openBlock, Z as useSlots, V as withModifiers, P as createBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { _ as __unplugin_components_7 } from "./check-BXlOuXWK.js";
import { _ as __unplugin_components_5 } from "./copy-DhNjJWGd.js";
const createGroupContextKey = (name) => Symbol(name);
const toggleArrayValue = (current, item, checked) => {
  const has = current.includes(item);
  if (checked && !has) return [...current, item];
  if (!checked && has) return current.filter((v) => v !== item);
  return [...current];
};
const checkboxGroupContextKey = createGroupContextKey("SCheckboxGroupContext");
const radioGroupContextKey = createGroupContextKey("SRadioGroupContext");
const _hoisted_1$1 = ["name", "aria-checked", "disabled"];
const _hoisted_2$1 = {
  key: 0,
  class: "text-sm text-on-surface"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SRadio",
  props: {
    checked: { type: Boolean, default: void 0 },
    modelValue: { type: [String, Number, Boolean, null], default: null },
    value: { type: [String, Number, Boolean], default: true },
    disabled: { type: Boolean, default: false },
    size: { default: void 0 },
    label: { default: "" }
  },
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const radioGroup = inject(radioGroupContextKey, null);
    const sizeClassMap = {
      small: "size-4",
      medium: "size-4.5",
      large: "size-5"
    };
    const dotSizeClassMap = {
      small: "size-1.5",
      medium: "size-2",
      large: "size-2.5"
    };
    const mergedSize = computed(() => props.size ?? radioGroup?.size.value ?? "medium");
    const hasLabel = computed(() => !!props.label || !!useSlots().default);
    const selected = computed(() => {
      if (radioGroup) return radioGroup.value.value === props.value;
      if (typeof props.checked === "boolean") return props.checked;
      return props.modelValue === props.value;
    });
    const mergedDisabled = computed(() => props.disabled || radioGroup?.disabled.value === true);
    const radioName = computed(() => radioGroup?.name.value);
    const handleSelect = () => {
      if (mergedDisabled.value || selected.value) return;
      const nextValue = props.value;
      if (radioGroup) {
        radioGroup.select(nextValue);
      } else {
        emit("update:modelValue", nextValue);
      }
      emit("change", nextValue);
    };
    const onKeydown = (event) => {
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      handleSelect();
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("label", {
        class: normalizeClass(["inline-flex items-center gap-2 select-none", unref(mergedDisabled) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"])
      }, [
        createBaseVNode("button", {
          type: "button",
          role: "radio",
          name: unref(radioName),
          "aria-checked": unref(selected) ? "true" : "false",
          disabled: unref(mergedDisabled),
          class: normalizeClass(["shrink-0 inline-flex items-center justify-center rounded-full border border-solid outline-none transition-[background-color,border-color,box-shadow] duration-200", [
            sizeClassMap[unref(mergedSize)],
            unref(selected) ? "border-primary bg-primary/10" : "border-on-surface/35 bg-transparent hover:border-on-surface/55"
          ]]),
          onClick: handleSelect,
          onKeydown
        }, [
          createBaseVNode("span", {
            class: normalizeClass(["rounded-full transition-[opacity,transform,background-color] duration-200", [
              dotSizeClassMap[unref(mergedSize)],
              unref(selected) ? "opacity-100 scale-100 bg-primary" : "opacity-0 scale-60 bg-primary"
            ]])
          }, null, 2)
        ], 42, _hoisted_1$1),
        unref(hasLabel) ? (openBlock(), createElementBlock("span", _hoisted_2$1, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.label), 1)
          ])
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const _hoisted_1 = ["tabindex", "aria-checked"];
const _hoisted_2 = {
  key: 0,
  class: "text-sm text-on-surface"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SCheckbox",
  props: {
    checked: { type: Boolean, default: void 0 },
    modelValue: { type: Boolean, default: false },
    value: { type: [String, Number, Boolean], default: void 0 },
    indeterminate: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    size: { default: void 0 },
    label: { default: "" }
  },
  emits: ["update:checked", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const checkboxGroup = inject(checkboxGroupContextKey, null);
    const sizeClassMap = {
      small: "size-4",
      medium: "size-4.5",
      large: "size-5"
    };
    const iconSizeClassMap = {
      small: "size-3",
      medium: "size-3.5",
      large: "size-4"
    };
    const mergedSize = computed(() => props.size ?? checkboxGroup?.size.value ?? "medium");
    const checked = computed(() => {
      if (checkboxGroup) {
        if (props.value === void 0) return false;
        return checkboxGroup.value.value.includes(props.value);
      }
      if (typeof props.checked === "boolean") return props.checked;
      return props.modelValue;
    });
    const mergedDisabled = computed(() => props.disabled || checkboxGroup?.disabled.value === true);
    const canToggle = computed(() => !mergedDisabled.value);
    const hasLabel = computed(() => !!props.label || !!useSlots().default);
    const handleToggle = () => {
      if (!canToggle.value) return;
      const next = !checked.value;
      if (checkboxGroup) {
        if (props.value === void 0) return;
        checkboxGroup.toggle(props.value, next);
      } else {
        emit("update:checked", next);
        emit("update:modelValue", next);
      }
    };
    const onKeydown = (event) => {
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      handleToggle();
    };
    return (_ctx, _cache) => {
      const _component_IconLucideMinus = __unplugin_components_5;
      const _component_IconLucideCheck = __unplugin_components_7;
      return openBlock(), createElementBlock("label", {
        class: normalizeClass(["inline-flex items-center gap-2 select-none", unref(mergedDisabled) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"]),
        onClick: withModifiers(handleToggle, ["prevent"])
      }, [
        createBaseVNode("span", {
          role: "checkbox",
          tabindex: unref(mergedDisabled) ? -1 : 0,
          "aria-checked": __props.indeterminate ? "mixed" : unref(checked) ? "true" : "false",
          class: normalizeClass(["shrink-0 inline-flex items-center justify-center border border-solid outline-none transition-[background-color,border-color,color,box-shadow] duration-200", [
            sizeClassMap[unref(mergedSize)],
            "rounded-[5px]",
            unref(checked) || __props.indeterminate ? "bg-primary border-primary text-on-primary" : "bg-transparent border-on-surface/35 text-transparent hover:border-on-surface/55"
          ]]),
          onKeydown
        }, [
          __props.indeterminate ? (openBlock(), createBlock(_component_IconLucideMinus, {
            key: 0,
            class: normalizeClass([iconSizeClassMap[unref(mergedSize)], "pointer-events-none"])
          }, null, 8, ["class"])) : unref(checked) ? (openBlock(), createBlock(_component_IconLucideCheck, {
            key: 1,
            class: normalizeClass([iconSizeClassMap[unref(mergedSize)], "pointer-events-none"])
          }, null, 8, ["class"])) : createCommentVNode("", true)
        ], 42, _hoisted_1),
        unref(hasLabel) ? (openBlock(), createElementBlock("span", _hoisted_2, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.label), 1)
          ])
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
export {
  _sfc_main as _,
  _sfc_main$1 as a,
  checkboxGroupContextKey as c,
  radioGroupContextKey as r,
  toggleArrayValue as t
};
