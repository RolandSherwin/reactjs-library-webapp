const express = require("express")
const setupService = require("../services/setup.js")
const router = express.Router()
const fs = require('fs')

router.get('/getBookDetails', async (req, res, next)=>{
    var bookList = await setupService.getBookDetailsInParallel(8)
    fs.writeFile(__dirname + '/../bookList.json', JSON.stringify(bookList), err=>{
        if(err){
            console.log("Error writing bookList")
        }
        else{
            res.json(bookList)
        }
    })
})

router.get('/setupDB', async(req,res,next)=>{
    
})

module.exports = router