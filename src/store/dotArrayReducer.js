// action names
const SET_DOT_ARRAY = 'SET_DOT_ARRAY';

// default state
const defaultState = [];

// reducer
export const dotArrayReducer = ( state = defaultState, action ) => {
  switch (action.type) {
    case SET_DOT_ARRAY:
      return [...action.playload]
    default:
      return state
  }
}

// action creators
export const dotArrayAction = (playload) => ({ type: SET_DOT_ARRAY, playload })