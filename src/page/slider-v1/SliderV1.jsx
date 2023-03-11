import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button.jsx';
import getPics from '../../API/getPics.jsx';

import style from './SliderV1.module.css'

export default function SliderV1() {

  const [picUrl, setPicUrl] = useState('');
  const [thumbUrl, setThumbUrl] = useState('');
  const [picId, setPicId] = useState(1);
  const maxPicCount = 3;

  const getPicData = async () => {
    try {
      const response = await getPics(picId);
      setPicUrl(response.data.url);
      setThumbUrl(response.data.thumbnailUrl)
    } catch(e) {
      alert(e)
    }
  }

  useEffect(() => {
    getPicData()
  }, [picId])

  const incrementPicId = () => {
    if(picId < maxPicCount) { //? Почему здесь нужно ставить < 3, а не < 4
      setPicId(prev => prev + 1);
    }
  }
  const decrementPicId = () => {
    if(picId > 1) {
      setPicId(prev => prev - 1);
    }
  } 

  const setFirstPic = () => {
    setPicId(1)
  }

  const setSecondPic = () => {
    setPicId(2)
  }

  const setThirdPic = () => {
    setPicId(3)
  }

  return(
    <article className={style.slider}>
      <div className={style.imgContainer}>
        <img src={picUrl}/>
      </div>
      <div className={style.ctrlContainer}>
        <Button onClick={decrementPicId}>prev slide</Button>
        <ul className={style.dotContainer}>
          <li onClick={setFirstPic}>
            <div className={picId === 1 ? `${style.dot} ${style.dotActive}` : `${style.dot}`}></div>{/*//? как сделать это красивее? МБ СТАВИТЬ АЙДИШНИКИ?*/}
          </li>
          <li onClick={setSecondPic}>
            <div className={picId === 2 ? `${style.dot} ${style.dotActive}` : `${style.dot}`}></div>
          </li>
          <li onClick={setThirdPic}>
            <div className={picId === 3 ? `${style.dot} ${style.dotActive}` : `${style.dot}`}></div>
          </li>
        </ul>
        <Button onClick={incrementPicId}>next slide</Button>
      </div>
    </article>
  )
}