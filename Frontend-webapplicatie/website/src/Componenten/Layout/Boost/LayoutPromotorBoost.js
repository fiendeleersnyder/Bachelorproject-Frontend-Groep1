import classes from '../Layout.module.css';
import MenubalkPromotor from "../../Menubalken/Boost/MenubalkPromotorBoost";
import {Outlet} from "react-router-dom"

function LayoutPromotor(props){
    return(
        <div>
            <MenubalkPromotor />
            <main className={classes.main}>
                {props.children}
                <Outlet />
            </main>
        </div>
    );
}
export default LayoutPromotor;