const esbuild = require('esbuild');
const path = require('path');

const buildOptions = {
  entryPoints: [
    path.join(__dirname, 'src/linkedin.ts'),
    path.join(__dirname, 'src/twitter.ts')
  ],
  bundle: true,
  outdir: path.join(__dirname, 'dist'),
  platform: 'browser',
  target: 'es2020',
  sourcemap: process.env.NODE_ENV !== 'production',
  minify: process.env.NODE_ENV === 'production',
  logLevel: 'info',
};

async function build() {
  try {
    if (process.argv.includes('--watch')) {
      const ctx = await esbuild.context(buildOptions);
      await ctx.watch();
      console.log('Watching for changes...');
    } else {
      await esbuild.build(buildOptions);
      console.log('Build complete!');
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();