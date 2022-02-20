const connection = require("../utils/connection");

// reduce available book if >0, add to user ( 1 per user)
exports.borrowBook = async (userId, OLId) => {
    let bookCollection = await connection.getBookCollection();
    let userCollection = await connection.getUserCollection();

    // check if book is available
    let booksAvailable = await bookCollection.findOne({'OLId':OLId}, {'booksAvailable':1, _id:0})
    if (!booksAvailable){
        let err = new Error("borrowBook(): Book with OLId: " + OLId + " does not exist!")
        err.status = 404
        throw err
    }
    booksAvailable = booksAvailable.booksAvailable
    if (booksAvailable <=0){
        let err = new Error("borrowBook(): No books are available to borrow")
        err.status = 404
        throw err
    }
    // check if user has already borrowed the same book
    let borrowedBooks = await userCollection.findOne({'userId': userId}, {'borrowedBooks':1, _id:0})
    if (!borrowedBooks){
        let err = new Error("borrowBook(): User with UserID:" + userId + " does not exist!")
        err.status = 404
        throw err
    }
    borrowedBooks = borrowedBooks.borrowedBooks
    if (borrowedBooks.includes(OLId)){
        let err = new Error("borrowBook(): User has already borrowed the the book with Id: " + OLId)
        err.status = 404
        throw err
    }
    // borrow book
    let bookUpdate = await bookCollection.updateOne({'OLId': OLId}, {$inc: {'booksAvailable': -1}})
    let userUpdate = await userCollection.updateOne({'userId': userId}, {$push: {'borrowedBooks': OLId}})
    
    let user = await userCollection.findOne({'userId': userId}, {_id:0, __v:0})
    return user
};

// return book -> increase book if, remove from user
exports.returnBook = async () => {

};

// if available book = 0, reserve a book -> add user to queue 
// for the book; inside return book, if available becomes > 1, then 
// call borrow book with user in the first
exports.reserveBook = async () => {

};