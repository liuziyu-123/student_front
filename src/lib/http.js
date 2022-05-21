import { createApp } from "vue";
import App from "./App.vue";
import qs from "qs";
import axios from "axios";
import router from '../router';
import { Promise } from 'es6-promise';
import user from '../store/index'
axios.defaults.timeout = 30000; // 1分钟
createApp(App).use(router);

function instance(config) {
    let instance = axios.create({
        timeout: 10000, //60秒未响应则请求超时
        /**更改响应头 */
        headers: {
            "Content-Type": "application/json"
        },
        /**在发送前处理data数据 */
        transformRequest: [
            data => {
                if (!data || typeof data === "string") {
                    return data;
                }

                // 如果是Form表单就直接跳过JSON转换
                if (data instanceof FormData) {
                    return data;
                }

                return qs.stringify(data, {
                    arrayFormat: "brackets",
                    strictNullHandling: false
                });
            }
        ],
        ...config
    });

    instance.interceptors.request.use(function(config) {
        const upload = config.url.indexOf('192.168.23.156:90'); // 判断是否是上传文件的接口
        if (upload != -1) {
            config.timeout = null;
        }
        const sendEmailCode = config.url.indexOf('/user/updataInfo/sendEmailCode'); // 判断是否是上传文件的接口
        if (sendEmailCode != -1) {
            config.timeout = 10000; // 10s
        }

        // if (user.state.Authorization && config.withCredentials != false) {//用户登录时每次请求将token放入请求头中
        config.headers["Authorization"] = localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '';
        config.headers['domain'] = window.location.host.split(":")[0];
        // }
        //  else if (config.withCredentials != false) {
        //   window.location.href=window.location.origin+'/login/'
        // }
        // if (config['Content-Type'] === 'application/x-www-form-urlencoded;') {
        //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        //   config['transformRequest'] = function(obj) {
        //     var str = [];
        //     for (var p in obj)
        //       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        //     return str.join("&")
        //   };
        // }
        //config.header['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

        return config;
    }, function(error) {
        user.state.isLoading = false
        return Promise.reject(error);
    });


    /**在请求或响应被 then 或 catch 处理前拦截它们。处理响应数据 */
    instance.interceptors.response.use(
        response => {
            if (response.status < 200 || response.status >= 300) {
                return Promise.reject(response.statusText);
            }
            // 服务器没有返回正确的JSON格式
            if (typeof response.data === "string" && !response.data) {
                return Promise.reject("服务器没有响应正确的数据, 请检查参数是否正确。");
            }
            return Promise.resolve(response.data);
        },
        error => {
            try {
                if (error && error.response.status == 401) {
                    user.state.isLoading = false
                    if ('/api/user/user/getPortal' != error.response.config.url) {
                        if (error.response.data.code == 403 && '/api/base/class/getlist' == error.response.config.url) {
                            return message.warning('您没有权限访问，请退出登录后重试！')
                        }
                        message.warning('登录过期，请重新登录')
                        localStorage.removeItem('Authorization')
                        
                        router.push({
                            name: 'Home',
                            query: {
                                refresh: true
                            }
                        })
                        // 
                        // if (error.response.config.getPortal != false) {
                        //     message.warning('登录过期，请重新登录')
                        //     this.$router.push({
                        //         name: 'login'
                        //     })
                        //         // axios({
                        //         //   type:'get',
                        //         //   url: window.location.origin+'/portalC30/login/',
                        //         //   dataType: 'jsonp',
                        //         //   timeout: 1000
                        //         // }).then(res => {
                        //         //   this.$router.push({
                        //         //     name: 'login'
                        //         //   })
                        //         // }).catch(res => {
                        //         //   // window.location.href=window.location.origin+'/fdsfdsfsdfsfsfsdf/'
                        //         // })
                        // }
                    } else {
                        localStorage.removeItem('Authorization')
                    }
                } else if (error && error.response) {
                    return Promise.reject({
                        status: error.response.status,
                        statusText: error.response.statusText
                    });
                } else {
                    return Promise.reject({ status: 500, statusText: "服务器故障" });
                }
            } catch {
                user.state.isLoading = false
                return false;
            }
        }
    );
    return instance;
}
export function uploadFile (url,payload,cancelToken,callback1) {
    axios.defaults.timeout = null;
    return new Promise(function(resolve,reject){
      axios({
        url:url,
        method:'post',
        data:payload,
        onUploadProgress:function(progressEvent){
          if(progressEvent.lengthComputable && callback1){
            callback1(progressEvent);
          }
        },
        cancelToken: cancelToken.withCredentials
      }).then(res =>{
        resolve(res);
      }).catch(thrown => { 
        if (axios.isCancel(thrown)) {
          reject('-2')
        } else {
          reject(thrown)
        }
      })
    })
  }

export default instance();