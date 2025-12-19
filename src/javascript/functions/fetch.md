# Fetch

## 请求取消

::: code-group

```typescript [取消上一次请求]
let controller;
function request(url, options) {
  if (controller) controller.abort();
  const controller = new AbortController();
  const signal = controller.signal;
  return fetch(url, { ...options, signal });
}
```

```typescript [超时取消请求]
function request(url, options， timeout = 15000) {
  const controller = new AbortController();
  const signal = controller.signal;
  settimeout(() => {
    controller.abort();
    return Promise.reject(new Error('请求超时'));
  }, timeout)
  return fetch(url, { ...options, signal })
}
```

:::

## 请求重试

```typescript [请求重试]
function request(url, options, retries = 3) {
  return fetch(url, options).catch((error) => {
    retries > 0 ? request(url, options, retries - 1) : Promise.reject(error);
  });
}
```

## 流式读取数据

::: code-group

```typescript [二进制]
const response = await fetch(url);
const reader = response.body.getReader();
reader
  .read()
  .then(function process({ done, value }) {
    if (done) {
      console.log("Stream complete");
      return;
    }
    console.log(value);
    return reader.read().then(process);
  })
  .catch(console.error);
```

```typescript [文本]
const response = await fetch(url);
const reader = response.body.getReader();
const decoder = new TextDecoder();
reader
  .read()
  .then(function process({ done, value }) {
    if (done) {
      console.log("Stream complete");
      return;
    }
    const text = decoder.decode(value);
    console.log(text);
    return reader.read().then(process);
  })
  .catch(console.error);
```

```typescript [JSON文本]
const response = await fetch(url);
const reader = response.body.getReader();
const decoder = new TextDecoder();
const chunks = [];
reader
  .read()
  .then(function process({ done, value }) {
    if (done) {
      console.log("Stream complete");
      const text = decoder.decode(new Uint8Array(chunks.flat()));
      const data = JSON.parse(text);
      console.log("Received JSON data", data);
      return;
    }
    chunks.push(value);
    return reader.read().then(process);
  })
  .catch(console.error);
```

```typescript [进度条]
const response = await fetch(url);
const reader = response.body.getReader();
let progress = 0;
let contentLength = response.headers.get("Content-Length");
reader
  .read()
  .then(function process({ done, value }) {
    if (done) {
      console.log("Stream complete");
      return;
    }
    progress += value.length;
    console.log((progress / contentLength) * 100 + "%");
    return reader.read().then(process);
  })
  .catch(console.error);
```

:::
