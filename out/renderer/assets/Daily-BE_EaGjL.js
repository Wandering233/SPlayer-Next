import { _ as __unplugin_components_5 } from "./SLoading-C4RltnK4.js";
import { _ as _sfc_main$3 } from "./SPopselect.vue_vue_type_script_setup_true_lang-CxFYtI62.js";
import { a as __unplugin_components_6 } from "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import { _ as _sfc_main$2 } from "./SDropdownMenu.vue_vue_type_script_setup_true_lang-DsKOP0yw.js";
import { I as IconLucideEllipsis } from "./ellipsis-D0hNWfJ2.js";
import { _ as _sfc_main$1 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as __unplugin_components_0$1 } from "./play-jYzYuagg.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { _ as __unplugin_components_0 } from "./calendar-days-C7nDG-8s.js";
import { x as defineComponent, w as watch, r as ref, y as createElementBlock, z as createBaseVNode, v as unref, F as Fragment, O as toDisplayString, P as createBlock, D as createVNode, W as createTextVNode, B as createCommentVNode, Q as withCtx, U as Transition, c as computed, q as shallowRef, C as openBlock, m as markRaw } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { u as useDataStore } from "./data-BvtPKRYl.js";
import { u as useI18n, aa as useUserStore, at as playFrom } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$4 } from "./SongList.vue_vue_type_script_setup_true_lang-Doyounvo.js";
import { I as IconLucideRefreshCw } from "./refresh-cw-DNNyf8AZ.js";
import { I as IconLucideListChecks } from "./list-checks-B0B5438d.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./check-BXlOuXWK.js";
import "./PopperContent-CPX94GL7.js";
import "./more-horizontal-BtOolk7_.js";
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
import "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import "./folder-open-Cw_0c4cI.js";
import "./trash-2-BKyCA-Fb.js";
import "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import "./pause-u3QmqHX9.js";
import "./useFloatingPlayerBar-R2fVODYZ.js";
import "./arrow-up-down-Dw8Z8Wwk.js";
import "./favorite-outline-rounded-C5xed2i3.js";
const _hoisted_1 = { class: "flex h-full flex-col" };
const _hoisted_2 = { class: "shrink-0 px-5 pt-2 pb-3" };
const _hoisted_3 = { class: "flex items-center gap-5" };
const _hoisted_4 = { class: "flex size-28 shrink-0 flex-col items-center justify-center rounded-2xl border border-solid border-primary/15 bg-primary/8" };
const _hoisted_5 = { class: "text-xs text-on-surface-variant/60" };
const _hoisted_6 = { class: "text-4xl font-bold leading-tight text-primary tabular-nums" };
const _hoisted_7 = { class: "text-xs text-on-surface-variant/60" };
const _hoisted_8 = { class: "flex min-w-0 flex-1 flex-col gap-2" };
const _hoisted_9 = { class: "flex items-baseline gap-3" };
const _hoisted_10 = { class: "text-3xl font-bold text-on-surface text-balance" };
const _hoisted_11 = {
  key: 0,
  class: "flex items-center gap-1 text-sm text-on-surface-variant/50"
};
const _hoisted_12 = { class: "text-sm text-on-surface-variant/70" };
const _hoisted_13 = { class: "mt-1 flex items-center justify-between gap-3" };
const _hoisted_14 = { class: "flex items-center gap-2" };
const _hoisted_15 = {
  key: "login",
  class: "flex flex-1 items-center justify-center"
};
const _hoisted_16 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_17 = { class: "text-sm" };
const _hoisted_18 = {
  key: "loading",
  class: "flex flex-1 items-center justify-center"
};
const _hoisted_19 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_20 = { class: "text-sm" };
const _hoisted_21 = {
  key: "empty",
  class: "flex flex-1 items-center justify-center"
};
const _hoisted_22 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_23 = { class: "text-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "Daily" },
  __name: "Daily",
  setup(__props) {
    const { t, locale } = useI18n();
    const data = useDataStore();
    const user = useUserStore();
    const days = computed(() => {
      if (!user.isLoggedIn) return [];
      const result = [];
      if (data.dailyRecommend.length > 0) {
        result.push({ key: "today", date: /* @__PURE__ */ new Date(), tracks: data.dailyRecommend, isToday: true });
      }
      for (const entry of data.dailyHistory) {
        result.push({
          key: entry.date,
          date: new Date(entry.date),
          tracks: entry.tracks,
          isToday: false
        });
      }
      return result;
    });
    const selectedKey = ref("today");
    const selectedDay = computed(
      () => days.value.find((day) => day.key === selectedKey.value) ?? days.value[0] ?? null
    );
    watch(days, (list) => {
      if (list.length === 0) return;
      if (!list.some((day) => day.key === selectedKey.value)) {
        selectedKey.value = list[0].key;
      }
    });
    const loading = ref(data.dailyRecommend.length === 0);
    const handlePlayAll = () => {
      const tracks = selectedDay.value?.tracks ?? [];
      if (tracks.length > 0) playFrom(tracks, 0);
    };
    const formatDate = (date, options) => new Intl.DateTimeFormat(locale.value, options).format(date);
    const dayOptions = computed(
      () => days.value.map((day) => ({
        value: day.key,
        label: day.isToday ? t("daily.today") : formatDate(day.date, { month: "long", day: "numeric" })
      }))
    );
    const songListRef = shallowRef(null);
    const moreMenuItems = computed(() => [
      { key: "refresh", label: t("daily.refresh"), icon: markRaw(IconLucideRefreshCw) },
      { key: "batch", label: t("songList.batch.manage"), icon: markRaw(IconLucideListChecks) }
    ]);
    const handleMore = (key) => {
      if (key === "refresh") {
        selectedKey.value = "today";
        data.ensureDailyRecommend(true);
      } else if (key === "batch") {
        songListRef.value?.enterBatch();
      }
    };
    watch(
      () => user.isLoggedIn,
      (loggedIn) => {
        if (!loggedIn) {
          loading.value = false;
          return;
        }
        if (data.dailyRecommend.length === 0) loading.value = true;
        data.ensureDailyRecommend().finally(() => {
          loading.value = false;
        });
      },
      { immediate: true }
    );
    return (_ctx, _cache) => {
      const _component_IconLucideCalendarDays = __unplugin_components_0;
      const _component_IconLucideMusic = __unplugin_components_4;
      const _component_IconLucidePlay = __unplugin_components_0$1;
      const _component_SButton = _sfc_main$1;
      const _component_IconLucideEllipsis = IconLucideEllipsis;
      const _component_SDropdownMenu = _sfc_main$2;
      const _component_IconLucideChevronDown = __unplugin_components_6;
      const _component_SPopselect = _sfc_main$3;
      const _component_SLoading = __unplugin_components_5;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              unref(selectedDay) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("span", _hoisted_5, toDisplayString(formatDate(unref(selectedDay).date, { month: "short" })), 1),
                createBaseVNode("span", _hoisted_6, toDisplayString(unref(selectedDay).date.getDate()), 1),
                createBaseVNode("span", _hoisted_7, toDisplayString(formatDate(unref(selectedDay).date, { weekday: "short" })), 1)
              ], 64)) : (openBlock(), createBlock(_component_IconLucideCalendarDays, {
                key: 1,
                class: "size-8 text-primary/40"
              }))
            ]),
            createBaseVNode("div", _hoisted_8, [
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("h1", _hoisted_10, toDisplayString(unref(t)("daily.title")), 1),
                unref(selectedDay) && unref(selectedDay).tracks.length > 0 ? (openBlock(), createElementBlock("span", _hoisted_11, [
                  createVNode(_component_IconLucideMusic, { class: "size-3.5" }),
                  createTextVNode(" " + toDisplayString(unref(t)("common.totalSongs", { count: unref(selectedDay).tracks.length })), 1)
                ])) : createCommentVNode("", true)
              ]),
              createBaseVNode("p", _hoisted_12, toDisplayString(unref(selectedDay) && !unref(selectedDay).isToday ? formatDate(unref(selectedDay).date, { year: "numeric", month: "long", day: "numeric" }) : unref(t)("daily.tagline")), 1),
              createBaseVNode("div", _hoisted_13, [
                createBaseVNode("div", _hoisted_14, [
                  createVNode(_component_SButton, {
                    type: "primary",
                    variant: "secondary",
                    round: "",
                    disabled: !unref(selectedDay) || unref(selectedDay).tracks.length === 0,
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
                    onSelect: handleMore
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
                createVNode(_component_SPopselect, {
                  "model-value": unref(selectedKey),
                  options: unref(dayOptions),
                  align: "end",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => selectedKey.value = String($event))
                }, {
                  trigger: withCtx(({ selected }) => [
                    createVNode(_component_SButton, {
                      variant: "secondary",
                      round: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_IconLucideCalendarDays, { class: "size-4 shrink-0 opacity-60" }),
                        createTextVNode(" " + toDisplayString(selected?.label ?? unref(t)("daily.today")) + " ", 1),
                        createVNode(_component_IconLucideChevronDown, { class: "size-3.5 shrink-0 opacity-50" })
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 1
                }, 8, ["model-value", "options"])
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
            !unref(user).isLoggedIn ? (openBlock(), createElementBlock("div", _hoisted_15, [
              createBaseVNode("div", _hoisted_16, [
                createVNode(_component_IconLucideCalendarDays, { class: "mx-auto mb-3 size-12 opacity-30" }),
                createBaseVNode("div", _hoisted_17, toDisplayString(unref(t)("daily.needLogin")), 1)
              ])
            ])) : unref(selectedDay) && unref(selectedDay).tracks.length > 0 ? (openBlock(), createElementBlock("div", {
              key: unref(selectedDay).key,
              class: "min-h-0 flex-1"
            }, [
              createVNode(_sfc_main$4, {
                ref_key: "songListRef",
                ref: songListRef,
                items: unref(selectedDay).tracks,
                source: "netease"
              }, null, 8, ["items"])
            ])) : unref(loading) ? (openBlock(), createElementBlock("div", _hoisted_18, [
              createBaseVNode("div", _hoisted_19, [
                createVNode(_component_SLoading, { class: "mx-auto mb-4 block text-4xl text-primary/70" }),
                createBaseVNode("div", _hoisted_20, toDisplayString(unref(t)("common.loading")), 1)
              ])
            ])) : (openBlock(), createElementBlock("div", _hoisted_21, [
              createBaseVNode("div", _hoisted_22, [
                createVNode(_component_IconLucideCalendarDays, { class: "mx-auto mb-3 size-12 opacity-30" }),
                createBaseVNode("div", _hoisted_23, toDisplayString(unref(t)("daily.empty")), 1)
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
