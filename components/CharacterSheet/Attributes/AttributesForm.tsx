import { Control, Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { AttributesFormType, useAttributesForm } from './useAttributesForm';
import { Attribute, AttributesType } from 'types/character';
import { ATTRIBUTES } from 'core/enums/attributes';
import { getModifier } from 'core/helpers/getModifier';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAttributes } from 'contexts/AttributesContext';

type AttributesFormProps = {
  attributes: Attribute[];
  onClose: () => void;
};

export const AttributesForm = ({
  attributes,
  onClose,
}: AttributesFormProps) => {
  const { updateAttributes } = useAttributes();
  const { control, handleSubmit } = useAttributesForm({ attributes });

  const onSubmit = (values: AttributesFormType) => {
    const newAttributes: Attribute[] = values.attributes.map((attrVal) => ({
      name: attrVal.name,
      value: attrVal.value,
      tempValue: attrVal.tempValue,
      modifier: attrVal.tempValue
        ? getModifier(attrVal.tempValue)
        : getModifier(attrVal.value),
    }));

    updateAttributes(newAttributes);

    onClose();
  };

  return (
    <KeyboardAwareScrollView className="flex-1">
      <View className="flex flex-col gap-4">
        <Text className="text-gray-900 font-bold text-2xl text-center">
          Modificar Atributos
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

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="w-full bg-primary-600 rounded-lg py-2"
        >
          <Text className="text-white font-bold text-2xl text-center">
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
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
      <Text className="text-gray-900 font-bold text-center">{name}</Text>

      <View className="flex flex-col gap-2 border border-gray-900 rounded-lg w-[90px] items-stretch">
        <View className=" flex-col flex">
          <Text className="text-gray-900 text-sm text-center">Base</Text>
          <Controller
            control={control}
            name={`attributes.${index}.value`}
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-4xl font-bold text-center"
                  keyboardType="number-pad"
                  {...field}
                  onChangeText={field.onChange}
                  maxLength={3}
                  value={`${field.value || ''}`}
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
          <Text className="text-gray-900 text-sm text-center mt-2">Temp</Text>
          <Controller
            control={control}
            name={`attributes.${index}.tempValue`}
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-4xl font-bold text-center"
                  keyboardType="number-pad"
                  {...field}
                  onChangeText={field.onChange}
                  maxLength={3}
                  value={`${field.value || ''}`}
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
