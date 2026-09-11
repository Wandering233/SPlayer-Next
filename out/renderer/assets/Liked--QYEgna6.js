import { _ as __unplugin_components_5 } from "./SLoading-C4RltnK4.js";
import { I as IconMaterialSymbolsFavoriteOutlineRounded } from "./favorite-outline-rounded-C5xed2i3.js";
import { _ as _sfc_main$4 } from "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import { _ as _sfc_main$3, d as __unplugin_components_2 } from "./more-horizontal-BtOolk7_.js";
import { _ as _sfc_main$2 } from "./SDropdownMenu.vue_vue_type_script_setup_true_lang-DsKOP0yw.js";
import { I as IconLucideEllipsis } from "./ellipsis-D0hNWfJ2.js";
import { _ as _sfc_main$1 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { x as defineComponent, w as watch, k as onMounted, y as createElementBlock, z as createBaseVNode, O as toDisplayString, v as unref, D as createVNode, W as createTextVNode, B as createCommentVNode, Q as withCtx, i as isRef, U as Transition, c as computed, r as ref, q as shallowRef, C as openBlock, m as markRaw } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { u as useI18n, aA as useLibraryStore, aa as useUserStore, d as useStatusStore, at as playFrom } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$5 } from "./SongList.vue_vue_type_script_setup_true_lang-Doyounvo.js";
import { I as IconLucideListChecks } from "./list-checks-B0B5438d.js";
import { I as IconLucideRefreshCw } from "./refresh-cw-DNNyf8AZ.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./PopperContent-CPX94GL7.js";
import "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import "./check-BXlOuXWK.js";
import "./x-Cd6Sow4a.js";
import "./plus-BEApKDpl.js";
import "./copy-DhNjJWGd.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import "./song-BGJnBQIx.js";
import "./format-DoPtjAAN.js";
import "./useDownload-DvR_TELr.js";
import "./SRadioGroup.vue_vue_type_script_setup_true_lang-CA7DTWUw.js";
import "./folder-open-Cw_0c4cI.js";
import "./trash-2-BKyCA-Fb.js";
import "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import "./pause-u3QmqHX9.js";
import "./useFloatingPlayerBar-R2fVODYZ.js";
import "./arrow-up-down-Dw8Z8Wwk.js";
const _hoisted_1 = { class: "flex flex-col h-full" };
const _hoisted_2 = { class: "shrink-0 px-5 pb-2" };
const _hoisted_3 = { class: "flex items-center justify-between mt-2 mb-4" };
const _hoisted_4 = { class: "flex items-baseline gap-4" };
const _hoisted_5 = { class: "text-3xl font-bold text-on-surface text-balance" };
const _hoisted_6 = {
  key: 0,
  class: "text-sm text-on-surface-variant/50 flex items-center gap-1"
};
const _hoisted_7 = { class: "flex items-center justify-between gap-4" };
const _hoisted_8 = { class: "flex items-center gap-3" };
const _hoisted_9 = { class: "flex items-center gap-3" };
const _hoisted_10 = { class: "w-48" };
const _hoisted_11 = {
  key: "local-list",
  class: "flex-1 min-h-0"
};
const _hoisted_12 = {
  key: "local-empty",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_13 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_14 = { class: "text-sm" };
const _hoisted_15 = {
  key: "online-login",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_16 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_17 = { class: "text-sm" };
const _hoisted_18 = {
  key: "online-list",
  class: "flex-1 min-h-0"
};
const _hoisted_19 = {
  key: "online-loading",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_20 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_21 = { class: "text-sm" };
const _hoisted_22 = {
  key: "online-empty",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_23 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_24 = { class: "text-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "Liked" },
  __name: "Liked",
  setup(__props) {
    const { t } = useI18n();
    const library = useLibraryStore();
    const user = useUserStore();
    const status = useStatusStore();
    const tab = computed({
      get: () => status.likedPageTab,
      set: (v) => status.likedPageTab = v
    });
    const tabs = computed(() => [
      { key: "local", label: t("liked.tabs.local") },
      { key: "online", label: t("liked.tabs.online") }
    ]);
    const searchQuery = ref("");
    const localTracks = computed(() => {
      const byId = new Map(library.tracks.map((track) => [track.id, track]));
      const list = [];
      for (const id of library.likedOrderedIds) {
        const track = byId.get(id);
        if (track) list.push(track);
      }
      return list;
    });
    watch(
      () => [tab.value, user.isLoggedIn, user.likedPlaylistId],
      ([nextTab, loggedIn, plId]) => {
        if (nextTab !== "online" || !loggedIn || !plId) return;
        user.ensureLikedPlaylist();
      },
      { immediate: true }
    );
    const currentTracks = computed(
      () => tab.value === "local" ? localTracks.value : user.likedPlaylistTracks
    );
    const playbackContext = computed(() => {
      if (tab.value === "local") {
        return {
          originId: "liked",
          originType: "page",
          originName: t("liked.title")
        };
      }
      if (!user.likedPlaylistId) return void 0;
      return {
        provider: "netease",
        originId: user.likedPlaylistId,
        originType: "playlist",
        originName: t("liked.title")
      };
    });
    const handlePlayAll = () => {
      if (currentTracks.value.length === 0) return;
      playFrom(currentTracks.value, 0, playbackContext.value);
    };
    onMounted(() => {
      if (!library.initialized) library.load();
    });
    const songListRef = shallowRef(null);
    const moreMenuItems = computed(() => {
      const items = [];
      if (tab.value === "online") {
        items.push({
          key: "refresh",
          label: t("common.refreshCache"),
          icon: markRaw(IconLucideRefreshCw)
        });
      }
      items.push({
        key: "batch",
        label: t("songList.batch.manage"),
        icon: markRaw(IconLucideListChecks)
      });
      return items;
    });
    const handleMoreMenu = (key) => {
      if (key === "refresh") {
        user.ensureLikedPlaylist(true);
      } else if (key === "batch") {
        songListRef.value?.enterBatch();
      }
    };
    return (_ctx, _cache) => {
      const _component_IconLucideMusic = __unplugin_components_4;
      const _component_IconLucidePlay = __unplugin_components_0;
      const _component_SButton = _sfc_main$1;
      const _component_IconLucideEllipsis = IconLucideEllipsis;
      const _component_SDropdownMenu = _sfc_main$2;
      const _component_IconLucideSearch = __unplugin_components_2;
      const _component_SInput = _sfc_main$3;
      const _component_STabs = _sfc_main$4;
      const _component_IconMaterialSymbolsFavoriteOutlineRounded = IconMaterialSymbolsFavoriteOutlineRounded;
      const _component_SLoading = __unplugin_components_5;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("h1", _hoisted_5, toDisplayString(unref(t)("liked.title")), 1),
              unref(currentTracks).length > 0 ? (openBlock(), createElementBlock("span", _hoisted_6, [
                createVNode(_component_IconLucideMusic, { class: "size-3.5" }),
                createTextVNode(" " + toDisplayString(unref(t)("common.totalSongs", { count: unref(currentTracks).length })), 1)
              ])) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("div", _hoisted_7, [
            createBaseVNode("div", _hoisted_8, [
              createVNode(_component_SButton, {
                type: "primary",
                variant: "secondary",
                round: "",
                disabled: unref(currentTracks).length === 0,
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
              createVNode(_component_SDropdownMenu, {
                items: unref(moreMenuItems),
                align: "start",
                onSelect: handleMoreMenu
              }, {
                trigger: withCtx(() => [
                  createVNode(_component_SButton, {
                    variant: "secondary",
                    circle: ""
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_IconLucideEllipsis)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["items"])
            ]),
            createBaseVNode("div", _hoisted_9, [
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
              }, 8, ["modelValue", "placeholder"]),
              createBaseVNode("div", _hoisted_10, [
                createVNode(_component_STabs, {
                  modelValue: unref(tab),
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(tab) ? tab.value = $event : null),
                  tabs: unref(tabs),
                  type: "segment",
                  round: ""
                }, null, 8, ["modelValue", "tabs"])
              ])
            ])
          ])
        ]),
        createVNode(Transition, {
          name: "fade",
          mode: "out-in",
          duration: 150
        }, {
          default: withCtx(() => [
            unref(tab) === "local" && unref(localTracks).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_11, [
              createVNode(_sfc_main$5, {
                ref_key: "songListRef",
                ref: songListRef,
                items: unref(localTracks),
                "search-query": unref(searchQuery),
                "show-size": false,
                source: "local",
                "enable-sort": ""
              }, null, 8, ["items", "search-query"])
            ])) : unref(tab) === "local" ? (openBlock(), createElementBlock("div", _hoisted_12, [
              createBaseVNode("div", _hoisted_13, [
                createVNode(_component_IconMaterialSymbolsFavoriteOutlineRounded, { class: "size-12 mx-auto mb-3 opacity-30" }),
                createBaseVNode("div", _hoisted_14, toDisplayString(unref(t)("liked.empty.local")), 1)
              ])
            ])) : unref(tab) === "online" && !unref(user).isLoggedIn ? (openBlock(), createElementBlock("div", _hoisted_15, [
              createBaseVNode("div", _hoisted_16, [
                createVNode(_component_IconMaterialSymbolsFavoriteOutlineRounded, { class: "size-12 mx-auto mb-3 opacity-30" }),
                createBaseVNode("div", _hoisted_17, toDisplayString(unref(t)("liked.needLogin")), 1)
              ])
            ])) : unref(tab) === "online" && unref(user).likedPlaylistTracks.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_18, [
              createVNode(_sfc_main$5, {
                ref_key: "songListRef",
                ref: songListRef,
                items: unref(user).likedPlaylistTracks,
                "search-query": unref(searchQuery),
                source: "netease",
                "collection-id": unref(user).likedPlaylistId ?? void 0,
                "playback-context": unref(playbackContext),
                "collection-type": "playlist",
                "enable-sort": ""
              }, null, 8, ["items", "search-query", "collection-id", "playback-context"])
            ])) : unref(tab) === "online" && unref(user).likedPlaylistLoading ? (openBlock(), createElementBlock("div", _hoisted_19, [
              createBaseVNode("div", _hoisted_20, [
                createVNode(_component_SLoading, { class: "text-4xl text-primary/70 mb-4 mx-auto block" }),
                createBaseVNode("div", _hoisted_21, toDisplayString(unref(t)("common.loading")), 1)
              ])
            ])) : (openBlock(), createElementBlock("div", _hoisted_22, [
              createBaseVNode("div", _hoisted_23, [
                createVNode(_component_IconMaterialSymbolsFavoriteOutlineRounded, { class: "size-12 mx-auto mb-3 opacity-30" }),
                createBaseVNode("div", _hoisted_24, toDisplayString(unref(t)("liked.empty.online")), 1)
              ])
            ]))
          ]),
          _: 1
        })
      ]);
    };
  }
});
export {
  _sfc_main as default
};
