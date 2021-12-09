import React from "react";

export default function Register(props) {

    function goToLoginScreen() {
        props.onRegisterHandler(1);
    }

    return (
        <div id="register">
            <form>
                <legend>Register</legend>

                <label>Phone Number</label> <br />
                <input type="tel" required /> <br />

                <label>User Name</label> <br />
                <input type="name" required />
                <br />

                <button type="submit">Register</button><br/><br/>

                <label>Already have an account?</label><br/>
                <button onClick={goToLoginScreen}>Login</button>
            </form>
        </div>
    );
}