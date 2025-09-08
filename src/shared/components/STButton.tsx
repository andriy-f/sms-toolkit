export const STButton: React.FC<React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>> = ({ children, className = "", ...props }) => {
	return (
		<button
			className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default STButton;