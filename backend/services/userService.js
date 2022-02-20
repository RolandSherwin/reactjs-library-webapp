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

exports.getUserBookingData = async () => {
    const userCollection = await connection.getUserCollection();
    let;
};
