import classes from "./Homescherm.module.css";
function Homescherm(){
    return (
        <div><p className={classes.card}>Welcome<br/><br/>
            Between 01 April 2022 00:00 and 30 April 2022 23:55 this offer of
            thesis subject will be open for choosing a master thesis.<br/><br/>
             During this time you will be able to set favorites, add subjects to a
            selection and submit a selection. For this target group you have
            to submit a selection of 3 subjects. Finalize your submission the
            latest on 30 April 2022 23:55. After this date the application
            will no longer be available.</p></div>
    );
}
export default Homescherm;