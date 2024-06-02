import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto Condensed','Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors:{
                'primary': '#957250', // Color primario
                'primary-light': '#b18f6e', // Color primario más claro
                'secondary': '#3B3938', // Color secundario
                'secondary-light': '#6d6a68', // Color secundario más claro
                'terciary': '#D9D7D5', // Color terciario
                'terciary-dark': '#98928d', // Color terciario más oscuro
            },
            height:{
                "10v":"10vh",
                "15v":"15vh",
                "65v":"65vh",
                "150v":"150vh",
            },
            width:{
                "15v":"15vh",
                "30v":"30vh",
                "65v":"65vh",
                "90v":"90vh",
                "135v":"135vh",
            },
        },
    },

    plugins: [forms, require("daisyui")],
};
