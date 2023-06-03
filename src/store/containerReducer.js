// action names
const SET_SLIDES_CONTAINER_SHIFT = 'SET_SLIDES_CONTAINER_SHIFT';
const SET_DOTS_CONTAINER_SHIFT = 'SET_DOTS_CONTAINER_SHIFT';

// default state
const defaultState = {
  slidesContainerShift: 0,
  dotsContainerShift: 30,
};

// reducer
export const containerReducer = ( state = defaultState, action ) => {
  switch (action.type) {
    case SET_SLIDES_CONTAINER_SHIFT:
      return {...state, slidesContainerShift: action.playload}
    case SET_DOTS_CONTAINER_SHIFT:
      return {...state, dotsContainerShift: action.playload}
    default:
      return state
  }
}

// action creators
export const slidesContainerShiftAction = (playload) => ({ type: SET_SLIDES_CONTAINER_SHIFT, playload })
export const dotsContainerShiftAction = (playload) => ({ type: SET_DOTS_CONTAINER_SHIFT, playload })
