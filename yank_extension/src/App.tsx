import "./App.css";
import "./index.css";
import { Folders } from "./Mycomponents/Folders";
import EditablePreview from "./Mycomponents/EditablePreview";

function App() {
	return (
		<>
			<div className="bg-skin-fill container mx-auto h-[420px] w-[380px]">
				<Folders />
				<EditablePreview initialText="Your initial text here" />
			</div>
		</>
	);
}
export default App;
