export default function Chat(props) {
  return(
    <div>
      <h1>{props.sendRec[0].name} Chats With {props.sendRec[1].name}</h1>
    </div>
  );
}