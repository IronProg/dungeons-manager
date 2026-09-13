import { Text, View } from 'react-native';

import i18n from '@/i18n';
import type { NpcEntry } from '@/types/npc';

export const NpcActionDetails = ({ entry }: { entry: NpcEntry }) => (
  <View className="gap-2">
    {entry.npcAttack && (
      <View className="mt-2 rounded-lg bg-slate-100 p-3 gap-1">
        <Text className="font-semibold text-gray-800">
          {i18n.t('npcs.attack')}
        </Text>
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
          value={entry.npcAttack.customBonus}
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
        <Text className="font-semibold text-gray-800">
          {i18n.t('titles.damages')}
        </Text>
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
            <Detail label={i18n.t('general.mod')} value={damage.customBonus} />
          </View>
        ))}
      </View>
    )}
  </View>
);

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
