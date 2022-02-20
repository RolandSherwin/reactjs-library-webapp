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

router.get("/getUserReservedBooks/:userId", async (req, res, next) => {
    try{
        let reservedBooks = await userService.getUserReservedBooks(req.params.userId);
        res.json(reservedBooks);
    } catch(err){
        next(err);
    }
})
router.get("/getUserReservedBooks/:userId", async (req, res, next) => {
    try{
        let reservedBooks = await userService.getUserReservedBooks(req.params.userId);
        res.json(reservedBooks);
    } catch(err){
        next(err);
    }
})
router.get("/getUserBorrowedBooks/:userId", async (req, res, next) => {
    try{
        let borrowedBooks = await userService.getUserBorrowedBooks(req.params.userId);
        res.json(borrowedBooks);
    } catch(err){
        next(err);
    }
})
router.get("/getUserBookDetails/:userId", async (req, res, next) => {
    try{
        let bookDetails = await userService.getUserBookDetails(req.params.userId);
        res.json(bookDetails);
    } catch(err){
        next(err);
    }
})

module.exports = router;
