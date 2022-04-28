window.addEventListener('load', init);

function init(){
    fetchAllBooks()
    const searchButton = document.getElementById("idSearch")
    searchButton.addEventListener("click", showBookWithID)
    const submitButton = document.getElementById("submitButton")
    submitButton.addEventListener("click", () => {addBook()})
}

function fetchAllBooks(){
    fetch("http://localhost:5500/api/books").then((response) => {
        return response.json()
    }).then((books) => {
        printAllbooks(books)
    })
}

// books lists

function printAllBooks(books){
    let container = document.getElementById("listOfbooks")
    container.innerHTML = ""

    books.forEach(books => {
        let idNameWrapper = document.createElement("div")
        idNameWrapper.setAttribute("class", "idNameWrapper")

        let bookName = document.createElement("h2")
        bookName.innerText = books.name

        let bookID = document.createElement("h4")
        bookID.setAttribute("class", "inlineH2")
        bookID.innerText = `Id: ${books.id}`

        let bookAuthor = document.createElement("p")
        bookAuthor.innerText = books.author

        let bookAmount = document.createElement("p")
        bookAmount.innerText = `Amount in stock:  ${books.amount}`

        let deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete"
        deleteButton.addEventListener("click",() => { 
            fetch(`/api/books/${books.id}`, {method: 'DELETE'}, fetchAllbooks())
        });

        let updateButton = document.createElement("button")
        updateButton.innerText = "Update"
        updateButton.addEventListener("click", () => {showEditForm(books)},)
            
        let bookListItem = document.createElement("li")
        bookListItem.setAttribute("id", "bookListItem")

        idNameWrapper.appendChild(bookID)
        idNameWrapper.appendChild(bookName)
        bookListItem.appendChild(idNameWrapper)
        bookListItem.appendChild(bookAuthor)
        bookListItem.appendChild(bookAmount)
        bookListItem.appendChild(deleteButton)
        bookListItem.appendChild(updateButton)
        container.appendChild(bookListItem)
    })
}