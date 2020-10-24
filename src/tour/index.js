import React from "react";
import Tour from "./tour.jsx"

export const TourIndex = (props = {}) => {
    return props.open ? <Tour {...props} /> :  null; 
}

export const invokeAfterRender = () => new Promise((resolve, reject) => {
    window.requestAnimationFrame((frame) => {
        if(frame){
            resolve(frame)
        } else {
            reject()
        }
    })
})

export default TourIndex;