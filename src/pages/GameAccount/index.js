
import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import { Toast } from 'primereact/toast';

import ApiService from '../../api/ApiService'
import GameAccountList from './GameAccountList';

// const {EventCardList} = React.lazy(() => import('./EventCardList'));

export default function ViewGameAccount() {


    const [gameAccountList, setGameAccountList] = useState([]);
    const toast = useRef(null);
    

    const getAllGameAccount = useCallback( () => {
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
    }, []);

    const CreateGameAccount = useCallback( async (details) => {
        try {
            console.log(details);
            const data = {
                Game_account_name: details.Game_account_name,
                Game_account_type: details.Game_account_type,
            };
            
        const createGameAccountAPI = async () => {
            try {
                ApiService.CreateGameAccount(data)
                .then(response => {
                    if(response.status === 200){
                        toast.current.show({severity: 'info', summary: 'Success', detail: 'Create Success', life: 4000});
                        setGameAccountList(oldEventList => [...oldEventList, data]);
                    }
                    else if(response.status === 400){
                        toast.current.show({severity: 'error', summary: 'Error', detail: response.data.error, life: 4000});
                    }
                }).catch((err) => {
                    console.error(err.data.message);
                    toast.current.show({severity: 'error', summary: 'Error', detail: "Create Fail", life: 4000});
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
                  toast.current.show({severity: 'error', summary: 'Error', detail: "Create Failed "});    
            }
        }
        createGameAccountAPI();
        
        } catch (error) {
            toast.current.show({severity: 'error', summary: 'Error', detail: "Create Fail", life: 4000});
            console.log(`Fail To Create Event: ${  error}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const UpdateGameAccount = async (details) => {
        try { 
            const data = {
                Id: details.id,
                Game_account_name: details.Game_account_name,
                Game_account_type: details.Game_account_type,
            };

            // console.log(data);              
            const updateGameAccountAPI = async () => {
                try {
                    ApiService.UpdateGameAccount(data.Id, data)
                    .then(response => {
                        if(response.status === 200){
                            setGameAccountList(prevState => {
                                const newState = prevState.map(obj => {
                                  // 👇️ if id equals 2, update property
                                  if (obj.id === details.id) {
                                    return {...obj, 
                                        Game_account_name: details.Game_account_name,
                                        Game_account_type: details.Game_account_type,
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
                updateGameAccountAPI();
            
        } catch (error) {
            console.log(`Fail To Create Game Account: ${  error}`);
        }   
    }

    const DeleteGameAccount = async (id) => {
        try {
            console.log(id);
            const DeleteGameAccountAPI = async () => {
                console.log(id);
                try {
                    ApiService.InAcctiveGameAccount(id)
                    .then(response => {
                        console.log(response.data);
                        if(response.status === 200){
                            toast.current.show({severity: 'info', summary: 'Success', detail: 'Delete Success', life: 4000});
                            setGameAccountList(gameAccountList.filter(ga => ga.id !== id));
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
            await DeleteGameAccountAPI();

        } catch (error) {
            console.log(`Fail To Delete Game Account: ${  error}`);
        }   
    }

    useEffect(() => {
        getAllGameAccount(); 
    }, [getAllGameAccount]);
    
    return (
        <div>
        <Toast ref={toast}/>
        <Suspense fallback ={<div> Loading </div>}>
            <GameAccountList 
                    gameAccountList = {gameAccountList}
                    createGameAccount = {CreateGameAccount}
                    updateGameAccount = {UpdateGameAccount}
                    deleteGameAccount = {DeleteGameAccount}
                    />  
        </Suspense>
            
        </div>
    )
}