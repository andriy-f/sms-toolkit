import { useEffect, useState } from "react";
import parsePhoneNumber, { CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js/max';
import { Accordion, AccordionItem } from "@heroui/accordion";

import H2 from "@/shared/components/H2";
import CountrySelect from "./phone-parsing/CountrySelect";
import DefaultButton from "@/shared/components/DefaultButton";

type ParsePhonesProps = {
	rawPhones: string[] | null;
	onAccept: (correctPhones: string[]) => void;
}

type ParsedPhones = {
	valid: string[]
	invalid: string[]
	possible: string[]
	unparsable: string[]
}
const ParsePhones = ({ rawPhones, onAccept }: ParsePhonesProps) => {
	const [defaultCountryCode, setDefaultCountryCode] = useState<CountryCode | null>(null);
	const [parsedPhones, setParsedPhones] = useState<ParsedPhones | null>(null);

	useEffect(() => {
		if (rawPhones && rawPhones.length > 0 && defaultCountryCode) {
			const parsedPhones: ParsedPhones = {
				valid: [],
				invalid: [],
				possible: [],
				unparsable: []
			}
			rawPhones.forEach(phone => {
				try {
					const parsed = parsePhoneNumber(phone, { extract: true, defaultCountry: defaultCountryCode || undefined });
					if (parsed) {
						if (parsed.isValid()) {
							parsedPhones.valid.push(parsed.number);
						} else if (parsed.isPossible() && !parsed.isValid()) {
							parsedPhones.possible.push(parsed.number);
						} else if (!parsed.isPossible() && !parsed.isValid()) {
							parsedPhones.invalid.push(parsed.number);
						}

					} else {
						// console.log(`Failed to parse phone: ${phone}`);
						parsedPhones.unparsable.push(phone);
					}
				} catch (error) {
					console.error(`Error parsing phone ${phone}:`, error);
				}
			});
			const parsedPhonesUnique: ParsedPhones = {
				valid: Array.from(new Set(parsedPhones.valid)),
				invalid: Array.from(new Set(parsedPhones.invalid)),
				possible: Array.from(new Set(parsedPhones.possible)),
				unparsable: Array.from(new Set(parsedPhones.unparsable))
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
					<AccordionItem key="1" aria-label="Valid" title="Valid">
						{parsedPhones.valid.map((phone, index) => (
							<div key={phone}>{phone}</div>
						))}
					</AccordionItem>
					<AccordionItem key="2" aria-label="Possible" title="Possible">
						{parsedPhones.possible.map((phone, index) => (
							<div key={phone}>{phone}</div>
						))}
					</AccordionItem>
					<AccordionItem key="3" aria-label="Invalid" title="Invalid">
						{parsedPhones.invalid.map((phone, index) => (
							<div key={phone}>{phone}</div>
						))}
					</AccordionItem>
					<AccordionItem key="4" aria-label="Unparsable" title="Unparsable">
						{parsedPhones.unparsable.map((phone, index) => (
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
