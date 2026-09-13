// This test is compiled as an isolated CommonJS script because the project has no test runner.

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getNpcAttackBonus, getNpcDamageBonus } = require('./npcCombat') as {
  getNpcAttackBonus: (params: {
    abilityScore: number | undefined;
    customBonus: number | null | undefined;
    applyProficiency: boolean;
    proficiencyBonus: number;
  }) => number;
  getNpcDamageBonus: (params: {
    abilityScore: number | undefined;
    customBonus: number | null | undefined;
  }) => number;
};

const attackBonus = getNpcAttackBonus({
  abilityScore: 18,
  customBonus: 2,
  applyProficiency: true,
  proficiencyBonus: 4,
});

if (attackBonus !== 10) {
  throw new Error(`Expected attack bonus 10, received ${attackBonus}`);
}

const damageBonus = getNpcDamageBonus({
  abilityScore: 18,
  customBonus: 2,
});

if (damageBonus !== 6) {
  throw new Error(`Expected damage bonus 6, received ${damageBonus}`);
}
