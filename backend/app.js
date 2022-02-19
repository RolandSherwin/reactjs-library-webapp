const express = require("express")
const bodyParser = require("body-parser")
const setup = require("./routes/setup")
const app = express();
const port = 3000;

// for post
app.use(bodyParser.json())

app.use('/', setup.router)
app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.send("Error occured!", err)
})

app.listen(port, ()=>{
    console.log("Running backend at port: ", port)
})