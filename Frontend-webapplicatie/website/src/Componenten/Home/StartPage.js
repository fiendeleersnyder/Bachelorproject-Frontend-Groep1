import classes from "./Homescherm.module.css";
import {useNavigate} from 'react-router-dom';
import Logo from '../Login/Logo'

function StartPage(){
    const navigate = useNavigate();

    const admin = async () => {
        navigate('/admin');
    }

    const student = async () => {
        navigate('/student');
    }

    return (
        <div className={classes.start}>
            <Logo />
            <h1> Sign in as </h1>
            <p className={classes.center}>
                <button onClick={admin}>Admin</button>
                <button onClick={student}>Student</button>
            </p>
        </div>
    );
}
export default StartPage;
