import React from 'react';
import STTextArea from './STTextArea';
import pipe from 'ramda/src/pipe';
import { filterEmptyLines, GroupedMatchResult, groupLinesByPattern, splitIntoLines, trimLines } from '../string-utils';
import { useDebouncedCallback } from 'use-debounce';

type ParsingTextAreaProps = {
	placeholder?: string;
	onChange: (parseRes: string[]) => void;
};

const parseInput = pipe(
	splitIntoLines,
	trimLines,
	filterEmptyLines,
);

const ParsingTextArea: React.FC<ParsingTextAreaProps> = ({ onChange, placeholder }) => {

	const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		const res = parseInput(newValue);
		onChange(res);
	}, 500);

	return (
		<div>
			<STTextArea
				onChange={handleChange}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default ParsingTextArea;