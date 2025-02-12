import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  retypePassword: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
  town: '',
  region: '',
  postcode: '',
  country: 'United Kingdom',
  errors: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    setError(state, action) {
      const { name, error } = action.payload;
      state.errors[name] = error;
    },
    clearErrors(state) {
      state.errors = {};
    },
  },
});

export const { updateField, setError, clearErrors } = formSlice.actions;
export default formSlice.reducer;
