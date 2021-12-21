import React from "react";
import SearchInput from "../../../components/SearchIput"
import { useSelector ,useDispatch } from "react-redux";
import { changeSearch } from "../../../redux/actions/search";
import './style.scss'

const SearchHeader = (props) => {

    const clickHandle = ()=> {
        window.history.back()
    }

    return (
        <div id="search-header" className="clear-fix">
            <span className="back-icon float-left" onClick={clickHandle}>
                <i className="icon-chevron-left"></i>
            </span>
            <div className="input-container">
                <i className="icon-search"></i>
                <SearchInput keywords={props.keywords} />
            </div>
        </div>
    )
}

export default SearchHeader