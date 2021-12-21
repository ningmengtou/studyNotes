import React from "react";
import ReactDOM from "react-dom";
import store from './redux/store'

import App from "./App";

ReactDOM.render(<App />, document.getElementById('root'))

// 直接在 index.js 中监听 store 的状态变更
store.subscribe(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})