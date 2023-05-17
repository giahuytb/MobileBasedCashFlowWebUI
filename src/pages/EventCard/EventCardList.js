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
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [eventTypeFilter, setEventTypeFilter] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);

    const eventType = [
        "Big Deal", "Small Deal", "DooDad", "Market", "Opotunity"
    ];

    const convertTypeToInt= (type) =>{
        switch (type) {
            case "Big Deal":
                return `${1} `;
            case "Small Deal":
                return 2;
            case "DooDad":
                return 3;
            case "Market":
                return 4;
            case "Opotunity":
                return 5;
            default:
                return 6;
        }
    };
    
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
                return {background : '#2196f3'};
            case 2:
                return {background : '#00FF00', color : 'black'};
            case 3:
                return {background : '#FF0000',};
            case 4:
                return {background : '#FFA500',};
            case 5:
                return {background : '#7B68EE',};
            default:
                return {background : 'black',};
        }
    };

    const getSeverity2 = (status) => {
        switch (status) {
            case "Big Deal":
                return {background : '#2196f3'};
            case "Small Deal":
                return {background : '#00FF00', color : 'black'};
            case "DooDad":
                return {background : '#FF0000',};
            case "Market":
                return {background : '#FFA500',};
            case "Opotunity":
                return {background : '#7B68EE',};
            default:
                return {background : 'black',};
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
   
    const handleOnDelete = (e, rowData) => {
        e.preventDefault();
        console.log(rowData);
        deleteEventCard(rowData.id);
    };
    
    const searchByTypeId = (e, rowData) => {
        e.preventDefault();
    }

    const customButton = (rowData) => (
            <div style={{ display: 'flex' }}>
                <EventUpdate
                    data = {rowData}
                    updateEventCard = {updateEventCard}
                    gameAccountList = {gameAccountList}
                />
                <a 
                    href="#!" 
                    onClick={(e) => handleOnDelete(e, rowData)} >
                    <i className="fa fa-trash" aria-hidden="true" />
                </a>
                
            </div>
        ) 

    const statusBodyTemplate = (rowData) => <Tag value={convertType(rowData.Event_type_id)} 
                                                 style ={getSeverity(rowData.Event_type_id)}/>;
    
    const statusItemTemplate = (option) => <Tag value={option} 
                                                style={getSeverity2(option)} />;

    const reset = () => {
        setSelectedStatus(null);
        setGlobalFilter('');
        dt.current.reset();
    }

    const header = (option) => (
        <div className="table-header">
            <Button type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
                <Dropdown value={option.value} style = {{float: "right", minWidth: '12rem'}} options={eventType} 
                        onChange={(e) => option.filterApplyCallback(e.value)} 
                        itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" 
                        showClear  />
            </span>
        </div>
    );
    
    const statusRowFilterTemplate = (options) => (
            // eslint-disable-next-line no-sequences
            console.log(options),
            <Dropdown value={options.value} options={eventType} 
                        onChange={(e) => options.filterApplyCallback(e.value)} 
                        itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" 
                        showClear style={{ minWidth: '12rem' }} />
     );


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
                    <EventCardCreate eventCard = {createEventCard}/> 
                </Stack>               
            </Container>

 
            <div id="wrapper" style={{marginLeft: 50, marginRight: 50}}>
                 <div className="datatable-style-demo">
                     <div className="card">
                         <DataTable value={eventcard} loading= {loading} className='border-solid' style={{background: 'white'}}
                             stripedRows ref={dt}
                             header={header}
                             globalFilter={globalFilter}
                             emptyMessage="No Record found."
                             paginator rows={4}
                             >
                             <Column field="Event_name" header="Event Name" sortable />
                             <Column header="Image" body={imageCustom} />
                             <Column field="Cost" header="Cost"  />
                             <Column field="Down_pay" header="Down Pay" />
                             <Column field="Dept" header="Dept" />
                             <Column field="Event_type_id" 
                                     header="Event Type" 
                                    //  showFilterMenu={false} 
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
