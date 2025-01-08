interface InputBoxProps {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  placeholder,
  onChange,
  type,
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-black">
        {label}
      </label>
      <input
        type={type || "text"}
        className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};
