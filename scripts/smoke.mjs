/**
 * Teste de fumaça do container: confirma que cada rota chega à zona certa.
 * Requer as zonas rodando (npm run dev) e roda com: npm run test:smoke
 */
import assert from 'node:assert/strict';

const BASE_URL = process.env.CONTAINER_URL ?? 'http://localhost:3000';

const checks = [
  { path: '/', status: 200, contains: 'Com fome de quê hoje?' },
  { path: '/restaurant/2', status: 200, contains: 'Sushi Zen' },
  { path: '/restaurant/99', status: 404 },
  // Ids que existem como propriedade de Object não podem virar restaurante.
  { path: '/restaurant/constructor', status: 404 },
  { path: '/restaurant/toString', status: 404 },
  { path: '/user-profile', status: 200, contains: 'Seu carrinho' },
  { path: '/random', status: 307, location: /\/restaurant\/[1-4]$/ },
];

let failures = 0;

for (const check of checks) {
  try {
    const response = await fetch(`${BASE_URL}${check.path}`, { redirect: 'manual' });
    assert.equal(response.status, check.status, `status de ${check.path}`);

    if (check.contains) {
      assert.match(await response.text(), new RegExp(check.contains), `conteúdo de ${check.path}`);
    }
    if (check.location) {
      assert.match(response.headers.get('location') ?? '', check.location, `redirect de ${check.path}`);
    }
    console.log(`ok   ${check.path}`);
  } catch (error) {
    failures += 1;
    console.log(`FAIL ${check.path}: ${error.message}`);
  }
}

if (failures) {
  console.log(`\n${failures} de ${checks.length} verificações falharam.`);
  process.exitCode = 1;
} else {
  console.log(`\nTodas as ${checks.length} verificações passaram.`);
}
