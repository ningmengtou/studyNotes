##### Vue3项目搭建

```js
1.使用vue@cli来搭建vue3项目(需要cli版本在4.15.0以上)
vue create vue3_test(项目名称)
选择vue3版本
npm run serve

2.使用vite构建vue3项目
npm i -g create-vite-app              全局安装vite
npm init vite-app vue3_test_vite      创建项目
cd vue3_test_vite                     进入项目文件
npm install                           安装需求包
npm run dev
```

##### setup配置项

```js
1.setup是新的配置项是一个函数
2.组件中的方法，属性，生命周期都可以配置到setup中
3.注意点:不要和vue2的配置项混用，setup不能是一个async函数

  // 模板中使用的数据需要从setup中return出来
  <h2>名字：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <button @click="tosk">说话按钮</button>

  // setup是一个函数
  setup() {
    // setup 中定义的属性和方法可以直接定义
    let name = '猪猪'
    let age = '20'

    function tosk() {
      alert('说话了')
    }

    // setup需要返回一个对象 返回出去的属性和方法才能在模板中使用
    return {
      name,age,tosk
    }
  }
```

##### ref 函数实现数据的响应式(处理简单数据类型)

```js
  // 模板中使用数据不需要 .value
  <h2>名字：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>岗位：{{ job.type }}</h2>
  <h2>工资：{{ job.money }}</h2>
  <button @click="tosk">说话按钮</button>
  <button @click="changeVal">改变属性值</button>

// 引入 ref 函数 来定义响应式数据 创建包含响应式的引用对象
import {ref} from 'vue'
export default {
  name: 'App',
  setup() {
    // 声明的属性需要通过 ref 函数执行生成响应式属性(返回的属性是对象)
    // ref改变基本类型属性值是用过数据劫持(get,set)来实现
    let name = ref('猪猪')
    let age = ref(20)
    // ref改变复杂类型属性值是用过 proxy 来实现(间接使用了reactive)
    let job = ref({
      type: "前端",
      money: "20k",
    });

    function tosk() {
      alert('说话了')
    }

    function changeVal() {
      // 更改属性不能直接更改，可以通过改变属性的value(因为通过ref生成的属性是对象)
        name.value = 'xixi',
        age.value = 40,
       //复制数据类型的值更改只需要第一层使用value
        job.value.type = "ui",
        job.value.money = "40k"
    }

    // setup需要返回一个对象 之后返回了模板中才可以使用
    return {
      name,age,job,tosk,changeVal
    }
  }
}
```

##### reactive 函数实现数据的响应式(处理复杂数据类型)

```js
  <h2>名字：{{ person.name }}</h2>
  <h2>年龄：{{ person.age }}</h2>
  <h2>岗位：{{ person.job.type }}</h2>
  <h2>工资：{{ person.job.money }}</h2>
  <button @click="tosk">说话按钮</button>
  <button @click="changeVal">改变属性值</button>
  
  // 引入 reactive 函数 来实现数据响应式(处理复杂数据类型)
  // 内部通过es6的proxy来实现，代理对象来操作源对象内部数据
  import { reactive } from "vue";
  export default {
  name: "App",
  setup() {
    // 通过 reactive 来实现复杂类型数据响应式
    let person = reactive({
      name:'猪猪',
      age:20,
      job:{
        type:'前端',
        money:"20k"
      },
      arr:[1,2,3,4]
    })

    function tosk() {
      alert("说话了");
    }

    function changeVal() {
      // 使用reactive实现的数据不用通过 value 来修改数据 可以直接修改
      person.name = 'xx',
      person.age = 30,
      person.job.type = 'ui',
      person.job.money = '30k',
      person.arr[0] = 20
    }

    // setup需要返回一个对象 之后返回了模板中才可以使用
    return {
      person,
      tosk,
      changeVal,
    };
  },
};
```

##### setup的两个注意点

- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefined。

- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
    - slots: 收到的插槽内容, 相当于 ```this.$slots```。
    - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。

##### computed计算属性的使用

```js
    //计算属性 简写 computed的参数是一个函数，return返回一个值
    let newNum = computed(()=>{
      return number.value+1
    })

    //计算属性 完整 computed参数是一个对象，对象中有get和set两个方法
    let newNum = computed({
      get() {
        return number.value + 1
      },
      set(value) {
        // value 为最新更改的值
        number = value
      }
    }) 
```

##### watch侦听器的使用

```js
    //watch 的使用 参数一是需要被侦听的属性  参数二是一个回调函数用于执行逻辑代码 参数三是配置项
    //immediate:true  属性未改变也执行函数
    watch(number,(newValue,oldValue)=>{
      console.log('number改变了',newValue,oldValue)
    },{immediate:true})

    //侦听的是reactive的创建的值 无法捕获到 oldValue
    watch(person,(newValue,oldValue)=>{
      console.log('person改变了',newValue,oldValue)
    })

    //侦听reactive的创建的值中的某个属性
    watch(()=>person.name,(newValue,oldValue)=>{
      console.log('person的name改变了',newValue,oldValue)
    })

    //侦听reactive的创建的值中的某些属性 使用数组包裹起来要侦听的属性
    watch([()=>person.name,()=>person.age],(newValue,oldValue)=>{
      console.log('person的name改变了',newValue,oldValue)
    })

    //此处由于监视的是reactive定义的对象中的某个属性，所以deep配置有效
    watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的name改变了',newValue.p1.money,oldValue)
    },{deep:true})
```

