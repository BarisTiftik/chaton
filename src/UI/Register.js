import React, {useState} from "react";
import axios from "axios";
import chaton from "./chaton.png";
import Button from '@mui/material/Button';
import {Paper} from "@mui/material";

export default function Register(props) {

    const [name, setName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");

    function goToLoginScreen() {
        props.onRegisterHandler(1);
    }

    function nameHandler(event) {
      setName(event.target.value);
    }

    function phoneNumHandler(event) {
      setPhoneNum(event.target.value);
    }

    const person = {
      name: name,
      phoneNum: phoneNum
    };

    const config = {
      headers: {"Content-Type": "application/x-www-form-urlencoded"}
    }

    function addUser(event){
      event.preventDefault();
      axios.post("http://localhost:80/react-mysql/addUser.php", person, config).then(response => {
        console.log(response)
        alert("Registration form submitted");
      }).catch(error => {
        console.log("Error Occurred!");
      });
    }

    return (
       <div id="register" style={{height:"100vh", backgroundColor: 'black'}}>
          <br/><img src={chaton}/>
          <Paper sx={{marginLeft:'37%', marginRight:'37%', backgroundColor:'paleturquoise'}}>
             <form onSubmit={addUser}>
                <h1><b>Register</b></h1>

                <label>Phone Number</label> <br />
                <input type="tel" onChange={phoneNumHandler} required /> <br />

                <label>User Name</label> <br />
                <input type="name" onChange={nameHandler} required /><br />

                <Button sx={{backgroundColor: 'black'}} type="submit" variant="contained">Register</Button><br/><br/>
             </form>
             <label>Already have an account?</label><br/>
             <Button sx={{backgroundColor: 'black'}} onClick={goToLoginScreen} variant="contained">Login</Button><br/><br/>
          </Paper>
       </div>
    );
}