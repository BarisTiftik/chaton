import {useEffect, useState} from "react";
import axios from "axios";
import chaton from "./chaton.png";

export default function Messages(props) {

  useEffect(getUsers, []);

  const [persons, setPersons] = useState([]);

  function goToChat(num, name) {
    receiverPhoneNumHandler(num, name);
    props.onMessages(3);
  }

  function receiverPhoneNumHandler(num, name) {
    props.onReceiver(num, name);
  }

  function getUsers() {
    axios.get("http://localhost:80/react-mysql/getUsers.php").then(response => {
      setPersons(response.data);
    }).catch(error => {
      console.log("Error Occurred!");
    });
  }
  function logOut() {
    props.onMessages(1);
  }

  function PersonItem(props) {
    return(
      <div>
      <button
        onClick={()=>goToChat(props.person.phone_num,props.person.name)}> {props.person.name}
      </button>
        <p style={{color : 'gray'}}> ___________________ </p>
      </div>
  );
  }

  function PersonList(props) {
    return(
      /*<div>
      <PersonItem name={props.contacts[0]}/>
      <PersonItem name={props.contacts[1]}/>
      <PersonItem name={props.contacts[2]}/>
      </div>*/
      <div>
        <p style={{color : 'gray'}}> ___________________ </p>
        {props.contacts.map((p) => (
          <PersonItem person={p}/>
        ))}
      </div>
    );
  }

  return(
    <div id="messages">
      <br/><img src={chaton}/>
      {getUsers}
      <h1>{props.sendRec[0].name}'s Messages</h1>
      <PersonList contacts={persons}/><br/>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}
