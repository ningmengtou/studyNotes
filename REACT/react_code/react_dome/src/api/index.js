import axios from "axios";

const base = {
    baseUrl: 'http://localhost:3200',
    homehot1: '/api/homehot1',
    homehot2: '/api/homehot2',
    searchhot: '/api/search',
    detailshot: '/api/details',
    login: '/api/login',
    getComment:"/api/comment",
    getOrder:"/api/order",
    subcomment:'/api/ordercomment'
}


// 请求方法

const api = {
    getHomeHot1(params) {
        return axios.get(base.baseUrl + base.homehot1, {
            params
        })
    },
    getHomeHot2(params) {
        return axios.get(base.baseUrl + base.homehot2, {
            params
        })
    },
    getSearchHot(params) {
        return axios.get(base.baseUrl + base.searchhot, {
            params
        })
    },
    getDetailsHot(params) {
        return axios.get(base.baseUrl + base.detailshot, {
            params
        })
    },
    login(params) {
        return axios.post(base.baseUrl + base.login, params)
    },
    getComment(params) {
        return axios.get(base.baseUrl + base.getComment,{
            params
        })
    },
    getOrder(params){
        return axios.get(base.baseUrl + base.getOrder,{
            params
        })
    },
    subcomment(params) {
        return axios.post(base.baseUrl + base.subcomment,params)
    }
}

export default api