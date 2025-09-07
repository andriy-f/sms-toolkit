import React from 'react';
import STTextArea from './STTextArea';
import pipe from 'ramda/src/pipe';
import { filterEmptyLines, GroupedMatchResult, groupLinesByPattern, splitIntoLines, trimLines } from '../string-utils';
import { useDebouncedCallback } from 'use-debounce';

type ParsingTextAreaProps = {
	pattern: RegExp;
	placeholder?: string;
	onChange: (parseRes: GroupedMatchResult) => void;
};

const parseInput = (pattern: RegExp) => pipe(
	splitIntoLines,
	trimLines,
	filterEmptyLines,
	groupLinesByPattern(pattern)
);

const ParsingTextArea: React.FC<ParsingTextAreaProps> = ({ pattern, onChange, placeholder }) => {

	const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		const res = parseInput(pattern)(newValue);
		onChange(res);
	}, 500);

	return (
		<div>
			<label>
				Pattern: <code>{pattern.source}</code>
			</label>
			<STTextArea
				onChange={handleChange}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default ParsingTextArea;