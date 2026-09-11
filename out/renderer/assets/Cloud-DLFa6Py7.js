import { _ as _sfc_main$2 } from "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import { _ as __unplugin_components_11 } from "./x-Cd6Sow4a.js";
import { _ as __unplugin_components_10 } from "./rotate-ccw-CupSY91p.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { _ as __unplugin_components_2 } from "./triangle-alert-BPUBCHTb.js";
import { _ as __unplugin_components_7 } from "./check-BXlOuXWK.js";
import { _ as __unplugin_components_6 } from "./zap-C69vIldS.js";
import { _ as __unplugin_components_5 } from "./loader-circle-2H0CB0Qe.js";
import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode, r as ref, c as computed, x as defineComponent, P as createBlock, Q as withCtx, v as unref, D as createVNode, W as createTextVNode, O as toDisplayString, B as createCommentVNode, F as Fragment, N as renderList, A as normalizeStyle, w as watch, i as isRef, U as Transition, q as shallowRef } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { _ as __unplugin_components_3 } from "./trash2-ekOokvvd.js";
import { _ as _sfc_main$4 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as _sfc_main$3 } from "./SAlert.vue_vue_type_script_setup_true_lang-b7Iha3N_.js";
import { aQ as defineStore, aa as useUserStore, aP as i18n, u as useI18n, at as playFrom } from "./index-DVKNk9gd.js";
import { f as formatFileSize } from "./format-DoPtjAAN.js";
import { _ as __unplugin_components_5$1 } from "./SLoading-C4RltnK4.js";
import { h as __unplugin_components_7$1, _ as _sfc_main$6, d as __unplugin_components_2$1 } from "./more-horizontal-BtOolk7_.js";
import { _ as _sfc_main$5 } from "./SDropdownMenu.vue_vue_type_script_setup_true_lang-DsKOP0yw.js";
import { I as IconLucideEllipsis } from "./ellipsis-D0hNWfJ2.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { _ as _sfc_main$7 } from "./SongList.vue_vue_type_script_setup_true_lang-Doyounvo.js";
import { I as IconLucideRefreshCw } from "./refresh-cw-DNNyf8AZ.js";
import { I as IconLucideListChecks } from "./list-checks-B0B5438d.js";
import { I as IconLucideHardDrive } from "./hard-drive-nkZY3ydd.js";
import "./PopperContent-CPX94GL7.js";
import "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./plus-BEApKDpl.js";
import "./copy-DhNjJWGd.js";
import "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import "./song-BGJnBQIx.js";
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
const _hoisted_1$3 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("path", { d: "M12 13v8m-8-6.101A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" }),
      createBaseVNode("path", { d: "m8 17l4-4l4 4" })
    ], -1)
  ])]);
}
const IconLucideCloudUpload = markRaw({ name: "lucide-cloud-upload", render: render$1 });
const _hoisted_1$2 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" }),
      createBaseVNode("path", { d: "M14 2v4a2 2 0 0 0 2 2h4M3 15h6m-3-3v6" })
    ], -1)
  ])]);
}
const __unplugin_components_1 = markRaw({ name: "lucide-file-plus2", render });
const MAX_RETAINED = 200;
let progressBound = false;
let idSeq = 0;
const useCloudUploadStore = defineStore("cloudUpload", () => {
  const items = ref([]);
  const running = ref(false);
  const activeCount = computed(
    () => items.value.filter((item) => ["pending", "reading", "uploading"].includes(item.status)).length
  );
  const bindProgress = () => {
    if (progressBound) return;
    progressBound = true;
    window.api.cloud.onUploadProgress((progress) => {
      const item = items.value.find((it) => it.id === progress.uploadId);
      if (!item) return;
      if (progress.stage === "uploading") {
        item.status = "uploading";
        item.progress = progress.total > 0 ? Math.min(99, Math.round(progress.loaded / progress.total * 100)) : 0;
      } else if (progress.stage === "finishing") {
        item.progress = 99;
      }
    });
  };
  const evictOldFinished = () => {
    if (items.value.length <= MAX_RETAINED) return;
    let removable = items.value.length - MAX_RETAINED;
    const kept = [];
    for (const item of items.value) {
      if (removable > 0 && (item.status === "success" || item.status === "instant" || item.status === "error")) {
        removable--;
        continue;
      }
      kept.push(item);
    }
    items.value = kept;
  };
  const runQueue = async () => {
    if (running.value) return;
    running.value = true;
    let anySuccess = false;
    try {
      while (true) {
        const next = items.value.find((item) => item.status === "pending");
        if (!next) break;
        next.status = "reading";
        next.progress = 0;
        try {
          const res = await window.api.cloud.uploadSong(next.path, next.id);
          if (res.success) {
            next.status = res.instant ? "instant" : "success";
            next.progress = 100;
            next.songId = res.songId;
            anySuccess = true;
          } else {
            next.status = "error";
            next.error = res.errorCode != null ? i18n.global.t("cloud.upload.errorWithCode", { code: res.errorCode }) : i18n.global.t("cloud.upload.error");
          }
        } catch {
          next.status = "error";
          next.error = i18n.global.t("cloud.upload.error");
        }
      }
    } finally {
      running.value = false;
      evictOldFinished();
      if (anySuccess) void useUserStore().refreshCloud();
    }
  };
  const enqueue = (songs) => {
    bindProgress();
    const user = useUserStore();
    const remainingBytes = Math.max(0, user.cloudMaxSize - user.cloudSize);
    let queuedBytes = items.value.filter((item) => ["pending", "reading", "uploading"].includes(item.status)).reduce((sum, item) => sum + item.size, 0);
    for (const song of songs) {
      const overCapacity = user.cloudMaxSize > 0 && queuedBytes + song.size > remainingBytes;
      if (!overCapacity) queuedBytes += song.size;
      items.value.push({
        id: `up-${idSeq++}`,
        name: song.name,
        path: song.path,
        size: song.size,
        status: overCapacity ? "error" : "pending",
        progress: 0,
        error: overCapacity ? i18n.global.t("cloud.upload.capacityFull") : void 0
      });
    }
    void runQueue();
  };
  const pickAndEnqueue = async () => {
    const songs = await window.api.cloud.pickSongs();
    if (songs.length > 0) enqueue(songs);
  };
  const retry = (id) => {
    const item = items.value.find((it) => it.id === id);
    if (!item || item.status !== "error") return;
    item.status = "pending";
    item.error = void 0;
    item.progress = 0;
    void runQueue();
  };
  const remove = (id) => {
    items.value = items.value.filter((item) => item.id !== id);
  };
  const clearFinished = () => {
    items.value = items.value.filter(
      (item) => !["success", "instant", "error"].includes(item.status)
    );
  };
  return {
    items,
    activeCount,
    enqueue,
    pickAndEnqueue,
    retry,
    remove,
    clearFinished
  };
});
const _hoisted_1$1 = { class: "flex flex-col gap-3" };
const _hoisted_2$1 = { class: "flex items-center justify-between gap-2" };
const _hoisted_3$1 = {
  key: 0,
  class: "flex flex-col items-center gap-3 py-12 text-center text-sm text-on-surface-variant/50"
};
const _hoisted_4$1 = {
  key: 1,
  class: "-mx-1 flex max-h-[52vh] flex-col gap-2 overflow-y-auto px-1 py-0.5"
};
const _hoisted_5$1 = { class: "flex w-7 shrink-0 items-center justify-center text-on-surface-variant" };
const _hoisted_6$1 = { class: "min-w-0 flex-1" };
const _hoisted_7$1 = { class: "truncate text-sm font-medium text-on-surface" };
const _hoisted_8$1 = { class: "mt-1.5 flex items-center gap-2" };
const _hoisted_9$1 = {
  key: 0,
  class: "h-1.5 flex-1 overflow-hidden rounded-full bg-on-surface/10"
};
const _hoisted_10$1 = ["title"];
const _hoisted_11$1 = { class: "flex shrink-0 items-center gap-1" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CloudUploadDialog",
  props: {
    open: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    const store = useCloudUploadStore();
    return (_ctx, _cache) => {
      const _component_SAlert = _sfc_main$3;
      const _component_IconLucideFilePlus2 = __unplugin_components_1;
      const _component_SButton = _sfc_main$4;
      const _component_IconLucideTrash2 = __unplugin_components_3;
      const _component_IconLucideCloudUpload = IconLucideCloudUpload;
      const _component_IconLucideLoaderCircle = __unplugin_components_5;
      const _component_IconLucideZap = __unplugin_components_6;
      const _component_IconLucideCheck = __unplugin_components_7;
      const _component_IconLucideTriangleAlert = __unplugin_components_2;
      const _component_IconLucideMusic = __unplugin_components_4;
      const _component_IconLucideRotateCcw = __unplugin_components_10;
      const _component_IconLucideX = __unplugin_components_11;
      const _component_SDialog = _sfc_main$2;
      return openBlock(), createBlock(_component_SDialog, {
        open: __props.open,
        title: unref(t)("cloud.upload.title"),
        width: "440px",
        "onUpdate:open": _cache[2] || (_cache[2] = (value) => emit("update:open", value))
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createVNode(_component_SAlert, null, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("cloud.upload.riskTip")), 1)
              ]),
              _: 1
            }),
            createBaseVNode("div", _hoisted_2$1, [
              createVNode(_component_SButton, {
                type: "primary",
                variant: "secondary",
                round: "",
                onClick: _cache[0] || (_cache[0] = ($event) => unref(store).pickAndEnqueue())
              }, {
                icon: withCtx(() => [
                  createVNode(_component_IconLucideFilePlus2)
                ]),
                default: withCtx(() => [
                  createTextVNode(" " + toDisplayString(unref(t)("cloud.upload.selectFile")), 1)
                ]),
                _: 1
              }),
              unref(store).items.length > 0 ? (openBlock(), createBlock(_component_SButton, {
                key: 0,
                variant: "secondary",
                round: "",
                onClick: _cache[1] || (_cache[1] = ($event) => unref(store).clearFinished())
              }, {
                icon: withCtx(() => [
                  createVNode(_component_IconLucideTrash2)
                ]),
                default: withCtx(() => [
                  createTextVNode(" " + toDisplayString(unref(t)("cloud.upload.clearFinished")), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            unref(store).items.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
              createVNode(_component_IconLucideCloudUpload, { class: "size-9 opacity-30" }),
              createTextVNode(" " + toDisplayString(unref(t)("cloud.upload.emptyHint")), 1)
            ])) : (openBlock(), createElementBlock("div", _hoisted_4$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).items, (item) => {
                return openBlock(), createElementBlock("div", {
                  key: item.id,
                  class: "flex items-center gap-3 rounded-xl border-2 border-solid border-primary/12 bg-surface-panel px-3 py-2.5"
                }, [
                  createBaseVNode("div", _hoisted_5$1, [
                    item.status === "reading" || item.status === "uploading" ? (openBlock(), createBlock(_component_IconLucideLoaderCircle, {
                      key: 0,
                      class: "size-4 animate-spin"
                    })) : item.status === "instant" ? (openBlock(), createBlock(_component_IconLucideZap, {
                      key: 1,
                      class: "size-4 text-primary"
                    })) : item.status === "success" ? (openBlock(), createBlock(_component_IconLucideCheck, {
                      key: 2,
                      class: "size-4 text-primary"
                    })) : item.status === "error" ? (openBlock(), createBlock(_component_IconLucideTriangleAlert, {
                      key: 3,
                      class: "size-4 text-amber-500"
                    })) : (openBlock(), createBlock(_component_IconLucideMusic, {
                      key: 4,
                      class: "size-4 opacity-60"
                    }))
                  ]),
                  createBaseVNode("div", _hoisted_6$1, [
                    createBaseVNode("div", _hoisted_7$1, toDisplayString(item.name), 1),
                    createBaseVNode("div", _hoisted_8$1, [
                      item.status === "reading" || item.status === "uploading" ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
                        createBaseVNode("div", {
                          class: "h-full rounded-full bg-primary transition-[width] duration-200",
                          style: normalizeStyle({ width: `${item.progress}%` })
                        }, null, 4)
                      ])) : createCommentVNode("", true),
                      createBaseVNode("span", {
                        class: "shrink-0 truncate text-xs text-on-surface-variant/60",
                        title: item.status === "error" ? item.error : void 0
                      }, [
                        item.status === "error" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                          createTextVNode(toDisplayString(item.error), 1)
                        ], 64)) : item.status === "instant" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                          createTextVNode(toDisplayString(unref(t)("cloud.upload.instant")), 1)
                        ], 64)) : item.status === "success" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                          createTextVNode(toDisplayString(unref(t)("cloud.upload.done")), 1)
                        ], 64)) : item.status === "uploading" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                          createTextVNode(toDisplayString(item.progress) + "%", 1)
                        ], 64)) : item.status === "reading" ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
                          createTextVNode(toDisplayString(unref(t)("cloud.upload.reading")), 1)
                        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 5 }, [
                          createTextVNode(toDisplayString(unref(formatFileSize)(item.size)), 1)
                        ], 64))
                      ], 8, _hoisted_10$1)
                    ])
                  ]),
                  createBaseVNode("div", _hoisted_11$1, [
                    item.status === "error" ? (openBlock(), createBlock(_component_SButton, {
                      key: 0,
                      variant: "ghost",
                      circle: "",
                      size: "small",
                      title: unref(t)("cloud.upload.retry"),
                      onClick: ($event) => unref(store).retry(item.id)
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_IconLucideRotateCcw)
                      ]),
                      _: 1
                    }, 8, ["title", "onClick"])) : createCommentVNode("", true),
                    ["success", "instant", "error"].includes(item.status) ? (openBlock(), createBlock(_component_SButton, {
                      key: 1,
                      variant: "ghost",
                      circle: "",
                      size: "small",
                      title: unref(t)("cloud.upload.remove"),
                      onClick: ($event) => unref(store).remove(item.id)
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_IconLucideX)
                      ]),
                      _: 1
                    }, 8, ["title", "onClick"])) : createCommentVNode("", true)
                  ])
                ]);
              }), 128))
            ]))
          ])
        ]),
        _: 1
      }, 8, ["open", "title"]);
    };
  }
});
const _hoisted_1 = { class: "flex flex-col h-full" };
const _hoisted_2 = { class: "shrink-0 px-5 pb-2" };
const _hoisted_3 = { class: "flex items-center justify-between mt-2 mb-4" };
const _hoisted_4 = { class: "flex items-baseline gap-4 min-w-0" };
const _hoisted_5 = { class: "text-3xl font-bold text-on-surface shrink-0 text-balance" };
const _hoisted_6 = {
  key: 0,
  class: "flex items-center gap-4 text-sm text-on-surface-variant/50 truncate"
};
const _hoisted_7 = { class: "flex items-center gap-1" };
const _hoisted_8 = {
  key: 0,
  class: "flex items-center gap-2 min-w-0"
};
const _hoisted_9 = { class: "relative h-1.5 w-20 rounded-full bg-on-surface/10 overflow-hidden shrink-0" };
const _hoisted_10 = { class: "text-xs truncate" };
const _hoisted_11 = { class: "flex items-center justify-between gap-4" };
const _hoisted_12 = { class: "flex items-center gap-3" };
const _hoisted_13 = {
  key: "login",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_14 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_15 = { class: "text-sm" };
const _hoisted_16 = {
  key: "list",
  class: "flex-1 min-h-0"
};
const _hoisted_17 = {
  key: "loading",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_18 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_19 = { class: "text-sm" };
const _hoisted_20 = {
  key: "empty",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_21 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_22 = { class: "text-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "Cloud" },
  __name: "Cloud",
  setup(__props) {
    const { t } = useI18n();
    const user = useUserStore();
    const playbackContext = computed(() => ({
      originId: "cloud",
      originType: "page",
      originName: t("cloud.title")
    }));
    const uploadDialogOpen = ref(false);
    const searchQuery = ref("");
    const usagePercent = computed(() => {
      if (user.cloudMaxSize <= 0) return 0;
      return Math.min(100, Math.round(user.cloudSize / user.cloudMaxSize * 100));
    });
    const usageText = computed(() => {
      if (user.cloudMaxSize <= 0) return "";
      return `${formatFileSize(user.cloudSize)} / ${formatFileSize(user.cloudMaxSize)}`;
    });
    const trackCount = computed(() => user.cloudCount || user.cloudTracks.length);
    const handlePlayAll = () => {
      if (user.cloudTracks.length === 0) return;
      playFrom(user.cloudTracks, 0, playbackContext.value);
    };
    const songListRef = shallowRef(null);
    const moreMenuItems = computed(() => [
      { key: "refresh", label: t("common.refreshCache"), icon: markRaw(IconLucideRefreshCw) },
      { key: "batch", label: t("songList.batch.manage"), icon: markRaw(IconLucideListChecks) }
    ]);
    const handleMoreMenu = (key) => {
      if (key === "refresh") user.ensureCloud(true);
      else if (key === "batch") songListRef.value?.enterBatch();
    };
    watch(
      () => user.isLoggedIn,
      (loggedIn) => {
        if (loggedIn) user.ensureCloud();
      },
      { immediate: true }
    );
    return (_ctx, _cache) => {
      const _component_IconLucidePlay = __unplugin_components_0;
      const _component_SButton = _sfc_main$4;
      const _component_IconLucideEllipsis = IconLucideEllipsis;
      const _component_SDropdownMenu = _sfc_main$5;
      const _component_IconLucideSearch = __unplugin_components_2$1;
      const _component_SInput = _sfc_main$6;
      const _component_SLoading = __unplugin_components_5$1;
      const _component_CloudUploadDialog = _sfc_main$1;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("h1", _hoisted_5, toDisplayString(unref(t)("cloud.title")), 1),
              unref(user).isLoggedIn && unref(trackCount) > 0 ? (openBlock(), createElementBlock("div", _hoisted_6, [
                createBaseVNode("span", _hoisted_7, [
                  createVNode(unref(__unplugin_components_7$1), { class: "size-3.5" }),
                  createTextVNode(" " + toDisplayString(unref(t)("common.totalSongs", { count: unref(trackCount) })), 1)
                ]),
                unref(usageText) ? (openBlock(), createElementBlock("span", _hoisted_8, [
                  createVNode(unref(IconLucideHardDrive), { class: "size-3.5 shrink-0" }),
                  createBaseVNode("span", _hoisted_9, [
                    createBaseVNode("span", {
                      class: "absolute inset-y-0 left-0 bg-primary rounded-full transition-[width] duration-300",
                      style: normalizeStyle({ width: `${unref(usagePercent)}%` })
                    }, null, 4)
                  ]),
                  createBaseVNode("span", _hoisted_10, toDisplayString(unref(usageText)), 1)
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              createVNode(_component_SButton, {
                type: "primary",
                variant: "secondary",
                round: "",
                disabled: unref(user).cloudTracks.length === 0,
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
                round: "",
                disabled: !unref(user).isLoggedIn,
                onClick: _cache[0] || (_cache[0] = ($event) => uploadDialogOpen.value = true)
              }, {
                icon: withCtx(() => [
                  createVNode(unref(IconLucideCloudUpload))
                ]),
                default: withCtx(() => [
                  createTextVNode(" " + toDisplayString(unref(t)("cloud.upload.button")), 1)
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
                    disabled: !unref(user).isLoggedIn
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
        createVNode(Transition, {
          name: "fade",
          mode: "out-in",
          duration: 150
        }, {
          default: withCtx(() => [
            !unref(user).isLoggedIn ? (openBlock(), createElementBlock("div", _hoisted_13, [
              createBaseVNode("div", _hoisted_14, [
                createVNode(unref(__unplugin_components_7$1), { class: "size-12 mx-auto mb-3 opacity-30" }),
                createBaseVNode("div", _hoisted_15, toDisplayString(unref(t)("cloud.needLogin")), 1)
              ])
            ])) : unref(user).cloudTracks.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_16, [
              createVNode(_sfc_main$7, {
                ref_key: "songListRef",
                ref: songListRef,
                items: unref(user).cloudTracks,
                "search-query": unref(searchQuery),
                "playback-context": unref(playbackContext),
                source: "netease",
                "collection-type": "cloud",
                "enable-sort": ""
              }, null, 8, ["items", "search-query", "playback-context"])
            ])) : unref(user).cloudLoading ? (openBlock(), createElementBlock("div", _hoisted_17, [
              createBaseVNode("div", _hoisted_18, [
                createVNode(_component_SLoading, { class: "text-4xl text-primary/70 mb-4 mx-auto block" }),
                createBaseVNode("div", _hoisted_19, toDisplayString(unref(t)("common.loading")), 1)
              ])
            ])) : (openBlock(), createElementBlock("div", _hoisted_20, [
              createBaseVNode("div", _hoisted_21, [
                createVNode(unref(__unplugin_components_7$1), { class: "size-12 mx-auto mb-3 opacity-30" }),
                createBaseVNode("div", _hoisted_22, toDisplayString(unref(t)("cloud.empty")), 1)
              ])
            ]))
          ]),
          _: 1
        }),
        createVNode(_component_CloudUploadDialog, {
          open: unref(uploadDialogOpen),
          "onUpdate:open": _cache[2] || (_cache[2] = ($event) => isRef(uploadDialogOpen) ? uploadDialogOpen.value = $event : null)
        }, null, 8, ["open"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
