const express = require("express")
const app = express()
const fs = require("fs")


app.use("/", (req, res, next) => {
  console.log("api visited")
  next()
})

app.use(express.json())
app.use("/", express.static("public"))
app.use(express.urlencoded({extended:true}))

const data = fs.readFileSync("cats.json")
const cats = JSON.parse(data)

function generateCatId(){
  return new Date().getUTCMilliseconds();
}

// GET
app.get("/api/cats", (req, res) => {
  res.status(200).send(cats)
})

app.get("/api/cats/:id", (req, res) => {
  const cat = cats.find( c => c.id === parseInt(req.params.id))

  if(!cat){
    return res.status(404).send("Couldnt find cat with id")
  }

  res.status(200).send(cat)
})


// POST

app.post("/api/cats", (req,res) => {
  if(!req.body.breed || !req.body.age || !req.body.age.match(/^[0-9]+$/)){
    return res.status(400).send("Your input is incorrect")
  }

  if(req.body.name === "" || req.body.breed === "" || req.body.age ==="" ){
    return res.status(400).send("All fields need to be filled")
  }

  const cat = {
    id: generateCatId(),
    name: req.body.name,
    breed: req.body.breed,
    age: req.body.age
  }

  fs.readFile("./cats.json", "utf8", () => {
    cats.push(cat)
    const data = JSON.stringify(cats, null, 2)
    fs.writeFile("./cats.json", data, "utf8", () => {
      console.log("Cat added!")
    })
  })

  res.status(201).send(cat)

})


// PUT

app.put("/api/cats/:id", (req, res) => {
  const cat = cats.find( cat => cat.id == parseInt(req.params.id))

  if(!cat){
    return res.status(404).send("Couldn't find a cat with this ID")
  }

  cat.name = req.body.name
  cat.breed = req.body.breed
  cat.age = req.body.age

  if(req.body.name === "" || req.body.breed === "" || req.body.age ==="" ){
    return res.status(400).send("All fields need to be filled")
  }

  fs.readFile("./cats.json", "utf8", () => {
    const data = JSON.stringify(cats, null, 2)

    fs.writeFile("./cats.json", data, "utf8", () => {
      console.log("Cat updated")
    })
  })

  res.status(200).send(cat)
})

// DELETE

app.delete("/api/cats/:id", (req, res) => {
  const cat = cats.find( cat => cat.id === parseInt(req.params.id))
  if(!cat){
    return res.status(404).send("Couldnt find cat with that ID")
  }

  const index = cats.indexOf(cats)
  cats.splice(index, 1)
  const data = JSON.stringify(cats, null, 2)
  fs.writeFile("./cats.json", data, "utf8", () => {
    console.log("Cat deleted with id" + cat.id )
  })

  res.status(200).send(cat)

})


app.listen(5500, () => {
  console.log("Server running on http://localhost:5500")
})