const {JSDOM} = require("jsdom")
const superagent = require("superagent")
const BOOKLIST = ['OL28267487M','OL8193418W', 'OL362702W', 'OL455305W', 'OL7979417W', 'OL14942956W', 'OL361466W', 'OL361466W', 'OL1348798W', 'OL74504W']

const getBookDetails = async(OLBookId) => {
    const response = await superagent.get("https://openlibrary.org/books/"+OLBookId)
    // console.log(response.text)
    const dom = new JSDOM(response.text)
    const document = dom.window.document
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
    return obj
}

const main = async()=>{
    BOOKLIST.forEach(id => {
        getBookDetails(id).then(op => console.log(op))
    })
}
main()
