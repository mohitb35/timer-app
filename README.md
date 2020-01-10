# timer-app
Simple timer app with
1. User-entered duration
2. Start and pause functionality
3. Animated circular progress chart using SVG

Builds on the Timer App shown in [The New Modern Javascript Bootcamp Course (2020) - Colt Steele/Stephen Grider] (https://www.udemy.com/course/javascript-beginners-complete-tutorial/) with the following 
1. If timer is paused, it will restart from the point it was paused (including the progress chart)
2. Resolved a bug which allowed the user to click Start multiple times, which stopped Pause from working correctly
3. Prevent the user from changing the timer duration while it is running