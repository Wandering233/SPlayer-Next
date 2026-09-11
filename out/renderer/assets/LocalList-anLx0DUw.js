import { _ as _sfc_main$3 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as _sfc_main$1 } from "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import { u as useI18n, aA as useLibraryStore, s as storeToRefs, al as useRoute, c as useRouter, a9 as navigateToArtist, ak as navigateToAlbum } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$2 } from "./CoverList.vue_vue_type_script_setup_true_lang-ChKIaOwW.js";
import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode, x as defineComponent, k as onMounted, O as toDisplayString, v as unref, P as createBlock, R as resolveDynamicComponent, W as createTextVNode, B as createCommentVNode, D as createVNode, M as normalizeClass, i as isRef, Q as withCtx, r as ref, c as computed, q as shallowRef } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { _ as __unplugin_components_1 } from "./user-round-C5NtfhbJ.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { I as IconLucideDisc3 } from "./disc-3-B-fZRQOF.js";
import { I as IconLucideArrowUpDown } from "./arrow-up-down-Dw8Z8Wwk.js";
import "./SLoading-C4RltnK4.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./PopperContent-CPX94GL7.js";
import "./check-BXlOuXWK.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import "./user-C_ofWqo5.js";
import "./play-jYzYuagg.js";
import "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import "./song-BGJnBQIx.js";
import "./useFloatingPlayerBar-R2fVODYZ.js";
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
      createBaseVNode("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87" }),
      createBaseVNode("circle", {
        cx: "9",
        cy: "7",
        r: "4"
      })
    ], -1)
  ])]);
}
const IconLucideUsers = markRaw({ name: "lucide-users", render });
const _hoisted_1 = { class: "flex flex-col h-full" };
const _hoisted_2 = { class: "shrink-0 px-5 pb-2" };
const _hoisted_3 = { class: "flex items-center justify-between gap-4 mt-2 mb-4" };
const _hoisted_4 = { class: "flex items-baseline gap-4" };
const _hoisted_5 = { class: "text-3xl font-bold text-on-surface text-balance" };
const _hoisted_6 = {
  key: 0,
  class: "flex items-center gap-1 text-sm text-on-surface-variant/50"
};
const _hoisted_7 = {
  key: 0,
  class: "flex items-center gap-2 text-sm text-on-surface-variant/70"
};
const _hoisted_8 = { class: "shrink-0" };
const _hoisted_9 = { class: "flex-1 min-h-0" };
const _hoisted_10 = {
  key: 1,
  class: "h-full flex items-center justify-center"
};
const _hoisted_11 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_12 = { class: "text-sm mb-1" };
const _hoisted_13 = { class: "text-xs mb-4 opacity-70" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "LocalList" },
  __name: "LocalList",
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const libraryStore = useLibraryStore();
    const { artistAvatars } = storeToRefs(libraryStore);
    const mode = route.name === "album-list" ? "album" : "artist";
    const sortMode = ref("default");
    const sortOptions = computed(() => [
      { value: "default", label: t("songList.sort.default") },
      { value: "name", label: t("songList.sort.byName") },
      { value: "trackCount", label: t("songList.sort.byTrackCount") }
    ]);
    const source = shallowRef([]);
    const items = computed(() => {
      const list = mode === "artist" ? source.value.map((item) => ({
        id: encodeURIComponent(item.name),
        title: item.name,
        cover: artistAvatars.value[item.name.trim().toLowerCase()] ?? item.cover,
        subtitle: t("common.totalSongs", { count: item.trackCount }),
        trackCount: item.trackCount
      })) : source.value.map((item) => ({
        id: encodeURIComponent(item.name),
        title: item.name,
        cover: item.cover,
        subtitle: item.artist || t("song.unknownArtist"),
        trackCount: item.trackCount
      }));
      if (sortMode.value === "name") {
        list.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortMode.value === "trackCount") {
        list.sort((a, b) => b.trackCount - a.trackCount || a.title.localeCompare(b.title));
      }
      return list;
    });
    const config = computed(
      () => mode === "artist" ? {
        title: t("artist.label"),
        countIcon: IconLucideUsers,
        countLabel: t("artist.totalArtists", { count: items.value.length }),
        emptyIcon: __unplugin_components_1,
        coverType: "artist",
        minSize: 120,
        selectWidth: "w-32"
      } : {
        title: t("album.label"),
        countIcon: IconLucideDisc3,
        countLabel: t("common.totalAlbums", { count: items.value.length }),
        emptyIcon: IconLucideDisc3,
        coverType: "default",
        minSize: 140,
        selectWidth: "w-40"
      }
    );
    const handleClick = (item) => {
      if (mode === "artist") navigateToArtist(item.title);
      else navigateToAlbum(item.title);
    };
    onMounted(async () => {
      source.value = mode === "artist" ? await libraryStore.getArtistList() : await libraryStore.getAlbumList();
      if (mode === "artist") libraryStore.loadArtistAvatars();
    });
    return (_ctx, _cache) => {
      const _component_SSelect = _sfc_main$1;
      const _component_SButton = _sfc_main$3;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("h1", _hoisted_5, toDisplayString(unref(config).title), 1),
              unref(items).length > 0 ? (openBlock(), createElementBlock("span", _hoisted_6, [
                (openBlock(), createBlock(resolveDynamicComponent(unref(config).countIcon), { class: "size-3.5" })),
                createTextVNode(" " + toDisplayString(unref(config).countLabel), 1)
              ])) : createCommentVNode("", true)
            ]),
            unref(items).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_7, [
              createVNode(unref(IconLucideArrowUpDown), { class: "size-3.5 shrink-0" }),
              createBaseVNode("span", _hoisted_8, toDisplayString(unref(t)("songList.sort.mode")), 1),
              createBaseVNode("div", {
                class: normalizeClass([unref(config).selectWidth, "shrink-0"])
              }, [
                createVNode(_component_SSelect, {
                  modelValue: unref(sortMode),
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(sortMode) ? sortMode.value = $event : null),
                  options: unref(sortOptions)
                }, null, 8, ["modelValue", "options"])
              ], 2)
            ])) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_9, [
          unref(items).length > 0 ? (openBlock(), createBlock(_sfc_main$2, {
            key: 0,
            items: unref(items),
            type: unref(config).coverType,
            "min-size": unref(config).minSize,
            "padding-x": 20,
            "padding-bottom": 24,
            onClick: handleClick
          }, null, 8, ["items", "type", "min-size"])) : (openBlock(), createElementBlock("div", _hoisted_10, [
            createBaseVNode("div", _hoisted_11, [
              (openBlock(), createBlock(resolveDynamicComponent(unref(config).emptyIcon), { class: "size-12 mx-auto mb-3 opacity-30" })),
              createBaseVNode("div", _hoisted_12, toDisplayString(unref(t)("library.noLocalData")), 1),
              createBaseVNode("div", _hoisted_13, toDisplayString(unref(t)("library.noLocalDataHint")), 1),
              createVNode(_component_SButton, {
                type: "primary",
                variant: "secondary",
                onClick: _cache[1] || (_cache[1] = ($event) => unref(router).push("/library"))
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
          ]))
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
