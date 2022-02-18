const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/library-webapp-reactjs', { useNewUrlParser: true })

let bookSchema = mongoose.Schema({
    title
})

// needed:
// title, edition, authors, year, category, description, language, image, rating,
// 
// 
