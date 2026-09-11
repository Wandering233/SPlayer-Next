import { x as defineComponent, w as watch, y as createElementBlock, D as createVNode, U as Transition, Q as withCtx, v as unref, B as createCommentVNode, z as createBaseVNode, r as ref, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { D as DEFAULT_COVER } from "./song-BGJnBQIx.js";
const _hoisted_1 = { class: "relative isolate overflow-hidden" };
const _hoisted_2 = ["src", "alt"];
const _hoisted_3 = ["src", "alt"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SImg",
  props: {
    src: {},
    fallback: { default: DEFAULT_COVER },
    alt: { default: "" }
  },
  emits: ["load"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isLoaded = ref(false);
    const onLoad = (e) => {
      const target = e.target;
      target.style.opacity = "1";
      isLoaded.value = true;
      emit("load", target);
    };
    watch(
      () => props.src,
      () => {
        isLoaded.value = false;
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(Transition, { name: "fade" }, {
          default: withCtx(() => [
            !unref(isLoaded) ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: __props.fallback,
              alt: __props.alt,
              class: "absolute w-full h-full object-cover z-0"
            }, null, 8, _hoisted_2)) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(Transition, {
          "enter-active-class": "transition-opacity duration-200",
          "leave-active-class": "transition-opacity duration-200",
          "enter-from-class": "opacity-0",
          "leave-to-class": "opacity-0"
        }, {
          default: withCtx(() => [
            __props.src ? (openBlock(), createElementBlock("div", {
              key: __props.src,
              class: "absolute inset-0 z-1"
            }, [
              createBaseVNode("img", {
                src: __props.src,
                alt: __props.alt,
                class: "w-full h-full object-cover opacity-0 transition-opacity duration-200",
                decoding: "async",
                loading: "lazy",
                onLoad,
                onError: _cache[0] || (_cache[0] = ($event) => isLoaded.value = false)
              }, null, 40, _hoisted_3)
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  _sfc_main as _
};
