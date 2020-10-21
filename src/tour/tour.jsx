import React, { useState, useEffect } from "react";
import Navigate from "./navigate";
import "./index.css"
import hand from "./hand_gray.svg"

export const Tour = (props = {}) => {
	const root = document.querySelector(props?.root || "html") || document.querySelector("html");
	const html = document.querySelector("html");
	const position = html.getBoundingClientRect();

	const { steps = [] } = props
	const [width, setWidth] = useState(position?.width)
	const [height, setHeight] = useState(position?.height)
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
		window.addEventListener("resize", handleResize);

		return function cleanEventListeners(){
			document.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleResize);
		}
	});

	const removeTransition = () => {
		const ele = document.getElementById("tour__highlighter");
		if(ele) ele.style.transition = "none";
	}

	const addTransition = () => {
		const ele = document.getElementById("tour__highlighter");
		if(ele) ele.style.transition = "all 100ms linear";
	}

	const handleResize = () => {
		removeTransition()
		const { width, height } = html.getBoundingClientRect();
		setWidth(width);
		setHeight(height);
	}

	const handleScroll = (event) => {
		removeTransition()
		root.scrollTop += event.deltaY
		setScroll(root?.scrollTop);
	}


	const handleStep = (index) => {
		addTransition()
		setIndex(index);
	}

	const handleNext = () => {
		addTransition()
		handleStep((index + 1) % (elements.length))
	}

	const handleBack = () => {
		addTransition()
		const nextIndex = index > 0 ? index - 1 : elements.length - 1 
		handleStep(nextIndex)
	}

	const getPostion = () => {
		return elements[index]?.target?.getBoundingClientRect()
	}

	const handleKeyPress = (event) => {
		const { handleClose = () => {} } = props;
		switch(event.keyCode){
			case 27:
				handleClose();
				break;
			case 8:
				handleBack();
				break;
			case 37:
				handleBack();
				break;
			case 38:
				handleBack();
				break;
			case 39:
				handleNext();
				break;
			case 40:
				handleNext();
				break;
			case 32:
				handleNext();
				break;
			case 13:
				handleNext();
				break;
			default:
				break
		}
	}

	const postion = getPostion(scroll)
	const content = elements[index]?.content;

	return (
		<React.Fragment>
			 <div 
			 	tabIndex="0"
				style={{ width, height}} 
				className="tour__background"
				onClick={handleNext}
				onWheel={handleScroll}
				onKeyDown={handleKeyPress}
				
			>
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
	 		<Navigate onWheel={handleScroll} content={content} steps={steps} currentStep={index} handleStep={handleStep}/>

		</React.Fragment>
	)
}

export default Tour;