import axios from 'axios';

const ApiUrl = 'https://mobilebasedcashflowapi.herokuapp.com/'

export default axios.create({
    baseURL: ApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});