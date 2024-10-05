import "./App.css";
import "./index.css";
import { Folders } from "./Mycomponents/Folders";
import EditablePreview from "./Mycomponents/EditablePreview";
import { Tags } from "./Mycomponents/tags.tsx";

function App() {
	return (
		<>
			<div className="container mx-auto flex h-[380px] w-[380px] items-center justify-center rounded-lg">
				<div className="flex flex-col">
					<Folders />
					<EditablePreview initialText="Your initial text here" />
					<Tags />
				</div>
			</div>
		</>
	);
}
export default App;
