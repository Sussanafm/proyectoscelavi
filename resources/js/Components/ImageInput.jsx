import React, { useState } from 'react';

const ImageInput = ({ name, label, multiple=true, onChange }) => {
    const [files, setFiles] = useState([]);

    const handleImageChange = async (e) => {
        const newFiles = Array.from(e.target.files);
        const processedFiles = await Promise.all(
            newFiles.map(async (file) => {
                const processedFile = await resizeImage(file); // Llamada a la función de redimensionamiento
                return processedFile;
            })
        );
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, ...processedFiles];
            if (onChange) {
                onChange(updatedFiles); // Pasar la lista completa de archivos al onChange
            }
            return updatedFiles;
        });
    };

    // Función para redimensionar la imagen
    const resizeImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxWidth = 500; // Define el ancho máximo deseado para la imagen
                    const maxHeight = 500; // Define la altura máxima deseada para la imagen
                    let width = image.width;
                    let height = image.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(image, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        const resizedFile = new File([blob], file.name, {
                            type: 'image/jpeg', // Puedes cambiar a 'image/png' si lo deseas
                            lastModified: Date.now(),
                        });
                        resolve(resizedFile);
                    }, 'image/jpeg', 0.9); // Puedes cambiar a 'image/png' si lo deseas
                };
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <div className="input-image">
            {label && <label htmlFor={name}>{label}</label>}
            <input type="file" id={name} name={name} accept="image/*" onChange={handleImageChange} multiple={multiple} />
            {files.map((file, index) => (
                <div key={index}>
                    <img src={URL.createObjectURL(file)} alt="Preview" className="image-preview w-1/4" />
                    <input type="hidden" name={`${name}[${index}]`} value={file.name} />
                </div>
            ))}
        </div>
    );
};

export default ImageInput;




