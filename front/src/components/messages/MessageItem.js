import classes from "./MessageItem.module.css";
import Card from "../ui/Card";

function MessageItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div div className={classes.basicInfo}>
          <h3>Aihe: {props.title}</h3>
          <p>Lähettäjä: {props.person}</p>
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
      </Card>
    </li>
  );
}

export default MessageItem;
