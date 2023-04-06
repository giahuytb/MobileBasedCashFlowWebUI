import axios from 'axios';
// eslint-disable-next-line no-unused-vars
const ApiUrl = 'https://mobilebasedcashflowapi.herokuapp.com/'
// eslint-disable-next-line no-unused-vars
const LocalTestApi = 'https://localhost:44310/'
export default axios.create({
    baseURL: ApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});