"use strict";

const {
  initDeepkitApp,
  setRoutes,
} = require("../_compiled-apps/apps/src/deepkitApp");

// ###### check the apps/ directory for the original non compiled code
// deepkit needs to be compiled from typescript to be able to generate runtime types metadata

const { deepkitServer } = initDeepkitApp();
setRoutes();
deepkitServer.listen(3000);
