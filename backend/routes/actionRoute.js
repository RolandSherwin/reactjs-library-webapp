const express = require("express");
const router = express.Router();
const actionService = require('../services/actionService')

router.post("/borrowBook", async (req, res, next) => {
    let userId = req.body.userId;
    let OLId = req.body.OLId;
    let user = {}

    try{
        user = await actionService.borrowBook(userId, OLId);
        res.json(user);
    }catch(err){
        next(err)
    }
});

module.exports = router;
