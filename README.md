<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/public/logo-dark.svg?raw=true">
    <source media="(prefers-color-scheme: light)" srcset="./assets/public/logo.svg?raw=true">
    <img alt='mion, a mikro kit for Typescript Serverless APIs' src='./assets/public/logo.svg?raw=true' width="403" height="150">
  </picture>
</p>

<p align="center">
  <strong>Benchmarks for  @mionkit/http 🚀</strong><br/>
</p>

<p align=center>
  <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square&maxAge=99999999" alt="npm"  style="max-width:100%;">
  <img src="https://img.shields.io/badge/license-MIT-97ca00.svg?style=flat-square&maxAge=99999999" alt="npm"  style="max-width:100%;">
</p>

# mion Http Benchmarks

- These benchmarks are based on the [fastify benchmarks](https://github.com/fastify/benchmarks) repo!
- `@MionKit/http` is part of the mion Framework. It uses and RPC style router!
- **This package shows how fast is mion comparatively to full featured frameworks like fastify and others.**
- You can find a full list of many other small and faster servers in the original fastify benchmarks repo.
- For metrics (cold-start) see [metrics.md](./METRICS.md)

📚 [Full mion framework documentation here!](https://github.com/MionKit/mion)

### Running & displaying the benchmarks

```sh
# start the tests
npm start

# update readmes in readmes
npm run compare:summary

# running all benchmarks and update all readmes
npm run report
```

### Cold start benchmarks

- **Cold start times:** [METRICS.md](METRICS.md)  
  Cold start times are also indicative of how the [serverless version](https://github.com/MionKit/mion/tree/master/packages/serverless) could perform in this regard, as both `@MionKit/http` an `@MionKit/serverless` are just a wrapper around `@MionKit/router` which contains all the logic. This is a metric we want to focus as fast cold starts are essential for serverless environments.

### Mion settings benchmarks

- **Multiple mion settings:** [MION-OPTIONS.md](MION-OPTIONS.md)  
  Running the same mion application but using different mion settings.

### What's tested

The test consist of an `updateUser` request where the fields of the user must be validated, the `lastUpdate` field is a date that must be transformed into a JS Date (deserialized), then add one month and send back in the response.

```ts
export interface User {
  id: number;
  name: string;
  surname: string;
  lastUpdate: Date;
}

// ### mion ###
// the received user by the route is already validated and deserialized
// user.lastUpdate is already a js date instead and string (result of JSON.parse)
export const routes: Routes = {
  updateUser: (context, user: User): User => {
    user.lastUpdate.setMonth(user.lastUpdate.getMonth() + 1);
    return user;
  },
};

// ### Express ###
// A plugin must be used to parse the json body
// validation must be done manually and user.lastUpdate must be deserialized manually into a date
// in this case developer would have to manually write `isUser` and `deserializeUser` functions. (check src code fo those functions)
app.post("/updateUser", function (req, res) {
  const rawUser = req.body?.updateUser;
  if (!isUser(rawUser)) throw "app error, invalid parameter, not a user";
  const user = deserializeUser(rawUser);
  user.lastUpdate.setMonth(user.lastUpdate.getMonth() + 1);
  res.json(user);
});
```

### Notes on current results

mion is focused on being lightweight and fast so it can be run in serverless environments. We run the benchmarks before every PR gets merged to ensure there is no performance regression. In fact there are [PRs](https://github.com/MionKit/mion/pull/48) that has been rejected because of this.

Our goal is to perform similar to fastify as it is the industry standard in terms of performance. Please always take benchmarks as general guidelines as you might obtain different results in your real world application. we just run the benchmarks to ensure there is no performance degradation when new features/fixes are added to mion.

We are aware that the memory consumption is a bit higher than other frameworks, this is in part because there is [types cache](https://docs.deepkit.io/english/runtime-types.html#_type_cache) storing all extra run type metadata of the code, and pertly due to some design decision to not reuse the native request and response objects within mion routes.

This said it is the baseline memory which is a bit Higher (when the code gets loaded) and mion memory keeps steady under heavy workloads. Please note both mion and @deepkit/type are still in beta an there is room for improvement.

Throughput is usually bigger on mion as we send/receive some more metadata in the request/response compared to other frameworks.

## Benchmark Results

* __Machine:__ darwin x64 | 8 vCPUs | 16.0GB Mem
* __Node:__ `v18.17.0`
* __Run:__ Tue Aug 15 2023 19:13:29 GMT+0100 (Irish Standard Time)
* __Method:__ `autocannon -c 100 -d 40.01 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

#### Req (R/s) 

![benchmarks](assets/public/charts-servers/requests.png)



#### Throughput (Mb/s) 

![benchmarks](assets/public/charts-servers/throughput.png)



#### Latency (ms) 

![benchmarks](assets/public/charts-servers/latency.png)



#### Max Memory (Mb) 

![benchmarks](assets/public/charts-servers/maxMem.png)



#### Memory Series (MB) 

![benchmarks](assets/public/charts-servers/memSeries.png)



|           | Version        | Router | Req (R/s)   | Latency (ms) | Output (Mb/s) | Max Memory (Mb) | Max Cpu (%) | Validation | Description                                                                                                |
| :--       | --:            | --:    | :-:         | --:          | --:           | --:             | --:         | :-:        | :--                                                                                                        |
| http-node | 16.18.0        | ✗      | 17621.1     | 56.22        | 4.24          | 86              | 120         | ✗          | Super basic and completely useless bare http server, should be the theoretical upper limit in performance. |
| **mion**  | **0.1.0**      | **✓**  | **15449.4** | **64.21**    | **4.27**      | **120**         | **129**     | **✓**      | **validation and serialization out of the box**                                                            |
| fastify   | 4.10.2         | ✓      | 15342.6     | 64.65        | 3.70          | 96              | 124         | -          | Validation is done using schemas and ajv. Schemas must be generated manually or using third party tools.   |
| restify   | 11.1.0         | ✓      | 11962.2     | 83.02        | 3.07          | 104             | 119         | ✗          | Requires third party tools.                                                                                |
| hapi      | 21.3.2         | ✓      | 8494.1      | 117.09       | 2.04          | 106             | 130         | ✗          | Manual validation using joi, or third party tools.                                                         |
| deepkit   | 1.0.1-alpha.75 | ✓      | 5267.5      | 188.96       | 1.27          | 301             | 135         | ✓          | Automatic validation out of the box (The ones that made @deepkit/types), Their rpc is way more performant. |
| express   | 4.18.2         | ✓      | 4578.2      | 217.50       | 1.10          | 125             | 120         | ✗          | needs third party tools, or third party tools                                                              |
