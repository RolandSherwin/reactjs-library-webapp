const connection = require('../utils/connection')

exports.getAllBooks = async() => {
    const bookCollection =  await connection.getBookCollection()

    let bookList = await bookCollection.find({}, {_id:0, __v:0})
    if (!bookList){
        let err = new Error("getAllBooks(): Error during find()")
        err.status = 500
        throw err
    } 
    return bookList
}