import {useEffect, useState} from "react";
import axios from "axios";
import chaton from "./chaton.png";

export default function Chat(props) {

  useEffect(getMessages, []);

  const [newMessage, setNewMessage] = useState("");
  const [messageObjects, setMessageObjects] = useState([]);

  // fonksiyonlarını yaz
  function newMessageHandler(event) {
    setNewMessage(event.target.value);
  }

  // DB

  const config = {
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
  }

  function addMessage(event) {
    event.preventDefault();

    const randomId = Math.round(Math.random() * 100000);
    const currentDate = new Date();

    const message = {
      id: randomId,
      text: newMessage,
      date: currentDate,
      senderNum: props.sendRec[0].phoneNum,
      receiverNum: props.sendRec[1].phoneNum
    };

    console.log("id : " + message.id);
    console.log("text : " , message.text);
    console.log("date : " + message.date);
    console.log("sendnm : " + message.senderNum);
    console.log("recnm : " + message.receiverNum);


    axios.post("http://localhost:80/react-mysql/addMessage.php", message, config).then(response => {
      console.log(response)
    }).catch(error => {
      console.log("Error Occurred!");
    });
  }

  function getMessages(event) {

    const sendRec = {
      senderNumber: props.sendRec[0].phoneNum,
      receiverNumber: props.sendRec[1].phoneNum
    }

    axios.post("http://localhost:80/react-mysql/getMessages.php", sendRec, config).then(response => {
        console.log("resp data " + response.data);
        setMessageObjects(response.data);
    }).catch(error => {
      console.log("Error Occurred!");
    });
  }

  // DB

  function goToMessages() {
    props.onChat(2);
  }

  const styleObj = {
    textAlign: "center",
  }

  const styleObj2 = {
    textAlign: "left",
    display: "inline-block",
  }

  function TextItem(props) {
    return(
      <div style={styleObj}>
      <div style={styleObj2}>
        <p >{props.message.name}:&emsp; {props.message.text} &emsp; : {props.message.date}</p>
      </div>
      </div>
    );
  }

  function TextList(props) {
    return props.messageObjects.map((m) => ( <TextItem message={m}/> ));
  }

  // HTML return
  return(
    <div id="chat">
      <br/><img src={chaton}/>
      {getMessages}

      <h1>{props.sendRec[0].name} Chats With {props.sendRec[1].name}</h1><br/>

      <TextList messageObjects={messageObjects}/>

      <br/><br/>
      <form onSubmit={addMessage}>
        <input type="text" onChange={newMessageHandler} required/>

        <button type="submit">Send</button>
      </form><br/><br/>

      <button onClick={goToMessages}>Messages</button>

    </div>
  );
}




