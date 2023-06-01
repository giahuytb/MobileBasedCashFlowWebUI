
import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react'
import { Toast } from 'primereact/toast';

import ApiService from '../../api/ApiService'
import DashboardAppPage from './DashboardAppPage';


// const {EventCardList} = React.lazy(() => import('./EventCardList'));

export default function Dashboard() {


    const [totalMatchToday , setTotalMatchToday] = useState(0);
    const [totalMatchThisWeek, setTotalMatchThisWeek] = useState(0);
    const [totalUserPlayGameToDay, SetTotalUserPlayGameToDay] = useState(0);
    const [users, setUsers] = useState();
    const toast = useRef(null);   

    const TotalMatchToDay = useCallback(() => {
        try {
            ApiService.TotalMatchToDay()
                .then(response => {
                  setTotalMatchToday(response.data);                    
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

      const TotalMatchThisWeek = useCallback(() => {
        try {
            ApiService.TotalMatchThisWeek()
                .then(response => {
                  setTotalMatchThisWeek(response.data);                    
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

      const TotalUserPlayGameToday = useCallback(() => {
        try {
            ApiService.TotalUserPlayGameToDay()
                .then(response => {
                  SetTotalUserPlayGameToDay(response.data);                    
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

      const getUserList = useCallback( () => {
        try {
            ApiService.GetAllUser()
                .then(response => {
                    setUsers(response.data);                    
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

    useEffect(() => {
        TotalMatchToDay();
        TotalMatchThisWeek();
        TotalUserPlayGameToday();
        getUserList();

    }, [TotalMatchThisWeek, TotalMatchToDay, TotalUserPlayGameToday, getUserList]);
    
    return (
        <div>
        <Toast ref={toast}/>
        {/* {console.log(users)}
        {console.log(totalMatchToday)}
        {console.log(totalMatchThisWeek)}
        {console.log(totalUserPlayGameToDay)} */}
        <Suspense fallback ={<div> Loading </div>}>
            <DashboardAppPage
                    userList = {users}
                    totalMatchToday = {totalMatchToday}
                    totalMatchThisWeek = {totalMatchThisWeek}
                    totalUserPlayGameToDay = {totalUserPlayGameToDay}
                    />  
        </Suspense>
            
        </div>
    )
}