import axios from 'axios';
// eslint-disable-next-line no-unused-vars
const ApiUrl = 'https://mobilebasedcashflowapi.herokuapp.com/'
export default axios.create({
    baseURL: ApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});