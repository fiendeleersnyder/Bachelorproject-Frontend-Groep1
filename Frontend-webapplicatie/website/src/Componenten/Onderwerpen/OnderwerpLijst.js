import classes from './OnderwerpLijst.module.css';
import Onderwerp from './Onderwerp'

function OnderwerpLijst(props){
    return (
        <ul className={classes.list}>
        {props.meetups.map((meetup) =>(
            <Onderwerp
                key={meetup.id}
                id={meetup.id}
                title={meetup.title}
                address={meetup.address}
                description={meetup.description}
            />
        ))}
    </ul>
    );
}
export default OnderwerpLijst;