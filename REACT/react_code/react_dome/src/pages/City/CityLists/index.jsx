import React from "react";
import CitySelect from 'react-city-select';
import cityData from '../../../utils/cityData'
import { withRouter } from "react-router";


const CityLists = (props) => {

    // 选中城市回调
    const handleSelectCity = (cityData) => {
        props.cityClick(cityData.name)
        props.history.push('/')
    }

    const config = {
        hot: {
            title: '热门城市',
            key: '热门',
            style: 'grid', // 展示形式（ line || grid）
        }
    }

    return (
        <CitySelect
            // 传入数据
            data={cityData}
            // 传入配置
            config={config}
            // 传入回调
            onSelectItem={handleSelectCity}>
        </CitySelect>
    )
}

export default withRouter(CityLists)