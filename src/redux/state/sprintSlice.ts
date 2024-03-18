import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISprintState {
  select: number | undefined;
  isOpenInformations: boolean;
}

const initialState: ISprintState = {
  select: undefined,
  isOpenInformations: false,
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
    setOpenInformations: (
      state: ISprintState,
      action: PayloadAction<ISprintState['isOpenInformations']>,
    ) => {
      state.isOpenInformations = action.payload;
    },
  },
});

export const { selectSprint, setOpenInformations } = sprintSlice.actions;

export default sprintSlice.reducer;
