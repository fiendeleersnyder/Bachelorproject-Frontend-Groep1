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

    function submitHandler(event){
        event.preventDefault();

        const enteredVoorkeur1 = voorkeur1InputRef.current.value;
        const enteredVoorkeur2 = voorkeur2InputRef.current.value;
        const enteredVoorkeur3 = voorkeur3InputRef.current.value;

        const onderwerpData = {
            voorkeur1: enteredVoorkeur1,
            voorkeur2: enteredVoorkeur2,
            voorkeur3: enteredVoorkeur3
        };

        console.log(onderwerpData);
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
                    <label htmlFor='voorkeur1'>Voorkeur 1</label>
                     <select required id='voorkeur1' ref={voorkeur1InputRef}>
                         <option>---</option>
                         {onderwerpen?.map((onderwerp, i) =>
                             <option key={i}>{onderwerp.name}</option>
                         )}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='voorkeur2'>Voorkeur 2</label>
                    <select required id='voorkeur2' ref={voorkeur2InputRef} >
                        <option>---</option>
                        {onderwerpen?.map((onderwerp, i) =>
                            <option key={i}>{onderwerp.name}</option>
                        )}
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='voorkeur3'>Voorkeur 3</label>
                    <select required id='voorkeur3' ref={voorkeur3InputRef} >
                        <option>---</option>
                        {onderwerpen?.map((onderwerp, i) =>
                            <option key={i}>{onderwerp.name}</option>
                        )}
                    </select>
                </div>
                <div className={classes.actions}>
                    <button>Indienen</button>
                </div>
            </form>
        </div>
    );
}
export default IndienenForm;