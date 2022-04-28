// Search cat by ID

function searchCat(){
    const id = document.getElementById("idInput")

    if(id.value === ""){
        id.placeholder = "Cat needs an ID"
    }
    else{
        fetch(`http://localhost:5500/api/cats/${id.value}`). then((response) => {
            if(response.status === 404){
                printCatWithID()
            }else {
                return response.json()
            }
        }).then((cats) => {
            printCatwithID(cats)
        })
    }
}

function printCatWithID(cat){
    const catWithIDContainer = document.getElementById("showCatWithID")
    catWithIDContainer.innerHTML = ""

    
    if(cat){
        let idNameWrapper = document.createElement("div")
        idNameWrapper.setAttribute("class", "idNameWrapper")

        let catName = document.createElement("h2")
        catName.innerText = cat.name

        let catID = document.createElement("h4")
        catID.innerText = `Id: ${cat.id}`

        let catBreed = document.createElement("p")
        catBreed.innerText = cat.breed

        let catAge = document.createElement("p")
        catAge.innerText = `Human years: ${cat.age}`

        let closeButton = document.createElement("button")
        closeButton.innerText = "close"
        closeButton.addEventListener("click", () => {catWithIDContainer.innerHTML= ""})

        let deleteButton = document.createElement('button')
        deleteButton.innerText = "Delete"
        deleteButton.addEventListener("click",() => {
            fetch(`/api/cats/${cat.id}`,
            {method: 'DELETE'},
            fetchAllCats(),
            catWithIDContainer.innerHTML= "")
        });

        let updateButton = document.createElement("button")
        updateButton.innerText = "Update"
        updateButton.addEventListener("click", () => {showEditForm(cat)})

        let catListItem = document.createElement("li")
        catListItem.setAttribute("id", "catListItem")

        idNameWrapper.appendChild(catID)
        idNameWrapper.appendChild(catName)
        catListItem.appendChild(idNameWrapper)
        catListItem.appendChild(catBreed)
        catListItem.appendChild(catAge)
        catListItem.appendChild(deleteButton)
        catListItem.appendChild(updateButton)
        catListItem.appendChild(closeButton)
        catWithIDContainer.appendChild(catListItem)
    }
    else{
        const errorResponse = document.createElement("h3")
        errorResponse.innerText = "No cat found"
        catWithIDContainer.appendChild(errorResponse)
    }
}