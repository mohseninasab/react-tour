import React, { useState, useEffect } from "react";
import Navigate from "./navigate";
import CloseButton from "./closebutton";
import hand from "./hand_gray.svg"
import "./index.css"

export const Tour = (props = {}) => {
	const root = document.querySelector(props?.root || "html") || document.querySelector("html");
	const html = document.querySelector("html");

	const { steps = [] } = props
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)
	const [elements, setElements] = useState([])
	const [index, setIndex] = useState(0)
	const [scroll, setScroll] = useState(0)

	useEffect(() => {
		const elements = steps.map(item => ({
			...item,
			target: document.querySelector(item.target),
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
		if(ele) ele.style.removeProperty("transition")
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
		const {width, height} = html.getBoundingClientRect();
		setHeight(height)
		setWidth(width)
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

	const getPosition = () => {
		return elements[index]?.target?.getBoundingClientRect()
	}

	const handleClose = () => {
		const { handleClose = () => {} } = props;
		handleClose()
	}

	const handleScreenClick = (event) => {
		const {name} = event.target?.dataset;
		const element = elements[index];

		if(name === "highlighter") {
			if(element?.action) {
				const nextMove = element.action();
				if(nextMove === true || nextMove === undefined){
					handleNext();
				} else if(nextMove === false){
					setIndex(index)
				} else if(nextMove >= 0 && nextMove < elements.length){
					setIndex(nextMove);
				} else {
					console.error(`the return should be a number of boolean but you returning "${nextMove}"`);
				}
				
			} else {
				handleNext();
			}
		} else {
			handleNext();
		}
		
	}

	const handleKeyPress = (event) => {
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

	const position = getPosition(scroll);
	const content = elements[index]?.content;
	const ele = elements[index];
	
	return (
		<React.Fragment>
			<CloseButton onClose={handleClose}/>
			 <div
			 	ref={(input) => { input && input.focus()}}
			 	tabIndex="0"
				style={{ width, height}} 
				className="tour__background"
				onClick={handleScreenClick}
				onWheel={handleScroll}
				onKeyDown={handleKeyPress}
				
			>
				{ position?.width !== undefined ?
					<React.Fragment> 
						<div
							className="tour__selector"
							data-name="highlighter"
							id="tour__highlighter"
							style={{
								...ele?.style,
								width: position?.width + 10,
								height: position?.height + 10,
								top: position?.y - 5,
								left: position?.x - 5
							}}
						>
							<img className="tour__hand" src={hand} alt="pointer"/>
						</div>
						
					</React.Fragment>
					:
					null
				}
	 		</div>
	 		<Navigate onWheel={handleScroll} content={content} steps={steps} currentStep={index} handleStep={handleStep}/>

		</React.Fragment>
	)
}

export default Tour;