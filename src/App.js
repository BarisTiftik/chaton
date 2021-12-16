import './App.css';
import Register from "./UI/Register";
import Login from "./UI/Login"
import Messages from "./UI/Messages"
import {useState} from "react";
import axios from "axios";

function App() {

  const [currentScreen, setCurrentScreen] = useState(0);

  // database operations
  const [dbString, setDbString] = useState("");

  const connectDb = () => {
    axios.get("http://localhost:80/react-mysql/connect.php").then(response => {
      if (response.data === "successful") {
        setDbString("Connection Successful");
        console.log(response.data);
      }
    }).catch(error => {
      console.log("Error occured!");
    });
  }
  // database operations

  function newScreenHandler(newScreen) {
    setCurrentScreen(newScreen);
  }

  function navigate() {
    if (currentScreen === 0)
      return <Register onRegisterHandler={newScreenHandler}/>;
    else if (currentScreen === 1)
      return <Login onLoginHandler={newScreenHandler}/>;
    else if (currentScreen === 2)
      return <Messages onMessages={newScreenHandler}/>;
  }

  return (
    <div className="App">
      {connectDb()}
      {navigate()}
    </div>
  );
}

export default App;
