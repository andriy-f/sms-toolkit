'use client'

import { H2 } from "@/shared/components/H2"
import MultilineInput from "@/shared/components/MultilineInput"
import STButton from "@/shared/components/STButton"
import { useState } from "react"

type ImportPhonesComponentProps = {
	onImport: (lines: string[]) => void;
}

const ImportPhonesComponent = (props: ImportPhonesComponentProps) => {

	const [lines, setLines] = useState<string[]>([]);
	const handleChange = (newLines: string[]) => {
		setLines(newLines);
	}

	const handleImport = () => {
		props.onImport(lines);
	}
	return (
		<div>
			<H2>Parsing Text Area</H2>
			<MultilineInput
				placeholder="Enter phone numbers, e.g., +1234567890"
				onChange={handleChange}
			/>
			<STButton
				onClick={handleImport}
			>
				Import Phones
			</STButton>
		</div>
	)
}

export default ImportPhonesComponent