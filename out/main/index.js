import { app, BrowserWindow, nativeTheme, nativeImage, Tray, Menu, screen, protocol, net, session as session$2, shell, ipcMain, safeStorage, powerMonitor, dialog, utilityProcess, globalShortcut } from "electron";
import { is, electronApp, optimizer } from "@electron-toolkit/utils";
import fs, { existsSync, mkdirSync, readdirSync, statSync, unlinkSync, createReadStream } from "node:fs";
import path, { resolve, basename, join as join$1, extname } from "node:path";
import { writeFileSync } from "atomically";
import path$1, { join } from "path";
import log from "electron-log";
import { createRequire } from "module";
import fsp, { writeFile, readFile as readFile$1, stat, readdir } from "node:fs/promises";
import { getFonts } from "font-list";
import { fetch as fetch$1, Socks5ProxyAgent, ProxyAgent } from "undici";
import { EventEmitter } from "node:events";
import crypto$1, { createHash, randomBytes, randomInt, createCipheriv, generateKeyPairSync, diffieHellman, publicEncrypt, constants, createDecipheriv, createHmac, createPublicKey, randomUUID, timingSafeEqual } from "node:crypto";
import Database from "better-sqlite3";
import * as zlib from "node:zlib";
import zlib__default, { gunzipSync, inflate } from "node:zlib";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import os from "node:os";
import { Hono } from "hono";
import { upgradeWebSocket, serve } from "@hono/node-server";
import { WebSocketServer } from "ws";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v4";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { promisify } from "node:util";
import { inflateSync, inflateRawSync, unzipSync } from "zlib";
import electronUpdater from "electron-updater";
import http from "node:http";
import https from "node:https";
import { Worker } from "node:worker_threads";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
const HOST_API_LEVEL = 3;
const ACTION_TIMEOUTS = {
  musicUrl: 2e4,
  menuClick: 15e3,
  musicSearch: 15e3,
  musicLyric: 15e3,
  musicPic: 15e3,
  musicComment: 15e3
};
const REQUEST_MAX_TIMEOUT = 6e4;
const REQUEST_DEFAULT_TIMEOUT = 15e3;
const PLUGIN_LOAD_TIMEOUT = 1e4;
const INSTALL_URL_MAX_SIZE = 9e6;
const INSTALL_URL_TIMEOUT = 15e3;
const PLUGIN_REGISTRY_URL = "https://raw.githubusercontent.com/SPlayer-Dev/plugins/registry/registry.json";
const HEARTBEAT_INTERVAL = 1e4;
const HEARTBEAT_MAX_MISSES = 3;
const RESTART_MAX_ATTEMPTS = 3;
const PluginErrorCodes = {
  /** 未知错误 */
  UNKNOWN: "PLUGIN_UNKNOWN",
  /** 插件未找到 */
  NOT_FOUND: "PLUGIN_NOT_FOUND",
  /** 插件已禁用 */
  DISABLED: "PLUGIN_DISABLED",
  /** 插件未就绪 */
  NOT_READY: "PLUGIN_NOT_READY",
  /** 插件未注册该动作 */
  ACTION_UNSUPPORTED: "PLUGIN_ACTION_UNSUPPORTED",
  /** 加载超时 */
  LOAD_TIMEOUT: "PLUGIN_LOAD_TIMEOUT",
  /** 脚本语法错误或执行错误 */
  SCRIPT_ERROR: "PLUGIN_SCRIPT_ERROR",
  /** 元数据校验失败 */
  INVALID_MANIFEST: "PLUGIN_INVALID_MANIFEST",
  /** API level 不兼容 */
  API_LEVEL_MISMATCH: "PLUGIN_API_LEVEL_MISMATCH",
  /** 请求超时 */
  REQUEST_TIMEOUT: "PLUGIN_REQUEST_TIMEOUT",
  /** 请求被取消 */
  CANCELLED: "PLUGIN_CANCELLED",
  /** 网络错误 */
  NETWORK_ERROR: "PLUGIN_NETWORK_ERROR",
  /** URL 协议不允许 */
  URL_NOT_ALLOWED: "PLUGIN_URL_NOT_ALLOWED",
  /** 处理器抛出异常 */
  HANDLER_ERROR: "PLUGIN_HANDLER_ERROR",
  /** 子进程崩溃 */
  WORKER_CRASHED: "PLUGIN_WORKER_CRASHED",
  /** 权限未授予 */
  PERMISSION_DENIED: "PLUGIN_PERMISSION_DENIED"
};
const defaultPluginsConfig = {
  enabled: {},
  priority: {
    musicUrl: []
  },
  perPlugin: {}
};
const HOTKEY_ACTIONS = [
  {
    id: "player.togglePlay",
    labelKey: "settings.hotkeys.actions.togglePlay",
    defaultBinding: {
      inApp: "Space",
      global: "CommandOrControl+Shift+Space"
    },
    allowGlobal: true
  },
  {
    id: "player.prev",
    labelKey: "settings.hotkeys.actions.prev",
    defaultBinding: {
      inApp: "CommandOrControl+Left",
      global: "CommandOrControl+Shift+Left"
    },
    allowGlobal: true
  },
  {
    id: "player.next",
    labelKey: "settings.hotkeys.actions.next",
    defaultBinding: {
      inApp: "CommandOrControl+Right",
      global: "CommandOrControl+Shift+Right"
    },
    allowGlobal: true
  },
  {
    id: "player.seekBack",
    labelKey: "settings.hotkeys.actions.seekBack",
    // 全局留空：避免与 prev 的 global 冲突
    defaultBinding: { inApp: "Shift+Left", global: null },
    allowGlobal: true
  },
  {
    id: "player.seekForward",
    labelKey: "settings.hotkeys.actions.seekForward",
    defaultBinding: { inApp: "Shift+Right", global: null },
    allowGlobal: true
  },
  {
    id: "player.volumeUp",
    labelKey: "settings.hotkeys.actions.volumeUp",
    defaultBinding: {
      inApp: "CommandOrControl+Up",
      global: "CommandOrControl+Shift+Up"
    },
    allowGlobal: true
  },
  {
    id: "player.volumeDown",
    labelKey: "settings.hotkeys.actions.volumeDown",
    defaultBinding: {
      inApp: "CommandOrControl+Down",
      global: "CommandOrControl+Shift+Down"
    },
    allowGlobal: true
  },
  {
    id: "player.cycleRepeat",
    labelKey: "settings.hotkeys.actions.cycleRepeat",
    defaultBinding: { inApp: "CommandOrControl+R", global: null },
    allowGlobal: true
  },
  {
    id: "player.toggleShuffle",
    labelKey: "settings.hotkeys.actions.toggleShuffle",
    defaultBinding: { inApp: "CommandOrControl+S", global: null },
    allowGlobal: true
  },
  {
    id: "window.toggleDesktopLyric",
    labelKey: "settings.hotkeys.actions.toggleDesktopLyric",
    defaultBinding: { inApp: "CommandOrControl+L", global: null },
    allowGlobal: true
  },
  {
    id: "window.toggleDynamicIsland",
    labelKey: "settings.hotkeys.actions.toggleDynamicIsland",
    defaultBinding: { inApp: "CommandOrControl+I", global: null },
    allowGlobal: true
  },
  {
    id: "window.toggleTaskbarLyric",
    labelKey: "settings.hotkeys.actions.toggleTaskbarLyric",
    defaultBinding: { inApp: "CommandOrControl+B", global: null },
    allowGlobal: true
  },
  {
    id: "view.openPlayer",
    labelKey: "settings.hotkeys.actions.openPlayer",
    defaultBinding: { inApp: "CommandOrControl+Enter", global: null },
    allowGlobal: false
  },
  {
    id: "view.closePlayer",
    labelKey: "settings.hotkeys.actions.closePlayer",
    defaultBinding: { inApp: "CommandOrControl+Escape", global: null },
    allowGlobal: false
  },
  {
    id: "view.togglePlaylist",
    labelKey: "settings.hotkeys.actions.togglePlaylist",
    defaultBinding: { inApp: "CommandOrControl+P", global: null },
    allowGlobal: false
  },
  {
    id: "view.openSearch",
    labelKey: "settings.hotkeys.actions.openSearch",
    defaultBinding: { inApp: "CommandOrControl+F", global: null },
    allowGlobal: false
  },
  {
    id: "view.searchInPage",
    labelKey: "settings.hotkeys.actions.searchInPage",
    defaultBinding: { inApp: "/", global: null },
    allowGlobal: false
  }
];
const defaultHotkeyBindings = HOTKEY_ACTIONS.reduce((acc, meta) => {
  acc[meta.id] = { ...meta.defaultBinding };
  return acc;
}, {});
const defaultHotkeyConfig = {
  globalEnabled: true,
  bindings: defaultHotkeyBindings
};
const DYNAMIC_ISLAND_BASE_HEIGHT = 40;
const defaultSystemConfig = {
  player: {
    autoPlay: false,
    rememberLastTrack: true,
    fadeEnabled: true,
    fadeDuration: 200,
    outputDevice: null,
    volume: 1,
    loudnessNormalization: false,
    equalizer: {
      enabled: false,
      preset: "flat",
      bands: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      preamp: 0
    },
    lyricOffsets: {}
  },
  media: {
    systemMediaControls: true,
    discord: {
      enabled: false,
      showWhenPaused: false,
      displayMode: "name"
    }
  },
  library: {
    scanDirs: []
  },
  desktopLyric: {
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "",
    showTranslation: true,
    doubleLine: true,
    align: "center",
    wordByWord: true,
    autoGenerateWordByWord: true,
    playedColor: "rgb(254, 121, 113)",
    unplayedColor: "rgb(255, 255, 255)",
    strokeColor: "rgba(0, 0, 0, 0.5)",
    backgroundMask: false,
    backgroundMaskColor: "rgba(0, 0, 0, 0.3)",
    alwaysShowSongInfo: false,
    limitBounds: false,
    animation: true,
    alwaysOnTop: true,
    locked: false,
    useCSSDrag: false
  },
  dynamicIsland: {
    scale: 1,
    fontWeight: 500,
    fontFamily: "",
    wordByWord: true,
    transition: "bounce",
    playedColor: "rgba(255, 255, 255, 1)",
    unplayedColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "rgba(0, 0, 0, 1)",
    alwaysOnTop: true,
    snapCentered: true,
    notchFusion: false,
    nonOcclusive: false,
    doubleLine: false,
    showTranslation: false,
    useCSSDrag: false
  },
  taskbarLyric: {
    position: "auto",
    autoMaxWidth: true,
    autoAdjustOccupiedSpace: false,
    maxWidth: 400,
    leftMargin: 0,
    rightMargin: 0,
    colorMode: "taskbar",
    showBackground: false,
    doubleLine: true,
    showTranslation: true,
    showCover: true,
    wordByWord: true,
    fontSize: 14,
    fontWeight: 400,
    fontFamily: ""
  },
  lyric: {
    enableOnlineTTMLLyric: false,
    amllDbServer: "https://amlldb.bikonoo.com/%p/%s.ttml"
  },
  localLyric: {
    enableLocalTTMLOverride: false,
    repoDir: ""
  },
  cache: {
    dir: null,
    songCache: {
      enabled: false,
      cacheStreaming: false,
      sizeLimitGb: 10
    }
  },
  download: {
    enabled: false,
    dir: null,
    quality: "lossless",
    usePlaybackForDownload: false,
    fileTemplate: "{artist} - {title}",
    folderScheme: "none",
    overwritePolicy: "rename",
    embedCover: true,
    embedMeta: true,
    embedLyric: true,
    writeLrc: false,
    saveTtml: false,
    lyricFileFormat: "enhanced-lrc"
  },
  streaming: {
    enabled: true
  },
  lastfm: {
    enabled: false,
    scrobble: true,
    nowPlaying: true,
    loveSync: true
  },
  externalApi: {
    enabled: false,
    wsEnabled: false,
    allowLan: false,
    port: 14558
  },
  mcp: {
    enabled: false,
    port: 14559,
    accessKey: ""
  },
  update: {
    autoCheck: true,
    channel: "stable"
  },
  system: {
    rememberWindowState: true,
    borderlessWindow: true,
    taskbarProgress: true,
    taskbarThumbnailCover: true,
    uiZoom: 100,
    onboardingCompleted: false,
    agreedAgreementVersion: 1,
    neteaseRealIp: false,
    kugouLoginVersion: "standard",
    networkProxy: {
      protocol: "off",
      host: "127.0.0.1",
      port: 7890
    },
    neteaseScrobbleEnabled: false,
    neteaseScrobbleMode: "ncbl",
    registerOrpheusProtocol: false
  },
  windowStates: {
    main: {
      width: 1280,
      height: 800,
      x: null,
      y: null,
      maximized: false
    },
    desktopLyric: {
      width: 800,
      height: 200,
      x: null,
      y: null,
      visible: false
    },
    dynamicIsland: {
      mode: "snapped",
      x: null,
      y: null,
      visible: false
    },
    taskbarLyric: {
      visible: false
    }
  },
  plugins: defaultPluginsConfig,
  hotkeys: defaultHotkeyConfig
};
const getByPath = (obj, dotPath) => {
  const keys = dotPath.split(".");
  let cur = obj;
  for (const key of keys) {
    if (cur == null || typeof cur !== "object") return void 0;
    cur = cur[key];
  }
  return cur;
};
const setByPath = (obj, dotPath, value) => {
  const keys = dotPath.split(".");
  if (keys.some((key) => key === "__proto__" || key === "constructor" || key === "prototype")) {
    return;
  }
  let cur = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (cur[key] == null || typeof cur[key] !== "object") cur[key] = {};
    cur = cur[key];
  }
  cur[keys[keys.length - 1]] = value;
};
const createPlainObject = () => /* @__PURE__ */ Object.create(null);
const deepMerge = (defaults, stored) => {
  if (typeof defaults !== "object" || defaults === null || typeof stored !== "object" || stored === null || Array.isArray(defaults)) {
    return stored ?? defaults;
  }
  const result2 = Object.assign(createPlainObject(), defaults);
  const src = stored;
  for (const key of Object.keys(defaults)) {
    result2[key] = deepMerge(defaults[key], src[key]);
  }
  for (const key of Object.keys(src)) {
    if (!(key in result2)) result2[key] = src[key];
  }
  return result2;
};
const migrations = [
  // 示例：
  // {
  //   version: 1,
  //   migrate: (data) => {
  //     // 重命名字段、转换数据格式等
  //   },
  // },
];
if (process.env.PORTABLE_EXECUTABLE_DIR) {
  const portableUserData = path.join(process.env.PORTABLE_EXECUTABLE_DIR, "UserData");
  if (!existsSync(portableUserData)) mkdirSync(portableUserData, { recursive: true });
  app.setPath("userData", portableUserData);
}
const dataRoot = path.join(app.getPath("userData"), "app-data");
const configDir = path.join(dataRoot, "config");
const databaseDir = path.join(dataRoot, "database");
const defaultCacheDir = path.join(dataRoot, "cache");
const logsDir$1 = path.join(dataRoot, "logs");
const pluginsDir = path.join(dataRoot, "plugins");
const configPath = path.join(configDir, "settings.json");
const META_KEY = "__configVersion";
const readFile = () => {
  try {
    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch {
    return {};
  }
};
const FLUSH_DEBOUNCE_MS = 200;
let flushTimer = null;
const writeNow = (config) => {
  try {
    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    writeFileSync(configPath, JSON.stringify(config, null, 2));
  } catch {
  }
};
const flushImmediate = (config) => {
  if (flushTimer !== null) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  writeNow(config);
};
const flush$1 = (config) => {
  if (flushTimer !== null) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => {
    flushTimer = null;
    writeNow(config);
  }, FLUSH_DEBOUNCE_MS);
};
const init$5 = () => {
  const raw = readFile();
  const data2 = deepMerge(defaultSystemConfig, raw);
  let currentVersion = raw[META_KEY] ?? 0;
  const pending2 = migrations.filter((m) => m.version > currentVersion).sort((a, b) => a.version - b.version);
  for (const m of pending2) {
    m.migrate(data2);
    currentVersion = m.version;
  }
  if (pending2.length > 0) {
    data2[META_KEY] = currentVersion;
  }
  flushImmediate(data2);
  return data2;
};
let data = init$5();
app.on("before-quit", () => {
  flushImmediate(data);
});
const store$1 = {
  /**
   * 获取配置存储
   * @returns 配置存储
   */
  get store() {
    return data;
  },
  /**
   * 获取配置值
   * @param keyPath 配置键路径
   * @returns 配置值
   */
  get(keyPath) {
    return getByPath(data, keyPath);
  },
  /**
   * 设置配置值
   * @param keyPath 配置键路径
   * @param value 配置值
   * @returns 配置对象
   */
  set(keyPath, value) {
    setByPath(data, keyPath, value);
    flush$1(data);
  },
  /** 清空配置 */
  clear() {
    data = structuredClone(defaultSystemConfig);
    flush$1(data);
  },
  /** 用导入的配置替换当前配置 */
  replaceAll(input) {
    const raw = input && typeof input === "object" ? input : {};
    data = deepMerge(defaultSystemConfig, raw);
    flushImmediate(data);
  },
  /** 立即将设置写入磁盘 */
  flushImmediate: () => flushImmediate(data)
};
const isDev = is.dev;
const isWin = process.platform === "win32";
const isMac = process.platform === "darwin";
const isLinux = process.platform === "linux";
const isPortable = !!process.env.PORTABLE_EXECUTABLE_DIR;
const isAppX = isWin && process.execPath.includes("WindowsApps");
const appVersion = app.getVersion();
const appName = app.getName();
const getAppCacheDir = () => store$1.get("cache.dir") || defaultCacheDir;
const getCoverCacheDir = () => path.join(getAppCacheDir(), "covers");
const getArtistCacheDir = () => path.join(getAppCacheDir(), "artists");
const getBackgroundsDir = () => path.join(getAppCacheDir(), "backgrounds");
const getSongCacheDir = () => path.join(getAppCacheDir(), "songs");
const getDownloadDir = () => store$1.get("download.dir") || path.join(app.getPath("music"), appName);
const icon = join(import.meta.dirname, "../../public/icons/favicon.png");
const getDefaultOptions = () => ({
  width: 1280,
  height: 800,
  minWidth: 1280,
  minHeight: 800,
  autoHideMenuBar: true,
  show: false,
  backgroundColor: nativeTheme.shouldUseDarkColors ? "#101014" : "#f6f6f6",
  icon,
  webPreferences: {
    preload: join(__dirname, "../preload/index.mjs"),
    sandbox: false,
    // 关闭 WebGL
    webgl: false,
    // 关闭拼写检查
    spellcheck: false,
    // 禁用 Web SQL
    enableWebSQL: false,
    // 开启后台节流
    backgroundThrottling: true,
    // V8 编译代码缓存
    v8CacheOptions: "code"
  }
});
const createWindow = (options = {}) => {
  const defaultOptions = getDefaultOptions();
  return new BrowserWindow({
    ...defaultOptions,
    ...options,
    webPreferences: {
      ...defaultOptions.webPreferences,
      ...options.webPreferences
    }
  });
};
const broadcast = (channel, data2, visibleOnly = false) => {
  for (const win of BrowserWindow.getAllWindows()) {
    if (win.isDestroyed()) continue;
    if (visibleOnly && !win.isVisible()) continue;
    win.webContents.send(channel, data2);
  }
};
const sendToMain = (channel, data2) => {
  const win = getMainWindow();
  if (win && !win.isDestroyed()) {
    win.webContents.send(channel, data2);
  }
};
const ICONS_DIR = join(__dirname, "../../public/icons");
const loadIcon = (relativePath, size) => {
  const image = nativeImage.createFromPath(join(ICONS_DIR, relativePath));
  return size ? image.resize(size) : image;
};
const loadThemedIcon = (dir, name, size) => {
  const suffix = nativeTheme.shouldUseDarkColors ? "dark" : "light";
  return loadIcon(`${dir}/${name}-${suffix}.png`, size);
};
const messages = {
  "zh-CN": {
    prev: "上一曲",
    play: "播放",
    pause: "暂停",
    next: "下一曲",
    addToLiked: "添加到我喜欢",
    removeFromLiked: "从我喜欢中移除",
    shuffle: "随机播放",
    sequential: "顺序播放",
    repeatList: "列表循环",
    repeatOne: "单曲循环",
    openDesktopLyric: "开启桌面歌词",
    closeDesktopLyric: "关闭桌面歌词",
    openDynamicIsland: "开启灵动岛",
    closeDynamicIsland: "关闭灵动岛",
    openTaskbarLyric: "开启任务栏歌词",
    closeTaskbarLyric: "关闭任务栏歌词",
    quit: "退出"
  },
  "en-US": {
    prev: "Previous",
    play: "Play",
    pause: "Pause",
    next: "Next",
    addToLiked: "Add to Liked",
    removeFromLiked: "Remove from Liked",
    shuffle: "Shuffle",
    sequential: "Sequential",
    repeatList: "Repeat All",
    repeatOne: "Repeat One",
    openDesktopLyric: "Open Desktop Lyric",
    closeDesktopLyric: "Close Desktop Lyric",
    openDynamicIsland: "Open Dynamic Island",
    closeDynamicIsland: "Close Dynamic Island",
    openTaskbarLyric: "Open Taskbar Lyric",
    closeTaskbarLyric: "Close Taskbar Lyric",
    quit: "Quit"
  }
};
let currentLocale = "zh-CN";
const t = (key) => messages[currentLocale][key];
const setLocale = (locale) => {
  if (currentLocale === locale) return false;
  currentLocale = locale;
  return true;
};
const getLocale = () => currentLocale;
const logsDir = isDev ? path.join(logsDir$1, "dev") : logsDir$1;
const nativeLogsDir = path.join(logsDir$1, "native");
const autoCleanLogs = (dir, daysToKeep = 30) => {
  try {
    if (!existsSync(dir)) return;
    const files = readdirSync(dir);
    const now = Date.now();
    const msToKeep = daysToKeep * 24 * 60 * 60 * 1e3;
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats2 = statSync(filePath);
      if (now - stats2.mtimeMs > msToKeep) {
        unlinkSync(filePath);
      }
    }
  } catch {
  }
};
const initLogger = () => {
  if (!existsSync(logsDir)) mkdirSync(logsDir, { recursive: true });
  const dateString = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const logFilePath = path.join(logsDir, `${dateString}.log`);
  log.transports.file.resolvePathFn = () => logFilePath;
  log.transports.file.maxSize = 2 * 1024 * 1024;
  log.transports.file.level = "info";
  log.transports.console.useStyles = true;
  log.transports.console.level = isDev ? "debug" : "warn";
  log.errorHandler.startCatching();
  const defaultLog = log.scope("default");
  console.log = defaultLog.log;
  console.info = defaultLog.info;
  console.warn = defaultLog.warn;
  console.error = defaultLog.error;
  autoCleanLogs(logsDir, isDev ? 7 : 30);
  log.info(`日志系统已初始化 (${isDev ? "development" : "production"})`);
  log.info(`日志目录: ${logsDir}`);
};
const coreLog = log.scope("core");
const playerLog = log.scope("player");
const mediaLog = log.scope("media");
const trayLog = log.scope("tray");
const thumbarLog = log.scope("thumbar");
const systemLog = log.scope("system");
const ipcLog = log.scope("ipc");
const libraryLog = log.scope("library");
const taskbarLog = log.scope("taskbar-lyric");
const nativeLog = log.scope("native");
const streamingLog = log.scope("streaming");
const songCacheLog = log.scope("songCache");
const downloadLog = log.scope("download");
const serverLog = log.scope("server");
const pluginLog = log.scope("plugin");
const lastfmLog = log.scope("lastfm");
const neteaseLog = log.scope("netease");
const updaterLog = log.scope("updater");
const cloudLog = log.scope("cloud");
const recognitionLog = log.scope("recognition");
let tray = null;
let playState$1 = "paused";
let songName = "";
let liked = false;
let repeatMode = "list";
let shuffleMode = "off";
let desktopLyricOpen = false;
let dynamicIslandOpen = false;
let taskbarLyricOpen = false;
const repeatLabel = (mode) => ({ list: t("repeatList"), one: t("repeatOne") })[mode];
const menuIcon = (name) => {
  try {
    return loadThemedIcon("tray", name, { width: 16, height: 16 });
  } catch {
    return void 0;
  }
};
const buildMenu = () => {
  const items = [
    {
      label: songName || appName,
      icon: menuIcon("music"),
      enabled: !!songName,
      click: () => focusMainWindow()
    },
    {
      label: liked ? t("removeFromLiked") : t("addToLiked"),
      icon: menuIcon(liked ? "like" : "unlike"),
      enabled: !!songName,
      click: () => sendToMain("player:event", { type: "toggleLike" })
    },
    { type: "separator" },
    {
      label: t("prev"),
      icon: menuIcon("prev"),
      click: () => sendToMain("player:event", { type: "prev" })
    },
    {
      label: playState$1 === "paused" ? t("play") : t("pause"),
      icon: menuIcon(playState$1 === "paused" ? "play" : "pause"),
      click: () => sendToMain("player:event", { type: playState$1 === "paused" ? "play" : "pause" })
    },
    {
      label: t("next"),
      icon: menuIcon("next"),
      click: () => sendToMain("player:event", { type: "next" })
    },
    { type: "separator" },
    {
      label: shuffleMode === "on" ? t("shuffle") : t("sequential"),
      icon: menuIcon(shuffleMode === "on" ? "shuffle" : "sequential"),
      submenu: [
        {
          label: t("shuffle"),
          icon: menuIcon("shuffle"),
          type: "radio",
          checked: shuffleMode === "on",
          click: () => sendToMain("player:event", { type: "setShuffle", data: { mode: "on" } })
        },
        {
          label: t("sequential"),
          icon: menuIcon("sequential"),
          type: "radio",
          checked: shuffleMode === "off",
          click: () => sendToMain("player:event", { type: "setShuffle", data: { mode: "off" } })
        }
      ]
    },
    {
      label: repeatLabel(repeatMode),
      icon: menuIcon(repeatMode === "one" ? "repeat-once" : "repeat"),
      submenu: [
        {
          label: t("repeatList"),
          icon: menuIcon("repeat"),
          type: "radio",
          checked: repeatMode === "list",
          click: () => sendToMain("player:event", { type: "setRepeat", data: { mode: "list" } })
        },
        {
          label: t("repeatOne"),
          icon: menuIcon("repeat-once"),
          type: "radio",
          checked: repeatMode === "one",
          click: () => sendToMain("player:event", { type: "setRepeat", data: { mode: "one" } })
        }
      ]
    },
    { type: "separator" },
    {
      label: desktopLyricOpen ? t("closeDesktopLyric") : t("openDesktopLyric"),
      icon: menuIcon("lyric"),
      click: () => toggleDesktopLyricWindow()
    },
    {
      label: dynamicIslandOpen ? t("closeDynamicIsland") : t("openDynamicIsland"),
      icon: menuIcon("lyric"),
      click: () => toggleDynamicIslandWindow()
    },
    // 任务栏歌词
    ...isWin ? [
      {
        label: taskbarLyricOpen ? t("closeTaskbarLyric") : t("openTaskbarLyric"),
        icon: menuIcon("lyric"),
        click: () => toggleTaskbarLyricWindow()
      }
    ] : [],
    { type: "separator" },
    {
      label: t("quit"),
      icon: menuIcon("power"),
      click: () => app.quit()
    }
  ];
  return Menu.buildFromTemplate(items);
};
const refreshTray = () => {
  if (!tray) return;
  tray.setContextMenu(buildMenu());
  tray.setToolTip(songName || appName);
};
const initTray = () => {
  const isMac2 = process.platform === "darwin";
  let icon2;
  if (isWin) {
    icon2 = loadIcon("tray/tray.ico");
  } else if (isMac2) {
    icon2 = loadIcon("tray/tray-light.png", { width: 19, height: 19 });
    icon2.setTemplateImage(true);
  } else {
    icon2 = loadIcon("tray/tray@32.png", { width: 20, height: 20 });
  }
  tray = new Tray(icon2);
  tray.setToolTip(appName);
  tray.setContextMenu(buildMenu());
  tray.on("click", () => focusMainWindow());
  nativeTheme.on("updated", refreshTray);
  trayLog.info("初始化系统托盘");
};
const setTraySongName = (name) => {
  songName = name.length > 20 ? name.slice(0, 20) + "..." : name;
  refreshTray();
};
const setTrayPlayState = (state2) => {
  playState$1 = state2;
  refreshTray();
};
const setTrayPlayMode = (repeat, shuffle) => {
  repeatMode = repeat;
  shuffleMode = shuffle;
  refreshTray();
};
const getTrayPlayMode = () => ({
  repeat: repeatMode,
  shuffle: shuffleMode
});
const setTrayLikeState = (value) => {
  if (liked === value) return;
  liked = value;
  refreshTray();
};
const setTrayDesktopLyric = (open) => {
  if (desktopLyricOpen === open) return;
  desktopLyricOpen = open;
  refreshTray();
};
const setTrayDynamicIsland = (open) => {
  if (dynamicIslandOpen === open) return;
  dynamicIslandOpen = open;
  refreshTray();
};
const setTrayTaskbarLyric = (open) => {
  if (!isWin) return;
  if (taskbarLyricOpen === open) return;
  taskbarLyricOpen = open;
  refreshTray();
};
let quitting = false;
app.once("before-quit", () => {
  quitting = true;
});
const isAppQuitting = () => quitting;
let desktopLyricWindow = null;
const MIN_WIDTH = 400;
const MAX_WIDTH$1 = 1e4;
const FALLBACK_HEIGHT = 200;
const FALLBACK_WIDTH = 800;
const CURSOR_POLL_MS$1 = 150;
const cachedSize$1 = { width: 0, height: 0 };
let cursorPollTimer$1 = null;
let lastCursorInside$1 = false;
let unlockButtonBounds = null;
let mouseEventsIgnored = false;
const isCursorInsideBounds$1 = () => {
  if (!desktopLyricWindow || desktopLyricWindow.isDestroyed()) return false;
  const cursor = screen.getCursorScreenPoint();
  const b = desktopLyricWindow.getBounds();
  return cursor.x >= b.x && cursor.x < b.x + b.width && cursor.y >= b.y && cursor.y < b.y + b.height;
};
const isPointInsideUnlockButton = (x, y) => {
  if (!unlockButtonBounds) return false;
  return x >= unlockButtonBounds.x && x < unlockButtonBounds.x + unlockButtonBounds.width && y >= unlockButtonBounds.y && y < unlockButtonBounds.y + unlockButtonBounds.height;
};
const isCursorInsideUnlockButton = () => {
  if (!desktopLyricWindow || desktopLyricWindow.isDestroyed()) return false;
  const cursor = screen.getCursorScreenPoint();
  const content = desktopLyricWindow.getContentBounds();
  return isPointInsideUnlockButton(cursor.x - content.x, cursor.y - content.y);
};
const syncMousePassthrough = (cursorInsideUnlockButton = isCursorInsideUnlockButton()) => {
  const win = getDesktopLyricWindow();
  if (!win) return;
  const locked = store$1.get("desktopLyric").locked;
  const shouldIgnore = locked && !cursorInsideUnlockButton;
  if (shouldIgnore === mouseEventsIgnored) return;
  if (!shouldIgnore && locked && isWin) win.moveTop();
  win.setIgnoreMouseEvents(shouldIgnore, { forward: true });
  mouseEventsIgnored = shouldIgnore;
};
const startCursorPolling$1 = () => {
  if (cursorPollTimer$1) return;
  lastCursorInside$1 = isCursorInsideBounds$1();
  desktopLyricWindow?.webContents.send("desktopLyric:cursorInside", lastCursorInside$1);
  cursorPollTimer$1 = setInterval(() => {
    if (!desktopLyricWindow || desktopLyricWindow.isDestroyed()) {
      stopCursorPolling$1();
      return;
    }
    const inside = isCursorInsideBounds$1();
    if (isLinux) syncMousePassthrough();
    if (inside !== lastCursorInside$1) {
      lastCursorInside$1 = inside;
      desktopLyricWindow.webContents.send("desktopLyric:cursorInside", inside);
    }
  }, CURSOR_POLL_MS$1);
};
const stopCursorPolling$1 = () => {
  if (cursorPollTimer$1) {
    clearInterval(cursorPollTimer$1);
    cursorPollTimer$1 = null;
  }
};
const saveWindowState = () => {
  if (!desktopLyricWindow || desktopLyricWindow.isDestroyed()) return;
  const { x, y } = desktopLyricWindow.getBounds();
  store$1.set("windowStates.desktopLyric", {
    ...store$1.get("windowStates.desktopLyric"),
    x,
    y,
    width: cachedSize$1.width,
    height: cachedSize$1.height
  });
};
const applyDesktopLyricLock = (locked) => {
  const win = getDesktopLyricWindow();
  if (!win) return;
  win.setMovable(!locked);
  win.setResizable(!locked);
  syncMousePassthrough();
};
const applyDesktopLyricAlwaysOnTop = (alwaysOnTop) => {
  const win = getDesktopLyricWindow();
  if (!win) return;
  win.setAlwaysOnTop(alwaysOnTop, "screen-saver");
};
const applyDesktopLyricUnlockButtonBounds = (bounds) => {
  unlockButtonBounds = bounds;
  syncMousePassthrough();
};
const moveDesktopLyricWindow = (x, y) => {
  const win = getDesktopLyricWindow();
  if (!win) return;
  let tx = Math.round(x);
  let ty = Math.round(y);
  if (store$1.get("desktopLyric").limitBounds) {
    const display = screen.getDisplayMatching({
      x: tx,
      y: ty,
      width: cachedSize$1.width,
      height: cachedSize$1.height
    });
    const wa = display.workArea;
    tx = Math.max(wa.x, Math.min(wa.x + wa.width - cachedSize$1.width, tx));
    ty = Math.max(wa.y, Math.min(wa.y + wa.height - cachedSize$1.height, ty));
  }
  win.setBounds({ x: tx, y: ty, width: cachedSize$1.width, height: cachedSize$1.height });
};
const saveDesktopLyricState = () => {
  saveWindowState();
};
const applyDesktopLyricHeight = (height) => {
  const win = getDesktopLyricWindow();
  if (!win) return;
  const h = Math.round(height);
  cachedSize$1.height = h;
  win.setMinimumSize(MIN_WIDTH, h);
  win.setMaximumSize(MAX_WIDTH$1, h);
  const { x, y } = win.getBounds();
  win.setBounds({ x, y, width: cachedSize$1.width, height: h });
};
const createDesktopLyricWindow = () => {
  if (desktopLyricWindow && !desktopLyricWindow.isDestroyed()) {
    desktopLyricWindow.show();
    desktopLyricWindow.focus();
    return desktopLyricWindow;
  }
  const config = store$1.get("desktopLyric");
  const saved = store$1.get("windowStates.desktopLyric");
  const initialHeight = saved.height || FALLBACK_HEIGHT;
  const initialWidth = saved.width || FALLBACK_WIDTH;
  desktopLyricWindow = createWindow({
    width: initialWidth,
    height: initialHeight,
    ...saved.x !== null && saved.y !== null ? { x: saved.x, y: saved.y } : {},
    minWidth: MIN_WIDTH,
    minHeight: initialHeight,
    maxHeight: initialHeight,
    title: "SPlayer-Next - Desktop Lyric",
    frame: false,
    transparent: true,
    hasShadow: false,
    resizable: !config.locked,
    movable: !config.locked,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    alwaysOnTop: config.alwaysOnTop,
    skipTaskbar: true,
    backgroundColor: "#00000000",
    webPreferences: {
      images: false,
      disableDialogs: true,
      zoomFactor: 1
    }
  });
  cachedSize$1.width = initialWidth;
  cachedSize$1.height = initialHeight;
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    desktopLyricWindow.loadURL(
      `${process.env["ELECTRON_RENDERER_URL"]}/windows/desktop-lyric/index.html`
    );
  } else {
    desktopLyricWindow.loadFile(join(__dirname, "../renderer/windows/desktop-lyric/index.html"));
  }
  desktopLyricWindow.webContents.on("did-finish-load", () => {
    desktopLyricWindow?.webContents.setZoomFactor(1);
  });
  desktopLyricWindow.webContents.on("before-mouse-event", (_event, mouse) => {
    if (mouse.type !== "mouseMove" && mouse.type !== "mouseEnter" && mouse.type !== "mouseLeave") {
      return;
    }
    const inside = mouse.type !== "mouseLeave" && isPointInsideUnlockButton(mouse.x, mouse.y);
    syncMousePassthrough(inside);
  });
  desktopLyricWindow.once("ready-to-show", () => {
    if (!desktopLyricWindow) return;
    const b = desktopLyricWindow.getBounds();
    cachedSize$1.width = b.width;
    cachedSize$1.height = b.height;
    desktopLyricWindow.show();
    desktopLyricWindow.setAlwaysOnTop(config.alwaysOnTop, "screen-saver");
    startCursorPolling$1();
  });
  if (config.locked) {
    desktopLyricWindow.setIgnoreMouseEvents(true, { forward: true });
    mouseEventsIgnored = true;
  }
  desktopLyricWindow.on("resized", () => {
    if (!desktopLyricWindow) return;
    const b = desktopLyricWindow.getBounds();
    cachedSize$1.width = b.width;
    cachedSize$1.height = b.height;
    saveWindowState();
  });
  setTrayDesktopLyric(true);
  broadcast("desktopLyric:visibilityChange", true);
  store$1.set("windowStates.desktopLyric.visible", true);
  desktopLyricWindow.on("closed", () => {
    stopCursorPolling$1();
    unlockButtonBounds = null;
    mouseEventsIgnored = false;
    desktopLyricWindow = null;
    setTrayDesktopLyric(false);
    broadcast("desktopLyric:visibilityChange", false);
    if (!isAppQuitting()) {
      store$1.set("windowStates.desktopLyric.visible", false);
    }
  });
  return desktopLyricWindow;
};
const closeDesktopLyricWindow = () => {
  if (desktopLyricWindow && !desktopLyricWindow.isDestroyed()) {
    desktopLyricWindow.close();
  }
};
const toggleDesktopLyricWindow = () => {
  if (desktopLyricWindow && !desktopLyricWindow.isDestroyed()) {
    closeDesktopLyricWindow();
    return false;
  }
  createDesktopLyricWindow();
  return true;
};
const getDesktopLyricWindow = () => {
  if (desktopLyricWindow && !desktopLyricWindow.isDestroyed()) return desktopLyricWindow;
  return null;
};
let dynamicIslandWindow = null;
const NOTCH_PHYSICAL_WIDTH = 358;
const NOTCH_PHYSICAL_HEIGHT = 58;
const RETINA_NOTCH_BODY_WIDTH = 181;
const NOTCH_SIDE_OVERHANG = 5;
const RETINA_NOTCH_WIDTH = RETINA_NOTCH_BODY_WIDTH + NOTCH_SIDE_OVERHANG * 2;
const RETINA_NOTCH_HEIGHT = 29;
const NOTCH_TOP_OFFSET = 0;
const NOTCH_TOP_FILL = 3;
const MIN_HEIGHT = 14;
const MAX_HEIGHT = 200;
const MAX_WIDTH = 620;
const MAX_WIDTH_RATIO = 0.55;
const SNAP_THRESHOLD = 8;
const INITIAL_WIDTH$1 = 200;
const CURSOR_POLL_MS = 150;
const cachedSize = { width: INITIAL_WIDTH$1, height: 40 };
let activeShapeWidth = null;
const isNotchFusionEnabled = () => isMac && store$1.get("dynamicIsland").notchFusion;
const clampHeight = (h) => Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.round(h)));
const getNotchMetrics = (display) => {
  const scaleFactor = Math.max(1, display.scaleFactor || 1);
  if (Math.abs(scaleFactor - 2) < 0.25) {
    return {
      width: RETINA_NOTCH_WIDTH,
      height: RETINA_NOTCH_HEIGHT,
      topOffset: NOTCH_TOP_OFFSET
    };
  }
  return {
    width: Math.round(NOTCH_PHYSICAL_WIDTH / scaleFactor) + NOTCH_SIDE_OVERHANG * 2,
    height: Math.round(NOTCH_PHYSICAL_HEIGHT / scaleFactor),
    topOffset: NOTCH_TOP_OFFSET
  };
};
const getWidthLimits = (display) => {
  if (!isNotchFusionEnabled()) {
    return { min: 1, max: display.workArea.width };
  }
  const notch = getNotchMetrics(display);
  const max = Math.max(
    notch.width,
    Math.min(MAX_WIDTH, Math.floor(display.bounds.width * MAX_WIDTH_RATIO))
  );
  return { min: notch.width, max };
};
const clampWidth = (width, display) => {
  const limits = getWidthLimits(display);
  return Math.min(limits.max, Math.max(limits.min, Math.round(width)));
};
const getCurrentDisplay = () => {
  const saved = store$1.get("windowStates.dynamicIsland");
  if (dynamicIslandWindow && !dynamicIslandWindow.isDestroyed()) {
    const bounds = dynamicIslandWindow.getBounds();
    return screen.getDisplayNearestPoint({
      x: bounds.x + Math.round(bounds.width / 2),
      y: bounds.y + Math.round(bounds.height / 2)
    });
  }
  if (saved.x !== null && saved.y !== null) {
    return screen.getDisplayNearestPoint({
      x: saved.x,
      y: saved.y + Math.round(cachedSize.height / 2)
    });
  }
  return screen.getPrimaryDisplay();
};
const computeSnappedPos = (display = getCurrentDisplay()) => {
  if (!isNotchFusionEnabled()) {
    const config = store$1.get("dynamicIsland");
    const saved = store$1.get("windowStates.dynamicIsland");
    const wa = display.workArea;
    if (config.snapCentered || saved.x === null) {
      return {
        x: wa.x + Math.round((wa.width - cachedSize.width) / 2),
        y: wa.y
      };
    }
    const savedX = saved.x;
    const leftFromCenter2 = savedX - Math.round(cachedSize.width / 2);
    return {
      x: Math.max(wa.x, Math.min(wa.x + wa.width - cachedSize.width, leftFromCenter2)),
      y: wa.y
    };
  }
  const bounds = display.bounds;
  const centerX = bounds.x + Math.round(bounds.width / 2);
  const leftFromCenter = centerX - Math.round(cachedSize.width / 2);
  const x = Math.max(
    bounds.x,
    Math.min(bounds.x + bounds.width - cachedSize.width, leftFromCenter)
  );
  return { x, y: bounds.y + NOTCH_TOP_OFFSET };
};
const applyDynamicIslandAlwaysOnTop = (alwaysOnTop) => {
  const win = getDynamicIslandWindow();
  if (!win) return;
  win.setAlwaysOnTop(alwaysOnTop, "screen-saver");
};
let cursorPollTimer = null;
let lastCursorInside = false;
const isCursorInsideBounds = () => {
  if (!dynamicIslandWindow || dynamicIslandWindow.isDestroyed()) return false;
  const cursor = screen.getCursorScreenPoint();
  const b = dynamicIslandWindow.getBounds();
  const shapeWidth = activeShapeWidth === null ? b.width : Math.min(b.width, Math.max(1, activeShapeWidth));
  const shapeLeft = b.x + Math.round((b.width - shapeWidth) / 2);
  return cursor.x >= shapeLeft && cursor.x < shapeLeft + shapeWidth && cursor.y >= b.y && cursor.y < b.y + b.height;
};
const startCursorPolling = () => {
  if (cursorPollTimer) return;
  lastCursorInside = isCursorInsideBounds();
  dynamicIslandWindow?.webContents.send("dynamicIsland:cursorInside", lastCursorInside);
  cursorPollTimer = setInterval(() => {
    if (!dynamicIslandWindow || dynamicIslandWindow.isDestroyed()) {
      stopCursorPolling();
      return;
    }
    const inside = isCursorInsideBounds();
    if (inside !== lastCursorInside) {
      lastCursorInside = inside;
      dynamicIslandWindow.webContents.send("dynamicIsland:cursorInside", inside);
    }
  }, CURSOR_POLL_MS);
};
const stopCursorPolling = () => {
  if (cursorPollTimer) {
    clearInterval(cursorPollTimer);
    cursorPollTimer = null;
  }
  if (lastCursorInside) {
    lastCursorInside = false;
    dynamicIslandWindow?.webContents.send("dynamicIsland:cursorInside", false);
  }
};
const applyDynamicIslandNonOcclusive = (enabled2) => {
  const win = getDynamicIslandWindow();
  if (!win) return;
  win.setIgnoreMouseEvents(enabled2, { forward: true });
  if (enabled2) {
    startCursorPolling();
  } else {
    stopCursorPolling();
  }
};
const applyDynamicIslandSnapCentered = (snapCentered) => {
  const win = getDynamicIslandWindow();
  if (!win) return;
  const saved = store$1.get("windowStates.dynamicIsland");
  if (saved.mode !== "snapped") return;
  if (isNotchFusionEnabled()) {
    store$1.set("windowStates.dynamicIsland", {
      ...saved,
      mode: "snapped",
      x: null,
      y: null
    });
    const pos2 = computeSnappedPos();
    win.setBounds({ x: pos2.x, y: pos2.y, width: cachedSize.width, height: cachedSize.height });
    return;
  }
  if (snapCentered) {
    store$1.set("windowStates.dynamicIsland", {
      ...saved,
      mode: "snapped",
      x: null,
      y: null
    });
  } else if (saved.x === null) {
    const bounds = win.getBounds();
    const display = screen.getDisplayNearestPoint({
      x: bounds.x + Math.round(bounds.width / 2),
      y: bounds.y + Math.round(bounds.height / 2)
    });
    store$1.set("windowStates.dynamicIsland", {
      ...saved,
      mode: "snapped",
      x: bounds.x + Math.round(bounds.width / 2),
      y: display.workArea.y
    });
  }
  const pos = computeSnappedPos();
  win.setBounds({ x: pos.x, y: pos.y, width: cachedSize.width, height: cachedSize.height });
};
const applyDynamicIslandNotchFusion = (enabled2) => {
  const win = getDynamicIslandWindow();
  if (!win) return;
  const saved = store$1.get("windowStates.dynamicIsland");
  if (enabled2) {
    store$1.set("windowStates.dynamicIsland", {
      ...saved,
      mode: "snapped",
      x: null,
      y: null
    });
  } else if (saved.mode !== "snapped") {
    return;
  }
  const pos = computeSnappedPos();
  win.setBounds({ x: pos.x, y: pos.y, width: cachedSize.width, height: cachedSize.height });
};
const applyDynamicIslandHeight = (height) => {
  const win = getDynamicIslandWindow();
  if (!win) return;
  const h = clampHeight(height);
  cachedSize.height = h;
  const saved = store$1.get("windowStates.dynamicIsland");
  if (saved.mode === "snapped") {
    const pos = computeSnappedPos();
    win.setBounds({ x: pos.x, y: pos.y, width: cachedSize.width, height: h });
  } else {
    const bounds = win.getBounds();
    win.setBounds({ x: bounds.x, y: bounds.y, width: cachedSize.width, height: h });
  }
  updateDynamicIslandShape();
};
const applyDynamicIslandWidth = (width) => {
  const win = getDynamicIslandWindow();
  if (!win) return;
  const bounds = win.getBounds();
  const display = screen.getDisplayNearestPoint({
    x: bounds.x + Math.round(bounds.width / 2),
    y: bounds.y + Math.round(bounds.height / 2)
  });
  const newWidth = clampWidth(width, display);
  const oldWidth = cachedSize.width;
  cachedSize.width = newWidth;
  const saved = store$1.get("windowStates.dynamicIsland");
  if (saved.mode === "snapped") {
    const pos = computeSnappedPos(display);
    win.setBounds({ x: pos.x, y: pos.y, width: newWidth, height: cachedSize.height });
  } else {
    const centerX = bounds.x + Math.round(oldWidth / 2);
    const newX = centerX - Math.round(newWidth / 2);
    win.setBounds({ x: newX, y: bounds.y, width: newWidth, height: cachedSize.height });
  }
  updateDynamicIslandShape();
};
const updateDynamicIslandShape = () => {
  const win = getDynamicIslandWindow();
  if (!win || isMac) return;
  if (activeShapeWidth === null) {
    win.setShape([]);
    return;
  }
  const shapeWidth = Math.min(cachedSize.width, Math.max(1, Math.round(activeShapeWidth)));
  win.setShape([
    {
      x: Math.round((cachedSize.width - shapeWidth) / 2),
      y: 0,
      width: shapeWidth,
      height: cachedSize.height
    }
  ]);
};
const applyDynamicIslandShape = (width) => {
  activeShapeWidth = width;
  updateDynamicIslandShape();
};
const moveDynamicIslandWindow = (x, y) => {
  const win = getDynamicIslandWindow();
  if (!win) return;
  const tx = Math.round(x);
  let ty = Math.round(y);
  const display = screen.getDisplayNearestPoint({
    x: tx + Math.round(cachedSize.width / 2),
    y: ty + Math.round(cachedSize.height / 2)
  });
  const wa = display.workArea;
  const snapY = isNotchFusionEnabled() ? display.bounds.y + NOTCH_TOP_OFFSET : wa.y;
  ty = Math.max(snapY, Math.min(wa.y + wa.height - cachedSize.height, ty));
  win.setBounds({ x: tx, y: ty, width: cachedSize.width, height: cachedSize.height });
  broadcastMode(ty <= snapY ? "snapped" : "floating");
};
let lastBroadcastMode = null;
const broadcastMode = (mode) => {
  if (mode === lastBroadcastMode) return;
  lastBroadcastMode = mode;
  const win = getDynamicIslandWindow();
  win?.webContents.send("dynamicIsland:modeChange", mode);
};
const saveDynamicIslandState = () => {
  const win = getDynamicIslandWindow();
  if (!win) return;
  const b = win.getBounds();
  const display = screen.getDisplayNearestPoint({
    x: b.x + Math.round(b.width / 2),
    y: b.y + Math.round(b.height / 2)
  });
  const wa = display.workArea;
  const snapY = isNotchFusionEnabled() ? display.bounds.y + NOTCH_TOP_OFFSET : wa.y;
  if (b.y - snapY <= SNAP_THRESHOLD) {
    const config = store$1.get("dynamicIsland");
    if (isNotchFusionEnabled() || config.snapCentered) {
      const pos = computeSnappedPos(display);
      win.setBounds({ x: pos.x, y: pos.y, width: cachedSize.width, height: cachedSize.height });
      store$1.set("windowStates.dynamicIsland", {
        ...store$1.get("windowStates.dynamicIsland"),
        mode: "snapped",
        x: null,
        y: null
      });
    } else {
      const clampedLeftX = Math.max(wa.x, Math.min(wa.x + wa.width - cachedSize.width, b.x));
      const centerX = clampedLeftX + Math.round(cachedSize.width / 2);
      win.setBounds({
        x: clampedLeftX,
        y: wa.y,
        width: cachedSize.width,
        height: cachedSize.height
      });
      store$1.set("windowStates.dynamicIsland", {
        ...store$1.get("windowStates.dynamicIsland"),
        mode: "snapped",
        x: centerX,
        y: wa.y
      });
    }
    broadcastMode("snapped");
  } else {
    store$1.set("windowStates.dynamicIsland", {
      ...store$1.get("windowStates.dynamicIsland"),
      mode: "floating",
      x: b.x,
      y: b.y
    });
    broadcastMode("floating");
  }
};
const createDynamicIslandWindow = () => {
  if (dynamicIslandWindow && !dynamicIslandWindow.isDestroyed()) {
    dynamicIslandWindow.show();
    dynamicIslandWindow.focus();
    return dynamicIslandWindow;
  }
  const config = store$1.get("dynamicIsland");
  const saved = store$1.get("windowStates.dynamicIsland");
  const fusionEnabled = isNotchFusionEnabled();
  const initialDisplay = fusionEnabled ? screen.getPrimaryDisplay() : getCurrentDisplay();
  const floatingPos = !fusionEnabled && saved.mode === "floating" && saved.x !== null && saved.y !== null ? { x: saved.x, y: saved.y } : null;
  const initialNotch = getNotchMetrics(initialDisplay);
  cachedSize.width = clampWidth(INITIAL_WIDTH$1, initialDisplay);
  cachedSize.height = clampHeight(
    (floatingPos ? 0 : fusionEnabled ? initialNotch.height + NOTCH_TOP_FILL : 0) + DYNAMIC_ISLAND_BASE_HEIGHT * config.scale
  );
  let initialPos;
  if (floatingPos) {
    const display = screen.getDisplayNearestPoint({
      x: floatingPos.x + Math.round(cachedSize.width / 2),
      y: floatingPos.y + Math.round(cachedSize.height / 2)
    });
    const wa = display.workArea;
    initialPos = {
      x: Math.max(wa.x, Math.min(wa.x + wa.width - cachedSize.width, floatingPos.x)),
      y: Math.max(wa.y, Math.min(wa.y + wa.height - cachedSize.height, floatingPos.y))
    };
  } else {
    if (fusionEnabled) {
      store$1.set("windowStates.dynamicIsland", {
        ...saved,
        mode: "snapped",
        x: null,
        y: null
      });
    } else if (config.snapCentered && saved.mode !== "snapped") {
      store$1.set("windowStates.dynamicIsland", {
        ...saved,
        mode: "snapped",
        x: null,
        y: null
      });
    }
    initialPos = computeSnappedPos(initialDisplay);
  }
  dynamicIslandWindow = createWindow({
    width: cachedSize.width,
    height: cachedSize.height,
    minWidth: 1,
    minHeight: 1,
    x: initialPos.x,
    y: initialPos.y,
    title: "Dynamic Island",
    frame: false,
    transparent: true,
    hasShadow: false,
    resizable: false,
    movable: true,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    roundedCorners: false,
    alwaysOnTop: config.alwaysOnTop,
    skipTaskbar: true,
    backgroundColor: "#00000000",
    webPreferences: {
      disableDialogs: true,
      zoomFactor: 1
    }
  });
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    dynamicIslandWindow.loadURL(
      `${process.env["ELECTRON_RENDERER_URL"]}/windows/dynamic-island/index.html`
    );
  } else {
    dynamicIslandWindow.loadFile(join(__dirname, "../renderer/windows/dynamic-island/index.html"));
  }
  dynamicIslandWindow.webContents.on("did-finish-load", () => {
    if (!dynamicIslandWindow) return;
    dynamicIslandWindow.webContents.setZoomFactor(1);
    const currentSaved = store$1.get("windowStates.dynamicIsland");
    lastBroadcastMode = null;
    broadcastMode(currentSaved.mode === "floating" ? "floating" : "snapped");
  });
  dynamicIslandWindow.once("ready-to-show", () => {
    if (!dynamicIslandWindow) return;
    dynamicIslandWindow.show();
    dynamicIslandWindow.setAlwaysOnTop(config.alwaysOnTop, "screen-saver");
    if (config.nonOcclusive) {
      dynamicIslandWindow.setIgnoreMouseEvents(true, { forward: true });
      startCursorPolling();
    }
  });
  setTrayDynamicIsland(true);
  broadcast("dynamicIsland:visibilityChange", true);
  store$1.set("windowStates.dynamicIsland.visible", true);
  dynamicIslandWindow.on("closed", () => {
    stopCursorPolling();
    activeShapeWidth = null;
    dynamicIslandWindow = null;
    lastBroadcastMode = null;
    setTrayDynamicIsland(false);
    broadcast("dynamicIsland:visibilityChange", false);
    if (!isAppQuitting()) {
      store$1.set("windowStates.dynamicIsland.visible", false);
    }
  });
  return dynamicIslandWindow;
};
const closeDynamicIslandWindow = () => {
  if (dynamicIslandWindow && !dynamicIslandWindow.isDestroyed()) {
    dynamicIslandWindow.close();
  }
};
const toggleDynamicIslandWindow = () => {
  if (dynamicIslandWindow && !dynamicIslandWindow.isDestroyed()) {
    closeDynamicIslandWindow();
    return false;
  }
  createDynamicIslandWindow();
  return true;
};
const getDynamicIslandWindow = () => {
  if (dynamicIslandWindow && !dynamicIslandWindow.isDestroyed()) return dynamicIslandWindow;
  return null;
};
const requireNative = createRequire(import.meta.url);
const loadNativeModule = (fileName, devDirName) => {
  let nativeModulePath;
  if (app.isPackaged) {
    nativeModulePath = path$1.join(process.resourcesPath, "native", fileName);
  } else {
    nativeModulePath = path$1.join(process.cwd(), "native", devDirName, fileName);
  }
  try {
    const mod = requireNative(nativeModulePath);
    nativeLog.debug(`加载 ${fileName} 成功`);
    return mod;
  } catch (error) {
    nativeLog.error(`加载 ${fileName} 失败:`, error);
    return null;
  }
};
const REG_SUBKEY_EXPLORER_ADVANCED = "Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced";
const REG_SUBKEY_PERSONALIZE = "Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize";
let taskbarLyricWindow = null;
let nativeModule = null;
let service = null;
let advancedRegWatcher = null;
let themeRegWatcher = null;
let uiaWatcher = null;
let trayWatcher = null;
let taskbarCreatedWatcher = null;
let activeWindowRegion = null;
let contentWidth = null;
const resolveLyricWidth = () => {
  const width = store$1.get("taskbarLyric.maxWidth");
  return typeof width === "number" && width > 0 ? width : 400;
};
const INITIAL_WIDTH = 3e3;
const INITIAL_HEIGHT = 200;
const MIN_LYRIC_WIDTH_DIP = 120;
const getTaskbarLyricWindow = () => taskbarLyricWindow && !taskbarLyricWindow.isDestroyed() ? taskbarLyricWindow : null;
const applyContentShape = () => {
  const win = getTaskbarLyricWindow();
  const region = activeWindowRegion;
  if (!win || !region) return;
  const adjustOccupiedSpace = (store$1.get("taskbarLyric.autoMaxWidth") ?? true) && (store$1.get("taskbarLyric.autoAdjustOccupiedSpace") ?? false);
  const shapeWidth = Math.min(
    region.maxWidth,
    Math.max(
      MIN_LYRIC_WIDTH_DIP,
      Math.round(adjustOccupiedSpace ? contentWidth ?? region.maxWidth : region.maxWidth)
    )
  );
  if (shapeWidth >= region.maxWidth) {
    win.setShape([]);
    return;
  }
  const x = region.anchor === "right" ? region.maxWidth - shapeWidth : 0;
  win.setShape([{ x, y: 0, width: shapeWidth, height: region.height }]);
};
const updateTaskbarLyricContentWidth = (width) => {
  if (!Number.isFinite(width) || width <= 0) return;
  contentWidth = width;
  applyContentShape();
};
const pickSpace = (layout) => {
  const position = store$1.get("taskbarLyric.position") ?? "auto";
  const { left, right } = layout.space;
  const isCentered = layout.extra.isCentered;
  if (position === "left" && left.width > 0) return { rect: left, anchor: "left" };
  if (position === "right" && right.width > 0) return { rect: right, anchor: "right" };
  if (position === "auto") {
    if (isCentered) {
      if (left.width >= right.width) return { rect: left, anchor: "left" };
      return { rect: right, anchor: "right" };
    }
    return right.width > 0 ? { rect: right, anchor: "right" } : { rect: left, anchor: "left" };
  }
  if (right.width > 0) return { rect: right, anchor: "right" };
  if (left.width > 0) return { rect: left, anchor: "left" };
  return null;
};
let firstLayoutDone = false;
const hideIfVisible = (win) => {
  if (win.isVisible()) win.hide();
};
const applyLayout = (layout) => {
  const win = getTaskbarLyricWindow();
  if (!win) return;
  const picked = pickSpace(layout);
  if (!picked) {
    hideIfVisible(win);
    return;
  }
  const { rect, anchor } = picked;
  if (rect.width <= 0 || rect.height <= 0) {
    hideIfVisible(win);
    return;
  }
  const dpi = screen.getPrimaryDisplay().scaleFactor;
  const leftMargin = store$1.get("taskbarLyric.leftMargin") ?? 0;
  const rightMargin = store$1.get("taskbarLyric.rightMargin") ?? 0;
  const availX = Math.round(rect.x / dpi) + leftMargin;
  const availY = Math.round(rect.y / dpi);
  const availWidth = Math.round(rect.width / dpi) - leftMargin - rightMargin;
  const availHeight = Math.round(rect.height / dpi);
  if (availWidth < MIN_LYRIC_WIDTH_DIP) {
    hideIfVisible(win);
    return;
  }
  const autoMaxWidth = store$1.get("taskbarLyric.autoMaxWidth") ?? true;
  const maxWidth = store$1.get("taskbarLyric.maxWidth") ?? 400;
  const windowWidth = autoMaxWidth ? availWidth : Math.min(maxWidth, availWidth);
  const windowX = anchor === "right" ? availX + availWidth - windowWidth : availX;
  activeWindowRegion = {
    x: windowX,
    y: availY,
    maxWidth: windowWidth,
    height: availHeight,
    anchor
  };
  win.setBounds({ x: windowX, y: availY, width: windowWidth, height: availHeight });
  applyContentShape();
  if (!firstLayoutDone) {
    firstLayoutDone = true;
    win.showInactive();
  } else if (!win.isVisible()) {
    win.showInactive();
  }
  win.webContents.send("taskbarLyric:layout", {
    isCentered: layout.extra.isCentered,
    systemType: layout.extra.systemType,
    isLight: layout.extra.isLight,
    anchor,
    maxWidth: windowWidth
  });
};
const onLayoutChange = () => {
  service?.update(resolveLyricWidth());
};
const tryStart = (name, factory) => {
  try {
    return factory();
  } catch (error) {
    taskbarLog.warn(`${name} 启动失败`, error);
    return null;
  }
};
const startWatchers = (mod) => {
  advancedRegWatcher = tryStart(
    "RegistryWatcher(Advanced)",
    () => new mod.RegistryWatcher(REG_SUBKEY_EXPLORER_ADVANCED, onLayoutChange)
  );
  themeRegWatcher = tryStart(
    "RegistryWatcher(Personalize)",
    () => new mod.RegistryWatcher(REG_SUBKEY_PERSONALIZE, onLayoutChange)
  );
  uiaWatcher = tryStart("UiaWatcher", () => new mod.UiaWatcher(onLayoutChange));
  trayWatcher = tryStart("TrayWatcher", () => new mod.TrayWatcher(onLayoutChange));
};
const stopLayoutWatchers = () => {
  advancedRegWatcher?.stop();
  advancedRegWatcher = null;
  themeRegWatcher?.stop();
  themeRegWatcher = null;
  uiaWatcher?.stop();
  uiaWatcher = null;
  trayWatcher?.stop();
  trayWatcher = null;
};
const onExplorerRestart = () => {
  taskbarLog.info("探测到 explorer 重启，重建 watcher 与嵌入");
  stopLayoutWatchers();
  service?.reinit();
  if (nativeModule) startWatchers(nativeModule);
};
const createTaskbarLyricWindow = () => {
  if (process.platform !== "win32") {
    taskbarLog.warn("任务栏歌词仅支持 Windows");
    return null;
  }
  if (taskbarLyricWindow && !taskbarLyricWindow.isDestroyed()) {
    taskbarLyricWindow.show();
    return taskbarLyricWindow;
  }
  if (!nativeModule) {
    nativeModule = loadNativeModule("taskbar-lyric.node", "taskbar-lyric");
    if (!nativeModule) {
      taskbarLog.error("原生模块加载失败");
      return null;
    }
  }
  service = new nativeModule.TaskbarService(applyLayout);
  taskbarLyricWindow = createWindow({
    width: INITIAL_WIDTH,
    height: INITIAL_HEIGHT,
    // 覆盖默认 minWidth/minHeight（800/600），允许 setBounds 缩小到很小
    minWidth: 0,
    minHeight: 0,
    type: "toolbar",
    title: "Taskbar Lyric",
    frame: false,
    transparent: true,
    hasShadow: false,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    show: false,
    backgroundColor: "#00000000",
    webPreferences: {
      disableDialogs: true,
      zoomFactor: 1
    }
  });
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    taskbarLyricWindow.loadURL(
      `${process.env["ELECTRON_RENDERER_URL"]}/windows/taskbar-lyric/index.html`
    );
  } else {
    taskbarLyricWindow.loadFile(join(__dirname, "../renderer/windows/taskbar-lyric/index.html"));
  }
  taskbarLyricWindow.once("ready-to-show", () => {
    const win = taskbarLyricWindow;
    const svc = service;
    const mod = nativeModule;
    if (!win || !svc || !mod) return;
    const hwndPtrBigInt = win.getNativeWindowHandle().readBigUInt64LE(0);
    if (hwndPtrBigInt > BigInt(Number.MAX_SAFE_INTEGER)) {
      taskbarLog.error(
        `嵌入窗口失败：hwnd=${hwndPtrBigInt.toString()} 超出 JS Number 安全整数范围`
      );
      return;
    }
    const hwndPtr = Number(hwndPtrBigInt);
    taskbarLog.info(`嵌入窗口 hwnd=${hwndPtr}`);
    svc.embedWindowByPtr(hwndPtr);
    svc.update(resolveLyricWidth());
    startWatchers(mod);
    taskbarCreatedWatcher = tryStart(
      "TaskbarCreatedWatcher",
      () => new mod.TaskbarCreatedWatcher(onExplorerRestart)
    );
  });
  taskbarLyricWindow.on("closed", () => {
    taskbarLyricWindow = null;
    firstLayoutDone = false;
    activeWindowRegion = null;
    contentWidth = null;
    cleanupWatchers();
    setTrayTaskbarLyric(false);
    broadcast("taskbarLyric:visibilityChange", false);
    if (!isAppQuitting()) {
      store$1.set("windowStates.taskbarLyric.visible", false);
    }
  });
  setTrayTaskbarLyric(true);
  broadcast("taskbarLyric:visibilityChange", true);
  store$1.set("windowStates.taskbarLyric.visible", true);
  return taskbarLyricWindow;
};
const cleanupWatchers = () => {
  stopLayoutWatchers();
  taskbarCreatedWatcher?.stop();
  taskbarCreatedWatcher = null;
  service?.stop();
  service = null;
};
const closeTaskbarLyricWindow = () => {
  if (taskbarLyricWindow && !taskbarLyricWindow.isDestroyed()) {
    taskbarLyricWindow.close();
  }
};
const toggleTaskbarLyricWindow = () => {
  if (taskbarLyricWindow && !taskbarLyricWindow.isDestroyed()) {
    closeTaskbarLyricWindow();
    return false;
  }
  return createTaskbarLyricWindow() !== null;
};
const applyTaskbarLyricLayout = () => {
  service?.update(resolveLyricWidth());
};
let thumbar = null;
const thumbarIcon = (name) => loadThemedIcon("thumbar", name);
const REGISTER_RETRY_MAX = 8;
const REGISTER_RETRY_DELAY_MS = 500;
class ThumbarImpl {
  win;
  like;
  prev;
  next;
  play;
  pause;
  isPlaying = false;
  isLiked = false;
  onThemeUpdated;
  onWindowShown;
  onWindowRestore;
  retryTimeout = null;
  hasRegistered = false;
  disposed = false;
  constructor(win) {
    this.win = win;
    this.like = {
      tooltip: t("addToLiked"),
      icon: thumbarIcon("unlike"),
      click: () => sendToMain("player:event", { type: "toggleLike" })
    };
    this.prev = {
      tooltip: t("prev"),
      icon: thumbarIcon("prev"),
      click: () => sendToMain("player:event", { type: "prev" })
    };
    this.next = {
      tooltip: t("next"),
      icon: thumbarIcon("next"),
      click: () => sendToMain("player:event", { type: "next" })
    };
    this.play = {
      tooltip: t("play"),
      icon: thumbarIcon("play"),
      click: () => sendToMain("player:event", { type: "play" })
    };
    this.pause = {
      tooltip: t("pause"),
      icon: thumbarIcon("pause"),
      click: () => sendToMain("player:event", { type: "pause" })
    };
    this.updateThumbar(false);
    this.onThemeUpdated = () => {
      this.prev.icon = thumbarIcon("prev");
      this.next.icon = thumbarIcon("next");
      this.play.icon = thumbarIcon("play");
      this.pause.icon = thumbarIcon("pause");
      this.updateThumbar(this.isPlaying);
    };
    nativeTheme.on("updated", this.onThemeUpdated);
    this.onWindowShown = () => {
      this.hasRegistered = false;
      this.updateThumbar(this.isPlaying);
    };
    this.onWindowRestore = () => {
      this.hasRegistered = false;
      this.updateThumbar(this.isPlaying);
    };
    win.on("show", this.onWindowShown);
    win.on("restore", this.onWindowRestore);
    win.on("closed", () => {
      this.disposed = true;
      nativeTheme.removeListener("updated", this.onThemeUpdated);
      win.removeListener("show", this.onWindowShown);
      win.removeListener("restore", this.onWindowRestore);
      if (this.retryTimeout) clearTimeout(this.retryTimeout);
    });
  }
  // 下发当前按钮组，喜欢按钮随状态切换图标与提示
  renderButtons(retryCount = 0) {
    if (this.disposed || this.win.isDestroyed()) return;
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
      this.retryTimeout = null;
    }
    this.like.icon = thumbarIcon(this.isLiked ? "like" : "unlike");
    this.like.tooltip = t(this.isLiked ? "removeFromLiked" : "addToLiked");
    const buttons = [this.prev, this.isPlaying ? this.pause : this.play, this.next, this.like];
    const success = this.win.setThumbarButtons(buttons);
    if (success) {
      this.hasRegistered = true;
      if (retryCount > 0) thumbarLog.info(`Thumbar 第 ${retryCount} 次重试后注册成功`);
    }
    if (!success && !this.hasRegistered && retryCount < REGISTER_RETRY_MAX) {
      thumbarLog.warn(`Thumbar 注册失败，准备进行第 ${retryCount + 1} 次重试...`);
      this.retryTimeout = setTimeout(
        () => this.renderButtons(retryCount + 1),
        REGISTER_RETRY_DELAY_MS
      );
    } else if (!success) {
      thumbarLog.warn("Thumbar 注册失败，已达到重试上限");
    }
  }
  // 更新播放状态
  updateThumbar(playing2) {
    this.isPlaying = playing2;
    this.renderButtons();
  }
  // 更新喜欢状态
  updateLike(liked2) {
    this.isLiked = liked2;
    this.renderButtons();
  }
  // 语言变更后刷新 tooltip
  refreshLocale() {
    this.prev.tooltip = t("prev");
    this.next.tooltip = t("next");
    this.play.tooltip = t("play");
    this.pause.tooltip = t("pause");
    this.updateThumbar(this.isPlaying);
  }
  // 清除工具栏
  clearThumbar() {
    if (this.win.isDestroyed()) return;
    this.win.setThumbarButtons([]);
  }
}
const initThumbar = (win) => {
  if (process.platform !== "win32") return null;
  try {
    thumbarLog.info("初始化缩略图工具栏");
    thumbar = new ThumbarImpl(win);
    return thumbar;
  } catch (error) {
    thumbarLog.error("初始化失败:", error);
    return null;
  }
};
const getThumbar = () => thumbar;
const defaultCoverPath = join(import.meta.dirname, "../../public/images/song.jpg");
let native$1 = null;
let enabled = false;
let mainWin = null;
let lastCover = null;
let defaultImg = null;
const COVER_SIZE = 256;
const load$2 = () => {
  if (native$1) return native$1;
  native$1 = loadNativeModule("taskbar-thumbnail.node", "taskbar-thumbnail");
  return native$1;
};
const getDefaultImg = () => {
  if (!defaultImg) defaultImg = nativeImage.createFromPath(defaultCoverPath);
  return defaultImg;
};
const getHwndPtr = (win) => {
  try {
    const big = win.getNativeWindowHandle().readBigUInt64LE(0);
    if (big > BigInt(Number.MAX_SAFE_INTEGER)) return null;
    return Number(big);
  } catch {
    return null;
  }
};
const pushCover = (cover) => {
  if (!native$1) return;
  try {
    let img;
    if (typeof cover === "string") img = nativeImage.createFromPath(cover);
    else if (cover && cover.length) img = nativeImage.createFromBuffer(cover);
    else img = getDefaultImg();
    if (img.isEmpty()) return;
    const { width: ow, height: oh } = img.getSize();
    const resized = ow >= oh ? img.resize({ width: COVER_SIZE }) : img.resize({ height: COVER_SIZE });
    const { width, height } = resized.getSize();
    native$1.setCover(resized.toBitmap(), width, height);
  } catch (error) {
    nativeLog.warn("更新任务栏缩略图封面失败", error);
  }
};
const enableTaskbarThumbnail = (win) => {
  if (!isWin) return;
  mainWin = win;
  if (enabled) return;
  if (!store$1.get("system.taskbarThumbnailCover")) return;
  const mod = load$2();
  if (!mod) return;
  const ptr = getHwndPtr(win);
  if (ptr === null) return;
  enabled = mod.enable(ptr);
  if (enabled) {
    nativeLog.debug("任务栏缩略图自定义已启用");
    pushCover(lastCover);
  }
};
const disableTaskbarThumbnail = () => {
  if (!isWin || !enabled || !native$1) return;
  native$1.disable();
  enabled = false;
  nativeLog.debug("任务栏缩略图自定义已关闭");
};
const setTaskbarThumbnailEnabled = (on) => {
  if (!isWin) return;
  if (on) {
    if (mainWin) enableTaskbarThumbnail(mainWin);
  } else {
    disableTaskbarThumbnail();
  }
};
const setTaskbarThumbnailCover = (cover) => {
  if (!isWin) return;
  const has = typeof cover === "string" ? cover.length > 0 : !!cover && cover.length > 0;
  lastCover = has ? cover : null;
  if (enabled) pushCover(lastCover);
};
const SCHEME$1 = "cache";
const STREAMING_COVER_SCHEME = "streaming-cover";
const MAIN_PARTITION = "persist:main";
const registerCacheScheme = () => {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: SCHEME$1,
      privileges: {
        standard: true,
        corsEnabled: true,
        secure: true,
        supportFetchAPI: true,
        bypassCSP: true,
        stream: true
      }
    },
    {
      scheme: STREAMING_COVER_SCHEME,
      privileges: {
        standard: true,
        corsEnabled: true,
        secure: true,
        supportFetchAPI: true,
        bypassCSP: true,
        stream: true
      }
    }
  ]);
};
const cacheHandler = (request2) => {
  const withoutQuery = request2.url.split("?")[0];
  const relativePath = decodeURIComponent(withoutQuery.slice(`${SCHEME$1}://`.length));
  const root = getAppCacheDir();
  const resolved = path.resolve(root, relativePath);
  const rootWithSep = root.endsWith(path.sep) ? root : root + path.sep;
  if (resolved !== root && !resolved.startsWith(rootWithSep)) {
    return new Response(null, { status: 403 });
  }
  return net.fetch(`file://${resolved.replace(/\\/g, "/")}`);
};
const handleCacheProtocol = () => {
  protocol.handle(SCHEME$1, cacheHandler);
};
const handleCacheProtocolOnPartition = (partition) => {
  session$2.fromPartition(partition).protocol.handle(SCHEME$1, cacheHandler);
};
const toCacheUrl = (filePath) => {
  if (!filePath) return void 0;
  const relative = path.relative(getAppCacheDir(), filePath);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) return void 0;
  return `${SCHEME$1}://${relative.replace(/\\/g, "/")}`;
};
const CURRENT_AGREEMENT_VERSION = 3;
const isInternalNavigation = (url) => {
  if (url.startsWith("file://")) return true;
  const devBase = process.env["ELECTRON_RENDERER_URL"];
  return !!devBase && url.startsWith(devBase);
};
let mainWindow = null;
const createMainWindow = () => {
  const remember = store$1.get("system.rememberWindowState") ?? true;
  const saved = remember ? store$1.get("windowStates.main") : void 0;
  handleCacheProtocolOnPartition(MAIN_PARTITION);
  const borderlessWindow = store$1.get("system.borderlessWindow") ?? true;
  mainWindow = createWindow({
    width: saved?.width ?? 1280,
    height: saved?.height ?? 800,
    ...saved?.x != null && saved?.y != null ? { x: saved.x, y: saved.y } : {},
    frame: !borderlessWindow,
    webPreferences: {
      partition: MAIN_PARTITION,
      webgl: true
    }
  });
  if (isWin && saved?.x != null && saved?.y != null) {
    mainWindow.setBounds({
      width: saved.width,
      height: saved.height,
      x: saved.x,
      y: saved.y
    });
  }
  if (remember && saved?.maximized) {
    mainWindow.maximize();
  }
  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });
  initTray();
  enableTaskbarThumbnail(mainWindow);
  mainWindow.once("show", () => {
    initThumbar(mainWindow);
  });
  mainWindow.webContents.on("did-finish-load", () => {
    applyMainWindowZoom();
  });
  const saveWindowState2 = () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (!(store$1.get("system.rememberWindowState") ?? true)) return;
    const maximized = mainWindow.isMaximized();
    const bounds = maximized ? mainWindow.getNormalBounds?.() ?? mainWindow.getBounds() : mainWindow.getBounds();
    store$1.set("windowStates.main", {
      width: bounds.width,
      height: bounds.height,
      x: bounds.x,
      y: bounds.y,
      maximized
    });
  };
  let saveStateTimer = null;
  const scheduleSaveWindowState = () => {
    if (saveStateTimer) clearTimeout(saveStateTimer);
    saveStateTimer = setTimeout(() => {
      saveStateTimer = null;
      saveWindowState2();
    }, 400);
  };
  mainWindow.on("close", (event) => {
    if (isAppQuitting()) {
      saveWindowState2();
      return;
    }
    event.preventDefault();
    mainWindow?.hide();
  });
  mainWindow.on("maximize", () => {
    saveWindowState2();
    broadcast("window:maximizeChange", true);
  });
  mainWindow.on("unmaximize", () => {
    saveWindowState2();
    broadcast("window:maximizeChange", false);
  });
  mainWindow.on("moved", scheduleSaveWindowState);
  mainWindow.on("resized", scheduleSaveWindowState);
  mainWindow.on("enter-full-screen", () => {
    broadcast("window:fullscreenChange", true);
  });
  mainWindow.on("leave-full-screen", () => {
    broadcast("window:fullscreenChange", false);
  });
  const openExternalSafe = (url) => {
    if (/^https?:$/i.test(new URL(url).protocol)) {
      void shell.openExternal(url);
    }
  };
  mainWindow.webContents.setWindowOpenHandler((details) => {
    openExternalSafe(details.url);
    return { action: "deny" };
  });
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (isInternalNavigation(url)) return;
    event.preventDefault();
    openExternalSafe(url);
  });
  let initialHash = "";
  if (!store$1.get("system.onboardingCompleted")) {
    initialHash = "/onboarding";
  } else if (store$1.get("system.agreedAgreementVersion") < CURRENT_AGREEMENT_VERSION) {
    initialHash = "/agreement-update";
  }
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    const base = process.env["ELECTRON_RENDERER_URL"];
    mainWindow.loadURL(initialHash ? `${base}#${initialHash}` : base);
  } else {
    mainWindow.loadFile(
      join(__dirname, "../renderer/index.html"),
      initialHash ? { hash: initialHash } : void 0
    );
  }
  mainWindow.on("closed", () => {
    if (saveStateTimer) clearTimeout(saveStateTimer);
    mainWindow = null;
  });
  return mainWindow;
};
const getMainWindow = () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    return mainWindow;
  }
  return null;
};
const focusMainWindow = () => {
  const win = getMainWindow();
  if (!win) return;
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
};
const minimizeMainWindow = () => {
  getMainWindow()?.minimize();
};
const toggleMaximizeMainWindow = () => {
  const win = getMainWindow();
  if (!win) return;
  if (win.isFullScreen()) {
    win.setFullScreen(false);
    if (!win.isMaximized()) win.maximize();
    return;
  }
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
};
const isMainWindowMaximized = () => !!getMainWindow()?.isMaximized();
const toggleFullscreenMainWindow = () => {
  const win = getMainWindow();
  if (!win) return;
  win.setFullScreen(!win.isFullScreen());
};
const isMainWindowFullscreen = () => !!getMainWindow()?.isFullScreen();
const hideMainWindow = () => {
  getMainWindow()?.hide();
};
const applyMainWindowZoom = () => {
  const win = getMainWindow();
  if (!win) return;
  const percent = store$1.get("system.uiZoom") ?? 100;
  const factor = Math.max(0.5, Math.min(2, percent / 100));
  win.webContents.setZoomFactor(factor);
};
const setTaskbarProgress = (progress2, paused = false) => {
  const win = getMainWindow();
  if (!win) return;
  if (progress2 < 0) {
    win.setProgressBar(-1);
  } else {
    win.setProgressBar(progress2, { mode: paused ? "paused" : "normal" });
  }
};
const restoreLyricWindows = () => {
  if (store$1.get("windowStates.desktopLyric.visible")) createDesktopLyricWindow();
  if (store$1.get("windowStates.dynamicIsland.visible")) createDynamicIslandWindow();
  if (isWin && store$1.get("windowStates.taskbarLyric.visible")) {
    createTaskbarLyricWindow();
  }
};
const DEFAULT_TIMEOUT_MS = 15e3;
const MAX_BYTES = 5 * 1024 * 1024;
const fetchBytes = async (url, options = {}) => {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, requireImage = false } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await net.fetch(url, { signal: controller.signal });
    if (!res.ok || !res.body) return null;
    if (requireImage) {
      const type = (res.headers.get("content-type") ?? "").toLowerCase();
      const acceptable = type === "" || type.startsWith("image/") || type.startsWith("application/octet-stream");
      if (!acceptable) return null;
    }
    const contentLength = Number(res.headers.get("content-length") ?? "");
    if (Number.isFinite(contentLength) && contentLength > MAX_BYTES) return null;
    const chunks = [];
    let total = 0;
    const reader = res.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      if (total > MAX_BYTES) {
        controller.abort();
        return null;
      }
      chunks.push(value);
    }
    if (total === 0) return null;
    return Buffer.concat(chunks, total);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};
const ORPHEUS_SCHEME = "orpheus";
let pendingOrpheusUrl = null;
let rendererReady$1 = false;
const setOrpheusProtocolRegistered = (on) => {
  if (on) {
    app.setAsDefaultProtocolClient(ORPHEUS_SCHEME);
    coreLog.info("[orpheus] 已注册 orpheus 协议处理程序");
  } else {
    app.removeAsDefaultProtocolClient(ORPHEUS_SCHEME);
    coreLog.info("[orpheus] 已取消 orpheus 协议处理程序");
  }
};
const extractOrpheusUrl = (argv) => {
  for (let index = 1; index < argv.length; index++) {
    const arg = argv[index];
    if (arg.startsWith(`${ORPHEUS_SCHEME}://`)) return arg;
  }
  return null;
};
const captureOrpheusUrl = (url) => {
  const win = getMainWindow();
  if (rendererReady$1 && win) {
    win.webContents.send("protocol:orpheus", url);
  } else {
    pendingOrpheusUrl = url;
  }
  coreLog.info("[orpheus] 捕获唤起 URL", url);
};
const consumePendingOrpheusUrl = () => {
  rendererReady$1 = true;
  const url = pendingOrpheusUrl;
  pendingOrpheusUrl = null;
  return url;
};
const initOrpheusRegistration = () => {
  if (store$1.get("system.registerOrpheusProtocol")) {
    setOrpheusProtocolRegistered(true);
  }
};
const SUPPORTED_AUDIO_EXTENSIONS = /* @__PURE__ */ new Set([
  ".mp3",
  ".flac",
  ".wav",
  ".ogg",
  ".oga",
  ".m4a",
  ".aac",
  ".opus",
  ".wma",
  ".ape",
  ".alac",
  ".dsf",
  ".dff",
  ".m4b"
]);
const isAudioFile = (filePath) => {
  const dotIndex = filePath.lastIndexOf(".");
  if (dotIndex === -1) return false;
  return SUPPORTED_AUDIO_EXTENSIONS.has(filePath.slice(dotIndex).toLowerCase());
};
let pendingAudioFiles = [];
let rendererReady = false;
const extractAudioFiles = (argv) => {
  const files = [];
  for (let index = 1; index < argv.length; index++) {
    const arg = argv[index];
    if (arg.startsWith("--") || arg.startsWith("-")) continue;
    if (isAudioFile(arg)) {
      files.push(resolve(arg));
    }
  }
  return files;
};
const captureAudioFiles = (filePaths) => {
  const valid = filePaths.filter(isAudioFile).map((p) => resolve(p));
  if (valid.length === 0) return;
  const win = getMainWindow();
  if (rendererReady && win) {
    win.webContents.send("system:open-files", valid);
  } else {
    pendingAudioFiles.push(...valid);
  }
  coreLog.info("[externalFile] 捕获打开音频文件", valid);
};
const consumePendingAudioFiles = () => {
  rendererReady = true;
  const files = pendingAudioFiles;
  pendingAudioFiles = [];
  return files;
};
const PROXY_TEST_URL = "https://www.baidu.com";
let proxyAgent = null;
let proxyAgentUrl = "";
const isManualProxyProtocol = (value) => value === "http" || value === "https" || value === "socks5";
const getNetworkProxyUrl = () => {
  const config = store$1.get("system.networkProxy");
  if (!isManualProxyProtocol(config.protocol)) return null;
  const host = config.host.trim();
  const port = Number(config.port);
  if (!host || !Number.isInteger(port) || port < 1 || port > 65535) return null;
  return `${config.protocol}://${host}:${port}`;
};
const getProxyDispatcher = () => {
  const url = getNetworkProxyUrl();
  if (!url) return void 0;
  if (!proxyAgent || proxyAgentUrl !== url) {
    proxyAgent?.close().catch(() => {
    });
    proxyAgent = url.startsWith("socks5://") ? new Socks5ProxyAgent(url) : new ProxyAgent(url);
    proxyAgentUrl = url;
    systemLog.info(`[proxy] node fetch proxy=${url}`);
  }
  return proxyAgent;
};
const fetchWithProxy = (input, init2) => {
  const dispatcher = getProxyDispatcher();
  if (!dispatcher) return fetch(input, init2);
  return fetch$1(input, { ...init2, dispatcher });
};
const testNetworkProxy = async () => {
  if (!getNetworkProxyUrl()) return false;
  try {
    const res = await fetchWithProxy(PROXY_TEST_URL, { signal: AbortSignal.timeout(8e3) });
    return res.ok;
  } catch (err) {
    systemLog.warn("[proxy] test failed", err);
    return false;
  }
};
const registerSystemIpc = () => {
  ipcMain.on("ping", () => systemLog.debug("pong"));
  ipcMain.handle("system:consumePendingProtocolUrl", () => consumePendingOrpheusUrl());
  ipcMain.handle("system:consumePendingAudioFiles", () => consumePendingAudioFiles());
  ipcMain.handle("system:toggleDevTools", () => {
    const win = getMainWindow();
    if (win) {
      const wc = win.webContents;
      wc.isDevToolsOpened() ? wc.closeDevTools() : wc.openDevTools({ mode: "detach" });
    }
  });
  ipcMain.handle("system:showInExplorer", (_event, filePath) => {
    shell.showItemInFolder(filePath);
  });
  ipcMain.handle("system:openLogsDir", () => shell.openPath(logsDir$1));
  ipcMain.on("system:setLocale", (_event, locale) => {
    if (setLocale(locale)) {
      refreshTray();
      getThumbar()?.refreshLocale();
    }
  });
  ipcMain.handle("system:focusMainWindow", () => focusMainWindow());
  ipcMain.handle("system:openSettings", (_event, category, highlight) => {
    focusMainWindow();
    getMainWindow()?.webContents.send("system:openSettings", { category, highlight });
  });
  let fontsCache = null;
  ipcMain.handle("system:listFonts", () => {
    if (!fontsCache) {
      fontsCache = getFonts({ disableQuoting: true }).catch((err) => {
        systemLog.error("[system] listFonts failed", err);
        fontsCache = null;
        return [];
      });
    }
    return fontsCache;
  });
  ipcMain.handle("system:relaunch", () => {
    store$1.flushImmediate();
    app.relaunch();
    app.exit(0);
  });
  ipcMain.handle("system:testNetworkProxy", () => testNetworkProxy());
  ipcMain.handle("system:fetchRemoteBytes", async (_event, url) => {
    if (typeof url !== "string" || !/^https?:\/\//i.test(url)) {
      return { success: false, error: "无效的 URL" };
    }
    const buf = await fetchBytes(url, { requireImage: true });
    return { success: true, data: buf };
  });
  ipcMain.handle("system:saveFile", async (_event, data2, fileName) => {
    try {
      const safeName = basename(fileName).replace(/[\\/:*?"<>|]/g, " ").trim();
      if (!safeName || safeName === "." || safeName === "..") {
        return { success: false, error: "invalid file name" };
      }
      const dir = app.getPath("downloads");
      const dot = safeName.lastIndexOf(".");
      const base = dot > 0 ? safeName.slice(0, dot) : safeName;
      const ext = dot > 0 ? safeName.slice(dot) : "";
      let target = join$1(dir, safeName);
      for (let seq = 2; existsSync(target); seq++) {
        target = join$1(dir, `${base} (${seq})${ext}`);
      }
      await writeFile(target, Buffer.from(data2));
      return { success: true, path: target };
    } catch (error) {
      systemLog.error("[system] saveFile failed", error);
      return { success: false, error: String(error) };
    }
  });
};
const utf8Decoder = new TextDecoder("utf-8");
const utf16leDecoder = new TextDecoder("utf-16le");
const utf16beDecoder = new TextDecoder("utf-16be");
const gb18030Decoder = new TextDecoder("gb18030");
const utf8StrictDecoder = new TextDecoder("utf-8", { fatal: true });
const decodeAuto = (buf) => {
  if (buf.length === 0) return "";
  if (buf.length >= 3 && buf[0] === 239 && buf[1] === 187 && buf[2] === 191) {
    return utf8Decoder.decode(buf.subarray(3));
  }
  if (buf.length >= 2 && buf[0] === 255 && buf[1] === 254) {
    return utf16leDecoder.decode(buf.subarray(2));
  }
  if (buf.length >= 2 && buf[0] === 254 && buf[1] === 255) {
    return utf16beDecoder.decode(buf.subarray(2));
  }
  try {
    return utf8StrictDecoder.decode(buf);
  } catch {
    return gb18030Decoder.decode(buf);
  }
};
const readFileAutoEncoding = async (filePath) => {
  const buf = await readFile$1(filePath);
  return decodeAuto(buf);
};
const wsClients = /* @__PURE__ */ new Set();
const HIGH_FREQ_EVENTS = /* @__PURE__ */ new Set(["fftData", "position"]);
const addWsClient = (ws) => {
  wsClients.add(ws);
  serverLog.info(`WS 客户端已连接，当前在线 ${wsClients.size}`);
};
const removeWsClient = (ws) => {
  if (wsClients.delete(ws)) {
    serverLog.info(`WS 客户端已断开，当前在线 ${wsClients.size}`);
  }
};
const getWsClientCount = () => wsClients.size;
const wsBroadcast = (event) => {
  if (wsClients.size === 0) return;
  if (HIGH_FREQ_EVENTS.has(event.type)) return;
  const payload = JSON.stringify({ kind: "event", ...event });
  for (const ws of wsClients) {
    try {
      ws.send(payload);
    } catch (err) {
      serverLog.warn("WS 推送失败，移除失效客户端", err);
      removeWsClient(ws);
    }
  }
};
const toMs = (secs) => Math.round(secs * 1e3);
const DISCORD_MODE_MAP = {
  name: "Name",
  state: "State",
  details: "Details"
};
let mc = null;
let eventHandler = null;
const safeCall = (fn) => {
  try {
    fn();
  } catch (error) {
    mediaLog.error("media-ctrl 调用失败:", error);
  }
};
const applyDiscordConfig = (discord) => {
  if (!mc) return;
  discord ??= store$1.get("media").discord;
  if (discord.enabled) {
    mc.enableDiscord();
  } else {
    mc.disableDiscord();
  }
  mc.setDiscordConfig({
    showWhenPaused: discord.showWhenPaused,
    displayMode: DISCORD_MODE_MAP[discord.displayMode]
  });
};
const init$4 = () => {
  mc = loadNativeModule("media-ctrl.node", "media-ctrl");
  if (!mc) {
    mediaLog.warn("media-ctrl 模块未找到，媒体集成不可用");
    return;
  }
  try {
    mc.initLogger(nativeLogsDir, isDev);
    mc.initialize();
    mc.onEvent((event) => {
      eventHandler?.(event);
    });
    const mediaConfig = store$1.get("media");
    if (mediaConfig.systemMediaControls) {
      mc.enable();
    }
    applyDiscordConfig(mediaConfig.discord);
    mediaLog.info("系统媒体控件已初始化");
  } catch (error) {
    mediaLog.error("初始化失败:", error);
  }
};
const enable = () => safeCall(() => mc?.enable());
const disable = () => safeCall(() => mc?.disable());
const reloadDiscordConfig = () => applyDiscordConfig();
const shutdown = () => safeCall(() => mc?.shutdown());
const onEvent = (handler) => {
  eventHandler = handler;
};
const setMetadata = (param) => safeCall(() => mc?.setMetadata(param));
const setPlayState = (param) => safeCall(() => mc?.setPlayState(param));
const setTimeline = (param) => safeCall(() => mc?.setTimeline(param));
const setRate = (rate) => safeCall(() => mc?.setRate(rate));
const setVolume = (volume) => safeCall(() => mc?.setVolume(volume));
let currentTrack = null;
let currentLyric = [];
let currentSource = null;
let lastPosition = 0;
let lastPositionAt = 0;
let playing = false;
let playState = "idle";
let playSpeed = 1;
let currentLyricOffsetMs = 0;
const emitter = new EventEmitter();
const offsetKey = (trackId, source) => {
  if (!source) return trackId;
  const src = source.source === "online" && source.platform ? `online:${source.platform}` : source.source;
  return `${trackId}|${src}`;
};
const readOffset = (trackId, source) => {
  if (!trackId) return 0;
  return store$1.get("player.lyricOffsets")?.[offsetKey(trackId, source)] ?? 0;
};
let currentOffsetKey = "";
const update = (track, lyric2, source) => {
  const trackChanged = (currentTrack?.id ?? null) !== (track?.id ?? null);
  currentTrack = track;
  currentLyric = lyric2;
  currentSource = source;
  if (trackChanged) {
    lastPosition = 0;
    lastPositionAt = Date.now();
    emitter.emit("track-change", { track });
  }
  const key = track?.id ? offsetKey(track.id, source) : "";
  if (trackChanged || key !== currentOffsetKey) {
    currentOffsetKey = key;
    currentLyricOffsetMs = readOffset(track?.id, source);
    emitter.emit("lyric-offset-change", {
      trackId: track?.id ?? null,
      offsetMs: currentLyricOffsetMs
    });
  }
  emitter.emit("lyric-change", snapshot());
};
const onPosition$3 = (positionMs, isPlaying) => {
  lastPosition = positionMs;
  lastPositionAt = Date.now();
  playing = isPlaying;
  playState = "playing";
  emitter.emit("position-sync", {
    position: positionMs,
    playing: isPlaying,
    state: playState,
    speed: playSpeed,
    sendTimestamp: lastPositionAt
  });
};
const onPlayStateChange = (state2) => {
  playState = state2;
  playing = state2 === "playing";
  emitter.emit("position-sync", {
    position: lastPosition,
    playing,
    state: state2,
    speed: playSpeed,
    // 暂停态接收端不补偿延迟，恢复态不能用陈旧时间戳，故取当前时刻
    sendTimestamp: Date.now()
  });
};
const onSpeedChange = (speed) => {
  playSpeed = Number.isFinite(speed) ? speed : 1;
  emitter.emit("position-sync", {
    position: lastPosition,
    playing,
    state: playState,
    speed: playSpeed,
    sendTimestamp: lastPositionAt || Date.now()
  });
};
const LYRIC_OFFSET_LIMIT_MS = 6e4;
const setLyricOffset = (trackId, offsetMs) => {
  if (!trackId) return;
  const normalized = Number.isFinite(offsetMs) ? Math.trunc(offsetMs) : 0;
  const value = Math.max(-LYRIC_OFFSET_LIMIT_MS, Math.min(LYRIC_OFFSET_LIMIT_MS, normalized));
  const key = offsetKey(trackId, currentSource);
  const map = { ...store$1.get("player.lyricOffsets") ?? {} };
  if (value === 0) delete map[key];
  else map[key] = value;
  store$1.set("player.lyricOffsets", map);
  if (currentTrack && currentTrack.id === trackId) {
    currentLyricOffsetMs = value;
    emitter.emit("lyric-offset-change", { trackId, offsetMs: value });
  }
};
const snapshot = () => ({
  track: currentTrack,
  lyric: currentLyric,
  source: currentSource,
  position: lastPosition,
  playing,
  state: playState,
  speed: playSpeed,
  lyricOffsetMs: currentLyricOffsetMs,
  // 用 position 的成立时刻，接收端据此补偿其过期时长
  sendTimestamp: lastPositionAt || Date.now()
});
const lightSnapshot = () => ({
  track: currentTrack,
  position: lastPosition,
  playing,
  state: playState,
  speed: playSpeed,
  lyricOffsetMs: currentLyricOffsetMs,
  lyricAvailable: currentLyric.length > 0,
  lyricLineCount: currentLyric.length,
  sendTimestamp: lastPositionAt || Date.now()
});
const lyricSnapshot = () => ({
  trackId: currentTrack?.id ?? null,
  lyric: currentLyric,
  source: currentSource,
  lyricOffsetMs: currentLyricOffsetMs
});
const onTrackChange$1 = (listener) => {
  emitter.on("track-change", listener);
  return () => emitter.off("track-change", listener);
};
const onLyricChange$1 = (listener) => {
  emitter.on("lyric-change", listener);
  return () => emitter.off("lyric-change", listener);
};
const onPositionSync$1 = (listener) => {
  emitter.on("position-sync", listener);
  return () => emitter.off("position-sync", listener);
};
const onLyricOffsetChange$1 = (listener) => {
  emitter.on("lyric-offset-change", listener);
  return () => emitter.off("lyric-offset-change", listener);
};
const API_URL = "https://ws.audioscrobbler.com/2.0/";
const LASTFM_API_KEY = "79fa364d995b13c2b21bdd65b7e7054f";
const LASTFM_API_SECRET = "6d2ecc338d0a0802669e529f14b8034f";
const getAuthUrl = (token) => `https://www.last.fm/api/auth/?api_key=${LASTFM_API_KEY}&token=${token}`;
const sign = (params) => {
  const base = Object.keys(params).filter((key) => key !== "format").sort().map((key) => `${key}${params[key]}`).join("");
  return createHash("md5").update(base + LASTFM_API_SECRET, "utf-8").digest("hex");
};
const buildParams = (method, params, signed) => {
  const base = { method, api_key: LASTFM_API_KEY, ...params };
  if (signed) base.api_sig = sign(base);
  base.format = "json";
  return new URLSearchParams(base);
};
const get = async (method, params = {}, signed = false) => {
  const qs = buildParams(method, params, signed);
  const res = await fetch(`${API_URL}?${qs.toString()}`);
  const data2 = await res.json();
  if (data2.error) throw new Error(`Last.fm ${data2.error}: ${data2.message ?? "未知错误"}`);
  return data2;
};
const post = async (method, params = {}) => {
  const body = buildParams(method, params, true);
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString()
  });
  const data2 = await res.json();
  if (data2.error) throw new Error(`Last.fm ${data2.error}: ${data2.message ?? "未知错误"}`);
  return data2;
};
const getToken = async () => {
  const data2 = await get("auth.getToken", {}, true);
  if (!data2.token) throw new Error("无法获取 Last.fm token");
  return data2.token;
};
const getSession$1 = async (token) => {
  const data2 = await get("auth.getSession", { token }, true);
  if (!data2.session?.key) throw new Error("尚未授权");
  return { name: data2.session.name, key: data2.session.key };
};
const updateNowPlaying = async (sessionKey2, track, artist2, album2, durationSec) => {
  const params = { sk: sessionKey2, track, artist: artist2 };
  if (album2) params.album = album2;
  if (durationSec) params.duration = String(durationSec);
  await post("track.updateNowPlaying", params);
};
const scrobble$1 = async (sessionKey2, track, artist2, timestamp, album2, durationSec) => {
  const params = {
    sk: sessionKey2,
    track,
    artist: artist2,
    timestamp: String(timestamp)
  };
  if (album2) params.album = album2;
  if (durationSec) params.duration = String(durationSec);
  await post("track.scrobble", params);
};
const love$1 = async (sessionKey2, track, artist2, loved) => {
  await post(loved ? "track.love" : "track.unlove", { sk: sessionKey2, track, artist: artist2 });
};
const STORAGE_FILE$2 = path.join(configDir, "lastfm.json");
const encrypt = (plain) => {
  if (!plain) return "";
  if (!safeStorage.isEncryptionAvailable()) {
    lastfmLog.warn("safeStorage 不可用，sessionKey 将以 base64 明文落盘");
    return Buffer.from(plain, "utf-8").toString("base64");
  }
  return safeStorage.encryptString(plain).toString("base64");
};
const decrypt = (encrypted) => {
  if (!encrypted) return "";
  try {
    const buf = Buffer.from(encrypted, "base64");
    if (!safeStorage.isEncryptionAvailable()) {
      return buf.toString("utf-8");
    }
    return safeStorage.decryptString(buf);
  } catch {
    return "";
  }
};
const load$1 = () => {
  try {
    const raw = JSON.parse(fs.readFileSync(STORAGE_FILE$2, "utf-8"));
    const sessionKey2 = decrypt(raw.encryptedSessionKey);
    if (!raw.username || !sessionKey2) return null;
    return { username: raw.username, sessionKey: sessionKey2 };
  } catch {
    return null;
  }
};
const save$1 = (username, sessionKey2) => {
  try {
    const dir = path.dirname(STORAGE_FILE$2);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const data2 = {
      username,
      encryptedSessionKey: encrypt(sessionKey2)
    };
    writeFileSync(STORAGE_FILE$2, JSON.stringify(data2, null, 2));
  } catch (err) {
    lastfmLog.error("写入 lastfm.json 失败:", err);
  }
};
const clear = () => {
  try {
    if (fs.existsSync(STORAGE_FILE$2)) fs.rmSync(STORAGE_FILE$2);
  } catch (err) {
    lastfmLog.error("删除 lastfm.json 失败:", err);
  }
};
const defaultScrobbleThresholdMs = (durationSec) => durationSec <= 30 ? Infinity : Math.min(durationSec / 2, 240) * 1e3;
const createPlayProgress = (options) => {
  const computeThreshold = options.thresholdMs ?? defaultScrobbleThresholdMs;
  let payload = null;
  let durationSec = 0;
  let playedMs = 0;
  let playSince = null;
  let fired = false;
  const elapsedMs = () => playedMs + (playSince != null ? Date.now() - playSince : 0);
  const thresholdMs = () => payload != null ? computeThreshold(durationSec) : Infinity;
  const maybeFire = () => {
    if (payload == null || fired) return;
    const played = elapsedMs();
    if (played < thresholdMs()) return;
    if (options.shouldFire && !options.shouldFire()) return;
    fired = true;
    options.onThreshold(payload, played);
  };
  const settle = () => {
    if (playSince != null) {
      playedMs += Date.now() - playSince;
      playSince = null;
    }
    maybeFire();
  };
  const clear2 = () => {
    payload = null;
    durationSec = 0;
    playedMs = 0;
    playSince = null;
    fired = false;
  };
  return {
    load: (nextDurationSec, nextPayload, playing2) => {
      settle();
      clear2();
      payload = nextPayload;
      durationSec = nextDurationSec;
      playSince = nextPayload != null && playing2 ? Date.now() : null;
    },
    setPlaying: (playing2) => {
      if (payload == null) return;
      if (playing2) {
        if (playSince == null) playSince = Date.now();
      } else if (playSince != null) {
        playedMs += Date.now() - playSince;
        playSince = null;
      }
      maybeFire();
    },
    tick: maybeFire,
    rearm: () => {
      if (payload == null) return;
      const wasPlaying2 = playSince != null;
      playedMs = 0;
      fired = false;
      playSince = wasPlaying2 ? Date.now() : null;
    },
    end: () => {
      settle();
      clear2();
    },
    reset: clear2,
    elapsedMs,
    thresholdMs,
    hasFired: () => fired
  };
};
let handlers = null;
let current$1 = null;
let nowPlayingSent = false;
const progress$1 = createPlayProgress({
  onThreshold: (track) => handlers?.onScrobble(track)
});
const setHandlers = (next) => {
  handlers = next;
};
const sendNowPlaying = () => {
  if (!current$1 || nowPlayingSent) return;
  nowPlayingSent = true;
  handlers?.onNowPlaying(current$1);
};
const onTrackLoaded$2 = (meta) => {
  current$1 = meta.durationMs <= 0 || !meta.title ? null : {
    title: meta.title,
    artist: meta.artist,
    album: meta.album,
    durationSec: Math.round(meta.durationMs / 1e3),
    timestamp: Math.floor(Date.now() / 1e3)
  };
  nowPlayingSent = false;
  progress$1.load(current$1?.durationSec ?? 0, current$1, meta.autoPlay);
  if (current$1 && meta.autoPlay) sendNowPlaying();
};
const onState$2 = (playing2) => {
  if (playing2) sendNowPlaying();
  progress$1.setPlaying(playing2);
};
const onPosition$2 = () => {
  progress$1.tick();
};
const onEnded$2 = () => {
  progress$1.end();
  current$1 = null;
  nowPlayingSent = false;
};
const reset = () => {
  progress$1.reset();
  current$1 = null;
  nowPlayingSent = false;
};
let session$1 = null;
let connecting = false;
let cancelFlag = false;
const cfg = () => store$1.get("lastfm");
const delay$1 = (ms) => new Promise((resolve2) => setTimeout(resolve2, ms));
const init$3 = () => {
  session$1 = load$1();
  if (session$1) lastfmLog.info(`已载入 Last.fm 凭证: ${session$1.username}`);
  setHandlers({
    onNowPlaying: (track) => {
      const config = cfg();
      if (!config.enabled || !config.nowPlaying || !session$1) return;
      updateNowPlaying(
        session$1.sessionKey,
        track.title,
        track.artist,
        track.album || void 0,
        track.durationSec || void 0
      ).catch((err) => lastfmLog.warn("updateNowPlaying 失败:", err));
    },
    onScrobble: (track) => {
      const config = cfg();
      if (!config.enabled || !config.scrobble || !session$1) return;
      scrobble$1(
        session$1.sessionKey,
        track.title,
        track.artist,
        track.timestamp,
        track.album || void 0,
        track.durationSec || void 0
      ).then(() => lastfmLog.debug(`scrobble: ${track.artist} - ${track.title}`)).catch((err) => lastfmLog.warn("scrobble 失败:", err));
    }
  });
};
const reloadConfig = () => {
  if (!cfg().enabled) reset();
};
const onTrackLoaded$1 = (meta) => {
  if (cfg().enabled) onTrackLoaded$2(meta);
};
const onState$1 = (playing2) => {
  if (cfg().enabled) onState$2(playing2);
};
const onPosition$1 = () => {
  if (cfg().enabled) onPosition$2();
};
const onEnded$1 = () => {
  if (cfg().enabled) onEnded$2();
};
const getStatus = () => ({
  connected: Boolean(session$1),
  username: session$1?.username ?? ""
});
const cancelConnect = () => {
  cancelFlag = true;
};
const connect = async () => {
  if (connecting) return { connected: false, reason: "error" };
  connecting = true;
  cancelFlag = false;
  try {
    const token = await getToken();
    await shell.openExternal(getAuthUrl(token));
    const deadline = Date.now() + 12e4;
    while (Date.now() < deadline) {
      if (cancelFlag) return { connected: false, reason: "canceled" };
      await delay$1(3e3);
      if (cancelFlag) return { connected: false, reason: "canceled" };
      try {
        const result2 = await getSession$1(token);
        session$1 = { username: result2.name, sessionKey: result2.key };
        save$1(result2.name, result2.key);
        lastfmLog.info(`已连接 Last.fm: ${result2.name}`);
        return { connected: true, username: result2.name };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (!msg.includes("Last.fm 14")) lastfmLog.warn("getSession 轮询出错:", err);
      }
    }
    return { connected: false, reason: "timeout" };
  } catch (err) {
    lastfmLog.error("连接失败:", err);
    return { connected: false, reason: "error" };
  } finally {
    connecting = false;
  }
};
const disconnect = () => {
  session$1 = null;
  clear();
  reset();
  lastfmLog.info("已断开 Last.fm 连接");
};
const love = (artist2, track, loved) => {
  const config = cfg();
  if (!config.enabled || !config.loveSync || !session$1 || !artist2 || !track) return;
  love$1(session$1.sessionKey, track, artist2, loved).catch((err) => lastfmLog.warn("love 失败:", err));
};
const neteaseScrobbleThresholdMs = (durationSec) => durationSec > 0 ? Math.min(durationSec / 2, 240) * 1e3 : Infinity;
const asNumericId = (value) => value && /^\d+$/.test(value) ? value : null;
const toBitrate = (track) => {
  const bitRate = track.quality?.bitRate ?? 320;
  return bitRate > 1e4 ? Math.round(bitRate / 1e3) : Math.round(bitRate);
};
const toLevel = (track) => {
  if (track.quality?.codec?.toLowerCase() === "flac") return "lossless";
  if ((track.quality?.bitRate ?? 0) >= 32e4) return "exhigh";
  return "higher";
};
const toNeteaseSourceType = (type) => {
  if (type === "track") return "song";
  if (type === "playlist") return "list";
  if (type === "album" || type === "artist" || type === "radio") return type;
  return "song";
};
const toNeteaseScrobbleTrack = (track, context, durationMs) => {
  if (!track || track.source !== "netease") return null;
  const trackId = asNumericId(track.id);
  if (!trackId) return null;
  const voiceId = asNumericId(track.extId);
  const id = voiceId ?? trackId;
  const neteaseContext = context?.provider === "netease" && context.originType !== "page" ? context : void 0;
  const contextId = asNumericId(neteaseContext?.originId);
  const radioId = asNumericId(track.album?.id);
  return {
    id,
    sourceId: contextId ?? (voiceId ? radioId : null) ?? id,
    sourceType: voiceId ? "radio" : contextId ? toNeteaseSourceType(neteaseContext?.originType ?? "track") : "song",
    resourceType: voiceId ? "dj" : "song",
    title: track.title,
    artist: track.artists.map((artist2) => artist2.name).join(" / "),
    bitrate: toBitrate(track),
    level: toLevel(track),
    fee: track.fee ?? 0,
    durationSec: Math.round(durationMs / 1e3)
  };
};
const SCHEMA_VERSION = 4;
const hasColumn = (d, table, column) => {
  const rows = d.prepare(`PRAGMA table_info(${table})`).all();
  return rows.some((r) => r.name === column);
};
const migrate = (d) => {
  const version = d.pragma("user_version", { simple: true });
  let v = version;
  if (v < 2) {
    if (!hasColumn(d, "tracks", "file_mtime")) {
      d.exec("ALTER TABLE tracks ADD COLUMN file_mtime INTEGER");
    }
    if (!hasColumn(d, "tracks", "file_ctime")) {
      d.exec("ALTER TABLE tracks ADD COLUMN file_ctime INTEGER");
    }
    v = 2;
  }
  if (v < 3) {
    if (!hasColumn(d, "tracks", "track")) {
      d.exec("ALTER TABLE tracks ADD COLUMN track INTEGER");
    }
    v = 3;
  }
  if (v < 4) {
    if (!hasColumn(d, "tracks", "cue_path")) {
      d.exec("ALTER TABLE tracks ADD COLUMN cue_path TEXT");
    }
    if (!hasColumn(d, "tracks", "cue_audio_path")) {
      d.exec("ALTER TABLE tracks ADD COLUMN cue_audio_path TEXT");
    }
    if (!hasColumn(d, "tracks", "cue_start_ms")) {
      d.exec("ALTER TABLE tracks ADD COLUMN cue_start_ms INTEGER");
    }
    if (!hasColumn(d, "tracks", "cue_end_ms")) {
      d.exec("ALTER TABLE tracks ADD COLUMN cue_end_ms INTEGER");
    }
    v = 4;
  }
  if (!hasColumn(d, "lyric_match_cache", "extra")) {
    d.exec("ALTER TABLE lyric_match_cache ADD COLUMN extra TEXT");
  }
  if (v < SCHEMA_VERSION) v = SCHEMA_VERSION;
  if (v !== version) {
    d.pragma(`user_version = ${v}`);
  }
};
const rowToTrack = (row) => {
  const quality = row.codec != null ? {
    codec: row.codec,
    sampleRate: row.sample_rate ?? 0,
    bitRate: row.bit_rate ?? 0,
    channels: row.channels ?? 0,
    bitsPerSample: row.bits_per_sample ?? 0
  } : void 0;
  return {
    id: row.id,
    source: "local",
    path: row.path,
    cuePath: row.cue_path ?? void 0,
    cueAudioPath: row.cue_audio_path ?? void 0,
    cueStartMs: row.cue_start_ms ?? void 0,
    cueEndMs: row.cue_end_ms ?? void 0,
    title: row.title,
    track: row.track ?? void 0,
    artists: JSON.parse(row.artists),
    album: row.album ? JSON.parse(row.album) : void 0,
    duration: row.duration,
    cover: row.cover ?? void 0,
    fileSize: row.file_size ?? void 0,
    mtime: row.file_mtime ?? void 0,
    ctime: row.file_ctime ?? void 0,
    quality
  };
};
const getAllTracks = () => {
  const rows = getDb().prepare("SELECT * FROM tracks").all();
  return rows.map(rowToTrack);
};
const excludeCueContainer = (col = "path") => `${col} NOT IN (SELECT cue_audio_path FROM tracks WHERE cue_audio_path IS NOT NULL)`;
const getTrackCount = () => {
  const row = getDb().prepare(`SELECT COUNT(*) as count FROM tracks WHERE ${excludeCueContainer()}`).get();
  return row.count;
};
const getRandomTrack = () => {
  const row = getDb().prepare(`SELECT * FROM tracks WHERE ${excludeCueContainer()} ORDER BY RANDOM() LIMIT 1`).get();
  return row ? rowToTrack(row) : null;
};
const getRandomTracks = (limit) => {
  const safe = Math.max(0, Math.min(limit | 0, 500));
  if (safe === 0) return [];
  const rows = getDb().prepare(`SELECT * FROM tracks WHERE ${excludeCueContainer()} ORDER BY RANDOM() LIMIT ?`).all(safe);
  return rows.map(rowToTrack);
};
const getFileRecords = () => {
  return getDb().prepare(
    "SELECT path, COALESCE(file_mtime, 0) as mtime, file_size as size FROM tracks WHERE cue_path IS NULL"
  ).all();
};
const upsertTracks$1 = (tracks) => {
  if (tracks.length === 0) return;
  const d = getDb();
  const stmt = d.prepare(`
    INSERT OR REPLACE INTO tracks
      (id, path, cue_path, cue_audio_path, cue_start_ms, cue_end_ms, title, track, artists, album, duration, cover, codec, sample_rate, bit_rate, channels, bits_per_sample, file_size, file_mtime, file_ctime, scanned_at)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const now = Date.now();
  const tx = d.transaction(() => {
    for (const t2 of tracks) {
      stmt.run(
        t2.id,
        t2.path,
        t2.cuePath ?? null,
        t2.cueAudioPath ?? null,
        t2.cueStartMs ?? null,
        t2.cueEndMs ?? null,
        t2.title,
        t2.track ?? null,
        JSON.stringify(t2.artists),
        t2.album ? JSON.stringify(t2.album) : null,
        t2.duration,
        t2.cover ?? null,
        t2.codec ?? null,
        t2.sampleRate ?? null,
        t2.bitRate ?? null,
        t2.channels ?? null,
        t2.bitsPerSample ?? null,
        t2.fileSize,
        t2.mtime,
        t2.ctime,
        now
      );
    }
  });
  tx();
};
const getCueTrackPathsByDirs = (dirs) => {
  if (dirs.length === 0) return [];
  const rows = [];
  const stmt = getDb().prepare("SELECT path FROM tracks WHERE cue_path LIKE ?");
  for (const dir of dirs) {
    const prefix = dir.endsWith("/") || dir.endsWith("\\") ? dir : dir + path.sep;
    rows.push(...stmt.all(prefix + "%"));
  }
  return rows.map((row) => row.path);
};
const deleteTracksByPaths = (paths) => {
  if (paths.length === 0) return;
  const d = getDb();
  const removeMemberships = d.prepare(
    `DELETE FROM playlist_tracks
     WHERE playlist_id IN (SELECT id FROM playlists WHERE type = 'local')
       AND track_id IN (
         SELECT id FROM tracks WHERE path = ? OR cue_audio_path = ? OR cue_path = ?
       )`
  );
  const stmt = d.prepare("DELETE FROM tracks WHERE path = ? OR cue_audio_path = ? OR cue_path = ?");
  const tx = d.transaction(() => {
    for (const p of paths) {
      removeMemberships.run(p, p, p);
      stmt.run(p, p, p);
    }
  });
  tx();
};
const searchTracks$1 = (query) => {
  const escaped = query.replace(/[%_\\]/g, "\\$&");
  const pattern = `%${escaped}%`;
  const rows = getDb().prepare(
    `SELECT * FROM tracks WHERE (title LIKE ? ESCAPE '\\' OR artists LIKE ? ESCAPE '\\' OR album LIKE ? ESCAPE '\\') AND ${excludeCueContainer()}`
  ).all(pattern, pattern, pattern);
  return rows.map(rowToTrack);
};
const deleteTracksByDir = (dir) => {
  const prefix = dir.endsWith("/") || dir.endsWith("\\") ? dir : dir + path.sep;
  const patterns = [prefix + "%", prefix + "%", prefix + "%"];
  const database = getDb();
  database.transaction(() => {
    database.prepare(
      `DELETE FROM playlist_tracks
         WHERE playlist_id IN (SELECT id FROM playlists WHERE type = 'local')
           AND track_id IN (
             SELECT id FROM tracks WHERE path LIKE ? OR cue_path LIKE ? OR cue_audio_path LIKE ?
           )`
    ).run(...patterns);
    database.prepare("DELETE FROM tracks WHERE path LIKE ? OR cue_path LIKE ? OR cue_audio_path LIKE ?").run(...patterns);
  })();
};
const getAlbumList = () => {
  const rows = getDb().prepare(
    `SELECT
         json_extract(album, '$.name') AS name,
         MAX(CASE WHEN cover IS NOT NULL THEN cover END) AS cover,
         MAX(artists) AS artists,
         COUNT(*) AS trackCount
       FROM tracks
       WHERE album IS NOT NULL AND json_extract(album, '$.name') IS NOT NULL
         AND ${excludeCueContainer()}
       GROUP BY name`
  ).all();
  return rows.map((row) => ({
    name: row.name,
    cover: row.cover ?? void 0,
    artist: JSON.parse(row.artists).map((a) => a.name).join(" / "),
    trackCount: row.trackCount
  }));
};
const getArtistList = () => {
  const rows = getDb().prepare(
    `SELECT
         json_extract(a.value, '$.name') AS name,
         COUNT(DISTINCT t.id) AS trackCount,
         MAX(CASE WHEN t.cover IS NOT NULL THEN t.cover END) AS cover
       FROM tracks t, json_each(t.artists) a
       WHERE json_extract(a.value, '$.name') IS NOT NULL
         AND TRIM(json_extract(a.value, '$.name')) != ''
         AND ${excludeCueContainer("t.path")}
       GROUP BY name`
  ).all();
  return rows.map((row) => ({
    name: row.name,
    trackCount: row.trackCount,
    cover: row.cover ?? void 0
  }));
};
const getAlbumTracks = (albumName) => {
  const rows = getDb().prepare(
    `SELECT * FROM tracks WHERE json_extract(album, '$.name') = ? AND ${excludeCueContainer()}`
  ).all(albumName);
  return rows.map(rowToTrack);
};
const getArtistTracks = (artistName) => {
  const rows = getDb().prepare(
    `SELECT DISTINCT t.* FROM tracks t, json_each(t.artists) a
       WHERE LOWER(json_extract(a.value, '$.name')) = LOWER(?)
         AND ${excludeCueContainer("t.path")}`
  ).all(artistName);
  return rows.map(rowToTrack);
};
const getLibraryStats = () => {
  const d = getDb();
  const aggregate = d.prepare(
    `SELECT COUNT(*) AS trackCount,
              COALESCE(SUM(duration), 0) AS totalDurationMs,
              COALESCE(SUM(file_size), 0) AS totalFileSize
       FROM tracks
       WHERE ${excludeCueContainer()}`
  ).get();
  const albumRow = d.prepare(
    `SELECT COUNT(DISTINCT json_extract(album, '$.name')) AS count
       FROM tracks
       WHERE album IS NOT NULL AND json_extract(album, '$.name') IS NOT NULL
         AND ${excludeCueContainer()}`
  ).get();
  const artistRow = d.prepare(
    `SELECT COUNT(DISTINCT json_extract(a.value, '$.name')) AS count
       FROM tracks t, json_each(t.artists) a
       WHERE json_extract(a.value, '$.name') IS NOT NULL
         AND TRIM(json_extract(a.value, '$.name')) != ''
         AND ${excludeCueContainer("t.path")}`
  ).get();
  const codecs = d.prepare(
    `SELECT COALESCE(codec, '') AS codec, COUNT(*) AS count
       FROM tracks
       WHERE ${excludeCueContainer()}
       GROUP BY codec
       ORDER BY count DESC, codec`
  ).all();
  return {
    trackCount: aggregate.trackCount,
    albumCount: albumRow.count,
    artistCount: artistRow.count,
    totalDurationMs: aggregate.totalDurationMs,
    totalFileSize: aggregate.totalFileSize,
    codecs
  };
};
const getTracksByIds$1 = (ids) => {
  if (ids.length === 0) return [];
  const placeholders = ids.map(() => "?").join(",");
  const rows = getDb().prepare(`SELECT * FROM tracks WHERE id IN (${placeholders})`).all(...ids);
  return rows.map(rowToTrack);
};
const dbPath = path.join(databaseDir, "library.db");
let db = null;
const getDb = () => {
  if (!db) throw new Error("Database not initialized");
  return db;
};
const isDbOpen = () => db !== null;
const initDatabase = () => {
  fs.mkdirSync(databaseDir, { recursive: true });
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  const cols = db.prepare("PRAGMA table_info(lyric_cache)").all();
  if (cols.length > 0 && !cols.some((c) => c.name === "data")) {
    db.exec("DROP TABLE lyric_cache");
  }
  db.exec(`
    CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY,
      path TEXT NOT NULL UNIQUE,
      cue_path TEXT,
      cue_audio_path TEXT,
      cue_start_ms INTEGER,
      cue_end_ms INTEGER,
      title TEXT NOT NULL,
      track INTEGER,
      artists TEXT NOT NULL DEFAULT '[]',
      album TEXT,
      duration INTEGER NOT NULL,
      cover TEXT,
      codec TEXT,
      sample_rate INTEGER,
      bit_rate INTEGER,
      channels INTEGER,
      bits_per_sample INTEGER,
      file_size INTEGER NOT NULL,
      file_mtime INTEGER,
      file_ctime INTEGER,
      scanned_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_tracks_title ON tracks(title);
    CREATE INDEX IF NOT EXISTS idx_tracks_album ON tracks(album);

    CREATE TABLE IF NOT EXISTS account_sessions (
      platform TEXT PRIMARY KEY,
      cookies TEXT NOT NULL DEFAULT '{}',
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lyric_cache (
      platform TEXT NOT NULL,
      platform_id TEXT NOT NULL,
      data TEXT NOT NULL,
      fetched_at INTEGER NOT NULL,
      PRIMARY KEY (platform, platform_id)
    );

    CREATE TABLE IF NOT EXISTS lyric_match_cache (
      fingerprint TEXT NOT NULL,
      platform TEXT NOT NULL,
      platform_id TEXT NOT NULL,
      extra TEXT,
      matched_at INTEGER NOT NULL,
      PRIMARY KEY (fingerprint, platform)
    );

    CREATE TABLE IF NOT EXISTS lyric_ttml_cache (
      platform TEXT NOT NULL,
      id TEXT NOT NULL,
      content TEXT,
      fetched_at INTEGER NOT NULL,
      PRIMARY KEY (platform, id)
    );

    CREATE TABLE IF NOT EXISTS song_cache (
      cache_key TEXT PRIMARY KEY,
      source TEXT NOT NULL,
      filename TEXT NOT NULL,
      size INTEGER NOT NULL,
      mime TEXT,
      cached_at INTEGER NOT NULL,
      last_used_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_song_cache_last_used ON song_cache(last_used_at);
    CREATE INDEX IF NOT EXISTS idx_song_cache_source ON song_cache(source);

    CREATE TABLE IF NOT EXISTS play_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      track_id TEXT NOT NULL,
      source TEXT NOT NULL,
      started_at INTEGER NOT NULL,
      listened_ms INTEGER NOT NULL,
      track_json TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_play_history_started ON play_history(started_at);
    CREATE INDEX IF NOT EXISTS idx_play_history_track ON play_history(source, track_id);

    CREATE TABLE IF NOT EXISTS favorite_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      track_id TEXT NOT NULL,
      source TEXT NOT NULL,
      action TEXT NOT NULL,
      at INTEGER NOT NULL,
      track_json TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_favorite_history_at ON favorite_history(at);

    CREATE TABLE IF NOT EXISTS download_tasks (
      task_id TEXT PRIMARY KEY,
      track_json TEXT NOT NULL,
      quality_level TEXT NOT NULL,
      status TEXT NOT NULL,
      received INTEGER NOT NULL DEFAULT 0,
      total INTEGER NOT NULL DEFAULT 0,
      file_path TEXT,
      error_code TEXT,
      tag_warning INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL,
      finished_at INTEGER
    );
    CREATE INDEX IF NOT EXISTS idx_download_tasks_created ON download_tasks(created_at);

    CREATE TABLE IF NOT EXISTS playlists (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL CHECK(type = 'local'),
      title TEXT NOT NULL,
      description TEXT,
      cover TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_playlists_type
      ON playlists(type, updated_at DESC);

    CREATE TABLE IF NOT EXISTS playlist_tracks (
      playlist_id TEXT NOT NULL,
      track_id TEXT NOT NULL,
      position INTEGER NOT NULL,
      added_at INTEGER NOT NULL,
      PRIMARY KEY (playlist_id, track_id)
    );
    CREATE INDEX IF NOT EXISTS idx_playlist_tracks_position
      ON playlist_tracks(playlist_id, position);

    CREATE TABLE IF NOT EXISTS remote_tracks (
      server_id TEXT NOT NULL,
      remote_id TEXT NOT NULL,
      data TEXT NOT NULL,
      title TEXT NOT NULL,
      search_text TEXT NOT NULL,
      generation INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (server_id, remote_id)
    );
    CREATE INDEX IF NOT EXISTS idx_remote_tracks_title
      ON remote_tracks(server_id, title);
    CREATE INDEX IF NOT EXISTS idx_remote_tracks_generation
      ON remote_tracks(server_id, generation);

    CREATE TABLE IF NOT EXISTS remote_albums (
      server_id TEXT NOT NULL,
      remote_id TEXT NOT NULL,
      data TEXT NOT NULL,
      name TEXT NOT NULL,
      generation INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (server_id, remote_id)
    );
    CREATE INDEX IF NOT EXISTS idx_remote_albums_name
      ON remote_albums(server_id, name);
    CREATE INDEX IF NOT EXISTS idx_remote_albums_generation
      ON remote_albums(server_id, generation);

    CREATE TABLE IF NOT EXISTS remote_artists (
      server_id TEXT NOT NULL,
      remote_id TEXT NOT NULL,
      data TEXT NOT NULL,
      name TEXT NOT NULL,
      generation INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (server_id, remote_id)
    );
    CREATE INDEX IF NOT EXISTS idx_remote_artists_name
      ON remote_artists(server_id, name);
    CREATE INDEX IF NOT EXISTS idx_remote_artists_generation
      ON remote_artists(server_id, generation);

    CREATE TABLE IF NOT EXISTS remote_playlists (
      server_id TEXT NOT NULL,
      remote_id TEXT NOT NULL,
      data TEXT NOT NULL,
      name TEXT NOT NULL,
      generation INTEGER NOT NULL,
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (server_id, remote_id)
    );
    CREATE INDEX IF NOT EXISTS idx_remote_playlists_name
      ON remote_playlists(server_id, name);
    CREATE INDEX IF NOT EXISTS idx_remote_playlists_generation
      ON remote_playlists(server_id, generation);

  `);
  migrate(db);
  libraryLog.info(`数据库已初始化: ${dbPath}`);
};
const closeDatabase = () => {
  if (db) {
    db.close();
    db = null;
    libraryLog.info("数据库已关闭");
  }
};
const getSessionCookies = (platform) => {
  const row = getDb().prepare("SELECT cookies FROM account_sessions WHERE platform = ?").get(platform);
  if (!row) return {};
  try {
    const parsed = JSON.parse(row.cookies);
    return parsed ?? {};
  } catch {
    return {};
  }
};
const saveSessionCookies = (platform, cookies) => {
  getDb().prepare(
    `INSERT INTO account_sessions (platform, cookies, updated_at) VALUES (?, ?, ?)
       ON CONFLICT(platform) DO UPDATE SET
         cookies = excluded.cookies,
         updated_at = excluded.updated_at`
  ).run(platform, JSON.stringify(cookies), Date.now());
};
const clearSessionCookies = (platform) => {
  saveSessionCookies(platform, {});
};
const DEFAULT_TTL$2 = 2 * 60 * 1e3;
const MAX_ENTRIES$2 = 200;
const store = /* @__PURE__ */ new Map();
const hash = (params) => createHash("md5").update(JSON.stringify(params ?? {})).digest("hex").slice(0, 8);
const buildCacheKey = (name, params) => `${name}|${hash(params)}`;
const cacheGet$2 = (key) => {
  const hit = store.get(key);
  if (!hit) return void 0;
  if (hit.expireAt <= Date.now()) {
    store.delete(key);
    return void 0;
  }
  store.delete(key);
  store.set(key, hit);
  return hit.value;
};
const cacheSet$2 = (key, value, ttl = DEFAULT_TTL$2) => {
  if (store.size >= MAX_ENTRIES$2) {
    const oldest = store.keys().next().value;
    if (oldest !== void 0) store.delete(oldest);
  }
  store.set(key, { value, expireAt: Date.now() + ttl });
};
const cacheClear = () => {
  store.clear();
};
const cookieToJson = (cookie) => {
  if (!cookie) return {};
  const obj = {};
  for (const item of cookie.split(";")) {
    const eq = item.indexOf("=");
    if (eq <= 0) continue;
    obj[item.slice(0, eq).trim()] = item.slice(eq + 1).trim();
  }
  return obj;
};
const cookieObjToString = (cookie) => Object.keys(cookie).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(cookie[key]))}`).join("; ");
const generate = () => randomBytes(26).toString("hex").toUpperCase();
let deviceId$1 = generate();
let anonymousToken = "";
const getDeviceId = () => deviceId$1;
const setDeviceId = (id) => {
  deviceId$1 = id;
};
const regenerateDeviceId = () => {
  deviceId$1 = generate();
  return deviceId$1;
};
const getAnonymousToken = () => anonymousToken;
const setAnonymousToken = (token) => {
  anonymousToken = token;
};
const IV = "0102030405060708";
const PRESET_KEY = "0CoJUm6Qyw8W8jud";
const LINUX_API_KEY = "rFgB&h#%2?^eDg:Q";
const EAPI_KEY = "e82ckenh8dichen8";
const BASE62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgtQn2JZ34ZC28NWYpAUd98iZ37BUrX/aKzmFbt7clFSs6sXqHauqKWqdtLkF2KexO40H1YTX8z2lSgBBOAxLsvaklV8k4cBFK9snQXE9/DDaFt6Rr7iVZMldczhC0JNgTz+SHXT6CBHuX3e9SdB1Ua44oncaTWz7OBGLbCiK45wIDAQAB
-----END PUBLIC KEY-----`;
const DOMAIN = "https://music.163.com";
const API_DOMAIN = "https://interface.music.163.com";
const XEAPI_DOMAIN = "https://interface3.music.163.com";
const CLIENT_LOG_DOMAIN = "https://clientlog.music.163.com";
const CLIENT_LOG3_DOMAIN = "https://clientlog3.music.163.com";
const ENCRYPT_RESPONSE = false;
const SPECIAL_STATUS_CODES = /* @__PURE__ */ new Set([
  201,
  302,
  400,
  502,
  800,
  801,
  802,
  803
]);
const OS_MAP = {
  pc: {
    os: "pc",
    appver: "3.1.17.204416",
    osver: "Microsoft-Windows-10-Professional-build-19045-64bit",
    channel: "netease"
  },
  linux: {
    os: "linux",
    appver: "1.2.1.0428",
    osver: "Deepin 20.9",
    channel: "netease"
  },
  android: {
    os: "android",
    appver: "8.20.20.231215173437",
    osver: "14",
    channel: "xiaomi"
  },
  iphone: {
    os: "iPhone OS",
    appver: "9.0.90",
    osver: "16.2",
    channel: "distribution"
  },
  osx: {
    os: "osx",
    appver: "3.1.10.5100",
    osver: "15.5",
    channel: "netease"
  }
};
const UA_MAP = {
  weapi: {
    pc: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0"
  },
  linuxapi: {
    linux: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36"
  },
  api: {
    pc: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/91.0.4472.164 NeteaseMusicDesktop/3.0.18.203152",
    android: "NeteaseMusic/9.1.65.240927161425(9001065);Dalvik/2.1.0 (Linux; U; Android 14; 23013RK75C Build/UKQ1.230804.001)",
    iphone: "NeteaseMusic 9.0.90/5038 (iPhone; iOS 16.2; zh_CN)"
  }
};
const aesEncrypt = (text, mode, key, iv, format = "base64") => {
  const algorithm = mode === "cbc" ? "aes-128-cbc" : "aes-128-ecb";
  const ivBuf = mode === "cbc" ? Buffer.from(iv, "utf8") : Buffer.alloc(0);
  const cipher = createCipheriv(algorithm, Buffer.from(key, "utf8"), ivBuf);
  const encrypted = Buffer.concat([
    cipher.update(typeof text === "string" ? Buffer.from(text, "utf8") : text),
    cipher.final()
  ]);
  return format === "base64" ? encrypted.toString("base64") : encrypted.toString("hex").toUpperCase();
};
const aesDecrypt = (ciphertext, key, format = "base64") => {
  const decipher = createDecipheriv("aes-128-ecb", Buffer.from(key, "utf8"), Buffer.alloc(0));
  const input = Buffer.from(ciphertext, format);
  return Buffer.concat([decipher.update(input), decipher.final()]);
};
const rsaEncrypt = (str, publicKey = PUBLIC_KEY) => {
  const buffer = Buffer.alloc(128);
  const data2 = Buffer.from(str, "utf8");
  data2.copy(buffer, 128 - data2.length);
  const encrypted = publicEncrypt({ key: publicKey, padding: constants.RSA_NO_PADDING }, buffer);
  return encrypted.toString("hex");
};
const weapi = (object) => {
  const text = JSON.stringify(object);
  let secretKey = "";
  for (let i = 0; i < 16; i++) {
    secretKey += BASE62.charAt(randomInt(0, 62));
  }
  const first = aesEncrypt(text, "cbc", PRESET_KEY, IV);
  const params = aesEncrypt(first, "cbc", secretKey, IV);
  const encSecKey = rsaEncrypt(secretKey.split("").reverse().join(""));
  return { params, encSecKey };
};
const linuxapi = (object) => {
  const text = JSON.stringify(object);
  return { eparams: aesEncrypt(text, "ecb", LINUX_API_KEY, "", "hex") };
};
const eapi = (url, object) => {
  const text = typeof object === "object" ? JSON.stringify(object) : String(object);
  const message = `nobody${url}use${text}md5forencrypt`;
  const digest = createHash("md5").update(message).digest("hex");
  const data2 = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`;
  return { params: aesEncrypt(data2, "ecb", EAPI_KEY, "", "hex") };
};
const eapiResDecrypt = (encryptedHex, aeapi = false) => {
  try {
    const decrypted = aesDecrypt(encryptedHex, EAPI_KEY, "hex");
    if (aeapi) {
      const decompressed = gunzipSync(decrypted);
      return JSON.parse(decompressed.toString("utf8"));
    }
    return JSON.parse(decrypted.toString("utf8"));
  } catch {
    return null;
  }
};
const XEAPI_STATIC_KEY = Buffer.from(
  "ab1d5a430f6bb04a3f01e81ddd72bd916d5ce591248ac128714806d7f8fb1b84",
  "hex"
);
const XEAPI_SIGN_KEY = "mUHCwVNWJbunMqAHf5MImuirT6plvs6VSFW62MGHstFQxhBGdEoIhLItH3djc4+FB/OKty3+lL2rGeoFBpVe5g==";
const X25519_SPKI_PREFIX = Buffer.from("302a300506032b656e032100", "hex");
const aesEcbEncrypt = (key, plaintext) => {
  const cipher = createCipheriv(`aes-${key.length * 8}-ecb`, key, null);
  return Buffer.concat([cipher.update(plaintext), cipher.final()]);
};
const aesEcbDecrypt = (key, ciphertext) => {
  const decipher = createDecipheriv(`aes-${key.length * 8}-ecb`, key, null);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
};
const createX25519PublicKey = (raw) => createPublicKey({ key: Buffer.concat([X25519_SPKI_PREFIX, raw]), format: "der", type: "spki" });
const deriveX25519AesKey = (sharedSecret, ephemeralPublicKey) => {
  const prk = createHmac("sha256", Buffer.alloc(32)).update(sharedSecret.length ? sharedSecret : Buffer.alloc(32)).digest();
  return createHmac("sha256", prk).update(Buffer.concat([ephemeralPublicKey, Buffer.from([1])])).digest().subarray(0, 16);
};
const xeapiSign = (timestamp, nonce) => createHmac("sha256", XEAPI_SIGN_KEY).update(String(timestamp) + nonce).digest("base64");
const xeapiMidTransform = (ciphertext) => {
  const random = randomBytes(16);
  const xored = Buffer.alloc(ciphertext.length);
  for (let i = 0; i < ciphertext.length; i++) xored[i] = ciphertext[i] ^ random[i & 15];
  const b642 = Buffer.from(xored.toString("base64"));
  const rot = b642.length ? (random[0] & 15) % b642.length : 0;
  return Buffer.concat([random, b642.subarray(rot), b642.subarray(0, rot)]);
};
const xeapiEncryptS = (dynamicKey, publicKeyState2, os2) => {
  const peerKey = createX25519PublicKey(Buffer.from(publicKeyState2.publicKey, "base64"));
  const { publicKey, privateKey } = generateKeyPairSync("x25519");
  const ephemeralRaw = Buffer.from(publicKey.export({ format: "der", type: "spki" })).subarray(-32);
  const sharedSecret = diffieHellman({ privateKey, publicKey: peerKey });
  const aesKey = deriveX25519AesKey(sharedSecret, ephemeralRaw);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-128-gcm", aesKey, iv);
  const plaintext = Buffer.from(
    `${dynamicKey.toString("base64")}|${os2}|${publicKeyState2.sk || ""}`
  );
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  return Buffer.concat([ephemeralRaw, iv, encrypted, cipher.getAuthTag()]);
};
const buildXeapiPlaintext = (uri, data2, options) => {
  const fields = {};
  const contentType = options.contentType || "application/x-www-form-urlencoded;charset=utf-8";
  if (contentType.split(";", 1)[0].toLowerCase() !== "application/x-www-form-urlencoded") {
    fields.contentType = contentType;
  }
  const method = (options.method || "POST").toUpperCase();
  if (method !== "POST") fields.method = method;
  const url = new URL(uri, "https://interface.music.163.com");
  if (url.search) fields.queryString = url.search.slice(1);
  if (data2 !== void 0 && data2 !== null) {
    const bodyData = { ...data2 };
    delete bodyData.e_r;
    const body = new URLSearchParams(bodyData).toString();
    fields.body = Buffer.from(body).toString("base64");
  }
  fields.queryString = fields.queryString ? `${fields.queryString}&e_r=true` : "e_r=true";
  return JSON.stringify(fields);
};
const xeapi = (uri, data2, options) => {
  const { publicKeyState: publicKeyState2 } = options;
  const activeSessionKey = options.sessionKey ? Buffer.from(String(options.sessionKey)) : null;
  const activeSessionId = options.sessionId || "";
  const dynamicKey = activeSessionKey || randomBytes(16);
  const plaintext = Buffer.from(buildXeapiPlaintext(uri, data2, options));
  const b = aesEcbEncrypt(
    dynamicKey,
    xeapiMidTransform(aesEcbEncrypt(XEAPI_STATIC_KEY, plaintext))
  );
  const s = xeapiEncryptS(dynamicKey, publicKeyState2, options.os || "android");
  const r = aesEcbEncrypt(
    XEAPI_STATIC_KEY,
    Buffer.from(`${publicKeyState2.version}|${activeSessionKey ? activeSessionId : ""}`)
  );
  return { B: b.toString("base64"), S: s.toString("base64"), R: r.toString("base64") };
};
const xeapiResDecrypt = (body) => {
  const decrypted = aesEcbDecrypt(Buffer.from(EAPI_KEY, "utf8"), body);
  const plaintext = decrypted[0] === 31 && decrypted[1] === 139 ? gunzipSync(decrypted) : decrypted;
  return JSON.parse(plaintext.toString());
};
const xeapiDecryptPublicKey = (encryptedData) => JSON.parse(aesEcbDecrypt(XEAPI_STATIC_KEY, Buffer.from(encryptedData, "base64")).toString());
let publicKeyState = null;
let sessionId = "";
let sessionKey = "";
let publicKeyPromise = null;
let publicKeyGeneration = 0;
const generateNonce = () => {
  let nonce = "";
  for (let i = 0; i < 16; i++) nonce += Math.floor(Math.random() * 10).toString();
  return nonce;
};
const fetchPublicKey = async (deviceId2, currentKeyVersion) => {
  const nonce = generateNonce();
  const timestamp = String(Date.now());
  const data2 = {
    appVersion: "9.1.65",
    currentKeyVersion,
    deviceId: deviceId2,
    nonce,
    os: "android",
    requestType: "active",
    signature: xeapiSign(timestamp, nonce),
    t1: "",
    t2: "",
    timestamp,
    uid: ""
  };
  const res = await fetchWithProxy(`${API_DOMAIN}/api/gorilla/anti/crawler/security/key/get`, {
    method: "POST",
    headers: {
      "User-Agent": UA_MAP.api.android,
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: deviceId2 ? `deviceId=${encodeURIComponent(deviceId2)}` : ""
    },
    body: new URLSearchParams(data2).toString(),
    signal: AbortSignal.timeout(8e3)
  });
  const json = await res.json();
  const payload = json?.data;
  if (json?.code !== 200 || !payload?.encryptedData) {
    throw new Error("xeapi public key request failed");
  }
  if (!payload.signature || xeapiSign(payload.timestamp ?? "", nonce) !== payload.signature) {
    throw new Error("xeapi public key response signature mismatch");
  }
  const key = xeapiDecryptPublicKey(payload.encryptedData);
  if (!key.sk) throw new Error("xeapi public key response missing sk");
  return key;
};
const ensureXeapiKey = async (deviceId2) => {
  if (publicKeyState?.sk) return publicKeyState;
  if (!publicKeyPromise) {
    const generation = publicKeyGeneration;
    const promise = fetchPublicKey(deviceId2, publicKeyState?.version ?? "").then((key) => {
      if (!key.sk && publicKeyState?.sk) key.sk = publicKeyState.sk;
      if (generation === publicKeyGeneration) publicKeyState = key;
      return key;
    }).finally(() => {
      if (publicKeyPromise === promise) publicKeyPromise = null;
    });
    publicKeyPromise = promise;
  }
  return publicKeyPromise;
};
const getXeapiSession = () => ({
  sessionId,
  sessionKey
});
const updateXeapiSession = (id, key) => {
  sessionId = id;
  sessionKey = key;
};
const resetXeapiKey = () => {
  publicKeyGeneration += 1;
  publicKeyState = null;
  publicKeyPromise = null;
  sessionId = "";
  sessionKey = "";
};
class NeteaseRequestError extends Error {
  response;
  constructor(response) {
    const body = response.body;
    const code = body?.code ?? response.status;
    const msg = body?.msg ?? body?.message ?? "";
    super(msg ? `netease ${code}: ${msg}` : `netease ${code}`);
    this.name = "NeteaseRequestError";
    this.response = response;
  }
}
const csrfFrom = (cookie) => cookie["__csrf"] || "";
const OSX_USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const WNMCID = (() => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return `${s}.${Date.now()}.01.0`;
})();
const generateRequestId = () => {
  const rand = Math.floor(Math.random() * 1e3).toString().padStart(4, "0");
  return `${Date.now()}_${rand}`;
};
const processCookieObject = (cookie, uri) => {
  const ntesNuid = cookie._ntes_nuid || randomBytes(16).toString("hex");
  const os2 = OS_MAP[cookie.os || "pc"] || OS_MAP.pc;
  const processed = {
    ...cookie,
    __remember_me: "true",
    ntes_kaola_ad: "1",
    _ntes_nuid: cookie._ntes_nuid || ntesNuid,
    _ntes_nnid: cookie._ntes_nnid || `${ntesNuid},${Date.now()}`,
    WNMCID: cookie.WNMCID || WNMCID,
    WEVNSM: cookie.WEVNSM || "1.0.0",
    osver: cookie.osver || os2.osver,
    deviceId: cookie.deviceId || getDeviceId(),
    os: cookie.os || os2.os,
    channel: cookie.channel || os2.channel,
    appver: cookie.appver || os2.appver
  };
  if (uri.indexOf("login") === -1) {
    processed.NMTID = randomBytes(8).toString("hex");
  }
  if (!processed.MUSIC_U) {
    processed.MUSIC_A = processed.MUSIC_A || getAnonymousToken();
    if (!processed.MUSIC_A) delete processed.MUSIC_A;
  }
  return processed;
};
const chooseUserAgent = (crypto2, uaType = "pc") => {
  const map = UA_MAP[crypto2];
  return map && map[uaType] || "";
};
const createRequest = async (uri, data2, options) => {
  const headers = {};
  const ip = options.realIP || options.ip || "";
  if (ip) {
    headers["X-Real-IP"] = ip;
    headers["X-Forwarded-For"] = ip;
  }
  let cookie = typeof options.cookie === "string" ? cookieToJson(options.cookie) : options.cookie || {};
  cookie = processCookieObject(cookie, uri);
  headers["Cookie"] = cookieObjToString(cookie);
  let crypto2 = options.crypto ?? "";
  if (crypto2 === "") crypto2 = "eapi";
  const csrfToken = csrfFrom(cookie);
  const useER = toBoolean(
    options.e_r !== void 0 ? options.e_r : data2.e_r !== void 0 ? data2.e_r : ENCRYPT_RESPONSE
  );
  data2.e_r = useER;
  let url = "";
  let encryptData;
  switch (crypto2) {
    case "weapi": {
      headers["Referer"] = options.domain || DOMAIN;
      headers["User-Agent"] = options.ua || chooseUserAgent("weapi");
      data2.csrf_token = csrfToken;
      encryptData = weapi(data2);
      url = (options.domain || DOMAIN) + "/weapi/" + uri.slice(5);
      break;
    }
    case "linuxapi": {
      headers["User-Agent"] = options.ua || chooseUserAgent("linuxapi", "linux");
      encryptData = linuxapi({
        method: "POST",
        url: (options.domain || DOMAIN) + uri,
        params: data2
      });
      url = (options.domain || DOMAIN) + "/api/linux/forward";
      break;
    }
    case "xeapi": {
      const publicKeyState2 = await ensureXeapiKey(cookie.deviceId);
      const xeapiOs = cookie.os === "android" ? cookie.os : "android";
      const xeapiAppver = cookie.os === "android" && cookie.appver ? cookie.appver : "9.1.65";
      const xeapiOsver = cookie.os === "android" && cookie.osver ? cookie.osver : "16";
      const xeapiBuildver = cookie.buildver || Date.now().toString().slice(0, 10);
      headers["User-Agent"] = options.ua || chooseUserAgent("api", "android");
      headers["X-Client-Enc-State"] = "ENCRYPTED";
      headers["x-aeapi"] = "true";
      headers["x-deviceid"] = cookie.deviceId;
      headers["x-os"] = xeapiOs;
      headers["x-osver"] = xeapiOsver;
      headers["x-appver"] = xeapiAppver;
      headers["x-sdeviceid"] = cookie.sDeviceId || cookie.deviceId;
      headers["x-buildver"] = xeapiBuildver;
      if (cookie.MUSIC_U) headers["x-music-u"] = cookie.MUSIC_U;
      headers["Cookie"] = cookieObjToString({
        ...cookie,
        os: xeapiOs,
        osver: xeapiOsver,
        appver: xeapiAppver,
        buildver: xeapiBuildver,
        sDeviceId: cookie.sDeviceId || cookie.deviceId
      });
      const session2 = getXeapiSession();
      url = (options.domain || XEAPI_DOMAIN) + "/xeapi/" + uri.slice(5);
      encryptData = xeapi(uri, data2, {
        publicKeyState: publicKeyState2,
        sessionId: session2.sessionId,
        sessionKey: session2.sessionKey,
        os: xeapiOs
      });
      break;
    }
    case "eapi":
    case "api": {
      const header = {
        osver: cookie.osver,
        deviceId: cookie.deviceId,
        os: cookie.os,
        appver: cookie.appver,
        versioncode: cookie.versioncode || "140",
        mobilename: cookie.mobilename || "",
        buildver: cookie.buildver || Date.now().toString().slice(0, 10),
        resolution: cookie.resolution || "1920x1080",
        __csrf: csrfToken,
        channel: cookie.channel,
        requestId: generateRequestId()
      };
      if (cookie.MUSIC_U) header.MUSIC_U = cookie.MUSIC_U;
      if (cookie.MUSIC_A) header.MUSIC_A = cookie.MUSIC_A;
      headers["Cookie"] = cookieObjToString(header);
      headers["User-Agent"] = options.ua || (cookie.os === "osx" ? OSX_USER_AGENT : chooseUserAgent("api", "iphone"));
      if (crypto2 === "eapi") {
        data2.header = header;
        encryptData = eapi(uri, data2);
        url = (options.domain || API_DOMAIN) + "/eapi/" + uri.slice(5);
      } else {
        url = (options.domain || API_DOMAIN) + uri;
        encryptData = data2;
      }
      break;
    }
    default:
      throw new Error(`Unknown crypto: ${crypto2}`);
  }
  const body = new URLSearchParams(encryptData).toString();
  headers["Content-Type"] = "application/x-www-form-urlencoded";
  const answer = { status: 500, body: {}, cookie: [] };
  const isXeapi = crypto2 === "xeapi";
  const needDecrypt = isXeapi || (crypto2 === "eapi" || crypto2 === "weapi") && useER;
  let res;
  try {
    res = await fetchWithProxy(url, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(8e3)
    });
  } catch (err) {
    answer.status = 502;
    answer.body = { code: 502, msg: err instanceof Error ? err.message : String(err) };
    throw new NeteaseRequestError(answer);
  }
  const setCookie = res.headers.getSetCookie?.() ?? (res.headers.get("set-cookie") ? [res.headers.get("set-cookie")] : []);
  answer.cookie = setCookie.map((x) => x.replace(/\s*Domain=[^(;|$)]+;*/, ""));
  if (isXeapi) {
    const ssid = res.headers.get("x-encr-ssid");
    const sskey = res.headers.get("x-encr-sskey");
    if (ssid && sskey) updateXeapiSession(ssid, sskey);
  }
  let parsed;
  try {
    if (needDecrypt) {
      const buf = Buffer.from(await res.arrayBuffer());
      parsed = isXeapi ? xeapiResDecrypt(buf) : eapiResDecrypt(buf.toString("hex").toUpperCase(), headers["x-aeapi"] === "true");
    } else {
      const text = await res.text();
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = { code: res.status, raw: text };
      }
    }
    answer.body = parsed;
    if (parsed?.code !== void 0) parsed.code = Number(parsed.code);
    answer.status = Number(parsed?.code || res.status);
    if (typeof parsed?.code === "number" && SPECIAL_STATUS_CODES.has(parsed.code)) {
      answer.status = 200;
    }
  } catch {
    answer.body = { code: res.status, msg: "parse failed" };
    answer.status = res.status;
  }
  answer.status = answer.status > 100 && answer.status < 600 ? answer.status : 400;
  if (answer.status === 200) return answer;
  throw new NeteaseRequestError(answer);
};
const toBoolean = (val) => {
  if (typeof val === "boolean") return val;
  if (val === "") return false;
  return val === "true" || val === "1" || val === 1;
};
const createOption = (query, crypto2 = "") => ({
  crypto: query.crypto || crypto2,
  cookie: query.cookie,
  ua: query.ua || "",
  realIP: query.realIP,
  ip: query.ip,
  e_r: query.e_r,
  domain: query.domain || "",
  checkToken: query.checkToken || false
});
const captchaSent = (query, request2) => {
  const data2 = {
    ctcode: query.ctcode || "86",
    secrete: "music_middleuser_pclogin",
    cellphone: query.phone
  };
  return request2("/api/sms/captcha/sent", data2, createOption(query, "weapi"));
};
const captchaVerify = (query, request2) => {
  const data2 = {
    ctcode: query.ctcode || "86",
    cellphone: query.phone,
    captcha: query.captcha
  };
  return request2("/api/sms/captcha/verify", data2, createOption(query, "weapi"));
};
const md5$1 = (text) => createHash("md5").update(text).digest("hex");
const login = async (query, request2) => {
  const password = query.md5_password || md5$1(query.password || "");
  const data2 = {
    type: "0",
    https: "true",
    username: query.email,
    password,
    rememberLogin: "true"
  };
  let result2 = await request2("/api/w/login", data2, createOption(query));
  const body = result2.body;
  if (body.code === 502) {
    return {
      status: 200,
      body: { msg: "账号或密码错误", code: 502, message: "账号或密码错误" },
      cookie: result2.cookie
    };
  }
  if (body.code === 200) {
    const renamed = JSON.parse(JSON.stringify(body).replace(/avatarImgId_str/g, "avatarImgIdStr"));
    result2 = {
      status: 200,
      body: { ...renamed, cookie: result2.cookie.join(";") },
      cookie: result2.cookie
    };
  }
  return result2;
};
const md5 = (text) => createHash("md5").update(text).digest("hex");
const loginCellphone = async (query, request2) => {
  const hasCaptcha = Boolean(query.captcha);
  const data2 = {
    type: "1",
    https: "true",
    phone: query.phone,
    countrycode: query.countrycode || "86",
    captcha: query.captcha,
    remember: "true"
  };
  if (hasCaptcha) {
    data2.captcha = query.captcha;
  } else {
    data2.password = query.md5_password || md5(query.password || "");
  }
  let result2 = await request2("/api/w/login/cellphone", data2, createOption(query, "weapi"));
  const body = result2.body;
  if (body.code === 200) {
    const renamed = JSON.parse(JSON.stringify(body).replace(/avatarImgId_str/g, "avatarImgIdStr"));
    result2 = {
      status: 200,
      body: { ...renamed, cookie: result2.cookie.join(";") },
      cookie: result2.cookie
    };
  }
  return result2;
};
const loginQrCheck$1 = async (query, request2) => {
  const data2 = { key: query.key, type: 3 };
  try {
    const result2 = await request2("/api/login/qrcode/client/login", data2, createOption(query));
    return {
      status: 200,
      body: { ...result2.body, cookie: result2.cookie.join(";") },
      cookie: result2.cookie
    };
  } catch (err) {
    const fallback = err;
    return { status: 200, body: {}, cookie: fallback?.cookie ?? [] };
  }
};
const loginQrCreate = async (query) => {
  const url = `https://music.163.com/login?codekey=${query.key}`;
  return {
    status: 200,
    body: {
      code: 200,
      data: { qrurl: url, qrimg: "" }
    },
    cookie: []
  };
};
const loginQrKey$1 = async (query, request2) => {
  const result2 = await request2("/api/login/qrcode/unikey", { type: 3 }, createOption(query));
  return {
    status: 200,
    body: { data: result2.body, code: 200 },
    cookie: result2.cookie
  };
};
const loginRefresh = async (query, request2) => {
  const result2 = await request2("/api/login/token/refresh", {}, createOption(query));
  const body = result2.body;
  if (body.code === 200) {
    return {
      status: 200,
      body: { ...body, cookie: result2.cookie.join(";") },
      cookie: result2.cookie
    };
  }
  return result2;
};
const loginStatus = async (query, request2) => {
  const result2 = await request2("/api/w/nuser/account/get", {}, createOption(query, "weapi"));
  const body = result2.body;
  if (body.code === 200) {
    return {
      status: 200,
      body: { data: { ...body } },
      cookie: result2.cookie
    };
  }
  return result2;
};
const logout = (query, request2) => request2("/api/logout", {}, createOption(query));
const ID_XOR_KEY = "3go8&$8*3*3h0k(2)2";
const encodeId = (deviceId2) => {
  let xored = "";
  for (let i = 0; i < deviceId2.length; i++) {
    xored += String.fromCharCode(
      deviceId2.charCodeAt(i) ^ ID_XOR_KEY.charCodeAt(i % ID_XOR_KEY.length)
    );
  }
  return createHash("md5").update(xored, "utf8").digest("base64");
};
const registerAnonimous = async (query, request2) => {
  const deviceId2 = regenerateDeviceId();
  const username = Buffer.from(`${deviceId2} ${encodeId(deviceId2)}`, "utf8").toString("base64");
  const data2 = { username };
  const result2 = await request2("/api/register/anonimous", data2, createOption(query, "xeapi"));
  const body = result2.body;
  if (body.code === 200) {
    if (typeof body.token === "string") setAnonymousToken(body.token);
    return {
      status: 200,
      body: { ...body, cookie: result2.cookie.join(";") },
      cookie: result2.cookie
    };
  }
  return result2;
};
const userAccount = (query, request2) => request2("/api/nuser/account/get", {}, createOption(query, "weapi"));
const userCloud = (query, request2) => {
  const data2 = {
    limit: query.limit ?? 30,
    offset: query.offset ?? 0
  };
  return request2("/api/v1/cloud/get", data2, createOption(query, "weapi"));
};
const userCloudDel = (query, request2) => {
  const raw = query.id;
  const ids = Array.isArray(raw) ? raw : [raw];
  const data2 = { songIds: JSON.stringify(ids) };
  return request2("/api/cloud/del", data2, createOption(query, "weapi"));
};
const cloudUploadCheck = (query, request2) => {
  const data2 = {
    bitrate: "999000",
    ext: "",
    length: query.length,
    md5: query.md5,
    songId: "0",
    version: 1
  };
  return request2("/api/cloud/upload/check", data2, createOption(query));
};
const cloudNosToken = (query, request2) => {
  const data2 = {
    bucket: "jd-musicrep-privatecloud-audio-public",
    ext: query.ext,
    filename: query.filename,
    local: false,
    nos_product: 3,
    type: "audio",
    md5: query.md5
  };
  return request2("/api/nos/token/alloc", data2, createOption(query, "weapi"));
};
const cloudUploadInfo = (query, request2) => {
  const data2 = {
    md5: query.md5,
    songid: query.songid,
    filename: query.filename,
    song: query.song,
    album: query.album ?? "未知专辑",
    artist: query.artist ?? "未知艺术家",
    bitrate: "999000",
    resourceId: query.resourceId
  };
  return request2("/api/upload/cloud/info/v2", data2, createOption(query));
};
const cloudPub = (query, request2) => {
  const data2 = { songid: query.songid };
  return request2("/api/cloud/pub/v2", data2, createOption(query));
};
const cloudUploadCheckV2 = (query, request2) => {
  const data2 = {
    uploadType: 0,
    songs: JSON.stringify([
      { md5: query.md5, songId: query.songId ?? -2, bitrate: 999e3, fileSize: query.fileSize }
    ])
  };
  return request2("/api/cloud/upload/check/v2", data2, createOption(query));
};
const cloudSongImport = (query, request2) => {
  const data2 = {
    uploadType: 0,
    songs: JSON.stringify([
      {
        songId: query.songId,
        bitrate: 999e3,
        song: query.song,
        artist: query.artist ?? "未知艺术家",
        album: query.album ?? "未知专辑",
        fileName: `${query.song}.${query.fileType}`
      }
    ])
  };
  return request2("/api/cloud/user/song/import", data2, createOption(query));
};
const userDetail$2 = async (query, request2) => {
  const res = await request2(`/api/v1/user/detail/${query.uid}`, {}, createOption(query, "weapi"));
  const renamed = JSON.stringify(res).replace(/avatarImgId_str/g, "avatarImgIdStr");
  return JSON.parse(renamed);
};
const userDetailNew = (query, request2) => {
  const data2 = { all: "true", userId: query.uid };
  return request2(`/api/w/v1/user/detail/${query.uid}`, data2, createOption(query, "eapi"));
};
const userFolloweds = (query, request2) => {
  const data2 = {
    userId: query.uid,
    time: "0",
    limit: query.limit ?? 20,
    offset: query.offset ?? 0,
    getcounts: "true"
  };
  return request2(`/api/user/getfolloweds/${query.uid}`, data2, createOption(query));
};
const userFollows = (query, request2) => {
  const data2 = {
    offset: query.offset ?? 0,
    limit: query.limit ?? 30,
    order: true
  };
  return request2(`/api/user/getfollows/${query.uid}`, data2, createOption(query, "weapi"));
};
const userLevel = (query, request2) => request2("/api/user/level", {}, createOption(query, "weapi"));
const userPlaylist = (query, request2) => {
  const data2 = {
    uid: query.uid,
    limit: query.limit ?? 30,
    offset: query.offset ?? 0,
    includeVideo: true
  };
  return request2("/api/user/playlist", data2, createOption(query, "weapi"));
};
const userRecord = (query, request2) => {
  const data2 = {
    uid: query.uid,
    type: query.type ?? 0
  };
  return request2("/api/v1/play/record", data2, createOption(query, "weapi"));
};
const userSubcount = (query, request2) => request2("/api/subcount", {}, createOption(query, "weapi"));
const cloudsearch = (query, request2) => {
  const data2 = {
    s: query.keywords,
    type: query.type ?? 1,
    limit: query.limit ?? 30,
    offset: query.offset ?? 0,
    total: true
  };
  return request2("/api/cloudsearch/pc", data2, createOption(query));
};
const search$2 = (query, request2) => {
  if (query.type && String(query.type) === "2000") {
    const voice = {
      keyword: query.keywords,
      scene: "normal",
      limit: query.limit ?? 30,
      offset: query.offset ?? 0
    };
    return request2("/api/search/voice/get", voice, createOption(query));
  }
  const data2 = {
    s: query.keywords,
    type: query.type ?? 1,
    limit: query.limit ?? 30,
    offset: query.offset ?? 0
  };
  return request2("/api/search/get", data2, createOption(query));
};
const searchDefault = (query, request2) => request2("/api/search/defaultkeyword/get", {}, createOption(query));
const searchHot = (query, request2) => request2("/api/search/hot", { type: 1111 }, createOption(query));
const searchHotDetail = (query, request2) => request2("/api/hotsearchlist/get", {}, createOption(query, "weapi"));
const searchMatch = (query, request2) => {
  const songs = [
    {
      title: query.title || "",
      album: query.album || "",
      artist: query.artist || "",
      duration: query.duration || 0,
      persistId: query.md5
    }
  ];
  const data2 = { songs: JSON.stringify(songs) };
  return request2("/api/search/match/new", data2, createOption(query));
};
const searchMultimatch = (query, request2) => {
  const data2 = {
    type: query.type ?? 1,
    s: query.keywords || ""
  };
  return request2("/api/search/suggest/multimatch", data2, createOption(query, "weapi"));
};
const searchSuggest = (query, request2) => {
  const data2 = { s: query.keywords || "" };
  const type = query.type === "mobile" ? "keyword" : "web";
  return request2(`/api/search/suggest/${type}`, data2, createOption(query, "weapi"));
};
const searchSuggestPc = (query, request2) => {
  const data2 = { keyword: query.keyword || "" };
  return request2("/api/search/pc/suggest/keyword/get", data2, createOption(query));
};
const MATCH_URL = "https://interface.music.163.com/api/music/audio/match";
const audioMatch = async (query) => {
  const fingerprint = typeof query.audioFP === "string" ? query.audioFP : "";
  const duration = Number(query.duration);
  if (!fingerprint || !Number.isFinite(duration) || duration <= 0) {
    throw new Error("无效的听歌识曲参数");
  }
  const params = new URLSearchParams({
    sessionId: randomBytes(8).toString("hex"),
    algorithmCode: "shazam_v2",
    duration: String(duration),
    rawdata: fingerprint,
    times: "1",
    decrypt: "1"
  });
  const response = await fetchWithProxy(`${MATCH_URL}?${params}`, {
    headers: {
      Accept: "application/json",
      Referer: "https://music.163.com/",
      "User-Agent": "Mozilla/5.0"
    },
    signal: AbortSignal.timeout(8e3)
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(`网易云听歌识曲请求失败: HTTP ${response.status}`);
  }
  return { status: response.status, body, cookie: [] };
};
const lyric$2 = (query, request2) => {
  const data2 = {
    id: query.id,
    tv: -1,
    lv: -1,
    rv: -1,
    kv: -1,
    _nmclfl: 1
  };
  return request2("/api/song/lyric", data2, createOption(query));
};
const lyric_new = (query, request2) => {
  const data2 = {
    id: query.id,
    cp: false,
    tv: 0,
    lv: 0,
    rv: 0,
    kv: 0,
    yv: 0,
    ytv: 0,
    yrv: 0
  };
  return request2("/api/song/lyric/v1", data2, createOption(query));
};
const cloud_lyric_get = (query, request2) => {
  const data2 = {
    userId: query.uid,
    songId: query.sid,
    lv: -1,
    kv: -1
  };
  return request2("/api/cloud/lyric/get", data2, createOption(query, "eapi"));
};
const comment_music = (query, request2) => {
  const data2 = {
    rid: query.id,
    limit: query.limit ?? 20,
    offset: query.offset ?? 0,
    beforeTime: query.before ?? 0
  };
  return request2(
    `/api/v1/resource/comments/R_SO_4_${query.id}`,
    data2,
    createOption(query, "weapi")
  );
};
const comment_hot = (query, request2) => {
  const type = query.type ?? "R_SO_4_";
  const data2 = {
    rid: query.id,
    limit: query.limit ?? 20,
    offset: query.offset ?? 0,
    beforeTime: query.before ?? 0
  };
  return request2(
    `/api/v1/resource/hotcomments/${type}${query.id}`,
    data2,
    createOption(query, "weapi")
  );
};
const song_detail = (query, request2) => {
  const ids = String(query.ids ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const data2 = {
    c: `[${ids.map((id) => `{"id":${id}}`).join(",")}]`
  };
  return request2("/api/v3/song/detail", data2, createOption(query));
};
const song_url = (query, request2) => {
  const ids = query.id ?? query.ids;
  const level = String(query.level ?? "exhigh");
  const data2 = {
    ids: `[${String(ids).split(",").join(",")}]`,
    level,
    encodeType: "flac"
  };
  if (level === "sky") {
    data2.immerseType = query.immerseType ?? "c51";
  }
  const option = createOption(query, "xeapi");
  if (level === "vivid") {
    data2.encodeType = "mp3";
    const cookie = option.cookie;
    option.cookie = {
      ...typeof cookie === "string" ? cookieToJson(cookie) : cookie,
      os: "android",
      appver: "9.5.61"
    };
  }
  return request2("/api/song/enhance/player/url/v1", data2, option);
};
const song_download_url = (query, request2) => {
  const data2 = {
    id: query.id,
    level: query.level ?? "exhigh"
  };
  return request2("/api/song/enhance/download/url/v1", data2, createOption(query));
};
const song_simi_get = (query, request2) => {
  const data2 = {
    positionCode: "toolBarRcmdSong",
    resourceId: query.id,
    resourceType: "song"
  };
  return request2("/api/link/position/show/resource", data2, createOption(query, "eapi"));
};
const song_wiki_info = (query, request2) => {
  const extJson = {
    states: {
      playingResource: {
        current: query.id,
        scene: "songWiki"
      }
    }
  };
  const data2 = {
    extJson: JSON.stringify(extJson),
    positionCode: "songWikiMainPosition"
  };
  return request2(
    "/api/link/page/parent/relation/construct/info",
    data2,
    createOption(query, "eapi")
  );
};
const playmodeIntelligence = (query, request2) => {
  const data2 = {
    songId: query.id,
    type: "fromPlayOne",
    playlistId: query.pid,
    startMusicId: query.sid ?? query.id,
    count: query.count ?? 1
  };
  return request2("/api/playmode/intelligence/list", data2, createOption(query, "weapi"));
};
const personalFm = (query, request2) => {
  const data2 = {};
  if (query.mode) data2.mode = query.mode;
  if (query.submode || query.subMode) data2.subMode = query.submode || query.subMode;
  if (query.limit) data2.limit = query.limit;
  return request2("/api/v1/radio/get", data2, createOption(query, "weapi"));
};
const fmTrash = (query, request2) => {
  const data2 = {
    songId: query.id,
    alg: query.alg ?? "RT",
    time: query.time ?? 25
  };
  return request2("/api/radio/trash/add", data2, createOption(query, "weapi"));
};
const scrobble = async (query, request2) => {
  let cookie = query.cookie || "";
  if (typeof cookie === "object") {
    cookie = Object.assign({ os: "osx" }, cookie);
  } else if (typeof cookie === "string") {
    cookie = cookie.includes("os=") ? cookie.replace(/os=[^;]+/g, "os=osx") : `${cookie}; os=osx`;
  } else {
    cookie = "os=osx";
  }
  query.cookie = cookie;
  const resourceId = String(query.id || "");
  if (!/^\d+$/.test(resourceId) || resourceId === "0") {
    return { status: 400, body: { code: 400, msg: "缺少有效的资源 ID" }, cookie: [] };
  }
  const playTime = Number(query.time);
  if (Number.isNaN(playTime) || playTime <= 0) {
    return { status: 400, body: { code: 400, msg: "缺少有效的播放时长" }, cookie: [] };
  }
  const resourceType = query.resourceType === "dj" ? "dj" : "song";
  const sourceType = typeof query.sourceType === "string" ? query.sourceType : "song";
  const sourceName = resourceType === "dj" ? "djradio" : sourceType === "song" ? "track" : sourceType === "radio" ? "djradio" : sourceType;
  const sourceId = String(query.sourceid || query.sourceId || resourceId);
  const categoryId = Number(query.categoryId);
  const sourceFields = {
    sourceId,
    source: sourceName,
    sourcetype: sourceName,
    ...resourceType === "dj" && Number.isFinite(categoryId) ? { categoryId } : {}
  };
  const startplayData = {
    logs: JSON.stringify([
      {
        action: "startplay",
        json: {
          id: resourceId,
          type: resourceType,
          mainsite: "1",
          mainsiteWeb: "1",
          content: `id=${sourceId}`,
          ...sourceFields
        }
      }
    ])
  };
  const playData = {
    logs: JSON.stringify([
      {
        action: "play",
        json: {
          download: 0,
          end: "playend",
          id: resourceId,
          time: playTime,
          type: resourceType,
          wifi: 0,
          mainsite: "1",
          mainsiteWeb: "1",
          content: `id=${sourceId}`,
          ...sourceFields
        }
      }
    ])
  };
  const option = createOption(query, "eapi");
  option.domain = CLIENT_LOG_DOMAIN;
  const startplay = await request2("/api/feedback/weblog", startplayData, option);
  const play = await request2("/api/feedback/weblog", playData, option);
  const succeeded = [startplay, play].every(
    ({ body }) => body?.code === 200 || body?.data === "success"
  );
  return {
    status: succeeded ? 200 : 502,
    body: {
      code: succeeded ? 200 : 502,
      ...succeeded ? { data: "success" } : { msg: "原版日志上报失败" },
      details: {
        startplay: startplay.body,
        play: play.body
      }
    },
    cookie: []
  };
};
const parseCookie = (cookie) => {
  if (cookie && typeof cookie === "object") return cookie;
  if (typeof cookie !== "string") return {};
  const obj = {};
  for (const part of cookie.split(";")) {
    const idx = part.indexOf("=");
    if (idx <= 0) continue;
    const key = part.substring(0, idx).trim();
    const val = part.substring(idx + 1).trim();
    if (key) obj[key] = val;
  }
  return obj;
};
const createPlaybackLogContext = (cookieObj) => ({
  app: {
    channel: cookieObj.channel || "netease",
    version: cookieObj.appver || "3.1.37",
    versionCode: cookieObj.versioncode || "205354"
  },
  auth: {
    vipType: cookieObj.vipType || ""
  }
});
const toNcblSourceType = (resourceType, sourceType) => {
  if (resourceType === "dj") return "djradio";
  if (sourceType === "song") return "track";
  if (sourceType === "radio") return "djradio";
  return sourceType;
};
const buildPlv = (ctx, resource, source) => ({
  mode: "circulation",
  download: 0,
  alg: "",
  status: "front",
  id: String(resource.id),
  bitrate: resource.bitrate,
  type: resource.type,
  ...resource.type === "dj" && resource.categoryId !== void 0 ? { categoryId: resource.categoryId } : {},
  is_listentogether: 0,
  source: source.name,
  is_heart: 0,
  resource_ratio: "",
  resource_time: resource.time,
  musiceffect_id: "",
  app_mode: 2,
  bitrate_level: resource.level,
  vipType: ctx.auth.vipType,
  fee: resource.fee,
  file: 4,
  rightSource: 0,
  sourceId: source.id,
  sourcetype: source.type,
  libra_abt: "",
  channel: ctx.app.channel,
  curStartChannel: ""
});
const buildPld = (ctx, resource, source, played) => ({
  mode: "circulation",
  download: 0,
  alg: "",
  status: "front",
  id: String(resource.id),
  time: played,
  type: resource.type,
  ...resource.type === "dj" && resource.categoryId !== void 0 ? { categoryId: resource.categoryId } : {},
  is_listentogether: 0,
  source: source.name,
  is_heart: 0,
  realtime: played,
  resource_ratio: "",
  resource_time: resource.time,
  musiceffect_id: "1001",
  app_mode: 1,
  lyriceffect: "default",
  displayMode: "classic",
  bitrate: resource.bitrate,
  bitrate_level: resource.level,
  vipType: ctx.auth.vipType,
  fee: resource.fee,
  file: 4,
  rightSource: 0,
  sourceId: source.id,
  sourcetype: source.type,
  end: "interrupt",
  libra_abt: "",
  channel: ctx.app.channel,
  curStartChannel: ""
});
const SIGMA = [1634760805, 857760878, 2036477234, 1797285236];
const RSA_N = 0xfd90bd466ff9bc8a3fec2fbcf263b90d5c564879fa5d7aab89b31c1d5cb4139dn;
const RSA_E = 65537n;
const MAGIC = Buffer.from("NCBL", "ascii");
const NCBL_VERSION = 3;
const HEADER_FIXED_LEN = 70;
const META_BLOCK_TYPE = 17219;
const DEFAULT_MAX_FRAME = 32768;
const FIELD_SEP = "";
const rotl = (x, n) => (x << n | x >>> 32 - n) >>> 0;
const quarterRound = (s, a, b, c, d) => {
  s[a] = s[a] + s[b] >>> 0;
  s[d] ^= s[a];
  s[d] = rotl(s[d], 16);
  s[c] = s[c] + s[d] >>> 0;
  s[b] ^= s[c];
  s[b] = rotl(s[b], 12);
  s[a] = s[a] + s[b] >>> 0;
  s[d] ^= s[a];
  s[d] = rotl(s[d], 8);
  s[c] = s[c] + s[d] >>> 0;
  s[b] ^= s[c];
  s[b] = rotl(s[b], 7);
};
const chachaBlock = (key, counter, nonce) => {
  const state2 = new Uint32Array(16);
  state2[0] = SIGMA[0];
  state2[1] = SIGMA[1];
  state2[2] = SIGMA[2];
  state2[3] = SIGMA[3];
  for (let i = 0; i < 8; i++) state2[4 + i] = key.readUInt32LE(i * 4);
  state2[12] = counter >>> 0;
  state2[13] = nonce.readUInt32LE(0);
  state2[14] = nonce.readUInt32LE(4);
  state2[15] = nonce.readUInt32LE(8);
  const work = state2.slice();
  for (let i = 0; i < 10; i++) {
    quarterRound(work, 0, 4, 8, 12);
    quarterRound(work, 1, 5, 9, 13);
    quarterRound(work, 2, 6, 10, 14);
    quarterRound(work, 3, 7, 11, 15);
    quarterRound(work, 0, 5, 10, 15);
    quarterRound(work, 1, 6, 11, 12);
    quarterRound(work, 2, 7, 8, 13);
    quarterRound(work, 3, 4, 9, 14);
  }
  const out = Buffer.allocUnsafe(64);
  for (let i = 0; i < 16; i++) out.writeUInt32LE(work[i] + state2[i] >>> 0, i * 4);
  return out;
};
const chacha20 = (key, counter, nonce, data2) => {
  const out = Buffer.allocUnsafe(data2.length);
  for (let off = 0; off < data2.length; off += 64) {
    const ks = chachaBlock(key, counter + (off >>> 6) >>> 0, nonce);
    const end = Math.min(off + 64, data2.length);
    for (let i = off; i < end; i++) out[i] = data2[i] ^ ks[i - off];
  }
  return out;
};
const beToBig = (buf) => {
  let n = 0n;
  for (const b of buf) n = n << 8n | BigInt(b);
  return n;
};
const bigToBe = (n, len) => {
  const out = Buffer.alloc(len);
  for (let i = len - 1; i >= 0; i--) {
    out[i] = Number(n & 0xffn);
    n >>= 8n;
  }
  return out;
};
const modPow = (base, exp, mod) => {
  let result2 = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp & 1n) result2 = result2 * base % mod;
    base = base * base % mod;
    exp >>= 1n;
  }
  return result2;
};
const rsaWrap = (keyA) => bigToBe(modPow(beToBig(keyA), RSA_E, RSA_N), 32);
const compressBody = (buf) => {
  const zstd = zlib.zstdCompressSync;
  if (!zstd) throw new Error("当前运行时不支持 zstd,无法进行 NCBL 上报");
  return zstd(buf);
};
const encryptNCBL = (meta, body) => {
  const metaBuf = Buffer.isBuffer(meta) ? meta : Buffer.from(meta, "utf-8");
  const bodyBuf = Buffer.isBuffer(body) ? body : Buffer.from(body, "utf-8");
  const keyA = randomBytes(32);
  if (keyA[0] >= 163) keyA[0] = 162;
  const keyB = rsaWrap(keyA);
  const uuid = randomBytes(16);
  uuid[6] = uuid[6] & 15 | 64;
  uuid[8] = uuid[8] & 63 | 128;
  const nonce = uuid.subarray(0, 12);
  const counter = uuid.readUInt32LE(12) >>> 2;
  const baseSeq = randomBytes(2).readUInt16LE(0);
  const metaCipher = chacha20(keyB, counter, nonce, metaBuf);
  const metaHead = Buffer.allocUnsafe(4);
  metaHead.writeUInt16LE(META_BLOCK_TYPE, 0);
  metaHead.writeUInt16LE(metaCipher.length, 2);
  const metaBlock = Buffer.concat([metaHead, metaCipher]);
  const headerLen = HEADER_FIXED_LEN + metaBlock.length;
  const compressed = compressBody(bodyBuf);
  const frames = [];
  let seq = baseSeq;
  for (let off = 0; off < compressed.length || off === 0; off += DEFAULT_MAX_FRAME) {
    const slice = compressed.subarray(off, off + DEFAULT_MAX_FRAME);
    const cipher = chacha20(keyA, counter, nonce, slice);
    const head = Buffer.allocUnsafe(6);
    head.writeUInt16LE(cipher.length, 0);
    head.writeUInt32LE(seq >>> 0, 2);
    frames.push(head, cipher);
    seq++;
    if (compressed.length === 0) break;
  }
  const trailing = Buffer.concat(frames);
  const frameCount = seq - baseSeq;
  const header = Buffer.alloc(HEADER_FIXED_LEN);
  MAGIC.copy(header, 0);
  header.writeUInt32LE(NCBL_VERSION, 4);
  header.writeUInt16LE(headerLen, 8);
  uuid.copy(header, 10);
  keyB.copy(header, 26);
  header.writeUInt32LE(baseSeq >>> 0, 58);
  header.writeUInt32LE(baseSeq + frameCount - 1 >>> 0, 62);
  header.writeUInt32LE(trailing.length, 66);
  return Buffer.concat([header, metaBlock, trailing]);
};
const buildRecord = ({ time, action, data: data2 }) => {
  const json = typeof data2 === "string" ? data2 : JSON.stringify(data2);
  return [time, action, json].join(FIELD_SEP);
};
const buildRecords = (records) => records.map(buildRecord).join("");
const extractContext = (cookieObj) => {
  const playbackLog = createPlaybackLogContext(cookieObj);
  return {
    app: {
      id: cookieObj.appid || "",
      urs: "",
      pid: "",
      nsm: cookieObj.WEVNSM || "1.0.0",
      cid: cookieObj.WNMCID || `${randomBytes(3).toString("hex")}.${Date.now()}.01.0`,
      channel: playbackLog.app.channel,
      version: playbackLog.app.version,
      versionCode: playbackLog.app.versionCode,
      buildCode: cookieObj.buildver || "",
      buildType: "release",
      packageId: ""
    },
    device: {
      id: cookieObj.deviceId || cookieObj.sDeviceId || "",
      ti: cookieObj.NMTID || "",
      sign: cookieObj.clientSign || "",
      model: cookieObj.mode || cookieObj.mobilename || "",
      nnid: cookieObj._ntes_nnid || ",",
      nuid: cookieObj._ntes_nuid || "",
      csrf: cookieObj.__csrf || "",
      systemType: cookieObj.os || "pc",
      systemVersion: cookieObj.osver || "Microsoft-Windows-10-Professional-build-19045-64bit"
    },
    auth: {
      token: cookieObj.MUSIC_U || "",
      sessionId: cookieObj["JSESSIONID-WYYY"] || "",
      vipType: playbackLog.auth.vipType
    },
    startTime: Date.now(),
    processId: Math.floor(Math.random() * 9e4) + 1e4
  };
};
const randomHexId = () => randomUUID().replace(/-/g, "");
const buildMultipart = (payload) => {
  const boundary = randomHexId();
  const fileName = `op_${Math.floor(Math.random() * 9e4) + 1e4}_0_${Math.floor(Math.random() * 4294967295) + 1}`;
  const crlf = "\r\n";
  const header = [
    `--${boundary}`,
    `Content-Disposition: form-data; name="file"; filename="${fileName}"`,
    "Content-Type: multipart/form-data",
    "",
    ""
  ].join(crlf);
  const footer = `${crlf}--${boundary}--${crlf}`;
  return {
    boundary,
    fileName,
    body: Buffer.concat([Buffer.from(header, "utf-8"), payload, Buffer.from(footer, "utf-8")])
  };
};
const buildCookieStr = (ctx) => [
  `JSESSIONID-WYYY=${ctx.auth.sessionId}`,
  `MUSIC_U=${ctx.auth.token}`,
  `NMTID=${ctx.device.ti}`,
  `WEVNSM=${ctx.app.nsm}`,
  `WNMCID=${ctx.app.cid}`,
  `__csrf=${ctx.device.csrf}`,
  "__remember_me=true",
  "_iuqxldmzr_=33",
  `_ntes_nnid=${ctx.device.nnid}`,
  `_ntes_nuid=${ctx.device.nuid}`,
  `appver=${ctx.app.version}.${ctx.app.versionCode}`,
  `channel=${ctx.app.channel}`,
  `clientSign=${ctx.device.sign}`,
  `deviceId=${ctx.device.id}`,
  `mode=${ctx.device.model}`,
  "ntes_kaola_ad=1",
  `os=${ctx.device.systemType}`,
  `osver=${ctx.device.systemVersion}`
].join("; ");
const buildMetaJson = (ctx) => JSON.stringify({
  "JSESSIONID-WYYY": ctx.auth.sessionId,
  MUSIC_U: ctx.auth.token,
  NMTID: ctx.device.ti,
  WEVNSM: ctx.app.nsm,
  WNMCID: ctx.app.cid,
  __csrf: ctx.device.csrf,
  _iuqxldmzr_: "33",
  _ntes_nnid: ctx.device.nnid,
  _ntes_nuid: ctx.device.nuid,
  appver: `${ctx.app.version}.${ctx.app.versionCode}`,
  channel: ctx.app.channel,
  clientSign: ctx.device.sign,
  deviceId: ctx.device.id,
  mode: ctx.device.model,
  ntes_kaola_ad: "1",
  os: ctx.device.systemType,
  osver: ctx.device.systemVersion
});
const doUpload = async (ctx, metaJson, body, cookieStr) => {
  const payload = encryptNCBL(metaJson, body);
  const multipart = buildMultipart(payload);
  const resp = await fetchWithProxy(
    `${CLIENT_LOG3_DOMAIN}/api/clientlog/encrypt/upload?multiupload=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${multipart.boundary}`,
        Referer: "https://music.163.com/di",
        "User-Agent": `Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36 Chrome/91.0.4472.164 NeteaseMusicDesktop/${ctx.app.version}`,
        "Accept-Encoding": "gzip,deflate",
        "Accept-Language": "zh-CN,zh;q=0.8",
        Cookie: cookieStr
      },
      body: new Uint8Array(multipart.body),
      signal: AbortSignal.timeout(15e3)
    }
  );
  const text = await resp.text();
  let respBody;
  try {
    respBody = JSON.parse(text);
  } catch {
    respBody = { code: resp.status, raw: text };
  }
  const success = respBody?.code === 200 && respBody?.data?.successfiles?.includes?.(multipart.fileName);
  return { success, fileName: multipart.fileName, payload, respBody };
};
const scrobbleV1 = async (query) => {
  const resourceId = Number(query.id);
  if (!resourceId || Number.isNaN(resourceId)) {
    return { status: 400, body: { code: 400, msg: "缺少有效的资源 ID" }, cookie: [] };
  }
  const playTime = Number(query.time);
  if (Number.isNaN(playTime) || playTime <= 0) {
    return { status: 400, body: { code: 400, msg: "缺少有效的 time (播放时长)" }, cookie: [] };
  }
  const totalTime = Number(query.total) || playTime;
  const sourceId = String(query.sourceid || query.sourceId || "");
  const resourceType = query.resourceType === "dj" ? "dj" : "song";
  const sourceType = typeof query.sourceType === "string" ? query.sourceType : "song";
  const ncblSourceType = toNcblSourceType(resourceType, sourceType);
  const rawFee = Number(query.fee);
  const fee = rawFee === 1 || rawFee === 4 || rawFee === 8 ? rawFee : 0;
  const rawCookie = query.cookie || "";
  const cookieObj = parseCookie(rawCookie);
  cookieObj.os = "pc";
  const ctx = extractContext(cookieObj);
  if (!ctx.auth.token) {
    return { status: 401, body: { code: 401, msg: "缺少 MUSIC_U 鉴权令牌" }, cookie: [] };
  }
  const resource = {
    id: resourceId,
    type: resourceType,
    categoryId: Number.isFinite(Number(query.categoryId)) ? Number(query.categoryId) : void 0,
    name: typeof query.name === "string" ? query.name : "",
    artist: typeof query.artist === "string" ? query.artist : "",
    bitrate: Number(query.bitrate) || 320,
    level: typeof query.level === "string" ? query.level : "exhigh",
    fee,
    time: totalTime
  };
  const source = {
    id: sourceId || String(resourceId),
    type: ncblSourceType,
    name: ncblSourceType
  };
  const metaJson = buildMetaJson(ctx);
  const cookieStr = buildCookieStr(ctx);
  const ts = Math.floor(Date.now() / 1e3);
  const played = Math.min(playTime, totalTime);
  const plvBody = buildRecords([
    { time: ts, action: "_plv", data: buildPlv(ctx, resource, source) }
  ]);
  const pldBody = buildRecords([
    { time: ts, action: "_pld", data: buildPld(ctx, resource, source, played) }
  ]);
  try {
    const plv = await doUpload(ctx, metaJson, plvBody, cookieStr);
    if (!plv.success) {
      const rate = plv.respBody?.data?.rate;
      return {
        status: 502,
        body: {
          code: 502,
          msg: `PLV 上报失败${rate != null ? ` (rate=${rate})` : ""}`,
          details: plv.respBody
        },
        cookie: []
      };
    }
    const pld = await doUpload(ctx, metaJson, pldBody, cookieStr);
    if (!pld.success) {
      return {
        status: 502,
        body: {
          code: 502,
          msg: "PLV 成功但 PLD 失败",
          details: { plv: plv.respBody, pld: pld.respBody }
        },
        cookie: []
      };
    }
    return {
      status: 200,
      body: {
        code: 200,
        data: "scrobble_v1 上报成功",
        details: {
          plv: { fileName: plv.fileName, payloadSize: plv.payload.length },
          pld: { fileName: pld.fileName, payloadSize: pld.payload.length }
        }
      },
      cookie: []
    };
  } catch (err) {
    return {
      status: 502,
      body: { code: 502, msg: `请求异常: ${err instanceof Error ? err.message : String(err)}` },
      cookie: []
    };
  }
};
const recommendSongs = (query, request2) => {
  if (query.cookie && typeof query.cookie === "object") {
    query.cookie.os = "ios";
  }
  return request2("/api/v3/discovery/recommend/songs", {}, createOption(query, "weapi"));
};
const personalized = (query, request2) => {
  const data2 = { limit: query.limit ?? 30, total: true, n: 1e3 };
  return request2("/api/personalized/playlist", data2, createOption(query, "weapi"));
};
const recommendResource = (query, request2) => {
  return request2("/api/v1/discovery/recommend/resource", {}, createOption(query, "weapi"));
};
const topArtists = (query, request2) => {
  const data2 = { offset: 0, total: true, limit: query.limit ?? 50 };
  return request2("/api/artist/top", data2, createOption(query, "weapi"));
};
const albumNew = (query, request2) => {
  const data2 = { area: "ALL", offset: 0, total: true, limit: query.limit ?? 30 };
  return request2("/api/album/new", data2, createOption(query, "weapi"));
};
const playlistDetail = (query, request2) => {
  const data2 = {
    id: query.id,
    n: 1e5,
    s: query.s ?? 8
  };
  return request2("/api/v6/playlist/detail", data2, createOption(query));
};
const playlistCreate = (query, request2) => {
  const data2 = {
    name: query.name,
    privacy: query.privacy ?? 0,
    type: query.type ?? "NORMAL"
  };
  return request2("/api/playlist/create", data2, createOption(query, "weapi"));
};
const playlistDelete = (query, request2) => {
  const data2 = { ids: `[${query.id}]` };
  return request2("/api/playlist/remove", data2, createOption(query, "weapi"));
};
const playlistTracks = async (query, request2) => {
  const tracks = String(query.tracks ?? "").split(",");
  const buildData = (ids) => ({
    op: query.op,
    pid: query.pid,
    trackIds: JSON.stringify(ids),
    imme: "true"
  });
  try {
    return await request2("/api/playlist/manipulate/tracks", buildData(tracks), createOption(query));
  } catch (err) {
    if (err instanceof NeteaseRequestError && err.response.body?.code === 512) {
      return request2(
        "/api/playlist/manipulate/tracks",
        buildData([...tracks, ...tracks]),
        createOption(query)
      );
    }
    throw err;
  }
};
const playlistSubscribe = (query, request2) => {
  const action = query.t === 2 ? "unsubscribe" : "subscribe";
  const data2 = { id: query.id };
  return request2(`/api/playlist/${action}`, data2, createOption(query, "eapi"));
};
const playlistNameUpdate = (query, request2) => {
  const data2 = { id: query.id, name: query.name };
  return request2("/api/playlist/update/name", data2, createOption(query, "eapi"));
};
const playlistDescUpdate = (query, request2) => {
  const data2 = { id: query.id, desc: query.desc ?? "" };
  return request2("/api/playlist/desc/update", data2, createOption(query, "eapi"));
};
const playlistOrderUpdate = (query, request2) => {
  const data2 = { ids: query.ids };
  return request2("/api/playlist/order/update", data2, createOption(query, "weapi"));
};
const likelist = (query, request2) => {
  const data2 = { uid: query.uid };
  return request2("/api/song/like/get", data2, createOption(query, "weapi"));
};
const like = (query, request2) => {
  const data2 = {
    trackId: query.id,
    like: query.like === true || query.like === "true",
    time: 3
  };
  return request2("/api/song/like", data2, createOption(query, "weapi"));
};
const like_v1 = (query, request2) => {
  const isLike = query.like !== false && query.like !== "false";
  const data2 = {
    alg: "itembased",
    trackId: query.id,
    like: isLike,
    time: "3"
  };
  return request2("/api/v1/radio/like", data2, createOption(query, "xeapi"));
};
const album$2 = (query, request2) => request2(`/api/v1/album/${query.id}`, {}, createOption(query, "weapi"));
const albumSub = (query, request2) => {
  const path2 = query.t === 2 ? "/api/album/unsub" : "/api/album/sub";
  const data2 = { id: query.id };
  return request2(path2, data2, createOption(query, "weapi"));
};
const artists = (query, request2) => request2(`/api/v1/artist/${query.id}`, {}, createOption(query, "weapi"));
const artistAlbum = (query, request2) => {
  const data2 = {
    limit: query.limit ?? 30,
    offset: query.offset ?? 0,
    total: true
  };
  return request2(`/api/artist/albums/${query.id}`, data2, createOption(query, "weapi"));
};
const artistSongs = (query, request2) => {
  const data2 = {
    id: query.id,
    private_cloud: "true",
    work_type: 1,
    order: query.order ?? "hot",
    offset: query.offset ?? 0,
    limit: query.limit ?? 50
  };
  return request2("/api/v1/artist/songs", data2, createOption(query, "weapi"));
};
const albumSublist = (query, request2) => {
  const data2 = {
    limit: query.limit ?? 50,
    offset: query.offset ?? 0,
    total: true
  };
  return request2("/api/album/sublist", data2, createOption(query, "weapi"));
};
const artistSub = (query, request2) => {
  const path2 = query.t === 2 ? "/api/artist/unsub" : "/api/artist/sub";
  const data2 = { artistId: query.id, artistIds: `[${query.id}]` };
  return request2(path2, data2, createOption(query, "weapi"));
};
const artistSublist = (query, request2) => {
  const data2 = {
    limit: query.limit ?? 50,
    offset: query.offset ?? 0,
    total: true
  };
  return request2("/api/artist/sublist", data2, createOption(query, "weapi"));
};
const modules$2 = {
  captcha_sent: captchaSent,
  captcha_verify: captchaVerify,
  login,
  login_cellphone: loginCellphone,
  login_qr_check: loginQrCheck$1,
  login_qr_create: loginQrCreate,
  login_qr_key: loginQrKey$1,
  login_refresh: loginRefresh,
  login_status: loginStatus,
  logout,
  register_anonimous: registerAnonimous,
  user_account: userAccount,
  user_cloud: userCloud,
  user_cloud_del: userCloudDel,
  cloud_upload_check: cloudUploadCheck,
  cloud_nos_token: cloudNosToken,
  cloud_upload_info: cloudUploadInfo,
  cloud_pub: cloudPub,
  cloud_upload_check_v2: cloudUploadCheckV2,
  cloud_song_import: cloudSongImport,
  user_detail: userDetail$2,
  user_detail_new: userDetailNew,
  user_followeds: userFolloweds,
  user_follows: userFollows,
  user_level: userLevel,
  user_playlist: userPlaylist,
  user_record: userRecord,
  user_subcount: userSubcount,
  cloudsearch,
  search: search$2,
  search_default: searchDefault,
  search_hot: searchHot,
  search_hot_detail: searchHotDetail,
  search_match: searchMatch,
  search_multimatch: searchMultimatch,
  search_suggest: searchSuggest,
  search_suggest_pc: searchSuggestPc,
  audio_match: audioMatch,
  lyric: lyric$2,
  lyric_new,
  cloud_lyric_get,
  comment_music,
  comment_hot,
  song_detail,
  song_url,
  song_url_v1: song_url,
  song_download_url,
  song_simi_get,
  song_wiki_info,
  playmode_intelligence: playmodeIntelligence,
  personal_fm: personalFm,
  personal_fm_mode: personalFm,
  fm_trash: fmTrash,
  scrobble,
  scrobble_v1: scrobbleV1,
  recommend_songs: recommendSongs,
  personalized,
  recommend_resource: recommendResource,
  top_artists: topArtists,
  album_new: albumNew,
  playlist_detail: playlistDetail,
  playlist_create: playlistCreate,
  playlist_delete: playlistDelete,
  playlist_tracks: playlistTracks,
  playlist_subscribe: playlistSubscribe,
  playlist_name_update: playlistNameUpdate,
  playlist_desc_update: playlistDescUpdate,
  playlist_order_update: playlistOrderUpdate,
  likelist,
  like,
  like_v1,
  album: album$2,
  album_sub: albumSub,
  artists,
  artist_album: artistAlbum,
  artist_songs: artistSongs,
  album_sublist: albumSublist,
  artist_sub: artistSub,
  artist_sublist: artistSublist
};
const SESSION_MUTATING = /* @__PURE__ */ new Set([
  "login",
  "login_cellphone",
  "login_qr_check",
  "login_refresh",
  "logout",
  "register_anonimous"
]);
const NON_CACHEABLE$2 = /* @__PURE__ */ new Set([
  "audio_match",
  "captcha_sent",
  "captcha_verify",
  "login",
  "login_cellphone",
  "login_qr_check",
  "login_qr_create",
  "login_qr_key",
  "login_refresh",
  "login_status",
  "logout",
  "register_anonimous",
  "song_url",
  "song_download_url",
  "scrobble",
  "scrobble_v1",
  "like",
  "playlist_create",
  "playlist_delete",
  "playlist_tracks",
  "playlist_subscribe",
  "playlist_name_update",
  "playlist_desc_update",
  "playlist_order_update",
  "playlist_detail",
  "user_playlist",
  "user_subcount",
  "user_cloud",
  "user_cloud_del",
  "cloud_upload_check",
  "cloud_nos_token",
  "cloud_upload_info",
  "cloud_pub",
  "cloud_upload_check_v2",
  "cloud_song_import",
  "album_sub",
  "playmode_intelligence",
  "personal_fm",
  "fm_trash",
  "recommend_songs"
]);
const SESSIONLESS = /* @__PURE__ */ new Set(["audio_match"]);
const CN_IP_PREFIXES = [
  "116.25",
  "121.8",
  "120.36",
  "39.144",
  "117.136",
  "223.104",
  "171.8",
  "182.140"
];
let cachedRealIp = "";
const sessionRealIp = () => {
  if (!cachedRealIp) {
    const prefix = CN_IP_PREFIXES[Math.floor(Math.random() * CN_IP_PREFIXES.length)];
    const third = Math.floor(Math.random() * 256);
    const fourth = 1 + Math.floor(Math.random() * 254);
    cachedRealIp = `${prefix}.${third}.${fourth}`;
  }
  return cachedRealIp;
};
let sessionCache$1 = null;
let anonymousSessionPromise = null;
const syncDeviceState = (session2) => {
  if (session2.deviceId) setDeviceId(session2.deviceId);
  setAnonymousToken(session2.MUSIC_A || "");
};
const loadSession = () => {
  if (!sessionCache$1) {
    sessionCache$1 = getSessionCookies("netease");
    syncDeviceState(sessionCache$1);
  }
  return sessionCache$1;
};
const persistSession = (cookies) => {
  sessionCache$1 = cookies;
  syncDeviceState(cookies);
  saveSessionCookies("netease", cookies);
};
const getNeteaseCookies = () => ({ ...loadSession() });
const mergeNeteaseCookies = (patch) => {
  persistSession({ ...loadSession(), ...patch });
  cacheClear();
};
const clearNeteaseCookies = () => {
  sessionCache$1 = {};
  setAnonymousToken("");
  resetXeapiKey();
  clearSessionCookies("netease");
  cacheClear();
};
const parseSetCookie = (arr) => {
  const out = {};
  for (const raw of arr) {
    const first = raw.split(";")[0];
    const eq = first.indexOf("=");
    if (eq <= 0) continue;
    const key = first.slice(0, eq).trim();
    const val = first.slice(eq + 1).trim();
    if (key) out[key] = val;
  }
  return out;
};
const ensureNeteaseAnonymousSession = async () => {
  const sessionState = loadSession();
  if (sessionState.MUSIC_U || sessionState.MUSIC_A || getAnonymousToken()) return;
  if (anonymousSessionPromise) return anonymousSessionPromise;
  anonymousSessionPromise = (async () => {
    const session2 = loadSession();
    const result2 = await modules$2.register_anonimous({ cookie: { ...session2 } }, createRequest);
    const body = result2.body;
    const patch = parseSetCookie(result2.cookie ?? []);
    const token = typeof body.token === "string" ? body.token : patch.MUSIC_A;
    if (!token) throw new Error("netease anonymous registration missing MUSIC_A");
    persistSession({
      ...loadSession(),
      ...patch,
      MUSIC_A: token,
      deviceId: getDeviceId()
    });
    cacheClear();
    neteaseLog.info("游客会话初始化成功");
  })().finally(() => {
    anonymousSessionPromise = null;
  });
  return anonymousSessionPromise;
};
const callNetease = async (name, params = {}) => {
  const fn = Object.hasOwn(modules$2, name) ? modules$2[name] : void 0;
  if (!fn) throw new Error(`unknown netease api: ${name}`);
  const isSessionEndpoint = name.startsWith("login") || name.startsWith("captcha") || name === "logout" || name === "register_anonimous";
  if (!isSessionEndpoint && !SESSIONLESS.has(name) && params.cookie === void 0) {
    await ensureNeteaseAnonymousSession();
  }
  const session2 = loadSession();
  const cacheable = !NON_CACHEABLE$2.has(name);
  const cacheKey = cacheable ? buildCacheKey(name, params) : "";
  if (cacheable) {
    const hit = cacheGet$2(cacheKey);
    if (hit) return hit;
  }
  const query = {
    ...params,
    cookie: typeof params.cookie === "string" ? cookieToJson(params.cookie) : params.cookie || { ...session2 }
  };
  if (store$1.get("system.neteaseRealIp") && query.realIP === void 0) {
    query.realIP = sessionRealIp();
  }
  const res = await fn(query, createRequest);
  if (SESSION_MUTATING.has(name)) {
    const patch = parseSetCookie(res.cookie ?? []);
    if (name === "register_anonimous") {
      const token = res.body.token;
      if (typeof token === "string") patch.MUSIC_A = token;
      patch.deviceId = getDeviceId();
    }
    if (Object.keys(patch).length) {
      persistSession({ ...loadSession(), ...patch });
      cacheClear();
    }
  }
  const value = { status: res.status, body: res.body };
  if (cacheable && res.status === 200) cacheSet$2(cacheKey, value);
  return value;
};
let current = null;
let lastPositionMs = 0;
let cycleId = 0;
const isLoggedIn = () => Boolean(getNeteaseCookies().MUSIC_U);
const isScrobbleEnabled = () => Boolean(store$1.get("system.neteaseScrobbleEnabled"));
const scrobbleApi = () => {
  const mode = store$1.get("system.neteaseScrobbleMode") || "ncbl";
  return mode === "ncbl" ? "scrobble_v1" : "scrobble";
};
const ensureScrobbleOk = (api, res) => {
  if (res.body?.code === 200 || res.body?.data === "success") return;
  const msg = res.body?.msg || res.body?.message || JSON.stringify(res.body);
  throw new Error(`${api}: ${msg}`);
};
const submit = (track, playedMs) => {
  if (!isLoggedIn()) return;
  const requestCycleId = cycleId;
  const playedSec = Math.max(1, Math.min(track.durationSec, Math.round(playedMs / 1e3)));
  const api = scrobbleApi();
  callNetease(api, {
    id: track.id,
    sourceid: track.sourceId,
    source: track.sourceType,
    sourceType: track.sourceType,
    resourceType: track.resourceType,
    time: playedSec,
    total: track.durationSec,
    name: track.title,
    artist: track.artist,
    bitrate: track.bitrate,
    level: track.level,
    fee: track.fee
  }).then((res) => {
    ensureScrobbleOk(api, res);
    if (requestCycleId === cycleId) neteaseLog.debug(`听歌打卡(${api}): ${track.title}`);
  }).catch((err) => {
    if (requestCycleId === cycleId) neteaseLog.warn(`听歌打卡失败(${api}):`, err);
  });
};
const progress = createPlayProgress({
  onThreshold: submit,
  shouldFire: isScrobbleEnabled,
  thresholdMs: neteaseScrobbleThresholdMs
});
const onTrackLoaded = (track, context, durationMs, autoPlay) => {
  cycleId++;
  current = toNeteaseScrobbleTrack(track, context, durationMs);
  progress.load(current?.durationSec ?? 0, current, autoPlay);
  lastPositionMs = 0;
};
const onState = (playing2) => {
  progress.setPlaying(playing2);
};
const onPosition = (positionMs) => {
  if (current && progress.hasFired()) {
    const limit = progress.thresholdMs();
    const returnedBeforeThreshold = lastPositionMs >= limit && positionMs < limit;
    const jumpedBack = positionMs + 1e3 < lastPositionMs;
    if (positionMs < limit && (returnedBeforeThreshold || jumpedBack)) {
      cycleId++;
      progress.rearm();
    }
  }
  lastPositionMs = positionMs;
  progress.tick();
};
const onEnded = () => {
  cycleId++;
  progress.end();
  current = null;
  lastPositionMs = 0;
};
let audioEngine = null;
let playerInstance = null;
const onCreatedCallbacks = [];
const getEngine = () => {
  if (!audioEngine) {
    audioEngine = loadNativeModule("audio-engine.node", "audio-engine");
    if (!audioEngine) {
      throw new Error("Failed to load audio-engine.node");
    }
    audioEngine.initLogger(nativeLogsDir, isDev);
  }
  return audioEngine;
};
const onPlayerCreated = (callback) => {
  onCreatedCallbacks.push(callback);
};
const getPlayer = () => {
  if (!playerInstance) {
    const mod = getEngine();
    playerInstance = new mod.AudioPlayer();
    playerInstance.setCoverCacheDir(getCoverCacheDir());
    for (const cb of onCreatedCallbacks) {
      cb(playerInstance);
    }
    playerLog.info("播放器实例已创建");
  }
  return playerInstance;
};
const resetPlayer = () => {
  if (playerInstance) {
    try {
      playerInstance.stop();
    } catch {
    }
  }
  playerLog.warn("销毁播放器实例，将在下次操作时重建");
  playerInstance = null;
};
const setNormalizationEnabled = (enabled2) => {
  if (playerInstance) {
    playerInstance.setNormalizationEnabled(enabled2);
  }
};
const setEqualizerEnabled = (enabled2) => {
  if (playerInstance) {
    playerInstance.setEqualizerEnabled(enabled2);
  }
};
const setEqualizerBands = (gainsDb) => {
  if (playerInstance) {
    playerInstance.setEqualizerBands(gainsDb);
  }
};
const setPreampGain = (preampDb) => {
  if (playerInstance) {
    playerInstance.setPreampGain(preampDb);
  }
};
const syncCoverCacheDir = () => {
  if (playerInstance) {
    playerInstance.setCoverCacheDir(getCoverCacheDir());
  }
};
const DEVICE_EVENT_DEBOUNCE_MS = 200;
const REINIT_DELAY_MS = 300;
let activePlayer = null;
let debounceTimer = null;
let lastDefaultId;
let reinitPromise = null;
let pendingReinitPlayer = null;
let retryTimer = null;
let outputBroken = false;
let pauseOnDeviceSwitch = false;
const setPauseOnDeviceSwitch = (enabled2) => {
  pauseOnDeviceSwitch = enabled2;
};
const cancelPendingReinit = () => {
  if (retryTimer !== null) {
    clearTimeout(retryTimer);
    retryTimer = null;
  }
  pendingReinitPlayer = null;
};
const readDefaultId = (player) => {
  try {
    return player.getDefaultDeviceId() ?? null;
  } catch {
    return null;
  }
};
const runReinit = (player, attempt) => {
  const startedDefault = readDefaultId(player);
  reinitPromise = player.reinitOutput().then(() => {
    outputBroken = false;
    playerLog.info("音频输出已重建");
  }).catch((error) => {
    if (attempt === 0 && activePlayer === player) {
      playerLog.warn(`音频输出重建失败，将在 ${REINIT_DELAY_MS}ms 后重试:`, error);
      retryTimer = setTimeout(() => {
        retryTimer = null;
        pendingReinitPlayer = null;
        if (activePlayer === player) runReinit(player, attempt + 1);
      }, REINIT_DELAY_MS);
      return;
    }
    outputBroken = true;
    playerLog.warn("音频输出重建失败，等待设备事件或用户操作恢复:", error);
  }).finally(() => {
    reinitPromise = null;
    if (retryTimer !== null) return;
    const pendingPlayer = pendingReinitPlayer;
    pendingReinitPlayer = null;
    if (pendingPlayer === null || activePlayer !== pendingPlayer) return;
    if (outputBroken || readDefaultId(pendingPlayer) !== startedDefault) {
      requestReinit(pendingPlayer);
    }
  });
};
const requestReinit = (player) => {
  if (pauseOnDeviceSwitch) player.pauseImmediately();
  if (reinitPromise !== null || retryTimer !== null) {
    pendingReinitPlayer = player;
    return;
  }
  retryTimer = setTimeout(() => {
    retryTimer = null;
    if (activePlayer === player) runReinit(player, 0);
  }, REINIT_DELAY_MS);
};
const handleDeviceChange = (notifyListChange, defaultChanged) => {
  const player = activePlayer;
  if (player === null) return;
  try {
    const currentDefault = player.getDefaultDeviceName() ?? null;
    const currentDefaultId = readDefaultId(player);
    if (lastDefaultId === void 0) {
      lastDefaultId = currentDefaultId;
      if (notifyListChange) {
        sendToMain("player:event", {
          type: "deviceChanged",
          data: { defaultDevice: currentDefault }
        });
      }
      return;
    }
    const selectedDevice = player.getSelectedDeviceName() ?? null;
    const defaultSwitched = lastDefaultId !== currentDefaultId;
    lastDefaultId = currentDefaultId;
    if (defaultSwitched) {
      playerLog.info(`默认音频设备变化，当前设备: ${currentDefault}`);
    }
    if (notifyListChange || defaultSwitched) {
      sendToMain("player:event", {
        type: "deviceChanged",
        data: { defaultDevice: currentDefault }
      });
    }
    const shouldReinit = defaultSwitched && currentDefaultId !== null && selectedDevice === null;
    if (shouldReinit || outputBroken && currentDefault !== null && selectedDevice === null) {
      requestReinit(player);
    }
    if (defaultChanged && selectedDevice === null && pauseOnDeviceSwitch) {
      player.pauseImmediately();
    }
  } catch (error) {
    playerLog.warn("检查音频设备变化失败:", error);
  }
};
let pendingDefaultChange = false;
const scheduleDeviceChange = (defaultChanged) => {
  pendingDefaultChange ||= defaultChanged;
  if (debounceTimer !== null) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debounceTimer = null;
    const mergedDefaultChange = pendingDefaultChange;
    pendingDefaultChange = false;
    handleDeviceChange(true, mergedDefaultChange);
  }, DEVICE_EVENT_DEBOUNCE_MS);
};
const startDeviceMonitoring = (player) => {
  stopDeviceMonitoring();
  activePlayer = player;
  lastDefaultId = readDefaultId(player);
  if (player.supportsDeviceWatcher()) {
    try {
      player.onDeviceChange(scheduleDeviceChange);
      playerLog.info("已启用原生音频设备事件监听");
      return;
    } catch (error) {
      playerLog.warn("原生音频设备监听启动失败，将依赖输出流错误恢复:", error);
    }
  }
};
const stopDeviceMonitoring = () => {
  if (debounceTimer !== null) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  if (activePlayer !== null) {
    try {
      activePlayer.stopDeviceWatcher();
    } catch (error) {
      playerLog.warn("停止原生音频设备监听失败:", error);
    }
  }
  activePlayer = null;
  lastDefaultId = void 0;
  outputBroken = false;
  pendingDefaultChange = false;
  cancelPendingReinit();
};
const toRow = (raw) => ({
  cacheKey: raw.cache_key,
  source: raw.source,
  filename: raw.filename,
  size: raw.size,
  mime: raw.mime,
  cachedAt: raw.cached_at,
  lastUsedAt: raw.last_used_at
});
const findByKey = (cacheKey) => {
  const raw = getDb().prepare("SELECT * FROM song_cache WHERE cache_key = ?").get(cacheKey);
  return raw ? toRow(raw) : null;
};
const findByFilename = (filename) => {
  const raw = getDb().prepare("SELECT * FROM song_cache WHERE filename = ?").get(filename);
  return raw ? toRow(raw) : null;
};
const touchLastUsed = (cacheKey, now) => {
  getDb().prepare("UPDATE song_cache SET last_used_at = ? WHERE cache_key = ?").run(now, cacheKey);
};
const upsert$1 = (row) => {
  getDb().prepare(
    `INSERT INTO song_cache (cache_key, source, filename, size, mime, cached_at, last_used_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(cache_key) DO UPDATE SET
         source = excluded.source,
         filename = excluded.filename,
         size = excluded.size,
         mime = excluded.mime,
         cached_at = excluded.cached_at,
         last_used_at = excluded.last_used_at`
  ).run(row.cacheKey, row.source, row.filename, row.size, row.mime, row.cachedAt, row.lastUsedAt);
};
const deleteByKey = (cacheKey) => {
  getDb().prepare("DELETE FROM song_cache WHERE cache_key = ?").run(cacheKey);
};
const totalSize = () => {
  const row = getDb().prepare("SELECT SUM(size) AS total FROM song_cache").get();
  return row?.total ?? 0;
};
const listAllFilenames = () => {
  const rows = getDb().prepare("SELECT filename FROM song_cache").all();
  return rows.map((entry) => entry.filename);
};
const listLruVictims = (limit) => {
  const rows = getDb().prepare("SELECT * FROM song_cache ORDER BY last_used_at ASC LIMIT ?").all(limit);
  return rows.map(toRow);
};
const clearAll$1 = () => {
  getDb().prepare("DELETE FROM song_cache").run();
};
const MAX_CONCURRENT = 2;
const EVICT_BATCH = 8;
const REJECTED_MIME_PREFIXES$1 = ["text/html", "application/json", "application/xml", "text/xml"];
const isRejectedMime$1 = (mime) => {
  if (!mime) return false;
  const lower = mime.toLowerCase();
  return REJECTED_MIME_PREFIXES$1.some((prefix) => lower.startsWith(prefix));
};
const looksLikeAudio$1 = async (filePath) => {
  let fd = null;
  try {
    fd = await fsp.open(filePath, "r");
    const buf = Buffer.alloc(4);
    const { bytesRead } = await fd.read(buf, 0, 4, 0);
    if (bytesRead === 0) return false;
    return buf[0] !== 60 && buf[0] !== 123 && buf[0] !== 91;
  } catch {
    return false;
  } finally {
    if (fd) await fd.close().catch(() => {
    });
  }
};
let cacheDir = getSongCacheDir();
const inFlight = /* @__PURE__ */ new Map();
const waiting = [];
const sizeLimitBytes = () => {
  const gb = store$1.get("cache.songCache.sizeLimitGb") ?? 10;
  return gb > 0 ? gb * 1024 * 1024 * 1024 : Number.POSITIVE_INFINITY;
};
const isCacheEnabled = () => store$1.get("cache.songCache.enabled") === true;
const filenameFor = (cacheKey) => {
  const hash2 = crypto$1.createHash("sha1").update(cacheKey).digest("hex").slice(0, 16);
  return `${hash2}.bin`;
};
const absPath = (filename) => path.join(cacheDir, filename);
const acquireSlot = async () => {
  if (inFlight.size < MAX_CONCURRENT) return;
  await new Promise((resolve2) => waiting.push(resolve2));
};
const releaseSlot = () => {
  const next = waiting.shift();
  if (next) next();
};
const cleanupOrphans = async () => {
  let entries;
  try {
    entries = await fsp.readdir(cacheDir);
  } catch {
    return;
  }
  let partRemoved = 0;
  let orphanFiles = 0;
  for (const name of entries) {
    if (name.endsWith(".part")) {
      try {
        await fsp.unlink(path.join(cacheDir, name));
        partRemoved += 1;
      } catch {
      }
    }
  }
  const known = new Set(listAllFilenames());
  for (const name of entries) {
    if (name.endsWith(".part")) continue;
    if (!known.has(name)) {
      try {
        await fsp.unlink(path.join(cacheDir, name));
        orphanFiles += 1;
      } catch {
      }
    }
  }
  let missingRows = 0;
  for (const filename of known) {
    if (!fs.existsSync(path.join(cacheDir, filename))) {
      const row = findByFilename(filename);
      if (row) deleteByKey(row.cacheKey);
      missingRows += 1;
    }
  }
  songCacheLog.info(
    `[init] dir=${cacheDir} orphans.part=${partRemoved} orphan-files=${orphanFiles} missing-rows=${missingRows}`
  );
};
const evictIfNeeded = async () => {
  const cap = sizeLimitBytes();
  let current2 = totalSize();
  if (current2 <= cap) return;
  let evicted = 0;
  let freed = 0;
  while (current2 > cap) {
    const victims = listLruVictims(EVICT_BATCH);
    if (victims.length === 0) break;
    for (const victim of victims) {
      try {
        await fsp.unlink(absPath(victim.filename));
      } catch {
      }
      deleteByKey(victim.cacheKey);
      current2 -= victim.size;
      freed += victim.size;
      evicted += 1;
    }
  }
  if (evicted > 0) songCacheLog.info(`[evict] count=${evicted} freed=${freed}`);
};
const runDownload = async (cacheKey, source, streamUrl, controller) => {
  const start = Date.now();
  const filename = filenameFor(cacheKey);
  const finalPath = absPath(filename);
  const partPath = `${finalPath}.part`;
  try {
    await fsp.mkdir(cacheDir, { recursive: true });
    const response = await fetch(streamUrl, { signal: controller.signal });
    if (!response.ok || !response.body) {
      songCacheLog.warn(`[fetch] fail key=${cacheKey} status=${response.status}`);
      return null;
    }
    const mime = response.headers.get("content-type");
    if (isRejectedMime$1(mime)) {
      songCacheLog.warn(`[fetch] reject mime key=${cacheKey} mime=${mime}`);
      return null;
    }
    const contentLengthHeader = response.headers.get("content-length");
    const declaredSize = contentLengthHeader ? Number(contentLengthHeader) : NaN;
    if (Number.isFinite(declaredSize) && declaredSize > sizeLimitBytes()) {
      songCacheLog.warn(`[fetch] skip oversize key=${cacheKey} declared=${declaredSize}`);
      return null;
    }
    const nodeStream = Readable.fromWeb(response.body);
    const writeStream = fs.createWriteStream(partPath);
    await pipeline(nodeStream, writeStream);
    const stat2 = await fsp.stat(partPath);
    if (stat2.size === 0) {
      await fsp.unlink(partPath).catch(() => {
      });
      songCacheLog.warn(`[fetch] empty key=${cacheKey}`);
      return null;
    }
    if (stat2.size > sizeLimitBytes()) {
      await fsp.unlink(partPath).catch(() => {
      });
      songCacheLog.warn(`[fetch] post oversize key=${cacheKey} actual=${stat2.size}`);
      return null;
    }
    if (!await looksLikeAudio$1(partPath)) {
      await fsp.unlink(partPath).catch(() => {
      });
      songCacheLog.warn(`[fetch] not audio key=${cacheKey} mime=${mime} size=${stat2.size}`);
      return null;
    }
    await fsp.rename(partPath, finalPath);
    const now = Date.now();
    upsert$1({
      cacheKey,
      source,
      filename,
      size: stat2.size,
      mime,
      cachedAt: now,
      lastUsedAt: now
    });
    await evictIfNeeded();
    songCacheLog.info(`[fetch] done key=${cacheKey} size=${stat2.size} ms=${Date.now() - start}`);
    return finalPath;
  } catch (err) {
    await fsp.unlink(partPath).catch(() => {
    });
    if (controller.signal.aborted) {
      songCacheLog.info(`[fetch] cancel key=${cacheKey}`);
    } else {
      songCacheLog.error(`[fetch] error key=${cacheKey}`, err);
    }
    return null;
  }
};
const init$2 = async () => {
  cacheDir = getSongCacheDir();
  await fsp.mkdir(cacheDir, { recursive: true });
  await cleanupOrphans();
  app.on("before-quit", () => {
    for (const entry of inFlight.values()) entry.controller.abort();
  });
};
const reloadDir = () => {
  cacheDir = getSongCacheDir();
};
const lookup = async (cacheKey) => {
  if (!isCacheEnabled()) return null;
  const row = findByKey(cacheKey);
  if (!row) return null;
  const full = absPath(row.filename);
  if (!fs.existsSync(full)) {
    deleteByKey(cacheKey);
    return null;
  }
  touchLastUsed(cacheKey, Date.now());
  return full;
};
const fetchAsync = (cacheKey, source, streamUrl) => {
  if (!isCacheEnabled()) return Promise.resolve(null);
  const existing = inFlight.get(cacheKey);
  if (existing) return existing.promise;
  const controller = new AbortController();
  const promise = (async () => {
    await acquireSlot();
    try {
      return await runDownload(cacheKey, source, streamUrl, controller);
    } finally {
      inFlight.delete(cacheKey);
      releaseSlot();
    }
  })();
  inFlight.set(cacheKey, { promise, controller });
  return promise;
};
const cancel$1 = (cacheKey) => {
  const entry = inFlight.get(cacheKey);
  if (entry) entry.controller.abort();
};
const invalidate = async (sourcePath) => {
  const filename = path.basename(sourcePath);
  const row = findByFilename(filename);
  if (!row) return;
  deleteByKey(row.cacheKey);
  await fsp.unlink(absPath(filename)).catch(() => {
  });
  songCacheLog.info(`[invalidate] path=${sourcePath}`);
};
const clearAll = async () => {
  for (const entry of inFlight.values()) entry.controller.abort();
  inFlight.clear();
  clearAll$1();
  try {
    const entries = await fsp.readdir(cacheDir);
    await Promise.all(entries.map((name) => fsp.unlink(path.join(cacheDir, name)).catch(() => {
    })));
  } catch {
  }
  songCacheLog.info("[clearAll] done");
};
const stats = () => ({
  size: totalSize(),
  path: cacheDir
});
const ARTIST_SEPARATOR = /\s*(?:feat\.?|ft\.?)\s+|[/&;,×|、，]\s*/i;
const parseArtists = (raw) => {
  if (!raw) return [];
  return raw.split(ARTIST_SEPARATOR).map((name) => name.trim()).filter(Boolean).map((name) => ({ name }));
};
const formatArtists = (artists2, separator = " / ") => {
  return artists2.map((artist2) => artist2.name).join(separator);
};
const parseAlbum = (raw) => {
  const name = raw.trim();
  return name ? { name } : void 0;
};
var ErrorCode = /* @__PURE__ */ ((ErrorCode2) => {
  ErrorCode2["DEVICE_NOT_FOUND"] = "DEVICE_NOT_FOUND";
  ErrorCode2["DEVICE_INIT_FAILED"] = "DEVICE_INIT_FAILED";
  ErrorCode2["FILE_NOT_FOUND"] = "FILE_NOT_FOUND";
  ErrorCode2["FILE_NO_AUDIO_STREAM"] = "FILE_NO_AUDIO_STREAM";
  ErrorCode2["FILE_DECODE_ERROR"] = "FILE_DECODE_ERROR";
  ErrorCode2["FILE_NOT_SELECTED"] = "FILE_NOT_SELECTED";
  ErrorCode2["NETWORK_ERROR"] = "NETWORK_ERROR";
  ErrorCode2["NETWORK_TIMEOUT"] = "NETWORK_TIMEOUT";
  ErrorCode2["URL_RESOLVE_FAILED"] = "URL_RESOLVE_FAILED";
  ErrorCode2["NO_PLUGIN_AVAILABLE"] = "NO_PLUGIN_AVAILABLE";
  ErrorCode2["NETEASE_LOGIN_EXPIRED"] = "NETEASE_LOGIN_EXPIRED";
  ErrorCode2["NETEASE_VIP_REQUIRED"] = "NETEASE_VIP_REQUIRED";
  ErrorCode2["NETEASE_TRIAL_DISABLED"] = "NETEASE_TRIAL_DISABLED";
  ErrorCode2["NETEASE_UNAVAILABLE"] = "NETEASE_UNAVAILABLE";
  ErrorCode2["TAG_READ_FAILED"] = "TAG_READ_FAILED";
  ErrorCode2["TAG_WRITE_FAILED"] = "TAG_WRITE_FAILED";
  ErrorCode2["SCAN_NO_DIRS"] = "SCAN_NO_DIRS";
  ErrorCode2["SCAN_DIR_EXISTS"] = "SCAN_DIR_EXISTS";
  ErrorCode2["SCAN_DIR_NOT_FOUND"] = "SCAN_DIR_NOT_FOUND";
  ErrorCode2["SCAN_DIR_NOT_SELECTED"] = "SCAN_DIR_NOT_SELECTED";
  ErrorCode2["LOAD_SUPERSEDED"] = "LOAD_SUPERSEDED";
  ErrorCode2["MAX_CONSECUTIVE_FAILURES"] = "MAX_CONSECUTIVE_FAILURES";
  ErrorCode2["UNKNOWN"] = "UNKNOWN";
  return ErrorCode2;
})(ErrorCode || {});
let activeCueRange = null;
const cueRangeFromTrack = (track) => {
  const start = track?.cueStartMs;
  const end = track?.cueEndMs;
  if (start == null || end == null || end <= start) return null;
  return { startMs: start, durationMs: end - start };
};
const toDisplayPositionMs = (positionMs) => {
  if (!activeCueRange) return positionMs;
  return Math.max(0, Math.min(activeCueRange.durationMs, positionMs - activeCueRange.startMs));
};
const toDisplayDurationMs = (durationMs) => activeCueRange?.durationMs ?? durationMs;
const toEnginePositionMs = (positionMs) => activeCueRange ? activeCueRange.startMs + positionMs : positionMs;
const fail$1 = (code, error) => {
  if (error) playerLog.error(`${code}:`, error);
  return { success: false, error: code };
};
const isNativeDeviceError = (error) => String(error).includes("[Device]");
const isNativeSourceNotFoundError = (error) => String(error).includes("[SourceNotFound]");
const isNativeNetworkError = (error) => String(error).includes("[NetworkUnreachable]");
const isNativeCancelledError = (error) => String(error).includes("[Cancelled]");
const classifyLoadError = (error, source) => {
  const msg = error instanceof Error ? error.message : String(error);
  if (isNativeCancelledError(error)) {
    return ErrorCode.LOAD_SUPERSEDED;
  }
  if (isNativeDeviceError(error) || /output device|NoDevice|DeviceNotAvailable/i.test(msg)) {
    return ErrorCode.DEVICE_NOT_FOUND;
  }
  if (isNativeSourceNotFoundError(error)) {
    return ErrorCode.FILE_NOT_FOUND;
  }
  if (isNativeNetworkError(error) || /^https?:\/\//i.test(source)) {
    return ErrorCode.NETWORK_ERROR;
  }
  return ErrorCode.FILE_DECODE_ERROR;
};
const registerNativeEvents = (inst) => {
  inst.onEvent((event) => {
    switch (event.type) {
      case "stateChanged": {
        const state2 = event.state ?? "idle";
        getThumbar()?.updateThumbar(state2 === "playing");
        setTrayPlayState(state2 === "playing" ? "playing" : "paused");
        if (state2 === "playing") {
          setPlayState({ status: "Playing" });
        } else if (state2 === "paused") {
          setPlayState({ status: "Paused" });
          if (store$1.get("system.taskbarProgress")) {
            const dur = toDisplayDurationMs(toMs(inst.getDuration()));
            const pos = toDisplayPositionMs(toMs(inst.getPosition()));
            if (dur > 0) setTaskbarProgress(pos / dur, true);
          }
        } else if (state2 === "stopped") {
          setPlayState({ status: "Paused" });
          setTaskbarProgress(-1);
        }
        onPlayStateChange(state2);
        onState$1(state2 === "playing");
        onState(state2 === "playing");
        const statusEvent = {
          type: "status",
          data: {
            state: state2,
            position: toDisplayPositionMs(toMs(inst.getPosition())),
            duration: toDisplayDurationMs(toMs(inst.getDuration())),
            volume: inst.getVolume(),
            speed: inst.getSpeed(),
            isFinished: false
          }
        };
        sendToMain("player:event", statusEvent);
        wsBroadcast(statusEvent);
        break;
      }
      case "ended": {
        sendToMain("player:event", { type: "ended" });
        wsBroadcast({ type: "ended" });
        setPlayState({ status: "Paused" });
        onEnded$1();
        onEnded();
        setTaskbarProgress(-1);
        break;
      }
      case "sourceError": {
        sendToMain("player:event", { type: "sourceError" });
        setPlayState({ status: "Paused" });
        onState(false);
        setTaskbarProgress(-1);
        break;
      }
      case "position": {
        const posMs = toDisplayPositionMs(toMs(event.position ?? 0));
        const durMs = toDisplayDurationMs(toMs(event.duration ?? 0));
        const positionEvent = {
          type: "position",
          data: { position: posMs, duration: durMs }
        };
        if (getMainWindow()?.isVisible()) sendToMain("player:event", positionEvent);
        wsBroadcast(positionEvent);
        setTimeline({ currentMs: posMs, totalMs: durMs });
        onPosition$3(posMs, true);
        onPosition$1();
        onPosition(posMs);
        if (store$1.get("system.taskbarProgress") && durMs > 0) setTaskbarProgress(posMs / durMs);
        break;
      }
      case "fftData": {
        const fftEvent = { type: "fftData", data: event.fftData ?? { ldata: [], rdata: [] } };
        if (getMainWindow()?.isVisible()) sendToMain("player:event", fftEvent);
        wsBroadcast(fftEvent);
        break;
      }
      case "outputFailed": {
        playerLog.warn("检测到音频输出流错误，触发恢复");
        requestReinit(inst);
        break;
      }
      case "outputStalled": {
        playerLog.warn("检测到音频输出停滞，触发恢复");
        requestReinit(inst);
        break;
      }
    }
  });
};
let loadSeq = 0;
const registerPlayerIpc = () => {
  onPlayerCreated(registerNativeEvents);
  onPlayerCreated(startDeviceMonitoring);
  ipcMain.handle("player:load", async (_event, source, options = {}) => {
    cancelPendingReinit();
    const autoPlay = options.autoPlay ?? true;
    const authoritative = options.meta ?? null;
    const cueRange = cueRangeFromTrack(authoritative);
    activeCueRange = cueRange;
    const isRemote = authoritative != null && authoritative.source !== "local";
    const seq = ++loadSeq;
    try {
      const inst = getPlayer();
      const loadingEvent = {
        type: "status",
        data: {
          state: "loading",
          position: 0,
          duration: 0,
          volume: inst.getVolume(),
          speed: inst.getSpeed(),
          isFinished: false
        }
      };
      sendToMain("player:event", loadingEvent);
      wsBroadcast(loadingEvent);
      const remoteCover = authoritative && authoritative.source !== "local" ? authoritative.coverOriginal ?? authoritative.cover : void 0;
      const coverFetchUrl = remoteCover && /^(https?|streaming-cover):\/\//i.test(remoteCover) ? remoteCover : void 0;
      const coverUrl2 = coverFetchUrl && /^https?:\/\//i.test(coverFetchUrl) ? coverFetchUrl : void 0;
      const applyDisplay = (title, artist2, album2, coverData, durationMs2) => {
        const header = artist2 ? `${title} - ${artist2}` : title || appName;
        setMetadata({ title, artist: artist2, album: album2, coverData, coverUrl: coverUrl2, durationMs: durationMs2 });
        setPlayState({ status: autoPlay ? "Playing" : "Paused" });
        getMainWindow()?.setTitle(header);
        setTraySongName(header);
        setTrayPlayState(autoPlay ? "playing" : "paused");
      };
      if (authoritative) {
        applyDisplay(
          authoritative.title || source.split(/[/\\]/).pop() || source,
          formatArtists(authoritative.artists ?? []),
          authoritative.album?.name ?? "",
          void 0,
          authoritative.duration ?? 0
        );
      } else {
        applyDisplay(source.split(/[/\\]/).pop() || source, "", "", void 0, 0);
      }
      const meta = await inst.load(source, cueRange ? false : autoPlay);
      if (cueRange) {
        await inst.seek(cueRange.startMs / 1e3);
        if (autoPlay) await inst.play();
      }
      const nativeDurationMs = toMs(meta.duration);
      const durationMs = toDisplayDurationMs(nativeDurationMs);
      const fallbackTitle = meta.title || source.split(/[/\\]/).pop() || source;
      const displayTitle = authoritative?.title ?? fallbackTitle;
      const displayArtist = authoritative ? formatArtists(authoritative.artists ?? []) : formatArtists(parseArtists(meta.artist ?? ""));
      const displayAlbum = authoritative?.album?.name ?? parseAlbum(meta.album ?? "")?.name ?? "";
      const localCover = isRemote ? null : inst.getCoverRaw() ?? null;
      applyDisplay(displayTitle, displayArtist, displayAlbum, localCover ?? void 0, durationMs);
      if (!isRemote) setTaskbarThumbnailCover(meta.cover);
      const primaryArtist = authoritative?.artists?.[0]?.name ?? parseArtists(meta.artist ?? "")[0]?.name ?? displayArtist;
      onTrackLoaded$1({
        title: displayTitle,
        artist: primaryArtist,
        album: displayAlbum,
        durationMs,
        autoPlay
      });
      onTrackLoaded(authoritative, options.context, durationMs, autoPlay);
      if (coverFetchUrl) {
        void fetchBytes(coverFetchUrl).then((buf) => {
          if (!buf) return;
          if (seq !== loadSeq) return;
          setMetadata({
            title: displayTitle,
            artist: displayArtist,
            album: displayAlbum,
            coverData: buf,
            coverUrl: coverUrl2,
            durationMs
          });
          setTaskbarThumbnailCover(buf);
        });
      }
      const quality = {
        sampleRate: meta.originalSampleRate,
        channels: meta.channels,
        bitsPerSample: meta.bitsPerSample,
        bitRate: meta.bitRate,
        codec: meta.codec
      };
      const data2 = {
        detail: {
          quality,
          embeddedLyric: meta.embeddedLyric,
          externalLyrics: meta.externalLyrics
        },
        mediaInfo: {
          title: meta.title || displayTitle,
          artists: authoritative?.artists?.length ? authoritative.artists : parseArtists(meta.artist ?? ""),
          album: authoritative?.album ?? parseAlbum(meta.album ?? ""),
          duration: durationMs,
          cover: isRemote ? void 0 : toCacheUrl(meta.cover),
          quality
        }
      };
      playerLog.debug(`加载成功: ${displayTitle}`);
      return { success: true, data: data2 };
    } catch (error) {
      if (seq === loadSeq) activeCueRange = null;
      const code = classifyLoadError(error, source);
      if (code === ErrorCode.FILE_DECODE_ERROR && source.startsWith(getSongCacheDir())) {
        void invalidate(source);
      }
      return fail$1(code, error);
    }
  });
  ipcMain.handle("player:play", async () => {
    try {
      await getPlayer().play();
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.DEVICE_NOT_FOUND, error);
    }
  });
  ipcMain.handle("player:pause", () => {
    try {
      getPlayer().pause();
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:stop", () => {
    try {
      cancelPendingReinit();
      activeCueRange = null;
      getPlayer().stop();
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:seek", async (_event, positionMs) => {
    try {
      const enginePositionMs = toEnginePositionMs(positionMs);
      const positionSecs = enginePositionMs / 1e3;
      await getPlayer().seek(positionSecs);
      setTimeline({
        currentMs: positionMs,
        totalMs: toDisplayDurationMs(toMs(getPlayer().getDuration())),
        seeked: true
      });
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:setVolume", (_event, volume) => {
    try {
      getPlayer().setVolume(volume);
      setVolume(volume);
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:setPauseOnDeviceSwitch", (_event, enabled2) => {
    setPauseOnDeviceSwitch(enabled2);
    return { success: true };
  });
  ipcMain.handle("player:getVolume", () => {
    return { success: true, data: getPlayer().getVolume() };
  });
  ipcMain.handle("player:setFadeDuration", (_event, durationMs) => {
    try {
      getPlayer().setFadeDuration(durationMs);
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:getFadeDuration", () => {
    return { success: true, data: getPlayer().getFadeDuration() };
  });
  ipcMain.handle("player:getStatus", () => {
    const raw = getPlayer().getStatus();
    return {
      success: true,
      data: {
        state: raw.state,
        position: toDisplayPositionMs(toMs(raw.position)),
        duration: toDisplayDurationMs(toMs(raw.duration)),
        volume: raw.volume,
        speed: getPlayer().getSpeed(),
        isFinished: raw.isFinished
      }
    };
  });
  ipcMain.handle("player:reinit", async () => {
    try {
      await getPlayer().reinitOutput();
      return { success: true };
    } catch (error) {
      return fail$1(
        isNativeDeviceError(error) ? ErrorCode.DEVICE_INIT_FAILED : ErrorCode.UNKNOWN,
        error
      );
    }
  });
  ipcMain.handle("player:setNormalizationEnabled", (_event, enabled2) => {
    try {
      getPlayer().setNormalizationEnabled(enabled2);
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:setEqualizerEnabled", (_event, enabled2) => {
    try {
      getPlayer().setEqualizerEnabled(enabled2);
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:setEqualizerBands", (_event, gainsDb) => {
    try {
      getPlayer().setEqualizerBands(gainsDb);
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:setPreampGain", (_event, preampDb) => {
    try {
      getPlayer().setPreampGain(preampDb);
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:setSpeed", (_event, speed) => {
    try {
      getPlayer().setSpeed(speed);
      setRate(speed);
      onSpeedChange(speed);
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:setPitch", (_event, semitones) => {
    try {
      getPlayer().setPitch(semitones);
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:setPitchSync", (_event, sync) => {
    try {
      getPlayer().setPitchSync(sync);
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:setFftEnabled", (_event, enabled2) => {
    try {
      getPlayer().setFftEnabled(enabled2);
      return { success: true };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:getFftData", () => {
    return { success: true, data: getPlayer().getFftData() };
  });
  const LYRIC_FILE_EXTS = /* @__PURE__ */ new Set([
    ".ttml",
    ".lys",
    ".qrc",
    ".krc",
    ".yrc",
    ".lrc",
    ".ass",
    ".srt"
  ]);
  ipcMain.handle("player:readLyricFile", async (_event, filePath) => {
    try {
      const ext = extname(filePath).toLowerCase();
      if (!LYRIC_FILE_EXTS.has(ext)) {
        return fail$1(ErrorCode.UNKNOWN, new Error(`不支持的歌词文件类型: ${ext}`));
      }
      const content = await readFileAutoEncoding(filePath);
      return { success: true, data: content };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:getCoverRaw", () => {
    try {
      const inst = getPlayer();
      const raw = inst.getCoverRaw();
      if (!raw) return { success: true, data: null };
      const base64 = Buffer.from(raw).toString("base64");
      return { success: true, data: `data:image/jpeg;base64,${base64}` };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:getOutputDevices", () => {
    try {
      return { success: true, data: getPlayer().getOutputDevices() };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle("player:getDefaultDeviceName", () => {
    try {
      return { success: true, data: getPlayer().getDefaultDeviceName() ?? null };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.handle(
    "player:setOutputDevice",
    async (_event, deviceId2, pauseBeforeSwitch = false) => {
      try {
        cancelPendingReinit();
        if (pauseBeforeSwitch) getPlayer().pauseImmediately();
        await getPlayer().setOutputDevice(deviceId2 ?? void 0);
        return { success: true };
      } catch (error) {
        return fail$1(
          isNativeDeviceError(error) ? ErrorCode.DEVICE_INIT_FAILED : ErrorCode.UNKNOWN,
          error
        );
      }
    }
  );
  ipcMain.handle("player:getSelectedDeviceName", () => {
    try {
      return { success: true, data: getPlayer().getSelectedDeviceName() ?? null };
    } catch (error) {
      return fail$1(ErrorCode.UNKNOWN, error);
    }
  });
  ipcMain.on("player:syncPlayMode", (_event, repeat, shuffle) => {
    setTrayPlayMode(repeat, shuffle);
  });
  ipcMain.on("player:syncLikeState", (_event, liked2) => {
    setTrayLikeState(liked2);
    getThumbar()?.updateLike(liked2);
  });
  ipcMain.on("player:dispatch", (_event, type) => {
    sendToMain("player:event", { type });
  });
  onEvent((event) => {
    try {
      const inst = getPlayer();
      switch (event.type) {
        case "Play":
          void inst.play().catch(() => {
          });
          break;
        case "Pause":
          inst.pause();
          break;
        case "Stop":
          inst.stop();
          break;
        case "Seek":
          if (event.positionMs != null) {
            const targetMs = event.positionMs;
            sendToMain("player:event", { type: "seek", data: { position: targetMs } });
            void inst.seek(targetMs / 1e3).then(() => {
              setTimeline({
                currentMs: targetMs,
                totalMs: toMs(inst.getDuration()),
                seeked: true
              });
            });
          }
          break;
        case "SetVolume":
          if (event.volume != null) {
            if (0 <= event.volume && event.volume <= 1) {
              inst.setVolume(event.volume);
              setVolume(event.volume);
              sendToMain("player:event", {
                type: "status",
                data: {
                  state: inst.getStatus().state,
                  position: toDisplayPositionMs(toMs(inst.getPosition())),
                  duration: toDisplayDurationMs(toMs(inst.getDuration())),
                  volume: event.volume,
                  speed: inst.getSpeed(),
                  isFinished: false
                }
              });
            } else {
              playerLog.warn(`无效的音量值: ${event.volume}`);
            }
          }
          break;
        case "SetRate":
          if (event.rate != null) {
            if (0.5 <= event.rate && event.rate <= 2) {
              inst.setSpeed(event.rate);
              setRate(event.rate);
              onSpeedChange(event.rate);
              sendToMain("player:event", {
                type: "status",
                data: {
                  state: inst.getStatus().state,
                  position: toDisplayPositionMs(toMs(inst.getPosition())),
                  duration: toDisplayDurationMs(toMs(inst.getDuration())),
                  volume: inst.getVolume(),
                  speed: event.rate,
                  isFinished: false
                }
              });
            } else {
              playerLog.warn(`无效的播放速率值: ${event.rate}`);
            }
          }
          break;
        case "NextTrack":
          sendToMain("player:event", { type: "next" });
          break;
        case "PrevTrack":
          sendToMain("player:event", { type: "prev" });
          break;
      }
    } catch {
    }
  });
  const resumeHandler = async () => {
    const inst = getPlayer();
    const MAX_RETRIES = 3;
    const RETRY_DELAYS = [500, 1500, 3e3];
    for (let i = 0; i < MAX_RETRIES; i++) {
      await new Promise((r) => setTimeout(r, RETRY_DELAYS[i]));
      try {
        await inst.reinitOutput();
        playerLog.info(`唤醒后重建音频输出成功（第 ${i + 1} 次尝试）`);
        return;
      } catch (error) {
        playerLog.warn(`重建音频输出第 ${i + 1} 次失败:`, error);
      }
    }
    playerLog.error("重建音频输出全部失败，销毁播放器实例");
    resetPlayer();
    stopDeviceMonitoring();
    const stoppedEvent = {
      type: "status",
      data: { state: "stopped", position: 0, duration: 0, volume: 1, speed: 1, isFinished: false }
    };
    sendToMain("player:event", stoppedEvent);
    wsBroadcast(stoppedEvent);
  };
  powerMonitor.on("resume", resumeHandler);
  app.on("before-quit", stopDeviceMonitoring);
};
const externalControlGate = async (c, next) => {
  if (!store$1.get("externalApi.enabled")) {
    return c.json({ error: "external API disabled" }, 403);
  }
  await next();
  return;
};
const wsGate = async (c, next) => {
  if (!store$1.get("externalApi.wsEnabled")) {
    return c.json({ error: "WebSocket disabled" }, 403);
  }
  await next();
  return;
};
const seek = (positionMs) => {
  sendToMain("player:event", { type: "seek", data: { position: positionMs } });
  return getPlayer().seek(positionMs / 1e3);
};
const playerControl = {
  play: () => void getPlayer().play().catch(() => {
  }),
  pause: () => getPlayer().pause(),
  stop: () => getPlayer().stop(),
  next: () => sendToMain("player:event", { type: "next" }),
  prev: () => sendToMain("player:event", { type: "prev" }),
  setShuffle: (mode) => sendToMain("player:event", { type: "setShuffle", data: { mode } }),
  setRepeat: (mode) => sendToMain("player:event", { type: "setRepeat", data: { mode } }),
  playTrack: (track) => sendToMain("player:event", { type: "playTrack", data: { track } }),
  addToQueue: (tracks, position) => sendToMain("player:event", { type: "addToQueue", data: { tracks, position } }),
  seek,
  setVolume: (volume) => getPlayer().setVolume(volume),
  /** 当前播放进度（毫秒） */
  getPosition: () => toMs(getPlayer().getPosition())
};
const buildRoutes = () => {
  const api = new Hono();
  api.get(
    "/info",
    (c) => c.json({
      name: app.getName(),
      version: app.getVersion(),
      wsClients: getWsClientCount()
    })
  );
  api.get("/status", (c) => {
    const raw = getPlayer().getStatus();
    return c.json({
      state: raw.state,
      position: toMs(raw.position),
      duration: toMs(raw.duration),
      volume: raw.volume,
      isFinished: raw.isFinished
    });
  });
  api.get("/volume", (c) => c.json({ volume: getPlayer().getVolume() }));
  api.get("/now-playing", (c) => c.json(lightSnapshot()));
  api.get("/lyrics", (c) => c.json(lyricSnapshot()));
  api.post("/play", (c) => {
    playerControl.play();
    return c.json({ ok: true });
  });
  api.post("/pause", (c) => {
    playerControl.pause();
    return c.json({ ok: true });
  });
  api.post("/stop", (c) => {
    playerControl.stop();
    return c.json({ ok: true });
  });
  api.post("/seek", async (c) => {
    const body = await c.req.json().catch(() => null);
    const positionMs = Number(body?.positionMs);
    if (!Number.isFinite(positionMs) || positionMs < 0) {
      return c.json({ error: "positionMs (number, >=0) required" }, 400);
    }
    try {
      await playerControl.seek(positionMs);
    } catch (err) {
      return c.json({ error: err instanceof Error ? err.message : String(err) }, 500);
    }
    return c.json({ ok: true });
  });
  api.post("/volume", async (c) => {
    const body = await c.req.json().catch(() => null);
    const volume = Number(body?.volume);
    if (!Number.isFinite(volume) || volume < 0 || volume > 1) {
      return c.json({ error: "volume (number, 0..1) required" }, 400);
    }
    playerControl.setVolume(volume);
    return c.json({ ok: true });
  });
  api.post("/next", (c) => {
    playerControl.next();
    return c.json({ ok: true });
  });
  api.post("/prev", (c) => {
    playerControl.prev();
    return c.json({ ok: true });
  });
  return api;
};
const ack = (ws, op) => {
  ws.send(JSON.stringify({ kind: "ack", op }));
};
const fail = (ws, op, error) => {
  ws.send(JSON.stringify({ kind: "error", op, error }));
};
const dispatchCommand = async (ws, msg) => {
  try {
    switch (msg.op) {
      case "play":
        playerControl.play();
        return ack(ws, msg.op);
      case "pause":
        playerControl.pause();
        return ack(ws, msg.op);
      case "stop":
        playerControl.stop();
        return ack(ws, msg.op);
      case "next":
        playerControl.next();
        return ack(ws, msg.op);
      case "prev":
        playerControl.prev();
        return ack(ws, msg.op);
      case "seek": {
        const positionMs = Number(msg.positionMs);
        if (!Number.isFinite(positionMs) || positionMs < 0) {
          return fail(ws, msg.op, "positionMs (number, >=0) required");
        }
        await playerControl.seek(positionMs);
        return ack(ws, msg.op);
      }
      case "setVolume": {
        const volume = Number(msg.volume);
        if (!Number.isFinite(volume) || volume < 0 || volume > 1) {
          return fail(ws, msg.op, "volume (number, 0..1) required");
        }
        playerControl.setVolume(volume);
        return ack(ws, msg.op);
      }
      default:
        return fail(ws, msg.op ?? "?", "unknown op");
    }
  } catch (err) {
    fail(ws, msg.op ?? "?", err instanceof Error ? err.message : String(err));
  }
};
const wsHandlers = {
  onOpen(_evt, ws) {
    addWsClient(ws);
    ws.send(JSON.stringify({ kind: "hello", clients: getWsClientCount() }));
  },
  async onMessage(evt, ws) {
    let msg;
    try {
      msg = JSON.parse(typeof evt.data === "string" ? evt.data : evt.data.toString());
    } catch {
      return fail(ws, "?", "invalid json");
    }
    await dispatchCommand(ws, msg);
  },
  onClose(_evt, ws) {
    removeWsClient(ws);
  },
  onError(_evt, ws) {
    serverLog.warn("WS 客户端错误");
    removeWsClient(ws);
  }
};
let runningServer$1 = null;
let runningWss = null;
let runningPort$1 = null;
let runningHost = null;
let runningAllowLan = false;
let lastError$1 = null;
const getLanAddress = () => {
  const candidates = [];
  for (const list2 of Object.values(os.networkInterfaces())) {
    for (const item of list2 ?? []) {
      if (item.family === "IPv4" && !item.internal) candidates.push(item.address);
    }
  }
  return candidates.find((address) => address.startsWith("192.168.")) ?? candidates.find((address) => address.startsWith("10.")) ?? candidates[0] ?? null;
};
const getServerStatus = () => ({
  listening: runningServer$1 !== null,
  allowLan: runningAllowLan,
  host: runningHost,
  port: runningPort$1,
  error: lastError$1
});
const publishStatus$1 = () => broadcast("externalApi:status", getServerStatus());
const startServer = () => {
  return new Promise((resolve2) => {
    if (runningServer$1) {
      resolve2(getServerStatus());
      return;
    }
    if (!store$1.get("externalApi.enabled")) {
      resolve2(getServerStatus());
      return;
    }
    const port = store$1.get("externalApi.port");
    const hostname = store$1.get("externalApi.allowLan") ? "0.0.0.0" : "127.0.0.1";
    const app2 = new Hono();
    app2.use("/api/*", externalControlGate);
    app2.route("/api", buildRoutes());
    app2.get(
      "/ws",
      externalControlGate,
      wsGate,
      upgradeWebSocket(() => wsHandlers)
    );
    app2.get("/", (c) => c.text("SPlayer Next external API"));
    const wss = new WebSocketServer({ noServer: true });
    let settled = false;
    const server = serve({
      fetch: app2.fetch,
      port,
      hostname,
      websocket: { server: wss }
    });
    server.once("error", (err) => {
      if (settled) return;
      settled = true;
      const error = { code: err.code ?? "UNKNOWN", message: err.message };
      serverLog.error(`外部 API 监听 ${port} 失败 (${error.code}): ${error.message}`);
      wss.close();
      try {
        server.close();
      } catch {
      }
      runningServer$1 = null;
      runningWss = null;
      runningPort$1 = null;
      runningHost = null;
      runningAllowLan = false;
      lastError$1 = error;
      publishStatus$1();
      resolve2(getServerStatus());
    });
    server.once("listening", () => {
      if (settled) return;
      settled = true;
      runningServer$1 = server;
      runningWss = wss;
      runningPort$1 = port;
      runningAllowLan = hostname === "0.0.0.0";
      runningHost = runningAllowLan ? getLanAddress() ?? "0.0.0.0" : hostname;
      lastError$1 = null;
      publishStatus$1();
      serverLog.info(`外部 API 已启动: http://${hostname}:${port}`);
      resolve2(getServerStatus());
    });
  });
};
const stopServer = () => {
  if (!runningServer$1) return Promise.resolve();
  const server = runningServer$1;
  const wss = runningWss;
  runningServer$1 = null;
  runningWss = null;
  runningPort$1 = null;
  runningHost = null;
  runningAllowLan = false;
  publishStatus$1();
  const serverClosed = new Promise((resolve2) => {
    wss?.close();
    server.close((err) => {
      if (err) serverLog.warn("外部 API 关闭异常:", err);
      else serverLog.info("外部 API 已关闭");
      resolve2();
    });
  });
  return serverClosed;
};
const restartServer = async () => {
  await stopServer();
  return startServer();
};
const MAX_SESSIONS = 8;
const SESSION_IDLE_MS = 30 * 60 * 1e3;
const errorResponse = (status, code, message) => Response.json({ jsonrpc: "2.0", error: { code, message }, id: null }, { status });
const createMcpEndpoint$1 = (createServer2) => {
  const sessions = /* @__PURE__ */ new Map();
  const closeSession = async (id) => {
    const session2 = sessions.get(id);
    if (!session2) return;
    sessions.delete(id);
    await session2.server.close();
  };
  const evictExpired = async () => {
    const deadline = Date.now() - SESSION_IDLE_MS;
    const expired = [...sessions.entries()].filter(([, session2]) => session2.lastUsedAt < deadline).map(([id]) => id);
    await Promise.all(expired.map(closeSession));
  };
  const evictOldest = async () => {
    if (sessions.size < MAX_SESSIONS) return;
    const oldest = [...sessions.entries()].sort(
      ([, left], [, right]) => left.lastUsedAt - right.lastUsedAt
    )[0];
    if (oldest) await closeSession(oldest[0]);
  };
  return {
    async handle(request2) {
      await evictExpired();
      const sessionId2 = request2.headers.get("mcp-session-id");
      if (sessionId2) {
        const session2 = sessions.get(sessionId2);
        if (!session2) return errorResponse(404, -32001, "Session not found");
        session2.lastUsedAt = Date.now();
        const response2 = await session2.transport.handleRequest(request2);
        if (request2.method === "DELETE") await closeSession(sessionId2);
        return response2;
      }
      if (request2.method !== "POST") {
        return errorResponse(400, -32e3, "Mcp-Session-Id header required");
      }
      const body = await request2.clone().json().catch(() => null);
      if (!isInitializeRequest(body)) {
        return errorResponse(400, -32e3, "Initialization request required");
      }
      await evictOldest();
      const server = createServer2();
      let initializedId = null;
      const transport = new WebStandardStreamableHTTPServerTransport({
        sessionIdGenerator: randomUUID,
        enableJsonResponse: true,
        onsessioninitialized: (id) => {
          initializedId = id;
          sessions.set(id, { server, transport, lastUsedAt: Date.now() });
        }
      });
      await server.connect(transport);
      const response = await transport.handleRequest(request2, { parsedBody: body });
      if (!initializedId) await server.close();
      return response;
    },
    async close() {
      await Promise.all([...sessions.keys()].map(closeSession));
    }
  };
};
const KG_GATEWAY_URL = "https://gateway.kugou.com";
const KG_APPID = 1005;
const KG_CLIENTVER = 20489;
const KG_LITE_APPID = 3116;
const KG_LITE_CLIENTVER = 11440;
const isKugouConceptMode = () => store$1.get("system.kugouLoginVersion") === "concept";
const getKgAppid = () => isKugouConceptMode() ? KG_LITE_APPID : KG_APPID;
const getKgClientver = () => isKugouConceptMode() ? KG_LITE_CLIENTVER : KG_CLIENTVER;
const KG_MOBILECDN_URL = "http://mobilecdn.kugou.com/api/v3/search/song";
const KG_SEARCH_URL = "https://songsearch.kugou.com/song_search_v2";
const KG_LYRIC_SEARCH_URL = "http://lyrics.kugou.com/search";
const KG_LYRIC_DOWNLOAD_URL = "http://lyrics.kugou.com/download";
const KG_LYRIC_HEADERS = {
  "KG-RC": "1",
  "KG-THash": "expand_search_manager.cpp:852736169:451",
  "User-Agent": "KuGou2012-9020-ExpandSearchManager"
};
const ENTITY_MAP = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&apos;": "'",
  "&#039;": "'"
};
const decodeName = (str) => {
  if (!str) return "";
  return str.replace(/&nbsp;|&amp;|&lt;|&gt;|&quot;|&apos;|&#039;/g, (s) => ENTITY_MAP[s] ?? s);
};
const secureUrl$1 = (url) => url?.replace(/^http:\/\//, "https://") ?? "";
const fillCover = (url, size = 300) => {
  if (!url) return void 0;
  const replaced = url.replace(/\{size\}/g, String(size));
  return secureUrl$1(replaced);
};
const formatSingerName$1 = (singers, join2 = " / ") => {
  if (!singers?.length) return "";
  return singers.map((s) => s.name).filter((n) => !!n).map(decodeName).join(join2);
};
const intervalToSeconds = (interval) => {
  if (typeof interval === "number") return Math.floor(interval);
  if (!interval) return 0;
  const parts = String(interval).split(":").map(Number);
  let seconds = 0;
  let unit = 1;
  while (parts.length) {
    const v = parts.pop();
    if (Number.isFinite(v)) seconds += v * unit;
    unit *= 60;
  }
  return Math.floor(seconds);
};
const ANDROID_SIGN_SALT = "OIlwieks28dk2k092lksi2UIkp";
const LITE_SIGN_SALT = "LnT6xpN3khm36zse0QzvmgTZ3waWdRSA";
const WEB_SIGN_SALT = "NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt";
const SIGN_KEY_SALT = "57ae12eb6890223e355ccfcb74edf70d";
const LITE_SIGN_KEY_SALT = "185672dd44712f60bb1736df5a377e82";
const KG_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIAG7QOELSYoIJvTFJhMpe1s/gbjDJX51HBNnEl5HXqTW6lQ7LC8jr9fWZTwusknp+sVGzwd40MwP6U5yDE27M/X1+UR4tvOGOqp94TJtQ1EPnWGWXngpeIW5GxoQGao1rmYWAu6oi1z9XkChrsUdC6DJE5E221wf/4WLFxwAtRQIDAQAB
-----END PUBLIC KEY-----`;
const KG_LITE_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDECi0Np2UR87scwrvTr72L6oO01rBbbBPriSDFPxr3Z5syug0O24QyQO8bg27+0+4kBzTBTBOZ/WWU0WryL1JSXRTXLgFVxtzIY41Pe7lPOgsfTCn5kZcvKhYKJesKnnJDNr5/abvTGf+rHG3YRwsCHcQ08/q6ifSioBszvb3QiwIDAQAB
-----END PUBLIC KEY-----`;
const currentSalts = () => ({
  androidSign: isKugouConceptMode() ? LITE_SIGN_SALT : ANDROID_SIGN_SALT,
  signKey: isKugouConceptMode() ? LITE_SIGN_KEY_SALT : SIGN_KEY_SALT,
  publicKey: isKugouConceptMode() ? KG_LITE_PUBLIC_KEY : KG_PUBLIC_KEY
});
const rsaEncryptKugou = (data2) => {
  const input = Buffer.from(JSON.stringify(data2));
  const block = Buffer.alloc(128);
  input.copy(block);
  return publicEncrypt(
    { key: currentSalts().publicKey, padding: constants.RSA_NO_PADDING },
    block
  ).toString("hex");
};
const rsaEncryptKugouPkcs1 = (data2) => publicEncrypt(
  { key: currentSalts().publicKey, padding: constants.RSA_PKCS1_PADDING },
  Buffer.from(JSON.stringify(data2))
).toString("hex");
const encryptKugouDeviceData = (data2) => {
  const key = randomBytes(3).toString("hex");
  const digest = cryptoMd5(key);
  const cipher = createCipheriv("aes-128-cbc", digest.slice(0, 16), digest.slice(16, 32));
  const content = Buffer.concat([cipher.update(JSON.stringify(data2)), cipher.final()]).toString(
    "base64"
  );
  return { key, content };
};
const decryptKugouDeviceData = (content, key) => {
  const digest = cryptoMd5(key);
  const decipher = createDecipheriv("aes-128-cbc", digest.slice(0, 16), digest.slice(16, 32));
  const text = Buffer.concat([decipher.update(content), decipher.final()]).toString("utf8");
  return JSON.parse(text);
};
const cryptoMd5 = (data2) => {
  const content = typeof data2 === "string" || Buffer.isBuffer(data2) ? data2 : JSON.stringify(data2 ?? {});
  return createHash("md5").update(content).digest("hex");
};
const calculateMid = (guid = "550e8400-e29b-41d4-a716-446655440000") => {
  const digest = cryptoMd5(guid);
  return BigInt(`0x${digest}`).toString(10);
};
let cachedMid = null;
const getDeviceMid = () => {
  if (!cachedMid) {
    cachedMid = calculateMid("splayer-next-kugou-device-mid");
  }
  return cachedMid;
};
const signatureAndroidParams = (params, data2 = "") => {
  const paramsString = Object.keys(params).sort().map((key) => {
    const val = typeof params[key] === "object" ? JSON.stringify(params[key]) : params[key];
    return `${key}=${val ?? ""}`;
  }).join("");
  const bodyStr = typeof data2 === "string" ? data2 : data2.toString("utf8");
  return cryptoMd5(
    `${currentSalts().androidSign}${paramsString}${bodyStr}${currentSalts().androidSign}`
  );
};
const signatureWebParams = (params) => {
  const paramsString = Object.keys(params).map((key) => `${key}=${params[key] ?? ""}`).sort().join("");
  return cryptoMd5(`${WEB_SIGN_SALT}${paramsString}${WEB_SIGN_SALT}`);
};
const signParamsKey = (data2, appid = getKgAppid(), clientver = getKgClientver()) => {
  return cryptoMd5(`${appid}${currentSalts().androidSign}${clientver}${data2}`);
};
const signKey = (hash2, mid = getDeviceMid(), userid = 0, appid = getKgAppid()) => {
  return cryptoMd5(`${hash2}${currentSalts().signKey}${appid}${mid}${userid}`);
};
const cleanKgResponse = (text) => {
  return text.trim().replace(/^<!--KG_TAG_RES_START-->/, "").replace(/<!--KG_TAG_RES_END-->$/, "");
};
const kgRequest = async (url, options = {}) => {
  const res = await fetch(url, {
    method: "GET",
    headers: options.headers,
    signal: options.signal ?? AbortSignal.timeout(8e3)
  });
  if (res.status !== 200) throw new Error(`KG HTTP ${res.status}`);
  const rawText = await res.text();
  const cleaned = cleanKgResponse(rawText);
  const body = JSON.parse(cleaned);
  const code = body.error_code ?? body.errcode ?? body.err_code ?? 0;
  if (code !== 0 && code !== 200) throw new Error(`KG API error_code=${code}`);
  return body;
};
const kgGatewayRequest = async (path2, options = {}) => {
  const {
    method = "GET",
    baseURL = KG_GATEWAY_URL,
    params = {},
    data: data2,
    headers = {},
    notSignature = false,
    timeoutMs = 8e3
  } = options;
  const clienttime = Math.floor(Date.now() / 1e3);
  const mid = getDeviceMid();
  const session2 = getSessionCookies("kugou");
  const dfid = session2.dfid || "-";
  const uuid = "-";
  const defaultParams = {
    dfid,
    mid,
    uuid,
    appid: getKgAppid(),
    clientver: getKgClientver(),
    clienttime,
    ...session2.token ? { token: session2.token } : {},
    ...session2.userid ? { userid: session2.userid } : {}
  };
  const mergedParams = { ...defaultParams, ...params };
  const serializedData = data2 !== void 0 ? typeof data2 === "string" || Buffer.isBuffer(data2) ? data2 : JSON.stringify(data2) : "";
  if (!mergedParams.signature && !notSignature) {
    mergedParams.signature = signatureAndroidParams(mergedParams, serializedData);
  }
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(mergedParams)) {
    if (value !== void 0 && value !== null) {
      searchParams.append(key, typeof value === "object" ? JSON.stringify(value) : String(value));
    }
  }
  const queryStr = searchParams.toString();
  const fullUrl = `${baseURL}${path2}${queryStr ? `?${queryStr}` : ""}`;
  const defaultHeaders = {
    "User-Agent": "Android15-1070-11083-46-0-DiscoveryDRADProtocol-wifi",
    dfid,
    clienttime: String(clienttime),
    mid,
    "kg-rc": "1",
    "kg-thash": "5d816a0",
    "kg-rec": "1",
    "kg-rf": "B9EDA08A64250DEFFBCADDEE00F8F25F"
  };
  if (method === "POST" && !headers["Content-Type"]) {
    defaultHeaders["Content-Type"] = "application/json";
  }
  const res = await fetch(fullUrl, {
    method,
    headers: { ...defaultHeaders, ...headers },
    body: method === "POST" ? serializedData : void 0,
    signal: AbortSignal.timeout(timeoutMs)
  });
  if (!res.ok) throw new Error(`KG Gateway HTTP ${res.status}`);
  const rawText = await res.text();
  const cleaned = cleanKgResponse(rawText);
  const body = JSON.parse(cleaned);
  const code = body.error_code ?? body.errcode ?? body.err_code ?? 0;
  if (code !== 0 && code !== 200) {
    throw new Error(
      `KG Gateway API error: code=${code}, msg=${body.msg || body.error || "unknown"}`
    );
  }
  return body;
};
const inflateAsync = promisify(inflate);
const KRC_KEY = Uint8Array.from([
  64,
  71,
  97,
  119,
  94,
  50,
  116,
  71,
  81,
  54,
  49,
  45,
  206,
  210,
  110,
  105
]);
const decryptKrc = async (base64) => {
  if (!base64) throw new Error("empty krc content");
  const buf = Buffer.from(base64, "base64").subarray(4);
  for (let i = 0; i < buf.length; i++) buf[i] ^= KRC_KEY[i % 16];
  const out = await inflateAsync(buf);
  return out.toString("utf8");
};
const HEAD_ID_REG = /^.*\[id:\$\w+\]\n/;
const LANGUAGE_REG = /\[language:([\w=\\/+]+)\]/;
const LANGUAGE_LINE_REG = /\[language:[\w=\\/+]+\]\n/;
const LINE_TIME_REG = /\[((\d+),\d+)\].*/g;
const LINE_TIME_EACH_REG = /\[((\d+),\d+)\].*/;
const msToTimeTag = (ms) => {
  const m = Math.floor(ms / 6e4);
  const s = Math.floor(ms % 6e4 / 1e3);
  const x = Math.floor(ms % 1e3);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${x}`;
};
const parseKrc = (raw) => {
  let text = raw.replace(/\r/g, "");
  if (HEAD_ID_REG.test(text)) text = text.replace(HEAD_ID_REG, "");
  let transLines;
  let romaLines;
  const langMatch = text.match(LANGUAGE_REG);
  if (langMatch) {
    text = text.replace(LANGUAGE_LINE_REG, "");
    try {
      const json = JSON.parse(Buffer.from(langMatch[1], "base64").toString("utf8"));
      for (const item of json.content ?? []) {
        const lines = item.lyricContent.map((arr) => arr.join(""));
        if (item.type === 0) romaLines = lines;
        else if (item.type === 1) transLines = lines;
      }
    } catch {
    }
  }
  let idx = 0;
  let krcBody = text.replace(LINE_TIME_REG, (line) => {
    const match2 = line.match(LINE_TIME_EACH_REG);
    if (!match2) return line;
    const startMs = parseInt(match2[2], 10);
    const timeTag = msToTimeTag(startMs);
    if (romaLines && romaLines[idx] !== void 0) romaLines[idx] = `[${timeTag}]${romaLines[idx]}`;
    if (transLines && transLines[idx] !== void 0)
      transLines[idx] = `[${timeTag}]${transLines[idx]}`;
    idx++;
    return line.replace(match2[1], timeTag);
  });
  krcBody = krcBody.replace(/<(\d+,\d+),\d+>/g, "<$1>");
  const krc = decodeName(krcBody);
  const lrc = krc.replace(/<\d+,\d+>/g, "");
  return {
    lrc,
    krc,
    trans: decodeName(transLines ? transLines.join("\n") : ""),
    roma: decodeName(romaLines ? romaLines.join("\n") : "")
  };
};
const decodeKrc = async (base64Content) => {
  const text = await decryptKrc(base64Content);
  return parseKrc(text);
};
const lyric$1 = async (params) => {
  const {
    hash: hash2,
    name = "",
    duration
  } = params;
  if (!hash2) return { code: 400, message: "hash required" };
  const seconds = intervalToSeconds(duration);
  try {
    const searchUrl = `${KG_LYRIC_SEARCH_URL}?ver=1&man=yes&client=pc&lrctxt=1&keyword=${encodeURIComponent(name)}&hash=${encodeURIComponent(hash2)}&timelength=${seconds}`;
    const searchResp = await kgRequest(searchUrl, {
      headers: KG_LYRIC_HEADERS
    });
    const candidate = searchResp.candidates?.[0];
    if (!candidate) return { code: 404, message: "no lyric candidate" };
    const fmt = candidate.krctype === 1 && candidate.contenttype !== 1 ? "krc" : "lrc";
    const downloadUrl = `${KG_LYRIC_DOWNLOAD_URL}?ver=1&client=pc&charset=utf8&id=${encodeURIComponent(candidate.id)}&accesskey=${encodeURIComponent(candidate.accesskey)}&fmt=${fmt}`;
    const dl = await kgRequest(downloadUrl, {
      headers: KG_LYRIC_HEADERS
    });
    if (!dl.content) return { code: 404, message: "empty lyric" };
    if (dl.fmt === "krc") {
      const parsed = await decodeKrc(dl.content);
      return {
        code: 200,
        lrc: parsed.lrc,
        krc: parsed.krc,
        trans: parsed.trans || void 0,
        roma: parsed.roma || void 0
      };
    }
    if (dl.fmt === "lrc") {
      return {
        code: 200,
        lrc: Buffer.from(dl.content, "base64").toString("utf8")
      };
    }
    return { code: 500, message: `unknown lyric fmt: ${dl.fmt}` };
  } catch (err) {
    return {
      code: 500,
      message: err instanceof Error ? err.message : String(err)
    };
  }
};
const formatMobileArtist = (name) => {
  if (!name) return "";
  return decodeName(name).split(/、|,|;|\//).map((s) => s.trim()).filter(Boolean).join(" / ");
};
const normalizeFromMobile = (raw) => {
  const sizes = {};
  const hashes = {};
  if (raw.filesize && raw.hash) {
    sizes["128k"] = raw.filesize;
    hashes["128k"] = raw.hash;
  }
  if (raw["320filesize"] && raw["320hash"]) {
    sizes["320k"] = raw["320filesize"];
    hashes["320k"] = raw["320hash"];
  }
  if (raw.sqfilesize && raw.sqhash) {
    sizes.flac = raw.sqfilesize;
    hashes.flac = raw.sqhash;
  }
  const hrSize = raw.hires_filesize ?? raw.resfilesize;
  const hrHash = raw.hires_hash ?? raw.reshash;
  if (hrSize && hrHash) {
    sizes.flac24bit = hrSize;
    hashes.flac24bit = hrHash;
  }
  const interval = raw.duration ?? 0;
  const coverTpl = raw.trans_param?.union_cover;
  const artistName = formatMobileArtist(raw.singername);
  const artists2 = artistName ? artistName.split(" / ").map((name) => ({ id: name, name })) : [];
  return {
    id: String(raw.audio_id || raw.hash || ""),
    audioId: raw.audio_id ?? 0,
    albumAudioId: raw.album_audio_id,
    hash: raw.hash ?? "",
    name: decodeName(raw.songname || raw.filename || ""),
    artist: artistName,
    artists: artists2,
    album: decodeName(raw.album_name ?? ""),
    albumId: raw.album_id ?? "",
    cover: fillCover(coverTpl, 300),
    coverOriginal: fillCover(coverTpl, 480),
    interval,
    duration: interval * 1e3,
    qualities: Object.keys(hashes),
    hashes,
    sizes,
    pay: {
      payplay: raw.pay_type ?? 0,
      privilege: raw.privilege ?? 0,
      feetype: raw.feetype ?? 0,
      pkg_price: raw.pkg_price ?? 0,
      price: raw.price ?? 0
    }
  };
};
const normalizeFromLegacy = (raw) => {
  const sizes = {};
  const hashes = {};
  if (raw.FileSize && raw.FileHash) {
    sizes["128k"] = raw.FileSize;
    hashes["128k"] = raw.FileHash;
  }
  if (raw.HQFileSize && raw.HQFileHash) {
    sizes["320k"] = raw.HQFileSize;
    hashes["320k"] = raw.HQFileHash;
  }
  if (raw.SQFileSize && raw.SQFileHash) {
    sizes.flac = raw.SQFileSize;
    hashes.flac = raw.SQFileHash;
  }
  if (raw.ResFileSize && raw.ResFileHash) {
    sizes.flac24bit = raw.ResFileSize;
    hashes.flac24bit = raw.ResFileHash;
  }
  const singers = raw.Singers ?? [];
  const artistName = formatSingerName$1(singers);
  const artists2 = singers.length ? singers.map((s) => ({
    id: s.id !== void 0 ? String(s.id) : s.name || void 0,
    name: decodeName(s.name || "")
  })) : artistName ? [{ id: artistName, name: artistName }] : [];
  return {
    id: String(raw.Audioid || raw.FileHash || ""),
    audioId: raw.Audioid,
    albumAudioId: raw.MixSongID ?? raw.AlbumAudioId,
    hash: raw.FileHash,
    name: decodeName(raw.SongName),
    artist: artistName,
    artists: artists2,
    album: decodeName(raw.AlbumName ?? ""),
    albumId: raw.AlbumID ?? "",
    cover: void 0,
    interval: raw.Duration,
    duration: raw.Duration * 1e3,
    qualities: Object.keys(hashes),
    hashes,
    sizes,
    pay: {
      payplay: raw.PayType ?? 0,
      privilege: raw.Privilege ?? 0,
      pkg_price: raw.PkgPrice ?? 0,
      price: raw.Price ?? 0
    }
  };
};
const searchSongsMobile = async (keywords, page, limit) => {
  const url = `${KG_MOBILECDN_URL}?keyword=${encodeURIComponent(keywords)}&page=${page}&pagesize=${limit}&format=json&showtype=1`;
  const body = await kgRequest(url);
  const raw = body.data?.info ?? [];
  const songs = [];
  const seen = /* @__PURE__ */ new Set();
  const push = (item) => {
    const key = `${item.audio_id ?? ""}_${item.hash ?? ""}`;
    if (seen.has(key)) return;
    seen.add(key);
    songs.push(normalizeFromMobile(item));
  };
  for (const item of raw) {
    push(item);
    for (const sub of item.group ?? []) push(sub);
  }
  return {
    code: 200,
    total: body.data?.total ?? songs.length,
    songs
  };
};
const searchSongsLegacy = async (keywords, page, limit) => {
  const url = `${KG_SEARCH_URL}?keyword=${encodeURIComponent(keywords)}&page=${page}&pagesize=${limit}&userid=0&clientver=&platform=WebFilter&filter=2&iscorrection=1&privilege_filter=0&area_code=1`;
  const body = await kgRequest(url);
  const raw = body.data?.lists ?? [];
  const songs = [];
  const seen = /* @__PURE__ */ new Set();
  const push = (item) => {
    const key = `${item.Audioid}_${item.FileHash}`;
    if (seen.has(key)) return;
    seen.add(key);
    songs.push(normalizeFromLegacy(item));
  };
  for (const item of raw) {
    push(item);
    for (const sub of item.Grp ?? []) push(sub);
  }
  return {
    code: 200,
    total: body.data?.total ?? songs.length,
    songs
  };
};
const searchSongs$1 = async (keywords, page, limit) => {
  try {
    const result2 = await searchSongsMobile(keywords, page, limit);
    if (result2.songs.length > 0) return result2;
  } catch {
  }
  return searchSongsLegacy(keywords, page, limit);
};
const searchAlbums$1 = async (keywords, page, limit) => {
  const res = await kgGatewayRequest(
    "/v1/search/album",
    {
      params: {
        keyword: keywords,
        page,
        pagesize: limit,
        platform: "AndroidFilter",
        iscorrection: 1,
        albumhide: 0,
        nocollect: 0
      },
      headers: {
        "x-router": "complexsearch.kugou.com"
      }
    }
  );
  const rawList = res.data?.lists ?? res.data?.info ?? [];
  const albums = rawList.map((raw) => {
    const singerStr = raw.singer || (raw.singers ? raw.singers.map((s) => s.name).filter(Boolean).join(" / ") : "");
    const artistId = raw.singerid || raw.singerids?.[0];
    return {
      id: String(raw.albumid ?? ""),
      name: decodeName(raw.albumname),
      cover: fillCover(raw.img, 300),
      artist: decodeName(singerStr),
      artistId: artistId !== void 0 ? String(artistId) : void 0,
      trackCount: raw.songcount ?? 0,
      publishTime: raw.publish_time,
      intro: raw.intro
    };
  });
  return {
    code: 200,
    total: res.data?.total ?? albums.length,
    albums
  };
};
const searchArtists$1 = async (keywords, page, limit) => {
  const res = await kgGatewayRequest(
    "/v1/search/author",
    {
      params: {
        keyword: keywords,
        page,
        pagesize: limit,
        platform: "AndroidFilter",
        iscorrection: 1
      },
      headers: {
        "x-router": "complexsearch.kugou.com"
      }
    }
  );
  const rawList = res.data?.lists ?? res.data?.info ?? [];
  const artists2 = rawList.map((raw) => ({
    id: String(raw.AuthorId ?? ""),
    name: decodeName(raw.AuthorName),
    cover: fillCover(raw.Avatar || raw.FirstFrameImage, 300),
    albumCount: raw.AlbumCount ?? 0,
    songCount: raw.AudioCount ?? 0,
    fansCount: raw.FansNum ?? 0
  }));
  return {
    code: 200,
    total: res.data?.total ?? artists2.length,
    artists: artists2
  };
};
const searchPlaylists$1 = async (keywords, page, limit) => {
  const res = await kgGatewayRequest(
    "/v1/search/special",
    {
      params: {
        keyword: keywords,
        page,
        pagesize: limit,
        platform: "AndroidFilter",
        iscorrection: 1
      },
      headers: {
        "x-router": "complexsearch.kugou.com"
      }
    }
  );
  const rawList = res.data?.lists ?? res.data?.info ?? [];
  const playlists = rawList.map((raw) => ({
    id: String(raw.specialid || raw.gid || ""),
    name: decodeName(raw.specialname),
    cover: fillCover(raw.img, 300),
    creator: decodeName(raw.nickname),
    trackCount: raw.song_count ?? 0,
    playCount: Number(raw.play_count || raw.total_play_count || 0)
  }));
  return {
    code: 200,
    total: res.data?.total ?? playlists.length,
    playlists
  };
};
const search$1 = async (params) => {
  const {
    keywords,
    page = 1,
    limit = 30,
    type = 0
  } = params;
  if (!keywords) {
    return { code: 400, total: 0, message: "keywords required" };
  }
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.max(1, Number(limit) || 30);
  if (type === 0 || type === "song") {
    return searchSongs$1(keywords, pageNum, limitNum);
  }
  if (type === 8 || type === "album") {
    return searchAlbums$1(keywords, pageNum, limitNum);
  }
  if (type === 9 || type === "artist" || type === "author") {
    return searchArtists$1(keywords, pageNum, limitNum);
  }
  if (type === 2 || type === "playlist" || type === "special") {
    return searchPlaylists$1(keywords, pageNum, limitNum);
  }
  return { code: 400, total: 0, message: `unsupported kg search type: ${type}` };
};
const normalizeAlbumSong = (raw, fallbackCover) => {
  const base = raw.base ?? {};
  const audio = raw.audio_info ?? {};
  const albumInfo = raw.album_info ?? {};
  const authors = raw.authors ?? [];
  const trans = raw.trans_param ?? {};
  const cover = fillCover(albumInfo.cover || trans.union_cover || fallbackCover, 300);
  const coverOriginal = fillCover(albumInfo.cover || trans.union_cover || fallbackCover, 480);
  const duration = audio.duration_320 || audio.duration_128 || audio.duration_flac || audio.duration || 0;
  const sizes = {};
  const hashes = {};
  const f128 = audio.filesize_128 ?? audio.filesize;
  const h128 = audio.hash_128 ?? audio.hash;
  if (f128 && h128) {
    sizes["128k"] = f128;
    hashes["128k"] = h128;
  }
  if (audio.filesize_320 && audio.hash_320) {
    sizes["320k"] = audio.filesize_320;
    hashes["320k"] = audio.hash_320;
  }
  if (audio.filesize_flac && audio.hash_flac) {
    sizes.flac = audio.filesize_flac;
    hashes.flac = audio.hash_flac;
  }
  if (audio.filesize_high && audio.hash_high) {
    sizes.flac24bit = audio.filesize_high;
    hashes.flac24bit = audio.hash_high;
  }
  const artistStr = authors.map((a) => a.author_name).filter(Boolean).join(" / ") || base.author_name || "";
  const artists2 = authors.length ? authors.map((a) => ({
    id: a.author_id !== void 0 ? String(a.author_id) : void 0,
    name: decodeName(a.author_name || "")
  })) : [{ name: decodeName(artistStr) }];
  const artistId = authors[0]?.author_id !== void 0 ? String(authors[0].author_id) : void 0;
  return {
    id: String(base.audio_id || audio.hash || ""),
    audioId: base.audio_id ?? 0,
    albumAudioId: base.album_audio_id,
    hash: audio.hash_128 || audio.hash || "",
    name: decodeName(base.audio_name || ""),
    artist: decodeName(artistStr),
    artistId,
    artists: artists2,
    album: decodeName(albumInfo.album_name || ""),
    albumId: base.album_id ?? "",
    cover,
    coverOriginal,
    interval: Math.round(duration / 1e3),
    duration,
    qualities: Object.keys(hashes),
    hashes,
    sizes,
    pay: {
      payplay: raw.deprecated?.pay_type ?? 0,
      pkg_price: raw.deprecated?.pkg_price ?? (raw.deprecated?.pay_type ? 1 : 0),
      price: raw.deprecated?.price ?? 0
    }
  };
};
const normalizeMobileAlbumSong = (raw, fallbackCover) => {
  const trans = raw.trans_param ?? {};
  const cover = fillCover(trans.union_cover || fallbackCover, 300);
  const coverOriginal = fillCover(trans.union_cover || fallbackCover, 480);
  const interval = raw.duration ?? 0;
  const sizes = {};
  const hashes = {};
  if (raw.filesize && raw.hash) {
    sizes["128k"] = raw.filesize;
    hashes["128k"] = raw.hash;
  }
  if (raw["320filesize"] && raw["320hash"]) {
    sizes["320k"] = raw["320filesize"];
    hashes["320k"] = raw["320hash"];
  }
  if (raw.sqfilesize && raw.sqhash) {
    sizes.flac = raw.sqfilesize;
    hashes.flac = raw.sqhash;
  }
  const hrSize = raw.hires_filesize ?? raw.resfilesize;
  const hrHash = raw.hires_hash ?? raw.reshash;
  if (hrSize && hrHash) {
    sizes.flac24bit = hrSize;
    hashes.flac24bit = hrHash;
  }
  const filename = raw.filename || "";
  const artistName = raw.singername ? decodeName(raw.singername) : filename.split(" - ")[0] || "";
  const songName2 = raw.songname ? decodeName(raw.songname) : filename.split(" - ")[1] || filename;
  const artists2 = artistName ? artistName.split(" / ").map((name) => ({ id: name, name })) : [];
  return {
    id: String(raw.audio_id || raw.hash || ""),
    audioId: raw.audio_id ?? 0,
    albumAudioId: raw.album_audio_id,
    hash: raw.hash ?? "",
    name: decodeName(songName2),
    artist: artistName,
    artists: artists2,
    album: decodeName(raw.album_name ?? ""),
    albumId: raw.album_id ?? "",
    cover,
    coverOriginal,
    interval,
    duration: interval * 1e3,
    qualities: Object.keys(hashes),
    hashes,
    sizes,
    pay: {
      payplay: raw.pay_type ?? 0
    }
  };
};
const resolveAlbumId = async (idOrName) => {
  if (/^[1-9]\d*$/.test(idOrName)) return idOrName;
  try {
    const searchRes = await kgGatewayRequest("/v1/search/album", {
      params: {
        keyword: idOrName,
        page: 1,
        pagesize: 1,
        platform: "AndroidFilter",
        iscorrection: 1,
        nocollect: 0
      },
      headers: { "x-router": "complexsearch.kugou.com" }
    });
    const first = searchRes.data?.lists?.[0] || searchRes.data?.info?.[0];
    if (first?.albumid) return String(first.albumid);
  } catch {
  }
  return idOrName;
};
const loadAlbumFromMobile = async (albumId) => {
  const [infoRes, songsRes] = await Promise.all([
    kgRequest(
      `http://mobilecdn.kugou.com/api/v3/album/info?albumid=${encodeURIComponent(albumId)}&format=json`
    ).catch(() => ({ data: void 0 })),
    kgRequest(
      `http://mobilecdn.kugou.com/api/v3/album/song?albumid=${encodeURIComponent(albumId)}&page=1&pagesize=300&format=json`
    ).catch(() => ({ data: void 0 }))
  ]);
  const info = infoRes.data ?? {};
  const rawSongs = songsRes.data?.info ?? [];
  const cover = fillCover(info.imgurl, 300);
  const coverOriginal = fillCover(info.imgurl, 480);
  const songs = rawSongs.map((s) => normalizeMobileAlbumSong(s, info.imgurl));
  return {
    code: 200,
    id: albumId,
    name: decodeName(info.albumname || ""),
    cover,
    coverOriginal,
    artist: decodeName(info.singername || ""),
    artists: info.singername ? [
      {
        id: info.singerid !== void 0 ? String(info.singerid) : info.singername,
        name: decodeName(info.singername)
      }
    ] : [],
    publishTime: info.publishtime,
    description: info.intro,
    total: info.songcount ?? songsRes.data?.total ?? songs.length,
    songs
  };
};
const album$1 = async (params) => {
  const rawId = String(params.id ?? params.album_id ?? "").trim();
  if (!rawId) return { code: 400, message: "id required" };
  const id = await resolveAlbumId(rawId);
  try {
    const [detailRes, songsRes] = await Promise.all([
      kgGatewayRequest("/kmr/v2/albums", {
        method: "POST",
        data: {
          data: [{ album_id: id }],
          fields: "album_id,album_name,publish_date,sizable_cover,intro,language,authors,author_name,songcount"
        },
        headers: { "x-router": "openapi.kugou.com", "kg-tid": "255" }
      }),
      kgGatewayRequest("/v1/album_audio/lite", {
        method: "POST",
        data: { album_id: id, page: 1, pagesize: 300 },
        headers: { "x-router": "openapi.kugou.com", "kg-tid": "255" }
      })
    ]);
    const detail = detailRes.data?.[0] ?? {};
    const cover = fillCover(detail.sizable_cover, 300);
    const coverOriginal = fillCover(detail.sizable_cover, 480);
    const rawSongs = Array.isArray(songsRes.data) ? songsRes.data : songsRes.data?.songs ?? [];
    const songs = rawSongs.map((item) => normalizeAlbumSong(item, detail.sizable_cover));
    const authors = detail.authors ?? [];
    const artistName = detail.author_name || authors.map((a) => a.author_name).filter(Boolean).join(" / ") || songs[0]?.artist || "";
    return {
      code: 200,
      id,
      name: decodeName(detail.album_name || songs[0]?.album || rawId),
      cover,
      coverOriginal,
      artist: decodeName(artistName),
      artists: authors.map((a) => ({
        id: a.author_id !== void 0 ? String(a.author_id) : void 0,
        name: decodeName(a.author_name || "")
      })),
      publishTime: detail.publish_date,
      description: detail.intro,
      total: detail.songcount ?? songs.length,
      songs
    };
  } catch {
    return await loadAlbumFromMobile(id);
  }
};
const normalizeArtistSong = (raw, currentArtistId, defaultCover) => {
  const trans = raw.trans_param ?? {};
  const cover = fillCover(trans.union_cover || defaultCover, 300);
  const coverOriginal = fillCover(trans.union_cover || defaultCover, 480);
  const duration = raw.timelength_320 || raw.timelength_flac || raw.timelength_128 || raw.timelength_high || raw.timelength || raw.duration_320 || raw.duration_128 || raw.duration_flac || raw.duration || 0;
  const sizes = {};
  const hashes = {};
  const f128 = raw.filesize_128 ?? raw.filesize;
  const h128 = raw.hash_128 ?? raw.hash;
  if (f128 && h128) {
    sizes["128k"] = f128;
    hashes["128k"] = h128;
  }
  if (raw.filesize_320 && raw.hash_320) {
    sizes["320k"] = raw.filesize_320;
    hashes["320k"] = raw.hash_320;
  }
  if (raw.filesize_flac && raw.hash_flac) {
    sizes.flac = raw.filesize_flac;
    hashes.flac = raw.hash_flac;
  }
  if (raw.filesize_high && raw.hash_high) {
    sizes.flac24bit = raw.filesize_high;
    hashes.flac24bit = raw.hash_high;
  }
  const authors = raw.authors ?? [];
  const artistStr = authors.map((a) => a.author_name).filter(Boolean).join(" / ") || raw.author_name || "";
  const artists2 = authors.length ? authors.map((a) => ({
    id: a.author_id !== void 0 ? String(a.author_id) : currentArtistId,
    name: decodeName(a.author_name || "")
  })) : [{ id: currentArtistId, name: decodeName(artistStr) }];
  return {
    id: String(raw.audio_id || raw.hash || ""),
    audioId: raw.audio_id ?? 0,
    albumAudioId: raw.album_audio_id,
    hash: raw.hash_128 || raw.hash || "",
    name: decodeName(raw.audio_name || ""),
    artist: decodeName(artistStr),
    artistId: currentArtistId,
    artists: artists2,
    album: decodeName(raw.album_name ?? ""),
    albumId: raw.album_id ?? "",
    cover,
    coverOriginal,
    interval: Math.round(duration / 1e3),
    duration,
    qualities: Object.keys(hashes),
    hashes,
    sizes,
    pay: {
      payplay: raw.pay_type ?? 0
    }
  };
};
const resolveAuthorId = async (idOrName) => {
  if (/^\d+$/.test(idOrName)) return idOrName;
  try {
    const searchRes = await kgGatewayRequest("/v1/search/author", {
      params: {
        keyword: idOrName,
        page: 1,
        pagesize: 1,
        platform: "AndroidFilter",
        iscorrection: 1
      },
      headers: { "x-router": "complexsearch.kugou.com" }
    });
    const first = searchRes.data?.lists?.[0];
    if (first?.AuthorId) return String(first.AuthorId);
  } catch {
  }
  return idOrName;
};
const artist$1 = async (params) => {
  const rawId = String(params.id ?? params.author_id ?? params.artist_id ?? "").trim();
  if (!rawId) return { code: 400, message: "id required" };
  const id = await resolveAuthorId(rawId);
  const clienttime = Math.floor(Date.now() / 1e3);
  const [detailRes, songsRes, albumsRes] = await Promise.all([
    kgGatewayRequest("/kmr/v3/author", {
      method: "POST",
      data: { author_id: id },
      headers: { "x-router": "openapi.kugou.com", "kg-tid": "36" }
    }),
    kgGatewayRequest("/kmr/v1/audio_group/author", {
      method: "POST",
      baseURL: "https://openapi.kugou.com",
      data: {
        author_id: id,
        pagesize: 50,
        page: 1,
        sort: 1,
        area_code: "all",
        clienttime,
        key: signParamsKey(clienttime)
      },
      headers: { "x-router": "openapi.kugou.com", "kg-tid": "220" }
    }),
    kgGatewayRequest("/kmr/v1/author/albums", {
      method: "POST",
      data: {
        author_id: id,
        pagesize: 50,
        page: 1,
        sort: 3,
        category: 1,
        area_code: "all"
      },
      headers: { "x-router": "openapi.kugou.com", "kg-tid": "36" }
    })
  ]);
  const detail = detailRes.data ?? {};
  const rawSongs = songsRes.data ?? [];
  const rawAlbums = albumsRes.data ?? [];
  const avatar = fillCover(detail.sizable_avatar, 300);
  const songs = rawSongs.map((s) => normalizeArtistSong(s, id));
  const albums = rawAlbums.map((a) => ({
    id: String(a.album_id ?? ""),
    name: decodeName(a.album_name || ""),
    cover: fillCover(a.sizable_cover, 300),
    artist: decodeName(a.author_name || detail.author_name || ""),
    artistId: id,
    trackCount: a.song_count ?? 0,
    publishTime: a.publish_date
  }));
  const introText = detail.intro || detail.long_intro && detail.long_intro.map((item) => item.content).filter(Boolean).join("\n\n");
  const artistInfo = {
    id: String(detail.author_id || id),
    name: decodeName(detail.author_name || rawId),
    cover: avatar,
    avatar,
    songCount: songsRes.total ?? songs.length,
    albumCount: detail.album_count ?? albumsRes.total ?? albums.length,
    fansCount: detail.fansnums,
    intro: introText
  };
  return {
    code: 200,
    artist: artistInfo,
    songs,
    albums
  };
};
const formatArtist = (filename, singername) => {
  if (singername) {
    return decodeName(singername).split(/、|,|;|\//).map((s) => s.trim()).filter(Boolean).join(" / ");
  }
  const parts = filename.split(" - ");
  if (parts.length > 1) {
    return decodeName(parts[0].trim());
  }
  return "";
};
const formatSongName = (filename, songname) => {
  if (songname) return decodeName(songname);
  const parts = filename.split(" - ");
  if (parts.length > 1) {
    return decodeName(parts.slice(1).join(" - ").trim());
  }
  return decodeName(filename);
};
const normalizeSpecialSong = (raw, fallbackCover) => {
  const trans = raw.trans_param ?? {};
  const cover = fillCover(trans.union_cover || fallbackCover, 300);
  const coverOriginal = fillCover(trans.union_cover || fallbackCover, 480);
  const interval = raw.duration ?? 0;
  const sizes = {};
  const hashes = {};
  if (raw.filesize && raw.hash) {
    sizes["128k"] = raw.filesize;
    hashes["128k"] = raw.hash;
  }
  if (raw["320filesize"] && raw["320hash"]) {
    sizes["320k"] = raw["320filesize"];
    hashes["320k"] = raw["320hash"];
  }
  if (raw.sqfilesize && raw.sqhash) {
    sizes.flac = raw.sqfilesize;
    hashes.flac = raw.sqhash;
  }
  const hrSize = raw.hires_filesize ?? raw.resfilesize;
  const hrHash = raw.hires_hash ?? raw.reshash;
  if (hrSize && hrHash) {
    sizes.flac24bit = hrSize;
    hashes.flac24bit = hrHash;
  }
  const filename = raw.filename || "";
  const artistName = formatArtist(filename, raw.singername);
  const artists2 = artistName ? artistName.split(" / ").map((name) => ({ id: name, name })) : [];
  return {
    id: String(raw.audio_id || raw.hash || ""),
    audioId: raw.audio_id ?? 0,
    albumAudioId: raw.album_audio_id,
    hash: raw.hash ?? "",
    name: formatSongName(filename, raw.songname),
    artist: artistName,
    artists: artists2,
    album: decodeName(raw.album_name ?? ""),
    albumId: raw.album_id ?? "",
    cover,
    coverOriginal,
    interval,
    duration: interval * 1e3,
    qualities: Object.keys(hashes),
    hashes,
    sizes,
    pay: {
      payplay: raw.pay_type ?? 0
    }
  };
};
const playlist = async (params) => {
  const id = String(params.id ?? params.specialid ?? params.special_id ?? "");
  if (!id) return { code: 400, message: "id required" };
  const [infoRes, songsRes] = await Promise.all([
    kgRequest(
      `http://mobilecdn.kugou.com/api/v3/special/info?specialid=${encodeURIComponent(id)}&format=json`
    ),
    kgRequest(
      `http://mobilecdn.kugou.com/api/v3/special/song?specialid=${encodeURIComponent(id)}&page=1&pagesize=300&format=json`
    )
  ]);
  const info = infoRes.data ?? {};
  const rawSongs = songsRes.data?.info ?? [];
  const cover = fillCover(info.imgurl, 300);
  const coverOriginal = fillCover(info.imgurl, 480);
  const songs = rawSongs.map((s) => normalizeSpecialSong(s, info.imgurl));
  return {
    code: 200,
    id: String(info.specialid || id),
    name: decodeName(info.specialname || ""),
    description: info.intro,
    creator: decodeName(info.nickname || ""),
    cover,
    coverOriginal,
    playCount: info.playcount ?? 0,
    total: info.songcount ?? songsRes.data?.total ?? songs.length,
    songs
  };
};
const userDetail$1 = async () => {
  const session2 = getSessionCookies("kugou");
  if (!session2.token || !session2.userid) return { code: 200, loggedIn: false };
  const clienttime = Math.floor(Date.now() / 1e3);
  const response = await kgGatewayRequest("/v3/get_my_info", {
    method: "POST",
    data: {
      visit_time: clienttime,
      usertype: 1,
      p: rsaEncryptKugou({ token: session2.token, clienttime }).toUpperCase(),
      userid: Number(session2.userid)
    },
    params: { plat: 1 },
    headers: { "x-router": "usercenter.kugou.com" }
  });
  const data2 = response.data ?? {};
  const nickname = data2.nickname ?? data2.username ?? data2.user_name ?? session2.nickname;
  const avatar = data2.pic ?? data2.userpic ?? data2.user_pic ?? data2.avatar ?? session2.avatar;
  let isVip = Number(data2.vip_type ?? 0) > 0;
  if (!isVip) {
    const unionResp = await kgGatewayRequest("/v1/get_union_vip", {
      baseURL: "https://kugouvip.kugou.com",
      params: { busi_type: "concept" }
    }).catch(() => null);
    isVip = unionResp?.data?.busi_vip?.[0]?.is_vip === 1;
  }
  const nextSession = {
    ...session2,
    ...nickname ? { nickname: String(nickname) } : {},
    ...avatar ? { avatar: String(avatar).replace(/^http:\/\//, "https://") } : {},
    ...data2.vip_type !== void 0 ? { vip_type: String(data2.vip_type) } : {}
  };
  saveSessionCookies("kugou", nextSession);
  return {
    code: 200,
    loggedIn: true,
    profile: {
      userId: session2.userid,
      nickname: nextSession.nickname || `KG ${session2.userid}`,
      avatarUrl: nextSession.avatar || "",
      isVip,
      vipLevel: Number(nextSession.vip_type || 0)
    }
  };
};
const BASE_URL = "https://login-user.kugou.com";
const SRC_APPID = 2919;
const request = async (path2, input) => {
  const params = {
    dfid: "-",
    mid: getDeviceMid(),
    uuid: "-",
    appid: 1001,
    clientver: getKgClientver(),
    clienttime: Math.floor(Date.now() / 1e3),
    ...input
  };
  params.signature = signatureWebParams(params);
  const query = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
  const response = await fetch(`${BASE_URL}${path2}?${query}`, {
    signal: AbortSignal.timeout(8e3)
  });
  if (!response.ok) throw new Error(`KG login HTTP ${response.status}`);
  return await response.json();
};
const loginQrKey = async () => {
  const appid = getKgAppid();
  const body = await request("/v2/qrcode", {
    type: 1,
    plat: 4,
    qrcode_txt: `https://h5.kugou.com/apps/loginQRCode/html/index.html?appid=${appid}&`,
    srcappid: SRC_APPID
  });
  const key = body?.data?.qrcode;
  if (!key) throw new Error("KG QR key missing");
  return {
    code: 200,
    key,
    content: `https://h5.kugou.com/apps/loginQRCode/html/index.html?qrcode=${key}`
  };
};
const loginQrCheck = async (params) => {
  const key = String(params.key ?? "");
  if (!key) throw new Error("KG QR key missing");
  const body = await request("/v2/get_userinfo_qrcode", {
    plat: 4,
    appid: getKgAppid(),
    srcappid: SRC_APPID,
    qrcode: key
  });
  const data2 = body?.data ?? {};
  const nickname = data2.username ?? data2.nickname ?? data2.nick_name ?? data2.user_name;
  const avatarUrl = data2.userpic ?? data2.user_pic ?? data2.avatar ?? data2.avatar_url ?? data2.pic ?? data2.user_img;
  if (Number(data2.status) === 4) {
    saveSessionCookies("kugou", {
      ...getSessionCookies("kugou"),
      token: String(data2.token ?? ""),
      userid: String(data2.userid ?? ""),
      vip_token: String(data2.vip_token ?? ""),
      vip_type: String(data2.vip_type ?? 0),
      nickname: String(nickname ?? `KG ${data2.userid ?? ""}`),
      avatar: String(avatarUrl ?? "").replace(/^http:\/\//, "https://")
    });
  }
  return {
    code: 200,
    status: Number(data2.status ?? 1),
    nickname,
    avatarUrl: typeof avatarUrl === "string" ? avatarUrl.replace(/^http:\/\//, "https://") : void 0
  };
};
let registering = null;
const registerDevice = async () => {
  const session2 = getSessionCookies("kugou");
  const guid = session2.guid || randomUUID();
  const encrypted = encryptKugouDeviceData({
    availableRamSize: 4983533568,
    availableRomSize: 48114719,
    availableSDSize: 48114717,
    basebandVer: "",
    batteryLevel: 100,
    batteryStatus: 3,
    brand: "Redmi",
    buildSerial: "unknown",
    device: "marble",
    imei: guid,
    imsi: "",
    manufacturer: "Xiaomi",
    uuid: guid,
    accelerometer: false,
    accelerometerValue: "",
    gravity: false,
    gravityValue: "",
    gyroscope: false,
    gyroscopeValue: "",
    light: false,
    lightValue: "",
    magnetic: false,
    magneticValue: "",
    orientation: false,
    orientationValue: "",
    pressure: false,
    pressureValue: "",
    step_counter: false,
    step_counterValue: "",
    temperature: false,
    temperatureValue: ""
  });
  const clienttime = Math.floor(Date.now() / 1e3);
  const params = {
    dfid: "-",
    mid: getDeviceMid(),
    uuid: "-",
    appid: getKgAppid(),
    clientver: getKgClientver(),
    clienttime,
    part: 1,
    platid: 1,
    p: rsaEncryptKugouPkcs1({
      aes: encrypted.key,
      uid: Number(session2.userid || 0),
      token: session2.token || ""
    })
  };
  params.signature = signatureAndroidParams(params, encrypted.content);
  const query = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
  const response = await fetch(`https://userservice.kugou.com/risk/v2/r_register_dev?${query}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Android15-1070-11083-46-0-DiscoveryDRADProtocol-wifi",
      dfid: "-",
      mid: getDeviceMid(),
      clienttime: String(clienttime)
    },
    body: encrypted.content,
    signal: AbortSignal.timeout(8e3)
  });
  if (!response.ok) throw new Error(`KG register device HTTP ${response.status}`);
  const result2 = decryptKugouDeviceData(
    Buffer.from(await response.arrayBuffer()),
    encrypted.key
  );
  const dfid = result2.data?.dfid;
  if (result2.status !== 1 || !dfid) throw new Error("KG register device failed");
  saveSessionCookies("kugou", { ...session2, guid, dfid });
  return dfid;
};
const ensureKugouDfid = async () => {
  const current2 = getSessionCookies("kugou").dfid;
  if (current2) return current2;
  registering ??= registerDevice().finally(() => {
    registering = null;
  });
  return await registering;
};
const QUALITY_LEVELS = ["128", "320", "flac", "high"];
const QUALITY_MAP = {
  "hi-res": "high",
  lossless: "flac",
  hq: "320",
  sq: "128",
  lq: "128"
};
const extractUrls = (response) => [response.url, response.backup_url].flatMap((value) => Array.isArray(value) ? value : [value]).filter((value) => typeof value === "string" && value.length > 0);
const fetchLiteQualityOptions = async (hash2, albumId) => {
  const resp = await kgGatewayRequest("/v2/get_res_privilege/lite", {
    method: "POST",
    headers: { "x-router": "media.store.kugou.com" },
    data: {
      appid: getKgAppid(),
      clientver: getKgClientver(),
      area_code: 1,
      behavior: "play",
      need_hash_offset: 1,
      relate: 1,
      support_verify: 1,
      resource: [{ type: "audio", page_id: 0, hash: hash2, album_id: albumId }],
      qualities: QUALITY_LEVELS
    }
  });
  const options = /* @__PURE__ */ new Map();
  for (const item of resp.data ?? []) {
    for (const variant of [item, ...item.relate_goods ?? []]) {
      const quality = variant.quality;
      if (!variant.hash || variant.level === 0) continue;
      if (!quality || !QUALITY_LEVELS.includes(quality) || options.has(quality)) continue;
      options.set(quality, variant.hash);
    }
  }
  return options;
};
const requestUrl = async (hash2, quality, albumId, audioId, userid, freePart) => {
  const concept = isKugouConceptMode();
  return await kgGatewayRequest("/v5/url", {
    params: {
      album_id: albumId,
      area_code: 1,
      hash: hash2,
      ssa_flag: "is_fromtrack",
      version: 11430,
      page_id: concept ? 967177915 : 151369488,
      quality,
      album_audio_id: audioId,
      behavior: "play",
      pid: concept ? 411 : 2,
      cmd: 26,
      pidversion: 3001,
      IsFreePart: freePart ? 1 : 0,
      ppage_id: concept ? "356753938,823673182,967485191" : "463467626,350369493,788954147",
      cdnBackup: 1,
      module: "",
      clientver: 11430,
      key: signKey(hash2, getDeviceMid(), userid)
    },
    headers: { "x-router": "trackercdn.kugou.com" }
  });
};
const songUrl$1 = async (params) => {
  const hash2 = String(params.hash ?? "").toLowerCase();
  if (!hash2) throw new Error("KG song hash missing");
  await ensureKugouDfid();
  const session2 = getSessionCookies("kugou");
  const userid = Number(session2.userid || 0);
  const albumId = Number(params.albumId ?? 0);
  const audioId = Number(params.audioId ?? 0);
  const preferred = QUALITY_MAP[String(params.level ?? "hq")] ?? "320";
  const fallbackChain = QUALITY_LEVELS.slice(0, QUALITY_LEVELS.indexOf(preferred) + 1).reverse();
  let candidates = fallbackChain.map((quality) => ({ hash: hash2, quality }));
  if (isKugouConceptMode() && session2.token) {
    try {
      const options = await fetchLiteQualityOptions(hash2, albumId);
      const privileged = fallbackChain.map((quality) => ({ quality, variantHash: options.get(quality) })).filter((item) => Boolean(item.variantHash)).map((item) => ({ hash: item.variantHash, quality: item.quality }));
      if (privileged.length > 0) candidates = privileged;
    } catch (err) {
      coreLog.warn("[kg-song-url] privilege/lite 失败，回退原始 hash:", err);
    }
  }
  let lastResponse = {};
  for (const candidate of candidates) {
    const response = await requestUrl(
      candidate.hash,
      candidate.quality,
      albumId,
      audioId,
      userid,
      Boolean(params.freePart)
    );
    lastResponse = response;
    const urls = extractUrls(response);
    if (urls.length > 0 && response.extName !== "mp4") {
      if (candidate.quality !== preferred) {
        coreLog.info(`[kg-song-url] ${preferred} 不可用，降档至 ${candidate.quality}`);
      }
      return { code: 200, data: { url: urls[0] } };
    }
  }
  return {
    code: Number(lastResponse.errcode ?? 500),
    message: String(lastResponse.error ?? ""),
    data: void 0
  };
};
const comment$1 = async (params) => {
  return kgGatewayRequest("/mcomment/v1/cmtlist", {
    method: "POST",
    params: {
      mixsongid: params.id,
      need_show_image: 1,
      p: params.page ?? 1,
      pagesize: params.limit ?? 20,
      show_classify: 0,
      show_hotword_list: 0,
      extdata: "0",
      code: "fc4be23b4e972707f36b8a828a93ba8a"
    }
  });
};
const modules$1 = {
  lyric: lyric$1,
  search: search$1,
  album: album$1,
  artist: artist$1,
  playlist,
  song_list: playlist,
  user_detail: userDetail$1,
  login_qr_key: loginQrKey,
  login_qr_check: loginQrCheck,
  song_url: songUrl$1,
  comment: comment$1
};
const getKugouSession = () => getSessionCookies("kugou");
const mergeKugouSession = (values) => {
  saveSessionCookies("kugou", { ...getKugouSession(), ...values });
};
const clearKugouSession = () => {
  const session2 = getKugouSession();
  const device = {
    ...session2.guid ? { guid: session2.guid } : {},
    ...session2.dfid ? { dfid: session2.dfid } : {}
  };
  saveSessionCookies("kugou", device);
};
const DEFAULT_TTL$1 = 2 * 60 * 1e3;
const MAX_ENTRIES$1 = 200;
const NON_CACHEABLE$1 = /* @__PURE__ */ new Set([
  "login_qr_key",
  "login_qr_check",
  "user_detail",
  "song_url",
  "comment"
]);
const cache$2 = /* @__PURE__ */ new Map();
const hashParams$1 = (params) => createHash("md5").update(JSON.stringify(params ?? {})).digest("hex").slice(0, 8);
const cacheGet$1 = (key) => {
  const hit = cache$2.get(key);
  if (!hit) return void 0;
  if (hit.expireAt <= Date.now()) {
    cache$2.delete(key);
    return void 0;
  }
  cache$2.delete(key);
  cache$2.set(key, hit);
  return hit.value;
};
const cacheSet$1 = (key, value, ttl = DEFAULT_TTL$1) => {
  if (cache$2.size >= MAX_ENTRIES$1) {
    const oldest = cache$2.keys().next().value;
    if (oldest !== void 0) cache$2.delete(oldest);
  }
  cache$2.set(key, { value, expireAt: Date.now() + ttl });
};
const isEmptyResult = (value) => {
  if (!value || typeof value !== "object") return false;
  const v = value;
  if (Array.isArray(v.songs) && v.songs.length === 0) return true;
  if (Array.isArray(v.albums) && v.albums.length === 0) return true;
  if (Array.isArray(v.artists) && v.artists.length === 0) return true;
  if (Array.isArray(v.playlists) && v.playlists.length === 0) return true;
  return false;
};
const callKugou = async (name, params = {}) => {
  const fn = Object.hasOwn(modules$1, name) ? modules$1[name] : void 0;
  if (!fn) throw new Error(`unknown kg api: ${name}`);
  if (NON_CACHEABLE$1.has(name)) return await fn(params);
  const key = `${name}|${hashParams$1(params)}`;
  const hit = cacheGet$1(key);
  if (hit !== void 0) return hit;
  const value = await fn(params);
  if (!isEmptyResult(value)) cacheSet$1(key, value);
  return value;
};
const QM_API_URL = "https://u.y.qq.com/cgi-bin/musicu.fcg";
const QM_HEADERS = {
  "Content-Type": "application/json",
  "Accept-Encoding": "gzip",
  "User-Agent": "QQMusic 14090008(android 15)",
  Referer: "https://y.qq.com"
};
const getCommonParams = () => ({
  ct: 11,
  cv: 14090008,
  v: 14090008,
  chid: "10003505",
  os_ver: "15",
  phonetype: "24122RKC7C",
  tmeAppID: "qqmusic",
  nettype: "NETWORK_WIFI",
  udid: "0",
  OpenUDID: "0",
  QIMEI36: "0",
  uin: "0"
});
const SESSION_TTL = 60 * 60 * 1e3;
const formatSingerName = (singers, key = "name", join2 = " / ") => {
  if (!singers?.length) return "";
  return singers.map((item) => item[key]).filter((item) => !!item).join(join2);
};
const sessionToCookieHeader = (session2) => {
  const entries = Object.entries(session2).filter(([_, value]) => !!value);
  return entries.length > 0 ? entries.map(([key, value]) => `${key}=${value}`).join("; ") : void 0;
};
const getCredentialMusicId = (credential, fallback = "") => String(credential.str_musicid || credential.musicid || fallback).replace(/^o/, "");
const credentialToSession = (credential, loginType, fallbackMusicId = "") => {
  const musicId = getCredentialMusicId(credential, fallbackMusicId);
  const session2 = {
    uin: musicId,
    qm_str_musicid: musicId,
    qm_keyst: credential.musickey || "",
    qqmusic_key: credential.musickey || "",
    tmeLoginType: String(credential.loginType || loginType)
  };
  if (loginType === 1) session2.wxuin = musicId;
  if (credential.encryptUin) session2.euin = credential.encryptUin;
  if (credential.openid)
    session2[loginType === 1 ? "wxopenid" : "psrf_qqopenid"] = credential.openid;
  if (credential.unionid) session2.psrf_qqunionid = credential.unionid;
  if (credential.refresh_token)
    session2[loginType === 1 ? "wxrefresh_token" : "psrf_qqrefresh_token"] = credential.refresh_token;
  if (credential.access_token) session2.psrf_qqaccess_token = credential.access_token;
  if (credential.refresh_key) session2.qm_refresh_key = credential.refresh_key;
  if (credential.expired_at) session2.psrf_access_token_expiresAt = String(credential.expired_at);
  if (credential.musickeyCreateTime)
    session2.psrf_musickey_createtime = String(credential.musickeyCreateTime);
  if (credential.keyExpiresIn) session2.qm_key_expires_in = String(credential.keyExpiresIn);
  return session2;
};
let session = { expireAt: 0 };
let initPromise = null;
let userCookies = null;
let sessionGeneration = 0;
const invalidateSession = () => {
  sessionGeneration++;
  session = { expireAt: 0 };
};
const getQQMusicCookies = () => {
  if (userCookies !== null) return userCookies;
  userCookies = getSessionCookies("qqmusic");
  return userCookies;
};
const mergeQQMusicCookies = (cookies) => {
  const current2 = getQQMusicCookies();
  userCookies = { ...current2, ...cookies };
  saveSessionCookies("qqmusic", userCookies);
  invalidateSession();
  coreLog.info(`[qm-cookie] 已保存 Cookie (${Object.keys(userCookies).length} 个字段)`);
};
const clearQQMusicCookies = () => {
  userCookies = {};
  clearSessionCookies("qqmusic");
  invalidateSession();
  coreLog.info("[qm-cookie] 已从数据库中清空 QM Session");
};
const getQQMusicUin = () => {
  const cookies = getQQMusicCookies();
  const raw = cookies.qm_str_musicid || cookies.uin || cookies.wxuin || cookies.p_uin || "";
  return raw ? raw.replace(/^o/, "") : "0";
};
const MAX_RETRY = 2;
const RETRY_BACKOFF = 300;
const delay = (ms) => new Promise((resolve2) => setTimeout(resolve2, ms));
const postRaw = async (body, extraHeaders) => {
  const cookies = getQQMusicCookies();
  const cookieStr = sessionToCookieHeader(cookies);
  const res = await fetch(QM_API_URL, {
    method: "POST",
    headers: {
      ...QM_HEADERS,
      ...cookieStr ? { Cookie: cookieStr } : {},
      ...extraHeaders
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8e3)
  });
  return await res.json();
};
const ensureSession = () => {
  if (session.uid && session.expireAt > Date.now()) return Promise.resolve();
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const generation = sessionGeneration;
    try {
      const uin = getQQMusicUin();
      const body = {
        comm: {
          ...getCommonParams(),
          ...uin && uin !== "0" ? { uin } : {}
        },
        request: {
          module: "music.getSession.session",
          method: "GetSession",
          param: { caller: 0, uid: uin, vkey: 0 }
        }
      };
      const data2 = await postRaw(body);
      if (generation === sessionGeneration && data2.code === 0 && data2.request?.code === 0) {
        const info = (data2.request.data ?? {}).session ?? {};
        session = {
          uid: info.uid,
          sid: info.sid,
          userip: info.userip,
          expireAt: Date.now() + SESSION_TTL
        };
      }
    } catch {
    } finally {
      initPromise = null;
    }
  })();
  return initPromise;
};
const qmRequest = async (module, method, param, options = {}) => {
  const useSession = options.session !== false;
  if (useSession) await ensureSession();
  const uin = getQQMusicUin();
  const cookies = getQQMusicCookies();
  const musickey = cookies.qm_keyst || cookies.qqmusic_key;
  const loginType = cookies.tmeLoginType !== void 0 ? Number(cookies.tmeLoginType) : musickey?.startsWith("W_X") ? 1 : 2;
  const comm = {
    ...getCommonParams(),
    ...uin && uin !== "0" ? { uin, qq: uin } : {},
    ...musickey ? { authst: musickey, tmeLoginType: loginType } : {},
    ...useSession && session.uid ? { uid: session.uid } : {},
    ...useSession && session.sid ? { sid: session.sid } : {},
    ...useSession && session.userip ? { userip: session.userip } : {},
    ...options.comm ?? {}
  };
  const body = { comm, request: { module, method, param } };
  let lastErr;
  for (let attempt = 0; attempt <= MAX_RETRY; attempt++) {
    try {
      const data2 = await postRaw(body);
      const outerCode = data2.code ?? 0;
      const innerCode = data2.request?.code ?? 0;
      if (outerCode !== 0 || innerCode !== 0) {
        throw new Error(`QM API 错误: outer=${outerCode} inner=${innerCode}`);
      }
      return data2.request?.data;
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_RETRY) await delay(RETRY_BACKOFF);
    }
  }
  throw lastErr;
};
const hotSearch = async () => {
  const data2 = await qmRequest(
    "tencent_musicsoso_hotkey.HotkeyService",
    "GetHotkeyForQQMusicPC",
    { search_id: "", uin: 0 }
  );
  const list2 = (data2?.vec_hotkey ?? []).map((item) => ({
    keyword: item.query || item.title || "",
    id: item.id
  }));
  return { code: 200, list: list2 };
};
const leaderboard = async (params) => {
  const { topid, period = "", limit = 50, offset = 0 } = params;
  const data2 = await qmRequest("musicToplist.ToplistInfoServer", "GetDetail", {
    topid,
    num: limit,
    offset,
    period
  });
  const songs = (data2?.songInfoList ?? []).map((item) => item.songInfo).filter((song) => !!song).map((song) => ({
    id: String(song.id ?? ""),
    mid: song.mid ?? "",
    name: song.title ?? "",
    artist: formatSingerName(song.singer),
    album: song.album?.name ?? "",
    albumMid: song.album?.mid ?? "",
    duration: (song.interval ?? 0) * 1e3
  }));
  return {
    code: 200,
    title: data2?.title ?? "",
    subTitle: data2?.titleDetail ?? "",
    updateTime: data2?.updateTime ?? "",
    cover: data2?.headPicUrl ?? "",
    songs
  };
};
const ENCRYPT = 1;
const DECRYPT = 0;
const sbox = [
  // sbox1
  [
    14,
    4,
    13,
    1,
    2,
    15,
    11,
    8,
    3,
    10,
    6,
    12,
    5,
    9,
    0,
    7,
    0,
    15,
    7,
    4,
    14,
    2,
    13,
    1,
    10,
    6,
    12,
    11,
    9,
    5,
    3,
    8,
    4,
    1,
    14,
    8,
    13,
    6,
    2,
    11,
    15,
    12,
    9,
    7,
    3,
    10,
    5,
    0,
    15,
    12,
    8,
    2,
    4,
    9,
    1,
    7,
    5,
    11,
    3,
    14,
    10,
    0,
    6,
    13
  ],
  // sbox2
  [
    15,
    1,
    8,
    14,
    6,
    11,
    3,
    4,
    9,
    7,
    2,
    13,
    12,
    0,
    5,
    10,
    3,
    13,
    4,
    7,
    15,
    2,
    8,
    15,
    12,
    0,
    1,
    10,
    6,
    9,
    11,
    5,
    0,
    14,
    7,
    11,
    10,
    4,
    13,
    1,
    5,
    8,
    12,
    6,
    9,
    3,
    2,
    15,
    13,
    8,
    10,
    1,
    3,
    15,
    4,
    2,
    11,
    6,
    7,
    12,
    0,
    5,
    14,
    9
  ],
  // sbox3
  [
    10,
    0,
    9,
    14,
    6,
    3,
    15,
    5,
    1,
    13,
    12,
    7,
    11,
    4,
    2,
    8,
    13,
    7,
    0,
    9,
    3,
    4,
    6,
    10,
    2,
    8,
    5,
    14,
    12,
    11,
    15,
    1,
    13,
    6,
    4,
    9,
    8,
    15,
    3,
    0,
    11,
    1,
    2,
    12,
    5,
    10,
    14,
    7,
    1,
    10,
    13,
    0,
    6,
    9,
    8,
    7,
    4,
    15,
    14,
    3,
    11,
    5,
    2,
    12
  ],
  // sbox4
  [
    7,
    13,
    14,
    3,
    0,
    6,
    9,
    10,
    1,
    2,
    8,
    5,
    11,
    12,
    4,
    15,
    13,
    8,
    11,
    5,
    6,
    15,
    0,
    3,
    4,
    7,
    2,
    12,
    1,
    10,
    14,
    9,
    10,
    6,
    9,
    0,
    12,
    11,
    7,
    13,
    15,
    1,
    3,
    14,
    5,
    2,
    8,
    4,
    3,
    15,
    0,
    6,
    10,
    10,
    13,
    8,
    9,
    4,
    5,
    11,
    12,
    7,
    2,
    14
  ],
  // sbox5
  [
    2,
    12,
    4,
    1,
    7,
    10,
    11,
    6,
    8,
    5,
    3,
    15,
    13,
    0,
    14,
    9,
    14,
    11,
    2,
    12,
    4,
    7,
    13,
    1,
    5,
    0,
    15,
    10,
    3,
    9,
    8,
    6,
    4,
    2,
    1,
    11,
    10,
    13,
    7,
    8,
    15,
    9,
    12,
    5,
    6,
    3,
    0,
    14,
    11,
    8,
    12,
    7,
    1,
    14,
    2,
    13,
    6,
    15,
    0,
    9,
    10,
    4,
    5,
    3
  ],
  // sbox6
  [
    12,
    1,
    10,
    15,
    9,
    2,
    6,
    8,
    0,
    13,
    3,
    4,
    14,
    7,
    5,
    11,
    10,
    15,
    4,
    2,
    7,
    12,
    9,
    5,
    6,
    1,
    13,
    14,
    0,
    11,
    3,
    8,
    9,
    14,
    15,
    5,
    2,
    8,
    12,
    3,
    7,
    0,
    4,
    10,
    1,
    13,
    11,
    6,
    4,
    3,
    2,
    12,
    9,
    5,
    15,
    10,
    11,
    14,
    1,
    7,
    6,
    0,
    8,
    13
  ],
  // sbox7
  [
    4,
    11,
    2,
    14,
    15,
    0,
    8,
    13,
    3,
    12,
    9,
    7,
    5,
    10,
    6,
    1,
    13,
    0,
    11,
    7,
    4,
    9,
    1,
    10,
    14,
    3,
    5,
    12,
    2,
    15,
    8,
    6,
    1,
    4,
    11,
    13,
    12,
    3,
    7,
    14,
    10,
    15,
    6,
    8,
    0,
    5,
    9,
    2,
    6,
    11,
    13,
    8,
    1,
    4,
    10,
    7,
    9,
    5,
    0,
    15,
    14,
    2,
    3,
    12
  ],
  // sbox8
  [
    13,
    2,
    8,
    4,
    6,
    15,
    11,
    1,
    10,
    9,
    3,
    14,
    5,
    0,
    12,
    7,
    1,
    15,
    13,
    8,
    10,
    3,
    7,
    4,
    12,
    5,
    6,
    11,
    0,
    14,
    9,
    2,
    7,
    11,
    4,
    1,
    9,
    12,
    14,
    2,
    0,
    6,
    10,
    13,
    15,
    3,
    5,
    8,
    2,
    1,
    14,
    7,
    4,
    10,
    8,
    13,
    15,
    12,
    9,
    0,
    3,
    5,
    6,
    11
  ]
];
const bitnum = (a, b, c) => {
  const byteIndex = Math.floor(b / 32) * 4 + 3 - Math.floor(b % 32 / 8);
  return (a[byteIndex] >> 7 - b % 8 & 1) << c;
};
const bitnumIntr = (a, b, c) => (a >> 31 - b & 1) << c;
const bitnumIntl = (a, b, c) => (a << b & 2147483648) >>> c >>> 0;
const sboxBit = (a) => a & 32 | (a & 31) >> 1 | (a & 1) << 4;
const initialPermutation = (inputData) => {
  const s0 = (bitnum(inputData, 57, 31) | bitnum(inputData, 49, 30) | bitnum(inputData, 41, 29) | bitnum(inputData, 33, 28) | bitnum(inputData, 25, 27) | bitnum(inputData, 17, 26) | bitnum(inputData, 9, 25) | bitnum(inputData, 1, 24) | bitnum(inputData, 59, 23) | bitnum(inputData, 51, 22) | bitnum(inputData, 43, 21) | bitnum(inputData, 35, 20) | bitnum(inputData, 27, 19) | bitnum(inputData, 19, 18) | bitnum(inputData, 11, 17) | bitnum(inputData, 3, 16) | bitnum(inputData, 61, 15) | bitnum(inputData, 53, 14) | bitnum(inputData, 45, 13) | bitnum(inputData, 37, 12) | bitnum(inputData, 29, 11) | bitnum(inputData, 21, 10) | bitnum(inputData, 13, 9) | bitnum(inputData, 5, 8) | bitnum(inputData, 63, 7) | bitnum(inputData, 55, 6) | bitnum(inputData, 47, 5) | bitnum(inputData, 39, 4) | bitnum(inputData, 31, 3) | bitnum(inputData, 23, 2) | bitnum(inputData, 15, 1) | bitnum(inputData, 7, 0)) >>> 0;
  const s1 = (bitnum(inputData, 56, 31) | bitnum(inputData, 48, 30) | bitnum(inputData, 40, 29) | bitnum(inputData, 32, 28) | bitnum(inputData, 24, 27) | bitnum(inputData, 16, 26) | bitnum(inputData, 8, 25) | bitnum(inputData, 0, 24) | bitnum(inputData, 58, 23) | bitnum(inputData, 50, 22) | bitnum(inputData, 42, 21) | bitnum(inputData, 34, 20) | bitnum(inputData, 26, 19) | bitnum(inputData, 18, 18) | bitnum(inputData, 10, 17) | bitnum(inputData, 2, 16) | bitnum(inputData, 60, 15) | bitnum(inputData, 52, 14) | bitnum(inputData, 44, 13) | bitnum(inputData, 36, 12) | bitnum(inputData, 28, 11) | bitnum(inputData, 20, 10) | bitnum(inputData, 12, 9) | bitnum(inputData, 4, 8) | bitnum(inputData, 62, 7) | bitnum(inputData, 54, 6) | bitnum(inputData, 46, 5) | bitnum(inputData, 38, 4) | bitnum(inputData, 30, 3) | bitnum(inputData, 22, 2) | bitnum(inputData, 14, 1) | bitnum(inputData, 6, 0)) >>> 0;
  return [s0, s1];
};
const inversePermutation = (s0, s1) => {
  const data2 = new Uint8Array(8);
  data2[3] = bitnumIntr(s1, 7, 7) | bitnumIntr(s0, 7, 6) | bitnumIntr(s1, 15, 5) | bitnumIntr(s0, 15, 4) | bitnumIntr(s1, 23, 3) | bitnumIntr(s0, 23, 2) | bitnumIntr(s1, 31, 1) | bitnumIntr(s0, 31, 0);
  data2[2] = bitnumIntr(s1, 6, 7) | bitnumIntr(s0, 6, 6) | bitnumIntr(s1, 14, 5) | bitnumIntr(s0, 14, 4) | bitnumIntr(s1, 22, 3) | bitnumIntr(s0, 22, 2) | bitnumIntr(s1, 30, 1) | bitnumIntr(s0, 30, 0);
  data2[1] = bitnumIntr(s1, 5, 7) | bitnumIntr(s0, 5, 6) | bitnumIntr(s1, 13, 5) | bitnumIntr(s0, 13, 4) | bitnumIntr(s1, 21, 3) | bitnumIntr(s0, 21, 2) | bitnumIntr(s1, 29, 1) | bitnumIntr(s0, 29, 0);
  data2[0] = bitnumIntr(s1, 4, 7) | bitnumIntr(s0, 4, 6) | bitnumIntr(s1, 12, 5) | bitnumIntr(s0, 12, 4) | bitnumIntr(s1, 20, 3) | bitnumIntr(s0, 20, 2) | bitnumIntr(s1, 28, 1) | bitnumIntr(s0, 28, 0);
  data2[7] = bitnumIntr(s1, 3, 7) | bitnumIntr(s0, 3, 6) | bitnumIntr(s1, 11, 5) | bitnumIntr(s0, 11, 4) | bitnumIntr(s1, 19, 3) | bitnumIntr(s0, 19, 2) | bitnumIntr(s1, 27, 1) | bitnumIntr(s0, 27, 0);
  data2[6] = bitnumIntr(s1, 2, 7) | bitnumIntr(s0, 2, 6) | bitnumIntr(s1, 10, 5) | bitnumIntr(s0, 10, 4) | bitnumIntr(s1, 18, 3) | bitnumIntr(s0, 18, 2) | bitnumIntr(s1, 26, 1) | bitnumIntr(s0, 26, 0);
  data2[5] = bitnumIntr(s1, 1, 7) | bitnumIntr(s0, 1, 6) | bitnumIntr(s1, 9, 5) | bitnumIntr(s0, 9, 4) | bitnumIntr(s1, 17, 3) | bitnumIntr(s0, 17, 2) | bitnumIntr(s1, 25, 1) | bitnumIntr(s0, 25, 0);
  data2[4] = bitnumIntr(s1, 0, 7) | bitnumIntr(s0, 0, 6) | bitnumIntr(s1, 8, 5) | bitnumIntr(s0, 8, 4) | bitnumIntr(s1, 16, 3) | bitnumIntr(s0, 16, 2) | bitnumIntr(s1, 24, 1) | bitnumIntr(s0, 24, 0);
  return data2;
};
const f = (state2, key) => {
  const t1 = (bitnumIntl(state2, 31, 0) | (state2 & 4026531840) >>> 1 | bitnumIntl(state2, 4, 5) | bitnumIntl(state2, 3, 6) | (state2 & 251658240) >>> 3 | bitnumIntl(state2, 8, 11) | bitnumIntl(state2, 7, 12) | (state2 & 15728640) >>> 5 | bitnumIntl(state2, 12, 17) | bitnumIntl(state2, 11, 18) | (state2 & 983040) >>> 7 | bitnumIntl(state2, 16, 23)) >>> 0;
  const t2 = (bitnumIntl(state2, 15, 0) | (state2 & 61440) << 15 | bitnumIntl(state2, 20, 5) | bitnumIntl(state2, 19, 6) | (state2 & 3840) << 13 | bitnumIntl(state2, 24, 11) | bitnumIntl(state2, 23, 12) | (state2 & 240) << 11 | bitnumIntl(state2, 28, 17) | bitnumIntl(state2, 27, 18) | (state2 & 15) << 9 | bitnumIntl(state2, 0, 23)) >>> 0;
  const lrgstate = [
    t1 >>> 24 & 255 ^ key[0],
    t1 >>> 16 & 255 ^ key[1],
    t1 >>> 8 & 255 ^ key[2],
    t2 >>> 24 & 255 ^ key[3],
    t2 >>> 16 & 255 ^ key[4],
    t2 >>> 8 & 255 ^ key[5]
  ];
  state2 = (sbox[0][sboxBit(lrgstate[0] >>> 2)] << 28 | sbox[1][sboxBit((lrgstate[0] & 3) << 4 | lrgstate[1] >>> 4)] << 24 | sbox[2][sboxBit((lrgstate[1] & 15) << 2 | lrgstate[2] >>> 6)] << 20 | sbox[3][sboxBit(lrgstate[2] & 63)] << 16 | sbox[4][sboxBit(lrgstate[3] >>> 2)] << 12 | sbox[5][sboxBit((lrgstate[3] & 3) << 4 | lrgstate[4] >>> 4)] << 8 | sbox[6][sboxBit((lrgstate[4] & 15) << 2 | lrgstate[5] >>> 6)] << 4 | sbox[7][sboxBit(lrgstate[5] & 63)]) >>> 0;
  return (bitnumIntl(state2, 15, 0) | bitnumIntl(state2, 6, 1) | bitnumIntl(state2, 19, 2) | bitnumIntl(state2, 20, 3) | bitnumIntl(state2, 28, 4) | bitnumIntl(state2, 11, 5) | bitnumIntl(state2, 27, 6) | bitnumIntl(state2, 16, 7) | bitnumIntl(state2, 0, 8) | bitnumIntl(state2, 14, 9) | bitnumIntl(state2, 22, 10) | bitnumIntl(state2, 25, 11) | bitnumIntl(state2, 4, 12) | bitnumIntl(state2, 17, 13) | bitnumIntl(state2, 30, 14) | bitnumIntl(state2, 9, 15) | bitnumIntl(state2, 1, 16) | bitnumIntl(state2, 7, 17) | bitnumIntl(state2, 23, 18) | bitnumIntl(state2, 13, 19) | bitnumIntl(state2, 31, 20) | bitnumIntl(state2, 26, 21) | bitnumIntl(state2, 2, 22) | bitnumIntl(state2, 8, 23) | bitnumIntl(state2, 18, 24) | bitnumIntl(state2, 12, 25) | bitnumIntl(state2, 29, 26) | bitnumIntl(state2, 5, 27) | bitnumIntl(state2, 21, 28) | bitnumIntl(state2, 10, 29) | bitnumIntl(state2, 3, 30) | bitnumIntl(state2, 24, 31)) >>> 0;
};
const crypt = (inputData, key) => {
  let [s0, s1] = initialPermutation(inputData);
  for (let idx = 0; idx < 15; idx++) {
    const previousS1 = s1;
    s1 = (f(s1, key[idx]) ^ s0) >>> 0;
    s0 = previousS1;
  }
  s0 = (f(s1, key[15]) ^ s0) >>> 0;
  return inversePermutation(s0, s1);
};
const keySchedule = (key, mode) => {
  const schedule = Array.from({ length: 16 }, () => Array(6).fill(0));
  const keyRndShift = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
  const keyPermC = [
    56,
    48,
    40,
    32,
    24,
    16,
    8,
    0,
    57,
    49,
    41,
    33,
    25,
    17,
    9,
    1,
    58,
    50,
    42,
    34,
    26,
    18,
    10,
    2,
    59,
    51,
    43,
    35
  ];
  const keyPermD = [
    62,
    54,
    46,
    38,
    30,
    22,
    14,
    6,
    61,
    53,
    45,
    37,
    29,
    21,
    13,
    5,
    60,
    52,
    44,
    36,
    28,
    20,
    12,
    4,
    27,
    19,
    11,
    3
  ];
  const keyCompression = [
    13,
    16,
    10,
    23,
    0,
    4,
    2,
    27,
    14,
    5,
    20,
    9,
    22,
    18,
    11,
    3,
    25,
    7,
    15,
    6,
    26,
    19,
    12,
    1,
    40,
    51,
    30,
    36,
    46,
    54,
    29,
    39,
    50,
    44,
    32,
    47,
    43,
    48,
    38,
    55,
    33,
    52,
    45,
    41,
    49,
    35,
    28,
    31
  ];
  let c = 0;
  let d = 0;
  for (let i = 0; i < 28; i++) {
    c |= bitnum(key, keyPermC[i], 31 - i);
    d |= bitnum(key, keyPermD[i], 31 - i);
  }
  for (let i = 0; i < 16; i++) {
    c = ((c << keyRndShift[i] | c >>> 28 - keyRndShift[i]) & 4294967280) >>> 0;
    d = ((d << keyRndShift[i] | d >>> 28 - keyRndShift[i]) & 4294967280) >>> 0;
    const togen = mode === DECRYPT ? 15 - i : i;
    for (let j = 0; j < 6; j++) {
      schedule[togen][j] = 0;
    }
    for (let j = 0; j < 24; j++) {
      schedule[togen][Math.floor(j / 8)] |= bitnumIntr(c, keyCompression[j], 7 - j % 8);
    }
    for (let j = 24; j < 48; j++) {
      schedule[togen][Math.floor(j / 8)] |= bitnumIntr(d, keyCompression[j] - 27, 7 - j % 8);
    }
  }
  return schedule;
};
const tripleDesKeySetup = (key, mode) => {
  return [
    keySchedule(key.slice(16), DECRYPT),
    keySchedule(key.slice(8), ENCRYPT),
    keySchedule(key.slice(0), DECRYPT)
  ];
};
const tripleDesCrypt = (data2, key) => {
  let result2 = data2;
  for (let i = 0; i < 3; i++) {
    result2 = crypt(result2, key[i]);
  }
  return result2;
};
const qrcDecrypt = (encryptedData, key) => {
  const schedule = tripleDesKeySetup(key);
  const result2 = [];
  for (let i = 0; i < encryptedData.length; i += 8) {
    const block = encryptedData.slice(i, i + 8);
    const decrypted = tripleDesCrypt(block, schedule);
    result2.push(...decrypted);
  }
  return new Uint8Array(result2);
};
const QRC_KEY = new Uint8Array(Buffer.from("!@#)(*$%123ZXC!@!@#)(NHL", "utf8"));
const decryptQrc = (encryptedQrc) => {
  if (!encryptedQrc || encryptedQrc.trim() === "") {
    throw new Error("没有可解密的数据");
  }
  const encryptedBuffer = Buffer.from(encryptedQrc, "hex");
  const encryptedData = new Uint8Array(encryptedBuffer);
  const decrypted = qrcDecrypt(encryptedData, QRC_KEY);
  const decryptedBuffer = Buffer.from(decrypted);
  try {
    return inflateSync(decryptedBuffer).toString("utf8");
  } catch {
  }
  try {
    return inflateRawSync(decryptedBuffer).toString("utf8");
  } catch {
  }
  try {
    return unzipSync(decryptedBuffer).toString("utf8");
  } catch {
  }
  const str = decryptedBuffer.toString("utf8");
  if (str.includes("[") || str.includes("<")) return str;
  throw new Error("无法解压数据");
};
const b64 = (text) => Buffer.from(String(text ?? ""), "utf8").toString("base64");
const tryDecrypt = (hex) => {
  if (!hex) return void 0;
  try {
    return decryptQrc(hex);
  } catch {
    return void 0;
  }
};
const lyric = async (params) => {
  const { id, name = "", artist: artist2 = "", album: album2 = "", duration = 0 } = params;
  const baseParam = {
    albumName: b64(album2),
    crypt: 1,
    ct: 19,
    cv: 2111,
    interval: duration,
    lrc_t: 0,
    qrc: 1,
    qrc_t: 0,
    roma: 1,
    roma_t: 0,
    singerName: b64(artist2),
    songID: Number(id),
    songName: b64(name),
    trans: 1,
    trans_t: 0,
    type: 0
  };
  try {
    const resp = await qmRequest(
      "music.musichallSong.PlayLyricInfo",
      "GetPlayLyricInfo",
      baseParam
    );
    const result2 = { code: 200 };
    const mainDecrypted = tryDecrypt(resp.lyric);
    if (mainDecrypted) {
      if (resp.qrc_t === 0) {
        result2.lrc = mainDecrypted;
      } else {
        result2.qrc = mainDecrypted;
      }
    }
    if (result2.qrc && !result2.lrc) {
      try {
        const lrcResp = await qmRequest(
          "music.musichallSong.PlayLyricInfo",
          "GetPlayLyricInfo",
          { ...baseParam, qrc: 0, qrc_t: 0 }
        );
        const lrcText = tryDecrypt(lrcResp.lyric);
        if (lrcText) result2.lrc = lrcText;
      } catch {
      }
    }
    result2.trans = tryDecrypt(resp.trans);
    result2.roma = tryDecrypt(resp.roma);
    return result2;
  } catch (err) {
    return {
      code: 500,
      message: err instanceof Error ? err.message : String(err)
    };
  }
};
const secureUrl = (url) => url?.replace(/^http:/, "https:") ?? "";
const stripHighlight = (text) => text?.replace(/<\/?em>/g, "") ?? "";
const createSearchId = () => {
  const group = BigInt(Math.floor(Math.random() * 20) + 1);
  const random = BigInt(Math.floor(Math.random() * 4194305));
  const todayMs = BigInt(Date.now() % 864e5);
  return String(group * 18014398509481984n + random * 4294967296n + todayMs);
};
const searchMobile = (keywords, page, limit, searchType) => qmRequest(
  "music.search.SearchCgiService",
  "DoSearchForQQMusicMobile",
  {
    searchid: createSearchId(),
    query: keywords,
    page_num: page,
    num_per_page: limit,
    search_type: searchType,
    highlight: true,
    grp: 1,
    selectors: {},
    vec_selectors: []
  },
  { session: false }
);
const searchSongs = async (keywords, page, limit) => {
  const data2 = await searchMobile(keywords, page, limit, 0);
  const songs = (data2.body?.item_song ?? []).map((song) => {
    const albumMid = song.album?.mid ?? "";
    const albumPmid = song.album?.pmid ?? "";
    const pictureMid = albumMid || albumPmid;
    return {
      id: String(song.id ?? ""),
      mid: song.mid ?? "",
      name: song.title ?? "",
      artist: formatSingerName(song.singer),
      artists: song.singer ?? [],
      album: song.album?.name || song.album?.title || "",
      albumMid,
      duration: (song.interval ?? 0) * 1e3,
      mediaMid: song.file?.media_mid ?? "",
      pay: {
        payalbum: song.pay?.pay_month === 0 && (song.pay.price_album ?? 0) > 0 ? 1 : 0,
        payplay: song.pay?.pay_play ?? 0
      },
      size128: song.file?.size_128mp3 ?? 0,
      size320: song.file?.size_320mp3 ?? 0,
      sizeApe: song.file?.size_ape ?? 0,
      sizeFlac: song.file?.size_flac ?? 0,
      sizeOgg: song.file?.size_192ogg ?? 0,
      sizeHiRes: song.file?.size_new?.[0] ?? 0,
      hiResSampleRate: song.file?.hires_sample ?? 0,
      hiResBitDepth: song.file?.hires_bitdepth ?? 0,
      cover: pictureMid ? `https://y.gtimg.cn/music/photo_new/T002R300x300M000${pictureMid}.jpg` : "",
      coverOriginal: pictureMid ? `https://y.gtimg.cn/music/photo_new/T002R800x800M000${pictureMid}.jpg` : ""
    };
  });
  return { code: 200, total: data2.meta?.sum ?? songs.length, songs };
};
const searchAlbums = async (keywords, page, limit) => {
  const data2 = await searchMobile(keywords, page, limit, 2);
  const albums = (data2.body?.item_album ?? []).map((album2) => ({
    id: album2.albummid ?? String(album2.id ?? ""),
    name: album2.name ?? "",
    cover: secureUrl(album2.pic),
    artist: album2.singer || formatSingerName(album2.singer_list),
    artistMid: album2.singer_list?.[0]?.mid ?? "",
    trackCount: album2.song_num ?? 0
  }));
  return { code: 200, total: data2.meta?.sum ?? albums.length, albums };
};
const searchArtists = async (keywords, page, limit) => {
  const data2 = await searchMobile(keywords, page, limit, 1);
  const artists2 = (data2.body?.singer ?? []).map((artist2) => ({
    id: artist2.singerMID ?? String(artist2.singerID ?? ""),
    name: artist2.singerName ?? "",
    cover: secureUrl(artist2.singerPic || artist2.iconurl),
    albumCount: artist2.albumNum ?? 0,
    songCount: artist2.songNum ?? 0
  }));
  return { code: 200, total: data2.meta?.sum ?? artists2.length, artists: artists2 };
};
const searchPlaylists = async (keywords, page, limit) => {
  const data2 = await searchMobile(keywords, page, limit, 3);
  const playlists = (data2.body?.item_songlist ?? []).map((playlist2) => ({
    id: playlist2.dissid ?? "",
    name: stripHighlight(playlist2.dissname),
    cover: secureUrl(playlist2.logo || playlist2.layer_url),
    creator: playlist2.nickname ?? "",
    trackCount: playlist2.songnum ?? 0,
    playCount: playlist2.listennum ?? 0
  }));
  return { code: 200, total: data2.meta?.sum ?? playlists.length, playlists };
};
const search = async (params) => {
  const {
    keywords,
    page = 1,
    limit = 30,
    type = 0
  } = params;
  if (!keywords) return { code: 400, total: 0, message: "keywords required" };
  if (type === 0) return searchSongs(keywords, page, limit);
  if (type === 8) return searchAlbums(keywords, page, limit);
  if (type === 9) return searchArtists(keywords, page, limit);
  if (type === 2) return searchPlaylists(keywords, page, limit);
  return { code: 400, total: 0, message: `unsupported search type: ${type}` };
};
const match = async (params) => {
  const { keywords } = params;
  const searched = await search({ keywords, page: 1, limit: 1 });
  const song = searched.songs?.[0];
  if (!song) return { code: 404, message: "未找到匹配的歌曲" };
  const lyricData = await lyric({
    id: Number(song.id),
    name: song.name,
    artist: song.artist,
    album: song.album,
    duration: Math.floor(song.duration / 1e3)
  });
  if (lyricData.code !== 200) return lyricData;
  return {
    code: 200,
    song,
    lrc: lyricData.lrc,
    qrc: lyricData.qrc,
    trans: lyricData.trans,
    roma: lyricData.roma
  };
};
const album = async (params) => {
  const mid = String(params.mid ?? "");
  if (!mid) return { code: 400, message: "mid required" };
  const data2 = await qmRequest(
    "music.musichallAlbum.AlbumSongList",
    "GetAlbumSongList",
    { albumMid: mid, albumID: 0, begin: 0, num: 999, order: 2 }
  );
  const songs = (data2.songList ?? []).flatMap((entry) => {
    const song = entry.songInfo;
    if (!song?.mid) return [];
    return [
      {
        id: String(song.id ?? ""),
        mid: song.mid,
        name: song.title ?? "",
        artist: formatSingerName(song.singer),
        artists: song.singer ?? [],
        album: song.album?.name ?? "",
        albumMid: song.album?.mid ?? mid,
        duration: (song.interval ?? 0) * 1e3,
        mediaMid: song.file?.media_mid ?? "",
        pay: {
          payalbum: song.pay?.pay_month === 0 && (song.pay.price_album ?? 0) > 0 ? 1 : 0,
          payplay: song.pay?.pay_play ?? 0
        },
        size128: song.file?.size_128mp3 ?? 0,
        size320: song.file?.size_320mp3 ?? 0,
        sizeApe: song.file?.size_ape ?? 0,
        sizeFlac: song.file?.size_flac ?? 0,
        sizeOgg: song.file?.size_192ogg ?? 0,
        sizeHiRes: song.file?.size_new?.[0] ?? 0,
        hiResSampleRate: song.file?.hires_sample ?? 0,
        hiResBitDepth: song.file?.hires_bitdepth ?? 0
      }
    ];
  });
  return { code: 200, mid: data2.albumMid ?? mid, total: data2.totalNum ?? songs.length, songs };
};
const artist = async (params) => {
  const mid = String(params.mid ?? "");
  if (!mid) return { code: 400, message: "mid required" };
  const offset = Number(params.offset ?? 0);
  const limit = Number(params.limit ?? 50);
  const includeAlbums = params.includeAlbums !== false;
  const songsPromise = qmRequest(
    "musichall.song_list_server",
    "GetSingerSongList",
    { singerMid: mid, order: 1, begin: offset, num: limit },
    { session: false }
  );
  const albumsPromise = includeAlbums ? qmRequest(
    "music.web_singer_info_svr",
    "get_singer_album",
    { singermid: mid, order: "time", begin: 0, num: 200, exstatus: 1 },
    { session: false }
  ) : Promise.resolve({ list: [], total: 0 });
  const [songsData, albumsData] = await Promise.all([songsPromise, albumsPromise]);
  const songs = (songsData.songList ?? []).flatMap((entry) => {
    const song = entry.songInfo;
    if (!song?.mid) return [];
    return [
      {
        id: String(song.id ?? ""),
        mid: song.mid,
        name: song.title ?? song.name ?? "",
        artist: formatSingerName(song.singer),
        artists: song.singer ?? [],
        album: song.album?.name ?? "",
        albumMid: song.album?.mid ?? "",
        duration: (song.interval ?? 0) * 1e3,
        mediaMid: song.file?.media_mid ?? "",
        pay: {
          payalbum: song.pay?.pay_month === 0 && (song.pay.price_album ?? 0) > 0 ? 1 : 0,
          payplay: song.pay?.pay_play ?? 0
        },
        size128: song.file?.size_128mp3 ?? 0,
        size320: song.file?.size_320mp3 ?? 0,
        sizeApe: song.file?.size_ape ?? 0,
        sizeFlac: song.file?.size_flac ?? 0,
        sizeOgg: song.file?.size_192ogg ?? 0,
        sizeHiRes: song.file?.size_new?.[0] ?? 0,
        hiResSampleRate: song.file?.hires_sample ?? 0,
        hiResBitDepth: song.file?.hires_bitdepth ?? 0
      }
    ];
  });
  const albums = (albumsData.list ?? []).map((album2) => ({
    id: album2.album_mid ?? "",
    name: album2.album_name ?? "",
    artist: album2.singer_name ?? "",
    trackCount: album2.latest_song?.song_count ?? 0,
    publishTime: album2.pub_time
  }));
  return {
    code: 200,
    artist: {
      mid: songsData.singerMid ?? mid,
      name: albums[0]?.artist ?? "",
      songCount: songsData.totalNum ?? songs.length,
      albumCount: albumsData.total ?? albums.length
    },
    songs,
    albums
  };
};
const songInfo = async (params) => {
  const { mid } = params;
  const data2 = await qmRequest(
    "music.pf_song_detail_svr",
    "get_song_detail_yqq",
    { song_type: 0, song_mid: mid }
  );
  const track = data2?.track_info;
  if (!track) return { code: 404, message: "song not found" };
  return {
    code: 200,
    song: {
      id: String(track.id),
      mid: track.mid,
      name: track.title,
      artist: formatSingerName(track.singer),
      album: track.album?.name ?? "",
      albumMid: track.album?.mid ?? "",
      duration: (track.interval ?? 0) * 1e3,
      file: track.file
    }
  };
};
const SONGLIST_URL = "https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysonglist=0&platform=yqq&needNewCode=0";
const songList = async (params) => {
  const { id } = params;
  const url = `${SONGLIST_URL}&disstid=${encodeURIComponent(String(id ?? ""))}`;
  const res = await fetch(url, {
    headers: { ...QM_HEADERS, Referer: "https://y.qq.com/" },
    signal: AbortSignal.timeout(8e3)
  });
  if (!res.ok) throw new Error(`QM 歌单请求失败: HTTP ${res.status}`);
  const text = await res.text();
  const json = text.trim().replace(/^jsonCallback\s*\(/, "").replace(/\)\s*;?$/, "");
  const data2 = JSON.parse(json);
  const cd = data2.cdlist?.[0];
  if (!cd) return { code: 404, message: "歌单不存在" };
  const songs = (cd.songlist ?? []).map((item) => ({
    id: String(item.songid ?? ""),
    mid: item.songmid ?? "",
    name: item.songname ?? "",
    artist: formatSingerName(item.singer),
    artists: item.singer ?? [],
    album: item.albumname ?? "",
    albumMid: item.albummid ?? "",
    duration: (item.interval ?? 0) * 1e3,
    mediaMid: item.strMediaMid ?? "",
    pay: item.pay,
    size128: item.size128 ?? 0,
    size320: item.size320 ?? 0,
    sizeApe: item.sizeape ?? 0,
    sizeFlac: item.sizeflac ?? 0,
    sizeOgg: item.sizeogg ?? 0
  }));
  return {
    code: 200,
    id: cd.disstid,
    name: cd.dissname ?? "",
    description: cd.desc ?? "",
    creator: cd.nickname ?? "",
    cover: cd.logo ?? "",
    playCount: cd.visitnum ?? 0,
    total: cd.songnum ?? songs.length,
    songs
  };
};
const normalizeQQMusicVip = (data2) => {
  const identity = data2?.identity;
  const flags = [
    data2?.svip,
    identity?.vip,
    identity?.HugeVip,
    identity?.huge_vip,
    identity?.ExpVip,
    identity?.exp_vip,
    identity?.GroupVipFlag,
    identity?.group_vip_flag,
    identity?.CPLoverFlag,
    identity?.cp_lover_flag
  ];
  return {
    isVip: flags.some((value) => Number(value) > 0),
    vipLevel: Number(identity?.level || data2?.userinfo?.music_level || 0)
  };
};
const fetchCgiProfile = async () => {
  try {
    const data2 = await qmRequest("music.UserInfo.userInfoServer", "GetLoginUserInfo", {});
    const info = data2?.info;
    if (info && (info.nick || info.nickname || info.name || info.logo)) {
      return {
        nick: info.nick || info.nickname || info.name,
        headpic: info.logo
      };
    }
  } catch (err) {
    coreLog.warn("[qm-user-detail] GetLoginUserInfo 接口请求失败:", err);
  }
  return null;
};
const fetchVipStatus = async () => {
  try {
    return await qmRequest("VipLogin.VipLoginInter", "vip_login_base", {});
  } catch (err) {
    coreLog.warn("[qm-user-detail] vip_login_base 接口请求失败:", err);
    return null;
  }
};
const userDetail = async (_params) => {
  const uin = getQQMusicUin();
  const cookies = getQQMusicCookies();
  const hasKey = !!(cookies.qm_keyst || cookies.qqmusic_key || cookies.pskey || cookies.p_skey || cookies.skey);
  if (!uin || uin === "0" || !hasKey) {
    return {
      code: 301,
      loggedIn: false,
      message: "未登录 QM 账号"
    };
  }
  const [creator, vipData] = await Promise.all([fetchCgiProfile(), fetchVipStatus()]);
  const avatarUrl = creator?.headpic?.replace(/^http:\/\//, "https://");
  const vip = normalizeQQMusicVip(vipData);
  return {
    code: 200,
    loggedIn: true,
    profile: {
      userId: uin,
      nickname: creator?.nick || "",
      avatarUrl: avatarUrl || "",
      isVip: vip.isVip,
      vipLevel: vip.vipLevel
    }
  };
};
const QQ_QUALITY_CANDIDATE_TEMPLATES = [
  { prefix: "AI00", ext: ".flac", level: "hi-res", label: "Hi-Res FLAC" },
  { prefix: "F000", ext: ".flac", level: "lossless", label: "无损 FLAC" },
  { prefix: "M800", ext: ".mp3", level: "hq", label: "320k MP3" },
  { prefix: "M500", ext: ".mp3", level: "sq", label: "128k MP3" },
  { prefix: "C400", ext: ".m4a", level: "lq", label: "标准 AAC" }
];
const getQualityCandidates = (preferredLevel) => {
  const target = String(preferredLevel || "hq").toLowerCase();
  const targetIndex = QQ_QUALITY_CANDIDATE_TEMPLATES.findIndex((t2) => t2.level === target);
  if (targetIndex >= 0) {
    return QQ_QUALITY_CANDIDATE_TEMPLATES.slice(targetIndex);
  }
  return QQ_QUALITY_CANDIDATE_TEMPLATES;
};
const WEB_UA$1 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const hash33$1 = (str, seed = 0) => {
  let h = seed;
  for (const ch of str) h = ((h << 5) + h + ch.codePointAt(0) & 4294967295) >>> 0;
  return h & 2147483647;
};
const songUrl = async (params) => {
  const mid = String(params.mid || params.id || "").trim();
  if (!mid) return { code: 400, message: "missing mid" };
  const mediaMid = String(params.mediaMid || "").trim();
  const fileBase = mediaMid || `${mid}${mid}`;
  const targetLevel = String(params.level || "hq");
  const candidates = getQualityCandidates(targetLevel);
  const filenames = candidates.map((c) => `${c.prefix}${fileBase}${c.ext}`);
  const cookies = getQQMusicCookies();
  const uin = getQQMusicUin();
  const musickey = cookies.qm_keyst || cookies.qqmusic_key || "";
  const cookieStr = sessionToCookieHeader(cookies);
  const gtk = hash33$1(musickey, 5381);
  const guid = randomUUID().replace(/-/g, "");
  coreLog.debug("[qm-song-url] 发起直链解析:", mid, targetLevel, {
    uin,
    loggedIn: !!musickey
  });
  const body = {
    comm: {
      uin: uin !== "0" ? uin : "",
      format: "json",
      ct: 24,
      cv: 4747474,
      platform: "yqq.json",
      chid: "0",
      g_tk: gtk,
      g_tk_new_20200303: gtk,
      inCharset: "utf-8",
      outCharset: "utf-8",
      notice: 0,
      needNewCode: 1
    },
    req_0: {
      module: "music.vkey.GetVkey",
      method: "UrlGetVkey",
      param: {
        guid,
        songmid: filenames.map(() => mid),
        filename: filenames,
        songtype: filenames.map(() => 0),
        uin: uin !== "0" ? uin : "",
        ctx: 0
      }
    }
  };
  try {
    const res = await fetch("https://u.y.qq.com/cgi-bin/musicu.fcg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...cookieStr ? { Cookie: cookieStr } : {},
        Referer: "https://y.qq.com/",
        Origin: "https://y.qq.com",
        "User-Agent": WEB_UA$1
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8e3)
    });
    const json = await res.json();
    const data2 = json.code === 0 && json.req_0?.code === 0 ? json.req_0.data : null;
    const infos = data2?.midurlinfo ?? [];
    const sip = data2?.sip?.find((s) => s.startsWith("http")) || "https://isure.stream.qqmusic.qq.com/";
    const matched = candidates.map((cand) => {
      const matchFilename = `${cand.prefix}${fileBase}${cand.ext}`;
      const found = infos.find((item) => item.filename === matchFilename && !!item.purl);
      return found ? {
        cand,
        url: found.purl.startsWith("http") ? found.purl : `${sip}${found.purl}`
      } : void 0;
    }).find((item) => !!item);
    if (matched) {
      coreLog.info(
        `[qm-song-url] 成功命中直链: ${mid} -> ${matched.cand.label} (${matched.cand.level})`
      );
      return {
        code: 200,
        data: [
          {
            id: mid,
            url: matched.url,
            level: matched.cand.level,
            format: matched.cand.ext.replace(".", ""),
            isFallback: matched.cand.level !== targetLevel
          }
        ]
      };
    }
  } catch (err) {
    coreLog.error("[qm-song-url] 直链解析请求异常:", err);
  }
  return {
    code: 403,
    message: "无法获取播放链接，可能需要 VIP 或无版权",
    data: [{ id: mid, url: "" }]
  };
};
const comment = async (params) => {
  const id = String(params.id ?? "");
  if (!id) return { code: 400, message: "id required" };
  const type = params.type === "new" ? "new" : "hot";
  const page = Math.max(1, Number(params.page ?? 1));
  const limit = Math.max(1, Number(params.limit ?? 20));
  const cursor = String(params.cursor ?? "");
  const requestParams = {
    BizType: 1,
    BizId: id,
    LastCommentSeqNo: cursor,
    PageSize: limit,
    PageNum: page - 1,
    PicEnable: 1,
    ...type === "hot" ? { HotType: 1, WithAirborne: 0 } : { HashTagID: "", SelfSeeEnable: 1, AudioEnable: 1 }
  };
  const data2 = await qmRequest(
    "music.globalComment.CommentRead",
    type === "hot" ? "GetHotCommentList" : "GetNewCommentList",
    requestParams,
    { session: false }
  );
  const list2 = data2.CommentList;
  const comments = list2?.Comments ?? [];
  return {
    code: 200,
    comments,
    total: list2?.Total ?? comments.length,
    hasMore: list2?.HasMore === 1,
    nextCursor: list2?.HasMore === 1 ? comments.at(-1)?.SeqNo ?? "" : void 0
  };
};
const WEB_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const hash33 = (str, seed = 0) => {
  let h = seed;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i) & 4294967295) >>> 0;
  }
  return h & 2147483647;
};
const extractCookies = (res, existingCookies = {}) => {
  const cookieMap = { ...existingCookies };
  const rawList = res.headers.getSetCookie?.() ?? [];
  if (rawList.length > 0) {
    for (const raw of rawList) {
      const first = raw.split(";")[0];
      const eqIdx = first.indexOf("=");
      if (eqIdx > 0) {
        const name = first.slice(0, eqIdx).trim();
        const value = first.slice(eqIdx + 1).trim();
        if (name && value) cookieMap[name] = value;
      }
    }
  } else {
    const single = res.headers.get("set-cookie");
    if (single) {
      for (const part of single.split(/,\s*(?=[a-zA-Z0-9_-]+=)/)) {
        const first = part.split(";")[0];
        const eqIdx = first.indexOf("=");
        if (eqIdx > 0) {
          const name = first.slice(0, eqIdx).trim();
          const value = first.slice(eqIdx + 1).trim();
          if (name && value) cookieMap[name] = value;
        }
      }
    }
  }
  return cookieMap;
};
const stringifyCookies = (cookies) => Object.entries(cookies).filter(([_, v]) => !!v).map(([k, v]) => `${k}=${v}`).join("; ");
const login_qr_key = async (params) => {
  const type = String(params.type ?? "qq").toLowerCase();
  if (type === "wx") {
    const searchParams = new URLSearchParams({
      appid: "wx48db31d50e334801",
      redirect_uri: "https://y.qq.com/portal/wx_redirect.html?login_type=2&surl=https://y.qq.com/",
      response_type: "code",
      scope: "snsapi_login",
      state: "STATE",
      href: "https://y.qq.com/mediastyle/music_v17/src/css/popup_wechat.css#wechat_redirect"
    });
    const res2 = await fetch(`https://open.weixin.qq.com/connect/qrconnect?${searchParams}`, {
      headers: { "User-Agent": WEB_UA },
      signal: AbortSignal.timeout(8e3)
    });
    if (!res2.ok) throw new Error(`获取微信登录页面失败: HTTP ${res2.status}`);
    const html = await res2.text();
    const match2 = /uuid=([^"]+)"/.exec(html) || /uuid=([a-zA-Z0-9_-]+)/.exec(html);
    if (!match2) throw new Error("获取微信登录二维码 uuid 失败");
    const uuid = match2[1];
    const qrRes = await fetch(`https://open.weixin.qq.com/connect/qrcode/${uuid}`, {
      headers: {
        Referer: "https://open.weixin.qq.com/connect/qrconnect",
        "User-Agent": WEB_UA
      },
      signal: AbortSignal.timeout(8e3)
    });
    if (!qrRes.ok) throw new Error(`获取微信登录二维码图片失败: HTTP ${qrRes.status}`);
    const qrBuffer = await qrRes.arrayBuffer();
    const base642 = Buffer.from(qrBuffer).toString("base64");
    return {
      code: 200,
      key: uuid,
      content: `data:image/jpeg;base64,${base642}`,
      type: "wx"
    };
  }
  const url = `https://ssl.ptlogin2.qq.com/ptqrshow?appid=716027609&e=2&l=M&s=3&d=72&v=4&t=${Math.random()}&daid=383&pt_3rd_aid=100497308`;
  const res = await fetch(url, {
    headers: {
      Referer: "https://xui.ptlogin2.qq.com/",
      "User-Agent": WEB_UA
    },
    signal: AbortSignal.timeout(8e3)
  });
  if (!res.ok) throw new Error(`获取 QQ 登录二维码失败: HTTP ${res.status}`);
  const cookies = extractCookies(res);
  const qrsig = cookies.qrsig;
  if (!qrsig) throw new Error("未能获取到 QQ 登录 qrsig");
  const buffer = await res.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  return {
    code: 200,
    key: qrsig,
    content: `data:image/png;base64,${base64}`,
    type: "qq"
  };
};
const login_qr_check = async (params) => {
  const key = String(params.key ?? "");
  const type = String(params.type ?? "qq").toLowerCase();
  if (!key) throw new Error("缺少二维码 key");
  if (type === "wx") {
    const query2 = new URLSearchParams({
      uuid: key,
      _: String(Date.now())
    });
    const res2 = await fetch(`https://lp.open.weixin.qq.com/connect/l/qrconnect?${query2}`, {
      headers: {
        Referer: "https://open.weixin.qq.com/",
        "User-Agent": WEB_UA
      },
      signal: AbortSignal.timeout(35e3)
    });
    const text2 = await res2.text();
    const match22 = /window\.wx_errcode=(\d+);window\.wx_code='([^']*)'/.exec(text2);
    if (!match22) {
      return { code: 200, status: 1 };
    }
    const errcode = Number(match22[1]);
    const wxCode = match22[2];
    if (errcode === 404) {
      return { code: 200, status: 2 };
    }
    if (errcode === 402 || errcode === 403) {
      return { code: 200, status: 0 };
    }
    if (errcode === 405 && wxCode) {
      const wxLoginData = await qmRequest(
        "music.login.LoginServer",
        "Login",
        { code: wxCode, strAppid: "wx48db31d50e334801" },
        { session: false, comm: { tmeLoginType: 1 } }
      );
      const uinStr = getCredentialMusicId(wxLoginData);
      if (!uinStr || !wxLoginData.musickey) throw new Error("微信登录响应缺少有效凭据");
      const savedCookies = credentialToSession(wxLoginData, 1);
      mergeQQMusicCookies(savedCookies);
      coreLog.info(`[qm-login] 微信扫码登录成功 (uin: ${uinStr})`);
      return {
        code: 200,
        status: 4,
        nickname: wxLoginData.nick || wxLoginData.nickname,
        avatarUrl: wxLoginData.logo || wxLoginData.avatarUrl
      };
    }
    return { code: 200, status: 1 };
  }
  const ptqrtoken = hash33(key, 0);
  const query = new URLSearchParams({
    u1: "https://graph.qq.com/oauth2.0/login_jump",
    ptqrtoken: String(ptqrtoken),
    ptredirect: "0",
    h: "1",
    t: "1",
    g: "1",
    from_ui: "1",
    ptlang: "2052",
    action: `0-0-${Date.now()}`,
    js_ver: "20102616",
    js_type: "1",
    pt_uistyle: "40",
    aid: "716027609",
    daid: "383",
    pt_3rd_aid: "100497308",
    has_onekey: "1"
  });
  const res = await fetch(`https://ssl.ptlogin2.qq.com/ptqrlogin?${query}`, {
    headers: {
      Referer: "https://xui.ptlogin2.qq.com/",
      Cookie: `qrsig=${key};`,
      "User-Agent": WEB_UA
    },
    signal: AbortSignal.timeout(8e3)
  });
  const text = await res.text();
  const match2 = /ptuiCB\((.*?)\)/.exec(text);
  if (!match2) return { code: 200, status: 1 };
  const args = [...match2[1].matchAll(/'((?:\\.|[^'])*)'/g)].map((m) => m[1]);
  const statusCode = args[0];
  const nickname = args[5] || "";
  if (statusCode === "65") {
    return { code: 200, status: 0 };
  }
  if (statusCode === "67") {
    return { code: 200, status: 2, nickname };
  }
  if (statusCode === "0") {
    const jumpUrl = args[2] ?? "";
    if (!jumpUrl || !jumpUrl.startsWith("http")) {
      throw new Error(`无效的跳转链接: ${jumpUrl}`);
    }
    const initialCookies = extractCookies(res, { qrsig: key });
    coreLog.info("[qm-login] 正在执行 check_sig 授权...", { jumpUrl });
    const checkSigRes = await fetch(jumpUrl, {
      headers: {
        Referer: "https://xui.ptlogin2.qq.com/",
        Cookie: stringifyCookies(initialCookies),
        "User-Agent": WEB_UA
      },
      redirect: "manual",
      signal: AbortSignal.timeout(8e3)
    });
    const sessionCookies = extractCookies(checkSigRes, initialCookies);
    const p_skey = sessionCookies.p_skey || sessionCookies.p_sKey || sessionCookies.skey || sessionCookies.pskey;
    if (!p_skey) {
      coreLog.warn("[qm-login] check_sig 未提取到 p_skey:", {
        status: checkSigRes.status,
        headers: Object.fromEntries(checkSigRes.headers.entries()),
        cookies: sessionCookies
      });
      throw new Error("获取 p_skey 失败");
    }
    const authBody = new URLSearchParams({
      response_type: "code",
      client_id: "100497308",
      redirect_uri: "https://y.qq.com/portal/wx_redirect.html?login_type=1&surl=https://y.qq.com/",
      scope: "get_user_info,get_app_friends",
      state: "state",
      switch: "",
      from_ptlogin: "1",
      src: "1",
      update_auth: "1",
      openapi: "1010_1030",
      g_tk: String(hash33(p_skey, 5381)),
      auth_time: String(Date.now()),
      ui: randomUUID()
    });
    const authRes = await fetch("https://graph.qq.com/oauth2.0/authorize", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Referer: "https://xui.ptlogin2.qq.com/",
        Cookie: stringifyCookies(sessionCookies),
        "User-Agent": WEB_UA
      },
      body: authBody.toString(),
      redirect: "manual",
      signal: AbortSignal.timeout(8e3)
    });
    const location = authRes.headers.get("Location") || authRes.headers.get("location") || "";
    const codeMatch = /(?<=code=)(.+?)(?=&|$)/.exec(location);
    if (!codeMatch) {
      coreLog.warn("[qm-login] authorize 未返回 code:", {
        status: authRes.status,
        location
      });
      throw new Error("获取 QQ 授权 code 失败");
    }
    const code = codeMatch[1];
    const qqLoginData = await qmRequest(
      "QQConnectLogin.LoginServer",
      "QQLogin",
      { code },
      { session: false, comm: { tmeLoginType: 2 } }
    );
    const uinMatch = /(?:\?|&)uin=(.+?)&/.exec(jumpUrl);
    const uin = uinMatch?.[1] || "";
    const uinStr = getCredentialMusicId(qqLoginData, uin);
    if (!uinStr || !qqLoginData.musickey) throw new Error("QQ 登录响应缺少有效凭据");
    const savedCookies = credentialToSession(qqLoginData, 2, uin);
    mergeQQMusicCookies(savedCookies);
    coreLog.info(`[qm-login] QQ 扫码登录成功 (uin: ${uinStr})`);
    return {
      code: 200,
      status: 4,
      nickname: qqLoginData.nick || qqLoginData.nickname || nickname,
      avatarUrl: qqLoginData.logo || qqLoginData.avatarUrl || `https://q.qlogo.cn/headimg_dl?dst_uin=${uinStr}&spec=100`
    };
  }
  return { code: 200, status: 1 };
};
const modules = {
  hot_search: hotSearch,
  leaderboard,
  lyric,
  match,
  search,
  album,
  artist,
  song_info: songInfo,
  song_list: songList,
  user_detail: userDetail,
  song_url: songUrl,
  comment,
  login_qr_key,
  login_qr_check
};
const DEFAULT_TTL = 2 * 60 * 1e3;
const MAX_ENTRIES = 200;
const cache$1 = /* @__PURE__ */ new Map();
const NON_CACHEABLE = /* @__PURE__ */ new Set([
  "user_detail",
  "song_url",
  "comment",
  "login_qr_key",
  "login_qr_check"
]);
const hashParams = (params) => createHash("md5").update(JSON.stringify(params ?? {})).digest("hex").slice(0, 8);
const cacheGet = (key) => {
  const hit = cache$1.get(key);
  if (!hit) return void 0;
  if (hit.expireAt <= Date.now()) {
    cache$1.delete(key);
    return void 0;
  }
  cache$1.delete(key);
  cache$1.set(key, hit);
  return hit.value;
};
const cacheSet = (key, value, ttl = DEFAULT_TTL) => {
  if (cache$1.size >= MAX_ENTRIES) {
    const oldest = cache$1.keys().next().value;
    if (oldest !== void 0) cache$1.delete(oldest);
  }
  cache$1.set(key, { value, expireAt: Date.now() + ttl });
};
const callQQMusic = async (name, params = {}) => {
  const fn = Object.hasOwn(modules, name) ? modules[name] : void 0;
  if (!fn) throw new Error(`unknown qm api: ${name}`);
  if (NON_CACHEABLE.has(name)) return fn(params);
  const key = `${name}|${hashParams(params)}`;
  const hit = cacheGet(key);
  if (hit !== void 0) return hit;
  const value = await fn(params);
  cacheSet(key, value);
  return value;
};
const MAX_CACHE_SIZE = 500;
const recentTracksCache = /* @__PURE__ */ new Map();
const cacheTracks = (tracks) => {
  for (const track of tracks) {
    if (track && typeof track.id === "string") {
      recentTracksCache.set(track.id, track);
    }
  }
  if (recentTracksCache.size > MAX_CACHE_SIZE) {
    const keysToDelete = Array.from(recentTracksCache.keys()).slice(
      0,
      recentTracksCache.size - MAX_CACHE_SIZE
    );
    for (const key of keysToDelete) {
      recentTracksCache.delete(key);
    }
  }
};
const getTracksByIds = (ids) => {
  if (ids.length === 0) return [];
  const foundMap = /* @__PURE__ */ new Map();
  const missingIds = [];
  for (const id of ids) {
    const cached = recentTracksCache.get(id);
    if (cached) {
      foundMap.set(id, cached);
    } else {
      missingIds.push(id);
    }
  }
  if (missingIds.length > 0) {
    try {
      const dbTracks = getTracksByIds$1(missingIds);
      for (const track of dbTracks) {
        foundMap.set(track.id, track);
        recentTracksCache.set(track.id, track);
      }
    } catch {
    }
  }
  const result2 = [];
  for (const id of ids) {
    const item = foundMap.get(id);
    if (item) {
      result2.push(item);
    }
  }
  return result2;
};
const getTrackById = (id) => {
  const [track] = getTracksByIds([id]);
  return track;
};
const sizedNeteaseCover = (url, size) => url ? `${url}${url.includes("?param=") ? "" : `?param=${size}y${size}`}` : void 0;
const neteaseToTrack = (song) => {
  const album2 = song.al ?? song.album;
  const artists2 = song.ar ?? song.artists ?? [];
  const cover = sizedNeteaseCover(album2?.picUrl, 300);
  return {
    id: String(song.id),
    source: "netease",
    title: song.name,
    comment: (song.alia ?? song.alias)?.find((item) => item.trim()) || void 0,
    artists: artists2.map((artist2) => ({
      id: artist2.id == null ? void 0 : String(artist2.id),
      name: artist2.name ?? ""
    })),
    album: album2?.name ? { id: album2.id == null ? void 0 : String(album2.id), name: album2.name, cover } : void 0,
    duration: song.dt ?? song.duration ?? 0,
    cover,
    coverOriginal: sizedNeteaseCover(album2?.picUrl, 1024),
    fee: song.fee
  };
};
const qqCover = (mid, size) => `https://y.gtimg.cn/music/photo_new/T002R${size}x${size}M000${mid}.jpg`;
const qqMusicToTrack = (song) => {
  const cover = song.albumMid ? qqCover(song.albumMid, 300) : void 0;
  return {
    id: song.mid || song.id,
    extId: song.mid && song.id !== song.mid ? song.id : void 0,
    source: "qqmusic",
    title: song.name,
    artists: song.artist ? [{ name: song.artist }] : [],
    album: song.album ? { name: song.album, cover } : void 0,
    duration: song.duration ?? 0,
    cover,
    coverOriginal: song.albumMid ? qqCover(song.albumMid, 800) : void 0
  };
};
const kugouToTrack = (song) => ({
  id: song.hash || song.id,
  source: "kugou",
  title: song.name,
  artists: song.artist ? [{ name: song.artist }] : [],
  album: song.album ? { name: song.album, cover: song.cover } : void 0,
  duration: song.duration ?? 0,
  cover: song.cover,
  coverOriginal: song.coverOriginal
});
const result = (platform, page, limit, total, tracks) => {
  cacheTracks(tracks);
  return {
    platform,
    page,
    total,
    hasMore: (page - 1) * limit + tracks.length < total,
    tracks
  };
};
const searchOnlineTracks = async (platform, query, page, limit) => {
  if (platform === "netease") {
    const { body: body2 } = await callNetease("cloudsearch", {
      keywords: query,
      type: 1,
      offset: (page - 1) * limit,
      limit
    });
    if (body2?.code !== 200) throw new Error(body2?.message ?? body2?.msg ?? "Netease search failed");
    const songs2 = body2?.result?.songs ?? [];
    return result(
      platform,
      page,
      limit,
      body2?.result?.songCount ?? songs2.length,
      songs2.map(neteaseToTrack)
    );
  }
  if (platform === "qqmusic") {
    const body2 = await callQQMusic("search", {
      keywords: query,
      type: 0,
      page,
      limit
    });
    if (body2.code !== 200) throw new Error(body2.message ?? "QQ Music search failed");
    const songs2 = body2.songs ?? [];
    return result(platform, page, limit, body2.total ?? songs2.length, songs2.map(qqMusicToTrack));
  }
  const body = await callKugou("search", { keywords: query, page, limit });
  if (body.code !== 200) throw new Error(body.message ?? "Kugou search failed");
  const songs = body.songs ?? [];
  return result(platform, page, limit, body.total ?? songs.length, songs.map(kugouToTrack));
};
const jsonContent = (value) => ({
  content: [{ type: "text", text: JSON.stringify(value) }]
});
const createServer = () => {
  const server = new McpServer({
    name: "splayer-next",
    version: appVersion
  });
  server.registerTool(
    "get_playback_status",
    {
      title: "获取播放状态",
      description: "获取 SPlayer 当前播放状态、进度、时长和音量。时间单位为毫秒",
      annotations: { readOnlyHint: true, idempotentHint: true }
    },
    () => {
      const status = getPlayer().getStatus();
      const playMode = getTrayPlayMode();
      return jsonContent({
        state: status.state,
        positionMs: toMs(status.position),
        durationMs: toMs(status.duration),
        volume: status.volume,
        isFinished: status.isFinished,
        repeat: playMode.repeat,
        shuffle: playMode.shuffle
      });
    }
  );
  server.registerTool(
    "get_now_playing",
    {
      title: "获取当前歌曲",
      description: "获取当前歌曲和播放位置的轻量快照，不包含完整歌词正文",
      annotations: { readOnlyHint: true, idempotentHint: true }
    },
    () => jsonContent(lightSnapshot())
  );
  const controls = [
    ["play", "继续播放", () => playerControl.play()],
    ["pause", "暂停播放", () => playerControl.pause()],
    ["stop", "停止播放", () => playerControl.stop()],
    ["next_track", "播放下一曲", () => playerControl.next()],
    ["previous_track", "播放上一曲", () => playerControl.prev()]
  ];
  for (const [name, description, run] of controls) {
    server.registerTool(
      name,
      {
        title: description,
        description: `${description}。`,
        annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false }
      },
      () => {
        run();
        return jsonContent({ ok: true });
      }
    );
  }
  server.registerTool(
    "seek",
    {
      title: "跳转播放位置",
      description: "将当前歌曲跳转到指定毫秒位置",
      inputSchema: { positionMs: z.number().finite().min(0) },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true }
    },
    async ({ positionMs }) => {
      await playerControl.seek(positionMs);
      return jsonContent({ ok: true, positionMs });
    }
  );
  server.registerTool(
    "set_volume",
    {
      title: "设置音量",
      description: "设置播放器音量，取值范围为 0 到 1",
      inputSchema: { volume: z.number().finite().min(0).max(1) },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true }
    },
    ({ volume }) => {
      playerControl.setVolume(volume);
      return jsonContent({ ok: true, volume });
    }
  );
  server.registerTool(
    "play_track",
    {
      title: "播放指定曲目",
      description: "将指定曲目加入播放队列并立即播放。推荐优先传入 trackId（来自搜索接口返回的歌曲 ID，极快），也可传入完整 track 对象。",
      inputSchema: {
        trackId: z.string().optional(),
        track: z.record(z.string(), z.any()).optional()
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false }
    },
    ({ trackId, track }) => {
      let targetTrack;
      if (trackId) {
        targetTrack = getTrackById(trackId);
      }
      if (!targetTrack && track && typeof track.id === "string") {
        targetTrack = track;
      }
      if (!targetTrack) {
        throw new Error("Invalid or missing track/trackId.");
      }
      playerControl.playTrack(targetTrack);
      return jsonContent({ ok: true, id: targetTrack.id });
    }
  );
  server.registerTool(
    "set_play_mode",
    {
      title: "设置播放模式",
      description: "设置播放器的循环模式或随机模式。repeat: 循环模式 (list/one), shuffle: 随机播放 (on/off)",
      inputSchema: {
        repeat: z.enum(["list", "one"]).optional(),
        shuffle: z.enum(["on", "off"]).optional()
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true }
    },
    ({ repeat, shuffle }) => {
      if (repeat) {
        playerControl.setRepeat(repeat);
      }
      if (shuffle) {
        playerControl.setShuffle(shuffle);
      }
      return jsonContent({ ok: true, repeat, shuffle });
    }
  );
  server.registerTool(
    "add_to_queue",
    {
      title: "添加到播放队列",
      description: "批量添加最多 50 首曲目到播放队列。强烈优先传入 trackIds（即搜索接口返回的歌曲 ID 数组，响应极快）；也可传入完整 tracks 数组。position 默认为 'next'（插入到当前播放歌曲之后，下一首播放），若需追加到队列最末尾可指定为 'end'。",
      inputSchema: {
        trackIds: z.array(z.string()).min(1).max(50).optional(),
        tracks: z.array(z.record(z.string(), z.any())).min(1).max(50).optional(),
        position: z.enum(["next", "end"]).optional()
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false }
    },
    ({ trackIds, tracks, position }) => {
      const targetPosition = position ?? "next";
      let targetTracks = [];
      if (trackIds && trackIds.length > 0) {
        targetTracks = getTracksByIds(trackIds);
      }
      if (targetTracks.length === 0 && tracks && tracks.length > 0) {
        if (tracks.some((track) => typeof track.id !== "string")) {
          throw new Error("Invalid track object.");
        }
        targetTracks = tracks;
      }
      if (targetTracks.length === 0) {
        throw new Error("No valid tracks or trackIds provided.");
      }
      playerControl.addToQueue(targetTracks, targetPosition);
      return jsonContent({ ok: true, count: targetTracks.length, position: targetPosition });
    }
  );
  server.registerTool(
    "search_library",
    {
      title: "搜索本地曲库",
      description: "按歌曲名、艺术家或专辑搜索本地曲库，返回匹配的曲目",
      inputSchema: {
        query: z.string().trim().min(1).max(200),
        limit: z.number().int().min(1).max(100).default(20)
      },
      annotations: { readOnlyHint: true, idempotentHint: true }
    },
    ({ query, limit }) => {
      const matches = searchTracks$1(query);
      const sliced = matches.slice(0, limit);
      cacheTracks(sliced);
      return jsonContent({
        total: matches.length,
        tracks: sliced
      });
    }
  );
  server.registerTool(
    "search_online_songs",
    {
      title: "搜索在线歌曲",
      description: "按关键词搜索网易云音乐、QQ 音乐或KG音乐，返回可直接传给 play_track 的曲目",
      inputSchema: {
        platform: z.enum(["netease", "qqmusic", "kugou"]),
        query: z.string().trim().min(1).max(200),
        page: z.number().int().min(1).max(100).default(1),
        limit: z.number().int().min(1).max(50).default(20)
      },
      annotations: { readOnlyHint: true, idempotentHint: true }
    },
    async ({ platform, query, page, limit }) => jsonContent(await searchOnlineTracks(platform, query, page, limit))
  );
  server.registerTool(
    "get_random_tracks",
    {
      title: "随机获取曲目",
      description: "从本地曲库随机返回若干首曲目",
      inputSchema: { limit: z.number().int().min(1).max(50).default(10) },
      annotations: { readOnlyHint: true, idempotentHint: false }
    },
    ({ limit }) => {
      const tracks = getRandomTracks(limit);
      cacheTracks(tracks);
      return jsonContent({ tracks });
    }
  );
  server.registerTool(
    "list_albums",
    {
      title: "列出专辑",
      description: "列出本地曲库中的专辑摘要，最多返回 100 条",
      inputSchema: { limit: z.number().int().min(1).max(100).default(50) },
      annotations: { readOnlyHint: true, idempotentHint: true }
    },
    ({ limit }) => {
      const albums = getAlbumList();
      return jsonContent({
        total: albums.length,
        albums: albums.slice(0, limit).map(({ cover: _cover, ...album2 }) => album2)
      });
    }
  );
  server.registerTool(
    "list_artists",
    {
      title: "列出艺术家",
      description: "列出本地曲库中的艺术家摘要，最多返回 100 条",
      inputSchema: { limit: z.number().int().min(1).max(100).default(50) },
      annotations: { readOnlyHint: true, idempotentHint: true }
    },
    ({ limit }) => {
      const artists2 = getArtistList();
      return jsonContent({
        total: artists2.length,
        artists: artists2.slice(0, limit).map(({ cover: _cover, ...artist2 }) => artist2)
      });
    }
  );
  server.registerResource(
    "now-playing",
    "splayer://now-playing",
    {
      title: "SPlayer 当前播放",
      description: "不含完整歌词正文的当前歌曲与播放位置轻量快照",
      mimeType: "application/json"
    },
    (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(lightSnapshot())
        }
      ]
    })
  );
  server.registerResource(
    "library-summary",
    "splayer://library/summary",
    {
      title: "SPlayer 曲库摘要",
      description: "本地曲库的歌曲、专辑和艺术家数量",
      mimeType: "application/json"
    },
    (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify({
            tracks: getTrackCount(),
            albums: getAlbumList().length,
            artists: getArtistList().length
          })
        }
      ]
    })
  );
  return server;
};
const createMcpEndpoint = () => createMcpEndpoint$1(createServer);
let runningServer = null;
let runningEndpoint = null;
let runningPort = null;
let lastError = null;
const getMcpStatus = () => ({
  listening: runningServer !== null,
  port: runningPort,
  error: lastError
});
const publishStatus = () => broadcast("mcp:status", getMcpStatus());
const getAccessKey = () => {
  const current2 = store$1.get("mcp.accessKey");
  if (current2) return current2;
  const generated = randomBytes(16).toString("hex");
  store$1.set("mcp.accessKey", generated);
  return generated;
};
const getMcpClientConfigParams = () => ({
  port: runningPort ?? store$1.get("mcp.port"),
  accessKey: getAccessKey()
});
const hasValidAccessKey = (candidate) => {
  if (!candidate) return false;
  const expected = Buffer.from(getAccessKey());
  const received = Buffer.from(candidate);
  return expected.length === received.length && timingSafeEqual(expected, received);
};
const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  try {
    const hostname = new URL(origin).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
  } catch {
    return false;
  }
};
const startMcpServer = () => {
  return new Promise((resolve2) => {
    if (runningServer || !store$1.get("mcp.enabled")) {
      resolve2(getMcpStatus());
      return;
    }
    const port = store$1.get("mcp.port");
    const endpoint = createMcpEndpoint();
    const app2 = new Hono();
    app2.all("/mcp", async (c) => {
      if (!store$1.get("mcp.enabled")) return c.json({ error: "MCP disabled" }, 403);
      if (!hasValidAccessKey(c.req.header("x-mcp-key"))) {
        return c.json({ error: "invalid MCP key" }, 401);
      }
      if (!isAllowedOrigin(c.req.header("origin"))) {
        return c.json({ error: "invalid Origin" }, 403);
      }
      return endpoint.handle(c.req.raw);
    });
    app2.get("/", (c) => c.text("SPlayer Next MCP server"));
    let settled = false;
    const server = serve({ fetch: app2.fetch, port, hostname: "127.0.0.1" });
    server.once("error", (error) => {
      if (settled) return;
      settled = true;
      lastError = { code: error.code ?? "UNKNOWN", message: error.message };
      publishStatus();
      serverLog.error(`MCP 服务监听 ${port} 失败 (${lastError.code}): ${lastError.message}`);
      void endpoint.close();
      try {
        server.close();
      } catch {
      }
      resolve2(getMcpStatus());
    });
    server.once("listening", () => {
      if (settled) return;
      settled = true;
      runningServer = server;
      runningEndpoint = endpoint;
      runningPort = port;
      lastError = null;
      publishStatus();
      serverLog.info(`MCP 服务已启动: http://127.0.0.1:${port}/mcp`);
      resolve2(getMcpStatus());
    });
  });
};
const stopMcpServer = async () => {
  if (!runningServer) return;
  const server = runningServer;
  const endpoint = runningEndpoint;
  runningServer = null;
  runningEndpoint = null;
  runningPort = null;
  publishStatus();
  const serverClosed = new Promise((resolve2) => {
    server.close((error) => {
      if (error) serverLog.warn("MCP 服务关闭异常:", error);
      else serverLog.info("MCP 服务已关闭");
      resolve2();
    });
  });
  await Promise.all([serverClosed, endpoint?.close()]);
};
const restartMcpServer = async () => {
  await stopMcpServer();
  return startMcpServer();
};
const { autoUpdater } = electronUpdater;
const canSelfInstall = !isMac && !isPortable && !isAppX;
const RELEASES_URL = "https://github.com/SPlayer-Dev/SPlayer-Next/releases";
const STORE_UPDATES_URL = "ms-windows-store://updates";
const CHECK_INTERVAL_MS = 6 * 60 * 60 * 1e3;
let manualCheck = false;
let currentCheck = null;
let pendingCheck = null;
let availableVersion = null;
let intervalTimer = null;
const emit$1 = (event) => sendToMain("update:event", event);
const getChannel = () => {
  const channel = store$1.get("update.channel");
  return channel === "beta" || channel === "alpha" ? channel : "stable";
};
const applyChannel = (allowDowngrade = false) => {
  const channel = getChannel();
  autoUpdater.channel = channel === "stable" ? "latest" : channel;
  autoUpdater.allowPrerelease = channel !== "stable";
  autoUpdater.allowDowngrade = allowDowngrade;
};
const normalizeNotes = (notes) => {
  if (!notes) return "";
  if (typeof notes === "string") return notes;
  return notes.map((item) => item.note ?? "").filter(Boolean).join("\n\n");
};
const toMeta = (info) => ({
  version: info.version,
  releaseNotes: normalizeNotes(info.releaseNotes),
  releaseDate: info.releaseDate,
  size: Math.max(0, ...(info.files ?? []).map((file) => file.size ?? 0))
});
const bindEvents = () => {
  autoUpdater.on("checking-for-update", () => emit$1({ type: "checking" }));
  autoUpdater.on("update-available", (info) => {
    availableVersion = info.version;
    emit$1({
      type: "available",
      meta: toMeta(info),
      manual: manualCheck,
      canInstall: canSelfInstall
    });
  });
  autoUpdater.on("update-not-available", () => {
    availableVersion = null;
    emit$1({ type: "notAvailable", manual: manualCheck });
  });
  autoUpdater.on(
    "download-progress",
    (progress2) => emit$1({ type: "progress", percent: Math.round(progress2.percent) })
  );
  autoUpdater.on("update-downloaded", (info) => emit$1({ type: "downloaded", meta: toMeta(info) }));
  autoUpdater.on("error", (error) => {
    updaterLog.error("更新出错", error);
    emit$1({ type: "error", message: error?.message ?? String(error), manual: manualCheck });
  });
};
const runCheck = (manual, allowDowngrade) => {
  if (currentCheck) {
    pendingCheck = {
      manual: manual || pendingCheck?.manual === true,
      allowDowngrade: allowDowngrade ?? pendingCheck?.allowDowngrade ?? false
    };
    return;
  }
  applyChannel(allowDowngrade ?? false);
  manualCheck = manual;
  currentCheck = autoUpdater.checkForUpdates().catch(() => {
  }).finally(() => {
    currentCheck = null;
    const pending2 = pendingCheck;
    pendingCheck = null;
    if (pending2) runCheck(pending2.manual, pending2.allowDowngrade);
  });
};
const checkForUpdates = (manual) => {
  if (!manual && !store$1.get("update.autoCheck")) return;
  runCheck(manual);
};
const downloadUpdate = () => {
  if (!canSelfInstall) return;
  autoUpdater.downloadUpdate().catch((error) => {
    updaterLog.error("下载更新失败", error);
    emit$1({ type: "error", message: error?.message ?? String(error), manual: true });
  });
};
const applyChannelChange = (previous, channel) => {
  if (previous === channel) return;
  updaterLog.info(`切换更新通道: ${previous} -> ${channel}`);
  const channelPriority = { stable: 0, beta: 1, alpha: 2 };
  runCheck(true, channelPriority[channel] < channelPriority[previous]);
};
const quitAndInstall = () => {
  if (!canSelfInstall) return;
  autoUpdater.quitAndInstall();
};
const openDownloadPage = () => {
  const releaseUrl = availableVersion ? `${RELEASES_URL}/tag/v${encodeURIComponent(availableVersion)}` : RELEASES_URL;
  void shell.openExternal(isAppX ? STORE_UPDATES_URL : releaseUrl);
};
const initUpdater = () => {
  autoUpdater.logger = updaterLog;
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  applyChannel();
  bindEvents();
  if (isDev) {
    autoUpdater.forceDevUpdateConfig = true;
    updaterLog.info("开发模式，仅支持手动检查更新");
    return;
  }
  intervalTimer = setInterval(() => checkForUpdates(false), CHECK_INTERVAL_MS);
};
const disposeUpdater = () => {
  if (intervalTimer) clearInterval(intervalTimer);
  intervalTimer = null;
};
const applyConfigChange = (keyPath, value, previous) => {
  switch (keyPath) {
    case "update.channel":
      applyChannelChange(previous, value);
      break;
    case "media.systemMediaControls":
      value ? enable() : disable();
      break;
    case "media.discord.enabled":
    case "media.discord.showWhenPaused":
    case "media.discord.displayMode":
      reloadDiscordConfig();
      break;
    case "lastfm.enabled":
    case "lastfm.scrobble":
    case "lastfm.nowPlaying":
    case "lastfm.loveSync":
      reloadConfig();
      break;
    case "player.loudnessNormalization":
      setNormalizationEnabled(value);
      break;
    case "player.equalizer.enabled":
      setEqualizerEnabled(value);
      break;
    case "player.equalizer.bands":
      setEqualizerBands(value);
      break;
    case "player.equalizer.preamp":
      setPreampGain(value);
      break;
    case "system.taskbarProgress":
      if (!value) setTaskbarProgress(-1);
      break;
    case "system.taskbarThumbnailCover":
      setTaskbarThumbnailEnabled(value);
      break;
    case "system.registerOrpheusProtocol":
      setOrpheusProtocolRegistered(value);
      break;
    case "externalApi.enabled":
      void (value ? startServer() : stopServer());
      break;
    case "mcp.enabled":
      void (value ? startMcpServer() : stopMcpServer());
      break;
    case "system.uiZoom":
      applyMainWindowZoom();
      break;
    case "desktopLyric.locked":
      applyDesktopLyricLock(value);
      break;
    case "desktopLyric.alwaysOnTop":
      applyDesktopLyricAlwaysOnTop(value);
      break;
    case "dynamicIsland.alwaysOnTop":
      applyDynamicIslandAlwaysOnTop(value);
      break;
    case "dynamicIsland.snapCentered":
      applyDynamicIslandSnapCentered(value);
      break;
    case "dynamicIsland.notchFusion":
      applyDynamicIslandNotchFusion(value);
      break;
    case "dynamicIsland.nonOcclusive":
      applyDynamicIslandNonOcclusive(value);
      break;
    case "taskbarLyric.position":
    case "taskbarLyric.autoMaxWidth":
    case "taskbarLyric.autoAdjustOccupiedSpace":
    case "taskbarLyric.maxWidth":
    case "taskbarLyric.leftMargin":
    case "taskbarLyric.rightMargin":
      if (isWin) applyTaskbarLyricLayout();
      break;
  }
  if (keyPath.startsWith("desktopLyric.")) {
    broadcast("desktopLyric:configChange", store$1.get("desktopLyric"));
  }
  if (keyPath.startsWith("dynamicIsland.")) {
    broadcast("dynamicIsland:configChange", store$1.get("dynamicIsland"));
  }
  if (isWin && keyPath.startsWith("taskbarLyric.")) {
    broadcast("taskbarLyric:configChange", store$1.get("taskbarLyric"));
  }
};
const registerConfigIpc = () => {
  ipcMain.handle("config:get", (_event, keyPath) => store$1.get(keyPath));
  ipcMain.handle("config:set", (_event, keyPath, value) => {
    if (keyPath === "update.channel" && value !== "stable" && value !== "beta" && value !== "alpha") {
      throw new Error(`无效的更新通道: ${String(value)}`);
    }
    const previous = store$1.get(keyPath);
    store$1.set(keyPath, value);
    applyConfigChange(keyPath, value, previous);
  });
  ipcMain.handle("config:getAll", () => store$1.store);
  ipcMain.handle("config:reset", () => store$1.clear());
  ipcMain.handle("config:replaceAll", (_event, payload) => {
    store$1.replaceAll(payload);
  });
  ipcMain.handle(
    "config:exportToFile",
    async (_event, payload) => {
      const stamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").slice(0, 19);
      const result2 = await dialog.showSaveDialog({
        title: "导出设置备份",
        defaultPath: `splayer-settings-${stamp}.json`,
        filters: [{ name: "JSON", extensions: ["json"] }]
      });
      if (result2.canceled || !result2.filePath) return { ok: false, reason: "canceled" };
      try {
        await fsp.writeFile(result2.filePath, JSON.stringify(payload, null, 2), "utf-8");
        systemLog.info(`[config] settings exported to ${result2.filePath}`);
        return { ok: true };
      } catch (err) {
        systemLog.error("[config] exportToFile failed", err);
        return { ok: false, reason: "writeFailed" };
      }
    }
  );
  ipcMain.handle(
    "config:importFromFile",
    async () => {
      const result2 = await dialog.showOpenDialog({
        title: "选择设置备份文件",
        filters: [{ name: "JSON", extensions: ["json"] }],
        properties: ["openFile"]
      });
      if (result2.canceled || result2.filePaths.length === 0) {
        return { ok: false, reason: "canceled" };
      }
      try {
        const text = await fsp.readFile(result2.filePaths[0], "utf-8");
        try {
          return { ok: true, data: JSON.parse(text) };
        } catch (err) {
          systemLog.error("[config] importFromFile parse failed", err);
          return { ok: false, reason: "parseFailed" };
        }
      } catch (err) {
        systemLog.error("[config] importFromFile read failed", err);
        return { ok: false, reason: "readFailed" };
      }
    }
  );
};
const commandPattern = /^\s*([A-Z0-9]+)\s*(.*)$/i;
const toCueTrackPath = (cuePath, trackNumber) => `cue://${cuePath}#track=${trackNumber.toString().padStart(2, "0")}`;
const extractCuePath = (cueTrackPath) => {
  const match2 = cueTrackPath.match(/^cue:\/\/(.+)#track=\d+$/);
  return match2?.[1] ?? null;
};
const readToken = (value) => {
  const trimmed = value.trim();
  if (!trimmed.startsWith('"')) return trimmed.split(/\s+/)[0] ?? "";
  let token = "";
  for (let i = 1; i < trimmed.length; i++) {
    const char = trimmed[i];
    if (char === '"') break;
    token += char;
  }
  return token;
};
const parseIndexMs = (value) => {
  const match2 = value.trim().match(/^(\d+):(\d{2}):(\d{2})$/);
  if (!match2) return null;
  const minutes = Number(match2[1]);
  const seconds = Number(match2[2]);
  const frames = Number(match2[3]);
  if (!Number.isFinite(minutes) || seconds > 59 || frames > 74) return null;
  return (minutes * 60 + seconds) * 1e3 + Math.round(frames * 1e3 / 75);
};
const parseState = (content) => {
  const state2 = { files: [] };
  let currentFile = null;
  let currentTrack2 = null;
  for (const rawLine of content.replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const match2 = rawLine.match(commandPattern);
    if (!match2) continue;
    const command = match2[1].toUpperCase();
    const value = match2[2] ?? "";
    if (command === "FILE") {
      currentFile = { path: readToken(value), tracks: [] };
      state2.files.push(currentFile);
      currentTrack2 = null;
      continue;
    }
    if (command === "TRACK") {
      const number = Number(value.trim().split(/\s+/)[0]);
      if (!currentFile || !Number.isFinite(number)) continue;
      currentTrack2 = { number };
      currentFile.tracks.push(currentTrack2);
      continue;
    }
    if (command === "TITLE") {
      const title = readToken(value);
      if (currentTrack2) currentTrack2.title = title;
      else state2.albumTitle = title;
      continue;
    }
    if (command === "PERFORMER") {
      const performer = readToken(value);
      if (currentTrack2) currentTrack2.performer = performer;
      else state2.albumPerformer = performer;
      continue;
    }
    if (command === "INDEX" && currentTrack2) {
      const parts = value.trim().split(/\s+/);
      if (parts[0] !== "01") continue;
      const ms = parseIndexMs(parts[1] ?? "");
      if (ms != null) currentTrack2.index01 = ms;
    }
  }
  return state2;
};
const getCueAudioPath = (content, cuePath) => {
  const state2 = parseState(content);
  if (state2.files.length !== 1) return null;
  return path.resolve(path.dirname(cuePath), state2.files[0].path);
};
const parseCueSheet = (content, cuePath, audioDurationMs) => {
  const state2 = parseState(content);
  if (state2.files.length !== 1 || audioDurationMs <= 0) return [];
  const file = state2.files[0];
  const audioPath = path.resolve(path.dirname(cuePath), file.path);
  const indexedTracks = file.tracks.filter((track) => track.index01 != null).sort((a, b) => (a.index01 ?? 0) - (b.index01 ?? 0));
  return indexedTracks.map((track, index) => {
    const start = track.index01 ?? 0;
    const nextStart = indexedTracks[index + 1]?.index01 ?? audioDurationMs;
    const end = Math.min(audioDurationMs, nextStart);
    if (end <= start) return null;
    const performer = track.performer || state2.albumPerformer || "";
    const artists2 = performer ? [{ name: performer }] : [];
    const album2 = state2.albumTitle ? { name: state2.albumTitle, artist: state2.albumPerformer } : void 0;
    return {
      title: track.title || `${path.basename(cuePath, path.extname(cuePath))} #${track.number}`,
      artists: artists2,
      album: album2,
      track: track.number,
      path: toCueTrackPath(cuePath, track.number),
      cuePath,
      cueAudioPath: audioPath,
      cueStartMs: start,
      cueEndMs: end,
      duration: end - start
    };
  }).filter((track) => track !== null);
};
let scanning = false;
const pathKey = (value) => {
  const resolved = path.resolve(value);
  return isWin ? resolved.toLowerCase() : resolved;
};
const scannedToUpsert = (track) => {
  const id = createHash("sha256").update(track.path).digest("hex").slice(0, 16);
  return {
    id,
    path: track.path,
    title: track.title || track.path.split(/[/\\]/).pop() || track.path,
    track: track.track,
    artists: parseArtists(track.artist ?? ""),
    album: parseAlbum(track.album ?? ""),
    duration: toMs(track.duration),
    cover: toCacheUrl(track.cover),
    codec: track.codec,
    sampleRate: track.sampleRate,
    bitRate: track.bitRate,
    channels: track.channels,
    bitsPerSample: track.bitsPerSample,
    fileSize: track.fileSize,
    mtime: track.mtime,
    ctime: track.ctime
  };
};
const syncCueTracks = async (cueFiles, dirs, unavailableDirs = []) => {
  const allTracks = getAllTracks();
  const audioByPath = new Map(
    allTracks.flatMap(
      (track) => !track.cuePath && track.path ? [[pathKey(track.path), track]] : []
    )
  );
  const existingByCue = /* @__PURE__ */ new Map();
  for (const track of allTracks) {
    if (!track.cuePath || !track.path) continue;
    const key = pathKey(track.cuePath);
    const group = existingByCue.get(key);
    if (group) group.paths.push(track.path);
    else existingByCue.set(key, { mtime: track.mtime ?? -1, paths: [track.path] });
  }
  const upserts = [];
  const nextPaths = /* @__PURE__ */ new Set();
  for (const cuePath of cueFiles) {
    try {
      const cueStat = await fsp.stat(cuePath);
      const existing = existingByCue.get(pathKey(cuePath));
      if (existing && existing.mtime === cueStat.mtimeMs) {
        for (const trackPath of existing.paths) nextPaths.add(trackPath);
        continue;
      }
      const content = await readFileAutoEncoding(cuePath);
      const audioPath = getCueAudioPath(content, cuePath);
      if (!audioPath) continue;
      const audio = audioByPath.get(pathKey(audioPath));
      if (!audio || audio.duration <= 0) continue;
      const cueTracks = parseCueSheet(content, cuePath, audio.duration);
      for (const cueTrack of cueTracks) {
        const id = createHash("sha256").update(cueTrack.path).digest("hex").slice(0, 16);
        nextPaths.add(cueTrack.path);
        upserts.push({
          id,
          path: cueTrack.path,
          cuePath: cueTrack.cuePath,
          // 存容器整轨的真实入库路径（而非 CUE FILE 行解析值），保证与容器行 path 精确相等，据此隐藏容器
          cueAudioPath: audio.path,
          cueStartMs: cueTrack.cueStartMs,
          cueEndMs: cueTrack.cueEndMs,
          title: cueTrack.title,
          track: cueTrack.track,
          artists: cueTrack.artists,
          album: cueTrack.album,
          duration: cueTrack.duration,
          cover: audio.cover,
          codec: audio.quality?.codec,
          sampleRate: audio.quality?.sampleRate,
          bitRate: audio.quality?.bitRate,
          channels: audio.quality?.channels,
          bitsPerSample: audio.quality?.bitsPerSample,
          fileSize: audio.fileSize ?? cueStat.size,
          mtime: cueStat.mtimeMs,
          ctime: cueStat.ctimeMs
        });
      }
    } catch (error) {
      libraryLog.warn(`解析 CUE 失败 [${cuePath}]:`, error);
      const existing = existingByCue.get(pathKey(cuePath));
      if (existing) {
        for (const trackPath of existing.paths) nextPaths.add(trackPath);
      }
    }
  }
  if (upserts.length > 0) upsertTracks$1(upserts);
  const stalePaths = getCueTrackPathsByDirs(dirs).filter((trackPath) => {
    if (nextPaths.has(trackPath)) return false;
    const realCuePath = extractCuePath(trackPath);
    if (!realCuePath) return true;
    return !unavailableDirs.some((dir) => realCuePath.startsWith(dir));
  });
  if (stalePaths.length > 0) deleteTracksByPaths(stalePaths);
  return nextPaths.size;
};
const finishScan = async (dirs, event) => {
  if (event.removedPaths && event.removedPaths.length > 0) {
    deleteTracksByPaths(event.removedPaths);
    libraryLog.info(`清理 ${event.removedPaths.length} 个已删除文件`);
  }
  const cueCount = await syncCueTracks(event.cueFiles ?? [], dirs, event.unavailableDirs ?? []);
  scanning = false;
  broadcast("library:scanProgress", {
    phase: "done",
    total: event.total,
    scanned: event.scanned
  });
  libraryLog.info(`扫描完成: ${event.scanned}/${event.total} 个文件，CUE 分轨 ${cueCount} 首`);
};
const isScanning = () => scanning;
const startScan = (dirs, incremental = true) => {
  if (scanning) {
    libraryLog.warn("已有扫描任务进行中，跳过");
    return;
  }
  if (dirs.length === 0) {
    libraryLog.warn("无扫描目录，跳过");
    return;
  }
  scanning = true;
  libraryLog.info(`开始扫描 ${dirs.length} 个目录 (增量=${incremental})`);
  const incrementalData = incremental ? getFileRecords() : void 0;
  const engine = getEngine();
  engine.scanDirs(
    dirs,
    (event) => {
      switch (event.eventType) {
        case "progress": {
          if (!scanning) break;
          if (event.tracks && event.tracks.length > 0) {
            upsertTracks$1(event.tracks.map(scannedToUpsert));
          }
          broadcast("library:scanProgress", {
            phase: "scanning",
            total: event.total,
            scanned: event.scanned,
            current: event.current
          });
          break;
        }
        case "done": {
          void finishScan(dirs, event).catch((error) => {
            scanning = false;
            libraryLog.error("扫描收尾失败:", error);
            broadcast("library:scanProgress", {
              phase: "done",
              total: event.total,
              scanned: event.scanned
            });
          });
          break;
        }
      }
    },
    getCoverCacheDir(),
    incrementalData
  );
};
const cancelScan = () => {
  if (!scanning) return;
  const engine = getEngine();
  engine.cancelScan();
  scanning = false;
  libraryLog.info("已发送扫描取消信号");
};
const UA = "SPlayer-Next/1.0.0 (https://github.com/imsyy/SPlayer)";
const PREFETCH_CONCURRENCY = 2;
const avatarInFlight = /* @__PURE__ */ new Map();
const normalizeArtistName = (artistName) => artistName.trim().toLowerCase();
const getCacheFileName = (artistName) => {
  const safe = Buffer.from(artistName.toLowerCase()).toString("base64url");
  return `${safe}.jpg`;
};
const getNotFoundFileName = (artistName) => {
  const safe = Buffer.from(artistName.toLowerCase()).toString("base64url");
  return `${safe}.notfound`;
};
const ensureCacheDir = () => {
  if (!fs.existsSync(getArtistCacheDir())) {
    fs.mkdirSync(getArtistCacheDir(), { recursive: true });
  }
};
const searchMusicBrainzId = async (artistName) => {
  const url = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artistName)}&fmt=json&limit=1`;
  const response = await net.fetch(url, {
    headers: { "User-Agent": UA }
  });
  if (!response.ok) return null;
  const data2 = await response.json();
  const artist2 = data2.artists?.[0];
  if (!artist2 || artist2.score < 90) return null;
  return artist2.id;
};
const fetchAudioDbThumb = async (mbid) => {
  const url = `https://www.theaudiodb.com/api/v1/json/2/artist-mb.php?i=${mbid}`;
  const response = await net.fetch(url, {
    headers: { "User-Agent": UA }
  });
  if (!response.ok) return null;
  const data2 = await response.json();
  const artist2 = data2.artists?.[0];
  return artist2?.strArtistThumb || artist2?.strArtistFanart || null;
};
const downloadImage = async (imageUrl2, savePath) => {
  const response = await net.fetch(imageUrl2, {
    headers: { "User-Agent": UA }
  });
  if (!response.ok) return false;
  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(savePath, buffer);
  return true;
};
const fetchArtistAvatarCore = async (artistName) => {
  const name = artistName.trim();
  ensureCacheDir();
  const cacheFileName = getCacheFileName(name);
  const cachePath = path.join(getArtistCacheDir(), cacheFileName);
  if (fs.existsSync(cachePath)) {
    return toCacheUrl(cachePath) ?? null;
  }
  const notFoundPath = path.join(getArtistCacheDir(), getNotFoundFileName(name));
  if (fs.existsSync(notFoundPath)) {
    const stat2 = fs.statSync(notFoundPath);
    if (Date.now() - stat2.mtimeMs < 7 * 24 * 60 * 60 * 1e3) return null;
    fs.unlinkSync(notFoundPath);
  }
  try {
    const mbid = await searchMusicBrainzId(name);
    if (!mbid) {
      fs.writeFileSync(notFoundPath, "");
      return null;
    }
    const thumbUrl = await fetchAudioDbThumb(mbid);
    if (!thumbUrl) {
      fs.writeFileSync(notFoundPath, "");
      return null;
    }
    const ok = await downloadImage(thumbUrl, cachePath);
    if (!ok) {
      fs.writeFileSync(notFoundPath, "");
      return null;
    }
    return toCacheUrl(cachePath) ?? null;
  } catch {
    return null;
  }
};
const fetchArtistAvatar = async (artistName) => {
  if (!artistName?.trim()) return null;
  const key = normalizeArtistName(artistName);
  const existing = avatarInFlight.get(key);
  if (existing) return existing;
  const task = fetchArtistAvatarCore(artistName);
  avatarInFlight.set(key, task);
  try {
    return await task;
  } finally {
    avatarInFlight.delete(key);
  }
};
const prefetchArtistAvatars = async (artistNames) => {
  const deduped = /* @__PURE__ */ new Map();
  for (const name of artistNames) {
    if (!name?.trim()) continue;
    const key = normalizeArtistName(name);
    if (!key || deduped.has(key)) continue;
    deduped.set(key, name.trim());
  }
  const queue2 = [...deduped.values()];
  const result2 = {};
  if (!queue2.length) return result2;
  let index = 0;
  const worker2 = async () => {
    while (index < queue2.length) {
      const current2 = queue2[index++];
      const avatar = await fetchArtistAvatar(current2);
      if (avatar) result2[normalizeArtistName(current2)] = avatar;
    }
  };
  const workerCount = Math.min(PREFETCH_CONCURRENCY, queue2.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker2()));
  return result2;
};
const registerLibraryIpc = () => {
  ipcMain.handle("library:scan", (_event, incremental) => {
    try {
      const dirs = store$1.get("library.scanDirs");
      if (dirs.length === 0) {
        return { success: false, error: ErrorCode.SCAN_NO_DIRS };
      }
      startScan(dirs, incremental ?? true);
      return { success: true };
    } catch (error) {
      libraryLog.error("启动扫描失败:", error);
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:cancelScan", () => {
    cancelScan();
    return { success: true };
  });
  ipcMain.handle("library:getTracks", () => {
    try {
      const all = getAllTracks();
      const containerPaths = /* @__PURE__ */ new Set();
      for (const track of all) {
        if (track.cueAudioPath) containerPaths.add(track.cueAudioPath);
      }
      const data2 = all.filter((track) => !track.path || !containerPaths.has(track.path));
      return { success: true, data: data2 };
    } catch (_error) {
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:getAlbums", () => {
    try {
      return { success: true, data: getAlbumList() };
    } catch (_error) {
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:getArtists", () => {
    try {
      return { success: true, data: getArtistList() };
    } catch (_error) {
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:getAlbumTracks", (_event, albumName) => {
    try {
      return { success: true, data: getAlbumTracks(albumName) };
    } catch (_error) {
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:getArtistTracks", (_event, artistName) => {
    try {
      return { success: true, data: getArtistTracks(artistName) };
    } catch (_error) {
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:getTracksByIds", (_event, ids) => {
    try {
      return { success: true, data: getTracksByIds$1(ids) };
    } catch (_error) {
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:searchTracks", (_event, query) => {
    try {
      return { success: true, data: searchTracks$1(query) };
    } catch (_error) {
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:getTrackCount", () => {
    try {
      return { success: true, data: getTrackCount() };
    } catch (_error) {
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:getRandomTrack", () => {
    try {
      return { success: true, data: getRandomTrack() };
    } catch (_error) {
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:getRandomTracks", (_event, limit) => {
    try {
      return { success: true, data: getRandomTracks(limit) };
    } catch (_error) {
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:isScanning", () => {
    return { success: true, data: isScanning() };
  });
  ipcMain.handle("library:addScanDir", async () => {
    const result2 = await dialog.showOpenDialog({
      title: "选择音乐文件夹",
      properties: ["openDirectory"]
    });
    if (result2.canceled || result2.filePaths.length === 0) {
      return { success: false, error: ErrorCode.SCAN_DIR_NOT_SELECTED };
    }
    const dir = result2.filePaths[0];
    const dirs = store$1.get("library.scanDirs");
    if (dirs.includes(dir)) {
      return { success: false, error: ErrorCode.SCAN_DIR_EXISTS };
    }
    dirs.push(dir);
    store$1.set("library.scanDirs", dirs);
    libraryLog.info(`添加扫描目录: ${dir}`);
    return { success: true, data: dir };
  });
  ipcMain.handle("library:removeScanDir", (_event, dir) => {
    try {
      const dirs = store$1.get("library.scanDirs");
      const idx = dirs.indexOf(dir);
      if (idx === -1) {
        return { success: false, error: ErrorCode.SCAN_DIR_NOT_FOUND };
      }
      dirs.splice(idx, 1);
      store$1.set("library.scanDirs", dirs);
      if (isScanning()) cancelScan();
      deleteTracksByDir(dir);
      libraryLog.info(`移除扫描目录: ${dir}`);
      return { success: true };
    } catch (_error) {
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:getScanDirs", () => {
    return { success: true, data: store$1.get("library.scanDirs") };
  });
  ipcMain.handle("library:fetchArtistAvatar", async (_event, artistName) => {
    try {
      const url = await fetchArtistAvatar(artistName);
      return { success: true, data: url };
    } catch (error) {
      libraryLog.error(`获取歌手头像失败 [${artistName}]:`, error);
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:prefetchArtistAvatars", async (_event, artistNames) => {
    try {
      if (!Array.isArray(artistNames) || artistNames.length === 0) {
        return { success: true, data: {} };
      }
      const data2 = await prefetchArtistAvatars(artistNames);
      return { success: true, data: data2 };
    } catch (error) {
      libraryLog.error("预取歌手头像失败:", error);
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
  ipcMain.handle("library:readTags", async (_event, path2) => {
    try {
      const tags = await getEngine().readTrackTags(path2);
      return { success: true, data: tags };
    } catch (error) {
      libraryLog.error(`读取标签失败 [${path2}]:`, error);
      return { success: false, error: ErrorCode.TAG_READ_FAILED };
    }
  });
  ipcMain.handle("library:writeTags", async (_event, edits) => {
    try {
      const requests = [];
      const replacedCovers = /* @__PURE__ */ new Set();
      for (const edit of edits) {
        const { coverPath, coverUrl: coverUrl2, ...fields } = edit;
        let cover;
        if (coverPath) {
          cover = await fsp.readFile(coverPath);
        } else if (coverUrl2) {
          cover = await fetchBytes(coverUrl2, { requireImage: true }) ?? void 0;
          if (!cover) libraryLog.warn(`封面下载失败，跳过封面只写文本: ${coverUrl2}`);
        }
        if (cover) replacedCovers.add(edit.path);
        requests.push({ ...fields, cover });
      }
      const results = await getEngine().writeTrackTags(requests, getCoverCacheDir());
      const upserts = results.filter((r) => r.success && r.track).map((r) => {
        const upsert2 = scannedToUpsert(r.track);
        if (upsert2.cover && replacedCovers.has(upsert2.path)) {
          upsert2.cover = `${upsert2.cover}?v=${upsert2.mtime}`;
        }
        return upsert2;
      });
      if (upserts.length > 0) upsertTracks$1(upserts);
      const tracks = getTracksByIds$1(upserts.map((u) => u.id));
      const byPath = new Map(tracks.map((t2) => [t2.path, t2]));
      const data2 = results.map((r) => ({
        path: r.path,
        success: r.success,
        error: r.error ?? void 0,
        track: byPath.get(r.path)
      }));
      libraryLog.info(`标签写入完成: ${upserts.length}/${results.length} 成功`);
      return { success: true, data: data2 };
    } catch (error) {
      libraryLog.error("写入标签失败:", error);
      return { success: false, error: ErrorCode.TAG_WRITE_FAILED };
    }
  });
  ipcMain.handle("library:pickCoverImage", async () => {
    const result2 = await dialog.showOpenDialog({
      title: "选择封面图片",
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png"] }]
    });
    if (result2.canceled || result2.filePaths.length === 0) {
      return { success: false, error: ErrorCode.FILE_NOT_SELECTED };
    }
    try {
      const coverPath = result2.filePaths[0];
      const stat2 = await fsp.stat(coverPath);
      if (stat2.size > 5 * 1024 * 1024) {
        return { success: false, error: ErrorCode.TAG_WRITE_FAILED };
      }
      const data2 = await fsp.readFile(coverPath);
      const thumb = await getEngine().makeImageThumbnail(data2, 300);
      const dataUrl = `data:image/jpeg;base64,${Buffer.from(thumb).toString("base64")}`;
      return { success: true, data: { path: coverPath, dataUrl } };
    } catch (error) {
      libraryLog.error("读取封面图片失败:", error);
      return { success: false, error: ErrorCode.TAG_WRITE_FAILED };
    }
  });
  ipcMain.handle("library:deleteTracks", async (_event, paths) => {
    try {
      const failed = [];
      for (const filePath of paths) {
        try {
          await fsp.unlink(filePath);
        } catch {
          failed.push(filePath);
        }
      }
      const deleted = paths.filter((p) => !failed.includes(p));
      if (deleted.length > 0) {
        deleteTracksByPaths(deleted);
      }
      libraryLog.info(`删除 ${deleted.length} 个文件，${failed.length} 个失败`);
      return { success: true, data: { deleted: deleted.length, failed: failed.length } };
    } catch (error) {
      libraryLog.error("批量删除文件失败:", error);
      return { success: false, error: ErrorCode.UNKNOWN };
    }
  });
};
const registerNowPlayingIpc = () => {
  ipcMain.on("nowPlaying:update", (_event, payload) => {
    update(payload.track, payload.lyric, payload.source);
  });
  ipcMain.on("nowPlaying:setLyricOffset", (_event, trackId, offsetMs) => {
    setLyricOffset(trackId, offsetMs);
  });
  ipcMain.handle("nowPlaying:requestSnapshot", () => snapshot());
  onTrackChange$1((data2) => {
    broadcast("nowPlaying:track-change", data2);
    wsBroadcast({ type: "track", data: data2 });
  });
  onLyricChange$1((snap) => {
    broadcast("nowPlaying:lyric-change", snap);
    wsBroadcast({ type: "lyric", data: { source: snap.source, lyric: snap.lyric } });
  });
  onPositionSync$1((data2) => broadcast("nowPlaying:position-sync", data2, true));
  onLyricOffsetChange$1((data2) => {
    broadcast("nowPlaying:lyric-offset-change", data2);
    wsBroadcast({ type: "lyricOffset", data: data2 });
  });
};
const registerWindowIpc = () => {
  ipcMain.handle("window:toggleDesktopLyric", () => toggleDesktopLyricWindow());
  ipcMain.handle("window:closeDesktopLyric", () => closeDesktopLyricWindow());
  ipcMain.handle("window:isDesktopLyricOpen", () => !!getDesktopLyricWindow());
  ipcMain.handle("desktopLyric:setHeight", (_event, height) => {
    applyDesktopLyricHeight(height);
  });
  ipcMain.on("desktopLyric:setUnlockButtonBounds", (_event, bounds) => {
    applyDesktopLyricUnlockButtonBounds(bounds);
  });
  ipcMain.on("desktopLyric:move", (_event, x, y) => {
    moveDesktopLyricWindow(x, y);
  });
  ipcMain.on("desktopLyric:saveState", () => {
    saveDesktopLyricState();
  });
  ipcMain.handle("window:toggleDynamicIsland", () => toggleDynamicIslandWindow());
  ipcMain.handle("window:closeDynamicIsland", () => closeDynamicIslandWindow());
  ipcMain.handle("window:isDynamicIslandOpen", () => !!getDynamicIslandWindow());
  ipcMain.on("dynamicIsland:move", (_event, x, y) => {
    moveDynamicIslandWindow(x, y);
  });
  ipcMain.on("dynamicIsland:saveState", () => {
    saveDynamicIslandState();
  });
  ipcMain.on("dynamicIsland:resize", (_event, width) => {
    applyDynamicIslandWidth(width);
  });
  ipcMain.on("dynamicIsland:setShape", (_event, width) => {
    applyDynamicIslandShape(width);
  });
  ipcMain.on("dynamicIsland:setHeight", (_event, height) => {
    applyDynamicIslandHeight(height);
  });
  ipcMain.handle("dynamicIsland:getMode", () => {
    const saved = store$1.get("windowStates.dynamicIsland");
    return saved.mode === "floating" ? "floating" : "snapped";
  });
  if (isWin) {
    ipcMain.handle("window:toggleTaskbarLyric", () => toggleTaskbarLyricWindow());
    ipcMain.handle("window:closeTaskbarLyric", () => closeTaskbarLyricWindow());
    ipcMain.handle("window:isTaskbarLyricOpen", () => !!getTaskbarLyricWindow());
    ipcMain.on("taskbarLyric:setContentWidth", (_event, width) => {
      updateTaskbarLyricContentWidth(width);
    });
  } else {
    ipcMain.handle("window:toggleTaskbarLyric", () => false);
    ipcMain.handle("window:closeTaskbarLyric", () => void 0);
    ipcMain.handle("window:isTaskbarLyricOpen", () => false);
  }
  ipcMain.on("window:minimize", () => minimizeMainWindow());
  ipcMain.on("window:toggleMaximize", () => toggleMaximizeMainWindow());
  ipcMain.handle("window:isMaximized", () => isMainWindowMaximized());
  ipcMain.on("window:toggleFullscreen", () => toggleFullscreenMainWindow());
  ipcMain.handle("window:isFullscreen", () => isMainWindowFullscreen());
  ipcMain.on("window:hide", () => hideMainWindow());
  ipcMain.on("window:quit", () => app.quit());
};
const resolveWorkerEntry = () => path.join(app.getAppPath(), "out", "main", "host.worker.js");
class PluginHost {
  child = null;
  /** 每次 (re)start 自增；用于丢弃死进程迟到消息 */
  generation = 0;
  hostReady = false;
  startPromise = null;
  resolveStart = null;
  rejectStart = null;
  startTimer = null;
  heartbeatTimer = null;
  heartbeatMisses = 0;
  callbacks = /* @__PURE__ */ new Map();
  /** 已 ready 的插件 id（区别于"已登记 callbacks"） */
  readyPlugins = /* @__PURE__ */ new Set();
  pendingLoads = /* @__PURE__ */ new Map();
  /** host 整体丢失时的上层回调（registry 注册，用于安排整体重启） */
  onHostLostGlobal = null;
  setOnHostLost(cb) {
    this.onHostLostGlobal = cb;
  }
  /** 懒启动 host 进程，resolve 于 hostReady */
  ensureStarted() {
    if (this.startPromise) return this.startPromise;
    this.startPromise = new Promise((resolve2, reject) => {
      this.resolveStart = resolve2;
      this.rejectStart = reject;
      const generation = ++this.generation;
      const child = utilityProcess.fork(resolveWorkerEntry(), [], {
        serviceName: "splayer-plugin-host",
        stdio: "pipe"
      });
      this.child = child;
      this.hostReady = false;
      this.heartbeatMisses = 0;
      this.startTimer = setTimeout(() => {
        if (generation === this.generation && !this.hostReady) {
          coreLog.error("[plugin-host] host 启动超时");
          this.handleHostCrash("start-timeout");
        }
      }, PLUGIN_LOAD_TIMEOUT);
      child.on("message", (msg) => {
        if (generation !== this.generation) return;
        this.onMessage(msg);
      });
      child.on("exit", (code) => {
        if (generation !== this.generation) return;
        coreLog.warn(`[plugin-host] host 进程退出 code=${code}`);
        this.handleHostCrash("exit");
      });
      child.stdout?.on(
        "data",
        (chunk) => coreLog.info("[plugin-host]", chunk.toString().trimEnd())
      );
      child.stderr?.on(
        "data",
        (chunk) => coreLog.error("[plugin-host]", chunk.toString().trimEnd())
      );
    });
    return this.startPromise;
  }
  /** 加载一个插件，resolve 于其 ready */
  async loadPlugin(spec, callbacks) {
    await this.ensureStarted();
    this.callbacks.set(spec.pluginId, callbacks);
    return new Promise((resolve2, reject) => {
      const timer = setTimeout(() => {
        this.pendingLoads.delete(spec.pluginId);
        this.post({ kind: "unloadPlugin", pluginId: spec.pluginId });
        reject(
          Object.assign(new Error("plugin load timeout"), { code: PluginErrorCodes.LOAD_TIMEOUT })
        );
      }, PLUGIN_LOAD_TIMEOUT);
      this.pendingLoads.set(spec.pluginId, { resolve: resolve2, reject, timer });
      this.post({ kind: "loadPlugin", ...spec });
    });
  }
  /** 卸载一个插件（软，host 进程不动） */
  unloadPlugin(pluginId) {
    const pending2 = this.pendingLoads.get(pluginId);
    if (pending2) {
      clearTimeout(pending2.timer);
      this.pendingLoads.delete(pluginId);
      pending2.reject(
        Object.assign(new Error("plugin unloaded"), { code: PluginErrorCodes.NOT_READY })
      );
    }
    this.callbacks.delete(pluginId);
    this.readyPlugins.delete(pluginId);
    this.post({ kind: "unloadPlugin", pluginId });
  }
  isReady(pluginId) {
    return this.hostReady && this.readyPlugins.has(pluginId);
  }
  sendCall(pluginId, requestId, action, params) {
    if (!this.isReady(pluginId)) {
      this.callbacks.get(pluginId)?.onResult(requestId, false, void 0, {
        code: PluginErrorCodes.NOT_READY,
        message: "plugin is not ready"
      });
      return;
    }
    this.post({ kind: "call", pluginId, requestId, action, params });
  }
  sendCancel(pluginId, requestId) {
    this.post({ kind: "cancel", pluginId, requestId });
  }
  sendHostResult(pluginId, callId, ok, data2, error) {
    this.post({ kind: "hostResult", pluginId, callId, ok, data: data2, error });
  }
  sendEvent(pluginId, event, data2) {
    if (!this.isReady(pluginId)) return;
    this.post({ kind: "event", pluginId, event, data: data2 });
  }
  sendSettingsUpdate(pluginId, settings) {
    if (!this.isReady(pluginId)) return;
    this.post({ kind: "settingsUpdate", pluginId, settings });
  }
  /** 关闭 host（应用退出时） */
  shutdown() {
    this.generation++;
    this.stopHeartbeat();
    if (this.startTimer) {
      clearTimeout(this.startTimer);
      this.startTimer = null;
    }
    const child = this.child;
    this.child = null;
    this.hostReady = false;
    this.startPromise = null;
    if (child) {
      try {
        child.kill();
      } catch {
      }
    }
  }
  post(msg) {
    if (!this.child) return;
    try {
      this.child.postMessage(msg);
    } catch (err) {
      coreLog.error(`[plugin-host] postMessage failed kind=${msg.kind}: ${err.message}`);
    }
  }
  onMessage(msg) {
    switch (msg.kind) {
      case "hostReady": {
        this.hostReady = true;
        if (this.startTimer) {
          clearTimeout(this.startTimer);
          this.startTimer = null;
        }
        this.startHeartbeat();
        this.resolveStart?.();
        return;
      }
      case "pong":
        this.heartbeatMisses = 0;
        return;
      case "ready": {
        const pending2 = this.pendingLoads.get(msg.pluginId);
        if (!pending2) return;
        clearTimeout(pending2.timer);
        this.pendingLoads.delete(msg.pluginId);
        this.readyPlugins.add(msg.pluginId);
        pending2.resolve(msg.sources);
        this.callbacks.get(msg.pluginId)?.onReady(msg.sources);
        return;
      }
      case "result":
        this.callbacks.get(msg.pluginId)?.onResult(msg.requestId, msg.ok, msg.data, msg.error);
        return;
      case "hostCall":
        this.callbacks.get(msg.pluginId)?.onHostCall(msg.callId, msg.method, msg.args);
        return;
      case "updateAvailable":
        this.callbacks.get(msg.pluginId)?.onUpdateAvailable(msg.info);
        return;
      case "sourcesUpdate":
        this.callbacks.get(msg.pluginId)?.onSourcesUpdate(msg.sources);
        return;
      case "registered":
        this.callbacks.get(msg.pluginId)?.onRegistered?.(msg);
        return;
      case "log":
        if (msg.pluginId) this.callbacks.get(msg.pluginId)?.onLog(msg.level, msg.args);
        else coreLog[msg.level]("[plugin-host]", ...msg.args);
        return;
      case "fatal": {
        this.readyPlugins.delete(msg.pluginId);
        const pending2 = this.pendingLoads.get(msg.pluginId);
        if (pending2) {
          clearTimeout(pending2.timer);
          this.pendingLoads.delete(msg.pluginId);
          pending2.reject(Object.assign(new Error(msg.error.message), { code: msg.error.code }));
        }
        this.callbacks.get(msg.pluginId)?.onFatal(msg.error);
        return;
      }
    }
  }
  /** host 进程整体丢失：清理、通知各插件，由上层安排整体重启 */
  handleHostCrash(reason) {
    this.generation++;
    this.stopHeartbeat();
    if (this.startTimer) {
      clearTimeout(this.startTimer);
      this.startTimer = null;
    }
    const child = this.child;
    this.child = null;
    this.hostReady = false;
    this.startPromise = null;
    if (child) {
      try {
        child.kill();
      } catch {
      }
    }
    this.rejectStart?.(
      Object.assign(new Error(`plugin host lost: ${reason}`), {
        code: PluginErrorCodes.WORKER_CRASHED
      })
    );
    this.resolveStart = null;
    this.rejectStart = null;
    for (const pending2 of this.pendingLoads.values()) {
      clearTimeout(pending2.timer);
      pending2.reject(
        Object.assign(new Error("plugin host lost"), { code: PluginErrorCodes.WORKER_CRASHED })
      );
    }
    this.pendingLoads.clear();
    const lost = [...this.callbacks.values()];
    this.callbacks.clear();
    this.readyPlugins.clear();
    for (const cb of lost) {
      try {
        cb.onHostLost();
      } catch {
      }
    }
    this.onHostLostGlobal?.();
  }
  startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatMisses = 0;
    this.heartbeatTimer = setInterval(() => {
      if (!this.child) return;
      this.heartbeatMisses++;
      if (this.heartbeatMisses > HEARTBEAT_MAX_MISSES) {
        coreLog.warn("[plugin-host] 心跳丢失，重启 host");
        this.handleHostCrash("heartbeat");
        return;
      }
      try {
        this.child.postMessage({ kind: "ping" });
      } catch {
      }
    }, HEARTBEAT_INTERVAL);
  }
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}
const pluginHost = new PluginHost();
const PLUGIN_TYPES = ["source", "control"];
const PLUGIN_GRANTS = ["network", "control", "ui"];
const GZ_PREFIX = "gz_";
const FIELD_LIMITS = {
  name: 64,
  description: 512,
  author: 64,
  homepage: 1024,
  version: 36,
  changelog: 1e3
};
const HEADER_RE = /^\s*\*?\s*@(\w+)\s+(.+)$/;
const BLOCK_COMMENT_RE = /^\s*\/\*[\s\S]*?\*\//;
const decompressIfNeeded = (raw) => {
  const trimmed = raw.trim();
  if (!trimmed.startsWith(GZ_PREFIX)) return raw;
  const payload = trimmed.slice(GZ_PREFIX.length);
  const buf = Buffer.from(payload, "base64");
  return zlib__default.inflateSync(buf).toString("utf-8");
};
const parseHeader = (source) => {
  const out = {};
  const m0 = BLOCK_COMMENT_RE.exec(source);
  const block = m0 ? m0[0].slice(2, -2) : source.slice(0, 3e3);
  const applyField = (key, raw) => {
    const limit = FIELD_LIMITS[key];
    const val = limit && raw.length > limit ? raw.slice(0, limit) + "..." : raw;
    switch (key) {
      case "id":
        out.id = val;
        break;
      case "grant":
        out.grant = raw;
        break;
      case "name":
      case "description":
      case "version":
      case "author":
      case "homepage":
        out[key] = val;
        break;
      case "updateUrl":
      case "updateURL":
        out.updateUrl = raw;
        break;
      case "changelog":
        out.changelog = val.replace(/\\n/g, "\n");
        break;
      case "apiLevel": {
        const n = parseInt(val, 10);
        if (!Number.isNaN(n)) out.apiLevel = n;
        break;
      }
      case "type":
        out.type = PLUGIN_TYPES.includes(val) ? val : "source";
        break;
    }
  };
  for (const rawLine of block.split(/\r?\n/)) {
    const m = HEADER_RE.exec(rawLine);
    if (!m) continue;
    applyField(m[1], m[2].trim());
  }
  const fallbackKeys = ["name", "version", "author", "description", "homepage", "id"];
  for (const key of fallbackKeys) {
    if (!out[key]) {
      const fb = new RegExp(`@${key}\\s+(.+)`).exec(block);
      if (fb?.[1]) applyField(key, fb[1].trim());
    }
  }
  return out;
};
const sha1 = (data2) => crypto$1.createHash("sha1").update(data2).digest("hex");
const slugify = (name) => name.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
const normalizeId = (raw) => raw.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^[-._]+|[-._]+$/g, "").slice(0, 64);
const deriveId = (declared, name) => {
  const normalized = declared ? normalizeId(declared) : "";
  if (normalized) return normalized;
  const slug = slugify(name);
  return slug || sha1(name).slice(0, 8);
};
const deriveGrants = (declared, type) => {
  if (type !== "control") return ["network"];
  if (!declared) return [];
  const valid = PLUGIN_GRANTS.includes.bind(PLUGIN_GRANTS);
  const parsed = declared.split(/[,\s]+/).map((item) => item.trim().toLowerCase()).filter((item) => valid(item));
  return [...new Set(parsed)];
};
const loadScript = (rawOrPath, isPath, fileName) => {
  const raw = rawOrPath;
  const wasCompressed = raw.trim().startsWith(GZ_PREFIX);
  const source = decompressIfNeeded(raw);
  const header = parseHeader(source);
  const hash2 = sha1(source);
  const name = header.name || `user_api_${hash2.slice(0, 6)}`;
  const version = header.version || "0.0.0";
  const apiLevel = header.apiLevel ?? 1;
  const rawType = header.type ?? "source";
  if (rawType === "control" && apiLevel < 2) {
    throw Object.assign(
      new Error(`control plugin "${name}" requires apiLevel >= 2 (declared ${apiLevel})`),
      { code: PluginErrorCodes.API_LEVEL_MISMATCH }
    );
  }
  if (apiLevel > HOST_API_LEVEL) {
    throw Object.assign(
      new Error(`plugin requires apiLevel ${apiLevel} but host supports ${HOST_API_LEVEL}`),
      { code: PluginErrorCodes.API_LEVEL_MISMATCH }
    );
  }
  const id = deriveId(header.id, name);
  const grant = deriveGrants(header.grant, rawType);
  const finalFileName = fileName ?? (isPath ? path.basename(rawOrPath) : `${id}.js`);
  const manifest = {
    id,
    name,
    version,
    description: header.description,
    author: header.author,
    homepage: header.homepage,
    grant,
    type: rawType,
    apiLevel,
    hash: hash2,
    updateUrl: header.updateUrl,
    changelog: header.changelog,
    installedAt: Date.now(),
    fileName: finalFileName
  };
  return { source, manifest, decompressed: wasCompressed };
};
const fetchScript = async (url) => {
  const parsed = new URL(url);
  const isLoopback = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
  if (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && isLoopback)) {
    throw new Error(`protocol not allowed: ${parsed.protocol}`);
  }
  const resp = await net.fetch(url, {
    method: "GET",
    redirect: "follow",
    signal: AbortSignal.timeout(INSTALL_URL_TIMEOUT)
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const lenHeader = resp.headers.get("content-length");
  if (lenHeader && Number(lenHeader) > INSTALL_URL_MAX_SIZE) {
    throw new Error("PLUGIN_INSTALL_URL_TOO_LARGE");
  }
  const buf = await resp.arrayBuffer();
  if (buf.byteLength > INSTALL_URL_MAX_SIZE) {
    throw new Error("PLUGIN_INSTALL_URL_TOO_LARGE");
  }
  return new TextDecoder("utf-8").decode(buf);
};
const fetchMarket = async () => {
  const resp = await net.fetch(PLUGIN_REGISTRY_URL, {
    method: "GET",
    redirect: "follow",
    signal: AbortSignal.timeout(INSTALL_URL_TIMEOUT)
  });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const data2 = JSON.parse(await resp.text());
  return Array.isArray(data2.plugins) ? data2.plugins.filter((item) => item?.id && item?.updateUrl) : [];
};
const hostRequest = async (url, opts = {}) => {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw Object.assign(new Error(`invalid url: ${url}`), {
      code: PluginErrorCodes.URL_NOT_ALLOWED
    });
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw Object.assign(new Error(`protocol not allowed: ${parsed.protocol}`), {
      code: PluginErrorCodes.URL_NOT_ALLOWED
    });
  }
  const timeoutMs = Math.min(
    Math.max(opts.timeout ?? REQUEST_DEFAULT_TIMEOUT, 1e3),
    REQUEST_MAX_TIMEOUT
  );
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  let body;
  if (opts.body != null) {
    if (typeof opts.body === "string") body = opts.body;
    else if (opts.body instanceof ArrayBuffer) body = opts.body;
    else {
      const u8 = opts.body;
      body = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
    }
  }
  try {
    const resp = await net.fetch(url, {
      method: opts.method ?? "GET",
      headers: opts.headers ?? {},
      body,
      signal: ctrl.signal,
      // 让 Electron 遵循系统代理
      bypassCustomProtocolHandlers: true
    });
    const headers = {};
    resp.headers.forEach((value, key) => {
      headers[key] = value;
    });
    let responseBody;
    const type = opts.responseType ?? "text";
    if (type === "arraybuffer") {
      responseBody = new Uint8Array(await resp.arrayBuffer());
    } else if (type === "json") {
      const text = await resp.text();
      try {
        responseBody = JSON.parse(text);
      } catch {
        responseBody = text;
      }
    } else {
      responseBody = await resp.text();
    }
    return { status: resp.status, headers, body: responseBody };
  } catch (err) {
    if (err.name === "AbortError") {
      throw Object.assign(new Error("request timeout"), {
        code: PluginErrorCodes.REQUEST_TIMEOUT
      });
    }
    throw Object.assign(
      new Error(`network error: ${err instanceof Error ? err.message : String(err)}`),
      { code: PluginErrorCodes.NETWORK_ERROR }
    );
  } finally {
    clearTimeout(timer);
  }
};
const getPluginsDataDir = () => path.join(pluginsDir, "data");
const caches = /* @__PURE__ */ new Map();
const ensureDir = () => {
  const dir = getPluginsDataDir();
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
const fileOf = (pluginId) => path.join(getPluginsDataDir(), `${pluginId}.json`);
const load = (pluginId) => {
  const cached = caches.get(pluginId);
  if (cached) return cached;
  try {
    const raw = fs.readFileSync(fileOf(pluginId), "utf-8");
    const data2 = JSON.parse(raw);
    caches.set(pluginId, data2);
    return data2;
  } catch {
    const empty = {};
    caches.set(pluginId, empty);
    return empty;
  }
};
const flush = (pluginId, data2) => {
  ensureDir();
  writeFileSync(fileOf(pluginId), JSON.stringify(data2, null, 2));
  caches.set(pluginId, data2);
};
const pluginStorageGet = (pluginId, key) => {
  return load(pluginId)[key] ?? null;
};
const pluginStorageSet = (pluginId, key, value) => {
  const data2 = { ...load(pluginId), [key]: value };
  flush(pluginId, data2);
};
const pluginStorageRemove = (pluginId, key) => {
  const cur = load(pluginId);
  if (!(key in cur)) return;
  const next = { ...cur };
  delete next[key];
  flush(pluginId, next);
};
const pluginStorageKeys = (pluginId) => {
  return Object.keys(load(pluginId));
};
const pluginStorageDrop = (pluginId) => {
  caches.delete(pluginId);
  try {
    fs.unlinkSync(fileOf(pluginId));
  } catch {
  }
};
const dispatchHostCall = async (pluginId, grant, callId, method, args) => {
  try {
    if (method === "request" && !grant.includes("network")) {
      throw Object.assign(new Error(`plugin "${pluginId}" lacks "network" grant`), {
        code: PluginErrorCodes.PERMISSION_DENIED
      });
    }
    if (method.startsWith("player.") && !grant.includes("control")) {
      coreLog.warn(`[plugin:${pluginId}] 缺少 "control" 权限，拒绝调用 ${method}`);
      throw Object.assign(new Error(`plugin "${pluginId}" lacks "control" grant`), {
        code: PluginErrorCodes.PERMISSION_DENIED
      });
    }
    let data2;
    switch (method) {
      case "request":
        data2 = await hostRequest(args[0], args[1] ?? {});
        break;
      case "storage.get":
        data2 = pluginStorageGet(pluginId, args[0]);
        break;
      case "storage.set":
        pluginStorageSet(pluginId, args[0], args[1]);
        data2 = void 0;
        break;
      case "storage.remove":
        pluginStorageRemove(pluginId, args[0]);
        data2 = void 0;
        break;
      case "storage.keys":
        data2 = pluginStorageKeys(pluginId);
        break;
      case "player.play":
        playerControl.play();
        data2 = void 0;
        break;
      case "player.pause":
        playerControl.pause();
        data2 = void 0;
        break;
      case "player.next":
        playerControl.next();
        data2 = void 0;
        break;
      case "player.prev":
        playerControl.prev();
        data2 = void 0;
        break;
      case "player.seek": {
        const positionMs = Number(args[0]);
        if (Number.isFinite(positionMs) && positionMs >= 0) {
          void playerControl.seek(positionMs).catch(() => {
          });
        }
        data2 = void 0;
        break;
      }
      case "player.setVolume": {
        const volume = Number(args[0]);
        if (Number.isFinite(volume) && volume >= 0 && volume <= 1) playerControl.setVolume(volume);
        data2 = void 0;
        break;
      }
      case "player.getPosition":
        data2 = playerControl.getPosition();
        break;
      default:
        throw Object.assign(new Error(`unknown host method: ${method}`), {
          code: PluginErrorCodes.UNKNOWN
        });
    }
    pluginHost.sendHostResult(pluginId, callId, true, data2);
  } catch (err) {
    pluginHost.sendHostResult(pluginId, callId, false, void 0, {
      code: err?.code ?? PluginErrorCodes.UNKNOWN,
      message: err instanceof Error ? err.message : String(err)
    });
  }
};
const pluginsRoot = () => pluginsDir;
const scriptsDir = () => path.join(pluginsRoot(), "scripts");
const manifestFile = () => path.join(pluginsRoot(), "manifest.json");
const ensureDirs = () => {
  const dirs = [pluginsRoot(), scriptsDir(), path.join(pluginsRoot(), "data")];
  for (const d of dirs) if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
};
const readStored = () => {
  try {
    const raw = fs.readFileSync(manifestFile(), "utf-8");
    const data2 = JSON.parse(raw);
    if (data2?.version === 1 && data2.plugins) return data2;
  } catch {
  }
  return { version: 1, plugins: {} };
};
const writeStored = (data2) => {
  ensureDirs();
  writeFileSync(manifestFile(), JSON.stringify(data2, null, 2));
};
const isNewerVersion = (remote, current2) => {
  const parse = (v) => v.trim().replace(/^v/i, "").split(/[.+-]/).map((seg) => {
    const n = parseInt(seg, 10);
    return Number.isFinite(n) ? n : 0;
  });
  const a = parse(remote);
  const b = parse(current2);
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    const x = a[i] ?? 0;
    const y = b[i] ?? 0;
    if (x !== y) return x > y;
  }
  return false;
};
const sanitizeSettingValue = (item, value) => {
  switch (item.type) {
    case "switch":
      return Boolean(value);
    case "number": {
      let num = Number(value);
      if (!Number.isFinite(num)) num = Number(item.default);
      if (item.min != null) num = Math.max(item.min, num);
      if (item.max != null) num = Math.min(item.max, num);
      return num;
    }
    case "select": {
      const ok = item.options?.some((opt) => opt.value === value);
      return ok ? value : item.default;
    }
    case "text":
    default:
      return String(value ?? "");
  }
};
class PluginRegistry extends EventEmitter {
  runtimes = /* @__PURE__ */ new Map();
  /** host 进程整体崩溃的重启计数与定时器（爆炸半径=全部插件） */
  hostRestartAttempts = 0;
  hostRestartTimer = null;
  /** 应用启动时调用 */
  init() {
    ensureDirs();
    pluginHost.setOnHostLost(() => this.handleHostLost());
    const stored = readStored();
    const enabledMap = store$1.get("plugins.enabled");
    for (const [id, manifest] of Object.entries(stored.plugins)) {
      const scriptPath = path.join(scriptsDir(), manifest.fileName);
      let source = "";
      try {
        source = fs.readFileSync(scriptPath, "utf-8");
        const fresh = loadScript(source, false, manifest.fileName);
        source = fresh.source;
        manifest.grant = fresh.manifest.grant;
      } catch (err) {
        coreLog.warn(`[plugin] failed to read ${manifest.fileName}:`, err);
        continue;
      }
      const enabled2 = enabledMap[id] ?? true;
      this.runtimes.set(id, {
        manifest,
        enabled: enabled2,
        source,
        status: { state: "unloaded" },
        loading: false,
        updateInfo: null,
        events: [],
        controls: false,
        settings: [],
        menus: [],
        pending: /* @__PURE__ */ new Map()
      });
    }
    for (const rt of this.runtimes.values()) {
      if (rt.enabled) this.start(rt).catch(() => {
      });
    }
    void this.checkAllUpdates();
    coreLog.info(`[plugin] registry initialized, ${this.runtimes.size} plugins loaded`);
  }
  listInfo() {
    return Array.from(this.runtimes.values()).map((rt) => ({
      manifest: rt.manifest,
      enabled: rt.enabled,
      status: rt.status,
      updateInfo: rt.updateInfo,
      settingsValues: store$1.get(`plugins.perPlugin.${rt.manifest.id}`) ?? {}
    }));
  }
  getRuntime(id) {
    return this.runtimes.get(id);
  }
  /** 按动作选一个已就绪的插件（优先级 → 首个 ready） */
  pickForAction(action, source) {
    const priority = store$1.get(`plugins.priority.${action}`);
    const ordered = (priority ?? []).slice();
    for (const rt of this.runtimes.values()) {
      if (!ordered.includes(rt.manifest.id)) ordered.push(rt.manifest.id);
    }
    for (const id of ordered) {
      const rt = this.runtimes.get(id);
      if (!rt || !rt.enabled || rt.status.state !== "ready") continue;
      const sources = rt.status.sources;
      const sourceKeys = source ? [source] : Object.keys(sources);
      for (const key of sourceKeys) {
        const cap = sources[key];
        if (cap && cap.actions.includes(action)) return rt;
      }
    }
    return void 0;
  }
  /** 导入本地脚本文件 */
  async install(filePath) {
    const raw = fs.readFileSync(filePath, "utf-8");
    return this.installFromSource(raw);
  }
  /** 从脚本源码安装（供本地文件、URL 下载等入口复用） */
  async installFromSource(raw) {
    ensureDirs();
    const { source, manifest } = loadScript(raw, false);
    const fileName = `${manifest.id}.js`;
    fs.writeFileSync(path.join(scriptsDir(), fileName), source, "utf-8");
    manifest.fileName = fileName;
    const stored = readStored();
    stored.plugins[manifest.id] = manifest;
    writeStored(stored);
    const enabledMap = {
      ...store$1.get("plugins.enabled"),
      [manifest.id]: true
    };
    store$1.set("plugins.enabled", enabledMap);
    const existing = this.runtimes.get(manifest.id);
    if (existing) await this.stop(existing);
    const rt = {
      manifest,
      enabled: true,
      source,
      status: { state: "unloaded" },
      loading: false,
      updateInfo: null,
      events: [],
      controls: false,
      settings: [],
      menus: [],
      pending: /* @__PURE__ */ new Map()
    };
    this.runtimes.set(manifest.id, rt);
    await this.start(rt).catch(() => {
    });
    return { manifest, enabled: rt.enabled, status: rt.status, updateInfo: rt.updateInfo };
  }
  /** 取插件当前的更新地址（检查到新版后由 updateInfo 持有） */
  getUpdateUrl(id) {
    return this.runtimes.get(id)?.updateInfo?.updateUrl ?? void 0;
  }
  /** 构造对外的插件信息 */
  infoOf(rt) {
    return {
      manifest: rt.manifest,
      enabled: rt.enabled,
      status: rt.status,
      updateInfo: rt.updateInfo,
      settingsValues: store$1.get(`plugins.perPlugin.${rt.manifest.id}`) ?? {}
    };
  }
  /**
   * 检查单个插件是否有新版：拉 @updateUrl 读远端 @version 与本地比对，有则置 updateInfo 并广播
   * @param id - 插件 ID
   * @returns ok 是否成功联网比对；hasUpdate 是否发现新版；plugin 最新信息
   */
  async checkUpdate(id) {
    const rt = this.runtimes.get(id);
    if (!rt) return { ok: false, hasUpdate: false };
    const url = rt.manifest.updateUrl;
    if (!url) return { ok: false, hasUpdate: false, plugin: this.infoOf(rt) };
    const source = await fetchScript(url);
    const { manifest: remote } = loadScript(source, false);
    const samePlugin = remote.id === id && (remote.type ?? "source") === (rt.manifest.type ?? "source");
    if (!samePlugin || !isNewerVersion(remote.version, rt.manifest.version)) {
      if (rt.updateInfo) {
        rt.updateInfo = null;
        this.setStatus(rt, rt.status);
      }
      return { ok: true, hasUpdate: false, plugin: this.infoOf(rt) };
    }
    rt.updateInfo = {
      version: remote.version,
      log: remote.changelog,
      updateUrl: url,
      updatedAt: Date.now()
    };
    this.setStatus(rt, rt.status);
    return { ok: true, hasUpdate: true, plugin: this.infoOf(rt) };
  }
  /** 启动时静默检查所有声明了 @updateUrl 的插件 */
  async checkAllUpdates() {
    const targets = [...this.runtimes.values()].filter((rt) => rt.manifest.updateUrl);
    await Promise.allSettled(targets.map((rt) => this.checkUpdate(rt.manifest.id)));
  }
  /**
   * 用新源码原地更新插件：保留 id / 启用态 / 用户设置 / 每插件存储
   * @param id - 现有插件 ID
   * @param rawSource - 新版脚本源码
   * @returns 更新后的插件信息
   */
  async applyUpdateFromSource(id, rawSource) {
    const rt = this.runtimes.get(id);
    if (!rt) {
      throw Object.assign(new Error("plugin not found"), { code: PluginErrorCodes.NOT_FOUND });
    }
    const { source, manifest } = loadScript(rawSource, false);
    if (manifest.id !== id) {
      throw Object.assign(new Error("plugin name changed, please reinstall manually"), {
        code: PluginErrorCodes.INVALID_MANIFEST
      });
    }
    if ((manifest.type ?? "source") !== (rt.manifest.type ?? "source")) {
      throw Object.assign(new Error("plugin type changed, please reinstall manually"), {
        code: PluginErrorCodes.INVALID_MANIFEST
      });
    }
    manifest.fileName = `${id}.js`;
    manifest.installedAt = rt.manifest.installedAt;
    manifest.updatedAt = Date.now();
    fs.writeFileSync(path.join(scriptsDir(), manifest.fileName), source, "utf-8");
    const stored = readStored();
    stored.plugins[id] = manifest;
    writeStored(stored);
    rt.updateInfo = null;
    await this.stop(rt);
    rt.manifest = manifest;
    rt.source = source;
    rt.events = [];
    rt.controls = false;
    rt.settings = [];
    rt.menus = [];
    if (rt.enabled) await this.start(rt).catch(() => {
    });
    else this.setStatus(rt, { state: "disabled" });
    return {
      manifest: rt.manifest,
      enabled: rt.enabled,
      status: rt.status,
      updateInfo: rt.updateInfo,
      settingsValues: store$1.get(`plugins.perPlugin.${id}`) ?? {}
    };
  }
  async uninstall(id) {
    const rt = this.runtimes.get(id);
    if (!rt) return;
    await this.stop(rt);
    this.runtimes.delete(id);
    const stored = readStored();
    delete stored.plugins[id];
    writeStored(stored);
    try {
      fs.unlinkSync(path.join(scriptsDir(), rt.manifest.fileName));
    } catch {
    }
    pluginStorageDrop(id);
    const enabledMap = { ...store$1.get("plugins.enabled") };
    delete enabledMap[id];
    store$1.set("plugins.enabled", enabledMap);
  }
  async setEnabled(id, enabled2) {
    const rt = this.runtimes.get(id);
    if (!rt) return;
    const before = this.hasEnabledControlPlugin();
    rt.enabled = enabled2;
    const enabledMap = {
      ...store$1.get("plugins.enabled"),
      [id]: enabled2
    };
    store$1.set("plugins.enabled", enabledMap);
    if (enabled2) {
      this.hostRestartAttempts = 0;
      if (rt.status.state !== "ready") await this.start(rt).catch(() => {
      });
    } else {
      await this.stop(rt);
      this.setStatus(rt, { state: "disabled" });
      this.notifyControlActivity(before);
    }
  }
  /** 启动单个插件：在共享 host 进程里加载它 */
  async start(rt) {
    const id = rt.manifest.id;
    if (pluginHost.isReady(id) || rt.loading) return;
    rt.loading = true;
    this.setStatus(rt, { state: "loading" });
    const userSettings = store$1.get(`plugins.perPlugin.${id}`) ?? {};
    const spec = {
      pluginId: id,
      apiLevel: rt.manifest.apiLevel,
      locale: getLocale(),
      appVersion: app.getVersion(),
      userSettings,
      source: rt.source,
      scriptInfo: {
        name: rt.manifest.name,
        description: rt.manifest.description ?? "",
        version: rt.manifest.version,
        author: rt.manifest.author ?? "",
        homepage: rt.manifest.homepage ?? ""
      }
    };
    const callbacks = {
      onReady: (sources) => {
        this.hostRestartAttempts = 0;
        this.setStatus(rt, {
          state: "ready",
          sources,
          events: rt.events,
          controls: rt.controls,
          settings: rt.settings,
          menus: rt.menus
        });
        this.maybePrimeControl(rt);
      },
      onResult: (requestId, ok, data2, error) => {
        const p = rt.pending.get(requestId);
        if (!p) return;
        rt.pending.delete(requestId);
        clearTimeout(p.timer);
        if (ok) p.resolve(data2);
        else {
          const err = new Error(error?.message ?? "call failed");
          err.code = error?.code ?? PluginErrorCodes.UNKNOWN;
          p.reject(err);
        }
      },
      onHostCall: (callId, method, args) => {
        void dispatchHostCall(id, rt.manifest.grant, callId, method, args);
      },
      onLog: (level, args) => {
        coreLog[level](`[plugin:${id}]`, ...args);
      },
      onUpdateAvailable: (info) => {
        rt.updateInfo = info;
        this.setStatus(rt, rt.status);
      },
      onSourcesUpdate: (sources) => {
        if (rt.status.state === "ready") {
          const merged = { ...rt.status.sources, ...sources };
          this.setStatus(rt, { ...rt.status, sources: merged });
        } else {
          this.setStatus(rt, {
            state: "ready",
            sources,
            events: rt.events,
            controls: rt.controls,
            settings: rt.settings,
            menus: rt.menus
          });
        }
      },
      onRegistered: ({ events, controls, settings, menus: declaredMenus }) => {
        const menus = rt.manifest.grant.includes("ui") ? declaredMenus : [];
        if (declaredMenus.length && !menus.length) {
          coreLog.warn(`[plugin:${id}] 声明了菜单但缺少 "ui" 权限，已忽略`);
        }
        rt.events = events;
        rt.controls = controls;
        rt.settings = settings;
        rt.menus = menus;
        if (rt.status.state === "ready") {
          this.setStatus(rt, { ...rt.status, events, controls, settings, menus });
        } else {
          this.setStatus(rt, { state: "ready", sources: {}, events, controls, settings, menus });
        }
        this.maybePrimeControl(rt);
      },
      onFatal: (error) => {
        coreLog.error(`[plugin:${id}] fatal ${error.code}: ${error.message}`);
        this.setStatus(rt, { state: "error", error });
        this.rejectAllPending(rt, error.message, error.code);
      },
      onHostLost: () => {
        this.rejectAllPending(rt, "plugin host lost", PluginErrorCodes.WORKER_CRASHED);
      }
    };
    try {
      await pluginHost.loadPlugin(spec, callbacks);
    } catch (err) {
      const code = err?.code ?? PluginErrorCodes.UNKNOWN;
      if (code !== PluginErrorCodes.WORKER_CRASHED && rt.enabled && rt.status.state === "loading") {
        const message = err instanceof Error ? err.message : String(err);
        coreLog.error(`[plugin:${id}] load failed ${code}: ${message}`);
        this.setStatus(rt, { state: "error", error: { code, message } });
      }
    } finally {
      rt.loading = false;
    }
  }
  /** host 进程整体丢失：按退避重载所有 enabled 插件（爆炸半径=全部，自愈） */
  handleHostLost() {
    if (this.hostRestartTimer) return;
    this.hostRestartAttempts++;
    const enabled2 = [...this.runtimes.values()].filter((rt) => rt.enabled);
    if (this.hostRestartAttempts > RESTART_MAX_ATTEMPTS) {
      for (const rt of enabled2) {
        this.setStatus(rt, {
          state: "error",
          error: {
            code: PluginErrorCodes.WORKER_CRASHED,
            message: "plugin host crashed too many times"
          }
        });
      }
      return;
    }
    for (const rt of enabled2) this.setStatus(rt, { state: "loading" });
    const delayMs = [2e3, 8e3, 3e4][this.hostRestartAttempts - 1] ?? 3e4;
    coreLog.warn(`[plugin] host 丢失，${delayMs}ms 后重载 ${enabled2.length} 个插件`);
    this.hostRestartTimer = setTimeout(() => {
      this.hostRestartTimer = null;
      for (const rt of enabled2) {
        if (rt.enabled) this.start(rt).catch(() => {
        });
      }
    }, delayMs);
  }
  async stop(rt) {
    rt.loading = false;
    pluginHost.unloadPlugin(rt.manifest.id);
    this.rejectAllPending(rt, "plugin stopped", PluginErrorCodes.NOT_READY);
    this.setStatus(rt, { state: "unloaded" });
  }
  /** 失败并清空某插件的全部在途调用 */
  rejectAllPending(rt, message, code) {
    for (const pendingCall of rt.pending.values()) {
      clearTimeout(pendingCall.timer);
      pendingCall.reject(Object.assign(new Error(message), { code }));
    }
    rt.pending.clear();
  }
  setStatus(rt, status) {
    const before = this.hasEnabledControlPlugin();
    rt.status = status;
    this.emit("status", {
      manifest: rt.manifest,
      enabled: rt.enabled,
      status,
      updateInfo: rt.updateInfo,
      settingsValues: store$1.get(`plugins.perPlugin.${rt.manifest.id}`) ?? {}
    });
    this.notifyControlActivity(before);
  }
  /**
   * 控制类插件就绪后请求 bridge 定向补发快照
   * @param rt - 插件运行时
   */
  maybePrimeControl(rt) {
    if (rt.manifest.type === "control" && rt.status.state === "ready" && pluginHost.isReady(rt.manifest.id)) {
      this.emit("controlPluginReady", rt.manifest.id);
    }
  }
  /** 控制类插件的"有/无"状态翻转时通知（驱动 bridge 惰性挂载/卸载） */
  notifyControlActivity(before) {
    const after = this.hasEnabledControlPlugin();
    if (before !== after) this.emit("controlActivityChange", after);
  }
  /** 是否存在已启用且 ready 的控制类插件 */
  hasEnabledControlPlugin() {
    for (const rt of this.runtimes.values()) {
      if (rt.enabled && rt.manifest.type === "control" && rt.status.state === "ready") return true;
    }
    return false;
  }
  /**
   * 扇出高层播放事件给订阅了该事件的控制类插件
   * @param event - 播放事件类型
   * @param data - 事件载荷
   */
  broadcastPlaybackEvent(event, data2) {
    for (const rt of this.runtimes.values()) {
      if (rt.enabled && rt.manifest.type === "control" && rt.status.state === "ready" && rt.events.includes(event)) {
        pluginHost.sendEvent(rt.manifest.id, event, data2);
      }
    }
  }
  /**
   * 向单个控制类插件定向下发播放事件（用于新就绪插件的快照补发）
   * @param id - 插件 ID
   * @param event - 播放事件类型
   * @param data - 事件载荷
   */
  sendPlaybackEventTo(id, event, data2) {
    const rt = this.runtimes.get(id);
    if (rt && rt.enabled && rt.manifest.type === "control" && rt.status.state === "ready" && rt.events.includes(event)) {
      pluginHost.sendEvent(id, event, data2);
    }
  }
  /**
   * 写入某插件单个设置并实时下发沙箱
   * @param id - 插件 ID
   * @param key - 设置键名
   * @param value - 待写入值（经 schema 校验后存储）
   */
  async setSetting(id, key, value) {
    const rt = this.runtimes.get(id);
    if (!rt) return;
    const item = rt.settings.find((setting) => setting.key === key);
    if (!item) return;
    const sanitized = sanitizeSettingValue(item, value);
    const all = {
      ...store$1.get(`plugins.perPlugin.${id}`) ?? {},
      [key]: sanitized
    };
    store$1.set(`plugins.perPlugin.${id}`, all);
    if (pluginHost.isReady(id)) pluginHost.sendSettingsUpdate(id, { [key]: sanitized });
  }
  /** 应用退出前调用 */
  async shutdown() {
    if (this.hostRestartTimer) {
      clearTimeout(this.hostRestartTimer);
      this.hostRestartTimer = null;
    }
    pluginHost.shutdown();
  }
}
const pluginRegistry = new PluginRegistry();
let reqSeq = 0;
const nextRequestId = () => `r${Date.now().toString(36)}-${++reqSeq}`;
const callOn = (rt, action, params, timeoutMs) => {
  const id = rt.manifest.id;
  if (!pluginHost.isReady(id)) {
    return Promise.reject(
      Object.assign(new Error(`plugin ${id} not ready`), {
        code: PluginErrorCodes.NOT_READY
      })
    );
  }
  const requestId = nextRequestId();
  return new Promise((resolve2, reject) => {
    const timer = setTimeout(() => {
      rt.pending.delete(requestId);
      pluginHost.sendCancel(id, requestId);
      reject(
        Object.assign(new Error(`plugin ${id} request timeout`), {
          code: PluginErrorCodes.REQUEST_TIMEOUT
        })
      );
    }, timeoutMs);
    rt.pending.set(requestId, {
      resolve: (v) => resolve2(v),
      reject,
      timer
    });
    pluginHost.sendCall(id, requestId, action, params);
  });
};
const resolveUrl = async (args) => {
  const rt = pluginRegistry.getRuntime(args.pluginId);
  if (!rt) {
    throw Object.assign(new Error(`plugin ${args.pluginId} not found`), {
      code: PluginErrorCodes.NOT_FOUND
    });
  }
  if (rt.status.state !== "ready") {
    throw Object.assign(new Error(`plugin ${args.pluginId} not ready`), {
      code: PluginErrorCodes.NOT_READY
    });
  }
  const params = {
    source: args.source ?? "",
    quality: args.quality ?? "hq",
    musicInfo: args.musicInfo
  };
  try {
    return await callOn(rt, "musicUrl", params, ACTION_TIMEOUTS.musicUrl);
  } catch (err) {
    pluginLog.warn("resolveUrl rejected", args.pluginId, err?.message);
    throw err;
  }
};
const invokeMenu = async (args) => {
  const rt = pluginRegistry.getRuntime(args.pluginId);
  if (!rt) {
    throw Object.assign(new Error(`plugin ${args.pluginId} not found`), {
      code: PluginErrorCodes.NOT_FOUND
    });
  }
  if (rt.status.state !== "ready") {
    throw Object.assign(new Error(`plugin ${args.pluginId} not ready`), {
      code: PluginErrorCodes.NOT_READY
    });
  }
  const params = { menuId: args.menuId, track: args.track };
  return await callOn(rt, "menuClick", params, ACTION_TIMEOUTS.menuClick);
};
const callMusicSearch = (rt, req) => callOn(rt, "musicSearch", req, ACTION_TIMEOUTS.musicSearch);
const callMusicLyric = (rt, req) => callOn(rt, "musicLyric", req, ACTION_TIMEOUTS.musicLyric);
const callMusicPic = (rt, req) => callOn(rt, "musicPic", req, ACTION_TIMEOUTS.musicPic);
const callMusicComment = (rt, req) => callOn(rt, "musicComment", req, ACTION_TIMEOUTS.musicComment);
const normalize = (text) => {
  if (!text) return "";
  return text.toLowerCase().replace(/[、&;，,/|()·・\s\-_'"`~!?？！.。]+/g, "");
};
const bothContains = (left, right) => left.length > 0 && right.length > 0 && (left.includes(right) || right.includes(left));
const splitArtists = (text) => (text ?? "").split(/[、&;，,/|·・]+/g).map(normalize).filter(Boolean);
const normalizeTrackArtists = (track) => track.artists.map((artist2) => normalize(artist2.name)).filter(Boolean);
const buildLyricSearchKeyword = (track) => [track.title, track.artists.map((artist2) => artist2.name).join(" ")].map((part) => part.trim()).filter(Boolean).join(" ");
const artistMatches = (candidateArtist, trackArtists) => {
  if (trackArtists.length === 0) return { exact: false, contains: false };
  const candFull = normalize(candidateArtist);
  const candParts = splitArtists(candidateArtist);
  if (!candFull) return { exact: false, contains: false };
  const exact = trackArtists.some(
    (artist2) => candFull === artist2 || candParts.some((part) => part === artist2)
  );
  if (exact) return { exact: true, contains: false };
  const contains = trackArtists.some(
    (artist2) => artist2.length >= 2 && (bothContains(candFull, artist2) || candParts.some((part) => bothContains(part, artist2)))
  );
  return { exact: false, contains };
};
const durationClose = (leftMs, rightMs, tolMs = 5e3) => {
  if (!leftMs || !rightMs) return false;
  return Math.abs(leftMs - rightMs) <= tolMs;
};
const durationFar = (leftMs, rightMs, tolMs = 2e4) => {
  if (!leftMs || !rightMs) return false;
  return Math.abs(leftMs - rightMs) > tolMs;
};
const NAME_CONTAIN_MIN_RATIO = 0.34;
const pickBestCandidate = (candidates, track) => {
  const trackName = normalize(track.title);
  const trackArtists = normalizeTrackArtists(track);
  const trackAlbum = normalize(track.album?.name);
  const trackDuration = track.duration;
  let best = null;
  let bestScore = 0;
  for (const candidate of candidates) {
    const candName = normalize(candidate.name);
    const candAlbum = normalize(candidate.album);
    const nameExact = candName.length > 0 && candName === trackName;
    if (!nameExact) {
      if (!bothContains(candName, trackName)) continue;
      const longer = Math.max(candName.length, trackName.length);
      const shorter = Math.min(candName.length, trackName.length);
      if (shorter / longer < NAME_CONTAIN_MIN_RATIO) continue;
    }
    if (durationFar(candidate.duration, trackDuration)) continue;
    const artist2 = artistMatches(candidate.artist, trackArtists);
    if (trackArtists.length > 0 && !artist2.exact && !artist2.contains) continue;
    if (!nameExact && !artist2.exact && !artist2.contains && !durationClose(candidate.duration, trackDuration)) {
      continue;
    }
    let score = nameExact ? 10 : 4;
    if (artist2.exact) score += 5;
    else if (artist2.contains) score += 2;
    if (trackAlbum && candAlbum === trackAlbum) score += 2;
    if (durationClose(candidate.duration, trackDuration)) score += 3;
    if (score > bestScore) {
      bestScore = score;
      best = candidate;
    }
  }
  return best;
};
const PLATFORM_TO_PLUGIN_SOURCE$1 = {
  netease: "wy",
  qqmusic: "tx",
  kugou: "kg"
};
const findMatch = async (rt, source, track) => {
  if (PLATFORM_TO_PLUGIN_SOURCE$1[track.source] === source && track.id) {
    return {
      id: track.id,
      name: track.title,
      singer: track.artists.map((artist2) => artist2.name).join("/"),
      album: track.album?.name,
      durationMs: track.duration
    };
  }
  const keyword = `${track.title} ${track.artists.map((artist2) => artist2.name).join(" ")}`.trim();
  if (!keyword) return null;
  const res = await callMusicSearch(rt, { source, keyword });
  const list2 = res?.list ?? [];
  if (list2.length === 0) return null;
  const candidates = list2.map((item) => ({
    name: item.name,
    artist: item.singer ?? "",
    album: item.album,
    duration: item.durationMs,
    extra: item
  }));
  return pickBestCandidate(candidates, track)?.extra ?? null;
};
const matchLyric = async (args) => {
  const rt = pluginRegistry.getRuntime(args.pluginId);
  if (!rt || rt.status.state !== "ready") return null;
  try {
    const musicInfo = await findMatch(rt, args.source, args.track);
    if (!musicInfo) return null;
    const lyric2 = await callMusicLyric(rt, { source: args.source, musicInfo });
    return lyric2?.lyric ? lyric2 : null;
  } catch (err) {
    pluginLog.warn("matchLyric failed", args.pluginId, args.source, err?.message);
    return null;
  }
};
const matchCover = async (args) => {
  const rt = pluginRegistry.getRuntime(args.pluginId);
  if (!rt || rt.status.state !== "ready") return null;
  try {
    const musicInfo = await findMatch(rt, args.source, args.track);
    if (!musicInfo) return null;
    const pic = await callMusicPic(rt, { source: args.source, musicInfo });
    return pic?.url ? pic : null;
  } catch (err) {
    pluginLog.warn("matchCover failed", args.pluginId, args.source, err?.message);
    return null;
  }
};
const registerPluginIpc = () => {
  ipcMain.handle("plugin:list", () => pluginRegistry.listInfo());
  ipcMain.handle("plugin:install", async (_evt, filePath) => {
    try {
      const info = await pluginRegistry.install(filePath);
      return { ok: true, id: info.manifest.id };
    } catch (err) {
      coreLog.warn("[plugin] install failed:", err);
      return {
        ok: false,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  });
  ipcMain.handle("plugin:pickAndInstall", async () => {
    const res = await dialog.showOpenDialog({
      title: "选择插件脚本",
      filters: [{ name: "Plugin Script", extensions: ["js"] }],
      properties: ["openFile"]
    });
    if (res.canceled || !res.filePaths[0]) return { ok: false, cancelled: true };
    try {
      const info = await pluginRegistry.install(res.filePaths[0]);
      return { ok: true, id: info.manifest.id };
    } catch (err) {
      coreLog.warn("[plugin] pickAndInstall failed:", err);
      return {
        ok: false,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  });
  ipcMain.handle("plugin:market", async () => {
    try {
      return { ok: true, plugins: await fetchMarket() };
    } catch (err) {
      coreLog.warn("[plugin] market fetch failed:", err);
      return { ok: false, plugins: [], error: err instanceof Error ? err.message : String(err) };
    }
  });
  ipcMain.handle("plugin:installFromUrl", async (_evt, url) => {
    try {
      const source = await fetchScript(url);
      const info = await pluginRegistry.installFromSource(source);
      return { ok: true, id: info.manifest.id };
    } catch (err) {
      coreLog.warn("[plugin] installFromUrl failed:", err);
      return {
        ok: false,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  });
  ipcMain.handle("plugin:uninstall", async (_evt, id) => {
    try {
      await pluginRegistry.uninstall(id);
      return { ok: true };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  });
  ipcMain.handle("plugin:setEnabled", async (_evt, id, enabled2) => {
    await pluginRegistry.setEnabled(id, enabled2);
  });
  ipcMain.handle("plugin:setSetting", async (_event, id, key, value) => {
    await pluginRegistry.setSetting(id, key, value);
  });
  ipcMain.handle("plugin:checkUpdate", async (_evt, id) => {
    try {
      return await pluginRegistry.checkUpdate(id);
    } catch (err) {
      coreLog.warn("[plugin] checkUpdate failed:", err);
      return {
        ok: false,
        hasUpdate: false,
        error: err instanceof Error ? err.message : String(err)
      };
    }
  });
  ipcMain.handle("plugin:applyUpdate", async (_evt, id) => {
    const updateUrl = pluginRegistry.getUpdateUrl(id);
    if (!updateUrl) return { ok: false, error: "PLUGIN_NO_UPDATE_URL" };
    try {
      const source = await fetchScript(updateUrl);
      const plugin = await pluginRegistry.applyUpdateFromSource(id, source);
      return { ok: true, plugin };
    } catch (err) {
      coreLog.warn("[plugin] applyUpdate failed:", err);
      return {
        ok: false,
        error: err instanceof Error ? err.message : String(err),
        fallbackUrl: updateUrl
      };
    }
  });
  ipcMain.handle("plugin:resolveUrl", async (_evt, args) => {
    return resolveUrl(args);
  });
  ipcMain.handle("plugin:invokeMenu", async (_evt, args) => {
    try {
      const res = await invokeMenu(args);
      return { ok: true, toast: res?.toast, openUrl: res?.openUrl, copyText: res?.copyText };
    } catch (err) {
      coreLog.warn("[plugin] invokeMenu failed:", err);
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  ipcMain.handle("plugin:matchLyric", async (_evt, args) => {
    const data2 = await matchLyric(args);
    return data2 ? { ok: true, data: data2 } : { ok: false };
  });
  ipcMain.handle("plugin:matchCover", async (_evt, args) => {
    const data2 = await matchCover(args);
    return data2 ? { ok: true, data: data2 } : { ok: false };
  });
  pluginRegistry.on("status", (info) => {
    broadcast("plugin:status", info);
  });
};
const FAKE_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
let activeWin = null;
let pollTimer = null;
const stopPolling = () => {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
};
const openLoginWindow = async (config) => {
  if (activeWin && !activeWin.isDestroyed()) {
    activeWin.focus();
    return null;
  }
  const ses = session$2.fromPartition(config.partition);
  await ses.clearStorageData({ storages: ["cookies", "localstorage", "indexdb"] });
  ses.setUserAgent(FAKE_UA);
  const parent = getMainWindow() ?? void 0;
  activeWin = new BrowserWindow({
    parent,
    modal: false,
    width: 1024,
    height: 720,
    minWidth: 800,
    minHeight: 600,
    center: true,
    title: config.title,
    autoHideMenuBar: true,
    backgroundColor: "#ffffff",
    show: false,
    webPreferences: {
      session: ses,
      // sandbox 模式下部分音乐网站 JS 渲染极慢；登录窗口无自有业务代码，关闭沙箱影响可控
      sandbox: false,
      spellcheck: false,
      backgroundThrottling: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  activeWin.webContents.setUserAgent(FAKE_UA);
  activeWin.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  return await new Promise((resolve2) => {
    let settled = false;
    const finish = (result2) => {
      if (settled) return;
      settled = true;
      stopPolling();
      if (activeWin && !activeWin.isDestroyed()) activeWin.destroy();
      activeWin = null;
      resolve2(result2);
    };
    activeWin.once("ready-to-show", () => activeWin?.show());
    activeWin.webContents.once("dom-ready", () => {
      pollTimer = setInterval(async () => {
        try {
          const cookies = await config.collectCookies(ses);
          if (cookies) finish(cookies);
        } catch (err) {
          coreLog.warn(`${config.logTag} poll cookies failed:`, err);
        }
      }, 1e3);
    });
    activeWin.on("closed", () => finish(null));
    activeWin.loadURL(config.url, { userAgent: FAKE_UA }).catch((err) => {
      coreLog.error(`${config.logTag} loadURL failed:`, err);
      finish(null);
    });
  });
};
const NETEASE_COOKIE_KEYS = ["MUSIC_U", "__csrf", "NMTID", "MUSIC_A"];
const NETEASE_CONFIG = {
  title: "登录网易云音乐",
  url: "https://music.163.com/#/login",
  partition: "persist:netease-login",
  logTag: "[login]",
  collectCookies: async (ses) => {
    const all = await ses.cookies.get({ url: "https://music.163.com" });
    const musicU = all.find((c) => c.name === "MUSIC_U");
    if (!musicU?.value) return null;
    const out = {};
    for (const key of NETEASE_COOKIE_KEYS) {
      const hit = all.find((c) => c.name === key);
      if (hit?.value) out[key] = hit.value;
    }
    return out;
  }
};
const openNeteaseLoginWindow = async () => {
  return await openLoginWindow(NETEASE_CONFIG);
};
const dispatch = async (platform, name, params) => {
  switch (platform) {
    case "netease": {
      const res = await callNetease(name, params);
      return { status: res.status, body: res.body };
    }
    case "qqmusic": {
      const data2 = await callQQMusic(name, params);
      return { data: data2 };
    }
    case "kugou": {
      const data2 = await callKugou(name, params);
      return { data: data2 };
    }
    default:
      throw new Error(`unknown platform: ${platform}`);
  }
};
const registerApisIpc = () => {
  ipcMain.handle(
    "apis:call",
    async (_evt, platform, name, params) => {
      try {
        const result2 = await dispatch(platform, name, params ?? {});
        return { ok: true, ...result2 };
      } catch (err) {
        coreLog.warn(`[apis] ${platform}.${name} failed:`, err);
        if (platform === "netease" && err instanceof NeteaseRequestError) {
          return {
            ok: false,
            error: err.message,
            status: err.response.status,
            body: err.response.body
          };
        }
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  ipcMain.handle("apis:clearSession", (_evt, platform) => {
    if (platform === "netease") clearNeteaseCookies();
    if (platform === "qqmusic") clearQQMusicCookies();
    if (platform === "kugou") clearKugouSession();
  });
  ipcMain.handle("apis:openLoginWeb", async (_evt, platform) => {
    try {
      if (platform === "netease") {
        const cookies = await openNeteaseLoginWindow();
        if (!cookies) return { ok: false, error: "canceled" };
        mergeNeteaseCookies(cookies);
        return { ok: true };
      }
      return { ok: false, error: "unsupported platform" };
    } catch (err) {
      coreLog.warn(`[apis] openLoginWeb ${platform} failed:`, err);
      return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
  });
  ipcMain.handle("apis:setCookie", (_evt, platform, raw) => {
    const parsed = cookieToJson(raw);
    if (platform === "netease") {
      if (!parsed.MUSIC_U) return { ok: false, error: "missing MUSIC_U" };
      mergeNeteaseCookies(parsed);
      return { ok: true };
    }
    if (platform === "qqmusic") {
      if (!parsed.uin && !parsed.wxuin && !parsed.p_uin && !parsed.qm_keyst && !parsed.qqmusic_key) {
        return { ok: false, error: "missing uin or key" };
      }
      mergeQQMusicCookies(parsed);
      return { ok: true };
    }
    if (platform === "kugou") {
      if (!parsed.token || !parsed.userid) {
        return { ok: false, error: "missing token or userid" };
      }
      mergeKugouSession(parsed);
      return { ok: true };
    }
    return { ok: false, error: "unsupported platform" };
  });
};
const getCachedLyric = (platform, platformId) => {
  const row = getDb().prepare("SELECT data FROM lyric_cache WHERE platform = ? AND platform_id = ?").get(platform, platformId);
  if (!row) return null;
  try {
    return JSON.parse(row.data);
  } catch {
    return null;
  }
};
const setCachedLyric = (platform, platformId, result2) => {
  getDb().prepare(
    `INSERT INTO lyric_cache (platform, platform_id, data, fetched_at) VALUES (?, ?, ?, ?)
       ON CONFLICT(platform, platform_id) DO UPDATE SET
         data = excluded.data,
         fetched_at = excluded.fetched_at`
  ).run(platform, platformId, JSON.stringify(result2), Date.now());
};
const clearLyricCache = () => {
  getDb().prepare("DELETE FROM lyric_cache").run();
};
const TTL_MS = 30 * 24 * 60 * 60 * 1e3;
const DURATION_BUCKET_MS = 5e3;
const FINGERPRINT_VERSION = "v2";
const buildFingerprint = (track) => {
  const title = normalize(track.title);
  const artist2 = normalizeTrackArtists(track).join("");
  const bucket = track.duration ? Math.round(track.duration / DURATION_BUCKET_MS) : 0;
  return `${FINGERPRINT_VERSION}|${title}|${artist2}|${bucket}`;
};
const parseExtra = (raw) => {
  if (!raw) return void 0;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : void 0;
  } catch {
    return void 0;
  }
};
const getMatchedId = (fingerprint, platform) => {
  const row = getDb().prepare(
    "SELECT platform_id, extra, matched_at FROM lyric_match_cache WHERE fingerprint = ? AND platform = ?"
  ).get(fingerprint, platform);
  if (!row) return null;
  if (Date.now() - row.matched_at > TTL_MS) return null;
  return {
    platformId: row.platform_id,
    extra: parseExtra(row.extra)
  };
};
const setMatchedId = (fingerprint, platform, platformId, extra) => {
  const extraJson = extra ? JSON.stringify(extra) : null;
  getDb().prepare(
    `INSERT INTO lyric_match_cache (fingerprint, platform, platform_id, extra, matched_at) VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(fingerprint, platform) DO UPDATE SET
         platform_id = excluded.platform_id,
         extra = excluded.extra,
         matched_at = excluded.matched_at`
  ).run(fingerprint, platform, platformId, extraJson, Date.now());
};
const clearLyricMatchCache = () => {
  getDb().prepare("DELETE FROM lyric_match_cache").run();
};
const NEGATIVE_TTL_MS = 72 * 60 * 60 * 1e3;
const getCachedTTML = (platform, id) => {
  const row = getDb().prepare("SELECT content, fetched_at FROM lyric_ttml_cache WHERE platform = ? AND id = ?").get(platform, id);
  if (!row) return "miss";
  if (row.content !== null) return row.content;
  if (Date.now() - row.fetched_at > NEGATIVE_TTL_MS) return "miss";
  return null;
};
const setCachedTTML = (platform, id, content) => {
  getDb().prepare(
    `INSERT INTO lyric_ttml_cache (platform, id, content, fetched_at) VALUES (?, ?, ?, ?)
       ON CONFLICT(platform, id) DO UPDATE SET
         content = excluded.content,
         fetched_at = excluded.fetched_at`
  ).run(platform, id, content, Date.now());
};
const clearLyricTtmlCache = () => {
  getDb().prepare("DELETE FROM lyric_ttml_cache").run();
};
const TIMEOUT_MS = 8e3;
const inflight$1 = /* @__PURE__ */ new Map();
const doFetch = async (platform, id) => {
  if (!store$1.get("lyric.enableOnlineTTMLLyric")) return null;
  const cached = getCachedTTML(platform, id);
  if (cached !== "miss") return cached;
  const tmpl = store$1.get("lyric.amllDbServer");
  if (!tmpl || !tmpl.includes("%p") || !tmpl.includes("%s")) return null;
  const path2 = platform === "netease" ? "ncm-lyrics" : "qq-lyrics";
  const url = tmpl.replace("%p", path2).replace("%s", encodeURIComponent(id));
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (res.status === 200) {
      const content = await res.text();
      if (!content.trim()) {
        setCachedTTML(platform, id, null);
        return null;
      }
      setCachedTTML(platform, id, content);
      return content;
    }
    if (res.status === 404) {
      setCachedTTML(platform, id, null);
      return null;
    }
    coreLog.warn(`[ttml] ${platform}:${id} HTTP ${res.status}`);
    return null;
  } catch (err) {
    coreLog.warn(`[ttml] ${platform}:${id} fetch failed:`, err);
    return null;
  }
};
const fetchOne = (platform, id) => {
  const key = `${platform}:${id}`;
  const existing = inflight$1.get(key);
  if (existing) return existing;
  const promise = doFetch(platform, id).finally(() => inflight$1.delete(key));
  inflight$1.set(key, promise);
  return promise;
};
const fetchTTML = async (platform, ids) => {
  for (const id of ids) {
    if (!id) continue;
    const result2 = await fetchOne(platform, id);
    if (result2) return result2;
  }
  return null;
};
const prefetchTTML = (platform, ids) => {
  void fetchTTML(platform, ids);
};
const pickMain = (yrc, lrc) => {
  const yrcContent = yrc?.trim();
  if (yrcContent) return { content: yrcContent, format: "yrc" };
  const lrcContent = lrc?.trim();
  if (lrcContent) return { content: lrcContent, format: "lrc" };
  return void 0;
};
const pickSub = (yPaired, plain) => {
  const preferred = yPaired?.trim();
  if (preferred) return { content: preferred, format: "lrc" };
  const fallback = plain?.trim();
  if (fallback) return { content: fallback, format: "lrc" };
  return void 0;
};
const getByPlatformId$2 = async (id) => {
  prefetchTTML("netease", [id]);
  const cached = getCachedLyric("netease", id);
  if (cached) {
    if (cached.translationFormat === "yrc") cached.translationFormat = "lrc";
    if (cached.romajiFormat === "yrc") cached.romajiFormat = "lrc";
    return cached;
  }
  try {
    const { status, body } = await callNetease("lyric_new", { id });
    if (status !== 200 || body.code !== 200) return null;
    const main = pickMain(body.yrc?.lyric, body.lrc?.lyric);
    if (!main) return null;
    const trans = pickSub(body.ytlrc?.lyric, body.tlyric?.lyric);
    const roma = pickSub(body.yromalrc?.lyric, body.romalrc?.lyric);
    const result2 = {
      platform: "netease",
      format: main.format,
      content: main.content,
      translation: trans?.content,
      translationFormat: trans?.format,
      romaji: roma?.content,
      romajiFormat: roma?.format
    };
    setCachedLyric("netease", id, result2);
    return result2;
  } catch (err) {
    coreLog.warn(`[lyric:netease] getByPlatformId(${id}) failed:`, err);
    return null;
  }
};
const getByQuery$2 = async (track) => {
  const fingerprint = buildFingerprint(track);
  const cached = getMatchedId(fingerprint, "netease");
  if (cached) return getByPlatformId$2(cached.platformId);
  const keyword = buildLyricSearchKeyword(track);
  if (!keyword) return null;
  const candidates = [];
  try {
    const { status, body } = await callNetease("search", {
      keywords: keyword,
      type: 1,
      limit: 20
    });
    if (status !== 200) return null;
    const songs = body.result?.songs ?? [];
    for (const song of songs) {
      candidates.push({
        name: song.name,
        artist: (song.artists ?? []).map((artist2) => artist2.name).join(" / "),
        album: song.album?.name,
        duration: song.duration,
        extra: { id: String(song.id) }
      });
    }
  } catch (err) {
    coreLog.warn(`[lyric:netease] search("${keyword}") failed:`, err);
    return null;
  }
  const best = pickBestCandidate(candidates, track);
  coreLog.info(
    `[lyric:netease] fuzzy "${keyword}" → ${candidates.length} hits, best=${best?.name ?? "none"}`
  );
  if (!best) return null;
  setMatchedId(fingerprint, "netease", best.extra.id);
  return getByPlatformId$2(best.extra.id);
};
const pickFormatted$1 = (qrc, lrc) => {
  const qrcContent = qrc?.trim();
  if (qrcContent) return { content: qrcContent, format: "qrc" };
  const lrcContent = lrc?.trim();
  if (lrcContent) return { content: lrcContent, format: "lrc" };
  return void 0;
};
const getByPlatformId$1 = async (id, mid) => {
  prefetchTTML("qqmusic", mid ? [mid, id] : [id]);
  const cached = getCachedLyric("qqmusic", id);
  if (cached) return cached;
  try {
    const body = await callQQMusic("lyric", { id });
    if (body.code !== 200) {
      coreLog.warn(
        `[lyric:qqmusic] getByPlatformId(${id}) code=${body.code}: ${body.message ?? "no message"}`
      );
      return null;
    }
    const main = pickFormatted$1(body.qrc, body.lrc);
    if (!main) return null;
    const trans = body.trans?.trim();
    const roma = body.roma?.trim();
    const result2 = {
      platform: "qqmusic",
      format: main.format,
      content: main.content,
      translation: trans || void 0,
      translationFormat: trans ? "lrc" : void 0,
      romaji: roma || void 0,
      romajiFormat: roma ? main.format : void 0,
      extra: mid ? { mid } : void 0
    };
    setCachedLyric("qqmusic", id, result2);
    return result2;
  } catch (err) {
    coreLog.warn(`[lyric:qqmusic] getByPlatformId(${id}) failed:`, err);
    return null;
  }
};
const getByQuery$1 = async (track) => {
  const fingerprint = buildFingerprint(track);
  const cached = getMatchedId(fingerprint, "qqmusic");
  if (cached) return getByPlatformId$1(cached.platformId, cached.extra?.mid);
  const keyword = buildLyricSearchKeyword(track);
  if (!keyword) return null;
  const candidates = [];
  try {
    const body = await callQQMusic("search", { keywords: keyword, limit: 25 });
    if (body.code !== 200) return null;
    for (const song of body.songs ?? []) {
      candidates.push({
        name: song.name,
        artist: song.artist,
        album: song.album,
        duration: song.duration,
        extra: { id: song.id, mid: song.mid }
      });
    }
  } catch (err) {
    coreLog.warn(`[lyric:qqmusic] search("${keyword}") failed:`, err);
    return null;
  }
  const best = pickBestCandidate(candidates, track);
  coreLog.info(
    `[lyric:qqmusic] fuzzy "${keyword}" → ${candidates.length} hits, best=${best?.name ?? "none"}`
  );
  if (!best) return null;
  setMatchedId(fingerprint, "qqmusic", best.extra.id, { mid: best.extra.mid });
  return getByPlatformId$1(best.extra.id, best.extra.mid);
};
const pickFormatted = (krc, lrc) => {
  const krcContent = krc?.trim();
  if (krcContent) return { content: krcContent, format: "krc" };
  const lrcContent = lrc?.trim();
  if (lrcContent) return { content: lrcContent, format: "lrc" };
  return void 0;
};
const fetchLyric = async (args) => {
  const cached = getCachedLyric("kugou", args.hash);
  if (cached) return cached;
  try {
    const body = await callKugou("lyric", {
      hash: args.hash,
      name: args.name ?? "",
      duration: args.durationMs ? Math.round(args.durationMs / 1e3) : 0
    });
    if (body.code !== 200) {
      coreLog.warn(
        `[lyric:kugou] fetchLyric(${args.hash}) code=${body.code}: ${body.message ?? "no message"}`
      );
      return null;
    }
    const main = pickFormatted(body.krc, body.lrc);
    if (!main) return null;
    const trans = body.trans?.trim();
    const roma = body.roma?.trim();
    const result2 = {
      platform: "kugou",
      format: main.format,
      content: main.content,
      translation: trans || void 0,
      translationFormat: trans ? "lrc" : void 0,
      romaji: roma || void 0,
      romajiFormat: roma ? "lrc" : void 0
    };
    setCachedLyric("kugou", args.hash, result2);
    return result2;
  } catch (err) {
    coreLog.warn(`[lyric:kugou] fetchLyric(${args.hash}) failed:`, err);
    return null;
  }
};
const getByPlatformId = (hash2) => fetchLyric({ hash: hash2 });
const getByQuery = async (track) => {
  const fingerprint = buildFingerprint(track);
  const cached = getMatchedId(fingerprint, "kugou");
  if (cached) {
    return fetchLyric({
      hash: cached.platformId,
      name: track.title,
      durationMs: track.duration
    });
  }
  const keyword = buildLyricSearchKeyword(track);
  if (!keyword) return null;
  const candidates = [];
  try {
    const body = await callKugou("search", { keywords: keyword, limit: 25 });
    if (body.code !== 200) return null;
    for (const song of body.songs ?? []) {
      candidates.push({
        name: song.name,
        artist: song.artist,
        album: song.album,
        duration: song.duration,
        extra: { hash: song.hash }
      });
    }
  } catch (err) {
    coreLog.warn(`[lyric:kugou] search("${keyword}") failed:`, err);
    return null;
  }
  const best = pickBestCandidate(candidates, track);
  coreLog.info(
    `[lyric:kugou] fuzzy "${keyword}" → ${candidates.length} hits, best=${best?.name ?? "none"}`
  );
  if (!best) return null;
  setMatchedId(fingerprint, "kugou", best.extra.hash);
  return fetchLyric({
    hash: best.extra.hash,
    name: best.name,
    durationMs: best.duration
  });
};
let cache = null;
let building = null;
const extractMeta = (text) => {
  const bodyAt = text.indexOf("<body");
  const head = bodyAt > 0 ? text.slice(0, bodyAt) : text.slice(0, 8e3);
  const meta = {};
  for (const tag of head.matchAll(/<amll:meta\b[^>]*>/gi)) {
    const key = tag[0].match(/\bkey="([^"]*)"/)?.[1];
    const value = tag[0].match(/\bvalue="([^"]*)"/)?.[1];
    if (!key || !value) continue;
    if (key === "musicName" && !meta.name) meta.name = value;
    else if (key === "artists" && !meta.artist) meta.artist = value;
    else if (key === "ncmMusicId" && !meta.ncmId) meta.ncmId = value;
    else if (key === "qqMusicId" && !meta.qqId) meta.qqId = value;
  }
  return meta;
};
const collectTtml = async (dir) => {
  const out = [];
  const walk = async (current2) => {
    let entries;
    try {
      entries = await readdir(current2, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join$1(current2, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.isFile() && extname(entry.name).toLowerCase() === ".ttml") out.push(full);
    }
  };
  await walk(dir);
  return out;
};
const buildIndex = async (dir) => {
  const index = { byNcm: /* @__PURE__ */ new Map(), byQq: /* @__PURE__ */ new Map(), byTitle: /* @__PURE__ */ new Map() };
  const files = await collectTtml(dir);
  for (const file of files) {
    let text;
    try {
      text = await readFileAutoEncoding(file);
    } catch {
      continue;
    }
    const meta = extractMeta(text);
    if (meta.ncmId && !index.byNcm.has(meta.ncmId)) index.byNcm.set(meta.ncmId, file);
    if (meta.qqId && !index.byQq.has(meta.qqId)) index.byQq.set(meta.qqId, file);
    if (meta.name) {
      const titleKey = normalize(meta.name);
      const candidate = { artist: normalize(meta.artist ?? ""), file };
      const list2 = index.byTitle.get(titleKey);
      if (list2) list2.push(candidate);
      else index.byTitle.set(titleKey, [candidate]);
    }
  }
  coreLog.info(`[localLyric] 索引完成：${files.length} 个文件 @ ${dir}`);
  return index;
};
const getIndex = async () => {
  const dir = store$1.get("localLyric.repoDir") || "";
  if (!dir) return null;
  let mtimeMs;
  try {
    mtimeMs = (await stat(dir)).mtimeMs;
  } catch {
    return null;
  }
  if (cache && cache.dir === dir && cache.mtimeMs === mtimeMs) return cache.index;
  if (building) return building;
  building = (async () => {
    try {
      const index = await buildIndex(dir);
      cache = { dir, mtimeMs, index };
      return index;
    } catch (err) {
      coreLog.warn("[localLyric] 索引构建失败：", err);
      return null;
    } finally {
      building = null;
    }
  })();
  return building;
};
const tryRead = async (file) => {
  if (!file) return null;
  try {
    return await readFileAutoEncoding(file);
  } catch {
    return null;
  }
};
const pickByArtist = (candidates, wantArtist) => {
  if (candidates.length === 1 || !wantArtist) return candidates[0].file;
  const exact = candidates.find((candidate) => candidate.artist === wantArtist);
  if (exact) return exact.file;
  const partial = candidates.find(
    (candidate) => candidate.artist && (candidate.artist.includes(wantArtist) || wantArtist.includes(candidate.artist))
  );
  return (partial ?? candidates[0]).file;
};
const matchByCachedId = async (track, index) => {
  const fingerprint = buildFingerprint(track);
  const ncm = getMatchedId(fingerprint, "netease");
  if (ncm) {
    const hit = await tryRead(index.byNcm.get(ncm.platformId));
    if (hit) return hit;
  }
  const qq = getMatchedId(fingerprint, "qqmusic");
  if (qq) {
    for (const idCandidate of [qq.extra?.mid, qq.platformId]) {
      if (!idCandidate) continue;
      const hit = await tryRead(index.byQq.get(idCandidate));
      if (hit) return hit;
    }
  }
  return null;
};
const matchLocalTTML = async (track) => {
  if (!store$1.get("localLyric.enableLocalTTMLOverride")) return null;
  const index = await getIndex();
  if (!index) return null;
  if (track.source === "netease") {
    const hit = await tryRead(index.byNcm.get(track.id));
    if (hit) return hit;
  }
  if (track.source === "qqmusic") {
    for (const idCandidate of [track.extId, track.id]) {
      if (!idCandidate) continue;
      const hit = await tryRead(index.byQq.get(idCandidate));
      if (hit) return hit;
    }
  }
  const candidates = index.byTitle.get(normalize(track.title));
  if (candidates && candidates.length > 0) {
    return tryRead(pickByArtist(candidates, normalize(track.artists[0]?.name ?? "")));
  }
  return matchByCachedId(track, index);
};
const inflight = /* @__PURE__ */ new Map();
const dedup = (key, run) => {
  const existing = inflight.get(key);
  if (existing) return existing;
  const promise = run().finally(() => {
    if (inflight.get(key) === promise) inflight.delete(key);
  });
  inflight.set(key, promise);
  return promise;
};
const resolveById = async (platform, id) => {
  try {
    switch (platform) {
      case "netease":
        return { ok: true, data: await getByPlatformId$2(id) };
      case "qqmusic":
        return { ok: true, data: await getByPlatformId$1(id) };
      case "kugou":
        return { ok: true, data: await getByPlatformId(id) };
      default:
        return { ok: false, error: `unsupported platform: ${platform}` };
    }
  } catch (err) {
    coreLog.warn(`[lyrics] matchById(${platform}, ${id}) failed:`, err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
};
const resolveByQuery = async (platform, track) => {
  try {
    switch (platform) {
      case "netease":
        return { ok: true, data: await getByQuery$2(track) };
      case "qqmusic":
        return { ok: true, data: await getByQuery$1(track) };
      case "kugou":
        return { ok: true, data: await getByQuery(track) };
      default:
        return { ok: false, error: `unsupported platform: ${platform}` };
    }
  } catch (err) {
    coreLog.warn(`[lyrics] matchByQuery(${platform}, ${track.title}) failed:`, err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
};
const resolveTTMLOverlay = async (track, platform) => {
  try {
    const ids = [];
    const push = (v) => {
      if (v && !ids.includes(v)) ids.push(v);
    };
    const fingerprint = buildFingerprint(track);
    const cached = getMatchedId(fingerprint, platform);
    if (platform === "qqmusic") push(cached?.extra?.mid);
    if (track.source === platform) push(track.id);
    if (track.source === platform) push(track.extId);
    push(cached?.platformId);
    if (ids.length === 0) return { ok: true, data: null };
    return { ok: true, data: await fetchTTML(platform, ids) };
  } catch (err) {
    coreLog.warn(`[lyrics] fetchTTMLOverlay(${platform}, ${track.title}) failed:`, err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
};
const registerLyricsIpc = () => {
  ipcMain.handle(
    "lyrics:matchById",
    (_evt, platform, id) => dedup(`byId:${platform}:${id}`, () => resolveById(platform, id))
  );
  ipcMain.handle(
    "lyrics:matchByQuery",
    (_evt, platform, track) => dedup(`byQuery:${platform}:${track.id}`, () => resolveByQuery(platform, track))
  );
  ipcMain.handle(
    "lyrics:fetchTTMLOverlay",
    (_evt, track, platform) => dedup(`ttml:${platform}:${track.id}`, () => resolveTTMLOverlay(track, platform))
  );
  ipcMain.handle(
    "lyrics:matchLocalTTML",
    async (_evt, track) => {
      try {
        return { ok: true, data: await matchLocalTTML(track) };
      } catch (err) {
        coreLog.warn(`[lyrics] matchLocalTTML(${track.title}) failed:`, err);
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
  ipcMain.handle("lyrics:pickLyricRepoDir", async () => {
    const result2 = await dialog.showOpenDialog({
      title: "选择本地 TTML 歌词库目录",
      properties: ["openDirectory"]
    });
    if (result2.canceled || result2.filePaths.length === 0) return null;
    return result2.filePaths[0];
  });
};
const normalizeAccelerator = (accel) => {
  if (!accel) return "";
  const tokens = accel.split("+").map((t2) => t2.trim()).filter(Boolean);
  const mods = { cmdOrCtrl: false, cmd: false, ctrl: false, alt: false, shift: false };
  let key = "";
  for (const t2 of tokens) {
    const lower = t2.toLowerCase();
    if (lower === "commandorcontrol" || lower === "cmdorctrl") mods.cmdOrCtrl = true;
    else if (lower === "cmd" || lower === "command" || lower === "meta" || lower === "super")
      mods.cmd = true;
    else if (lower === "ctrl" || lower === "control") mods.ctrl = true;
    else if (lower === "alt" || lower === "option") mods.alt = true;
    else if (lower === "shift") mods.shift = true;
    else key = t2;
  }
  if (!key) return "";
  if (/^[a-z]$/.test(key)) key = key.toUpperCase();
  const parts = [];
  if (mods.cmdOrCtrl) parts.push("CommandOrControl");
  if (mods.cmd) parts.push("Cmd");
  if (mods.ctrl) parts.push("Ctrl");
  if (mods.alt) parts.push("Alt");
  if (mods.shift) parts.push("Shift");
  parts.push(key);
  return parts.join("+");
};
let conflicts = [];
const readConfig = () => {
  const stored = store$1.get("hotkeys");
  if (!stored || typeof stored !== "object") {
    return { ...defaultHotkeyConfig, bindings: { ...defaultHotkeyConfig.bindings } };
  }
  return {
    globalEnabled: stored.globalEnabled ?? defaultHotkeyConfig.globalEnabled,
    bindings: { ...defaultHotkeyConfig.bindings, ...stored.bindings ?? {} }
  };
};
const writeConfig = (next) => {
  store$1.set("hotkeys", next);
  applyAll();
  return readConfig();
};
const unregisterAll = () => {
  globalShortcut.unregisterAll();
  conflicts = [];
};
const applyAll = () => {
  unregisterAll();
  const config = readConfig();
  if (!config.globalEnabled) {
    broadcast("hotkey:conflicts", conflicts);
    return;
  }
  const seenAccel = /* @__PURE__ */ new Map();
  const ids = Object.keys(config.bindings);
  for (const id of ids) {
    const accel = config.bindings[id]?.global;
    if (!accel) continue;
    const norm = normalizeAccelerator(accel);
    if (!norm) {
      conflicts.push({ id, scope: "global", reason: "invalid" });
      continue;
    }
    const occupier = seenAccel.get(norm);
    if (occupier) {
      conflicts.push({
        id,
        scope: "global",
        reason: "duplicate",
        conflictWith: occupier
      });
      continue;
    }
    try {
      const ok = globalShortcut.register(norm, () => {
        broadcast("hotkey:trigger", id);
      });
      if (ok) {
        seenAccel.set(norm, id);
      } else {
        conflicts.push({ id, scope: "global", reason: "os-occupied" });
      }
    } catch (err) {
      coreLog.warn(`[hotkey] register ${norm} failed`, err);
      conflicts.push({ id, scope: "global", reason: "invalid" });
    }
  }
  broadcast("hotkey:conflicts", conflicts);
};
const initGlobalHotkey = () => {
  applyAll();
  app.on("will-quit", cleanupGlobalHotkey);
};
const cleanupGlobalHotkey = () => {
  unregisterAll();
};
const getConflicts = () => [...conflicts];
const getHotkeyConfig = () => readConfig();
const setBinding = (id, binding) => {
  const meta = HOTKEY_ACTIONS.find((m) => m.id === id);
  if (!meta) {
    coreLog.warn(`[hotkey] setBinding: unknown action id ${id}, ignored`);
    return readConfig();
  }
  const config = readConfig();
  const norm = (s) => s ? normalizeAccelerator(s) || null : null;
  const global = meta.allowGlobal ? norm(binding.global) : null;
  config.bindings[id] = { inApp: norm(binding.inApp), global };
  return writeConfig(config);
};
const resetBindings = (id) => {
  if (id) {
    const config = readConfig();
    config.bindings[id] = { ...defaultHotkeyConfig.bindings[id] };
    return writeConfig(config);
  }
  return writeConfig({
    globalEnabled: defaultHotkeyConfig.globalEnabled,
    bindings: { ...defaultHotkeyConfig.bindings }
  });
};
const setGlobalEnabled = (enabled2) => {
  const config = readConfig();
  config.globalEnabled = enabled2;
  return writeConfig(config);
};
const probeAccelerator = (accelerator) => {
  const norm = normalizeAccelerator(accelerator);
  if (!norm) return false;
  const wasRegistered = globalShortcut.isRegistered(norm);
  if (wasRegistered) {
    globalShortcut.unregister(norm);
  }
  let ok = false;
  try {
    ok = globalShortcut.register(norm, () => {
    });
    if (ok) globalShortcut.unregister(norm);
  } catch {
    ok = false;
  }
  if (wasRegistered) {
    applyAll();
  }
  return ok;
};
const registerHotkeyIpc = () => {
  ipcMain.handle("hotkey:getAll", () => getHotkeyConfig());
  ipcMain.handle(
    "hotkey:set",
    (_event, id, binding) => setBinding(id, binding)
  );
  ipcMain.handle("hotkey:reset", (_event, id) => resetBindings(id));
  ipcMain.handle(
    "hotkey:setGlobalEnabled",
    (_event, enabled2) => setGlobalEnabled(enabled2)
  );
  ipcMain.handle("hotkey:probe", (_event, accel) => probeAccelerator(accel));
  ipcMain.handle("hotkey:getConflicts", () => getConflicts());
};
const allowedExt = /* @__PURE__ */ new Set([".jpg", ".jpeg", ".png", ".webp", ".bmp", ".gif"]);
const MAX_BG_SIZE = 30 * 1024 * 1024;
const registerThemeIpc = () => {
  ipcMain.handle("theme:pickBackgroundImage", async () => {
    try {
      const result2 = await dialog.showOpenDialog({
        title: "选择背景图片",
        properties: ["openFile"],
        filters: [{ name: "Images", extensions: ["jpg", "jpeg", "png", "webp", "bmp", "gif"] }]
      });
      if (result2.canceled) return null;
      const src = result2.filePaths[0];
      if (!src) return null;
      const ext = path.extname(src).toLowerCase();
      if (!allowedExt.has(ext)) return null;
      const stat2 = await fsp.stat(src);
      if (stat2.size > MAX_BG_SIZE) {
        systemLog.warn(
          `[theme] background image too large: ${stat2.size} bytes (max ${MAX_BG_SIZE})`
        );
        return null;
      }
      const data2 = await fsp.readFile(src);
      const hash2 = createHash("sha1").update(data2).digest("hex").slice(0, 16);
      await fsp.rm(getBackgroundsDir(), { recursive: true, force: true });
      await fsp.mkdir(getBackgroundsDir(), { recursive: true });
      const dest = path.join(getBackgroundsDir(), `${hash2}${ext}`);
      await fsp.writeFile(dest, data2);
      return toCacheUrl(dest) ?? null;
    } catch (err) {
      systemLog.error("[theme] pickBackgroundImage failed", err);
      return null;
    }
  });
  ipcMain.handle("theme:clearBackgroundImages", async () => {
    try {
      await fsp.rm(getBackgroundsDir(), { recursive: true, force: true });
    } catch (err) {
      systemLog.error("[theme] clearBackgroundImages failed", err);
    }
  });
};
const upsertTracks = (records) => {
  if (records.length === 0) return;
  const statement = getDb().prepare(`
    INSERT INTO remote_tracks
      (server_id, remote_id, data, title, search_text, generation, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(server_id, remote_id) DO UPDATE SET
      data = excluded.data,
      title = excluded.title,
      search_text = excluded.search_text,
      generation = excluded.generation,
      updated_at = excluded.updated_at
  `);
  const now = Date.now();
  getDb().transaction(() => {
    for (const record of records) {
      const searchText = [
        record.track.title,
        record.track.album?.name,
        ...record.track.artists.map((artist2) => artist2.name)
      ].filter(Boolean).join("\n");
      statement.run(
        record.serverId,
        record.remoteId,
        JSON.stringify(record.track),
        record.track.title,
        searchText,
        record.generation,
        now
      );
    }
  })();
};
const getTracks = (serverId) => {
  const rows = getDb().prepare(
    "SELECT data FROM remote_tracks WHERE server_id = ? ORDER BY title COLLATE NOCASE, remote_id"
  ).all(serverId);
  return rows.map((row) => JSON.parse(row.data));
};
const searchTracks = (serverId, query) => {
  const escaped = query.trim().replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
  if (!escaped) return [];
  const rows = getDb().prepare(
    `SELECT data FROM remote_tracks
       WHERE server_id = ? AND search_text LIKE ? ESCAPE '\\'
       ORDER BY title COLLATE NOCASE, remote_id`
  ).all(serverId, `%${escaped}%`);
  return rows.map((row) => JSON.parse(row.data));
};
const deleteStaleTracks = (serverId, generation) => {
  getDb().prepare("DELETE FROM remote_tracks WHERE server_id = ? AND generation <> ?").run(serverId, generation);
};
const deleteTracksByServer = (serverId) => {
  getDb().prepare("DELETE FROM remote_tracks WHERE server_id = ?").run(serverId);
};
const upsertAlbums = (records) => {
  if (records.length === 0) return;
  const statement = getDb().prepare(`
    INSERT INTO remote_albums (server_id, remote_id, data, name, generation, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(server_id, remote_id) DO UPDATE SET
      data = excluded.data,
      name = excluded.name,
      generation = excluded.generation,
      updated_at = excluded.updated_at
  `);
  const now = Date.now();
  getDb().transaction(() => {
    for (const record of records) {
      statement.run(
        record.serverId,
        record.remoteId,
        JSON.stringify(record.album),
        record.album.name,
        record.generation,
        now
      );
    }
  })();
};
const getAlbums = (serverId) => {
  const rows = getDb().prepare(
    "SELECT data FROM remote_albums WHERE server_id = ? ORDER BY name COLLATE NOCASE, remote_id"
  ).all(serverId);
  return rows.map((row) => JSON.parse(row.data));
};
const deleteStaleAlbums = (serverId, generation) => {
  getDb().prepare("DELETE FROM remote_albums WHERE server_id = ? AND generation <> ?").run(serverId, generation);
};
const deleteAlbumsByServer = (serverId) => {
  getDb().prepare("DELETE FROM remote_albums WHERE server_id = ?").run(serverId);
};
const upsertArtists = (records) => {
  if (records.length === 0) return;
  const statement = getDb().prepare(`
    INSERT INTO remote_artists (server_id, remote_id, data, name, generation, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(server_id, remote_id) DO UPDATE SET
      data = excluded.data,
      name = excluded.name,
      generation = excluded.generation,
      updated_at = excluded.updated_at
  `);
  const now = Date.now();
  getDb().transaction(() => {
    for (const record of records) {
      statement.run(
        record.serverId,
        record.remoteId,
        JSON.stringify(record.artist),
        record.artist.name,
        record.generation,
        now
      );
    }
  })();
};
const getArtists = (serverId) => {
  const rows = getDb().prepare(
    "SELECT data FROM remote_artists WHERE server_id = ? ORDER BY name COLLATE NOCASE, remote_id"
  ).all(serverId);
  return rows.map((row) => JSON.parse(row.data));
};
const deleteStaleArtists = (serverId, generation) => {
  getDb().prepare("DELETE FROM remote_artists WHERE server_id = ? AND generation <> ?").run(serverId, generation);
};
const deleteArtistsByServer = (serverId) => {
  getDb().prepare("DELETE FROM remote_artists WHERE server_id = ?").run(serverId);
};
const upsertPlaylists = (records) => {
  if (records.length === 0) return;
  const statement = getDb().prepare(`
    INSERT INTO remote_playlists (server_id, remote_id, data, name, generation, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(server_id, remote_id) DO UPDATE SET
      data = excluded.data,
      name = excluded.name,
      generation = excluded.generation,
      updated_at = excluded.updated_at
  `);
  const now = Date.now();
  getDb().transaction(() => {
    for (const record of records) {
      statement.run(
        record.serverId,
        record.remoteId,
        JSON.stringify(record.playlist),
        record.playlist.name,
        record.generation,
        now
      );
    }
  })();
};
const getPlaylists$1 = (serverId) => {
  const rows = getDb().prepare(
    "SELECT data FROM remote_playlists WHERE server_id = ? ORDER BY name COLLATE NOCASE, remote_id"
  ).all(serverId);
  return rows.map((row) => JSON.parse(row.data));
};
const deleteStalePlaylists = (serverId, generation) => {
  getDb().prepare("DELETE FROM remote_playlists WHERE server_id = ? AND generation <> ?").run(serverId, generation);
};
const deletePlaylistsByServer = (serverId) => {
  getDb().prepare("DELETE FROM remote_playlists WHERE server_id = ?").run(serverId);
};
const deleteLibraryByServer = (serverId) => {
  deletePlaylistsByServer(serverId);
  deleteTracksByServer(serverId);
  deleteAlbumsByServer(serverId);
  deleteArtistsByServer(serverId);
};
const getLibrarySnapshot = (serverId) => ({
  songs: getTracks(serverId),
  albums: getAlbums(serverId),
  artists: getArtists(serverId),
  playlists: getPlaylists$1(serverId)
});
const searchLibrary = (serverId, query) => {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return { songs: [], albums: [], artists: [] };
  return {
    songs: searchTracks(serverId, query),
    albums: getAlbums(serverId).filter(
      (album2) => album2.name.toLocaleLowerCase().includes(needle) || album2.artist?.toLocaleLowerCase().includes(needle)
    ),
    artists: getArtists(serverId).filter(
      (artist2) => artist2.name.toLocaleLowerCase().includes(needle)
    )
  };
};
const STORAGE_FILE$1 = path.join(configDir, "streaming.json");
let state;
const getState = () => {
  if (state) return state;
  try {
    const parsed = JSON.parse(fs.readFileSync(STORAGE_FILE$1, "utf-8"));
    state = Array.isArray(parsed?.servers) ? { servers: parsed.servers, activeServerId: parsed.activeServerId ?? null } : { servers: [], activeServerId: null };
  } catch {
    state = { servers: [], activeServerId: null };
  }
  return state;
};
const save = () => {
  const dir = path.dirname(STORAGE_FILE$1);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  writeFileSync(STORAGE_FILE$1, JSON.stringify(getState(), null, 2));
};
const encryptPassword = (password) => {
  if (!password) return "";
  if (!safeStorage.isEncryptionAvailable()) {
    streamingLog.warn("系统安全存储不可用，流媒体密码将以 base64 形式保存");
    return Buffer.from(password, "utf-8").toString("base64");
  }
  return safeStorage.encryptString(password).toString("base64");
};
const decryptPassword = (encrypted) => {
  if (!encrypted) return "";
  const buffer = Buffer.from(encrypted, "base64");
  return safeStorage.isEncryptionAvailable() ? safeStorage.decryptString(buffer) : buffer.toString("utf-8");
};
const toServerConfig = (server) => ({
  id: server.id,
  name: server.name,
  type: server.type,
  url: server.url,
  username: server.username,
  hasPassword: Boolean(server.encryptedPassword),
  lastConnected: server.lastConnected
});
const toRuntimeConfig = (server) => ({
  ...toServerConfig(server),
  password: decryptPassword(server.encryptedPassword)
});
const getStreamingConfig = () => ({
  servers: getState().servers.map(toServerConfig),
  activeServerId: getState().activeServerId
});
const getStreamingServer = (serverId) => {
  const server = getState().servers.find((item) => item.id === serverId);
  if (!server) throw new Error("找不到流媒体服务器");
  return toRuntimeConfig(server);
};
const addStreamingServer = (input) => {
  const server = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    type: input.type,
    url: input.url.trim().replace(/\/+$/, ""),
    username: input.username,
    encryptedPassword: encryptPassword(input.password)
  };
  getState().servers.push(server);
  save();
  return toServerConfig(server);
};
const updateStreamingServer = (serverId, input) => {
  const server = getState().servers.find((item) => item.id === serverId);
  if (!server) throw new Error("找不到流媒体服务器");
  server.name = input.name.trim();
  server.type = input.type;
  server.url = input.url.trim().replace(/\/+$/, "");
  server.username = input.username;
  if (input.password) server.encryptedPassword = encryptPassword(input.password);
  server.lastConnected = void 0;
  save();
  return toServerConfig(server);
};
const removeStreamingServer = (serverId) => {
  const current2 = getState();
  current2.servers = current2.servers.filter((server) => server.id !== serverId);
  if (current2.activeServerId === serverId) current2.activeServerId = null;
  save();
};
const setActiveStreamingServer = (serverId) => {
  const current2 = getState();
  if (serverId && !current2.servers.some((server) => server.id === serverId)) {
    throw new Error("找不到流媒体服务器");
  }
  current2.activeServerId = serverId;
  save();
};
const markStreamingServerConnected = (serverId) => {
  const server = getState().servers.find((item) => item.id === serverId);
  if (!server) throw new Error("找不到流媒体服务器");
  server.lastConnected = Date.now();
  save();
  return toServerConfig(server);
};
const createTestStreamingServer = (input, serverId) => {
  const saved = serverId ? getState().servers.find((server) => server.id === serverId) : void 0;
  const password = input.password || (saved ? decryptPassword(saved.encryptedPassword) : "");
  const base = {
    id: `__test__:${crypto.randomUUID()}`,
    name: input.name.trim(),
    url: input.url.trim().replace(/\/+$/, ""),
    username: input.username,
    password,
    hasPassword: Boolean(password)
  };
  return {
    ...base,
    type: input.type
  };
};
const CLIENT_NAME$1 = "SPlayer-Next";
const CLIENT_VERSION = "1.0.0";
const DEVICE_NAME = "SPlayer Desktop";
const REQUEST_TIMEOUT_MS$1 = 15e3;
const deviceId = (config) => `splayer-next-${config.id}`;
const callApi$1 = async (config, apiPath, init2) => {
  const parts = [
    `Client="${CLIENT_NAME$1}"`,
    `Device="${DEVICE_NAME}"`,
    `DeviceId="${deviceId(config)}"`,
    `Version="${CLIENT_VERSION}"`
  ];
  if (config.accessToken) parts.push(`Token="${config.accessToken}"`);
  const authHeader = config.type === "emby" ? "X-Emby-Authorization" : "Authorization";
  const response = await fetch(`${config.url.replace(/\/+$/, "")}/${apiPath.replace(/^\//, "")}`, {
    ...init2,
    headers: {
      "Content-Type": "application/json",
      [authHeader]: `MediaBrowser ${parts.join(", ")}`,
      ...init2?.headers ?? {}
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS$1)
  });
  if (!response.ok) {
    const detail = (await response.text()).trim().slice(0, 500);
    throw new Error(`${apiPath}: HTTP ${response.status}${detail ? ` - ${detail}` : ""}`);
  }
  if (response.status === 204) return null;
  return await response.json();
};
const requireUserId = (config) => {
  if (!config.accessToken || !config.userId) throw new Error("缺少 accessToken / userId");
  return config.userId;
};
const fetchUserItems = async (config, query) => {
  const userId = requireUserId(config);
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) params.set(key, String(value));
  const result2 = await callApi$1(
    config,
    `Users/${userId}/Items?${params.toString()}`
  );
  return result2.Items ?? [];
};
const imageUrl = (config, itemId, tag, maxHeight) => {
  const params = new URLSearchParams({
    serverId: config.id,
    coverId: itemId,
    size: String(maxHeight)
  });
  if (tag) params.set("tag", tag);
  return `streaming-cover://image?${params.toString()}`;
};
const toTrack$1 = (config, item) => {
  const mediaSource = item.MediaSources?.[0];
  const audioStream = mediaSource?.MediaStreams?.find((stream) => stream.Type === "Audio");
  const imageTag = item.ImageTags?.Primary;
  return {
    id: `${config.id}:${item.Id}`,
    source: "streaming",
    serverId: config.id,
    originalId: item.Id,
    title: item.Name ?? "",
    artists: item.ArtistItems?.map((artist2) => ({ id: artist2.Id, name: artist2.Name })) ?? item.Artists?.map((name) => ({ name })) ?? [],
    album: item.Album ? { id: item.AlbumId, name: item.Album } : void 0,
    duration: item.RunTimeTicks ? Math.floor(item.RunTimeTicks / 1e4) : 0,
    cover: imageTag ? imageUrl(config, item.Id, imageTag, 300) : void 0,
    coverOriginal: imageTag ? imageUrl(config, item.Id, imageTag, 1500) : void 0,
    fileSize: mediaSource?.Size,
    quality: {
      sampleRate: audioStream?.SampleRate ?? 0,
      channels: audioStream?.Channels ?? 2,
      bitsPerSample: audioStream?.BitDepth ?? 0,
      bitRate: mediaSource?.Bitrate ?? 0,
      codec: audioStream?.Codec ?? mediaSource?.Container ?? ""
    }
  };
};
const toAlbum$1 = (config, item) => ({
  id: item.Id,
  name: item.Name ?? "",
  artist: item.AlbumArtist,
  cover: imageUrl(config, item.Id, item.ImageTags?.Primary, 300),
  trackCount: item.ChildCount,
  year: item.ProductionYear
});
const toArtist$1 = (config, item) => ({
  id: item.Id,
  name: item.Name ?? "",
  avatar: imageUrl(config, item.Id, item.ImageTags?.Primary, 300),
  albumCount: item.ChildCount
});
const toPlaylist$1 = (config, item) => ({
  id: item.Id,
  name: item.Name ?? "",
  cover: imageUrl(config, item.Id, item.ImageTags?.Primary, 300),
  trackCount: item.ChildCount
});
const authenticate = async (config) => {
  const result2 = await callApi$1(
    { ...config, accessToken: void 0 },
    "Users/AuthenticateByName",
    {
      method: "POST",
      body: JSON.stringify({ Username: config.username, Pw: config.password })
    }
  );
  if (!result2.AccessToken || !result2.User?.Id) {
    throw new Error("登录响应缺少 AccessToken/UserId");
  }
  return { accessToken: result2.AccessToken, userId: result2.User.Id };
};
const jellyfinAdapter = {
  /**
   * 检查 Jellyfin/Emby 连通性
   * @param config - 已鉴权的主进程服务器配置
   * @returns 连通性结果
   */
  async ping(config) {
    try {
      const result2 = await callApi$1(config, "System/Info/Public");
      return { ok: true, version: result2.Version };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : String(error) };
    }
  },
  /**
   * 分页读取 Jellyfin/Emby 歌曲
   * @param config - 已鉴权的主进程服务器配置
   * @param params - 分页参数
   * @returns 歌曲列表
   */
  async listSongs(config, params) {
    const items = await fetchUserItems(config, {
      IncludeItemTypes: "Audio",
      Recursive: "true",
      SortBy: "DateCreated,SortName",
      SortOrder: "Descending",
      Fields: "MediaSources",
      Limit: params?.limit ?? 100,
      StartIndex: params?.offset ?? 0
    });
    return items.map((item) => toTrack$1(config, item));
  },
  /**
   * 分页读取 Jellyfin/Emby 专辑
   * @param config - 已鉴权的主进程服务器配置
   * @param params - 分页参数
   * @returns 专辑列表
   */
  async listAlbums(config, params) {
    const items = await fetchUserItems(config, {
      IncludeItemTypes: "MusicAlbum",
      Recursive: "true",
      SortBy: "SortName",
      SortOrder: "Ascending",
      Limit: params?.limit ?? 500,
      StartIndex: params?.offset ?? 0
    });
    return items.map((item) => toAlbum$1(config, item));
  },
  /**
   * 读取 Jellyfin/Emby 歌手
   * @param config - 已鉴权的主进程服务器配置
   * @returns 歌手列表
   */
  async listArtists(config) {
    const userId = requireUserId(config);
    const result2 = await callApi$1(
      config,
      `Artists?userId=${userId}&Recursive=true&SortBy=Name&SortOrder=Ascending`
    );
    return (result2.Items ?? []).map((item) => toArtist$1(config, item));
  },
  /**
   * 读取 Jellyfin/Emby 歌单
   * @param config - 已鉴权的主进程服务器配置
   * @returns 歌单列表
   */
  async listPlaylists(config) {
    const items = await fetchUserItems(config, {
      IncludeItemTypes: "Playlist",
      Recursive: "true",
      SortBy: "SortName"
    });
    return items.map((item) => toPlaylist$1(config, item));
  },
  /**
   * 读取 Jellyfin/Emby 专辑歌曲
   * @param config - 已鉴权的主进程服务器配置
   * @param albumId - 服务端专辑 ID
   * @returns 专辑歌曲
   */
  async getAlbumSongs(config, albumId) {
    const items = await fetchUserItems(config, {
      ParentId: albumId,
      IncludeItemTypes: "Audio",
      Fields: "MediaSources",
      SortBy: "ParentIndexNumber,IndexNumber,SortName"
    });
    return items.map((item) => toTrack$1(config, item));
  },
  /**
   * 读取 Jellyfin/Emby 歌单歌曲
   * @param config - 已鉴权的主进程服务器配置
   * @param playlistId - 服务端歌单 ID
   * @returns 歌单歌曲
   */
  async getPlaylistSongs(config, playlistId) {
    const userId = requireUserId(config);
    const params = new URLSearchParams({ UserId: userId, Fields: "MediaSources" });
    const result2 = await callApi$1(
      config,
      `Playlists/${playlistId}/Items?${params.toString()}`
    );
    return (result2.Items ?? []).map((item) => toTrack$1(config, item));
  },
  /**
   * 读取 Jellyfin/Emby 歌手专辑
   * @param config - 已鉴权的主进程服务器配置
   * @param artistId - 服务端歌手 ID
   * @returns 歌手专辑
   */
  async getArtistAlbums(config, artistId) {
    const items = await fetchUserItems(config, {
      AlbumArtistIds: artistId,
      IncludeItemTypes: "MusicAlbum",
      Recursive: "true",
      SortBy: "ProductionYear,SortName",
      SortOrder: "Descending"
    });
    return items.map((item) => toAlbum$1(config, item));
  },
  /**
   * 读取 Jellyfin/Emby 歌手歌曲
   * @param config - 已鉴权的主进程服务器配置
   * @param artistId - 服务端歌手 ID
   * @returns 歌手歌曲
   */
  async getArtistSongs(config, artistId) {
    const items = await fetchUserItems(config, {
      ArtistIds: artistId,
      IncludeItemTypes: "Audio",
      Recursive: "true",
      Fields: "MediaSources",
      SortBy: "Album,ParentIndexNumber,IndexNumber,SortName"
    });
    return items.map((item) => toTrack$1(config, item));
  },
  /**
   * 生成 Jellyfin/Emby 播放地址
   * @param config - 已鉴权的主进程服务器配置
   * @param trackId - 服务端歌曲 ID
   * @param playSessionId - 播放会话 ID
   * @returns 播放地址
   */
  async getStreamUrl(config, trackId, playSessionId) {
    const userId = requireUserId(config);
    const params = new URLSearchParams({
      UserId: userId,
      DeviceId: deviceId(config),
      PlaySessionId: playSessionId ?? crypto.randomUUID(),
      api_key: config.accessToken,
      StartTimeTicks: "0",
      Static: "true"
    });
    if (config.type === "emby") {
      params.set("EnableRedirection", "true");
      params.set("EnableRemoteMedia", "true");
      return `${config.url.replace(/\/+$/, "")}/Audio/${trackId}/universal?${params.toString()}`;
    }
    return `${config.url.replace(/\/+$/, "")}/Audio/${trackId}/stream?${params.toString()}`;
  },
  /**
   * 读取 Jellyfin/Emby 歌词
   * @param config - 已鉴权的主进程服务器配置
   * @param trackId - 服务端歌曲 ID
   * @returns 原始歌词文本
   */
  async getLyrics(config, trackId) {
    try {
      const result2 = await callApi$1(config, `Audio/${trackId}/Lyrics`);
      const lines = result2.Lyrics ?? [];
      if (lines.length === 0) return null;
      const synced = result2.Metadata?.IsSynced ?? lines.some((line) => (line.Start ?? 0) > 0);
      if (!synced) {
        const text = lines.map((line) => line.Text ?? "").filter(Boolean).join("\n");
        return text || null;
      }
      return lines.map((line) => {
        const milliseconds = Math.floor((line.Start ?? 0) / 1e4);
        const minutes = Math.floor(milliseconds / 6e4);
        const seconds = Math.floor(milliseconds % 6e4 / 1e3);
        const centiseconds = Math.floor(milliseconds % 1e3 / 10);
        return `[${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}]${line.Text ?? ""}`;
      }).join("\n");
    } catch {
      return null;
    }
  },
  /**
   * 生成 Jellyfin/Emby 真实封面地址
   * @param config - 已鉴权的主进程服务器配置
   * @param coverId - 服务端媒体 ID
   * @param size - 目标尺寸
   * @returns 真实封面地址
   */
  async getCoverUrl(config, coverId, size) {
    const params = new URLSearchParams({ api_key: config.accessToken, maxHeight: String(size) });
    return `${config.url.replace(/\/+$/, "")}/Items/${coverId}/Images/Primary?${params.toString()}`;
  }
};
const API_VERSION = "1.16.1";
const CLIENT_NAME = "SPlayer-Next";
const REQUEST_TIMEOUT_MS = 15e3;
const buildAuth = (config) => {
  const salt = randomBytes(6).toString("hex");
  return new URLSearchParams({
    u: config.username,
    t: createHash("md5").update(config.password + salt).digest("hex"),
    s: salt,
    v: API_VERSION,
    c: CLIENT_NAME,
    f: "json"
  });
};
const buildUrl = (config, endpoint, extra = {}) => {
  const params = buildAuth(config);
  for (const [key, value] of Object.entries(extra)) params.set(key, String(value));
  return `${config.url.replace(/\/+$/, "")}/rest/${endpoint}?${params.toString()}`;
};
const callApi = async (config, endpoint, extra) => {
  const response = await fetch(buildUrl(config, endpoint, extra), {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
  });
  if (!response.ok) throw new Error(`${endpoint}: HTTP ${response.status}`);
  const body = await response.json();
  const result2 = body["subsonic-response"];
  if (!result2) throw new Error("响应缺少 subsonic-response 包装");
  if (result2.status !== "ok") {
    const error = result2.error;
    throw new Error(error?.message ?? `Subsonic error code ${error?.code}`);
  }
  return result2;
};
const coverUrl = (config, coverId, size) => {
  if (!coverId) return void 0;
  const params = new URLSearchParams({ serverId: config.id, coverId, size: String(size) });
  return `streaming-cover://image?${params.toString()}`;
};
const toTrack = (config, song) => {
  const artists2 = song.artists?.length ? song.artists.map((artist2) => ({ id: artist2.id, name: artist2.name })) : (song.displayArtist ?? song.artist ?? "").trim() ? [{ id: song.artistId, name: (song.displayArtist ?? song.artist ?? "").trim() }] : [];
  return {
    id: `${config.id}:${song.id}`,
    source: "streaming",
    serverId: config.id,
    originalId: song.id,
    title: song.title || "",
    artists: artists2,
    album: song.album ? { id: song.albumId, name: song.album } : void 0,
    duration: Math.round((song.duration ?? 0) * 1e3),
    cover: coverUrl(config, song.coverArt, 300),
    coverOriginal: coverUrl(config, song.coverArt, 1500),
    fileSize: song.size,
    quality: {
      sampleRate: song.samplingRate ?? 0,
      channels: song.channelCount ?? 2,
      bitsPerSample: song.bitDepth ?? 0,
      bitRate: song.bitRate ? song.bitRate * 1e3 : 0,
      codec: song.suffix ?? ""
    }
  };
};
const toAlbum = (config, album2) => ({
  id: album2.id,
  name: album2.name,
  artist: album2.displayArtist ?? album2.artist,
  cover: coverUrl(config, album2.coverArt, 300),
  trackCount: album2.songCount,
  year: album2.year
});
const toArtist = (config, artist2) => ({
  id: artist2.id,
  name: artist2.name,
  avatar: coverUrl(config, artist2.coverArt, 300),
  albumCount: artist2.albumCount
});
const toPlaylist = (config, playlist2) => ({
  id: playlist2.id,
  name: playlist2.name,
  description: playlist2.comment,
  cover: coverUrl(config, playlist2.coverArt, 300),
  trackCount: playlist2.songCount,
  owner: playlist2.owner
});
const subsonicAdapter = {
  /**
   * 检查 Subsonic 连通性
   * @param config - 主进程服务器配置
   * @returns 连通性结果
   */
  async ping(config) {
    try {
      const result2 = await callApi(config, "ping");
      return { ok: true, version: result2.serverVersion ?? result2.version };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : String(error) };
    }
  },
  /**
   * 分页读取 Subsonic 歌曲
   * @param config - 主进程服务器配置
   * @param params - 分页参数
   * @returns 歌曲列表
   */
  async listSongs(config, params) {
    const result2 = await callApi(config, "search3", {
      query: "",
      songCount: params?.limit ?? 100,
      songOffset: params?.offset ?? 0,
      artistCount: 0,
      albumCount: 0
    });
    return (result2.searchResult3?.song ?? []).map((song) => toTrack(config, song));
  },
  /**
   * 分页读取 Subsonic 专辑
   * @param config - 主进程服务器配置
   * @param params - 分页参数
   * @returns 专辑列表
   */
  async listAlbums(config, params) {
    const result2 = await callApi(
      config,
      "getAlbumList2",
      {
        type: "alphabeticalByName",
        size: params?.limit ?? 500,
        offset: params?.offset ?? 0
      }
    );
    return (result2.albumList2?.album ?? []).map((album2) => toAlbum(config, album2));
  },
  /**
   * 读取 Subsonic 歌手
   * @param config - 主进程服务器配置
   * @returns 歌手列表
   */
  async listArtists(config) {
    const result2 = await callApi(config, "getArtists");
    return (result2.artists?.index ?? []).flatMap(
      (index) => (index.artist ?? []).map((artist2) => toArtist(config, artist2))
    );
  },
  /**
   * 读取 Subsonic 歌单
   * @param config - 主进程服务器配置
   * @returns 歌单列表
   */
  async listPlaylists(config) {
    const result2 = await callApi(
      config,
      "getPlaylists"
    );
    return (result2.playlists?.playlist ?? []).map((playlist2) => toPlaylist(config, playlist2));
  },
  /**
   * 读取 Subsonic 专辑歌曲
   * @param config - 主进程服务器配置
   * @param albumId - 服务端专辑 ID
   * @returns 专辑歌曲
   */
  async getAlbumSongs(config, albumId) {
    const result2 = await callApi(config, "getAlbum", { id: albumId });
    return (result2.album?.song ?? []).map((song) => toTrack(config, song));
  },
  /**
   * 读取 Subsonic 歌单歌曲
   * @param config - 主进程服务器配置
   * @param playlistId - 服务端歌单 ID
   * @returns 歌单歌曲
   */
  async getPlaylistSongs(config, playlistId) {
    const result2 = await callApi(config, "getPlaylist", {
      id: playlistId
    });
    return (result2.playlist?.entry ?? []).map((song) => toTrack(config, song));
  },
  /**
   * 读取 Subsonic 歌手专辑
   * @param config - 主进程服务器配置
   * @param artistId - 服务端歌手 ID
   * @returns 歌手专辑
   */
  async getArtistAlbums(config, artistId) {
    const result2 = await callApi(config, "getArtist", {
      id: artistId
    });
    return (result2.artist?.album ?? []).map((album2) => toAlbum(config, album2));
  },
  /**
   * 逐张专辑读取 Subsonic 歌手歌曲
   * @param config - 主进程服务器配置
   * @param artistId - 服务端歌手 ID
   * @returns 歌手歌曲
   */
  async getArtistSongs(config, artistId) {
    const result2 = await callApi(config, "getArtist", {
      id: artistId
    });
    const tracks = [];
    for (const album2 of result2.artist?.album ?? []) {
      try {
        const albumResult = await callApi(config, "getAlbum", {
          id: album2.id
        });
        tracks.push(...(albumResult.album?.song ?? []).map((song) => toTrack(config, song)));
      } catch {
      }
    }
    return tracks;
  },
  /**
   * 生成 Subsonic 播放地址
   * @param config - 主进程服务器配置
   * @param trackId - 服务端歌曲 ID
   * @returns 播放地址
   */
  async getStreamUrl(config, trackId) {
    return buildUrl(config, "stream", {
      id: trackId,
      estimateContentLength: "true",
      format: "raw",
      maxBitRate: 0
    });
  },
  /**
   * 读取 Subsonic 歌词
   * @param config - 主进程服务器配置
   * @param trackId - 服务端歌曲 ID
   * @param hint - 旧歌词端点使用的歌曲信息
   * @returns 原始歌词文本
   */
  async getLyrics(config, trackId, hint) {
    try {
      const result2 = await callApi(config, "getLyricsBySongId", { id: trackId });
      const lines = result2.lyricsList?.structuredLyrics?.[0]?.line ?? [];
      if (lines.length > 0) {
        return lines.map((line) => {
          const milliseconds = line.start ?? 0;
          const minutes = Math.floor(milliseconds / 6e4);
          const seconds = Math.floor(milliseconds % 6e4 / 1e3);
          const centiseconds = Math.floor(milliseconds % 1e3 / 10);
          return `[${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}]${line.value ?? ""}`;
        }).join("\n");
      }
    } catch {
    }
    if (!hint?.artist && !hint?.title) return null;
    try {
      const result2 = await callApi(config, "getLyrics", {
        artist: hint.artist ?? "",
        title: hint.title ?? ""
      });
      return result2.lyrics?.value?.trim() ? result2.lyrics.value : null;
    } catch {
      return null;
    }
  },
  /**
   * 生成 Subsonic 真实封面地址
   * @param config - 主进程服务器配置
   * @param coverId - 服务端封面 ID
   * @param size - 目标尺寸
   * @returns 真实封面地址
   */
  async getCoverUrl(config, coverId, size) {
    return buildUrl(config, "getCoverArt", { id: coverId, size });
  }
};
const SUBSONIC_TYPES = /* @__PURE__ */ new Set([
  "subsonic",
  "navidrome",
  "opensubsonic",
  "airsonic",
  "gonic",
  "lms"
]);
const MAX_SESSION_COUNT = 16;
const sessionCache = /* @__PURE__ */ new Map();
const pendingLogins = /* @__PURE__ */ new Map();
const invalidateStreamingSession = (serverId) => {
  sessionCache.delete(serverId);
  pendingLogins.delete(serverId);
};
const cacheSession = (serverId, session2) => {
  sessionCache.delete(serverId);
  sessionCache.set(serverId, session2);
  while (sessionCache.size > MAX_SESSION_COUNT) {
    const oldestServerId = sessionCache.keys().next().value;
    sessionCache.delete(oldestServerId);
  }
};
const getSession = async (config) => {
  const cached = sessionCache.get(config.id);
  if (cached) {
    sessionCache.delete(config.id);
    sessionCache.set(config.id, cached);
    return cached;
  }
  const pending2 = pendingLogins.get(config.id);
  if (pending2) return pending2;
  const promise = authenticate(config).then((session2) => {
    if (pendingLogins.get(config.id) === promise) cacheSession(config.id, session2);
    return session2;
  });
  pendingLogins.set(config.id, promise);
  try {
    return await promise;
  } finally {
    if (pendingLogins.get(config.id) === promise) pendingLogins.delete(config.id);
  }
};
const resolveStreamingAdapter = async (config) => {
  if (SUBSONIC_TYPES.has(config.type)) return { config, adapter: subsonicAdapter };
  if (config.type === "jellyfin" || config.type === "emby") {
    const session2 = await getSession(config);
    return { config: { ...config, ...session2 }, adapter: jellyfinAdapter };
  }
  throw new Error(`不支持的服务器类型: ${config.type}`);
};
const classifyError = (error) => {
  const message = error instanceof Error ? error.message : String(error);
  if (/HTTP 401|HTTP 403|auth|token|password|credential/i.test(message)) return "auth";
  if (/fetch|network|timeout|ECONN|ENOTFOUND/i.test(message)) return "network";
  if (/HTTP|响应|protocol/i.test(message)) return "protocol";
  return "unknown";
};
const withStreamingAdapter = async (serverId, request2) => {
  const config = getStreamingServer(serverId);
  const resolved = await resolveStreamingAdapter(config);
  try {
    return await request2(resolved.config, resolved.adapter);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (config.type !== "jellyfin" && config.type !== "emby" || !/HTTP 401|HTTP 403/.test(message)) {
      throw error;
    }
    invalidateStreamingSession(serverId);
    const retried = await resolveStreamingAdapter(config);
    return request2(retried.config, retried.adapter);
  }
};
const testStreamingConnection = async (input, serverId) => {
  const config = createTestStreamingServer(input, serverId);
  try {
    const resolved = await resolveStreamingAdapter(config);
    const result2 = await resolved.adapter.ping(resolved.config);
    if (result2.ok) return result2;
    const code = result2.code ?? classifyError(result2.error);
    streamingLog.warn(`${input.type} 测试连接失败 [${input.name}]: ${result2.error}`);
    return { ...result2, code };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    streamingLog.warn(`${input.type} 测试连接失败 [${input.name}]: ${message}`);
    return { ok: false, error: message, code: classifyError(error) };
  } finally {
    invalidateStreamingSession(config.id);
  }
};
const connectStreamingServer = async (serverId) => {
  let config;
  try {
    config = getStreamingServer(serverId);
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
      code: "unknown"
    };
  }
  try {
    const resolved = await resolveStreamingAdapter(config);
    const ping = await resolved.adapter.ping(resolved.config);
    if (!ping.ok) {
      streamingLog.warn(`${config.type} 连接失败 [${config.name}]: ${ping.error}`);
      return {
        ok: false,
        error: ping.error ?? "连接失败",
        code: ping.code ?? classifyError(ping.error)
      };
    }
    const server = markStreamingServerConnected(serverId);
    streamingLog.info(`${config.type} 连接成功 [${config.name}]`);
    return { ok: true, server };
  } catch (error) {
    streamingLog.warn(`${config.type} 连接失败 [${config.name}]:`, error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
      code: classifyError(error)
    };
  }
};
const SCHEME = "streaming-cover";
const handleCover = async (request2) => {
  try {
    const url = new URL(request2.url);
    const serverId = url.searchParams.get("serverId");
    const coverId = url.searchParams.get("coverId");
    const size = Math.min(2e3, Math.max(32, Number(url.searchParams.get("size")) || 300));
    if (!serverId || !coverId) return new Response(null, { status: 400 });
    const response = await withStreamingAdapter(serverId, async (config, adapter) => {
      const coverUrl2 = await adapter.getCoverUrl(config, coverId, size);
      const result2 = await net.fetch(coverUrl2);
      if (result2.status === 401 || result2.status === 403) {
        throw new Error(`HTTP ${result2.status}`);
      }
      return result2;
    });
    if (response.status === 404) {
      return new Response(null, { status: 204 });
    }
    if (!response.ok) {
      streamingLog.warn(`流媒体封面请求失败: HTTP ${response.status}`);
      return new Response(null, { status: 502 });
    }
    return response;
  } catch (error) {
    streamingLog.warn("流媒体封面加载失败:", error);
    return new Response(null, { status: 502 });
  }
};
const registerStreamingCoverProtocol = () => {
  protocol.handle(SCHEME, handleCover);
  session$2.fromPartition(MAIN_PARTITION).protocol.handle(SCHEME, handleCover);
};
const FIRST_SONG_BATCH_SIZE = 100;
const SONG_BATCH_SIZE = 500;
const runningServers = /* @__PURE__ */ new Set();
const cancelledServers = /* @__PURE__ */ new Set();
const syncedServers = /* @__PURE__ */ new Set();
const pendingServers = /* @__PURE__ */ new Map();
const notifyLibraryUpdated = (serverId) => {
  sendToMain("streaming:libraryUpdated", serverId);
};
const syncServer = async (config, adapter) => {
  const generation = Date.now();
  let songCount = 0;
  let firstBatch = true;
  try {
    let limit = FIRST_SONG_BATCH_SIZE;
    while (true) {
      const songs = await adapter.listSongs(config, {
        offset: songCount,
        limit
      });
      if (cancelledServers.has(config.id)) return false;
      upsertTracks(
        songs.map((track) => ({
          serverId: config.id,
          remoteId: track.originalId,
          track,
          generation
        }))
      );
      songCount += songs.length;
      if (firstBatch) {
        firstBatch = false;
        notifyLibraryUpdated(config.id);
      }
      if (songs.length < limit) break;
      limit = SONG_BATCH_SIZE;
    }
    const albums = await adapter.listAlbums(config, { offset: 0, limit: 500 });
    if (cancelledServers.has(config.id)) return false;
    upsertAlbums(
      albums.flatMap(
        (album2) => album2.id ? [{ serverId: config.id, remoteId: album2.id, album: album2, generation }] : []
      )
    );
    const artists2 = await adapter.listArtists(config);
    if (cancelledServers.has(config.id)) return false;
    upsertArtists(
      artists2.flatMap(
        (artist2) => artist2.id ? [{ serverId: config.id, remoteId: artist2.id, artist: artist2, generation }] : []
      )
    );
    const playlists = await adapter.listPlaylists(config);
    if (cancelledServers.has(config.id)) return false;
    upsertPlaylists(
      playlists.flatMap(
        (playlist2) => playlist2.id ? [{ serverId: config.id, remoteId: playlist2.id, playlist: playlist2, generation }] : []
      )
    );
    deleteStaleTracks(config.id, generation);
    deleteStaleAlbums(config.id, generation);
    deleteStaleArtists(config.id, generation);
    deleteStalePlaylists(config.id, generation);
    notifyLibraryUpdated(config.id);
    streamingLog.info(
      `${config.type} 媒体库同步完成 [${config.name}]: 歌曲 ${songCount}，专辑 ${albums.length}，歌手 ${artists2.length}，歌单 ${playlists.length}`
    );
    return true;
  } catch (error) {
    if (/HTTP 401|HTTP 403/.test(error instanceof Error ? error.message : String(error))) {
      invalidateStreamingSession(config.id);
    }
    notifyLibraryUpdated(config.id);
    streamingLog.warn(`${config.type} 媒体库同步失败 [${config.name}]:`, error);
    return false;
  }
};
const queueStreamingSync = (config, force = false) => {
  if (runningServers.has(config.id)) {
    if (cancelledServers.has(config.id)) pendingServers.set(config.id, config);
    return false;
  }
  if (!force && syncedServers.has(config.id)) return false;
  if (!isDbOpen()) {
    streamingLog.warn(`数据库尚未初始化，跳过流媒体同步 [${config.name}]`);
    return false;
  }
  cancelledServers.delete(config.id);
  runningServers.add(config.id);
  void resolveStreamingAdapter(config).then((resolved) => syncServer(resolved.config, resolved.adapter)).then((success) => {
    if (success) syncedServers.add(config.id);
    else syncedServers.delete(config.id);
  }).catch((error) => {
    syncedServers.delete(config.id);
    if (cancelledServers.has(config.id)) return;
    notifyLibraryUpdated(config.id);
    streamingLog.warn(`${config.type} 同步登录失败 [${config.name}]:`, error);
  }).finally(() => {
    runningServers.delete(config.id);
    cancelledServers.delete(config.id);
    const pending2 = pendingServers.get(config.id);
    if (pending2) {
      pendingServers.delete(config.id);
      queueStreamingSync(pending2, true);
    }
  });
  return true;
};
const cancelStreamingSync = (serverId) => {
  if (runningServers.has(serverId)) cancelledServers.add(serverId);
  syncedServers.delete(serverId);
  pendingServers.delete(serverId);
};
const registerStreamingIpc = () => {
  registerStreamingCoverProtocol();
  ipcMain.handle("streaming:loadServers", getStreamingConfig);
  ipcMain.handle(
    "streaming:addServer",
    (_event, input) => addStreamingServer(input)
  );
  ipcMain.handle(
    "streaming:updateServer",
    (_event, serverId, input) => {
      invalidateStreamingSession(serverId);
      cancelStreamingSync(serverId);
      return updateStreamingServer(serverId, input);
    }
  );
  ipcMain.handle("streaming:removeServer", (_event, serverId) => {
    invalidateStreamingSession(serverId);
    cancelStreamingSync(serverId);
    removeStreamingServer(serverId);
    if (isDbOpen()) deleteLibraryByServer(serverId);
  });
  ipcMain.handle(
    "streaming:setActiveServer",
    (_event, serverId) => setActiveStreamingServer(serverId)
  );
  ipcMain.handle(
    "streaming:testConnection",
    (_event, input, serverId) => testStreamingConnection(input, serverId)
  );
  ipcMain.handle(
    "streaming:connect",
    (_event, serverId) => connectStreamingServer(serverId)
  );
  ipcMain.handle(
    "streaming:disconnect",
    (_event, serverId) => invalidateStreamingSession(serverId)
  );
  ipcMain.handle(
    "streaming:getSnapshot",
    (_event, serverId) => getLibrarySnapshot(serverId)
  );
  ipcMain.handle(
    "streaming:sync",
    (_event, serverId, force = false) => queueStreamingSync(getStreamingServer(serverId), force)
  );
  ipcMain.handle(
    "streaming:search",
    (_event, serverId, query) => searchLibrary(serverId, query.slice(0, 200))
  );
  ipcMain.handle(
    "streaming:getAlbumSongs",
    (_event, serverId, albumId) => withStreamingAdapter(serverId, (config, adapter) => adapter.getAlbumSongs(config, albumId))
  );
  ipcMain.handle(
    "streaming:getPlaylistSongs",
    (_event, serverId, playlistId) => withStreamingAdapter(
      serverId,
      (config, adapter) => adapter.getPlaylistSongs(config, playlistId)
    )
  );
  ipcMain.handle(
    "streaming:getArtistAlbums",
    (_event, serverId, artistId) => withStreamingAdapter(serverId, (config, adapter) => adapter.getArtistAlbums(config, artistId))
  );
  ipcMain.handle(
    "streaming:getArtistSongs",
    (_event, serverId, artistId) => withStreamingAdapter(serverId, (config, adapter) => adapter.getArtistSongs(config, artistId))
  );
  ipcMain.handle(
    "streaming:getStreamUrl",
    (_event, serverId, trackId, playSessionId) => withStreamingAdapter(
      serverId,
      (config, adapter) => adapter.getStreamUrl(config, trackId, playSessionId)
    )
  );
  ipcMain.handle(
    "streaming:getLyrics",
    (_event, serverId, trackId, hint) => withStreamingAdapter(serverId, (config, adapter) => adapter.getLyrics(config, trackId, hint))
  );
};
const registerLastfmIpc = () => {
  ipcMain.handle("lastfm:connect", () => connect());
  ipcMain.handle("lastfm:cancelConnect", () => cancelConnect());
  ipcMain.handle("lastfm:disconnect", () => disconnect());
  ipcMain.handle("lastfm:getStatus", () => getStatus());
  ipcMain.handle(
    "lastfm:love",
    (_event, artist2, track, loved) => love(artist2, track, loved)
  );
};
const dirSize = async (dir) => {
  let entries;
  try {
    entries = await fsp.readdir(dir, { withFileTypes: true });
  } catch {
    return 0;
  }
  const sizes = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      try {
        if (entry.isDirectory()) return await dirSize(full);
        if (entry.isFile()) return (await fsp.stat(full)).size;
      } catch {
      }
      return 0;
    })
  );
  return sizes.reduce((sum, item) => sum + item, 0);
};
const clearDir = async (dir) => {
  if (!existsSync(dir)) return;
  const entries = await fsp.readdir(dir);
  await Promise.all(
    entries.map((name) => fsp.rm(path.join(dir, name), { recursive: true, force: true }))
  );
};
const isDirEmpty = async (dir) => {
  if (!existsSync(dir)) return true;
  const entries = await fsp.readdir(dir);
  return entries.length === 0;
};
const tableSize = (table, columns) => {
  try {
    const expr = columns.map((c) => `COALESCE(length(${c}), 0)`).join(" + ");
    const row = getDb().prepare(`SELECT SUM(${expr}) AS total FROM ${table}`).get();
    return row?.total ?? 0;
  } catch {
    return 0;
  }
};
const categoryHandlers = {
  covers: {
    kind: "file",
    path: getCoverCacheDir,
    size: () => dirSize(getCoverCacheDir()),
    clear: () => clearDir(getCoverCacheDir())
  },
  artists: {
    kind: "file",
    path: getArtistCacheDir,
    size: () => dirSize(getArtistCacheDir()),
    clear: () => clearDir(getArtistCacheDir())
  },
  backgrounds: {
    kind: "file",
    path: getBackgroundsDir,
    size: () => dirSize(getBackgroundsDir()),
    clear: () => clearDir(getBackgroundsDir())
  },
  songs: {
    kind: "file",
    path: getSongCacheDir,
    size: () => stats().size,
    clear: () => clearAll()
  },
  lyric: {
    kind: "db",
    path: () => "lyric_cache",
    size: () => tableSize("lyric_cache", ["data"]),
    clear: clearLyricCache
  },
  lyricTTML: {
    kind: "db",
    path: () => "lyric_ttml_cache",
    size: () => tableSize("lyric_ttml_cache", ["content"]),
    clear: clearLyricTtmlCache
  },
  lyricMatch: {
    kind: "db",
    path: () => "lyric_match_cache",
    size: () => tableSize("lyric_match_cache", ["fingerprint", "platform_id", "extra"]),
    clear: clearLyricMatchCache
  }
};
const idsByKind = (kind) => Object.keys(categoryHandlers).filter(
  (id) => categoryHandlers[id].kind === kind
);
const registerCacheIpc = () => {
  ipcMain.handle("cache:getStats", async () => {
    const ids = Object.keys(categoryHandlers);
    return Promise.all(
      ids.map(async (id) => ({
        id,
        kind: categoryHandlers[id].kind,
        path: categoryHandlers[id].path(),
        size: await categoryHandlers[id].size()
      }))
    );
  });
  ipcMain.handle("cache:clear", async (_event, id) => {
    const handler = categoryHandlers[id];
    if (!handler) return;
    try {
      await handler.clear();
      systemLog.info(`[cache] cleared ${id}`);
    } catch (err) {
      systemLog.error(`[cache] clear ${id} failed`, err);
      throw err;
    }
  });
  ipcMain.handle("cache:clearAllByKind", async (_event, kind) => {
    const ids = idsByKind(kind);
    await Promise.all(ids.map((id) => categoryHandlers[id].clear()));
    systemLog.info(`[cache] cleared all (${kind})`);
  });
  ipcMain.handle("cache:getDir", () => getAppCacheDir());
  ipcMain.handle(
    "cache:pickDir",
    async () => {
      const current2 = getAppCacheDir();
      const result2 = await dialog.showOpenDialog({
        title: "选择缓存目录",
        properties: ["openDirectory", "createDirectory"]
      });
      if (result2.canceled || result2.filePaths.length === 0) {
        return { ok: false, dir: current2, reason: "canceled" };
      }
      const next = result2.filePaths[0];
      if (!await isDirEmpty(next)) {
        return { ok: false, dir: current2, reason: "notEmpty" };
      }
      await Promise.all(idsByKind("file").map((id) => categoryHandlers[id].clear()));
      store$1.set("cache.dir", next);
      syncCoverCacheDir();
      reloadDir();
      systemLog.info(`[cache] dir switched to ${next}`);
      return { ok: true, dir: next };
    }
  );
  ipcMain.handle("cache:resetDir", async () => {
    await Promise.all(idsByKind("file").map((id) => categoryHandlers[id].clear()));
    store$1.set("cache.dir", null);
    syncCoverCacheDir();
    reloadDir();
    return defaultCacheDir;
  });
  ipcMain.handle(
    "cache:song:lookup",
    (_event, cacheKey) => lookup(cacheKey)
  );
  ipcMain.handle(
    "cache:song:fetch",
    (_event, cacheKey, source, streamUrl) => fetchAsync(cacheKey, source, streamUrl)
  );
  ipcMain.handle("cache:song:cancel", (_event, cacheKey) => {
    cancel$1(cacheKey);
  });
};
const ILLEGAL = /[\\/:*?"<>|]/g;
const sanitizeSegment = (name) => name.replace(ILLEGAL, " ").replace(/\s+/g, " ").trim().replace(/^\.+|\.+$/g, "").trim();
const fillTemplate = (template, vars) => template.replace(/\{artist\}/g, vars.artist).replace(/\{title\}/g, vars.title).replace(/\{album\}/g, vars.album);
const folderSegments = (scheme, vars) => {
  const raw = scheme === "artist" ? [vars.artist] : scheme === "artist-album" ? [vars.artist, vars.album] : [];
  return raw.map(sanitizeSegment).filter(Boolean);
};
const renderDownloadPath = (scheme, fileTemplate, vars) => {
  const baseName = sanitizeSegment(fillTemplate(fileTemplate, vars)) || sanitizeSegment(vars.title) || "untitled";
  return { relDir: folderSegments(scheme, vars).join("/"), baseName };
};
const dedupePath = (pathWithoutExt, ext) => {
  let target = `${pathWithoutExt}${ext}`;
  for (let seq = 2; existsSync(target); seq++) {
    target = `${pathWithoutExt} (${seq})${ext}`;
  }
  return target;
};
const MIME_EXT = {
  "audio/flac": ".flac",
  "audio/x-flac": ".flac",
  "audio/mpeg": ".mp3",
  "audio/mp3": ".mp3",
  "audio/mp4": ".m4a",
  "audio/x-m4a": ".m4a",
  "audio/aac": ".aac",
  "audio/ogg": ".ogg",
  "audio/opus": ".opus",
  "audio/wav": ".wav",
  "audio/x-wav": ".wav"
};
const KNOWN_EXTS = /* @__PURE__ */ new Set([
  ".flac",
  ".mp3",
  ".m4a",
  ".aac",
  ".ogg",
  ".opus",
  ".wav",
  ".ape",
  ".wv",
  ".aiff"
]);
const resolveExtension = (declaredFormat, contentType, url) => {
  if (declaredFormat) {
    const ext = declaredFormat.startsWith(".") ? declaredFormat : `.${declaredFormat}`;
    if (KNOWN_EXTS.has(ext.toLowerCase())) return ext.toLowerCase();
  }
  if (contentType) {
    const mime = contentType.split(";")[0].trim().toLowerCase();
    if (MIME_EXT[mime]) return MIME_EXT[mime];
  }
  const match2 = url.split("?")[0].match(/\.([a-z0-9]{2,5})$/i);
  if (match2) {
    const ext = `.${match2[1].toLowerCase()}`;
    if (KNOWN_EXTS.has(ext)) return ext;
  }
  return ".mp3";
};
const toTask = (raw) => ({
  taskId: raw.task_id,
  track: JSON.parse(raw.track_json),
  qualityLevel: raw.quality_level,
  status: raw.status,
  received: raw.received,
  total: raw.total,
  filePath: raw.file_path ?? void 0,
  errorCode: raw.error_code ?? void 0,
  tagWarning: raw.tag_warning === 1,
  createdAt: raw.created_at,
  finishedAt: raw.finished_at ?? void 0
});
const upsert = (task) => {
  getDb().prepare(
    `INSERT INTO download_tasks
         (task_id, track_json, quality_level, status, received, total, file_path, error_code, tag_warning, created_at, finished_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(task_id) DO UPDATE SET
         track_json = excluded.track_json,
         quality_level = excluded.quality_level,
         status = excluded.status,
         received = excluded.received,
         total = excluded.total,
         file_path = excluded.file_path,
         error_code = excluded.error_code,
         tag_warning = excluded.tag_warning,
         finished_at = excluded.finished_at`
  ).run(
    task.taskId,
    JSON.stringify(task.track),
    task.qualityLevel,
    task.status,
    task.received,
    task.total,
    task.filePath ?? null,
    task.errorCode ?? null,
    task.tagWarning ? 1 : 0,
    task.createdAt,
    task.finishedAt ?? null
  );
};
const findById = (taskId) => {
  const raw = getDb().prepare("SELECT * FROM download_tasks WHERE task_id = ?").get(taskId);
  return raw ? toTask(raw) : null;
};
const listAll = () => {
  const rows = getDb().prepare("SELECT * FROM download_tasks ORDER BY created_at DESC").all();
  return rows.map(toTask);
};
const listCompletedByQuality = (quality) => {
  const rows = getDb().prepare("SELECT * FROM download_tasks WHERE status = 'done' AND quality_level = ?").all(quality);
  return rows.map(toTask);
};
const remove$1 = (taskId) => {
  getDb().prepare("DELETE FROM download_tasks WHERE task_id = ?").run(taskId);
};
const clearFinished$1 = () => {
  getDb().prepare("DELETE FROM download_tasks WHERE status NOT IN ('queued','downloading')").run();
};
const markInterrupted = () => {
  getDb().prepare(
    "UPDATE download_tasks SET status = 'interrupted' WHERE status IN ('queued','downloading')"
  ).run();
};
const PROGRESS_INTERVAL_MS = 250;
const REJECTED_MIME_PREFIXES = ["text/html", "application/json", "application/xml", "text/xml"];
const isRejectedMime = (mime) => !!mime && REJECTED_MIME_PREFIXES.some((prefix) => mime.toLowerCase().startsWith(prefix));
const looksLikeAudio = async (filePath) => {
  let fd = null;
  try {
    fd = await fsp.open(filePath, "r");
    const buf = Buffer.alloc(4);
    const { bytesRead } = await fd.read(buf, 0, 4, 0);
    if (bytesRead === 0) return false;
    return buf[0] !== 60 && buf[0] !== 123 && buf[0] !== 91;
  } catch {
    return false;
  } finally {
    if (fd) await fd.close().catch(() => {
    });
  }
};
const tasks = /* @__PURE__ */ new Map();
const queue = [];
let active = null;
const resolutionGates = /* @__PURE__ */ new Map();
const tmpDir = () => path.join(getAppCacheDir(), "downloads-tmp");
const dedupeKeyOf = (req) => `${req.track.source}:${req.track.id}:${req.qualityLevel}`;
const artistString = (req) => req.track.artists.map((artist2) => artist2.name).join("/");
const broadcastState = (task) => {
  if (tasks.get(task.taskId)?.removed) return;
  upsert(task);
  broadcast("download:state", task);
};
const moveFile = async (src, dest) => {
  try {
    await fsp.rename(src, dest);
  } catch (err) {
    if (err.code === "EXDEV") {
      await fsp.copyFile(src, dest);
      await fsp.unlink(src);
    } else {
      throw err;
    }
  }
};
const streamToFile = async (body, partPath, taskId, total, signal) => {
  const reader = body.getReader();
  let received = 0;
  let lastTs = 0;
  const source = (async function* read() {
    try {
      for (; ; ) {
        const { done, value } = await reader.read();
        if (done) return;
        received += value.length;
        const now = Date.now();
        if (now - lastTs >= PROGRESS_INTERVAL_MS) {
          lastTs = now;
          broadcast("download:progress", { taskId, received, total }, true);
        }
        yield value;
      }
    } finally {
      await reader.cancel().catch(() => {
      });
    }
  })();
  await pipeline(source, fs.createWriteStream(partPath), { signal });
  return received;
};
const applyTags = async (req, filePath) => {
  const { tagOptions } = req;
  const writeRequest = { path: filePath };
  let hasWrite = false;
  if (tagOptions.embedMeta) {
    writeRequest.title = req.track.title;
    writeRequest.artist = artistString(req);
    if (req.track.album?.name) writeRequest.album = req.track.album.name;
    hasWrite = true;
  }
  if (tagOptions.embedLyric && req.lyricText) {
    writeRequest.lyrics = req.lyricText;
    hasWrite = true;
  }
  if (tagOptions.embedCover && req.coverUrl) {
    const cover = await fetchBytes(req.coverUrl, { requireImage: true });
    if (cover) {
      writeRequest.cover = cover;
      hasWrite = true;
    } else {
      downloadLog.warn(`封面下载失败，跳过封面: ${req.coverUrl}`);
    }
  }
  if (!hasWrite) return true;
  try {
    const results = await getEngine().writeTrackTags([writeRequest], getCoverCacheDir());
    return results[0]?.success === true;
  } catch (err) {
    downloadLog.warn(`写标签失败 ${filePath}:`, err);
    return false;
  }
};
const writeSidecar = async (filePath, text) => {
  try {
    await fsp.writeFile(filePath, text, "utf-8");
  } catch (err) {
    downloadLog.warn(`写歌词文件失败 ${filePath}:`, err);
  }
};
const writeLyricFiles = async (req, audioPath) => {
  const base = audioPath.slice(0, audioPath.length - path.extname(audioPath).length);
  if (req.tagOptions.writeLrc && req.lyricText) await writeSidecar(`${base}.lrc`, req.lyricText);
  if (req.tagOptions.saveTtml && req.ttmlText) await writeSidecar(`${base}.ttml`, req.ttmlText);
};
const waitForResolution = (taskId, signal) => new Promise((resolve2, reject) => {
  const onAbort = () => {
    resolutionGates.delete(taskId);
    reject(new Error("resolution aborted"));
  };
  const gate = {
    resolve: (res) => {
      resolutionGates.delete(taskId);
      signal.removeEventListener("abort", onAbort);
      resolve2(res);
    },
    reject: (err) => {
      resolutionGates.delete(taskId);
      signal.removeEventListener("abort", onAbort);
      reject(err);
    }
  };
  resolutionGates.set(taskId, gate);
  if (signal.aborted) {
    onAbort();
    return;
  }
  signal.addEventListener("abort", onAbort, { once: true });
});
const submitResolution = (taskId, res) => {
  resolutionGates.get(taskId)?.resolve(res);
};
const failResolution = (taskId) => {
  resolutionGates.get(taskId)?.reject(new Error("resolve failed"));
};
const runTask = async (req, task, controller) => {
  const partPath = path.join(tmpDir(), `${req.taskId}.part`);
  try {
    if (!req.url) {
      const payload = {
        taskId: req.taskId,
        track: req.track,
        qualityLevel: req.qualityLevel,
        tagOptions: req.tagOptions,
        coverUrl: req.coverUrl,
        usePlaybackForDownload: req.usePlaybackForDownload,
        lyricFileFormat: req.lyricFileFormat
      };
      const resolution = waitForResolution(req.taskId, controller.signal);
      broadcast("download:resolve", payload);
      Object.assign(req, await resolution);
    }
    const audioUrl = req.url;
    if (!audioUrl) throw new Error("missing download url");
    const downloadDir = getDownloadDir();
    const { relDir, baseName } = renderDownloadPath(
      store$1.get("download.folderScheme"),
      store$1.get("download.fileTemplate"),
      {
        artist: artistString(req),
        title: req.track.title,
        album: req.track.album?.name ?? ""
      }
    );
    const targetDir = path.join(downloadDir, relDir);
    const finalNoExt = path.join(targetDir, baseName);
    const policy = store$1.get("download.overwritePolicy");
    const guessExt = resolveExtension(req.declaredFormat, null, audioUrl);
    if (policy === "skip" && fs.existsSync(`${finalNoExt}${guessExt}`)) {
      task.status = "done";
      task.filePath = `${finalNoExt}${guessExt}`;
      task.finishedAt = Date.now();
      broadcastState(task);
      return;
    }
    await fsp.mkdir(tmpDir(), { recursive: true });
    await fsp.mkdir(targetDir, { recursive: true });
    const response = await fetch(audioUrl, { signal: controller.signal });
    if (!response.ok || !response.body) {
      throw new Error(`HTTP ${response.status}`);
    }
    const mime = response.headers.get("content-type");
    if (isRejectedMime(mime)) throw new Error(`rejected mime ${mime}`);
    const total = Number(response.headers.get("content-length")) || req.declaredSize || 0;
    const received = await streamToFile(
      response.body,
      partPath,
      req.taskId,
      total,
      controller.signal
    );
    if (received === 0) throw new Error("empty body");
    if (!await looksLikeAudio(partPath)) throw new Error("not audio");
    const ext = resolveExtension(req.declaredFormat, mime, audioUrl);
    const finalPath = policy === "rename" ? dedupePath(finalNoExt, ext) : `${finalNoExt}${ext}`;
    await moveFile(partPath, finalPath);
    await writeLyricFiles(req, finalPath);
    const tagOk = await applyTags(req, finalPath);
    task.status = "done";
    task.received = received;
    task.total = total || received;
    task.filePath = finalPath;
    task.tagWarning = !tagOk;
    task.finishedAt = Date.now();
    broadcastState(task);
    downloadLog.info(`完成 ${req.track.title} → ${finalPath}`);
  } catch (err) {
    await fsp.unlink(partPath).catch(() => {
    });
    if (controller.signal.aborted) {
      task.status = "canceled";
    } else {
      task.status = "failed";
      task.errorCode = ErrorCode.UNKNOWN;
      downloadLog.error(`失败 ${req.track.title}:`, err);
    }
    task.finishedAt = Date.now();
    broadcastState(task);
  }
};
const pump = async () => {
  if (active !== null) return;
  const taskId = queue.shift();
  if (taskId === void 0) return;
  const pending2 = tasks.get(taskId);
  if (!pending2) return void pump();
  active = taskId;
  pending2.task.status = "downloading";
  broadcastState(pending2.task);
  try {
    await runTask(pending2.req, pending2.task, pending2.controller);
  } finally {
    tasks.delete(taskId);
    active = null;
    void pump();
  }
};
const enqueueOne = (req, completedByQuality) => {
  if (tasks.has(req.taskId)) return { ok: false, reason: "queued" };
  const dedupeKey = dedupeKeyOf(req);
  for (const pending2 of tasks.values()) {
    if (pending2.dedupeKey === dedupeKey) return { ok: false, reason: "queued" };
  }
  let completed = completedByQuality?.get(req.qualityLevel);
  if (!completed) {
    completed = listCompletedByQuality(req.qualityLevel);
    completedByQuality?.set(req.qualityLevel, completed);
  }
  const downloaded = completed.find(
    (task2) => task2.track.source === req.track.source && task2.track.id === req.track.id
  );
  if (downloaded?.filePath && fs.existsSync(downloaded.filePath)) {
    return { ok: false, reason: "downloaded" };
  }
  const task = {
    taskId: req.taskId,
    status: "queued",
    track: req.track,
    qualityLevel: req.qualityLevel,
    received: 0,
    total: req.declaredSize ?? 0,
    createdAt: Date.now()
  };
  tasks.set(req.taskId, { req, task, controller: new AbortController(), dedupeKey });
  queue.push(req.taskId);
  broadcastState(task);
  void pump();
  return { ok: true };
};
const enqueue = (req) => enqueueOne(req);
const enqueueMany = (reqs) => {
  const completedByQuality = /* @__PURE__ */ new Map();
  return reqs.map((req) => enqueueOne(req, completedByQuality));
};
const cancel = (taskId) => {
  const pending2 = tasks.get(taskId);
  if (!pending2) return;
  if (active === taskId) {
    pending2.controller.abort();
    return;
  }
  const idx = queue.indexOf(taskId);
  if (idx !== -1) queue.splice(idx, 1);
  tasks.delete(taskId);
  pending2.task.status = "canceled";
  pending2.task.finishedAt = Date.now();
  broadcastState(pending2.task);
};
const LYRIC_SIDECAR_EXTS = [".lrc", ".qrc", ".yrc", ".krc", ".ttml", ".lys"];
const deleteDownloadedFile = async (filePath) => {
  await fsp.unlink(filePath).catch(() => {
  });
  const base = filePath.slice(0, filePath.length - path.extname(filePath).length);
  await Promise.all(LYRIC_SIDECAR_EXTS.map((ext) => fsp.unlink(`${base}${ext}`).catch(() => {
  })));
};
const remove = (taskId) => {
  const pending2 = tasks.get(taskId);
  if (pending2) {
    pending2.removed = true;
    if (active === taskId) {
      pending2.controller.abort();
    } else {
      const idx = queue.indexOf(taskId);
      if (idx !== -1) queue.splice(idx, 1);
      tasks.delete(taskId);
    }
  }
  const filePath = findById(taskId)?.filePath;
  remove$1(taskId);
  if (filePath) void deleteDownloadedFile(filePath);
};
const clearFinished = () => clearFinished$1();
const list = () => listAll();
const init$1 = async () => {
  markInterrupted();
  const dir = tmpDir();
  try {
    const entries = await fsp.readdir(dir);
    await Promise.all(entries.map((name) => fsp.unlink(path.join(dir, name)).catch(() => {
    })));
  } catch {
  }
  app.on("before-quit", () => {
    for (const pending2 of tasks.values()) pending2.controller.abort();
  });
};
const registerDownloadIpc = () => {
  ipcMain.handle("download:start", (_evt, req) => enqueue(req));
  ipcMain.handle(
    "download:startMany",
    (_evt, reqs) => enqueueMany(reqs)
  );
  ipcMain.handle("download:retry", (_evt, req) => enqueue(req));
  ipcMain.handle(
    "download:resolution",
    (_evt, taskId, res) => submitResolution(taskId, res)
  );
  ipcMain.handle(
    "download:resolveFailed",
    (_evt, taskId) => failResolution(taskId)
  );
  ipcMain.handle("download:cancel", (_evt, taskId) => cancel(taskId));
  ipcMain.handle("download:remove", (_evt, taskId) => remove(taskId));
  ipcMain.handle("download:clearFinished", () => clearFinished());
  ipcMain.handle("download:list", () => list());
  ipcMain.handle("download:getDir", () => getDownloadDir());
  ipcMain.handle("download:resetDir", () => {
    store$1.set("download.dir", null);
    return getDownloadDir();
  });
  ipcMain.handle("download:pickDir", async () => {
    const result2 = await dialog.showOpenDialog({
      title: "选择下载目录",
      properties: ["openDirectory", "createDirectory"]
    });
    if (result2.canceled || result2.filePaths.length === 0) {
      return { ok: false, dir: getDownloadDir(), reason: "canceled" };
    }
    const dir = result2.filePaths[0];
    store$1.set("download.dir", dir);
    return { ok: true, dir };
  });
};
const registerExternalApiIpc = () => {
  ipcMain.handle("externalApi:restart", () => restartServer());
  ipcMain.handle("externalApi:getStatus", () => getServerStatus());
};
const getAppDataPath = () => app.getPath("appData");
const SUPPORTED_AGENTS = [
  {
    id: "codex",
    name: "Codex",
    getConfigPath: () => path.join(os.homedir(), ".codex", "config.toml"),
    getInstallPaths: () => [
      path.join(os.homedir(), ".codex"),
      ...isWin ? [path.join(getAppDataPath(), "..", "Local", "OpenAI", "Codex")] : []
    ],
    format: "toml"
  },
  {
    id: "claudecode",
    name: "Claude Code",
    getConfigPath: () => path.join(os.homedir(), ".claude.json"),
    getInstallPaths: () => [path.join(os.homedir(), ".claude")]
  },
  {
    id: "cursor",
    name: "Cursor",
    getConfigPath: () => path.join(os.homedir(), ".cursor", "mcp.json"),
    getInstallPaths: () => [
      path.join(os.homedir(), ".cursor"),
      ...isWin ? [path.join(getAppDataPath(), "..", "Local", "Programs", "cursor")] : []
    ]
  },
  {
    id: "claudedesktop",
    name: "Claude Desktop",
    getConfigPath: () => {
      if (isWin) {
        return path.join(getAppDataPath(), "Claude", "claude_desktop_config.json");
      }
      return path.join(
        os.homedir(),
        "Library",
        "Application Support",
        "Claude",
        "claude_desktop_config.json"
      );
    },
    getInstallPaths: () => [
      isWin ? path.join(getAppDataPath(), "Claude") : path.join(os.homedir(), "Library", "Application Support", "Claude")
    ],
    injectable: false
  },
  {
    id: "codebuddy",
    name: "CodeBuddy",
    getConfigPath: () => path.join(os.homedir(), ".codebuddy", "mcp.json"),
    getInstallPaths: () => [path.join(os.homedir(), ".codebuddy")]
  },
  {
    id: "antigravity",
    name: "Antigravity IDE / CLI",
    getConfigPath: () => path.join(os.homedir(), ".gemini", "config", "mcp_config.json"),
    getInstallPaths: () => {
      const userInstallPaths = [
        path.join(os.homedir(), ".gemini", "antigravity"),
        path.join(os.homedir(), ".gemini", "antigravity-ide"),
        path.join(os.homedir(), ".gemini", "antigravity-cli")
      ];
      if (isWin) {
        return [
          ...userInstallPaths,
          path.join(getAppDataPath(), "Antigravity"),
          path.join(getAppDataPath(), "..", "Local", "Programs", "Antigravity"),
          path.join(getAppDataPath(), "..", "Local", "Antigravity")
        ];
      }
      if (isMac) {
        return [
          ...userInstallPaths,
          "/Applications/Antigravity.app",
          path.join(os.homedir(), "Applications", "Antigravity.app")
        ];
      }
      if (isLinux) {
        return [
          ...userInstallPaths,
          path.join(os.homedir(), ".config", "Antigravity"),
          "/opt/Antigravity"
        ];
      }
      return userInstallPaths;
    },
    format: "antigravity"
  }
];
const detectMcpAgents = async () => {
  const detected = [];
  for (const agent of SUPPORTED_AGENTS) {
    const configPath2 = agent.getConfigPath();
    const installed = await Promise.any(
      [configPath2, ...agent.getInstallPaths()].map((candidate) => fsp.stat(candidate))
    ).then(
      () => true,
      () => false
    );
    if (!installed) continue;
    let configured = false;
    try {
      const stats2 = await fsp.stat(configPath2);
      if (stats2.isFile()) {
        const content = await fsp.readFile(configPath2, "utf-8");
        configured = agent.format === "toml" ? /^\s*\[mcp_servers\.splayer-next\]\s*$/m.test(content) : !!JSON.parse(content || "{}")?.mcpServers?.["splayer-next"];
      }
    } catch (error) {
      const e = error;
      if (e.code !== "ENOENT") {
        nativeLog.warn(`Failed to read config for ${agent.name} at ${configPath2}: ${e.message}`);
      }
    }
    detected.push({
      id: agent.id,
      name: agent.name,
      configPath: configPath2,
      configured,
      injectable: agent.injectable !== false
    });
  }
  return detected;
};
const injectMcpAgentConfig = async (agentId, params) => {
  const agent = SUPPORTED_AGENTS.find((a) => a.id === agentId);
  if (!agent) {
    throw new Error(`Unsupported agent: ${agentId}`);
  }
  if (agent.injectable === false) {
    throw new Error(`Automatic configuration is not supported for ${agent.name}`);
  }
  const configPath2 = agent.getConfigPath();
  if (agent.format === "toml") {
    let content = "";
    try {
      content = await fsp.readFile(configPath2, "utf-8");
    } catch (error) {
      const e = error;
      if (e.code !== "ENOENT") throw error;
    }
    if (/^\s*\[mcp_servers\.splayer-next\]\s*$/m.test(content)) return true;
    const section = [
      "[mcp_servers.splayer-next]",
      `url = "http://127.0.0.1:${params.port}/mcp"`,
      `http_headers = { "X-MCP-Key" = ${JSON.stringify(params.accessKey)} }`
    ].join("\n");
    const nextContent = `${content.trimEnd()}${content.trim() ? "\n\n" : ""}${section}
`;
    await fsp.mkdir(path.dirname(configPath2), { recursive: true });
    await fsp.writeFile(configPath2, nextContent, "utf-8");
    return true;
  }
  let json = {};
  try {
    const content = await fsp.readFile(configPath2, "utf-8");
    json = JSON.parse(content || "{}");
  } catch (error) {
    const e = error;
    if (e.code === "ENOENT") {
      json = {};
    } else {
      throw new Error(`Failed to parse agent config: ${e.message}`);
    }
  }
  if (!json.mcpServers) {
    json.mcpServers = {};
  }
  json.mcpServers["splayer-next"] = agent.format === "antigravity" ? {
    serverUrl: `http://127.0.0.1:${params.port}/mcp`,
    headers: { "X-MCP-Key": params.accessKey }
  } : {
    type: "http",
    url: `http://127.0.0.1:${params.port}/mcp`,
    headers: { "X-MCP-Key": params.accessKey }
  };
  await fsp.mkdir(path.dirname(configPath2), { recursive: true });
  await fsp.writeFile(configPath2, JSON.stringify(json, null, 2), "utf-8");
  return true;
};
const registerMcpIpc = () => {
  ipcMain.handle("mcp:restart", () => restartMcpServer());
  ipcMain.handle("mcp:getStatus", () => getMcpStatus());
  ipcMain.handle("mcp:getClientConfigParams", () => getMcpClientConfigParams());
  ipcMain.handle("mcp:detectAgents", () => detectMcpAgents());
  ipcMain.handle(
    "mcp:injectAgentConfig",
    (_e, agentId, params) => injectMcpAgentConfig(agentId, params)
  );
};
const insertPlayEvent = (event) => {
  if (!isDbOpen()) return;
  try {
    getDb().prepare(
      `INSERT INTO play_history (track_id, source, started_at, listened_ms, track_json)
         VALUES (?, ?, ?, ?, ?)`
    ).run(
      event.track.id,
      event.track.source,
      event.startedAt,
      event.listenedMs,
      JSON.stringify(event.track)
    );
  } catch (error) {
    libraryLog.error("写入播放记录失败:", error);
  }
};
const insertFavoriteEvent = (event) => {
  if (!isDbOpen()) return;
  try {
    getDb().prepare(
      `INSERT INTO favorite_history (track_id, source, action, at, track_json)
         VALUES (?, ?, ?, ?, ?)`
    ).run(
      event.track.id,
      event.track.source,
      event.action,
      Date.now(),
      JSON.stringify(event.track)
    );
  } catch (error) {
    libraryLog.error("写入收藏记录失败:", error);
  }
};
const dayStartMs = (now) => {
  const date = new Date(now);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};
const weekStartMs = (now) => {
  const date = new Date(now);
  const daysFromMonday = (date.getDay() + 6) % 7;
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - daysFromMonday);
  return monday.getTime();
};
const dayKey = (date) => {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};
const computeStreak = (descDays) => {
  if (descDays.length === 0) return 0;
  const today = /* @__PURE__ */ new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (descDays[0] !== dayKey(today) && descDays[0] !== dayKey(yesterday)) return 0;
  const present = new Set(descDays);
  const cursor = new Date(today);
  if (descDays[0] !== dayKey(today)) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (present.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
};
const EMPTY_SUMMARY = {
  todayListenedMs: 0,
  weekListenedMs: 0,
  lastWeekListenedMs: 0,
  totalListenedMs: 0,
  weekPlayCount: 0,
  totalPlayCount: 0,
  weekFavoriteAdds: 0,
  streakDays: 0
};
const getStatsSummary = () => {
  try {
    const db2 = getDb();
    const now = Date.now();
    const dayStart = dayStartMs(now);
    const weekStart = weekStartMs(now);
    const lastWeekStart = weekStart - 7 * 24 * 60 * 60 * 1e3;
    const scalar = (sql, ...params) => db2.prepare(sql).get(...params).value;
    const listenedSince = "SELECT COALESCE(SUM(listened_ms), 0) AS value FROM play_history WHERE started_at >= ?";
    const playCountSince = "SELECT COUNT(*) AS value FROM play_history WHERE started_at >= ?";
    const dayRows = db2.prepare(
      "SELECT DISTINCT date(started_at / 1000, 'unixepoch', 'localtime') AS day FROM play_history ORDER BY day DESC"
    ).all();
    return {
      todayListenedMs: scalar(listenedSince, dayStart),
      weekListenedMs: scalar(listenedSince, weekStart),
      lastWeekListenedMs: scalar(
        "SELECT COALESCE(SUM(listened_ms), 0) AS value FROM play_history WHERE started_at >= ? AND started_at < ?",
        lastWeekStart,
        weekStart
      ),
      totalListenedMs: scalar(listenedSince, 0),
      weekPlayCount: scalar(playCountSince, weekStart),
      totalPlayCount: scalar(playCountSince, 0),
      weekFavoriteAdds: scalar(
        "SELECT COUNT(*) AS value FROM favorite_history WHERE action = 'add' AND at >= ?",
        weekStart
      ),
      streakDays: computeStreak(dayRows.map((row) => row.day))
    };
  } catch (error) {
    libraryLog.error("读取播放统计失败:", error);
    return EMPTY_SUMMARY;
  }
};
const getTopTracks = (limit) => {
  try {
    const rows = getDb().prepare(
      `SELECT track_json, COUNT(*) AS plays
         FROM play_history
         WHERE source != 'streaming'
         GROUP BY source, track_id
         ORDER BY plays DESC, MAX(started_at) DESC
         LIMIT ?`
    ).all(limit);
    return rows.map((row) => ({
      track: JSON.parse(row.track_json),
      playCount: row.plays
    }));
  } catch (error) {
    libraryLog.error("读取最常播放失败:", error);
    return [];
  }
};
const getPlayHistoryDaily = (days) => {
  try {
    const startMs = dayStartMs(Date.now()) - (days - 1) * 24 * 60 * 60 * 1e3;
    const rows = getDb().prepare(
      `SELECT date(started_at / 1000, 'unixepoch', 'localtime') AS day,
                COUNT(*) AS playCount
         FROM play_history
         WHERE started_at >= ?
         GROUP BY day
         ORDER BY day ASC`
    ).all(startMs);
    return rows.map((row) => ({ day: row.day, playCount: row.playCount }));
  } catch (error) {
    libraryLog.error("读取每日播放统计失败:", error);
    return [];
  }
};
const getPlayHistoryHourly = () => {
  try {
    const rows = getDb().prepare(
      `SELECT CAST(strftime('%H', started_at / 1000, 'unixepoch', 'localtime') AS INTEGER) AS hour,
                COUNT(*) AS playCount
         FROM play_history
         GROUP BY hour
         ORDER BY hour ASC`
    ).all();
    const countByHour = new Map(rows.map((row) => [row.hour, row.playCount]));
    return Array.from({ length: 24 }, (_, hour) => ({
      hour,
      playCount: countByHour.get(hour) ?? 0
    }));
  } catch (error) {
    libraryLog.error("读取分时播放统计失败:", error);
    return [];
  }
};
const getTopAlbums = (limit) => {
  try {
    const rows = getDb().prepare(
      `SELECT track_json, COUNT(*) AS plays
         FROM play_history
         WHERE source != 'streaming'
           AND TRIM(COALESCE(json_extract(track_json, '$.album.name'), '')) != ''
         GROUP BY source,
                  COALESCE(
                    json_extract(track_json, '$.album.id'),
                    json_extract(track_json, '$.album.name')
                  )
         ORDER BY plays DESC, MAX(started_at) DESC
         LIMIT ?`
    ).all(limit);
    return rows.map((row) => ({
      track: JSON.parse(row.track_json),
      playCount: row.plays
    }));
  } catch (error) {
    libraryLog.error("读取最常播放专辑失败:", error);
    return [];
  }
};
const getTopArtists = (limit) => {
  try {
    const rows = getDb().prepare(
      `SELECT track_json, artist.value AS artist_json, COUNT(*) AS plays
         FROM play_history, json_each(play_history.track_json, '$.artists') artist
         WHERE play_history.source != 'streaming'
           AND TRIM(COALESCE(json_extract(artist.value, '$.name'), '')) != ''
         GROUP BY play_history.source,
                  COALESCE(
                    json_extract(artist.value, '$.id'),
                    LOWER(json_extract(artist.value, '$.name'))
                  )
         ORDER BY plays DESC, MAX(started_at) DESC
         LIMIT ?`
    ).all(limit);
    return rows.map((row) => ({
      artist: JSON.parse(row.artist_json),
      track: JSON.parse(row.track_json),
      playCount: row.plays
    }));
  } catch (error) {
    libraryLog.error("读取最常播放歌手失败:", error);
    return [];
  }
};
const registerStatsIpc = () => {
  ipcMain.on("stats:recordPlay", (_event, payload) => {
    insertPlayEvent(payload);
  });
  ipcMain.on("stats:recordFavorite", (_event, payload) => {
    insertFavoriteEvent(payload);
  });
  ipcMain.handle("stats:getStatsSummary", () => getStatsSummary());
  ipcMain.handle("stats:getTopTracks", (_event, limit) => getTopTracks(limit));
  ipcMain.handle("stats:getLibraryStats", () => getLibraryStats());
  ipcMain.handle("stats:getPlayHistoryDaily", (_event, days) => getPlayHistoryDaily(days));
  ipcMain.handle("stats:getPlayHistoryHourly", () => getPlayHistoryHourly());
  ipcMain.handle("stats:getTopAlbums", (_event, limit) => getTopAlbums(limit));
  ipcMain.handle("stats:getTopArtists", (_event, limit) => getTopArtists(limit));
};
const registerUpdateIpc = () => {
  ipcMain.handle("update:check", (_event, manual) => checkForUpdates(manual));
  ipcMain.handle("update:download", () => downloadUpdate());
  ipcMain.handle("update:install", () => quitAndInstall());
  ipcMain.handle("update:openDownloadPage", () => openDownloadPage());
};
const BUCKET = "jd-musicrep-privatecloud-audio-public";
const MIME_BY_EXT = {
  mp3: "audio/mpeg",
  flac: "audio/flac",
  wav: "audio/wav",
  m4a: "audio/mp4",
  aac: "audio/aac",
  ogg: "audio/ogg",
  opus: "audio/ogg",
  wma: "audio/x-ms-wma",
  ape: "audio/x-ape",
  aiff: "audio/aiff"
};
const fileMd5 = (filePath) => new Promise((resolve2, reject) => {
  const hash2 = createHash("md5");
  const stream = createReadStream(filePath);
  stream.on("data", (chunk) => hash2.update(chunk));
  stream.on("end", () => resolve2(hash2.digest("hex")));
  stream.on("error", reject);
});
const fetchUploadHost = async () => {
  const res = await fetch(`https://wanproxy.127.net/lbs?version=1.0&bucketname=${BUCKET}`, {
    signal: AbortSignal.timeout(1e4)
  });
  const data2 = await res.json();
  const host = data2.upload?.[0];
  if (!host) throw new Error("获取上传服务器地址失败");
  return host;
};
const uploadToNos = (uploadUrl, filePath, fileSize, token, md52, mime, onBytes) => new Promise((resolve2, reject) => {
  const url = new URL(uploadUrl);
  const client = url.protocol === "https:" ? https : http;
  const req = client.request(
    url,
    {
      method: "POST",
      headers: {
        "x-nos-token": token,
        "Content-MD5": md52,
        "Content-Type": mime,
        "Content-Length": String(fileSize)
      },
      timeout: 3e5
    },
    (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        const status = res.statusCode ?? 0;
        if (status >= 200 && status < 300) resolve2();
        else reject(new Error(`NOS ${status}: ${Buffer.concat(chunks).toString()}`));
      });
    }
  );
  req.on("error", reject);
  req.on("timeout", () => req.destroy(new Error("NOS 上传超时")));
  let loaded = 0;
  const counter = new Transform({
    transform(chunk, _encoding, callback) {
      loaded += chunk.length;
      onBytes(loaded);
      callback(null, chunk);
    }
  });
  void pipeline(createReadStream(filePath), counter, req).catch(reject);
});
const uploadCloudSong = async (filePath, onProgress) => {
  const info = await stat(filePath);
  const fileSize = info.size;
  const fullName = path.basename(filePath);
  const ext = path.extname(fullName).slice(1).toLowerCase() || "mp3";
  const baseName = fullName.replace(/\.[^.]+$/, "");
  const mime = MIME_BY_EXT[ext] ?? "audio/mpeg";
  onProgress({ stage: "checking", loaded: 0, total: fileSize });
  const md52 = await fileMd5(filePath);
  let title = baseName;
  let artist2 = "未知艺术家";
  let album2 = "未知专辑";
  try {
    const tags = await getEngine().readTrackTags(filePath);
    if (tags.title) title = tags.title;
    if (tags.artist) artist2 = tags.artist;
    if (tags.album) album2 = tags.album;
  } catch (err) {
    cloudLog.warn(`读取标签失败,使用默认信息: ${fullName}`, err);
  }
  const checkRes = await callNetease("cloud_upload_check", {
    md5: md52,
    length: fileSize
  });
  const needUpload = Boolean(checkRes.body?.needUpload);
  const checkSongId = checkRes.body?.songId;
  cloudLog.info(`查重完成: ${fullName} needUpload=${needUpload} songId=${checkSongId}`);
  if (!needUpload) {
    onProgress({ stage: "finishing", loaded: fileSize, total: fileSize });
    const checkV2 = await callNetease("cloud_upload_check_v2", {
      md5: md52,
      fileSize
    });
    const matched = checkV2.body?.data?.[0];
    cloudLog.info(`秒传查重: ${fullName} upload=${matched?.upload} songId=${matched?.songId}`);
    if (!matched?.songId) throw new Error("秒传查重失败");
    const importRes = await callNetease("cloud_song_import", {
      songId: matched.songId,
      song: title,
      artist: artist2,
      album: album2,
      fileType: ext
    });
    cloudLog.info(`秒传导入完成: ${fullName} code=${importRes.body?.code}`);
    return { success: true, instant: true, songId: String(matched.songId) };
  }
  const tokenRes = await callNetease("cloud_nos_token", {
    ext,
    filename: baseName.replace(/\s/g, "").replace(/\./g, "_"),
    md5: md52
  });
  const result2 = tokenRes.body?.result;
  if (!result2?.objectKey || !result2?.token) throw new Error("获取上传 token 失败");
  const { token, objectKey, resourceId } = result2;
  onProgress({ stage: "uploading", loaded: 0, total: fileSize });
  const uploadHost = await fetchUploadHost();
  const objectPath = String(objectKey).replace(/\//g, "%2F");
  const uploadUrl = `${uploadHost}/${BUCKET}/${objectPath}?offset=0&complete=true&version=1.0`;
  await uploadToNos(
    uploadUrl,
    filePath,
    fileSize,
    token,
    md52,
    mime,
    (loaded) => onProgress({ stage: "uploading", loaded, total: fileSize })
  );
  onProgress({ stage: "finishing", loaded: fileSize, total: fileSize });
  const infoRes = await callNetease("cloud_upload_info", {
    md5: md52,
    songid: checkSongId,
    filename: fullName,
    song: title,
    album: album2,
    artist: artist2,
    resourceId
  });
  const songId = infoRes.body?.songId;
  if (songId == null) throw new Error("提交云盘信息失败");
  await callNetease("cloud_pub", { songid: songId });
  cloudLog.info(`上传发布完成: ${fullName} songId=${songId}`);
  return {
    success: true,
    instant: false,
    songId: String(songId)
  };
};
const AUDIO_EXTENSIONS = [
  "mp3",
  "flac",
  "wav",
  "m4a",
  "aac",
  "ogg",
  "opus",
  "wma",
  "ape",
  "aiff"
];
const PROGRESS_THROTTLE_MS = 200;
const registerCloudIpc = () => {
  ipcMain.handle("cloud:pickSongs", async () => {
    const result2 = await dialog.showOpenDialog({
      title: "选择要上传的歌曲",
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "音频文件", extensions: AUDIO_EXTENSIONS }]
    });
    if (result2.canceled) return [];
    const songs = [];
    for (const filePath of result2.filePaths) {
      try {
        const info = await stat(filePath);
        songs.push({ path: filePath, name: path.basename(filePath), size: info.size });
      } catch (err) {
        cloudLog.warn(`读取文件信息失败: ${filePath}`, err);
      }
    }
    return songs;
  });
  ipcMain.handle(
    "cloud:uploadSong",
    async (event, filePath, uploadId) => {
      let lastEmit = 0;
      try {
        const res = await uploadCloudSong(filePath, ({ stage, loaded, total }) => {
          const now = Date.now();
          if (stage === "uploading" && loaded > 0 && loaded < total && now - lastEmit < PROGRESS_THROTTLE_MS) {
            return;
          }
          lastEmit = now;
          const payload = { uploadId, stage, loaded, total };
          if (!event.sender.isDestroyed()) event.sender.send("cloud:upload-progress", payload);
        });
        cloudLog.info(`上传完成: ${filePath} (instant=${res.instant})`);
        return res;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        const matched = message.match(/^netease (\d+)/);
        cloudLog.error(`上传失败: ${filePath}`, err);
        return {
          success: false,
          instant: false,
          errorCode: matched ? Number(matched[1]) : void 0
        };
      }
    }
  );
};
const PLATFORM_SHORT_NAME = {
  netease: "NCM",
  qqmusic: "QM",
  kugou: "KG"
};
const ALL_PLATFORMS = ["netease", "qqmusic", "kugou"];
new Set(ALL_PLATFORMS);
const toStringId = (value) => {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "bigint") return String(value);
  return "";
};
const optionalString = (value) => {
  if (typeof value !== "string") return void 0;
  const text = value.trim();
  return text || void 0;
};
const normalizeNeteaseComment = (raw) => {
  const id = toStringId(raw.commentId ?? raw.beRepliedCommentId);
  const text = optionalString(raw.content);
  if (!id || !text) return null;
  const userId = toStringId(raw.user?.userId);
  const reply = (raw.beReplied ?? []).map((item2) => normalizeNeteaseComment(item2)).filter((item2) => item2 !== null);
  const item = {
    id,
    userName: optionalString(raw.user?.nickname) ?? "",
    text
  };
  if (userId) item.userId = userId;
  const avatar = optionalString(raw.user?.avatarUrl);
  if (avatar) item.avatar = avatar;
  if (typeof raw.time === "number") item.time = raw.time;
  const location = optionalString(raw.ipLocation?.location);
  if (location) item.location = location;
  if (typeof raw.likedCount === "number") item.likedCount = raw.likedCount;
  if (typeof raw.replyCount === "number") item.replyTotal = raw.replyCount;
  if (reply.length) item.reply = reply;
  return item;
};
const normalizeNeteaseCommentPage = (body, type, page, limit) => {
  const rawList = type === "hot" ? body.hotComments ?? body.data?.comments ?? [] : body.comments ?? body.data?.comments ?? [];
  const list2 = rawList.map((item) => normalizeNeteaseComment(item)).filter((item) => item !== null);
  return {
    list: list2,
    total: body.total ?? body.data?.totalCount ?? list2.length,
    page,
    limit
  };
};
const normalizeQQMusicComment = (raw) => {
  const id = optionalString(raw.CmId);
  const text = optionalString(raw.Content);
  if (!id || !text) return null;
  const rawReplies = raw.RepliedComments?.length ? raw.RepliedComments : raw.SubComments;
  const reply = (rawReplies ?? []).map((item2) => normalizeQQMusicComment(item2)).filter((item2) => item2 !== null);
  const item = {
    id,
    userName: optionalString(raw.Nick) ?? "",
    text
  };
  const userId = optionalString(raw.EncryptUin);
  if (userId) item.userId = userId;
  const avatar = optionalString(raw.Avatar)?.replace(/^http:/, "https:");
  if (avatar) item.avatar = avatar;
  if (typeof raw.PubTime === "number") item.time = raw.PubTime * 1e3;
  const location = optionalString(raw.Location);
  if (location) item.location = location;
  if (typeof raw.PraiseNum === "number") item.likedCount = raw.PraiseNum;
  if (typeof raw.ReplyCnt === "number") item.replyTotal = raw.ReplyCnt;
  const image = optionalString(raw.Pic)?.replace(/^http:/, "https:");
  if (image) item.images = [image];
  if (reply.length) item.reply = reply;
  return item;
};
const normalizeQQMusicCommentPage = (body, page, limit) => {
  const list2 = (body.comments ?? []).map((item) => normalizeQQMusicComment(item)).filter((item) => item !== null);
  return {
    list: list2,
    total: body.total ?? list2.length,
    page,
    limit,
    ...body.hasMore && body.nextCursor ? { nextCursor: body.nextCursor } : {}
  };
};
const normalizeKugouComment = (raw) => {
  const id = toStringId(raw.id);
  const text = optionalString(raw.content);
  if (!id || !text) return null;
  const item = {
    id,
    userName: optionalString(raw.user_name) ?? "",
    text
  };
  const userId = toStringId(raw.user_id);
  if (userId) item.userId = userId;
  const avatar = optionalString(raw.user_pic);
  if (avatar) item.avatar = avatar;
  const time = optionalString(raw.addtime);
  if (time) {
    const timestamp = new Date(time.replace(" ", "T")).getTime();
    if (Number.isFinite(timestamp)) item.time = timestamp;
  }
  const location = optionalString(raw.location);
  if (location) item.location = location;
  if (typeof raw.like?.count === "number") item.likedCount = raw.like.count;
  if (typeof raw.reply_num === "number") item.replyTotal = raw.reply_num;
  const images = (raw.images ?? []).map((image) => optionalString(image.url)).filter((image) => Boolean(image));
  if (images.length) item.images = images;
  return item;
};
const normalizeKugouCommentPage = (body, page, limit) => {
  const data2 = body.data ?? body;
  const list2 = (data2.list ?? []).map((item) => normalizeKugouComment(item)).filter((item) => item !== null);
  return {
    list: list2,
    total: data2.count ?? list2.length,
    page: data2.current_page ?? page,
    limit
  };
};
const buildCommentSources = (plugins) => {
  const sources = [
    {
      id: "builtin:netease",
      name: PLATFORM_SHORT_NAME.netease,
      kind: "builtin",
      platform: "netease"
    },
    {
      id: "builtin:qqmusic",
      name: PLATFORM_SHORT_NAME.qqmusic,
      kind: "builtin",
      platform: "qqmusic"
    },
    {
      id: "builtin:kugou",
      name: PLATFORM_SHORT_NAME.kugou,
      kind: "builtin",
      platform: "kugou",
      tabs: ["hot"]
    }
  ];
  for (const info of plugins) {
    if (!info.enabled || info.status.state !== "ready") continue;
    for (const [source, cap] of Object.entries(info.status.sources)) {
      if (!cap.actions.includes("musicSearch") || !cap.actions.includes("musicComment")) continue;
      sources.push({
        id: `plugin:${info.manifest.id}:${source}`,
        name: cap.name,
        kind: "plugin",
        pluginId: info.manifest.id,
        pluginSource: source
      });
    }
  }
  return sources;
};
const NETEASE_SOURCE_ID = "builtin:netease";
const QQMUSIC_SOURCE_ID = "builtin:qqmusic";
const KUGOU_SOURCE_ID = "builtin:kugou";
const NETEASE_RESOURCE_TYPE = "R_SO_4_";
const PLATFORM_TO_PLUGIN_SOURCE = {
  netease: "wy",
  qqmusic: "tx",
  kugou: "kg"
};
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;
const parsePluginSource = (sourceId) => {
  if (!sourceId.startsWith("plugin:")) return null;
  const rest = sourceId.slice("plugin:".length);
  const sep = rest.indexOf(":");
  if (sep <= 0) return null;
  return {
    pluginId: rest.slice(0, sep),
    source: rest.slice(sep + 1)
  };
};
const toKeyword = (track) => `${track.title} ${track.artists.map((artist2) => artist2.name).join(" ")}`.trim();
const toPluginCandidate = (track) => ({
  id: track.id,
  name: track.title,
  singer: track.artists.map((artist2) => artist2.name).join("/"),
  album: track.album?.name,
  durationMs: track.duration
});
const findPluginMatch = async (rt, source, track) => {
  if (PLATFORM_TO_PLUGIN_SOURCE[track.source] === source && track.id)
    return toPluginCandidate(track);
  const keyword = toKeyword(track);
  if (!keyword) return null;
  const res = await callMusicSearch(rt, { source, keyword, limit: 20 });
  const list2 = res?.list ?? [];
  const candidates = list2.map((item) => ({
    name: item.name,
    artist: item.singer ?? "",
    album: item.album,
    duration: item.durationMs,
    extra: item
  }));
  return pickBestCandidate(candidates, track)?.extra ?? null;
};
const findNeteaseId = async (track) => {
  if (track.source === "netease" && track.id) return track.id;
  const keyword = toKeyword(track);
  if (!keyword) return null;
  const { status, body } = await callNetease("search", {
    keywords: keyword,
    type: 1,
    limit: 20
  });
  if (status !== 200) return null;
  const songs = body.result?.songs ?? [];
  const candidates = songs.map(
    (song) => ({
      name: song.name ?? "",
      artist: (song.artists ?? []).map((artist2) => artist2.name).join(" / "),
      album: song.album?.name,
      duration: song.duration,
      extra: { id: String(song.id) }
    })
  );
  return pickBestCandidate(candidates, track)?.extra.id ?? null;
};
const getNeteaseComments = async (args) => {
  const id = await findNeteaseId(args.track);
  if (!id) return { list: [], total: 0, page: args.page, limit: args.limit };
  const apiName = args.type === "hot" ? "comment_hot" : "comment_music";
  const { body } = await callNetease(apiName, {
    id,
    type: NETEASE_RESOURCE_TYPE,
    limit: args.limit,
    offset: (args.page - 1) * args.limit
  });
  return normalizeNeteaseCommentPage(body, args.type, args.page, args.limit);
};
const findQQMusicId = async (track) => {
  if (track.source === "qqmusic") {
    return track.extId || (/^\d+$/.test(track.id) ? track.id : null);
  }
  const keyword = toKeyword(track);
  if (!keyword) return null;
  const body = await callQQMusic("search", { keywords: keyword, type: 0, page: 1, limit: 20 });
  const candidates = (body.songs ?? []).map(
    (song) => ({
      name: song.name ?? "",
      artist: song.artist ?? "",
      album: song.album,
      duration: song.duration,
      extra: { id: song.id ?? "" }
    })
  );
  return pickBestCandidate(candidates, track)?.extra.id || null;
};
const getQQMusicComments = async (args) => {
  const id = await findQQMusicId(args.track);
  if (!id) return { list: [], total: 0, page: args.page, limit: args.limit };
  const body = await callQQMusic("comment", {
    id,
    type: args.type,
    page: args.page,
    limit: args.limit,
    cursor: args.cursor
  });
  return normalizeQQMusicCommentPage(body, args.page, args.limit);
};
const findKugouId = async (track) => {
  if (track.source === "kugou" && track.extId) return track.extId;
  const keyword = toKeyword(track);
  if (!keyword) return null;
  const body = await callKugou("search", {
    keywords: keyword,
    type: 0,
    page: 1,
    limit: 20
  });
  const candidates = (body.songs ?? []).map((song) => ({
    name: song.name,
    artist: song.artist,
    album: song.album,
    duration: song.duration,
    extra: { id: song.albumAudioId ? String(song.albumAudioId) : "" }
  }));
  return pickBestCandidate(candidates, track)?.extra.id || null;
};
const getKugouComments = async (args) => {
  if (args.type !== "hot") return { list: [], total: 0, page: args.page, limit: args.limit };
  const id = await findKugouId(args.track);
  if (!id) return { list: [], total: 0, page: args.page, limit: args.limit };
  const body = await callKugou("comment", {
    id,
    page: args.page,
    limit: args.limit
  });
  return normalizeKugouCommentPage(body, args.page, args.limit);
};
const getPluginComments = async (parsed, args) => {
  const rt = pluginRegistry.getRuntime(parsed.pluginId);
  if (!rt || rt.status.state !== "ready") throw new Error("plugin comment source is not ready");
  try {
    const musicInfo = await findPluginMatch(rt, parsed.source, args.track);
    if (!musicInfo) return { list: [], total: 0, page: args.page, limit: args.limit };
    return await callMusicComment(rt, {
      source: parsed.source,
      musicInfo,
      type: args.type,
      page: args.page,
      limit: args.limit
    });
  } catch (err) {
    pluginLog.warn(
      "matchComment failed",
      parsed.pluginId,
      parsed.source,
      err instanceof Error ? err.message : String(err)
    );
    throw err;
  }
};
const normalizeQuery = (args) => ({
  ...args,
  page: Math.max(1, Math.floor(Number(args.page) || 1)),
  limit: Math.min(MAX_LIMIT, Math.max(1, Math.floor(Number(args.limit) || DEFAULT_LIMIT)))
});
const getCommentSources = () => buildCommentSources(pluginRegistry.listInfo());
const getMusicComments = async (args) => {
  const query = normalizeQuery(args);
  if (query.sourceId === NETEASE_SOURCE_ID) return getNeteaseComments(query);
  if (query.sourceId === QQMUSIC_SOURCE_ID) return getQQMusicComments(query);
  if (query.sourceId === KUGOU_SOURCE_ID) return getKugouComments(query);
  const parsed = parsePluginSource(query.sourceId);
  if (parsed) return getPluginComments(parsed, query);
  throw new Error(`unknown comment source: ${query.sourceId}`);
};
const registerCommentsIpc = () => {
  ipcMain.handle("comments:sources", () => getCommentSources());
  ipcMain.handle(
    "comments:get",
    async (_evt, args) => {
      try {
        return { ok: true, data: await getMusicComments(args) };
      } catch (err) {
        coreLog.warn("[comments] get failed:", err);
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
      }
    }
  );
};
const STORAGE_FILE = path.join(configDir, "ai-models.json");
const emptyState = () => ({ models: [], activeModelId: null });
const readPersisted = () => {
  try {
    const raw = JSON.parse(fs.readFileSync(STORAGE_FILE, "utf-8"));
    if (!Array.isArray(raw?.models)) return emptyState();
    const activeModelId = raw.models.some((model) => model.id === raw.activeModelId) ? raw.activeModelId : null;
    return { models: raw.models, activeModelId };
  } catch {
    return emptyState();
  }
};
const writePersisted = (state2) => {
  try {
    if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
    writeFileSync(STORAGE_FILE, JSON.stringify(state2, null, 2));
  } catch (error) {
    ipcLog.error("写入 AI 模型配置失败:", error);
    throw new Error("AI 模型配置保存失败");
  }
};
const encryptApiKey = (apiKey) => {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("系统安全存储不可用，无法保存 API Key");
  }
  return safeStorage.encryptString(apiKey).toString("base64");
};
const toPublicState = (state2) => ({
  activeModelId: state2.activeModelId,
  models: state2.models.map((model) => ({
    id: model.id,
    name: model.name,
    protocol: model.protocol,
    baseUrl: model.baseUrl,
    model: model.model,
    hasApiKey: Boolean(model.encryptedApiKey)
  }))
});
const normalizeInput = (input) => {
  const name = input.name?.trim();
  const baseUrl = input.baseUrl?.trim().replace(/\/+$/, "");
  const model = input.model?.trim();
  if (!name || !model || !/^https?:\/\//i.test(baseUrl)) {
    throw new Error("请填写有效的模型名称、API 地址和模型 ID");
  }
  if (input.protocol !== "openai-compatible" && input.protocol !== "anthropic") {
    throw new Error("不支持的 AI 模型协议");
  }
  return { name, protocol: input.protocol, baseUrl, model };
};
const listAiModels = () => toPublicState(readPersisted());
const saveAiModel = (input) => {
  const state2 = readPersisted();
  const normalized = normalizeInput(input);
  const existing = input.id ? state2.models.find((item) => item.id === input.id) : void 0;
  if (input.id && !existing) throw new Error("AI 模型配置不存在");
  const encryptedApiKey = input.apiKey?.trim() ? encryptApiKey(input.apiKey.trim()) : existing?.encryptedApiKey ?? "";
  if (!encryptedApiKey) throw new Error("请填写 API Key");
  const saved = {
    id: existing?.id ?? randomUUID(),
    ...normalized,
    encryptedApiKey
  };
  if (existing) state2.models.splice(state2.models.indexOf(existing), 1, saved);
  else state2.models.push(saved);
  if (!state2.activeModelId) state2.activeModelId = saved.id;
  writePersisted(state2);
  return toPublicState(state2);
};
const removeAiModel = (id) => {
  const state2 = readPersisted();
  state2.models = state2.models.filter((model) => model.id !== id);
  if (state2.activeModelId === id) state2.activeModelId = null;
  writePersisted(state2);
  return toPublicState(state2);
};
const setActiveAiModel = (id) => {
  const state2 = readPersisted();
  if (id !== null && !state2.models.some((model) => model.id === id)) {
    throw new Error("AI 模型配置不存在");
  }
  state2.activeModelId = id;
  writePersisted(state2);
  return toPublicState(state2);
};
const registerAiModelIpc = () => {
  ipcMain.handle("aiModel:list", listAiModels);
  ipcMain.handle("aiModel:save", (_event, input) => saveAiModel(input));
  ipcMain.handle("aiModel:remove", (_event, id) => removeAiModel(id));
  ipcMain.handle("aiModel:setActive", (_event, id) => setActiveAiModel(id));
};
const toSummary = (row) => ({
  id: row.id,
  type: row.type,
  title: row.title,
  description: row.description ?? void 0,
  cover: row.cover ?? void 0,
  trackCount: row.track_count,
  createTime: row.created_at,
  updateTime: row.updated_at
});
const SELECT_PLAYLIST = `
  SELECT
    p.id,
    p.type,
    p.title,
    p.description,
    p.cover,
    p.created_at,
    p.updated_at,
    COUNT(pt.track_id) AS track_count
  FROM playlists p
  LEFT JOIN playlist_tracks pt ON pt.playlist_id = p.id
`;
const getPlaylists = () => {
  const rows = getDb().prepare(
    `${SELECT_PLAYLIST} WHERE p.type = 'local' GROUP BY p.id ORDER BY p.created_at DESC, p.id`
  ).all();
  return rows.map(toSummary);
};
const getPlaylist = (id) => {
  const row = getDb().prepare(`${SELECT_PLAYLIST} WHERE p.id = ? AND p.type = 'local' GROUP BY p.id`).get(id);
  if (!row) return null;
  const trackIds = getDb().prepare(
    `SELECT pt.track_id
       FROM playlist_tracks pt
       INNER JOIN tracks t ON t.id = pt.track_id
       WHERE pt.playlist_id = ?
       ORDER BY pt.position, pt.added_at, pt.track_id`
  ).all(id);
  const fetched = getTracksByIds$1(trackIds.map((item) => item.track_id));
  const byId = new Map(fetched.map((track) => [track.id, track]));
  return {
    ...toSummary(row),
    tracks: trackIds.flatMap((item) => {
      const track = byId.get(item.track_id);
      return track ? [track] : [];
    })
  };
};
const createPlaylist = (input) => {
  const title = input.title.trim();
  if (!title) throw new Error("歌单名称不能为空");
  if (input.type !== "local") throw new Error("歌单类型无效");
  const now = Date.now();
  const id = `pl_${crypto.randomUUID()}`;
  getDb().prepare(
    `INSERT INTO playlists
        (id, type, title, description, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, input.type, title, input.description?.trim() || null, now, now);
  return getPlaylists().find((playlist2) => playlist2.id === id);
};
const updatePlaylist = (id, input) => {
  const current2 = getPlaylists().find((playlist2) => playlist2.id === id);
  if (!current2) return null;
  const title = input.title?.trim() ?? current2.title;
  if (!title) throw new Error("歌单名称不能为空");
  getDb().prepare(
    `UPDATE playlists
       SET title = ?, description = ?, cover = ?, updated_at = ?
       WHERE id = ?`
  ).run(
    title,
    input.description === void 0 ? current2.description ?? null : input.description || null,
    input.cover === void 0 ? current2.cover ?? null : input.cover || null,
    Date.now(),
    id
  );
  return getPlaylists().find((playlist2) => playlist2.id === id) ?? null;
};
const deletePlaylist = (id) => {
  getDb().transaction(() => {
    getDb().prepare("DELETE FROM playlist_tracks WHERE playlist_id = ?").run(id);
    getDb().prepare("DELETE FROM playlists WHERE id = ?").run(id);
  })();
};
const addPlaylistTracks = (id, trackIds) => {
  const playlist2 = getPlaylists().find((item) => item.id === id);
  if (!playlist2 || playlist2.type !== "local") return 0;
  const uniqueIds = [...new Set(trackIds)];
  if (uniqueIds.length === 0) return 0;
  const database = getDb();
  return database.transaction(() => {
    const existing = database.prepare("SELECT track_id FROM playlist_tracks WHERE playlist_id = ?").all(id);
    const existingIds = new Set(existing.map((item) => item.track_id));
    const validIds = uniqueIds.filter((trackId) => {
      if (existingIds.has(trackId)) return false;
      return Boolean(database.prepare("SELECT 1 FROM tracks WHERE id = ?").get(trackId));
    });
    if (validIds.length === 0) return 0;
    database.prepare("UPDATE playlist_tracks SET position = position + ? WHERE playlist_id = ?").run(validIds.length, id);
    const insert = database.prepare(
      `INSERT INTO playlist_tracks (playlist_id, track_id, position, added_at)
       VALUES (?, ?, ?, ?)`
    );
    const now = Date.now();
    validIds.forEach((trackId, position) => insert.run(id, trackId, position, now));
    const coverRow = database.prepare(
      `SELECT cover FROM tracks WHERE id IN (${validIds.map(() => "?").join(",")}) AND cover IS NOT NULL LIMIT 1`
    ).get(...validIds);
    database.prepare("UPDATE playlists SET cover = COALESCE(?, cover), updated_at = ? WHERE id = ?").run(coverRow?.cover ?? null, now, id);
    return validIds.length;
  })();
};
const removePlaylistTracks = (id, trackIds) => {
  const playlist2 = getPlaylists().find((item) => item.id === id);
  if (!playlist2 || playlist2.type !== "local") return 0;
  const ids = [...new Set(trackIds)];
  if (ids.length === 0) return 0;
  const database = getDb();
  return database.transaction(() => {
    const removed = database.prepare(
      `DELETE FROM playlist_tracks
         WHERE playlist_id = ? AND track_id IN (${ids.map(() => "?").join(",")})`
    ).run(id, ...ids).changes;
    if (removed === 0) return 0;
    const remaining = database.prepare("SELECT track_id FROM playlist_tracks WHERE playlist_id = ? ORDER BY position").all(id);
    const updatePosition = database.prepare(
      "UPDATE playlist_tracks SET position = ? WHERE playlist_id = ? AND track_id = ?"
    );
    remaining.forEach((item, position) => updatePosition.run(position, id, item.track_id));
    database.prepare(
      "UPDATE playlists SET cover = CASE WHEN ? = 0 THEN NULL ELSE cover END, updated_at = ? WHERE id = ?"
    ).run(remaining.length, Date.now(), id);
    return removed;
  })();
};
const importLegacyPlaylists = (records) => {
  if (records.length === 0) return;
  const database = getDb();
  database.transaction(() => {
    const insertPlaylist = database.prepare(
      `INSERT OR IGNORE INTO playlists
        (id, type, title, description, cover, created_at, updated_at)
       VALUES (?, 'local', ?, ?, ?, ?, ?)`
    );
    const insertTrack = database.prepare(
      `INSERT OR IGNORE INTO playlist_tracks (playlist_id, track_id, position, added_at)
       SELECT ?, ?, ?, ? WHERE EXISTS (SELECT 1 FROM tracks WHERE id = ?)`
    );
    const now = Date.now();
    for (const record of records) {
      const createdAt = record.createTime ?? now;
      const updatedAt = record.updateTime ?? createdAt;
      insertPlaylist.run(
        record.id,
        record.title,
        record.description ?? null,
        record.cover ?? null,
        createdAt,
        updatedAt
      );
      record.trackIds.forEach(
        (trackId, position) => insertTrack.run(record.id, trackId, position, updatedAt, trackId)
      );
    }
  })();
};
const clearPlaylists = () => {
  const database = getDb();
  database.transaction(() => {
    database.prepare("DELETE FROM playlist_tracks").run();
    database.prepare("DELETE FROM playlists").run();
  })();
};
const registerPlaylistIpc = () => {
  ipcMain.handle("playlist:list", getPlaylists);
  ipcMain.handle("playlist:get", (_event, id) => getPlaylist(id));
  ipcMain.handle("playlist:create", (_event, input) => createPlaylist(input));
  ipcMain.handle(
    "playlist:update",
    (_event, id, input) => updatePlaylist(id, input)
  );
  ipcMain.handle("playlist:remove", (_event, id) => deletePlaylist(id));
  ipcMain.handle(
    "playlist:addTracks",
    (_event, id, trackIds) => addPlaylistTracks(id, trackIds)
  );
  ipcMain.handle(
    "playlist:removeTracks",
    (_event, id, trackIds) => removePlaylistTracks(id, trackIds)
  );
  ipcMain.handle(
    "playlist:importLegacy",
    (_event, records) => importLegacyPlaylists(records)
  );
  ipcMain.handle("playlist:clear", clearPlaylists);
};
const matchAudio = async (fingerprint, durationSec) => {
  try {
    const response = await callNetease("audio_match", {
      audioFP: fingerprint,
      duration: durationSec
    });
    const body = response.body;
    if (body.code !== 200) {
      recognitionLog.error(`音频匹配接口错误: code=${body.code}`);
      return { ok: false, code: "network" };
    }
    const songs = (body.data?.result ?? []).filter((item) => !!item.song).slice(0, 3).map((item) => ({ song: item.song, startTime: item.startTime }));
    return { ok: true, songs };
  } catch (error) {
    recognitionLog.error("音频匹配请求失败:", error);
    return { ok: false, code: "network" };
  }
};
let worker = null;
let nextId = 1;
const pending = /* @__PURE__ */ new Map();
const toResult = (res) => res.ok ? { ok: true, fingerprint: res.fingerprint ?? "" } : { ok: false, error: res.error ?? "unknown" };
const resolveAfpDir = () => {
  const dir = app.isPackaged ? path.join(process.resourcesPath, "afp") : path.join(app.getAppPath(), "resources", "afp");
  const files = ["afp.mjs", "afp.wasm.mjs"];
  return files.every((file) => fs.existsSync(path.join(dir, file))) ? dir : null;
};
const getWorker = () => {
  if (worker) return worker;
  const entry = path.join(__dirname, "fingerprint.worker.js");
  const next = new Worker(entry, {
    workerData: { afpDir: resolveAfpDir() }
  });
  next.on("message", (msg) => {
    const resolve2 = pending.get(msg.id);
    if (resolve2) {
      pending.delete(msg.id);
      resolve2(msg);
    }
  });
  next.on("error", (error) => {
    recognitionLog.error("指纹 Worker 异常:", error);
    for (const resolve2 of pending.values()) {
      resolve2({ id: 0, ok: false, error: error.message });
    }
    pending.clear();
    worker = null;
  });
  next.on("exit", () => {
    worker = null;
  });
  worker = next;
  return next;
};
const fingerprintPcm = (pcm) => new Promise((resolve2) => {
  const id = nextId++;
  pending.set(id, (res) => resolve2(toResult(res)));
  getWorker().postMessage({ id, pcm });
});
const isAfpAvailable = () => {
  if (process.env.SPLAYER_AFP_FIXTURE === "1") return true;
  return resolveAfpDir() !== null;
};
const SILENCE_RMS_THRESHOLD = 5e-3;
const WINDOW_SAMPLES = 3 * 8e3;
const STEP_SAMPLES = 1 * 8e3;
let audioCapture = null;
const getAudioCapture = () => {
  if (audioCapture) return audioCapture;
  audioCapture = loadNativeModule("audio-capture.node", "audio-capture");
  return audioCapture;
};
let activeSession = null;
let wasPlaying = false;
let sessionToken = 0;
const emit = (event) => {
  broadcast("recognition:event", event, event.phase === "capturing");
};
const mapErrorCode = (code) => {
  switch (code) {
    case "unsupported":
      return "unsupported";
    case "no-device":
      return "no-device";
    case "permission-denied":
      return "permission-denied";
    case "capture-failed":
      return "capture-failed";
    default:
      return "unknown";
  }
};
const rms = (pcm) => {
  let energy = 0;
  for (let i = 0; i < pcm.length; i++) {
    energy += pcm[i] * pcm[i];
  }
  return Math.sqrt(energy / Math.max(1, pcm.length));
};
const TARGET_RMS = 0.1;
const MAX_GAIN = 50;
const normalizeLevel = (pcm) => {
  const current2 = rms(pcm);
  if (current2 <= 0) return pcm;
  const gain = Math.min(MAX_GAIN, TARGET_RMS / current2);
  if (gain <= 1) return pcm;
  const out = new Float32Array(pcm.length);
  for (let i = 0; i < pcm.length; i++) {
    out[i] = pcm[i] * gain;
  }
  return out;
};
const finishSession = () => {
  activeSession = null;
  if (wasPlaying) {
    wasPlaying = false;
    getPlayer().play().catch((error) => recognitionLog.error("恢复播放失败:", error));
  }
};
const emitError = (code, message) => {
  recognitionLog.warn(`识别失败 [${code}]: ${message}`);
  emit({ phase: "error", error: { code, message } });
  finishSession();
};
const startRecognition = (config) => {
  cancelRecognition();
  const mod = getAudioCapture();
  if (!mod || !mod.AudioCaptureSession) {
    emitError("unsupported", "当前环境不支持本机采集");
    return;
  }
  const inst = new mod.AudioCaptureSession();
  if (!inst.isSupported()) {
    emitError("unsupported", "当前平台不支持本机采集");
    return;
  }
  if (!isAfpAvailable()) {
    emitError("afp-unavailable", "音频指纹库不可用");
    return;
  }
  wasPlaying = getPlayer().getStatus().state === "playing";
  if (wasPlaying) getPlayer().pause();
  activeSession = inst;
  sessionToken++;
  emit({ phase: "capturing" });
  try {
    inst.start(
      { source: config.source, durationMs: config.durationMs },
      (event) => {
        void handleCaptureEvent(event);
      }
    );
  } catch (error) {
    emitError("capture-failed", error instanceof Error ? error.message : String(error));
  }
};
const handleCaptureEvent = async (event) => {
  if (event.eventType === "level") {
    emit({ phase: "capturing", level: event.level ?? 0 });
    return;
  }
  if (event.eventType === "error") {
    emitError(mapErrorCode(event.errorCode), event.error ?? "未知采集错误");
    return;
  }
  if (!event.data) {
    finishSession();
    return;
  }
  const pcm = new Float32Array(event.data.buffer, event.data.byteOffset, event.data.length / 4);
  void recognizePcm(pcm);
};
const recognizePcm = async (pcm) => {
  const token = sessionToken;
  const normalized = normalizeLevel(pcm);
  if (rms(normalized) < SILENCE_RMS_THRESHOLD) {
    emitError("silent-input", "没有采集到声音，请检查音频输出");
    return;
  }
  emit({ phase: "fingerprinting" });
  const windows = [];
  for (let start = 0; start + WINDOW_SAMPLES <= normalized.length; start += STEP_SAMPLES) {
    windows.push({ start, pcm: normalized.subarray(start, start + WINDOW_SAMPLES) });
  }
  if (windows.length === 0) {
    windows.push({ start: 0, pcm: normalized });
  }
  let candidates = [];
  for (const window of windows) {
    if (token !== sessionToken) return;
    const fingerprint = await fingerprintPcm(window.pcm);
    if (token !== sessionToken) return;
    if (!fingerprint.ok) {
      emitError(
        fingerprint.error === "afp-unavailable" ? "afp-unavailable" : "unknown",
        fingerprint.error
      );
      return;
    }
    emit({ phase: "matching" });
    const match2 = await matchAudio(fingerprint.fingerprint, WINDOW_SAMPLES / 8e3);
    if (token !== sessionToken) return;
    if (!match2.ok) {
      emitError("network", "音频匹配服务不可用");
      return;
    }
    if (match2.songs.length === 0) continue;
    candidates = match2.songs.map((item) => ({
      songId: String(item.song.id),
      title: item.song.name,
      artists: (item.song.artists ?? []).map((artist2) => artist2.name),
      album: item.song.album?.name,
      cover: item.song.album?.picUrl,
      startTime: (item.startTime ?? 0) + window.start / 8e3
    }));
    break;
  }
  recognitionLog.info(`识别完成，候选 ${candidates.length} 个`);
  emit({ phase: "done", candidates });
  finishSession();
};
const submitPcm = (pcm) => {
  if (!(pcm instanceof Float32Array) || pcm.length === 0) {
    emitError("capture-failed", "渲染进程提交了无效的 PCM");
    return;
  }
  if (!isAfpAvailable()) {
    emitError("afp-unavailable", "音频指纹库不可用");
    return;
  }
  sessionToken++;
  emit({ phase: "capturing" });
  void recognizePcm(pcm);
};
const cancelRecognition = () => {
  sessionToken++;
  activeSession?.cancel();
  finishSession();
};
const isRecognitionSupported = () => {
  const mod = getAudioCapture();
  if (!mod || !mod.AudioCaptureSession) return false;
  return new mod.AudioCaptureSession().isSupported();
};
const registerRecognitionIpc = () => {
  ipcMain.handle("recognition:isSupported", () => isRecognitionSupported());
  ipcMain.handle("recognition:start", (_event, config) => {
    startRecognition(config);
    return { success: true };
  });
  ipcMain.handle("recognition:cancel", () => {
    cancelRecognition();
    return { success: true };
  });
  ipcMain.handle("recognition:submitPcm", (_event, pcm) => {
    submitPcm(pcm);
    return { success: true };
  });
};
let native = null;
const getNative = () => {
  if (native) return native;
  native = loadNativeModule("opencc.node", "opencc");
  return native;
};
const convertText = (text, config) => {
  if (!text || !config || config === "none") return text;
  const mod = getNative();
  if (!mod) return text;
  try {
    return mod.convert(text, config);
  } catch (error) {
    nativeLog.error("[OpenCC] 文本转换失败:", error);
    return text;
  }
};
const convertTexts = (texts, config) => {
  if (!texts || texts.length === 0 || !config || config === "none") return texts;
  const mod = getNative();
  if (!mod) return texts;
  try {
    return mod.convertBatch(texts, config);
  } catch (error) {
    nativeLog.error("[OpenCC] 批量转换失败:", error);
    return texts;
  }
};
const registerOpenccIpc = () => {
  ipcMain.handle("opencc:convert", (_evt, text, config) => {
    return convertText(text, config);
  });
  ipcMain.handle(
    "opencc:convertBatch",
    (_evt, texts, config) => {
      return convertTexts(texts, config);
    }
  );
};
const registerIpcHandlers = () => {
  registerSystemIpc();
  registerPlayerIpc();
  registerConfigIpc();
  registerLibraryIpc();
  registerNowPlayingIpc();
  registerWindowIpc();
  registerPluginIpc();
  registerApisIpc();
  registerCloudIpc();
  registerCommentsIpc();
  registerLyricsIpc();
  registerOpenccIpc();
  registerHotkeyIpc();
  registerThemeIpc();
  registerStreamingIpc();
  registerPlaylistIpc();
  registerRecognitionIpc();
  registerLastfmIpc();
  registerCacheIpc();
  registerDownloadIpc();
  registerExternalApiIpc();
  registerMcpIpc();
  registerAiModelIpc();
  registerStatsIpc();
  registerUpdateIpc();
};
let lyricLines = [];
let currentIndex = -1;
let lyricOffsetMs = 0;
let lastPluginState = "paused";
let unsubscribers = [];
let offRegistryEvents = null;
const toPluginState = (state2) => state2 === "playing" ? "playing" : state2 === "stopped" ? "stopped" : "paused";
const findIndex = (time) => {
  let result2 = -1;
  for (let index = 0; index < lyricLines.length; index++) {
    if (lyricLines[index].startTime <= time) result2 = index;
    else break;
  }
  return result2;
};
const onTrackChange = (data2) => {
  lyricLines = [];
  currentIndex = -1;
  pluginRegistry.broadcastPlaybackEvent("trackChange", { track: data2.track });
};
const reEmitLine = (position) => {
  const next = lyricLines.length > 0 ? findIndex(position + lyricOffsetMs) : -1;
  if (next === currentIndex) return;
  currentIndex = next;
  pluginRegistry.broadcastPlaybackEvent("lineChange", { index: next, position });
};
const onLyricChange = (snap) => {
  lyricLines = snap.lyric;
  currentIndex = -1;
  lyricOffsetMs = snap.lyricOffsetMs;
  pluginRegistry.broadcastPlaybackEvent("lyricChange", { lines: lyricLines });
  reEmitLine(snap.position);
};
const onLyricOffsetChange = (data2) => {
  lyricOffsetMs = data2.offsetMs;
  reEmitLine(snapshot().position);
};
const onPositionSync = (data2) => {
  const pluginState = toPluginState(data2.state);
  if (pluginState !== lastPluginState) {
    lastPluginState = pluginState;
    pluginRegistry.broadcastPlaybackEvent("playStateChange", {
      state: pluginState,
      position: data2.position
    });
  }
  if (lyricLines.length === 0) return;
  const next = findIndex(data2.position + lyricOffsetMs);
  if (next === currentIndex) return;
  currentIndex = next;
  pluginRegistry.broadcastPlaybackEvent("lineChange", { index: next, position: data2.position });
};
const primeState = () => {
  const snap = snapshot();
  lyricLines = snap.lyric;
  lyricOffsetMs = snap.lyricOffsetMs;
  lastPluginState = toPluginState(snap.state);
  currentIndex = lyricLines.length > 0 ? findIndex(snap.position + lyricOffsetMs) : -1;
};
const primePlugin = (id) => {
  const snap = snapshot();
  const send = (event, data2) => pluginRegistry.sendPlaybackEventTo(id, event, data2);
  send("trackChange", { track: snap.track });
  send("lyricChange", { lines: snap.lyric });
  send("playStateChange", { state: toPluginState(snap.state), position: snap.position });
  const index = snap.lyric.length > 0 ? findIndex(snap.position + snap.lyricOffsetMs) : -1;
  if (index >= 0) send("lineChange", { index, position: snap.position });
};
const attach = () => {
  if (unsubscribers.length > 0) return;
  unsubscribers = [
    onTrackChange$1(onTrackChange),
    onLyricChange$1(onLyricChange),
    onLyricOffsetChange$1(onLyricOffsetChange),
    onPositionSync$1(onPositionSync)
  ];
  primeState();
};
const detach = () => {
  for (const unsub of unsubscribers) {
    try {
      unsub();
    } catch {
    }
  }
  unsubscribers = [];
  lyricLines = [];
  currentIndex = -1;
  lyricOffsetMs = 0;
  lastPluginState = "paused";
};
const init = () => {
  if (pluginRegistry.hasEnabledControlPlugin()) attach();
  const onControlActivity = (active2) => active2 ? attach() : detach();
  const onControlReady = (id) => primePlugin(id);
  pluginRegistry.on("controlActivityChange", onControlActivity);
  pluginRegistry.on("controlPluginReady", onControlReady);
  offRegistryEvents = () => {
    pluginRegistry.off("controlActivityChange", onControlActivity);
    pluginRegistry.off("controlPluginReady", onControlReady);
  };
};
const dispose = () => {
  offRegistryEvents?.();
  offRegistryEvents = null;
  detach();
};
const configureMemoryOptimizations = () => {
  app.commandLine.appendSwitch("disable-features", "SpareRendererForSitePerProcess");
};
const MEMORY_LOG_INTERVAL_MS = 10 * 60 * 1e3;
const MEMORY_LOG_FIRST_DELAY_MS = 60 * 1e3;
const logProcessMemory = () => {
  const windowPids = /* @__PURE__ */ new Map();
  const namedWindows = [
    ["main", getMainWindow()],
    ["desktop-lyric", getDesktopLyricWindow()],
    ["dynamic-island", getDynamicIslandWindow()],
    ["taskbar-lyric", getTaskbarLyricWindow()]
  ];
  for (const [name, win] of namedWindows) {
    if (win && !win.isDestroyed()) windowPids.set(win.webContents.getOSProcessId(), name);
  }
  const parts = app.getAppMetrics().map((metric) => {
    const mb = Math.round(metric.memory.workingSetSize / 1024);
    const detail = windowPids.get(metric.pid) ?? metric.name ?? metric.serviceName;
    const label = detail ? `${metric.type}(${detail})` : metric.type;
    return `${label} ${mb}MB`;
  });
  coreLog.info(`内存占用: ${parts.join(" | ")}`);
};
const initApp = () => {
  configureMemoryOptimizations();
  initLogger();
  const gotLock = app.requestSingleInstanceLock();
  if (!gotLock) {
    app.quit();
    return;
  }
  app.on("second-instance", (_event, commandLine) => {
    focusMainWindow();
    const url = extractOrpheusUrl(commandLine);
    if (url) captureOrpheusUrl(url);
    const files = extractAudioFiles(commandLine);
    if (files.length > 0) captureAudioFiles(files);
  });
  app.on("open-url", (event, url) => {
    event.preventDefault();
    captureOrpheusUrl(url);
  });
  app.on("open-file", (event, path2) => {
    event.preventDefault();
    captureAudioFiles([path2]);
  });
  registerCacheScheme();
  app.whenReady().then(() => {
    electronApp.setAppUserModelId("top.imsyy.splayer-next");
    handleCacheProtocol();
    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });
    registerIpcHandlers();
    initDatabase();
    createMainWindow();
    initOrpheusRegistration();
    const coldOrpheusUrl = extractOrpheusUrl(process.argv);
    if (coldOrpheusUrl) captureOrpheusUrl(coldOrpheusUrl);
    const coldAudioFiles = extractAudioFiles(process.argv);
    if (coldAudioFiles.length > 0) captureAudioFiles(coldAudioFiles);
    void init$2();
    void init$1();
    init$4();
    init$3();
    pluginRegistry.init();
    init();
    restoreLyricWindows();
    initGlobalHotkey();
    void startServer();
    void startMcpServer();
    initUpdater();
    setTimeout(logProcessMemory, MEMORY_LOG_FIRST_DELAY_MS);
    setInterval(logProcessMemory, MEMORY_LOG_INTERVAL_MS);
    app.on("activate", () => {
      if (isMac) {
        if (getMainWindow()) focusMainWindow();
        else createMainWindow();
        return;
      }
      if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
    coreLog.info("应用初始化完成");
  });
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
  app.on("before-quit", () => {
    coreLog.info("应用即将退出，清理资源");
    shutdown();
    closeDatabase();
    void stopServer();
    void stopMcpServer();
    void pluginRegistry.shutdown();
    dispose();
    disposeUpdater();
  });
};
initApp();
