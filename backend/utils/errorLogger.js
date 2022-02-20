const fs = require("fs");

let errorLogger = (err, req, res, next) => {
    if (err) {
        fs.appendFile(
            __dirname + "/../errorLogger.txt",
            new Date().toISOString() + " - " + err.stack + "\n",
            (error) => {
                if (error) {
                    console.log("Logging error failed");
                }
            }
        );
        if (err.status) {
            res.status(err.status);
        } else {
            res.status(500);
        }
        res.json({ errorMessage: err.message });
    }
    next();
};

module.exports = errorLogger;
