import classes from "./Homescherm.module.css";
import {useNavigate} from 'react-router-dom';
function StartPage(){

    const navigate = useNavigate();

    const admin = async () => {
        navigate('/admin');
    }

    const student = async () => {
        navigate('/student');
    }

    return (
        <div>
            <p className={classes.card}>
                <button onClick={admin}>Admin</button>
                <button onClick={student}>Student</button>
            </p>
        </div>
    );
}
export default StartPage;