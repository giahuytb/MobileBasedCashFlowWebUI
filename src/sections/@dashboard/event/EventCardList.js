import PropTypes from 'prop-types';
// @mui
import {  Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';

// ----------------------------------------------------------------------

EventList.propTypes = {
  eventlist: PropTypes.array.isRequired,
};

export default function EventList({ eventlist, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {eventlist.map((eventlist) => (
        <Grid key={eventlist.id} item xs={12} sm={6} md={3}>      
          <EventCard eventlist={eventlist} />
          
          <Link to='/dashboard/cardlist'> Click </Link>
        </Grid>
      ))}
    </Grid>
  );
}
