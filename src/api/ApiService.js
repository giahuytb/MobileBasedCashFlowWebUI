import http from "../redux/httpHelper"
import authHeader from "../redux/auth-header"

// User
const Authenticate = (userName, password) => 
        http.post(`api/users/authenticate`, {"userName": userName, "Password": password}, {headers: authHeader() });

const Register = (userName, password) => 
        http.post(`api/users/authenticate`, {"userName": userName, "Password": password}, {headers: authHeader() });

// Dream
const GetAllDream = () => 
        http.get(`api/dreams/all`, {headers: authHeader() });

const GetDreamByPaging = (pageIndex, pageSize) => 
        http.get(`api/dreams`, {params: {pageIndex, pageSize}}, {headers: authHeader() });

const GetDreamById = (id) => 
        http.get(`api/dreams/${id}`, {headers: authHeader() });

const CreateDream = (data) => 
        http.post(`api/dreams`, data, {headers: authHeader() });

const UpdateDream = (id, data) => 
        http.put(`api/dreams/${id}`, data, {headers: authHeader() });

const DeleteDream = (id) => 
        http.delete(`api/dreams/${id}` , {headers: authHeader() });


// Event Card
const GetAllEventCard = () => 
        http.get(`api/eventcards/all`, {headers: authHeader() });

const GetEventCardByPaging = (pageIndex, pageSize) => 
        http.get(`api/eventcards?`, {params: {pageIndex, pageSize}}, {headers: authHeader() });

const GetEventCardById = (id) => 
        http.get(`api/eventcards/${id}`, {headers: authHeader() });

const GetEventCardByTypeId = (id) => 
        http.get(`api/eventcards/type-id/${id}`, {headers: authHeader() });

const GetEventCardByModId = (id) => 
        http.get(`api/eventcards/mod-id/${id}`, {headers: authHeader() });

const CreateEventCard = (data) => 
        http.post(`api/eventcards`, data, {headers: authHeader() });

const UpdateEventCard = (id, data) => 
        http.put(`api/eventcards/${id}`, data, {headers: authHeader() });

const DeleteEventCard = (id) => 
        http.delete(`api/eventcards/${id}`, {headers: authHeader() });

const InAcctiveEventCard = (id) => 
        http.put(`api/eventcards/inactive/${id}`, {headers: authHeader() });

// Job Card
const GetAllJobCard = () => 
        http.get(`api/jobcards/all`, {headers: authHeader() });

const GetJobCardByPaging = (pageIndex, pageSize) => 
        http.get(`api/jobcards`, {params: {pageIndex, pageSize}}, {headers: authHeader() });

const GetJobCardById = (id) => 
        http.get(`api/jobcards/${id}`, {headers: authHeader() });

const CreateJobCard = (data) => 
        http.post(`api/jobcards`, data, {headers: authHeader() });

const UpdateJobCard = (id, data) => 
        http.put(`api/jobcards/${id}`, data, {headers: authHeader() });

const DeleteJobCard = (id) => 
        http.delete(`api/jobcards/${id}` , {headers: authHeader() });


const GetAllGameAccount = () => 
        http.get(`api/gameaccounts/all`, {headers: authHeader() });

const GetGameAccountByPaging = (pageIndex, pageSize) => 
        http.get(`api/gameaccounts/all`, {params: {pageIndex, pageSize}}, {headers: authHeader() });

const GetGameAccountById = (id) => 
        http.get(`api/gameaccounts/all/${id}`, {headers: authHeader() });

const CreateGameAccount = (data) => 
        http.post(`api/gameaccounts/all`, data, {headers: authHeader() });

const UpdateGameAccount = (id, data) => 
        http.put(`api/gameaccounts/all/${id}`, data, {headers: authHeader() });

const DeleteJGameAccount = (id) => 
        http.delete(`api/gameaccounts/all/${id}` , {headers: authHeader() });       

export default{
    // User
    Authenticate,
    Register,

    // Dream
    GetAllDream,
    GetDreamByPaging,
    GetDreamById,
    CreateDream,
    UpdateDream,
    DeleteDream,

    // Event Card
    GetAllEventCard,
    GetEventCardByPaging,
    GetEventCardById,
    GetEventCardByTypeId,
    GetEventCardByModId,
    CreateEventCard,
    UpdateEventCard,
    DeleteEventCard,
    InAcctiveEventCard,

    // Job Card
    GetAllJobCard,
    GetJobCardByPaging,
    GetJobCardById,
    CreateJobCard,
    UpdateJobCard,
    DeleteJobCard,

    // Game Account
    GetAllGameAccount,
    GetGameAccountByPaging,
    GetGameAccountById,
    CreateGameAccount,
    UpdateGameAccount,
    DeleteJGameAccount,
    
}