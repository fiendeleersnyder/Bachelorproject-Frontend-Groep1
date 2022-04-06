import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const RequireAuth = ({AllowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(AllowedRoles.find(role => auth?.roles?.includes(role)));

    //return(
        /*AllowedRoles.forEach(role => auth?.roles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />

        );*/
    /*{
        console.log("in for", role, auth?.roles, AllowedRoles, auth?.roles[role]);
        if(AllowedRoles?.includes(auth?.roles[role])){
            console.log("in if");
            return <Outlet />
        }
    }
    return <Navigate to="/login" state={{ from: location }} replace />*/


    return (
        AllowedRoles.find(role => auth?.roles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;