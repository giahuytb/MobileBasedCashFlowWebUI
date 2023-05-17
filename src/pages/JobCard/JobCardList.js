
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
import { Tag } from 'primereact/tag';

JobCardList.propTypes = {
    jobCardList: PropTypes.array,
}

export default function JobCardList({
    jobCardList,
}){
    const [searchText, setSearchText] = useState("");
    const [jobCard, setJobCard] = useState([]);
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


    useEffect(() => {
        setJobCard(jobCardList);
        if(jobCard.length > 0){
            setLoading(false);
        } 
    }, [jobCardList, jobCard]);

    const imageCustom = (rowData) => (
        <img style={{ width: '40px', height: '1%' }}
            src={`/assets/images/jobcards/${rowData.Image_url}.png`}
            alt={rowData.Image_url}
            loading='lazy'
            className="event-image" />
    )

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

    const statusBodyTemplate = (rowData) => <Tag value={converStatus(rowData.Status)} 
                                                style ={getStatusBackground(rowData.Status)} />;


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
                            rows={4} 
                            rowsPerPageOptions={[5, 10, 20]}
                            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                            loading = {loading}
                            header={search}>
                            <Column field="Job_card_name" header="Job Name"  />
                            <Column header="Image" body={imageCustom} />
                            <Column field="Children_cost" header="Children Cost" /> 
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
