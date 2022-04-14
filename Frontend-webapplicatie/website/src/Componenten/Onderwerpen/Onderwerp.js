import Card from '../ui/Card';
import classes from './Onderwerp.module.css';
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function Onderwerp(props) {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const favorieten = async () => {
        try {
            axiosPrivate.post("/favorieten",
                    JSON.stringify(props.id),
                {
                    headers: {'Content-Type': 'application/json'},
                }
            );

        } catch (err) {
            console.error(err);
            navigate('/login', { state: {from: location}, replace: true})
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