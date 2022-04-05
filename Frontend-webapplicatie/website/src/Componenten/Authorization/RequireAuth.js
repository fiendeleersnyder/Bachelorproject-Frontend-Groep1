import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    /*if(auth?.roles?.find(role => AllowedRoles?.includes(role))){
        return <Outlet />
    }
    return <Navigate to="/login" state={{ from: location }} replace />*/

    return (
        auth?.user
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;