import { useEffect, useState } from "react";
import "./Clock.css";

interface ClockProps {
	mode: "digital" | "analog";
	textColor: string;
	bgColor: string;
	position: string;
}

function Clock(props: ClockProps) {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timerID = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(timerID);
	}, []);

	const seconds = time.getSeconds();
	const minutes = time.getMinutes();
	const hours = time.getHours();
	const secRotation = seconds * 6;
	const minRotation = minutes * 6 + seconds * 0.1;
	const hourRotation = (hours % 12) * 30 + minutes * 0.5;
	const customStyle = {
		color: props.textColor,
		backgroundColor: props.bgColor,
		borderColor: props.textColor,
	};

	return (
		<div className={`clock-container pos-${props.position}`}>
			{props.mode === "digital" ? (
				<div className="clock-digital-style" style={customStyle}>
					{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
				</div>
			) : (
				<div className="clock-face" style={customStyle}>
					<div
						className="hand hour-hand"
						style={{
							transform: `rotate(${hourRotation}deg)`,
							background: props.textColor,
						}}
					></div>
					<div
						className="hand min-hand"
						style={{
							transform: `rotate(${minRotation}deg)`,
							background: props.textColor,
						}}
					></div>
					<div
						className="hand sec-hand"
						style={{ transform: `rotate(${secRotation}deg)` }}
					></div>
					<div
						className="center-dot"
						style={{ background: props.textColor }}
					></div>

					{[12, 3, 6, 9].map((num) => (
						<span
							key={num}
							className={`num num-${num}`}
							style={{ color: props.textColor }}
						>
							{num}
						</span>
					))}
				</div>
			)}
		</div>
	);
}

export default Clock;
