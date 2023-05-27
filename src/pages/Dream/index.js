
import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import { Toast } from 'primereact/toast';

import ApiService from '../../api/ApiService'
import DreamList from './DreamList';

// const {EventCardList} = React.lazy(() => import('./EventCardList'));

export default function ViewDream() {


    const [dreamList, setDreamList] = useState([]);
    const toast = useRef(null);
    

    const getAllDream = useCallback( () => {
        try {
            ApiService.GetDreamByModId(1)
                .then(response => {
                    setDreamList(response.data);                    
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

   

    const UpdateDream = async (details) => {
        try { 
            const data = {
                Id: details.id,
                Name: details.Name,
                Cost: details.Cost,
                Status : details.Status,
                Game_mod_id : details.Game_mod_id
            };
            const updateEventCardAPI = async () => {
                try {
                    ApiService.UpdateDream(data.Id, data)
                    .then(response => {
                        console.log(response.data);
                        console.log(response.status);
                        if(response.status === 200){
                            toast.current.show({severity: 'info', summary: 'Success', detail: 'Update Dream Success'});
                            setDreamList(prevState => {
                                const newState = prevState.map(obj => {
                                  // 👇️ if id equals 2, update property
                                  if (obj.id === details.id) {
                                    return {...obj, 
                                        Id: details.id,
                                        Name: details.Name,
                                        Cost: details.Cost,
                                        Status : details.Status
                                    };
                                  }
                                  // 👇️ otherwise return the object as is
                                  return obj;
                                });
                                return newState;
                            });
                        }
                        if(response.status === 400){
                            toast.current.show({severity: 'error', summary: 'Error', detail: 'Update Dream Failed'});
                        }
                    })                   
                } catch (error) {
                    if (error.response) {
                        // get response with a status code not in range 2xx
                        console.log(error.response.data.data);
                        console.log(error.response.data.status);
                        console.log(error.response.data.headers);
                        toast.current.show({severity: 'error', summary: 'Error', detail: error.response});
                      } else if (error.request) {
                        // no response
                        console.log(error.request);
                        toast.current.show({severity: 'error', summary: 'Error', detail: error.request});
                      } else {
                        // Something wrong in setting up the request
                        console.log("Error", error.message);
                        toast.current.show({severity: 'error', summary: 'Error', detail: error.message});
                      }
                      toast.current.show({severity: 'error', summary: 'Error', detail: error.config});    
                    }
                }
            updateEventCardAPI();

        } catch (error) {
            console.log(`Fail To Create Event: ${  error}`);
        }   
    }

    useEffect(() => {
        getAllDream(); 
    }, [getAllDream]);
    
    return (
        <div>
        <Toast ref={toast}/>
        <Suspense fallback ={<div> Loading </div>}>
            <DreamList 
                    dreamList = {dreamList}
                    updateDream = {UpdateDream}
                    />  
        </Suspense>
            
        </div>
    )
}