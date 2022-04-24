import { useRef, useState, useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate, useLocation} from "react-router-dom";

import axios from '../../API/axios'
import qs from 'qs'
import classes from './Login.module.css';
import Logo from './Logo'

const Login = () => {

    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const goBack = () => navigate("/");

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/login",
                qs.stringify({ username:user, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    withCredentials: true

                }
            );
            console.log(JSON.stringify(response?.data));
            const roles = response?.data?.roles;
            const accessToken = response?.data?.acces_token;
            setAuth({ user, pwd, roles, accessToken});
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

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist)
    }, [persist])

    return (
                <section className={classes.loginwrapper}>
                    <Logo />
                    <div className={classes.text}>
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
                        <button className="w3-bar-item w3-button w3-hide-small w3-hover-white floatleft">Sign In</button>
                        <button className="w3-bar-item w3-button w3-hide-small w3-hover-white floatleft" onClick={goBack}>Go Back</button>
                        <br/>
                        <br/>
                        <div>
                            <input
                                type="checkbox"
                                id="persist"
                                onChange={togglePersist}
                                checked={persist}
                            />
                            <label htmlFor="persist">Trust this device</label>
                        </div>
                    </form>
                    </div>
                </section>
    )
}

export default Login
