import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  macros: [],
	history: [],
	isActive: false,
};

const macroSlice = createSlice({
	name: "macro",
	initialState,
	reducers: {
		addHistory: (state, action) => {
			state.history.push(action.payload);
    },
		record: (state) => {
			state.isActive = true;
		},
		save: (state) => {
			state.isActive = false;
			const actions = state.history;
			if (actions.length) {
				state.macros.push({
					startUrl: actions[0].url,
					actions,
				});
			}
			state.history = [];
		}
	}
});

export const { addHistory, record, save } = macroSlice.actions;

export const selectIsActive = (state) => state.macro.isActive;

export const selectMacros = (state) => state.macro.macros;

export default macroSlice.reducer;
