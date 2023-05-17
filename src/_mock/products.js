// import { faker } from '@faker-js/faker';

// // ----------------------------------------------------------------------
// const PRODUCT_NAME = [
//   'Small Deal',
//   'Big Deal',
//   'Doodad',
//   'Market',
//   'Dream',
//   'Oppturnity'
// ];
// // ----------------------------------------------------------------------

// const events = [...Array(6)].map((_, index) => {
//   const setIndex = index + 1;

//   return {
//     id: faker.datatype.uuid(),
//     cover: `/assets/images/products/product_${setIndex}.jpg`,
//     name: PRODUCT_NAME[index],
//   };
// });

// export default events;

import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Ha Noi city mode',
  'HCM city mode',
];
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------

const products = [...Array(2)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/public/assets/Logo.png`,
    name: PRODUCT_NAME[index],
    colors:
      PRODUCT_COLOR,
  };
});

export default products;
