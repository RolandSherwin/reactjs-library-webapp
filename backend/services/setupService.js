const {JSDOM} = require("jsdom")
const superagent = require("superagent")
const connection = require('../utils/connection')
const fs = require('fs')
const path = require("path")

const BOOK_ID_LIST = ['OL28267487M','OL8193418W', 'OL362702W', 'OL455305W', 'OL7979417W', 'OL14942956W', 'OL361466W', 'OL74504W', 'OL985560M',
    'OL482894W', 'OL74666W', 'OL106084W', 'OL2636674W', 'OL74676W', 'OL1858679W', 'OL27258W', 'OL4082696W', 'OL47287W', 'OL2636675W', 
    'OL505439W', 'OL10695417W', 'OL228705W', 'OL103113W', 'OL500177W', 'OL1863530W', 'OL2172454W', 'OL463836W', 'OL481155W', 'OL31259W',
    'OL106077W', 'OL23768406W', 'OL24340933W', 'OL20901113W', 'OL20168871W', 'OL24513723W', 'OL24314956W', 'OL17883071W', 'OL17199665W', 
    'OL276558W', 'OL8162628W', 'OL19359025W', 'OL24918839W', 'OL24254767W', 'OL3140834W', 'OL1168083W', 'OL27448W', 'OL3335292W', 'OL3871697W',
    'OL71037W', 'OL2430167W', 'OL1168007W', 'OL276798W', 'OL23205W', 'OL267933W', 'OL98474W', 'OL627084W', 'OL2944469W', 'OL1386747W', 'OL268217W',
    'OL1855944W', 'OL2897798W', 'OL59038W', 'OL52266W'
    ]


const getSingleBook = async(OLBookId) => {
    // console.log(OLBookId)
    try{
        var response = await superagent.get("https://openlibrary.org/books/"+OLBookId)
        var dom = new JSDOM(response.text)
        var document = dom.window.document
    }catch(e){  
        return new Promise((resolve, reject) => reject("Page does not exist!"))
    }
    try{
        let title = document.querySelector("h1.work-title").innerHTML.replace(/<[^>]*>/gm, "")
        let author = []
        document.querySelectorAll('.edition-byline > a').forEach((ele)=>{
            author.push(ele.innerHTML)
        })
        let year = document.querySelector('strong[itemprop="datePublished"]').innerHTML
        let description = document.querySelector(".book-description-content").innerHTML.replace(/<[^>]*>/gm, "").trim()
        if (description == "This edition doesn't have a description yet. Can you add one?"){
            description = ""
        }
        let workDescription = document.querySelector(".work-description")
        if (workDescription){
            workDescription = workDescription.innerHTML
            .replace(/<[^>]*>/gm, "")
            .replace(/\(source\)/, "")
            .trim()
        }else{
            workDescription = ""
        }
        let rating = document.querySelector('span[itemprop="ratingValue"]')
        if (rating) {
            rating = rating.innerHTML
        } else{
            rating = '0.00'
        }
        let ratingCount = document.querySelector('span[itemprop="reviewCount"]').innerHTML
        if (ratingCount === null) {
            ratingCount = '0'
        }
        let subjects = []
        document.querySelectorAll('div.section:nth-child(1) > span:nth-child(2) > a').forEach(ele => {
            subjects.push(ele.innerHTML)
        })

        let smallImageURL = document.querySelector('img[itemprop="image"]').getAttribute('src')
        let imageURL = ""
        let imageName = ""
        let imagePath = ""
        if (smallImageURL){
            imageURL = "https:" + document.querySelector('img[itemprop="image"]').getAttribute('src')
            imageName = imageURL.split('/').pop()
            imagePath = path.join(__dirname, "/../assets/coverImages/", imageName)
        }
        image = {'name': imageName, 'url':imageURL, 'path':imagePath}

        // random number between 1 and 3
        let booksAvailable = Math.floor(Math.random() * 3) + 1 
        let obj = {
            'OLId': OLBookId,
            'title': title,
            'author': author,
            'year': year,
            'description': description,
            'workDescription': workDescription,
            'subjects': subjects,
            'rating': rating,
            'ratingCount': ratingCount,
            'image': image,
            'booksAvailable': booksAvailable,
            'reservationQueue': []
        }
        console.log("Fetched " + title)
        return new Promise(resolve => resolve(obj))
    } catch(e){
        return new Promise((resolve, reject) => reject("Error getting book details!"))
    }
}

exports.downloadBooksInParallel = async(n_parallel = 5)=>{
    // fetching every book in parallel leads to page not exist error
    // so need to fetch batches of size n_parallel at a time
    if (n_parallel > BOOK_ID_LIST.length){
        n_parallel = BOOK_ID_LIST.length
    }
    n_batches = Math.ceil(BOOK_ID_LIST.length / n_parallel)
    
    let bookList = []
    for (let b=0; b<n_batches; b++){
        let start = b*n_parallel
        // if last batch is smaller than n_parallel, then end should be BOOK_ID_LIST.length
        let end = 0
        if (b==n_batches-1){
            end = BOOK_ID_LIST.length-1
        }else{
            end = (b+1)*n_parallel
        }
        // if only 1 element is remaining
        if (start == end){
            batch = BOOK_ID_LIST.slice(start)
        }else {
            batch = BOOK_ID_LIST.slice(start, end)
        }

        // fetch books in the batch
        // console.log(batch)
        let bookBatch = await Promise.allSettled(batch.map(id=>getSingleBook(id)))
        // console.log(bookBatch)
        for (let book of bookBatch){
            if (book.status == 'fulfilled'){
                bookList.push(book.value)
            }
        }
    }
    return bookList
}

// old method to download all books at once; both sync and async
exports.downloadBooks = async()=>{
    bookList = []
    for (let id of BOOK_ID_LIST){
        let book = await getSingleBook(id)
        // console.log(book.title)
        bookList.push(book)
    }
    return bookList
    // let bookList = await Promise.allSettled(BOOK_ID_LIST.map(id => getSingleBook(id)))
    // // console.log(bookList.title)
    // return bookList
}

const downloadImage = async(imgUrl, imgPath)=>{
    if (fs.existsSync(imgPath)){
        console.log("Image already exists at " + imgPath)
    }else{
        let image = ''
        try{
            image = (await superagent.get(imgUrl)).body
        }catch{
            console.log("Error downlaoding image: " + imgUrl)
        }
        console.log("Donwloading: " + imgUrl)
        fs.writeFileSync(imgPath, image)
    }
}
exports.setupDB = async() => {
    let bookCollection =  await connection.getBookCollection()
    let bookList =  JSON.parse(fs.readFileSync(__dirname+"/../bookList.json"))
    for (let b=0; b<bookList.length; b++){
        let imgObj = bookList[b].image
        if (imgObj.url){
            await downloadImage(imgObj.url, imgObj.path)
        }
    }
    let bookDel = await bookCollection.deleteMany({})
    let bookIns = await bookCollection.insertMany(bookList)
    if (bookIns){
        console.log("'books' collection deleted and inserted!")
    }else{
        let err = new Error("Error while inserting into 'books' collection")
        err.status = 500
        throw err
    }

    let userCollection = await connection.getUserCollection()
    const userList = JSON.parse(fs.readFileSync(__dirname + "/../userList.json"))
    let userDel = await userCollection.deleteMany({})
    let userIns = await userCollection.insertMany(userList)
    if (userIns){
        console.log("'users' collection deleted and inserted")
    }else{
        let err = new Error("Error while inserting into 'users' collection")
        err.status = 500
        throw err
    }
}