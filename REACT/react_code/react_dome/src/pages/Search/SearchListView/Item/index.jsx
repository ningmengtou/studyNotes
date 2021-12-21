import React, { useState } from "react";
import { Link } from "react-router-dom";

import { imgLoad } from "../../../../utils/util"
import defaultImg from "../../../../assets/images/default.png"

import './style.scss'

const Item = (props) => {
    const data = props.data

    // 图片地址为默认图片地址
    const [img, setImg] = useState(defaultImg)

    // 等图片加载完成之后把真实图片地址进行替换
    imgLoad(data.img).then(res => {
        setImg(res)
    }).catch(err=>{
        console.log(err)
    })

    return (
        <div className="list-item">
            <Link to={`/details/${data.id}`}>
                <img src={img} alt="" />
                <div className="mask">
                    <div className="left">
                        <p>{data.title}</p>
                        <p>{data.houseType}</p>
                    </div>
                    <div className="right">
                        <div className="btn">
                            {data.rentType}
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: data.price + "/月" }}></p>
                    </div>
                </div>
            </Link>
            
        </div>
    )
}

export default Item