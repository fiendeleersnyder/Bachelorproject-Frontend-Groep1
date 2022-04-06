import {useNavigate, Link} from 'react-router-dom';
import {useContext} from "react";
import AuthContext from "../Services/AuthProvider"

function MenubalkStudent(){
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate('/');
    }
    return(
      <header>
        <div className="w3-top">
            <div className="w3-bar w3-kulblauw w3-card w3-left-align w3-large">
                <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to='/student/'>Home</Link></a>
                <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to='/student/onderwerpen'>Onderwerpen</Link></a>
                <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to='/student/addonderwerp'>Onderwerp toevoegen</Link></a>
                <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to='/student/indienen'>Indienen</Link></a>
                <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to='/student/chat'>Chat</Link></a>
                <button className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatright" onClick={logout}>Uitloggen</button>
                <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatright"><Link to='/student/account'>Mijn account</Link></a>
            </div>
        </div>
      </header>
    );
}
export default MenubalkStudent;