import { useRef, useState, useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Link, useNavigate, useLocation} from "react-router-dom";

import axios from 'axios'
import qs from 'qs'
import classes from './Login.module.css';
import Logo from './Logo'

const Login = () => {

    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/login",
                qs.stringify({ username:user, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    withCredentials: true,

                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const roles = response?.data?.roles;
            console.log(roles);
            const accessToken = response?.data?.acces_token;
            const refreshToken = response?.data?.refresh_token;
            setAuth({ user, pwd, roles, refreshToken, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true})
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const admin = async () => {
        navigate('/admin');
    }

    const student = async () => {
        navigate('/student');
    }

    return (
                <section className={classes.loginwrapper}>
                    <Logo />
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    {/*<button onClick={admin}>Admin</button>
                    <button onClick={student}>Student</button>*/}
                    <form onSubmit={handleSubmit}>
                        <label></label>
                        <p htmlFor="username">Username:</p>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label></label>
                        <p htmlFor="password">Password:</p>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <p></p>
                        <button>Sign In</button>
                    </form>
                </section>
    )
}

export default Login
