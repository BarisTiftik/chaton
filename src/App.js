import './App.css';
import Register from "./UI/Register";
import Login from "./UI/Login"
import Messages from "./UI/Messages"
import {useState} from "react";

function App() {

  const [currentScreen, setCurrentScreen] = useState(0);

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
      {navigate()}
    </div>
  );
}

export default App;
