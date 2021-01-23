import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  
  useEffect(() => {
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
    axiosWithAuth().get('/colors')
      .then(res => {
        const colorsArr = res.data;
        setColorList(colorsArr);
      })
      .catch(err => console.log(err))
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
