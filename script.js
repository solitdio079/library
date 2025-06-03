const cardContainerEl = document.querySelector("#card-container")
const bodyEl = document.querySelector("body")

const openDialogBtnEl = document.querySelector("#openDialogBtn")
const closeDialogBtnEl = document.querySelector("#closeDialogBtn")
const formDialogEl = document.querySelector("#formDialog")

const addBookForm = document.querySelector("#formDialog form")

const myLibrary = localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")): []

localStorage.getItem("books") ? "":localStorage.setItem("books", JSON.stringify(myLibrary))



class Book{
    constructor(name,author,pages,read=false){
    this.id = crypto.randomUUID()
    this.name = name 
    this.author = author
    this.pages = pages 
    this.read = read

    }
    toggleRead(){
        this.read = !this.read
    }
    
}
if(localStorage.getItem("books")){
    myLibrary.forEach(item => {
        Object.setPrototypeOf(item, Book.prototype)
    })
}



function addBookToLibrary(name,author,pages,read=false){
    const newBook = new Book(name,author,pages,read)
    myLibrary.push(newBook)
    localStorage.setItem("books", JSON.stringify(myLibrary))
}
listBooks()
function listBooks(){
    cardContainerEl.innerHTML = ""
   
    myLibrary.forEach(item => {

        // the delete button
        const deleteBtnEl = document.createElement("button")
        deleteBtnEl.setAttribute("data-delete", item.id)
        deleteBtnEl.textContent = "X"
        deleteBtnEl.className = "btn bg-error rounded-none text-white text-sm"

        deleteBtnEl.style.margin = "5px 10px"



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
        cardReadEl.textContent = `Read: ${item.read ? "Yes": "No"}`

        const readSwitchBtn = document.createElement("button")
        readSwitchBtn.setAttribute("data-readSwitch", item.id)
        readSwitchBtn.textContent = "Switch"
        readSwitchBtn.className = "btn rounded-none text-sm text-white bg-primary"
        cardReadEl.appendChild(readSwitchBtn)

        cardBodyEl.appendChild(cardTitleEl)
        cardBodyEl.appendChild(cardAuthorEl)
        cardBodyEl.appendChild(cardPagesEl)
        cardBodyEl.appendChild(cardReadEl)

        cardImgEl.appendChild(placeholderImgEl)
        bookCardEl.append(deleteBtnEl)
        bookCardEl.appendChild(cardImgEl)
        bookCardEl.appendChild(cardBodyEl)
        cardContainerEl.appendChild(bookCardEl)




    })
}

openDialogBtnEl.addEventListener("click", ()=> {
    formDialogEl.showModal()
})
closeDialogBtnEl.addEventListener("click", () => {
    formDialogEl.close()
})

addBookForm.addEventListener("submit", function (e){
    e.preventDefault()
    console.log("Form Submitted!")

    const formData = new FormData(addBookForm)
    const bodyObject = Object.fromEntries(formData)
    
    addBookToLibrary(bodyObject.name, bodyObject.author, +bodyObject.pages, Boolean(bodyObject.read))
    listBooks()
    addBookForm.reset()


})

cardContainerEl.addEventListener("click", function(e) {
    console.log(e.target)
    const deleteId = e.target.getAttribute("data-delete")
    const switchId = e.target.getAttribute("data-readSwitch")
    if(deleteId){
        console.log(deleteId)
        const deleteIndex = myLibrary.findIndex(item => item.id === deleteId)
        myLibrary.splice(deleteIndex,1)
        localStorage.setItem("books", JSON.stringify(myLibrary))
        listBooks()
    }

    if(switchId){
        console.log(switchId)
        const switchIndex = myLibrary.findIndex(item => item.id === switchId)
        console.log(myLibrary[switchIndex])
        myLibrary[switchIndex].toggleRead()
        localStorage.setItem("books", JSON.stringify(myLibrary))
        listBooks()

    }
})