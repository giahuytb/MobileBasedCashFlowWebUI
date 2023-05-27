/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef} from 'react'

import { Helmet } from 'react-helmet-async';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Typography, Container, Stack} from '@mui/material';
import DreamUpdate from './DreamUpdate';



DreamList.propTypes = {
     dreamList: PropTypes.array,
     updateDream: PropTypes.func,
}

export default function DreamList({
    dreamList,
    updateDream
}){
    const [dream, setDream] = useState([]);
    const [loading, setLoading] = useState(true);
    const dt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState('');

    useEffect(() => {     
    setDream(dreamList);
        if(dream.length > 0){
            setLoading(false);
        }        
    }, [dreamList, dream]);
      

     const customButton = (rowData) => (
             <div style={{ display: 'flex' }}>
                 <DreamUpdate
                     data = {rowData}
                     updateDream = {updateDream}
                 />
             </div>
         )   

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
                         <DataTable responsiveLayout="scroll" paginator stripedRows
                             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                             rows={4} rowsPerPageOptions={[4, 10, 20]}
                             paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                             value={dream} loading= {loading} className='border-solid' style={{background: 'white'}}
                             header={header} ref={dt}
                             globalFilter={globalFilter}
                             emptyMessage="No Record found."
                             >
                             <Column field="Name" header="Dream name" sortable />
                             <Column field="Cost" header="Dream Cost"/>   
                             <Column body={customButton}/>
                         </DataTable>
                     </div>
                 </div>
             </div> 
         </div>
     )
 }
