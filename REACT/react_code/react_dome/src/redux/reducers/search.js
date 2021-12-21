import { INIT_SEARCH, CHANGE_SEARCH } from "../constants"

const defaultState = ''

const search = (state = defaultState, action) => {
    switch (action.type) {
        case INIT_SEARCH:
            return action.searchVal;
        case CHANGE_SEARCH:
            return action.searchVal;
        default:
            return state
    }
}

export default search