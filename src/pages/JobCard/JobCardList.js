
import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';




import JobCardUpdate from './JobCardUpdate';

JobCardList.propTypes = {
    jobCardList: PropTypes.array,
    updateJobCard: PropTypes.func,
}

export default function JobCardList({
    jobCardList,
    updateJobCard,
}){
    const [jobCard, setJobCard] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const dt = useRef(null);

    useEffect(() => {
        setJobCard(jobCardList);
        if(jobCard.length > 0){
            setLoading(false);
        } 
    }, [jobCardList, jobCard]);

    const imageCustom = (rowData) => (
        <img style={{ width: '30px', height: '1%' }}
            src={`/assets/images/jobcards/${rowData.Image_url}.png`}
            alt={rowData.Image_url}
            loading='lazy'
            className="event-image" />
    )

    const customButton = (rowData) => (
        <div style={{ display: 'flex' }}>
            <JobCardUpdate 
                    data = {rowData}
                    updateJobcard ={updateJobCard}/>
        </div>
    )


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


    const paginatorLeft = <Button type="button" className="p-button-text" />;
    const paginatorRight = <Button type="button" className="p-button-text" />;

    return (
        <div>
            {/* {console.log(jobCard)} */}
            <Helmet>
                <title>Job Card | CashFlow </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Job Card
                    </Typography>
                </Stack>               
            </Container>

            <div id="wrapper"  >
                <div className="container-fluid">
                    <div className="card shadow mb-4">
                        <DataTable value={jobCard} paginator responsiveLayout="scroll" 
                            showGridlines stripedRows 
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                            rows={4} 
                            rowsPerPageOptions={[4, 10, 20]}
                            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                            loading = {loading}
                            header={header} ref={dt}
                            globalFilter={globalFilter}>
                            <Column field="Job_card_name" header="Job Name"  />
                            <Column header="Image" body={imageCustom} />
                            <Column field="Children_cost" header="Children Cost" />             
                            <Column body={customButton}/>
                        </DataTable>

                    </div>
                </div>
            </div>
        </div>
    )
}
