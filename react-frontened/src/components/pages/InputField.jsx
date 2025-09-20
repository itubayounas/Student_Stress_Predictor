const InputField = ({ label, name, type = "text", value, onChange }) => {
	return (
		<div className="mb-4">
			<label className="block text-sm font-medium text-indigo-400 mb-1">
				{label}
			</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				className="w-full px-3 py-2 border rounded-lg shadow-sm text-black
				           focus:outline-none focus:ring-2 focus:ring-fuchsia-500
				           transition duration-300 ease-in-out
				           hover:shadow-md hover:scale-[1.02]"
			/>
		</div>
	);
};

export default InputField;
