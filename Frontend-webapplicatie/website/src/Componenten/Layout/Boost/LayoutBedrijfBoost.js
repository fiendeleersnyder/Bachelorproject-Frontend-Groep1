import classes from '../Layout.module.css';
import MenubalkBedrijf from "../../Menubalken/Boost/MenubalkBedrijfBoost";
import {Outlet} from "react-router-dom"

function LayoutBedrijf(props){
    return(
        <div>
            <MenubalkBedrijf />
            <main className={classes.main}>
                {props.children}
                <Outlet />
            </main>
        </div>
    );
}
export default LayoutBedrijf;