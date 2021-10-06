import { useEffect, useState } from "react";
import userService from "../services/users";
import MessageItem from "../components/messages/MessageItem";
import Card from "../components/ui/Card";
import messageService from "../services/messages";

function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  /* const removeUser = async (event) => {
    event.preventDefault();
    console.log(allUsers[1]);
    const userToRemove = await userService.remove(allUsers[1].id);
    console.log(userToRemove.name, "poistettu!");
  };*/

  useEffect(() => {
    userService.getAll().then((users) => {
      setAllUsers(users);
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
      <h2>Käyttäjät</h2>
      {allUsers.map((user) => (
        <Card>
          <div>
            <h3>Käyttäjätunnus: {user.username}</h3>
            <p>Käyttäjänimi: {user.name}</p>
            <p>Käyttäjäid: {user.id}</p>
            <p>Viestit:</p>
            <p>
              {user.messages.map((message) => (
                <div>
                  {message.title}: {message.text}
                </div>
              ))}
            </p>
          </div>
          {/*
          <button onClick={removeUser}>Poista</button>
*/}
        </Card>
      ))}
    </section>
  );
}

export default Admin;
