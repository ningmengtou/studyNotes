##### store 目录结构

```
├─store
│  │  index.js
│  │  
│  ├─count
│  │      actionCreators.js
│  │      constant.js
│  │      index.js
│  │      reducer.js
│  │      
│  └─list
│          actionCreators.js
│          constant.js
│          index.js
│          reducer.js


```

#### store/list/actionCreators

```react
import * as actionType from './constant'
import axios from 'axios'

export const changeListAction = (payload) => {
    return {
        type: actionType.CHANGE_LIST,
        payload
    }
}

export const getListAsync = () => {
    return (dispatch, getState) => {
        // getState() 获取 state 中的值
        // console.log(getState(), 'getState');
        axios.get('http://localhost:8000/users').then(res => {
            // 获取到数据再把数据dispatch到store中
            dispatch(changeListAction(res.data))
        })
    }
}
```

##### store/count/constant

```react
export const CHANGE_LIST = 'CHANGE_LIST'
```

##### store/count/reducer

```react
const defaultState = {
    list: []
}

function listReducer(state = defaultState, action) {
    const { type, payload } = action
    switch (type) {
        case 'CHANGE_LIST':
            return { ...state, list: payload }
        default:
            return state
    }
}

export default listReducer
```

##### store/index.js

```react
import { createStore, applyMiddleware, compose,combineReducers } from "redux";
import thunk from 'redux-thunk'

import countReducer from './count/index'
import listReducer from './list/index'

// redux-devtools 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose  // 开发环境
// const composeEnhancers =  compose  // 生成环境


const reducers = combineReducers({
    countReducer,
    listReducer
})

// 通过 applyMiddleware 来使用 thunk 中间件
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
```

##### store/list/index.js

```react
import listReducer from './reducer'
export default listReducer
```

##### src/index.js

```react
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import store from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <App />
  </Provider>
);
```

##### 自定义thunk中间件

```react
const store = createStore(reducers)

// 自定义thunk中间件
function thunkFn(store) {
    // 保存原本的dispatch方法
    const next = store.dispatch
    // 自定义dispath接受action
    function dispatchFn(action) {
        if (typeof action === 'function') {
            // action为函数则执行anction
            action(store.dispatch, store.getState)
        } else {
            // 为对象则用原本的dispatch派发action
            next(action)
        }
    }
    // 修改原本dispatch的指向
    store.dispatch = dispatchFn
}

thunkFn(store)
```

