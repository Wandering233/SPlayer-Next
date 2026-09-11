import { i as isEqual } from "./SSelect.vue_vue_type_script_setup_true_lang-a4TM9Kbk.js";
function findValuesBetween(array, start, end) {
  const startIndex = array.findIndex((i) => isEqual(i, start));
  const endIndex = array.findIndex((i) => isEqual(i, end));
  if (startIndex === -1 || endIndex === -1) return [];
  const [minIndex, maxIndex] = [startIndex, endIndex].sort((a, b) => a - b);
  return array.slice(minIndex, maxIndex + 1);
}
export {
  findValuesBetween as f
};
