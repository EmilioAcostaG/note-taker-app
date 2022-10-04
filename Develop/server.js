const express = require("express");
const router = express.Router();
const path = require("path");
const {notes} = require("./db/db.json")
const uuid = require("uuid");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// GET Route for index page
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});

// GET Route for notes page
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});


// Routes for API
router.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"))
});

// Post adds notes to db.json
router.post("/api/notes", (req, res) => {

  req.body.id = uuid()
  const notes = JSON.parse(fs.readFileSync("./db/db/json"));
  const newNotes = req.body;
  newNotes.id = uuid.v4();
  notes.push(newNotes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes))
  res.json(notes);
});

// Delete removes notes from db.json
router.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(".db/db.json"));
  const removeNote = notes.filter((remove) => remove.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(removeNote));
  res.json(removeNote)
})


router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
  );