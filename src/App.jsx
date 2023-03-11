import React from 'react';
import SliderDotted from './page/slider-v1/SliderV1.jsx';
import SliderDottedV2 from './page/slider-v2/SliderV2.jsx';

export default function App() {

  return(
    <>
      <h2 style={{textAlign: 'center'}}>Slider V2</h2>
      <SliderDottedV2/>
      <h2 style={{textAlign: 'center'}}>Slider V1</h2>
      <SliderDotted/>
      {/* <h2>Slider thumb</h2> */}
    </>
    // пусть будет слайдер с точками.
    // слайдер с миниатюрами изображений.
    // да еще и кликабельный.
    // да еще и с кнопками слева справа, 
    // которые будут слушать клавиатуру - 
    // стрелки влево и вправо + цифры с 1 до 9 по номеру слайда
  )
}