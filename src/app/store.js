import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import counterReducer from '../features/counter/counterSlice';
import macroReducer from '../features/macro/macroSlice';
import consoleMiddleware from '../features/macro/consoleMiddleware';
import macroLogMiddleware from '../features/macro/macroLogMiddleware';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    macro: macroReducer,
  },
  middleware: [thunkMiddleware, consoleMiddleware, macroLogMiddleware]
});
