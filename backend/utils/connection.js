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
    }
}, {collection: 'books'})

let connection = {}
connection.getBookCollection = async()=>{
    try{
        return (await mongoose.connect('mongodb://localhost:27017/library-webapp-reactjs', { useNewUrlParser: true, useUnifiedTopology:true, })).model("books", bookSchema)
    } catch(err){
        let error = new Error("Could not connect to books")
        error.status = 500
        throw error
    }
}
module.exports = connection