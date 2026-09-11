import os from "os";
import { contextBridge, ipcRenderer, webUtils } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
const subscribe = (channel, callback) => {
  const handler = (_event, data) => callback(data);
  ipcRenderer.on(channel, handler);
  return () => ipcRenderer.removeListener(channel, handler);
};
const getInstallType = () => {
  if (process.env.PORTABLE_EXECUTABLE_DIR) return "portable";
  if (process.execPath.includes("WindowsApps")) return "appx";
  if (process.platform === "darwin") return "dmg";
  if (process.platform === "linux") return "appimage";
  return "nsis";
};
const api = {
  config: {
    get: (keyPath) => ipcRenderer.invoke("config:get", keyPath),
    set: (keyPath, value) => ipcRenderer.invoke("config:set", keyPath, value),
    getAll: () => ipcRenderer.invoke("config:getAll"),
    reset: () => ipcRenderer.invoke("config:reset"),
    replaceAll: (config) => ipcRenderer.invoke("config:replaceAll", config),
    exportToFile: (payload) => ipcRenderer.invoke("config:exportToFile", payload),
    importFromFile: () => ipcRenderer.invoke("config:importFromFile")
  },
  player: {
    // 加载音频（本地路径或网络地址）
    load: (source, options) => ipcRenderer.invoke("player:load", source, options ?? {}),
    // 恢复播放
    play: () => ipcRenderer.invoke("player:play"),
    // 暂停播放
    pause: () => ipcRenderer.invoke("player:pause"),
    // 停止播放
    stop: () => ipcRenderer.invoke("player:stop"),
    // 跳转到指定位置（毫秒）
    seek: (position) => ipcRenderer.invoke("player:seek", position),
    // 设置音量（0.0 ~ 1.0）
    setVolume: (volume) => ipcRenderer.invoke("player:setVolume", volume),
    // 设置输出设备切换时暂停播放
    setPauseOnDeviceSwitch: (enabled) => ipcRenderer.invoke("player:setPauseOnDeviceSwitch", enabled),
    // 获取当前音量
    getVolume: () => ipcRenderer.invoke("player:getVolume"),
    // 设置暂停/恢复时的渐变时长（毫秒），0 表示禁用
    setFadeDuration: (ms) => ipcRenderer.invoke("player:setFadeDuration", ms),
    // 获取当前渐变时长（毫秒）
    getFadeDuration: () => ipcRenderer.invoke("player:getFadeDuration"),
    // 获取播放状态快照
    getStatus: () => ipcRenderer.invoke("player:getStatus"),
    // 获取 FFT 频谱数据
    getFftData: () => ipcRenderer.invoke("player:getFftData"),
    // 启用/禁用 FFT 频谱推送
    setFftEnabled: (enabled) => ipcRenderer.invoke("player:setFftEnabled", enabled),
    // 启用/禁用音量均衡
    setNormalizationEnabled: (enabled) => ipcRenderer.invoke("player:setNormalizationEnabled", enabled),
    // 启用/禁用 10 频段均衡器
    setEqualizerEnabled: (enabled) => ipcRenderer.invoke("player:setEqualizerEnabled", enabled),
    // 更新均衡器各频段增益（dB 数组，长度 10）
    setEqualizerBands: (gainsDb) => ipcRenderer.invoke("player:setEqualizerBands", gainsDb),
    // 设置前级增益（dB）
    setPreampGain: (preampDb) => ipcRenderer.invoke("player:setPreampGain", preampDb),
    // 设置播放速度（0.5 ~ 2.0），引擎侧自动 clamp
    setSpeed: (speed) => ipcRenderer.invoke("player:setSpeed", speed),
    // 设置音调偏移（半音 -12 ~ 12），引擎侧自动 clamp
    setPitch: (semitones) => ipcRenderer.invoke("player:setPitch", semitones),
    // 设置"音调同步"开关（true = 变速保音调）
    setPitchSync: (sync) => ipcRenderer.invoke("player:setPitchSync", sync),
    // 重建音频输出设备
    reinit: () => ipcRenderer.invoke("player:reinit"),
    // 获取所有音频输出设备
    getOutputDevices: () => ipcRenderer.invoke("player:getOutputDevices"),
    // 获取系统默认输出设备名称
    getDefaultDeviceName: () => ipcRenderer.invoke("player:getDefaultDeviceName"),
    // 切换输出设备（传设备 ID，null 使用系统默认）
    setOutputDevice: (deviceId, pauseBeforeSwitch = false) => ipcRenderer.invoke("player:setOutputDevice", deviceId, pauseBeforeSwitch),
    // 获取当前选择的输出设备 ID
    getSelectedDeviceName: () => ipcRenderer.invoke("player:getSelectedDeviceName"),
    // 获取当前歌曲的原始高清封面（base64 data URL）
    getCoverRaw: () => ipcRenderer.invoke("player:getCoverRaw"),
    // 按需读取外部歌词文件内容
    readLyricFile: (filePath) => ipcRenderer.invoke("player:readLyricFile", filePath),
    // 同步播放模式到主进程（供托盘菜单显示）
    syncPlayMode: (repeatMode, shuffleMode) => ipcRenderer.send("player:syncPlayMode", repeatMode, shuffleMode),
    // 同步当前歌曲喜欢状态到主进程（供托盘菜单显示）
    syncLikeState: (liked) => ipcRenderer.send("player:syncLikeState", liked),
    // 广播播放控制事件到所有渲染进程
    dispatch: (type) => ipcRenderer.send("player:dispatch", type),
    // 订阅主进程推送的播放事件
    onEvent: (callback) => subscribe("player:event", callback)
  },
  system: {
    installType: getInstallType(),
    platform: process.platform,
    osInfo: {
      type: os.type(),
      arch: os.arch(),
      release: os.release()
    },
    // 打开开发者工具
    toggleDevTools: () => ipcRenderer.invoke("system:toggleDevTools"),
    // 在文件管理器中显示文件
    showInExplorer: (filePath) => ipcRenderer.invoke("system:showInExplorer", filePath),
    // 打开日志目录
    openLogsDir: () => ipcRenderer.invoke("system:openLogsDir"),
    // 同步语言到主进程
    setLocale: (locale) => ipcRenderer.send("system:setLocale", locale),
    // 显示并聚焦主窗口
    focusMainWindow: () => ipcRenderer.invoke("system:focusMainWindow"),
    // 在主窗口打开设置弹窗
    openSettings: (category, highlight) => ipcRenderer.invoke("system:openSettings", category, highlight),
    // 主窗口监听"打开设置"事件
    onOpenSettings: (callback) => subscribe("system:openSettings", callback),
    // 获取系统已安装字体
    listFonts: () => ipcRenderer.invoke("system:listFonts"),
    // 拉远端字节回渲染层
    fetchRemoteBytes: (url) => ipcRenderer.invoke("system:fetchRemoteBytes", url),
    // 保存文件到下载目录
    saveFile: (data, defaultName) => ipcRenderer.invoke("system:saveFile", data, defaultName),
    // 重启应用
    relaunch: () => ipcRenderer.invoke("system:relaunch"),
    // 测试当前网络代理
    testNetworkProxy: () => ipcRenderer.invoke("system:testNetworkProxy"),
    // 订阅主进程下发的 orpheus 唤起 URL
    onProtocolUrl: (callback) => subscribe("protocol:orpheus", callback),
    // 拉取冷启动暂存的 orpheus 唤起 URL
    consumePendingProtocolUrl: () => ipcRenderer.invoke("system:consumePendingProtocolUrl"),
    // 订阅主进程下发的外部音频文件打开列表
    onOpenFiles: (callback) => subscribe("system:open-files", callback),
    // 拉取冷启动暂存的外部音频文件列表
    consumePendingAudioFiles: () => ipcRenderer.invoke("system:consumePendingAudioFiles"),
    // 获取 File 对象的本地绝对路径（用于拖拽播放）
    getPathForFile: (file) => webUtils.getPathForFile(file)
  },
  library: {
    // 开始扫描（默认增量）
    scan: (incremental) => ipcRenderer.invoke("library:scan", incremental),
    // 取消扫描
    cancelScan: () => ipcRenderer.invoke("library:cancelScan"),
    // 获取全部曲目
    getTracks: () => ipcRenderer.invoke("library:getTracks"),
    // 获取专辑聚合列表
    getAlbums: () => ipcRenderer.invoke("library:getAlbums"),
    // 获取歌手聚合列表
    getArtists: () => ipcRenderer.invoke("library:getArtists"),
    // 获取某专辑下的全部曲目
    getAlbumTracks: (albumName) => ipcRenderer.invoke("library:getAlbumTracks", albumName),
    // 获取某歌手的全部曲目
    getArtistTracks: (artistName) => ipcRenderer.invoke("library:getArtistTracks", artistName),
    // 按 ID 批量获取曲目
    getTracksByIds: (ids) => ipcRenderer.invoke("library:getTracksByIds", ids),
    // 搜索曲目
    searchTracks: (query) => ipcRenderer.invoke("library:searchTracks", query),
    // 获取曲目总数
    getTrackCount: () => ipcRenderer.invoke("library:getTrackCount"),
    // 随机取一首曲目
    getRandomTrack: () => ipcRenderer.invoke("library:getRandomTrack"),
    // 随机取多首曲目
    getRandomTracks: (limit) => ipcRenderer.invoke("library:getRandomTracks", limit),
    // 获取扫描状态
    isScanning: () => ipcRenderer.invoke("library:isScanning"),
    // 弹出目录选择器，添加扫描目录
    addScanDir: () => ipcRenderer.invoke("library:addScanDir"),
    // 移除扫描目录及其下曲目
    removeScanDir: (dir) => ipcRenderer.invoke("library:removeScanDir", dir),
    // 获取已配置的扫描目录
    getScanDirs: () => ipcRenderer.invoke("library:getScanDirs"),
    // 删除曲目文件并从数据库移除
    deleteTracks: (paths) => ipcRenderer.invoke("library:deleteTracks", paths),
    // 读取本地文件的可编辑标签
    readTags: (path) => ipcRenderer.invoke("library:readTags", path),
    // 批量写入文件标签
    writeTags: (edits) => ipcRenderer.invoke("library:writeTags", edits),
    // 弹出文件选择器，选择封面图片
    pickCoverImage: () => ipcRenderer.invoke("library:pickCoverImage"),
    // 获取歌手头像
    fetchArtistAvatar: (artistName) => ipcRenderer.invoke("library:fetchArtistAvatar", artistName),
    // 预取歌手头像
    prefetchArtistAvatars: (artistNames) => ipcRenderer.invoke("library:prefetchArtistAvatars", artistNames),
    // 订阅扫描进度事件
    onScanProgress: (callback) => subscribe("library:scanProgress", callback)
  },
  playlist: {
    list: () => ipcRenderer.invoke("playlist:list"),
    get: (id) => ipcRenderer.invoke("playlist:get", id),
    create: (input) => ipcRenderer.invoke("playlist:create", input),
    update: (id, input) => ipcRenderer.invoke("playlist:update", id, input),
    remove: (id) => ipcRenderer.invoke("playlist:remove", id),
    addTracks: (id, trackIds) => ipcRenderer.invoke("playlist:addTracks", id, trackIds),
    removeTracks: (id, trackIds) => ipcRenderer.invoke("playlist:removeTracks", id, trackIds),
    importLegacy: (records) => ipcRenderer.invoke("playlist:importLegacy", records),
    clear: () => ipcRenderer.invoke("playlist:clear")
  },
  window: {
    // 切换桌面歌词窗口
    toggleDesktopLyric: () => ipcRenderer.invoke("window:toggleDesktopLyric"),
    // 关闭桌面歌词窗口
    closeDesktopLyric: () => ipcRenderer.invoke("window:closeDesktopLyric"),
    // 查询桌面歌词窗口是否打开
    isDesktopLyricOpen: () => ipcRenderer.invoke("window:isDesktopLyricOpen"),
    // 订阅桌面歌词窗口开关状态
    onDesktopLyricVisibilityChange: (callback) => subscribe("desktopLyric:visibilityChange", callback),
    // 切换灵动岛窗口
    toggleDynamicIsland: () => ipcRenderer.invoke("window:toggleDynamicIsland"),
    // 关闭灵动岛窗口
    closeDynamicIsland: () => ipcRenderer.invoke("window:closeDynamicIsland"),
    // 查询灵动岛窗口是否打开
    isDynamicIslandOpen: () => ipcRenderer.invoke("window:isDynamicIslandOpen"),
    // 订阅灵动岛窗口开关状态
    onDynamicIslandVisibilityChange: (callback) => subscribe("dynamicIsland:visibilityChange", callback),
    // 切换任务栏歌词窗口
    toggleTaskbarLyric: () => ipcRenderer.invoke("window:toggleTaskbarLyric"),
    // 关闭任务栏歌词窗口
    closeTaskbarLyric: () => ipcRenderer.invoke("window:closeTaskbarLyric"),
    // 查询任务栏歌词窗口是否打开
    isTaskbarLyricOpen: () => ipcRenderer.invoke("window:isTaskbarLyricOpen"),
    // 订阅任务栏歌词窗口开关状态
    onTaskbarLyricVisibilityChange: (callback) => subscribe("taskbarLyric:visibilityChange", callback),
    // 主窗口控制
    minimize: () => ipcRenderer.send("window:minimize"),
    toggleMaximize: () => ipcRenderer.send("window:toggleMaximize"),
    isMaximized: () => ipcRenderer.invoke("window:isMaximized"),
    onMaximizeChange: (callback) => subscribe("window:maximizeChange", callback),
    toggleFullscreen: () => ipcRenderer.send("window:toggleFullscreen"),
    isFullscreen: () => ipcRenderer.invoke("window:isFullscreen"),
    onFullscreenChange: (callback) => subscribe("window:fullscreenChange", callback),
    hide: () => ipcRenderer.send("window:hide"),
    quit: () => ipcRenderer.send("window:quit")
  },
  desktopLyric: {
    // 订阅桌面歌词配置变化
    onConfigChange: (callback) => subscribe("desktopLyric:configChange", callback),
    // 将窗口高度锁定到指定像素
    setHeight: (height) => ipcRenderer.invoke("desktopLyric:setHeight", height),
    // 上报解锁按钮在窗口内容区内的命中区域
    setUnlockButtonBounds: (bounds) => ipcRenderer.send("desktopLyric:setUnlockButtonBounds", bounds),
    // 拖拽移动；只传位置，尺寸由主进程权威 cachedSize 写回
    move: (x, y) => ipcRenderer.send("desktopLyric:move", x, y),
    // 拖拽结束后保存最终位置
    saveState: () => ipcRenderer.send("desktopLyric:saveState"),
    // 订阅主进程 screen 光标位置轮询
    onCursorInside: (callback) => subscribe("desktopLyric:cursorInside", callback)
  },
  dynamicIsland: {
    // 订阅灵动岛配置变化
    onConfigChange: (callback) => subscribe("dynamicIsland:configChange", callback),
    // 拖拽移动；只传位置，尺寸由主进程权威写回
    move: (x, y) => ipcRenderer.send("dynamicIsland:move", x, y),
    // 拖拽结束后保存最终位置；主进程会在落点近顶部时自动吸附回居中
    saveState: () => ipcRenderer.send("dynamicIsland:saveState"),
    // 渲染端上报目标宽度，主进程立即 resize
    resize: (width) => ipcRenderer.send("dynamicIsland:resize", width),
    setShape: (width) => ipcRenderer.send("dynamicIsland:setShape", width),
    // 渲染端上报目标高度
    setHeight: (height) => ipcRenderer.send("dynamicIsland:setHeight", height),
    // 查询当前吸附模式
    getMode: () => ipcRenderer.invoke("dynamicIsland:getMode"),
    // 订阅吸附模式变化：snapped（顶部居中）/ floating（自由位置）
    onModeChange: (callback) => subscribe("dynamicIsland:modeChange", callback),
    // 订阅主进程 screen 光标位置判定（非遮挡模式下用于悬停隐藏）
    onCursorInside: (callback) => subscribe("dynamicIsland:cursorInside", callback)
  },
  taskbarLyric: {
    setContentWidth: (width) => ipcRenderer.send("taskbarLyric:setContentWidth", width),
    // 订阅布局变化（锚定方向、是否居中、系统类型、任务栏主题）
    onLayout: (callback) => subscribe("taskbarLyric:layout", callback),
    // 订阅任务栏歌词配置变化
    onConfigChange: (callback) => subscribe("taskbarLyric:configChange", callback)
  },
  plugins: {
    // 列出所有已安装插件
    list: () => ipcRenderer.invoke("plugin:list"),
    // 从指定路径导入插件
    install: (filePath) => ipcRenderer.invoke("plugin:install", filePath),
    // 弹出原生文件选择框导入插件
    pickAndInstall: () => ipcRenderer.invoke("plugin:pickAndInstall"),
    // 从远端 URL 下载并导入
    installFromUrl: (url) => ipcRenderer.invoke("plugin:installFromUrl", url),
    // 卸载
    uninstall: (id) => ipcRenderer.invoke("plugin:uninstall", id),
    // 启用/禁用
    setEnabled: (id, enabled) => ipcRenderer.invoke("plugin:setEnabled", id, enabled),
    // 写入控制类插件配置项
    setSetting: (id, key, value) => ipcRenderer.invoke("plugin:setSetting", id, key, value),
    // 手动检查更新
    checkUpdate: (id) => ipcRenderer.invoke("plugin:checkUpdate", id),
    // 一键更新
    applyUpdate: (id) => ipcRenderer.invoke("plugin:applyUpdate", id),
    // 解析播放 URL
    resolveUrl: (args) => ipcRenderer.invoke("plugin:resolveUrl", args),
    // 触发插件自定义菜单项
    invokeMenu: (args) => ipcRenderer.invoke("plugin:invokeMenu", args),
    // 经插件兜底匹配歌词
    matchLyric: (args) => ipcRenderer.invoke("plugin:matchLyric", args),
    // 经插件兜底匹配封面
    matchCover: (args) => ipcRenderer.invoke("plugin:matchCover", args),
    // 拉取插件市场列表
    market: () => ipcRenderer.invoke("plugin:market"),
    // 订阅插件状态变化
    onStatus: (callback) => subscribe("plugin:status", callback)
  },
  apis: {
    // 调用任意平台的任意接口
    call: (platform, name, params) => ipcRenderer.invoke("apis:call", platform, name, params ?? {}),
    // 清空指定平台的登录态
    clearSession: (platform) => ipcRenderer.invoke("apis:clearSession", platform),
    // 打开官方网页登录窗口
    openLoginWeb: (platform) => ipcRenderer.invoke("apis:openLoginWeb", platform),
    // 手动写入 cookie 登录
    setCookie: (platform, cookie) => ipcRenderer.invoke("apis:setCookie", platform, cookie)
  },
  cloud: {
    // 弹出文件选择器选择待上传歌曲
    pickSongs: () => ipcRenderer.invoke("cloud:pickSongs"),
    // 上传单首(path + 队列项 id)
    uploadSong: (path, uploadId) => ipcRenderer.invoke("cloud:uploadSong", path, uploadId),
    // 订阅上传进度
    onUploadProgress: (callback) => subscribe("cloud:upload-progress", callback)
  },
  lyrics: {
    // 按 id 直取某平台歌词
    matchById: (platform, id) => ipcRenderer.invoke("lyrics:matchById", platform, id),
    // 按 Track 元数据在某平台模糊搜索歌词
    matchByQuery: (platform, track) => ipcRenderer.invoke("lyrics:matchByQuery", platform, track),
    // 获取 AMLL TTML DB 的 TTML
    fetchTTMLOverlay: (track, platform) => ipcRenderer.invoke("lyrics:fetchTTMLOverlay", track, platform),
    // 在本地 TTML 歌词库目录中按元信息匹配
    matchLocalTTML: (track) => ipcRenderer.invoke("lyrics:matchLocalTTML", track),
    // 选择本地 TTML 歌词库目录
    pickLyricRepoDir: () => ipcRenderer.invoke("lyrics:pickLyricRepoDir")
  },
  opencc: {
    // 转换单个文本
    convert: (text, config) => ipcRenderer.invoke("opencc:convert", text, config),
    // 批量转换文本
    convertBatch: (texts, config) => ipcRenderer.invoke("opencc:convertBatch", texts, config)
  },
  comments: {
    sources: () => ipcRenderer.invoke("comments:sources"),
    get: (args) => ipcRenderer.invoke("comments:get", args)
  },
  download: {
    // 入队下载
    start: (req) => ipcRenderer.invoke("download:start", req),
    // 批量入队下载
    startMany: (reqs) => ipcRenderer.invoke("download:startMany", reqs),
    // 取消任务
    cancel: (taskId) => ipcRenderer.invoke("download:cancel", taskId),
    // 重试（复用 taskId 重新入队）
    retry: (req) => ipcRenderer.invoke("download:retry", req),
    // 回传即时解析结果
    submitResolution: (taskId, res) => ipcRenderer.invoke("download:resolution", taskId, res),
    // 上报即时解析失败
    failResolution: (taskId) => ipcRenderer.invoke("download:resolveFailed", taskId),
    // 删除一条任务记录
    remove: (taskId) => ipcRenderer.invoke("download:remove", taskId),
    // 清空已结束任务
    clearFinished: () => ipcRenderer.invoke("download:clearFinished"),
    // 拉取全部任务
    list: () => ipcRenderer.invoke("download:list"),
    // 选择下载目录
    pickDir: () => ipcRenderer.invoke("download:pickDir"),
    // 当前下载目录
    getDir: () => ipcRenderer.invoke("download:getDir"),
    // 重置为默认下载目录
    resetDir: () => ipcRenderer.invoke("download:resetDir"),
    // 订阅进度
    onProgress: (callback) => subscribe("download:progress", callback),
    // 订阅状态变更
    onState: (callback) => subscribe("download:state", callback),
    // 订阅解析请求
    onResolve: (callback) => {
      ipcRenderer.removeAllListeners("download:resolve");
      return subscribe("download:resolve", callback);
    }
  },
  nowPlaying: {
    // 渲染进程同步当前播放状态到主进程
    update: (payload) => ipcRenderer.send("nowPlaying:update", payload),
    // 拉取当前完整快照
    requestSnapshot: () => ipcRenderer.invoke("nowPlaying:requestSnapshot"),
    // 写入指定曲目的歌词偏移（ms），0 视为清除
    setLyricOffset: (trackId, offsetMs) => ipcRenderer.send("nowPlaying:setLyricOffset", trackId, offsetMs),
    // 订阅歌曲切换事件
    onTrackChange: (callback) => subscribe("nowPlaying:track-change", callback),
    // 订阅歌词内容变化事件
    onLyricChange: (callback) => subscribe("nowPlaying:lyric-change", callback),
    // 订阅播放位置锚点（跟随 position 事件 5Hz）
    onPositionSync: (callback) => subscribe("nowPlaying:position-sync", callback),
    // 订阅当前曲目歌词偏移变化
    onLyricOffsetChange: (callback) => subscribe("nowPlaying:lyric-offset-change", callback)
  },
  theme: {
    // 弹出文件选择框
    pickBackgroundImage: () => ipcRenderer.invoke("theme:pickBackgroundImage"),
    // 清空已缓存的背景图
    clearBackgroundImages: () => ipcRenderer.invoke("theme:clearBackgroundImages")
  },
  cache: {
    // 各类别占用统计
    getStats: () => ipcRenderer.invoke("cache:getStats"),
    // 清除单个类别
    clear: (id) => ipcRenderer.invoke("cache:clear", id),
    // 按介质清空
    clearAllByKind: (kind) => ipcRenderer.invoke("cache:clearAllByKind", kind),
    // 获取当前缓存目录
    getDir: () => ipcRenderer.invoke("cache:getDir"),
    // 选择新的缓存目录
    pickDir: () => ipcRenderer.invoke("cache:pickDir"),
    // 还原默认缓存目录
    resetDir: () => ipcRenderer.invoke("cache:resetDir"),
    // 单曲文件缓存运行时
    song: {
      // 命中查询：返回本地绝对路径或 null
      lookup: (cacheKey) => ipcRenderer.invoke("cache:song:lookup", cacheKey),
      // 排队下载（fire-and-forget 也可 await）
      fetch: (cacheKey, source, streamUrl) => ipcRenderer.invoke("cache:song:fetch", cacheKey, source, streamUrl),
      // 取消正在进行的下载
      cancel: (cacheKey) => ipcRenderer.invoke("cache:song:cancel", cacheKey)
    }
  },
  streaming: {
    /** 读取不包含凭据的服务器视图 */
    loadServers: () => ipcRenderer.invoke("streaming:loadServers"),
    /**
     * 新增服务器
     * @param input - 服务器表单
     * @returns 新服务器视图
     */
    addServer: (input) => ipcRenderer.invoke("streaming:addServer", input),
    /**
     * 更新服务器
     * @param serverId - 服务器 ID
     * @param input - 服务器表单
     * @returns 更新后的服务器视图
     */
    updateServer: (serverId, input) => ipcRenderer.invoke("streaming:updateServer", serverId, input),
    /**
     * 删除服务器
     * @param serverId - 服务器 ID
     * @returns 删除完成
     */
    removeServer: (serverId) => ipcRenderer.invoke("streaming:removeServer", serverId),
    /**
     * 保存激活服务器
     * @param serverId - 激活服务器 ID
     * @returns 保存完成
     */
    setActiveServer: (serverId) => ipcRenderer.invoke("streaming:setActiveServer", serverId),
    /**
     * 测试服务器连接
     * @param input - 服务器表单
     * @param serverId - 编辑服务器 ID
     * @returns 连通性结果
     */
    testConnection: (input, serverId) => ipcRenderer.invoke("streaming:testConnection", input, serverId),
    /**
     * 连接服务器
     * @param serverId - 服务器 ID
     * @returns 连接结果
     */
    connect: (serverId) => ipcRenderer.invoke("streaming:connect", serverId),
    /**
     * 断开服务器会话
     * @param serverId - 服务器 ID
     * @returns 断开完成
     */
    disconnect: (serverId) => ipcRenderer.invoke("streaming:disconnect", serverId),
    getSnapshot: (serverId) => ipcRenderer.invoke("streaming:getSnapshot", serverId),
    sync: (serverId, force) => ipcRenderer.invoke("streaming:sync", serverId, force),
    /**
     * 订阅媒体库更新
     * @param callback - 收到更新的服务器 ID
     * @returns 取消订阅函数
     */
    onLibraryUpdated: (callback) => {
      ipcRenderer.removeAllListeners("streaming:libraryUpdated");
      return subscribe("streaming:libraryUpdated", callback);
    },
    search: (serverId, query) => ipcRenderer.invoke("streaming:search", serverId, query),
    getAlbumSongs: (serverId, albumId) => ipcRenderer.invoke("streaming:getAlbumSongs", serverId, albumId),
    getPlaylistSongs: (serverId, playlistId) => ipcRenderer.invoke("streaming:getPlaylistSongs", serverId, playlistId),
    getArtistAlbums: (serverId, artistId) => ipcRenderer.invoke("streaming:getArtistAlbums", serverId, artistId),
    getArtistSongs: (serverId, artistId) => ipcRenderer.invoke("streaming:getArtistSongs", serverId, artistId),
    /**
     * 请求主进程生成播放地址
     * @param serverId - 服务器 ID
     * @param trackId - 服务端歌曲 ID
     * @param playSessionId - 播放会话 ID
     * @returns 播放地址
     */
    getStreamUrl: (serverId, trackId, playSessionId) => ipcRenderer.invoke("streaming:getStreamUrl", serverId, trackId, playSessionId),
    /**
     * 请求主进程读取歌词
     * @param serverId - 服务器 ID
     * @param trackId - 服务端歌曲 ID
     * @param hint - 旧 Subsonic 歌词端点使用的歌曲信息
     * @returns 原始歌词文本
     */
    getLyrics: (serverId, trackId, hint) => ipcRenderer.invoke("streaming:getLyrics", serverId, trackId, hint)
  },
  recognition: {
    /** 当前平台是否支持听歌识曲 */
    isSupported: () => ipcRenderer.invoke("recognition:isSupported"),
    /**
     * 启动一次识别
     * @param config - 采集来源与时长
     */
    start: (config) => ipcRenderer.invoke("recognition:start", config),
    /** 取消当前识别 */
    cancel: () => ipcRenderer.invoke("recognition:cancel"),
    /**
     * 提交渲染进程采集的麦克风 PCM（macOS/Linux 路径）
     * @param pcm - 8 kHz 单声道样本
     */
    submitPcm: (pcm) => ipcRenderer.invoke("recognition:submitPcm", pcm),
    /**
     * 订阅识别进度事件
     * @param callback - 进度 / 结果 / 错误
     * @returns 取消订阅函数
     */
    onEvent: (callback) => {
      ipcRenderer.removeAllListeners("recognition:event");
      return subscribe("recognition:event", callback);
    }
  },
  lastfm: {
    // 发起授权
    connect: () => ipcRenderer.invoke("lastfm:connect"),
    // 取消授权轮询
    cancelConnect: () => ipcRenderer.invoke("lastfm:cancelConnect"),
    // 断开并清除凭证
    disconnect: () => ipcRenderer.invoke("lastfm:disconnect"),
    // 查询连接状态
    getStatus: () => ipcRenderer.invoke("lastfm:getStatus"),
    // 同步喜欢
    love: (artist, track, loved) => ipcRenderer.invoke("lastfm:love", artist, track, loved)
  },
  externalApi: {
    // 重启外部 API 服务
    restart: () => ipcRenderer.invoke("externalApi:restart"),
    // 查询当前运行状态
    getStatus: () => ipcRenderer.invoke("externalApi:getStatus"),
    // 订阅外部 API 服务状态变化
    onStatus: (callback) => {
      ipcRenderer.removeAllListeners("externalApi:status");
      return subscribe("externalApi:status", callback);
    }
  },
  mcp: {
    // 重启 MCP 服务
    restart: () => ipcRenderer.invoke("mcp:restart"),
    // 查询 MCP 服务状态
    getStatus: () => ipcRenderer.invoke("mcp:getStatus"),
    // 获取生成 AI 客户端配置所需的动态参数
    getClientConfigParams: () => ipcRenderer.invoke("mcp:getClientConfigParams"),
    // 检测 Agent
    detectAgents: () => ipcRenderer.invoke("mcp:detectAgents"),
    // 注入 Agent 配置
    injectAgentConfig: (agentId, params) => ipcRenderer.invoke("mcp:injectAgentConfig", agentId, params),
    // 订阅 MCP 服务状态变化
    onStatus: (callback) => {
      ipcRenderer.removeAllListeners("mcp:status");
      return subscribe("mcp:status", callback);
    }
  },
  aiModel: {
    list: () => ipcRenderer.invoke("aiModel:list"),
    save: (input) => ipcRenderer.invoke("aiModel:save", input),
    remove: (id) => ipcRenderer.invoke("aiModel:remove", id),
    setActive: (id) => ipcRenderer.invoke("aiModel:setActive", id)
  },
  update: {
    // 检查更新
    check: (manual) => ipcRenderer.invoke("update:check", manual),
    // 下载更新（Win/Linux）
    download: () => ipcRenderer.invoke("update:download"),
    // 退出并安装
    install: () => ipcRenderer.invoke("update:install"),
    // 打开 Releases 下载页（mac / 兜底）
    openDownloadPage: () => ipcRenderer.invoke("update:openDownloadPage"),
    // 订阅更新事件
    onEvent: (callback) => subscribe("update:event", callback)
  },
  stats: {
    // 记录一次播放
    recordPlay: (event) => ipcRenderer.send("stats:recordPlay", event),
    // 记录一次收藏变更
    recordFavorite: (event) => ipcRenderer.send("stats:recordFavorite", event),
    // 取播放统计汇总
    getStatsSummary: () => ipcRenderer.invoke("stats:getStatsSummary"),
    // 取最常播放的曲目
    getTopTracks: (limit) => ipcRenderer.invoke("stats:getTopTracks", limit),
    // 取音乐库统计概览
    getLibraryStats: () => ipcRenderer.invoke("stats:getLibraryStats"),
    // 取最近 N 天的每日播放统计
    getPlayHistoryDaily: (days) => ipcRenderer.invoke("stats:getPlayHistoryDaily", days),
    // 取各小时的累计播放统计
    getPlayHistoryHourly: () => ipcRenderer.invoke("stats:getPlayHistoryHourly"),
    // 取最常播放的专辑
    getTopAlbums: (limit) => ipcRenderer.invoke("stats:getTopAlbums", limit),
    // 取最常播放的歌手
    getTopArtists: (limit) => ipcRenderer.invoke("stats:getTopArtists", limit)
  },
  hotkey: {
    getAll: () => ipcRenderer.invoke("hotkey:getAll"),
    set: (id, binding) => ipcRenderer.invoke("hotkey:set", id, binding),
    reset: (id) => ipcRenderer.invoke("hotkey:reset", id),
    setGlobalEnabled: (enabled) => ipcRenderer.invoke("hotkey:setGlobalEnabled", enabled),
    probe: (accelerator) => ipcRenderer.invoke("hotkey:probe", accelerator),
    getConflicts: () => ipcRenderer.invoke("hotkey:getConflicts"),
    onTrigger: (callback) => subscribe("hotkey:trigger", callback),
    onConflicts: (callback) => subscribe("hotkey:conflicts", callback)
  }
};
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
