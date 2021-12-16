import React from "react";

export default function Login(props) {

    function goBackToRegister() {
        props.onLoginHandler(0);
    }

    function goToMessages() {
        props.onLoginHandler(2);
    }

    return (
        <div id="login">
            <form>
                <legend>Login</legend>

                <label>Phone Number</label> <br />
                <input type="tel" required />
                <br />

                <button type="submit" onClick={goToMessages}>Login</button><br/><br/>
            </form>
            <label>Go Back to the Register Screen</label><br/>
            <button onClick={goBackToRegister}>Register</button>
        </div>
    );
}