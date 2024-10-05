import { Folders } from "./Folders.tsx";
import EditablePreview from "./EditablePreview.tsx";
import { Tags } from "./tags.tsx";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
	return (
		<div className="flex flex-col">
			<Folders />
			<EditablePreview initialText="Your initial text here" />
			<Tags />
			<Button className="mt-2 text-white">Save</Button>
		</div>
	);
};

export default Home;
