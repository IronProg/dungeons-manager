import { Text, TouchableOpacity, View } from 'react-native';
import {
  PassivePerceptionFormType,
  usePassivePerceptionForm,
} from './usePassivePerceptionForm';
import { Controller } from 'react-hook-form';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import { useGeneralInfo } from 'contexts/GeneralInfoContext';
import { useSkills } from 'contexts/SkillsContext';
import { Plus } from 'lucide-react-native';

type PassivePerceptionFormProps = {
  onClose: () => void;
};

export const PassivePerceptionForm = ({
  onClose,
}: PassivePerceptionFormProps) => {
  const { generalInfo, updateGeneralInfo } = useGeneralInfo();
  const { getSkillBonus } = useSkills();
  const { control, handleSubmit } = usePassivePerceptionForm({
    passivePerceptionCustomBonus: generalInfo.passivePerceptionCustomBonus,
  });

  const percetionBonus = getSkillBonus('perception');

  const onSubmit = useCallback(
    (values: PassivePerceptionFormType) => {
      const newGeneralInfo = {
        ...generalInfo,
        passivePerceptionCustomBonus: values.passivePerceptionCustomBonus,
      };

      updateGeneralInfo(newGeneralInfo);

      onClose();
    },
    [generalInfo, onClose, updateGeneralInfo],
  );

  return (
    <View className="flex flex-col">
      <Text className="text-2xl text-center font-medium">
        Passive Perception
      </Text>

      <View className="flex flex-row gap-2 items-start">
        <View>
          <Text className="font-medium mb-3">Base</Text>
          <Text className="text-center text-xl">10</Text>
        </View>

        <View className="pt-5">
          <Plus size={16} />
        </View>

        <View>
          <Text className="font-medium mb-3">Perception</Text>
          <Text className="text-center text-xl">{percetionBonus}</Text>
        </View>

        <View className="pt-5">
          <Plus size={16} />
        </View>

        <View>
          <Text className="font-medium">Modifier</Text>
          <Controller
            control={control}
            name="passivePerceptionCustomBonus"
            render={({ field, fieldState: { error } }) => (
              <>
                <BottomSheetTextInput
                  className="text-center text-xl rounded-lg bg-gray-100 overflow-hidden h-15"
                  onChangeText={field.onChange}
                  value={`${field.value || ''}`}
                  keyboardType="numeric"
                />

                <Text className="text-red-400 text-sm">{error?.message}</Text>
              </>
            )}
          />
          <Text className="text-center"></Text>
        </View>
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
