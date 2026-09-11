const platform = window.api.system.platform;
const isMac = platform === "darwin";
const isLinux = platform === "linux";
const APP_VERSION = "1.2.0-alpha.1";
const INSTALL_TYPE = window.api.system.installType;
const IS_APPX = INSTALL_TYPE === "appx";
const REPO_URL = "https://github.com/SPlayer-Dev/SPlayer-Next";
const REPO_NAME = "SPlayer-Next";
const COPYRIGHT_HOLDER = "imsyy";
const HOMEPAGE_URL = "https://splayer-next.imsyy.top";
const COMMIT_HASH = "ac0bcfa";
const COMMIT_DATE = "2026-09-02T23:56:43+08:00";
export {
  APP_VERSION as A,
  COPYRIGHT_HOLDER as C,
  HOMEPAGE_URL as H,
  IS_APPX as I,
  REPO_URL as R,
  isLinux as a,
  REPO_NAME as b,
  COMMIT_HASH as c,
  COMMIT_DATE as d,
  isMac as i
};
