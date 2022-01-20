import {useEffect, useState} from "react";
import axios from "axios";
import chaton from "./chaton.png";
import Button from '@mui/material/Button';
import List from "@mui/material/List";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Box, Card, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper} from "@mui/material";

export default function Messages(props) {

  useEffect(getUsers, []);

  const [persons, setPersons] = useState([]);

  function goToChat(num, name) {
    receiverPhoneNumHandler(num, name);
    props.onMessages(3);
  }

  function receiverPhoneNumHandler(num, name) {
    props.onReceiver(num, name);
  }

  function compare( a, b ) {
     if ( a.name < b.name ){
        return -1;
     }
     if ( a.name > b.name ){
        return 1;
     }
     return 0;
  }

  function handlePersons(data) {
     data.sort(compare);
     setPersons(data);
  }

  function getUsers() {
    axios.get("http://localhost:80/react-mysql/getUsers.php").then(response => {
      handlePersons(response.data);
    }).catch(error => {
      console.log("Error Occurred!");
    });
  }
  function logOut() {
    props.onMessages(1);
  }

  function PersonItem(props) {
    return(
       <ListItem disablePadding>
            <ListItemButton
               sx={{backgroundColor: '#33B3A6'}}
               onClick={()=>goToChat(props.person.phone_num,props.person.name)} >
               <ListItemIcon sx={{width:'0%', color:'white'}}>
                  <AccountCircleIcon />
               </ListItemIcon>
               <ListItemText
                  primaryTypographyProps={{fontWeight: '550'}}
                  sx={{marginLeft:'0%', color: 'white'}} primary={props.person.name} />
            </ListItemButton>
       </ListItem>

  );
  }

  function PersonList(props) {
    return(
      <List sx={{marginTop:'0%', marginBottom:'0%'}}>
        {props.contacts.map((p) => (
          <PersonItem person={p}/>
        ))}
      </List>
    );
  }

  return(
    <div id="messages" style={{height:"100vh", backgroundColor: 'black'}}>
       <br/><img src={chaton}/>
       {getUsers}
       <h1 style={{color:'white'}}>{props.sendRec[0].name}'s Messages</h1>
       <Box sx={{maxHeight:'52%', overflow: 'auto', marginLeft: '42%', marginRight: '42%',}}>
          <PersonList contacts={persons}/><br/>
       </Box><br/>
       <Button sx={{borderColor: 'white', color: 'white', backgroundColor: 'black'}} onClick={logOut} variant="outlined">Logout</Button><br/><br/>
    </div>
  );
}
