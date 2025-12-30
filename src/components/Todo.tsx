import { type ChangeEvent, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { FaFont, FaListUl, FaPlus, FaTrash } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import "./Todo.css";

interface TodoItem {
	id: number;
	text: string;
	done: boolean;
}

interface PostItData {
	id: number;
	type: "text" | "list";
	content: string | TodoItem[];
	color: string;
	x: number;
	y: number;
}

interface DraggablePosition {
	x: number;
	y: number;
}

interface PostItProps {
	data: PostItData;
	onDelete: (id: number) => void;
	onStop: (id: number, data: DraggablePosition) => void;
	onToggle: (postItId: number, itemId: number) => void;
}

function PostIt(props: PostItProps) {
	const data = props.data;
	const onDelete = props.onDelete;
	const onStop = props.onStop;
	const onToggle = props.onToggle;

	const nodeRef = useRef(null);

	const renderContent = () => {
		if (data.type === "text") {
			return <p className="text-content">{data.content as string}</p>;
		} else {
			const listeDeTaches = data.content as TodoItem[];

			return (
				<ul className="todo-list-content">
					{listeDeTaches.map((item) => {
						return (
							<li key={item.id}>
								<button
									type="button"
									onClick={() => onToggle(data.id, item.id)}
									className={item.done ? "done" : ""}
								>
									{item.done === true ? (
										<MdCheckBox />
									) : (
										<MdCheckBoxOutlineBlank />
									)}
									<span>{item.text}</span>
								</button>
							</li>
						);
					})}
				</ul>
			);
		}
	};

	return (
		<Draggable
			nodeRef={nodeRef}
			defaultPosition={{ x: data.x, y: data.y }}
			onStop={(_e, position) => onStop(data.id, position)}
			bounds="parent"
		>
			<div ref={nodeRef} className={`post-it ${data.color}`}>
				<div className="post-it-content">{renderContent()}</div>

				<button
					type="button"
					className="delete-btn"
					onClick={() => onDelete(data.id)}
				>
					<FaTrash />
				</button>
			</div>
		</Draggable>
	);
}

function Todo() {
	const [list, setList] = useState<PostItData[]>(() => {
		const saved = localStorage.getItem("my-memos");
		if (saved) {
			return JSON.parse(saved);
		} else {
			return [];
		}
	});

	const [inputText, setInputText] = useState<string>("");
	const [selectedColor, setSelectedColor] = useState<string>("yellow");
	const [mode, setMode] = useState<"text" | "list">("text");
	useEffect(() => {
		localStorage.setItem("my-memos", JSON.stringify(list));
	}, [list]);

	const updateInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setInputText(event.target.value);
	};
	const addPostIt = () => {
		if (inputText.trim() === "") {
			return;
		}
		const randomX = Math.floor(Math.random() * 200);
		const randomY = Math.floor(Math.random() * 100);

		let contenuDuPostIt: string | TodoItem[];

		if (mode === "list") {
			const lignes = inputText.split("\n");
			const lignesNonVides = lignes.filter((line) => line.trim() !== "");
			const tableauDeTaches = lignesNonVides.map((line, index) => {
				return {
					id: index,
					text: line,
					done: false,
				};
			});

			contenuDuPostIt = tableauDeTaches;
		} else {
			contenuDuPostIt = inputText;
		}

		const newPostIt: PostItData = {
			id: Date.now(),
			type: mode,
			content: contenuDuPostIt,
			color: selectedColor,
			x: randomX,
			y: randomY,
		};
		const nouvelleListe = [...list, newPostIt];
		setList(nouvelleListe);
		setInputText("");
	};

	const deleteTask = (idToDelete: number) => {
		const nouvelleListe = list.filter((task) => {
			return task.id !== idToDelete;
		});
		setList(nouvelleListe);
	};

	const updatePosition = (id: number, position: DraggablePosition) => {
		const nouvelleListe = list.map((item) => {
			if (item.id === id) {
				return { ...item, x: position.x, y: position.y };
			} else {
				return item;
			}
		});
		setList(nouvelleListe);
	};
	const toggleTodoItem = (postItId: number, itemId: number) => {
		const nouvelleListe = list.map((postIt) => {
			if (postIt.id === postItId && postIt.type === "list") {
				const contenuActuel = postIt.content as TodoItem[];
				const nouveauContenu = contenuActuel.map((item) => {
					if (item.id === itemId) {
						return { ...item, done: !item.done };
					} else {
						return item;
					}
				});
				return { ...postIt, content: nouveauContenu };
			}
			return postIt;
		});

		setList(nouvelleListe);
	};

	return (
		<div className="todo-container">
			<div className="input-area">
				<textarea
					value={inputText}
					placeholder={
						mode === "list"
							? "Liste : une tâche par ligne..."
							: "Écrire un mémo..."
					}
					onChange={updateInput}
					className="input-text"
				/>

				<div className="controls-group">
					<div className="mode-switcher">
						<button
							type="button"
							className={`mode-btn ${mode === "text" ? "active" : ""}`}
							onClick={() => setMode("text")}
							title="Mode Texte"
						>
							<FaFont />
						</button>
						<button
							type="button"
							className={`mode-btn ${mode === "list" ? "active" : ""}`}
							onClick={() => setMode("list")}
							title="Mode Liste à cocher"
						>
							<FaListUl />
						</button>
					</div>

					<div className="color-picker">
						<button
							type="button"
							className={`color-circle yellow ${selectedColor === "yellow" ? "active" : ""}`}
							onClick={() => setSelectedColor("yellow")}
						/>
						<button
							type="button"
							className={`color-circle cyan ${selectedColor === "cyan" ? "active" : ""}`}
							onClick={() => setSelectedColor("cyan")}
						/>
						<button
							type="button"
							className={`color-circle salmon ${selectedColor === "salmon" ? "active" : ""}`}
							onClick={() => setSelectedColor("salmon")}
						/>
					</div>

					<button type="button" onClick={addPostIt} className="add-btn">
						<FaPlus />
					</button>
				</div>
			</div>
			<div className="board-area">
				{list.map((data) => {
					return (
						<PostIt
							key={data.id}
							data={data}
							onDelete={deleteTask}
							onStop={updatePosition}
							onToggle={toggleTodoItem}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Todo;
