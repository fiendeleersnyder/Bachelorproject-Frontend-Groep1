import Card from '../ui/Card';
import classes from './NieuwOnderwerpForm.module.css';

function NieuwOnderwerpForm() {
    return (
        <Card>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='title'>Onderwerptitel</label>
                    <input type='text' required id='title'/>
                </div>
            </form>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='address'>Adres</label>
                    <input type='text' required id='address'/>
                </div>
            </form>
            <form className={classes.form}>
                <div className={classes.control}>
                    <label htmlFor='description'>Omschrijving</label>
                    <textarea required id='description' rows='5'></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Voeg onderwerp toe</button>
                </div>
            </form>
        </Card>
    );
}
export default NieuwOnderwerpForm;