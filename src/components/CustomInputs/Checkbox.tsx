import { type InputHTMLAttributes } from "react";

const Checkbox = ({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
  return (
    <label
      className="flex items-center space-x-2.5 cursor-pointer py-1.5 px-2 
    hover:bg-gray-100 rounded-sm transition-colors"
    >
      <input
        type="checkbox"
        {...props}
        className="w-3.5 h-3.5 text-blue-600 bg-gray-50 border-gray-300 rounded 
        focus:ring-blue-500 focus:ring-1"
      />
      <span className="text-sm text-gray-700 select-none">{label}</span>
    </label>
  );
};

export default Checkbox;
