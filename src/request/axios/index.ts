/**
 * 基于axios的请求封装
 */
import axios from 'axios';

// 创建 axios 请求实例
const serviceRequest = axios.create({
  baseURL: zpbServer, // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
});

// 创建请求拦截
serviceRequest.interceptors.request.use(
  async config => {
    process.stdout.write(('===请求地址===' + ((config.baseURL as string) + config.url)) as string);
    const token = 'xxxx'
    config.headers['access-token'] = token;
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 创建响应拦截
serviceRequest.interceptors.response.use(
  res => {
    const { config } = res;
    process.stdout.write(('===响应地址====' + ((config.baseURL as string) + config.url)) as string);
    process.stdout.write('===响应数据===' + JSON.stringify(res.data));
    let data = res.data;
    return data;
  },
  error => {
    let message = '';
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          message = '参数不正确！';
          break;
        case 401:
          message = '您未登录，或者登录已经超时，请先登录！';
          break;
        case 403:
          message = '您没有权限操作！';
          break;
        case 404:
          message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 500:
          message = '服务器内部错误！';
          break;
        case 501:
          message = '服务未实现！';
          break;
        case 502:
          message = '网关错误！';
          break;
        case 503:
          message = '服务不可用！';
          break;
        case 504:
          message = '服务暂时无法访问，请稍后再试！';
          break;
        default:
          message = '异常问题，请联系管理员！';
          break;
      }
    }
    return Promise.reject(message);
  }
);

class reuqestHelpter {
  successRes(data: any, msg?: string) {
    return {
      status: 200,
      data,
      msg: msg || 'ok',
    };
  }
  errorRes(status: number, msg?: string) {
    return {
      status: status || 400,
      msg,
    };
  }
}

const messageHelper = new reuqestHelpter();

export { serviceRequest, messageHelper };
