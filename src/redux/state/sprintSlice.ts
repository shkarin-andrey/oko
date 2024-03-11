import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISprintState {
  select: number | undefined;
}

const initialState: ISprintState = {
  select: undefined,
};

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    selectSprint: (
      state: ISprintState,
      action: PayloadAction<ISprintState['select']>,
    ) => {
      state.select = action.payload;
    },
  },
});

export const { selectSprint } = sprintSlice.actions;

export default sprintSlice.reducer;
