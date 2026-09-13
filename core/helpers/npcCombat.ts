type NpcBonusParams = {
  abilityScore: number | undefined;
  customBonus: number | null | undefined;
};

type NpcAttackBonusParams = NpcBonusParams & {
  applyProficiency: boolean;
  proficiencyBonus: number;
};

export const getNpcDamageBonus = ({
  abilityScore,
  customBonus,
}: NpcBonusParams) =>
  (abilityScore === undefined ? 0 : Math.floor((abilityScore - 10) / 2)) +
  (customBonus ?? 0);

export const getNpcAttackBonus = ({
  abilityScore,
  customBonus,
  applyProficiency,
  proficiencyBonus,
}: NpcAttackBonusParams) =>
  getNpcDamageBonus({ abilityScore, customBonus }) +
  (applyProficiency ? proficiencyBonus : 0);
