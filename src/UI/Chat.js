import {useState} from "react";
import axios from "axios";

export default function Chat(props) {

  const [newMessage, setNewMessage] = useState("");

  // fonksiyonlarını yaz
  function newMessageHandler(message) {
    setNewMessage(message);
  }

  // DB

  const message = {
    text: newMessage,
    senderNum: props.sendRec[0].phoneNum,
    receiverNum: props.sendRec[1].phoneNum
  };

  const config = {
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
  }

  function addMessage(event) {
    axios.post("http://localhost:80/react-mysql/addMessage.php", message, config).then(response => {
      console.log(response)
    }).catch(error => {
      console.log("Error Occurred!");
    });
  }

  // DB

  function goToMessages() {
    props.onChat(2);
  }

  // HTML return
  return(
    <div id="chat">
      <h1>{props.sendRec[0].name} Chats With {props.sendRec[1].name}</h1>

      <form onSubmit={addMessage}>
        <input type="text" onChange={newMessageHandler} required/>

        <button type="submit">Send</button>
      </form><br/><br/>

      <button onClick={goToMessages}>Messages</button>

    </div>
  );
}




