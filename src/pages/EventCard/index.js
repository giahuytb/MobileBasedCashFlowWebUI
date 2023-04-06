
import React, { useState, useEffect, Suspense, useRef } from 'react'
import { Toast } from 'primereact/toast';

import ApiService from '../../api/ApiService'
import EventCardList from './EventCardList';


// const {EventCardList} = React.lazy(() => import('./EventCardList'));

export default function ViewEventCard() {


    const [eventCardList, setEventCardList] = useState([]);
    const toast = useRef(null);
    useEffect(() => {
        getAllEventCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllEventCard = async () => {
        try {
            await ApiService.GetAllEventCard()
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
    }

    const CreateEventCard = async (details) => {
        try {
        console.log(details);
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
            Event_type_id: details.Event_type_id,
            Action: details.Action,
        };

        // setEventCardList(...eventCardList, data);
        
        const createEventCardAPI = async () => {
            try {
                ApiService.CreateEventCard(data)
                .then(response => {
                    console.log(response.data);
                })
                toast.current.show({severity: 'error', summary: 'Success', detail: 'Create Success'});

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
    }

    const UpdateEventCard = (details) => {
        try {
            const updateEventCardAPI = async () => {
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
                    Event_type_id: details.Event_type_id,
                    Action: details.Action,
                };
                try {
                    ApiService.UpdateEventCard(data)
                    .then(response => {
                        console.log(response.data);
                    })
                    toast.current.show({severity: 'error', summary: 'Success', detail: 'Create Success'});

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
            updateEventCardAPI();

        } catch (error) {
            console.log(`Fail To Create Event: ${  error}`);
        }   
    }

    return (
        <div>
        <Toast ref={toast}/>
        {console.log(eventCardList)}
        <Suspense fallback ={<div> Loading </div>}>
            <EventCardList 
                    eventCardList = {eventCardList}
                    createEventCard = {CreateEventCard}
                    updateEventCard= {UpdateEventCard}
                    />  
        </Suspense>
            
        </div>
    )
}