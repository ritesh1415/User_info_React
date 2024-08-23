import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './Tableslice.js';

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});
