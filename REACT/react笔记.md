##### setState的更新问题

```
setState处在同步逻辑中，异步更新状态，异步更新真实dom
setState处在异步逻辑中，同步更新状态，同步更新真实dom

setState的第二个参数是回调函数，函数会在状态和dom更新完之后调用
```

##### react中表单设置默认值

```
在 React 渲染生命周期时，表单元素上的 value 将会覆盖 DOM 节点中的值，在非受控组件中，你经
常希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个
defaultValue 属性，而不是 value 。

同样， <input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked ， <select> 和 <textarea> 支持 defaultValue 。

如果想要实现受控组件，需要直接用value绑定状态，用onChange事件改变状态，实现组件受控
```

##### 组件设计

```
组件是无状态 受控组件 所有的数据依托父组件传递
```

##### 表单组件设计

```
可以使用ref形式来获取组件值，修改组件值
```

##### react性能优化方案

```
1.shouldComponentUpdate
2.PureComponent
```

##### useEffect和useLayoutEffect的区别

```
调用时机不同
useEffect是在整个页面渲染完成后调用的代码
useLayoutEffect是在react完成dom个更新后马上调用的代码，会阻塞页面渲染

如果想避免页面抖动 需要操作dom的代码可以放在useLayoutEffect里面 这样只有一次回流重绘的代价
```

##### useCallback 记忆函数

```js
//防止因为组件重新渲染，导致方法被重新创建，起到缓存作用，只有第二个参数变化才会重新声明
let [name,setName] = useState('xixi')
let handleClick = useCallback(()=>{
	console.log(name)
},[name])
//1.只有name被改变了 函数才会重新声明
//2.如果传入空数组，那第一次创建后就被缓存，name后期改变了，拿到的还是老的name
//3.如果不传第二个参数，每次都会重新声明一次，拿到的是最新的name
```

##### useMemo  记忆组件 类似计算属性

```jsx
//useMemo 根据依赖来返回一个结果

let [name,setName] = useState('xixi')
let handleClick = useMemo(()=>{
	return name+'123'
},[name])

//useCallback 常用于记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而useMemo更适合通过计算得到一个确定的值，比如记忆组件
```

##### useReducer 使用方法

```jsx
//reducer 处理函数
//preState 之前的状态 action 调用dispat传递过来的对象
const reducer = (preState,action)=>{
    //拷贝一份新状态
    let newState = {...preState}
    //根据 type 来区分如何改变状态值
    switch(action.type) {
        case 'add':
            newState.count++
            return newState
        case 'minus':
            newState.count--
            return newState
        //没有匹配到则返回默认值
        default:
            return preState
    }
} 

//initState 状态初始值 
const initState = {
	count:0
}
	
export default ()=>{
    // reducer 处理函数 initState 状态初始值
	// state 状态值 改变状态的唯一方法 dispatch
	const [state,dispatch] = useReducer(reducer,initState)
    
    return (
    	<div>
            <div onClick={()=>{
                    dispatch({type:'add'})
                }}>+</div>
            <div>{state.count}</div>
            <div onClick={()=>{
                    dispatch({type:'minus'})
                }}>-</div>
        </div>
    )
}	
```

##### 路由拦截

```jsx
//render 接受一个函数 通过判断是否登录起到路由跳转拦截的作用
<Route path="/center" render={()=>{
    //使用 Redirect 重定向到登录页面 页面地址和组件都会一起更改
	return 是否登录 ? <Center/> : <Redirect to="/login" component={Login}>
}}><>
```

##### 获取路由跳转的方法

```jsx
<Route path="/center" render={(props)=>{
    //props 参数就是 Route 组件传递的跳转页面的方法(history,match等)
	return 是否登录 ? <Center {...props}/> : <Redirect to="/login" component={Login}/>
}}/>
```

##### 纯函数

```
原则（同时满足两点）
1.对外界没有副作用（如更改接收的参数会更改到外部变量）
2.同样的输入得到同样的输出
```

##### 中间件 redux-promise

```jsx
npm i redux-promise
import reduxPromise from 'redux-promise'
import {applyMiddleware} from 'redux'
const store = createStore(reducer,applyMiddleware(reduxPromise))
```

##### 高阶函数的基本实现

```jsx
//connect 接受两个参数
//参数一是函数 需要返回一个对象数据
//参数二是对象 传递的是回调函数
function connect(cb,obj) {
    //执行 cb 函数获取数据
	let value = cb()
    //connect 第一次执行返回的也是函数 参数就是 Mycompont 组件
	return (Mycomponent)=>{
        //第二次执行则直接渲染接收到的组件 可以拿到 props 参数
        return (props)=>{
            //可以实现渲染拦截
            //通过 ... 把 value obj props 数据给到Mycompont组件 让组件有更多功能
            <div style={color:'red'}>
                <Mycomponent {...value} {...obj} {...props}/>
            </div>
        }
    }
}

export default connect(()=>{
    return {
        a:1,b:2
    }
},{
    aa() {},
    bb() {}
})(Mycomponent) 
```

##### immutabel   生成一个不可变对象

```js
npm i immutabel
import {Map,List,fromJS} from 'immutabel'

const obj = {
	name:'xixixi',
	age:10
}
//通过Map创建不可变对象
const oldimmut = Map(obj)
//set 修改不可变对象的值
const newimmut = oldimmut.set('name','ooo')
//get 获取不可变对象的值
let name = oldimmut.get('name')
//通过方法转成普通对象  immuatabel=>普通对象
const newObj = newimmut.toJS()

const arr = [1,2,3]
//通过List创建不可变数组
const arr2 = List(arr)
//可以使用普通的数组方法更改值,不会影响原数组
arr2.push(5)
//通过toJS转换回来
arr2.toJS()

//这是最正常的写法
//通过 fromJS 直接把复杂的数据转成Map和List解构
const test = fromJS({
    name:'xixi',
    arr:[1,2,3],
    fav:{
        like:'viviv'
    }
})
//通过 setIn 可以深层修改结构
//参数一是数组 按照顺序把key填进去 参数二就是修改的值
//对象的修改
test.setIn(['fav','like'],'vovov')
//数组的修改 只需要写好数组的索引值
test.setIn(['arr',1],20)
//数组的更新 参数二是一个函数需要返回处理过的数组 函数参数就是要被修改的数组
test.updateIn(['arr'],(list)=>{
    return  list.splice(1,1)
})
```

##### Mobx

```js
//observabel 改造可观察对象  autorun 可执行函数(监听者)
import {observabel,autorun} from 'mobx'

//对于普通类型数据的监听
let obNumber = observabel.box(10)
//对于对象数据的监听
let obObj = observabel({
	name:'xixi',
    age:20
})

//第一次会执行，之后更改了值也会执行
//只会监听到和自己相关的值改变
autorun(()=>{
    //console.log(obNumber.get())
    console.log(obObj.name)
})

setTimeout(()=>{
	obNumber.set(20)
},1000)
setTimeout(()=>{
	//obObj.set('name','vovo')
    obObj.name = 'vovo'
},1000)


```

