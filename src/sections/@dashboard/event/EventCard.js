import PropTypes from 'prop-types';
// @mui
import { Box, Card, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import '@fortawesome/fontawesome-free/css/all.min.css';
// utils

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});
// ----------------------------------------------------------------------

EventCard.propTypes = {
  eventlist: PropTypes.object,
};

export default function EventCard({ eventlist }) {
  const { name, cover } = eventlist;

  return (  
    <div>
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={name} src={cover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>     
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>        
      </Stack>
    </Card>
    {/* <Link to= '/listpage'>  <i className="fas fa-eye"/>  Click here to see </Link> */}
    </div>
  );
}
