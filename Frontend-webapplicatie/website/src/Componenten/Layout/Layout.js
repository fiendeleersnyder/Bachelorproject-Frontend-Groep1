import classes from './Layout.module.css';
import {Outlet} from "react-router-dom"
import MenubalkStudent from '../MenubalkStudent'

const Layout = () => {
    return(
            <main className={classes.main}>
                <MenubalkStudent />
                <Outlet />
            </main>
    )
}
export default Layout;

