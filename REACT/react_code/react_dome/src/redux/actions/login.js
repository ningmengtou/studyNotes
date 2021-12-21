import { SET_LOGIN,OUT_LOGIN } from "../constants";

export const setLogin = (user)=> {
    return {
        type:SET_LOGIN,
        user
    }
}

export const outLogin = ()=> {
    return {
        type:OUT_LOGIN
    }
}