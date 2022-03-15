import {useRef} from 'react';
import Card from '../ui/Card';
import classes from './NieuwOnderwerpForm.module.css';

function NieuwOnderwerpForm() {
    const titleInputRef = useRef();
    const campusInputRef = useRef();
    const begeleidingInputRef = useRef();
    const contactpersoonInputRef = useRef();
    const emailInputRef = useRef();
    const telefoonInputRef = useRef();
    const aantalpersonenInputRef = useRef();
    const descriptionInputRef = useRef();
    const kenmerkwoord1InputRef = useRef();
    const kenmerkwoord2InputRef = useRef();
    const kenmerkwoord3InputRef = useRef();


    function submitHandler(event){
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredCampus = campusInputRef.current.value;
        const enteredBegeleiding = begeleidingInputRef.current.value;
        const enteredContactpersoon = contactpersoonInputRef.current.value;
        const enteredEmail = emailInputRef.curent.value;
        const enteredTelefoon = telefoonInputRef.current.value;
        const enteredAantal = aantalpersonenInputRef.current.value;
        const enteredKern1 = kenmerkwoord1InputRef.current.value;
        const enteredKern2 = kenmerkwoord2InputRef.current.value;
        const enteredKern3 = kenmerkwoord3InputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;


        const onderwerpData = {
            title: enteredTitle,
            campus: enteredCampus,
            description: enteredDescription
        };

        console.log(onderwerpData);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='title'>Onderwerptitel</label>
                    <input type='text' required id='title' ref={titleInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='campus'>Campus</label>
                    <select required id='campus' ref={campusInputRef} >
                        <option>---</option>
                        <option>Leuven</option>
                        <option>Groep T Leuven</option>
                        <option>Brussel</option>
                        <option>Sint-Lucas Brussel</option>
                        <option>Antwerpen</option>
                        <option>Geel</option>
                        <option>De Nayer Sint-Katelijne-Waver</option>
                        <option>Sint-Lucas Gent</option>
                        <option>Technologiecampus Gent</option>
                        <option>Aalst</option>
                        <option>Kulak Kortrijk</option>
                        <option>Brugge</option>
                        <option>Diepenbeek</option>
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
                    <textarea required id='description' rows='5' ref={descriptionInputRef}></textarea>
                </div>
                <div className={classes.control}>
                    <label>Kernwoorden</label>
                    <label1 htmlFor='kenmerkwoord1'>Kernwoord 1</label1>
                    <select required id='kenmerkwoord1' ref={kenmerkwoord1InputRef}>
                        <option>---</option>
                        <option>NOG TOEVOEGEN</option>
                        <option>NOG TOEVOEGEN</option>
                        <option>NOG TOEVOEGEN</option>
                    </select>
                    <label1 htmlFor='kenmerkwoord2'>Kernwoord 2</label1>
                    <select  id='kenmerkwoord2' ref={kenmerkwoord2InputRef}>
                        <option>---</option>
                        <option>NOG TOEVOEGEN</option>
                        <option>NOG TOEVOEGEN</option>
                        <option>NOG TOEVOEGEN</option>
                    </select>
                    <label1 htmlFor='kenmerkwoord3'>Kernwoord 3</label1>
                    <select  id='kenmerkwoord3' ref={kenmerkwoord3InputRef}>
                        <option>---</option>
                        <option>NOG TOEVOEGEN</option>
                        <option>NOG TOEVOEGEN</option>
                        <option>NOG TOEVOEGEN</option>
                    </select>
                </div>
                <div className={classes.actions}>
                    <button>Voeg onderwerp toe</button>
                </div>
            </form>
        </Card>
    );
}
export default NieuwOnderwerpForm;