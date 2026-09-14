// eslint-disable-next-line @typescript-eslint/no-require-imports -- this isolated test runs after CommonJS compilation.
const { getNextNpcHitPoints } = require('./npcHitPoints');

const damagedHitPoints = getNextNpcHitPoints(3, 10, -5);
if (damagedHitPoints !== 0) {
  throw new Error('Expected damage to stop at zero hit points');
}

const healedHitPoints = getNextNpcHitPoints(8, 10, 5);
if (healedHitPoints !== 10) {
  throw new Error('Expected healing to stop at the normal hit point limit');
}
