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

    const coordinator = async () => {
        navigate('/coordinator');
    }

    const bedrijf = async () => {
        navigate('/bedrijf');
    }

    const promoter = async () => {
        navigate('/promotor');
    }

    return (
        <div className={classes.start}>
            <Logo />
            <h1> Sign in as </h1>
            <p className={classes.center}>
                <button className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft" onClick={admin}>Admin</button>
                <button className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft" onClick={coordinator}>Master's thesis coordinator</button>
                <button className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft" onClick={promoter}>Promoter</button>
                <button className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft" onClick={bedrijf}>Company</button>
                <button className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft" onClick={student}>Student</button>
            </p>
        </div>
    );
}
export default StartPage;
