import { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      error,
      helperText,
      icon: Icon,
      fullWidth = true,
      className = "",
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <div className={`${fullWidth ? "w-full" : ""} ${className}`}>
        {label && (
          <label className="block text-sm font-bold text-gray-700 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {Icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon size={20} />
            </div>
          )}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={`
              w-full px-4 py-3 text-base
              ${Icon ? "pl-11" : ""}
              border-2 rounded-xl
              transition-all duration-200
              focus:outline-none focus:ring-4
              ${
                hasError
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200 bg-red-50"
                  : "border-gray-300 focus:border-green-500 focus:ring-green-200 bg-white"
              }
              placeholder:text-gray-400
              disabled:bg-gray-100 disabled:cursor-not-allowed
            `}
            {...props}
          />

          {hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
              <AlertCircle size={20} />
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle size={14} />
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-2 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
