import {useEffect, useRef, useState} from 'react';
import classes from './IndienenForm.module.css';
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

function IndienenForm() {
    const voorkeur1InputRef = useRef();
    const voorkeur2InputRef = useRef();
    const voorkeur3InputRef = useRef();

    const [onderwerpen, setOnderwerpen] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getOnderwerpen = async () => {
            try {
                const response = await axiosPrivate.get("/auth/favorieten", { //zou eigenlijk de favorieten van die student moeten oproepen
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

    const submitHandler = () => {

        const enteredVoorkeur1 = voorkeur1InputRef.current.value;
        const enteredVoorkeur2 = voorkeur2InputRef.current.value;
        const enteredVoorkeur3 = voorkeur3InputRef.current.value;

        var id1;
        var id2;
        var id3;

        onderwerpen.map((onderwerp, i) =>{
            if (onderwerp.name === enteredVoorkeur1) {
                return id1 = onderwerp.id
            }
        })
        onderwerpen.map((onderwerp, i) =>{
            if (onderwerp.name === enteredVoorkeur2) {
                return id2 = onderwerp.id
            }
        })
        onderwerpen.map((onderwerp, i) =>{
            if (onderwerp.name === enteredVoorkeur3) {
                return id3 = onderwerp.id
            }
        })


        try {
            axiosPrivate.post("/auth/addselection/" + id1 + "/" + id2 + "/" + id3,
                {
                    headers: { 'Content-Type': 'application/json'}
                });
        } catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
        }
    }

    return (
        <div><p className={classes.card}>Beste student <br/>
            Selecteer 3 onderwerpen. Je moet minstens 1 onderwerp selecteren om te kunnen indienen.
            Plaats het onderwerp met je grootste voorkeur op plaats 1. Je tweede en derde voorkeur plaats je respectievelijk op plaats
            2 en 3. Je kan hier een selectie maken uit de onderwerpen die je bij je favorieten plaatste, zet dus zeker de onderwerpen die je wenst
            te selecteren bij je favorieten. Dien jouw selecte in uiterlijk op 30 april 2022 23:55. Een selectie die voor deze datum werd ingediend
            kun je nog altijd wijzigen tot uiterlijk deze datum.</p>
            <form className={classes.form}  onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='voorkeur1'>Preference 1</label>
                     <select required id='voorkeur1' ref={voorkeur1InputRef}>
                         <option>---</option>
                         {onderwerpen?.map((onderwerp, i) =>
                             <option key={i}>{onderwerp.name}</option>
                         )}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='voorkeur2'>Preference 2</label>
                    <select required id='voorkeur2' ref={voorkeur2InputRef} >
                        <option>---</option>
                        {onderwerpen?.map((onderwerp, i) =>
                            <option key={i}>{onderwerp.name}</option>
                        )}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='voorkeur3'>Preference 3</label>
                    <select required id='voorkeur3' ref={voorkeur3InputRef} >
                        <option>---</option>
                        {onderwerpen?.map((onderwerp, i) =>
                            <option key={i}>{onderwerp.name}</option>
                        )}
                    </select>
                </div>
                <div className={classes.actions}>
                    <button onClick={submitHandler}>Submit</button> {/*na voorkeur in te dienen mss naar ergens sturen of pagina tonen dat ze ingediend hebben en dat niet nog een keer kunnen*/}
                </div>
            </form>
        </div>
    );
}
export default IndienenForm;