import { _ as _sfc_main$2 } from "./SDialog.vue_vue_type_script_setup_true_lang-CV-u92W-.js";
import { _ as _sfc_main$7, b as _sfc_main$8, g as usePlaylistStore, h as __unplugin_components_7, e as __unplugin_components_11, c as _sfc_main$d } from "./more-horizontal-BtOolk7_.js";
import { _ as _sfc_main$6 } from "./SCard.vue_vue_type_script_setup_true_lang-Cskq96gD.js";
import { _ as _sfc_main$5 } from "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
import { _ as _sfc_main$4 } from "./SButton.vue_vue_type_style_index_0_lang-BleyteE8.js";
import { _ as _sfc_main$3 } from "./SImg.vue_vue_type_script_setup_true_lang-vR58cydP.js";
import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode, x as defineComponent, w as watch, r as ref, P as createBlock, Q as withCtx, v as unref, D as createVNode, O as toDisplayString, B as createCommentVNode, W as createTextVNode, i as isRef, F as Fragment, N as renderList, Y as withKeys, M as normalizeClass, c as computed, f as reactive, q as shallowRef, ae as onActivated, U as Transition, _ as renderSlot, V as withModifiers } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { bk as songsToTracks, bl as netease, ad as withPicSize, aW as qqmusic, aX as kugou, u as useI18n, d as useStatusStore, a$ as ALL_PLATFORMS, b0 as PLATFORM_SHORT_NAME, t as toast, bm as saveTrackTags, bn as handleError, aA as useLibraryStore, aa as useUserStore, as as insertManyToQueue, bo as purgeDeletedTracks, x as useMediaStore, a as useSettingsStore, X as useFavorite, s as storeToRefs, at as playFrom, a0 as togglePlay, af as playNow, aB as isLosslessQuality, I as getQualityLabel, a9 as navigateToArtist, ak as navigateToAlbum } from "./index-DVKNk9gd.js";
import { f as formatFileSize } from "./format-DoPtjAAN.js";
import { d as formatTime, u as useDownload } from "./useDownload-DvR_TELr.js";
import { u as usePlaylistPicker, e as useTrackMenu, f as _sfc_main$9, b as _sfc_main$a, I as IconMaterialSymbolsFavoriteRounded, j as IconLucideListEnd, d as IconLucideListPlus, k as IconLucideListMinus, l as IconLucideCloudOff, g as _sfc_main$e, _ as _sfc_main$g, a as __unplugin_components_16 } from "./SRadioGroup.vue_vue_type_script_setup_true_lang-CA7DTWUw.js";
import { _ as _sfc_main$b } from "./SVirtualList.vue_vue_type_script_setup_true_lang-Dm-GOJzz.js";
import { _ as __unplugin_components_5 } from "./SLoading-C4RltnK4.js";
import { _ as __unplugin_components_0 } from "./play-jYzYuagg.js";
import { I as IconLucidePause } from "./pause-u3QmqHX9.js";
import { _ as __unplugin_components_4 } from "./music-zyEhNUlm.js";
import { _ as _sfc_main$c, a as _sfc_main$f } from "./SCheckbox.vue_vue_type_script_setup_true_lang-Cne9YtVQ.js";
import { u as useFloatingPlayerBar } from "./useFloatingPlayerBar-R2fVODYZ.js";
import { I as IconLucideArrowUpDown } from "./arrow-up-down-Dw8Z8Wwk.js";
import { I as IconLucideDownload } from "./folder-open-Cw_0c4cI.js";
import { I as IconLucideTrash2 } from "./trash-2-BKyCA-Fb.js";
import { _ as __unplugin_components_11$1 } from "./x-Cd6Sow4a.js";
import { I as IconMaterialSymbolsFavoriteOutlineRounded } from "./favorite-outline-rounded-C5xed2i3.js";
const TYPE = { songs: 1, albums: 10, artists: 100, playlists: 1e3 };
const call = (type, keyword, offset, limit) => netease.cloudsearch({
  keywords: keyword,
  type: TYPE[type],
  offset,
  limit
});
const albumToCover = (album) => ({
  id: String(album.id),
  title: album.name,
  cover: withPicSize(album.picUrl),
  subtitle: (album.artists ?? []).map((artist) => artist.name).join(" / "),
  trackCount: album.size ?? 0
});
const artistToCover = (artist) => ({
  id: String(artist.id),
  title: artist.name,
  cover: withPicSize(artist.img1v1Url ?? artist.picUrl),
  subtitle: "",
  trackCount: artist.albumSize ?? 0
});
const playlistToCover = (playlist) => ({
  id: String(playlist.id),
  title: playlist.name,
  cover: withPicSize(playlist.coverImgUrl),
  subtitle: playlist.creator?.nickname ?? "",
  trackCount: playlist.trackCount ?? 0
});
const songs$2 = async (keyword, offset, limit) => {
  const body = await call("songs", keyword, offset, limit);
  const items = songsToTracks(body?.result?.songs);
  const total = body?.result?.songCount ?? items.length;
  return { items, total, hasMore: offset + items.length < total };
};
const albums$2 = async (keyword, offset, limit) => {
  const body = await call("albums", keyword, offset, limit);
  const items = (body?.result?.albums ?? []).map(albumToCover);
  const total = body?.result?.albumCount ?? items.length;
  return { items, total, hasMore: offset + items.length < total };
};
const artists$2 = async (keyword, offset, limit) => {
  const body = await call("artists", keyword, offset, limit);
  const items = (body?.result?.artists ?? []).map(artistToCover);
  const total = body?.result?.artistCount ?? items.length;
  return { items, total, hasMore: offset + items.length < total };
};
const playlists$2 = async (keyword, offset, limit) => {
  const body = await call("playlists", keyword, offset, limit);
  const items = (body?.result?.playlists ?? []).map(playlistToCover);
  const total = body?.result?.playlistCount ?? items.length;
  return { items, total, hasMore: offset + items.length < total };
};
const qqAlbumCover = (mid, size = 300) => `https://y.gtimg.cn/music/photo_new/T002R${size}x${size}M000${mid}.jpg`;
const qqArtistCover = (mid, size = 300) => `https://y.gtimg.cn/music/photo_new/T001R${size}x${size}M000${mid}.jpg`;
const qqTrackFee = (song) => {
  if (song.pay?.payalbum === 1) return 4;
  if (song.pay?.payplay === 1) return 1;
  return 0;
};
const qqTrackQuality = (song) => {
  const durationSeconds = song.duration / 1e3;
  const create = (codec, fileSize, bitRate, bitsPerSample, sampleRate = 44100) => ({
    fileSize,
    quality: {
      codec,
      sampleRate,
      channels: 2,
      bitsPerSample,
      bitRate: bitRate || (durationSeconds > 0 ? Math.round(fileSize * 8 / durationSeconds) : 0)
    }
  });
  if (song.sizeHiRes) {
    return create(
      "flac",
      song.sizeHiRes,
      0,
      song.hiResBitDepth || 24,
      song.hiResSampleRate || 96e3
    );
  }
  if (song.sizeFlac) return create("flac", song.sizeFlac, 0, 16);
  if (song.sizeApe) return create("ape", song.sizeApe, 0, 16);
  if (song.size320) return create("mp3", song.size320, 32e4, 16);
  if (song.sizeOgg) return create("ogg", song.sizeOgg, 0, 16);
  if (song.size128) return create("mp3", song.size128, 128e3, 16);
  return void 0;
};
const qqSongToTrack = (song) => {
  const cover = song.cover || (song.albumMid ? qqAlbumCover(song.albumMid) : void 0);
  const audio = qqTrackQuality(song);
  return {
    id: song.mid || song.id,
    extId: song.mid && song.id !== song.mid ? song.id : void 0,
    mediaId: song.mediaMid || void 0,
    source: "qqmusic",
    title: song.name,
    artists: song.artists?.length ? song.artists.map((artist) => ({ id: artist.mid, name: artist.name ?? "" })) : song.artist ? [{ name: song.artist }] : [],
    album: song.album ? { id: song.albumMid, name: song.album, cover } : void 0,
    duration: song.duration ?? 0,
    quality: audio?.quality,
    fileSize: audio?.fileSize,
    fee: qqTrackFee(song),
    cover,
    coverOriginal: song.coverOriginal || (song.albumMid ? qqAlbumCover(song.albumMid, 800) : void 0)
  };
};
const qqSongsToTracks = (songs2) => songs2?.map(qqSongToTrack) ?? [];
const qqAlbumToCoverItem = (album) => ({
  id: album.id,
  title: album.name,
  cover: album.cover,
  subtitle: album.artist ?? "",
  trackCount: album.trackCount ?? 0
});
const qqArtistToCoverItem = (artist) => ({
  id: artist.id,
  title: artist.name,
  cover: artist.cover,
  subtitle: "",
  trackCount: artist.albumCount ?? 0
});
const qqPlaylistToCoverItem = (playlist) => ({
  id: playlist.id,
  title: playlist.name,
  cover: playlist.cover,
  subtitle: playlist.creator ?? "",
  trackCount: playlist.trackCount ?? 0
});
const result$1 = (items, total, offset) => ({
  items,
  total,
  hasMore: offset + items.length < total
});
const songs$1 = async (keyword, offset, limit) => {
  const body = await qqmusic.search({
    keywords: keyword,
    type: 0,
    page: Math.floor(offset / limit) + 1,
    limit
  });
  const items = (body.songs ?? []).map(qqSongToTrack);
  return result$1(items, body.total ?? items.length, offset);
};
const albums$1 = async (keyword, offset, limit) => {
  const body = await qqmusic.search({
    keywords: keyword,
    type: 8,
    page: Math.floor(offset / limit) + 1,
    limit
  });
  const items = (body.albums ?? []).map(qqAlbumToCoverItem);
  return result$1(items, body.total ?? items.length, offset);
};
const artists$1 = async (keyword, offset, limit) => {
  const requestLimit = Math.min(limit, 30);
  const body = await qqmusic.search({
    keywords: keyword,
    type: 9,
    page: Math.floor(offset / requestLimit) + 1,
    limit: requestLimit
  });
  const items = (body.artists ?? []).map(qqArtistToCoverItem);
  return result$1(items, body.total ?? items.length, offset);
};
const playlists$1 = async (keyword, offset, limit) => {
  const body = await qqmusic.search({
    keywords: keyword,
    type: 2,
    page: Math.floor(offset / limit) + 1,
    limit
  });
  const items = (body.playlists ?? []).map(qqPlaylistToCoverItem);
  return result$1(items, body.total ?? items.length, offset);
};
const kgTrackFee = (song) => {
  const payType = song.pay?.payplay ?? 0;
  const privilege = song.pay?.privilege ?? 0;
  const feeType = song.pay?.feetype ?? 0;
  const pkgPrice = song.pay?.pkg_price ?? 0;
  const price = song.pay?.price ?? 0;
  if (feeType === 1 || payType === 2 || pkgPrice === 0 && price > 0) {
    return 4;
  }
  if (payType === 1 || payType === 3 || privilege >= 8) {
    return 1;
  }
  return 0;
};
const normalizeDurationMs = (duration, interval) => {
  if (duration !== void 0 && duration > 0) {
    if (interval && interval > 0 && duration === interval) {
      return interval * 1e3;
    }
    if (duration < 1e4) {
      return duration * 1e3;
    }
    return duration;
  }
  if (interval !== void 0 && interval > 0) {
    return interval * 1e3;
  }
  return 0;
};
const kgTrackQuality = (song, durationMs) => {
  const durationSeconds = durationMs > 0 ? durationMs / 1e3 : 0;
  const create = (codec, fileSize, bitRate, bitsPerSample, sampleRate = 44100) => ({
    fileSize,
    quality: {
      codec,
      sampleRate,
      channels: 2,
      bitsPerSample,
      bitRate: bitRate || (durationSeconds > 0 ? Math.round(fileSize * 8 / durationSeconds) : 0)
    }
  });
  const sizes = song.sizes;
  if (sizes?.flac24bit) return create("flac", sizes.flac24bit, 0, 24, 96e3);
  if (sizes?.flac) return create("flac", sizes.flac, 0, 16);
  if (sizes?.["320k"]) return create("mp3", sizes["320k"], 32e4, 16);
  if (sizes?.["128k"]) return create("mp3", sizes["128k"], 128e3, 16);
  return void 0;
};
const kgSongToTrack = (song) => {
  const durationMs = normalizeDurationMs(song.duration, song.interval);
  const audio = kgTrackQuality(song, durationMs);
  const artists2 = song.artists?.length ? song.artists.map((a) => ({
    id: a.id !== void 0 ? String(a.id) : a.name || void 0,
    name: a.name
  })) : song.artist ? [
    {
      id: song.artistId !== void 0 ? String(song.artistId) : song.artist,
      name: song.artist
    }
  ] : [];
  return {
    id: song.hash || song.id,
    extId: String(song.albumAudioId ?? song.id),
    source: "kugou",
    title: song.name,
    artists: artists2,
    album: song.album ? {
      id: song.albumId ? String(song.albumId) : void 0,
      name: song.album,
      cover: song.cover
    } : void 0,
    duration: durationMs,
    quality: audio?.quality,
    fileSize: audio?.fileSize,
    fee: kgTrackFee(song),
    cover: song.cover,
    coverOriginal: song.coverOriginal
  };
};
const kgSongsToTracks = (songs2) => songs2?.map(kgSongToTrack) ?? [];
const kgAlbumToCoverItem = (album) => ({
  id: album.id,
  title: album.name,
  cover: album.cover,
  subtitle: album.artist ?? "",
  trackCount: album.trackCount ?? 0
});
const kgArtistToCoverItem = (artist) => ({
  id: artist.id,
  title: artist.name,
  cover: artist.cover,
  subtitle: "",
  trackCount: artist.albumCount ?? 0
});
const kgPlaylistToCoverItem = (playlist) => ({
  id: playlist.id,
  title: playlist.name,
  cover: playlist.cover,
  subtitle: playlist.creator ?? "",
  trackCount: playlist.trackCount ?? 0
});
const result = (items, total, offset) => ({
  items,
  total,
  hasMore: offset + items.length < total
});
const songs = async (keyword, offset, limit) => {
  const body = await kugou.search({
    keywords: keyword,
    type: 0,
    page: Math.floor(offset / limit) + 1,
    limit
  });
  const items = (body.songs ?? []).map(kgSongToTrack);
  return result(items, body.total ?? items.length, offset);
};
const albums = async (keyword, offset, limit) => {
  const body = await kugou.search({
    keywords: keyword,
    type: 8,
    page: Math.floor(offset / limit) + 1,
    limit
  });
  const items = (body.albums ?? []).map(kgAlbumToCoverItem);
  return result(items, body.total ?? items.length, offset);
};
const artists = async (keyword, offset, limit) => {
  const body = await kugou.search({
    keywords: keyword,
    type: 9,
    page: Math.floor(offset / limit) + 1,
    limit
  });
  const items = (body.artists ?? []).map(kgArtistToCoverItem);
  return result(items, body.total ?? items.length, offset);
};
const playlists = async (keyword, offset, limit) => {
  const body = await kugou.search({
    keywords: keyword,
    type: 2,
    page: Math.floor(offset / limit) + 1,
    limit
  });
  const items = (body.playlists ?? []).map(kgPlaylistToCoverItem);
  return result(items, body.total ?? items.length, offset);
};
const unsupported = (platform, category) => {
  throw new Error(`Search not yet supported: ${platform}.${category}`);
};
const searchSongs = (platform, keyword, offset, limit) => {
  if (platform === "netease") return songs$2(keyword, offset, limit);
  if (platform === "qqmusic") return songs$1(keyword, offset, limit);
  if (platform === "kugou") return songs(keyword, offset, limit);
  return unsupported(platform, "songs");
};
const searchAlbums = (platform, keyword, offset, limit) => {
  if (platform === "netease") return albums$2(keyword, offset, limit);
  if (platform === "qqmusic") return albums$1(keyword, offset, limit);
  if (platform === "kugou") return albums(keyword, offset, limit);
  return unsupported(platform, "albums");
};
const searchArtists = (platform, keyword, offset, limit) => {
  if (platform === "netease") return artists$2(keyword, offset, limit);
  if (platform === "qqmusic") return artists$1(keyword, offset, limit);
  if (platform === "kugou") return artists(keyword, offset, limit);
  return unsupported(platform, "artists");
};
const searchPlaylists = (platform, keyword, offset, limit) => {
  if (platform === "netease") return playlists$2(keyword, offset, limit);
  if (platform === "qqmusic") return playlists$1(keyword, offset, limit);
  if (platform === "kugou") return playlists(keyword, offset, limit);
  return unsupported(platform, "playlists");
};
const normalize = (text) => {
  if (!text) return "";
  return text.toLowerCase().replace(/[、&;，,/|()·・\s\-_'"`~!?？！.。]+/g, "");
};
const bothContains = (left, right) => left.length > 0 && right.length > 0 && (left.includes(right) || right.includes(left));
const durationDiff = (leftMs, rightMs) => {
  if (!leftMs || !rightMs) return null;
  return Math.abs(leftMs - rightMs);
};
const rankTagCandidates = (candidates, context) => {
  const ctxTitle = normalize(context.title);
  const ctxArtist = normalize(context.artist);
  const ctxAlbum = normalize(context.album);
  const ranked = candidates.map((track) => {
    const candTitle = normalize(track.title);
    const candArtist = normalize(track.artists.map((artist) => artist.name).join(""));
    const candAlbum = normalize(track.album?.name);
    const diff = durationDiff(track.duration, context.durationMs);
    const titleExact = candTitle.length > 0 && candTitle === ctxTitle;
    const artistExact = ctxArtist.length > 0 && candArtist === ctxArtist;
    let score = 0;
    if (titleExact) score += 10;
    else if (bothContains(candTitle, ctxTitle)) score += 4;
    if (artistExact) score += 5;
    else if (bothContains(candArtist, ctxArtist)) score += 2;
    if (ctxAlbum && candAlbum === ctxAlbum) score += 2;
    if (diff !== null && diff <= 5e3) score += 3;
    return { track, score, durationFar: diff !== null && diff > 2e4 };
  });
  return ranked.sort((left, right) => {
    if (left.durationFar !== right.durationFar) return left.durationFar ? 1 : -1;
    return right.score - left.score;
  });
};
const _hoisted_1$6 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$6, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m21.64 3.64l-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72M14 7l3 3M5 6v4m14 4v4M10 2v2M7 8H3m18 8h-4M11 3H9"
    }, null, -1)
  ])]);
}
const IconWandSparkles = markRaw({ name: "lucide-wand-sparkles", render: render$4 });
const _hoisted_1$5 = { class: "flex flex-col gap-4" };
const _hoisted_2$1 = { class: "flex items-stretch gap-4" };
const _hoisted_3$1 = { class: "flex flex-col justify-between min-w-0 py-0.5" };
const _hoisted_4$1 = { class: "flex flex-col gap-0.5 min-w-0" };
const _hoisted_5$1 = ["title"];
const _hoisted_6$1 = ["title"];
const _hoisted_7$1 = {
  key: 0,
  class: "text-xs text-on-surface-variant/70"
};
const _hoisted_8$1 = { class: "flex items-center gap-2" };
const _hoisted_9$1 = { class: "flex-1 text-sm text-on-surface" };
const _hoisted_10$1 = { class: "w-24 shrink-0" };
const _hoisted_11$1 = {
  key: 0,
  class: "mt-2.5 flex flex-col gap-0.5 max-h-56 overflow-y-auto"
};
const _hoisted_12$1 = ["onClick", "onKeydown"];
const _hoisted_13$1 = { class: "flex flex-col min-w-0 flex-1" };
const _hoisted_14$1 = { class: "text-sm truncate" };
const _hoisted_15$1 = { class: "text-xs text-on-surface-variant/70 truncate" };
const _hoisted_16$1 = { class: "text-xs text-on-surface-variant/70 tabular-nums shrink-0" };
const _hoisted_17$1 = { class: "grid grid-cols-2 gap-3" };
const _hoisted_18$1 = { class: "flex flex-col gap-1 col-span-2" };
const _hoisted_19$1 = { class: "text-xs text-on-surface-variant" };
const _hoisted_20$1 = { class: "flex flex-col gap-1" };
const _hoisted_21$1 = { class: "text-xs text-on-surface-variant" };
const _hoisted_22$1 = { class: "flex flex-col gap-1" };
const _hoisted_23$1 = { class: "text-xs text-on-surface-variant" };
const _hoisted_24$1 = { class: "flex flex-col gap-1" };
const _hoisted_25$1 = { class: "text-xs text-on-surface-variant" };
const _hoisted_26$1 = { class: "flex flex-col gap-1" };
const _hoisted_27$1 = { class: "text-xs text-on-surface-variant" };
const _hoisted_28$1 = { class: "flex flex-col gap-1" };
const _hoisted_29$1 = { class: "text-xs text-on-surface-variant" };
const _hoisted_30$1 = { class: "grid grid-cols-2 gap-3" };
const _hoisted_31$1 = { class: "flex flex-col gap-1" };
const _hoisted_32$1 = { class: "text-xs text-on-surface-variant" };
const _hoisted_33$1 = { class: "flex flex-col gap-1" };
const _hoisted_34$1 = { class: "text-xs text-on-surface-variant" };
const _hoisted_35$1 = { class: "flex flex-col gap-1" };
const _hoisted_36$1 = { class: "text-xs text-on-surface-variant" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TagEditorDialog",
  props: {
    open: { type: Boolean },
    track: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const fileName = computed(
      () => (props.track?.cueAudioPath ?? props.track?.path)?.split(/[/\\]/).pop() ?? ""
    );
    const fileMeta = computed(() => {
      const parts = [];
      const codec = props.track?.quality?.codec;
      if (codec) parts.push(codec.toUpperCase());
      const size = props.track?.fileSize;
      if (size) parts.push(formatFileSize(size));
      return parts.join(" · ");
    });
    const original = shallowRef(null);
    const loading = ref(false);
    const saving = ref(false);
    const form = reactive({
      title: "",
      artist: "",
      album: "",
      albumArtist: "",
      genre: "",
      year: null,
      trackNumber: null,
      discNumber: null,
      lyrics: ""
    });
    const newCoverPath = ref(null);
    const newCoverPreview = ref(null);
    const resetForm = (tags) => {
      form.title = tags?.title ?? "";
      form.artist = tags?.artist ?? "";
      form.album = tags?.album ?? "";
      form.albumArtist = tags?.albumArtist ?? "";
      form.genre = tags?.genre ?? "";
      form.year = tags?.year ?? null;
      form.trackNumber = tags?.trackNumber ?? null;
      form.discNumber = tags?.discNumber ?? null;
      form.lyrics = tags?.lyrics ?? "";
      newCoverPath.value = null;
      newCoverUrl.value = null;
      newCoverPreview.value = null;
      candidates.value = [];
      candidatesVisible.value = false;
    };
    watch(
      () => props.open,
      async (open) => {
        if (!open || !props.track?.path || props.track.cuePath) return;
        loading.value = true;
        original.value = null;
        resetForm(null);
        const result2 = await window.api.library.readTags(props.track.path);
        loading.value = false;
        if (!result2.success || !result2.data) {
          if (result2.error) handleError(result2.error);
          emit("update:open", false);
          return;
        }
        original.value = result2.data;
        resetForm(result2.data);
      }
    );
    const pickCover = async () => {
      const result2 = await window.api.library.pickCoverImage();
      if (!result2.success || !result2.data) return;
      newCoverPath.value = result2.data.path;
      newCoverUrl.value = null;
      newCoverPreview.value = result2.data.dataUrl;
    };
    const newCoverUrl = ref(null);
    const matchPlatform = ref(useStatusStore().searchPlatform);
    const platformOptions = ALL_PLATFORMS.map((key) => ({
      value: key,
      label: PLATFORM_SHORT_NAME[key]
    }));
    const matching = ref(false);
    const candidates = shallowRef([]);
    const candidatesVisible = ref(false);
    const handleOnlineMatch = async () => {
      const keyword = `${form.title.trim()} ${form.artist.trim()}`.trim();
      if (!keyword || matching.value) return;
      matching.value = true;
      try {
        const result2 = await searchSongs(matchPlatform.value, keyword, 0, 10);
        const ranked = rankTagCandidates(result2.items, {
          title: form.title,
          artist: form.artist,
          album: form.album,
          durationMs: props.track?.duration
        });
        candidates.value = ranked;
        candidatesVisible.value = ranked.length > 0;
        if (ranked.length === 0) toast.info(t("tagEditor.noMatches"));
      } catch {
        toast.error(t("errors.NETWORK_ERROR"));
      } finally {
        matching.value = false;
      }
    };
    const fillLyricFromCandidate = async (track) => {
      const lookupId = matchPlatform.value === "qqmusic" ? track.extId ?? track.id : track.id;
      try {
        const resp = await window.api.lyrics.matchById(matchPlatform.value, lookupId);
        if (resp.ok && resp.data?.content) form.lyrics = resp.data.content;
      } catch {
      }
    };
    const applyCandidate = (candidate) => {
      const online = candidate.track;
      form.title = online.title;
      form.artist = online.artists.map((artist) => artist.name).join("/");
      if (online.album?.name) form.album = online.album.name;
      const coverUrl = online.coverOriginal ?? online.cover;
      if (coverUrl && /^https?:\/\//i.test(coverUrl)) {
        newCoverUrl.value = coverUrl;
        newCoverPath.value = null;
        newCoverPreview.value = coverUrl;
      }
      candidatesVisible.value = false;
      void fillLyricFromCandidate(online);
    };
    const diffText = (origValue, current) => {
      return (origValue ?? "") === current ? void 0 : current;
    };
    const diffNumber = (origValue, current) => {
      const next = current ?? 0;
      return (origValue ?? 0) === next ? void 0 : next;
    };
    const handleSave = async () => {
      const track = props.track;
      const tags = original.value;
      if (!track?.path || !tags || saving.value) return;
      const edit = {
        path: track.path,
        title: diffText(tags.title, form.title.trim()),
        artist: diffText(tags.artist, form.artist.trim()),
        album: diffText(tags.album, form.album.trim()),
        albumArtist: diffText(tags.albumArtist, form.albumArtist.trim()),
        genre: diffText(tags.genre, form.genre.trim()),
        year: diffNumber(tags.year, form.year),
        trackNumber: diffNumber(tags.trackNumber, form.trackNumber),
        discNumber: diffNumber(tags.discNumber, form.discNumber),
        lyrics: diffText(tags.lyrics, form.lyrics),
        coverPath: newCoverPath.value ?? void 0,
        coverUrl: newCoverUrl.value ?? void 0
      };
      const changed = Object.entries(edit).some(
        ([key, value]) => key !== "path" && value !== void 0
      );
      if (!changed) {
        emit("update:open", false);
        return;
      }
      saving.value = true;
      const outcomes = await saveTrackTags([edit]);
      saving.value = false;
      const outcome = outcomes?.[0];
      if (outcome?.success) {
        toast.success(t("tagEditor.saveSuccess"));
        emit("update:open", false);
      } else if (outcome?.error) {
        toast.error(`${t("tagEditor.saveFailed")}: ${outcome.error}`);
      }
    };
    return (_ctx, _cache) => {
      const _component_SImg = _sfc_main$3;
      const _component_SButton = _sfc_main$4;
      const _component_SSelect = _sfc_main$5;
      const _component_SCard = _sfc_main$6;
      const _component_SInput = _sfc_main$7;
      const _component_SNumberInput = _sfc_main$8;
      const _component_SDialog = _sfc_main$2;
      return openBlock(), createBlock(_component_SDialog, {
        open: __props.open,
        title: unref(t)("tagEditor.title"),
        width: "560px",
        "onUpdate:open": _cache[11] || (_cache[11] = ($event) => emit("update:open", $event))
      }, {
        footer: withCtx(() => [
          createVNode(_component_SButton, {
            variant: "secondary",
            disabled: unref(saving),
            onClick: _cache[10] || (_cache[10] = ($event) => emit("update:open", false))
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("common.cancel")), 1)
            ]),
            _: 1
          }, 8, ["disabled"]),
          createVNode(_component_SButton, {
            loading: unref(saving),
            disabled: unref(loading),
            onClick: handleSave
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("common.save")), 1)
            ]),
            _: 1
          }, 8, ["loading", "disabled"])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$5, [
            createBaseVNode("div", _hoisted_2$1, [
              createVNode(_component_SImg, {
                src: unref(newCoverPreview) ?? __props.track?.cover,
                class: "size-24 shrink-0 rounded-lg overflow-hidden"
              }, null, 8, ["src"]),
              createBaseVNode("div", _hoisted_3$1, [
                createBaseVNode("div", _hoisted_4$1, [
                  createBaseVNode("span", {
                    class: "text-sm font-medium truncate",
                    title: unref(fileName)
                  }, toDisplayString(unref(fileName)), 9, _hoisted_5$1),
                  createBaseVNode("span", {
                    class: "text-xs text-on-surface-variant/70 truncate",
                    title: __props.track?.path
                  }, toDisplayString(__props.track?.path), 9, _hoisted_6$1),
                  unref(fileMeta) ? (openBlock(), createElementBlock("span", _hoisted_7$1, toDisplayString(unref(fileMeta)), 1)) : createCommentVNode("", true)
                ]),
                createVNode(_component_SButton, {
                  variant: "secondary",
                  size: "small",
                  class: "w-fit",
                  onClick: pickCover
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("tagEditor.replaceCover")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            createVNode(_component_SCard, {
              size: "small",
              variant: "primary"
            }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_8$1, [
                  createBaseVNode("span", _hoisted_9$1, toDisplayString(unref(t)("tagEditor.matchHint")), 1),
                  createBaseVNode("div", _hoisted_10$1, [
                    createVNode(_component_SSelect, {
                      modelValue: unref(matchPlatform),
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(matchPlatform) ? matchPlatform.value = $event : null),
                      options: unref(platformOptions)
                    }, null, 8, ["modelValue", "options"])
                  ]),
                  createVNode(_component_SButton, {
                    type: "primary",
                    size: "small",
                    class: "shrink-0",
                    loading: unref(matching),
                    disabled: !unref(form).title.trim() && !unref(form).artist.trim(),
                    onClick: handleOnlineMatch
                  }, {
                    icon: withCtx(() => [
                      createVNode(unref(IconWandSparkles))
                    ]),
                    default: withCtx(() => [
                      createTextVNode(" " + toDisplayString(unref(t)("tagEditor.onlineMatch")), 1)
                    ]),
                    _: 1
                  }, 8, ["loading", "disabled"])
                ]),
                unref(candidatesVisible) ? (openBlock(), createElementBlock("div", _hoisted_11$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(candidates), (candidate) => {
                    return openBlock(), createElementBlock("div", {
                      key: candidate.track.id,
                      role: "button",
                      tabindex: "0",
                      class: normalizeClass([
                        "flex items-center gap-2.5 p-1.5 rounded-md cursor-pointer transition-colors hover:bg-on-surface/8",
                        candidate.durationFar && "opacity-45"
                      ]),
                      onClick: ($event) => applyCandidate(candidate),
                      onKeydown: withKeys(($event) => applyCandidate(candidate), ["enter"])
                    }, [
                      createVNode(_component_SImg, {
                        src: candidate.track.cover,
                        class: "size-10 shrink-0 rounded-md overflow-hidden"
                      }, null, 8, ["src"]),
                      createBaseVNode("div", _hoisted_13$1, [
                        createBaseVNode("span", _hoisted_14$1, toDisplayString(candidate.track.title), 1),
                        createBaseVNode("span", _hoisted_15$1, [
                          createTextVNode(toDisplayString(candidate.track.artists.map((artist) => artist.name).join(" / ")) + " ", 1),
                          candidate.track.album?.name ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                            createTextVNode(" · " + toDisplayString(candidate.track.album.name), 1)
                          ], 64)) : createCommentVNode("", true)
                        ])
                      ]),
                      createBaseVNode("span", _hoisted_16$1, toDisplayString(unref(formatTime)(candidate.track.duration)), 1)
                    ], 42, _hoisted_12$1);
                  }), 128))
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            createBaseVNode("div", _hoisted_17$1, [
              createBaseVNode("label", _hoisted_18$1, [
                createBaseVNode("span", _hoisted_19$1, toDisplayString(unref(t)("tagEditor.fields.title")), 1),
                createVNode(_component_SInput, {
                  modelValue: unref(form).title,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(form).title = $event)
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("label", _hoisted_20$1, [
                createBaseVNode("span", _hoisted_21$1, toDisplayString(unref(t)("tagEditor.fields.artist")), 1),
                createVNode(_component_SInput, {
                  modelValue: unref(form).artist,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(form).artist = $event)
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("label", _hoisted_22$1, [
                createBaseVNode("span", _hoisted_23$1, toDisplayString(unref(t)("tagEditor.fields.albumArtist")), 1),
                createVNode(_component_SInput, {
                  modelValue: unref(form).albumArtist,
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => unref(form).albumArtist = $event)
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("label", _hoisted_24$1, [
                createBaseVNode("span", _hoisted_25$1, toDisplayString(unref(t)("tagEditor.fields.album")), 1),
                createVNode(_component_SInput, {
                  modelValue: unref(form).album,
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(form).album = $event)
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("label", _hoisted_26$1, [
                createBaseVNode("span", _hoisted_27$1, toDisplayString(unref(t)("tagEditor.fields.genre")), 1),
                createVNode(_component_SInput, {
                  modelValue: unref(form).genre,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => unref(form).genre = $event)
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("label", _hoisted_28$1, [
                createBaseVNode("span", _hoisted_29$1, toDisplayString(unref(t)("tagEditor.fields.year")), 1),
                createVNode(_component_SNumberInput, {
                  modelValue: unref(form).year,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => unref(form).year = $event),
                  min: 0,
                  max: 9999
                }, null, 8, ["modelValue"])
              ]),
              createBaseVNode("div", _hoisted_30$1, [
                createBaseVNode("label", _hoisted_31$1, [
                  createBaseVNode("span", _hoisted_32$1, toDisplayString(unref(t)("tagEditor.fields.trackNumber")), 1),
                  createVNode(_component_SNumberInput, {
                    modelValue: unref(form).trackNumber,
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => unref(form).trackNumber = $event),
                    min: 0,
                    max: 9999
                  }, null, 8, ["modelValue"])
                ]),
                createBaseVNode("label", _hoisted_33$1, [
                  createBaseVNode("span", _hoisted_34$1, toDisplayString(unref(t)("tagEditor.fields.discNumber")), 1),
                  createVNode(_component_SNumberInput, {
                    modelValue: unref(form).discNumber,
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => unref(form).discNumber = $event),
                    min: 0,
                    max: 999
                  }, null, 8, ["modelValue"])
                ])
              ])
            ]),
            createBaseVNode("label", _hoisted_35$1, [
              createBaseVNode("span", _hoisted_36$1, toDisplayString(unref(t)("tagEditor.fields.lyrics")), 1),
              createVNode(_component_SInput, {
                modelValue: unref(form).lyrics,
                "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => unref(form).lyrics = $event),
                type: "textarea",
                rows: 6,
                resize: "vertical",
                placeholder: unref(t)("tagEditor.lyricsPlaceholder")
              }, null, 8, ["modelValue", "placeholder"])
            ])
          ])
        ]),
        _: 1
      }, 8, ["open", "title"]);
    };
  }
});
const _hoisted_1$4 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$4, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "m5 12l7-7l7 7m-7 7V5"
    }, null, -1)
  ])]);
}
const __unplugin_components_15 = markRaw({ name: "lucide-arrow-up", render: render$3 });
const _hoisted_1$3 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$3, [..._cache[0] || (_cache[0] = [
    createBaseVNode("g", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2"
    }, [
      createBaseVNode("path", { d: "m13.5 8.5l-5 5m0-5l5 5" }),
      createBaseVNode("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }),
      createBaseVNode("path", { d: "m21 21l-4.3-4.3" })
    ], -1)
  ])]);
}
const __unplugin_components_6 = markRaw({ name: "lucide-search-x", render: render$2 });
const useMultiSelect = (items, options) => {
  const { t } = useI18n();
  const playlistStore = usePlaylistStore();
  const libraryStore = useLibraryStore();
  const userStore = useUserStore();
  const { enqueueMany } = useDownload();
  const active = ref(false);
  const selectedIds = ref(/* @__PURE__ */ new Set());
  const selectedCount = computed(() => selectedIds.value.size);
  const isAllSelected = computed(
    () => items.value.length > 0 && selectedIds.value.size === items.value.length
  );
  const isPartial = computed(
    () => selectedIds.value.size > 0 && selectedIds.value.size < items.value.length
  );
  const selectedItems = computed(
    () => items.value.filter((item) => selectedIds.value.has(item.id))
  );
  const toggle = (id) => {
    const next = new Set(selectedIds.value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    selectedIds.value = next;
  };
  const selectAll = () => {
    selectedIds.value = new Set(items.value.map((t2) => t2.id));
  };
  const invertSelection = () => {
    const next = /* @__PURE__ */ new Set();
    for (const item of items.value) {
      if (!selectedIds.value.has(item.id)) next.add(item.id);
    }
    selectedIds.value = next;
  };
  const clear = () => {
    selectedIds.value = /* @__PURE__ */ new Set();
  };
  const enter = () => {
    active.value = true;
    clear();
  };
  const exit = () => {
    active.value = false;
    clear();
  };
  const toggleSelectAll = () => {
    if (isAllSelected.value) clear();
    else selectAll();
  };
  const canRemove = computed(
    () => options.collectionType.value === "playlist" && options.canRemove?.value !== false
  );
  const canRemoveFromCloud = computed(() => options.collectionType.value === "cloud");
  const collectionTypeLabel = computed(() => {
    const map = {
      playlist: t("collection.playlist"),
      album: t("collection.album"),
      radio: t("collection.radio")
    };
    return options.collectionType.value ? map[options.collectionType.value] ?? "" : "";
  });
  const deleteConfirmOpen = ref(false);
  const pendingDeleteTracks = shallowRef([]);
  const pendingDeleteAction = ref("remove");
  const requestDelete = (tracks, action) => {
    if (tracks.length === 0) return;
    pendingDeleteTracks.value = tracks;
    pendingDeleteAction.value = action;
    deleteConfirmOpen.value = true;
  };
  const confirmDelete = async () => {
    const tracks = pendingDeleteTracks.value;
    const ids = tracks.map((track) => track.id);
    try {
      if (pendingDeleteAction.value === "file") {
        const paths = tracks.map((t2) => t2.path).filter((p) => !!p);
        if (paths.length > 0) {
          await libraryStore.deleteTracks(paths);
          await purgeDeletedTracks(ids);
        }
      } else if (pendingDeleteAction.value === "cloud") {
        await userStore.removeCloudTracks(ids);
      } else if (options.collectionId.value) {
        if (options.source.value === "local") {
          await playlistStore.removeTracks(options.collectionId.value, ids);
        } else if (options.source.value === "netease") {
          await userStore.removeTracksFromPlaylist(options.collectionId.value, ids);
        }
      }
      deleteConfirmOpen.value = false;
      exit();
      options.onChanged?.(ids);
    } catch (err) {
      const message = err instanceof Error && err.message ? err.message : t("liked.toast.failed");
      toast.error(message);
    }
  };
  const cancelDelete = () => {
    deleteConfirmOpen.value = false;
  };
  const deleteDialogTitle = computed(() => {
    if (pendingDeleteAction.value === "file") return t("songList.delete.fileTitle");
    if (pendingDeleteAction.value === "cloud") return t("cloud.removeTitle");
    return t("collection.removeFrom", { type: collectionTypeLabel.value });
  });
  const deleteDialogContent = computed(() => {
    const count = pendingDeleteTracks.value.length;
    const type = collectionTypeLabel.value;
    if (count === 1) {
      const title = pendingDeleteTracks.value[0].title;
      if (pendingDeleteAction.value === "file") {
        return t("songList.delete.fileConfirmOne", { title });
      }
      if (pendingDeleteAction.value === "cloud") {
        return t("cloud.removeConfirmOne", { title });
      }
      return t("songList.delete.removeConfirmOne", { title, type });
    }
    if (pendingDeleteAction.value === "file") return t("songList.delete.fileConfirm", { count });
    if (pendingDeleteAction.value === "cloud") return t("cloud.removeConfirm", { count });
    return t("songList.delete.removeConfirm", { count, type });
  });
  const addToQueue = () => {
    const tracks = selectedItems.value;
    if (tracks.length === 0) return;
    insertManyToQueue(tracks, "next", options.playbackContext?.value);
    exit();
  };
  const batchRemove = () => {
    requestDelete(selectedItems.value, "remove");
  };
  const batchDelete = () => {
    requestDelete(selectedItems.value, "file");
  };
  const batchRemoveFromCloud = () => {
    requestDelete(selectedItems.value, "cloud");
  };
  const batchDownload = () => {
    const tracks = selectedItems.value.filter((track) => track.source !== "local");
    if (tracks.length === 0) return;
    void enqueueMany(tracks);
    exit();
  };
  return {
    // 选择状态
    active,
    selectedIds,
    selectedCount,
    isAllSelected,
    isPartial,
    selectedItems,
    toggle,
    selectAll,
    invertSelection,
    clear,
    enter,
    exit,
    toggleSelectAll,
    // 集合信息
    canRemove,
    canRemoveFromCloud,
    collectionTypeLabel,
    // 删除弹窗
    deleteConfirmOpen,
    deleteDialogTitle,
    deleteDialogContent,
    requestDelete,
    confirmDelete,
    cancelDelete,
    // 批量操作
    addToQueue,
    batchRemove,
    batchDelete,
    batchRemoveFromCloud,
    batchDownload
  };
};
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
      d: "m3 8l4-4l4 4M7 4v16M20 8h-5m0 2V6.5a2.5 2.5 0 0 1 5 0V10m-5 4h5l-5 6h5"
    }, null, -1)
  ])]);
}
const IconArrowUpAz = markRaw({ name: "lucide-arrow-up-az", render: render$1 });
const _hoisted_1$1 = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$1, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M8 3L4 7l4 4M4 7h16m-4 14l4-4l-4-4m4 4H4"
    }, null, -1)
  ])]);
}
const IconLucideArrowLeftRight = markRaw({ name: "lucide-arrow-left-right", render });
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { class: "flex items-center gap-1.5 px-1 py-1" };
const _hoisted_3 = { class: "flex-1 min-w-0" };
const _hoisted_4 = { class: "text-xs font-medium truncate" };
const _hoisted_5 = { class: "text-[11px] text-on-surface-variant/60 truncate" };
const _hoisted_6 = {
  key: 0,
  class: "flex flex-col items-center gap-2 text-on-surface-variant/40"
};
const _hoisted_7 = { class: "text-sm" };
const _hoisted_8 = { class: "pr-1.5" };
const _hoisted_9 = {
  key: 0,
  class: "flex items-center gap-2 pl-3 pr-3 mx-3 h-10 text-sm"
};
const _hoisted_10 = {
  key: 0,
  class: "w-8 shrink-0 flex items-center justify-center"
};
const _hoisted_11 = { class: "text-on-surface-variant tabular-nums shrink-0" };
const _hoisted_12 = {
  key: 1,
  class: "flex items-center gap-3 pl-3 pr-6 mx-3 h-10 text-sm text-on-surface-variant/60"
};
const _hoisted_13 = {
  key: 0,
  class: "w-8 shrink-0 flex items-center justify-center"
};
const _hoisted_14 = { class: "flex-1 min-w-0" };
const _hoisted_15 = { class: "w-full h-full px-1.5 py-1 rounded-md cursor-pointer transition-colors hover:bg-on-surface/8" };
const _hoisted_16 = { class: "w-60 flex flex-col gap-3 text-sm" };
const _hoisted_17 = { class: "flex items-center gap-2 text-xs" };
const _hoisted_18 = { class: "flex items-center gap-2 text-xs" };
const _hoisted_19 = {
  key: 1,
  class: "w-full h-full px-1.5 py-1"
};
const _hoisted_20 = {
  key: 1,
  class: "flex-1 min-w-0"
};
const _hoisted_21 = { class: "w-7 shrink-0 text-center" };
const _hoisted_22 = {
  key: 2,
  class: "w-16 shrink-0 text-center"
};
const _hoisted_23 = {
  key: 3,
  class: "w-16 shrink-0 text-center"
};
const _hoisted_24 = { class: "px-3 pb-3" };
const _hoisted_25 = ["onClick", "onDblclick", "onContextmenu"];
const _hoisted_26 = ["onClick"];
const _hoisted_27 = {
  key: 0,
  class: "text-sm font-bold tabular-nums group-hover:opacity-0 transition-opacity duration-300"
};
const _hoisted_28 = { class: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-300 group-hover:scale-100 scale-80 cursor-pointer" };
const _hoisted_29 = { class: "flex-1 min-w-0 flex items-center gap-3" };
const _hoisted_30 = { class: "flex-1 min-w-0" };
const _hoisted_31 = { class: "flex items-baseline gap-1.5 min-w-0" };
const _hoisted_32 = {
  key: 1,
  class: "shrink-0 px-1 rounded text-[10px] leading-[18px] font-bold border border-solid text-red-400 border-red-400/40"
};
const _hoisted_33 = {
  key: 2,
  class: "shrink-0 px-1 rounded text-[10px] leading-[18px] font-bold border border-solid text-red-400 border-red-400/40"
};
const _hoisted_34 = { class: "truncate" };
const _hoisted_35 = ["onClick"];
const _hoisted_36 = {
  key: 0,
  class: "mx-0.5 opacity-50"
};
const _hoisted_37 = {
  key: 0,
  class: "opacity-50"
};
const _hoisted_38 = ["onClick"];
const _hoisted_39 = {
  key: 3,
  class: "w-7 shrink-0"
};
const _hoisted_40 = {
  key: 0,
  class: "py-3 flex items-center justify-center gap-2 text-sm text-on-surface-variant/50"
};
const _hoisted_41 = {
  key: 1,
  class: "py-3 text-center text-sm text-on-surface-variant/40"
};
const _hoisted_42 = {
  key: 0,
  class: "rounded-full bg-surface-panel backdrop-blur-2xl backdrop-saturate-150 shadow-lg border border-solid border-primary/10"
};
const _hoisted_43 = {
  key: 0,
  class: "rounded-full bg-surface-panel backdrop-blur-2xl backdrop-saturate-150 shadow-lg border border-solid border-primary/10"
};
const _hoisted_44 = { class: "text-sm text-on-surface-variant" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SongList",
  props: {
    items: {},
    searchQuery: { default: "" },
    showIndex: { type: Boolean, default: true },
    showAlbum: { type: Boolean, default: true },
    showDuration: { type: Boolean, default: true },
    showSize: { type: Boolean, default: false },
    enableSort: { type: Boolean, default: false },
    source: { default: "local" },
    collectionType: { default: void 0 },
    collectionId: { default: void 0 },
    playbackContext: { default: void 0 },
    canRemove: { type: Boolean, default: true },
    hasMore: { type: Boolean, default: false },
    loadingMore: { type: Boolean, default: false }
  },
  emits: ["scroll", "reachBottom", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const { t } = useI18n();
    const media = useMediaStore();
    const status = useStatusStore();
    const settings = useSettingsStore();
    const fav = useFavorite();
    const { isFloatingBar: isFloatingPlayerBar, PLAYER_BAR_GAP } = useFloatingPlayerBar();
    const textCollator = new Intl.Collator(void 0, {
      usage: "sort",
      sensitivity: "base",
      numeric: true
    });
    const playingId = computed(() => media.track?.id);
    const isAlbumLinkable = (item) => {
      if (!item.album?.name) return false;
      return item.source === "local" || !!item.album.id;
    };
    const isArtistLinkable = (item, artist) => {
      if (!artist.name) return false;
      return item.source === "local" || !!artist.id;
    };
    const goArtist = (item, artist) => {
      if (!isArtistLinkable(item, artist)) return;
      navigateToArtist(artist.name, { source: item.source, artistId: artist.id });
    };
    const goAlbum = (item) => {
      if (!isAlbumLinkable(item)) return;
      navigateToAlbum(item.album?.name, { source: item.source, albumId: item.album?.id });
    };
    const { sortField, sortOrder } = storeToRefs(status);
    const sortFieldLabelKeyMap = {
      none: "songList.sort.default",
      title: "songList.sort.byTitle",
      artist: "songList.sort.byArtist",
      album: "songList.sort.byAlbum",
      path: "songList.sort.byPath",
      duration: "songList.sort.byDuration",
      size: "songList.sort.bySize",
      mtime: "songList.sort.byMtime",
      ctime: "songList.sort.byCtime",
      track: "songList.sort.byTrack"
    };
    const sortTitleText = computed(() => {
      if (!props.enableSort) return t("songList.title");
      if (sortField.value === "none") return t("songList.title");
      const arrow = sortOrder.value === "asc" ? "↑" : "↓";
      return `${t("songList.title")}（ ${t(sortFieldLabelKeyMap[sortField.value])} ${arrow} ）`;
    });
    const filteredItems = computed(() => {
      const query = props.searchQuery.trim().toLowerCase();
      if (!query) return props.items;
      return props.items.filter((track) => {
        const title = (track.title ?? "").toLowerCase();
        const artists2 = (track.artists ?? []).map((artist) => (artist.name ?? "").toLowerCase()).join(" ");
        const album = track.album?.name?.toLowerCase() ?? "";
        return title.includes(query) || artists2.includes(query) || album.includes(query);
      });
    });
    const sortedItems = computed(() => {
      if (!props.enableSort || sortField.value === "none") return filteredItems.value;
      const result2 = [...filteredItems.value];
      const field = sortField.value;
      const direction = sortOrder.value === "asc" ? 1 : -1;
      const toArtistText = (track) => track.artists.map((a) => a.name).join(" / ");
      const toAlbumText = (track) => track.album?.name ?? "";
      const toPathText = (track) => track.path ?? "";
      const compare = (a, b) => {
        let value = 0;
        if (field === "title") value = textCollator.compare(a.title, b.title);
        else if (field === "artist") value = textCollator.compare(toArtistText(a), toArtistText(b));
        else if (field === "album") value = textCollator.compare(toAlbumText(a), toAlbumText(b));
        else if (field === "path") value = textCollator.compare(toPathText(a), toPathText(b));
        else if (field === "duration") value = a.duration - b.duration;
        else if (field === "size") value = (a.fileSize ?? 0) - (b.fileSize ?? 0);
        else if (field === "mtime") value = (a.mtime ?? 0) - (b.mtime ?? 0);
        else if (field === "ctime") value = (a.ctime ?? 0) - (b.ctime ?? 0);
        else value = (a.track ?? 0) - (b.track ?? 0);
        if (value !== 0) return value * direction;
        const fallback = textCollator.compare(a.title, b.title);
        if (fallback !== 0) return fallback;
        return textCollator.compare(a.id, b.id);
      };
      result2.sort(compare);
      return result2;
    });
    const playingIndex = computed(() => {
      if (!playingId.value) return -1;
      return sortedItems.value.findIndex((track) => track.id === playingId.value);
    });
    const virtualListRef = shallowRef(null);
    const scrollToPlaying = () => {
      if (playingIndex.value >= 0) virtualListRef.value?.scrollToIndex(playingIndex.value);
    };
    const scrollTop = ref(0);
    const canScrollTop = computed(() => scrollTop.value > 100);
    const onScroll = (event) => {
      scrollTop.value = event.target.scrollTop;
      emit("scroll", event);
    };
    const batch = useMultiSelect(sortedItems, {
      source: computed(() => props.source),
      collectionType: computed(() => props.collectionType),
      collectionId: computed(() => props.collectionId),
      canRemove: computed(() => props.canRemove),
      playbackContext: computed(() => props.playbackContext),
      onChanged: (removedIds) => emit("change", removedIds)
    });
    const { deleteConfirmOpen, deleteDialogTitle, deleteDialogContent } = batch;
    const {
      open: pickerOpen,
      tracks: pickerTracks,
      mode: pickerMode,
      openPicker
    } = usePlaylistPicker();
    const tagEditorOpen = ref(false);
    const tagEditorTrack = shallowRef(null);
    const { enqueue: enqueueDownload } = useDownload();
    const contextTrack = shallowRef();
    const { items: contextMenuItems, handleSelect: onContextMenu } = useTrackMenu(contextTrack, {
      collectionType: props.collectionType,
      canRemove: props.canRemove,
      playbackContext: computed(() => props.playbackContext),
      onAddToPlaylist: (track) => openPicker([track]),
      onRemove: (track) => batch.requestDelete([track], "remove"),
      onDeleteFile: (track) => batch.requestDelete([track], "file"),
      onRemoveFromCloud: (track) => batch.requestDelete([track], "cloud"),
      onEditTags: (track) => {
        tagEditorTrack.value = track;
        tagEditorOpen.value = true;
      },
      onDownload: (track, quality) => void enqueueDownload(track, { quality })
    });
    const onListContextMenu = (event) => {
      const target = event.target;
      if (!target?.closest("[data-song-item]")) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    const emit = __emit;
    onActivated(batch.exit);
    __expose({
      /** 进入批量管理模式 */
      enterBatch: batch.enter
    });
    return (_ctx, _cache) => {
      const _component_SImg = _sfc_main$3;
      const _component_IconLucideSearchX = __unplugin_components_6;
      const _component_SCheckbox = _sfc_main$c;
      const _component_SDivider = _sfc_main$d;
      const _component_SButton = _sfc_main$4;
      const _component_SRadio = _sfc_main$f;
      const _component_SRadioGroup = _sfc_main$e;
      const _component_SPopover = _sfc_main$g;
      const _component_IconLucideMusic = __unplugin_components_4;
      const _component_IconLucidePause = IconLucidePause;
      const _component_IconLucidePlay = __unplugin_components_0;
      const _component_SIconSwap = __unplugin_components_11;
      const _component_SLoading = __unplugin_components_5;
      const _component_SVirtualList = _sfc_main$b;
      const _component_SContextMenu = _sfc_main$9;
      const _component_IconLucideArrowUp = __unplugin_components_15;
      const _component_IconLucideLocate = __unplugin_components_16;
      const _component_SDialog = _sfc_main$2;
      const _component_PlaylistPickerDialog = _sfc_main$a;
      const _component_TagEditorDialog = _sfc_main$1;
      return openBlock(), createElementBlock("div", {
        class: "relative h-full",
        onContextmenuCapture: onListContextMenu
      }, [
        createVNode(_component_SContextMenu, {
          items: unref(contextMenuItems),
          onSelect: unref(onContextMenu)
        }, {
          header: withCtx(() => [
            unref(contextTrack) ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createBaseVNode("div", _hoisted_2, [
                createVNode(_component_SImg, {
                  src: unref(contextTrack).cover,
                  class: "size-9 rounded-md shrink-0"
                }, null, 8, ["src"]),
                createBaseVNode("div", _hoisted_3, [
                  createBaseVNode("div", _hoisted_4, toDisplayString(unref(contextTrack).title), 1),
                  createBaseVNode("div", _hoisted_5, toDisplayString(unref(contextTrack).artists.map((a) => a.name).join(" / ")), 1)
                ])
              ])
            ])) : createCommentVNode("", true)
          ]),
          default: withCtx(() => [
            createVNode(_component_SVirtualList, {
              ref_key: "virtualListRef",
              ref: virtualListRef,
              items: unref(sortedItems),
              "item-height": 88,
              "padding-bottom": unref(isFloatingPlayerBar) ? unref(PLAYER_BAR_GAP) : 80,
              "get-item-key": (item) => item.id,
              "item-fixed": "",
              height: "100%",
              onScroll,
              onReachBottom: _cache[6] || (_cache[6] = ($event) => emit("reachBottom"))
            }, {
              empty: withCtx(() => [
                __props.searchQuery ? (openBlock(), createElementBlock("div", _hoisted_6, [
                  createVNode(_component_IconLucideSearchX, { class: "size-8" }),
                  createBaseVNode("span", _hoisted_7, toDisplayString(unref(t)("songList.noResults")), 1)
                ])) : createCommentVNode("", true)
              ]),
              header: withCtx(() => [
                renderSlot(_ctx.$slots, "topInfo"),
                createBaseVNode("div", _hoisted_8, [
                  unref(batch).active.value ? (openBlock(), createElementBlock("div", _hoisted_9, [
                    __props.showIndex ? (openBlock(), createElementBlock("div", _hoisted_10, [
                      createVNode(_component_SCheckbox, {
                        checked: unref(batch).isAllSelected.value,
                        indeterminate: unref(batch).isPartial.value,
                        size: "small",
                        "onUpdate:checked": unref(batch).toggleSelectAll,
                        onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                        }, ["stop"]))
                      }, null, 8, ["checked", "indeterminate", "onUpdate:checked"])
                    ])) : createCommentVNode("", true),
                    createBaseVNode("span", _hoisted_11, toDisplayString(unref(t)("songList.batch.selected", { count: unref(batch).selectedCount.value })), 1),
                    createVNode(_component_SDivider, { vertical: "" }),
                    createVNode(_component_SButton, {
                      variant: "ghost",
                      size: "small",
                      disabled: unref(batch).selectedCount.value === 0,
                      onClick: unref(batch).invertSelection
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(IconLucideArrowLeftRight), { class: "size-3.5" })
                      ]),
                      default: withCtx(() => [
                        createBaseVNode("span", null, toDisplayString(unref(t)("songList.batch.invert")), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"]),
                    createVNode(_component_SButton, {
                      variant: "ghost",
                      size: "small",
                      disabled: unref(batch).selectedCount.value === 0,
                      onClick: unref(batch).addToQueue
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(IconLucideListEnd), { class: "size-3.5" })
                      ]),
                      default: withCtx(() => [
                        createBaseVNode("span", null, toDisplayString(unref(t)("songList.batch.addToQueue")), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"]),
                    __props.source !== "local" && unref(settings).system.download.enabled ? (openBlock(), createBlock(_component_SButton, {
                      key: 1,
                      variant: "ghost",
                      size: "small",
                      disabled: unref(batch).selectedCount.value === 0,
                      onClick: unref(batch).batchDownload
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(IconLucideDownload), { class: "size-3.5" })
                      ]),
                      default: withCtx(() => [
                        createBaseVNode("span", null, toDisplayString(unref(t)("songList.batch.download")), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"])) : createCommentVNode("", true),
                    __props.source === "local" || __props.source === "netease" ? (openBlock(), createBlock(_component_SButton, {
                      key: 2,
                      variant: "ghost",
                      size: "small",
                      disabled: unref(batch).selectedCount.value === 0,
                      onClick: _cache[1] || (_cache[1] = ($event) => unref(openPicker)(unref(batch).selectedItems.value))
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(IconLucideListPlus), { class: "size-3.5" })
                      ]),
                      default: withCtx(() => [
                        createBaseVNode("span", null, toDisplayString(unref(t)("collection.addTo", { type: unref(t)("collection.playlist") })), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled"])) : createCommentVNode("", true),
                    unref(batch).canRemove.value ? (openBlock(), createBlock(_component_SButton, {
                      key: 3,
                      variant: "ghost",
                      size: "small",
                      disabled: unref(batch).selectedCount.value === 0,
                      onClick: unref(batch).batchRemove
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(IconLucideListMinus), { class: "size-3.5" })
                      ]),
                      default: withCtx(() => [
                        createBaseVNode("span", null, toDisplayString(unref(t)("collection.removeFrom", { type: unref(batch).collectionTypeLabel.value })), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"])) : createCommentVNode("", true),
                    unref(batch).canRemoveFromCloud.value ? (openBlock(), createBlock(_component_SButton, {
                      key: 4,
                      type: "error",
                      variant: "ghost",
                      size: "small",
                      disabled: unref(batch).selectedCount.value === 0,
                      onClick: unref(batch).batchRemoveFromCloud
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(IconLucideCloudOff), { class: "size-3.5" })
                      ]),
                      default: withCtx(() => [
                        createBaseVNode("span", null, toDisplayString(unref(t)("cloud.removeAction")), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"])) : createCommentVNode("", true),
                    __props.source === "local" ? (openBlock(), createBlock(_component_SButton, {
                      key: 5,
                      type: "error",
                      variant: "ghost",
                      size: "small",
                      disabled: unref(batch).selectedCount.value === 0,
                      onClick: unref(batch).batchDelete
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(IconLucideTrash2), { class: "size-3.5" })
                      ]),
                      default: withCtx(() => [
                        createBaseVNode("span", null, toDisplayString(unref(t)("songList.context.deleteFile")), 1)
                      ]),
                      _: 1
                    }, 8, ["disabled", "onClick"])) : createCommentVNode("", true),
                    createVNode(_component_SDivider, { vertical: "" }),
                    createVNode(_component_SButton, {
                      variant: "ghost",
                      size: "small",
                      onClick: unref(batch).exit
                    }, {
                      icon: withCtx(() => [
                        createVNode(unref(__unplugin_components_11$1), { class: "size-3.5" })
                      ]),
                      default: withCtx(() => [
                        createBaseVNode("span", null, toDisplayString(unref(t)("songList.batch.exit")), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])) : (openBlock(), createElementBlock("div", _hoisted_12, [
                    __props.showIndex ? (openBlock(), createElementBlock("div", _hoisted_13, [..._cache[11] || (_cache[11] = [
                      createBaseVNode("span", null, "#", -1)
                    ])])) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_14, [
                      __props.enableSort ? (openBlock(), createBlock(_component_SPopover, {
                        key: 0,
                        "side-offset": 6,
                        trigger: "click",
                        side: "bottom",
                        align: "start",
                        block: ""
                      }, {
                        trigger: withCtx(() => [
                          createBaseVNode("div", _hoisted_15, toDisplayString(unref(sortTitleText)), 1)
                        ]),
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_16, [
                            createBaseVNode("div", _hoisted_17, [
                              createVNode(unref(IconLucideArrowUpDown), { class: "size-3.5" }),
                              createBaseVNode("span", null, toDisplayString(unref(t)("songList.sort.mode")), 1)
                            ]),
                            createVNode(_component_SRadioGroup, {
                              value: unref(sortField),
                              "onUpdate:value": _cache[2] || (_cache[2] = ($event) => isRef(sortField) ? sortField.value = $event : null),
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_SRadio, {
                                  value: "none",
                                  label: unref(t)("songList.sort.default")
                                }, null, 8, ["label"]),
                                createVNode(_component_SRadio, {
                                  value: "title",
                                  label: unref(t)("songList.sort.byTitle")
                                }, null, 8, ["label"]),
                                createVNode(_component_SRadio, {
                                  value: "artist",
                                  label: unref(t)("songList.sort.byArtist")
                                }, null, 8, ["label"]),
                                createVNode(_component_SRadio, {
                                  value: "album",
                                  label: unref(t)("songList.sort.byAlbum")
                                }, null, 8, ["label"]),
                                createVNode(_component_SRadio, {
                                  value: "path",
                                  label: unref(t)("songList.sort.byPath")
                                }, null, 8, ["label"]),
                                createVNode(_component_SRadio, {
                                  value: "duration",
                                  label: unref(t)("songList.sort.byDuration")
                                }, null, 8, ["label"]),
                                createVNode(_component_SRadio, {
                                  value: "size",
                                  label: unref(t)("songList.sort.bySize")
                                }, null, 8, ["label"]),
                                createVNode(_component_SRadio, {
                                  value: "mtime",
                                  label: unref(t)("songList.sort.byMtime")
                                }, null, 8, ["label"]),
                                createVNode(_component_SRadio, {
                                  value: "ctime",
                                  label: unref(t)("songList.sort.byCtime")
                                }, null, 8, ["label"]),
                                createVNode(_component_SRadio, {
                                  value: "track",
                                  label: unref(t)("songList.sort.byTrack")
                                }, null, 8, ["label"])
                              ]),
                              _: 1
                            }, 8, ["value"]),
                            _cache[12] || (_cache[12] = createBaseVNode("div", { class: "h-px bg-outline-variant/25" }, null, -1)),
                            createBaseVNode("div", _hoisted_18, [
                              createVNode(unref(IconArrowUpAz), { class: "size-3.5" }),
                              createBaseVNode("span", null, toDisplayString(unref(t)("songList.sort.order")), 1)
                            ]),
                            createVNode(_component_SRadioGroup, {
                              value: unref(sortOrder),
                              "onUpdate:value": _cache[3] || (_cache[3] = ($event) => isRef(sortOrder) ? sortOrder.value = $event : null),
                              size: "small",
                              disabled: unref(sortField) === "none"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_SRadio, {
                                  value: "asc",
                                  label: unref(t)("songList.sort.asc")
                                }, null, 8, ["label"]),
                                createVNode(_component_SRadio, {
                                  value: "desc",
                                  label: unref(t)("songList.sort.desc")
                                }, null, 8, ["label"])
                              ]),
                              _: 1
                            }, 8, ["value", "disabled"])
                          ])
                        ]),
                        _: 1
                      })) : (openBlock(), createElementBlock("div", _hoisted_19, toDisplayString(unref(t)("songList.title")), 1))
                    ]),
                    __props.showAlbum ? (openBlock(), createElementBlock("div", _hoisted_20, toDisplayString(unref(t)("songList.album")), 1)) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_21, toDisplayString(unref(t)("songList.actions")), 1),
                    __props.showDuration ? (openBlock(), createElementBlock("div", _hoisted_22, toDisplayString(unref(t)("songList.duration")), 1)) : createCommentVNode("", true),
                    __props.showSize ? (openBlock(), createElementBlock("div", _hoisted_23, toDisplayString(unref(t)("songList.size")), 1)) : createCommentVNode("", true)
                  ]))
                ])
              ]),
              default: withCtx(({ item, index }) => [
                createBaseVNode("div", _hoisted_24, [
                  createBaseVNode("div", {
                    "data-song-item": "",
                    class: normalizeClass([
                      "group flex items-center gap-3 pl-3 pr-6 h-19 rounded-xl cursor-pointer border-2 border-solid transition-[background-color,border-color] duration-200",
                      unref(batch).active.value ? unref(batch).selectedIds.value.has(item.id) ? "bg-primary/10 border-primary/30" : "bg-surface-panel border-primary/12 hover:border-primary/20 hover:bg-on-surface/5" : unref(playingId) === item.id ? "bg-primary/16 border-primary/40" : "bg-surface-panel border-primary/12 hover:border-primary/30 hover:bg-on-surface/8 active:bg-on-surface/12"
                    ]),
                    onClick: ($event) => unref(batch).active.value ? unref(batch).toggle(item.id) : void 0,
                    onDblclick: ($event) => unref(batch).active.value ? void 0 : playFrom(unref(sortedItems), index, props.playbackContext),
                    onContextmenu: ($event) => contextTrack.value = item
                  }, [
                    __props.showIndex ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass([
                        "w-8 shrink-0 flex items-center justify-center relative",
                        unref(batch).active.value ? "" : unref(playingId) === item.id ? "text-primary" : "text-on-surface-variant"
                      ]),
                      onClick: withModifiers(($event) => unref(batch).active.value ? unref(batch).toggle(item.id) : unref(playingId) === item.id ? togglePlay() : playNow(item, props.playbackContext), ["stop"])
                    }, [
                      unref(batch).active.value ? (openBlock(), createBlock(_component_SCheckbox, {
                        key: 0,
                        checked: unref(batch).selectedIds.value.has(item.id),
                        size: "small",
                        "onUpdate:checked": ($event) => unref(batch).toggle(item.id),
                        onClick: _cache[4] || (_cache[4] = withModifiers(() => {
                        }, ["stop"]))
                      }, null, 8, ["checked", "onUpdate:checked"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        unref(playingId) !== item.id ? (openBlock(), createElementBlock("span", _hoisted_27, toDisplayString(index + 1), 1)) : (openBlock(), createBlock(_component_IconLucideMusic, {
                          key: 1,
                          class: "size-5 group-hover:opacity-0 transition-opacity duration-300"
                        })),
                        createBaseVNode("div", _hoisted_28, [
                          unref(playingId) === item.id && unref(status).isPlaying ? (openBlock(), createBlock(_component_IconLucidePause, {
                            key: 0,
                            class: "size-5"
                          })) : (openBlock(), createBlock(_component_IconLucidePlay, {
                            key: 1,
                            class: "size-5"
                          }))
                        ])
                      ], 64))
                    ], 10, _hoisted_26)) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_29, [
                      createVNode(_component_SImg, {
                        src: item.cover,
                        class: "size-12 rounded-lg shrink-0"
                      }, null, 8, ["src"]),
                      createBaseVNode("div", _hoisted_30, [
                        createBaseVNode("div", _hoisted_31, [
                          createBaseVNode("span", {
                            class: normalizeClass(["text-base font-medium truncate", unref(playingId) === item.id ? "text-primary" : ""])
                          }, toDisplayString(item.title), 3),
                          item.cloud ? (openBlock(), createBlock(unref(__unplugin_components_7), {
                            key: 0,
                            class: normalizeClass([
                              "size-3.5 shrink-0 self-center",
                              unref(playingId) === item.id ? "text-primary/60" : "text-on-surface-variant/60"
                            ])
                          }, null, 8, ["class"])) : createCommentVNode("", true),
                          item.comment && unref(settings).preset.showSubtitle ? (openBlock(), createElementBlock("span", {
                            key: 1,
                            class: normalizeClass([
                              "flex-1 min-w-0 text-base truncate",
                              unref(playingId) === item.id ? "text-primary/60" : "text-on-surface-variant/60"
                            ])
                          }, " (" + toDisplayString(item.comment) + ") ", 3)) : createCommentVNode("", true)
                        ]),
                        createBaseVNode("div", {
                          class: normalizeClass(["text-sm mt-1 truncate flex items-center gap-1", unref(playingId) === item.id ? "text-primary/70" : "text-on-surface-variant"])
                        }, [
                          item.quality && !unref(settings).preset.hideQualityTag ? (openBlock(), createElementBlock("span", {
                            key: 0,
                            class: normalizeClass([
                              "shrink-0 px-1 rounded text-[10px] leading-[18px] font-bold border border-solid",
                              unref(isLosslessQuality)(item.quality) ? "text-amber-500 border-amber-500/40" : "text-on-surface-variant border-on-surface-variant/40"
                            ])
                          }, toDisplayString(unref(getQualityLabel)(item.quality)), 3)) : createCommentVNode("", true),
                          item.fee === 1 && !unref(settings).preset.hideVipTag ? (openBlock(), createElementBlock("span", _hoisted_32, " VIP ")) : item.fee === 4 && !unref(settings).preset.hideVipTag ? (openBlock(), createElementBlock("span", _hoisted_33, " EP ")) : createCommentVNode("", true),
                          createBaseVNode("span", _hoisted_34, [
                            (openBlock(true), createElementBlock(Fragment, null, renderList(item.artists, (artist, i) => {
                              return openBlock(), createElementBlock(Fragment, {
                                key: artist.id ?? i
                              }, [
                                createBaseVNode("span", {
                                  class: normalizeClass([
                                    "transition-opacity",
                                    isArtistLinkable(item, artist) ? "cursor-pointer hover:opacity-70" : "opacity-50"
                                  ]),
                                  onClick: withModifiers(($event) => goArtist(item, artist), ["stop"])
                                }, toDisplayString(artist.name), 11, _hoisted_35),
                                i < item.artists.length - 1 ? (openBlock(), createElementBlock("span", _hoisted_36, "/")) : createCommentVNode("", true)
                              ], 64);
                            }), 128)),
                            !item.artists?.length ? (openBlock(), createElementBlock("span", _hoisted_37, toDisplayString(unref(t)("playlist.unknownArtist")), 1)) : createCommentVNode("", true)
                          ])
                        ], 2)
                      ])
                    ]),
                    __props.showAlbum ? (openBlock(), createElementBlock("div", {
                      key: 1,
                      class: normalizeClass(["flex-1 min-w-0 truncate text-sm", unref(playingId) === item.id ? "text-primary/70" : "text-on-surface"])
                    }, [
                      createBaseVNode("span", {
                        class: normalizeClass(["transition-opacity", isAlbumLinkable(item) ? "cursor-pointer hover:opacity-70" : "opacity-50"]),
                        onClick: withModifiers(($event) => goAlbum(item), ["stop"])
                      }, toDisplayString(item.album?.name || unref(t)("collection.unknownAlbum")), 11, _hoisted_38)
                    ], 2)) : createCommentVNode("", true),
                    !unref(batch).active.value ? (openBlock(), createElementBlock("div", {
                      key: 2,
                      class: "w-7 shrink-0 flex items-center justify-center",
                      onClick: _cache[5] || (_cache[5] = withModifiers(() => {
                      }, ["stop"]))
                    }, [
                      createVNode(_component_SButton, {
                        type: "primary",
                        variant: "text",
                        circle: "",
                        size: 28,
                        "icon-size": 20,
                        onClick: ($event) => unref(fav).toggle(item)
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_SIconSwap, {
                            active: unref(fav).isLiked(item)
                          }, {
                            on: withCtx(() => [
                              createVNode(unref(IconMaterialSymbolsFavoriteRounded))
                            ]),
                            off: withCtx(() => [
                              createVNode(unref(IconMaterialSymbolsFavoriteOutlineRounded))
                            ]),
                            _: 1
                          }, 8, ["active"])
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ])) : (openBlock(), createElementBlock("div", _hoisted_39)),
                    __props.showDuration ? (openBlock(), createElementBlock("div", {
                      key: 4,
                      class: normalizeClass(["w-16 shrink-0 text-center text-sm tabular-nums", unref(playingId) === item.id ? "text-primary/60" : "text-on-surface-variant"])
                    }, toDisplayString(unref(formatTime)(item.duration)), 3)) : createCommentVNode("", true),
                    __props.showSize ? (openBlock(), createElementBlock("div", {
                      key: 5,
                      class: normalizeClass(["w-16 shrink-0 text-center text-sm tabular-nums", unref(playingId) === item.id ? "text-primary/60" : "text-on-surface-variant"])
                    }, toDisplayString(item.fileSize ? unref(formatFileSize)(item.fileSize) : ""), 3)) : createCommentVNode("", true)
                  ], 42, _hoisted_25)
                ])
              ]),
              footer: withCtx(() => [
                renderSlot(_ctx.$slots, "footer", {}, () => [
                  unref(sortedItems).length > 0 && __props.loadingMore ? (openBlock(), createElementBlock("div", _hoisted_40, [
                    createVNode(_component_SLoading, { class: "size-3.5 text-primary/70 shrink-0" }),
                    createBaseVNode("span", null, toDisplayString(unref(t)("common.loading")), 1)
                  ])) : unref(sortedItems).length > 0 && !__props.hasMore ? (openBlock(), createElementBlock("div", _hoisted_41, toDisplayString(unref(t)("common.noMore")), 1)) : createCommentVNode("", true)
                ])
              ]),
              _: 3
            }, 8, ["items", "padding-bottom", "get-item-key"])
          ]),
          _: 3
        }, 8, ["items", "onSelect"]),
        createBaseVNode("div", {
          class: normalizeClass(["absolute right-6 z-20 flex flex-col gap-3 transition-[bottom] duration-300", unref(isFloatingPlayerBar) ? "bottom-26" : "bottom-5"])
        }, [
          createVNode(Transition, { name: "fade" }, {
            default: withCtx(() => [
              unref(canScrollTop) && !unref(batch).active.value ? (openBlock(), createElementBlock("div", _hoisted_42, [
                createVNode(_component_SButton, {
                  type: "primary",
                  variant: "bordered",
                  circle: "",
                  size: 40,
                  onClick: _cache[7] || (_cache[7] = ($event) => unref(virtualListRef)?.scrollTo(0))
                }, {
                  icon: withCtx(() => [
                    createVNode(_component_IconLucideArrowUp, { class: "size-4.5" })
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(Transition, { name: "fade" }, {
            default: withCtx(() => [
              unref(playingIndex) >= 0 && !unref(batch).active.value ? (openBlock(), createElementBlock("div", _hoisted_43, [
                createVNode(_component_SButton, {
                  type: "primary",
                  variant: "bordered",
                  circle: "",
                  size: 40,
                  onClick: scrollToPlaying
                }, {
                  icon: withCtx(() => [
                    createVNode(_component_IconLucideLocate, { class: "size-4.5" })
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ], 2),
        createVNode(_component_SDialog, {
          open: unref(deleteConfirmOpen),
          "onUpdate:open": _cache[8] || (_cache[8] = ($event) => isRef(deleteConfirmOpen) ? deleteConfirmOpen.value = $event : null),
          title: unref(deleteDialogTitle)
        }, {
          footer: withCtx(() => [
            createVNode(_component_SButton, {
              variant: "secondary",
              onClick: unref(batch).cancelDelete
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("common.cancel")), 1)
              ]),
              _: 1
            }, 8, ["onClick"]),
            createVNode(_component_SButton, {
              type: "error",
              onClick: unref(batch).confirmDelete
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("common.confirm")), 1)
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          default: withCtx(() => [
            createBaseVNode("p", _hoisted_44, toDisplayString(unref(deleteDialogContent)), 1)
          ]),
          _: 1
        }, 8, ["open", "title"]),
        createVNode(_component_PlaylistPickerDialog, {
          open: unref(pickerOpen),
          "onUpdate:open": _cache[9] || (_cache[9] = ($event) => isRef(pickerOpen) ? pickerOpen.value = $event : null),
          mode: unref(pickerMode),
          tracks: unref(pickerTracks)
        }, null, 8, ["open", "mode", "tracks"]),
        createVNode(_component_TagEditorDialog, {
          open: unref(tagEditorOpen),
          "onUpdate:open": _cache[10] || (_cache[10] = ($event) => isRef(tagEditorOpen) ? tagEditorOpen.value = $event : null),
          track: unref(tagEditorTrack)
        }, null, 8, ["open", "track"])
      ], 32);
    };
  }
});
export {
  _sfc_main as _,
  qqAlbumCover as a,
  qqArtistCover as b,
  kgAlbumToCoverItem as c,
  __unplugin_components_6 as d,
  searchArtists as e,
  searchAlbums as f,
  searchSongs as g,
  kgSongsToTracks as k,
  qqSongsToTracks as q,
  searchPlaylists as s
};
