// Add Cats


function addCat(event){
    event.preventDefault()
    let inputName = document.getElementById("inputName")
    let inputBreed = document.getElementById("inputBreed")
    let inputAge = document.getElementById("inputAge")

    let data = {
        "name": inputName.value,
        "breed": inputBreed.value,
        "age": inputAge.value
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
    }else{
        fetch(`http://localhost:5500/api/cats/`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        }, fetchAllCats())
        .then(response => response.json())
        .catch(error => console.log("Error", error))
        .then(response => console.log("Success:", JSON.stringify(response)))

        fetchAllCats()

        inputName.value = ""
        inputName.placeholder= "Name"
        inputBreed.value = ""
        inputBreed.placeholder = "Name"
        inputAge.value = ""
        inputAge.placeholder = "Age"
    }
}