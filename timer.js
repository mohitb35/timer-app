class Timer {
	// durationInput, startButton, pauseButton are elements
	constructor(durationInput, startButton, pauseButton, callbacks){
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;

		if(callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
			this.onChange = callbacks.onChange;
		}

		// add event listeners
		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
		this.durationInput.addEventListener('input', this.onDurationChange);
	}

	start = () => {
		if(this.onStart) {
			this.onStart(this.timeRemaining);	
		}
		// Prevents the start button from being clicked again (and starting a new interval, which makes it impossible to pause the timer). Also enables pause button on starting, and prevents user from changing the duration (while timer is running)
		this.startButton.disabled = true;
		this.pauseButton.disabled = false;
		this.durationInput.disabled = true; 
		this.tick();
		this.intervalId = setInterval(this.tick, 10);
	}

	pause = () => {
		// Prevents the pasue button from being clicked again, when the timer is already paused. Also enables start button on pausing, and allows user to change the duration (while timer is paused)
		this.startButton.disabled = false;
		this.pauseButton.disabled = true;
		this.durationInput.disabled = false;
		clearInterval(this.intervalId);
		this.intervalId = null;
	} 

	// Trigger to reset the state of the progress indicator once the user changes duration.
	onDurationChange = () => {
		this.onChange(this.timeRemaining);
	}

	tick = () =>   {
		/* My way
		this.durationInput.value--;
		*/
		/* Stephen way 1 
		const timeRemaining = parseFloat(this.durationInput.value);
		this.durationInput.value = timeRemaining - 1; */
		// Way 2 - Using getters and setters
		/* const timeRemaining = this.timeRemaining;
		this.timeRemaining = timeRemaining - 1; */
			// Can condense the above to 
		// this.timeRemaining = this.timeRemaining - 1;
		if(this.durationInput.value <= 0){
			if(this.onComplete) {
				this.onComplete();	
			}
			this.durationInput.disabled = false; //user can enter duration once the timer completes
			this.pause();
		} else {
			this.timeRemaining -= 0.01;
			if(this.onTick) {
				this.onTick(this.timeRemaining);	
			}
		}
	}

	// Getter. Used for retrieval
	get timeRemaining(){
		return parseFloat(this.durationInput.value);
	}

	// Setter. Used for assignment
	set timeRemaining(time){
		this.durationInput.value = time.toFixed(2);
	}
}

