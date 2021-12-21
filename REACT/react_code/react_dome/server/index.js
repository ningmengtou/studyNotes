const express = require("express");
const app = express();
const router = require("./router")
const cors = require("cors")
const bodyParser = require("body-parser");


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(cors())
// const debug = require("debug")("my-application");

app.use("/api",router);

app.listen(3200,() =>{
    // debug("server run at port 3200");
    console.log('运行成功')
})