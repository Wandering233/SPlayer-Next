import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { workerData, parentPort } from "node:worker_threads";
const afpDir = workerData?.afpDir;
const useFixture = process.env.SPLAYER_AFP_FIXTURE === "1";
let afpPromise = null;
const loadAfp = () => {
  if (afpPromise) return afpPromise;
  if (!afpDir) return Promise.resolve(null);
  const gluePath = path.join(afpDir, "afp.mjs");
  if (!fs.existsSync(gluePath)) return Promise.resolve(null);
  afpPromise = import(pathToFileURL(gluePath).href).then((mod) => typeof mod.GenerateFP === "function" ? mod : null).catch(() => null);
  return afpPromise;
};
const fixtureFingerprint = (pcm) => {
  let h = 2166136261;
  const step = Math.max(1, Math.floor(pcm.length / 256));
  for (let i = 0; i < pcm.length; i += step) {
    h ^= Math.round(pcm[i] * 32768);
    h = Math.imul(h, 16777619);
  }
  return `fixture-${(h >>> 0).toString(16).padStart(8, "0")}`;
};
parentPort?.on("message", async (request) => {
  const respond = (res) => {
    parentPort?.postMessage(res);
  };
  const mod = await loadAfp();
  if (mod) {
    try {
      const fingerprint = await mod.GenerateFP(request.pcm);
      respond({ id: request.id, ok: true, fingerprint });
      return;
    } catch (error) {
      respond({
        id: request.id,
        ok: false,
        error: error instanceof Error ? error.message : String(error)
      });
      return;
    }
  }
  if (useFixture) {
    respond({ id: request.id, ok: true, fingerprint: fixtureFingerprint(request.pcm) });
    return;
  }
  respond({ id: request.id, ok: false, error: "afp-unavailable" });
});
