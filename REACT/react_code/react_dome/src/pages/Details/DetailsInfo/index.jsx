import React, { useState, useEffect } from "react";
import api from "../../../api"
import DetailsView from "../DetailsView";

const DetailsInfo = (props) => {

    const [infoData, setInfoData] = useState({})


    useEffect(() => {
        api.getDetailsHot({
            id: props.id
        }).then(res => {
            if (res.status === 200) {
                setInfoData(res.data)
            }
        })
    }, [])



    return (
        <div>
            {
                infoData.houseType ? 
                <DetailsView infoData={infoData} id={props.id}/> :
                <div>数据加载中...</div>
            }
        </div>
    )
}

export default DetailsInfo