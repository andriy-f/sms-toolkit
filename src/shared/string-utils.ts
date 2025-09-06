export const splitIntoLines = (text: string): string[] => {
	return text.split(/\r?\n/);
};

export const trimLines = (lines: string[]): string[] => {
	return lines.map(line => line.trim());
};

export const filterEmptyLines = (lines: string[]): string[] => {
	return lines.filter(line => line.length > 0);
};

export const groupLinesByPattern = (lines: string[], pattern: RegExp): { matches: string[]; nonMatches: string[] } => {
	const matches: string[] = [];
	const nonMatches: string[] = [];

	lines.forEach(line => {
		if (pattern.test(line)) {
			matches.push(line);
		} else {
			nonMatches.push(line);
		}
	});

	return { matches, nonMatches };
}