import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { EventList } from '../sections/@dashboard/event';
// mock
import EVENTLIST from '../_mock/products';


// ----------------------------------------------------------------------

export default function EventCardsPage() {

  return (
    <>
      <Helmet>
        <title> Dashboard: Event  </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
        Event Card In Game
        </Typography>
        <EventList eventlist ={EVENTLIST} />
      </Container>
    </>
  );
}
