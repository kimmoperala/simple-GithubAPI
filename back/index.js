require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

const Message = require("./models/message");

app.get("/", (req, res) => {
  res.send("<h1>ss !</h1>");
});

app.get("/api/messages/:id", (req, res) => {
  Message.findById(req.params.id)
    .then((message) => {
      if (message) {
        res.json(message);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: "malformatted id" });
    });
});

app.post("/api/messages", (req, res) => {
  const body = req.body;
  console.log(body);

  const message = new Message({
    person: body.person,
    title: body.title,
    text: body.text,
    likes: body.likes,
    dislikes: body.dislikes,
    importance: body.importance,
  });

  message.save().then((savedMessage) => {
    res.json(savedMessage);
  });
});

app.delete("/api/messages/:id", (request, response) => {});

app.get("/api/messages", (req, res) => {
  Message.find({}).then((messages) => {
    res.json(messages);
  });
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
