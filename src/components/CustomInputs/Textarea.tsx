import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea = ({ label, ...props }: Props) => {
  return (
    <div className="relative w-full bg-gray-50 border-b border-gray-300 focus-within:border-blue-600 transition-colors duration-300">
      <textarea
        {...props}
        placeholder=" "
        className="
          peer block w-full text-sm text-gray-900 bg-transparent border-0
          appearance-none focus:outline-none focus:ring-0
          px-4 pt-8 pb-3
          min-h-30 resize-y
        "
      />
      <label
        className="
          absolute left-4 top-5 z-10 origin-left pointer-events-none
          transform transition-all duration-300 text-gray-500 text-sm

          peer-placeholder-shown:translate-y-0
          peer-placeholder-shown:scale-100

          peer-focus:-translate-y-5
          peer-focus:scale-90
          peer-focus:text-blue-600
          peer-focus:top-3

          peer-not-placeholder-shown:-translate-y-5
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
export default Textarea;
