import { Check } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { cn } from '@/core/helpers/cn';
import i18n from '@/i18n';

const STEPS = [
  { key: 'table', label: i18n.t('character.stepLabels.table') },
  { key: 'name', label: i18n.t('character.stepLabels.name') },
  { key: 'import', label: i18n.t('character.stepLabels.import') },
] as const;

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <View className="items-center pt-4 pb-6">
      <View className="flex-row items-center">
        {STEPS.map((step, index) => (
          <View key={step.key} className="flex-row items-center">
            <View
              className={`w-8 h-8 rounded-full items-center justify-center ${
                index < currentStep
                  ? 'bg-green-500'
                  : index === currentStep
                    ? 'bg-indigo-500'
                    : 'bg-gray-300'
              }`}
            >
              {index < currentStep ? (
                <Check size={16} color="white" />
              ) : (
                <Text className="text-white font-bold text-sm">
                  {index + 1}
                </Text>
              )}
            </View>

            {index < STEPS.length - 1 && (
              <View
                className={`w-8 h-0.5 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            )}
          </View>
        ))}
      </View>

      <View className="flex-row justify-between w-44 mt-2">
        {STEPS.map((step, index) => (
          <Text
            key={step.key}
            className={cn(
              'text-xs text-center w-10',
              index === 1 || index === 2 ? 'ml-4' : 'ml-0',
              index === currentStep
                ? 'text-indigo-600 font-medium'
                : 'text-gray-400',
            )}
          >
            {step.label}
          </Text>
        ))}
      </View>
    </View>
  );
};
