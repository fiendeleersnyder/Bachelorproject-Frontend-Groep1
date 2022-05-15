import {useEffect, useState, useRef} from 'react';
import classes from './NieuwOnderwerpForm.module.css';
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import {useLocation, useNavigate} from "react-router-dom";

function NieuwOnderwerpForm() {
    const titleInputRef = useRef();
    const doelgroepInputRef = useRef();
    const begeleidingInputRef = useRef();
    const promotorInputRef = useRef();
    const emailInputRef = useRef();
    const telefoonInputRef = useRef();
    const aantalpersonenInputRef = useRef();
    const descriptionInputRef = useRef();
    const kenmerkwoord1InputRef = useRef();
    const kenmerkwoord2InputRef = useRef();
    const kenmerkwoord3InputRef = useRef();
    const trefwoordInputRef= useRef();

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const [promotoren, setPromotoren] = useState([]);
    const [bedrijven, setBedrijven] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getPromotorenEnBedrijven = async () => {
            try {
                const response = await axiosPrivate.get("/auth/promotoren", {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setPromotoren(promotoren => response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
            try {
                const response = await axiosPrivate.get("/auth/bedrijven", {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setBedrijven(bedrijven => response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }

        getPromotorenEnBedrijven();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    function submitHandler(event, id){
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDoelgroep = doelgroepInputRef.current.value;
        const enteredBegeleiding = begeleidingInputRef.current.value;
        const enteredPromotor = promotorInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredTelefoon = telefoonInputRef.current.value;
        const enteredAantal = aantalpersonenInputRef.current.value;
        const enteredKern1 = kenmerkwoord1InputRef.current.value;
        const enteredKern2 = kenmerkwoord2InputRef.current.value;
        const enteredKern3 = kenmerkwoord3InputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredTrefwoord = trefwoordInputRef.current.value;
        var idPromotor;
        var idBedrijf;

        if (enteredDoelgroep === "---" || enteredPromotor === "---" || enteredAantal === "---" || enteredKern1 === "---"){
            alert("Something went wrong, please try again. Make sure to fill in every field marked with a star.")
            return;}

        promotoren.map((promotor, i) => {
            if(enteredPromotor === promotor.firstname + " " + promotor.name)
                return(
                    idPromotor = promotor.id
                )
        })

        var arraydisciplines = []
        if (enteredKern2 === "---" && enteredKern3 === "---")

            arraydisciplines = [enteredKern1]

        else if (enteredKern3 === "---")

            arraydisciplines = [enteredKern1, enteredKern2]

        else if(enteredKern2!== "---" && enteredKern3 !== "---")

            arraydisciplines = [enteredKern1, enteredKern2, enteredKern3]

        var arraytrefwoorden = [enteredTrefwoord]

        if (enteredBegeleiding === "---"){
            const onderwerpData = {
                name: enteredTitle,
                doelgroep: enteredDoelgroep,
                email:enteredEmail,
                phone: enteredTelefoon,
                capacity:enteredAantal,
                disciplines: arraydisciplines,
                trefwoorden:arraytrefwoorden,
                description: enteredDescription
            };

            console.log(onderwerpData);

            try {
                const response = axiosPrivate.post("/addonderwerp/" + idPromotor,
                    JSON.stringify(onderwerpData),
                    {
                        headers: { 'Content-Type': 'application/json' }
                    });
            }catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }

        }

        else {
            const onderwerpData = {
                name: enteredTitle,
                doelgroep: enteredDoelgroep,
                email:enteredEmail,
                phone: enteredTelefoon,
                capacity:enteredAantal,
                disciplines: arraydisciplines,
                trefwoorden:arraytrefwoorden,
                description: enteredDescription,
            };

            console.log(onderwerpData);

            bedrijven.map((bedrijf, i) => {
                if(enteredBegeleiding === bedrijf.name)
                    return(
                        idBedrijf = bedrijf.id
                    )
            })

            try {
                const response = axiosPrivate.post("/addonderwerpmetbedrijf/" + idPromotor + "/" + idBedrijf,
                    JSON.stringify(onderwerpData),
                    {
                        headers: { 'Content-Type': 'application/json' }
                    });
            }catch (err) {
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true})
            }
        }

    }

    return (
        <div className={classes.card}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='title'>Title *</label>
                    <input type='text' required id='title' ref={titleInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='doelgroep'>Targetgroup *</label>
                    <select required id='doelgroep' ref={doelgroepInputRef} >
                        <option>---</option>
                        <option>IW E-ICT GroepT</option>
                        <option>IW EM GroepT</option>
                        <option>IW CH GroepT</option>
                        <option>IW BC GroepT</option>
                        <option>IW CH DeNayer</option>
                        <option>BW LT Geel</option>
                        <option>BW VI Geel</option>
                        <option>IW BC Gent</option>
                        <option>IW BK Brugge</option>
                        <option>IW BK Gent</option>
                        <option>IW BK DeNayer</option>
                        <option>IW CH Gent</option>
                        <option>IW EM Brugge</option>
                        <option>IW EM Geel</option>
                        <option>IW EM Gent</option>
                        <option>IW EM DeNayer</option>
                        <option>IW E-ICT Brugge</option>
                        <option>IW E-ICT Geel</option>
                        <option>IW E-ICT Gent</option>
                        <option>IW E-ICT DeNayer</option>
                        <option>IW EN Brugge</option>
                        <option>IW EN Geel</option>
                        <option>IW EN Gent</option>
                        <option>IW WE DeNayer</option>
                        <option>IW KV Brugge</option>
                        <option>IW CH Diepenbeek</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='begeleiding'>Extern partner-Research group</label>
                    <select type='text' id='begeleiding' ref={begeleidingInputRef}>
                        <option>---</option>
                        {bedrijven?.map((bedrijf, i) =>
                            <option key={i}>{bedrijf.name}</option>
                        )}
                    </select>
                </div>
                <div className={classes.control}>
                    <label1 htmlFor='contactpersoon'>Promotor</label1>
                    <select required id='promotor' ref={promotorInputRef} >
                        <option>---</option>
                        {promotoren?.map((promotor, i) =>
                            <option key={i}>{ promotor.firstname + " " + promotor.name}</option>
                        )}
                    </select>
                </div>
                <div className={classes.control}>
                    <label1>Contact details</label1>
                    <label2 htmlFor='email'>E-mail * </label2>
                    <input type='text' required id='email' ref={emailInputRef}/>
                    <label2 htmlFor='telefoon'>Phone number</label2>
                    <input type='text' id='telefoon' ref={telefoonInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='aantalpersonen'>Permitted amount of students per group *</label>
                    <select required id='aantalpersonen' ref={aantalpersonenInputRef} >
                        <option>---</option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Description *</label>
                    <textarea required id='description' rows='10' ref={descriptionInputRef}></textarea>
                </div>
                <div className={classes.control}>
                    <label>Disciplines</label>
                    <label1 htmlFor={'kermerkwoord1'}>Discipline 1 *</label1>
                    <select required id='kenmerkwoord1' ref={kenmerkwoord1InputRef}>
                        <option>---</option>
                        <option>Analog Electronics and Design</option>
                        <option>Digital Electronics and Design</option>
                        <option>Software Development</option>
                        <option>Data Science and Engineering</option>
                        <option>Tele and Data communication</option>
                        <option>Computer Technique, Microcontrollers and Operating Systems</option>
                        <option>Systems Theory and Signal Processing</option>
                        <option>Electronic Design and Interfacing</option>
                        <option>Structural analysis and design of structures</option>
                        <option>Materials and building technology</option>
                        <option>Civil engineering</option>
                        <option>Construction management and BIM</option>
                        <option>Geomatics</option>
                        <option>Advanced conversion and valorisation processes for waste streams</option>
                        <option>Sustainable processing engineering</option>
                        <option>Acoustic processing</option>
                        <option>Electrochemical technology</option>
                        <option>Membrane technology</option>
                        <option>Polymer technology</option>
                        <option>Advanced materials technology</option>
                        <option>Malting and brewing technology</option>
                        <option>Meat technology</option>
                        <option>Enzyme technology</option>
                        <option>Fermentation technology</option>
                        <option>Medical bioengineering</option>
                        <option>Molecular biology and ecology</option>
                        <option>Molecular diagnostics</option>
                        <option>Drive systems</option>
                        <option>Automation</option>
                        <option>Energy conversion</option>
                        <option>Production techniques and management</option>
                        <option>Mechanical design including the material selection</option>
                        <option>Automotive applications</option>
                        <option>Aeronautical engineering technology</option>
                        <option>Raw material</option>
                        <option>Product design</option>
                        <option>Processing</option>
                        <option>Post treatment</option>
                        <option>Application testing</option>
                        <option>Recycling</option>
                        <option>Power engineering</option>
                        <option>Energy engineering</option>
                        <option>Automation</option>
                    </select>
                    <label1 htmlFor='kenmerkwoord2'>Discipline 2</label1>
                    <select  id='kenmerkwoord2' ref={kenmerkwoord2InputRef}>
                        <option>---</option>
                        <option>Analog Electronics and Design</option>
                        <option>Digital Electronics and Design</option>
                        <option>Software Development</option>
                        <option>Data Science and Engineering</option>
                        <option>Tele and Data communication</option>
                        <option>Computer Technique, Microcontrollers and Operating Systems</option>
                        <option>Systems Theory and Signal Processing</option>
                        <option>Electronic Design and Interfacing</option>
                        <option>Structural analysis and design of structures</option>
                        <option>Materials and building technology</option>
                        <option>Civil engineering</option>
                        <option>Construction management and BIM</option>
                        <option>Geomatics</option>
                        <option>Advanced conversion and valorisation processes for waste streams</option>
                        <option>Sustainable processing engineering</option>
                        <option>Acoustic processing</option>
                        <option>Electrochemical technology</option>
                        <option>Membrane technology</option>
                        <option>Polymer technology</option>
                        <option>Advanced materials technology</option>
                        <option>Malting and brewing technology</option>
                        <option>Meat technology</option>
                        <option>Enzyme technology</option>
                        <option>Fermentation technology</option>
                        <option>Medical bioengineering</option>
                        <option>Molecular biology and ecology</option>
                        <option>Molecular diagnostics</option>
                        <option>Drive systems</option>
                        <option>Automation</option>
                        <option>Energy conversion</option>
                        <option>Production techniques and management</option>
                        <option>Mechanical design including the material selection</option>
                        <option>Automotive applications</option>
                        <option>Aeronautical engineering technology</option>
                        <option>Raw material</option>
                        <option>Product design</option>
                        <option>Processing</option>
                        <option>Post treatment</option>
                        <option>Application testing</option>
                        <option>Recycling</option>
                        <option>Power engineering</option>
                        <option>Energy engineering</option>
                        <option>Automation</option>
                    </select>
                    <label1 htmlFor='kenmerkwoord3'>Discipline 3</label1>
                    <select  id='kenmerkwoord3' ref={kenmerkwoord3InputRef}>
                        <option>---</option>
                        <option>Analog Electronics and Design</option>
                        <option>Digital Electronics and Design</option>
                        <option>Software Development</option>
                        <option>Data Science and Engineering</option>
                        <option>Tele and Data communication</option>
                        <option>Computer Technique, Microcontrollers and Operating Systems</option>
                        <option>Systems Theory and Signal Processing</option>
                        <option>Electronic Design and Interfacing</option>
                        <option>Structural analysis and design of structures</option>
                        <option>Materials and building technology</option>
                        <option>Civil engineering</option>
                        <option>Construction management and BIM</option>
                        <option>Geomatics</option>
                        <option>Advanced conversion and valorisation processes for waste streams</option>
                        <option>Sustainable processing engineering</option>
                        <option>Acoustic processing</option>
                        <option>Electrochemical technology</option>
                        <option>Membrane technology</option>
                        <option>Polymer technology</option>
                        <option>Advanced materials technology</option>
                        <option>Malting and brewing technology</option>
                        <option>Meat technology</option>
                        <option>Enzyme technology</option>
                        <option>Fermentation technology</option>
                        <option>Medical bioengineering</option>
                        <option>Molecular biology and ecology</option>
                        <option>Molecular diagnostics</option>
                        <option>Drive systems</option>
                        <option>Automation</option>
                        <option>Energy conversion</option>
                        <option>Production techniques and management</option>
                        <option>Mechanical design including the material selection</option>
                        <option>Automotive applications</option>
                        <option>Aeronautical engineering technology</option>
                        <option>Raw material</option>
                        <option>Product design</option>
                        <option>Processing</option>
                        <option>Post treatment</option>
                        <option>Application testing</option>
                        <option>Recycling</option>
                        <option>Power engineering</option>
                        <option>Energy engineering</option>
                        <option>Automation</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor={'trefwoorden'}>Keywords</label>
                    <textarea id='trefwoorden' rows='5' ref={trefwoordInputRef}></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Add subject</button>
                </div>
            </form>
        </div>
    );
}
export default NieuwOnderwerpForm;