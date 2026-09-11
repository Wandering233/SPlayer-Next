import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { _ as _sfc_main$2, d as __unplugin_components_2 } from "./more-horizontal-BtOolk7_.js";
import { _ as _sfc_main$1 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { u as useI18n, aC as useStreamingStore, s as storeToRefs, at as playFrom } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$3 } from "./SongList.vue_vue_type_script_setup_true_lang-Doyounvo.js";
import { x as defineComponent, w as watch, k as onMounted, y as createElementBlock, z as createBaseVNode, D as createVNode, Q as withCtx, v as unref, i as isRef, O as toDisplayString, r as ref, W as createTextVNode, d as inject, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import "./PopperContent-CPX94GL7.js";
import "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import "./check-BXlOuXWK.js";
import "./x-Cd6Sow4a.js";
import "./plus-BEApKDpl.js";
import "./copy-DhNjJWGd.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./SLoading-C4RltnK4.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import "./song-BGJnBQIx.js";
import "./format-DoPtjAAN.js";
import "./useDownload-DvR_TELr.js";
import "./SRadioGroup.vue_vue_type_script_setup_true_lang-CA7DTWUw.js";
import "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import "./folder-open-Cw_0c4cI.js";
import "./trash-2-BKyCA-Fb.js";
import "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import "./pause-u3QmqHX9.js";
import "./useFloatingPlayerBar-R2fVODYZ.js";
import "./arrow-up-down-Dw8Z8Wwk.js";
import "./favorite-outline-rounded-C5xed2i3.js";
const _hoisted_1 = { class: "flex flex-col h-full" };
const _hoisted_2 = { class: "shrink-0 px-5 py-2 flex items-center justify-between" };
const _hoisted_3 = {
  key: 0,
  class: "flex-1 min-h-0"
};
const _hoisted_4 = {
  key: 1,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_5 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_6 = { class: "text-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "StreamingSongs" },
  __name: "Songs",
  setup(__props) {
    const { t } = useI18n();
    const streaming = useStreamingStore();
    const { songs, loading, isConnected } = storeToRefs(streaming);
    const refreshKey = inject("streamingRefreshKey", { value: 0 });
    const searchQuery = ref("");
    const refresh = (force = false) => {
      if (!isConnected.value) return;
      streaming.refreshLibrary(force);
    };
    watch(refreshKey, () => refresh(true));
    watch(isConnected, (v) => v && refresh());
    onMounted(() => {
      if (isConnected.value && songs.value.length === 0) refresh();
    });
    const handlePlayAll = () => {
      if (songs.value.length === 0) return;
      playFrom(songs.value, 0);
    };
    return (_ctx, _cache) => {
      const _component_IconLucidePlay = __unplugin_components_0;
      const _component_SButton = _sfc_main$1;
      const _component_IconLucideSearch = __unplugin_components_2;
      const _component_SInput = _sfc_main$2;
      const _component_IconLucideMusic = __unplugin_components_4;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_component_SButton, {
            type: "primary",
            variant: "secondary",
            round: "",
            disabled: unref(songs).length === 0,
            onClick: handlePlayAll
          }, {
            icon: withCtx(() => [
              createVNode(_component_IconLucidePlay)
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("common.playAll")), 1)
            ]),
            _: 1
          }, 8, ["disabled"]),
          createVNode(_component_SInput, {
            modelValue: unref(searchQuery),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(searchQuery) ? searchQuery.value = $event : null),
            placeholder: unref(t)("common.search"),
            clearable: "",
            round: "",
            class: "w-40 focus-within:w-56",
            "data-search-input": ""
          }, {
            prefix: withCtx(() => [
              createVNode(_component_IconLucideSearch, { class: "size-4 text-on-surface-variant/40 shrink-0" })
            ]),
            _: 1
          }, 8, ["modelValue", "placeholder"])
        ]),
        unref(songs).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createVNode(_sfc_main$3, {
            items: unref(songs),
            "search-query": unref(searchQuery),
            source: "streaming"
          }, null, 8, ["items", "search-query"])
        ])) : (openBlock(), createElementBlock("div", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            createVNode(_component_IconLucideMusic, { class: "size-12 mx-auto mb-3 opacity-30" }),
            createBaseVNode("div", _hoisted_6, toDisplayString(unref(loading) ? unref(t)("common.loading") : unref(t)("streaming.empty.noResults")), 1)
          ])
        ]))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
