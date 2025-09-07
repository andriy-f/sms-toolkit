'use client'

import ParsingTextArea from "@/shared/components/ParsingTextArea"
import { GroupedMatchResult } from "@/shared/string-utils"
import { useState } from "react"

const ParsingComponent = () => {
	const [groups, setGroups] = useState<string[] | null>(null)
	const handleChange = (value: string[]) => {
		console.log('Parsed value:', value)
		setGroups(value)
	}

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Parsing Text Area</h2>
			<ParsingTextArea
				placeholder="Enter phone numbers, e.g., +1234567890"
				onChange={handleChange}
			/>
			<div className="h-4">Matches</div>
			<code className="text-sm text-gray-500 mt-2">
				{groups && (
					<div className="mt-2">
						<div><strong>Matched Lines:</strong></div>
						<ul className="list-disc list-inside">
							{groups.map((line) => (
								<li key={line}>{line}</li>
							))}
						</ul>
					</div>
				)}
			</code>
		</div>
	)
}

export default ParsingComponent