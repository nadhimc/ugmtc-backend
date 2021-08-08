const express = require("express");

const app = express()

app.use(()=>{
    console.log(`server run in port ${process.env.SERVER_PORT?process.env.SERVER_PORT:4000}`)
})

app.listen(process.env.SERVER_PORT?process.env.SERVER_PORT:4000)