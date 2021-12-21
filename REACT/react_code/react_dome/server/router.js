const express = require("express");
const router = express.Router();
const homehotData = require("./data/home/homehot")
const searchhotData = require("./data/search/searchhot")
const detailsData = require("./data/details")
const commentData = require("./data/comment")
const orderData = require("./data/order")
const Mock = require('mockjs')

const url = require("url");


router.get("/homehot1", (req, res) => {
    const city = url.parse(req.url, true).query.city;
    res.send({
        data: homehotData.hot1,
        status: 200,
        cityName: city
    })
})


router.get("/homehot2", (req, res) => {
    const city = url.parse(req.url, true).query.city;
    res.send({
        data: homehotData.hot2,
        status: 200,
        cityName: city
    })
})

router.get("/search", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    // 模拟数据
    const Random = Mock.Random
    let data = Mock.mock({
        hasMore: true,
        'data|5': [{
            id: Random.natural(),
            img: Random.image('800x600', Random.color(), '#FFF', 'png', Random.csentence(5)),
            price: "<h3>130000</h3>",
            rentType: "整租",
            title: Random.csentence(7)
        }]
    })
    res.send({
        data,
        status: 200
    })
})

router.get("/details", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    res.send(detailsData)
})

router.post("/login", (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        res.send({
            status: 200,
            token: 'opslemxnjkcybqtyzrerbvcnnvkdsjiermxnc',
            username,
        })
    } else {
        res.send({
            status: 400,
            msg: '用户名或者密码错误'
        })
    }
})

router.get("/comment", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    res.send({
        status: 200,
        commentData
    })
})


router.get("/order", (req, res) => {
    const username = url.parse(req.url, true).query.username;
    res.send({
        status: 200,
        orderData
    })
})


router.post("/ordercomment",(req,res) =>{
    const content = req.body.content;
    res.send({
        msg:true
    })
})






module.exports = router;