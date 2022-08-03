##### 1.插件文件夹中有 index.js 和  Toast.vue 组件文件

##### index.js  Vue2版本

```js
import Toast from "./Toast";
const obj = {};
 
obj.install = function(Vue,store) {
  //1 创建组件构造器
  const toastContrutor = Vue.extend(Toast);
  //2 new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastContrutor();
  //3 将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement("div"));
  //4 toast.$el对应的就是上面挂载的div
  document.body.appendChild(toast.$el);
  //为了让插件也可以使用 vuex 可以在插件上配置一下  
  toast.$store = store
  //5装入vue原型
  Vue.prototype.$toast = toast;
};
export default obj;
```

##### index.js   Vue3版本

```js
import Toast from "./Toast";
import {createApp} from 'vue'

const obg = {}

obj.install = function(app) {
  //1 实例化并且绑定组件
  const toastContrutor = createApp(Toast);
  const instance = toastContrutor.mount(document.createElement("div"))
  //2 把node添加到body中
  document.body.appendChild(instance.$el);
  //3 在全局中定义
  app.config.globalProperties.$plugin = instance
};
export default obj;

```

##### Toast.vue

```vue

<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>
 
<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: ""
    };
  },
  methods: {
    show(message = "toast", duration = 2000) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};

```

##### main.js

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import toast from 'components/common/toast'
 
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
//使用自定义组件
Vue.use(toast,store)
 
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

//在页面中直接执行 this.$toast.show() 就可以打开弹窗
```