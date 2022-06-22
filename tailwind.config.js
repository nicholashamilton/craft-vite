const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./src/**/*.{vue,js,ts,jsx,tsx,scss}",
        "./templates/**/*.{vue,js,ts,jsx,tsx,twig,scss}",
    ],
    theme: {
        fontFamily: {
            sans: [...defaultTheme.fontFamily.sans],
        },
        extend: {
            colors: {
                "primary-color": "var(--primary-color)",
                "primary-color-hover": "var(--primary-color-hover)",
            },
            screens: {
                sm: "640px", // => @media (min-width: 640px) { ... }
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
                "desktop-min": "950px",
            },
        },
    },
    plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
        require("@tailwindcss/aspect-ratio"),
    ],
};
