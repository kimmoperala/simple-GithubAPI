import React from "react";
import classes from "./Notification.module.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className={classes.error}>{message}</div>;
};

export default Notification;
