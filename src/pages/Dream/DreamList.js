/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'

import { Helmet } from 'react-helmet-async';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Typography, Container, Stack} from '@mui/material';



DreamList.propTypes = {
     dreamList: PropTypes.array,
}

export default function DreamList({
    dreamList,
}){
    const [searchText, setSearchText] = useState("");
    const [dream, setDream] = useState([]);
    const [loading, setLoading] = useState(true);

    const convertType = (typeId) =>{
        switch (typeId) {
            case true:
                return "Active";
            case false:
                return "Inactive";
            default:
                return "Other";
        }
    };

    const getSeverity = (status) => {
        switch (status) {
            case true:
                return {background : '#2196f3',};
            case false:
                return {background : '#FF0000',};
            default:
                return {background : 'black',};
        }
    };

    

     useEffect(() => {     
        setDream(dreamList);
         if(dream.length > 0){
             setLoading(false);
         }        
     }, [dreamList, dream]);
   
     const handleOnDelete = (e, rowData) => {
         e.preventDefault();
         console.log(rowData);
        //  deleteEventCard(rowData.id);
     };           

     const customButton = (rowData) => (
             <div style={{ display: 'flex' }}>
                 {/* <EventUpdate
                     data = {rowData}
                     updateEventCard = {updateEventCard}
                     gameAccountList = {gameAccountList}
                 /> */}
                 <a 
                     href="#!" 
                     onClick={(e) => handleOnDelete(e, rowData)} >
                     <i className="fa fa-trash" aria-hidden="true" />
                 </a>
                 
             </div>
         )   

     const onSearchTextChange = (e) => {
         const {value} = e.target;
         setSearchText(value);
    }
    
     const search = () => (
             <div className="p-d-flex p-jc-between">
                 <span className="p-input-icon-left">
                 <form >              
                     <InputText value={searchText} placeholder="name" onChange={onSearchTextChange}/>
                     <Button label="Search" />
                 </form>
                 </span>
             </div>
    )

    const statusBodyTemplate = (rowData) => <Tag value={convertType(rowData.Status)} style ={getSeverity(rowData.Status)} />;

     return (
         <div>
            {console.log(dream)}
            <Helmet>
                <title>Dream | CashFlow </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Dream
                    </Typography>
                </Stack>               
            </Container>

 
            <div id="wrapper" style={{marginLeft: 50, marginRight: 50}}>
                 <div className="datatable-style-demo">
                     <div className="card">
                         <DataTable value={dream} loading= {loading} className='border-solid' style={{background: 'white'}}
                             stripedRows
                             header={search}
                             emptyMessage="No Record found."
                             paginator rows={4}
                             totalRecords={dream.length}
                             >
                             <Column field="Name" header="Event Name" sortable />
                             <Column field="Cost" header="Cost"/>
                             <Column field="Status" 
                                     header="Status" 
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
