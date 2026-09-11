import { aQ as defineStore, b1 as localforage, aa as useUserStore, bj as fetchDailySongs } from "./index-DVKNk9gd.js";
import { r as ref, q as shallowRef } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const MAX_SEARCH_HISTORY = 20;
const MAX_DAILY_ARCHIVE = 14;
const cacheDb = localforage.createInstance({ name: "splayer", storeName: "data-cache" });
const DAILY_REFRESH_HOUR = 6;
const todayKey = () => new Date(Date.now() - DAILY_REFRESH_HOUR * 3600 * 1e3).toDateString();
const useDataStore = defineStore(
  "data",
  () => {
    const searchHistory = ref([]);
    const addSearchHistory = (keyword) => {
      const word = keyword.trim();
      if (!word) return;
      const next = [word, ...searchHistory.value.filter((existing) => existing !== word)];
      if (next.length > MAX_SEARCH_HISTORY) next.length = MAX_SEARCH_HISTORY;
      searchHistory.value = next;
    };
    const removeSearchHistory = (keyword) => {
      searchHistory.value = searchHistory.value.filter((existing) => existing !== keyword);
    };
    const clearSearchHistory = () => {
      searchHistory.value = [];
    };
    const user = useUserStore();
    let dailyArchive = [];
    let dailyArchiveUserId = null;
    const dailyRecommend = shallowRef([]);
    const dailyHistory = shallowRef([]);
    let dailyRecommendLoading = null;
    const syncDaily = () => {
      const head = dailyArchive[0];
      const todayReady = head?.date === todayKey();
      dailyRecommend.value = todayReady ? head?.tracks ?? [] : [];
      dailyHistory.value = todayReady ? dailyArchive.slice(1) : dailyArchive;
    };
    const ensureDailyRecommend = async (force = false) => {
      const uid = user.profile?.userId ?? null;
      if (uid == null) return [];
      if (dailyArchiveUserId !== uid) {
        dailyArchive = [];
        dailyArchiveUserId = uid;
        dailyRecommend.value = [];
        dailyHistory.value = [];
      }
      const cacheKey = `daily-recommend-archive:${uid}`;
      const head = dailyArchive[0];
      if (!force && head?.date === todayKey() && head.tracks.length > 0) {
        return dailyRecommend.value;
      }
      if (dailyRecommendLoading) return dailyRecommendLoading;
      dailyRecommendLoading = (async () => {
        try {
          if (dailyArchive.length === 0) {
            const cached = await cacheDb.getItem(cacheKey).catch(() => null);
            if (cached?.length) {
              dailyArchive = cached;
              syncDaily();
            }
          }
          const cachedHead = dailyArchive[0];
          if (!force && cachedHead?.date === todayKey() && cachedHead.tracks.length > 0) {
            return dailyRecommend.value;
          }
          const tracks = await fetchDailySongs();
          if (tracks.length > 0) {
            const rest = dailyArchive[0]?.date === todayKey() ? dailyArchive.slice(1) : dailyArchive;
            dailyArchive = [{ date: todayKey(), tracks }, ...rest].slice(0, MAX_DAILY_ARCHIVE);
            syncDaily();
            cacheDb.setItem(cacheKey, dailyArchive).catch(() => {
            });
          }
          return dailyRecommend.value;
        } catch (error) {
          console.warn("[data] daily recommend failed:", error);
          return dailyRecommend.value;
        } finally {
          dailyRecommendLoading = null;
        }
      })();
      return dailyRecommendLoading;
    };
    const platformProfiles = ref({});
    const getPlatformProfile = (platform) => platformProfiles.value[platform] ?? null;
    const setPlatformProfile = (platform, profile) => {
      const next = { ...platformProfiles.value };
      if (profile) {
        next[platform] = profile;
      } else {
        delete next[platform];
      }
      platformProfiles.value = next;
    };
    const clearPlatformProfile = (platform) => {
      setPlatformProfile(platform, null);
    };
    return {
      searchHistory,
      addSearchHistory,
      removeSearchHistory,
      clearSearchHistory,
      dailyRecommend,
      dailyHistory,
      ensureDailyRecommend,
      platformProfiles,
      getPlatformProfile,
      setPlatformProfile,
      clearPlatformProfile
    };
  },
  {
    persist: {
      storage: localStorage,
      pick: ["searchHistory", "platformProfiles"]
    }
  }
);
export {
  useDataStore as u
};
