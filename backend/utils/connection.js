const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

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
    'booksAvailable': Number
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

let connection = {}
connection.getBookCollection = async()=>{
    try{
        return (await mongoose.connect('mongodb://localhost:27017/library-webapp-reactjs', { useNewUrlParser: true, useUnifiedTopology:true, })).model("books", bookSchema)
    } catch(err){
        let error = new Error("Could not connect to books collection")
        error.status = 500
        throw error
    }
}
connection.getUserCollection = async()=>{
    try{
        return (await mongoose.connect('mongodb://localhost:27017/library-webapp-reactjs', { useNewUrlParser: true, useUnifiedTopology:true, })).model("users", userSchema)
    }catch(err){
        let error = new Error("Could not connect to users collection")
        error.status = 500
        throw error
    }
}
module.exports = connection