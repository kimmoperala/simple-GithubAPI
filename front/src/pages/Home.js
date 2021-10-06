import { useEffect, useState } from "react";
import loginService from "../services/login";
import messageService from "../services/messages";
import Notification from "../components/ui/Notification";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));
      messageService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      messageService.setToken(user.token);
    }
  }, []);

  const signOut = async (event) => {
    event.preventDefault();

    window.localStorage.removeItem("loggedAppUser");
    setUser(null);
    messageService.setToken(null);
  };

  const loginForm = () => (
    <>
      <h2>Kirjautuminen</h2>
      <Notification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          Käyttäjätunnus
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Salasana
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Kirjaudu sisään</button>
      </form>
    </>
  );

  const frontPage = () => (
    <div>
      <div>Alotussivu</div>
    </div>
  );

  return (
    <>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} kirjautunut</p>
          <button onClick={signOut}>Kirjaudu ulos</button>
          {frontPage()}
        </div>
      )}
    </>
  );
}

export default Home;
