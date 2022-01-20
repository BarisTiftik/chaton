import React, {useEffect, useState} from "react";
import axios from "axios";
import chaton from "./chaton.png";
import Button from '@mui/material/Button';
import {Paper, TextField} from "@mui/material";

export default function Login(props) {

  useEffect(getUsers, []);

  const [persons, setPersons] = useState([]);
  const [senderPhoneNum, setSenderPhoneNum] = useState("");

  function goBackToRegister() {
    props.onLoginHandler(0);
  }

  function goToMessages() {
    if(checkUser().length === 1) {
      props.onSender(senderPhoneNum, checkUser()[0].name);
      props.onLoginHandler(2);
    }
    else
      alert("Please check your phone number!");
  }

  function phoneNumHandler(event) {
    setSenderPhoneNum(event.target.value);
  }

  function getUsers() {
    axios.get("http://localhost:80/react-mysql/getUsers.php").then(response => {
      if (response.data.length > 0)
        setPersons(response.data);
    }).catch(error => {
      console.log("Error Occurred!");
    });
  }

  function checkUser() {
    if (persons.length > 0)
      return persons.filter(p => p.phone_num === senderPhoneNum);
    return [];
  }

  return (
    <div id="login" style={{height:"100vh", backgroundColor: 'black'}}>
      <br/><img src={chaton}/>
      {getUsers}
      <Paper sx={{marginLeft:'37%', marginRight:'37%', backgroundColor:'paleturquoise'}}>
        <h1 style={{color:'black'}}>Login</h1>
        <form onSubmit={goToMessages}>
          <label>Phone Number</label> <br />
          <input type="tel" onChange={phoneNumHandler} required />
        <br />
        <Button sx={{ backgroundColor: 'black'}} type="submit" variant="contained">Login</Button><br/><br/>
      </form>
      <label>Back to the Register Screen</label><br/>
      <Button sx={{backgroundColor: 'black'}} onClick={goBackToRegister} variant="contained">Register</Button><br/><br/>
      </Paper>
    </div>
    );
}