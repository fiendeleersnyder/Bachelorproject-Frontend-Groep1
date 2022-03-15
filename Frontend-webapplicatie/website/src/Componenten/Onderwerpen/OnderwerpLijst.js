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
                address={item.address}
                description={item.description}
            />
        ))}
    </ul>
    );
}
export default OnderwerpLijst;