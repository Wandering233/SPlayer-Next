import { d as __unplugin_components_6, _ as _sfc_main$3, s as searchPlaylists, e as searchArtists, f as searchAlbums, g as searchSongs } from "./SongList.vue_vue_type_script_setup_true_lang-Doyounvo.js";
import { _ as __unplugin_components_5 } from "./SLoading-C4RltnK4.js";
import { _ as _sfc_main$2 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode, x as defineComponent, w as watch, O as toDisplayString, v as unref, B as createCommentVNode, D as createVNode, Q as withCtx, P as createBlock, r as ref, c as computed, f as reactive, W as createTextVNode } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { _ as __unplugin_components_2$1 } from "./triangle-alert-BPUBCHTb.js";
import { d as __unplugin_components_2 } from "./more-horizontal-BtOolk7_.js";
import { _ as _sfc_main$1 } from "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import { u as useI18n, d as useStatusStore, ak as navigateToAlbum, a9 as navigateToArtist, aj as navigateToPlaylist, a$ as ALL_PLATFORMS, b0 as PLATFORM_SHORT_NAME, al as useRoute, c as useRouter } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$4 } from "./CoverList.vue_vue_type_script_setup_true_lang-ChKIaOwW.js";
import "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import "./PopperContent-CPX94GL7.js";
import "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import "./check-BXlOuXWK.js";
import "./x-Cd6Sow4a.js";
import "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import "./song-BGJnBQIx.js";
import "./format-DoPtjAAN.js";
import "./useDownload-DvR_TELr.js";
import "./SRadioGroup.vue_vue_type_script_setup_true_lang-CA7DTWUw.js";
import "./plus-BEApKDpl.js";
import "./play-jYzYuagg.js";
import "./folder-open-Cw_0c4cI.js";
import "./copy-DhNjJWGd.js";
import "./trash-2-BKyCA-Fb.js";
import "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import "./pause-u3QmqHX9.js";
import "./music-zyEhNUlm.js";
import "./useFloatingPlayerBar-R2fVODYZ.js";
import "./arrow-up-down-Dw8Z8Wwk.js";
import "./favorite-outline-rounded-C5xed2i3.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./user-C_ofWqo5.js";
const _hoisted_1$1 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }),
      createBaseVNode("path", { d: "M21 3v5h-5" })
    ], -1)
  ])]);
}
const __unplugin_components_3 = markRaw({ name: "lucide-rotate-cw", render });
const _hoisted_1 = { class: "flex flex-col h-full" };
const _hoisted_2 = { class: "shrink-0 px-5 pb-2" };
const _hoisted_3 = { class: "mt-2 mb-4 flex items-end justify-between gap-4" };
const _hoisted_4 = { class: "min-w-0 flex items-baseline pr-3" };
const _hoisted_5 = { class: "min-w-0 truncate text-3xl font-bold text-on-surface" };
const _hoisted_6 = {
  key: 0,
  class: "ml-2 shrink-0 whitespace-nowrap font-medium text-lg text-on-surface-variant/60"
};
const _hoisted_7 = { class: "shrink-0 w-40" };
const _hoisted_8 = {
  key: 0,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_9 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_10 = { class: "text-sm" };
const _hoisted_11 = {
  key: 1,
  class: "flex-1 flex items-center justify-center px-6"
};
const _hoisted_12 = { class: "text-center flex flex-col items-center" };
const _hoisted_13 = { class: "text-red-500/85 mb-4" };
const _hoisted_14 = { class: "text-sm font-medium mb-1" };
const _hoisted_15 = { class: "text-xs opacity-80 break-all max-w-xs" };
const _hoisted_16 = {
  key: 2,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_17 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_18 = { class: "text-sm" };
const _hoisted_19 = {
  key: 3,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_20 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_21 = { class: "text-sm mb-1" };
const _hoisted_22 = { class: "text-xs opacity-70" };
const _hoisted_23 = {
  key: 4,
  class: "flex-1 min-h-0"
};
const PAGE_SIZE = 50;
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "SearchPage" },
  __name: "Search",
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const status = useStatusStore();
    const TAB_KEYS = ["songs", "albums", "artists", "playlists"];
    const activeTab = ref("songs");
    const keyword = ref("");
    const tabs = computed(() => [
      { key: "songs", label: t("search.tabs.songs") },
      { key: "albums", label: t("search.tabs.albums") },
      { key: "artists", label: t("search.tabs.artists") },
      { key: "playlists", label: t("search.tabs.playlists") }
    ]);
    const platformTabs = ALL_PLATFORMS.map((key) => ({ key, label: PLATFORM_SHORT_NAME[key] }));
    const createState = () => ({
      items: [],
      total: 0,
      hasMore: false,
      loaded: false,
      loading: false,
      loadingMore: false
    });
    const states = reactive({
      songs: createState(),
      albums: createState(),
      artists: createState(),
      playlists: createState()
    });
    const error = ref("");
    const fetchers = {
      songs: searchSongs,
      albums: searchAlbums,
      artists: searchArtists,
      playlists: searchPlaylists
    };
    const fetchTab = async (tab, append) => {
      if (!keyword.value) return;
      const state = states[tab];
      if (append) {
        if (!state.loaded || state.loadingMore || !state.hasMore) return;
        state.loadingMore = true;
      } else {
        if (state.loading) return;
        state.loading = true;
      }
      error.value = "";
      try {
        const offset = append ? state.items.length : 0;
        const result = await fetchers[tab](
          status.searchPlatform,
          keyword.value,
          offset,
          PAGE_SIZE
        );
        const items = result.items.map((item) => markRaw(item));
        if (append) {
          state.items.push(...items);
        } else {
          state.items = items;
        }
        state.total = result.total;
        state.hasMore = result.hasMore;
        state.loaded = true;
      } catch (err) {
        error.value = err instanceof Error ? err.message : String(err);
      } finally {
        state.loading = false;
        state.loadingMore = false;
      }
    };
    const resetStates = () => {
      Object.keys(states).forEach((tab) => {
        states[tab].items = [];
        states[tab].total = 0;
        states[tab].hasMore = false;
        states[tab].loaded = false;
        states[tab].loading = false;
        states[tab].loadingMore = false;
      });
      error.value = "";
    };
    let lastLoadedKeyword = "";
    let lastLoadedPlatform = status.searchPlatform;
    const syncFromRoute = () => {
      if (route.name !== "search") return;
      const q = typeof route.query.q === "string" ? route.query.q.trim() : "";
      const tab = typeof route.query.tab === "string" && TAB_KEYS.includes(route.query.tab) ? route.query.tab : "songs";
      activeTab.value = tab;
      keyword.value = q;
      const keywordChanged = q !== lastLoadedKeyword;
      const platformChanged = status.searchPlatform !== lastLoadedPlatform;
      if (keywordChanged || platformChanged) {
        lastLoadedKeyword = q;
        lastLoadedPlatform = status.searchPlatform;
        resetStates();
        if (q) fetchTab(tab, false);
      } else if (q && !states[tab].loaded) {
        fetchTab(tab, false);
      }
    };
    watch(() => [route.name, route.query.q, route.query.tab, status.searchPlatform], syncFromRoute, {
      immediate: true
    });
    const onTabSwitch = (key) => {
      router.replace({ query: { ...route.query, tab: key } });
    };
    const onPlatformSwitch = (key) => {
      status.searchPlatform = key;
    };
    const onRetry = () => {
      error.value = "";
      fetchTab(activeTab.value, false);
    };
    const onReachBottom = (tab) => {
      fetchTab(tab, true);
    };
    const isInitialLoading = computed(() => {
      const state = states[activeTab.value];
      return state.loading && !state.loaded;
    });
    const isEmptyResult = computed(() => {
      const state = states[activeTab.value];
      return state.loaded && state.items.length === 0;
    });
    return (_ctx, _cache) => {
      const _component_STabs = _sfc_main$1;
      const _component_IconLucideSearch = __unplugin_components_2;
      const _component_IconLucideTriangleAlert = __unplugin_components_2$1;
      const _component_IconLucideRotateCw = __unplugin_components_3;
      const _component_SButton = _sfc_main$2;
      const _component_SLoading = __unplugin_components_5;
      const _component_IconLucideSearchX = __unplugin_components_6;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h1", _hoisted_4, [
              createBaseVNode("span", _hoisted_5, toDisplayString(unref(keyword) || unref(t)("search.title")), 1),
              unref(keyword) ? (openBlock(), createElementBlock("span", _hoisted_6, toDisplayString(unref(t)("search.titleSuffix")), 1)) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_7, [
              createVNode(_component_STabs, {
                "model-value": unref(status).searchPlatform,
                tabs: unref(platformTabs),
                type: "segment",
                round: "",
                "onUpdate:modelValue": onPlatformSwitch
              }, null, 8, ["model-value", "tabs"])
            ])
          ]),
          createVNode(_component_STabs, {
            "model-value": unref(activeTab),
            tabs: unref(tabs),
            "onUpdate:modelValue": onTabSwitch
          }, null, 8, ["model-value", "tabs"])
        ]),
        !unref(keyword) ? (openBlock(), createElementBlock("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createVNode(_component_IconLucideSearch, { class: "size-14 mx-auto mb-4 opacity-30" }),
            createBaseVNode("div", _hoisted_10, toDisplayString(unref(t)("search.emptyKeyword")), 1)
          ])
        ])) : unref(error) ? (openBlock(), createElementBlock("div", _hoisted_11, [
          createBaseVNode("div", _hoisted_12, [
            createBaseVNode("div", _hoisted_13, [
              createVNode(_component_IconLucideTriangleAlert, { class: "size-14 mx-auto mb-3 opacity-50" }),
              createBaseVNode("div", _hoisted_14, toDisplayString(unref(t)("search.errorTitle")), 1),
              createBaseVNode("div", _hoisted_15, toDisplayString(unref(error)), 1)
            ]),
            createVNode(_component_SButton, {
              variant: "secondary",
              size: "small",
              loading: unref(states)[unref(activeTab)].loading,
              onClick: onRetry
            }, {
              icon: withCtx(() => [
                createVNode(_component_IconLucideRotateCw, { class: "size-3.5" })
              ]),
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(unref(t)("common.retry")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])) : unref(isInitialLoading) ? (openBlock(), createElementBlock("div", _hoisted_16, [
          createBaseVNode("div", _hoisted_17, [
            createVNode(_component_SLoading, { class: "text-4xl text-primary/70 mb-4 mx-auto block" }),
            createBaseVNode("div", _hoisted_18, toDisplayString(unref(t)("common.loading")), 1)
          ])
        ])) : unref(isEmptyResult) ? (openBlock(), createElementBlock("div", _hoisted_19, [
          createBaseVNode("div", _hoisted_20, [
            createVNode(_component_IconLucideSearchX, { class: "size-14 mx-auto mb-4 opacity-30" }),
            createBaseVNode("div", _hoisted_21, toDisplayString(unref(t)("search.noResults")), 1),
            createBaseVNode("div", _hoisted_22, toDisplayString(unref(t)("search.noResultsHint")), 1)
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_23, [
          unref(activeTab) === "songs" ? (openBlock(), createBlock(_sfc_main$3, {
            key: 0,
            items: unref(states).songs.items,
            source: unref(status).searchPlatform,
            "show-size": false,
            "has-more": unref(states).songs.hasMore,
            "loading-more": unref(states).songs.loadingMore,
            onReachBottom: _cache[0] || (_cache[0] = ($event) => onReachBottom("songs"))
          }, null, 8, ["items", "source", "has-more", "loading-more"])) : unref(activeTab) === "albums" ? (openBlock(), createBlock(_sfc_main$4, {
            key: 1,
            items: unref(states).albums.items,
            "padding-x": 20,
            "padding-top": 8,
            "padding-bottom": 20,
            "has-more": unref(states).albums.hasMore,
            "loading-more": unref(states).albums.loadingMore,
            onClick: _cache[1] || (_cache[1] = (item) => unref(navigateToAlbum)(item.title, { source: unref(status).searchPlatform, albumId: item.id })),
            onReachBottom: _cache[2] || (_cache[2] = ($event) => onReachBottom("albums"))
          }, null, 8, ["items", "has-more", "loading-more"])) : unref(activeTab) === "artists" ? (openBlock(), createBlock(_sfc_main$4, {
            key: 2,
            items: unref(states).artists.items,
            type: "artist",
            "min-size": 120,
            "padding-x": 20,
            "padding-top": 8,
            "padding-bottom": 20,
            "has-more": unref(states).artists.hasMore,
            "loading-more": unref(states).artists.loadingMore,
            onClick: _cache[3] || (_cache[3] = (item) => unref(navigateToArtist)(item.title, { source: unref(status).searchPlatform, artistId: item.id })),
            onReachBottom: _cache[4] || (_cache[4] = ($event) => onReachBottom("artists"))
          }, null, 8, ["items", "has-more", "loading-more"])) : (openBlock(), createBlock(_sfc_main$4, {
            key: 3,
            items: unref(states).playlists.items,
            "padding-x": 20,
            "padding-top": 8,
            "padding-bottom": 20,
            "has-more": unref(states).playlists.hasMore,
            "loading-more": unref(states).playlists.loadingMore,
            onClick: _cache[5] || (_cache[5] = (item) => unref(navigateToPlaylist)(item.id, { source: unref(status).searchPlatform, name: item.title })),
            onReachBottom: _cache[6] || (_cache[6] = ($event) => onReachBottom("playlists"))
          }, null, 8, ["items", "has-more", "loading-more"]))
        ]))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
