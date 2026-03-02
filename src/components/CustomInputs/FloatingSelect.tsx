import { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  label: string;
  options: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
}

export const FloatingSelect = ({ label, options, value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => String(o.value) === String(value));

  const hasValue = !!value;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`
        peer w-full text-left bg-gray-50 border-0 border-b transition-colors duration-300
        px-4 pt-2 pb-2 text-sm text-gray-900 focus:outline-none
        min-h-12
        flex items-end
        ${open ? "border-blue-600" : "border-gray-300"}
      `}
      >
        <span className={`${hasValue ? "text-gray-900" : "text-transparent"}`}>
          {selected?.label || "placeholder"}
        </span>
      </button>

      <label
        className={`
        absolute left-4 z-10 origin-left pointer-events-none text-sm
        transform transition-all duration-300

        ${
          hasValue || open
            ? "-translate-y-4 scale-90 text-blue-600 top-2"
            : "top-5 scale-100 text-gray-500"
        }
      `}
      >
        {label}
      </label>

      {/* Flecha */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            open ? "rotate-180 text-blue-600" : "text-gray-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden animate-fadeIn">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
              className={`
                px-4 py-2 text-sm cursor-pointer transition-colors
                ${
                  String(value) === String(option.value)
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                }
              `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
