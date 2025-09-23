import React from 'react';

export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center rounded-md px-3 py-2 bg-sky-600 text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
