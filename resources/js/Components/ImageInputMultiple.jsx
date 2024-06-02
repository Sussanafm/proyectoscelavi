import React, { useState } from 'react';

const ImageInputMultiple = ({ name, label, onChange }) => {
    const [previews, setPreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = e.target.files;
        const newPreviews = [];

        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    newPreviews.push(reader.result);
                    setPreviews([...newPreviews]);
                };
                reader.readAsDataURL(file);
            });
        } else {
            setPreviews([]);
        }

        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="input-image">
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type="file"
                id={name}
                name={name}
                accept="image/*"
                onChange={handleImageChange}
                multiple // Permitir la selección de múltiples archivos
            />
            {previews.map((preview, index) => (
                <img key={index} src={preview} alt="Preview" className="image-preview" />
            ))}
        </div>
    );
};

export default ImageInputMultiple;

