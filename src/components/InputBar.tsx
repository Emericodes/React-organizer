import { type ChangeEvent, type KeyboardEvent, useState } from "react";

function InputBar() {
	const [inputText, setInputText] = useState<string>("");

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputText(event.target.value);
	};

	const updateList = () => {
		if (inputText.trim() === "") return;
		const newTodo = {
			id: Date.now(),
			text: inputText.trim(),
		};
		setList([...list, newTodo]);
		setInputText("");
	};

	const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			updateList();
		}
	};

	return (
		<>
			<input
				type="text"
				value={inputText}
				placeholder="Ajoute ton mémo ici..."
				onChange={handleInputChange}
				onKeyDown={handleKeyPress}
			/>
			<button type="button" onClick={updateList}>
				Ajouter
			</button>
		</>
	);
}
export default InputBar;
