##### **[cli]()**中的main.js为什么使用render函数

因为在cli中的vue使用的是没有模板解析器的vue，那么需要解析template代码就只能使用render函数(creatElement)创建dom

##### 关闭语法检查 关闭eslint 根目录添加 vue.config.js 文件

```js
// vue.config.js
module.exports = {
  lintOnSave: false
}
```

##### 修改组件props中的值

组件中props的值是只读的，想要修改props的值需要copy一份到data中，通过修改data中的值来实现业务需求。props的优先级会高于data中的值

```js
props:{
	age:{
		type:Number
	}
},
data() {
    //props的优先级会高于data中的值 这里直接copy一份值到data中
	return {
		myAge:this.age
	}
},
methods:{
	changeAge() {
		this.myAge++
	}
}
```

##### mixin的使用细节

属于组件的data，methods，computed会以组件为准，而生命周期的代码会一起执行，执行顺序是mixin->组件(以mixin优先)

```js
//定义mixin
export const mixin = {
	data() {
	...
    }
}
//使用mixin
import {mixin} form '....'
mixins:['xxx']
```

##### Vue的插件 功能是增强Vue，本质是一个包含install函数的对象，install第一个参数就是Vue，后面的参数则是插件使用者传递的其他参数

```js
//定义插件 plugins.js 文件
export default {
    // 插件中必须要有install方法
    // 第一个参数就是 Vue
    install(Vue) {
        console.log('使用了插件')
        
        Vue.prototype.hello = () => console.log('欢迎使用Vue!')
    },
}

// 在main.js中引入并且使用 Vue.use() 使用
import plugins from './plugins'
Vue.use(plugins)

//在Vue原型上绑定的方法可直接通过this调用
this.hello()
```

Vue小插件  nanoid  可以生成全球唯一id

##### Vue中使用watch来深度监视数据

```js
  watch:{
    todosList: {
      deep:true,// deep:true 为深度监视(一般对复杂类型数据使用)
      handler(value) { // 函数第一个参数是最新值，第二个参数是旧值
      localStorage.setItem('todos',JSON.stringify(value))
      }
    }
  }
```

##### Vue解绑组件自定义事件  使用销毁组件事件 ($destroy) 后组件中的自定义事件都会消失,但是原生事件不受影响

```js
this.$off()//解绑所有自定义事件
this.$off('aaa') // 解绑一个aaa自定义事件
this.$off(['aaa','bbb']) // 解绑多个自定义事件(aaa,bbb) 使用数组形式来作为第一个参数
```

##### 定义全局事件总线

```js
new Vue({
    el:'#app',
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this // 定义全局事件总线
    }
})
```

##### 发布订阅来进行组件的通信  pubsub.js （发布订阅库）

```js
npm install pubsub-js // 安装发布订阅库

import pubsub from 'pubsub-js'  // 引入pubsub库

// 订阅消息(pubsub.subscribe)  参数一是消息名称  参数二是回调函数
// 重点:回调函数中的参数一是消息名 参数二才是发布消息中传递的参数
// 订阅消息有一个返回值 可以保存到this中
this.pubId = pubsub.subscribe('hello',(msgName,data)=>{
    console.log(111,num) //回调函数的执行代码
})

//发布消息(pubsub.publish)   参数一是消息名称 参数二是携带的参数
pubsub.publish('hello',666)

//组件销毁时也需要销毁订阅消息  取消订阅(pubsub.unsubscribe)
beforeDestory() {
    // 取消订阅的参数是当时订阅的返回值
    pubsub.unsubscribe(this.pubId)
}
```

##### cli中使用动画

