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
        const controller = new AbortController();

        const getInfo = async () => {
            try {
                const response = await axiosPrivate.get("/onderwerpen/" + id);
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
            <li>Title: {onderwerp?.name}</li>
            <li>Target group: {onderwerp?.doelgroep}</li>
            <li>Promoter: {onderwerp?.promotor}</li>
            <li>E-mail promotor: {onderwerp?.email}</li>
            <li>Phone number: {onderwerp?.phone}</li>
            <li>Permitted amount of students per group: {onderwerp?.capacity}</li>
            {onderwerp?.disciplines.isEmpty ? (
                <li> Disciplines: {onderwerp?.disciplines}</li>) : null
            }
            {onderwerp?.trefwoorden.isEmpty ? (
                <li> Keywords: {onderwerp?.trefwoorden}</li>) : null
            }
            <li>Description: {onderwerp?.description}</li>
        </ul>
    </article>
);
};

export default OnderwerpDetail;
