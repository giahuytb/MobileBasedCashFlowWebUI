import http from "../redux/httpHelper"
import authHeader from "../redux/auth-header"


const TotalUserPlayGameToDay = () => 
        http.get(`api/participants/total-user-play-game-today`, {headers: authHeader() });

const TotalMatchToDay = () => 
        http.get(`api/gamematches/total-match-today`, {headers: authHeader() });

const TotalMatchThisWeek = () => 
        http.get(`api/gamematches/total-match-this-week`, {headers: authHeader() });

// User
const Authenticate = (userName, password) => 
        http.post(`api/users/authenticate`, {"userName": userName, "Password": password}, {headers: authHeader() });

const Register = (userName, password) => 
        http.post(`api/users/authenticate`, {"userName": userName, "Password": password}, {headers: authHeader() });

// Dream
const GetAllDream = () => 
        http.get(`api/dreams/all`, {headers: authHeader() });

const GetDreamById = (id) => 
        http.get(`api/dreams/${id}`, {headers: authHeader() });

const GetDreamByModId = (id) => 
        http.get(`api/dreams/mod-id/${id}`, {headers: authHeader() }); 

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

const GetGameAccountById = (id) => 
        http.get(`api/gameaccounts/${id}`, {headers: authHeader() });

const CreateGameAccount = (data) => 
        http.post(`api/gameaccounts`, data, {headers: authHeader() });

const UpdateGameAccount = (id, data) => 
        http.put(`api/gameaccounts/${id}`, data, {headers: authHeader() });

const DeleteJGameAccount = (id) => 
        http.delete(`api/gameaccounts/${id}` , {headers: authHeader() });   
        
// Asset        
const GetAllAsset = () => 
        http.get(`api/assets/all` , {headers: authHeader() });   

const UpdateAssetById = (id, data) => 
        http.put(`api/assets/${id}`, data , {headers: authHeader() });   



export default{

    TotalUserPlayGameToDay,
    TotalMatchToDay,
    TotalMatchThisWeek,

    // User
    Authenticate,
    Register,

    // Dream
    GetAllDream,
    GetDreamById,
    GetDreamByModId,
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
    GetJobCardById,
    CreateJobCard,
    UpdateJobCard,
    DeleteJobCard,

    // Game Account
    GetAllGameAccount,
    GetGameAccountById,
    CreateGameAccount,
    UpdateGameAccount,
    DeleteJGameAccount,
    
    GetAllAsset,
    UpdateAssetById,
}