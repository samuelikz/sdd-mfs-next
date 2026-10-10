/**
 * Sobe as quatro zonas em modo dev de uma vez.
 * Se uma zona cair, as outras são encerradas junto, e Ctrl+C derruba a árvore inteira.
 * Em produção, cada zona tem pipeline e deploy próprios.
 */
const { spawn, spawnSync } = require('child_process');

const ZONES = ['container', 'browse', 'restaurant-order', 'user-profile'];

/** No Windows, shell: true cria um cmd intermediário, então matamos a árvore inteira. */
function killTree(child) {
  if (child.exitCode !== null || child.killed) return;
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
  } else {
    child.kill('SIGTERM');
  }
}

const children = ZONES.map((zone) => spawn('npm', ['run', 'dev', '-w', zone], {
  stdio: 'inherit',
  shell: true,
}));

function stopAll(exitCode) {
  children.forEach(killTree);
  process.exitCode = exitCode;
}

children.forEach((child, index) => {
  child.on('exit', (code) => {
    console.error(`[dev-all] "${ZONES[index]}" encerrou (código ${code}). Parando as demais.`);
    stopAll(code || 1);
  });
});

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));
