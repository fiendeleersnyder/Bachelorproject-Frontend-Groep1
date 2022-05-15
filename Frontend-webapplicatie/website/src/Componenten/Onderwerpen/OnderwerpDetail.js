import {useEffect, useState} from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const OnderwerpDetail = () => {
    const {id} = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [onderwerp, setOnderwerp] = useState();
    const [bedrijven, setBedrijven] = useState();

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
            try {
                const response = await axiosPrivate.get("/auth/bedrijven");
                console.log(response.data);
                setBedrijven(response?.data)
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
            {onderwerp?.bedrijf !== null ?
                bedrijven?.map((bedrijf, i) =>
                    bedrijf.id == onderwerp?.bedrijf ?
                        <li key={i}> Bedrijf: {bedrijf.name}</li> : null
                ) : null
            }
            <li>E-mail: {onderwerp?.email}</li>
            {onderwerp?.phone !== "" ?
                <li>Phone number: {onderwerp?.phone}</li> : null
            }
            <li>Permitted amount of students per group: {onderwerp?.capacity}</li>
            {onderwerp?.disciplines.length !== 0 ?
                <li> Disciplines: </li> :null
            }
            <ul>
                {onderwerp?.disciplines.length !== 0 ?
                    onderwerp?.disciplines?.map((discipline, i) =>
                        <li key={i}>{discipline}</li>)
                    : null
                }
            </ul>
            {onderwerp?.trefwoorden.length !== 0 ?
                <li>Keywords: </li> : null
            }
            <ul>
            {onderwerp?.trefwoorden.length !== 0 ? (
                <li> {onderwerp?.trefwoorden}</li>) : null
            }
            </ul>
            <li>Description: {onderwerp?.description}</li>
        </ul>
    </article>
);
};

export default OnderwerpDetail;
