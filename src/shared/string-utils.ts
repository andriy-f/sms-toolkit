export const splitIntoLines = (text: string): string[] => {
	return text.split(/\r?\n/);
};

export const trimLines = (lines: string[]): string[] => {
	return lines.map(line => line.trim());
};

export const filterEmptyLines = (lines: string[]): string[] => {
	return lines.filter(line => line.length > 0);
};

export type GroupedMatchResult = {
	matches: string[];
	nonMatches: string[];
};

export const groupLinesByPattern = (pattern: RegExp) => (lines: string[]): GroupedMatchResult => {
	const initialValue: GroupedMatchResult = { matches: [], nonMatches: [] };

	return lines.reduce((acc, line) => {
		if (pattern.test(line)) {
			acc.matches.push(line);
		} else {
			acc.nonMatches.push(line);
		}
		return acc;
	}, initialValue);
};
