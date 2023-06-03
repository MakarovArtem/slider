import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button.jsx';
import { getArray } from '../../utils/funcs.js';
import { useDispatch, useSelector } from 'react-redux';

import { currentSlideIndAction, shiftToSlideIndAction } from '../../store/slideReducer.js';
import { slidesContainerShiftAction, dotsContainerShiftAction} from '../../store/containerReducer.js';
import { dragStartSlidesContainerShiftAction, dragStartCoordinatesAction} from '../../store/dragReducer.js';


import { dotArrayAction } from '../../store/dotArrayReducer.js';


import style from "./SliderV4.module.css";

export default function SliderV4({ slides, delay }) {

  const dispatch = useDispatch();
  
  const dotsArray = useSelector(state => state.dot);
  
  const currentSlideInd = useSelector(state => state.slide.currentSlideInd);
  const shiftToSlideInd = useSelector(state => state.slide.shiftToSlideInd);

  const slidesContainerShift = useSelector(state => state.container.slidesContainerShift);
  const dotsContainerShift = useSelector(state => state.container.dotsContainerShift);

  const dragStartSlidesContainerShift = useSelector(state => state.drag.dragStartSlidesContainerShift);
  const dragStartCoordinates = useSelector(state => state.drag.dragStartCoordinates);

// константы
  const slideWidth = 600;
  const dotWidth = 15;
  const picsCount = slides.length;

// функции проверки возможности пролистывания слайдов 
  const isLeftShiftAllowed = () => {
    return slidesContainerShift === 0 ? false : true;
  };
  const isRightShiftAllowed = () => {
    return slidesContainerShift === -slideWidth * (picsCount - 1) ? false : true;
  };

// функции для пролистывания слайдов
  const prevSlide = () => {
    if(isLeftShiftAllowed()) {
      dispatch(shiftToSlideIndAction(shiftToSlideInd - 1));
    } else {
      dispatch(shiftToSlideIndAction(picsCount - 1));
    }
  };
  const nextSlide = () => {
    if(isRightShiftAllowed()) {
      dispatch(shiftToSlideIndAction(shiftToSlideInd + 1));
    } else {
      dispatch(shiftToSlideIndAction(0));
    }
  };

// функция для установки индекса для пролистывания слайдов по клику на точки
  const dotHandler = (index) => {
    dispatch(shiftToSlideIndAction(index));
  };

// создаю массив для отрисовки точек
  useEffect(() => {
    dispatch(dotArrayAction(getArray(picsCount)));
  }, [picsCount])

// логика пролистывания 
  useEffect(() => {
    dispatch(slidesContainerShiftAction(slidesContainerShift + slideWidth * (currentSlideInd - shiftToSlideInd)))
    dispatch(dotsContainerShiftAction(dotsContainerShift + dotWidth * (currentSlideInd - shiftToSlideInd)))
    dispatch(currentSlideIndAction(shiftToSlideInd))
  }, [shiftToSlideInd])

// логика автоматического пролистывания
  useEffect(() => {
    let timerId = setTimeout(() => {
      if(currentSlideInd == picsCount - 1) {
        dispatch(shiftToSlideIndAction(0));
      } else {
        dispatch(shiftToSlideIndAction(shiftToSlideInd + 1));
      }
    }, delay);

    return () => {
      clearTimeout(timerId);
    }
  }, [shiftToSlideInd, currentSlideInd])

// логика пролистывания с помощью клавиш
  useEffect(() => {
    const arrowLeftFunc = (event) => {
      if(event.code === 'ArrowLeft') prevSlide();
    }
    const arrowRightFunc = (event) => {
      if(event.code === 'ArrowRight') nextSlide();
    }

    window.addEventListener('keydown', arrowLeftFunc);
    window.addEventListener('keydown', arrowRightFunc);

    return () => {
      window.removeEventListener('keydown', arrowLeftFunc);
      window.removeEventListener('keydown', arrowRightFunc);
    }
  }, [prevSlide, nextSlide])

// логика пролистывания с помощью drag'n'drop
  useEffect(() => {
    const mouseDownHandler = (event) => {
      dispatch(dragStartCoordinatesAction(event.clientX - slidesContainerShift));
      dispatch(dragStartSlidesContainerShiftAction(slidesContainerShift));
    }

    const mouseMoveHandler = (event) => {
      if(dragStartCoordinates !== null) {
        dispatch(slidesContainerShiftAction(event.clientX - dragStartCoordinates));
      }
    }

    const mouseUpHandler = (event) => {
      let shift = dragStartCoordinates + dragStartSlidesContainerShift - event.clientX;
      if(Math.abs(shift) < 200) {
        dispatch(slidesContainerShiftAction(dragStartSlidesContainerShift));
      } else if(shift > 0) {
        dispatch(slidesContainerShiftAction(dragStartSlidesContainerShift));
        nextSlide();
      } else if(shift < 0){
        dispatch(slidesContainerShiftAction(dragStartSlidesContainerShift));
        prevSlide();
      }
      dispatch(dragStartCoordinatesAction(null));
      dispatch(dragStartSlidesContainerShiftAction(null));
    }

    const slider = document.getElementById('slider');

    slider.addEventListener('mousedown', mouseDownHandler);
    slider.addEventListener('mousemove', mouseMoveHandler);
    slider.addEventListener('mouseup', mouseUpHandler);

    return () => {
      slider.removeEventListener('mousedown', mouseDownHandler);
      slider.removeEventListener('mousemove', mouseMoveHandler);
      slider.removeEventListener('mouseup', mouseUpHandler);
    }
  }, [slidesContainerShift, dragStartCoordinates, dragStartSlidesContainerShift])
  

  return (
    <article className={style.slider}>
      <Button className={style.leftButton} onClick={prevSlide}>{'<<'}</Button>
      <Button className={style.rightButton} onClick={nextSlide}>{'>>'}</Button>
      <div id='slider' className={style.windowSlides}>
        <div style={{transform: `translateX(${slidesContainerShift}px)`}} className={style.slidesContainer}>
          {
            slides.map((slide, ind) => 
              <div key={slide.url} className={style.slide}>
                <img className={ind === currentSlideInd ? 
                  `${style.image} ${style.imageActive}` :
                  style.image} src={slide.url}>
                </img>
              </div>
            )
          }
        </div>
        <div className={style.windowDots}>
          <div style={{transform: `translateX(${dotsContainerShift}px)`}} className={style.dotsContainer}>
            {
              dotsArray.map((number, ind) => 
                <div key={ind} onClick={() => dotHandler(ind)}
                  className={ind === currentSlideInd ? 
                  `${style.dot} ${style.dotActive}` :
                  style.dot}>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </article>
  )
}