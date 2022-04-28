// Edit Cat

function showEdit(cat){

    console.log("trying to open edit form")

    const backgroundDiv = document.createElement("div")
    backgroundDiv.setAttribute("id", "clickBackground")
    backgroundDiv.addEventListener("click", () => {
        removeEditDiv(backgroundDiv)
    })

    const editForm = document.createElement("div")
    editForm.setAttribute("class", "container smallcontainer")
    editForm.addEventListener("click", (event) => {
        event.stopPropagation()
    })

    let updateName = document.createElement("input")
    updateName.type = "text"
    updateName.name = "name"
    updateName.value = cat.name
    updateName.placeholder = "Name"

    let updateBreed = document.createElement('input')
    updateBreed.type = "text"
    updateBreed.name = "breed"
    updateBreed.value = cat.breed
    updateBreed.placeholder = "Breed"

    let updateAge = document.createElement('input')
    updateAge.type = "number"
    updateAge.name = "age"
    updateAge.value = cat.age
    updateAge.placeholder = "Age"

    let submitButton = document.createElement("button")
    submitButton.innerText = "Update"
    submitButton.addEventListener("click", () => {
        sendUpdate(cat, updateName, updateBreed, updateAge, divEditForm)
    })

    const divEditForm = document.createElement("div")
    divEditForm.appendChild(updateName)
    divEditForm.appendChild(updateBreed)
    divEditForm.appendChild(updateAge)
    divEditForm.appendChild(submitUpdateButton)

    editFormContainer.appendChild(divEditForm)
    backgroundDiv.appendChild(editForm)

    document.querySelector("body").appendChild(backgroundDiv)
}

function sendUpdate(cat, updateName, updateBreed, updateAge){
    let data = {
        "name": updateName.value,
        "breed": updateBreed.value,
        "age": updateAge.value
    }

    if((inputName.value === "") || (inputBreed.value === "") || (inputAge.value === "")){

        if(inputName.value === ""){
            inputName.placeholder = "Cat needs a name"
        }

        if(inputBreed.value === ""){
            inputBreed.placeholder = "Cat needs a breed"
        }

        if(inputAge.value === ""){
            inputAge.placeholder = "Cat needs an age"
        }
    }else {
        fetch(`http://localhost:5500/api/cats/${cat.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', JSON.stringify(response)))
        
        backgroundDiv = document.getElementById('clickBackground')
        removeEditDiv(backgroundDiv)
        fetchAllCats()
    }
}

function removeEditDiv(backgroundDiv){
    backgroundDiv.parentNode.removeChild(backgroundDiv)
}