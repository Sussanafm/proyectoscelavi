// Boton.js
import React from 'react';

const Boton = ({ onClick, children, className }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 m-2 ${className}`}
        >
            {children}
        </button>
    );
};

export default Boton;
