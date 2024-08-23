    import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    { id: 1, accountName: 'Account 1', email: 'email1@example.com', phoneNo: '123', website: 'www.example1.com', industry: 'Industry 1', accountStatus: 'Active', remark: 'Remark 1' },
    { id: 2, accountName: 'Account 2', email: 'email2@example.com', phoneNo: '15689555', website: 'www.example2.com', industry: 'Industry 2', accountStatus: 'Inactive', remark: 'Remark 2' },
    { id: 3, accountName: 'Account 3', email: 'email3@example.com', phoneNo: '895200', website: 'www.example3.com', industry: 'Industry 3', accountStatus: 'Active', remark: 'Remark 3' },
    { id: 4, accountName: 'Account 4', email: 'email4@example.com', phoneNo: '8552225222', website: 'www.example4.com', industry: 'Industry 4', accountStatus: 'Inactive', remark: 'Remark 4' },
    { id: 5, accountName: 'Account 5', email: 'email5@example.com', phoneNo: '8952352222', website: 'www.example5.com', industry: 'Industry 5', accountStatus: 'Active', remark: 'Remark 5' },
    { id: 6, accountName: 'Account 6', email: 'email6@example.com', phoneNo: '89522222289', website: 'www.example6.com', industry: 'Industry 1', accountStatus: 'Inactive', remark: 'Remark 6' },
    { id: 7, accountName: 'Account 7', email: 'email7@example.com', phoneNo: '89888888889', website: 'www.example7.com', industry: 'Industry 2', accountStatus: 'Active', remark: 'Remark 7' },
    { id: 8, accountName: 'Account 8', email: 'email8@example.com', phoneNo: '89898585858', website: 'www.example8.com', industry: 'Industry 3', accountStatus: 'Inactive', remark: 'Remark 8' },
    { id: 9, accountName: 'Account 9', email: 'email9@example.com', phoneNo: '89598989889', website: 'www.example9.com', industry: 'Industry 4', accountStatus: 'Active', remark: 'Remark 9' },
    { id: 10, accountName: 'Account 10', email: 'email10@example.com', phoneNo: '123-456-7899', website: 'www.example10.com', industry: 'Industry 5', accountStatus: 'Inactive', remark: 'Remark 10' },
    { id: 13, accountName: 'Account', email: 'email11@example.com', phoneNo: '123-456-7800', website: 'www.example11.com', industry: 'Industry 1', accountStatus: 'Active', remark: 'Remark 11' },

    { id: 11, accountName: 'Account 11', email: 'email11@example.com', phoneNo: '123-456-7800', website: 'www.example11.com', industry: 'Industry 1', accountStatus: 'Active', remark: 'Remark 11' },
  ],
  filter: '',
  sortBy: 'accountName',
  sortOrder: 'asc',
};

const tableslice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    addEntry: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { setFilter, setSort, addEntry } = tableslice.actions;

export const selectFilteredData = (state) => {
  const filter = state.table.filter.toLowerCase();
  return state.table.data.filter((entry) =>
    Object.values(entry).some(value =>
      value.toString().toLowerCase().includes(filter)
    )
  ).sort((a, b) => {
    if (a[state.table.sortBy] < b[state.table.sortBy]) return state.table.sortOrder === 'asc' ? -1 : 1;
    if (a[state.table.sortBy] > b[state.table.sortBy]) return state.table.sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

export default tableslice.reducer;
