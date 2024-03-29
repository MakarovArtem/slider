import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import SliderV1 from './page/slider-v1/SliderV1.jsx';
import SliderV2 from './page/slider-v2/SliderV2.jsx';
import SliderV3 from './page/slider-v3/SliderV3.jsx';
import SliderV4 from './page/slider-v4/SliderV4.jsx';

import slides from './data/Slides.js';

export default function App() {

  return(
    <Provider store={store}>
      <h2 style={{textAlign: 'center'}}>Slider V4</h2>
      <SliderV4 slides={slides} delay={50000}/>
      <h2 style={{textAlign: 'center'}}>Slider V3</h2>
      <SliderV3/>
      <h2 style={{textAlign: 'center'}}>Slider V2</h2>
      <SliderV2/>
      <h2 style={{textAlign: 'center'}}>Slider V1</h2>
      <SliderV1/>
    </Provider>
  )
}