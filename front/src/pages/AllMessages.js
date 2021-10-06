import MessageList from "../components/messages/MessageList";
import NewMessage from "../components/messages/NewMessage";
import { useEffect, useState } from "react";
import messageService from "../services/messages";

function AllMessages() {
  const [isLoading, setIsLoading] = useState(true);
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    messageService.getAll().then((messages) => {
      setAllMessages(messages);
      console.log(messages);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Lataa....</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Viestit</h2>
      <NewMessage />
      <MessageList messages={allMessages} />
    </section>
  );
}

export default AllMessages;
