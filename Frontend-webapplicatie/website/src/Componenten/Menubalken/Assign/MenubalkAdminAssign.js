import {useNavigate, Link} from 'react-router-dom';
import useLogout from '../../../Hooks/useLogout'

function MenubalkAdmin(){
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
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to="/admin/">Home</Link></a>
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to="/admin/onderwerpen">Subjects</Link></a>
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to="/admin/addonderwerp">Add subject</Link></a>
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to="/admin/users">Users</Link></a>
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatleft"><Link to="/admin/phases">Phases</Link></a>
                    <button className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatright" onClick={signOut}>Log out</button>
                    <a className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white floatright"><Link to="/admin/account">My account</Link></a>
                </div>
            </div>
        </header>
    );
}
export default MenubalkAdmin;