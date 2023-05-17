import axios from 'axios';
// eslint-disable-next-line no-unused-vars
const ApiUrl = 'https://mobilebasedcashflowapi.herokuapp.com/'
// eslint-disable-next-line no-unused-vars
const LocalTestApi = 'https://localhost:44310/'
// eslint-disable-next-line no-unused-vars
const DockerApi = 'http://localhost:8080/'
export default axios.create({
    baseURL: ApiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});