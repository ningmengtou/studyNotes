import {CHANGE_SEARCH,INIT_SEARCH} from '../constants'

export const initSearch = (val)=> {
    return {
        type:INIT_SEARCH,
        searchVal:val
    }
}

export const changeSearch = (val)=> {
    return {
        type:CHANGE_SEARCH,
        searchVal:val
    }
}

