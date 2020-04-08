const browserSync = require(`browser-sync`).create();

const {src, dest, series, watch} = require(`gulp`);
const debug = require(`gulp-debug`);
const plumber = require(`gulp-plumber`);

const sass = require(`gulp-sass`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const csso = require(`gulp-csso`);

const mqpacker = require(`css-mqpacker`);
const atImport = require(`postcss-import`);
const objectFitImages = require(`postcss-object-fit-images`);

const njkRender = require(`gulp-nunjucks-render`);
const prettify = require(`gulp-html-prettify`);
const htmlValidator = require(`gulp-w3c-html-validator`);
const bemValidator = require(`gulp-html-bem-validator`);

const babel = require(`gulp-babel`);

const del = require(`del`);

function reload(done) {
  browserSync.reload();
  done();
}

function serve() {
  browserSync.init({
    server: `build`,
    port: 8080,
    startPath: `index.html`,
    open: false,
    notify: false,
  });

  watch([`src/scss/**/*.scss`], {events: [`change`], delay: 1000}, series(compileScss));
  watch([`src/js/**/*.js`], {events: [`change`, `add`], delay: 300}, series(buildJs, reload));
  watch([`src/pages/**/*.+(html|njk|nunjucks)`], {events: [`change`, `add`], delay: 100}, series(compileNjk, reload));
}

function copyOtherDir() {
  return src([`src/favicon/*`, `src/img/**/*`, `src/fonts/*`], {base: `src`})
    .pipe(dest(`build`));
}

function compileScss() {
  return src(`src/scss/style.scss`, {
    sourcemaps: true
  })
  .pipe(plumber())
  .pipe(debug({
    title: `Compiles:`
  }))
  .pipe(sass({
    includePaths: [__dirname + `/`, `node_modules`]
  }))
  .pipe(postcss([
    autoprefixer({
      grid: true
    }),
    mqpacker({
      sort: true
    }),
    atImport(),
    objectFitImages(),
  ]))
  .pipe(csso({
    restructure: false,
  }))
  .pipe(dest(`build/css`, {
    sourcemaps: `.`
  }))
  .pipe(browserSync.stream());
}

function buildScss() {
  return src(`src/scss/style.scss`)
  .pipe(plumber())
  .pipe(debug({
    title: `Compiles:`
  }))
  .pipe(sass({
    includePaths: [__dirname + `/`, `node_modules`]
  }))
  .pipe(postcss([
    autoprefixer({
      grid: true
    }),
    mqpacker({
      sort: true
    }),
    atImport(),
    objectFitImages(),
  ]))
  .pipe(dest(`build/css`));
}

function compileNjk() {
  return src([`src/pages/**/*.+(html|njk|nunjucks)`, `!src/pages/**/_*.+(html|njk|nunjucks)`])
  .pipe(plumber())
  .pipe(debug({title: `Compiles`}))
  .pipe(njkRender({
    path: `src/pages/`
  }))
  .pipe(prettify({
    indent_size: 2,
    indent_char: ` `,
    unformatted: [`code`, `em`, `strong`, `span`, `i`, `b`, `br`, `script`],
    content_unformatted: [],
  }))
  .pipe(htmlValidator())
  .pipe(bemValidator())
  .pipe(dest(`build`));
}

function clearBuildDir() {
  return del(`build`);
}

function buildJs() {
  return src([`src/js/native.js`])
  .pipe(plumber())
  .pipe(babel())
  .pipe(dest(`build/js`));
}

exports.build = series(clearBuildDir, copyOtherDir, compileNjk, buildScss, buildJs);
exports.default = series(clearBuildDir, copyOtherDir, compileNjk, compileScss, buildJs, serve);
