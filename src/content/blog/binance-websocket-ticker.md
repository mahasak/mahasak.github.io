---
author: Max Pijittum
pubDatetime: 2023-12-17T20:00:00Z
title: Retrieving Binance price ticker with websocket using TypeScript
postSlug: reading-binance-price-ticker-with-wss-using-typescript
featured: true
draft: false
tags:
  - trading
description: Retrieving price ticker from Binance using websocket
---

Recently, I want to collect Binance trading ticker to simulate a trade setup of a specific pair and was researched for how to do it programmatically and found Binance offered a WSS API to actully subscribe a price ticker.

This is a rough step-by-step i follow through Binance docs:

**Step #1** - Install Binance Typescript connector

```bash
npm install @binance/connector-typescript
```

**Step #2** - Exporting Binance API key to your shell session (or add it to environment variable).

```shell
export API_KEY=<your_api_key>
export API_SECRET=<you_api_secret>
```

**Step #3** - Define callaback for Binance websocket events and subscribe to ticker.

```typescript
import {
  WebsocketAPI,
  WsMarketTypes,
  WebsocketStream,
} from "@binance/connector-typescript";

const callbacks = {
  open: () => console.debug("Connected to WebSocket server"),
  close: () => console.debug("Disconnected from WebSocket server"),
  message: (data: string) => console.info(data),
};

const websocketStreamClient = new WebsocketStream({ callbacks });

websocketStreamClient.ticker("bnbbtc");

setTimeout(() => websocketStreamClient.pingServer(), 4000);

setTimeout(() => websocketStreamClient.disconnect(), 6000);
```

**Optional** - Reconnecting to Binance WSS

```typescript
setTimeout(() => {
  websocketStreamClient.ticker("bnbbtc");
}, 9000);

setTimeout(() => websocketStreamClient.disconnect(), 12000);
```
