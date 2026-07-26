import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import {
  KeyboardAvoidingView,
  KeyboardStickyView,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StepImport } from '@/components/Characters/NewCharacterStepper/StepImport';
import { StepIndicator } from '@/components/Characters/NewCharacterStepper/StepIndicator';
import { StepName } from '@/components/Characters/NewCharacterStepper/StepName';
import { StepTableSelect } from '@/components/Characters/NewCharacterStepper/StepTableSelect';
import {
  useNewCharacterStepperForm,
  type NewCharacterStepperFormType,
} from '@/components/Characters/NewCharacterStepper/useNewCharacterStepperForm';
import { useCharacter } from '@/contexts/CharacterContext';
import i18n from '@/i18n';
import {
  useCloneCharacterMutation,
  useCreateCharacterMutation,
  useGetAllCharacters,
} from '@/services/characters/character.api';
import { useGetAllTables } from '@/services/tables/table.api';

const STEPS = [
  { key: 'table', title: i18n.t('character.steps.table') },
  { key: 'name', title: i18n.t('character.steps.name') },
  { key: 'import', title: i18n.t('character.steps.import') },
] as const;

export const NewCharacterStepper = () => {
  const drawerNavigation =
    useNavigation<DrawerNavigationProp<Record<string, undefined>>>();
  const router = useRouter();
  const { setCharacterId } = useCharacter();
  const { bottom } = useSafeAreaInsets();

  const [currentStep, setCurrentStep] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  const {
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useNewCharacterStepperForm();

  const selectedTableId = watch('tableId');
  const characterName = watch('name');
  const selectedCharacterId = watch('characterId');

  const {
    data: tables,
    isLoading: tablesLoading,
    error: tablesError,
    refetch: refetchTables,
  } = useGetAllTables();
  const {
    data: allCharacters,
    isLoading: charactersLoading,
    error: charactersError,
    refetch: refetchCharacters,
  } = useGetAllCharacters({ useTableId: false });

  const { mutate: createCharacter, isPending: isCreatePending } =
    useCreateCharacterMutation();
  const { mutateAsync: cloneCharacter, isPending: isClonePending } =
    useCloneCharacterMutation();

  const isCreating = isCreatePending || isClonePending;

  useEffect(() => {
    const handleBack = () => {
      if (currentStep > 0) {
        setCurrentStep((prev) => prev - 1);
      } else {
        router.back();
      }
    };

    drawerNavigation.setOptions({
      title: STEPS[currentStep].title,
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleBack}
          className="ml-2 p-2"
          hitSlop={10}
        >
          <ArrowLeft size={22} color="white" />
        </TouchableOpacity>
      ),
    });

    return () => {
      drawerNavigation.setOptions({
        headerLeft: undefined,
      });
    };
  }, [currentStep, drawerNavigation, router]);

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValidName = await trigger('name');
      if (!isValidName) return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const onSubmit = async (values: NewCharacterStepperFormType) => {
    if (values.characterId) {
      try {
        const data = await cloneCharacter({
          id: values.characterId,
          tableId: values.tableId ?? undefined,
          name: values.name ?? undefined,
        });
        setCharacterId(data.id);
        router.navigate('/(authenticated)/(drawer)/(tabs)');
      } catch {
        // Error is handled by mutation's onError
      }
      return;
    }

    createCharacter(
      { name: values.name, tableId: values.tableId ?? undefined },
      {
        onSuccess: (data) => {
          setCharacterId(data.id);
          router.navigate('/(authenticated)/(drawer)/(tabs)');
        },
      },
    );
  };

  const canProceed = currentStep !== 1 || characterName.trim().length >= 2;
  const isLastStep = currentStep === 2;

  return (
    <View className="flex-1 bg-slate-100">
      <StepIndicator currentStep={currentStep} />

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={footerHeight}
        className="flex-1 justify-center items-center"
      >
        {currentStep === 0 && (
          <StepTableSelect
            tables={tables}
            isLoading={tablesLoading}
            error={tablesError}
            selectedTableId={selectedTableId}
            onSelect={(id) => setValue('tableId', id)}
            onRetry={refetchTables}
          />
        )}

        {currentStep === 1 && (
          <StepName
            name={characterName}
            onChangeName={(name) =>
              setValue('name', name, { shouldValidate: true })
            }
            error={errors.name?.message}
          />
        )}

        {currentStep === 2 && (
          <StepImport
            characters={allCharacters}
            isLoading={charactersLoading}
            error={charactersError}
            selectedCharacterId={selectedCharacterId}
            onSelect={(id) => setValue('characterId', id)}
            onRetry={refetchCharacters}
          />
        )}
      </KeyboardAvoidingView>

      <KeyboardStickyView
        onLayout={(e) => setFooterHeight(e.nativeEvent.layout.height)}
      >
        <View
          className="px-4 py-3 bg-slate-100 border-t border-gray-200"
          style={{ paddingBottom: 8 + bottom }}
        >
          {isLastStep ? (
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isCreating}
              className={`bg-green-600 rounded-xl py-4 items-center ${
                isCreating ? 'opacity-75' : ''
              }`}
              activeOpacity={0.8}
            >
              {isCreating ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  {i18n.t('character.createCharacter')}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleNext}
              disabled={!canProceed}
              className={`bg-indigo-500 rounded-xl py-4 items-center ${
                canProceed ? '' : 'opacity-50'
              }`}
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-lg">
                {i18n.t('general.next')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardStickyView>
    </View>
  );
};
