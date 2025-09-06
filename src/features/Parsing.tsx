'use client'

import ParsingTextArea from "@/shared/components/ParsingTextArea"

const ParsingComponent = () => {
	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Parsing Text Area</h2>
			<ParsingTextArea
				pattern="[+0-9]+"
				onChange={(value) => console.log('Parsed value:', value)}
			/>
		</div>
	)
}

export default ParsingComponent