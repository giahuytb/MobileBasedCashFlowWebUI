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



GameAccountList.propTypes = {
     gameAccountList: PropTypes.array,
}

export default function GameAccountList({
    gameAccountList,
}){
    const [searchText, setSearchText] = useState("");
    const [gameAccount, setGameAccount] = useState([]);
    const [loading, setLoading] = useState(true);

    const converStatus = (typeId) =>{
        switch (typeId) {
            case true:
                return "Active";
            case false:
                return "Inactive";
            default:
                return "Other";
        }
    };

    const getStatusBackground = (status) => {
        switch (status) {
            case true:
                return {background : '#2196f3',};
            case false:
                return {background : '#FF0000',};
            default:
                return {background : 'black',};
        }
    };

    const convertType = (typeId) =>{
        switch (typeId) {
            case 0:
                return "Income";
            case 1:
                return "Expense";
            case 2:
                return "Asset";
            case 3:
                return "Dept";
            default:
                return "Dept";
        }
    };

    const getTypeBackground = (status) => {
        switch (status) {
            case 0:
                return {background : '#2196f3'};
            case 1:
                return {background : '#FF0000'};
            case 2:
                return {background : '#00FF00',color : 'black'};
            case 3:
                return {background : '#7B68EE',};
            default:
                return {background : 'black',};
        }
    };

    

     useEffect(() => {     
        setGameAccount(gameAccountList);
         if(gameAccount.length > 0){
             setLoading(false);
         }        
     }, [gameAccountList, gameAccount]);
   
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

    const statusBodyTemplate = (rowData) => <Tag value={converStatus(rowData.Status)} 
                                                style ={getStatusBackground(rowData.Status)} />;

    const typeBodyTemplate = (rowData) => <Tag value={convertType(rowData.Game_account_type_id)} 
                                                style ={getTypeBackground(rowData.Game_account_type_id)} />;

     return (
         <div>
            <Helmet>
                <title>Game Account | CashFlow </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Game Account
                    </Typography>
                </Stack>               
            </Container>

 
            <div id="wrapper" style={{marginLeft: 50, marginRight: 50}}>
                 <div className="datatable-style-demo">
                     <div className="card">
                         <DataTable value={gameAccount} loading= {loading} className='border-solid' style={{background: 'white'}}
                             stripedRows
                             header={search}
                             emptyMessage="No Record found."
                             paginator rows={4}
                             >
                             <Column field="Game_account_name" header="Account Name" sortable />
                             <Column field="Game_account_type_id" 
                                     header="Type"
                                     body={typeBodyTemplate} />
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
