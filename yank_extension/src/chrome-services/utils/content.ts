import {
	COLOR_PICKER_ID,
	HIGHLIGHTER_IMAGE_PATH,
	DEFAULT_HIGHLIGHT_COLOR,
} from "./constants";

interface HighlightedText {
	text: string;
	color: string;
}

let highlightedText: HighlightedText | null = null;
type ColorPickerElement = HTMLImageElement;

chrome.storage.sync.get("isHighlighterEnabled", (result) => {
	const isEnabled = result.isHighlighterEnabled;
	if (isEnabled) {
		enableHighlighter();
	} else {
		disableHighlighter();
	}
});

// Listen for changes to the highlighter state
chrome.storage.onChanged.addListener((changes, areaName) => {
	if (areaName === "sync" && changes.isHighlighterEnabled) {
		const newValue = changes.isHighlighterEnabled.newValue;
		if (newValue) {
			enableHighlighter();
		} else {
			disableHighlighter();
		}
	}
});

function enableHighlighter(): void {
	document.addEventListener("mouseup", handleMouseUp);
}

function disableHighlighter(): void {
	document.removeEventListener("mouseup", handleMouseUp);
	hideColorPicker();
}

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
	}
}

function hideColorPicker(): void {
	const colorPicker = getColorPicker();
	if (colorPicker) {
		colorPicker.style.display = "none";
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
			if (node.nodeType === Node.TEXT_NODE) {
				const span = document.createElement("span");
				span.style.backgroundColor = DEFAULT_HIGHLIGHT_COLOR;
				span.textContent = node.textContent;
				highlightWrapper.appendChild(span);
			} else {
				highlightWrapper.appendChild(node.cloneNode(true));
			}
		});

		range.insertNode(highlightWrapper);

		if (highlightWrapper.textContent) {
			highlightedText = {
				text: highlightWrapper.textContent,
				color: DEFAULT_HIGHLIGHT_COLOR,
			};

			chrome.runtime.sendMessage({
				action: "storeHighlightedText",
				data: highlightedText,
			});
		}
		hideColorPicker();
	}
}

function handleMouseUp(e: MouseEvent): void {
	const selection = window.getSelection();
	if (selection && !selection.isCollapsed) {
		const range = selection.getRangeAt(0);
		const rect = range.getBoundingClientRect();
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
}
