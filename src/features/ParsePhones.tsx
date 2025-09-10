import { useEffect, useState } from "react";
import { parsePhoneNumberWithError, CountryCode, ParseError } from 'libphonenumber-js/max';
import { Accordion, AccordionItem } from "@heroui/accordion";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { copyToClipboard } from "@/features/utils/frontend-utils";

import H2 from "@/shared/components/H2";
import CountrySelect from "./phone-parsing/CountrySelect";
import DefaultButton from "@/shared/components/DefaultButton";

type ParsePhonesProps = {
	rawPhones: string[] | null;
	onAccept: (correctPhones: string[]) => void;
}

type ParseResults = {
	valid: string[]
	invalid: string[]
	unparsable: string[]
}
const ParsePhones = ({ rawPhones, onAccept }: ParsePhonesProps) => {
	const [defaultCountryCode, setDefaultCountryCode] = useState<CountryCode | null>(null);
	const [parsedPhones, setParsedPhones] = useState<ParseResults | null>(null);

	useEffect(() => {
		if (rawPhones && rawPhones.length > 0 && defaultCountryCode) {
			const parseResults: ParseResults = {
				valid: [],
				invalid: [],
				unparsable: []
			}
			rawPhones.forEach(phone => {
				try {
					const parsed = parsePhoneNumberWithError(phone, { extract: true, defaultCountry: defaultCountryCode || undefined });
					const isValid = parsed.isValid();
					if (isValid) {
						parseResults.valid.push(parsed.number);
					} else {
						parseResults.invalid.push(parsed.number);
					}
				} catch (error) {
					if (error instanceof ParseError) {
						console.debug(`Could not parse phone ${phone}:`, error);
						parseResults.unparsable.push(phone);
					} else {
						console.error(`Unexpected error while parsing phone ${phone}:`, error);
					}
				}
			});
			const parsedPhonesUnique: ParseResults = {
				valid: Array.from(new Set(parseResults.valid)),
				invalid: Array.from(new Set(parseResults.invalid)),
				unparsable: Array.from(new Set(parseResults.unparsable))
			}
			setParsedPhones(parsedPhonesUnique);
		}
	}, [rawPhones, defaultCountryCode]);

	return (
		<div>
			<H2>Parse Phones</H2>
			<div>
				<CountrySelect onChange={(countryCode) => setDefaultCountryCode(countryCode)} />
			</div>
			<div>
				{parsedPhones && <Accordion>
					<AccordionItem key="1" aria-label="Valid" title={`Valid (${parsedPhones.valid.length})`}>
						<button
							className="cursor-pointer flex gap-1 mb-4"
							onClick={() => {
								const textToCopy = parsedPhones.valid.join('\n');
								copyToClipboard(textToCopy);
							}}
						>
							<ClipboardDocumentIcon className="h-5 w-5 inline" />
							<span className="sr-only">Copy valid phones to clipboard</span>
							<span className="underline">Copy valid</span>
						</button>
						{parsedPhones.valid.map((phone) => (
							<div key={phone}>{phone}</div>
						))}
					</AccordionItem>
					<AccordionItem key="2" aria-label="Invalid" title={`Invalid (${parsedPhones.invalid.length})`}>
						{parsedPhones.invalid.map((phone) => (
							<div key={phone}>{phone}</div>
						))}
					</AccordionItem>
					<AccordionItem key="3" aria-label="Unparsable" title={`Unparsable (${parsedPhones.unparsable.length})`}>
						{parsedPhones.unparsable.map((phone) => (
							<div key={phone}>{phone}</div>
						))}
					</AccordionItem>
				</Accordion>}
			</div>
			<div>
				<DefaultButton onClick={() => {
					if (parsedPhones) {
						onAccept(parsedPhones.valid);
					}
				}}>
					Accept and Continue
				</DefaultButton>
			</div>
		</div>
	);
}

export default ParsePhones;
