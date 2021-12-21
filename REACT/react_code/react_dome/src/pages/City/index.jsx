import React, { useState } from 'react'

import CityHeader from "../../components/PubHeader"
import CurrentCity from './CurrentCity'
import CityList from "./CityList"
import CityLists from "./CityLists"


import { useSelector, useDispatch } from 'react-redux'
import { initCity, changeCity } from '../../redux/actions/city'

const City = () => {

    // useDispatch() 获取 dispatch 方法
    const dispatch = useDispatch()
    // useSelector 可以读取到 store 中的值
    const cityName = useSelector(state => state.city.cityName)


    const cityClick = (city) => {
        // dispatch 接受一个 action 就可以改变 store 中的值
        dispatch(changeCity(city))
    }

    return (
        <div>
            <CityHeader title={'城市选择'} />
            <CurrentCity city={cityName} />
            <CityList cityClick={cityClick} />
            <CityLists cityClick={cityClick} />
        </div>
    )
}

export default City