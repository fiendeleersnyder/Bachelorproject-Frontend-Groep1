import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('http://localhost:8080/auth/refreshtoken', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.acces_token);
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.acces_token }
        });
        return response.data.acces_token;
    }
    return refresh;
};

export default useRefreshToken;