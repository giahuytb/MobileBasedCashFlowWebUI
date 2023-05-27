
import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import { Toast } from 'primereact/toast';

import ApiService from '../../api/ApiService'
import EventCardList from './EventCardList';

import '../../mystyle.module.css';

export default function ViewEventCard() {


    const [eventCardList, setEventCardList] = useState([]);
    const [gameAccountList, setGameAccountList] = useState([]);
    const toast = useRef(null);
    
    const GetAllGameAccount = () => {
        // console.log("Fetching all games account...");
        try {
            ApiService.GetAllGameAccount()
                .then(response => {
                    setGameAccountList(response.data);
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
    };

    const getAllEventCard = useCallback( () => {
        try {
            ApiService.GetEventCardByModId(1)
                .then(response => {
                    setEventCardList(response.data);                    
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

    const CreateEventCard = useCallback( async (details) => {
        try {
            // console.log(details);
            const data = {
                Event_name: details.Event_name,
                Image_url: details.Image_url,
                Account_name: details.Account_name,
                Cost: details.Cost,
                Down_pay: details.Down_pay,
                Dept: details.Dept,
                Cash_flow: details.Cash_flow,
                Trading_range: details.Trading_range,
                Event_description: details.Event_description,
                Event_type: details.Event_type,
                Game_mod_id: 1,
                Action: details.Action,
        };
    
        const createEventCardAPI = async () => {
            try {
                ApiService.CreateEventCard(data)
                .then(response => {
                    if(response.status === 200){
                        toast.current.show({severity: 'info', summary: 'Success', detail: 'Create Success', life: 4000});
                        setEventCardList(oldEventList => [...oldEventList, data]);
                    }
                    if(response.status === 400){
                        toast.current.show({severity: 'error', summary: 'Error', detail: response.data.error, life: 4000});
                    }
                }).catch((err) => {
                    console.error(err);
                    toast.current.show({severity: 'error', summary: 'Error', detail: "Create Fail", life: 4000});
                })
            } catch (error) {
                if (error.response) {
                    // get response with a status code not in range 2xx
                    console.log(error.response.data.data);
                    console.log(error.response.data.status);
                    console.log(error.response.data.headers);
                    toast.current.show({severity: 'error', summary: 'Success', detail: error.response});
                  } else if (error.request) {
                    // no response
                    console.log(error.request);
                    toast.current.show({severity: 'error', summary: 'Success', detail: error.request});
                  } else {
                    // Something wrong in setting up the request
                    console.log("Error", error.message);
                    toast.current.show({severity: 'error', summary: 'Success', detail: error.message});
                  }
                  toast.current.show({severity: 'error', summary: 'Success', detail: error.config});    
            }
        }
        createEventCardAPI();
        
        } catch (error) {
            console.log(`Fail To Create Event: ${  error}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const UpdateEventCard = async (details) => {
        try { 
            const data = {
                Id: details.id,
                Event_name: details.Event_name,
                Image_url: details.Image_url,
                Account_name: details.Account_name,
                Cost: details.Cost,
                Down_pay: details.Down_pay,
                Dept: details.Dept,
                Cash_flow: details.Cash_flow,
                Trading_range: details.Trading_range,
                Event_description: details.Event_description,
                Event_type: details.Event_type,                    
                Action: details.Action,
                Game_mode_id: details.Game_mode_id,
            };

            // console.log(data);              
            const updateEventCardAPI = async () => {
                try {
                    ApiService.UpdateEventCard(data.Id, data)
                    .then(response => {
                        if(response.status === 200){
                            setEventCardList(prevState => {
                                const newState = prevState.map(obj => {
                                  // 👇️ if id equals 2, update property
                                  if (obj.id === details.id) {
                                    return {...obj, 
                                        Event_name: details.Event_name, 
                                        Account_name: details.Account_name,
                                        Image_url: details.Image_url,
                                        Cost: details.Cost,
                                        Down_pay: details.Down_pay,
                                        Dept: details.Dept,
                                        Cash_flow: details.Cash_flow,
                                        Trading_range: details.Trading_range,
                                        Event_description: details.Event_description,
                                        Event_type: details.Event_type,                           
                                        Action: details.Action,
                                        Game_mode_id: details.Game_mode_id,
                                    };
                                  }
                                  // 👇️ otherwise return the object as is
                                  return obj;
                                });
                                return newState;
                            });
                            toast.current.show({severity: 'info', summary: 'Success', detail: 'Update Success', life: 4000});
                        }
                        if(response.status === 400){
                            toast.current.show({severity: 'error', summary: 'Error', detail: 'Update Failed', life: 4000});
                        }
                    }).catch((err) => {
                        console.error(err);
                        toast.current.show({severity: 'error', summary: 'Error', detail: "Update Fail", life: 4000});
                    })                   
                } catch (error) {
                    if (error.response) {
                        // get response with a status code not in range 2xx
                        console.log(error.response.data.data);
                        console.log(error.response.data.status);
                        console.log(error.response.data.headers);
                        toast.current.show({severity: 'error', summary: 'Error', detail: error.response, life: 4000});
                      } else if (error.request) {
                        // no response
                        console.log(error.request);
                        toast.current.show({severity: 'error', summary: 'Error', detail: error.request, life: 4000});
                      } else {
                        // Something wrong in setting up the request
                        console.log("Error", error.message);
                        toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 4000});
                      }
                      toast.current.show({severity: 'error', summary: 'Error', detail: error.config, life: 4000});    
                    }
                }
            updateEventCardAPI();
            
        } catch (error) {
            console.log(`Fail To Create Event: ${  error}`);
        }   
    }

    const DeleteEventCard = async (id) => {
        try {
            console.log(id);
            const DeleteEventCardAPI = async () => {
                console.log(id);
                try {
                    ApiService.InAcctiveEventCard(id)
                    .then(response => {
                        console.log(response.data);
                        if(response.status === 200){
                            toast.current.show({severity: 'info', summary: 'Success', detail: 'Delete Success', life: 4000});
                            setEventCardList(eventCardList.filter(card => card.id !== id));
                        }
                        if(response.status === 400){
                            toast.current.show({severity: 'error', summary: 'Error', detail: 'Delete Failed', life: 4000});
                        }
                    }).catch((err) => {
                        console.error(err);
                        toast.current.show({severity: 'error', summary: 'Error', detail: "Delete Fail", life: 4000});
                    })                   
                } catch (error) {
                    if (error.response) {
                        // get response with a status code not in range 2xx
                        console.log(error.response.data.data);
                        console.log(error.response.data.status);
                        console.log(error.response.data.headers);
                        toast.current.show({severity: 'error', summary: 'Error', detail: error.response, life: 4000});
                      } else if (error.request) {
                        // no response
                        console.log(error.request);
                        toast.current.show({severity: 'error', summary: 'Error', detail: error.request, life: 4000});
                      } else {
                        // Something wrong in setting up the request
                        console.log("Error", error.message);
                        toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 4000});
                      }
                      toast.current.show({severity: 'error', summary: 'Error', detail: error.config, life: 4000});    
                }
            } 
            await DeleteEventCardAPI();

        } catch (error) {
            console.log(`Fail To Create Event: ${  error}`);
        }   
    }

    useEffect(() => {
        getAllEventCard(); 
        GetAllGameAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <div>
        <Toast ref={toast}/>
        <Suspense fallback ={<div> Loading </div>}>
            <EventCardList 
                    eventCardList = {eventCardList}
                    createEventCard = {CreateEventCard}
                    updateEventCard = {UpdateEventCard}
                    deleteEventCard = {DeleteEventCard}
                    gameAccountList = {gameAccountList}
                    />  
        </Suspense>
            
        </div>
    )
}