/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react'

import { Helmet } from 'react-helmet-async';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Typography, Container, Stack} from '@mui/material';
import GameAccountCreate from './GameAccountCreate';
import GameAccountUpdate from './GameAccountUpdate';



GameAccountList.propTypes = {
     gameAccountList: PropTypes.array,
     updateGameAccount : PropTypes.func,
     createGameAccount : PropTypes.func,
}

export default function GameAccountList({
    gameAccountList,
    updateGameAccount,
    createGameAccount,
}){
    const [gameAccount, setGameAccount] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const dt = useRef(null);

    const getTypeBackground = (status) => {
        switch (status) {
            case "Income":
                return {background : '#2196f3'};
            case "Expense":
                return {background : '#FF0000'};
            case "Dept":
                return {background : '#00FF00',color : 'black'};
            case "Asset":
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

    const customButton = (rowData) => (
            <div style={{ display: 'flex' }}>
            <GameAccountUpdate
                data = {rowData}
                updateGameAccount = {updateGameAccount}
                gameAccountList = {gameAccountList}
            />
            </div>
        )    

    const typeBodyTemplate = (rowData) => <Tag value={rowData.Game_account_type} 
                                                style ={getTypeBackground(rowData.Game_account_type)} />;

    const paginatorLeft = <Button type="button" className="p-button-text" />;
    const paginatorRight = <Button type="button" className="p-button-text" />;

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
                    <GameAccountCreate createGameAccount = {createGameAccount}/> 
                </Stack>               
            </Container>

 
            <div id="wrapper" style={{marginLeft: 50, marginRight: 50}}>
                <div className="datatable-style-demo">
                    <div className="card">
                         <DataTable responsiveLayout="scroll" paginator
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                            rows={4} rowsPerPageOptions={[4, 10, 20]}
                            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                            value={gameAccount} loading= {loading} className='border-solid' style={{background: 'white'}}
                            showGridlines stripedRows 
                            header={header} ref={dt}
                            globalFilter={globalFilter}
                            emptyMessage="No Record found."                            
                            >
                            <Column field="Game_account_name" header="Account Name" sortable />
                            <Column field="Game_account_type" 
                                    header="Type"
                                    body={typeBodyTemplate} />
                            <Column body={customButton}/>
                        </DataTable>
                    </div>
                </div>
            </div> 
        </div>
     )
 }
