const connection = require("../utils/connection");

exports.getAllUsers = async () => {
    const userCollection = await connection.getUserCollection();

    let userList = await userCollection.find({}, { _id: 0, __v: 0 });
    if (!userList) {
        let err = new Error("getAllUsers(): Error during find()");
        err.status = 500;
        throw err;
    }
    return userList;
};

exports.getUserBorrowedBooks = async (userId) => {
    const userCollection = await connection.getUserCollection();
    let borrowed = await userCollection.find({'userId':userId}, {_id:0, borrowedBooks:1});
    if (!borrowed){
        let err = new Error("getUserBorrowedBooks(): Error finding by userId");
        err.status = 500;
        throw err;
    }
    return borrowed;
};

exports.getUserReservedBooks = async (userId) => {
    const userCollection = await connection.getUserCollection();
    let reserved = await userCollection.find({'userId':userId}, {_id:0, reservedBooks:1});
    if (!reserved){
        let err = new Error("getUserReservedBooks(): Error finding by userId");
        err.status = 500;
        throw err;
    }
    return reserved;
};

exports.getUserBookDetails = async (userId) => {
    const userCollection = await connection.getUserCollection();
    let bookDetails = await userCollection.find({'userId':userId}, {_id:0, reservedBooks:1, borrowedBooks:1});
    if (!bookDetails){
        let err = new Error("getUserBookDetails(): Error finding by userId");
        err.status = 500;
        throw err;
    }
    return bookDetails;
}