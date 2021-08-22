import React from 'react';

import Carousel from './component/Carousel';
import { dummyData } from './data/Data';

const App = () => {
  return(
    <Carousel data={dummyData} />
  )
}
export default App;