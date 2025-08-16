// File: components/PrimaryButton.jsx
import React from "react";

const PrimaryButton = ({
  text = "Click Me",
  onClick,
  size = "md", //, md, l smg
  className = "",
  ...props
}) => {
  // Size classes
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white rounded-lg font-semibold transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${sizes[size]} ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
