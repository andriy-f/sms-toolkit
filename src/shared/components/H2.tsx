import React from "react";

export const H2: React.FC<React.PropsWithChildren> = ({ children }: React.PropsWithChildren) => {
	return (
		<h2 className="text-2xl font-bold mb-4">
			{children}
		</h2>
	);
};

export default H2;