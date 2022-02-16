import decode from "jwt-decode";
const auth = {
    isAuthenticated() {
        if (localStorage.jwtToken) {
            return decode(localStorage.jwtToken);
        } else {
            return false;
        }
    },
    authenticate(jwtToken) {
        localStorage.setItem("jwtToken", JSON.stringify(jwtToken));
    },
    clearJWT() {
        localStorage.removeItem("jwtToken");
    },
};

export default auth;
