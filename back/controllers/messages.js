const messagesRouter = require("express").Router();
const Message = require("../models/message");

messagesRouter.get("/", (req, res) => {
  Message.find({}).then((messages) => {
    res.json(messages.map((message) => message.toJSON()));
  });
});

messagesRouter.get("/:id", (req, res, next) => {
  Message.findById(req.params.id)
    .then((message) => {
      if (message) {
        res.json(message);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

messagesRouter.post("/", (req, res, next) => {
  const body = req.body;

  const message = new Message({
    person: body.person,
    title: body.title,
    text: body.text,
    likes: body.likes,
    dislikes: body.dislikes,
    importance: body.importance,
  });

  message
    .save()
    .then((savedMessage) => {
      res.json(savedMessage.toJSON);
    })
    .catch((error) => next(error));
});

messagesRouter.delete("/:id", (req, res, next) => {
  Message.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

messagesRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  const message = {
    person: body.person,
    title: body.title,
    text: body.text,
    likes: body.likes,
    dislikes: body.dislikes,
    importance: body.importance,
  };
  Message.findByIdAndUpdate(req.params.id, message, { new: true })
    .then((updatedMessage) => {
      res.json(updatedMessage);
    })
    .catch((error) => next(error));
});

module.exports = messagesRouter;
