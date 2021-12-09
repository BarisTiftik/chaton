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
                <input
                    type="tel"

                />
                <br />

                <button onClick={goToMessages}>Login</button><br/><br/>

                <label>Go Back to the Register Screen</label><br/>
                <button onClick={goBackToRegister}>Register</button>

            </form>
        </div>
    );
}