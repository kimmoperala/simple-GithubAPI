import classes from "./MessageItem.module.css";
import Card from "../ui/Card";
import messageService from "../../services/messages";

function MessageItem(props) {
  const handleRemove = async (event) => {
    event.preventDefault();

    const messageToRemove = await messageService.remove(props.id);
    console.log(messageToRemove.title, "poistettu!");
  };

  return (
    <li className={classes.item}>
      <Card>
        <div div className={classes.basicInfo}>
          <h3>Aihe: {props.title}</h3>
          <p>Lähettäjä: {props.user.name}</p>
        </div>
        <div className={classes.text}>
          <p>{props.text}</p>
        </div>
        <div className={classes.likes}>
          <p>Hyvä: {props.likes}</p>
        </div>
        <div className={classes.dislikes}>
          <p>Huono: {props.dislikes}</p>
        </div>
        <div className={classes.importance}>
          <p>Tärkeä: {props.importance ? "Joo" : "Ei"}</p>
        </div>
        <button onClick={handleRemove}>Poista {props.id}</button>
      </Card>
    </li>
  );
}

export default MessageItem;
