##### main.js

```js
import { createPinia } from 'pinia'

// 创建pinia实例
const pinia = createPinia()

// 为安装此插件后创建的每个store添加一个名为 `secret` 的属性
// SecretPiniaPlugin 为一个函数
function SecretPiniaPlugin(context) {
      context.pinia // 使用 `createPinia()` 创建的 pinia
      context.app // 使用 `createApp()` 创建的当前应用程序（仅限 Vue 3）
      context.store // 插件正在扩充的 store
      context.options // 定义存储的选项对象传递给`defineStore()`
    return { secret: 'the cake is a lie' }
}

pinia.use(SecretPiniaPlugin)

// use(pinia) 使用 pinia
createApp(App).use(ElementPlus).use(pinia).mount('#app')
```

##### /stores/mainStore.js

```js
import { defineStore } from 'pinia'

// 第一个参数是应用程序中 store 的唯一 id
// defineStore 用来创建store 参数一是唯一的storeId 
export const mainStore = defineStore('mainStore', {
  state:()=> {
    return {
        count:0
    }
  },
  actions:{
    add() {
        this.count++
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2,
    threeCount: (state) => {
      // state.doubleCount 可以访问到其他getter 
      // 返回的函数可以接收到 getter接收的参数
      return (number) => state.doubleCount * number
    }
  },
})
```

##### App.vue

```vue
<button @click="add">count加一{{counter.count}}</button>
<div>getter的值 {{counter.doubleCount}}</div>
<div>getter传参数 {{counter.threeCount(10)}}</div>


<script setup>
// 引入mainStore
import { mainStore } from './stores/mainStore'
import { storeToRefs } from 'pinia'
// 执行 mainStore() 生成实列
const counter = mainStore()
//$reset() 方法可以将状态 重置 到其初始值
//counter.$reset()

// $subscribe 在状态pathes之后触发一次
//mutation 为状态更改的信息  state 为更改后的状态
counter.$subscribe((mutation, state) => {

  // 每当它发生变化时，将整个状态持久化到本地存储
  localStorage.setItem('cart', JSON.stringify(state))
})
    
// $onAction  可以实现订阅action
counter.$onAction((actionType)=>{
  // actionType 参数中的说明
  // {
  //   name, // action 的名字
  //   store, // store 实例
  //   args, // 调用这个 action 的参数
  //   after, // 在这个 action 执行完毕之后，执行这个函数
  //   onError, // 在这个 action 抛出异常的时候，执行这个函数
  // }
  actionType.after((result)=>{
    console.log(result);//这里能接受 action 的返回值
    console.log('添加成功');
  })
})

//secret 属性是由自定义pulgins 添加的属性
console.log(counter.secret);

//使用 storeToRefs 才能保证从store中解构出来的属性具备响应式
const { count } = storeToRefs(counter)

const add =()=>{
  //执行actions方法
  counter.add()
}
</script>
```

