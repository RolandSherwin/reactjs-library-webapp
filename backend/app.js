const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const requestLogger = require("./utils/requestLogger")
const errorLogger = require("./utils/errorLogger")
const setupRouter = require("./routes/setup")
const bookRouter = require("./routes/bookRoute")
const userRouter = require("./routes/userRoutes")

const app = express();
const port = 3000;

// for post
app.use(bodyParser.json())
app.use(cors())

app.use(requestLogger)
app.use('/', setupRouter, bookRouter, userRouter)
app.use(errorLogger)

app.listen(port, ()=>{
    console.log("Running backend at port: ", port)
})