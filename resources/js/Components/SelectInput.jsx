import React, { forwardRef, useEffect, useRef } from 'react';

const SelectInput = forwardRef(({ options, className = '', isFocused = false, placeholder = 'Seleccionar', defaultValue = '', ...props }, ref) => {
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
                'border-gray-300 focus:border-terciary-dark focus:ring-terciary-dark shadow-sm ' +
                className
            }
            ref={ref || selectRef}
            defaultValue={defaultValue}
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
});

export default SelectInput;

