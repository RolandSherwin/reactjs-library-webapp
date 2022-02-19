const {JSDOM} = require("jsdom")
const superagent = require("superagent")
// const BOOK_ID_LIST = ['OL28267487M','OL8193418W', 'OL362702W', 'OL455305W', 'OL7979417W', 'OL14942956W', 'OL361466W', 'OL74504W', 'OL985560M',
//     'OL482894W', 'OL74666W', 'OL106084W', 'OL2636674W', 'OL74676W', 'OL1858679W', 'OL27258W', 'OL4082696W', 'OL47287W', 'OL2636675W', 
//     'OL505439W', 'OL10695417W', 'OL228705W', 'OL103113W', 'OL500177W', 'OL1863530W', 'OL2172454W', 'OL463836W', 'OL481155W', 'OL31259W',
//     'OL106077W', 'OL23768406W', 'OL24340933W', 'OL20901113W', 'OL20168871W', 'OL24513723W', 'OL24314956W', 'OL17883071W', 'OL17199665W', 
//     'OL276558W', 'OL8162628W', 'OL19359025W', 'OL24918839W', 'OL24254767W', 'OL3140834W', 'OL22835840W', 'OL27448W', 'OL3335292W', 'OL3871697W',
//     'OL71037W', 'OL2430167W', 'OL1168007W', 'OL276798W', 'OL23205W', 'OL267933W', 'OL98474W', 'OL627084W', 'OL2944469W', 'OL1386747W', 'OL268217W',
//     'OL1855944W', 'OL2897798W', 'OL59038W', 'OL52266W'
//     ]
// const BOOK_ID_LIST = ['OL3140834W']
const BOOK_ID_LIST = ['OL28267487M','OL8193418W', 'OL362702W', 'OL455305W', 'OL7979417W', 'OL14942956W', 'OL361466W', 'OL74504W', 'OL985560M']

const getSingleBook = async(OLBookId) => {
    try{
        var response = await superagent.get("https://openlibrary.org/books/"+OLBookId)
        var dom = new JSDOM(response.text)
        var document = dom.window.document
    }catch(e){  
        return new Promise((resolve, reject) => reject("Page does not exist!"))
    }
    try{
        title = document.querySelector("h1.work-title").innerHTML.replace(/<[^>]*>/gm, "")
        author = []
        document.querySelectorAll('.edition-byline > a').forEach((ele)=>{
            author.push(ele.innerHTML)
        })
        year = document.querySelector('strong[itemprop="datePublished"]').innerHTML
        description = document.querySelector(".book-description-content").innerHTML.replace(/<[^>]*>/gm, "").trim()
        if (description == "This edition doesn't have a description yet. Can you add one?"){
            description = ""
        }
        workDescription = document.querySelector(".work-description")
        if (workDescription){
            workDescription = workDescription.innerHTML
            .replace(/<[^>]*>/gm, "")
            .replace(/\(source\)/, "")
            .trim()
        }else{
            workDescription = ""
        }
        rating = document.querySelector('span[itemprop="ratingValue"]')
        if (rating) {
            rating = rating.innerHTML
        } else{
            rating = '0.00'
        }
        ratingCount = document.querySelector('span[itemprop="reviewCount"]').innerHTML
        if (ratingCount === null) {
            ratingCount = '0'
        }
        subjects = []
        document.querySelectorAll('div.section:nth-child(1) > span:nth-child(2) > a').forEach(ele => {
            subjects.push(ele.innerHTML)
        })
        imageURL = "https:" + document.querySelector('img[itemprop="image"]').getAttribute('src')

        let obj = {
            'title': title,
            'author': author,
            'year': year,
            'description': description,
            'workDescription': workDescription,
            'subjects': subjects,
            'rating': rating,
            'ratingCount': ratingCount,
            'imageURL': imageURL
        }
        console.log("Fetched " + title)
        return new Promise(resolve => resolve(obj))
    } catch(e){
        return new Promise((resolve, reject) => reject("Error getting book details!"))
    }
}

exports.getBookDetailsInParallel = async()=>{
    let bookList = await Promise.allSettled(BOOK_ID_LIST.map(id => getSingleBook(id)))
    // console.log(bookList)
    return bookList
}
exports.getBookDetails = async()=>{
    bookList = []
    for (let id of BOOK_ID_LIST){
        let book = await getSingleBook(id)
        console.log(book.title)
        bookList.push(book)
    }
    return bookList
}

exports.setupDB = async() => {
    
}