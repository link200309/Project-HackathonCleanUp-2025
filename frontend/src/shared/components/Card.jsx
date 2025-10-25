const Card = ({ children, className = "", padding = "lg", shadow = true }) => {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const shadowClass = shadow ? "shadow-xl" : "shadow-md";

  return (
    <div
      className={`
        bg-white rounded-3xl border-2 border-gray-200
        ${shadowClass}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
