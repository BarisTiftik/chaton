import React, {useState} from "react";
import axios from "axios";
import chaton from "./chaton.png";

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
        alert("Successful Registration");
      }).catch(error => {
        console.log("Error Occurred!");
      });
    }

    return (
        <div id="register">

          <br/><img src={chaton}/>

            <form onSubmit={addUser}>
                <h1><b>Register</b></h1>

                <label>Phone Number</label> <br />
                <input type="tel" onChange={phoneNumHandler} required /> <br />

                <label>User Name</label> <br />
                <input type="name" onChange={nameHandler} required />
                <br />

                <button type="submit">Register</button><br/><br/>
            </form>
            <label>Already have an account?</label><br/>
            <button onClick={goToLoginScreen}>Login</button>
        </div>
    );
}