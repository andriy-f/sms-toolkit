'use client'

import { H2 } from "@/shared/components/H2"
import MultilineInput from "@/shared/components/MultilineInput"
import { useState } from "react"

const ImportPhonesComponent = () => {
	const [lines, setLines] = useState<string[] | null>(null)
	const handleChange = (value: string[]) => {
		console.log('Input filtered lines:', value)
		setLines(value)
	}

	return (
		<div>
			<H2>Parsing Text Area</H2>
			<MultilineInput
				placeholder="Enter phone numbers, e.g., +1234567890"
				onChange={handleChange}
			/>
			<div className="h-4">Matches</div>
			<code className="text-sm text-gray-500 mt-2">
				{lines && (
					<div className="p-2">
						<ul className="list-disc list-inside">
							{lines.map((line) => (
								<li key={line}>{line}</li>
							))}
						</ul>
					</div>
				)}
			</code>
		</div>
	)
}

export default ImportPhonesComponent