import React, { forwardRef, useEffect, useRef } from 'react';

const SelectInput = forwardRef(({ options, className = '', isFocused = false, placeholder = 'Seleccionar', ...props }, ref) => {
    const selectRef = useRef(null);

    useEffect(() => {
        if (isFocused && selectRef.current) {
            selectRef.current.focus();
        }
    }, [isFocused]);

    return (
        <select
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={ref || selectRef}
        >
            <option value="" disabled selected>{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
});

export default SelectInput;

