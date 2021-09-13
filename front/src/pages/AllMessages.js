import MessageList from "../components/messages/MessageList";
import NewMessage from "../components/messages/NewMessage";

const DUMMY_DATA = [
  {
    id: 1,
    person: "Ernest",
    title: "Paris",
    text: "Oh those were the times back in Paris",
    likes: 0,
    dislikes: 0,
    importance: true,
    image: "",
  },
  {
    id: 2,
    person: "Hemingway",
    title: "Also",
    text: "I was at the war too",
    likes: 2,
    dislikes: 1,
    importance: true,
  },
  {
    id: 3,
    person: "Charry",
    title: "Just me",
    text: "I am just a fictional character",
    likes: 30,
    dislikes: 10,
    importance: false,
  },
];

function AllMessages() {
  return (
    <section>
      <h2>Viestit</h2>
      <NewMessage />
      <MessageList messages={DUMMY_DATA} />
    </section>
  );
}

export default AllMessages;
