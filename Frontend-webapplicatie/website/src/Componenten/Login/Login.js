import React, {useState} from 'react';
import classes from './Login.module.css';
import PropTypes from 'prop-types';
import Logo from './Logo'

async function loginUser(username, password) {
    var details = {
        'username' : username,
        'password' :password
    }

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch('http://localhost:8080/login', {
        method: 'POST',
        withCredentials: 'true',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
    })
        .then(data => data.json())


}

export default function Login({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser(
            username,
            password
        );
        sessionStorage.setItem('token', JSON.stringify(token));
        var splittoken = sessionStorage.getItem('token').split(/[{,}:]/)
        const accesToken = splittoken[4].slice(1,-1);
        const refreshToken = splittoken[2].slice(1,-1);
        sessionStorage.setItem('accessToken', accesToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        setToken(token);
    }

    return(
        <div className={classes.loginwrapper}>
            <Logo />
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserName(e.target.value)}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <p> </p>
                </div>
                <div>
                    <button type="submit">Log in</button>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
