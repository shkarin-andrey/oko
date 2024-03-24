import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthState {
  isAuth: boolean;
}

const initialState: IAuthState = {
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    auth: (state: IAuthState, action: PayloadAction<IAuthState['isAuth']>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { auth } = authSlice.actions;

export default authSlice.reducer;
