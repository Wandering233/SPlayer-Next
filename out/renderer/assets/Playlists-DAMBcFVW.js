import { _ as __unplugin_components_1 } from "./list-music-C3T2xD_I.js";
import { _ as _sfc_main$1 } from "./CoverList.vue_vue_type_script_setup_true_lang-ChKIaOwW.js";
import { u as useI18n, aC as useStreamingStore, s as storeToRefs, aR as playlistToCoverItem, aj as navigateToPlaylist } from "./index-DVKNk9gd.js";
import { x as defineComponent, w as watch, k as onMounted, y as createElementBlock, v as unref, P as createBlock, z as createBaseVNode, D as createVNode, O as toDisplayString, c as computed, d as inject, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import "./user-C_ofWqo5.js";
import "./play-jYzYuagg.js";
import "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import "./song-BGJnBQIx.js";
import "./SLoading-C4RltnK4.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useFloatingPlayerBar-R2fVODYZ.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
const _hoisted_1 = { class: "h-full" };
const _hoisted_2 = {
  key: 1,
  class: "h-full flex items-center justify-center"
};
const _hoisted_3 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_4 = { class: "text-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "StreamingPlaylists" },
  __name: "Playlists",
  setup(__props) {
    const { t } = useI18n();
    const streaming = useStreamingStore();
    const { playlists, loading, isConnected } = storeToRefs(streaming);
    const refreshKey = inject("streamingRefreshKey", { value: 0 });
    const refresh = (force = false) => {
      if (!isConnected.value) return;
      streaming.refreshLibrary(force);
    };
    watch(refreshKey, () => refresh(true));
    watch(isConnected, (v) => v && refresh());
    onMounted(() => {
      if (isConnected.value && playlists.value.length === 0) refresh();
    });
    const items = computed(
      () => playlists.value.map((p) => ({
        ...playlistToCoverItem(p),
        subtitle: p.trackCount ? t("common.totalSongs", { count: p.trackCount }) : ""
      }))
    );
    const handleClick = (item) => {
      navigateToPlaylist(item.id, { source: "streaming", name: item.title });
    };
    return (_ctx, _cache) => {
      const _component_CoverList = _sfc_main$1;
      const _component_IconLucideListMusic = __unplugin_components_1;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        unref(playlists).length > 0 ? (openBlock(), createBlock(_component_CoverList, {
          key: 0,
          items: unref(items),
          "padding-x": 20,
          "padding-top": 8,
          "padding-bottom": 20,
          onClick: handleClick
        }, null, 8, ["items"])) : (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createVNode(_component_IconLucideListMusic, { class: "size-12 mx-auto mb-3 opacity-30" }),
            createBaseVNode("div", _hoisted_4, toDisplayString(unref(loading) ? unref(t)("common.loading") : unref(t)("streaming.empty.noResults")), 1)
          ])
        ]))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
