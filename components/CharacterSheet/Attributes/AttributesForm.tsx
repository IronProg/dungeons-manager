import { Control, Controller } from 'react-hook-form';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { AttributesFormType, useAttributesForm } from './useAttributesForm';
import { Character } from 'types/character';

type AttributesFormProps = {
  character: Character;
};

export const AttributesForm = ({ character }: AttributesFormProps) => {
  const { control, handleSubmit } = useAttributesForm({ character });

  const onSubmit = (values: AttributesFormType) => {
    Alert.alert('Int = ' + values.intelligence);
  };

  return (
    <View className="flex flex-col gap-4">
      <Text className="text-gray-900 font-bold text-2xl text-center">
        Modificar Atributos
      </Text>

      <View className="flex flex-row justify-between flex-wrap gap-4">
        <AttributeFormItem control={control} name="strength" text="Força" />
        <AttributeFormItem control={control} name="dexterity" text="Destreza" />
        <AttributeFormItem
          control={control}
          name="constitution"
          text="Constituição"
        />
      </View>
      <View className="flex flex-row justify-between flex-wrap gap-4">
        <AttributeFormItem
          control={control}
          name="intelligence"
          text="Inteligência"
        />
        <AttributeFormItem control={control} name="wisdom" text="Sabedoria" />
        <AttributeFormItem control={control} name="charisma" text="Carisma" />
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
  );
};

type AttributeFormItemProps = {
  control: Control<AttributesFormType>;
  name: keyof AttributesFormType;
  text: string;
};

const AttributeFormItem = ({ name, control, text }: AttributeFormItemProps) => {
  return (
    <View className="border border-gray-900 rounded-lg flex-col flex w-[90px] items-stretch">
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <TextInput
            className="text-4xl font-bold text-center h-20"
            {...field}
            onChangeText={field.onChange}
            maxLength={3}
            value={`${field.value}`}
          />
        )}
      />
      <Text className="text-gray-900 text-sm text-bold border-t border-gray-900 text-center">
        {text}
      </Text>
    </View>
  );
};
