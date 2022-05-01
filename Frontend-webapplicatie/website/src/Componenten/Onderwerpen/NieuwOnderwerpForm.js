import {useRef} from 'react';
import classes from './NieuwOnderwerpForm.module.css';

function NieuwOnderwerpForm() {
    const titleInputRef = useRef();
    const doelgroepInputRef = useRef();
    const begeleidingInputRef = useRef();
    const contactpersoonInputRef = useRef();
    const emailInputRef = useRef();
    const telefoonInputRef = useRef();
    const aantalpersonenInputRef = useRef();
    const descriptionInputRef = useRef();
    const kenmerkwoord1InputRef = useRef();
    const kenmerkwoord2InputRef = useRef();
    const kenmerkwoord3InputRef = useRef();
    const trefwoordInputRef= useRef();

    function submitHandler(event){
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDoelgroep = doelgroepInputRef.current.value;
        const enteredBegeleiding = begeleidingInputRef.current.value;
        const enteredContactpersoon = contactpersoonInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredTelefoon = telefoonInputRef.current.value;
        const enteredAantal = aantalpersonenInputRef.current.value;
        const enteredKern1 = kenmerkwoord1InputRef.current.value;
        const enteredKern2 = kenmerkwoord2InputRef.current.value;
        const enteredKern3 = kenmerkwoord3InputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredTrefwoord = trefwoordInputRef.current.value;


        const onderwerpData = {
            title: enteredTitle,
            doelgroep: enteredDoelgroep,
            begeleiding: enteredBegeleiding,
            contactpersoon: enteredContactpersoon,
            email:enteredEmail,
            telefoon: enteredTelefoon,
            aantalpersonen:enteredAantal,
            kermerkwoord1:enteredKern1,
            kermerkwoord2:enteredKern2,
            kermerkwoord3:enteredKern3,
            trefwoorden:enteredTrefwoord,
            description: enteredDescription
        };

        console.log(onderwerpData);
    }

    return (
        <div className={classes.card}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='title'>Onderwerptitel</label>
                    <input type='text' required id='title' ref={titleInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='doelgroep'>Doelgroep</label>
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
                    <label htmlFor='begeleiding'>Bedrijf-Onderzoeksgroep</label>
                    <input type='text' required id='begeleiding' ref={begeleidingInputRef}/>
                </div>
                <div className={classes.control}>
                    <label1 htmlFor='contactpersoon'>Promotor-Copromotor-Contactpersoon</label1>
                    <input type='text' required id='contactpersoon' ref={contactpersoonInputRef}/>
                </div>
                <div className={classes.control}>
                    <label1>Contactgegevens</label1>
                    <label2 htmlFor='email'>E-mail</label2>
                    <input type='text' required id='email' ref={emailInputRef}/>
                    <label2 htmlFor='telefoon'>Telefoonnummer</label2>
                    <input type='text' id='telefoon' ref={telefoonInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='aantalpersonen'>Aantal personen</label>
                    <select required id='aantalpersonen' ref={aantalpersonenInputRef} >
                        <option>---</option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Omschrijving</label>
                    <textarea required id='description' rows='10' ref={descriptionInputRef}></textarea>
                </div>
                <div className={classes.control}>
                    <label>Disciplines</label>
                    <label1 htmlFor={'kermerkwoord1'}>Discipline 1</label1>
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
                    <label htmlFor={'trefwoorden'}>Trefwoorden</label>
                    <textarea required id='trefwoorden' rows='5' ref={trefwoordInputRef}></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Voeg onderwerp toe</button>
                </div>
            </form>
        </div>
    );
}
export default NieuwOnderwerpForm;