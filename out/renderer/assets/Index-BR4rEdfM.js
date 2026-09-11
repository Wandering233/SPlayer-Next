import { _ as _sfc_main$4 } from "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import { _ as _sfc_main$3 } from "./SDropdownMenu.vue_vue_type_script_setup_true_lang-DsKOP0yw.js";
import { _ as _sfc_main$2 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as _sfc_main$1 } from "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import { x as defineComponent, y as createElementBlock, z as createBaseVNode, O as toDisplayString, v as unref, D as createVNode, Q as withCtx, U as Transition, B as createCommentVNode, W as createTextVNode, c as computed, r as ref, E as resolveComponent, P as createBlock, R as resolveDynamicComponent, M as normalizeClass, a5 as KeepAlive, C as openBlock, I as provide } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { u as useI18n, aC as useStreamingStore, s as storeToRefs, c as useRouter, al as useRoute } from "./index-DVKNk9gd.js";
import { d as IconLucideUnplug, e as IconLucidePlugZap, a as useSettingsDialog } from "./useSettingsDialog-DBbWO7nc.js";
import { I as IconLucideServer } from "./keyboard-BMoUbwn1.js";
import { I as IconLucideRefreshCw } from "./refresh-cw-DNNyf8AZ.js";
import { I as IconLucideMoreHorizontal } from "./more-horizontal-BtOolk7_.js";
import { I as IconLucideSettings } from "./settings-Bkp-h7-N.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { I as IconLucideDisc3 } from "./disc-3-B-fZRQOF.js";
import { I as IconLucideUser } from "./user-C_ofWqo5.js";
import { _ as __unplugin_components_1 } from "./list-music-C3T2xD_I.js";
import "./PopperContent-CPX94GL7.js";
import "./SLoading-C4RltnK4.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./check-BXlOuXWK.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import "./x-Cd6Sow4a.js";
import "./arrays-DjGQWcSj.js";
import "./STag.vue_vue_type_script_setup_true_lang-BMwlvLeL.js";
import "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import "./rotate-ccw-CupSY91p.js";
import "./SPopselect.vue_vue_type_script_setup_true_lang-CxFYtI62.js";
import "./plus-BEApKDpl.js";
import "./trash2-ekOokvvd.js";
import "./folder-EonVPYpL.js";
import "./favorite-outline-rounded-C5xed2i3.js";
import "./history-DIfM-7sN.js";
import "./folder-open-Cw_0c4cI.js";
import "./play-jYzYuagg.js";
import "./folder-plus-BRY8gih1.js";
import "./trash-2-BKyCA-Fb.js";
import "./copy-DhNjJWGd.js";
import "./radio-WITe2XXZ.js";
import "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import "./song-BGJnBQIx.js";
import "./pencil-BCdm-qeU.js";
import "./format-DoPtjAAN.js";
import "./user-round-C5NtfhbJ.js";
import "./file-text-DIJIO1O_.js";
import "./hard-drive-nkZY3ydd.js";
import "./SAlert.vue_vue_type_script_setup_true_lang-b7Iha3N_.js";
import "./data-BvtPKRYl.js";
const _hoisted_1 = { class: "flex flex-col h-full" };
const _hoisted_2 = { class: "shrink-0 px-5 pb-2" };
const _hoisted_3 = { class: "flex items-center justify-between mt-2 mb-4 gap-4" };
const _hoisted_4 = { class: "flex items-baseline gap-4 min-w-0" };
const _hoisted_5 = { class: "text-3xl font-bold text-on-surface shrink-0 text-balance" };
const _hoisted_6 = {
  key: 0,
  class: "flex items-center gap-2 shrink-0"
};
const _hoisted_7 = { class: "w-44" };
const _hoisted_8 = {
  key: 0,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_9 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_10 = { class: "text-sm mb-1" };
const _hoisted_11 = { class: "text-xs mb-4 opacity-70" };
const _hoisted_12 = {
  key: 1,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_13 = { class: "text-center text-on-surface-variant/60 max-w-md px-6" };
const _hoisted_14 = { class: "text-sm mb-1" };
const _hoisted_15 = {
  key: 0,
  class: "text-xs mb-4 px-3 py-2 rounded-md bg-red-500/10 text-red-500 break-all text-left"
};
const _hoisted_16 = {
  key: 0,
  class: "font-medium mb-0.5"
};
const _hoisted_17 = {
  key: 1,
  class: "text-xs mb-4 opacity-70"
};
const _hoisted_18 = {
  key: 2,
  class: "flex-1 min-h-0"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "StreamingIndex" },
  __name: "Index",
  setup(__props) {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const streaming = useStreamingStore();
    const {
      servers,
      activeServerId,
      activeServer,
      isConnected,
      connectionStatus,
      loading,
      songs,
      albums,
      artists,
      playlists
    } = storeToRefs(streaming);
    const settingsDialog = useSettingsDialog();
    streaming.init();
    const tabs = computed(() => [
      { key: "/streaming/songs", label: t("streaming.tabs.songs") },
      { key: "/streaming/albums", label: t("streaming.tabs.albums") },
      { key: "/streaming/artists", label: t("streaming.tabs.artists") },
      { key: "/streaming/playlists", label: t("streaming.tabs.playlists") }
    ]);
    const activeTab = computed(() => {
      for (const tab of tabs.value) {
        if (route.path.startsWith(tab.key)) return tab.key;
      }
      return "/streaming/songs";
    });
    const switchTab = (key) => {
      router.push(key);
    };
    const countMeta = computed(() => {
      switch (activeTab.value) {
        case "/streaming/albums":
          return {
            icon: IconLucideDisc3,
            text: t("common.totalAlbums", { count: albums.value.length })
          };
        case "/streaming/artists":
          return {
            icon: IconLucideUser,
            text: t("common.totalArtists", { count: artists.value.length })
          };
        case "/streaming/playlists":
          return {
            icon: __unplugin_components_1,
            text: t("common.totalPlaylists", { count: playlists.value.length })
          };
        case "/streaming/songs":
        default:
          return {
            icon: __unplugin_components_4,
            text: t("common.totalSongs", { count: songs.value.length })
          };
      }
    });
    const serverOptions = computed(
      () => servers.value.map((s) => ({ value: s.id, label: s.name }))
    );
    const handleServerSelect = async (value) => {
      const id = String(value);
      if (id !== activeServerId.value) await streaming.setActiveServer(id);
    };
    const goToSettings = () => {
      settingsDialog.show("mediaSource");
    };
    const reconnecting = ref(false);
    const handleReconnect = async () => {
      if (!activeServerId.value || reconnecting.value) return;
      reconnecting.value = true;
      try {
        await streaming.connectToServer(activeServerId.value);
      } finally {
        reconnecting.value = false;
      }
    };
    const refreshKey = ref(0);
    const handleRefresh = () => {
      refreshKey.value++;
    };
    provide("streamingRefreshKey", refreshKey);
    const moreMenuItems = computed(() => [
      {
        key: "settings",
        label: t("streaming.actions.settings"),
        icon: IconLucideSettings
      }
    ]);
    const handleMoreMenu = (key) => {
      if (key === "settings") goToSettings();
    };
    return (_ctx, _cache) => {
      const _component_SSelect = _sfc_main$1;
      const _component_SButton = _sfc_main$2;
      const _component_SDropdownMenu = _sfc_main$3;
      const _component_STabs = _sfc_main$4;
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("h1", _hoisted_5, toDisplayString(unref(t)("nav.streaming")), 1),
              createVNode(Transition, {
                name: "fade",
                mode: "out-in"
              }, {
                default: withCtx(() => [
                  unref(activeServer) ? (openBlock(), createElementBlock("span", {
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
            unref(activeServer) ? (openBlock(), createElementBlock("div", _hoisted_6, [
              createBaseVNode("div", _hoisted_7, [
                createVNode(_component_SSelect, {
                  "model-value": unref(activeServerId) ?? "",
                  options: unref(serverOptions),
                  round: "",
                  disabled: unref(loading) || unref(reconnecting) || unref(servers).length <= 1,
                  "onUpdate:modelValue": handleServerSelect
                }, null, 8, ["model-value", "options", "disabled"])
              ]),
              createVNode(_component_SButton, {
                variant: "secondary",
                circle: "",
                disabled: !unref(isConnected) || unref(loading),
                onClick: handleRefresh
              }, {
                icon: withCtx(() => [
                  createVNode(unref(IconLucideRefreshCw), {
                    class: normalizeClass({ "animate-spin": unref(loading) })
                  }, null, 8, ["class"])
                ]),
                _: 1
              }, 8, ["disabled"]),
              createVNode(_component_SDropdownMenu, {
                items: unref(moreMenuItems),
                align: "end",
                onSelect: handleMoreMenu
              }, {
                trigger: withCtx(() => [
                  createVNode(_component_SButton, {
                    variant: "secondary",
                    circle: ""
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconLucideMoreHorizontal))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["items"])
            ])) : createCommentVNode("", true)
          ]),
          createVNode(_component_STabs, {
            "model-value": unref(activeTab),
            tabs: unref(tabs),
            "onUpdate:modelValue": switchTab
          }, null, 8, ["model-value", "tabs"])
        ]),
        unref(servers).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createVNode(unref(IconLucideServer), { class: "size-12 mx-auto mb-3 opacity-30" }),
            createBaseVNode("div", _hoisted_10, toDisplayString(unref(t)("streaming.empty.noServer")), 1),
            createBaseVNode("div", _hoisted_11, toDisplayString(unref(t)("streaming.empty.addHint")), 1),
            createVNode(_component_SButton, {
              type: "primary",
              variant: "secondary",
              onClick: goToSettings
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("streaming.empty.goToSettings")), 1)
              ]),
              _: 1
            })
          ])
        ])) : !unref(isConnected) ? (openBlock(), createElementBlock("div", _hoisted_12, [
          createBaseVNode("div", _hoisted_13, [
            createVNode(unref(IconLucideUnplug), { class: "size-12 mx-auto mb-3 opacity-30" }),
            createBaseVNode("div", _hoisted_14, toDisplayString(unref(t)("streaming.empty.notConnected")), 1),
            unref(connectionStatus).error ? (openBlock(), createElementBlock("div", _hoisted_15, [
              unref(connectionStatus).errorCode ? (openBlock(), createElementBlock("div", _hoisted_16, toDisplayString(unref(t)(`streaming.errorCode.${unref(connectionStatus).errorCode}`)), 1)) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(unref(connectionStatus).error), 1)
            ])) : (openBlock(), createElementBlock("div", _hoisted_17, toDisplayString(unref(activeServer)?.name), 1)),
            createVNode(_component_SButton, {
              type: "primary",
              variant: "secondary",
              loading: unref(reconnecting),
              onClick: handleReconnect
            }, {
              icon: withCtx(() => [
                createVNode(unref(IconLucidePlugZap))
              ]),
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(unref(t)("streaming.server.connect")), 1)
              ]),
              _: 1
            }, 8, ["loading"])
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_18, [
          createVNode(_component_router_view, null, {
            default: withCtx(({ Component }) => [
              (openBlock(), createBlock(KeepAlive, {
                max: 4,
                include: ["StreamingSongs", "StreamingAlbums", "StreamingArtists", "StreamingPlaylists"]
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(Component)))
              ], 1024))
            ]),
            _: 1
          })
        ]))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
