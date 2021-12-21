import React from "react";
import Swiper from "../../../components/Swiper"
import PubHeader from "../../../components/PubHeader";
import Buyandstore from "../Buyandstore";

import CommentList from "../CommentList";
import Tabs from "../../../components/Tabs"
import './style.scss'

const DetailsView = (props) => {

    const { infoData: data } = props
    return (
        <div>
            <PubHeader title={"房屋信息"} />
            <Swiper banners={data.imgs} />
            <Tabs>
                <div className="Tab_title_wrap" label="详情">
                    <div className="detail-info" >
                        <h3>{data.title}</h3>
                        <div className="box">
                            <ul>
                                <li>
                                    <span>{data.price}/月</span>
                                    <p>租金</p>
                                </li>
                                <li>
                                    <span>{data.info.type}/月</span>
                                    <p>房型</p>
                                </li>
                                <li>
                                    <span>{data.houseType}</span>
                                    <p>面积</p>
                                </li>
                            </ul>
                        </div>
                        <div className="info">
                            <div className="info-list">
                                <p>楼层：{data.info.level}</p>
                                <p>装修：{data.info.style}</p>
                            </div>
                            <div className="info-list">
                                <p>类型：{data.info.type}</p>
                                <p>朝向：{data.info.orientation}</p>
                            </div>
                            <div className="info-list">
                                <p>年代：{data.info.years}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Tab_title_wrap" label="评价">
                    <CommentList id={props.id}/>
                </div>
            </Tabs>
            <Buyandstore id={props.id} />
        </div>
    )
}

export default DetailsView