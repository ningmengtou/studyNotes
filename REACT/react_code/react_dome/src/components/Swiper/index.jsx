import React, { useState } from "react";
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


import Pagination from "./Pagination";

import './style.scss'

// 获取自动轮播swiper
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Swiper = (props) => {

    const [index, setIndex] = useState(0)

    // 切换图片重置 index 
    const handleChangeIndex = (index) => {
        setIndex(index)
    }

    return (
        <div className="swiper">
            <AutoPlaySwipeableViews index={index} onChangeIndex={handleChangeIndex} interval={1500}>
                {
                    // 循环home传递过来的banner
                    props.banners.map((item, index) => {
                        return (
                            <div className="swiper-view" key={index}>
                                <img src={item} />
                            </div>
                        )
                    })
                }

            </AutoPlaySwipeableViews>
            {/* 把轮播图数量和当前轮播图索引传递过去 */}
            <Pagination len={props.banners.length} index={index} />
        </div>
    )
}

export default Swiper