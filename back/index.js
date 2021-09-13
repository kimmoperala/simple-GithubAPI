const express = require("express");
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2020-01-10T17:30:31.098Z",
    important: true,
  },
  {
    id: 3,
    content: "sfssdsfs!",
    date: "2020-01-10T19:20:14.298Z",
    important: true,
  },
];
app.get("/", (req, res) => {
  res.send("<h1>Hello aarrssstaa!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

const port = 3001;
app.listen(port);
console.log(`Server running on port ${port}`);
