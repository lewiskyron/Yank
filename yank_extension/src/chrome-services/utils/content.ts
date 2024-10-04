import {
	COLOR_PICKER_ID,
	HIGHLIGHTER_IMAGE_PATH,
	DEFAULT_HIGHLIGHT_COLOR,
} from "./constants";
interface HighlightedText {
	text: string;
	color: string;
}

const allHighlightedText: HighlightedText[] = [];
type ColorPickerElement = HTMLImageElement;

function createColorPicker(): ColorPickerElement {
	const penIcon: ColorPickerElement = document.createElement("img");
	const imagePath: string = chrome.runtime.getURL(HIGHLIGHTER_IMAGE_PATH);
	penIcon.src = imagePath;
	penIcon.style.width = "30px";
	penIcon.style.height = "30px";
	penIcon.style.position = "absolute";
	penIcon.style.cursor = "pointer";
	penIcon.id = COLOR_PICKER_ID;
	penIcon.style.display = "none";
	penIcon.style.zIndex = "1000";
	penIcon.onclick = (e: MouseEvent) => {
		e.stopImmediatePropagation();
		applyHighlight();
		hideColorPicker();
	};
	console.log("Pen Icon created");
	return penIcon;
}

document.body.appendChild(createColorPicker());

function getColorPicker(): ColorPickerElement | null {
	return document.getElementById(COLOR_PICKER_ID) as ColorPickerElement | null;
}

function showColorPicker(x: number, y: number): void {
	const colorPicker = getColorPicker();
	if (colorPicker) {
		colorPicker.style.display = "inline-block";
		colorPicker.style.left = `${x}px`;
		colorPicker.style.top = `${y}px`;
		console.log("Pen icon shown");
	}
}

function hideColorPicker(): void {
	const colorPicker = getColorPicker();
	if (colorPicker) {
		colorPicker.style.display = "none";
		console.log("Pen Icon hidden");
	}
}

function applyHighlight(): void {
	const selection = window.getSelection();
	if (selection && !selection.isCollapsed) {
		const range = selection.getRangeAt(0);
		const contents = range.extractContents();

		const highlightWrapper = document.createElement("span");
		highlightWrapper.style.backgroundColor = DEFAULT_HIGHLIGHT_COLOR;

		contents.childNodes.forEach((node: Node) => {
			console.log("Node type:", node.nodeType);
			if (node.nodeType === Node.TEXT_NODE) {
				console.log("Processing a text node:", node.textContent);
				const span = document.createElement("span");
				span.style.backgroundColor = DEFAULT_HIGHLIGHT_COLOR;
				span.textContent = node.textContent;
				highlightWrapper.appendChild(span);
				console.log("Text node wrapped and appended to the highlight wrapper.");
			} else {
				console.log("Processing a non-text node, cloning and appending.");
				highlightWrapper.appendChild(node.cloneNode(true));
				console.log(
					"Non-text node cloned and appended to the highlight wrapper.",
				);
			}
		});

		console.log("Highlighting process completed.");

		range.insertNode(highlightWrapper);
		console.log("Applying highlight:", highlightWrapper);

		if (highlightWrapper.textContent) {
			allHighlightedText.push({
				text: highlightWrapper.textContent,
				color: DEFAULT_HIGHLIGHT_COLOR,
			});
		}
		hideColorPicker();
	}
}

document.addEventListener("mouseup", (e: MouseEvent) => {
	const selection = window.getSelection();
	if (selection && !selection.isCollapsed) {
		const selectedText = selection.toString();
		console.log("Selected text:", selectedText);
		const getRange = selection.getRangeAt(0);
		const rect = getRange.getBoundingClientRect();
		const adjustedRect = {
			top: rect.top + window.scrollY,
			left: rect.left + window.scrollX,
			bottom: rect.bottom + window.scrollY,
			right: rect.right + window.scrollX,
			width: rect.width,
			height: rect.height,
		};
		showColorPicker(adjustedRect.right, adjustedRect.top);
		e.stopImmediatePropagation();
	}
});
