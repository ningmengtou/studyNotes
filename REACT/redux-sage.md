##### 基本流程    //store.js

```js
npm i redux-saga

import { createStore, applyMiddleware } from "redux"
import reducer from "./reducer"
import createSageMidlleWare from 'redux-saga'
import watchSaga from './saga'

// 利用 createSageMidlleWare 生成 saga 实例
const SageMidlleWare = createSageMidlleWare()

const store = createStore(reducer, applyMiddleware(SageMidlleWare))

// 执行saga的监听
SageMidlleWare.run(watchSaga)
export default store
```

##### saga.js

```js
import { take, fork, call, put ,takeEvery} from 'redux-saga/effects'

// watchSaga 监听函数是一个生成器
function* watchSaga() {
    while (true) {
        // take 监听组件发来的action
        yield take("get-list")
        // fork 同步执行异步处理函数
        yield fork(getList)
    }
    //takeEvery 写法是上面代码的简化版
    yield takeEvery("get-list",getList)
}

function *getList() {
    // call 执行异步处理的函数 接收的是promise函数 阻塞得调用它
    let result = yield call(getListAction)

    // put 用于发送action
    yield put({
        type: "change-list",
        payload: result
    })
}

// 请求数据的方法
function getListAction() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['111', '222', '333'])
        }, 2000)
    })
}

export default watchSaga
```

##### reducer,js

```js
const defaultState = {
    list1:[]
}

function reducer(preState = defaultState, action) {
    const { type,payload } = action
    const newState = {...preState}
    switch (type) {
        case 'change-list':
            newState.list1 = payload
            return newState
        default:
            return preState
    }
}

export default reducer
```

##### App.jsx

```react
import React from 'react'
import store from "./redux/store"

export default function App() {
  return (
    <div>
        <button onClick={()=>{
            if(store.getState().list1.length === 0) {
                store.dispatch({
                    type:'get-list'
                })
            }else {
               console.log(store.getState().list1);
            }
        }}>点击回去请求数据</button>
    </div>
  )
}
```

##### 同时监听多个watchsaga函数

```js
import {all} from "redux-saga/effects"
import watchsaga1 from './saga/saga1'
import watchsaga2 from './saga/saga2'

function *watchSaga() {
    //all 用于把多个saga监听方法合并起来
	yield all([watchsaga1(),watchsaga2()])
}

//暴露出去的watchSaga方法在store中run就行
export default watchSaga
```

