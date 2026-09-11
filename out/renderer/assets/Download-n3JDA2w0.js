import { _ as _sfc_main$4 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as _sfc_main$5 } from "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import { u as useDownloadStore } from "./download-BBnEWZEH.js";
import { u as useI18n, x as useMediaStore, d as useStatusStore, at as playFrom, I as getQualityLabel, aB as isLosslessQuality, a0 as togglePlay, f as dialog } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$2 } from "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import { _ as _sfc_main$3 } from "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import { x as defineComponent, P as createBlock, Q as withCtx, z as createBaseVNode, M as normalizeClass, V as withModifiers, y as createElementBlock, O as toDisplayString, v as unref, F as Fragment, D as createVNode, B as createCommentVNode, A as normalizeStyle, c as computed, C as openBlock, k as onMounted, W as createTextVNode, r as ref } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { u as useDownload, d as formatTime } from "./useDownload-DvR_TELr.js";
import { f as formatFileSize } from "./format-DoPtjAAN.js";
import { _ as __unplugin_components_5 } from "./loader-circle-2H0CB0Qe.js";
import { I as IconLucideDownload, a as IconLucideFolderOpen } from "./folder-open-Cw_0c4cI.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { I as IconLucidePause } from "./pause-u3QmqHX9.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { _ as __unplugin_components_11 } from "./x-Cd6Sow4a.js";
import { _ as __unplugin_components_10 } from "./rotate-ccw-CupSY91p.js";
import { I as IconLucideTrash2 } from "./trash-2-BKyCA-Fb.js";
import { _ as __unplugin_components_2 } from "./triangle-alert-BPUBCHTb.js";
import "./SLoading-C4RltnK4.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./song-BGJnBQIx.js";
const _hoisted_1$1 = { class: "pr-1.5" };
const _hoisted_2$1 = { class: "flex items-center gap-3 pl-3 pr-6 mx-3 h-10 text-sm text-on-surface-variant/60" };
const _hoisted_3$1 = { class: "flex-1 min-w-0 px-1.5" };
const _hoisted_4$1 = { class: "w-32 shrink-0" };
const _hoisted_5$1 = { class: "w-20 shrink-0 text-center" };
const _hoisted_6$1 = { class: "w-16 shrink-0 text-center" };
const _hoisted_7$1 = { class: "w-20 shrink-0 text-center" };
const _hoisted_8$1 = { class: "px-3 pb-3" };
const _hoisted_9$1 = ["onDblclick"];
const _hoisted_10$1 = ["onClick"];
const _hoisted_11$1 = {
  key: 0,
  class: "text-sm font-bold tabular-nums group-hover:opacity-0 transition-opacity duration-300"
};
const _hoisted_12 = { class: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-300 group-hover:scale-100 scale-80 cursor-pointer" };
const _hoisted_13 = { class: "flex-1 min-w-0 flex items-center gap-3" };
const _hoisted_14 = { class: "flex-1 min-w-0" };
const _hoisted_15 = { class: "flex items-baseline gap-1.5 min-w-0" };
const _hoisted_16 = { class: "truncate" };
const _hoisted_17 = { class: "w-32 shrink-0" };
const _hoisted_18 = {
  key: 0,
  class: "flex flex-col gap-1.5"
};
const _hoisted_19 = { class: "h-1.5 w-full rounded-full bg-on-surface/10 overflow-hidden" };
const _hoisted_20 = { class: "text-xs text-on-surface-variant/60 tabular-nums text-left" };
const _hoisted_21 = {
  key: 1,
  class: "text-sm text-on-surface-variant/60"
};
const _hoisted_22 = { class: "w-20 shrink-0 text-center text-sm tabular-nums text-on-surface-variant" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DownloadList",
  props: {
    tasks: {}
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const { t } = useI18n();
    const media = useMediaStore();
    const status = useStatusStore();
    const downloadStore = useDownloadStore();
    const { retry } = useDownload();
    const STATUS_KEY = {
      queued: "download.status.queued",
      downloading: "download.status.downloading",
      done: "download.status.done",
      failed: "download.status.failed",
      canceled: "download.status.canceled",
      interrupted: "download.status.interrupted"
    };
    const isError = (taskStatus) => taskStatus === "failed" || taskStatus === "canceled" || taskStatus === "interrupted";
    const isDone = (task) => task.status === "done" && !!task.filePath;
    const percent = (task) => task.total > 0 ? Math.min(100, Math.round(task.received / task.total * 100)) : 0;
    const artistText = (task) => task.track.artists.map((artist) => artist.name).join(" / ");
    const sizeText = (task) => {
      const bytes = task.total || task.received;
      return bytes > 0 ? formatFileSize(bytes) : "";
    };
    const toLocalTrack = (task) => ({
      ...task.track,
      source: "local",
      path: task.filePath,
      id: task.filePath
    });
    const playableTasks = computed(() => props.tasks.filter(isDone));
    const isPlaying = (task) => isDone(task) && media.track?.id === task.filePath;
    const playTask = (task) => {
      const index = playableTasks.value.findIndex((item) => item.taskId === task.taskId);
      if (index >= 0) void playFrom(playableTasks.value.map(toLocalTrack), index);
    };
    const onIndexClick = (task) => {
      if (!isDone(task)) return;
      if (isPlaying(task)) togglePlay();
      else playTask(task);
    };
    const rowClass = (task) => {
      if (isPlaying(task)) return "bg-primary/16 border-primary/40";
      const base = "bg-surface-panel border-primary/12";
      if (isDone(task)) {
        return `${base} cursor-pointer hover:border-primary/30 hover:bg-on-surface/8 active:bg-on-surface/12`;
      }
      return base;
    };
    const openFolder = (task) => {
      if (task.filePath) window.api.system.showInExplorer(task.filePath);
    };
    const confirmDelete = async (task) => {
      const confirmed = await dialog.confirm({
        title: t("download.deleteConfirmTitle"),
        content: t("download.deleteConfirmContent"),
        type: "warning"
      });
      if (confirmed) downloadStore.remove(task.taskId);
    };
    const playAll = () => {
      if (playableTasks.value.length > 0) {
        void playFrom(playableTasks.value.map(toLocalTrack), 0);
      }
    };
    __expose({ playAll });
    return (_ctx, _cache) => {
      const _component_SImg = _sfc_main$3;
      const _component_SButton = _sfc_main$4;
      const _component_SVirtualList = _sfc_main$2;
      return openBlock(), createBlock(_component_SVirtualList, {
        items: __props.tasks,
        "item-height": 88,
        "get-item-key": (task) => task.taskId,
        "item-fixed": "",
        height: "100%",
        "padding-bottom": 80
      }, {
        header: withCtx(() => [
          createBaseVNode("div", _hoisted_1$1, [
            createBaseVNode("div", _hoisted_2$1, [
              _cache[1] || (_cache[1] = createBaseVNode("div", { class: "w-8 shrink-0 flex items-center justify-center" }, [
                createBaseVNode("span", null, "#")
              ], -1)),
              createBaseVNode("div", _hoisted_3$1, toDisplayString(unref(t)("songList.title")), 1),
              createBaseVNode("div", _hoisted_4$1, toDisplayString(unref(t)("download.colStatus")), 1),
              createBaseVNode("div", _hoisted_5$1, toDisplayString(unref(t)("download.colSize")), 1),
              createBaseVNode("div", _hoisted_6$1, toDisplayString(unref(t)("songList.duration")), 1),
              createBaseVNode("div", _hoisted_7$1, toDisplayString(unref(t)("songList.actions")), 1)
            ])
          ])
        ]),
        default: withCtx(({ item, index }) => [
          createBaseVNode("div", _hoisted_8$1, [
            createBaseVNode("div", {
              class: normalizeClass(["group flex items-center gap-3 pl-3 pr-6 h-19 rounded-xl border-2 border-solid transition-[background-color,border-color] duration-200", rowClass(item)]),
              onDblclick: ($event) => isDone(item) ? playTask(item) : void 0
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["w-8 shrink-0 flex items-center justify-center relative", isPlaying(item) ? "text-primary" : "text-on-surface-variant"]),
                onClick: withModifiers(($event) => onIndexClick(item), ["stop"])
              }, [
                isDone(item) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  !isPlaying(item) ? (openBlock(), createElementBlock("span", _hoisted_11$1, toDisplayString(index + 1), 1)) : (openBlock(), createBlock(unref(__unplugin_components_4), {
                    key: 1,
                    class: "size-5 group-hover:opacity-0 transition-opacity duration-300"
                  })),
                  createBaseVNode("div", _hoisted_12, [
                    isPlaying(item) && unref(status).isPlaying ? (openBlock(), createBlock(unref(IconLucidePause), {
                      key: 0,
                      class: "size-5"
                    })) : (openBlock(), createBlock(unref(__unplugin_components_0), {
                      key: 1,
                      class: "size-5"
                    }))
                  ])
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  item.status === "downloading" ? (openBlock(), createBlock(unref(__unplugin_components_5), {
                    key: 0,
                    class: "size-4 animate-spin"
                  })) : (openBlock(), createBlock(unref(IconLucideDownload), {
                    key: 1,
                    class: "size-4"
                  }))
                ], 64))
              ], 10, _hoisted_10$1),
              createBaseVNode("div", _hoisted_13, [
                createVNode(_component_SImg, {
                  src: item.track.cover,
                  class: "size-12 rounded-lg shrink-0"
                }, null, 8, ["src"]),
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("div", _hoisted_15, [
                    createBaseVNode("span", {
                      class: normalizeClass(["text-base font-medium truncate", isPlaying(item) ? "text-primary" : ""])
                    }, toDisplayString(item.track.title), 3),
                    item.tagWarning ? (openBlock(), createBlock(unref(__unplugin_components_2), {
                      key: 0,
                      class: "size-3.5 shrink-0 self-center text-amber-500",
                      title: unref(t)("download.tagWarning")
                    }, null, 8, ["title"])) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", {
                    class: normalizeClass(["text-sm mt-1 truncate flex items-center gap-1", isPlaying(item) ? "text-primary/70" : "text-on-surface-variant"])
                  }, [
                    item.track.quality ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass([
                        "shrink-0 px-1 rounded text-[10px] leading-[18px] font-bold border border-solid",
                        unref(isLosslessQuality)(item.track.quality) ? "text-amber-500 border-amber-500/40" : "text-on-surface-variant border-on-surface-variant/40"
                      ])
                    }, toDisplayString(unref(getQualityLabel)(item.track.quality)), 3)) : createCommentVNode("", true),
                    createBaseVNode("span", _hoisted_16, toDisplayString(artistText(item)), 1)
                  ], 2)
                ])
              ]),
              createBaseVNode("div", _hoisted_17, [
                item.status === "downloading" ? (openBlock(), createElementBlock("div", _hoisted_18, [
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("div", {
                      class: "h-full rounded-full bg-primary transition-[width] duration-200",
                      style: normalizeStyle({ width: `${percent(item)}%` })
                    }, null, 4)
                  ]),
                  createBaseVNode("span", _hoisted_20, toDisplayString(percent(item)) + "% ", 1)
                ])) : (openBlock(), createElementBlock("span", _hoisted_21, toDisplayString(unref(t)(STATUS_KEY[item.status])), 1))
              ]),
              createBaseVNode("div", _hoisted_22, toDisplayString(sizeText(item) || "—"), 1),
              createBaseVNode("div", {
                class: normalizeClass(["w-16 shrink-0 text-center text-sm tabular-nums", isPlaying(item) ? "text-primary/60" : "text-on-surface-variant"])
              }, toDisplayString(item.track.duration ? unref(formatTime)(item.track.duration) : "—"), 3),
              createBaseVNode("div", {
                class: "w-20 shrink-0 flex items-center justify-center gap-1",
                onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                }, ["stop"]))
              }, [
                item.status === "queued" || item.status === "downloading" ? (openBlock(), createBlock(_component_SButton, {
                  key: 0,
                  variant: "ghost",
                  circle: "",
                  size: "small",
                  title: unref(t)("download.cancel"),
                  onClick: ($event) => unref(downloadStore).cancel(item.taskId)
                }, {
                  icon: withCtx(() => [
                    createVNode(unref(__unplugin_components_11))
                  ]),
                  _: 1
                }, 8, ["title", "onClick"])) : isError(item.status) ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createVNode(_component_SButton, {
                    variant: "ghost",
                    circle: "",
                    size: "small",
                    title: unref(t)("download.retry"),
                    onClick: ($event) => unref(retry)(item)
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(__unplugin_components_10))
                    ]),
                    _: 1
                  }, 8, ["title", "onClick"]),
                  createVNode(_component_SButton, {
                    variant: "ghost",
                    circle: "",
                    size: "small",
                    title: unref(t)("download.remove"),
                    onClick: ($event) => unref(downloadStore).remove(item.taskId)
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconLucideTrash2))
                    ]),
                    _: 1
                  }, 8, ["title", "onClick"])
                ], 64)) : isDone(item) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                  createVNode(_component_SButton, {
                    variant: "ghost",
                    circle: "",
                    size: "small",
                    title: unref(t)("download.openFolder"),
                    onClick: ($event) => openFolder(item)
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconLucideFolderOpen))
                    ]),
                    _: 1
                  }, 8, ["title", "onClick"]),
                  createVNode(_component_SButton, {
                    variant: "ghost",
                    circle: "",
                    size: "small",
                    title: unref(t)("download.deleteFile"),
                    onClick: ($event) => confirmDelete(item)
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconLucideTrash2))
                    ]),
                    _: 1
                  }, 8, ["title", "onClick"])
                ], 64)) : createCommentVNode("", true)
              ])
            ], 42, _hoisted_9$1)
          ])
        ]),
        _: 1
      }, 8, ["items", "get-item-key"]);
    };
  }
});
const _hoisted_1 = { class: "flex flex-col h-full" };
const _hoisted_2 = { class: "shrink-0 px-5 pb-2" };
const _hoisted_3 = { class: "flex items-baseline gap-4 mt-2 mb-4 min-w-0" };
const _hoisted_4 = { class: "text-3xl font-bold text-on-surface shrink-0 text-balance" };
const _hoisted_5 = { class: "flex items-center gap-1.5 text-sm text-on-surface-variant/50 shrink-0" };
const _hoisted_6 = { class: "flex items-center justify-between gap-4" };
const _hoisted_7 = { class: "flex items-center gap-3 shrink-0" };
const _hoisted_8 = { class: "flex-1 min-h-0" };
const _hoisted_9 = {
  key: 1,
  class: "h-full flex items-center justify-center"
};
const _hoisted_10 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_11 = { class: "text-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "Download" },
  __name: "Download",
  setup(__props) {
    const { t } = useI18n();
    const downloadStore = useDownloadStore();
    const tab = ref("active");
    const tabs = computed(() => [
      { key: "active", label: t("download.tabActive") },
      { key: "error", label: t("download.tabError") },
      { key: "done", label: t("download.tabDone") }
    ]);
    const isError = (status) => status === "failed" || status === "canceled" || status === "interrupted";
    const currentTasks = computed(() => {
      if (tab.value === "active") return downloadStore.activeTasks;
      if (tab.value === "error")
        return downloadStore.historyTasks.filter((task) => isError(task.status));
      return downloadStore.historyTasks.filter((task) => task.status === "done");
    });
    const hasFinished = computed(() => downloadStore.historyTasks.length > 0);
    const requestClearFinished = async () => {
      const confirmed = await dialog.confirm({
        title: t("download.clearConfirmTitle"),
        content: t("download.clearConfirmContent"),
        type: "warning"
      });
      if (confirmed) downloadStore.clearFinished();
    };
    const listRef = ref(null);
    const emptyText = computed(
      () => tab.value === "done" ? t("download.emptyDone") : t("download.empty")
    );
    onMounted(() => void downloadStore.init());
    return (_ctx, _cache) => {
      const _component_STabs = _sfc_main$5;
      const _component_SButton = _sfc_main$4;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("h1", _hoisted_4, toDisplayString(unref(t)("download.title")), 1),
            createBaseVNode("span", _hoisted_5, [
              createVNode(unref(__unplugin_components_4), { class: "size-3.5" }),
              createTextVNode(" " + toDisplayString(unref(t)("common.totalSongs", { count: unref(currentTasks).length })), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_6, [
            createVNode(_component_STabs, {
              "model-value": unref(tab),
              tabs: unref(tabs),
              type: "bar",
              size: "large",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = (key) => tab.value = key)
            }, null, 8, ["model-value", "tabs"]),
            createBaseVNode("div", _hoisted_7, [
              unref(tab) === "done" ? (openBlock(), createBlock(_component_SButton, {
                key: 0,
                type: "primary",
                variant: "secondary",
                round: "",
                disabled: unref(currentTasks).length === 0,
                onClick: _cache[1] || (_cache[1] = ($event) => unref(listRef)?.playAll())
              }, {
                icon: withCtx(() => [
                  createVNode(unref(__unplugin_components_0))
                ]),
                default: withCtx(() => [
                  createTextVNode(" " + toDisplayString(unref(t)("common.playAll")), 1)
                ]),
                _: 1
              }, 8, ["disabled"])) : createCommentVNode("", true),
              createVNode(_component_SButton, {
                variant: "secondary",
                round: "",
                disabled: !unref(hasFinished),
                onClick: requestClearFinished
              }, {
                icon: withCtx(() => [
                  createVNode(unref(IconLucideTrash2))
                ]),
                default: withCtx(() => [
                  createTextVNode(" " + toDisplayString(unref(t)("download.clearFinished")), 1)
                ]),
                _: 1
              }, 8, ["disabled"])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_8, [
          unref(currentTasks).length > 0 ? (openBlock(), createBlock(_sfc_main$1, {
            key: 0,
            ref_key: "listRef",
            ref: listRef,
            tasks: unref(currentTasks)
          }, null, 8, ["tasks"])) : (openBlock(), createElementBlock("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createVNode(unref(IconLucideDownload), { class: "size-12 mx-auto mb-3 opacity-30" }),
              createBaseVNode("div", _hoisted_11, toDisplayString(unref(emptyText)), 1)
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
