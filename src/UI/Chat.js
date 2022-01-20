import {useEffect, useState} from "react";
import axios from "axios";
import chaton from "./chaton.png";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import {Box, Card, Grid, ListItem, ListItemText, Paper, Typography} from "@mui/material";

export default function Chat(props) {

  const [newMessage, setNewMessage] = useState("");
  const [messageObjects, setMessageObjects] = useState([]);
  useEffect(getMessages, [messageObjects]);

  function newMessageHandler(event) {
    setNewMessage(event.target.value);
  }

  // DB

  const config = {
    headers: {"Content-Type": "application/x-www-form-urlencoded"}
  }

  function addMessage(event) {
    event.preventDefault();

    const randomId = Math.round(Math.random() * 100000);
    const currentDate = new Date();

    const message = {
      id: randomId,
      text: newMessage,
      date: currentDate,
      senderNum: props.sendRec[0].phoneNum,
      receiverNum: props.sendRec[1].phoneNum
    };

    console.log("id : " + message.id);
    console.log("text : " , message.text);
    console.log("date : " + message.date);
    console.log("sendnm : " + message.senderNum);
    console.log("recnm : " + message.receiverNum);

    axios.post("http://localhost:80/react-mysql/addMessage.php", message, config).then(response => {
      console.log(response)
    }).catch(error => {
      console.log("Error Occurred!");
    });
  }

  function getMessages(event) {

    const sendRec = {
      senderNumber: props.sendRec[0].phoneNum,
      receiverNumber: props.sendRec[1].phoneNum
    }

    axios.post("http://localhost:80/react-mysql/getMessages.php", sendRec, config).then(response => {
        //console.log("resp data " + response.data);
        setMessageObjects(response.data);
    }).catch(error => {
      console.log("Error Occurred!");
    });
  }

  // DB

  function goToMessages() {
    props.onChat(2);
  }

  // med. turquoise. // blue violet
  function TextItem(props) {
    return(
       <Grid container wrap="nowrap" spacing={2}>
         <Grid item xs={3}>
           <Typography sx={{ textAlign:'left', whiteSpace: 'normal', backgroundColor: '#303030', color: 'white', fontWeight: 600}}>
             {props.message.name}
           </Typography>
         </Grid>
         <Grid item xs={6}>
           <Typography sx={{ mx:'auto', textAlign:'center', whiteSpace: 'normal', backgroundColor: '#303030', color: 'white', fontWeight: 600}}>
             {props.message.text} &emsp;
           </Typography>
         </Grid>
          <Grid item xs={3}>
             <Typography sx={{ textAlign:'right', whiteSpace: 'normal', backgroundColor: '#303030', color: 'white', fontWeight: 600}}>
                {props.message.date}
             </Typography>
          </Grid>
       </Grid>
    );
  }

  // mediumturquoise
  function TextList(props) {
    return (
       <List >
         {props.messageObjects.map((m) => ( <Paper sx={{ backgroundColor:'#303030' ,maxWidth:'95%', my: 1, mx: 'auto', p: 1 }}><TextItem message={m}/></Paper> ))}
       </List>
    );
  }

  // light gray
  return(
    <div style={{height:"100vh", backgroundColor: 'black'}} id="chat">
      <br/><img src={chaton} style={{width:'10%', height:'auto'}}/>
      {getMessages}

      <h2 style={{color: 'white'}}>{props.sendRec[0].name} Chats With {props.sendRec[1].name}</h2>

      <Paper sx={{maxHeight:'60%', overflow: 'auto', marginLeft: '15%', marginRight: '15%', backgroundColor: 'mediumturquoise',}}>
        <TextList messageObjects={messageObjects}/>
      </Paper>

      <br/>
      <form onSubmit={addMessage}>
        <TextField
           inputProps={{ style: { color: '#303030', fontWeight: 600}}}
           id="outlined-basic"
           label=" "
           variant="outlined"
           onChange={newMessageHandler}
           size="small"
           style = {{width: '33%', backgroundColor: 'lightgray'}}
           required
        />
        &nbsp;
        <Button type="submit" variant="outlined" endIcon={<SendIcon />} sx={{borderColor: 'white', backgroundColor: 'black', color: 'white'}}>Send</Button>
      </form><br/>

      <Button variant="outlined" sx={{borderColor: 'white', color: 'white', backgroundColor: 'black'}} onClick={goToMessages}>Messages</Button>
      <br/><br/>
    </div>
  );
}




