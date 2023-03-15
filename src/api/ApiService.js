import http from "../redux/httpHelper"
import authHeader from "../redux/auth-header"

const Authenticate = (userName, password) => 
        http.post("api/Users/authenticate", {"userName": userName, "Password": password}, {headers: authHeader() });

export default{
    Authenticate
}