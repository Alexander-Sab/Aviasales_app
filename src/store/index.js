import { configureStore } from '@reduxjs/toolkit';

import aviasales from './aviasales';

const store = configureStore({
  reducer: aviasales,
});

export default store;
