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
                Select 3 topics. You must select at least 1 topic to submit.
                Put the topic with your highest preference in place 1.
                Put your second and third preference in place 2 and 3, respectively.
                Here you can make a selection from the subjects that you have placed
                in your favourites, so be sure to put the subjects you wish to select
                in your favourites. Submit your selection the latest on 30 April
                2022 23:55. A selection that is submitted before this date can always
                be changed until this date.</p>
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