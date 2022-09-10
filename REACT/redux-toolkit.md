##### 安装

```
yarn add @reduxjs/toolkit react-redux

├─store
│  │  index.js
│  │  
│  └─module
│          counter.js
│          user.js
```

##### store/index

```react
import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './module/counter'
import userReducer from './module/user'

// configureStore 创建 store 
const store = configureStore({
    reducer: {
        counterReducer,
        userReducer
    }
})

export default store
```

##### src\store\module\counter.js

```react
import { createSlice } from "@reduxjs/toolkit";

//createSlice 创建片段
const counterSlice = createSlice({
    // 唯一别名
    name: 'counter',
    // 初始化值
    initialState: {
        count: 100
    },
    reducers: {
        addCount(state, { payload }) {
            // 可以直接修改 state 不需要return一个新的对象返回值
            state.count = state.count + payload
        }
    }
})

// 分别导出修改state的actions
export const { addCount } = counterSlice.actions

// 默认导出reducer
export default counterSlice.reducer
```

##### src\store\module\user.js

```react
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk 创建异步action获取数据
// 参数一是 type别名 参数二是回调函数
// 最后导出asyncUserList方法提供调用
export const asyncUserList = createAsyncThunk(
    'user/axiosList',
    // 回调函数中也有两个参数
    // 参数一是调用该方法传递的参数
    // 参数二是store
    async (_, store) => {
        // 1.直接把结果返回会执行 extraReducers 中的方法
        const res = await axios.get('http://localhost:8000/users')
        return res.data

        // 2.通过store中的dispatch来更改list
        // store.dispatch(userSlice.actions.changeList(res.data))
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        list: []
    },
    reducers: {
        changeList(state, { payload }) {
            state.list = payload
        }
    },
    // 异步reducer
    extraReducers: {
        // fulfilled 状态为成功返回数据
        [asyncUserList.fulfilled](state, { payload }) {
            state.list = payload
        }
    }
})


export default userSlice.reducer
```

