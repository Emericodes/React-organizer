import { useState } from "react";
import Settings_Logo from "../assets/images/settings.png";
import "./Settings.css";

interface SettingsProps {
	currentClockMode: "digital" | "analog";
	setClockMode: (mode: "digital" | "analog") => void;

	currentTextColor: string;
	setClockTextColor: (color: string) => void;

	currentBgColor: string;
	setClockBgColor: (color: string) => void;

	currentPosition: string;
	setClockPosition: (pos: string) => void;
}
function Settings(props: SettingsProps) {
	const [openSettingsMenu, setOpenSettingsMenu] = useState(false);
	const [currentMenu, setCurrentMenu] = useState("main");
	const toggleMode = () => {
		if (props.currentClockMode === "digital") {
			props.setClockMode("analog");
		} else {
			props.setClockMode("digital");
		}
	};

	return (
		<section className="settings-style">
			<button
				type="button"
				onClick={() => setOpenSettingsMenu(!openSettingsMenu)}
			>
				<img
					className="settings-logo"
					src={Settings_Logo}
					alt="settings logo"
				/>
			</button>

			{openSettingsMenu && (
				<div className="settings-open">
					{currentMenu === "main" && (
						<ul>
							<li>Mon profil</li>
							<li>
								<button type="button" onClick={() => setCurrentMenu("clock")}>
									Personnaliser Horloge &gt;
								</button>
							</li>
						</ul>
					)}
					{currentMenu === "clock" && (
						<div className="submenu">
							<button
								type="button"
								className="back-btn"
								onClick={() => setCurrentMenu("main")}
							>
								&lt; Retour
							</button>
							<div className="setting-item">
								<span>Mode :</span>
								<button type="button" onClick={toggleMode}>
									{props.currentClockMode === "digital"
										? "Numérique"
										: "Aiguilles"}
								</button>
							</div>
							<div className="setting-item">
								<span>Chiffres :</span>
								<input
									type="color"
									value={props.currentTextColor}
									onChange={(e) => props.setClockTextColor(e.target.value)}
								/>
							</div>
							<div className="setting-item">
								<span>Fond :</span>
								<input
									type="color"
									value={props.currentBgColor}
									onChange={(e) => props.setClockBgColor(e.target.value)}
								/>
							</div>

							<div className="setting-item">
								<span>Position :</span>
								<div className="position-buttons">
									<button
										type="button"
										onClick={() => props.setClockPosition("top-left")}
									>
										Gauche
									</button>
									<button
										type="button"
										onClick={() => props.setClockPosition("center")}
									>
										Centre
									</button>
									<button
										type="button"
										onClick={() => props.setClockPosition("top-right")}
									>
										Droite
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</section>
	);
}

export default Settings;
