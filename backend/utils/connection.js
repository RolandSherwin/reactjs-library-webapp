const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
try{
    mongoose.connect('mongodb://localhost:27017/library-webapp-reactjs', { useNewUrlParser: true, useUnifiedTopology:true, })
}catch(e){
    let error = new Error("Could not connect to MongoDB")
    error.status = 500
    throw error
}

let bookSchema = new mongoose.Schema({
    'OLId': String,
    'title': String,
    'author': [String],
    'year': String,
    'description': String,
    'workDescription': String,
    'subjects': [String],
    'rating': Number,
    'ratingCount': Number,
    'image': {
        name: String,
        url: String,
        path: String,
    },
    'booksAvailable': Number,
    'reservationQueue': [String]
}, {collection: 'books'})

let userSchema = new mongoose.Schema({
    'userId': String,
    'name': String,
    'email': String,
    'phone': String,
    'password': String,
    'reservedBooks': [String],
    'borrowedBooks': [String]
}, {collection: 'users'})

exports.getBookCollection = async () => {
    return mongoose.model("books", bookSchema);
};
exports.getUserCollection = async () => {
    return mongoose.model("users", userSchema);
};