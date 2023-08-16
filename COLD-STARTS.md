# Cold Starts

Cold start metrics has been collected using the http server.

These metrics are also indicative of how well the [serverless version](https://github.com/mionkit/mion/tree/master/packages/serverless) performs in this regard, this is because both `@mionkit/http` an `@mionkit/serverless` are simple wrappers around `@mionkit/router` which contains all the logic.

- These metrics show the start time when loading 1 route and then increasing the number or routes loaded until 5,000 routes.
- The `startup time` is the time it takes create the routes + initialize the server.
- The `listen time` is the time it takes to add all the routes to the server and for the server to be ready listening for requests.

We are comparing mion against fastify as we consider it to be the gold standard in node frameworks and against deepkit as we use some of their libraries and has similar functionalities (validation and serialization).

## Benchmark Results

- **Machine:** darwin x64 | 8 vCPUs | 16.0GB Mem
- **Node:** `v18.17.0`
- **Run:** Tue Aug 15 2023 15:20:10 GMT+0100 (Irish Standard Time)
- **Method:** `npm run metrics` (samples: 5)
- **startup:** time elapsed to setup the application
- **listen:** time elapsed until the http server is ready to accept requests (cold start)

### Cold starts: listen time (ms) lower is better

![benchmarks](assets/public/charts/cold-starts.png)

|                                | startup(ms) | listen(ms) |
| ------------------------------ | ----------- | ---------- |
| 10-startup-deepkit-routes.js   | 1240        | 1241       |
| 10-startup-fastify-routes.js   | 149         | 215        |
| 10-startup-mion-routes.js      | 80          | 88         |
| 100-startup-deepkit-routes.js  | 1244        | 1245       |
| 100-startup-fastify-routes.js  | 162         | 319        |
| 100-startup-mion-routes.js     | 79          | 87         |
| 500-startup-deepkit-routes.js  | 1236        | 1237       |
| 500-startup-fastify-routes.js  | 237         | 746        |
| 500-startup-mion-routes.js     | 78          | 89         |
| 1000-startup-deepkit-routes.js | 1241        | 1243       |
| 1000-startup-fastify-routes.js | 337         | 1247       |
| 1000-startup-mion-routes.js    | 79          | 93         |
| 2000-startup-deepkit-routes.js | 1254        | 1255       |
| 2000-startup-fastify-routes.js | 551         | 2319       |
| 2000-startup-mion-routes.js    | 80          | 103        |
| 3000-startup-deepkit-routes.js | 1274        | 1275       |
| 3000-startup-fastify-routes.js | 843         | 3523       |
| 3000-startup-mion-routes.js    | 80          | 113        |
| 5000-startup-deepkit-routes.js | 1286        | 1287       |
| 5000-startup-fastify-routes.js | 1841        | 6456       |
| 5000-startup-mion-routes.js    | 82          | 124        |
| startup-listen.js              | 82          | 87         |
