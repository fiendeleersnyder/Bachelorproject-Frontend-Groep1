import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useNavigate, useLocation, Link} from "react-router-dom";

const AccountAdmin = () => {
    const [name, setName] = useState();
    const [firstname, setfirstname] = useState();
    const [username, setUsername] = useState();
    const [rollen, setRollen] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/auth/account', {
                    signal: controller.signal
                });
                console.log(response.data);
                setName(response.data.name)
                setfirstname(response.data.firstname)
                setUsername(response.data.username)
                setRollen(response.data.rollen)
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }

        getUsers();

        return () => {
            controller.abort();
        }
    }, [])


    return (
        <div>
            <p>Name: {name}</p>
            <p>Firstname: {firstname}</p>
            <p>Username: {username}</p>
            
            <button><Link to={window.location.pathname + "/changepassword"}>Change password</Link></button>
        </div>
    );
};

export default AccountAdmin;