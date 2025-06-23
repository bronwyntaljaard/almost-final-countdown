import { useState } from "react";
import { useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
	const timer = useRef();
	const dialog = useRef();

	const [timerStarted, setTimerStarted] = useState(false);
	const [timerExpired, setTimerExpired] = useState(false);

	function handleStart() {
		setTimerStarted(true);

		timer.current = setTimeout(() => {
			setTimerExpired(true);
			dialog.current.showModal();
		}, targetTime * 1000);
	}

	function handleStop() {
		clearTimeout(timer.current);
	}

	return (
		<>
			{<ResultModal ref={dialog} targetTime={targetTime} result="lost" />}
			<section className="challenge">
				<h2>{title}</h2>
				<p className="challenge-time">
					{targetTime} second{targetTime > 1 ? "s" : ""}
				</p>
				<p>
					<button onClick={timerStarted ? handleStop : handleStart}>
						{timerStarted ? "Stop" : "Start"} Challenge
					</button>
				</p>
				<p className={timerStarted ? "active" : undefined}>
					{timerStarted ? "Timer is running" : "Timer is inactive"}
				</p>
			</section>
		</>
	);
}
