import { m as markRaw, C as openBlock, y as createElementBlock, z as createBaseVNode } from "./runtime-dom.esm-bundler-qZya7aYr.js";
import { u as useI18n, aa as useUserStore, x as useMediaStore, d as useStatusStore, t as toast, ay as fetchHeartModeList, az as playHeartMode } from "./index-DVKNk9gd.js";
const _hoisted_1 = {
  width: "1em",
  height: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 256 256"
};
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, [..._cache[0] || (_cache[0] = [
    createBaseVNode("path", {
      fill: "currentColor",
      stroke: "currentColor",
      "stroke-width": "8",
      "stroke-linejoin": "round",
      d: "M72 144H32a8 8 0 0 1 0-16h35.72l13.62-20.44a8 8 0 0 1 13.32 0l25.34 38l9.34-14A8 8 0 0 1 136 128h24a8 8 0 0 1 0 16h-19.72l-13.62 20.44a8 8 0 0 1-13.32 0L88 126.42l-9.34 14A8 8 0 0 1 72 144M178 40c-20.65 0-38.73 8.88-50 23.89C116.73 48.88 98.65 40 78 40a62.07 62.07 0 0 0-62 62v2.25a8 8 0 1 0 16-.5V102a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8c-10.83-6.31-42.63-26-66.68-52.21a8 8 0 1 0-11.8 10.82c31.17 34 72.93 56.68 74.69 57.63a8 8 0 0 0 7.58 0C136.21 228.66 240 172 240 102a62.07 62.07 0 0 0-62-62"
    }, null, -1)
  ])]);
}
const IconHeart = markRaw({ name: "sp-heart-mode", render });
const useHeartMode = () => {
  const { t } = useI18n();
  const user = useUserStore();
  const media = useMediaStore();
  const status = useStatusStore();
  const enterHeartMode = async (seed) => {
    if (status.heartMode) {
      toast.info(t("player.heartMode.already"));
      return;
    }
    if (!user.isLoggedIn) {
      toast.warning(t("player.heartMode.needLogin"));
      return;
    }
    const playlistId = user.likedPlaylistId;
    const current = media.track;
    const likedIds = [...user.likedSongIds];
    const seedId = seed?.id ?? (current?.source === "netease" ? current.id : likedIds[Math.floor(Math.random() * likedIds.length)]);
    if (!playlistId || !seedId) {
      toast.warning(t("player.heartMode.noSeed"));
      return;
    }
    const loading = toast.loading(t("player.heartMode.loading"), { duration: 0 });
    try {
      const tracks = await fetchHeartModeList(seedId, playlistId);
      if (tracks.length === 0) {
        toast.warning(t("player.heartMode.failed"));
        return;
      }
      await playHeartMode(tracks);
      toast.success(t("player.heartMode.entered"));
    } catch (error) {
      console.error("[heartMode] 进入失败:", error);
      toast.warning(t("player.heartMode.failed"));
    } finally {
      loading.close();
    }
  };
  return { enterHeartMode };
};
export {
  IconHeart as I,
  useHeartMode as u
};
