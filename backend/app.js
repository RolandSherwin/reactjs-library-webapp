const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const port = 3000;

// for post
app.use(bodyParser.json())

app.get("/setup", (req,res)=>{
    res.send("DB Successfully Setup!")
})

app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.send("Error occured!")
})

app.listen(port, ()=>{
    console.log("Running backend at port: ", port)
})