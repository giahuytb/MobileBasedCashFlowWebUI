
import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import { Toast } from 'primereact/toast';

import ApiService from '../../api/ApiService'
import GameAccountList from './GameAccountList';

// const {EventCardList} = React.lazy(() => import('./EventCardList'));

export default function ViewGameAccount() {


    const [gameAccount, setGameAccount] = useState([]);
    const toast = useRef(null);
    

    const getAllDream = useCallback( () => {
        try {
            ApiService.GetAllGameAccount()
                .then(response => {
                    setGameAccount(response.data);                    
                })
        } catch (error) {
            if (error.response) {
                // get response with a status code not in range 2xx
                console.log(error.response.data.data);
                console.log(error.response.data.status);
                console.log(error.response.data.headers);
              } else if (error.request) {
                // no response
                console.log(error.request);
              } else {
                // Something wrong in setting up the request
                console.log("Error", error.message);
              }
              console.log(error.config);
        }
    }, []);

    // const CreateEventCard = useCallback( async (details) => {
    //     try {
    //         // console.log(eventCardList);
    //         // console.log(details);
    //         const data = {
    //             Event_name: details.Event_name,
    //             Image_url: details.Image_url,
    //             Account_name: details.Account_name,
    //             Cost: details.Cost,
    //             Down_pay: details.Down_pay,
    //             Dept: details.Dept,
    //             Cash_flow: details.Cash_flow,
    //             Trading_range: details.Trading_range,
    //             Event_description: details.Event_description,
    //             Event_type_id: details.Event_type_id,
    //             Game_mod_id: 1,
    //             Action: details.Action,
    //     };

    //     // setEventCardList([...eventCardList, data]);
        
    //     const createEventCardAPI = async () => {
    //         try {
    //             ApiService.CreateEventCard(data)
    //             .then(response => {
    //                 console.log(response.data);
    //                 if(response.status === 200){
    //                     toast.current.show({severity: 'info', summary: 'Success', detail: 'Create Success'});
    //                 }
    //                 if(response.status === 400){
    //                     toast.current.show({severity: 'error', summary: 'Error', detail: response.data.error});
    //                 }
    //             })
    //         } catch (error) {
    //             if (error.response) {
    //                 // get response with a status code not in range 2xx
    //                 console.log(error.response.data.data);
    //                 console.log(error.response.data.status);
    //                 console.log(error.response.data.headers);
    //                 toast.current.show({severity: 'error', summary: 'Success', detail: error.response});
    //               } else if (error.request) {
    //                 // no response
    //                 console.log(error.request);
    //                 toast.current.show({severity: 'error', summary: 'Success', detail: error.request});
    //               } else {
    //                 // Something wrong in setting up the request
    //                 console.log("Error", error.message);
    //                 toast.current.show({severity: 'error', summary: 'Success', detail: error.message});
    //               }
    //               toast.current.show({severity: 'error', summary: 'Success', detail: error.config});    
    //         }
    //     }
    //     createEventCardAPI();
        
    //     } catch (error) {
    //         console.log(`Fail To Create Event: ${  error}`);
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // const UpdateEventCard = async (details) => {
    //     try { 
    //         const data = {
    //             Id: details.id,
    //             Event_name: details.Event_name,
    //             Image_url: details.Image_url,
    //             Account_name: details.Account_name,
    //             Cost: details.Cost,
    //             Down_pay: details.Down_pay,
    //             Dept: details.Dept,
    //             Cash_flow: details.Cash_flow,
    //             Trading_range: details.Trading_range,
    //             Event_description: details.Event_description,
    //             Event_type_id: details.Event_type_id,                    
    //             Action: details.Action,
    //             Game_mode_id: details.Game_mode_id,
    //         };

    //             console.log(data);
    //             setEventCardList(prevState => {
    //                 const newState = prevState.map(obj => {
    //                   // 👇️ if id equals 2, update property
    //                   if (obj.id === details.id) {
    //                     return {...obj, 
    //                         Event_name: details.Event_name, 
    //                         Account_name: details.Account_name,
    //                         Image_url: details.Image_url,
    //                         Cost: details.Cost,
    //                         Down_pay: details.Down_pay,
    //                         Dept: details.Dept,
    //                         Cash_flow: details.Cash_flow,
    //                         Trading_range: details.Trading_range,
    //                         Event_description: details.Event_description,
    //                         Event_type_id: details.Event_type_id,                           
    //                         Action: details.Action,
    //                         Game_mode_id: details.Game_mode_id,
    //                     };
    //                   }
    //                   // 👇️ otherwise return the object as is
    //                   return obj;
    //                 });
    //                 return newState;
    //             });

    //         const updateEventCardAPI = async () => {
    //             try {
    //                 ApiService.UpdateEventCard(data.Id, data)
    //                 .then(response => {
    //                     console.log(response.data);
    //                     console.log(response.status);
    //                     if(response.status === 200){
    //                         toast.current.show({severity: 'info', summary: 'Success', detail: 'Update Success'});
    //                     }
    //                     if(response.status === 400){
    //                         toast.current.show({severity: 'error', summary: 'Error', detail: 'Update Failed'});
    //                     }
    //                 })                   
    //             } catch (error) {
    //                 if (error.response) {
    //                     // get response with a status code not in range 2xx
    //                     console.log(error.response.data.data);
    //                     console.log(error.response.data.status);
    //                     console.log(error.response.data.headers);
    //                     toast.current.show({severity: 'error', summary: 'Error', detail: error.response});
    //                   } else if (error.request) {
    //                     // no response
    //                     console.log(error.request);
    //                     toast.current.show({severity: 'error', summary: 'Error', detail: error.request});
    //                   } else {
    //                     // Something wrong in setting up the request
    //                     console.log("Error", error.message);
    //                     toast.current.show({severity: 'error', summary: 'Error', detail: error.message});
    //                   }
    //                   toast.current.show({severity: 'error', summary: 'Error', detail: error.config});    
    //                 }
    //             }

    //         updateEventCardAPI();

    //     } catch (error) {
    //         console.log(`Fail To Create Event: ${  error}`);
    //     }   
    // }

    // const DeleteEventCard = async (id) => {
    //     try {
    //         console.log(id);
    //         setEventCardList(eventCardList.filter(card => card.id !== id));

    //         const DeleteEventCardAPI = async () => {
    //             console.log(id);
    //             try {
    //                 ApiService.InAcctiveEventCard(id)
    //                 .then(response => {
    //                     console.log(response.data);
    //                     if(response.status === 200){
    //                         toast.current.show({severity: 'info', summary: 'Success', detail: 'Delete Success'});
    //                     }
    //                     if(response.status === 400){
    //                         toast.current.show({severity: 'error', summary: 'Error', detail: 'Delete Failed'});
    //                     }
    //                 })                    
    //             } catch (error) {
    //                 if (error.response) {
    //                     // get response with a status code not in range 2xx
    //                     console.log(error.response.data.data);
    //                     console.log(error.response.data.status);
    //                     console.log(error.response.data.headers);
    //                     toast.current.show({severity: 'error', summary: 'Error', detail: error.response});
    //                   } else if (error.request) {
    //                     // no response
    //                     console.log(error.request);
    //                     toast.current.show({severity: 'error', summary: 'Error', detail: error.request});
    //                   } else {
    //                     // Something wrong in setting up the request
    //                     console.log("Error", error.message);
    //                     toast.current.show({severity: 'error', summary: 'Error', detail: error.message});
    //                   }
    //                   toast.current.show({severity: 'error', summary: 'Error', detail: error.config});    
    //             }
    //         } 
    //         await DeleteEventCardAPI();

    //     } catch (error) {
    //         console.log(`Fail To Create Event: ${  error}`);
    //     }   
    // }

    // const GetAllGameAccount = useCallback(() => {
    //     console.log("Fetching all games account...");
    //     try {
    //         ApiService.GetAllGameAccount()
    //             .then(response => {
    //                 setGameAccountList(response.data);
    //             })
    //     } catch (error) {
    //         if (error.response) {
    //             // get response with a status code not in range 2xx
    //             console.log(error.response.data.data);
    //             console.log(error.response.data.status);
    //             console.log(error.response.data.headers);
    //           } else if (error.request) {
    //             // no response
    //             console.log(error.request);
    //           } else {
    //             // Something wrong in setting up the request
    //             console.log("Error", error.message);
    //           }
    //           console.log(error.config);
    //     }
    //     GetAllGameAccount();
    // }, []);


    useEffect(() => {
        getAllDream(); 
    }, [getAllDream]);
    
    return (
        <div>
        {/* {console.log(dreamList)} */}
        <Toast ref={toast}/>
        <Suspense fallback ={<div> Loading </div>}>
            <GameAccountList 
                    gameAccountList = {gameAccount}
                    />  
        </Suspense>
            
        </div>
    )
}