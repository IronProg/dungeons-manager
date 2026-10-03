// This test is compiled as an isolated CommonJS script because the project has no test runner.

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getNpcTemporaryHitPointsText } = require('./npcHitPointDisplay') as {
  getNpcTemporaryHitPointsText: (
    temporaryHitPoints?: number | null,
  ) => string | undefined;
};

if (getNpcTemporaryHitPointsText(7) !== '(7)') {
  throw new Error('Expected positive temporary HP to render in parentheses');
}

if (getNpcTemporaryHitPointsText(0) !== undefined) {
  throw new Error('Expected zero temporary HP to remain hidden');
}
