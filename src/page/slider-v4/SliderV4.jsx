import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button.jsx';
import { getArray } from '../../utils/funcs.js'

import style from "./SliderV4.module.css";

export default function SliderV4({ slides, delay }) {

  const picsCount = slides.length;
  const [currentInd, setCurrentInd] = useState(0);
  const [shiftInd, setShiftInd] = useState(0);

  const slideWidth = 600;
  const dotWidth = 15;

  const [slidesShift, setSlidesShift] = useState(0);
  const [dotsShift, setDotsShift] = useState(dotWidth * 2);

  const [arrayForDots, setArrayForDots] = useState([]);

  const [dragStartSlidesShift, setDragStartSlidesShift] = useState(null);
  const [dragStartCoordinates, setDragStartCoordinates] = useState(null);

  const leftShiftAllowed = () => {
    return slidesShift === 0 ? false : true;
  };
  const rightShiftAllowed = () => {
    return slidesShift === -slideWidth * (picsCount - 1) ? false : true;
  };
  
  const leftButtonHandler = () => {
    if(leftShiftAllowed()) {
      setShiftInd(prev => prev - 1);
    } else {
      setShiftInd(() => picsCount - 1);
    }
  };
  const rightButtonHandler = () => {
    if(rightShiftAllowed()) {
      setShiftInd(prev => prev + 1);
    } else {
      setShiftInd(() => 0);
    }
  };

  const dotHandler = (index) => {
    setShiftInd(index);
  };

  useEffect(() => {
    setArrayForDots(getArray(picsCount));
  }, [picsCount])

  useEffect(() => {
    setSlidesShift(prev => prev + slideWidth * (currentInd - shiftInd));
    setDotsShift(prev => prev + dotWidth * (currentInd - shiftInd));
    setCurrentInd(shiftInd);
  }, [shiftInd])

  useEffect(() => {
    let timerId = setTimeout(() => {
      if(currentInd == picsCount - 1) {
        setShiftInd(() => 0);
      } else {
        setShiftInd(prev => prev + 1);
      }
    }, delay);

    return () => {
      clearTimeout(timerId);
    }
  }, [shiftInd, currentInd])

  useEffect(() => {
    const arrowLeftFunc = (event) => {
      if(event.code === 'ArrowLeft') leftButtonHandler();
    }
    const arrowRightFunc = (event) => {
      if(event.code === 'ArrowRight') rightButtonHandler();
    }

    window.addEventListener('keydown', arrowLeftFunc);
    window.addEventListener('keydown', arrowRightFunc);

    return () => {
      window.removeEventListener('keydown', arrowLeftFunc);
      window.removeEventListener('keydown', arrowRightFunc);
    }
  }, [leftButtonHandler, rightButtonHandler])

  function mouseClickHandler(event) {
    setDragStartCoordinates(event.clientX - slidesShift);// координаты первого клика мыши
    setDragStartSlidesShift(slidesShift);// это предыдущее значение transform, до первого клика
    console.log('DrShCord', event.clientX);
  }

  function mouseMoveHandler(event) {
    if(dragStartCoordinates !== null) {// если кликнул т.е. появились координаты, то двигаю
      setSlidesShift(event.clientX - dragStartCoordinates);// на то кол-во пикселей, которое получил
      console.log('DrShCord', dragStartCoordinates);
    }
  }

  function mouseUnclickHandler(event) {
    let shift = dragStartCoordinates + dragStartSlidesShift - event.clientX;
    if(Math.abs(shift) < 200) {
      setSlidesShift(dragStartSlidesShift);
    } else if(shift > 0) {
      setSlidesShift(dragStartSlidesShift);
      rightButtonHandler();
    } else if(shift < 0){
      setSlidesShift(dragStartSlidesShift);
      leftButtonHandler();
    }
    setDragStartCoordinates(null);
    setDragStartSlidesShift(null);
  }

  return (
    <article className={style.slider}>
      <Button className={style.leftButton} onClick={leftButtonHandler}>{'<<'}</Button>
      <Button className={style.rightButton} onClick={rightButtonHandler}>{'>>'}</Button>
      <div className={style.windowSlides}>
        <div style={{transform: `translateX(${slidesShift}px)`}} className={style.slidesContainer}>
          {
            slides.map((slide, ind) => 
              <div key={slide.url} className={style.slide}
                onMouseDown={mouseClickHandler}
                onMouseMove={mouseMoveHandler}
                onMouseUp={mouseUnclickHandler}
              >
                <img className={ind === currentInd ? 
                  `${style.image} ${style.imageActive}` :
                  style.image} src={slide.url}>
                </img>
              </div>
            )
          }
        </div>
        <div className={style.windowDots}>
          <div style={{transform: `translateX(${dotsShift}px)`}} className={style.dotsContainer}>
            {
              arrayForDots.map((number, ind) => 
                <div key={ind} onClick={() => dotHandler(ind)} className={ind === currentInd ? 
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