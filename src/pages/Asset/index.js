
import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import { Toast } from 'primereact/toast';

import ApiService from '../../api/ApiService'
import AssetList from './AseetList';

// const {EventCardList} = React.lazy(() => import('./EventCardList'));

export default function ViewAsset() {


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



    // useEffect(() => {
    //     getAllDream(); 
    // }, [getAllDream]);
    
    return (
        <div>
        {/* {console.log(dreamList)} */}
        <Toast ref={toast}/>
        <Suspense fallback ={<div> Loading </div>}>
            <AssetList 
                    // gameAccountList = {gameAccount}
                    />  
        </Suspense>
            
        </div>
    )
}