class Future {
  constructor(location, work) {
    if (typeof location !== "string") {
      throw new Error("Background script location is missing.");
    }
    if (typeof work !== "function" && typeof work !== "string") {
      throw new Error("No work for worker to do.");
    }

    const safeWork = typeof work === "function" ? work.toString() : work;
    const worker = new Worker(location);
    worker.postMessage(`(${safeWork})()`);

    return new Promise(resolve => {
      worker.onmessage = event => {
        resolve(event.data);
      };
    });
  }
}

export default Future;
