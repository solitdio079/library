const cardContainerEl = document.querySelector("#card-container")
const bodyEl = document.querySelector("body")

const myLibrary = []


function Book(name,author,pages,read=false){
    this.id = crypto.randomUUID()
    this.name = name 
    this.author = author
    this.pages = pages 
    this.read = read
}

function addBookToLibrary(name,author,pages,read=false){
    const newBook = new Book(name,author,pages,read)
    myLibrary.push(newBook)
}

addBookToLibrary("Mein Kampf","Adolf Hitler",470,read=false)
addBookToLibrary("The Stranger","George Schimdth",270,read=true)
addBookToLibrary("Moonwalking with Einstein","Joshua Foer",170,read=true)
addBookToLibrary("Unscripted","MJ DeMarco",513,read=true)
listBooks()
function listBooks(){
   
    myLibrary.forEach(item => {
        const bookCardEl = document.createElement("div")
        bookCardEl.classList.add("card")

        const placeholderImgEl = document.createElement("div")
        placeholderImgEl.classList.add("placeholder-img")

        const cardImgEl = document.createElement("div")
        cardImgEl.classList.add("card-img")

        const cardBodyEl = document.createElement("div")
        cardBodyEl.classList.add("card-body")

        const cardTitleEl = document.createElement("span")
        cardTitleEl.classList.add("card-title")
        cardTitleEl.textContent = item.name

        const cardAuthorEl = document.createElement("p")
        cardAuthorEl.textContent = "Written by: "+ item.author

        const cardPagesEl = document.createElement("p")
        cardPagesEl.textContent = item.pages + " pages"

        const cardReadEl = document.createElement("p")
        cardReadEl.textContent = `Read: ${item.read ? "Yes": "No"} `

        cardBodyEl.appendChild(cardTitleEl)
        cardBodyEl.appendChild(cardAuthorEl)
        cardBodyEl.appendChild(cardPagesEl)
        cardBodyEl.appendChild(cardReadEl)

        cardImgEl.appendChild(placeholderImgEl)
        bookCardEl.appendChild(cardImgEl)
        bookCardEl.appendChild(cardBodyEl)
        cardContainerEl.appendChild(bookCardEl)




    })
}