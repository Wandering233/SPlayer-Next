import { _ as _sfc_main$5 } from "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import { _ as _sfc_main$6 } from "./FolderManager.vue_vue_type_script_setup_true_lang-CFc9jpz_.js";
import { _ as __unplugin_components_10 } from "./folder-plus-BRY8gih1.js";
import { _ as _sfc_main$3, d as __unplugin_components_2 } from "./more-horizontal-BtOolk7_.js";
import { _ as _sfc_main$2 } from "./SDropdownMenu.vue_vue_type_script_setup_true_lang-DsKOP0yw.js";
import { I as IconLucideEllipsis } from "./ellipsis-D0hNWfJ2.js";
import { I as IconLucideRefreshCw } from "./refresh-cw-DNNyf8AZ.js";
import { _ as _sfc_main$1 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { I as IconLucideHardDrive } from "./hard-drive-nkZY3ydd.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { _ as __unplugin_components_5 } from "./SLoading-C4RltnK4.js";
import { x as defineComponent, k as onMounted, J as onUnmounted, y as createElementBlock, z as createBaseVNode, O as toDisplayString, v as unref, D as createVNode, Q as withCtx, U as Transition, i as isRef, c as computed, r as ref, q as shallowRef, W as createTextVNode, B as createCommentVNode, M as normalizeClass, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { u as useI18n, aA as useLibraryStore, s as storeToRefs, at as playFrom } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$4 } from "./SongList.vue_vue_type_script_setup_true_lang-Doyounvo.js";
import { f as formatFileSize } from "./format-DoPtjAAN.js";
import { a as IconLucideFolderOpen } from "./folder-open-Cw_0c4cI.js";
import { I as IconLucideListChecks } from "./list-checks-B0B5438d.js";
import "./PopperContent-CPX94GL7.js";
import "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import "./check-BXlOuXWK.js";
import "./x-Cd6Sow4a.js";
import "./folder-EonVPYpL.js";
import "./trash-2-BKyCA-Fb.js";
import "./plus-BEApKDpl.js";
import "./copy-DhNjJWGd.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import "./song-BGJnBQIx.js";
import "./useDownload-DvR_TELr.js";
import "./SRadioGroup.vue_vue_type_script_setup_true_lang-CA7DTWUw.js";
import "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
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
  key: "progress",
  class: "flex items-center gap-2 text-sm text-on-surface-variant/50"
};
const _hoisted_7 = { class: "tabular-nums" };
const _hoisted_8 = { class: "text-on-surface-variant/40" };
const _hoisted_9 = {
  key: "stats",
  class: "flex items-center gap-3 text-sm text-on-surface-variant/50"
};
const _hoisted_10 = { class: "flex items-center gap-1" };
const _hoisted_11 = {
  key: 0,
  class: "flex items-center gap-1"
};
const _hoisted_12 = { class: "flex items-center justify-between gap-4" };
const _hoisted_13 = { class: "flex items-center gap-3" };
const _hoisted_14 = {
  key: 0,
  class: "flex-1 min-h-0"
};
const _hoisted_15 = {
  key: 1,
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_16 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_17 = { class: "text-sm mb-1" };
const _hoisted_18 = { class: "text-xs mb-4 opacity-70" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "Library" },
  __name: "Library",
  setup(__props) {
    const { t } = useI18n();
    const libraryStore = useLibraryStore();
    const { tracks, scanDirs, scanning, scanProgress, initialized } = storeToRefs(libraryStore);
    const playbackContext = computed(() => ({
      originId: "library",
      originType: "page",
      originName: t("library.title")
    }));
    const searchQuery = ref("");
    const songListRef = shallowRef(null);
    const totalSize = computed(() => {
      const bytes = tracks.value.reduce((sum, track) => sum + (track.fileSize ?? 0), 0);
      return bytes > 0 ? formatFileSize(bytes) : "";
    });
    const handleFolderAdded = () => {
      libraryStore.startScan(false);
    };
    const handleQuickAddFolder = async () => {
      const res = await libraryStore.addScanDir();
      if (res.success) libraryStore.startScan(false);
    };
    const handlePlayAll = () => {
      if (tracks.value.length === 0) return;
      playFrom(tracks.value, 0, playbackContext.value);
    };
    const scanPercent = computed(() => {
      if (!scanProgress.value || scanProgress.value.total === 0) return 0;
      return Math.round(scanProgress.value.scanned / scanProgress.value.total * 100);
    });
    const folderDialogOpen = ref(false);
    const moreMenuItems = computed(() => [
      { key: "batchManage", label: t("songList.batch.manage"), icon: IconLucideListChecks },
      { key: "folders", label: t("library.folders"), icon: IconLucideFolderOpen, separator: true },
      {
        key: "scan",
        label: scanning.value ? t("library.scanning") : t("library.scanAll"),
        icon: IconLucideRefreshCw,
        disabled: scanning.value || scanDirs.value.length === 0
      }
    ]);
    const handleMoreMenu = (key) => {
      switch (key) {
        // 批量管理
        case "batchManage":
          songListRef.value?.enterBatch();
          break;
        // 目录管理
        case "folders":
          folderDialogOpen.value = true;
          break;
        // 全量扫描
        case "scan":
          libraryStore.startScan(false);
          break;
      }
    };
    onMounted(async () => {
      libraryStore.subscribeScanProgress();
      if (!initialized.value) {
        await libraryStore.load();
      }
      if (scanDirs.value.length > 0) {
        libraryStore.startScan(tracks.value.length > 0);
      }
    });
    onUnmounted(() => {
      libraryStore.unsubscribeScanProgress();
    });
    return (_ctx, _cache) => {
      const _component_SLoading = __unplugin_components_5;
      const _component_IconLucideMusic = __unplugin_components_4;
      const _component_IconLucideHardDrive = IconLucideHardDrive;
      const _component_IconLucidePlay = __unplugin_components_0;
      const _component_SButton = _sfc_main$1;
      const _component_IconLucideRefreshCw = IconLucideRefreshCw;
      const _component_IconLucideEllipsis = IconLucideEllipsis;
      const _component_SDropdownMenu = _sfc_main$2;
      const _component_IconLucideSearch = __unplugin_components_2;
      const _component_SInput = _sfc_main$3;
      const _component_IconLucideFolderPlus = __unplugin_components_10;
      const _component_FolderManager = _sfc_main$6;
      const _component_SDialog = _sfc_main$5;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("h1", _hoisted_5, toDisplayString(unref(t)("library.title")), 1),
              createVNode(Transition, {
                name: "fade",
                mode: "out-in"
              }, {
                default: withCtx(() => [
                  unref(scanning) && unref(scanProgress) ? (openBlock(), createElementBlock("div", _hoisted_6, [
                    createVNode(_component_SLoading, { class: "size-3.5 text-primary shrink-0" }),
                    createBaseVNode("span", _hoisted_7, toDisplayString(unref(t)("library.scanProgress", {
                      scanned: unref(scanProgress).scanned,
                      total: unref(scanProgress).total
                    })), 1),
                    createBaseVNode("span", _hoisted_8, toDisplayString(unref(scanPercent)) + "%", 1)
                  ])) : unref(tracks).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_9, [
                    createBaseVNode("span", _hoisted_10, [
                      createVNode(_component_IconLucideMusic, { class: "size-3.5" }),
                      createTextVNode(" " + toDisplayString(unref(t)("common.totalSongs", { count: unref(tracks).length })), 1)
                    ]),
                    unref(totalSize) ? (openBlock(), createElementBlock("span", _hoisted_11, [
                      createVNode(_component_IconLucideHardDrive, { class: "size-3.5" }),
                      createTextVNode(" " + toDisplayString(unref(totalSize)), 1)
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ])
          ]),
          createBaseVNode("div", _hoisted_12, [
            createBaseVNode("div", _hoisted_13, [
              createVNode(_component_SButton, {
                type: "primary",
                variant: "secondary",
                round: "",
                disabled: unref(tracks).length === 0,
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
              createVNode(_component_SButton, {
                variant: "secondary",
                circle: "",
                disabled: unref(scanning) || unref(scanDirs).length === 0,
                onClick: _cache[0] || (_cache[0] = ($event) => unref(libraryStore).startScan(true))
              }, {
                icon: withCtx(() => [
                  createVNode(_component_IconLucideRefreshCw, {
                    class: normalizeClass({ "animate-spin": unref(scanning) })
                  }, null, 8, ["class"])
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
            createVNode(_component_SInput, {
              modelValue: unref(searchQuery),
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(searchQuery) ? searchQuery.value = $event : null),
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
        ]),
        unref(tracks).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_14, [
          createVNode(_sfc_main$4, {
            ref_key: "songListRef",
            ref: songListRef,
            items: unref(tracks),
            "search-query": unref(searchQuery),
            "playback-context": unref(playbackContext),
            "enable-sort": "",
            "show-size": ""
          }, null, 8, ["items", "search-query", "playback-context"])
        ])) : (openBlock(), createElementBlock("div", _hoisted_15, [
          createBaseVNode("div", _hoisted_16, [
            createVNode(_component_IconLucideMusic, { class: "size-12 mx-auto mb-3 opacity-30" }),
            createBaseVNode("div", _hoisted_17, toDisplayString(unref(t)("library.empty")), 1),
            createBaseVNode("div", _hoisted_18, toDisplayString(unref(t)("library.emptyHint")), 1),
            createVNode(_component_SButton, {
              type: "primary",
              variant: "secondary",
              onClick: handleQuickAddFolder
            }, {
              icon: withCtx(() => [
                createVNode(_component_IconLucideFolderPlus)
              ]),
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(unref(t)("library.addFolder")), 1)
              ]),
              _: 1
            })
          ])
        ])),
        createVNode(_component_SDialog, {
          open: unref(folderDialogOpen),
          "onUpdate:open": _cache[2] || (_cache[2] = ($event) => isRef(folderDialogOpen) ? folderDialogOpen.value = $event : null),
          title: unref(t)("library.folders"),
          description: unref(t)("library.foldersDescription"),
          width: "480px"
        }, {
          default: withCtx(() => [
            createVNode(_component_FolderManager, { onAdded: handleFolderAdded })
          ]),
          _: 1
        }, 8, ["open", "title", "description"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
