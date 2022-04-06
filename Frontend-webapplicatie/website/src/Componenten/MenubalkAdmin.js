import {useNavigate, Link} from 'react-router-dom';
import {useContext} from "react";
import AuthContext from "../Services/AuthProvider"


function MenubalkAdmin(){
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        setAuth({});
        navigate('/');
    }
    return(
        <header>
            <div className="w3-top">
                <div className="w3-bar w3-kulblauw w3-card w3-left-align w3-large">
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to='/admin/'>Home</Link></a>
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to='/admin/onderwerpen'>Onderwerpen</Link></a>
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to='/admin/addonderwerp'>Onderwerp toevoegen</Link></a>
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to='/admin/indienen'>Indienen</Link></a>
                    <button className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatright" onClick={logout}>Uitloggen</button>
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatright"><Link to='/admin/account'>Mijn account</Link></a>
                </div>
            </div>
        </header>
    );
}
export default MenubalkAdmin;