import React, { useState, useEffect } from "react";
import Navigate from "./navigate";
import CloseButton from "./closebutton";
import "./index.css";

export const Tour = (props = {}) => {
	const root = document.querySelector(props?.root || "html") || document.querySelector("html");
	const html = document.querySelector("html");

	const { steps = [] } = props
	const [width, setWidth] = useState(window.innerWidth)
	const [height, setHeight] = useState(window.innerHeight)
	const [elements, setElements] = useState([])
	const [index, setIndex] = useState(props.defaultStep ? props.defaultStep : 0)
	const [scroll, setScroll] = useState(0)

	useEffect(() => { setElements(steps); },[steps]);
	
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
		if(index + 1 === elements.length && props.closeOnEnd) handleClose()
	}

	const handleBack = () => {
		addTransition()
		const nextIndex = index > 0 ? index - 1 : elements.length - 1 
		handleStep(nextIndex)
	}

	const getPosition = () => {
		const element = document.querySelector(elements[index]?.target);
		return element?.getBoundingClientRect()
	}

	const handleClose = () => {
		props.handleClose && props.handleClose()
	}

	const handleScreenClick = (event) => {
		const {name} = event.target?.dataset;
		const element = elements[index];

		if(name === "highlighter" || element.clickAnywhere) {
			if(element?.action) {
				const nextMove = element.action(document.querySelector(element?.target));
				if(nextMove === true || nextMove === undefined){
					handleNext();
				} else if(nextMove === false){
					setIndex(index)
				} else if(nextMove >= 0 && nextMove < elements.length){
					setIndex(nextMove);
				} else if( typeof nextMove === 'object'){
					const { timeout = 200 } = nextMove
					setTimeout( () => handleNext(), timeout)
				} else {
					console.error(`the return should be a number of boolean but you returning "${nextMove}"`);
				}
				
			} else {
				handleNext();
			}
		} else if(name === "highlighter" && element.clickHighlight){
			if(element?.action) {
				const nextMove = element.action(document.querySelector(element?.target));
				if(nextMove === true || nextMove === undefined){
					handleNext();
				} else if(nextMove === false){
					setIndex(index)
				} else if(nextMove >= 0 && nextMove < elements.length){
					setIndex(nextMove);
				} else if( typeof nextMove === 'object'){
					const { timeout = 200 } = nextMove
					setTimeout( () => handleNext(), timeout)
				} else {
					console.error(`the return should be a number of boolean but you returning "${nextMove}"`);
				}
				
			} else {
				handleNext();
			}
		}
		else if(!element.clickHighlight) {
			handleNext();
		}
	}

	const justifyHand = (x, y) => width - x < 200 ? {transform: "rotateY(180deg)", right: "90%", left: "auto"} : {};

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
		<>
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
							<div style={justifyHand(position.x, position.y)} className="tour__hand"/>
						</div>
						
					</React.Fragment>
					:
					null
				}
	 		</div>
	 		<Navigate onWheel={handleScroll} content={content} steps={steps} currentStep={index} handleStep={handleStep}/>

			 </>
	)
}

export default Tour;