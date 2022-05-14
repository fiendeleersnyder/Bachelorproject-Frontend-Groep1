import classes from '../Layout.module.css';
import MenubalkAdmin from "../../Menubalken/Assign/MenubalkAdminAssign";
import {Outlet} from "react-router-dom"

function LayoutAdmin(props){
    return(
        <div>
            <MenubalkAdmin />
            <main className={classes.main}>
                {props.children}
                <Outlet />
            </main>
        </div>
    );
}
export default LayoutAdmin;