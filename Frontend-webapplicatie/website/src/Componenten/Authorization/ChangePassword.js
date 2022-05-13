import {useState, useEffect, useRef} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useNavigate, useLocation, Link} from "react-router-dom";
import classes from "../Onderwerpen/OnderwerpenToevoegen/NieuwOnderwerpForm.module.css";
import qs from 'qs'

const ChangePassword = () => {
    const oudWachtwoord = useRef();
    const nieuwWachtwoord = useRef();
    const confirmWachtwoord = useRef();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [errMsg, setErrMsg] = useState('');
    const [veranderd, setveranderd] = useState();

    useEffect(() => {
        setErrMsg('');
    }, [veranderd])

    function submitHandler(event, id) {
        event.preventDefault();

        const enteredOudWachtwoord = oudWachtwoord.current.value;
        const enteredNieuwWachtwoord = nieuwWachtwoord.current.value;
        const enteredConfirmWachtwoord = confirmWachtwoord.current.value;

        if (enteredNieuwWachtwoord !== enteredConfirmWachtwoord){
            alert("The new password is not the same as the confirmed password, try again please.")
            return;}

        if (enteredOudWachtwoord === enteredNieuwWachtwoord){
            alert("You can't change your new password in the old one.")
            return;}

        try {
            const queryParams = new URLSearchParams("?op=" + enteredOudWachtwoord + "&np=" + nieuwWachtwoord)
            const response = axiosPrivate.post("/auth/changepassword", null, {params: {op: enteredOudWachtwoord, np: enteredNieuwWachtwoord}});
            setErrMsg("Password changed.");
            setveranderd(true);
        }catch (err) {
                if (err.response?.status !== 200) {
                    setErrMsg("The change didn't work, try again.");

                }
            console.error(err);
            //navigate('/login', { state: {from: location}, replace: true})
        }
    }


    return (
        <div className={classes.card}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='oudwachtwoord'>Old password</label>
                    <input type="password" required id='oudwachtwoord' ref={oudWachtwoord}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='oudwachtwoord'>New password</label>
                    <input type="password" required id='nieuwwachtwoord' ref={nieuwWachtwoord}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='oudwachtwoord'>Confirm new password</label>
                    <input type="password" required id='confirmwachtwoord' ref={confirmWachtwoord}/>
                </div>
                <div className={classes.actions}>
                    <button>Change password</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;