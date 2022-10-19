module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'Roboto'] 
      },
      boxShadow: {
        custom: '0px 0px 25px 0px rgba(19, 11, 67, 0.15)',
      },
      colors: {
        primary: '#604fcd',
        gray: '#eaecf3',
        ghostWhite: '#fbfcfe',
        darkBlue: '#130b43',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
