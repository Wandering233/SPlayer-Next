import { _ as _sfc_main$2 } from "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import { _ as _sfc_main$1 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { u as useI18n, aA as useLibraryStore, s as storeToRefs, t as toast } from "./index-DVKNk9gd.js";
import { I as IconLucideFolder } from "./folder-EonVPYpL.js";
import { _ as __unplugin_components_10 } from "./folder-plus-BRY8gih1.js";
import { I as IconLucideTrash2 } from "./trash-2-BKyCA-Fb.js";
import { x as defineComponent, k as onMounted, y as createElementBlock, F as Fragment, N as renderList, v as unref, O as toDisplayString, B as createCommentVNode, D as createVNode, Q as withCtx, i as isRef, r as ref, z as createBaseVNode, W as createTextVNode, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const _hoisted_1 = { class: "flex flex-col gap-2" };
const _hoisted_2 = { class: "flex-1 min-w-0" };
const _hoisted_3 = { class: "text-sm truncate text-on-surface" };
const _hoisted_4 = { class: "text-xs truncate text-on-surface-variant/60" };
const _hoisted_5 = {
  key: 0,
  class: "py-6 text-center text-on-surface-variant/50 text-sm"
};
const _hoisted_6 = { class: "text-sm text-on-surface-variant" };
const _hoisted_7 = { class: "text-xs text-on-surface-variant/60 mt-2 break-all" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FolderManager",
  emits: ["added", "removed"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const libraryStore = useLibraryStore();
    const { scanDirs } = storeToRefs(libraryStore);
    const emit = __emit;
    const folderName = (dir) => {
      const parts = dir.replace(/\\/g, "/").split("/").filter(Boolean);
      return parts[parts.length - 1] || dir;
    };
    const adding = ref(false);
    const removingDir = ref(null);
    const removeConfirmOpen = ref(false);
    const handleAdd = async () => {
      if (adding.value) return;
      adding.value = true;
      try {
        const res = await libraryStore.addScanDir();
        if (res.success) {
          emit("added");
        } else if (res.error === "nested") {
          toast.warning(t("library.nestedHint"));
        } else if (res.error) {
          toast.error(res.error);
        }
      } finally {
        adding.value = false;
      }
    };
    const confirmRemove = (dir) => {
      removingDir.value = dir;
      removeConfirmOpen.value = true;
    };
    const handleRemove = async () => {
      const dir = removingDir.value;
      if (!dir) return;
      await libraryStore.removeScanDir(dir);
      removeConfirmOpen.value = false;
      emit("removed", dir);
    };
    onMounted(() => {
      if (!libraryStore.initialized) libraryStore.load();
    });
    return (_ctx, _cache) => {
      const _component_SButton = _sfc_main$1;
      const _component_SDialog = _sfc_main$2;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(scanDirs), (dir) => {
          return openBlock(), createElementBlock("div", {
            key: dir,
            class: "flex items-center gap-3 px-3 py-2 rounded-lg bg-on-surface/4"
          }, [
            createVNode(unref(IconLucideFolder), { class: "size-4 text-on-surface-variant shrink-0" }),
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("div", _hoisted_3, toDisplayString(folderName(dir)), 1),
              createBaseVNode("div", _hoisted_4, toDisplayString(dir), 1)
            ]),
            createVNode(_component_SButton, {
              variant: "ghost",
              size: "small",
              onClick: ($event) => confirmRemove(dir)
            }, {
              icon: withCtx(() => [
                createVNode(unref(IconLucideTrash2))
              ]),
              _: 1
            }, 8, ["onClick"])
          ]);
        }), 128)),
        unref(scanDirs).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_5, toDisplayString(unref(t)("library.emptyHint")), 1)) : createCommentVNode("", true),
        createVNode(_component_SButton, {
          class: "mt-1",
          variant: "secondary",
          loading: unref(adding),
          block: "",
          onClick: handleAdd
        }, {
          icon: withCtx(() => [
            createVNode(unref(__unplugin_components_10))
          ]),
          default: withCtx(() => [
            createTextVNode(" " + toDisplayString(unref(t)("library.addFolder")), 1)
          ]),
          _: 1
        }, 8, ["loading"]),
        createVNode(_component_SDialog, {
          open: unref(removeConfirmOpen),
          "onUpdate:open": _cache[0] || (_cache[0] = ($event) => isRef(removeConfirmOpen) ? removeConfirmOpen.value = $event : null),
          title: unref(t)("library.removeFolder")
        }, {
          default: withCtx(() => [
            createBaseVNode("p", _hoisted_6, toDisplayString(unref(t)("library.removeFolderConfirm")), 1),
            createBaseVNode("p", _hoisted_7, toDisplayString(unref(removingDir)), 1)
          ]),
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
              onClick: handleRemove
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("common.confirm")), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["open", "title"])
      ]);
    };
  }
});
export {
  _sfc_main as _
};
