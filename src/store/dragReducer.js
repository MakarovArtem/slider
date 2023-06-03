// action names
const SET_DRAG_START_SLIDES_CONTAINER_SHIFT = 'SET_DRAG_START_SLIDES_CONTAINER_SHIFT';
const SET_DRAG_START_COORDINATES = 'SET_DRAG_START_COORDINATES';

// default state
const defaultState = {
  dragStartSlidesContainerShift: null,
  dragStartCoordinates: null,
};

// reducer
export const dragReducer = ( state = defaultState, action ) => {
  switch (action.type) {
    case SET_DRAG_START_SLIDES_CONTAINER_SHIFT:
      return {...state, dragStartSlidesContainerShift: action.playload}
    case SET_DRAG_START_COORDINATES:
      return {...state, dragStartCoordinates: action.playload}
    default:
      return state
  }
}

// action creators
export const dragStartSlidesContainerShiftAction = (playload) => ({ type: SET_DRAG_START_SLIDES_CONTAINER_SHIFT, playload })
export const dragStartCoordinatesAction = (playload) => ({ type: SET_DRAG_START_COORDINATES, playload })
