import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button.jsx';
import getSeveralPics from '../../API/getSeveralPics.js';

import style from './SliderV2.module.css'

export default function SliderV2() {

  const [picUrls, setPicUrls] = useState([]);
  const [picLimit, setPicLimit] = useState(5);
  const [slidesContainerShift, setSlidesContainerShift] = useState(0);

  const slideWidth = 650;

  const getPicData = async () => {
    try {
      let response = await getSeveralPics(picLimit);
      setPicUrls(response.data.map(item => item.url));
    } catch(e) {
      alert(e)
    }
  };

  const leftShiftAllowed = () => {
    return slidesContainerShift === 0 ? false : true;
  };
  const rightShiftAllowed = () => {
    return slidesContainerShift === -slideWidth * (picLimit-1) ? false : true;
  };

  const leftShiftHandler = () => {
    if(leftShiftAllowed()) {
      setSlidesContainerShift(prev => prev + slideWidth);
    }
  };
  const rightShiftHandler = () => {
    if(rightShiftAllowed()) {
      setSlidesContainerShift(prev => prev - slideWidth)
    }
  };
  
  useEffect(() => {
    getPicData();
  }, [picLimit])

  return(
    <article className={style.slider}>
      <Button onClick={leftShiftHandler}>{`<`}</Button>
      <div className={style.window}>
        <div style={{transform: `translateX(${slidesContainerShift}px)`}} className={style.slidesContainer}>
        {/*//? а как сделать чтобы стиль менялся покрасивее? а не в атр style?*/}
          {
            picUrls.map(url => 
              <div key={url} style={{minWidth: slideWidth + 'px'}} className={style.slideWrapper}>
                <img className={style.slide} src={url}></img>
              </div>
            )
          }
        </div>
      </div>
      <Button onClick={rightShiftHandler}>{`>`}</Button>
    </article>
  )
}