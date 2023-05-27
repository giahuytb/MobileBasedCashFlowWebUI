/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react'

import { Helmet } from 'react-helmet-async';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Typography, Container, Stack} from '@mui/material';
import AssetUpdate from './AsserUpdate';



AssetList.propTypes = {
    assetList: PropTypes.array,
    updateAsset: PropTypes.func,
}

export default function AssetList({
    assetList,
    updateAsset
}){
    const [asset, setAsset] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);

    useEffect(() => {     
    setAsset(assetList);
        if(asset.length > 0){
            setLoading(false);
        }        
    }, [assetList, asset]);
      

     const customButton = (rowData) => (
             <div style={{ display: 'flex' }}>
                 <AssetUpdate
                        data = {rowData}
                        updateAsset = {updateAsset}
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
                <title>Asset | CashFlow </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Asset
                    </Typography>
                </Stack>               
            </Container>

 
            <div id="wrapper" style={{marginLeft: 50, marginRight: 50}}>
                 <div className="datatable-style-demo">
                     <div className="card">
                         <DataTable paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                             rows={4} rowsPerPageOptions={[4, 10, 20]}
                             paginator stripedRows
                             paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                             value={asset} loading= {loading} className='border-solid' style={{background: 'white'}}                                                     
                             header={header} ref={dt}
                             globalFilter={globalFilter}
                             emptyMessage="No Record found."
                             >
                             <Column field="AssetName" header="Asset Name" sortable style={{ minWidth: '14rem' }} />
                             <Column field="AssetPrice" header="Asset Price" style={{ minWidth: '14rem' }}/>
                             <Column field="Description" header="Description"/>
                             <Column body={customButton}/>
                         </DataTable>
                     </div>
                 </div>
             </div> 
         </div>
     )
 }
