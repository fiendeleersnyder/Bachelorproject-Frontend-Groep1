import {useEffect, useState} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const OnderwerpDetail = () => {
    const {id} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [onderwerp, setOnderwerp] = useState();

    useEffect(() => {
        console.log(id);
        const controller = new AbortController();

        const getInfo = async () => {
            try {
                const response = await axiosPrivate.get('/onderwerpen/' + id, {
                    signal: controller.signal
                });
                console.log(response.data);
                setOnderwerp(response?.data)
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }

        getInfo();

        return () => {
            controller.abort();
        }
    }, [])

return (
    <article>
        <button onClick={() => navigate(-1)} className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white">Go back to subjects</button>
        <h2>Subject information</h2>
        <ul>
            <li>{onderwerp?.name}</li>
        </ul>
    </article>
);
};

export default OnderwerpDetail;