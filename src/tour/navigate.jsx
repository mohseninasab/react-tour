import React from "react";


export const Navigate = (props = {}) => {

	const { onWheel = () => {}, steps = [], handleStep, currentStep = 0, content = ""} = props;
	const width = (steps.length - 1) * 16 + 24;

	return (	
		<div onWheel={onWheel} className="tour__nave_root">
			<div className="tour__content_box"> {content}</div>
			<div style={{ width }} className="tour__nave_container" >{
				steps.map((item, index) => (
					<div
						key={index}
						onClick={() => handleStep(index)}
						className={`${index === currentStep && "tour__nav_Selected"} tour__nave_steps`}
					/>
				))
			}
			</div>
		</div>
	)
}
export default Navigate;
