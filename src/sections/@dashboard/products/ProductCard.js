import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
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

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name, cover } = product;

  return (
    <Card>
      <Link component={RouterLink} to='/dashboard/eventcardlist' color="inherit" underline="hover">
        <Box sx={{ pt: '100%', position: 'relative' }}>
          <StyledProductImg alt={name} src={cover} />
        </Box>

        <Stack spacing={3} sx={{ p: 3 }}>    
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>    
        </Stack>
     </Link>
    </Card>
  );
}
