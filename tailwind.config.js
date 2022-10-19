module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Muli', 'Roboto'] 
      },
      boxShadow: {
        custom: '0px 0px 15px 0px rgba(66, 184, 131, 0.15)',
      },
      colors: {
        primary: '#42b883',
        gray: '#eaecf3',
        ghostWhite: '#fbfcfe'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
