import { a as useSettingsStore, x as useMediaStore } from "./index-DVKNk9gd.js";
import { c as computed } from "./runtime-dom.esm-bundler-qZya7aYr.js";
const PLAYER_BAR_GAP = 112;
const useFloatingPlayerBar = () => {
  const settings = useSettingsStore();
  const media = useMediaStore();
  const isFloatingBar = computed(
    () => settings.appearance.layoutMode === "floating" && !!media.track
  );
  return { isFloatingBar, PLAYER_BAR_GAP };
};
export {
  useFloatingPlayerBar as u
};
