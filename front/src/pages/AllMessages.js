import MessageList from "../components/messages/MessageList";
import NewMessage from "../components/messages/NewMessage";
import axios from "axios";
import { useEffect, useState } from "react";

function AllMessages() {
  const [isLoading, setIsLoading] = useState(true);
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/messages").then((response) => {
      setAllMessages(response.data);
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
