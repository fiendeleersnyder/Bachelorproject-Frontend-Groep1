import classes from './Layout.module.css';
import Menubalk from "../Menubalk";

function Layout(props){
    return(
        <div>
            <Menubalk />
            <main className={classes.main}>
                {props.children}
            </main>
        </div>
    );
}
export default Layout;
