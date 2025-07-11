import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose} // close when clicking outside content
      />

      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div
          className="bg-white rounded-lg p-6 max-w-md w-full pointer-events-auto shadow-lg"
          onClick={(e) => e.stopPropagation()} // prevent close on modal content click
        >
          {children}
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
