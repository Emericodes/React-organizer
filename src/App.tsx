import { useState } from "react";
import Clock from "./components/Clock";
import Todo from "./components/Todo";
import Settings from "./components/Settings";
import "./App.css";

function App() {
	const [clockMode, setClockMode] = useState<"digital" | "analog">("digital"); // Default to digital
	const [clockTextColor, setClockTextColor] = useState("#000000"); // Default text color
	const [clockBgColor, setClockBgColor] = useState("rgba(255, 255, 255, 0.8)"); // Default background color
	const [clockPosition, setClockPosition] = useState("top-right"); // Default position

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
