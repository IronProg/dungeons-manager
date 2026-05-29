import { Plus, Trash } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Portal } from 'react-native-portalize';

import type { DisposableBottomSheetHandle } from '@/components/ui/BottomSheet/DisposableBottomSheet';
import { DisposableBottomSheet } from '@/components/ui/BottomSheet/DisposableBottomSheet';
import { ComposeDiceRollButton } from '@/components/ui/ComposeDiceRollButton';
import { DiceRollButton } from '@/components/ui/DiceRollButton';
import { BaseModal } from '@/components/ui/Modals/BaseModal';
import { ConfirmationModal } from '@/components/ui/Modals/ConfirmationModal';
import type { AttacksFormProps } from '@/components/WeaponsAndTools/Attacks/AttacksForm.tsx';
import { AttacksForm } from '@/components/WeaponsAndTools/Attacks/AttacksForm.tsx';
import { useCharacter } from '@/contexts/CharacterContext';
import { useModalTextHeight } from '@/hooks/useModalTextHeight';
import i18n from '@/i18n';
import {
  useDeleteAttackMutation,
  useGetAllAttacks,
} from '@/services/attacks/attack';
import type { Attack } from '@/types/character';

type AttacksProps = { canEdit: boolean };

const snapPoints = ['95%'];

export const Attacks = ({ canEdit }: AttacksProps) => {
  const { modalTextHeight } = useModalTextHeight();
  const { characterId, modifiers, proficiencyBonus } = useCharacter();
  const { data: attacks, isLoading } = useGetAllAttacks();

  const ref = useRef<DisposableBottomSheetHandle<AttacksFormProps>>(null);

  const { mutate: deleteAttack } = useDeleteAttackMutation();

  const [detailedAttack, setDetailedAttack] = useState<Attack>();
  const [attackToDelete, setAttackToDelete] = useState<Attack>();

  const handleDelete = () => {
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
  };

  return (
    <>
      <View className="flex flex-row justify-between mb-2 items-center">
        <View />

        <Text className="mt-4 text-black text-2xl font-bold text-center flex-1 grow">
          {i18n.t('titles.attacks')}
        </Text>

        {canEdit && (
          <TouchableOpacity
            onPress={() => ref.current?.show({})}
            className="rounded-full bg-green-500 p-2"
          >
            <Plus size={16} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {isLoading && <ActivityIndicator />}

      {attacks && attacks.length > 0 ? (
        attacks?.map((attack, index) => {
          let attackModifier = attack.customBonus ?? 0;

          if (modifiers && attack.mainAttribute) {
            attackModifier += modifiers[attack.mainAttribute];
          }

          if (attack.applyProficiency) attackModifier += proficiencyBonus;

          return (
            <View
              key={attack.id}
              className="flex flex-row gap-2 w-full items-center border-b border-gray-300"
            >
              <TouchableOpacity
                onPress={() => setDetailedAttack(attack)}
                onLongPress={
                  canEdit ? () => ref.current?.show({ attack }) : undefined
                }
                key={index}
                className="rounded-lg flex flex-row items-center gap-2 mb-2 flex-1"
              >
                <DiceRollButton bonuses={[attackModifier]} />

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

                <ComposeDiceRollButton
                  style={{ width: 14, height: 14 }}
                  containerClassName="p-1.5"
                  rolls={attack.damages.map((damage) => {
                    const attributeBonus = damage.mainAttribute
                      ? (modifiers?.[damage.mainAttribute] ?? 0)
                      : 0;

                    return {
                      label: damage.kind,
                      amount: damage.diceAmount ?? 0,
                      diceSize: damage.diceSize ?? 20,
                      bonuses: [attributeBonus, damage.customBonus ?? 0],
                    };
                  })}
                />

                <View className="bg-white rounded-lg px-2 py-1 flex-1 flex flex-col">
                  {attack.damages.map((damage, index) => {
                    let attributeBonus = 0;

                    if (modifiers && damage.mainAttribute) {
                      attributeBonus += modifiers[damage.mainAttribute];
                    }

                    const diceText = `${damage.diceAmount && damage.diceAmount + 'd'}${damage.diceSize}`;

                    return (
                      <View
                        key={index}
                        className="flex flex-row justify-between items-center border-b border-gray-300 py-0.5"
                      >
                        <Text className="flex-1">
                          {diceText}{' '}
                          {`${attributeBonus >= 0 ? '+' : ''}${attributeBonus}`}{' '}
                          {damage.customBonus && `+${damage.customBonus}`}{' '}
                          {damage.kind}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </TouchableOpacity>

              {canEdit && (
                <TouchableOpacity
                  onPress={() => setAttackToDelete(attack)}
                  className="bg-red-500 rounded-full p-2"
                >
                  <Trash size={16} color="white" />
                </TouchableOpacity>
              )}
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

      <BaseModal
        visible={!!detailedAttack}
        onClose={() => setDetailedAttack(undefined)}
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

              <ScrollView style={{ maxHeight: modalTextHeight }}>
                <Text>{detailedAttack.description}</Text>
              </ScrollView>
            </View>
          )}
        </View>
      </BaseModal>

      <Portal>
        <DisposableBottomSheet
          ref={ref}
          snapPoints={snapPoints}
          renderContent={({ params }) => <AttacksForm {...params} />}
        />
      </Portal>
    </>
  );
};
