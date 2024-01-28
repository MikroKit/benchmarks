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
- For cold-start metrics see [cold-starts.md](./COLD-STARTS.md)

📚 [Full mion framework documentation here!](https://github.com/MionKit/mion)

#### Running the benchmarks

install packages & link mion packages

```sh
npm i
npm link @mionkit/router @mionkit/core @mionkit/bun @mionkit/http
```

```sh
# running all benchmarks and update all readmes
npm run report
```

#### Cold Starts

- Cold start times: This is a metric we specially want to keep in check as fast cold start times are essential for serverless environments  
  [COLD-STARTS.md](COLD-STARTS.md)

## What's tested

The test consist of an `updateUser` request where the fields of the user must be validated, the `lastUpdate` field is a date that must be transformed into a JS Date (deserialized), then add one month and send back in the response.

> The benchmark involves both routing + validation of parameters!

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

#### Notes on current results:

mion is focused on being lightweight and fast so it can be run in serverless environments. We run the benchmarks before every PR gets merged to ensure there is no performance regression. There are [PRs](https://github.com/MionKit/mion/pull/48) that has been rejected because due to performance regression.

Our goal is to perform similar to fastify as it is the industry standard in terms of performance. Please always take benchmarks as general guidelines as you might obtain different results in your real world application. we just run the benchmarks to ensure there is no performance degradation when new features/fixes are added to mion.

## Benchmark Results

* __Machine:__ darwin x64 | 8 vCPUs | 16.0GB Mem
* __Node:__ `v20.11.0`
* __Run:__ Sun Jan 28 2024 21:52:29 GMT+0000 (Greenwich Mean Time)
* __Method:__ `autocannon -c 100 -d 40.02 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

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



|                | Version   | Router | Req (R/s)   | Latency (ms) | Output (Mb/s) | Max Memory (Mb) | Max Cpu (%) | Validation | Description                                                                         |
| :--            | --:       | --:    | :-:         | --:          | --:           | --:             | --:         | :-:        | :--                                                                                 |
| http-node      | 16.18.0   | ✗      | 17608.7     | 56.26        | 4.23          | 78              | 120         | ✗          | bare node http server, should be the theoretical upper limit in node.js performance |
| mion.bun       | 0.6.2     | ✓      | 17162.4     | 57.74        | 3.98          | 123             | 108         | ✓          | mion using bun, automatic validation and serialization                              |
| fastify        | 4.10.2    | ✓      | 17123.3     | 57.86        | 4.13          | 86              | 119         | -          | Validation using schemas and ajv. schemas are generated manually                    |
| fastify-manual | 3.12.6    | ✓      | 16168.4     | 61.36        | 3.90          | 86              | 122         | -          | manually validated parameters                                                       |
| **mion**       | **0.6.2** | **✓**  | **14101.0** | **70.38**    | **3.90**      | **148**         | **142**     | **✓**      | **Automatic validation and serialization out of the box**                           |
| restify        | 11.1.0    | ✓      | 12669.2     | 78.36        | 3.25          | 131             | 123         | ✗          | manual validation or third party tools                                              |
| hapi           | 21.3.2    | ✓      | 8794.5      | 113.07       | 2.11          | 104             | 130         | ✗          | validation using joi or third party tools                                           |
| hono           | 3.12.6    | ✓      | 5820.6      | 170.96       | 1.40          | 125             | 135         | ✗          | hono node server, manual validation or third party tools                            |
| express        | 4.18.2    | ✓      | 4592.4      | 213.45       | 1.10          | 121             | 128         | ✗          | manual validation or third party tools                                              |
