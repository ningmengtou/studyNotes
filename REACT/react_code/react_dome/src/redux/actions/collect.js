import { COLLECT,UNCOLLECT } from "../constants"


export const setCollect = (id) => {
    return {
        type: COLLECT,
        id
    }
}

export const removeCollect = (id) => {
    return {
        type: UNCOLLECT,
        id
    }
}