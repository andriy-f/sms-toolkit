/**
 * H1 component for rendering a level 1 heading.
 * @param param0 - Props containing the children to be rendered inside the heading.
 * @returns A styled h1 element.
 */
const H1: React.FC<React.PropsWithChildren> = ({ children, }) => {
	return (
		<h1 className="text-3xl font-bold mb-6">
			{children}
		</h1>
	);
};

export default H1;
