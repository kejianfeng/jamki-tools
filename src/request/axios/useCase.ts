import  { serviceRequest } from './index'
serviceRequest.get('/api/non_intercept/project', {
  ...req.query,
}).then(res => {
  console.log('响应结果===', res)
});