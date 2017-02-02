import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import { doHoge } from '../actions';

const hoge = createReducer({
  [doHoge]: ( state ) => 'hoge'
}, "");

export default combineReducers({
  hoge
});

