import { useContext } from "react";
import AuthContext from "../components/AuthContext/AuthContext"

const useAuth = () => {
    const AuthContext = createContext(null);
    return useContext(AuthContext);
}

export default useAuth;