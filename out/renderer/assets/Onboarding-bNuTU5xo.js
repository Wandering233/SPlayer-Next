import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode, x as defineComponent, D as createVNode, O as toDisplayString, v as unref, F as Fragment, N as renderList, Q as withCtx, P as createBlock, R as resolveDynamicComponent, W as createTextVNode, X as createSlots, M as normalizeClass, A as normalizeStyle, U as Transition, r as ref, c as computed } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { u as useI18n, a as useSettingsStore, b as useThemeStore, s as storeToRefs, D as DEFAULT_PRIMARY, c as useRouter } from "./index-DVKNk9gd.js";
import { _ as _sfc_main$b, C as CURRENT_AGREEMENT_VERSION } from "./StepAgreement.vue_vue_type_script_setup_true_lang-BUULe3Yd.js";
import { _ as __unplugin_components_0, a as __unplugin_components_9 } from "./log-out-nJ93UQya.js";
import { _ as _sfc_main$7 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as _sfc_main$6, I as IconLucideServer, a as IconLucideSettings2, L as LOCALES, b as IconMonitor, c as IconLucideKeyboard } from "./keyboard-BMoUbwn1.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { I as IconLucideFolder } from "./folder-EonVPYpL.js";
import { _ as __unplugin_components_5 } from "./file-text-DIJIO1O_.js";
import { _ as _sfc_main$8 } from "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import { I as IconSun, a as IconMoon } from "./moon-pg6ULvO9.js";
import { _ as __unplugin_components_7 } from "./check-BXlOuXWK.js";
import { _ as _sfc_main$9 } from "./FolderManager.vue_vue_type_script_setup_true_lang-CFc9jpz_.js";
import { _ as _sfc_main$a } from "./SAlert.vue_vue_type_script_setup_true_lang-b7Iha3N_.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import "./copy-DhNjJWGd.js";
import "./x-Cd6Sow4a.js";
import "./SLoading-C4RltnK4.js";
import "./PopperContent-CPX94GL7.js";
import "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import "./folder-plus-BRY8gih1.js";
import "./trash-2-BKyCA-Fb.js";
const _hoisted_1$6 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$6, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("path", { d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4" }),
      createBaseVNode("circle", {
        cx: "4",
        cy: "20",
        r: "2"
      })
    ], -1)
  ])]);
}
const IconSparkles = markRaw({ name: "lucide-sparkles", render });
const _hoisted_1$5 = { class: "flex flex-col items-center text-center w-full max-w-2xl mx-auto my-auto" };
const _hoisted_2$5 = { class: "text-3xl font-bold mb-2" };
const _hoisted_3$5 = { class: "text-on-surface-variant/70 mb-8 leading-relaxed" };
const _hoisted_4$5 = { class: "grid grid-cols-2 gap-3 w-full mb-10" };
const _hoisted_5$5 = { class: "flex-1 min-w-0" };
const _hoisted_6$5 = { class: "text-sm font-medium" };
const _hoisted_7$4 = { class: "text-xs text-on-surface-variant/60 truncate" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "StepWelcome",
  emits: ["next"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    const FEATURES = [
      { icon: IconLucideFolder, key: "local" },
      { icon: __unplugin_components_4, key: "quality" },
      { icon: IconLucideServer, key: "streaming" },
      { icon: IconSparkles, key: "lyrics" }
    ];
    return (_ctx, _cache) => {
      const _component_SLogo = _sfc_main$6;
      const _component_SButton = _sfc_main$7;
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createVNode(_component_SLogo, {
          size: 80,
          class: "mb-6"
        }),
        createBaseVNode("h1", _hoisted_2$5, toDisplayString(unref(t)("onboarding.welcome.title")), 1),
        createBaseVNode("p", _hoisted_3$5, toDisplayString(unref(t)("onboarding.welcome.subtitle")), 1),
        createBaseVNode("div", _hoisted_4$5, [
          (openBlock(), createElementBlock(Fragment, null, renderList(FEATURES, (feature) => {
            return createBaseVNode("div", {
              key: feature.key,
              class: "flex items-center gap-3 px-4 py-3 bg-on-surface/4 border border-solid border-primary/10 rounded-xl text-left"
            }, [
              (openBlock(), createBlock(resolveDynamicComponent(feature.icon), { class: "size-5 text-primary shrink-0" })),
              createBaseVNode("div", _hoisted_5$5, [
                createBaseVNode("div", _hoisted_6$5, toDisplayString(unref(t)(`onboarding.welcome.features.${feature.key}.title`)), 1),
                createBaseVNode("div", _hoisted_7$4, toDisplayString(unref(t)(`onboarding.welcome.features.${feature.key}.desc`)), 1)
              ])
            ]);
          }), 64))
        ]),
        createVNode(_component_SButton, {
          type: "primary",
          round: "",
          onClick: _cache[0] || (_cache[0] = ($event) => emit("next"))
        }, {
          icon: withCtx(() => [
            createVNode(unref(__unplugin_components_5))
          ]),
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("onboarding.welcome.start")) + " ", 1)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1$4 = { class: "flex flex-col max-w-2xl w-full mx-auto" };
const _hoisted_2$4 = { class: "flex items-center gap-3 mb-2" };
const _hoisted_3$4 = { class: "text-2xl font-bold" };
const _hoisted_4$4 = { class: "text-on-surface-variant/70 mb-6 leading-relaxed" };
const _hoisted_5$4 = { class: "flex flex-col mb-6" };
const _hoisted_6$4 = { class: "text-sm font-medium text-on-surface-variant/80 mb-2 px-1" };
const _hoisted_7$3 = { class: "flex items-center justify-between gap-4 rounded-xl bg-on-surface/4 border border-solid border-primary/10 px-4 py-3" };
const _hoisted_8$3 = { class: "text-sm" };
const _hoisted_9$2 = { class: "shrink-0 w-40 flex justify-end" };
const _hoisted_10$2 = { class: "text-sm font-medium text-on-surface-variant/80 mt-5 mb-2 px-1" };
const _hoisted_11 = { class: "flex flex-col gap-2" };
const _hoisted_12 = { class: "flex items-center justify-between gap-4 rounded-xl bg-on-surface/4 border border-solid border-primary/10 px-4 py-3" };
const _hoisted_13 = { class: "text-sm" };
const _hoisted_14 = { class: "shrink-0 flex items-center gap-1.5" };
const _hoisted_15 = { class: "flex items-center justify-between gap-4 rounded-xl bg-on-surface/4 border border-solid border-primary/10 px-4 py-3" };
const _hoisted_16 = { class: "text-sm shrink-0" };
const _hoisted_17 = { class: "shrink-0 flex flex-wrap items-center gap-1.5 justify-end" };
const _hoisted_18 = { class: "flex items-center gap-3" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "StepPreferences",
  emits: ["next", "back"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    const settings = useSettingsStore();
    const theme = useThemeStore();
    const { mode, source, customColor } = storeToRefs(theme);
    const MODES = [
      { value: "light", icon: IconSun, labelKey: "settings.themeMode.light" },
      { value: "dark", icon: IconMoon, labelKey: "settings.themeMode.dark" },
      { value: "system", icon: IconMonitor, labelKey: "settings.themeMode.system" }
    ];
    const PRESET_COLORS = [
      DEFAULT_PRIMARY,
      "#FF6B6B",
      "#FFA94D",
      "#FFD43B",
      "#51CF66",
      "#22B8CF",
      "#5C7CFA",
      "#CC5DE8"
    ];
    const isColorActive = (hex) => source.value === "custom" && customColor.value.toLowerCase() === hex.toLowerCase();
    return (_ctx, _cache) => {
      const _component_SSelect = _sfc_main$8;
      const _component_SButton = _sfc_main$7;
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("div", _hoisted_2$4, [
          createVNode(unref(IconLucideSettings2), { class: "size-6 text-primary" }),
          createBaseVNode("h2", _hoisted_3$4, toDisplayString(unref(t)("onboarding.preferences.title")), 1)
        ]),
        createBaseVNode("p", _hoisted_4$4, toDisplayString(unref(t)("onboarding.preferences.subtitle")), 1),
        createBaseVNode("div", _hoisted_5$4, [
          createBaseVNode("h3", _hoisted_6$4, toDisplayString(unref(t)("settings.section.language")), 1),
          createBaseVNode("div", _hoisted_7$3, [
            createBaseVNode("span", _hoisted_8$3, toDisplayString(unref(t)("onboarding.preferences.languageLabel")), 1),
            createBaseVNode("div", _hoisted_9$2, [
              createVNode(_component_SSelect, {
                "model-value": unref(settings).locale,
                options: unref(LOCALES),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => unref(settings).locale = $event)
              }, null, 8, ["model-value", "options"])
            ])
          ]),
          createBaseVNode("h3", _hoisted_10$2, toDisplayString(unref(t)("settings.section.theme")), 1),
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              createBaseVNode("span", _hoisted_13, toDisplayString(unref(t)("onboarding.preferences.modeLabel")), 1),
              createBaseVNode("div", _hoisted_14, [
                (openBlock(), createElementBlock(Fragment, null, renderList(MODES, (m) => {
                  return createVNode(_component_SButton, {
                    key: m.value,
                    type: unref(mode) === m.value ? "primary" : "default",
                    variant: unref(mode) === m.value ? "secondary" : "tertiary",
                    size: "small",
                    round: "",
                    "icon-size": 14,
                    onClick: ($event) => mode.value = m.value
                  }, {
                    icon: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(m.icon)))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" " + toDisplayString(unref(t)(m.labelKey)), 1)
                    ]),
                    _: 2
                  }, 1032, ["type", "variant", "onClick"]);
                }), 64))
              ])
            ]),
            createBaseVNode("div", _hoisted_15, [
              createBaseVNode("span", _hoisted_16, toDisplayString(unref(t)("onboarding.preferences.colorLabel")), 1),
              createBaseVNode("div", _hoisted_17, [
                (openBlock(), createElementBlock(Fragment, null, renderList(PRESET_COLORS, (hex) => {
                  return createVNode(_component_SButton, {
                    key: hex,
                    variant: "text",
                    circle: "",
                    size: 24,
                    style: normalizeStyle({ background: hex }),
                    class: normalizeClass(
                      isColorActive(hex) ? "ring-2 ring-on-surface ring-offset-2 ring-offset-app" : ""
                    ),
                    "icon-size": 12,
                    onClick: ($event) => unref(theme).setCustomColor(hex)
                  }, createSlots({ _: 2 }, [
                    isColorActive(hex) ? {
                      name: "icon",
                      fn: withCtx(() => [
                        createVNode(unref(__unplugin_components_7), { class: "text-white drop-shadow" })
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["style", "class", "onClick"]);
                }), 64)),
                createVNode(_component_SButton, {
                  type: unref(source) === "cover" ? "primary" : "default",
                  variant: unref(source) === "cover" ? "secondary" : "tertiary",
                  size: "small",
                  round: "",
                  onClick: _cache[1] || (_cache[1] = ($event) => unref(theme).setSource("cover"))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("settings.themeSource.cover")), 1)
                  ]),
                  _: 1
                }, 8, ["type", "variant"])
              ])
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_18, [
          createVNode(_component_SButton, {
            variant: "ghost",
            round: "",
            onClick: _cache[2] || (_cache[2] = ($event) => emit("back"))
          }, {
            icon: withCtx(() => [
              createVNode(unref(__unplugin_components_0))
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("onboarding.back")), 1)
            ]),
            _: 1
          }),
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "flex-1" }, null, -1)),
          createVNode(_component_SButton, {
            type: "primary",
            round: "",
            onClick: _cache[3] || (_cache[3] = ($event) => emit("next"))
          }, {
            icon: withCtx(() => [
              createVNode(unref(__unplugin_components_5))
            ]),
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("onboarding.next")) + " ", 1)
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
const _hoisted_1$3 = { class: "flex flex-col max-w-2xl w-full mx-auto" };
const _hoisted_2$3 = { class: "flex items-center gap-3 mb-2" };
const _hoisted_3$3 = { class: "text-2xl font-bold" };
const _hoisted_4$3 = { class: "text-on-surface-variant/70 mb-6 leading-relaxed" };
const _hoisted_5$3 = { class: "bg-on-surface/4 border border-solid border-primary/10 rounded-xl p-4 mb-6" };
const _hoisted_6$3 = { class: "flex items-center gap-3" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "StepLibrary",
  emits: ["next", "back"],
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      const _component_FolderManager = _sfc_main$9;
      const _component_SButton = _sfc_main$7;
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$3, [
          createVNode(unref(IconLucideFolder), { class: "size-6 text-primary" }),
          createBaseVNode("h2", _hoisted_3$3, toDisplayString(unref(t)("onboarding.library.title")), 1)
        ]),
        createBaseVNode("p", _hoisted_4$3, toDisplayString(unref(t)("onboarding.library.subtitle")), 1),
        createBaseVNode("div", _hoisted_5$3, [
          createVNode(_component_FolderManager)
        ]),
        createBaseVNode("div", _hoisted_6$3, [
          createVNode(_component_SButton, {
            variant: "ghost",
            round: "",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("back"))
          }, {
            icon: withCtx(() => [
              createVNode(unref(__unplugin_components_0))
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("onboarding.back")), 1)
            ]),
            _: 1
          }),
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "flex-1" }, null, -1)),
          createVNode(_component_SButton, {
            type: "primary",
            round: "",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("next"))
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("onboarding.next")), 1)
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
const _hoisted_1$2 = { class: "flex flex-col max-w-2xl w-full mx-auto" };
const _hoisted_2$2 = { class: "flex items-center gap-3 mb-2" };
const _hoisted_3$2 = { class: "text-2xl font-bold" };
const _hoisted_4$2 = { class: "text-on-surface-variant/70 mb-6 leading-relaxed" };
const _hoisted_5$2 = { class: "bg-on-surface/4 border border-solid border-primary/10 rounded-xl p-5 mb-4" };
const _hoisted_6$2 = { class: "flex flex-col gap-3" };
const _hoisted_7$2 = { class: "text-sm" };
const _hoisted_8$2 = { class: "flex items-center gap-3" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "StepStreaming",
  emits: ["next", "back"],
  setup(__props) {
    const { t } = useI18n();
    const SERVERS = ["subsonic", "navidrome", "jellyfin", "emby"];
    return (_ctx, _cache) => {
      const _component_SAlert = _sfc_main$a;
      const _component_SButton = _sfc_main$7;
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          createVNode(unref(IconLucideServer), { class: "size-6 text-primary" }),
          createBaseVNode("h2", _hoisted_3$2, toDisplayString(unref(t)("onboarding.streaming.title")), 1)
        ]),
        createBaseVNode("p", _hoisted_4$2, toDisplayString(unref(t)("onboarding.streaming.subtitle")), 1),
        createBaseVNode("div", _hoisted_5$2, [
          createBaseVNode("div", _hoisted_6$2, [
            (openBlock(), createElementBlock(Fragment, null, renderList(SERVERS, (key) => {
              return createBaseVNode("div", {
                key,
                class: "flex items-center gap-3"
              }, [
                createVNode(unref(__unplugin_components_7), { class: "size-4 text-primary shrink-0" }),
                createBaseVNode("span", _hoisted_7$2, toDisplayString(unref(t)(`onboarding.streaming.servers.${key}`)), 1)
              ]);
            }), 64))
          ])
        ]),
        createVNode(_component_SAlert, { class: "mb-6" }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("onboarding.streaming.hint")), 1)
          ]),
          _: 1
        }),
        createBaseVNode("div", _hoisted_8$2, [
          createVNode(_component_SButton, {
            variant: "ghost",
            round: "",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("back"))
          }, {
            icon: withCtx(() => [
              createVNode(unref(__unplugin_components_0))
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("onboarding.back")), 1)
            ]),
            _: 1
          }),
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "flex-1" }, null, -1)),
          createVNode(_component_SButton, {
            type: "primary",
            round: "",
            onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("next"))
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("onboarding.next")), 1)
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "flex flex-col max-w-2xl w-full mx-auto" };
const _hoisted_2$1 = { class: "flex items-center gap-3 mb-2" };
const _hoisted_3$1 = { class: "text-2xl font-bold" };
const _hoisted_4$1 = { class: "text-on-surface-variant/70 mb-6 leading-relaxed" };
const _hoisted_5$1 = { class: "bg-on-surface/4 border border-solid border-primary/10 rounded-xl p-5 mb-6" };
const _hoisted_6$1 = { class: "flex flex-col gap-3" };
const _hoisted_7$1 = { class: "flex-1" };
const _hoisted_8$1 = { class: "text-sm font-medium" };
const _hoisted_9$1 = { class: "text-xs text-on-surface-variant/60 mt-0.5 leading-relaxed" };
const _hoisted_10$1 = { class: "flex items-center gap-3" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "StepHotkeys",
  props: {
    loading: { type: Boolean }
  },
  emits: ["next", "back"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    const TIPS = ["global", "local", "customize"];
    return (_ctx, _cache) => {
      const _component_SButton = _sfc_main$7;
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createVNode(unref(IconLucideKeyboard), { class: "size-6 text-primary" }),
          createBaseVNode("h2", _hoisted_3$1, toDisplayString(unref(t)("onboarding.hotkeys.title")), 1)
        ]),
        createBaseVNode("p", _hoisted_4$1, toDisplayString(unref(t)("onboarding.hotkeys.subtitle")), 1),
        createBaseVNode("div", _hoisted_5$1, [
          createBaseVNode("div", _hoisted_6$1, [
            (openBlock(), createElementBlock(Fragment, null, renderList(TIPS, (tip) => {
              return createBaseVNode("div", {
                key: tip,
                class: "flex items-start gap-3"
              }, [
                createVNode(unref(__unplugin_components_7), { class: "size-4 text-primary shrink-0 mt-0.5" }),
                createBaseVNode("div", _hoisted_7$1, [
                  createBaseVNode("div", _hoisted_8$1, toDisplayString(unref(t)(`onboarding.hotkeys.tips.${tip}.title`)), 1),
                  createBaseVNode("div", _hoisted_9$1, toDisplayString(unref(t)(`onboarding.hotkeys.tips.${tip}.desc`)), 1)
                ])
              ]);
            }), 64))
          ])
        ]),
        createBaseVNode("div", _hoisted_10$1, [
          createVNode(_component_SButton, {
            variant: "ghost",
            round: "",
            disabled: __props.loading,
            onClick: _cache[0] || (_cache[0] = ($event) => emit("back"))
          }, {
            icon: withCtx(() => [
              createVNode(unref(__unplugin_components_0))
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("onboarding.back")), 1)
            ]),
            _: 1
          }, 8, ["disabled"]),
          _cache[2] || (_cache[2] = createBaseVNode("div", { class: "flex-1" }, null, -1)),
          createVNode(_component_SButton, {
            type: "primary",
            round: "",
            loading: __props.loading,
            onClick: _cache[1] || (_cache[1] = ($event) => emit("next"))
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("onboarding.finish")), 1)
            ]),
            _: 1
          }, 8, ["loading"])
        ])
      ]);
    };
  }
});
const _hoisted_1 = { class: "flex flex-col h-screen w-screen bg-app text-on-surface overflow-hidden" };
const _hoisted_2 = { class: "app-drag-region h-16 shrink-0 flex items-center justify-end px-3" };
const _hoisted_3 = { class: "flex-1 min-h-0 flex flex-col items-center px-8 py-6" };
const _hoisted_4 = { class: "w-full max-w-2xl flex-1 min-h-0 flex flex-col" };
const _hoisted_5 = { class: "flex items-center gap-4 mb-8 shrink-0" };
const _hoisted_6 = { class: "flex-1 flex items-center gap-1.5" };
const _hoisted_7 = { class: "text-xs text-on-surface-variant/50 tabular-nums shrink-0" };
const _hoisted_8 = { class: "relative flex-1 min-h-0 flex flex-col" };
const _hoisted_9 = { class: "shrink-0 text-center pt-3 pb-5" };
const _hoisted_10 = { class: "text-xs text-on-surface-variant/40" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Onboarding",
  setup(__props) {
    const { t } = useI18n();
    const router = useRouter();
    const settings = useSettingsStore();
    const STEPS = [
      { key: "welcome", component: _sfc_main$5 },
      { key: "agreement", component: _sfc_main$b },
      { key: "preferences", component: _sfc_main$4 },
      { key: "library", component: _sfc_main$3 },
      { key: "streaming", component: _sfc_main$2 },
      { key: "hotkeys", component: _sfc_main$1 }
    ];
    const currentIndex = ref(0);
    const direction = ref("forward");
    const currentStep = computed(() => STEPS[currentIndex.value]);
    const isFirst = computed(() => currentIndex.value === 0);
    const isLast = computed(() => currentIndex.value === STEPS.length - 1);
    const goNext = async () => {
      if (isLast.value) {
        await complete();
        return;
      }
      direction.value = "forward";
      currentIndex.value += 1;
    };
    const goBack = () => {
      if (isFirst.value) return;
      direction.value = "backward";
      currentIndex.value -= 1;
    };
    const completing = ref(false);
    const complete = async () => {
      if (completing.value) return;
      completing.value = true;
      try {
        await settings.setSystem("system.onboardingCompleted", true);
        await settings.setSystem("system.agreedAgreementVersion", CURRENT_AGREEMENT_VERSION);
        await router.replace("/");
      } finally {
        completing.value = false;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(__unplugin_components_9, { "direct-quit": "" })
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("header", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                (openBlock(), createElementBlock(Fragment, null, renderList(STEPS, (step, index) => {
                  return createBaseVNode("span", {
                    key: step.key,
                    class: normalizeClass([
                      "h-1.5 rounded-full transition-all duration-300",
                      index === unref(currentIndex) ? "flex-2 bg-primary" : index < unref(currentIndex) ? "flex-1 bg-primary/60" : "flex-1 bg-on-surface/12"
                    ])
                  }, null, 2);
                }), 64))
              ]),
              createBaseVNode("span", _hoisted_7, toDisplayString(unref(currentIndex) + 1) + " / " + toDisplayString(STEPS.length), 1)
            ]),
            createBaseVNode("div", _hoisted_8, [
              createVNode(Transition, {
                name: unref(direction) === "forward" ? "slide-fwd" : "slide-back",
                mode: "out-in"
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(currentStep).component), {
                    key: unref(currentStep).key,
                    loading: unref(completing),
                    onNext: goNext,
                    onBack: goBack
                  }, null, 40, ["loading"]))
                ]),
                _: 1
              }, 8, ["name"])
            ])
          ])
        ]),
        createBaseVNode("footer", _hoisted_9, [
          createBaseVNode("span", _hoisted_10, toDisplayString(unref(t)("onboarding.footer")), 1)
        ])
      ]);
    };
  }
});
const Onboarding = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-645d97ec"]]);
export {
  Onboarding as default
};
