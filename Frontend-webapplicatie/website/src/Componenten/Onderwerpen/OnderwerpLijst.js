import classes from './OnderwerpLijst.module.css';
import Onderwerp from './Onderwerp'
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const OnderwerpLijst = () => {
    const [onderwerpen, setOnderwerpen] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getOnderwerpen = async () => {
            try {
                const response = await axiosPrivate.get('/onderwerpen', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setOnderwerpen(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }

        getOnderwerpen();

        return () => {
            isMounted = false;
            controller.abort();
        }
        }, [])

    return (
        <ul>
            {onderwerpen?.length
                ? (
                    <ul className={classes.list}>
                        {onderwerpen.map((onderwerp, i) => <Onderwerp
                            key={i}
                            id = {onderwerp.id}
                            title={onderwerp.name}
                        />
                        )}
                    </ul>
                ) : <p>Geen onderwerpen om te tonen</p>
            }
        </ul>
    );
}
export default OnderwerpLijst;