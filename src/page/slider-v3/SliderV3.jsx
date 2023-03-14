import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button.jsx';
import getSeveralPics from '../../API/getSeveralPics.js';
import { getArray } from '../../utils/funcs.js'

import style from "./SliderV3.module.css";

export default function SliderV3() {

  const [picsUrls, setPicsUrls] = useState([]);
  const [picsLimit, setPicsLimit] = useState(5);
  const [currentPic, setCurrentPic] = useState(0);

  const [arrayForDots, setArrayForDots] = useState([]);
  const [currentDot, setCurrentDot] = useState(0);

  const slideWidth = 600;
  const dotWidth = 15;

  const [slidesShift, setSlidesShift] = useState(0);
  const [dotsShift, setDotsShift] = useState(dotWidth * 2);

  const getImageData = async () => {
    let response = await getSeveralPics(picsLimit);
    setPicsUrls(response.data.map(item => item.url));
  };

  const leftShiftAllowed = () => {
    return slidesShift === 0 ? false : true;
  };
  const rightShiftAllowed = () => {
    return slidesShift === -slideWidth * (picsLimit-1) ? false : true;
  };

  const leftButtonHandler = () => {
    if(leftShiftAllowed()) {
      setSlidesShift(prev => prev + slideWidth);
      setDotsShift(prev => prev + dotWidth);
      setCurrentPic(prev => prev - 1);
      setCurrentDot(prev => prev - 1);
    }
  };

  const rightButtonHandler = () => {
    if(rightShiftAllowed()) {
      setSlidesShift(prev => prev - slideWidth);
      setDotsShift(prev => prev - dotWidth);
      setCurrentPic(prev => prev + 1);
      setCurrentDot(prev => prev + 1);
      console.log(slidesShift, 'from func')
    }
  };

  const dotHandler = (index) => {
    setCurrentDot(() => index)
    setCurrentPic(() => index)
    setSlidesShift((prev) => prev + slideWidth * (currentPic - index))
    setDotsShift((prev) => prev + dotWidth * (currentDot - index))
  };

  useEffect(() => {
    getImageData();
  }, [picsUrls]);

  useEffect(() => {
    setArrayForDots(getArray(picsLimit))
  }, [picsLimit])

  useEffect(() => {
    let timerId = setTimeout(function tick() {
      rightButtonHandler();
      console.log(slidesShift, 'from timeout');
      timerId = setTimeout(tick, 2000);
    }, 2000);
    return () => {
      clearTimeout(timerId)
    }
  }, [])

  return (
    <article className={style.slider}>
      <Button className={style.leftButton} onClick={leftButtonHandler}>{'<<'}</Button>
      <Button className={style.rightButton} onClick={rightButtonHandler}>{'>>'}</Button>
      <div className={style.windowSlides}>
        <div style={{transform: `translateX(${slidesShift}px)`}} className={style.slidesContainer}>
          {
            picsUrls.map((url, ind) => 
              <div key={url} className={style.slide}>
                <img className={ind === currentPic ? 
                  `${style.image} ${style.imageActive}` :
                  style.image} src={url}>
                </img>
              </div>
            )
          }
        </div>
        <div className={style.windowDots}>
          <div style={{transform: `translateX(${dotsShift}px)`}} className={style.dotsContainer}>
            {
              arrayForDots.map((number, ind) => 
                <div key={ind} onClick={() => dotHandler(ind)} className={ind === currentDot ? 
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