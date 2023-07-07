/* ########
 * 2022 mion
 * Author: Ma-jerez
 * License: MIT
 * The software is provided "as is", without warranty of any kind.
 * ######## */

// import { initHttpApp } from "@mionkit/http";
import type {
  RouterOptions,
  Routes,
  Route,
} from "@mionkit/router";
import { SayHello, User } from "./models";
import { initFsHttp } from "./fastMion";

export const app = {};
export const shared = {};
export type App = typeof app;
export type Shared = typeof SharedArrayBuffer;

export const mionSayHelloRoute: Route = (): SayHello => ({ hello: "world" });

export const routes: Routes = {
  "/": mionSayHelloRoute,
  updateUser: (app, context, user: User): User => {
    return {
      ...user,
      lastUpdate: new Date(),
    };
  },
};

export const initHttp = (options?: Partial<RouterOptions>) => {
  return initFsHttp<App, Shared>(app, undefined, options);
};

export { startFsServer } from "./fastMion";
export { registerRoutes as addRoutes } from "@mionkit/router";
