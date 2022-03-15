import {useRef} from 'react';
import Card from '../ui/Card';
import classes from './NieuwOnderwerpForm.module.css';

function NieuwOnderwerpForm() {
    const titleInputRef = useRef();
    const addressInputRef = useRef();
    const descriptionInputRef = useRef();


    function submitHandler(event){
        event.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;

        const onderwerpData = {
            title: enteredTitle,
            address: enteredAddress,
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
                    <label htmlFor='address'>Adres</label>
                    <input type='text' required id='address' ref={addressInputRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='description'>Omschrijving</label>
                    <textarea required id='description' rows='5' ref={descriptionInputRef}></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Voeg onderwerp toe</button>
                </div>
            </form>
        </Card>
    );
}
export default NieuwOnderwerpForm;