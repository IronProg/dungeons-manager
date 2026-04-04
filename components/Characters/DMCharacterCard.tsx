import React from 'react';
import { View, Text } from 'react-native';
import i18n from 'i18n';
import {
  Heart,
  Shield,
  Zap,
  Footprints,
  Eye,
  Coins,
  Package,
  Dna,
} from 'lucide-react-native';
import { TableCharacter } from 'types/table_character';

interface DMCharacterCardProps {
  character: TableCharacter;
}

export const DMCharacterCard: React.FC<DMCharacterCardProps> = ({
  character,
}) => {
  const {
    generalInfo,
    characterAttributes,
    savingThrows,
    proficiencyBonus,
    currencies,
    resources,
    level,
    name,
  } = character;

  const getAttribute = (name: string) =>
    characterAttributes.find((a) => a.name === name);

  const getSavingThrow = (attrName: string) =>
    savingThrows.find((s) => s.mainAttribute === attrName);

  const calculateSavingThrow = (attrName: string) => {
    const attr = getAttribute(attrName);
    const save = getSavingThrow(attrName);
    if (!attr || !save) return 0;

    let bonus = attr.modifier + (save.customBonus || 0);
    if (save.proficiency) bonus += proficiencyBonus;
    return bonus;
  };

  const renderAttribute = (name: string, label: string) => {
    const attr = getAttribute(name);
    const saveBonus = calculateSavingThrow(name);

    return (
      <View key={name} className="items-center justify-center p-1 w-1/3">
        <View className="bg-slate-50 border border-slate-200 rounded-lg p-2 w-full items-center">
          <Text className="text-[10px] uppercase text-slate-500 font-bold">
            {label.substring(0, 3)}
          </Text>
          <Text className="text-lg font-bold text-slate-900">
            {attr
              ? attr.modifier >= 0
                ? `+${attr.modifier}`
                : attr.modifier
              : 0}
          </Text>
          <View className="flex-row items-center mt-1">
            <View
              className={`w-1.5 h-1.5 rounded-full mr-1 ${getSavingThrow(name)?.proficiency ? 'bg-emerald-500' : 'bg-slate-300'}`}
            />
            <Text className="text-[10px] text-slate-400">
              Save: {saveBonus >= 0 ? `+${saveBonus}` : saveBonus}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden border border-slate-100">
      <View className="bg-indigo-600 px-4 py-3 flex-row justify-between items-center">
        <View>
          <Text className="text-white font-bold text-lg">{name}</Text>
          <Text className="text-indigo-200 text-xs">
            {i18n.t('general.level')} {level}
          </Text>
        </View>

        <View className="bg-white/20 px-2 py-1 rounded-md">
          <Text className="text-white font-bold text-xs">
            Prof: +{proficiencyBonus}
          </Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row flex-wrap justify-between mb-4 border-b border-slate-100 pb-4">
          <StatBox
            icon={<Heart size={16} color="#ef4444" />}
            label={i18n.t('titles.hp')}
            value={`${generalInfo.hitPoints}/${generalInfo.hitPointsLimit}`}
            subValue={
              generalInfo.temporaryHitPoints
                ? `+${generalInfo.temporaryHitPoints} temp`
                : undefined
            }
          />

          <StatBox
            icon={<Shield size={16} color="#3b82f6" />}
            label={i18n.t('titles.ac')}
            value={generalInfo.armorClassBase}
          />

          <StatBox
            icon={<Zap size={16} color="#eab308" />}
            label={i18n.t('titles.initiative')}
            value={generalInfo.initiativeCustomBonus || 0}
          />

          <StatBox
            icon={<Footprints size={16} color="#8b5cf6" />}
            label={i18n.t('titles.speed')}
            value={`${generalInfo.speed}ft`}
          />
        </View>

        <View className="flex-row flex-wrap justify-between mb-4 border-b border-slate-100 pb-4">
          <StatBox
            icon={<Eye size={16} color="#6366f1" />}
            label="Pass. Perc."
            value={
              10 +
              (getAttribute('wisdom')?.modifier || 0) +
              (getSavingThrow('perception')?.proficiency ? proficiencyBonus : 0)
            }
          />
          <StatBox
            icon={<Dna size={16} color="#f97316" />}
            label="Exhaustion"
            value={generalInfo.exhaustion || 0}
          />
          <StatBox
            icon={<Package size={16} color="#94a3b8" />}
            label="Hit Dice"
            value={`${character.hitDiceAmount}/${character.hitDicesMaximum}`}
          />
        </View>

        {/* Attributes Grid */}
        <View className="flex-row flex-wrap -m-1 mb-4">
          {renderAttribute('strength', i18n.t('attributes.strength'))}
          {renderAttribute('dexterity', i18n.t('attributes.dexterity'))}
          {renderAttribute('constitution', i18n.t('attributes.constitution'))}
          {renderAttribute('intelligence', i18n.t('attributes.intelligence'))}
          {renderAttribute('wisdom', i18n.t('attributes.wisdom'))}
          {renderAttribute('charisma', i18n.t('attributes.charisma'))}
        </View>

        {/* Currencies & Resources */}
        <View className="flex-row gap-4">
          {/* Currencies */}
          <View className="flex-1 bg-amber-50 rounded-xl p-3">
            <View className="flex-row items-center mb-2">
              <Coins size={14} color="#b45309" />
              <Text className="text-amber-800 font-bold text-xs ml-1">
                {i18n.t('titles.currencies')}
              </Text>
            </View>
            <View className="flex-row flex-wrap gap-x-3 gap-y-1">
              <CurrencyItem label="GP" value={currencies.goldPoints} />
              <CurrencyItem label="SP" value={currencies.silverPoints} />
              <CurrencyItem label="CP" value={currencies.copperPoints} />
              <CurrencyItem label="EP" value={currencies.electrumPoints} />
              <CurrencyItem label="PP" value={currencies.platinumPoints} />
            </View>
          </View>

          {/* Resources */}
          <View className="flex-1 bg-emerald-50 rounded-xl p-3">
            <View className="flex-row items-center mb-2">
              <Package size={14} color="#047857" />
              <Text className="text-emerald-800 font-bold text-xs ml-1">
                Resources
              </Text>
            </View>
            {resources.slice(0, 3).map((res, i) => (
              <View key={i} className="flex-row justify-between mb-0.5">
                <Text
                  className="text-[10px] text-emerald-700 truncate flex-1 mr-1"
                  numberOfLines={1}
                >
                  {res.name}
                </Text>
                <Text className="text-[10px] font-bold text-emerald-900">
                  {res.amount}/{res.max || '-'}
                </Text>
              </View>
            ))}
            {resources.length === 0 && (
              <Text className="text-[10px] text-emerald-600 italic">
                No resources
              </Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const StatBox = ({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
}) => (
  <View className="items-center w-1/4">
    <View className="mb-1">{icon}</View>
    <Text className="text-[9px] text-slate-400 font-medium uppercase text-center">
      {label}
    </Text>
    <Text className="text-sm font-bold text-slate-800 text-center">
      {value}
    </Text>
    {subValue && <Text className="text-[8px] text-slate-400">{subValue}</Text>}
  </View>
);

const CurrencyItem = ({ label, value }: { label: string; value: number }) => (
  <View className="flex-row items-baseline">
    <Text className="text-[10px] font-bold text-amber-900 mr-0.5">{value}</Text>
    <Text className="text-[8px] text-amber-600">{label}</Text>
  </View>
);
