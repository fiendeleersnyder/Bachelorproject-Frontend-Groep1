import { useContext } from "react";
import AuthContext from "../Componenten/Authorization/AuthProvider"

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;