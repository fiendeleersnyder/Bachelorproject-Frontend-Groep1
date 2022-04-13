import Card from '../ui/Card';
import classes from './Onderwerp.module.css';
import axios from "../../API/axios";
import qs from "qs";

function Onderwerp(props) {

    const favorieten = async () => {
        try {
            axios.post("/favorieten",
                    JSON.stringify(props.id),
                {
                    headers: {'Content-Type': 'application/json'}
                }
            );

        } catch (err) {
            console.error(err);
        }
    }

  return (
    <li className={classes.item}>
        <Card>
          <div className={classes.content}>
            <h3>{props.title}</h3>
              {/*<address>{props.address}</address>
              <p>{props.description}</p>**/}
          </div>
            <div className={classes.actions}>
                <button onClick={favorieten()}>Voeg toe aan favorieten</button>
            </div>
        </Card>
    </li>
  );
}

export default Onderwerp;