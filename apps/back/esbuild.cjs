/* eslint-disable @typescript-eslint/no-var-requires */

const { globSync } = require('glob');
const build = require('../../esbuild.cjs');
const dependencies = require('./package.json').dependencies;

const watchMode = process.env.WATCH_MODE;

const apiOptions = {
  entryPoints: globSync('api/**/*.ts', { ignore: '**/*.test.*' }),
  outdir: 'dist/api',
  splitting: false,
};

const main = async () => {
  if (watchMode) {
    await Promise.all([
      await build(dependencies, apiOptions),
      await build(dependencies)
    ]);
  } else {
    await build(dependencies, apiOptions);
    await build(dependencies);
  }
};

main();
