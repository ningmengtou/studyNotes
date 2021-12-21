import ReactDOM from "react-dom";
import store from './redux/store';
// Provider 可以为每一个容器组件传递 store 
import { Provider } from "react-redux";

import App from "./App";

ReactDOM.render(
    // 通过 Provider 包裹的 App 组件的所有子代组件都会接受到 store 的 props
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))

