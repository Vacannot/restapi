window.addEventListener('load', init);

function init(){
    fetchAllCats()
    const searchButton = document.getElementById("idSearch")
    searchButton.addEventListener("click", showCatWithID)
    const submitButton = document.getElementById("submitButton")
    submitButton.addEventListener("click", () => {addCat()})
}

function fetchAllCats(){
    fetch("http://localhost:5500/api/cats").then((response) => {
        return response.json()
    }).then((cats) => {
        printAllCats(cats)
    })
}

// Cat lists

function printAllCats(cats){
    let container = document.getElementById("listOfCats")
    container.innerHTML = ""

    cats.forEach(cat => {
        let idNameWrapper = document.createElement("div")
        idNameWrapper.setAttribute("class", "idNameWrapper")

        let catName = document.createElement("h2")
        catName.innerText = cat.name

        let catID = document.createElement("h4")
        catID.setAttribute("class", "inlineH2")
        catID.innerText = `Id: ${cat.id}`

        let catBreed = document.createElement("p")
        catBreed.innerText = cat.breed

        let catAge = document.createElement("p")
        catAge.innerText = `Human years: ${cat.age}`

        let deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete"
        deleteButton.addEventListener("click",() => { 
            fetch(`/api/cats/${cat.id}`, {method: 'DELETE'}, fetchAllCats())
        });

        let updateButton = document.createElement("button")
        updateButton.innerText = "Update"
        updateButton.addEventListener("click", () => {showEditForm(cat)},)
            
        let catListItem = document.createElement("li")
        catListItem.setAttribute("id", "catListItem")

        idNameWrapper.appendChild(catID)
        idNameWrapper.appendChild(catName)
        catListItem.appendChild(idNameWrapper)
        catListItem.appendChild(catBreed)
        catListItem.appendChild(catAge)
        catListItem.appendChild(deleteButton)
        catListItem.appendChild(updateButton)
        container.appendChild(catListItem)
    })
}