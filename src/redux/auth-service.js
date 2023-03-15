
import jwtDecode from 'jwt-decode'
import ApiService from '../api/ApiService'

    const loginAsync = async (username, password) => {
        try{
                await ApiService.Authenticate(username, password).then(response => {
                if(response.status === 200){
                    localStorage.setItem("authToken", JSON.stringify(response.data.token));
                    localStorage.setItem("user", JSON.stringify(jwtDecode(response.data.token)));
                }                                                                   
            })
        }catch(error){
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                console.log(error.response.status);
                localStorage.setItem("errorMsg", error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                localStorage.setItem("errorMsg", error.response.data);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                localStorage.setItem("errorMsg", error.response.data);
              }
        }      
    }   

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("errorMsg")
    }

export default {
    loginAsync,
    logout,
};
