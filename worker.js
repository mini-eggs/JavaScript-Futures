onmessage = function(event) {
  postMessage(eval(event.data));
};
