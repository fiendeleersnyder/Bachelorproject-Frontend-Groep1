import classes from './Layout.module.css';
import MenubalkStudent from "../Menubalken/MenubalkStudent";
import {Outlet} from "react-router-dom"

function LayoutStudent(props){
    return(
        <div>
            <MenubalkStudent />
            <main className={classes.main}>
                {props.children}
                <Outlet />
            </main>
        </div>
    );
}
export default LayoutStudent;