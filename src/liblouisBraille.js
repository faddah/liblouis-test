importScripts("../node_modules/liblouis-build/build-no-tables-utf32.js");
importScripts("../node_modules/liblouis/easy-api.js");

const liblouis = require("liblouis");

liblouis.enableOnDemandTableLoading("../node_modules/liblouis-build/tables");

onmessage = e => {
  console.log("Message received from main script");
  console.log(`The message is:  ${e.data}`);
  console.log(`Posting translated message back to main script`);
  const translation = liblouis.translateString(
    `unicode.dis,en-ueb-g2.ctb`,
    e.data
  );
  postMessage(translation);
};
