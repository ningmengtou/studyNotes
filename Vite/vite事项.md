##### 定义文件来读取生产环境和开发环境变量

```
开发环境定义变量(根目录下)
.env.development  (文件名为固定写法)
VITE_HTTP_URL = 'http://localhost:3000/'

生产环境定义变量(根目录下)文件名为固定写法
.env.production   (文件名为固定写法)
VITE_HTTP_URL = 'https://yx.yuzhua.com'

封装请求路径时获取变量(根据环境不同获取不同变量)
axios.defaults.baseURL = import.meta.env.VITE_HTTP_URL
```

##### vite.config.js   配置文件

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver(),
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
        ],
      }),
    ],
    base: './',
    // command 为 'serve' 就是开发环境
    server: command === 'serve' ? {
      proxy: {
        // 使用 proxy 实例
        '/http': {
          target: 'http://yx.yuzhua.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/http/, "")
        }
      }
    } : {},
  }
})

```

##### 按需加载element-plus

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { vLoading } from 'element-plus'

import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-loading.css'

import './util/http'
import './global.css'

createApp(App).use(router).use(store).directive('loading', vLoading).mount('#app')
```

