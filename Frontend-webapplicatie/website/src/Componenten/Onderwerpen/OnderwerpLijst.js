import classes from './OnderwerpLijst.module.css';
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useAuth from "../../Hooks/useAuth"
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../ui/Card";

const OnderwerpLijst = () => {
    const [onderwerpen, setOnderwerpen] = useState();
    const [onderwerp, setOnderwerp] = useState();
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
            const response = await axiosPrivate.get("/auth/favorieten");
                array = response?.data;
                console.log(array);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
        }
        let idarray = [];
        array.map((onderwerp, i) =>
                    idarray.push(onderwerp.id))
        console.log("id array" + idarray);
        let found = false;
        if (idarray !== []) {
            found = idarray.includes(id);
        }
        console.log(found);
        if (found) {
            try {
                axiosPrivate.delete("/auth/deletefavoriet/" + id,
                {
                    headers: { 'Content-Type': 'application/json'}
                });
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }
        else{
            try {
                axiosPrivate.post("/auth/addfavoriet/" + id,
                    {
                        headers: { 'Content-Type': 'application/json'}
                    });
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
                            <Card key={i}>
                                <div className={classes.content}>
                                    <h3 >{onderwerp.name}</h3>
                                    {/*<address>{props.address}</address>
                                       <p>{props.description}</p>**/}
                                </div>
                                <div className={classes.actions}>
                                    <button onClick={()=>favoriet(onderwerp.id)}>Voeg toe aan favorieten</button>
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