
import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import { Toast } from 'primereact/toast';

import ApiService from '../../api/ApiService'
import AssetList from './AseetList';

// const {EventCardList} = React.lazy(() => import('./EventCardList'));

export default function ViewAsset() {


    const [assetList, setAssetList] = useState([]);
    const toast = useRef(null);
    

    const getAllAsset = useCallback( () => {
        try {
            ApiService.GetAllAsset()
                .then(response => {
                    setAssetList(response.data);                    
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

    const UpdateAsset = async (details) => {
        try { 
            const data = {
                AssetName: details.AssetName,
                ImageUrl: details.ImageUrl,
                AssetPrice: details.AssetPrice,
                Description: details.Description, 
                IsInShop: details.IsInShop,
                AssetTypeId: details.AssetTypeId,
            };

            console.log(data);
            // console.log(details);              
            const updateAssetAPI = async () => {
                try {
                    ApiService.UpdateAssetById(details.AssetId, data)
                    .then(response => {
                        if(response.status === 200){
                            setAssetList(prevState => {
                                const newState = prevState.map(obj => {
                                  // 👇️ if id equals 2, update property
                                  if (obj.AssetId === details.AssetId) {
                                    return {...obj, 
                                        AssetId: details.AssetId,
                                        AssetName: details.AssetName,
                                        ImageUrl: details.ImageUrl,
                                        AssetPrice: details.AssetPrice,
                                        Description: details.Description, 
                                        IsInShop: details.IsInShop,
                                        AssetTypeId: details.AssetTypeId,
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
                            console.log(response.error)
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
            updateAssetAPI();
            
        } catch (error) {
            console.log(`Fail To Update Asset: ${  error}`);
            toast.current.show({severity: 'error', summary: 'Error', detail: "Update Fail", life: 4000});
        }   
    }

    useEffect(() => {
        getAllAsset(); 
    }, [getAllAsset]);
    
    return (
        <div>
            <Toast ref={toast}/>
            <Suspense fallback ={<div> Loading </div>}>
                <AssetList 
                        assetList={assetList}
                        updateAsset = {UpdateAsset} 
                        />  
            </Suspense>        
        </div>
    )
}