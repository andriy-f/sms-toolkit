export const splitIntoLines = (text: string): string[] => text.split(/\r?\n/);

export const trimLines = (lines: string[]): string[] => lines.map(line => line.trim());

export const filterEmptyLines = (lines: string[]): string[] => lines.filter(line => line.length > 0);

export const deduplicateLines = (lines: string[]): string[] => Array.from(new Set(lines));

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
