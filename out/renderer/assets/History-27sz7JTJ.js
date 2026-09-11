import { _ as _sfc_main$4 } from "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import { _ as __unplugin_components_7 } from "./history-DIfM-7sN.js";
import { _ as _sfc_main$3, d as __unplugin_components_2 } from "./more-horizontal-BtOolk7_.js";
import { _ as _sfc_main$2 } from "./SDropdownMenu.vue_vue_type_script_setup_true_lang-DsKOP0yw.js";
import { I as IconLucideEllipsis } from "./ellipsis-D0hNWfJ2.js";
import { _ as _sfc_main$1 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { x as defineComponent, k as onMounted, y as createElementBlock, z as createBaseVNode, O as toDisplayString, v as unref, D as createVNode, W as createTextVNode, B as createCommentVNode, Q as withCtx, i as isRef, U as Transition, r as ref, c as computed, C as openBlock, m as markRaw } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { u as useI18n, ar as useHistoryStore, at as playFrom } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$5 } from "./SongList.vue_vue_type_script_setup_true_lang-Doyounvo.js";
import { I as IconLucideTrash2 } from "./trash-2-BKyCA-Fb.js";
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
import "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import "./song-BGJnBQIx.js";
import "./format-DoPtjAAN.js";
import "./useDownload-DvR_TELr.js";
import "./SRadioGroup.vue_vue_type_script_setup_true_lang-CA7DTWUw.js";
import "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import "./folder-open-Cw_0c4cI.js";
import "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import "./pause-u3QmqHX9.js";
import "./useFloatingPlayerBar-R2fVODYZ.js";
import "./arrow-up-down-Dw8Z8Wwk.js";
import "./favorite-outline-rounded-C5xed2i3.js";
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
const _hoisted_10 = {
  key: "list",
  class: "flex-1 min-h-0"
};
const _hoisted_11 = {
  key: "empty",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_12 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_13 = { class: "text-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "History" },
  __name: "History",
  setup(__props) {
    const { t } = useI18n();
    const history = useHistoryStore();
    const playbackContext = computed(() => ({
      originId: "history",
      originType: "page",
      originName: t("history.title")
    }));
    const searchQuery = ref("");
    const handlePlayAll = () => {
      if (history.tracks.length === 0) return;
      playFrom(history.tracks, 0, playbackContext.value);
    };
    const clearConfirmOpen = ref(false);
    const moreMenuItems = computed(() => [
      {
        key: "clear",
        label: t("history.clear"),
        icon: markRaw(IconLucideTrash2)
      }
    ]);
    const handleMoreMenu = (key) => {
      if (key === "clear") clearConfirmOpen.value = true;
    };
    const handleClear = () => {
      history.clear();
      clearConfirmOpen.value = false;
    };
    onMounted(() => {
      history.load();
    });
    return (_ctx, _cache) => {
      const _component_IconLucideMusic = __unplugin_components_4;
      const _component_IconLucidePlay = __unplugin_components_0;
      const _component_SButton = _sfc_main$1;
      const _component_IconLucideEllipsis = IconLucideEllipsis;
      const _component_SDropdownMenu = _sfc_main$2;
      const _component_IconLucideSearch = __unplugin_components_2;
      const _component_SInput = _sfc_main$3;
      const _component_IconLucideHistory = __unplugin_components_7;
      const _component_SDialog = _sfc_main$4;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("h1", _hoisted_5, toDisplayString(unref(t)("history.title")), 1),
              unref(history).tracks.length > 0 ? (openBlock(), createElementBlock("span", _hoisted_6, [
                createVNode(_component_IconLucideMusic, { class: "size-3.5" }),
                createTextVNode(" " + toDisplayString(unref(t)("common.totalSongs", { count: unref(history).tracks.length })), 1)
              ])) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("div", _hoisted_7, [
            createBaseVNode("div", _hoisted_8, [
              createVNode(_component_SButton, {
                type: "primary",
                variant: "secondary",
                round: "",
                disabled: unref(history).tracks.length === 0,
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
                    circle: "",
                    disabled: unref(history).tracks.length === 0
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_IconLucideEllipsis)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
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
              }, 8, ["modelValue", "placeholder"])
            ])
          ])
        ]),
        createVNode(Transition, {
          name: "fade",
          mode: "out-in",
          duration: 150
        }, {
          default: withCtx(() => [
            unref(history).tracks.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_10, [
              createVNode(_sfc_main$5, {
                items: unref(history).tracks,
                "search-query": unref(searchQuery),
                "playback-context": unref(playbackContext),
                "show-size": false,
                "enable-sort": ""
              }, null, 8, ["items", "search-query", "playback-context"])
            ])) : (openBlock(), createElementBlock("div", _hoisted_11, [
              createBaseVNode("div", _hoisted_12, [
                createVNode(_component_IconLucideHistory, { class: "size-12 mx-auto mb-3 opacity-30" }),
                createBaseVNode("div", _hoisted_13, toDisplayString(unref(t)("history.empty")), 1)
              ])
            ]))
          ]),
          _: 1
        }),
        createVNode(_component_SDialog, {
          open: unref(clearConfirmOpen),
          "onUpdate:open": _cache[1] || (_cache[1] = ($event) => isRef(clearConfirmOpen) ? clearConfirmOpen.value = $event : null),
          title: unref(t)("history.clearConfirmTitle")
        }, {
          footer: withCtx(({ close }) => [
            createVNode(_component_SButton, {
              variant: "secondary",
              onClick: close
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("common.cancel")), 1)
              ]),
              _: 1
            }, 8, ["onClick"]),
            createVNode(_component_SButton, {
              type: "error",
              variant: "secondary",
              onClick: handleClear
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("common.confirm")), 1)
              ]),
              _: 1
            })
          ]),
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("history.clearConfirmContent")) + " ", 1)
          ]),
          _: 1
        }, 8, ["open", "title"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
