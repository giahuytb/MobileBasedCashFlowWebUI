/* eslint-disable jsx-a11y/label-has-associated-control */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import EventCardCreate from './EventCardCreate';
import EventUpdate from './EevntCardUpdate';

EventCardList.propTypes = {
    eventCardList: PropTypes.array,
    createEventCard : PropTypes.func,
    updateEvent: PropTypes.func,
}

export default function EventCardList({
    eventCardList,
    createEventCard,
    updateEvent,
}){
    const [searchText, setSearchText] = useState("");
    const [eventcard, setEventCard] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const convertType = (typeId) =>{
        switch (typeId) {
            case 1:
                return "Big Deal";
            case 2:
                return "Small Deal";
            case 3:
                return "DooDad";
            case 4:
                return "Market";
            case 5:
                return "Opotunity";
            default:
                return "Other";
        }
    };

    const getSeverity = (status) => {
        switch (status) {
            case 1:
                return {background : 'blue',};
            case 2:
                return {background : 'green',};
            case 3:
                return {background : 'red',};
            case 4:
                return {background : 'orange',};
            case 5:
                return {background : 'primary',};
            default:
                return {background : 'black',};
        }
    };

    useEffect(() => {
        setEventCard(eventCardList);
        setLoading(false)
    }, [eventCardList]);


    const imageCustom = (rowData) => (
            <img style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                src={rowData.Image_url}
                alt={rowData.Image_url}
                className="event-image" />)

    const customButton = (rowData) => (
            <div style={{ display: 'flex' }}>
                <EventUpdate
                    data = {rowData}
                    updateEvent = {updateEvent}
                />
            </div>
        )      

    const onSearchTextChange = (e) => {
        const {value} = e.target;
        setSearchText(value);
    }
    
    const statusBodyTemplate = (rowData) => <Tag value={convertType(rowData.Event_type_id)} style ={getSeverity(rowData.Event_type_id)} />;
    
    const search = () => (
            <div className="p-d-flex p-jc-between">
                <span className="p-input-icon-left">
                <form >              
                    <InputText value={searchText} placeholder="Keyword" onChange={onSearchTextChange}/>
                    <Button label="Search" />
                </form>
                </span>
            </div>
        )

    return (
        <div>
             <EventCardCreate eventCard = {createEventCard}/> 
            <div id="wrapper" style={{marginLeft: 100, marginRight: 100}}>
                <div className="container-fluid">
                    
                    <div className="card shadow mb-4">
                        <DataTable value={eventcard} loading={loading}
                            globalFilterFields={['status']} 
                            stripedRows
                            header={search} 
                            emptyMessage="No customers found."
                            paginator rows={6}
                            >
                            <Column field="Event_name" header="Event Name"  />
                            <Column header="Image" body={imageCustom} />
                            <Column field="Cost" header="Cost" />
                            <Column field="Down_pay" header="Down Pay" />
                            <Column field="Dept" header="Dept" />
                            <Column field="Event_type_id" 
                                    header="Type" 
                                    showFilterMenu={false} 
                                    body={statusBodyTemplate}  
                                    />                  
                            <Column body={customButton}/>
                        </DataTable>

                    </div>
                </div>
            </div>
        </div>
    )
}
