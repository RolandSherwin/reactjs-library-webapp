const express = require("express")
const bodyParser = require("body-parser")
const setupRouter = require("./routes/setup")
const cors = require("cors")
const requestLogger = require("./utils/requestLogger")
const errorLogger = require("./utils/errorLogger")

const app = express();
const port = 3000;

// for post
app.use(bodyParser.json())
app.use(cors())

app.use(requestLogger)
app.use('/', setupRouter)
app.use(errorLogger)

app.listen(port, ()=>{
    console.log("Running backend at port: ", port)
})