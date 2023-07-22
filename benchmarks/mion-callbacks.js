"use strict";

const { use } = require("h3");
const {
  initHttp,
  addRoutes,
  routes,
} = require("../_compiled-apps/apps/src/mionApp");
const { startHttpServer } = require("@mionkit/http");

// ###### check the apps/ directory for the original non compiled code
// mion needs to be compiled from typescript to be able to generate runtime types metadata

initHttp({ port: 3000, useCallbacks: true });
addRoutes(routes);

startHttpServer();
