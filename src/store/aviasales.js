import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getTickets from '../services/aviasales';

const initialState = {
  isLoading: true,
  errors: 0,
  sort: 'fast',
  filter: ['0_transfers', '1_transfer', '2_transfers', '3_transfers'],
  tickets: [],
  toShow: 5,
};

const aviasales = createSlice({
  name: 'aviasales',
  initialState,
  reducers: {
    setSort(state, action) {
      return { ...state, sort: action.payload };
    },
    setFilter(store, action) {
      return { ...store, filter: action.payload };
    },
    showMore(store) {
      return { ...store, toShow: store.toShow + 5 };
    },
    addTickets(store, action) {
      const { stop: isStop, error, tickets } = action.payload;
      return {
        ...store,
        isLoading: !isStop,
        errors: error ? store.errors + 1 : store.errors,
        tickets: [...store.tickets, ...tickets],
      };
    },
  },
});

export const { setSort, setFilter, showMore, addTickets } = aviasales.actions;

export const fetchTickets = createAsyncThunk('aviasales/fetchTickets', async (pl, api) => {
  const loop = async () => {
    let part = await getTickets();
    api.dispatch(addTickets(part));
    if (!part.stop) loop();
  };
  await loop();
});

export default aviasales.reducer;
