import React from "react";
import SearchIput from "../../components/SearchIput";
import SearchHeader from "./SearchHeader";
import SearchList from "./SearchList";


const Search = (props) => {
    const { keywords } = props.match.params

    return (
        <div>
            <SearchHeader keywords={keywords} />
            <SearchList keywords={keywords} />
        </div>
    )
}

export default Search