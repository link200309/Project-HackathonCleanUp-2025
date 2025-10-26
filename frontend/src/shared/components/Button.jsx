import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled = false,
      isLoading = false,
      type = "button",
      onClick,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "font-bold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:shadow-sm active:translate-y-1";

    const variants = {
      primary:
        "bg-green-500 text-white hover:bg-green-600 focus:ring-green-300 border-b-4 border-green-700 active:border-b-2",
      secondary:
        "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300 border-b-4 border-blue-700 active:border-b-2",
      outline:
        "bg-white text-green-600 border-2 border-green-500 hover:bg-green-50 focus:ring-green-300",
      ghost:
        "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
      danger:
        "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 border-b-4 border-red-700 active:border-b-2",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
            <span>Cargando...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
