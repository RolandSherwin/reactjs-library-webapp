const express = require("express")
const router = express.Router()
const bookService = require('../services/bookService')

router.get('/getAllBooks', async (req, res, next)=>{
    try{
        let bookList = await bookService.getAllBooks();
        res.json(bookList)
    }catch(err){
        next(err)
    }
})

module.exports = router