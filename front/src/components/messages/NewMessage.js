import { useRef, useState } from "react";

import Card from "../ui/Card";
import classes from "./NewMessage.module.css";
import axios from "axios";

function NewMessage() {
  const titleInputRef = useRef();
  const textInputRef = useRef();
  const [checked, setChecked] = useState(false);

  function checkboxChanger() {
    setChecked(!checked);
  }

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredText = textInputRef.current.value;

    const newMessage = {
      person: "Pena",
      title: enteredTitle,
      text: enteredText,
      likes: 0,
      dislikes: 0,
      importance: checked,
    };
    console.log(newMessage);

    axios
      .post("http://localhost:3001/api/messages", newMessage)
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label>Aihe</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label>Viesti</label>
          <textarea rows="5" required id="text" ref={textInputRef} />
        </div>
        <div className={classes.control}>
          <label>Tärkeä</label>
          <input
            className={classes.checkbox}
            type="checkbox"
            id="important"
            onChange={checkboxChanger}
          />
        </div>
        <div className={classes.action}>
          <button>Lähetä</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMessage;