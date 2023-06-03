// action names
const SET_CURRENT_SLIDE_IND = 'SET_CURRENT_SLIDE_IND';
const SET_SHIFT_TO_SLIDE_IND = 'SET_SHIFT_TO_SLIDE_IND';

// default state
const defaultState = {
  currentSlideInd: 0,
  shiftToSlideInd: 0,
};

// reducer
export const slideReducer = ( state = defaultState, action ) => {
  switch (action.type) {
    case SET_CURRENT_SLIDE_IND:
      return {...state, currentSlideInd: action.playload}
    case SET_SHIFT_TO_SLIDE_IND:
      return {...state, shiftToSlideInd: action.playload}
    default:
      return state
  }
}

// action creators
export const currentSlideIndAction = (playload) => ({ type: SET_CURRENT_SLIDE_IND, playload })
export const shiftToSlideIndAction = (playload) => ({ type: SET_SHIFT_TO_SLIDE_IND, playload })
