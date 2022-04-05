import { useContext } from "react";
import AuthContext from "../Services/AuthProvider"

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;