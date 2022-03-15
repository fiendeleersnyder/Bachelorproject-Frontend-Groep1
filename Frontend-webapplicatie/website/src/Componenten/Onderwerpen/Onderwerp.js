import Card from '../ui/Card';
import classes from './Onderwerp.module.css';

function Onderwerp(props) {
  return (
    <li className={classes.item}>
        <Card>
          <div className={classes.content}>
            <h3>{props.title}</h3>
              <address>{props.address}</address>
              <p>{props.description}</p>
          </div>
          <div className={classes.actions}>
              <button>Voeg toe aan favorieten</button>
          </div>
        </Card>
    </li>
  );
}

export default Onderwerp;