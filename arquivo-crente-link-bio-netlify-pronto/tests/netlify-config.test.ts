import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Netlify builds Vite, publishes dist, and routes the API before the SPA fallback', async () => {
  const config = await readFile(new URL('../netlify.toml', import.meta.url), 'utf8');

  assert.match(config, /command\s*=\s*"npm run build"/);
  assert.match(config, /publish\s*=\s*"dist"/);
  assert.match(config, /\[functions\][\s\S]*directory\s*=\s*"netlify\/functions"/);

  const apiPosition = config.indexOf('from = "/api/youtube"');
  const spaPosition = config.indexOf('from = "/*"');
  assert.ok(apiPosition >= 0, 'missing /api/youtube rewrite');
  assert.ok(spaPosition > apiPosition, 'SPA fallback must come after API rewrite');
  assert.match(config, /to = "\/\.netlify\/functions\/youtube"/);
});

test('package scripts use the static Vite build and Node tests', async () => {
  const packageJson = JSON.parse(
    await readFile(new URL('../package.json', import.meta.url), 'utf8'),
  );

  assert.equal(packageJson.scripts.build, 'vite build');
  assert.equal(
    packageJson.scripts.test,
    'node --test --experimental-strip-types tests/*.test.ts',
  );
  assert.equal(packageJson.dependencies?.express, undefined);
  assert.equal(packageJson.dependencies?.dotenv, undefined);
});
