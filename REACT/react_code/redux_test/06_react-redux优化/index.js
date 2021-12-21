import React from "react";
import ReactDOM from "react-dom";
import store from './redux/store';
// Provider 可以为每一个容器组件传递 store 
import { Provider } from "react-redux";

import App from "./App";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))

