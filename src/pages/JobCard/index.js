
import React, { useState, useEffect } from 'react'
import ApiService from '../../api/ApiService'
import JobCardList from './JobCardList';

export default function ViewJobCard() {


    const [jobCardList, setJobCardList] = useState([]);

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

    return (
        <div>
        {console.log(jobCardList)}
            <JobCardList
                eventCardList={jobCardList}
            />
        </div>
    )
}