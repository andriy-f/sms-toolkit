'use client'

import ParsingTextArea from "@/shared/components/ParsingTextArea"
import { GroupedMatchResult } from "@/shared/string-utils"
import { useState } from "react"

const ParsingComponent = () => {
	const [groups, setGroups] = useState<GroupedMatchResult | null>(null)
	const handleChange = (value: GroupedMatchResult) => {
		console.log('Parsed value:', value)
		setGroups(value)
	}

	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Parsing Text Area</h2>
			<ParsingTextArea
				pattern={/^[+0-9 ]+$/g}
				placeholder="Enter phone numbers, e.g., +1234567890"
				onChange={handleChange}
			/>
			<div className="h-4">Matches</div>
			<code className="text-sm text-gray-500 mt-2">
				Pattern used: <strong>/[+0-9]+/g</strong> (matches lines with digits and plus sign)
				{groups && (
					<div className="mt-2">
						<div><strong>Matched Lines:</strong></div>
						<ul className="list-disc list-inside">
							{groups.matches.map((line, index) => (
								<li key={`match-${index}`}>{line}</li>
							))}
						</ul>
					</div>
				)}
			</code>
		</div>
	)
}

export default ParsingComponent