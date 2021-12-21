import React, { useState, useEffect } from "react";
import api from '../../../../api/index'
import HomeHotView from "../HomeHotView";



// 这个组件只处理数据 把处理完的数据通过组件传值给到视图组件
const HomeHotList = (props) => {
    const [homeHot1, setHomHot1] = useState([])
    const [homeHot2, setHomHot2] = useState([])

    const [cityName,setCityName] = useState(props.city)

    useEffect(() => {
        api.getHomeHot1({
            city:props.city
        }).then(res => {
            if (res.status === 200) {
                setHomHot1(res.data.data)
                setCityName(res.data.cityName)
            }
        })
    }, [])

    useEffect(() => {
        api.getHomeHot2({
            city:props.city
        }).then(res => {
            if (res.status === 200) {
                setHomHot2(res.data.data)
                setCityName(res.data.cityName)

            }
        })
    }, [])


    return (
        <div>
            {/* 先判断是否有数据再把数据返回到视图 */}
            {
                homeHot1.length > 0 ? <HomeHotView cityName={cityName} homeData={homeHot1} title={'新品推荐'}></HomeHotView> : <div>数据加载中...</div>
            }
            {
                homeHot2.length > 0 ? <HomeHotView cityName={cityName} homeData={homeHot2} title={'热门爆款'}></HomeHotView> : <div>数据加载中...</div>
            }
        </div>
    )
}

export default HomeHotList