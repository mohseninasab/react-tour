import React, { useState, useEffect } from "react";
import Navigate from "./navigate";
import "./index.css"
import hand from "./hand_gray.svg"

export const Tour = (props = {}) => {
	const root = document.querySelector(props?.root || "html")
	const { steps = [] } = props
	const [width, setWidth] = useState(root?.offsetWidth)
	const [height, setHeight] = useState(root?.offsetHeight)
	const [elements, setElements] = useState([])
	const [index, setIndex] = useState(0)
	const [scroll, setScroll] = useState(0)

	useEffect(() => {
		const elements = steps.map(item => ({
			target: document.querySelector(item.target),
			content: item.content,
		}));
		
		setElements(elements);
	},[steps]);

	useEffect(() => {
		document.addEventListener("scroll", handleScroll);
		document.addEventListener("resize", handleResize);

		return function cleanEventListeners(){
			document.removeEventListener("scroll", handleScroll);
			document.removeEventListener("resize", handleResize);
		}
	})

	const handleResize = () => {
		setWidth(root?.offsetWidth);
		setHeight(root?.offsetHeight);
	}

	const handleScroll = () => {
		const ele = document.getElementById("tour__highlighter");
		if(ele) {
			ele.style.transition = "none";
			setScroll(root?.scrollTop);
		}
	}

	const handleStep = (index) => {
		const ele = document.getElementById("tour__highlighter");
		ele.style.transition = "all 100ms linear";
		setIndex(index);
	}

	const getPostion = () => {
		return elements[index]?.target?.getBoundingClientRect()
	}
	const postion = getPostion(scroll)
	const content = elements[index]?.content;
	return (
		<React.Fragment>
		 	<div  style={{ width, height}} className="tour__background" >
				{postion?.width &&
					<React.Fragment> 
						<div
							className="tour__selector"
							id="tour__highlighter"
							style={{
								width: postion?.width + 10,
								height: postion?.height + 10,
								top: postion?.y - 5,
								left: postion?.x - 5
							}}
						>
							<img className="tour__hand" src={hand} alt="pointer"/>
						</div>
						
					</React.Fragment>
				}
	 		</div>
	 		<Navigate content={content} steps={steps} currentStep={index} handleStep={handleStep}/>

		</React.Fragment>
	)
}

export default Tour;