"use strict";

const {createServer} = require("http-server")

const optsServer  = {
  ext: true,
}, optsListen     = {
  host: "localhost",
  port: 8083,
}, [, , LOG_LEVEL = 3] = process.argv

const {server} = createServer(optsServer);

server.on("connection", (...args) => {
  3 < LOG_LEVEL && console.debug("onConnection", args);
})
server.on("request", (...args) => {
  3 < LOG_LEVEL && console.debug("onRequest", args);
})
server.listen(optsListen)
2 < LOG_LEVEL && console.log(`Server listening on: http://${optsListen.host}:${optsListen.port}`);

// function onError(error) {
//   1 < LOG_LEVEL && console.error(error);
//   process.exit(2);
// }

function onTerminate() {
  if(this.terminating) {
    return;
  }
  // eslint-disable-next-line no-console
  console.log("\b\b\b\nShutting down");
  this.terminating = true;
  server.close(() => process.exit());
}

process.on("SIGINT", onTerminate);
process.on("SIGTERM", onTerminate);