```js
<template>
  <div>
    <button @click="isShow = !isShow">显示隐藏</button>
    <!-- 在需要动画的dom外包裹 transition  name定义dom名称 appear设置为初始就有动画 -->、
	<!-- transition包裹一个动画dom -->
    <transition name="hello" appear>
      <div class="title" v-show="isShow">动画效果</div>
    </transition>
	<!-- transition-group可以包裹多个个动画dom -->
	<transition-group name="hello" appear>
      <div class="title" v-show="isShow">动画效果</div>
      <div class="title" v-show="!isShow">动画效果</div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  }
};
</script>

<style scoped>
.title {
  width: 200px;
  background-color: orange;
  font-size: 30px;
}
/* 开始动画 这里css的类名需要用name中定义的值 */
.hello-enter-active {
  animation: animation 1s linear;
}
/* 结束动画 这里css的类名需要用name中定义的值 */
.hello-leave-active {
  animation: animation 1s linear reverse;
}
/* 定义动画 */
@keyframes animation {
  from {
    transform: translateX(-200px);
  }
  to {
    transform: translateX(0);
  }
}
</style>
```

##### cli中配置请求代理    配置写在 vue.config.js 中

```js
// 配置二  可配置多个代理
devServer: {
    proxy: {
        // 请求前缀:请求前缀对上了才能拿到数据(可自定义)
        // 匹配以 /api 开头的路径
        '/api': {
            target: 'http://localhost:5000',
                // 重写路径 服务器接受到的地址不需要请求前缀
                // 这里把以 /api 开头的路径都改为 '' 空
                pathRewrite:{
                    '^/api':''
                },
                ws: true, // 用于支持websocket 默认为true
                changeOrigin: true // 用于控制请求头中host的值 默认为true
        },
            // 匹配以 /otherapi 开头的路径
            '/otherapi': {
                target: 'http://localhost:5001',
                    pathRewrite:{
                        '^/otherapi':''
                    },
                    ws: true, 
                    changeOrigin: true 
            },
    }
}


    getStudent() {
      // 请求数据的地址本地一致的端口 请求前缀需要写在端口号之后
      axios.get('http://localhost:8080/api/students').then(res=>{
        console.log(res)
      })
    },
    getCars() {
      // 请求数据的地址本地一致的端口 请求前缀需要写在端口号之后
      axios.get('http://localhost:8080/otherapi/cars').then(res=>{
        console.log(res)
      })
    },
```

##### cli中引入外部库的css文件

```html
1.在public文件中新建css文件夹
2.在index.html中用link引入css文件  <%= BASE_URL %> 是绝对路径的意思
<link rel="icon" href="<%= BASE_URL %>css/bootstrap.css">
```

##### vuex的命名空间

```js
namespaced:true  // 开启命名空间
```

vue-router的创建和基本使用

```js
/src/router/index.js
import VueRouter from 'vue-router'
import Vue from 'vue'
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'

// 使用路由插件
Vue.use(VueRouter)

// 创建路由实例对象
export default new VueRouter({
    routes:[
        // 定义路由规则:路由地址和对应组件
        {
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home
        }
    ]
})

/main.js 在main.js中配置路由对象
import router from './router/index'
new Vue({
    el:'#app',
    render: h => h(App),
    store,
    router,
    beforeCreate() {
        Vue.prototype.$bus = this // 定义全局事件总线
    }
})

/APP.vue
<div id="root">
      <div>
        <!-- router-link 路由跳转标签 -->
        <!-- to 访问的路由地址 active-class 路由激活时的高亮样式 -->
          <router-link class="link" to="/home" active-class="active">到home</router-link>
          <router-link class="link" to="/about" active-class="active">到about</router-link>
      </div>

      <div>
        <!-- router-view  路由对应组件的占位标签 -->
        <router-view></router-view>
	</div>
</div>

注意事项
1.components中一般放置一般组件，pages一般放置路由组件，切换路由默认是销毁组件
2.每个组件都有$route属性，存储自己的路由信息
3.整个应用只有一个$router属性，用于控制整个应用
```

##### 嵌套路由

```JS
routes:[
        // 定义路由规则:路由地址和对应组件
        {
            path:'/about',
            component:About
        },
        {
            path:'/home',
            component:Home,
            // children配置子路由
            children:[
                {
                    // 子路由中的path不需要写 "/"
                    path:'news',
                    component:'News'
                },
                {
                    path:'message',
                    component:'Message'
                }
            ]
        }
    ]
```

##### 路由传参

