##### Promise了解

```
new Promise Promise是函数对象(构造函数)
new Promise 创建出来的是实例对象，异步任务在实例对象中执行

promise的结果状态只有padding resolved rejected 三种状态
状态一旦改变就无法再更改

```

##### promise相对于纯回调函数的优势

```
promise中也有回调函数
1.指定回调函数的方式更加灵活
纯回调函数必须在启动异步任务之前就指定
promise可以在启动异步任务之后指定

2.支持链式调用获取结果，解决回调地狱问题
async await 是终极解决方案
```

##### promise基本使用

```js
new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('成功的结果')
        //reject('失败的结果')
    },1000)
}).then(value=>{
    //成功结果的回调函数是onResolved 
    console.log('onResolved()',value)
}).catch(reason=>{
    //成功结果的回调函数是onRejected
    console.log('onRejected()'.reason)
})
```

##### Promise.resolve()的使用

```js
//Promise.resolve()产生一个成功状态的promise对象
const p1 = new Promise((resolve,reject)=>{
	resolve(1)
})
const p2 = Promise.resolve(1)
//p1 p2 的值等价
```

##### Promise.reject()的使用

```js
//Promise.reject()产生一个失败状态的promise对象
const p1 = new Promise((resolve,reject)=>{
	reject(1)
})
const p2 = Promise.reject(1)
//p1 p2 的值等价
```

##### Promise.all()使用

```js
const p1 = new Promise((resolve,reject)=>{
    resolve(1)
})
const p2 = Promise.resolve(1)

//参数是一个数组，每个元素都是promise实例对象
//数组中每个元素都是成功状态才返回成功，有一个元素失败则失败
const pAll = Promise.all([p1,p2])
pAll.then(
    value=>{
        //成功返回的value是一个数组，和传递过来的promise数组是对应的
        console.log('成功的原因',value)//成功的原因 (2) [1, 1]
    },
    reason=>{
        console.log('失败的原因',reason)
    }
)
```

##### Promise.race()使用

```js
const p1 = new Promise((resolve,reject)=>{
	resolve(1)
})
const p2 = Promise.resolve(1)
const p3 = Promise.reject(2)

//参数是一个数组，每个元素都是promise实例对象
//数组中那个promise元素有结果就直接返回那个(不论是成功还是失败)
const pRace = Promise.race([p1,p2,p3])
pRace.then(
    value=>{
        console.log('成功的原因',value)
    },
    reason=>{
        console.log('失败的原因',reason)
    }
)
```

##### 如何改变promise对象状态？

```
1.resolve() 把状态改为resolved
2.reject() 把状态改为rejected
3.抛出异常 把状态改为rejected
```



##### promise中是先指定的状态还是先指定的回调函数？

```js
//都有可能
new Promise((resolve,reject)=>{
    resolve(1) //先指定状态，并且保存结果
}).then(
    //后指定回调函数，直接调用函数
	value=>{console.log('成功回调',value)},
    reason=>{console.log('失败回调',reason)}
)

new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1) //后指定状态，获取结果，执行回调函数
    },100)
}).then(
    //先指定回调函数，保存回调函数
	value=>{console.log('成功回调',value)},
    reason=>{console.log('失败回调',reason)}
)
```

##### promise.then()返回的新promise对象的结果状态由什么决定？

```js
//答案： 由.then()执行的回调函数的结果决定   结果由 return 返回
//1.如果抛出异常，结果状态为rejected，reason为异常结果
//2.如果返回非promise任意值，结果状态为resolved，value为任意值
//3.如果返回新的promise对象，此promise的结果就是新promise的结果
// 4.如果什么都没有返回，结果状态为resolved，value为undefined

new Promise((resolve,reject)=>{
    resolve(1)
}).then(
    value=>{
        console.log('onResolved1',value);
        // return 1
        // throw 2
        return Promise.resolve(3)
    },
    reason=>{
        console.log('onRejected1',reason);
    }
)
//这里 .then 执行的状态和结果完全由上方 .then 执行的回调函数中返回结果决定
.then(
    value=>{
        console.log('onResolved2',value);
    },
    reason=>{
        console.log('onRejected2',reason);
    }
)
```

##### promise的异常穿透

```js
//当promise使用then链式调用时，可以在最后指定失败回调
//前面的任何操作出了异常，都会传递到最后失败的回到中处理
new Promise((resolve,reject)=>{
	resolve(1)
}).then(
	value=>{
	console.log(value)
	}
).then(
	value=>{
	console.log(value)
	}
).catch(
    value=>{
	console.log(value)
	}
)
```

##### 中断promise链

```js
//当使用promise的then链式调用时，在中间断开就不会再调用后面的回调函数
//办法：再回调函数中返回一个padding状态的promise对象
new Promise((resolve,reject)=>{
	resolve(1)
}).then(
	value=>{
	console.log(value)
	}
).then(
	value=>{
		console.log(value)
        //这里promise状态为padding 后面的回调函数将不再执行
        return new Promise((resolve,reject)=>{})
	}
).then(
	value=>{
	console.log(value)
	}
)
```

##### async await

```
async 
获取值是一个promise对象
async 函数中可以没有 await

await 
await 必须写在 async 中
返回promise对象处理结果，如果不是promise对象则返回该值本身
如果是失败的状态需要用 try catch 处理
```

##### 宏队列和微队列

```
宏队列：dom事件回调，ajax回调，定时器回调
微队列：promise回调，mutation回调


js执行会区别这两个队列
1.js引擎首先会先执行完所有的初始化同步任务代码
2.每次准备取出第一个宏任务之前，会把所有的微任务一个个取出来执行(微队列优先级高于宏队列)

查看执行顺序技巧
1.先找出所有同步代码
2.再查看所有的微任务
3.最后看所有的宏任务

重点: .then需要等到上一个then任务执行完成才放置在微任务中
```

