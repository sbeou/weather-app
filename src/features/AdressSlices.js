import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCep = createAsyncThunk(
    'adress/fetchCep',
    async ({cep}, thunkAPI) => {
        try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (response.status === 200) {
            return data ;
        } else {
            return thunkAPI.rejectWithValue(data);
        }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

export const adressSlice = createSlice({
  name: 'adress',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchCep.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchCep.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.address = payload.logradouro;
      state.neighborhood = payload.bairro;
      state.city = payload.localidade;
      state.uf = payload.uf;
      state.error = payload.erro;
    },
    [fetchCep.rejected]: (state) => {
      console.log('fetchCep');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = adressSlice.actions;

export const adressSelector = (state) => state.adress;