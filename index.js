// import {Timer} from './timer';

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const progressCircle = document.querySelector('#progress');

// Calculating value of stroke-dasharray attribute of svg. Divides the stroke/border into dashes, each of length = stroke-dasharray. if this is set as the perimeter, it occupies the full circle.
const PERIMETER = 2 * Math.PI * progressCircle.getAttribute('r');
progressCircle.setAttribute('stroke-dasharray', PERIMETER);

let duration;
let currentOffset = 0;
// const timer = new Timer(durationInput, startButton, pauseButton); without callbacks
const timer = new Timer(durationInput, startButton, pauseButton, {
	onStart(totalDuration) {
		if(!duration){
			duration = totalDuration;
		}
		console.log('Timer started');
	},
	// Calculates the offset and sets stroke-dashoffset accordingly. The stroke-dashoffset value moves from 0 --> -PERIMETER as the time ticks down
	onTick(timeRemaining) {
		currentOffset = (PERIMETER * timeRemaining/duration) - PERIMETER;
		progressCircle.setAttribute('stroke-dashoffset', currentOffset);
	},
	onComplete() {
		console.log('Timer is completed');
	}, 
	// Reset the duration and clear the offset when the user changes the duration
	onChange(totalDuration) {
		duration = totalDuration;
		currentOffset = 0;
		progressCircle.setAttribute('stroke-dashoffset', currentOffset);
	}
});