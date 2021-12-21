import { INIT_CITY, CHANGE_CITY } from "../constants"

// 创建对应的 action 对象

export const initCity = (cityName) => {
    return {
        type: INIT_CITY,
        cityName
    }
}

export const changeCity = (cityName) => {
    return {
        type: CHANGE_CITY,
        cityName
    }
}