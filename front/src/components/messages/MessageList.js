import classes from "./MessageList.module.css";
import MessageItem from "./MessageItem";

function MessageList(props) {
  return (
    <ul className={classes.list}>
      {props.messages.map((message) => (
        <MessageItem
          key={message.id}
          id={message.id}
          title={message.title}
          person={message.person}
          text={message.text}
          likes={message.likes}
          dislikes={message.dislikes}
          importance={message.importance}
        />
      ))}
    </ul>
  );
}

export default MessageList;