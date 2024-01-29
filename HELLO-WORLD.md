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

# mion Http Benchmarks (hello world)

## What's tested

These benchmarks test the typical hello world response, not very useful, but shows the theoretical upper limit of each framework.

> The hello world benchmark is related to the router's performance as parameters validation is not involved.

```ts
// ### mion ###
export const routes = {
  hello: (): { hello: string } => ({ hello: "world" }),
} satisfies Routes;

// ### Express ###
app.get("/hello", function (req, res) {
  res.json({ hello: "world" });
});
```

## Benchmark Results

* __Machine:__ darwin x64 | 8 vCPUs | 16.0GB Mem
* __Node:__ `v20.11.0`
* __Run:__ Mon Jan 29 2024 01:56:33 GMT+0000 (Greenwich Mean Time)
* __Method:__ `autocannon -c 100 -d 40.06 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

#### Req (R/s) 

![benchmarks](assets/public/charts-servers-hello/requests.png)



#### Throughput (Mb/s) 

![benchmarks](assets/public/charts-servers-hello/throughput.png)



#### Latency (ms) 

![benchmarks](assets/public/charts-servers-hello/latency.png)



#### Max Memory (Mb) 

![benchmarks](assets/public/charts-servers-hello/maxMem.png)



#### Memory Series (MB) 

![benchmarks](assets/public/charts-servers-hello/memSeries.png)



|           | Version   | Router | Req (R/s)   | Latency (ms) | Output (Mb/s) | Max Memory (Mb) | Max Cpu (%) | Validation | Description                                                                         |
| :--       | --:       | --:    | :-:         | --:          | --:           | --:             | --:         | :-:        | :--                                                                                 |
| mion.bun  | 0.6.2     | ✓      | 61463.2     | 15.79        | 9.55          | 83              | 106         | ✓          | mion using bun, automatic validation and serialization                              |
| http-node | 16.18.0   | ✗      | 39839.2     | 24.60        | 7.10          | 80              | 125         | ✗          | bare node http server, should be the theoretical upper limit in node.js performance |
| fastify   | 4.10.2    | ✓      | 39560.0     | 24.78        | 7.09          | 86              | 121         | -          | Validation using schemas and ajv. schemas are generated manually                    |
| **mion**  | **0.6.2** | **✓**  | **33033.0** | **29.77**    | **6.62**      | **90**          | **128**     | **✓**      | **Automatic validation and serialization out of the box**                           |
| hono      | 3.12.6    | ✓      | 28300.4     | 34.83        | 5.05          | 96              | 123         | ✗          | hono node server, manual validation or third party tools                            |
| hapi      | 21.3.2    | ✓      | 26826.0     | 36.77        | 4.78          | 116             | 129         | ✗          | validation using joi or third party tools                                           |
| restify   | 11.1.0    | ✓      | 10422.3     | 95.49        | 2.57          | 161             | 143         | ✗          | manual validation or third party tools                                              |
| express   | 4.18.2    | ✓      | 8142.6      | 122.16       | 1.45          | 113             | 125         | ✗          | manual validation or third party tools                                              |
