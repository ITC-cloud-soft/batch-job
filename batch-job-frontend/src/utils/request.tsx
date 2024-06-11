import axios from 'axios';
import serverConfig from './ServerConfig.tsx';
import { message } from 'antd';

// 配置项
//const axiosOption: AxiosOption = { // ts的话使用这个限定类型
const axiosOption = {
    baseURL: serverConfig.baseURL,
    // baseURL: '/api',// 配置跨域后可以使用这个/api这个不固定，可以根据自己配置的跨域替换
    timeout: 5000,
};

// 创建一个单例
// 由于实际项目中可能会有多个接口地址
// create可以创建多个实例，在接口中要用几个地址就可以创建几个实例
const instance = axios.create(axiosOption);

// 假设 JWT 存储在 localStorage 中
const token = localStorage.getItem('token');
if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 显示加载指示器
        window.dispatchEvent(new CustomEvent('showSpin'));
        const token = localStorage.getItem('token'); // 获取 JWT
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 隐藏加载指示器
        window.dispatchEvent(new CustomEvent('hideSpin'));
        return Promise.reject(error);
    },
);

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 隐藏加载指示器
        window.dispatchEvent(new CustomEvent('hideSpin'));

        // 对响应数据做点什么
        return response.data;
    },
    function (error) {
        // 隐藏加载指示器
        window.dispatchEvent(new CustomEvent('hideSpin'));

        // 对响应错误做些什么
        if (error.response) {
            // 请求已发送，服务器返回状态码在 2xx 之外
            if (error.response.status === 401) {
                window.location.href = '/login';
            } else if (error.response.status === 404) {
                // window.location.href = '/404';
                message.error(error);
            } else if (error.response.status === 500) {
                message.error(error);
            } else {
                message.error(
                    `Error: ${error.response.status} ${error.response.data.message || error.response.statusText}`,
                );
            }
        } else if (error.request) {
            // 请求已发送，但未收到响应
            message.error('No response received from server.');
        } else {
            // 发送请求时出错
            message.error(`Error: ${error.message}`);
        }
        return Promise.reject(error);
    },
);

export default instance;
