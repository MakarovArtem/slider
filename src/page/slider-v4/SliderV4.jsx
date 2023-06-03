import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button.jsx';
import { getArray } from '../../utils/funcs.js';
import { useDispatch, useSelector } from 'react-redux';

import style from "./SliderV4.module.css";

export default function SliderV4({ slides, delay }) {
// константы
  const slideWidth = 600;
  const dotWidth = 15;
  const picsCount = slides.length;
// индекс текущего слайда и индекс слайда для перемотки
  const [currentSlideInd, setCurrentSlideInd] = useState(0);
  const [shiftToSlideInd, setShiftToSlideInd] = useState(0);
// значение смещения контейнера слайдов и контейнера точек
  const [slidesContainerShift, setSlidesContainerShift] = useState(0);
  const [dotsContainerShift, setDotsContainerShift] = useState(dotWidth * 2);
// массив для отрисовки точек
  const [arrayForDots, setArrayForDots] = useState([]);
// смещение контейнера слайдов в момент начала пролистывания с помощью drag'n'drop
// и координаты клика мыши
  const [dragStartSlidesContainerShift, setDragStartSlidesContainerShift] = useState(null);
  const [dragStartCoordinates, setDragStartCoordinates] = useState(null);

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
      setShiftToSlideInd(prev => prev - 1);
    } else {
      setShiftToSlideInd(() => picsCount - 1);
    }
  };
  const nextSlide = () => {
    if(isRightShiftAllowed()) {
      setShiftToSlideInd(prev => prev + 1);
    } else {
      setShiftToSlideInd(() => 0);
    }
  };

// функция для установки индекса для пролистывания слайдов по клику на точки
  const dotHandler = (index) => {
    setShiftToSlideInd(index);
  };

// создаю массив для отрисовки точек
  useEffect(() => {
    setArrayForDots(getArray(picsCount));
  }, [picsCount])

// логика пролистывания
  useEffect(() => {
    setSlidesContainerShift(prev => prev + slideWidth * (currentSlideInd - shiftToSlideInd));
    setDotsContainerShift(prev => prev + dotWidth * (currentSlideInd - shiftToSlideInd));
    setCurrentSlideInd(shiftToSlideInd);
  }, [shiftToSlideInd])

// логика автоматического пролистывания
  useEffect(() => {
    let timerId = setTimeout(() => {
      if(currentSlideInd == picsCount - 1) {
        setShiftToSlideInd(() => 0);
      } else {
        setShiftToSlideInd(prev => prev + 1);
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
      setDragStartCoordinates(event.clientX - slidesContainerShift);
      setDragStartSlidesContainerShift(slidesContainerShift);
    }

    const mouseMoveHandler = (event) => {
      if(dragStartCoordinates !== null) {
        setSlidesContainerShift(event.clientX - dragStartCoordinates);
      }
    }

    const mouseUpHandler = (event) => {
      let shift = dragStartCoordinates + dragStartSlidesContainerShift - event.clientX;
      if(Math.abs(shift) < 200) {
        setSlidesContainerShift(dragStartSlidesContainerShift);
      } else if(shift > 0) {
        setSlidesContainerShift(dragStartSlidesContainerShift);
        nextSlide();
      } else if(shift < 0){
        setSlidesContainerShift(dragStartSlidesContainerShift);
        prevSlide();
      }
      setDragStartCoordinates(null);
      setDragStartSlidesContainerShift(null);
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
              arrayForDots.map((number, ind) => 
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