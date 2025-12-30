import { useState } from "react";
import Clock from "./components/Clock";
import Settings from "./components/Settings";
import Todo from "./components/Todo";
import "./App.css";

function App() {
	const [clockMode, setClockMode] = useState<"digital" | "analog">("digital");
	const [clockTextColor, setClockTextColor] = useState("#000000");
	const [clockBgColor, setClockBgColor] = useState("rgba(255, 255, 255, 0.8)");
	const [clockPosition, setClockPosition] = useState("top-right");

	return (
		<main className="app-container">
			<h1>Mon Organisateur</h1>

			<Clock
				mode={clockMode}
				textColor={clockTextColor}
				bgColor={clockBgColor}
				position={clockPosition}
			/>

			<Todo />
			<Settings
				currentClockMode={clockMode}
				setClockMode={setClockMode}
				currentTextColor={clockTextColor}
				setClockTextColor={setClockTextColor}
				currentBgColor={clockBgColor}
				setClockBgColor={setClockBgColor}
				currentPosition={clockPosition}
				setClockPosition={setClockPosition}
			/>
		</main>
	);
}

export default App;
