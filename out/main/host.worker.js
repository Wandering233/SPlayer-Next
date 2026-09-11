import vm from "node:vm";
import crypto from "node:crypto";
import zlib__default from "node:zlib";
const LX_TO_HOST_QUALITY = {
  "128k": "lq",
  "128": "lq",
  standard: "lq",
  "192k": "sq",
  "192": "sq",
  "320k": "hq",
  "320": "hq",
  high: "hq",
  hq: "hq",
  flac: "lossless",
  ape: "lossless",
  wav: "lossless",
  lossless: "lossless",
  sq: "lossless",
  flac24bit: "hi-res",
  hires: "hi-res",
  "hi-res": "hi-res"
};
const HOST_TO_LX_QUALITY = {
  lq: "128k",
  sq: "192k",
  hq: "320k",
  lossless: "flac",
  "hi-res": "flac24bit"
};
const mapLxQualityToHost = (q) => LX_TO_HOST_QUALITY[String(q).toLowerCase()] ?? null;
const mapHostQualityToLx = (q) => HOST_TO_LX_QUALITY[q] ?? "320k";
const DEFAULT_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const EVENT_NAMES = {
  request: "request",
  inited: "inited",
  updateAlert: "updateAlert"
};
const eventNames = Object.values(EVENT_NAMES);
const toBuffer = (val) => {
  if (Buffer.isBuffer(val)) return val;
  if (val instanceof Uint8Array || val instanceof ArrayBuffer)
    return Buffer.from(val);
  if (Array.isArray(val)) return Buffer.from(val);
  if (typeof val === "string") return Buffer.from(val, "utf-8");
  return Buffer.alloc(0);
};
const buildLxUtils = () => ({
  crypto: {
    aesEncrypt: (buffer, mode, key, iv) => {
      const buf = toBuffer(buffer);
      const keyBuf = toBuffer(key);
      const ivBuf = iv ? toBuffer(iv) : null;
      const cipher = crypto.createCipheriv(mode, keyBuf, ivBuf);
      return Buffer.concat([cipher.update(buf), cipher.final()]);
    },
    rsaEncrypt: (buffer, key) => {
      const buf = toBuffer(buffer);
      const padded = buf.length < 128 ? Buffer.concat([Buffer.alloc(128 - buf.length), buf]) : buf;
      return crypto.publicEncrypt({ key, padding: crypto.constants.RSA_NO_PADDING }, padded);
    },
    randomBytes: (size) => crypto.randomBytes(size),
    md5: (str) => crypto.createHash("md5").update(typeof str === "string" ? str : toBuffer(str)).digest("hex")
  },
  buffer: {
    from: (data, encoding) => typeof data === "string" ? Buffer.from(data, encoding) : Buffer.from(data),
    bufToString: (buf, format = "utf-8") => {
      if (typeof buf === "string") return Buffer.from(buf, "binary").toString(format);
      return toBuffer(buf).toString(format);
    }
  },
  zlib: {
    inflate: (buf) => new Promise((resolve, reject) => {
      zlib__default.inflate(toBuffer(buf), (err, data) => {
        if (err) reject(new Error(err.message));
        else resolve(data);
      });
    }),
    deflate: (data) => new Promise((resolve, reject) => {
      zlib__default.deflate(toBuffer(data), (err, buf) => {
        if (err) reject(new Error(err.message));
        else resolve(buf);
      });
    })
  }
});
const normalizeLxMusicInfo = (raw, source) => {
  const info = raw ?? { songmid: "" };
  const meta = typeof info.meta === "object" && info.meta !== null ? info.meta : {};
  const id = String(info.id ?? info.songmid ?? info.songId ?? meta.songId ?? "");
  const name = String(info.name ?? info.title ?? "");
  const singer = String(info.singer ?? info.artist ?? "");
  const albumName = String(info.albumName ?? meta.albumName ?? "");
  const albumId = String(info.albumId ?? meta.albumId ?? "");
  const interval = typeof info.interval === "string" ? info.interval : null;
  const img = info.img ?? info.pic ?? meta.picUrl ?? null;
  const rawHash = info.hash ?? meta.hash;
  const hash = typeof rawHash === "string" && rawHash.length > 0 ? rawHash : id.length === 32 && /^[0-9a-fA-F]{32}$/.test(id) ? id : "";
  return {
    ...info,
    name,
    singer,
    source,
    songmid: id,
    id,
    songId: id,
    albumId,
    albumName,
    interval,
    img,
    lrc: info.lrc ?? null,
    otherSource: info.otherSource ?? null,
    types: Array.isArray(info.types) ? info.types : [],
    _types: typeof info._types === "object" && info._types !== null ? info._types : {},
    typeUrl: {},
    hash,
    strMediaMid: typeof info.strMediaMid === "string" ? info.strMediaMid : id,
    copyrightId: typeof info.copyrightId === "string" ? info.copyrightId : "",
    meta: {
      songId: id,
      albumName,
      albumId,
      picUrl: img,
      hash,
      ...meta
    }
  };
};
const installLxShim = (sandboxGlobal, splayer, handlers, onSources, onUpdateAvailable, scriptInfo) => {
  let requestHandler = null;
  let inited = false;
  let updateAlerted = false;
  const lxApi = {
    EVENT_NAMES,
    version: "2.0.0",
    env: "desktop",
    request(url, opts, callback) {
      const o = opts ?? {};
      const method = (o.method ?? "GET").toUpperCase();
      const timeout = typeof o.timeout === "number" ? o.timeout : void 0;
      const headers = {};
      const rawHeaders = o.headers ?? {};
      for (const [k, v] of Object.entries(rawHeaders)) {
        if (typeof v === "string") headers[k] = v;
        else if (v != null) headers[k] = String(v);
      }
      const rawBody = o.body;
      const rawForm = o.form ?? o.formData;
      let body;
      let formContentType;
      if (rawBody != null) {
        if (typeof rawBody === "string") body = rawBody;
        else if (rawBody instanceof Uint8Array || rawBody instanceof ArrayBuffer) body = rawBody;
        else if (typeof rawBody === "object") {
          try {
            body = JSON.stringify(rawBody);
          } catch {
            body = void 0;
          }
        }
      } else if (rawForm && typeof rawForm === "object") {
        const usp = new URLSearchParams();
        for (const [field, value] of Object.entries(rawForm)) {
          if (value == null) continue;
          usp.append(field, String(value));
        }
        body = usp.toString();
        formContentType = "application/x-www-form-urlencoded";
      }
      const hasUserAgent = Object.keys(headers).some((k) => k.toLowerCase() === "user-agent");
      if (!hasUserAgent) {
        headers["User-Agent"] = DEFAULT_USER_AGENT;
      }
      const finalHeaders = formContentType ? { "content-type": formContentType, ...headers } : headers;
      let aborted = false;
      const safeCallback = (err, resp, body2) => {
        if (aborted) return;
        try {
          callback(err, resp, body2);
        } catch (cbErr) {
          splayer.log.error("[lx-shim] request callback threw:", cbErr?.message);
        }
      };
      splayer.request(url, {
        method,
        headers: finalHeaders,
        body,
        timeout,
        responseType: "text"
      }).then((resp) => {
        if (aborted) return;
        const rawText = typeof resp.body === "string" ? resp.body : "";
        let parsedBody = rawText;
        try {
          parsedBody = JSON.parse(rawText);
        } catch {
        }
        const raw = Buffer.from(rawText, "utf-8");
        safeCallback(
          null,
          {
            statusCode: resp.status,
            statusMessage: resp.status === 200 ? "OK" : "",
            headers: resp.headers,
            bytes: raw.byteLength,
            raw,
            body: parsedBody
          },
          parsedBody
        );
      }).catch((err) => {
        if (aborted) return;
        safeCallback(err, void 0, null);
      });
      return () => {
        aborted = true;
      };
    },
    on(eventName, handler) {
      if (!eventNames.includes(eventName)) {
        return Promise.reject(new Error("The event is not supported: " + eventName));
      }
      if (eventName === EVENT_NAMES.request) {
        requestHandler = handler;
        return Promise.resolve();
      }
      return Promise.reject(new Error("The event is not supported: " + eventName));
    },
    send(eventName, data) {
      return new Promise((resolve, reject) => {
        if (!eventNames.includes(eventName)) {
          reject(new Error("The event is not supported: " + eventName));
          return;
        }
        switch (eventName) {
          case EVENT_NAMES.inited: {
            if (inited) {
              reject(new Error("Script is inited"));
              return;
            }
            inited = true;
            const rawSources = data?.sources ?? {};
            const normalized = {};
            for (const [key, cap] of Object.entries(rawSources)) {
              const rawQualities = cap.qualitys ?? cap.qualities ?? [];
              const mapped = /* @__PURE__ */ new Set();
              for (const q of rawQualities) {
                const host = mapLxQualityToHost(q);
                if (host) mapped.add(host);
              }
              const actions = (cap.actions ?? []).filter(
                (action) => action === "musicUrl"
              );
              if (actions.length === 0) continue;
              normalized[key] = {
                name: cap.name ?? key,
                actions,
                qualities: Array.from(mapped)
              };
            }
            onSources(normalized);
            resolve();
            return;
          }
          case EVENT_NAMES.updateAlert: {
            if (updateAlerted) {
              reject(new Error("The update alert can only be called once."));
              return;
            }
            updateAlerted = true;
            onUpdateAvailable({
              log: typeof data?.log === "string" ? data.log : void 0,
              updateUrl: typeof data?.updateUrl === "string" ? data.updateUrl : void 0,
              version: typeof data?.version === "string" ? data.version : void 0,
              updatedAt: Date.now()
            });
            resolve();
            return;
          }
          default:
            reject(new Error("Unknown event name: " + eventName));
        }
      });
    },
    utils: buildLxUtils(),
    currentScriptInfo: scriptInfo ?? {
      name: "",
      description: "",
      version: "",
      author: "",
      homepage: "",
      rawScript: ""
    }
  };
  sandboxGlobal.lx = lxApi;
  sandboxGlobal.window = { lx: lxApi };
  const registerAction = (action) => {
    handlers.set(action, async (req) => {
      if (!requestHandler) {
        splayer.log.warn("[lx-shim] no request handler registered for action", action);
        throw Object.assign(new Error("lx plugin has not registered request handler"), {
          code: "PLUGIN_NOT_READY"
        });
      }
      const reqObj = req;
      const source = reqObj.source ?? "";
      const hostQuality = reqObj.quality;
      const lxType = hostQuality ? mapHostQualityToLx(hostQuality) : void 0;
      const info = {
        type: lxType,
        musicInfo: normalizeLxMusicInfo(reqObj.musicInfo, source)
      };
      const raw = await Promise.resolve(requestHandler({ source, action, info }));
      if (typeof raw === "string") return { url: raw };
      if (raw && typeof raw === "object") {
        const url = raw.url;
        if (typeof url === "string") return { url };
      }
      throw Object.assign(new Error("lx plugin returned invalid musicUrl result"), {
        code: "PLUGIN_INVALID_RESULT"
      });
    });
  };
  ["musicUrl"].forEach(registerAction);
};
const parentPort = process.parentPort;
if (!parentPort) {
  process.exit(1);
}
const sanitizeForIpc = (value, depth = 0) => {
  if (depth > 6) return null;
  if (value == null) return value;
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === "bigint") return value;
  if (t === "function" || t === "symbol") return void 0;
  if (Buffer.isBuffer(value)) return new Uint8Array(value);
  if (value instanceof Uint8Array || value instanceof ArrayBuffer) return value;
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForIpc(item, depth + 1)).filter((item) => item !== void 0);
  }
  if (t === "object") {
    const out = /* @__PURE__ */ Object.create(null);
    try {
      for (const key of Object.keys(value)) {
        const cleaned = sanitizeForIpc(value[key], depth + 1);
        if (cleaned !== void 0) out[key] = cleaned;
      }
    } catch {
    }
    return out;
  }
  return void 0;
};
const send = (msg) => {
  try {
    parentPort.postMessage(msg);
    return;
  } catch {
    try {
      parentPort.postMessage(sanitizeForIpc(msg));
      return;
    } catch (err2) {
      throw new Error(`[host] postMessage failed for kind=${msg.kind}: ${err2.message}`);
    }
  }
};
const plugins = /* @__PURE__ */ new Map();
const hostCall = (record, method, args) => {
  const callId = `c${++record.callSeq}`;
  return new Promise((resolve, reject) => {
    record.hostCallWaiters.set(callId, { resolve, reject });
    try {
      send({
        kind: "hostCall",
        pluginId: record.pluginId,
        callId,
        method,
        args: sanitizeForIpc(args)
      });
    } catch (err) {
      record.hostCallWaiters.delete(callId);
      reject(
        Object.assign(new Error(err.message), { code: "PLUGIN_ARGS_NOT_CLONEABLE" })
      );
    }
  });
};
const makeTimers = (record) => ({
  setTimeout: (cb, ms, ...args) => {
    const handle = setTimeout(() => {
      record.timers.delete(handle);
      cb(...args);
    }, ms);
    record.timers.add(handle);
    return handle;
  },
  setInterval: (cb, ms, ...args) => {
    const handle = setInterval(cb, ms, ...args);
    record.timers.add(handle);
    return handle;
  },
  clearTimeout: (handle) => {
    if (handle) record.timers.delete(handle);
    clearTimeout(handle);
  },
  clearInterval: (handle) => {
    if (handle) record.timers.delete(handle);
    clearInterval(handle);
  },
  setImmediate: (cb, ...args) => {
    const handle = setImmediate(() => {
      record.immediates.delete(handle);
      cb(...args);
    });
    record.immediates.add(handle);
    return handle;
  },
  clearImmediate: (handle) => {
    if (handle) record.immediates.delete(handle);
    clearImmediate(handle);
  }
});
const buildSplayer = (record, spec) => ({
  pluginId: spec.pluginId,
  apiLevel: spec.apiLevel,
  locale: spec.locale,
  appVersion: spec.appVersion,
  request: (url, opts) => hostCall(record, "request", [url, opts ?? {}]),
  register: (args) => {
    if (args.sources) {
      record.registeredSources = { ...record.registeredSources, ...args.sources };
      send({ kind: "sourcesUpdate", pluginId: record.pluginId, sources: record.registeredSources });
    }
    if (args.events || args.controls !== void 0 || args.settings || args.menus) {
      if (Array.isArray(args.settings)) {
        for (const item of args.settings) {
          if (!(item.key in record.userSettingsCache)) {
            record.userSettingsCache[item.key] = item.default;
          }
        }
      }
      send({
        kind: "registered",
        pluginId: record.pluginId,
        events: Array.isArray(args.events) ? args.events : [],
        controls: Boolean(args.controls),
        settings: Array.isArray(args.settings) ? args.settings : [],
        menus: Array.isArray(args.menus) ? args.menus : []
      });
    }
  },
  on: (action, handler) => {
    record.handlers.set(action, handler);
  },
  log: {
    debug: (...args) => send({
      kind: "log",
      pluginId: record.pluginId,
      level: "debug",
      args: sanitizeForIpc(args)
    }),
    info: (...args) => send({
      kind: "log",
      pluginId: record.pluginId,
      level: "info",
      args: sanitizeForIpc(args)
    }),
    warn: (...args) => send({
      kind: "log",
      pluginId: record.pluginId,
      level: "warn",
      args: sanitizeForIpc(args)
    }),
    error: (...args) => send({
      kind: "log",
      pluginId: record.pluginId,
      level: "error",
      args: sanitizeForIpc(args)
    })
  },
  storage: {
    get: (key) => hostCall(record, "storage.get", [key]),
    set: (key, value) => hostCall(record, "storage.set", [key, value]),
    remove: (key) => hostCall(record, "storage.remove", [key]),
    keys: () => hostCall(record, "storage.keys", [])
  },
  getSetting: (key) => record.userSettingsCache[key],
  player: {
    on: (kind, handler) => {
      const list = record.playerEventHandlers.get(kind) ?? [];
      list.push(handler);
      record.playerEventHandlers.set(kind, list);
    },
    play: () => void hostCall(record, "player.play", []).catch(() => {
    }),
    pause: () => void hostCall(record, "player.pause", []).catch(() => {
    }),
    next: () => void hostCall(record, "player.next", []).catch(() => {
    }),
    prev: () => void hostCall(record, "player.prev", []).catch(() => {
    }),
    seek: (positionMs) => void hostCall(record, "player.seek", [positionMs]).catch(() => {
    }),
    setVolume: (volume) => void hostCall(record, "player.setVolume", [volume]).catch(() => {
    }),
    getPosition: () => hostCall(record, "player.getPosition", [])
  },
  onSettingChange: (key, handler) => {
    const list = record.settingChangeHandlers.get(key) ?? [];
    list.push(handler);
    record.settingChangeHandlers.set(key, list);
  }
});
const buildUtils = () => ({
  crypto: {
    md5: (data) => crypto.createHash("md5").update(data).digest("hex"),
    sha1: (data) => crypto.createHash("sha1").update(data).digest("hex"),
    sha256: (data) => crypto.createHash("sha256").update(data).digest("hex"),
    hmac: (algo, key, data) => crypto.createHmac(algo, key).update(data).digest("hex"),
    randomBytes: (size) => crypto.randomBytes(size),
    aesEncrypt: (data, key, mode, iv) => {
      const cipher = crypto.createCipheriv(mode, key, iv ?? null);
      const input = typeof data === "string" ? Buffer.from(data, "utf-8") : Buffer.from(data);
      return Buffer.concat([cipher.update(input), cipher.final()]);
    },
    aesDecrypt: (data, key, mode, iv) => {
      const decipher = crypto.createDecipheriv(mode, key, iv ?? null);
      return Buffer.concat([decipher.update(Buffer.from(data)), decipher.final()]);
    },
    rsaEncrypt: (data, publicKey) => crypto.publicEncrypt(publicKey, Buffer.from(data))
  },
  buffer: {
    from: (data, enc) => typeof data === "string" ? Buffer.from(data, enc) : Buffer.from(data),
    bufToString: (buf, enc = "utf-8") => Buffer.from(buf).toString(enc),
    concat: (list) => Buffer.concat(list)
  },
  base64: {
    encode: (data) => Buffer.from(data).toString("base64"),
    decode: (data) => Buffer.from(data, "base64").toString("utf-8")
  },
  zlib: {
    inflate: (data) => zlib__default.inflateSync(data),
    deflate: (data) => zlib__default.deflateSync(data),
    gunzip: (data) => zlib__default.gunzipSync(data),
    gzip: (data) => zlib__default.gzipSync(data)
  }
});
const disposeRecord = (record) => {
  if (record.disposed) return;
  record.disposed = true;
  for (const ctrl of record.inflight.values()) {
    try {
      ctrl.abort();
    } catch {
    }
  }
  record.inflight.clear();
  for (const waiter of record.hostCallWaiters.values()) {
    waiter.reject(Object.assign(new Error("plugin unloaded"), { code: "PLUGIN_NOT_READY" }));
  }
  record.hostCallWaiters.clear();
  for (const handle of record.timers) clearTimeout(handle);
  record.timers.clear();
  for (const handle of record.immediates) clearImmediate(handle);
  record.immediates.clear();
  record.handlers.clear();
  record.playerEventHandlers.clear();
  record.settingChangeHandlers.clear();
};
const unloadPlugin = (pluginId) => {
  const record = plugins.get(pluginId);
  if (!record) return;
  disposeRecord(record);
  plugins.delete(pluginId);
};
const loadPluginIntoContext = (spec) => {
  if (plugins.has(spec.pluginId)) return;
  const record = {
    pluginId: spec.pluginId,
    handlers: /* @__PURE__ */ new Map(),
    playerEventHandlers: /* @__PURE__ */ new Map(),
    settingChangeHandlers: /* @__PURE__ */ new Map(),
    registeredSources: {},
    inflight: /* @__PURE__ */ new Map(),
    hostCallWaiters: /* @__PURE__ */ new Map(),
    userSettingsCache: spec.userSettings ?? {},
    timers: /* @__PURE__ */ new Set(),
    immediates: /* @__PURE__ */ new Set(),
    callSeq: 0,
    disposed: false
  };
  plugins.set(spec.pluginId, record);
  const splayer = buildSplayer(record, spec);
  splayer.utils = buildUtils();
  const timerApi = makeTimers(record);
  const sandboxGlobal = {
    splayer,
    Buffer,
    ...timerApi,
    queueMicrotask,
    Promise,
    URL,
    URLSearchParams,
    TextEncoder,
    TextDecoder,
    btoa: (str) => Buffer.from(str, "binary").toString("base64"),
    atob: (str) => Buffer.from(str, "base64").toString("binary"),
    console: {
      log: splayer.log.info,
      info: splayer.log.info,
      debug: splayer.log.debug,
      warn: splayer.log.warn,
      error: splayer.log.error
    }
  };
  installLxShim(
    sandboxGlobal,
    splayer,
    record.handlers,
    (sources) => {
      record.registeredSources = { ...record.registeredSources, ...sources };
      send({ kind: "sourcesUpdate", pluginId: record.pluginId, sources: record.registeredSources });
    },
    (info) => {
      send({ kind: "updateAvailable", pluginId: record.pluginId, info });
    },
    {
      name: spec.scriptInfo.name,
      description: spec.scriptInfo.description,
      version: spec.scriptInfo.version,
      author: spec.scriptInfo.author,
      homepage: spec.scriptInfo.homepage,
      rawScript: spec.source
    }
  );
  sandboxGlobal.globalThis = sandboxGlobal;
  const context = vm.createContext(sandboxGlobal, {
    name: `plugin:${spec.pluginId}`,
    codeGeneration: { strings: true, wasm: false }
  });
  try {
    const script = new vm.Script(spec.source, { filename: `plugin-${spec.pluginId}.js` });
    script.runInContext(context, { timeout: 1e4, breakOnSigint: false });
  } catch (err) {
    const hasSources = Object.keys(record.registeredSources).length > 0;
    const hasHandlers = record.handlers.size > 0;
    if (hasSources || hasHandlers) {
      send({
        kind: "log",
        pluginId: spec.pluginId,
        level: "warn",
        args: [
          "[host] 插件脚本顶层执行抛出异常（音源/处理器已就绪，降级忽略）:",
          err instanceof Error ? err.message : String(err)
        ]
      });
    } else {
      disposeRecord(record);
      plugins.delete(spec.pluginId);
      send({
        kind: "fatal",
        pluginId: spec.pluginId,
        error: {
          code: "PLUGIN_SCRIPT_ERROR",
          message: err instanceof Error ? `${err.message}
${err.stack ?? ""}` : String(err)
        }
      });
      return;
    }
  }
  queueMicrotask(() => {
    if (record.disposed) return;
    send({ kind: "ready", pluginId: spec.pluginId, sources: record.registeredSources });
  });
};
parentPort.on("message", async (event) => {
  const msg = event.data;
  try {
    switch (msg.kind) {
      case "loadPlugin":
        loadPluginIntoContext(msg);
        return;
      case "unloadPlugin":
        unloadPlugin(msg.pluginId);
        return;
      case "ping":
        send({ kind: "pong" });
        return;
      case "cancel": {
        const record = plugins.get(msg.pluginId);
        const ctrl = record?.inflight.get(msg.requestId);
        if (record && ctrl) {
          ctrl.abort();
          record.inflight.delete(msg.requestId);
        }
        return;
      }
      case "event": {
        const record = plugins.get(msg.pluginId);
        if (!record) return;
        const handlers = record.playerEventHandlers.get(msg.event);
        if (handlers) {
          for (const handler of handlers) {
            try {
              handler(msg.data);
            } catch {
            }
          }
        }
        return;
      }
      case "settingsUpdate": {
        const record = plugins.get(msg.pluginId);
        if (!record) return;
        for (const [key, value] of Object.entries(msg.settings)) {
          record.userSettingsCache[key] = value;
          const handlers = record.settingChangeHandlers.get(key);
          if (handlers) {
            for (const handler of handlers) {
              try {
                handler(value);
              } catch {
              }
            }
          }
        }
        return;
      }
      case "hostResult": {
        const record = plugins.get(msg.pluginId);
        const waiter = record?.hostCallWaiters.get(msg.callId);
        if (!record || !waiter) return;
        record.hostCallWaiters.delete(msg.callId);
        if (msg.ok) waiter.resolve(msg.data);
        else {
          const err = new Error(msg.error?.message ?? "host call failed");
          err.code = msg.error?.code;
          waiter.reject(err);
        }
        return;
      }
      case "call": {
        const record = plugins.get(msg.pluginId);
        if (!record) {
          send({
            kind: "result",
            pluginId: msg.pluginId,
            requestId: msg.requestId,
            ok: false,
            error: { code: "PLUGIN_NOT_READY", message: "plugin not loaded" }
          });
          return;
        }
        const handler = record.handlers.get(msg.action);
        if (!handler) {
          send({
            kind: "result",
            pluginId: msg.pluginId,
            requestId: msg.requestId,
            ok: false,
            error: {
              code: "PLUGIN_ACTION_UNSUPPORTED",
              message: `action "${msg.action}" not registered`
            }
          });
          return;
        }
        const ctrl = new AbortController();
        record.inflight.set(msg.requestId, ctrl);
        try {
          const data = await handler(msg.params);
          record.inflight.delete(msg.requestId);
          if (ctrl.signal.aborted) {
            send({
              kind: "result",
              pluginId: msg.pluginId,
              requestId: msg.requestId,
              ok: false,
              error: { code: "PLUGIN_CANCELLED", message: "cancelled" }
            });
          } else {
            send({
              kind: "result",
              pluginId: msg.pluginId,
              requestId: msg.requestId,
              ok: true,
              data: sanitizeForIpc(data)
            });
          }
        } catch (err) {
          record.inflight.delete(msg.requestId);
          send({
            kind: "result",
            pluginId: msg.pluginId,
            requestId: msg.requestId,
            ok: false,
            error: {
              code: err?.code ?? "PLUGIN_HANDLER_ERROR",
              message: err instanceof Error ? err.message : String(err)
            }
          });
        }
        return;
      }
    }
  } catch (err) {
    const pluginId = msg.pluginId;
    const record = pluginId ? plugins.get(pluginId) : void 0;
    if (pluginId && record) {
      disposeRecord(record);
      plugins.delete(pluginId);
      send({
        kind: "fatal",
        pluginId,
        error: {
          code: "PLUGIN_UNKNOWN",
          message: err instanceof Error ? err.message : String(err)
        }
      });
    } else {
      send({ kind: "log", level: "error", args: ["host message error:", String(err)] });
    }
  }
});
process.on("unhandledRejection", (reason) => {
  send({
    kind: "log",
    level: "error",
    args: ["unhandledRejection:", reason instanceof Error ? reason.message : reason]
  });
});
process.on("uncaughtException", (err) => {
  send({ kind: "log", level: "error", args: ["uncaughtException:", err.message] });
});
send({ kind: "hostReady" });
