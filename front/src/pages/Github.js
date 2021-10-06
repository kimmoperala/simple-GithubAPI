import axios from "axios";
import { useState } from "react";
import Card from "../components/ui/Card";
import moment from "moment";
import classes from "./Github.module.css";
import { CircularProgress } from "@material-ui/core";
import LoadingButton from "@mui/lab/LoadingButton";
import Notification from "../components/ui/Notification";
import defaultpic from "../img/blank-profile-picture-973460_1280.webp";

function Github() {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [profilePicture, setProfilePicture] = useState("None");

  const [topButton, setTopButton] = useState("username");
  const userUrl = `https://api.github.com/search/users?q=${username}`;

  // Function for fetching the users with "username" query
  const getUsers = () => {
    if (username === "") {
      setErrorMessage("Tarkista hakukenttä!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
      return;
    }
    setLoadingUsers(true);
    const request = axios.get(userUrl);
    return request.then((response) => {
      const usersFound = response.data.items.map((x) => x.login);
      console.log("usersFound", usersFound);
      setUsers(usersFound);
      setLoadingUsers(false);

      if (usersFound.length === 0) {
        setErrorMessage("Käyttäjiä ei löytynyt hakusanalla!");
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      }
    });
  };

  // Function for fetching the repos of the selected user
  const getRepos = (name) => {
    setRepos([])
    setTopButton(name);
    setProfilePicture("Loading");
    console.log(name, "pyysi repoja!!");
    const repoUrl = `https://api.github.com/users/${name}/repos`;

    setLoadingRepos(true);
    const request = axios.get(repoUrl);
    return request.then((response) => {
      const reposFound = response.data;
      console.log(reposFound);
      setRepos(reposFound);
      setLoadingRepos(false);
      setProfilePicture("None");

      if (reposFound.length === 0) {
        setErrorMessage("Käyttäjällä ei julkisia repoja");
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      } else if (reposFound[0].owner !== undefined) {
        setProfilePicture(reposFound[0].owner.avatar_url);
      }
    });
  };


  return (
    <>
      <h2>Julkiset Github-repot</h2>
      <Notification message={errorMessage} />
      <div className={classes.topRow}>
        <input
          type="text"
          className={classes.searchBox}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <LoadingButton
          loading={loadingUsers}
          color="primary"
          size="medium"
          variant="contained"
          onClick={() => getUsers()}
        >
          Hae käyttäjänimellä
        </LoadingButton>
        <button
          className={classes.topButton}
          color={"secondary"}
          variant="contained"
          size="small"
          key={topButton}
          value={topButton}
          onClick={() => {
            console.log(topButton);
            getRepos(topButton);
          }}
        >
          <h3>{topButton}</h3>
        </button>
        {profilePicture === "Loading" && <CircularProgress color="secondary" />}
        {profilePicture === "None" && (
          <img
            src={defaultpic}
            className={classes.profilePicture}
            alt="profile picture"
          />
        )}
        {profilePicture !== "Loading" && profilePicture !== "None" && (
          <img
            src={profilePicture}
            className={classes.profilePicture}
            alt="profile picture"
          />
        )}
      </div>

      <div>
        {users.map((user) => (
          <button
            className={classes.normalButton}
            color={"primary"}
            variant="contained"
            size="small"
            key={user}
            value={user}
            onClick={() => getRepos(user)}
          >
            <h3>{user}</h3>
          </button>
        ))}
      </div>

      {loadingRepos && (
        <CircularProgress className={classes.spinner} color="secondary" />
      )}

      {repos.length > 0 && (
        <div className={classes.cardDeck}>
          {repos.map((repo) => (
            <Card key={repo.id}>
              <h3>{repo.name}</h3>
              {repo.description && <p>Kuvaus: {repo.description}</p>}
              <p>Luotu: {moment(repo.created_at).format("DD.MM.YYYY HH:mm")}</p>
              <p>
                <a target="_blank" rel="noreferrer" href={repo.html_url}>
                  {repo.name}
                </a>
              </p>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default Github;
