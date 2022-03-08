const typography = require('@tailwindcss/typography');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				whitesmoke: '#F6F6F2',
				blackolive: '#413F3D',
				cerulean: {
					50: '#f0f9fb',
					100: '#daf7f8',
					200: '#adeef1',
					300: '#75e1eb',
					400: '#30c8e2',
					500: '#11a8d5',
					600: '#0d87be',
					700: '#126c99',
					800: '#135371',
					900: '#124358'
				}
			}
		}
	},

	plugins: [typography]
};

module.exports = config;
