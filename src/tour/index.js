import React from "react";
import Tour from "./tour.jsx"

export const TourIndex = (props = {}) => {
    return props.open ? <Tour {...props} /> :  null; 
}

export default TourIndex;