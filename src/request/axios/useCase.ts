import  { serviceRequest } from './index'
serviceRequest.get('/api/non_intercept/project', {
  ...req.query,
}).then(res => {
  console.log('εεΊη»ζ===', res)
});