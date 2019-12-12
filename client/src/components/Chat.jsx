import React ,{useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({location}) => {

    const[username, setUsername] = useState('');
    const[message, setMessage] = useState('');
    const[messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
        const {username} = queryString.parse(location.search);

        socket = io(ENDPOINT);
        setUsername(username);
        socket.emit('join', {username}, () => {
           
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
        
    },[ENDPOINT, location.search]);
    useEffect(() => {
        socket.on('message', () => {
            setMessages([...messages,message])
        })
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(message, messages);

    return(
        <div className="outerContainer">
             <div className="container">
                 <input value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null }></input>
             </div>
             
        </div>
)
}

export default Chat;