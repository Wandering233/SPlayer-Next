import { _ as _sfc_main$1 } from "./CoverList.vue_vue_type_script_setup_true_lang-ChKIaOwW.js";
import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode, c as computed, r as ref, q as shallowRef, w as watch, x as defineComponent, k as onMounted, O as toDisplayString, v as unref, F as Fragment, N as renderList, P as createBlock, Q as withCtx, B as createCommentVNode, D as createVNode, M as normalizeClass, W as createTextVNode, R as resolveDynamicComponent } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { _ as _sfc_main$2 } from "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import { _ as __unplugin_components_4 } from "./plus-BEApKDpl.js";
import { _ as _sfc_main$5 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as __unplugin_components_0$1 } from "./play-jYzYuagg.js";
import { _ as _sfc_main$4 } from "./STag.vue_vue_type_script_setup_true_lang-BMwlvLeL.js";
import { _ as _sfc_main$3 } from "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import { u as useI18n, aa as useUserStore, ar as useHistoryStore, t as toast, as as insertManyToQueue, at as playFrom, d as useStatusStore, p as playPersonalFm, c as useRouter, ao as useThrottleFn, af as playNow, au as fetchRecommendPlaylists, av as fetchRadarPlaylists, aw as fetchArtists, ax as fetchNewAlbums, aj as navigateToPlaylist, a9 as navigateToArtist, ak as navigateToAlbum } from "./index-DVKNk9gd.js";
import { u as useDataStore } from "./data-BvtPKRYl.js";
import { u as useHeartMode, I as IconHeart } from "./useHeartMode-Ctx9Lz2B.js";
import { _ as __unplugin_components_0 } from "./calendar-days-C7nDG-8s.js";
import { _ as __unplugin_components_6$1 } from "./radio-WITe2XXZ.js";
import { u as useFloatingPlayerBar } from "./useFloatingPlayerBar-R2fVODYZ.js";
import "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import "./user-C_ofWqo5.js";
import "./SLoading-C4RltnK4.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./x-Cd6Sow4a.js";
import "./song-BGJnBQIx.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
const _hoisted_1$2 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$2, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
    }, null, -1)
  ])]);
}
const __unplugin_components_6 = markRaw({ name: "lucide-headphones", render: render$1 });
const PLAIN_KEYS = ["home.subtitle.plain1", "home.subtitle.plain2", "home.subtitle.plain3"];
const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];
const useHomeHeader = () => {
  const { t } = useI18n();
  const user = useUserStore();
  const history = useHistoryStore();
  const formatHm = (ms) => {
    const totalMin = Math.round(ms / 6e4);
    const hours = Math.floor(totalMin / 60);
    const minutes = totalMin % 60;
    if (hours > 0 && minutes > 0) return t("home.duration.hm", { hours, minutes });
    if (hours > 0) return t("home.duration.hours", { hours });
    return t("home.duration.minutes", { minutes });
  };
  const greetingKey = computed(() => {
    const hour = (/* @__PURE__ */ new Date()).getHours();
    if (hour < 6) return "home.greeting.dawn";
    if (hour < 12) return "home.greeting.morning";
    if (hour < 14) return "home.greeting.noon";
    if (hour < 18) return "home.greeting.afternoon";
    return "home.greeting.evening";
  });
  const greetingTitle = computed(() => {
    const greeting = t(greetingKey.value);
    const name = user.profile?.nickname;
    return name ? t("home.greetingLine", { greeting, name }) : greeting;
  });
  const stats = ref(null);
  const headerStats = computed(() => {
    const data = stats.value;
    return [
      {
        value: data ? (data.weekListenedMs / 36e5).toFixed(1) : "0",
        unit: t("home.stats.unitHour"),
        label: t("home.stats.weekDuration")
      },
      {
        value: String(data?.weekFavoriteAdds ?? 0),
        unit: t("home.stats.unitSong"),
        label: t("home.stats.newFavorites")
      },
      {
        value: String(data?.streakDays ?? 0),
        unit: t("home.stats.unitDay"),
        label: t("home.stats.listenStreak")
      }
    ];
  });
  const buildSubtitles = () => {
    const pool = PLAIN_KEYS.map((key) => ({ key }));
    const data = stats.value;
    if (data) {
      if (data.streakDays >= 2) {
        pool.push({ key: "home.subtitle.streak", days: data.streakDays });
      }
      if (data.weekListenedMs > 0) {
        pool.push({ key: "home.subtitle.weekListened", durationMs: data.weekListenedMs });
        const diff = data.weekListenedMs - data.lastWeekListenedMs;
        if (data.lastWeekListenedMs > 0 && Math.abs(diff) >= 6e4) {
          pool.push({
            key: diff > 0 ? "home.subtitle.weekMore" : "home.subtitle.weekLess",
            durationMs: Math.abs(diff)
          });
        }
      }
      if (data.weekFavoriteAdds > 0) {
        pool.push({ key: "home.subtitle.favorites", count: data.weekFavoriteAdds });
      }
    }
    const recentCount = history.tracks.length;
    if (recentCount > 0) {
      pool.push({ key: "home.subtitle.recent", count: recentCount });
    }
    return pool;
  };
  const subtitlePick = ref({ key: pickRandom(PLAIN_KEYS) });
  const greetingSub = computed(() => {
    const pick = subtitlePick.value;
    const params = {};
    if (pick.days !== void 0) params.days = pick.days;
    if (pick.count !== void 0) params.count = pick.count;
    if (pick.durationMs !== void 0) params.duration = formatHm(pick.durationMs);
    return t(pick.key, params);
  });
  const load = async () => {
    await history.load();
    try {
      stats.value = await window.api.stats.getStatsSummary();
    } catch (error) {
      console.warn("[home] getStatsSummary failed:", error);
    }
    subtitlePick.value = pickRandom(buildSubtitles());
  };
  return { greetingTitle, greetingSub, headerStats, load };
};
const LOCAL_RANDOM_LIMIT = 50;
const HERO_PREVIEW_COUNT = 4;
const randomIndex = (length) => Math.floor(Math.random() * length);
const toSource = (kind, tracks) => tracks.length > 0 ? { kind, featuredIndex: randomIndex(tracks.length), tracks } : null;
const useDailyRecommend = () => {
  const { t } = useI18n();
  const user = useUserStore();
  const data = useDataStore();
  const slide = shallowRef(null);
  const loading = ref(true);
  const hero = computed(() => {
    const current = slide.value;
    if (!current) return null;
    const featured = current.tracks[current.featuredIndex];
    return {
      kind: current.kind,
      tag: t(`home.hero.${current.kind}.tag`),
      title: t(`home.hero.${current.kind}.title`, { song: featured?.title ?? "" }),
      subtitle: t(`home.hero.${current.kind}.subtitle`, { count: current.tracks.length }),
      cover: featured?.cover
    };
  });
  const previewTracks = computed(() => {
    const current = slide.value;
    if (!current) return [];
    return [
      ...current.tracks.slice(current.featuredIndex),
      ...current.tracks.slice(0, current.featuredIndex)
    ].slice(0, HERO_PREVIEW_COUNT);
  });
  const tryBuild = async (kind) => {
    try {
      if (kind === "daily") return toSource("daily", await data.ensureDailyRecommend());
      if (kind === "liked") return toSource("liked", [...user.likedPlaylistTracks]);
      const res = await window.api.library.getRandomTracks(LOCAL_RANDOM_LIMIT);
      return toSource("local", res.success ? res.data ?? [] : []);
    } catch (error) {
      console.warn(`[home] hero source ${kind} failed:`, error);
      return null;
    }
  };
  const load = async () => {
    loading.value = true;
    const kinds = ["local"];
    if (user.isLoggedIn) kinds.push("daily");
    if (user.likedPlaylistTracks.length > 0) kinds.push("liked");
    const start = randomIndex(kinds.length);
    for (let offset = 0; offset < kinds.length; offset++) {
      const built = await tryBuild(kinds[(start + offset) % kinds.length]);
      if (built) {
        slide.value = built;
        break;
      }
    }
    loading.value = false;
  };
  const playAll = async () => {
    const current = slide.value;
    if (!current || current.tracks.length === 0) {
      toast.warning(t("home.hero.empty"));
      return;
    }
    await playFrom(current.tracks, current.featuredIndex);
  };
  const addToQueue = () => {
    const current = slide.value;
    if (!current || current.tracks.length === 0) {
      toast.warning(t("home.hero.empty"));
      return;
    }
    const added = insertManyToQueue(current.tracks);
    if (added > 0) toast.success(t("home.hero.added", { count: added }));
  };
  return { hero, loading, previewTracks, playAll, addToQueue, load };
};
const MAX_ITEMS = 6;
const REPEAT_TITLE_THRESHOLD = 2;
const useContinueListening = () => {
  const { t } = useI18n();
  const items = shallowRef([]);
  const isRepeat = ref(false);
  const title = computed(
    () => isRepeat.value ? t("home.continue.repeatTitle") : t("home.continue.continueTitle")
  );
  const subtitle = computed(() => {
    const count = items.value.length;
    if (count === 0) return "";
    return isRepeat.value ? t("home.continue.repeatSubtitle", { count }) : t("home.continue.continueSubtitle", { count });
  });
  const load = async () => {
    try {
      const top = await window.api.stats.getTopTracks(MAX_ITEMS);
      items.value = top;
      isRepeat.value = (top[0]?.playCount ?? 0) >= REPEAT_TITLE_THRESHOLD;
    } catch (error) {
      console.warn("[home] getTopTracks failed:", error);
    }
  };
  return { items, title, subtitle, load };
};
const useFmMode = () => {
  const { t } = useI18n();
  const user = useUserStore();
  const status = useStatusStore();
  const enterFmMode = async (options) => {
    if (status.fmMode && !options) {
      toast.info(t("player.fm.already"));
      return;
    }
    if (!user.isLoggedIn) {
      toast.warning(t("player.fm.needLogin"));
      return;
    }
    const loading = toast.loading(t("player.fm.loading"), { duration: 0 });
    try {
      const ok = await playPersonalFm(options);
      if (ok) toast.success(t("player.fm.entered"));
      else toast.warning(t("player.fm.failed"));
    } catch (error) {
      console.error("[fm] 进入失败:", error);
      toast.warning(t("player.fm.failed"));
    } finally {
      loading.close();
    }
  };
  return { enterFmMode };
};
const _hoisted_1$1 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("rect", {
        width: "12",
        height: "12",
        x: "2",
        y: "10",
        rx: "2",
        ry: "2"
      }),
      createBaseVNode("path", { d: "m17.92 14l3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6M6 18h.01M10 14h.01M15 6h.01M18 9h.01" })
    ], -1)
  ])]);
}
const IconDices = markRaw({ name: "lucide-dices", render });
const useQuickActions = () => {
  const { t } = useI18n();
  const router = useRouter();
  const user = useUserStore();
  const { enterHeartMode } = useHeartMode();
  const { enterFmMode } = useFmMode();
  const playLucky = useThrottleFn(async () => {
    const online = user.likedPlaylistTracks;
    const countRes = await window.api.library.getTrackCount();
    const hasLocal = (countRes.success ? countRes.data ?? 0 : 0) > 0;
    const hasOnline = online.length > 0;
    if (!hasLocal && !hasOnline) {
      toast.warning(t("home.quickActions.luck.empty"));
      return;
    }
    const fromLocal = hasLocal && (!hasOnline || Math.random() < 0.5);
    if (fromLocal) {
      const trackRes = await window.api.library.getRandomTrack();
      const localTrack = trackRes.success ? trackRes.data : null;
      if (localTrack) await playNow(localTrack);
      return;
    }
    const onlineTrack = online[Math.floor(Math.random() * online.length)];
    if (onlineTrack) await playNow(onlineTrack);
  }, 800);
  const playHeartMode = useThrottleFn(() => enterHeartMode(), 800);
  const playFm = useThrottleFn(() => enterFmMode(), 800);
  const quickActions = computed(() => [
    {
      icon: IconDices,
      title: t("home.quickActions.luck.title"),
      desc: t("home.quickActions.luck.desc"),
      run: playLucky
    },
    {
      icon: __unplugin_components_0,
      title: t("home.quickActions.daily.title"),
      desc: t("home.quickActions.daily.desc"),
      run: () => router.push("/daily")
    },
    {
      icon: IconHeart,
      title: t("home.quickActions.heartMode.title"),
      desc: t("home.quickActions.heartMode.desc"),
      run: playHeartMode
    },
    {
      icon: __unplugin_components_6$1,
      title: t("home.quickActions.fm.title"),
      desc: t("home.quickActions.fm.desc"),
      run: playFm
    }
  ]);
  return { quickActions };
};
const CACHE_TTL = 30 * 60 * 1e3;
let cache = null;
const safe = (label, task) => task.catch((error) => {
  console.warn(`[home] ${label} failed:`, error);
  return [];
});
const useHomeDiscover = () => {
  const { t } = useI18n();
  const user = useUserStore();
  const recommendPlaylists = shallowRef([]);
  const radarPlaylists = shallowRef([]);
  const artists = shallowRef([]);
  const newAlbums = shallowRef([]);
  const recommendTitle = computed(
    () => user.isLoggedIn ? t("home.recommend.title") : t("home.recommend.titleGuest")
  );
  const recommendSubtitle = computed(
    () => user.isLoggedIn ? t("home.recommend.subtitle") : t("home.recommend.subtitleGuest")
  );
  const apply = (data) => {
    recommendPlaylists.value = data.recommend;
    radarPlaylists.value = data.radar;
    artists.value = data.artists;
    newAlbums.value = data.albums;
  };
  const load = async () => {
    const loggedIn = user.isLoggedIn;
    if (cache && cache.loggedIn === loggedIn && Date.now() - cache.at < CACHE_TTL) {
      apply(cache);
      return;
    }
    const [recommend, radar, artistList, albums] = await Promise.all([
      safe("recommend playlists", fetchRecommendPlaylists(loggedIn)),
      loggedIn ? safe("radar playlists", fetchRadarPlaylists()) : Promise.resolve([]),
      safe("artists", fetchArtists()),
      safe("new albums", fetchNewAlbums())
    ]);
    cache = { at: Date.now(), loggedIn, recommend, radar, artists: artistList, albums };
    apply(cache);
  };
  watch(
    () => user.isLoggedIn,
    () => {
      void load();
    }
  );
  return {
    recommendPlaylists,
    recommendTitle,
    recommendSubtitle,
    radarPlaylists,
    artists,
    newAlbums,
    load
  };
};
const _hoisted_1 = { class: "h-full overflow-y-auto" };
const _hoisted_2 = { class: "flex items-start justify-between gap-6" };
const _hoisted_3 = { class: "min-w-0" };
const _hoisted_4 = { class: "text-3xl font-bold text-on-surface text-balance" };
const _hoisted_5 = { class: "mt-2 text-sm text-on-surface-variant/70" };
const _hoisted_6 = { class: "shrink-0 flex items-center gap-6" };
const _hoisted_7 = { class: "flex items-baseline justify-end gap-0.5" };
const _hoisted_8 = { class: "text-2xl font-bold text-on-surface tabular-nums" };
const _hoisted_9 = { class: "text-sm text-on-surface-variant" };
const _hoisted_10 = { class: "mt-0.5 text-xs text-on-surface-variant/50" };
const _hoisted_11 = { class: "flex items-stretch gap-4 p-4" };
const _hoisted_12 = { class: "size-32 shrink-0 self-center overflow-hidden rounded-lg" };
const _hoisted_13 = { class: "flex min-w-0 flex-1 flex-col justify-center gap-1.5" };
const _hoisted_14 = { class: "truncate text-xl font-bold text-on-surface" };
const _hoisted_15 = { class: "truncate text-sm text-on-surface-variant/70" };
const _hoisted_16 = { class: "mt-0.5 flex items-center gap-2" };
const _hoisted_17 = {
  key: 0,
  class: "w-100 shrink-0 flex-col border-l border-on-surface/8 pl-4 lg:flex"
};
const _hoisted_18 = { class: "w-5 shrink-0 text-xs tabular-nums text-on-surface-variant/35" };
const _hoisted_19 = { class: "flex-1 truncate text-sm text-on-surface" };
const _hoisted_20 = { class: "max-w-24 shrink-0 truncate text-xs text-on-surface-variant/45" };
const _hoisted_21 = { class: "grid grid-cols-4 gap-3" };
const _hoisted_22 = { class: "flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary" };
const _hoisted_23 = { class: "min-w-0" };
const _hoisted_24 = { class: "truncate text-sm font-medium text-on-surface" };
const _hoisted_25 = { class: "truncate text-xs text-on-surface-variant/50" };
const _hoisted_26 = { class: "flex flex-col gap-3" };
const _hoisted_27 = { class: "text-lg font-semibold text-on-surface" };
const _hoisted_28 = {
  key: 0,
  class: "mt-0.5 text-xs text-on-surface-variant/50"
};
const _hoisted_29 = {
  key: 0,
  class: "grid grid-cols-3 gap-3"
};
const _hoisted_30 = { class: "w-5 shrink-0 text-center text-sm font-semibold tabular-nums text-on-surface-variant/30" };
const _hoisted_31 = { class: "relative size-12 shrink-0" };
const _hoisted_32 = { class: "absolute inset-0 flex items-center justify-center rounded-lg bg-black/45 opacity-0 transition-opacity duration-200 group-hover:opacity-100" };
const _hoisted_33 = { class: "min-w-0 flex-1" };
const _hoisted_34 = { class: "truncate text-sm text-on-surface" };
const _hoisted_35 = { class: "truncate text-xs text-on-surface-variant/50" };
const _hoisted_36 = { class: "shrink-0 text-xs tabular-nums text-on-surface-variant/45" };
const _hoisted_37 = {
  key: 1,
  class: "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-on-surface/12 py-10 text-on-surface-variant/40"
};
const _hoisted_38 = { class: "text-sm" };
const _hoisted_39 = {
  key: 1,
  class: "flex flex-col gap-3"
};
const _hoisted_40 = { class: "text-lg font-semibold text-on-surface" };
const _hoisted_41 = { class: "mt-0.5 text-xs text-on-surface-variant/50" };
const _hoisted_42 = {
  key: 2,
  class: "flex flex-col gap-3"
};
const _hoisted_43 = { class: "text-lg font-semibold text-on-surface" };
const _hoisted_44 = { class: "mt-0.5 text-xs text-on-surface-variant/50" };
const _hoisted_45 = {
  key: 3,
  class: "flex flex-col gap-3"
};
const _hoisted_46 = { class: "text-lg font-semibold text-on-surface" };
const _hoisted_47 = { class: "mt-0.5 text-xs text-on-surface-variant/50" };
const _hoisted_48 = {
  key: 4,
  class: "flex flex-col gap-3"
};
const _hoisted_49 = { class: "text-lg font-semibold text-on-surface" };
const _hoisted_50 = { class: "mt-0.5 text-xs text-on-surface-variant/50" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ name: "Home" },
  __name: "Home",
  setup(__props) {
    const { t } = useI18n();
    const { isFloatingBar } = useFloatingPlayerBar();
    const { greetingTitle, greetingSub, headerStats, load: loadHeader } = useHomeHeader();
    const {
      hero,
      loading: heroLoading,
      previewTracks: heroPreview,
      playAll: playHero,
      addToQueue: addHeroToQueue,
      load: loadHero
    } = useDailyRecommend();
    const { quickActions } = useQuickActions();
    const {
      items: continueItems,
      title: continueTitle,
      subtitle: continueSubtitle,
      load: loadContinue
    } = useContinueListening();
    const {
      recommendPlaylists,
      recommendTitle,
      recommendSubtitle,
      radarPlaylists,
      artists,
      newAlbums,
      load: loadDiscover
    } = useHomeDiscover();
    onMounted(() => {
      void loadHeader();
      void loadHero();
      void loadContinue();
      void loadDiscover();
    });
    const artistName = (track) => track.artists.map((artist) => artist.name).join(" / ");
    const trackNo = (index) => String(index + 1).padStart(2, "0");
    const openPlaylist = (item) => {
      navigateToPlaylist(item.id, { source: "netease", name: item.title });
    };
    const openArtist = (item) => {
      navigateToArtist(item.title, { source: "netease", artistId: item.id });
    };
    const openAlbum = (item) => {
      navigateToAlbum(item.title, { source: "netease", albumId: item.id });
    };
    return (_ctx, _cache) => {
      const _component_SImg = _sfc_main$3;
      const _component_STag = _sfc_main$4;
      const _component_IconLucidePlay = __unplugin_components_0$1;
      const _component_SButton = _sfc_main$5;
      const _component_IconLucidePlus = __unplugin_components_4;
      const _component_SCard = _sfc_main$2;
      const _component_IconLucideHeadphones = __unplugin_components_6;
      const _component_CoverList = _sfc_main$1;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: normalizeClass(["mx-auto flex max-w-[1400px] flex-col gap-6 px-6 pt-6", unref(isFloatingBar) ? "pb-28" : "pb-10"])
        }, [
          createBaseVNode("header", _hoisted_2, [
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("h1", _hoisted_4, toDisplayString(unref(greetingTitle)), 1),
              createBaseVNode("p", _hoisted_5, toDisplayString(unref(greetingSub)), 1)
            ]),
            createBaseVNode("div", _hoisted_6, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(headerStats), (stat) => {
                return openBlock(), createElementBlock("div", {
                  key: stat.label,
                  class: "text-right"
                }, [
                  createBaseVNode("div", _hoisted_7, [
                    createBaseVNode("span", _hoisted_8, toDisplayString(stat.value), 1),
                    createBaseVNode("span", _hoisted_9, toDisplayString(stat.unit), 1)
                  ]),
                  createBaseVNode("div", _hoisted_10, toDisplayString(stat.label), 1)
                ]);
              }), 128))
            ])
          ]),
          unref(heroLoading) || unref(hero) ? (openBlock(), createBlock(_component_SCard, {
            key: 0,
            radius: "xl",
            flush: "",
            class: "min-h-40 -mb-3"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("div", _hoisted_12, [
                  createVNode(_component_SImg, {
                    src: unref(hero)?.cover,
                    alt: unref(hero)?.title,
                    class: "size-full"
                  }, null, 8, ["src", "alt"])
                ]),
                createBaseVNode("div", _hoisted_13, [
                  unref(hero) ? (openBlock(), createBlock(_component_STag, {
                    key: 0,
                    type: "default",
                    round: "",
                    size: "small",
                    class: "self-start"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(hero).tag), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createBaseVNode("h2", _hoisted_14, toDisplayString(unref(hero)?.title), 1),
                  createBaseVNode("p", _hoisted_15, toDisplayString(unref(hero)?.subtitle), 1),
                  createBaseVNode("div", _hoisted_16, [
                    createVNode(_component_SButton, {
                      type: "primary",
                      round: "",
                      disabled: unref(heroLoading),
                      onClick: unref(playHero)
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_IconLucidePlay)
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(t)("home.hero.play")), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"]),
                    createVNode(_component_SButton, {
                      variant: "secondary",
                      round: "",
                      disabled: unref(heroLoading),
                      onClick: unref(addHeroToQueue)
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_IconLucidePlus)
                      ]),
                      default: withCtx(() => [
                        createTextVNode(" " + toDisplayString(unref(t)("home.hero.addQueue")), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"])
                  ])
                ]),
                unref(heroPreview).length > 0 ? (openBlock(), createElementBlock("ul", _hoisted_17, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(heroPreview), (track, index) => {
                    return openBlock(), createElementBlock("li", {
                      key: `${track.source}:${track.id}`,
                      class: "flex flex-1 items-center gap-2.5"
                    }, [
                      createBaseVNode("span", _hoisted_18, toDisplayString(trackNo(index)), 1),
                      createBaseVNode("span", _hoisted_19, toDisplayString(track.title), 1),
                      createBaseVNode("span", _hoisted_20, toDisplayString(artistName(track)), 1)
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true)
              ])
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createBaseVNode("section", _hoisted_21, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(quickActions), (action) => {
              return openBlock(), createBlock(_component_SCard, {
                key: action.title,
                radius: "xl",
                hoverable: "",
                class: "flex items-center gap-3",
                onClick: ($event) => action.run()
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_22, [
                    (openBlock(), createBlock(resolveDynamicComponent(action.icon), { class: "size-5" }))
                  ]),
                  createBaseVNode("div", _hoisted_23, [
                    createBaseVNode("div", _hoisted_24, toDisplayString(action.title), 1),
                    createBaseVNode("div", _hoisted_25, toDisplayString(action.desc), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["onClick"]);
            }), 128))
          ]),
          createBaseVNode("section", _hoisted_26, [
            createBaseVNode("div", null, [
              createBaseVNode("h3", _hoisted_27, toDisplayString(unref(continueTitle)), 1),
              unref(continueSubtitle) ? (openBlock(), createElementBlock("p", _hoisted_28, toDisplayString(unref(continueSubtitle)), 1)) : createCommentVNode("", true)
            ]),
            unref(continueItems).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_29, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(continueItems), (item, index) => {
                return openBlock(), createBlock(_component_SCard, {
                  key: `${item.track.source}:${item.track.id}`,
                  radius: "xl",
                  size: "small",
                  hoverable: "",
                  class: "group flex items-center gap-3",
                  onClick: ($event) => playNow(item.track)
                }, {
                  default: withCtx(() => [
                    createBaseVNode("span", _hoisted_30, toDisplayString(trackNo(index)), 1),
                    createBaseVNode("div", _hoisted_31, [
                      createVNode(_component_SImg, {
                        src: item.track.cover,
                        alt: item.track.title,
                        class: "size-12 rounded-lg"
                      }, null, 8, ["src", "alt"]),
                      createBaseVNode("div", _hoisted_32, [
                        createVNode(_component_IconLucidePlay, { class: "size-5 text-white" })
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_33, [
                      createBaseVNode("div", _hoisted_34, toDisplayString(item.track.title), 1),
                      createBaseVNode("div", _hoisted_35, toDisplayString(artistName(item.track)), 1)
                    ]),
                    createBaseVNode("span", _hoisted_36, toDisplayString(unref(t)("home.continue.playCount", { count: item.playCount }, item.playCount)), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick"]);
              }), 128))
            ])) : (openBlock(), createElementBlock("div", _hoisted_37, [
              createVNode(_component_IconLucideHeadphones, { class: "size-7" }),
              createBaseVNode("span", _hoisted_38, toDisplayString(unref(t)("home.continue.empty")), 1)
            ]))
          ]),
          unref(recommendPlaylists).length > 0 ? (openBlock(), createElementBlock("section", _hoisted_39, [
            createBaseVNode("div", null, [
              createBaseVNode("h3", _hoisted_40, toDisplayString(unref(recommendTitle)), 1),
              createBaseVNode("p", _hoisted_41, toDisplayString(unref(recommendSubtitle)), 1)
            ]),
            createVNode(_component_CoverList, {
              items: unref(recommendPlaylists),
              virtual: false,
              gap: 16,
              onClick: openPlaylist
            }, null, 8, ["items"])
          ])) : createCommentVNode("", true),
          unref(radarPlaylists).length > 0 ? (openBlock(), createElementBlock("section", _hoisted_42, [
            createBaseVNode("div", null, [
              createBaseVNode("h3", _hoisted_43, toDisplayString(unref(t)("home.radar.title")), 1),
              createBaseVNode("p", _hoisted_44, toDisplayString(unref(t)("home.radar.subtitle")), 1)
            ]),
            createVNode(_component_CoverList, {
              items: unref(radarPlaylists),
              virtual: false,
              gap: 16,
              onClick: openPlaylist
            }, null, 8, ["items"])
          ])) : createCommentVNode("", true),
          unref(artists).length > 0 ? (openBlock(), createElementBlock("section", _hoisted_45, [
            createBaseVNode("div", null, [
              createBaseVNode("h3", _hoisted_46, toDisplayString(unref(t)("home.artists.title")), 1),
              createBaseVNode("p", _hoisted_47, toDisplayString(unref(t)("home.artists.subtitle")), 1)
            ]),
            createVNode(_component_CoverList, {
              items: unref(artists),
              type: "artist",
              "min-size": 120,
              virtual: false,
              gap: 16,
              onClick: openArtist
            }, null, 8, ["items"])
          ])) : createCommentVNode("", true),
          unref(newAlbums).length > 0 ? (openBlock(), createElementBlock("section", _hoisted_48, [
            createBaseVNode("div", null, [
              createBaseVNode("h3", _hoisted_49, toDisplayString(unref(t)("home.albums.title")), 1),
              createBaseVNode("p", _hoisted_50, toDisplayString(unref(t)("home.albums.subtitle")), 1)
            ]),
            createVNode(_component_CoverList, {
              items: unref(newAlbums),
              virtual: false,
              gap: 16,
              onClick: openAlbum
            }, null, 8, ["items"])
          ])) : createCommentVNode("", true)
        ], 2)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
