##### axios的默认配置

```js
//设置默认的请求类型为 GET
axios.defaults.method = 'GET';
//设置基础 URL
axios.defaults.baseURL = 'http://localhost:3000';
//设置默认参数
axios.defaults.params = {id:100};
//设置默认请求时间
axios.defaults.timeout = 3000;
```

##### 创建实例对象

```js
//创建实例对象  每一个新的实例对象都和axios差不多
const duanzi = axios.create({
    baseURL: 'https://api.apiopen.top',
    timeout: 2000
});

duanzi.get('/getJoke').then(response => {
    console.log(response.data)
})
```

##### 请求拦截器

```js
//参数有两个函数分别是拦截成功和失败
axios.interceptors.request.use(function (config) {
    console.log('请求拦截器 成功 - 1号');
    //修改 config 中的参数
    config.params = {a:100};
	//需要把 config 返回出去继续请求
    return config;
}, function (error) {
    console.log('请求拦截器 失败 - 1号');
    return Promise.reject(error);
});
```

##### 响应拦截器

```js
//参数有两个函数分别是拦截成功和失败
axios.interceptors.response.use(function (response) {
    console.log('响应拦截器 成功 1号');
    //响应数据也需要返回出去
    return response.data;
}, function (error) {
    console.log('响应拦截器 失败 1号')
    return Promise.reject(error);
});
```

