import React from "react"

export const Love = ({onClick = () => null}) => (<span onClick={onClick} className="love" role="img" data-lable="love" aria-labelledby="love">😍️</span>);
export default Love;