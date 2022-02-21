const connection = require("../utils/connection");

// reduce available book if >0, add to user ( 1 per user)
exports.borrowBook = async (userId, OLId) => {
    const bookCollection = await connection.getBookCollection();
    const userCollection = await connection.getUserCollection();
    const bookDetails = await getBookDetails(OLId);
    const userDetails = await getUserDetails(userId);

    // check if book is available
    let booksAvailable = bookDetails.booksAvailable;
    if (booksAvailable <=0){
        let err = new Error("borrowBook(): No books are available to borrow");
        err.status = 404;
        throw err;
    }
    // check if user has already borrowed the same book
    let borrowedBooks = userDetails.borrowedBooks;
    if (borrowedBooks.includes(OLId)){
        let err = new Error("borrowBook(): User has already borrowed the the book with Id: " + OLId);
        err.status = 404;
        throw err;
    }
    // borrow book
    console.log("Before BORROW:\n(available, borrow list): ", booksAvailable, borrowedBooks);
    let bookUpdate = await bookCollection.updateOne({'OLId': OLId}, {$inc: {'booksAvailable': -1}});
    let userUpdate = await userCollection.updateOne({'userId': userId}, {$push: {'borrowedBooks': OLId}});
    
    const updatedBook = await getBookDetails(OLId);
    const updatedUser = await getUserDetails(userId);
    console.log("After BORROW:\n(available, borrow list): ", updatedBook.booksAvailable, updatedUser.borrowedBooks);

    return {'updatedUser': updatedUser, 'updatedBook':updatedBook};
};

// return book -> increase book available, remove from user
// if reservationQueue has users (ie availability was 0), borrow book for the user
// first in queue
exports.returnBook = async (userId, OLId) => {
    const bookCollection = await connection.getBookCollection();
    const userCollection = await connection.getUserCollection();
    const bookDetails = await getBookDetails(OLId);
    const userDetails = await getUserDetails(userId);
    
    // check if user has the book
    let borrowedBooks = userDetails.borrowedBooks;
    if (!borrowedBooks.includes(OLId)){
        let err = new Error("returnBook(): User "+userId+ " has not borrwoed the book with OLId: " +OLId);
        err.status = 404;
        throw err;
    }

    // return book
    console.log("Before RETURN:\n(available, borrow list): ", bookDetails.booksAvailable, borrowedBooks);
    let bookUpdate = await bookCollection.updateOne({'OLId': OLId}, {$inc: {'booksAvailable': 1}});
    let userUpdate = await userCollection.updateOne({'userId': userId}, {$pull: {'borrowedBooks': OLId}});
    
    const updatedBook = await getBookDetails(OLId);
    const updatedUser = await getUserDetails(userId);
    console.log("After RETURN:\n(available, borrow list): ", updatedBook.booksAvailable, updatedUser.borrowedBooks);
    
    // dealing with reservationQueue

};

// if available book = 0, reserve a book -> add user to queue 
// for the book; inside return book
exports.reserveBook = async () => {

};

async function getUserDetails(userId){
    let userCollection = await connection.getUserCollection();
    let user = await userCollection.findOne({'userId': userId}, {_id:0});
    if (!user){
        let err = new Error("getUser(): User with UserID: " + userId + " does not exist!");
        err.status = 404;
        throw err;
    }
    return user;
}

async function getBookDetails(OLId){
    let bookCollection = await connection.getBookCollection();
    let book = await bookCollection.findOne({'OLId': OLId}, {_id:0});
    if (!book){
        let err = new Error("getBook(): Book with OLId: " + OLId + " does not exist!");
        err.status = 404;
        throw err;
    }
    return book;
}