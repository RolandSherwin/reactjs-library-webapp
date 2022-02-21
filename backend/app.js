const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const requestLogger = require("./utils/requestLogger");
const errorLogger = require("./utils/errorLogger");
const setupRouter = require("./routes/setupRoute");
const bookRouter = require("./routes/bookRoute");
const userRouter = require("./routes/userRoutes");
const actionRouter = require("./routes/actionRoute");

const app = express();
const port = 3100;

// for post
app.use(bodyParser.json());
app.use(cors());

app.use(requestLogger);
app.use("/", setupRouter, bookRouter, userRouter, actionRouter);
app.use(errorLogger);

app.listen(port, () => {
    console.log("Running backend at port: ", port);
});
