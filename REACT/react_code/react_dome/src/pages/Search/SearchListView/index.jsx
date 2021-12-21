import React from "react";
import Item from "./Item";

// import {imgLoad} from ""

const SearchListView = (props) => {

    return (
        <div>
            {
                props.searchData.map(data => {
                    return <Item  data={data} />
                })
            }
        </div>
    )
}

export default SearchListView