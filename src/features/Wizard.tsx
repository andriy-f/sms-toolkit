'use client'

import H1 from "@/shared/components/H1"
import { useState } from "react";
import ImportPhonesComponent from "./ImportPhonesComponent";
import ParsePhones from "./ParsePhones";
import STButton from "@/shared/components/STButton";

type WizardStep = 'import-phones' | 'parse-phones' | 'configure-message' | 'review-send';
const Wizard: React.FC = () => {
	const [step, setStep] = useState<WizardStep>('import-phones');
	const [importedPhones, setImportedPhones] = useState<string[] | null>(null);

	const resetWizard = () => {
		setStep('import-phones');
		setImportedPhones(null);
	}

	const handleImportComplete = (phones: string[]) => {
		setImportedPhones(phones);
		setStep('parse-phones');
	}

	return (
		<div>
			<H1>Wizard</H1>
			<STButton onClick={resetWizard}>
				Reset Wizard
			</STButton>
			{step === 'import-phones' && (
				<ImportPhonesComponent onImport={handleImportComplete} />
			)}
			{step === 'parse-phones' && (
				<ParsePhones rawPhones={importedPhones} />
			)}
		</div>
	);
}

export default Wizard;