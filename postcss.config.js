const tailwind = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

const purgecssConfig = purgecss({
  content: ['./src/**/*.html'],
  extractors: [
    {
      extractor: class TailWindExtractor {
        static extract(content) {
          return content.match(/[A-z0-9-:\/]+/g) || [];
        }
      },
      extensions: ['css', 'html'],
    },
  ],
});

module.exports = {
  plugins: [
    tailwind('./tailwind.config.js'),
    cssnano({
      preset: 'default',
    }),
    ...(process.env.NODE_ENV === 'production' ? [purgecssConfig] : []),
    require('autoprefixer'),
  ],
};