##### watchEffect 的使用

```js
    // watchEffect 是一个函数 不需要指定需要监听的属性和回到方法
    // 在函数中使用到某个属性就会被侦听到
    watchEffect(()=>{
      const number1 = number.value
      console.log('number改变了')
      console.log(person.job.p1.money)
    })
```

hook 函数的使用

```js
import {reactive,onMounted,onBeforeUnmount} from 'vue'
// hook 函数本质是一个函数(就是setup函数)，可以使用组合api来实现某个功能的逻辑,最后把值返回出去 可以在组件中直接使用
export default function() {
    let point = reactive({
        x:0,
        y:0
    })

    function savePoint(e) {
        point.x = e.pageX
        point.y = e.pageY
    }

    // 组件挂载后生命周期函数
    onMounted(()=>{
        window.addEventListener('click',savePoint)
    })

    // 组件卸载前生命周期函数
    onBeforeUnmount(()=>{
        window.removeEventListener('click',savePoint)
    })

    // 需要把使用的数据返回出去
    return point   
}


//在需要使用到hook函数功能的组件中使用
import userPoint from './hooks/usePoints'

// 使用hook函数接受返回值
setup() {
     //导入的函数执行结果就是hook函数的返回值
     let point = userPoint()
     
	return {point};
     
}
    

```

##### toRef 和 toRefs 的使用方法

```js
let person = reactive({
      name:'猪猪',
      age:20,
      job:{
        p1:{
          money:10
        }
      }
    })

    // 使用场景：想要把响应式对象中的某个属性单独提供给外部使用时 这样模板写法会清晰一点
    // toRef 可以创建ref对象，
    // 参数一是源数据，参数二是对应属性
    const x = toRef(person,'name')
    console.log(x)
    

    return {
      // toRefs 可以创建一批ref对象，使用拓展运算符给到模板使用
      // 只用传递一个参数 传递源数据就可以
      ...toRefs(person)
    };

//模板中就不需要使用 person. 来使用数据

  <div>姓名:{{name}}</div>
  <div>年龄:{{age}}</div>
  <div>工资:{{job.p1.money}}</div>
  <button @click="name+='~'">姓名修改</button>
  <button @click="age++">年龄修改</button>
  <button @click="job.p1.money++">工资修改</button>

注意点:数据中的属性名不可以重复！！！
```

##### customRef 自定义ref的使用

```js
    <input type="text" v-model="keyword" />
    <h3>{{ keyword }}</h3>
    
    let keyword = myRef('hello');

    // 自定义ref--myRef  实现输入框的值500ms后出现在都下面的div中
    function myRef(value) {
      // customRef 用于创建自定义ref 是一个函数 需要返回一个对象
      // 有两个参数 track(追踪) trigger(触发)
      return customRef((track, trigger) => {
        // 定义定时器变量
        let timer;
        return {
          // 数据被读取时调用get
          get() {
            console.log(value);
            // 执行 track 跟踪value的值 需要在 return 之前调用
            track();
            return value;
          },
          // 数据被修改时调用set 参数是最新值
          set(newVal) {
            // 每次修改都清空一次定时器 防抖
            clearTimeout(timer);
            timer = setTimeout(() => {
              // 把最新的值给到原本的value
              value = newVal;
              // 执行 trigger 通知vue重新更新模板
              trigger();
            }, 500);
          },
        };
      });
```

##### teleport的使用  实现把模板传送到任意的结构中

```vue
// to的值可以是标签名 body html 或者是选择器
<teleport to="移动位置">
	<div v-if="isShow" class="mask">
		<div class="dialog">
			<h3>我是一个弹窗</h3>
			<button @click="isShow = false">关闭弹窗</button>
		</div>
	</div>
</teleport>
```

##### Suspense的使用   实现异步加载组件

```vue
<template>
	<div class="app">
		<h3>我是App组件</h3>
        // 使用 Suspense 把组件包裹起来
		<Suspense>
           //  这里的 default 和 fallback 是固定写法 不能更改
           //  default 显示正常组件加载的时候 fallback 显示组件没有加载完成的时候
			<template v-slot:default>
				<Child/>
			</template>
			<template v-slot:fallback>
				<h3>加载中.....</h3>
			</template>
		</Suspense>
	</div>
</template>

import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(()=>import('./components/Child.vue'))
export default{
	components:{
	Child
	}
}
```

##### 在setup中怎么使用vuex

```js
// 在 vuex 中结构获取得到 useStore 
import { useStore } from "vuex";

setup() {
		// 执行 useStore() 获取到 store 实例
        const store = useStore()
        console.log(store.state.count)
}
```

##### 在vue3中使用plugins来定义变量(原型)

```js
export default {
    install(app) {
      app.config.globalProperties.$name = "tom"
    }
}

import plugins from './plugins'
createApp(App).use(plugins).mount('#app')

//在组件中获取值
import { getCurrentInstance } from 'vue'

//调用 getCurrentInstance() 返回组件实例
const instance = getCurrentInstance()
console.log(instance.appContext.config.globalProperties.$name)

```

##### setup中使用router

```js
import {useRoute,useRouter} from 'vue-router'

//获取到 route 和 router 实例
const route = useRoute()
const router = useRouter()
```

