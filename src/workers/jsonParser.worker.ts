// Web Worker for parsing large JSON off the main thread

interface WorkerRequest {
  id: string;
  jsonString: string;
}

interface WorkerSuccess {
  id: string;
  success: true;
  data: unknown;
  stats: {
    sizeBytes: number;
    parseTimeMs: number;
  };
}

interface WorkerError {
  id: string;
  success: false;
  error: string;
}

type WorkerResponse = WorkerSuccess | WorkerError;

const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50MB hard limit

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const { id, jsonString } = e.data;
  const sizeBytes = new Blob([jsonString]).size;

  if (sizeBytes > MAX_SIZE_BYTES) {
    const resp: WorkerError = {
      id,
      success: false,
      error: `File size (${(sizeBytes / 1024 / 1024).toFixed(1)}MB) exceeds the safe processing limit of ${MAX_SIZE_BYTES / 1024 / 1024}MB.`,
    };
    self.postMessage(resp);
    return;
  }

  const start = performance.now();
  try {
    const data = JSON.parse(jsonString);
    const parseTimeMs = Math.round(performance.now() - start);
    const resp: WorkerSuccess = {
      id,
      success: true,
      data,
      stats: { sizeBytes, parseTimeMs },
    };
    self.postMessage(resp);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown parsing error";
    const resp: WorkerError = { id, success: false, error: message };
    self.postMessage(resp);
  }
};
