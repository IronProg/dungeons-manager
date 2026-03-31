import { Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { Trash } from 'lucide-react-native';
import i18n from 'i18n';

import { SpellFormValues } from './useSpellForm';

import { SpellLevelPicker } from 'components/ui/inputs/SpellLevelPicker';
import { SpellSchoolPicker } from 'components/ui/inputs/SpellSchoolPicker';

import { Spell, SpellSlotLevelType } from 'types/character';

interface SpellFormInputsProps {
  spell?: Spell;
  control: Control<SpellFormValues>;
  watch: UseFormWatch<SpellFormValues>;
  isEditing: boolean;
  setDeleting: (deleting: boolean) => void;
}

export const SpellFormInputs = ({
  control,
  watch,
  isEditing,
  setDeleting,
}: SpellFormInputsProps) => {
  const materialChecked = watch('material');

  return (
    <>
      <View className="flex flex-row gap-4 justify-between items-start">
        <View className="flex flex-col grow flex-1 gap-1">
          <Text className="text-gray-600 font-bold grow flex-1">
            {i18n.t('spells.name')}
          </Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 p-3 rounded-lg text-lg"
                onChangeText={onChange}
                value={value}
                placeholder={i18n.t('spells.name')}
                placeholderTextColor={'#9ca3af'}
              />
            )}
          />
        </View>

        {isEditing && (
          <TouchableOpacity
            onPress={() => setDeleting(true)}
            className={`bg-red-500 p-2 rounded-xl mt-8 items-center`}
          >
            <Trash size={24} color={'white'} />
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row gap-4">
        <View className="flex-1 gap-1">
          <Text className="text-gray-600 font-bold">
            {i18n.t('spells.level')}
          </Text>
          <Controller
            control={control}
            name="level"
            render={({ field: { onChange, value } }) => (
              <SpellLevelPicker
                value={value as SpellSlotLevelType}
                onChange={onChange}
              />
            )}
          />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-gray-600 font-bold">
            {i18n.t('spells.school')}
          </Text>
          <Controller
            control={control}
            name="school"
            render={({ field: { onChange, value } }) => (
              <SpellSchoolPicker value={value} onChange={onChange} />
            )}
          />
        </View>
      </View>

      <View className="flex-row gap-4">
        <View className="flex-1 gap-1">
          <Text className="text-gray-600 font-bold">
            {i18n.t('spells.castingTime')}
          </Text>
          <Controller
            control={control}
            name="castingTime"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-gray-600 font-bold">
            {i18n.t('spells.range')}
          </Text>
          <Controller
            control={control}
            name="range"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
      </View>

      <View className="flex-row gap-4">
        <View className="flex-1 gap-1">
          <Text className="text-gray-600 font-bold">
            {i18n.t('spells.duration')}
          </Text>
          <Controller
            control={control}
            name="duration"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-gray-600 font-bold">
            {i18n.t('spells.target')}
          </Text>
          <Controller
            control={control}
            name="target"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
      </View>

      <View className="flex-row flex-wrap gap-4 items-center justify-between bg-gray-50 p-3 rounded-lg">
        <View className="flex-row items-center gap-2">
          <Text className="text-xs font-bold">{i18n.t('spells.verbal')}</Text>
          <Controller
            control={control}
            name="verbal"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-xs font-bold">{i18n.t('spells.somatic')}</Text>
          <Controller
            control={control}
            name="somatic"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-xs font-bold">{i18n.t('spells.material')}</Text>
          <Controller
            control={control}
            name="material"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-xs font-bold">
            {i18n.t('spells.concentration')}
          </Text>
          <Controller
            control={control}
            name="concentration"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />

          <Text className="text-xs font-bold">{i18n.t('spells.ritual')}</Text>
          <Controller
            control={control}
            name="ritual"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        </View>
      </View>

      {materialChecked && (
        <View className="gap-1">
          <Text className="text-gray-600 font-bold">
            {i18n.t('spells.components')}
          </Text>
          <Controller
            control={control}
            name="components"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-gray-100 p-3 rounded-lg"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
      )}

      <View className="gap-1">
        <Text className="text-gray-600 font-bold">
          {i18n.t('spells.innateTotal')}
        </Text>
        <Controller
          control={control}
          name="innateTotal"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-gray-100 p-3 rounded-lg"
              keyboardType="numeric"
              onChangeText={onChange}
              value={`${value}`}
            />
          )}
        />
      </View>

      <View className="gap-1">
        <Text className="text-gray-600 font-bold">
          {i18n.t('spells.description')}
        </Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-gray-100 p-3 rounded-lg min-h-[100px]"
              multiline
              textAlignVertical="top"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View className="gap-1">
        <Text className="text-gray-600 font-bold">
          {i18n.t('spells.higherLevelDescription')}
        </Text>
        <Controller
          control={control}
          name="higherLevelDescription"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="bg-gray-100 p-3 rounded-lg min-h-[80px]"
              multiline
              textAlignVertical="top"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
    </>
  );
};
