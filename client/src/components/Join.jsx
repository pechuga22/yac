import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/joinStyles.css';
const Join = () => {

    const[username, setUsername] = useState('');

    return(
    <div className="container">
        <div className="row">
            <div className="col-md-offset-2 col-md-3">
                <div className="form-login">
                <h4>Chat</h4>
                <input type="text" className="form-control input-sm chat-input" placeholder="username" onChange={(event) =>setUsername(event.target.value)}/>
            <div className="wrapper">
            <Link  onClick={event => !username ? event.preventDefault() : null}to={`/chat?username=${username}`}>     
                <button className="btn btn-primary btn-md" type="submit">Join chat</button>
            </Link>
            </div>
            </div>
        
        </div>
    </div>
</div>
    )
}

export default Join;