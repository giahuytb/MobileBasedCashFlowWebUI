import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------
const PRODUCT_NAME = [
  'Small Deal',
  'Big Deal',
  'Doodad',
  'Market',
];
// ----------------------------------------------------------------------

const products = [...Array(4)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
  };
});

export default products;
