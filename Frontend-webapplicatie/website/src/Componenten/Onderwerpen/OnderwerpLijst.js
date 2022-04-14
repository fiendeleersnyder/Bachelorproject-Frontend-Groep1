import classes from './OnderwerpLijst.module.css';
import Onderwerp from './Onderwerp'
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useAuth from "../../Hooks/useAuth"
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../ui/Card";

const OnderwerpLijst = () => {
    const [onderwerpen, setOnderwerpen] = useState();
    const { auth } = useAuth();
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

    const favoriet = async (id) => {
        let array = [];
        try{
            const response = await axiosPrivate.get("/favorieten",
                    JSON.stringify(auth?.user),
                {
                    headers: {'Content-Type': 'application/json'},
                }
                );
                array = response?.data;
                console.log(array);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
        }
        let found = false;
        if (array !== []) {
            found = array.includes(id);
        }
        console.log(found);
        if (found) {
            try {
                axiosPrivate.delete("/deletefavoriet/" + id,
                    JSON.stringify(id),
                    {
                        headers: {'Content-Type': 'application/json'},
                    }
                );
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }
        else{
            try {
                axiosPrivate.post("/addfavoriet/" + id,
                    JSON.stringify(id),
                    {
                        headers: {'Content-Type': 'application/json'},
                    }
                );
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
            }
    }

    return (
        <ul>
            {onderwerpen?.length
                ? (
                    <ul>
                        {onderwerpen.map((onderwerp, i) =>
                            <Card>
                                <div className={classes.content}>
                                    <h3>{onderwerp.name}</h3>
                                    {/*<address>{props.address}</address>
                                       <p>{props.description}</p>**/}
                                </div>
                                <div className={classes.actions}>
                                    <button key={i} onClick={()=>favoriet(onderwerp.id)}>Voeg toe aan favorieten</button>
                                </div>
                            </Card>
                        )}
                    </ul>
                ) : <p>Geen onderwerpen om te tonen</p>
            }
        </ul>
    );
}
export default OnderwerpLijst;