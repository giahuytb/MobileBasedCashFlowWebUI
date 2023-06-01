/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react'

import { Helmet } from 'react-helmet-async';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';

import { Typography, Container, Stack} from '@mui/material';
import EventCardCreate from './EventCardCreate';
import EventUpdate from './EventCardUpdate';
import EventCardDelete from './EventCardDelete';

EventCardList.propTypes = {
     eventCardList: PropTypes.array,
     createEventCard : PropTypes.func,
     updateEventCard: PropTypes.func,
     deleteEventCard: PropTypes.func,
     gameAccountList: PropTypes.array,
}

export default function EventCardList({
    eventCardList,
    createEventCard,
    updateEventCard,
    deleteEventCard,
    gameAccountList,
}){
    const [eventcard, setEventCard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);

    const eventType = [
        "Big Deal", "Small Deal", "DooDad", "Market", "Opotunity"
    ];    

    const getBackGroundColor = (option) => {
        switch (option) {
            case "Big Deal":
                return {background : '#2196f3', borderRadius: 10};
            case "Small Deal":
                return {background : '#00FF00', color : 'black', borderRadius: 10};
            case "DooDad":
                return {background : '#FF0000', borderRadius: 10};
            case "Market":
                return {background : '#FFA500', borderRadius: 10};
            case "Opotunity":
                return {background : '#7B68EE', borderRadius: 10};
            default:
                return {background : 'black', borderRadius: 10};
        }
    };

     
    useEffect(() => {     
        setEventCard(eventCardList);
        if(eventcard.length > 0){
           setLoading(false);
        }        
    }, [eventCardList, eventcard]);


    const imageCustom = (rowData) => (
            <img style={{ width: '90px', height: '50px', borderRadius: '50%' }}
                src={rowData.Image_url}
                alt={rowData.Image_url}
                loading='lazy'
                className="event-image" />
    )
        
    const customButton = (rowData) => (
            <div style={{ display: 'flex' }}>
                <EventUpdate
                    data = {rowData}
                    updateEventCard = {updateEventCard}
                    gameAccountList = {gameAccountList}
                />
                <EventCardDelete
                    data = {rowData}
                    deleteEventCard = {deleteEventCard}
                />
                
            </div>
        ) 

    const statusBodyTemplate = (rowData) => <Tag value={rowData.Event_type} 
                                                 style ={getBackGroundColor(rowData.Event_type)}/>;
    
    const statusItemTemplate = (option) => <Tag value={option} 
                                                style={getBackGroundColor(option)} />;
                                            

    const reset = () => {
        setGlobalFilter('');
        dt.current.reset();
    }

    const header = (
        <div className="table-header">
            <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
            </span>
        </div>
    );
    


     const statusRowFilterTemplate = (options) => 
                                <Dropdown value={options.value}
                                    options={eventType} onChange={(e) => options.filterApplyCallback(e.value)} 
                                    itemTemplate={statusItemTemplate} style={{ minWidth: '12rem' }}
                                    placeholder="Select One" className="p-column-filter" showClear                                
                                />

    const paginatorLeft = <Button type="button" className="p-button-text" />;
    const paginatorRight = <Button type="button" className="p-button-text" />;

     return (
         <div>
            <Helmet>
                <title>Event Card | CashFlow </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Event Card
                    </Typography>
                    <EventCardCreate createEventCard = {createEventCard}/> 
                </Stack>               
            </Container>

 
            <div id="wrapper" style={{marginLeft: 50, marginRight: 50}}>
                    <div className="datatable-style-demo">
                        <div className="card">
                            <DataTable showGridlines stripedRows paginator responsiveLayout="scroll"  
                                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                                paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                                rowsPerPageOptions={[4, 10, 20]} rows={4}
                                value={eventcard} 
                                loading= {loading} className='border-solid' style={{background: 'white'}}                                                              
                                header={header} ref={dt}
                                globalFilter={globalFilter}
                                emptyMessage="No Record found."
                                
                            >
                            <Column field="Event_name" header="Event Name" sortable />
                            <Column header="Image" body={imageCustom} />
                            <Column field="Cost" header="Cost"  />
                            <Column field="Down_pay" header="Down Pay" />
                            <Column field="Dept" header="Dept" />   
                            <Column field="Event_type" 
                                    header="Event Type" 
                                    filterMenuStyle={{ width: '14rem' }}
                                    style={{ minWidth: '12rem' }}
                                    body={statusBodyTemplate} 
                                    filter 
                                    filterElement={statusRowFilterTemplate}
                                    />                  
                            <Column body={customButton}/>
                        </DataTable>
                    </div>
                </div>
            </div> 
        </div>
     )
 }
