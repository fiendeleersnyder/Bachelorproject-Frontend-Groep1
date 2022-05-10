import {useEffect, useRef, useState} from 'react';
import classes from './IndienenForm.module.css';
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";
import { Alert } from 'react-alert'

function IndienenForm() {
    const voorkeur1InputRef = useRef();
    const voorkeur2InputRef = useRef();
    const voorkeur3InputRef = useRef();

    const [onderwerpen, setOnderwerpen] = useState();
    var array = [];
    var array2 = [];
    const [ingediend, setIngediend] = useState([]);
    const [veranderd, setVeranderd] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getOnderwerpen = async () => {
            try {
                const response = await axiosPrivate.get("/auth/favorieten", {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setOnderwerpen(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }

            try {
                const response  = await axiosPrivate.get("/auth/selection")
                console.log(response.data);
                array = response.data;
                setIngediend(array);
                setVeranderd(false);
            }catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }

        getOnderwerpen();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [veranderd])

    const submitHandler = () => {

        const enteredVoorkeur1 = voorkeur1InputRef.current.value;
        const enteredVoorkeur2 = voorkeur2InputRef.current.value;
        const enteredVoorkeur3 = voorkeur3InputRef.current.value;

        if (enteredVoorkeur1 === "---" || enteredVoorkeur2 === "---" || enteredVoorkeur3 === "---"){
            alert("At least one of the subject isn't correctly submit, try again.")
            return;}


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
            setVeranderd(true);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
        }
    }

    return (
        <div>
            <div><p className={classes.card}>Beste student <br/>
                Selecteer 3 onderwerpen. Je moet minstens 1 onderwerp selecteren om te kunnen indienen.
                Plaats het onderwerp met je grootste voorkeur op plaats 1. Je tweede en derde voorkeur plaats je respectievelijk op plaats
                2 en 3. Je kan hier een selectie maken uit de onderwerpen die je bij je favorieten plaatste, zet dus zeker de onderwerpen die je wenst
                te selecteren bij je favorieten. Dien jouw selecte in uiterlijk op 30 april 2022 23:55. Een selectie die voor deze datum werd ingediend
                kun je nog altijd wijzigen tot uiterlijk deze datum.</p>
            </div>
            <div>
                <div>
                    <div className={classes.form}  onSubmit={submitHandler}>
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
                            <button onClick={submitHandler}>Submit</button>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Your selection</h4>
                    {ingediend.forEach((onderwerp, i) => {
                        if(onderwerp !== null)
                            return(
                                array2.push(onderwerp.name)
                            )
                    })}
                    {array2.isEmpty ?
                        <p>No selection made yet</p>
                        :<p>1 : {array2[0]}
                        <br />
                            2 : {array2[1]}
                            <br />
                            3 : {array2[2]}
                        </p>
                    }
                </div>
            </div>
        </div>
    );
}
export default IndienenForm;