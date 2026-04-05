import React, { useRef } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import i18n from 'i18n';

import { useGetAllAttributes } from 'services/attributes/attributes';
import { useCharacter } from 'contexts/CharacterContext';

import { AttributesForm, AttributesFormProps } from './AttributesForm';
import {
  DisposableBottomSheet,
  DisposableBottomSheetHandle,
} from 'components/ui/BottomSheet/DisposableBottomSheet';
import { Portal } from 'react-native-portalize';

import { Attribute } from 'types/character';

const snapPoints = [550, 875];

export const MainCharacterSheetAttributes = () => {
  const ref = useRef<DisposableBottomSheetHandle<AttributesFormProps>>(null);
  const { canEdit } = useCharacter();

  const { data: characterAttributes } = useGetAllAttributes();

  if (characterAttributes?.length !== 6) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View className="flex rounded-lg">
        <View className="flex flex-row flex-wrap justify-between p-2 gap-y-2">
          <AttributeCard
            onLongPress={() =>
              ref.current?.show({ characterAttributes: characterAttributes! })
            }
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'strength',
              )!
            }
            canEdit={canEdit}
          />
          <AttributeCard
            onLongPress={() =>
              ref.current?.show({ characterAttributes: characterAttributes! })
            }
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'dexterity',
              )!
            }
            canEdit={canEdit}
          />
          <AttributeCard
            onLongPress={() =>
              ref.current?.show({ characterAttributes: characterAttributes! })
            }
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'constitution',
              )!
            }
            canEdit={canEdit}
          />
          <AttributeCard
            onLongPress={() =>
              ref.current?.show({ characterAttributes: characterAttributes! })
            }
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'intelligence',
              )!
            }
            canEdit={canEdit}
          />
          <AttributeCard
            onLongPress={() =>
              ref.current?.show({ characterAttributes: characterAttributes! })
            }
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'wisdom',
              )!
            }
            canEdit={canEdit}
          />
          <AttributeCard
            onLongPress={() =>
              ref.current?.show({ characterAttributes: characterAttributes! })
            }
            attribute={
              characterAttributes.find(
                (attribute) => attribute.name === 'charisma',
              )!
            }
            canEdit={canEdit}
          />
        </View>
      </View>

      <Portal>
        <DisposableBottomSheet
          ref={ref}
          snapPoints={snapPoints}
          renderContent={({ params }) => <AttributesForm {...params} />}
        />
      </Portal>
    </>
  );
};

type AttributeCardProps = {
  attribute: Attribute;
  onLongPress: () => void;
  canEdit: boolean;
};

const AttributeCard = ({
  attribute,
  onLongPress,
  canEdit,
}: AttributeCardProps) => {
  return (
    <View className="w-[33%] px-4 flex justify-center py-1">
      <TouchableOpacity
        onLongPress={canEdit ? onLongPress : undefined}
        className="relative border-gray-900 rounded-lg flex-col flex items-stretch"
      >
        <Text className="text-gray-900 text-xs font-semibold text-center">
          {i18n.t(`attributes.${attribute.name}`)}
        </Text>
        <Text className="text-2xl font-bold text-center">
          {attribute.modifier}
        </Text>
        <View className="absolute rounded-full bg-gray-200 p-1 bottom-0 min-w-7">
          <Text className="text-gray-900 text-sm font-semibold text-center">
            {attribute?.tempValue || attribute.value}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
