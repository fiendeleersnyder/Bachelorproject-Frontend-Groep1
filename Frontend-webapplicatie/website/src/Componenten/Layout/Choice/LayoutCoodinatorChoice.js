import classes from '../Layout.module.css';
import MenubalkCoordinator from "../../Menubalken/Choice/MenubalkCoordinatorChoice";
import {Outlet} from "react-router-dom"

function LayoutCoordinator(props){
    return(
        <div>
            <MenubalkCoordinator />
            <main className={classes.main}>
                {props.children}
                <Outlet />
            </main>
        </div>
    );
}
export default LayoutCoordinator;