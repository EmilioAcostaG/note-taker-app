const express = require("express");
const path = require("path");
const notes = require("./db/db.json");
const uuid = require("uuid");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// GET Route for index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});

// GET Route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
  // return res.json(notes)
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});


// Routes for API
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"))
});

// Post adds notes to db.json
app.post("/api/notes", (req, res) => {

  const note = JSON.parse(fs.readFileSync("./db/db/json"));
  const newNote = req.body;
  newNote.id = uuid.v4();
  note.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(note))
  res.json(note);
});

// Delete removes notes from db.json
app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync(".db/db.json"));
  const removeNote = notes.filter((remove) => remove.id !== req.params.id);
  fs.writeFileSync("./db/db.json", JSON.stringify(removeNote));
  res.json(removeNote);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
  );