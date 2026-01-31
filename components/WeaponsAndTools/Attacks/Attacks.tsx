import { Info, Plus, Trash } from 'lucide-react-native';
import {
  ActivityIndicator,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Attack } from 'types/character';
import RNModal from 'react-native-modal';
import { useCallback, useState } from 'react';
import i18n from 'i18n';
import {
  useDeleteAttackMutation,
  useGetAllAttacks,
} from 'services/attacks/attack';
import { useCharacter } from 'contexts/CharacterContext';

type AttacksProps = {
  onCreate: () => void;
  onSelect: (attack: Attack) => void;
};

export const Attacks = ({ onCreate, onSelect }: AttacksProps) => {
  const { characterId } = useCharacter();
  const { data: attacks, isLoading } = useGetAllAttacks({
    characterId: characterId!,
  });

  const { mutate: deleteAttack } = useDeleteAttackMutation();

  const [detailedAttack, setDetailedAttack] = useState<Attack>();
  const [deleteMode, setDeleteMode] = useState<boolean>(false);

  const handleDelete = useCallback(
    (attack: Attack) => {
      deleteAttack({ characterId: characterId!, id: attack.id! });
    },
    [characterId, deleteAttack],
  );

  return (
    <>
      <View className="flex flex-row justify-between mb-2 items-center">
        <TouchableHighlight
          onPress={() => setDeleteMode((prev) => !prev)}
          className={`rounded-full p-2 ${deleteMode ? 'bg-slate-500' : 'bg-red-500'}`}
        >
          {deleteMode ? (
            <Info color="white" size={16} />
          ) : (
            <Trash color="white" size={16} />
          )}
        </TouchableHighlight>

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
          // const attributeModifier = attack.mainAttribute
          //   ? modifiers[attack.mainAttribute]
          //   : 0;
          const attributeModifier = 3;

          const attackBonus =
            // attributeModifier + (attack.applyProficiency ? proficiency : 0);
            attributeModifier + (attack.applyProficiency ? 2 : 0);

          return (
            <TouchableOpacity
              onPress={() => !deleteMode && setDetailedAttack(attack)}
              onLongPress={() => !deleteMode && onSelect(attack)}
              key={index}
              className="rounded-lg flex flex-row items-center gap-2 border-b border-gray-300 pb-2 mb-2 relative"
            >
              <View className="bg-gray-100 rounded-lg px-2 py-1 grow">
                <Text>{attack.name}</Text>
                <Text>{attack.range}</Text>
              </View>
              <Text className="bg-gray-100 rounded-lg px-2 py-1">
                {attackBonus >= 0 && '+'}
                {attackBonus}
              </Text>
              <View className="flex flex-col bg-gray-100 rounded-lg px-2 py-1 grow">
                {attack.damages.map((damage, index) => {
                  const attributeModifier = damage.mainAttribute ? 2 : 0;

                  const diceText = `${damage.diceAmount && damage.diceAmount + 'd'}${damage.diceSize}`;
                  return (
                    <Text className="" key={index}>
                      {diceText}{' '}
                      {`${attributeModifier >= 0 ? '+' : ''}${attributeModifier}`}{' '}
                      {damage.customBonus && `+${damage.customBonus}`}{' '}
                      {damage.kind}
                    </Text>
                  );
                })}
              </View>

              {deleteMode && (
                <View className="absolute inset-y-0 right-2 flex flex-row items-center">
                  <TouchableHighlight
                    onPress={() => handleDelete(attack)}
                    className="bg-red-500 rounded-full p-2"
                  >
                    <Trash size={16} color="white" />
                  </TouchableHighlight>
                </View>
              )}
            </TouchableOpacity>
          );
        })
      ) : (
        <Text>No attacks found</Text>
      )}

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
