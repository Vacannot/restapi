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

const data = fs.readFileSync("books.json")
const books = JSON.parse(data)

function generateBookId(){
  return new Date().getUTCMilliseconds();
}

// GET
app.get("/api/books", (req, res) => {
  res.status(200).send(books)
})

app.get("/api/books/:id", (req, res) => {
  const book = books.find( b => b.id === parseInt(req.params.id))

  if(!book){
    return res.status(404).send("Couldnt find book with id")
  }

  res.status(200).send(book)
})


// POST

app.post("/api/books", (req,res) => {
  if(!req.body.author || !req.body.amount || !req.body.amount.match(/^[0-9]+$/)){
    return res.status(400).send("Your input is incorrect")
  }

  if(req.body.name === "" || req.body.author === "" || req.body.amount ==="" ){
    return res.status(400).send("All fields need to be filled")
  }

  const book = {
    id: generateBookId(),
    name: req.body.name,
    author: req.body.author,
    amount: req.body.amount
  }

  fs.readFile("./books.json", "utf8", () => {
    books.push(book)
    const data = JSON.stringify(books, null, 2)
    fs.writeFile("./books.json", data, "utf8", () => {
      console.log("book added!")
    })
  })

  res.status(201).send(book)

})


// PUT

app.put("/api/books/:id", (req, res) => {
  const book = books.find( book => book.id == parseInt(req.params.id))

  if(!book){
    return res.status(404).send("Couldn't find a book with this ID")
  }

  book.name = req.body.name
  book.author = req.body.author
  book.amount = req.body.amount

  if(req.body.name === "" || req.body.author === "" || req.body.amount ==="" ){
    return res.status(400).send("All fields need to be filled")
  }

  fs.readFile("./books.json", "utf8", () => {
    const data = JSON.stringify(books, null, 2)

    fs.writeFile("./books.json", data, "utf8", () => {
      console.log("book updated")
    })
  })

  res.status(200).send(book)
})

// DELETE

app.delete("/api/books/:id", (req, res) => {
  const book = books.find( book => book.id === parseInt(req.params.id))
  if(!book){
    return res.status(404).send("Couldnt find book with that ID")
  }

  const index = books.indexOf(book)
  books.splice(index, 1)
  const data = JSON.stringify(books, null, 2)
  fs.writeFile("./books.json", data, "utf8", () => {
    console.log("book deleted with id" + book.id )
  })

  res.status(200).send(book)

})


app.listen(5500, () => {
  console.log("Server running on http://localhost:5500")
})