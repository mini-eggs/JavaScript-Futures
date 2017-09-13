// Use Futures to run functions in a background thread.
// Must supply with a script for the work to run in.
import Future from "./future.js";

// This part sucks.
const backgroundScriptLocation = "/worker.js";

// Options one (1). No access to lexical environment, but can be ran through webpack/uglify/etc.
// const work = (hiddenVarOne, hiddenVarTwo) => () => {
//   return 8 * 10;
// };

// Option two (2). Pass the worker a string to be eval'd. Does not get passed through wepack/etc.
// but you can throw variables in like so:
const work = (first, second) => `function() {
    console.log("Functions that require native code also work in here.");
    console.log("Unlike our other method.")
    return ${first} * ${second};
}`;

async function handleMount() {
  const result = await new Future(backgroundScriptLocation, work(6, 7));
  this.msg = `Result is ${result}.`;
}

new Vue({
  el: "#app",
  data: () => ({ msg: "Loading" }),
  mounted: handleMount,
  template: "<div>{{ msg }}</div>"
});
