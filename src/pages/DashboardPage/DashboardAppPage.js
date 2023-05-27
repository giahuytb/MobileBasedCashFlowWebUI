import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import { useCallback, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
// sections
import {

  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,

} from '../../sections/@dashboard/app';

import ApiService from '../../api/ApiService'


// ----------------------------------------------------------------------


export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [totalMatchToday , setTotalMatchToday] = useState(0);
  const [totalMatchThisWeek, setTotalMatchThisWeek] = useState(0);
  const [totalUserPlayGameToDay, SetTotalUserPlayGameToDay] = useState(0);

  const TotalMatchToDay = useCallback( () => {
    try {
        ApiService.TotalMatchToDay()
            .then(response => {
              setTotalMatchToday(response.data);                    
            })
    } catch (error) {
        if (error.response) {
            // get response with a status code not in range 2xx
            console.log(error.response.data.data);
            console.log(error.response.data.status);
            console.log(error.response.data.headers);
          } else if (error.request) {
            // no response
            console.log(error.request);
          } else {
            // Something wrong in setting up the request
            console.log("Error", error.message);
          }
          console.log(error.config);
    }
  }, []);

  const TotalMatchThisWeek = useCallback( () => {
    try {
        ApiService.TotalMatchThisWeek()
            .then(response => {
              setTotalMatchThisWeek(response.data);                    
            })
    } catch (error) {
        if (error.response) {
            // get response with a status code not in range 2xx
            console.log(error.response.data.data);
            console.log(error.response.data.status);
            console.log(error.response.data.headers);
          } else if (error.request) {
            // no response
            console.log(error.request);
          } else {
            // Something wrong in setting up the request
            console.log("Error", error.message);
          }
          console.log(error.config);
    }
  }, []);

  const TotalUserPlayGameToday = useCallback( () => {
    try {
        ApiService.TotalUserPlayGameToDay()
            .then(response => {
              SetTotalUserPlayGameToDay(response.data);                    
            })
    } catch (error) {
        if (error.response) {
            // get response with a status code not in range 2xx
            console.log(error.response.data.data);
            console.log(error.response.data.status);
            console.log(error.response.data.headers);
          } else if (error.request) {
            // no response
            console.log(error.request);
          } else {
            // Something wrong in setting up the request
            console.log("Error", error.message);
          }
          console.log(error.config);
    }
  }, []);

  useEffect(() => {
    TotalMatchToDay();
    TotalMatchThisWeek();
    TotalUserPlayGameToday();
    const TokenExpire = jwtDecode(JSON.parse(localStorage.getItem('authToken')));
    // console.log(`Token Expire: ${  TokenExpire.exp * 1000}`);
    // console.log(`Date Now: ${  Date.now()}`);
    if (TokenExpire.exp* 1000 < Date.now()) {  
      console.log('TokenExpire');
      navigate("/login");
      }   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            <AppWidgetSummary title="Dayly Match" total={totalMatchToday} color="info" icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Dayly User Play Game" total={totalUserPlayGameToDay} color="warning" icon={'ant-design:android-filled'} />
          </Grid>


          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