```js
// query传参方式
<router-link :to="{
path:'/home/news',
query:{
	id:'001',
	title:'参数'
}
}" class="link" active-class="active">新闻</router-link>

mounted() {
	//通过$route属性可以拿到路由参数
	console.log(this.$route.query)
}

//params传参方式
<router-link to="/home/news/666/你好" class="link" active-class="active">新闻</router-link>

	
     children:[
			//路由中需要配置占位
                {
                    path:'news/:id/:title',
                    component:News
                },
                {
                    path:'message',
                    component:Message
                }
            ]

mounted() {
	//通过$route属性可以拿到路由参数
	console.log(this.$route.params)
}
```

##### 路由中params配置

```js
children:[
                {
                    path:'news',
                    component:News
                },
                {
                    path:'message',
                    component:Message,
                    //params 为一个函数  参数为每个路由组件的$route
                    //函数的返回值会传递到路由组件中的props
                    params($route) {
                    	return {
                            id:$route.query.id,
                            title:$route.query.title
                        }
                    }
                }
            ]

//路由组件中直接接受参数
export default {
    name:'Message',
    props:['id','title']
}
```

##### 编程式路由导航

```js
1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录，```replace```是替换当前记录。路由跳转时候默认为```push```
3. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```

this.$router.push({
	path:'/home',
	query:{
		id:001,
		title:'你好'
	}
})
this.$router.push({
	name:'home',
	params:{
		id:001,
		title:'你好'
	}
})

//go函数可以有数值参数 负数为后退 正数为前进
this.$router.go()

//注意：传递参数时 path和parmas不能同时使用
```

##### 保存路由组件状态

```js
// keep-alicv 标签包裹的组件可以被保存状态
// include="" 可以定义被缓存的路由组件 写的值是组件的name属性
// 想要保存多个路由组件可以使用数组形式定义  include="['News','Message']"
<keep-alicv include="News">
	<router-view></router-view>
</keep-alive>

// 被包裹的路由组件会拥有两个新的生命周期函数
activated() {
    // 保存的路由组件被激活时触发函数
}
deactivated() {
    // 保存的路由组件未被激活时触发函数
}
```

##### 路由守卫

```js
        {
            path:'/about',
            component:About,
            // meta 是路由元信息可以放置自定义的信息
           	meta:{
                isAuth:true
            }
        },

// route 是vue-router实例对象  需要在export default之前控制
// 路由前置守卫 路由跳转之前调用的函数 
route.beforeEach((to,from,next)=>{
	to    页面跳转之后的路由信息(对象)
    from  页面跳转之前的路由信息(对象)
    next() 执行函数放行跳转(执行函数)
    
    if(to.meta.isAuth) {
        ....
        next()
    }
})

// 路由后置守卫 路由跳转之后调用的函数 没有next函数
route.afterEach((to,from)=>{
	to   页面跳转之后的路由信息(对象)
    from 页面跳转之前的路由信息(对象)
 
    页面跳转之后修改页面title
    document.title = 'xixi'
    
    if(to.meta.isAuth) {
        ....
        next()
    }
})
```

##### 独享路由守卫(针对某一个路由进行前置路由跳转控制)

```js
    children:[
                {
                    path:'news',
                    component:News,
                    // 独享路由守卫要写在配置项中
                    beforeEnter(to,from,next) {
                    // to from next 参数和全局路由守卫一致
                    }
                },
                {
                    path:'message',
                    component:Message
                }
            ]
```

##### 组件路由守卫   路由组件特有的路由守卫(只有通过路由规则渲染的组件才会执行)

```js
// 通过路由规则，进入该组件时调用
beforeRouteEnter(to,from,next) {
	//代码块
}

// 通过路由规则，进入该组件时调用
beforeRouteLeave(to,from,next) {
	//代码块
}
```

##### element-ui按需引入

```js
// 1.安装包
npm install babel-plugin-component -D
// 2.在 babel.config.js 文件中配置
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
// 3.在main.js中按需引入组件
import Vue from 'vue';
import { Button, Select } from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Select)
 */
```

