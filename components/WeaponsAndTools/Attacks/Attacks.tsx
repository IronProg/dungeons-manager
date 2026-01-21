import { useAttacks } from 'contexts/AttacksContext';
import { useAttributes } from 'contexts/AttributesContext';
import { useCharacters } from 'contexts/CharactersContext';
import { Plus } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Attack } from 'types/character';
import RNModal from 'react-native-modal';
import { useState } from 'react';
import i18n from 'i18n';

type AttacksProps = {
  onCreate: () => void;
  onSelect: (attack: Attack) => void;
};

export const Attacks = ({ onCreate, onSelect }: AttacksProps) => {
  const [detailedAttack, setDetailedAttack] = useState<Attack>();

  const { proficiency } = useCharacters();
  const { modifiers } = useAttributes();
  const { attacks } = useAttacks();

  return (
    <>
      <View className="flex flex-row justify-between mb-2 items-center">
        <View />

        <Text className="mt-4 text-black text-2xl font-bold text-center">
          {i18n.t('titles.attacks')}
        </Text>

        <TouchableOpacity
          onPress={onCreate}
          className="rounded-full bg-green-500 p-2"
        >
          <Plus size={16} color={'white'} />
        </TouchableOpacity>
      </View>

      {attacks?.map((attack, index) => {
        const attributeModifier = attack.attribute
          ? modifiers[attack.attribute]
          : 0;

        const attackBonus =
          attributeModifier + (attack.applyProficiency ? proficiency : 0);

        return (
          <TouchableOpacity
            onPress={() => setDetailedAttack(attack)}
            onLongPress={() => onSelect(attack)}
            key={index}
            className="rounded-lg flex flex-row items-center gap-2 border-b border-gray-300 pb-2 mb-2"
          >
            <View className="bg-gray-100 rounded-lg px-2 py-1 grow">
              <Text>{attack.name}</Text>
              <Text>{attack.range}</Text>
            </View>
            <Text className="bg-gray-100 rounded-lg px-2 py-1">
              {attackBonus > 0 && '+'}
              {attackBonus}
            </Text>
            <View className="flex flex-col bg-gray-100 rounded-lg px-2 py-1 grow">
              {attack.damages.map((damage, index) => {
                const attributeModifier = damage.attribute
                  ? modifiers[damage.attribute]
                  : 0;

                return (
                  <Text className="" key={index}>
                    {damage.dice}{' '}
                    {`${attributeModifier > 0 ? '+' : ''}${attributeModifier}`}{' '}
                    {damage.customBonus && damage.customBonus} {damage.kind}
                  </Text>
                );
              })}
            </View>
          </TouchableOpacity>
        );
      })}

      <RNModal
        isVisible={!!detailedAttack}
        onBackdropPress={() =>
          requestAnimationFrame(() => {
            setDetailedAttack(undefined);
          })
        }
      >
        <View className="flex flex-col rounded-lg bg-white gap-4 items-stretch p-4">
          <Text className="text-2xl font-medium text-center">
            {detailedAttack?.name}
          </Text>

          {detailedAttack?.properties && (
            <View className="flex flex-col gap-2">
              <Text className="font-medium">
                {i18n.t('general.properties')}:
              </Text>

              <Text>{detailedAttack.properties}</Text>
            </View>
          )}

          {detailedAttack?.description && (
            <View className="flex flex-col gap-2">
              <Text className="font-medium">
                {i18n.t('general.description')}:
              </Text>

              <Text>{detailedAttack.description}</Text>
            </View>
          )}
        </View>
      </RNModal>
    </>
  );
};
