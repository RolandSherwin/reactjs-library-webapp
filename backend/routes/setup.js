const express = require("express")
const setupService = require("../services/setup.js")
const router = express.Router()
const fs = require('fs')

router.get('/getBookDetails', async (req, res, next)=>{
    try{
        var bookList = await setupService.getBookDetails()
        fs.writeFile(__dirname + '/../bookList.json', JSON.stringify(bookList), err=>{
            if(err){
                throw new Error("Error writing to file")
            }
            else{
                res.json(bookList)
            }
        })
    }catch(e){
        next(e)
    }
})

exports.router = router