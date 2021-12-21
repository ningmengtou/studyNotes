import { SET_LOGIN, OUT_LOGIN } from "../constants";

const defaultState = {
    user: {
        token: "",
        nick: ""
    }
}


const login = (state = defaultState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {
                user: action.user
            }
        case OUT_LOGIN:
            return {
                user: {
                    token: "",
                    nick: ""
                }
            }
        default:
            return state
    }
}


export default login