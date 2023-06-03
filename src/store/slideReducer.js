// action names
const SET_CURRENT_SLIDE_IND = 'SET_CURRENT_SLIDE_IND';
const SET_SHIFT_TO_SLIDE = 'SET_SHIFT_TO_SLIDE';

// default state
const defaultState = {
  currentSlideInd: 0,
  shiftToSlide: 0,
};

// reducer
export const slideReducer = ( state = defaultState, action ) => {
  switch (action.type) {
    case SET_CURRENT_SLIDE_IND:
      return {...state, currentSlideInd: action.playload}
    case SET_SHIFT_TO_SLIDE:
      return {...state, shiftToSlide: action.playload}
    default:
      return state
  }
}

// action creators
export const slideIndAction = (playload) => ({ type: SET_CURRENT_SLIDE_IND, playload })
export const shiftToSlideAction = (playload) => ({ type: SET_SHIFT_TO_SLIDE, playload })
