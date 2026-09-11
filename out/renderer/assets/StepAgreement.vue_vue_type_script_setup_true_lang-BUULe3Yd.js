import { _ as _sfc_main$2 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as _sfc_main$1 } from "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import { f, _ as __unplugin_components_0, b as __unplugin_components_2 } from "./log-out-nJ93UQya.js";
import { I as IconLucideFileText, _ as __unplugin_components_5 } from "./file-text-DIJIO1O_.js";
import { u as useI18n } from "./index-DVKNk9gd.js";
import { x as defineComponent, k as onMounted, n as nextTick, y as createElementBlock, z as createBaseVNode, D as createVNode, v as unref, O as toDisplayString, Q as withCtx, i as isRef, M as normalizeClass, P as createBlock, c as computed, r as ref, W as createTextVNode, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const CURRENT_AGREEMENT_VERSION = 3;
const agreementRaw = "<!-- agreement-version: 3 -->\n\n# SPlayer Next 用户协议与免责声明\n\n**版本：v1.2**<br>\n**生效日期：2026 年 5 月 29 日**<br>\n**最近更新：2026 年 8 月 12 日**\n\n欢迎使用 SPlayer Next（以下简称“本软件”）。本软件是一款免费、开源的跨平台桌面音乐播放器。在您下载、安装、复制、运行或以任何方式使用本软件之前，请务必认真阅读并充分理解本协议的全部内容，**尤其是以加粗或其他显著方式标识的免除或限制责任、争议解决与适用法律等条款**。\n\n如您不同意本协议的任何内容，请立即停止安装与使用并删除本软件。**您一旦下载、安装或使用本软件，即视为已阅读、理解并同意接受本协议的全部条款。** 若您是未成年人，请在监护人陪同下阅读并决定是否使用本软件。\n\n---\n\n## 一、名词定义\n\n为便于理解，本协议中下列术语的含义如下：\n\n- **“开发者”**：指本软件的著作权人及开源贡献者，即 GitHub 组织 `SPlayer-Dev` 及项目作者。\n- **“用户”/“您”**：指下载、安装或使用本软件的个人或组织。\n- **“本地内容”**：指存储于您自有设备本地或您有权访问的存储介质中的音频文件。\n- **“在线平台”**：指由第三方独立运营的公开在线音乐服务平台。\n- **“自建媒体服务器”**：指由您自行部署或有权访问的 Subsonic / Navidrome / OpenSubsonic / Airsonic / Gonic / LMS / Jellyfin / Emby 等媒体服务。\n- **“第三方插件”/“音源”**：指由您自本地或网络导入的、用于扩展本软件音乐能力的第三方脚本（包括兼容 LX Music 格式的插件），其由第三方社区开发与维护。\n\n---\n\n## 二、软件性质与定位\n\n2.1 本软件是一款**纯客户端工具软件（Client-side Tool Software）**，其核心功能为：对您本地设备中的音频文件进行解码、播放、整理与管理，并在您主动配置的前提下，作为客户端与上述在线平台、自建媒体服务器或第三方插件进行交互。\n\n2.2 本软件作为自由软件免费提供。开发者不因软件的免费提供而承诺任何商业服务、持续维护或特定用途支持；您对软件的使用、复制、修改与再分发权利以 AGPL-3.0 为准。\n\n2.3 本软件**自身不提供、不存储、不缓存（除必要的本地播放缓存外）、不分发任何音频内容资源**，亦**不内置、不预置任何在线平台账号、第三方音源或受版权保护的内容**。本软件不是内容提供者、不是信息发布平台、不是网络存储服务提供者。\n\n2.4 本软件中一切音频、封面、歌词等内容均来源于：（a）您的本地内容；（b）您主动连接的在线平台或自建媒体服务器；（c）您主动导入的第三方插件所返回的数据。开发者对上述内容的合法性、准确性、完整性、可用性及时效性均不作任何担保，亦不承担任何责任。\n\n---\n\n## 三、开源许可（AGPL-3.0）\n\n3.1 本软件依据 **GNU Affero General Public License v3.0（AGPL-3.0）** 授权发布。完整许可证文本见随附的 `LICENSE` 文件。\n\n3.2 您在使用、复制、修改或再分发本软件时，必须遵守 AGPL-3.0 的全部约定，包括但不限于：\n\n- 保留原始版权声明、许可声明与免责声明；\n- 在分发本软件或其衍生作品时，向接收方提供完整且可构建的对应源代码；\n- 对所作的修改予以显著标识；\n- 不得对本软件附加任何与 AGPL-3.0 相抵触的额外限制。\n\n  3.3 **网络远程交互条款（AGPL 核心）**：若您修改本软件，并通过计算机网络向第三方提供与之交互的服务（包括但不限于 Web、API 或远程访问），您必须依据 AGPL-3.0 第 13 条向该等用户提供您所运行版本的完整对应源代码。\n\n  3.4 本软件官方源代码托管地址为：<https://github.com/SPlayer-Dev/SPlayer-Next>。\n\n  3.5 本协议用于说明软件功能、第三方服务风险、商标与适用法律等事项，不限制 AGPL-3.0 已授予的权利。当本协议与 AGPL-3.0 存在冲突时，**以 AGPL-3.0 为准**。\n\n---\n\n## 四、授权范围与使用限制\n\n4.1 您可以在遵守 AGPL-3.0 的前提下使用、复制、修改和再分发本软件，包括将其用于个人、研究或商业场景。本协议不撤销或缩减 AGPL-3.0 授予的许可。\n\n4.2 您**不得**实施下列行为：\n\n- 利用本软件从事任何违反您所在国家或地区法律法规的活动；\n- 将本软件用于侵犯任何第三方著作权、邻接权、商标权或其他合法权益的用途；\n- 绕过、破坏在线平台或自建媒体服务器的技术保护措施、访问控制或服务条款；\n- 以可能造成官方关联、授权或背书混淆的方式使用本软件的名称、标识或视觉资产；\n- 借助本软件进行批量抓取、爬取、转售内容，或搭建对外提供受版权内容的服务。\n\n---\n\n## 五、在线功能与第三方服务（重点条款）\n\n**本条为本软件法律风险的核心提示，请您务必仔细阅读。**\n\n### 5.1 在线平台接入\n\n5.1.1 本软件提供与第三方在线平台进行交互的**通用客户端能力**。该等能力的工作原理为：在您主动发起请求时，从相关平台**公开**的服务接口拉取数据，经必要的筛选、整理后在本地呈现。\n\n5.1.2 上述在线平台**均由其各自的运营方独立运营，与开发者无任何关联、合作或授权关系**。您对在线平台的访问与使用，同时受该平台自身的用户协议、隐私政策及版权规则约束，您应自行阅读并遵守。\n\n5.1.3 开发者不控制、不干预、不参与在线平台的数据生产与传输过程，对其内容的合法性、可用性、稳定性及因平台规则调整、接口变更、账号封禁等导致的功能失效不承担任何责任。\n\n### 5.2 自建媒体服务器\n\n5.2.1 本软件支持连接由**您自行部署或有权访问**的自建媒体服务器。相关服务器地址、账号、密码等连接信息均由您自行提供与保管。\n\n5.2.2 您应确保您对所连接服务器及其中内容拥有合法的访问与使用权利。因您连接的服务器内容违法、侵权或服务器自身故障所产生的一切后果，由您自行承担。\n\n### 5.3 第三方插件与音源\n\n5.3.1 本软件提供**开放的插件扩展机制**（包括对 LX Music 格式插件的兼容）以及可选的插件市场。插件市场用于索引和分发由第三方提交的插件，不代表插件由本软件开发者创作或运营。\n\n5.3.2 市场插件会经过自动规则检查和维护者审核，但该流程**不构成完整安全审计、合法性确认或官方背书**。第三方插件由社区独立开发与维护，开发者无法持续控制其外部服务与返回内容，对其合法性、安全性、稳定性和准确性不作担保。通过本地或网络地址自行导入的插件不经过市场审核。\n\n5.3.3 第三方插件本质上为可执行脚本，可能存在安全风险（如恶意代码、数据窃取等）。**您应自行评估并审慎导入来源不明的插件，由此产生的一切风险与后果由您自行承担。**\n\n### 5.4 版权数据处理义务\n\n5.4.1 您在使用本软件与在线平台或第三方插件交互的过程中，可能产生受版权保护的临时数据（如播放链接、歌曲信息、歌词、封面等）。**对于该等版权数据，开发者及本软件不主张任何所有权。**\n\n5.4.2 您对该等数据的访问、保存、使用与传播应符合适用法律、内容权利人的授权以及对应平台的服务条款。本软件不因提供技术处理能力而向您授予任何第三方内容权利；请通过合法渠道获取内容并尊重版权方。\n\n### 5.5 外部接口与自动化控制（MCP / API）\n\n5.5.1 本软件提供的外部 HTTP / WebSocket API 及 MCP（Model Context Protocol）接口为中立的技术控制能力。\n\n5.5.2 若您使用人工智能 Agent、自动化脚本或第三方工具通过上述接口与本软件进行交互或控制，因此产生的任何设备操作、指令执行、数据变更或安全风险，均由您自行评估并承担全部责任。\n\n---\n\n## 六、账号与凭据\n\n6.1 当您主动登录在线平台或连接自建媒体服务器时，本软件可能需要处理相应的账号、密码、Cookie、令牌等凭据。\n\n6.2 上述凭据**仅用于您所请求的功能本身**，并**仅存储于您的本地设备**。流媒体服务器密码与 Last.fm 会话密钥优先通过操作系统提供的 `safeStorage` 加密保存；若安全存储不可用，会退化为 Base64 编码并记录警告。AI 模型 API Key 在安全存储不可用时会拒绝保存。Base64 不等同于加密。开发者不会将这些凭据上传至开发者控制的服务器。\n\n6.3 您有义务妥善保管自身账号与凭据。因您泄露凭据、设备失窃或操作不当造成的损失，由您自行承担。\n\n---\n\n## 七、知识产权\n\n7.1 本软件本体（不含第三方开源组件及第三方插件）的著作权及其他知识产权，在 AGPL-3.0 授权范围之外，归开发者所有。\n\n7.2 “SPlayer”“SPlayer Next”等名称、标识及相关视觉设计的权益归开发者所有，未经许可，您不得用于可能造成混淆、误导或商业目的的场景。\n\n7.3 本软件不对您经由其访问的任何第三方内容主张权利，亦不构成对该等内容的任何授权或许可。各在线平台、自建媒体服务器及第三方插件中内容的知识产权，归其各自权利人所有。\n\n---\n\n## 八、用户行为与法律责任\n\n8.1 您承诺以合法、正当的方式使用本软件，并对自身的一切使用行为及其后果独立承担全部法律责任。\n\n8.2 您通过本软件播放、下载、处理或管理的任何内容，应至少满足下列条件之一：您依法拥有该内容的著作权或邻接权；您已取得权利人的合法授权；或属于法律允许的合理使用范畴。\n\n8.3 本软件**不对用户行为进行监控、审查、过滤或干预**，开发者对用户因下列行为产生的任何争议、索赔或法律责任不承担责任：版权侵权、非法传播、商业滥用、违反在线平台服务条款，或违反所在地监管政策等。\n\n8.4 如因您违反本协议或相关法律法规，导致开发者遭受第三方索赔、行政处罚或其他损失的，您应当负责赔偿并使开发者免责。\n\n---\n\n## 九、隐私与数据\n\n9.1 本软件**不收集、不上传任何可识别您个人身份的信息（PII）**，也**不包含任何遥测或使用统计机制**。具体的个人信息与数据处理规则，请参阅随附的《隐私政策》。\n\n9.2 本软件运行所需的全部数据（包括配置、音乐库索引、播放队列、播放历史与收藏记录、封面缓存、日志等）**均存储于您的本地设备**，由您完全掌控，可随时清除。播放统计仅在本地生成与使用，用于向您本人呈现使用数据。\n\n9.3 当您使用涉及网络的功能（在线平台、自建媒体服务器、第三方插件、检查更新等）时，相应的网络请求会直接在您的设备与对应的第三方服务之间进行，该等数据交互由您自行发起与控制，并受相应第三方的隐私政策约束。\n\n9.4 本软件可选支持 Discord 状态展示等集成功能，仅在您主动启用时生效，相关信息按对应第三方服务的规则处理。\n\n---\n\n## 十、官方分发渠道与安全风险\n\n10.1 **官方渠道**：本软件的官方版本信息与原始安装包发布于 GitHub 仓库 <https://github.com/SPlayer-Dev/SPlayer-Next>，官方网站 <https://splayer-next.imsyy.top> 提供文档与下载入口。\n\n10.2 **第三方线路与再分发**：官方网站可能提供第三方下载加速线路，它们仅代理 GitHub 上的官方资源，请求会经过相应第三方服务。除此之外，第三方网站、网盘、应用商店、论坛或个人提供的转载、重新打包或再分发均不受开发者控制，**不构成官方发布行为**。\n\n10.3 **安全风险提示**：通过非官方渠道获取的安装包可能存在被篡改、植入恶意代码、捆绑广告或后门、窃取数据、功能异常或版本过期等风险。**因使用非官方版本所致的任何损失、数据泄露、安全事件或法律风险，均由您自行承担，开发者概不负责。**\n\n---\n\n## 十一、软件更新\n\n11.1 本软件可能内置在线检查与下载更新的功能，用于获取官方仓库发布的新版本。更新功能的启用与执行以您的选择为准。\n\n11.2 开发者不保证为任何特定版本提供持续更新或维护，亦有权随时变更、暂停或终止本软件的开发与发布。\n\n---\n\n## 十二、第三方开源组件\n\n12.1 本软件使用了若干第三方开源软件与库（如 Electron、Vue、FFmpeg、rodio 等）。各组件的著作权与许可证归其原作者所有。\n\n12.2 您在使用本软件时，应同时遵守相关第三方组件各自许可证的约定。相关声明以项目源代码及其依赖清单中的许可信息为准。\n\n---\n\n## 十三、免责声明\n\n13.1 **本软件按“现状（AS IS）”与“现有可用（AS AVAILABLE）”提供**，开发者不对本软件作出任何明示或默示的保证。\n\n13.2 在适用法律允许的最大范围内，开发者明确否认下列默示担保，包括但不限于：适销性、特定用途适用性、不侵权、所有权担保、持续可用性及数据完整性。\n\n13.3 开发者**不保证**：本软件无任何缺陷或错误；本软件运行不中断、绝对安全或不受病毒侵害；本软件与您的全部软硬件环境兼容；任何在线功能或第三方服务持续可用。\n\n13.4 对于因使用或无法使用本软件，或因在线平台、自建媒体服务器、第三方插件而产生的下列情形，开发者不承担责任：数据丢失或损坏、设备故障、业务中断、收益或商誉损失、安全漏洞被利用，以及任何违法使用所致的后果。\n\n---\n\n## 十四、责任限制\n\n14.1 在适用法律允许的最大范围内，无论基于合同、侵权或任何其他法律理论，**开发者对您或任何第三方均不承担任何间接、附带、特殊、惩罚性或后果性损害赔偿责任**。\n\n14.2 在任何情况下，开发者就本协议及本软件所应承担的赔偿责任总额，**以您为获取本软件而向开发者实际支付的费用（如有）为限；鉴于本软件免费提供，该上限通常为人民币 0 元（¥0.00）。**\n\n14.3 部分国家或地区的法律不允许排除或限制某些默示担保或特定损害责任，在该等法律强制适用的范围内，上述免责与责任限制可能不适用于您；但本协议各项免责与责任限制在法律允许的最大范围内仍然有效。\n\n---\n\n## 十五、未成年人保护\n\n15.1 本软件不面向无民事行为能力人专门设计。若您为限制民事行为能力人，请在监护人的同意与指导下使用本软件。\n\n15.2 监护人应承担起对未成年人使用本软件的监督责任，并就未成年人的使用行为及后果负责。\n\n---\n\n## 十六、协议的变更\n\n16.1 开发者有权根据法律法规变化或软件功能调整，适时修订本协议。修订后的协议将随新版本软件或在官方渠道发布。\n\n16.2 协议修订后，您继续使用本软件即视为接受修订后的内容；若您不同意，应停止使用本软件。\n\n---\n\n## 十七、适用法律与争议解决\n\n17.1 本协议的订立、效力、解释、履行及争议解决，均适用**中华人民共和国大陆地区**的法律（不含其冲突法规则）。如您在其他法域使用本软件，您还应遵守当地适用的强制性法律规定。\n\n17.2 因本协议引起的或与本协议相关的任何争议，双方应首先友好协商解决；协商不成的，任一方均可依法向有管辖权的人民法院提起诉讼。\n\n---\n\n## 十八、其他条款\n\n18.1 **可分割性**：本协议任一条款被认定为无效或不可执行的，不影响其余条款的效力，该等条款应在法律允许范围内被尽可能贴近原意地解释执行。\n\n18.2 **完整协议**：本协议、随附的《隐私政策》连同 AGPL-3.0 及第三方组件许可，构成您与开发者之间就本软件使用所达成的完整约定。《隐私政策》作为本协议不可分割的组成部分，与本协议具有同等法律效力。\n\n18.3 **不弃权**：开发者未行使或延迟行使本协议项下任何权利，不构成对该权利的放弃。\n\n18.4 **无背书关系**：本协议不在您与开发者之间设立任何代理、合伙、雇佣或合营关系；本软件对其交互的任何第三方服务均不作背书或担保。\n\n---\n\n## 十九、联系方式\n\n如对本协议有任何疑问、意见或需要反馈问题，您可通过以下方式联系：\n\n- **GitHub 仓库**：<https://github.com/SPlayer-Dev/SPlayer-Next>\n- **问题反馈**：<https://github.com/SPlayer-Dev/SPlayer-Next/issues>\n- **官方网站**：<https://splayer-next.imsyy.top>\n- **电子邮箱**：imsyy1024@gmail.com\n\n---\n\n_本软件为自由软件（Free Software），免费提供且不附带任何商业服务承诺。请尊重音乐版权，支持正版，理性使用。_\n";
const _hoisted_1 = { class: "flex flex-col h-full w-full" };
const _hoisted_2 = { class: "flex items-center gap-3 mb-2 shrink-0" };
const _hoisted_3 = { class: "text-2xl font-bold" };
const _hoisted_4 = { class: "text-on-surface-variant/70 mb-4 leading-relaxed shrink-0" };
const _hoisted_5 = ["innerHTML"];
const _hoisted_6 = { class: "shrink-0 flex items-center gap-2.5 my-4" };
const _hoisted_7 = { class: "text-xs" };
const _hoisted_8 = { class: "flex items-center gap-3 shrink-0" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StepAgreement",
  props: {
    variant: { default: "onboarding" },
    loading: { type: Boolean, default: false }
  },
  emits: ["next", "back", "reject"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    const props = __props;
    const isUpdate = computed(() => props.variant === "update");
    const titleKey = computed(
      () => isUpdate.value ? "agreementUpdate.title" : "onboarding.agreement.title"
    );
    const subtitleKey = computed(
      () => isUpdate.value ? "agreementUpdate.subtitle" : "onboarding.agreement.subtitle"
    );
    const acceptKey = computed(
      () => isUpdate.value ? "agreementUpdate.accept" : "onboarding.agreement.accept"
    );
    const agreementHtml = f.parse(agreementRaw, { async: false });
    const scrollArea = ref(null);
    const readToEnd = ref(false);
    const agreed = ref(false);
    const canContinue = computed(() => readToEnd.value && agreed.value);
    const checkScroll = () => {
      const element = scrollArea.value;
      if (!element) return;
      if (element.scrollTop + element.clientHeight >= element.scrollHeight - 8) {
        readToEnd.value = true;
      }
    };
    onMounted(() => {
      nextTick(checkScroll);
    });
    const handleContinue = () => {
      if (!canContinue.value) return;
      emit("next");
    };
    return (_ctx, _cache) => {
      const _component_SCheckbox = _sfc_main$1;
      const _component_SButton = _sfc_main$2;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(unref(IconLucideFileText), { class: "size-6 text-primary" }),
          createBaseVNode("h2", _hoisted_3, toDisplayString(unref(t)(unref(titleKey))), 1)
        ]),
        createBaseVNode("p", _hoisted_4, toDisplayString(unref(t)(unref(subtitleKey))), 1),
        createBaseVNode("div", {
          ref_key: "scrollArea",
          ref: scrollArea,
          class: "markdown-body flex-1 min-h-0 overflow-y-auto px-5 py-4 bg-on-surface/4 border border-solid border-primary/10 rounded-xl",
          onScroll: checkScroll,
          innerHTML: unref(agreementHtml)
        }, null, 40, _hoisted_5),
        createBaseVNode("div", _hoisted_6, [
          createVNode(_component_SCheckbox, {
            checked: unref(agreed),
            "onUpdate:checked": _cache[0] || (_cache[0] = ($event) => isRef(agreed) ? agreed.value = $event : null),
            disabled: !unref(readToEnd),
            size: "small"
          }, {
            default: withCtx(() => [
              createBaseVNode("span", _hoisted_7, toDisplayString(unref(t)("onboarding.agreement.agree")), 1)
            ]),
            _: 1
          }, 8, ["checked", "disabled"]),
          createBaseVNode("span", {
            class: normalizeClass(["text-xs text-on-surface-variant/40 transition-opacity", unref(readToEnd) ? "opacity-0" : "opacity-100"])
          }, toDisplayString(unref(t)("onboarding.agreement.scrollHint")), 3)
        ]),
        createBaseVNode("div", _hoisted_8, [
          !unref(isUpdate) ? (openBlock(), createBlock(_component_SButton, {
            key: 0,
            variant: "ghost",
            round: "",
            disabled: __props.loading,
            onClick: _cache[1] || (_cache[1] = ($event) => emit("back"))
          }, {
            icon: withCtx(() => [
              createVNode(unref(__unplugin_components_0))
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("onboarding.back")), 1)
            ]),
            _: 1
          }, 8, ["disabled"])) : (openBlock(), createBlock(_component_SButton, {
            key: 1,
            variant: "secondary",
            round: "",
            disabled: __props.loading,
            onClick: _cache[2] || (_cache[2] = ($event) => emit("reject"))
          }, {
            icon: withCtx(() => [
              createVNode(unref(__unplugin_components_2))
            ]),
            default: withCtx(() => [
              createTextVNode(" " + toDisplayString(unref(t)("agreementUpdate.reject")), 1)
            ]),
            _: 1
          }, 8, ["disabled"])),
          _cache[3] || (_cache[3] = createBaseVNode("div", { class: "flex-1" }, null, -1)),
          createVNode(_component_SButton, {
            type: "primary",
            round: "",
            disabled: !unref(canContinue),
            loading: __props.loading,
            onClick: handleContinue
          }, {
            icon: withCtx(() => [
              createVNode(unref(__unplugin_components_5))
            ]),
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)(unref(acceptKey))) + " ", 1)
            ]),
            _: 1
          }, 8, ["disabled", "loading"])
        ])
      ]);
    };
  }
});
export {
  CURRENT_AGREEMENT_VERSION as C,
  _sfc_main as _
};
