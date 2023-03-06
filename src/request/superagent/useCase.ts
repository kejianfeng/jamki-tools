request('https://chatgpt.ddiu.me/api/generate', {
  messages:[{"role":"user","content":"如何做到早起"}]
}).then(data => {
  console.log('响应结果为：', data)
})