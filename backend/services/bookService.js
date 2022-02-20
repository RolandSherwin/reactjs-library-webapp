const connection = require('../utils/connection')
const fs = require('fs')

exports.getAllBooks = async() => {
    const bookCollection =  await connection.getBookCollection()

    let bookList = await bookCollection.find({})
    if (!bookList){
        let err = new Error("getAllBooks(): Error during find()")
        err.status = 500
        throw err
    } 
    return bookList
}