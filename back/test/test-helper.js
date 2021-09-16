const Message = require("../models/message");

const initialMessages = [
  {
    person: "Kerttu",
    title: "Metsään",
    text: "Kohti mummolaa",
    importance: false,
  },
  {
    person: "Kertun sisko",
    title: "Metsäänkö?",
    text: "Kohti Hannua",
    importance: false,
  },
];

const nonExistingId = async () => {
  const message = new Message({
    person: "XX",
    title: "XX?",
    text: "XX",
    importance: false,
  });
  await message.save();
  await message.remove();

  return message._id.toString();
};

const messagesInDb = async () => {
  const messages = await Message.find({});
  return messages.map((Message) => Message.toJSON());
};

module.exports = {
  initialMessages,
  nonExistingId,
  messagesInDb,
};
