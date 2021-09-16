const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test-helper");
const app = require("../app");
const api = supertest(app);

const Message = require("../models/message");

beforeEach(async () => {
  await Message.deleteMany({});
  let messageObject = new Message(helper.initialMessages[0]);
  await messageObject.save();
  messageObject = new Message(helper.initialMessages[1]);
  await messageObject.save();
});

test("a valid message can be added ", async () => {
  const newMessage = {
    person: "Hannu",
    title: "Metsään myös",
    text: "Kohti Kertun siskoa",
    importance: false,
  };

  await api
    .post("/api/messages")
    .send(newMessage)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const messagesAtEnd = await helper.messagesInDb();

  expect(messagesAtEnd).toHaveLength(helper.initialMessages.length + 1);
  const contents = messagesAtEnd.map((m) => m.text);

  expect(contents).toContain("Kohti Kertun siskoa");
});

test("message without text is not added", async () => {
  const newMessage = {
    person: "Hannu",
    title: "Metsään myös",
    text: "",
    importance: false,
  };

  await api.post("/api/messages").send(newMessage).expect(400);

  const notesAtEnd = await helper.messagesInDb();

  expect(notesAtEnd).toHaveLength(helper.initialMessages.length);
});

test("a specific message can be viewed", async () => {
  const messagesAtStart = await helper.messagesInDb();

  const messageToView = messagesAtStart[0];

  const resultMessage = await api
    .get(`/api/messages/${messageToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedMessageToView = JSON.parse(JSON.stringify(messageToView));

  expect(resultMessage.body).toEqual(processedMessageToView);
});

test("a message can be deleted", async () => {
  const notesAtStart = await helper.messagesInDb();
  const messageToDelete = notesAtStart[0];

  await api.delete(`/api/messages/${messageToDelete.id}`).expect(204);

  const messagesAtEnd = await helper.messagesInDb();
  console.log(messagesAtEnd);

  expect(messagesAtEnd).toHaveLength(helper.initialMessages.length - 1);

  const texts = messagesAtEnd.map((r) => r.text);

  expect(texts).not.toContain(messageToDelete.text);
});

afterAll(() => {
  mongoose.connection.close();
});
