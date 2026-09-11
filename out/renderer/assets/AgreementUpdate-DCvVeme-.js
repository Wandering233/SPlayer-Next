import { _ as _sfc_main$1, C as CURRENT_AGREEMENT_VERSION } from "./StepAgreement.vue_vue_type_script_setup_true_lang-BUULe3Yd.js";
import { u as useWindowControls, a as __unplugin_components_9 } from "./log-out-nJ93UQya.js";
import { a as useSettingsStore, c as useRouter } from "./index-DVKNk9gd.js";
import { x as defineComponent, y as createElementBlock, z as createBaseVNode, D as createVNode, v as unref, r as ref, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import "./SLoading-C4RltnK4.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import "./check-BXlOuXWK.js";
import "./copy-DhNjJWGd.js";
import "./file-text-DIJIO1O_.js";
import "./x-Cd6Sow4a.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
const _hoisted_1 = { class: "flex flex-col h-screen w-screen bg-app text-on-surface overflow-hidden" };
const _hoisted_2 = { class: "app-drag-region h-16 shrink-0 flex items-center justify-end px-3" };
const _hoisted_3 = { class: "flex-1 min-h-0 flex flex-col items-center px-8 pb-10" };
const _hoisted_4 = { class: "w-full max-w-2xl flex-1 min-h-0 flex flex-col" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AgreementUpdate",
  setup(__props) {
    const router = useRouter();
    const settings = useSettingsStore();
    const { quit } = useWindowControls();
    const accepting = ref(false);
    const onAccept = async () => {
      if (accepting.value) return;
      accepting.value = true;
      try {
        await settings.setSystem("system.agreedAgreementVersion", CURRENT_AGREEMENT_VERSION);
        await router.replace("/");
      } finally {
        accepting.value = false;
      }
    };
    return (_ctx, _cache) => {
      const _component_WindowControls = __unplugin_components_9;
      const _component_StepAgreement = _sfc_main$1;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_component_WindowControls, { "direct-quit": "" })
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            createVNode(_component_StepAgreement, {
              variant: "update",
              loading: unref(accepting),
              onNext: onAccept,
              onReject: unref(quit)
            }, null, 8, ["loading", "onReject"])
          ])
        ])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
