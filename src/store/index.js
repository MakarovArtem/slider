import { configureStore, combineReducers } from 'redux';
import slideReducer from './slideReducer.js';
import containerReducer from './containerReducer.js';
import dragReducer from './dragReducer.js';

const rootReducer = combineReducers(slideReducer, containerReducer, dragReducer);

export const store = configureStore(rootReducer);