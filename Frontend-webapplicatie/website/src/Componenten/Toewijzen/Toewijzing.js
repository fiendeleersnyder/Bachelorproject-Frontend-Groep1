import { useState, useEffect } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Toewijzing = () => {
    const [onderwerp, setOnderwerp] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/auth/gettoegewezen', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setOnderwerp(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <div>
            {onderwerp !== null ?
                <div>
                <h2>My subject</h2>
                <p>Name: {onderwerp.name}</p>
                <p>Promoter: {onderwerp.promotor}</p>
                </div>
            : <p>No subject yet assigned </p>}
        </div>
    );
};

export default Toewijzing;