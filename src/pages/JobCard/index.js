
import React, { useState, useEffect, useRef } from 'react'
import { Toast } from 'primereact/toast';
import ApiService from '../../api/ApiService'
import JobCardList from './JobCardList';

export default function ViewJobCard() {

    const [jobCardList, setJobCardList] = useState([]);
    const toast = useRef(null);

    useEffect(() => {
        getAllJobCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllJobCard = async () => {
        try {
            await ApiService.GetAllJobCard()
                .then(response => {
                    setJobCardList(response.data);                     
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

    const UpdateJobCard = async (details) => {
        try { 
            console.log(details); 
            console.log(details.id);           
            const updateJobCardAPI = async () => {
                try {
                    ApiService.UpdateJobCard(details.id, details)
                    .then(response => {
                        if(response.status === 200){
                            setJobCardList(prevState => {
                                const newState = prevState.map(obj => {
                                  // 👇️ if id equals 2, update property
                                  if (obj.id === details.id) {
                                    return {...obj, 
                                        id: details.id, 
                                        Job_card_name: details.Job_card_name, 
                                        Children_cost: details.Children_cost,
                                        Status: details.Status, 
                                        Image_url: details.Image_url,  
                                        Game_accounts: [
                                            {
                                                Game_account_name: details.Game_accounts[0].Game_account_name,
                                                Game_account_type: details.Game_accounts[0].Game_account_type,
                                                Game_account_value: details.Game_accounts[0].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[1].Game_account_name,
                                                Game_account_type: details.Game_accounts[1].Game_account_type,
                                                Game_account_value: details.Game_accounts[1].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[2].Game_account_name,
                                                Game_account_type: details.Game_accounts[2].Game_account_type,
                                                Game_account_value: details.Game_accounts[2].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[3].Game_account_name,
                                                Game_account_type: details.Game_accounts[3].Game_account_type,
                                                Game_account_value: details.Game_accounts[3].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[4].Game_account_name,
                                                Game_account_type: details.Game_accounts[4].Game_account_type,
                                                Game_account_value: details.Game_accounts[4].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[5].Game_account_name,
                                                Game_account_type: details.Game_accounts[5].Game_account_type,
                                                Game_account_value: details.Game_accounts[5].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[6].Game_account_name,
                                                Game_account_type: details.Game_accounts[6].Game_account_type,
                                                Game_account_value: details.Game_accounts[6].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[7].Game_account_name,
                                                Game_account_type: details.Game_accounts[7].Game_account_type,
                                                Game_account_value: details.Game_accounts[7].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[8].Game_account_name,
                                                Game_account_type: details.Game_accounts[8].Game_account_type,
                                                Game_account_value: details.Game_accounts[8].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[9].Game_account_name,
                                                Game_account_type: details.Game_accounts[9].Game_account_type,
                                                Game_account_value: details.Game_accounts[9].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[10].Game_account_name,
                                                Game_account_type: details.Game_accounts[10].Game_account_type,
                                                Game_account_value: details.Game_accounts[10].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[11].Game_account_name,
                                                Game_account_type: details.Game_accounts[11].Game_account_type,
                                                Game_account_value: details.Game_accounts[11].Game_account_value,
                                                Amount: 1
                                            },
                                            {
                                                Game_account_name: details.Game_accounts[12].Game_account_name,
                                                Game_account_type: details.Game_accounts[12].Game_account_type,
                                                Game_account_value: details.Game_accounts[12].Game_account_value,
                                                Amount: 1
                                            },                       
                                        ]
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
                updateJobCardAPI();
            
        } catch (error) {
            console.log(`Fail To Create Game Account: ${  error}`);
        }   
    }

    return (
        <div>
            {/* {console.log(jobCardList)} */}
            <Toast ref={toast}/>       
            <JobCardList
                jobCardList={jobCardList}
                updateJobCard = {UpdateJobCard}
            />
        </div>
    )
}