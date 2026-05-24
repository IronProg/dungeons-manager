import { Control, Controller } from 'react-hook-form';
import { Text, View } from 'react-native';
import { AttributesFormType, useAttributesForm } from './useAttributesForm';
import { Attribute } from 'types/character';
import { ATTRIBUTES } from 'core/enums/attributes';
import { getModifier } from 'core/helpers/getModifier';
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
  useBottomSheet,
} from '@gorhom/bottom-sheet';
import i18n from 'i18n';
import { useUpdateAllAttributesMutation } from 'services/attributes/attributes';
import { useCallback } from 'react';
import { Button } from 'components/ui/Button';
import { useCharacter } from 'contexts/CharacterContext';

export type AttributesFormProps = {
  characterAttributes: Attribute[];
};

export const AttributesForm = ({
  characterAttributes,
}: AttributesFormProps) => {
  const { close } = useBottomSheet();
  const { characterId } = useCharacter();
  const { control, handleSubmit } = useAttributesForm({ characterAttributes });

  const { mutate: updateAllAttributes, isPending } =
    useUpdateAllAttributesMutation();

  const onSubmit = useCallback(
    (values: AttributesFormType) => {
      const newAttributes: Attribute[] =
        values.characterAttributesAttributes.map((attrVal) => {
          const hasTempValue =
            attrVal.tempValue !== null && attrVal.tempValue !== undefined;

          return {
            id: attrVal.id,
            name: attrVal.name as AttributesType,
            value: attrVal.value,
            tempValue: attrVal.tempValue,
            modifier: hasTempValue
              ? getModifier(attrVal.tempValue as number)
              : getModifier(attrVal.value),
          };
        });

      updateAllAttributes(
        { characterId: characterId!, attributes: newAttributes },
        { onSuccess: () => close() },
      );
    },
    [characterId, close, updateAllAttributes],
  );

  return (
    <BottomSheetScrollView
      contentContainerClassName="grow flex flex-col gap-4"
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-gray-900 font-bold text-2xl text-center">
        {i18n.t('titles.modifyAttributes')}
      </Text>

      <View className="flex flex-row justify-between flex-wrap">
        {ATTRIBUTES.map((attrName, index) => (
          <AttributeFormItem
            key={attrName}
            control={control}
            name={attrName}
            index={index}
          />
        ))}
      </View>

      <Button onPress={handleSubmit(onSubmit)} disabled={isPending} />
    </BottomSheetScrollView>
  );
};

type AttributeFormItemProps = {
  index: number;
  control: Control<AttributesFormType>;
  name: AttributesType;
};

const AttributeFormItem = ({
  index,
  control,
  name,
}: AttributeFormItemProps) => {
  return (
    <View className="w-[33%] flex items-center justify-center">
      <Text className="text-gray-900 font-bold text-center">
        {i18n.t(`attributes.${name}`)}
      </Text>

      <View className="flex flex-col gap-2 border border-gray-900 rounded-lg w-[90px] items-stretch">
        <View className=" flex-col flex">
          <Text className="text-gray-900 text-sm text-center">
            {i18n.t(`general.base`)}
          </Text>

          <Controller
            control={control}
            name={`characterAttributesAttributes.${index}.value`}
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-4xl font-bold text-center"
                  keyboardType="number-pad"
                  multiline={false}
                  {...field}
                  onChangeText={field.onChange}
                  maxLength={3}
                  value={(field.value ?? '').toString()}
                />

                {error?.message && (
                  <Text className="text-sm text-center text-red-400">
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        <View className="flex-col flex items-stretch border-t border-gray-900">
          <Text className="text-gray-900 text-sm text-center mt-2">
            {i18n.t(`general.temp`)}
          </Text>
          <Controller
            control={control}
            name={`characterAttributesAttributes.${index}.tempValue`}
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-4xl font-bold text-center"
                  keyboardType="number-pad"
                  {...field}
                  onChangeText={field.onChange}
                  maxLength={3}
                  value={(field.value ?? '').toString()}
                />

                {error?.message && (
                  <Text className="text-sm text-center text-red-400">
                    {error.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>
      </View>
    </View>
  );
};
