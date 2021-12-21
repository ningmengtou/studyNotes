import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router'

// 引入 Provider 和 store 给 AppRouter 注入 redux 
import { Provider } from 'react-redux'
import store from './redux/store'
// 用户做缓存处理
import './utils/init'


ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);


