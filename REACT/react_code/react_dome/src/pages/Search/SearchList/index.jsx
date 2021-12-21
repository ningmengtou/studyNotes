import React, { useState, useEffect } from "react";
import api from '../../../api'
import SearchListView from "../SearchListView";
import LoadMore from "../../../components/LoadMore"

const SearchList = (props) => {

    const [searchData, setSearchData] = useState([])
    const [isData, setIsData] = useState(false)

    useEffect(() => {
        http()

        // 需要取消网络请求，清空state值
        return ()=>{
            setSearchData([])
            setIsData(false)
        }
    }, [props.keywords])
    // 这里每次监听的是 props.keywords 值的变化，有变化则重新请求

    const http = () => {
        api.getSearchHot({
            search: props.keywords
        }).then(res => {
            if (res.status === 200) {
                setSearchData([...searchData, ...res.data.data.data])
                setIsData(res.data.data.hasMore)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    // 获取更多数据
    const getMore = () => {
        http()
    }

    return (
        <div>
            {
                searchData.length > 0 ?
                    <SearchListView searchData={searchData} /> :
                    <div>数据加载中...</div>
            }
            {
                isData ?
                    <LoadMore getMore={getMore} /> :
                    <div>没有数据了...</div>
            }

        </div>


    )
}

export default SearchList