import React from 'react';
import STTextArea from './STTextArea';
import { filterEmptyLines, groupLinesByPattern, splitIntoLines, trimLines } from '../string-utils';

type ParseRes = {
	matches: string[];
	nonMatches: string[];
}

type ParsingTextAreaProps = {
	pattern: string;
	onChange: (parseRes: ParseRes) => void;
};

const ParsingTextArea: React.FC<ParsingTextAreaProps> = ({ pattern, onChange }) => {

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		const res = groupLinesByPattern(
			filterEmptyLines(
				trimLines(
					splitIntoLines(newValue)
				)
			),
			new RegExp(pattern)
		);
		onChange(res);
	};

	return (
		<div>
			<label>
				Pattern: <code>{pattern}</code>
			</label>
			<STTextArea
				onChange={handleChange}
				placeholder={`Enter text matching pattern: ${pattern}`}
			/>
		</div>
	);
};

export default ParsingTextArea;