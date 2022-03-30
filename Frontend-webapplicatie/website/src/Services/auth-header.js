export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken }; //Dit is voor spring boot
        //return { "x-auth-token": user.accessToken }; Dit is voor nodejs
    } else {
        return {};
    }
}