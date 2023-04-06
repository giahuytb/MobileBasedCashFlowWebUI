
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

JobCardList.propTypes = {
    jobCardList: PropTypes.array,
}

export default function JobCardList({
    jobCardList,
}){

    const [searchText, setSearchText] = useState("");
    const [jobCard, setJobCard] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setJobCard(jobCardList);
        console.log(jobCardList);
        // console.log(jobCard);
        setLoading(false)
    }, [jobCardList]);


    const imageCustom = (rowData) => (
            <img style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                src={rowData.Image_url}
                alt={rowData.Image_url}
                className="event-image" />)

    const customButton = (rowData) => (
            <div style={{ display: 'flex' }}>
                <Link style={{ paddingRight: '15px' }}
                    to={{
                        pathname: "EventDetail",
                        state: rowData
                    }}>
                    <i className="fas fa-eye" />
                </Link>
            </div>
        )


    const onSearchTextChange = (e) => {
        const {value} = e.target;
        setSearchText(value);
    }

    const search = () => (
            <div className="p-d-flex p-jc-between">
                <span className="p-input-icon-left">
                    <InputText value={searchText} onChange={onSearchTextChange} placeholder="Keyword Search" />
                    <Button style={{ height: '42px' }}>
                        <i className="pi pi-search" />
                    </Button>
                </span>
            </div>
        )


    const paginatorLeft = <Button type="button" className="p-button-text" />;
    const paginatorRight = <Button type="button" className="p-button-text" />;

    return (
        <div>
            <div id="wrapper"  >
                <div className="container-fluid">
                    <div className="card shadow mb-4">

                        <DataTable value={jobCard}paginator responsiveLayout="scroll" 
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                            rows={5} rowsPerPageOptions={[5, 10, 20]}
                            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                            loading = {loading}
                            header={search}>
                            <Column field="Job_card_name" header="Name"  />
                            <Column field="Children_cost" header="Children Cost" />               
                            <Column body={customButton}/>
                        </DataTable>

                    </div>
                </div>
            </div>
        </div>
    )
}
