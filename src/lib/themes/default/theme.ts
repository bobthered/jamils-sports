import { twMerge } from 'tailwind-merge';

const backdropBlur = 'backdrop-blur';
const rounded = 'rounded';
const shadow = 'shadow';

const theme: Record<string, Record<string, string>> = {
	A: {
		default: 'text-primary-500'
	},
	Button: {
		default: twMerge(
			rounded,
			'px-6 py-3 bg-primary-500 text-white hover:bg-primary-600 focus:bg-primary-700 transition duration-200'
		),
		ghost:
			'bg-transparent text-current hover:bg-black/10 focus:bg-black/10 dark:hover:bg-white/10 focus:bg-white/10',
		icon: 'px-3',
		light: 'bg-gray-50 text-gray-950 hover:bg-white focus:bg-white',
		square: 'rounded-none'
	},
	Card: {
		default: twMerge(rounded, shadow, 'bg-white dark:bg-gray-900 p-6')
	},
	Container: {
		default: 'mx-auto w-full max-w-7xl px-6',
		full: 'max-w-none'
	},
	Div: {
		default: ''
	},
	H1: {
		default: 'text-6xl font-semibold'
	},
	H2: {
		default: 'text-5xl font-semibold'
	},
	Header: {
		default: twMerge(
			backdropBlur,
			shadow,
			'bg-white/90 dark:bg-black/95 fixed top-0 w-screen z-100'
		)
	},
	Img: { default: '' },
	Nav: { default: '' },
	P: { default: '' },
	Section: {
		default: 'py-24 sm:py-26 md:py-28 lg:py-30 xl:py-32',
		lg: 'py-24 sm:py-32 md:py-40 lg:py-48 xl:py-56'
	},
	Table: {
		default: ''
	},
	Thead: {
		default: ''
	}
};

Object.keys(theme.Button).forEach((key) => {
	theme.A[`button${key[0].toUpperCase() + key.slice(1)}`] = theme.Button[key];
});

export { theme };
