import { type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...props }: Props) => {
  return (
    <div
      className="relative w-full bg-gray-50 border-b border-gray-300 
      focus-within:border-blue-600 transition-colors duration-300"
    >
      <input
        {...props}
        placeholder=" "
        className="peer block px-4 pb-1.5 pt-5 w-full text-sm text-gray-900 
        bg-transparent border-0 appearance-none focus:outline-none focus:ring-0"
      />
      <label
        className="
          absolute left-4 top-3.5 z-10 origin-left pointer-events-none
          transform transition-all duration-300 text-gray-500 text-sm

          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0

          peer-focus:-translate-y-3.5 
          peer-focus:scale-90 
          peer-focus:text-blue-600
          peer-focus:top-3

          peer-not-placeholder-shown:-translate-y-3.5
          peer-not-placeholder-shown:scale-90
          peer-not-placeholder-shown:text-blue-600
          peer-not-placeholder-shown:top-3
        "
      >
        {label}
      </label>
    </div>
  );
};
