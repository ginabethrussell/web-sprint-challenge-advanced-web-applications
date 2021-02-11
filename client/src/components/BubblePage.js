import React, { useState, useEffect } from "react";
import { getColors } from '../utils/getColors';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  useEffect(() => {
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
    getColors()
      .then(res => {
        const colorsArr = res.data;
        setColorList(colorsArr);
      })
      .catch(err => {
        console.log(err.Error);
      })
  }, [])
 

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
   
      <p>Bubble Page</p>
    </>
  );
};

export default BubblePage;
