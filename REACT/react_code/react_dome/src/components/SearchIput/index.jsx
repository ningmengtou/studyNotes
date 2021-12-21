import React, { useState ,useEffect } from "react";
import { withRouter } from "react-router";
import { useDispatch,useSelector } from "react-redux";
import { changeSearch } from "../../redux/actions/search";
import './style.scss'

const SearchIput = (props) => {
    // props 受控
    const [keywords, setKeywords] = useState(props.keywords)

    const dispatch = useDispatch()
    const searchVal = useSelector(state=>state.search)

    const keyUpHandle = (e) => {
        if (keywords.trim()) {
            if (e.keyCode === 13) {
                dispatch(changeSearch(keywords))
                props.history.push('/search/' + keywords)
            }
        }
    }

    const changeHandle = (e) => {
        setKeywords(e.target.value)
    }

    // 每次回退监听 props.keywords(路由参数变化)
    // 有值则改变文本值和重写reducer 没值则让reducer为空
    useEffect(()=>{
        dispatch(changeSearch(props.keywords))
        setKeywords(props.keywords)
    },[props.keywords,searchVal])

    return (
        <input
            type="text"
            className="search-input"
            placeholder="请输入搜索内容"
            onKeyUp={keyUpHandle}
            onChange={changeHandle}
            value={keywords}
        />
    )
}

export default withRouter(SearchIput)