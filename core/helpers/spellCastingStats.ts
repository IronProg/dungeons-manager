type SpellCastingStatsParams = {
  spellModifier: number;
  proficiencyBonus: number;
};

export const getSpellCastingStats = ({
  spellModifier,
  proficiencyBonus,
}: SpellCastingStatsParams) => ({
  attackBonus: spellModifier + proficiencyBonus,
  saveDc: 8 + spellModifier + proficiencyBonus,
});
