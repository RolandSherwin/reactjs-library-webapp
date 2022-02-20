const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

router.get("/getAllUsers", async (req, res, next) => {
    try {
        let userList = await userService.getAllUsers();
        res.json(userList);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
