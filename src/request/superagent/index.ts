/**
 * 基于superagnet的请求封装
 * 以上代码封装了一个sendRequest函数，它接收四个参数：请求方法，请求URL，请求数据和请求头。然后，它使用Superagent库发送HTTP请求，并返回一个Promise对象，该对象解析为响应主体。
 * 封装了四个方法：get，post，put和delete，这些方法接收URL，数据和请求头作为参数，并调用sendRequest函数来发送HTTP请求。
 */
const request = require('superagent');

function sendRequest(method, url, data = null, headers = {}) {
  const req = request[method.toLowerCase()](url);
  for (const key in headers) {
    req.set(key, headers[key]);
  }
  if (data) {
    req.send(data);
  }
  return req.then((res) => res.text ).catch((err) => { // 此处的res.text是否需要JSON.parse需视实际情况而定
    throw new Error(err.response ? err.response.text : err.message);
  });
}

module.exports = {
  get: (url, headers) => sendRequest('GET', url, null, headers),
  post: (url, data, headers) => sendRequest('POST', url, data, headers),
  put: (url, data, headers) => sendRequest('PUT', url, data, headers),
  delete: (url, headers) => sendRequest('DELETE', url, null, headers),
};