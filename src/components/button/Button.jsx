import React from 'react';
import style from './Button.module.css';

export default function Button(props) {

  return(
    <button className={`${style.button} ${props.className}`} onClick={props.onClick}>{props.children}</button>
  )
}