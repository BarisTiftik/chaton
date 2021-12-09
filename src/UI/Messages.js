export default function Messages(props) {

  const contacts = ["baris", "nancy", "john"];

  function logOut() {
    props.onMessages(1);
  }

  function PersonItem(props) {
    return(
      <button>{props.name}</button>
    );
  }

  function PersonList(props) {
    return(
      <div>
      <PersonItem name={props.contacts[0]}/>
      <PersonItem name={props.contacts[1]}/>
      <PersonItem name={props.contacts[2]}/>
      </div>
    );
  }

  return(
    <div id="messages">
      <legend>Messages</legend>
      <PersonList contacts={contacts}/><br/>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}
