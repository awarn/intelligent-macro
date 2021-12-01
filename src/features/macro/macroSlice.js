import { createSlice } from "@reduxjs/toolkit";
import { isEqual } from "lodash";

const COMBO_MIN_LENGTH = 3;
const HISTORY_MAX_LENGTH = 1000;

const initialState = {
	macros: [],
	history: [],
	combo: [],
	isRecording: true,
};

const findHistory = (history = [], lookFor = []) => {
	let result = false;
	history.forEach((record, index) => {
		const subHistory = history.slice(index, index + lookFor.length);
		if (isEqual(subHistory, lookFor)) {
			result = true;
		}
	});
	return result;
};

const findMacro = (macros = [], actions = []) => {
	if (!actions.length) {
		return;
	} else {
		return macros.find((macro) => isEqual(macro.actions, actions));
	}
};

const addMacro = (macros = [], actions = []) => {
	const existingMacro = findMacro(macros, actions);
	if (existingMacro) {
		existingMacro.occurrences++;
	} else {
		const macro = createMacro(actions);
		macros.push(macro);
	}
};

const createMacro = (actions = []) => {
	if (!actions.length) {
		return;
	} else {
		return {
			actions,
			timeStamp: new Date(),
			occurrences: 1,
			startUrl: actions[0].url,
		};
	}
};

/* const print = (record) => {
	return JSON.parse(JSON.stringify(record))
} */

const macroSlice = createSlice({
	name: "macro",
	initialState,
	reducers: {
		addHistory: (state, action) => {
			const history = [...state.history, action.payload];
			const recent = history.slice(-1 * COMBO_MIN_LENGTH);

			if (recent.length < COMBO_MIN_LENGTH) {
				state.history = history;
				return;
			}

			if (state.combo.length) {
				const combo = [...state.combo, action.payload];
				const older = history.slice(0, -1 * combo.length);
				const inHistory = findHistory(older, combo);
				if (inHistory) {
					// addMacro(state.macros, combo.slice(0, -1));
					state.combo = combo;
				} else {
					addMacro(state.macros, combo.slice(0, -1));
					state.combo = [];
				}
			} else {
				const older = history.slice(0, -1 * recent.length);
				const inHistory = findHistory(older, recent);
				if (inHistory) {
					state.combo = recent;
				}
			}

			state.history = history;
		},
		stopRecording: (state) => {
			state.isRecording = false;
		},
		startRecording: (state) => {
			state.isRecording = true;
		}
	}
});

export const { addHistory, stopRecording, startRecording } = macroSlice.actions;

export const selectIsRecording = (state) => state.macro.isRecording;
export const selectMacros = (state) => state.macro.macros;
export const selectHistory = (state) => state.macro.history;

export default macroSlice.reducer;
