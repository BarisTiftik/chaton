import './App.css';
import Register from "./UI/Register";
import Login from "./UI/Login"
import Messages from "./UI/Messages"
import Chat from "./UI/Chat"
import {useState} from "react";
import axios from "axios";

function App() {

  const [senderNum, setSenderNum] = useState(0);
  const [senderName, setSenderName] = useState("");

  const [receiverNum, setReceiverNum] = useState(0);
  const [receiverName, setReceiverName] = useState("");

  const sendRec = [
    {
      phoneNum: senderNum,
      name: senderName
    },
    {
      phoneNum: receiverNum,
      name: receiverName
    }
  ];

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

  function senderHandler(senderNum, senderName) {
    setSenderNum(senderNum);
    setSenderName(senderName);
  }

  function receiverHandler(receiverNum, receiverName) {
    setReceiverNum(receiverNum);
    setReceiverName(receiverName);
  }

  function newScreenHandler(newScreen) {
    setCurrentScreen(newScreen);
  }

  function navigate() {
    if (currentScreen === 0)
      return <Register onRegisterHandler={newScreenHandler}/>;
    else if (currentScreen === 1)
      return <Login onLoginHandler={newScreenHandler} onSender={senderHandler}/>;
    else if (currentScreen === 2)
      return <Messages onMessages={newScreenHandler} onReceiver={receiverHandler}/>;
    else if(currentScreen === 3)
      return <Chat sendRec={sendRec} onChat={newScreenHandler}/>
  }

  return (
    <div className="App">
      {connectDb()}
      {navigate()}
    </div>
  );
}

export default App;
