import { _ as _sfc_main$1 } from "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import { x as defineComponent, y as createElementBlock, z as createBaseVNode, O as toDisplayString, v as unref, D as createVNode, Q as withCtx, U as Transition, P as createBlock, c as computed, R as resolveDynamicComponent, W as createTextVNode, B as createCommentVNode, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { u as useI18n, aa as useUserStore, al as useRoute, c as useRouter, aR as playlistToCoverItem, aS as albumsToCoverItems, aT as artistsToCoverItems } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$2 } from "./CoverList.vue_vue_type_script_setup_true_lang-ChKIaOwW.js";
import { _ as __unplugin_components_1 } from "./list-music-C3T2xD_I.js";
import { I as IconLucideDisc3 } from "./disc-3-B-fZRQOF.js";
import { I as IconLucideUser } from "./user-C_ofWqo5.js";
import { I as IconMaterialSymbolsFavoriteOutlineRounded } from "./favorite-outline-rounded-C5xed2i3.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import "./play-jYzYuagg.js";
import "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import "./song-BGJnBQIx.js";
import "./SLoading-C4RltnK4.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useFloatingPlayerBar-R2fVODYZ.js";
const _hoisted_1 = { class: "flex flex-col h-full" };
const _hoisted_2 = { class: "shrink-0 px-5 pb-2" };
const _hoisted_3 = { class: "flex items-baseline gap-4 mt-2 mb-4 min-w-0" };
const _hoisted_4 = { class: "text-3xl font-bold text-on-surface shrink-0 text-balance" };
const _hoisted_5 = {
  key: 0,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_6 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_7 = { class: "text-sm" };
const _hoisted_8 = {
  key: "empty",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_9 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_10 = { class: "text-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "Favorites" },
  __name: "Favorites",
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const user = useUserStore();
    const TAB_KEYS = ["playlist", "album", "artist"];
    const activeTab = computed(() => {
      const tab = route.query.tab;
      return typeof tab === "string" && TAB_KEYS.includes(tab) ? tab : "playlist";
    });
    const onTabSwitch = (key) => {
      router.replace({ query: { ...route.query, tab: key } });
    };
    const tabs = computed(() => [
      { key: "playlist", label: t("favorites.tabs.playlist") },
      { key: "album", label: t("favorites.tabs.album") },
      { key: "artist", label: t("favorites.tabs.artist") }
    ]);
    const playlistItems = computed(
      () => user.subscribedPlaylists.map((pl) => ({
        ...playlistToCoverItem(pl),
        subtitle: pl.trackCount ? t("common.totalSongs", { count: pl.trackCount }) : ""
      }))
    );
    const albumItems = computed(() => albumsToCoverItems(user.albums));
    const artistItems = computed(() => artistsToCoverItems(user.artists));
    const currentItems = computed(() => {
      if (activeTab.value === "playlist") return playlistItems.value;
      if (activeTab.value === "album") return albumItems.value;
      return artistItems.value;
    });
    const countMeta = computed(() => {
      switch (activeTab.value) {
        case "album":
          return {
            icon: IconLucideDisc3,
            text: t("common.totalAlbums", { count: albumItems.value.length })
          };
        case "artist":
          return {
            icon: IconLucideUser,
            text: t("common.totalArtists", { count: artistItems.value.length })
          };
        case "playlist":
        default:
          return {
            icon: __unplugin_components_1,
            text: t("common.totalPlaylists", { count: playlistItems.value.length })
          };
      }
    });
    const handleClick = (item) => {
      if (activeTab.value === "artist") {
        router.push(`/artist/netease/${encodeURIComponent(item.id)}`);
      } else {
        router.push(`/collection/netease/${activeTab.value}/${encodeURIComponent(item.id)}`);
      }
    };
    return (_ctx, _cache) => {
      const _component_STabs = _sfc_main$1;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h1", _hoisted_4, toDisplayString(unref(t)("favorites.title")), 1),
            createVNode(Transition, {
              name: "fade",
              mode: "out-in"
            }, {
              default: withCtx(() => [
                unref(user).isLoggedIn ? (openBlock(), createElementBlock("span", {
                  key: unref(activeTab),
                  class: "flex items-center gap-1.5 text-sm text-on-surface-variant/50 truncate"
                }, [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(countMeta).icon), { class: "size-3.5 shrink-0" })),
                  createTextVNode(" " + toDisplayString(unref(countMeta).text), 1)
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ]),
          createVNode(_component_STabs, {
            "model-value": unref(activeTab),
            tabs: unref(tabs),
            "onUpdate:modelValue": onTabSwitch
          }, null, 8, ["model-value", "tabs"])
        ]),
        !unref(user).isLoggedIn ? (openBlock(), createElementBlock("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            createVNode(unref(IconMaterialSymbolsFavoriteOutlineRounded), { class: "size-12 mx-auto mb-3 opacity-30" }),
            createBaseVNode("div", _hoisted_7, toDisplayString(unref(t)("favorites.notLogin")), 1)
          ])
        ])) : (openBlock(), createBlock(Transition, {
          key: 1,
          name: "fade",
          mode: "out-in",
          duration: 150
        }, {
          default: withCtx(() => [
            unref(currentItems).length > 0 ? (openBlock(), createElementBlock("div", {
              key: unref(activeTab),
              class: "flex-1 min-h-0"
            }, [
              createVNode(_sfc_main$2, {
                items: unref(currentItems),
                type: unref(activeTab) === "artist" ? "artist" : "default",
                "min-size": unref(activeTab) === "artist" ? 120 : 140,
                "padding-x": 20,
                "padding-top": 8,
                "padding-bottom": 20,
                onClick: handleClick
              }, null, 8, ["items", "type", "min-size"])
            ])) : (openBlock(), createElementBlock("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                createVNode(unref(IconMaterialSymbolsFavoriteOutlineRounded), { class: "size-12 mx-auto mb-3 opacity-30" }),
                createBaseVNode("div", _hoisted_10, toDisplayString(unref(t)("favorites.empty")), 1)
              ])
            ]))
          ]),
          _: 1
        }))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
