import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Login(props) {

  useEffect(getUsers, []);

  const [persons, setPersons] = useState([]);
  const [senderPhoneNum, setSenderPhoneNum] = useState(0);
  const [senderName, setSenderName] = useState("");

  function goBackToRegister() {
    props.onLoginHandler(0);
  }

  function goToMessages() {
    if(checkUser().length === 1) {
      //setSenderName(checkUser()[0].name);
      props.onSender(senderPhoneNum, checkUser()[0].name);
      props.onLoginHandler(2);
    }
    else
      alert("Please check your phone number!");
  }

  function phoneNumHandler(event) {
    setSenderPhoneNum(event.target.value);
    //props.onSender(event.target.value, checkUser()[0].name);
  }

  function getUsers() {
    axios.get("http://localhost:80/react-mysql/getUsers.php").then(response => {
      setPersons(response.data);
    }).catch(error => {
      console.log("Error Occurred!");
    });
  }

  function checkUser() {
    return persons.filter(p => p.phone_num === senderPhoneNum);
  }

  return (
    <div id="login">
      {getUsers}
      <form onSubmit={goToMessages}>
        <legend>Login</legend>
         <label>Phone Number</label> <br />
        <input type="tel" onChange={phoneNumHandler} required />
        <br />
        <button type="submit" >Login</button><br/><br/>
      </form>
      <label>Go Back to the Register Screen</label><br/>
      <button onClick={goBackToRegister}>Register</button>
    </div>
    );
}