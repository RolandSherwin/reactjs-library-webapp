const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/library-webapp-reactjs', { useNewUrlParser: true, useUnifiedTopology:true, })

let bookSchema = mongoose.Schema({
    'title': String,
    'author': String,
    'year': String,
    'description': String,
    'workDescription': String,
    'subjects': [String],
    'rating': Number,
    'ratingCount': Number,
    'image': {
        data: Buffer,
        contentType: String,
    }
}, {collection: 'books'})

let connection = {}
// connection.getCollection
// let mongoose.model("books", bookSchema)