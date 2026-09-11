import { I as IconLucideRefreshCw } from "./refresh-cw-DNNyf8AZ.js";
import { _ as __unplugin_components_2$1 } from "./triangle-alert-BPUBCHTb.js";
import { _ as __unplugin_components_5 } from "./SLoading-C4RltnK4.js";
import { a as artistFallback, _ as _sfc_main$7 } from "./CoverList.vue_vue_type_script_setup_true_lang-ChKIaOwW.js";
import { _ as _sfc_main$5 } from "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import { _ as _sfc_main$4, d as __unplugin_components_2 } from "./more-horizontal-BtOolk7_.js";
import { _ as _sfc_main$3 } from "./SDropdownMenu.vue_vue_type_script_setup_true_lang-DsKOP0yw.js";
import { I as IconLucideEllipsis } from "./ellipsis-D0hNWfJ2.js";
import { _ as _sfc_main$2 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { _ as _sfc_main$1 } from "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import { x as defineComponent, L as onBeforeUnmount, w as watch, y as createElementBlock, v as unref, z as createBaseVNode, D as createVNode, M as normalizeClass, O as toDisplayString, W as createTextVNode, B as createCommentVNode, Q as withCtx, P as createBlock, i as isRef, U as Transition, q as shallowRef, c as computed, r as ref, C as openBlock } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { aW as qqmusic, aX as kugou, aA as useLibraryStore, aC as useStreamingStore, aY as fetchArtist, aS as albumsToCoverItems, u as useI18n, a as useSettingsStore, aa as useUserStore, al as useRoute, ak as navigateToAlbum, aZ as fetchArtistSongs, c as useRouter, at as playFrom, t as toast } from "./index-DVKNk9gd.js";
import { q as qqSongsToTracks, a as qqAlbumCover, b as qqArtistCover, k as kgSongsToTracks, c as kgAlbumToCoverItem, _ as _sfc_main$6 } from "./SongList.vue_vue_type_script_setup_true_lang-Doyounvo.js";
import { d as formatTime } from "./useDownload-DvR_TELr.js";
import { I as IconLucideDisc3 } from "./disc-3-B-fZRQOF.js";
import { _ as __unplugin_components_1 } from "./list-music-C3T2xD_I.js";
import { I as IconLucideHourglass } from "./hourglass-L3VwbXZ_.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { I as IconLucideListChecks } from "./list-checks-B0B5438d.js";
import { I as IconMaterialSymbolsFavoriteRounded } from "./SRadioGroup.vue_vue_type_script_setup_true_lang-CA7DTWUw.js";
import { I as IconMaterialSymbolsFavoriteOutlineRounded } from "./favorite-outline-rounded-C5xed2i3.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import "./user-C_ofWqo5.js";
import "./useFloatingPlayerBar-R2fVODYZ.js";
import "./PopperContent-CPX94GL7.js";
import "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import "./check-BXlOuXWK.js";
import "./x-Cd6Sow4a.js";
import "./plus-BEApKDpl.js";
import "./copy-DhNjJWGd.js";
import "./song-BGJnBQIx.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import "./format-DoPtjAAN.js";
import "./pause-u3QmqHX9.js";
import "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import "./arrow-up-down-Dw8Z8Wwk.js";
import "./folder-open-Cw_0c4cI.js";
import "./trash-2-BKyCA-Fb.js";
const fetchQQMusicArtist = async (mid, fallbackName) => {
  const body = await qqmusic.artist({ mid, offset: 0, limit: 50 });
  if (body.code !== 200) throw new Error(body.message || `QM 歌手请求失败: ${body.code}`);
  const tracks = qqSongsToTracks(body.songs);
  const albums = (body.albums ?? []).map((album) => ({
    id: album.id,
    title: album.name,
    cover: album.id ? qqAlbumCover(album.id) : void 0,
    subtitle: album.artist ?? "",
    trackCount: album.trackCount ?? 0
  }));
  const artistMid = body.artist?.mid ?? mid;
  return {
    id: artistMid,
    name: body.artist?.name || fallbackName,
    avatar: qqArtistCover(artistMid),
    source: "qqmusic",
    tracks,
    albums,
    trackCount: body.artist?.songCount ?? tracks.length,
    albumCount: body.artist?.albumCount ?? albums.length
  };
};
const fetchQQMusicArtistSongs = async (mid, offset, limit = 50) => {
  const body = await qqmusic.artist({
    mid,
    offset,
    limit,
    includeAlbums: false
  });
  if (body.code !== 200) throw new Error(body.message || `QM 歌手歌曲请求失败: ${body.code}`);
  const tracks = qqSongsToTracks(body.songs);
  return {
    tracks,
    more: offset + tracks.length < (body.artist?.songCount ?? offset + tracks.length)
  };
};
const fetchKugouArtist = async (id, fallbackName) => {
  const body = await kugou.artist({ id });
  if (body.code !== 200) throw new Error(body.message || `KG 歌手请求失败: ${body.code}`);
  const tracks = kgSongsToTracks(body.songs);
  const albums = (body.albums ?? []).map(kgAlbumToCoverItem);
  const artistId = String(body.artist?.id ?? id);
  return {
    id: artistId,
    name: body.artist?.name || fallbackName,
    avatar: body.artist?.avatar || body.artist?.cover,
    source: "kugou",
    tracks,
    albums,
    trackCount: body.artist?.songCount ?? tracks.length,
    albumCount: body.artist?.albumCount ?? albums.length
  };
};
const loadArtist = async (source, id, options) => {
  if (source === "local") {
    await loadLocal(id, options);
    return;
  }
  if (source === "streaming") {
    await loadStreaming(id, options);
    return;
  }
  if (source === "netease") {
    await loadNetease(id, options);
    return;
  }
  if (source === "qqmusic") {
    const artistId = decodeURIComponent(id);
    const result = await fetchQQMusicArtist(artistId, options.fallbackName ?? artistId);
    if (!options.signal?.aborted) options.onUpdate(result);
    return;
  }
  if (source === "kugou") {
    const artistId = decodeURIComponent(id);
    const result = await fetchKugouArtist(artistId, options.fallbackName ?? artistId);
    if (!options.signal?.aborted) options.onUpdate(result);
    return;
  }
  options.onUpdate(null);
};
const loadLocal = async (id, options) => {
  const libraryStore = useLibraryStore();
  const artistName = decodeURIComponent(id);
  const profile = await libraryStore.getArtistProfile(artistName);
  if (options.signal?.aborted) return;
  options.onUpdate(profile);
  if (profile && !profile.avatar) {
    const res = await window.api.library.fetchArtistAvatar(artistName);
    if (options.signal?.aborted) return;
    if (res.success && res.data) {
      libraryStore.setArtistAvatar(artistName, res.data);
      options.onUpdate({ ...profile, avatar: res.data });
    }
  }
};
const loadStreaming = async (id, options) => {
  const streamingStore = useStreamingStore();
  const artistId = decodeURIComponent(id);
  const cached = streamingStore.artists.find((a) => a.id === artistId);
  const fallbackName = options.fallbackName ?? artistId;
  const tracks = await streamingStore.fetchArtistSongs(artistId);
  if (options.signal?.aborted) return;
  options.onUpdate({
    id: artistId,
    name: cached?.name ?? fallbackName,
    avatar: cached?.avatar,
    source: "streaming",
    tracks,
    albums: [],
    trackCount: tracks.length,
    albumCount: 0
  });
};
const loadNetease = async (id, options) => {
  const result = await fetchArtist(decodeURIComponent(id));
  if (options.signal?.aborted) return;
  if (!result) {
    options.onUpdate(null);
    return;
  }
  const albums = albumsToCoverItems(result.albums);
  options.onUpdate({
    id,
    name: result.artist.name,
    avatar: result.artist.avatar,
    source: "netease",
    tracks: result.tracks,
    albums,
    trackCount: result.tracks.length,
    albumCount: albums.length
  });
};
const _hoisted_1 = { class: "flex flex-col h-full" };
const _hoisted_2 = {
  key: 0,
  class: "shrink-0 px-5 pb-2"
};
const _hoisted_3 = { class: "flex-1 flex flex-col min-w-0 py-1" };
const _hoisted_4 = { class: "overflow-hidden flex items-center gap-3 text-sm leading-none text-on-surface-variant/50" };
const _hoisted_5 = { class: "flex items-center gap-1" };
const _hoisted_6 = {
  key: 0,
  class: "flex items-center gap-1"
};
const _hoisted_7 = {
  key: 1,
  class: "flex items-center gap-1"
};
const _hoisted_8 = { class: "mt-auto flex items-center justify-between gap-4" };
const _hoisted_9 = { class: "flex items-center gap-3" };
const _hoisted_10 = {
  key: "songs",
  class: "flex-1 min-h-0"
};
const _hoisted_11 = {
  key: "albums",
  class: "flex-1 min-h-0"
};
const _hoisted_12 = {
  key: "loading",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_13 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_14 = { class: "text-sm" };
const _hoisted_15 = {
  key: "error",
  class: "flex-1 flex items-center justify-center px-6"
};
const _hoisted_16 = { class: "text-center text-red-500/85" };
const _hoisted_17 = { class: "text-sm font-medium mb-1" };
const _hoisted_18 = { class: "text-xs opacity-80 break-all max-w-xs mb-4" };
const _hoisted_19 = {
  key: "empty",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_20 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_21 = { class: "text-sm" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Artist",
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const { appearance } = useSettingsStore();
    const userStore = useUserStore();
    const tabTransitionName = computed(() => {
      const transition = appearance.routeTransition;
      return transition === "none" ? "" : `route-${transition}`;
    });
    const source = route.params.source;
    const id = route.params.id;
    const artist = shallowRef(null);
    const loading = ref(false);
    const error = ref("");
    let loadAbort = null;
    const hasMoreSongs = ref(false);
    const loadingMore = ref(false);
    const fallbackTrackCover = computed(() => artist.value?.tracks.find((t2) => t2.cover)?.cover);
    const collapsed = ref(false);
    const handleListScroll = (event) => {
      const scrollTop = event.target.scrollTop;
      if (!collapsed.value && scrollTop > 10) {
        collapsed.value = true;
      } else if (collapsed.value && scrollTop === 0) {
        collapsed.value = false;
      }
    };
    const loadArtist$1 = async () => {
      collapsed.value = false;
      loadAbort?.abort();
      const myAbort = new AbortController();
      loadAbort = myAbort;
      loading.value = true;
      error.value = "";
      hasMoreSongs.value = false;
      try {
        await loadArtist(source, id, {
          fallbackName: typeof route.query.name === "string" ? route.query.name : void 0,
          signal: myAbort.signal,
          onUpdate: (next) => {
            if (myAbort.signal.aborted) return;
            artist.value = next;
            if (next && (source === "netease" && next.tracks.length >= 50 || source === "qqmusic" && next.tracks.length < next.trackCount)) {
              hasMoreSongs.value = true;
            }
          }
        });
      } catch (err) {
        if (myAbort.signal.aborted) return;
        error.value = err instanceof Error ? err.message : String(err);
      } finally {
        if (!myAbort.signal.aborted) loading.value = false;
      }
    };
    const onReachBottom = async () => {
      if (source !== "netease" && source !== "qqmusic" || !hasMoreSongs.value || loadingMore.value || !artist.value)
        return;
      const current = artist.value;
      loadingMore.value = true;
      try {
        const { tracks, more } = source === "qqmusic" ? await fetchQQMusicArtistSongs(decodeURIComponent(id), current.tracks.length) : await fetchArtistSongs(decodeURIComponent(id), current.tracks.length);
        if (loadAbort?.signal.aborted || artist.value?.id !== current.id) return;
        if (tracks.length === 0) {
          hasMoreSongs.value = false;
          return;
        }
        artist.value = {
          ...current,
          tracks: [...current.tracks, ...tracks],
          trackCount: source === "qqmusic" ? current.trackCount : current.tracks.length + tracks.length
        };
        hasMoreSongs.value = more;
      } finally {
        loadingMore.value = false;
      }
    };
    loadArtist$1();
    onBeforeUnmount(() => {
      loadAbort?.abort();
    });
    const totalDuration = computed(() => {
      if (!artist.value) return "";
      const total = artist.value.tracks.reduce((sum, t2) => sum + t2.duration, 0);
      return total > 0 ? formatTime(total) : "";
    });
    const playbackContext = computed(() => ({
      provider: source,
      originId: decodeURIComponent(id),
      originType: "artist",
      originName: artist.value?.name
    }));
    const handlePlayAll = () => {
      if (!artist.value?.tracks.length) return;
      playFrom(artist.value.tracks, 0, playbackContext.value);
    };
    const canSubscribeArtist = computed(() => artist.value?.source === "netease");
    const isArtistSubscribed = computed(() => {
      const current = artist.value;
      if (!current || current.source !== "netease") return false;
      return userStore.artists.some((item) => String(item.id) === String(current.id));
    });
    const artistSubBusy = ref(false);
    const handleToggleSubscribe = async () => {
      const current = artist.value;
      if (!current || current.source !== "netease" || artistSubBusy.value) return;
      artistSubBusy.value = true;
      try {
        await userStore.toggleArtistSubscribe(current.id, !isArtistSubscribed.value);
      } catch (err) {
        toast.error(err instanceof Error && err.message ? err.message : t("liked.toast.failed"));
      } finally {
        artistSubBusy.value = false;
      }
    };
    const searchQuery = ref("");
    const songListRef = shallowRef(null);
    const moreMenuItems = computed(() => [
      { key: "batchManage", label: t("songList.batch.manage"), icon: IconLucideListChecks }
    ]);
    const handleMoreMenu = (key) => {
      if (key === "batchManage") songListRef.value?.enterBatch();
    };
    const ARTIST_TAB_KEYS = ["songs", "albums"];
    const activeTab = computed(() => {
      const tab = route.query.tab;
      return typeof tab === "string" && ARTIST_TAB_KEYS.includes(tab) ? tab : "songs";
    });
    const onTabSwitch = (key) => {
      router.replace({ query: { ...route.query, tab: key } });
    };
    watch(activeTab, (tab) => {
      if (tab === "albums") collapsed.value = true;
    });
    const tabs = computed(() => {
      const items = [{ key: "songs", label: t("artist.songs") }];
      if (artist.value?.albums.length) {
        items.push({ key: "albums", label: t("artist.albums") });
      }
      return items;
    });
    const albumItems = computed(() => {
      if (!artist.value?.albums.length) return [];
      return artist.value.albums.map((item) => ({
        ...item,
        subtitle: t("common.totalSongs", { count: item.trackCount })
      }));
    });
    return (_ctx, _cache) => {
      const _component_SImg = _sfc_main$1;
      const _component_IconLucidePlay = __unplugin_components_0;
      const _component_SButton = _sfc_main$2;
      const _component_IconLucideEllipsis = IconLucideEllipsis;
      const _component_SDropdownMenu = _sfc_main$3;
      const _component_IconLucideSearch = __unplugin_components_2;
      const _component_SInput = _sfc_main$4;
      const _component_STabs = _sfc_main$5;
      const _component_CoverList = _sfc_main$7;
      const _component_SLoading = __unplugin_components_5;
      const _component_IconLucideTriangleAlert = __unplugin_components_2$1;
      const _component_IconLucideRefreshCw = IconLucideRefreshCw;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        unref(artist) ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("div", {
            class: normalizeClass(["flex mt-2 transition-[gap,margin] duration-300", unref(collapsed) ? "gap-3 mb-3" : "gap-5 mb-4"])
          }, [
            createVNode(_component_SImg, {
              src: unref(artist).avatar ?? unref(fallbackTrackCover),
              fallback: unref(artistFallback),
              alt: unref(artist).name,
              class: normalizeClass(["shrink-0 rounded-full transition-[width,height] duration-300", unref(collapsed) ? "size-20" : "size-40"])
            }, null, 8, ["src", "fallback", "alt", "class"]),
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", {
                class: normalizeClass(["flex flex-col transition-[gap] duration-300", unref(collapsed) ? "gap-0.5" : "gap-2"])
              }, [
                createBaseVNode("h1", {
                  class: normalizeClass(["font-bold text-on-surface truncate lh-normal transition-[font-size,line-height] duration-300", unref(collapsed) ? "text-xl" : "text-3xl"])
                }, toDisplayString(unref(artist).name), 3),
                createBaseVNode("div", {
                  class: normalizeClass(["grid transition-[grid-template-rows,opacity] duration-300", unref(collapsed) ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"])
                }, [
                  createBaseVNode("div", _hoisted_4, [
                    createBaseVNode("span", _hoisted_5, [
                      createVNode(unref(__unplugin_components_1), { class: "shrink-0" }),
                      createTextVNode(" " + toDisplayString(unref(t)("common.totalSongs", { count: unref(artist).trackCount })), 1)
                    ]),
                    unref(artist).albumCount ? (openBlock(), createElementBlock("span", _hoisted_6, [
                      createVNode(unref(IconLucideDisc3), { class: "shrink-0" }),
                      createTextVNode(" " + toDisplayString(unref(t)("common.totalAlbums", { count: unref(artist).albumCount })), 1)
                    ])) : createCommentVNode("", true),
                    unref(totalDuration) ? (openBlock(), createElementBlock("span", _hoisted_7, [
                      createVNode(unref(IconLucideHourglass), { class: "shrink-0" }),
                      createTextVNode(" " + toDisplayString(unref(t)("collection.totalDuration", { time: unref(totalDuration) })), 1)
                    ])) : createCommentVNode("", true)
                  ])
                ], 2)
              ], 2),
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("div", _hoisted_9, [
                  createVNode(_component_SButton, {
                    type: "primary",
                    variant: "secondary",
                    round: "",
                    disabled: unref(artist).tracks.length === 0 || unref(activeTab) !== "songs",
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
                  unref(canSubscribeArtist) ? (openBlock(), createBlock(_component_SButton, {
                    key: 0,
                    variant: "secondary",
                    round: "",
                    disabled: unref(artistSubBusy),
                    onClick: handleToggleSubscribe
                  }, {
                    icon: withCtx(() => [
                      unref(isArtistSubscribed) ? (openBlock(), createBlock(unref(IconMaterialSymbolsFavoriteRounded), { key: 0 })) : (openBlock(), createBlock(unref(IconMaterialSymbolsFavoriteOutlineRounded), { key: 1 }))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" " + toDisplayString(unref(t)(unref(isArtistSubscribed) ? "collection.unsubscribe" : "collection.subscribe")), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])) : createCommentVNode("", true),
                  createVNode(_component_SDropdownMenu, {
                    items: unref(moreMenuItems),
                    disabled: unref(activeTab) !== "songs",
                    align: "start",
                    onSelect: handleMoreMenu
                  }, {
                    trigger: withCtx(() => [
                      createVNode(_component_SButton, {
                        variant: "secondary",
                        circle: "",
                        disabled: unref(activeTab) !== "songs"
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_IconLucideEllipsis)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  }, 8, ["items", "disabled"])
                ]),
                createVNode(_component_SInput, {
                  modelValue: unref(searchQuery),
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(searchQuery) ? searchQuery.value = $event : null),
                  placeholder: unref(t)("common.search"),
                  disabled: unref(activeTab) !== "songs",
                  clearable: "",
                  round: "",
                  class: "w-40 focus-within:w-56",
                  "data-search-input": ""
                }, {
                  prefix: withCtx(() => [
                    createVNode(_component_IconLucideSearch, { class: "size-4 text-on-surface-variant/40 shrink-0" })
                  ]),
                  _: 1
                }, 8, ["modelValue", "placeholder", "disabled"])
              ])
            ])
          ], 2),
          createVNode(_component_STabs, {
            "model-value": unref(activeTab),
            tabs: unref(tabs),
            type: "bar",
            size: "large",
            "onUpdate:modelValue": onTabSwitch
          }, null, 8, ["model-value", "tabs"])
        ])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: "fade",
          mode: "out-in",
          duration: 150
        }, {
          default: withCtx(() => [
            unref(artist) && unref(artist).tracks.length > 0 ? (openBlock(), createElementBlock("div", {
              key: unref(artist).id,
              class: "flex-1 min-h-0 flex flex-col"
            }, [
              createVNode(Transition, {
                name: unref(tabTransitionName),
                mode: "out-in"
              }, {
                default: withCtx(() => [
                  unref(activeTab) === "songs" ? (openBlock(), createElementBlock("div", _hoisted_10, [
                    createVNode(_sfc_main$6, {
                      ref_key: "songListRef",
                      ref: songListRef,
                      items: unref(artist).tracks,
                      "search-query": unref(searchQuery),
                      source: unref(source),
                      "playback-context": unref(playbackContext),
                      "show-size": unref(source) === "local",
                      "has-more": unref(hasMoreSongs),
                      "loading-more": unref(loadingMore),
                      "enable-sort": "",
                      onScroll: handleListScroll,
                      onChange: loadArtist$1,
                      onReachBottom
                    }, null, 8, ["items", "search-query", "source", "playback-context", "show-size", "has-more", "loading-more"])
                  ])) : unref(activeTab) === "albums" ? (openBlock(), createElementBlock("div", _hoisted_11, [
                    createVNode(_component_CoverList, {
                      items: unref(albumItems),
                      "padding-x": 20,
                      "padding-bottom": 24,
                      onClick: _cache[1] || (_cache[1] = (item) => unref(navigateToAlbum)(item.title, { source: unref(source), albumId: item.id }))
                    }, null, 8, ["items"])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["name"])
            ])) : unref(loading) ? (openBlock(), createElementBlock("div", _hoisted_12, [
              createBaseVNode("div", _hoisted_13, [
                createVNode(_component_SLoading, { class: "text-4xl text-primary/70 mb-4 mx-auto block" }),
                createBaseVNode("div", _hoisted_14, toDisplayString(unref(t)("common.loading")), 1)
              ])
            ])) : unref(error) ? (openBlock(), createElementBlock("div", _hoisted_15, [
              createBaseVNode("div", _hoisted_16, [
                createVNode(_component_IconLucideTriangleAlert, { class: "size-14 mx-auto mb-4 opacity-50" }),
                createBaseVNode("div", _hoisted_17, toDisplayString(unref(t)("search.errorTitle")), 1),
                createBaseVNode("div", _hoisted_18, toDisplayString(unref(error)), 1),
                createVNode(_component_SButton, {
                  type: "primary",
                  variant: "secondary",
                  onClick: loadArtist$1
                }, {
                  icon: withCtx(() => [
                    createVNode(_component_IconLucideRefreshCw)
                  ]),
                  default: withCtx(() => [
                    createTextVNode(" " + toDisplayString(unref(t)("common.retry")), 1)
                  ]),
                  _: 1
                })
              ])
            ])) : unref(artist) ? (openBlock(), createElementBlock("div", _hoisted_19, [
              createBaseVNode("div", _hoisted_20, [
                createVNode(unref(__unplugin_components_4), { class: "size-12 mx-auto mb-3 opacity-30" }),
                createBaseVNode("div", _hoisted_21, toDisplayString(unref(t)("collection.empty")), 1)
              ])
            ])) : createCommentVNode("", true)
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
