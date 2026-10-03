import { Text, View } from 'react-native';

import { ComposeDiceRollButton } from '@/components/ui/ComposeDiceRollButton';
import { DiceRollButton } from '@/components/ui/DiceRollButton';
import { getNpcAttackBonus, getNpcDamageBonus } from '@/core/helpers/npcCombat';
import i18n from '@/i18n';
import type { Npc, NpcEntry } from '@/types/npc';

export const NpcActionDetails = ({
  entry,
  npc,
}: {
  entry: NpcEntry;
  npc: Npc;
}) => (
  <View className="gap-2">
    {entry.npcAttack && (
      <View className="mt-2 rounded-lg bg-slate-100 p-3 gap-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-gray-800">
            {i18n.t('npcs.attack')}
          </Text>
          <DiceRollButton
            bonuses={[
              getNpcAttackBonus({
                abilityScore: entry.npcAttack.mainAttribute
                  ? npc[entry.npcAttack.mainAttribute]
                  : undefined,
                customBonus: entry.npcAttack.customBonus,
                applyProficiency: entry.npcAttack.applyProficiency,
                proficiencyBonus: npc.proficiencyBonus,
              }),
            ]}
          />
        </View>
        {entry.npcAttack.mainAttribute && (
          <Detail
            label={i18n.t('general.attribute')}
            value={i18n.t(`attributes.${entry.npcAttack.mainAttribute}`)}
          />
        )}
        <Detail
          label={i18n.t('general.proficiency')}
          value={
            entry.npcAttack.applyProficiency
              ? i18n.t('general.apply')
              : i18n.t('general.none')
          }
        />
        <Detail
          label={i18n.t('general.mod')}
          value={formatBonus(
            getNpcAttackBonus({
              abilityScore: entry.npcAttack.mainAttribute
                ? npc[entry.npcAttack.mainAttribute]
                : undefined,
              customBonus: entry.npcAttack.customBonus,
              applyProficiency: entry.npcAttack.applyProficiency,
              proficiencyBonus: npc.proficiencyBonus,
            }),
          )}
        />
        <Detail label={i18n.t('general.range')} value={entry.npcAttack.range} />
        <Detail
          label={i18n.t('general.properties')}
          value={entry.npcAttack.properties}
        />
        <Detail
          label={i18n.t('general.description')}
          value={entry.npcAttack.description}
        />
      </View>
    )}
    {!!entry.npcDamages?.length && (
      <View className="mt-2 gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-gray-800">
            {i18n.t('titles.damages')}
          </Text>
          <ComposeDiceRollButton
            rolls={entry.npcDamages.map((damage) => ({
              label: damage.kind ?? undefined,
              amount: damage.diceAmount,
              diceSize: damage.diceSize,
              bonuses: [
                getNpcDamageBonus({
                  abilityScore: damage.mainAttribute
                    ? npc[damage.mainAttribute]
                    : undefined,
                  customBonus: damage.customBonus,
                }),
              ],
            }))}
          />
        </View>
        {entry.npcDamages.map((damage) => (
          <View key={damage.id} className="rounded-lg bg-slate-100 p-3 gap-1">
            <Text className="text-gray-800 font-medium">
              {damage.diceAmount}d{damage.diceSize}
              {damage.kind ? ` ${damage.kind}` : ''}
            </Text>
            {damage.mainAttribute && (
              <Detail
                label={i18n.t('general.attribute')}
                value={i18n.t(`attributes.${damage.mainAttribute}`)}
              />
            )}
            <Detail
              label={i18n.t('general.mod')}
              value={formatBonus(
                getNpcDamageBonus({
                  abilityScore: damage.mainAttribute
                    ? npc[damage.mainAttribute]
                    : undefined,
                  customBonus: damage.customBonus,
                }),
              )}
            />
          </View>
        ))}
      </View>
    )}
  </View>
);

const formatBonus = (bonus: number) => (bonus >= 0 ? `+${bonus}` : `${bonus}`);

const Detail = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) =>
  value == null || value === '' ? null : (
    <Text className="text-gray-600 text-sm">
      {label}: {value}
    </Text>
  );
