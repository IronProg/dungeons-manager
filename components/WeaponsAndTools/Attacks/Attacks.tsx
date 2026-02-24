import { useCallback, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { Plus, Trash } from 'lucide-react-native';
import RNModal from 'react-native-modal';
import i18n from 'i18n';

import {
  useDeleteAttackMutation,
  useGetAllAttacks,
} from 'services/attacks/attack';
import { useCharacter } from 'contexts/CharacterContext';

import { ConfirmationModal } from 'components/ui/Modals/ConfirmationModal';

import { Attack } from 'types/character';

type AttacksProps = {
  onCreate: () => void;
  onSelect: (attack: Attack) => void;
};

export const Attacks = ({ onCreate, onSelect }: AttacksProps) => {
  const { characterId, modifiers, proficiencyBonus } = useCharacter();
  const { data: attacks, isLoading } = useGetAllAttacks({
    characterId: characterId!,
  });

  const { mutate: deleteAttack } = useDeleteAttackMutation();

  const [detailedAttack, setDetailedAttack] = useState<Attack>();
  const [attackToDelete, setAttackToDelete] = useState<Attack>();

  const handleDelete = useCallback(() => {
    if (attackToDelete) {
      deleteAttack(
        { characterId: characterId!, id: attackToDelete.id! },
        {
          onSuccess: () => {
            setAttackToDelete(undefined);
          },
        },
      );
    }
  }, [attackToDelete, characterId, deleteAttack]);

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

      {isLoading && <ActivityIndicator />}

      {attacks && attacks.length > 0 ? (
        attacks?.map((attack, index) => {
          let attackModifier = attack.customBonus || 0;

          if (modifiers && attack.mainAttribute) {
            attackModifier += modifiers[attack.mainAttribute];
          }

          if (attack.applyProficiency) attackModifier += proficiencyBonus;

          return (
            <View className="flex flex-row gap-2 w-full items-start">
              <TouchableOpacity
                onPress={() => setAttackToDelete(attack)}
                onLongPress={() => onSelect(attack)}
                key={index}
                className="rounded-lg flex flex-row items-center gap-2 border-b border-gray-300 pb-2 mb-2 flex-1"
              >
                <View className="bg-white rounded-lg px-2 py-1 flex-1">
                  <Text className="line-clamp-1">{attack.name}</Text>
                  {attack.range && attack.range.length > 0 && (
                    <Text>{attack.range}</Text>
                  )}
                </View>

                <Text className="bg-white rounded-lg px-2 py-1 w-10">
                  {attackModifier >= 0 && '+'}
                  {attackModifier}
                </Text>

                <View className="bg-white rounded-lg px-2 py-1 flex-1">
                  {attack.damages.map((damage, index) => {
                    let attributeBonus = 0;

                    if (modifiers && damage.mainAttribute) {
                      attributeBonus += modifiers[damage.mainAttribute];
                    }

                    const diceText = `${damage.diceAmount && damage.diceAmount + 'd'}${damage.diceSize}`;

                    return (
                      <Text className="" key={index}>
                        {diceText}{' '}
                        {`${attributeBonus >= 0 ? '+' : ''}${attributeBonus}`}{' '}
                        {damage.customBonus && `+${damage.customBonus}`}{' '}
                        {damage.kind}
                      </Text>
                    );
                  })}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setAttackToDelete(attack)}
                className="bg-red-500 rounded-full p-2 mt-2"
              >
                <Trash size={16} color="white" />
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <Text>{i18n.t('attacks.noneFound')}</Text>
      )}

      <ConfirmationModal
        isVisible={!!attackToDelete}
        onClose={() => setAttackToDelete(undefined)}
        onConfirm={handleDelete}
      />

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
