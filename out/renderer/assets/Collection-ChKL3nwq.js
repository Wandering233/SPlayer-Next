import { _ as _sfc_main$9, I as IconLucidePencil } from "./pencil-BCdm-qeU.js";
import { _ as _sfc_main$6 } from "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { I as IconLucideRefreshCw } from "./refresh-cw-DNNyf8AZ.js";
import { _ as __unplugin_components_2$2 } from "./triangle-alert-BPUBCHTb.js";
import { _ as __unplugin_components_5 } from "./SLoading-C4RltnK4.js";
import { g as usePlaylistStore, u as useCopyText, c as _sfc_main$3, _ as _sfc_main$5, h as __unplugin_components_7, d as __unplugin_components_2$1, I as IconLucideMoreHorizontal } from "./more-horizontal-BtOolk7_.js";
import { _ as _sfc_main$7 } from "./SDropdownMenu.vue_vue_type_script_setup_true_lang-DsKOP0yw.js";
import { I as IconLucideEllipsis } from "./ellipsis-D0hNWfJ2.js";
import { I as IconMaterialSymbolsFavoriteOutlineRounded } from "./favorite-outline-rounded-C5xed2i3.js";
import { I as IconMaterialSymbolsFavoriteRounded, i as getCollectionShareUrl } from "./SRadioGroup.vue_vue_type_script_setup_true_lang-CA7DTWUw.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { _ as _sfc_main$4 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as __unplugin_components_6 } from "./radio-WITe2XXZ.js";
import { _ as __unplugin_components_1$1 } from "./disc3-D5n43yM1.js";
import { _ as _sfc_main$2 } from "./STooltip.vue_vue_type_script_setup_true_lang-D_YXqbDl.js";
import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode, r as ref, c as computed, x as defineComponent, k as onMounted, L as onBeforeUnmount, v as unref, D as createVNode, M as normalizeClass, O as toDisplayString, Q as withCtx, P as createBlock, B as createCommentVNode, W as createTextVNode, i as isRef, U as Transition, q as shallowRef } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { I as IconLucideHardDrive } from "./hard-drive-nkZY3ydd.js";
import { _ as _sfc_main$1 } from "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import { aA as useLibraryStore, aU as fetchAlbum, aV as fetchPlaylist, aW as qqmusic, aX as kugou, aC as useStreamingStore, u as useI18n, aa as useUserStore, t as toast, al as useRoute, c as useRouter, at as playFrom } from "./index-DVKNk9gd.js";
import { q as qqSongsToTracks, k as kgSongsToTracks, _ as _sfc_main$8 } from "./SongList.vue_vue_type_script_setup_true_lang-Doyounvo.js";
import { d as formatTime } from "./useDownload-DvR_TELr.js";
import { I as IconLucideTrash2 } from "./trash-2-BKyCA-Fb.js";
import { I as IconLucideListChecks } from "./list-checks-B0B5438d.js";
import { _ as __unplugin_components_1 } from "./list-music-C3T2xD_I.js";
import { I as IconLucideHourglass } from "./hourglass-L3VwbXZ_.js";
import { I as IconLucideCalendar } from "./calendar-B6pPgz_L.js";
import { I as IconLucideUser } from "./user-C_ofWqo5.js";
import { I as IconCopy } from "./copy-DhNjJWGd.js";
import "./PopperContent-CPX94GL7.js";
import "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import "./check-BXlOuXWK.js";
import "./x-Cd6Sow4a.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./plus-BEApKDpl.js";
import "./STabs.vue_vue_type_script_setup_true_lang-CPCErT7T.js";
import "./folder-open-Cw_0c4cI.js";
import "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import "./song-BGJnBQIx.js";
import "./settings-pA0nXw5U.js";
import "./config-Yl8G-1j0.js";
import "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import "./format-DoPtjAAN.js";
import "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import "./pause-u3QmqHX9.js";
import "./useFloatingPlayerBar-R2fVODYZ.js";
import "./arrow-up-down-Dw8Z8Wwk.js";
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
      createBaseVNode("path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" }),
      createBaseVNode("circle", {
        cx: "12",
        cy: "12",
        r: "10"
      })
    ], -1)
  ])]);
}
const __unplugin_components_2 = markRaw({ name: "lucide-globe2", render });
const loadLocalCollection = async (type, id, options) => {
  const result = type === "playlist" ? await usePlaylistStore().get(id) : type === "album" ? await useLibraryStore().getAlbumCollection(decodeURIComponent(id)) : null;
  if (!options.signal?.aborted) options.onUpdate(result);
};
const loadNeteaseCollection = async (type, id, options) => {
  if (type === "album") {
    const result = await fetchAlbum(decodeURIComponent(id));
    if (options.signal?.aborted) return;
    options.onUpdate(
      result ? {
        id,
        type,
        source: "netease",
        title: result.album.name,
        cover: result.album.cover,
        description: result.description,
        creator: result.album.artist,
        tracks: result.tracks,
        trackCount: result.tracks.length
      } : null
    );
    return;
  }
  if (type !== "playlist") {
    options.onUpdate(null);
    return;
  }
  const tracks = [];
  let meta;
  const current = () => meta ? {
    id,
    type,
    source: "netease",
    title: meta.name,
    cover: meta.cover,
    description: meta.description,
    creator: meta.creator,
    tracks: [...tracks],
    trackCount: meta.count ?? tracks.length
  } : null;
  await fetchPlaylist(id, {
    signal: options.signal,
    onMeta: (value) => {
      meta = {
        name: value.name,
        cover: value.cover,
        description: value.description,
        creator: value.owner,
        count: value.trackCount
      };
      if (!options.signal?.aborted) options.onUpdate(current());
    },
    onBatch: (batch) => {
      tracks.push(...batch);
      if (!options.signal?.aborted) options.onUpdate(current());
    }
  });
};
const fetchQQMusicAlbum = async (mid, fallbackName) => {
  const body = await qqmusic.album({ mid });
  if (body.code !== 200) throw new Error(body.message || `QM 专辑请求失败: ${body.code}`);
  const tracks = qqSongsToTracks(body.songs);
  const first = tracks[0];
  return {
    album: {
      id: body.mid ?? mid,
      name: first?.album?.name || fallbackName,
      cover: first?.cover,
      artist: first?.artists.map((artist) => artist.name).join(" / "),
      trackCount: body.total ?? tracks.length
    },
    tracks
  };
};
const fetchQQMusicPlaylist = async (id, fallbackName) => {
  const body = await qqmusic.song_list({ id });
  if (body.code !== 200) throw new Error(body.message || `QM 歌单请求失败: ${body.code}`);
  const tracks = qqSongsToTracks(body.songs);
  return {
    playlist: {
      id: String(body.id ?? id),
      name: body.name || fallbackName,
      cover: body.cover || tracks[0]?.cover,
      description: body.description,
      owner: body.creator,
      trackCount: body.total ?? tracks.length
    },
    tracks
  };
};
const loadQQMusicCollection = async (type, id, options) => {
  const originalId = decodeURIComponent(id);
  const fallbackName = options.fallbackName ?? originalId;
  if (type === "album") {
    const { album, tracks } = await fetchQQMusicAlbum(originalId, fallbackName);
    if (!options.signal?.aborted) {
      options.onUpdate({
        id: album.id ?? originalId,
        type,
        source: "qqmusic",
        title: album.name,
        cover: album.cover,
        creator: album.artist,
        tracks,
        trackCount: album.trackCount ?? tracks.length
      });
    }
    return;
  }
  if (type === "playlist") {
    const { playlist, tracks } = await fetchQQMusicPlaylist(originalId, fallbackName);
    if (!options.signal?.aborted) {
      options.onUpdate({
        id: playlist.id ?? originalId,
        type,
        source: "qqmusic",
        title: playlist.name,
        cover: playlist.cover,
        description: playlist.description,
        creator: playlist.owner,
        tracks,
        trackCount: playlist.trackCount ?? tracks.length
      });
    }
    return;
  }
  options.onUpdate(null);
};
const fetchKugouAlbum = async (id, fallbackName) => {
  const body = await kugou.album({ id });
  if (body.code !== 200) throw new Error(body.message || `KG 专辑请求失败: ${body.code}`);
  const tracks = kgSongsToTracks(body.songs);
  const first = tracks[0];
  const yearNum = body.publishTime ? parseInt(body.publishTime.slice(0, 4), 10) : void 0;
  return {
    album: {
      id: String(body.id ?? id),
      name: body.name || first?.album?.name || fallbackName,
      cover: body.cover || first?.cover,
      artist: body.artist || first?.artists.map((a) => a.name).join(" / "),
      trackCount: body.total ?? tracks.length,
      year: Number.isFinite(yearNum) ? yearNum : void 0
    },
    description: body.description,
    tracks
  };
};
const fetchKugouPlaylist = async (id, fallbackName) => {
  const body = await kugou.playlist({ id });
  if (body.code !== 200) throw new Error(body.message || `KG 歌单请求失败: ${body.code}`);
  const tracks = kgSongsToTracks(body.songs);
  return {
    playlist: {
      id: String(body.id ?? id),
      name: body.name || fallbackName,
      cover: body.cover || tracks[0]?.cover,
      description: body.description,
      owner: body.creator,
      trackCount: body.total ?? tracks.length
    },
    tracks
  };
};
const loadKugouCollection = async (type, id, options) => {
  const originalId = decodeURIComponent(id);
  const fallbackName = options.fallbackName ?? originalId;
  if (type === "album") {
    const { album, tracks, description } = await fetchKugouAlbum(originalId, fallbackName);
    if (!options.signal?.aborted) {
      options.onUpdate({
        id: album.id ?? originalId,
        type,
        source: "kugou",
        title: album.name,
        cover: album.cover,
        creator: album.artist,
        description,
        tracks,
        trackCount: album.trackCount ?? tracks.length
      });
    }
    return;
  }
  if (type === "playlist") {
    const { playlist, tracks } = await fetchKugouPlaylist(originalId, fallbackName);
    if (!options.signal?.aborted) {
      options.onUpdate({
        id: playlist.id ?? originalId,
        type,
        source: "kugou",
        title: playlist.name,
        cover: playlist.cover,
        description: playlist.description,
        creator: playlist.owner,
        tracks,
        trackCount: playlist.trackCount ?? tracks.length
      });
    }
    return;
  }
  options.onUpdate(null);
};
const loadStreamingCollection = async (type, id, options) => {
  const store = useStreamingStore();
  const originalId = decodeURIComponent(id);
  const fallbackName = options.fallbackName ?? originalId;
  if (type === "album") {
    const album = store.albums.find((item) => item.id === originalId);
    const tracks = await store.fetchAlbumSongs(originalId);
    if (options.signal?.aborted) return;
    options.onUpdate({
      id: originalId,
      type,
      source: "streaming",
      title: album?.name ?? fallbackName,
      cover: album?.cover ?? tracks[0]?.cover,
      creator: album?.artist,
      tracks,
      trackCount: tracks.length
    });
    return;
  }
  if (type === "playlist") {
    const playlist = store.playlists.find((item) => item.id === originalId);
    const tracks = await store.fetchPlaylistSongs(originalId);
    if (options.signal?.aborted) return;
    options.onUpdate({
      id: originalId,
      type,
      source: "streaming",
      title: playlist?.name ?? fallbackName,
      cover: playlist?.cover ?? tracks[0]?.cover,
      description: playlist?.description,
      creator: playlist?.owner,
      tracks,
      trackCount: tracks.length
    });
    return;
  }
  options.onUpdate(null);
};
const loadCollection = async (source, type, id, options) => {
  if (source === "local") return loadLocalCollection(type, id, options);
  if (source === "streaming") return loadStreamingCollection(type, id, options);
  if (source === "netease") return loadNeteaseCollection(type, id, options);
  if (source === "qqmusic") return loadQQMusicCollection(type, id, options);
  if (source === "kugou") return loadKugouCollection(type, id, options);
  options.onUpdate(null);
};
const useCollectionSubscribe = (collection) => {
  const { t } = useI18n();
  const userStore = useUserStore();
  const busy = ref(false);
  const isSubscribed = computed(() => {
    const current = collection.value;
    if (!current || current.source !== "netease") return false;
    if (current.type === "playlist") {
      return userStore.subscribedPlaylists.some((item) => item.id === current.id);
    }
    if (current.type === "album") {
      return userStore.albums.some((item) => item.id === current.id);
    }
    return false;
  });
  const available = computed(() => {
    const current = collection.value;
    if (!current || current.source !== "netease") return false;
    if (current.type === "playlist") {
      return !userStore.createdPlaylists.some((item) => item.id === current.id);
    }
    if (current.type === "album") return true;
    return false;
  });
  const toggle = async () => {
    const current = collection.value;
    if (!current || busy.value || !available.value) return;
    busy.value = true;
    try {
      const next = !isSubscribed.value;
      if (current.type === "playlist") {
        await userStore.togglePlaylistSubscribe(current.id, next);
      } else if (current.type === "album") {
        await userStore.toggleAlbumSubscribe(current.id, next);
      }
    } catch (err) {
      const message = err instanceof Error && err.message ? err.message : t("liked.toast.failed");
      toast.error(message);
    } finally {
      busy.value = false;
    }
  };
  return { available, isSubscribed, busy, toggle };
};
const errorMessage = (err, fallback) => err instanceof Error && err.message ? err.message : fallback;
const usePlaylistManage = (collection, options = {}) => {
  const { t } = useI18n();
  const playlistStore = usePlaylistStore();
  const userStore = useUserStore();
  const canManage = computed(() => {
    const current = collection.value;
    if (!current || current.type !== "playlist") return false;
    if (current.source === "local") return true;
    if (current.source !== "netease") return false;
    const isCreated = userStore.createdPlaylists.some((item) => item.id === current.id);
    const isLiked = userStore.likedPlaylistId === current.id;
    return isCreated && !isLiked;
  });
  const editOpen = ref(false);
  const editTitle = ref("");
  const editDescription = ref("");
  const submitting = ref(false);
  const openEdit = () => {
    const current = collection.value;
    if (!current) return;
    editTitle.value = current.title;
    editDescription.value = current.description ?? "";
    editOpen.value = true;
  };
  const saveEdit = async () => {
    const current = collection.value;
    if (!current || submitting.value || !editTitle.value.trim()) return;
    submitting.value = true;
    try {
      const title = editTitle.value.trim();
      const description = editDescription.value.trim();
      if (current.source === "local") {
        await playlistStore.update(current.id, {
          title,
          description: description || void 0
        });
      } else {
        await userStore.updatePlaylist(current.id, { name: title, description });
      }
      editOpen.value = false;
      options.onEdited?.();
    } catch (err) {
      toast.error(errorMessage(err, t("liked.toast.failed")));
    } finally {
      submitting.value = false;
    }
  };
  const deleteOpen = ref(false);
  const deleting = ref(false);
  const openDelete = () => {
    if (!collection.value) return;
    deleteOpen.value = true;
  };
  const confirmDelete = async () => {
    const current = collection.value;
    if (!current || deleting.value) return;
    deleting.value = true;
    try {
      if (current.source === "local") {
        await playlistStore.remove(current.id);
      } else {
        await userStore.deletePlaylist(current.id);
      }
      deleteOpen.value = false;
      options.onDeleted?.();
    } catch (err) {
      toast.error(errorMessage(err, t("liked.toast.failed")));
    } finally {
      deleting.value = false;
    }
  };
  return {
    canManage,
    editOpen,
    editTitle,
    editDescription,
    submitting,
    openEdit,
    saveEdit,
    deleteOpen,
    deleting,
    openDelete,
    confirmDelete
  };
};
const _hoisted_1 = { class: "flex flex-col h-full" };
const _hoisted_2 = {
  key: 0,
  class: "shrink-0 px-5 pb-2"
};
const _hoisted_3 = { class: "flex-1 flex flex-col min-w-0" };
const _hoisted_4 = { class: "flex min-w-0 items-center gap-3" };
const _hoisted_5 = ["aria-label"];
const _hoisted_6 = { class: "inline-flex size-6 cursor-default items-center justify-center" };
const _hoisted_7 = { class: "inline-flex size-6 cursor-default items-center justify-center text-primary/65" };
const _hoisted_8 = { class: "overflow-hidden flex flex-col gap-2" };
const _hoisted_9 = { class: "min-w-0 truncate text-on-surface-variant/70 transition-colors duration-200 group-hover:text-on-surface-variant group-focus-visible:text-on-surface-variant" };
const _hoisted_10 = {
  key: 1,
  class: "text-sm text-on-surface-variant/70 truncate"
};
const _hoisted_11 = { class: "flex items-center gap-3 text-sm leading-none text-on-surface-variant/50" };
const _hoisted_12 = {
  key: 0,
  class: "flex items-center gap-1 min-w-0"
};
const _hoisted_13 = { class: "truncate" };
const _hoisted_14 = { class: "flex items-center gap-1 shrink-0" };
const _hoisted_15 = {
  key: 1,
  class: "flex items-center gap-1 shrink-0"
};
const _hoisted_16 = {
  key: 2,
  class: "flex items-center gap-1 shrink-0"
};
const _hoisted_17 = { class: "mt-auto flex items-center justify-between gap-4" };
const _hoisted_18 = { class: "flex items-center gap-3" };
const _hoisted_19 = {
  key: "loading",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_20 = { class: "text-center text-on-surface-variant/60" };
const _hoisted_21 = { class: "text-sm" };
const _hoisted_22 = {
  key: "error",
  class: "flex-1 flex items-center justify-center px-6"
};
const _hoisted_23 = { class: "text-center text-red-500/85" };
const _hoisted_24 = { class: "text-sm font-medium mb-1" };
const _hoisted_25 = { class: "text-xs opacity-80 break-all max-w-xs mb-4" };
const _hoisted_26 = {
  key: "empty",
  class: "flex-1 flex items-center justify-center"
};
const _hoisted_27 = { class: "text-center text-on-surface-variant/50" };
const _hoisted_28 = { class: "text-sm" };
const _hoisted_29 = { class: "whitespace-pre-wrap break-words leading-6 text-on-surface-variant" };
const _hoisted_30 = { class: "flex flex-col gap-4" };
const _hoisted_31 = { class: "text-sm text-on-surface-variant" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Collection",
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const router = useRouter();
    const { copy } = useCopyText();
    const source = route.params.source;
    const type = route.params.type;
    const id = route.params.id;
    const collection = shallowRef(null);
    const loading = ref(false);
    const error = ref("");
    let loadAbort = null;
    const collapsed = ref(false);
    const descriptionOpen = ref(false);
    const handleListScroll = (event) => {
      const scrollTop = event.target.scrollTop;
      if (!collapsed.value && scrollTop > 10) {
        collapsed.value = true;
      } else if (collapsed.value && scrollTop === 0) {
        collapsed.value = false;
      }
    };
    const loadCollection$1 = async () => {
      collapsed.value = false;
      loadAbort?.abort();
      const myAbort = new AbortController();
      loadAbort = myAbort;
      loading.value = true;
      error.value = "";
      try {
        await loadCollection(source, type, id, {
          fallbackName: typeof route.query.name === "string" ? route.query.name : void 0,
          signal: myAbort.signal,
          onUpdate: (next) => {
            if (myAbort.signal.aborted) return;
            collection.value = next;
          }
        });
      } catch (err) {
        if (myAbort.signal.aborted) return;
        error.value = err instanceof Error ? err.message : String(err);
      } finally {
        if (!myAbort.signal.aborted) loading.value = false;
      }
    };
    const handleTracksRemoved = (removedIds) => {
      if (!collection.value || removedIds.length === 0) return;
      const removed = new Set(removedIds);
      const tracks = collection.value.tracks.filter((track) => !removed.has(track.id));
      collection.value = {
        ...collection.value,
        tracks,
        trackCount: tracks.length
      };
    };
    const typeLabel = computed(() => {
      const map = {
        album: t("collection.album"),
        playlist: t("collection.playlist"),
        radio: t("collection.radio"),
        cloud: t("cloud.title")
      };
      return map[type] ?? "";
    });
    const scopeLabel = computed(
      () => t(source === "local" ? "collection.scope.local" : "collection.scope.online")
    );
    const totalDuration = computed(() => {
      if (!collection.value) return "";
      const total = collection.value.tracks.reduce((sum, t2) => sum + t2.duration, 0);
      return total > 0 ? formatTime(total) : "";
    });
    const artistText = computed(() => {
      if (!collection.value?.artists?.length) return "";
      return collection.value.artists.map((a) => a.name).join(" / ");
    });
    const creatorText = computed(() => {
      return artistText.value || collection.value?.creator || "";
    });
    const updateTimeText = computed(() => {
      if (!collection.value?.updateTime) return "";
      return new Date(collection.value.updateTime).toLocaleDateString();
    });
    const playbackContext = computed(() => {
      const current = collection.value;
      if (!current || current.type === "cloud") return void 0;
      return {
        provider: current.source,
        originId: current.id,
        originType: current.type,
        originName: current.title
      };
    });
    const handlePlayAll = () => {
      if (!collection.value?.tracks.length) return;
      playFrom(collection.value.tracks, 0, playbackContext.value);
    };
    const searchQuery = ref("");
    const songListRef = shallowRef(null);
    const subscribe = useCollectionSubscribe(collection);
    const manage = usePlaylistManage(collection, {
      onEdited: () => loadCollection$1(),
      onDeleted: () => {
        if (window.history.length > 1) router.back();
        else router.replace("/");
      }
    });
    const editLabel = computed(() => t("collection.edit", { type: typeLabel.value }));
    const moreMenuItems = computed(() => {
      const isOnline = source !== "local" && source !== "streaming";
      const isLocal = source === "local";
      const list = [
        { key: "batchManage", label: t("songList.batch.manage"), icon: IconLucideListChecks },
        { key: "edit", label: editLabel.value, icon: IconLucidePencil, show: manage.canManage.value },
        {
          key: "delete",
          label: t("collection.delete", { type: typeLabel.value }),
          icon: IconLucideTrash2,
          separator: true,
          show: manage.canManage.value
        },
        {
          key: "more",
          label: t("collection.context.more"),
          icon: markRaw(IconLucideMoreHorizontal),
          children: [
            {
              key: "copyTitle",
              label: t(`collection.context.${type}.copyTitle`),
              icon: markRaw(IconCopy)
            },
            {
              key: "copyId",
              label: t(`collection.context.${type}.copyId`),
              icon: markRaw(IconCopy),
              show: !isLocal
            },
            {
              key: "copyUrl",
              label: t(`collection.context.${type}.copyUrl`),
              icon: markRaw(IconCopy),
              show: isOnline && type !== "cloud"
            }
          ]
        }
      ];
      return list;
    });
    const handleMoreMenu = (key) => {
      switch (key) {
        case "batchManage":
          songListRef.value?.enterBatch();
          break;
        case "edit":
          manage.openEdit();
          break;
        case "delete":
          manage.openDelete();
          break;
        case "copyTitle":
          copy(collection.value?.title);
          break;
        case "copyId":
          copy(collection.value?.id);
          break;
        case "copyUrl":
          copy(getCollectionShareUrl(collection.value));
          break;
      }
    };
    onMounted(() => {
      loadCollection$1();
    });
    onBeforeUnmount(() => {
      loadAbort?.abort();
    });
    return (_ctx, _cache) => {
      const _component_SImg = _sfc_main$1;
      const _component_IconLucideHardDrive = IconLucideHardDrive;
      const _component_IconLucideGlobe2 = __unplugin_components_2;
      const _component_STooltip = _sfc_main$2;
      const _component_SDivider = _sfc_main$3;
      const _component_IconLucideDisc3 = __unplugin_components_1$1;
      const _component_IconLucideRadio = __unplugin_components_6;
      const _component_IconLucideCloud = __unplugin_components_7;
      const _component_SButton = _sfc_main$4;
      const _component_IconLucidePlay = __unplugin_components_0;
      const _component_IconMaterialSymbolsFavoriteRounded = IconMaterialSymbolsFavoriteRounded;
      const _component_IconMaterialSymbolsFavoriteOutlineRounded = IconMaterialSymbolsFavoriteOutlineRounded;
      const _component_IconLucideEllipsis = IconLucideEllipsis;
      const _component_SDropdownMenu = _sfc_main$7;
      const _component_IconLucideSearch = __unplugin_components_2$1;
      const _component_SInput = _sfc_main$5;
      const _component_SLoading = __unplugin_components_5;
      const _component_IconLucideTriangleAlert = __unplugin_components_2$2;
      const _component_IconLucideRefreshCw = IconLucideRefreshCw;
      const _component_IconLucideMusic = __unplugin_components_4;
      const _component_SDialog = _sfc_main$6;
      const _component_SFormItem = _sfc_main$9;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        unref(collection) ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createBaseVNode("div", {
            class: normalizeClass(["flex mt-2 transition-[gap,margin] duration-300", unref(collapsed) ? "gap-3" : "gap-5"])
          }, [
            createVNode(_component_SImg, {
              src: unref(collection).cover,
              alt: unref(collection).title,
              class: normalizeClass(["rounded-xl shrink-0 transition-[width,height] duration-300", unref(collapsed) ? "size-20" : "size-40"])
            }, null, 8, ["src", "alt", "class"]),
            createBaseVNode("div", _hoisted_3, [
              createBaseVNode("div", {
                class: normalizeClass(["flex flex-col transition-[gap] duration-300", unref(collapsed) ? "gap-0.5" : "gap-2"])
              }, [
                createBaseVNode("div", _hoisted_4, [
                  createBaseVNode("h1", {
                    class: normalizeClass(["min-w-0 flex-1 font-bold text-on-surface truncate lh-normal transition-[font-size,line-height] duration-300", unref(collapsed) ? "text-xl" : "text-3xl"])
                  }, toDisplayString(unref(collection).title), 3),
                  createBaseVNode("div", {
                    class: "flex shrink-0 items-center gap-1 text-primary",
                    "aria-label": `${unref(scopeLabel)} · ${unref(typeLabel)}`
                  }, [
                    createVNode(_component_STooltip, { content: unref(scopeLabel) }, {
                      default: withCtx(() => [
                        createBaseVNode("span", _hoisted_6, [
                          unref(source) === "local" ? (openBlock(), createBlock(_component_IconLucideHardDrive, {
                            key: 0,
                            class: "size-4"
                          })) : (openBlock(), createBlock(_component_IconLucideGlobe2, {
                            key: 1,
                            class: "size-4"
                          }))
                        ])
                      ]),
                      _: 1
                    }, 8, ["content"]),
                    createVNode(_component_SDivider, { vertical: "" }),
                    createVNode(_component_STooltip, { content: unref(typeLabel) }, {
                      default: withCtx(() => [
                        createBaseVNode("span", _hoisted_7, [
                          unref(type) === "album" ? (openBlock(), createBlock(_component_IconLucideDisc3, {
                            key: 0,
                            class: "size-4"
                          })) : unref(type) === "playlist" ? (openBlock(), createBlock(unref(__unplugin_components_1), {
                            key: 1,
                            class: "size-4"
                          })) : unref(type) === "radio" ? (openBlock(), createBlock(_component_IconLucideRadio, {
                            key: 2,
                            class: "size-4"
                          })) : (openBlock(), createBlock(_component_IconLucideCloud, {
                            key: 3,
                            class: "size-4"
                          }))
                        ])
                      ]),
                      _: 1
                    }, 8, ["content"])
                  ], 8, _hoisted_5)
                ]),
                createBaseVNode("div", {
                  class: normalizeClass(["grid transition-[grid-template-rows,opacity] duration-300", unref(collapsed) ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"])
                }, [
                  createBaseVNode("div", _hoisted_8, [
                    unref(collection).description ? (openBlock(), createBlock(_component_SButton, {
                      key: 0,
                      variant: "text",
                      size: "auto",
                      block: "",
                      static: "",
                      class: "group max-w-full overflow-hidden text-left text-sm",
                      "aria-label": unref(t)("collection.viewIntroduction"),
                      onClick: _cache[0] || (_cache[0] = ($event) => descriptionOpen.value = true)
                    }, {
                      default: withCtx(() => [
                        createBaseVNode("span", _hoisted_9, toDisplayString(unref(collection).description), 1)
                      ]),
                      _: 1
                    }, 8, ["aria-label"])) : (openBlock(), createElementBlock("p", _hoisted_10, toDisplayString(unref(t)("collection.noDescription")), 1)),
                    createBaseVNode("div", _hoisted_11, [
                      unref(creatorText) ? (openBlock(), createElementBlock("span", _hoisted_12, [
                        createVNode(unref(IconLucideUser), { class: "shrink-0" }),
                        createBaseVNode("span", _hoisted_13, toDisplayString(unref(creatorText)), 1)
                      ])) : createCommentVNode("", true),
                      createBaseVNode("span", _hoisted_14, [
                        createVNode(unref(__unplugin_components_1), { class: "shrink-0" }),
                        createTextVNode(" " + toDisplayString(unref(t)("common.totalSongs", { count: unref(collection).tracks.length })), 1)
                      ]),
                      unref(totalDuration) ? (openBlock(), createElementBlock("span", _hoisted_15, [
                        createVNode(unref(IconLucideHourglass), { class: "shrink-0" }),
                        createTextVNode(" " + toDisplayString(unref(t)("collection.totalDuration", { time: unref(totalDuration) })), 1)
                      ])) : createCommentVNode("", true),
                      unref(updateTimeText) ? (openBlock(), createElementBlock("span", _hoisted_16, [
                        createVNode(unref(IconLucideCalendar), { class: "shrink-0" }),
                        createTextVNode(" " + toDisplayString(unref(updateTimeText)), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ], 2)
              ], 2),
              createBaseVNode("div", _hoisted_17, [
                createBaseVNode("div", _hoisted_18, [
                  createVNode(_component_SButton, {
                    type: "primary",
                    variant: "secondary",
                    round: "",
                    disabled: unref(collection).tracks.length === 0,
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
                  unref(subscribe).available.value ? (openBlock(), createBlock(_component_SButton, {
                    key: 0,
                    variant: "secondary",
                    round: "",
                    disabled: unref(subscribe).busy.value,
                    onClick: unref(subscribe).toggle
                  }, {
                    icon: withCtx(() => [
                      unref(subscribe).isSubscribed.value ? (openBlock(), createBlock(_component_IconMaterialSymbolsFavoriteRounded, { key: 0 })) : (openBlock(), createBlock(_component_IconMaterialSymbolsFavoriteOutlineRounded, { key: 1 }))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" " + toDisplayString(unref(t)(
                        unref(subscribe).isSubscribed.value ? "collection.unsubscribe" : "collection.subscribe"
                      )), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"])) : createCommentVNode("", true),
                  unref(moreMenuItems).length > 0 ? (openBlock(), createBlock(_component_SDropdownMenu, {
                    key: 1,
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
                  }, 8, ["items"])) : createCommentVNode("", true)
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
            ])
          ], 2)
        ])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: "fade",
          mode: "out-in",
          duration: 150
        }, {
          default: withCtx(() => [
            unref(collection) && unref(collection).tracks.length > 0 ? (openBlock(), createElementBlock("div", {
              key: unref(collection).id,
              class: "flex-1 min-h-0"
            }, [
              createVNode(_sfc_main$8, {
                ref_key: "songListRef",
                ref: songListRef,
                items: unref(collection).tracks,
                "search-query": unref(searchQuery),
                "show-album": unref(type) !== "album",
                "show-size": unref(source) === "local",
                source: unref(source),
                "collection-type": unref(type),
                "collection-id": unref(id),
                "playback-context": unref(playbackContext),
                "can-remove": unref(manage).canManage.value,
                "enable-sort": "",
                onScroll: handleListScroll,
                onChange: handleTracksRemoved
              }, null, 8, ["items", "search-query", "show-album", "show-size", "source", "collection-type", "collection-id", "playback-context", "can-remove"])
            ])) : unref(loading) ? (openBlock(), createElementBlock("div", _hoisted_19, [
              createBaseVNode("div", _hoisted_20, [
                createVNode(_component_SLoading, { class: "text-4xl text-primary/70 mb-4 mx-auto block" }),
                createBaseVNode("div", _hoisted_21, toDisplayString(unref(t)("common.loading")), 1)
              ])
            ])) : unref(error) ? (openBlock(), createElementBlock("div", _hoisted_22, [
              createBaseVNode("div", _hoisted_23, [
                createVNode(_component_IconLucideTriangleAlert, { class: "size-14 mx-auto mb-4 opacity-50" }),
                createBaseVNode("div", _hoisted_24, toDisplayString(unref(t)("search.errorTitle")), 1),
                createBaseVNode("div", _hoisted_25, toDisplayString(unref(error)), 1),
                createVNode(_component_SButton, {
                  type: "primary",
                  variant: "secondary",
                  onClick: loadCollection$1
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
            ])) : unref(collection) ? (openBlock(), createElementBlock("div", _hoisted_26, [
              createBaseVNode("div", _hoisted_27, [
                createVNode(_component_IconLucideMusic, { class: "size-12 mx-auto mb-3 opacity-30" }),
                createBaseVNode("div", _hoisted_28, toDisplayString(unref(t)("collection.empty")), 1)
              ])
            ])) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(_component_SDialog, {
          open: unref(descriptionOpen),
          "onUpdate:open": _cache[2] || (_cache[2] = ($event) => isRef(descriptionOpen) ? descriptionOpen.value = $event : null),
          title: unref(t)("collection.introduction", { type: unref(typeLabel) }),
          width: "min(520px, calc(100vw - 40px))"
        }, {
          default: withCtx(() => [
            createBaseVNode("p", _hoisted_29, toDisplayString(unref(collection)?.description), 1)
          ]),
          _: 1
        }, 8, ["open", "title"]),
        createVNode(_component_SDialog, {
          open: unref(manage).editOpen.value,
          "onUpdate:open": _cache[5] || (_cache[5] = ($event) => unref(manage).editOpen.value = $event),
          title: unref(editLabel),
          width: "400px"
        }, {
          footer: withCtx(({ close }) => [
            createVNode(_component_SButton, {
              variant: "secondary",
              disabled: unref(manage).submitting.value,
              onClick: close
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("common.cancel")), 1)
              ]),
              _: 1
            }, 8, ["disabled", "onClick"]),
            createVNode(_component_SButton, {
              type: "primary",
              disabled: !unref(manage).editTitle.value.trim(),
              loading: unref(manage).submitting.value,
              onClick: unref(manage).saveEdit
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("common.confirm")), 1)
              ]),
              _: 1
            }, 8, ["disabled", "loading", "onClick"])
          ]),
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_30, [
              createVNode(_component_SFormItem, {
                label: unref(t)("collection.name", { type: unref(typeLabel) })
              }, {
                default: withCtx(() => [
                  createVNode(_component_SInput, {
                    modelValue: unref(manage).editTitle.value,
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(manage).editTitle.value = $event),
                    disabled: unref(manage).submitting.value
                  }, null, 8, ["modelValue", "disabled"])
                ]),
                _: 1
              }, 8, ["label"]),
              createVNode(_component_SFormItem, {
                label: unref(t)("collection.description", { type: unref(typeLabel) })
              }, {
                default: withCtx(() => [
                  createVNode(_component_SInput, {
                    modelValue: unref(manage).editDescription.value,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(manage).editDescription.value = $event),
                    disabled: unref(manage).submitting.value
                  }, null, 8, ["modelValue", "disabled"])
                ]),
                _: 1
              }, 8, ["label"])
            ])
          ]),
          _: 1
        }, 8, ["open", "title"]),
        createVNode(_component_SDialog, {
          open: unref(manage).deleteOpen.value,
          "onUpdate:open": _cache[6] || (_cache[6] = ($event) => unref(manage).deleteOpen.value = $event),
          title: unref(t)("collection.delete", { type: unref(typeLabel) })
        }, {
          footer: withCtx(({ close }) => [
            createVNode(_component_SButton, {
              variant: "secondary",
              disabled: unref(manage).deleting.value,
              onClick: close
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("common.cancel")), 1)
              ]),
              _: 1
            }, 8, ["disabled", "onClick"]),
            createVNode(_component_SButton, {
              type: "error",
              loading: unref(manage).deleting.value,
              onClick: unref(manage).confirmDelete
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("common.confirm")), 1)
              ]),
              _: 1
            }, 8, ["loading", "onClick"])
          ]),
          default: withCtx(() => [
            createBaseVNode("p", _hoisted_31, toDisplayString(unref(t)("collection.deleteConfirm", { type: unref(typeLabel), title: unref(collection)?.title ?? "" })), 1)
          ]),
          _: 1
        }, 8, ["open", "title"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
