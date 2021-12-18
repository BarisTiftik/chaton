import {useEffect, useState} from "react";
import axios from "axios";

export default function Messages(props) {

  useEffect(getUsers, []);

  const [persons, setPersons] = useState([]);

  function goToChat(num, name) {
    //console.log("eheh" + num + "meheh" + name);
    receiverPhoneNumHandler(num, name);
    props.onMessages(3);
  }

  function receiverPhoneNumHandler(num, name) {
    console.log("eheh" + num + "meheh" + name);
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
      <button
        onClick={()=>goToChat(props.person.phone_num,props.person.name)}> {props.person.name}
      </button>
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
        {props.contacts.map((p) => (
          <PersonItem person={p}/>
        ))}
      </div>
    );
  }

  return(
    <div id="messages">
      {getUsers}
      <legend>Messages</legend>
      <PersonList contacts={persons}/><br/>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}
