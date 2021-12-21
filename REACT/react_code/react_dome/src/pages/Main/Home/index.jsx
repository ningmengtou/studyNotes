import React from "react";
import HeadNav from '../../../components/HeadNav'
import Swiper from '../../../components/Swiper'


import Banner1 from '../../../assets/images/banner1.png'
import Banner2 from '../../../assets/images/banner2.png'
import Banner3 from '../../../assets/images/banner3.png'

import HomeHotList from './HomeHotList'

import { useSelector } from "react-redux";

const Home = () => {
    // 从 store 获取到城市
    const cityName = useSelector(state=>state.city.cityName)

    return (
        <div>
            <HeadNav city={cityName} />
            <Swiper banners={[Banner1, Banner2, Banner3]} />
            <HomeHotList city={cityName}/>
        </div>
    )
}


export default Home
