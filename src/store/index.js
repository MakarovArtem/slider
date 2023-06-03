import { configureStore } from '@reduxjs/toolkit';
import { slideReducer } from './slideReducer.js';
import { containerReducer } from './containerReducer.js';
import { dragReducer } from './dragReducer.js';


export const store = configureStore({
  reducer: {
    slide: slideReducer,
    container: containerReducer,
    drag: dragReducer,
  }
});