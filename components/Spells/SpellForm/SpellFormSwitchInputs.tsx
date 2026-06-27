import { Controller, useWatch } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { Switch, Text, TextInput, View } from 'react-native';

import type { SpellFormValues } from '@/components/Spells/SpellForm/useSpellForm';
import i18n from '@/i18n';

interface SpellFormSwitchInputsProps {
  control: Control<SpellFormValues>;
}

export const SpellFormSwitchInputs = ({
  control,
}: SpellFormSwitchInputsProps) => {
  const materialChecked = useWatch({ control, name: 'material' });

  return (
    <View className="gap-4">
      <View className="flex-row flex-wrap gap-6 items-center justify-start bg-gray-50 p-3 rounded-lg">
        <View className="flex-col items-center gap-2">
          <Text className="text-xs font-bold">{i18n.t('spells.verbal')}</Text>
          <Controller
            control={control}
            name="verbal"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        </View>

        <View className="flex-col items-center gap-2">
          <Text className="text-xs font-bold">{i18n.t('spells.somatic')}</Text>
          <Controller
            control={control}
            name="somatic"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        </View>

        <View className="flex-col items-center gap-2">
          <Text className="text-xs font-bold">{i18n.t('spells.material')}</Text>
          <Controller
            control={control}
            name="material"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} />
            )}
          />
        </View>

        <View className="flex-col items-center gap-2">
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
        </View>

        <View className="flex-col items-center gap-2">
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
    </View>
  );
};
