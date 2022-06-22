import express from "express"
import fs from "fs"
import cors from "cors"
import rateLimit from "express-rate-limit"
const port = process.env.PORT || 5000
const app = express()
const path = require('path');


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30 // limit each IP to 100 requests per windowMs
})


app.use(express.static("public"))
app.use(limiter)
app.use(cors())
// api key
const apikey = [

    "dev",
    "0bk3s6IAyq",
    "T6j6vW01A2",
    "mr83ssr0hK",
    "mr8e2r0hK",
]
app.get("/", (req, res) => {
    res.send("https://nkno.site")
})
app.get("/random", (req, res) => {
    const key = req.query.apikey
    const result = {}
    result.code = 200
    const imageList = path.resolve(__dirname, './public');
    const randomImage = imageList[Math.floor(Math.random() * imageList.length)]
    result.url = `https://post.nkno.site/${randomImage}`
    result.author = "nknodev"
    res.header("Content-type", "application/json; charset=utf-8")
    if (apikey.includes(key)) {
        res.send(JSON.stringify(result, null, 2))
        console.log(result)
    } else {
        const result = {}
        result.code = 403
        result.message = "Invalid API key"
        res.send(JSON.stringify(result, null, 2))
    }
})
/*
app.get("/rushia", (req, res) => {
    const key = req.query.apikey
    const result = {}
    result.code = 200
    const imageList = fs.readdirSync("./public/rushia")
    const randomImage = imageList[Math.floor(Math.random() * imageList.length)]
    result.url = `127.0.0.1:5000/rushia/${randomImage}`
    result.author = "HELLSNAKE , Sunglows Team"
    result.source = "https://github.com/HELLSNAKES/image-random-api"
    res.header("Content-type", "application/json; charset=utf-8")
    if (apikey.includes(key)) {
        res.send(JSON.stringify(result, null, 2))
        console.log(result)
    } else {
        const result = {}
        result.code = 403
        result.message = "Invalid API key, please contact admin to get key"
        res.send(JSON.stringify(result, null, 2))
    }
})*/
app.listen(port, function () {
    console.log(`Server listening on port ${port}\n`)
})
