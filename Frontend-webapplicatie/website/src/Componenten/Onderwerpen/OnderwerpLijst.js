import classes from './OnderwerpLijst.module.css';
import Onderwerp from './Onderwerp'

function OnderwerpLijst(props){
    return (
        <ul className={classes.list}>
        {props.items.map((item) =>(
            <Onderwerp
                key={item.id}
                id={item.id}
                title={item.title}
                contactpersoon={item.contactpersoon}
                description={item.description}
                discipline1={item.discipline1}
                discipline2={item.discipline2}
                discipline3={item.discipline3}
            />
        ))}
    </ul>
    );
}
export default OnderwerpLijst;