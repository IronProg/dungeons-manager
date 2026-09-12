// This test is compiled as an isolated CommonJS script because the project has no test runner.

const { getSpellCastingStats, getSelectedSpellAttribute } =
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('./spellCastingStats') as {
    getSpellCastingStats: (params: {
      spellModifier: number;
      proficiencyBonus: number;
    }) => { attackBonus: number; saveDc: number };
    getSelectedSpellAttribute: <T extends { name: string }>(
      spellAttribute: T | undefined,
      attributes: T[],
    ) => T | undefined;
  };

const stats = getSpellCastingStats({
  spellModifier: 3,
  proficiencyBonus: 2,
});

if (stats.attackBonus !== 5 || stats.saveDc !== 13) {
  throw new Error(
    `Expected attack bonus 5 and save DC 13, received ${JSON.stringify(stats)}`,
  );
}

const fallbackAttribute = getSelectedSpellAttribute(undefined, [
  { name: 'strength' },
  { name: 'intelligence' },
]);

if (fallbackAttribute?.name !== 'intelligence') {
  throw new Error(
    `Expected Intelligence as the fallback spell attribute, received ${JSON.stringify(fallbackAttribute)}`,
  );
}
