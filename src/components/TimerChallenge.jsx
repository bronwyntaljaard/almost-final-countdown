import { useState } from "react";
import { useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
	const timer = useRef();
	const dialog = useRef();

	const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

	const TimerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

	// Timer stops because user lost
	if (timeRemaining <= 0) {
		clearInterval(timer.current);

		dialog.current.open();
	}

	function handleReset() {
		setTimeRemaining(targetTime * 1000);
	}

	function handleStart() {
		timer.current = setInterval(() => {
			setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
		}, 10);
	}

	// User manually stops timer
	function handleStop() {
		clearInterval(timer.current);
		dialog.current.open();
	}

	return (
		<>
			{
				<ResultModal
					ref={dialog}
					targetTime={targetTime}
					remainingTime={timeRemaining}
					onReset={handleReset}
				/>
			}
			<section className="challenge">
				<h2>{title}</h2>
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 ? "s" : ""}
				</p>
				<p>
					<button onClick={TimerIsActive ? handleStop : handleStart}>
						{TimerIsActive ? "Stop" : "Start"} Challenge
					</button>
				</p>
				<p className={TimerIsActive ? "active" : undefined}>
					{TimerIsActive ? "Timer is running" : "Timer is inactive"}
				</p>
			</section>
		</>
	);
}
