import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography } from '@mui/material';
// components
import { useEffect, useRef, useState } from 'react';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
// sections
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {
  AppWidgetSummary,

} from '../../sections/@dashboard/app';


// ----------------------------------------------------------------------

DashboardAppPage.propTypes = {
  userList: PropTypes.array,
  totalMatchToday: PropTypes.number,
  totalMatchThisWeek: PropTypes.number,
  totalUserPlayGameToDay: PropTypes.number,
}

export default function DashboardAppPage({
  userList, totalMatchToday, totalMatchThisWeek, totalUserPlayGameToDay 
}) {
  const navigate = useNavigate();
  const dt = useRef(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const TokenExpire = jwtDecode(JSON.parse(localStorage.getItem('authToken')));
    // console.log(`Token Expire: ${  TokenExpire.exp * 1000}`);
    // console.log(`Date Now: ${  Date.now()}`);
    if (TokenExpire.exp* 1000 < Date.now()) {  
      console.log('TokenExpire');
      navigate("/login");
      }
    setLoading(false);     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Weekly Match" total={totalMatchThisWeek} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Daily Match" total={totalMatchToday} color="info" icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Daily User Play Game" total={totalUserPlayGameToDay} color="warning" icon={'ant-design:android-filled'} />
          </Grid>

        </Grid>

        <br/>

        <Typography variant="h4" sx={{ mb: 5 }}>
          User List
        </Typography>


            <div id="wrapper" style={{marginLeft: 50, marginRight: 50}}>
                 <div className="datatable-style-demo">
                     <div className="card">
                         <DataTable responsiveLayout="scroll" paginator stripedRows
                             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                             rows={4} rowsPerPageOptions={[4, 10, 20]}
                             paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}
                             value={userList} loading= {loading} className='border-solid' style={{background: 'white'}}
                             header={header} ref={dt}
                             globalFilter={globalFilter}
                             emptyMessage="No Record found."
                             >
                             <Column field="UserName" header="User Name" sortable />
                             <Column field="NickName" header="Nick Name"/>
                             <Column field="Gender" header="Gender"/>  
                             <Column field="Email" header="Email"/>  
                             <Column field="Coin" header="Coin"/>  
                             <Column field="Point" header="Point"/>  
                             <Column field="RoleName" header="Role"/>     
                         </DataTable>
                     </div>
                 </div>
             </div>
             
      </Container>
    </>
  );
}
