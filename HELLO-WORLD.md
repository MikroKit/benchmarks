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
* __Node:__ `v18.17.0`
* __Run:__ Sat Oct 07 2023 14:22:34 GMT+0100 (Irish Standard Time)
* __Method:__ `autocannon -c 100 -d 40.33 -p 10 localhost:3000` (two rounds; one to warm-up, one to measure)

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



|           | Version        | Router | Req (R/s)   | Latency (ms) | Output (Mb/s) | Max Memory (Mb) | Max Cpu (%) | Validation | Description                                                                                               |
| :--       | --:            | --:    | :-:         | --:          | --:           | --:             | --:         | :-:        | :--                                                                                                       |
| mion.bun  | 0.6.2          | ✓      | 58232.0     | 16.81        | 9.05          | 83              | 107         | ✓          | mion using bun, automatic validation and serialization                                                    |
| http-node | 16.18.0        | ✗      | 35717.6     | 27.50        | 6.37          | 86              | 118         | ✗          | Super basic and completely useless bare http server, should be the theoretical upper limit in performance |
| fastify   | 4.10.2         | ✓      | 31738.8     | 31.05        | 5.69          | 93              | 117         | -          | Validation using schemas and ajv. schemas are generated manually or using third party tools               |
| **mion**  | **0.6.2**      | **✓**  | **29064.0** | **33.90**    | **5.82**      | **96**          | **121**     | **✓**      | **Automatic validation and serialization out of the box**                                                 |
| deepkit   | 1.0.1-alpha.75 | ✓      | 25878.0     | 38.14        | 4.61          | 186             | 135         | ✓          | Automatic validation and serialization out of the box                                                     |
| hapi      | 21.3.2         | ✓      | 23416.8     | 42.19        | 4.18          | 118             | 127         | ✗          | validation using joi or third party tools                                                                 |
| restify   | 11.1.0         | ✓      | 10193.4     | 97.46        | 2.52          | 104             | 124         | ✗          | manual validation or third party tools                                                                    |
| express   | 4.18.2         | ✓      | 7952.2      | 125.09       | 1.42          | 135             | 125         | ✗          | manual validation or third party tools                                                                    |
