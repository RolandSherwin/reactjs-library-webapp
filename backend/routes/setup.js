const express = require("express");
const setupService = require("../services/setup.js");
const router = express.Router();
const fs = require("fs");

router.get("/downloadBooks", async (req, res, next) => {
    var bookList = await setupService.downloadBooksInParallel(8);
    try {
        fs.writeFileSync(__dirname + "/../bookList.json", JSON.stringify(bookList));
        res.json(bookList);
    } catch (err) {
        next(err);
    }
});

router.get("/setupDB", async (req, res, next) => {
    try {
        await setupService.setupDB();
        res.send("DB Succesfully setup!");
    } catch (e) {
        next(e);
    }
});

module.exports = router;
