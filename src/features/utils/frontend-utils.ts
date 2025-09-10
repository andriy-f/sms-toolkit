/**
 * Function to copy text to clipboard with fallback for older browsers.
 * @param text The text to copy to the clipboard.
 */
export const copyToClipboard = async (text: string): Promise<void> => {
	if (navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			console.error('Failed to copy text to clipboard in standard way:', err);
			copyToClipboardFallback(text);
		}
	} else {
		copyToClipboardFallback(text);
	}
}

/**
 * Fallback function for copying text to clipboard in older browsers.
 * @param text The text to copy to the clipboard.
 */
export const copyToClipboardFallback = (text: string) => {
	const textarea = document.createElement('textarea');
	textarea.value = text;
	// Avoid scrolling to bottom
	textarea.style.top = "0";
	textarea.style.left = "0";

	textarea.style.position = 'fixed';
	textarea.style.opacity = '0';
	document.body.appendChild(textarea);
	textarea.focus();
	textarea.select();
	try {
		const successful = document.execCommand('copy');
		if (!successful) {
			console.error('Fallback: Copy command was unsuccessful');
		}
	} finally {
		document.body.removeChild(textarea);
	}
}