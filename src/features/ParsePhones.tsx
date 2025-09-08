import H2 from "@/shared/components/H2";
type ParsePhonesProps = {
	rawPhones: string[] | null;
}
const ParsePhones = (props: ParsePhonesProps) => {
	return (
		<div>
			<H2>Parse Phones</H2>
			<div>Raw Phones: {props.rawPhones?.join(', ')}</div>
		</div>
	);
}

export default ParsePhones;
