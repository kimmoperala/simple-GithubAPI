const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("yhdistetään...");
mongoose
  .connect(url)
  .then((result) => {
    console.log("yhdistetty MongoDB:hen");
  })
  .catch((error) => {
    console.log("ongelmia MongoDB:hen yhdistämisessä", error.message);
  });

const messageSchema = new mongoose.Schema({
  person: String,
  title: String,
  text: String,
  likes: Number,
  dislikes: Number,
  importance: Boolean,
});

messageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Message", messageSchema);
