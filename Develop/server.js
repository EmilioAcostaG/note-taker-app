const express = require("express");
const router = express.Router();
const path = require("path");
const dbData = require("./db/db.json")
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// GET Route for notes page
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"))
});

router.get("api/notes", (req, res) => {
  res.json(dbData)
})

// GET Route for index page
router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
})

app.post("/api/notes", (req, res) =>
  fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      
    }
  } )
)


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
  );