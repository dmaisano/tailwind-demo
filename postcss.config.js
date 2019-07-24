const tailwind = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    tailwind('./tailwind.config.js'),
    cssnano({
      preset: 'default',
    }),
    purgecss({
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
    }),
    require('autoprefixer'),
  ],
};
