import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList } from '../sections/@dashboard/products';
// mock
import GAMEMODE from '../_mock/products';

// ----------------------------------------------------------------------

export default function GameModePage() {

  return (
    <>
      <Helmet>
        <title>Game Mod | CashFlow </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Game Mode
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={GAMEMODE} />
      </Container>
    </>
  );
}
