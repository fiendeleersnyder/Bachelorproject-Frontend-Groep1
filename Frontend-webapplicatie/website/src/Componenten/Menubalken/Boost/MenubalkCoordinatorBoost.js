import {useNavigate, Link} from 'react-router-dom';
import useLogout from "../../../Hooks/useLogout";

function MenubalkCoordinator(){
    const logout = useLogout();
    const navigate = useNavigate();

    const signOut = async () => {
        await(logout());
        navigate("/");
    }

    return(
        <header>
            <div className="w3-top">
                <div className="w3-bar w3-kulblauw w3-card w3-left-align w3-large">
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to='/coordinator/'>Home</Link></a>
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to='/coordinator/onderwerpen'>Subjects</Link></a>
                    <button className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatright" onClick={signOut}>Log out</button>
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatright"><Link to='/coordinator/account'>My account</Link></a>
                </div>
            </div>
        </header>
    );
}
export default MenubalkCoordinator;