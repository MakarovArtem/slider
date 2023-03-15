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

  const leftShiftAllowed = () => {
    return slidesShift === 0 ? false : true;
  };
  const rightShiftAllowed = () => {
    return slidesShift === -slideWidth * (picsCount - 1) ? false : true;
  };

  const leftButtonHandler = () => {
    if(leftShiftAllowed()) {
      setShiftInd(prev => prev - 1);
    }
  };
  const rightButtonHandler = () => {
    if(rightShiftAllowed()) {
      setShiftInd(prev => prev + 1);
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
    console.log('from useeffect curInd: ', currentInd);
    console.log('from useeffect shiftInd: ', shiftInd);
  }, [shiftInd])

  useEffect(() => {
    let timer = setInterval(() => {
      if(currentInd === picsCount) clearInterval(timer);
      setShiftInd(prev => prev + 1);
      console.log('from interval curInd: ', currentInd);
      console.log('from interval shiftInd: ', shiftInd);
    }, delay);
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <article className={style.slider}>
      <Button className={style.leftButton} onClick={leftButtonHandler}>{'<<'}</Button>
      <Button className={style.rightButton} onClick={rightButtonHandler}>{'>>'}</Button>
      <div className={style.windowSlides}>
        <div style={{transform: `translateX(${slidesShift}px)`}} className={style.slidesContainer}>
          {
            slides.map((slide, ind) => 
              <div key={slide.url} className={style.slide}>
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