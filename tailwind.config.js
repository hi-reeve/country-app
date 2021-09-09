module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    mode: "jit",
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                "nunito-sans": ["Nunito Sans", "sans-serif"],
            },
            colors: {
                light: {
                    "dark-blue": "var(--light-dark-blue)",
                    "dark-gray": "var(--light-dark-gray)",
                    gray: "var(--light-gray)",
                },
                dark: {
                    blue: "var(--dark-dark-blue)",
                    very: "var(--dark-very-dark-blue)",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
	plugins: [
		require('@tailwindcss/forms')
	],
};
