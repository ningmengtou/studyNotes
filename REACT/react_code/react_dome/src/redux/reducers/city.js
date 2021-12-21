import { INIT_CITY, CHANGE_CITY } from "../constants"

// 创建默认值
const defaultState = {
    cityName: '成都'
}

// 创建 reducers 方法 state默认就是默认值
const city = (state = defaultState, action) => {

    // 根据不同的 action 来改变值
    switch (action.type) {
        case INIT_CITY:
            return {
                cityName: action.cityName
            };
        case CHANGE_CITY:
            return {
                cityName: action.cityName
            };
        default:
            return state
    }
}

export default city