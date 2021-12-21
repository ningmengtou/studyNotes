import {COLLECT,UNCOLLECT} from "../constants"

const defaultState = []

const collect = (state = defaultState,action)=>{
    switch(action.type) {
        case COLLECT:
            return [
                ...state,
                action.id
            ]
        case UNCOLLECT:
            return state.filter(item=>item !== action.id)
        default :
            return state
    }
}

export default collect