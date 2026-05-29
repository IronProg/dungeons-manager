import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import type {
  BottomSheetBackdropProps,
  BottomSheetModal as BottomSheetModalType,
} from '@gorhom/bottom-sheet';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

import type { ComposeRollParams } from '@/contexts/DiceRollContext';
import { cn } from '@/core/helpers/cn';
import i18n from '@/i18n';

const ROLL_DURATION_MS = 1500;

export type ComposeRollSheetHandle = {
  roll: (params: ComposeRollParams) => void;
  dismiss: () => void;
};

type RollResult = {
  label?: string;
  diceSize: number;
  result: number;
};

type ResultGroup = {
  label?: string;
  dice: RollResult[];
  bonuses: number[];
};

export const ComposeRollSheet = forwardRef<
  ComposeRollSheetHandle,
  Record<string, unknown>
>((_, ref) => {
  const modalRef = useRef<BottomSheetModalType>(null);
  const [diceAmount, setDiceAmount] = useState<number>(0);
  const [displayNumber, setDisplayNumber] = useState<number>(0);
  const [resultGroups, setResultGroups] = useState<ResultGroup[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  // eslint-disable-next-line no-restricted-syntax
  const clearRolling = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    return () => clearRolling();
  }, [clearRolling]);

  const startRoll = (params: ComposeRollParams) => {
    clearRolling();

    setDiceAmount(params.reduce((acc, set) => acc + set.amount, 0));

    const groups: ResultGroup[] = params.map((set) => {
      const dice: RollResult[] = [];
      for (let i = 0; i < set.amount; i++) {
        dice.push({
          label: set.label,
          diceSize: set.diceSize,
          result: Math.floor(Math.random() * set.diceSize) + 1,
        });
      }
      return {
        label: set.label,
        dice,
        bonuses: set.bonuses.filter((b) => b !== 0),
      };
    });

    setIsRolling(true);
    setResultGroups([]);
    scale.value = 0;
    opacity.value = 0;

    intervalRef.current = setInterval(() => {
      setDisplayNumber(Math.floor(Math.random() * 20) + 1);
    }, 80);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsRolling(false);
      setResultGroups(groups);

      scale.value = withSequence(
        withSpring(1.05, { duration: 200 }),
        withSpring(1, { duration: 150 }),
      );
      opacity.value = withTiming(1, { duration: 200 });
    }, ROLL_DURATION_MS);
  };

  useImperativeHandle(ref, () => ({
    roll: (params: ComposeRollParams) => {
      modalRef.current?.present();
      startRoll(params);
    },
    dismiss: () => modalRef.current?.dismiss(),
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  const handleDismiss = () => {
    clearRolling();
    setIsRolling(false);
    setResultGroups([]);
    scale.value = 0;
    opacity.value = 0;
  };

  return (
    <BottomSheetModal
      ref={modalRef}
      enablePanDownToClose
      enableDynamicSizing
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
      onDismiss={handleDismiss}
    >
      <BottomSheetScrollView>
        <View className="items-center gap-6 px-4 pb-12 pt-6">
          <View className="flex flex-row items-center gap-3">
            <View className="h-1 w-8 bg-indigo-500/60 rounded-full" />
            <Text className="text-indigo-400 text-xs font-black tracking-[0.2em] uppercase">
              {isRolling ? i18n.t('roll.rolling') : i18n.t('roll.result')}
            </Text>
            <View className="h-1 w-8 bg-indigo-500/60 rounded-full" />
          </View>

          {isRolling ? (
            <View className="flex-row flex-wrap items-center">
              {Array(Math.min(diceAmount, 8))
                .fill(0)
                .map((_, dIdx) => (
                  <View key={dIdx} className="items-center w-1/4 pb-1.5">
                    <Dice displayNumber={displayNumber} />
                  </View>
                ))}
            </View>
          ) : (
            <View className="flex-row flex-wrap items-center">
              {resultGroups
                .flatMap((group) =>
                  group.dice.map((d) => ({ ...d, label: group.label })),
                )
                .map((roll, dIdx) => (
                  <Dice
                    key={dIdx}
                    displayNumber={roll.result}
                    label={roll.label}
                    diceSize={roll.diceSize}
                  />
                ))}
            </View>
          )}

          {!isRolling && resultGroups.length > 0 && (
            <Animated.View
              style={animatedStyle}
              className="items-center gap-4 w-full px-4"
            >
              <View className="flex flex-col items-center justify-center pb-4 pt-2 bg-indigo-900/40 rounded-3xl border border-indigo-500/20 w-full overflow-hidden">
                {resultGroups.map((group, gIdx) => (
                  <View key={gIdx} className="w-full">
                    {group.label && (
                      <View className="px-6 pt-2">
                        <Text className="text-white text-base font-black uppercase tracking-widest">
                          {group.label}
                        </Text>
                      </View>
                    )}

                    <View className="flex flex-row flex-wrap items-center justify-start gap-2 px-6 py-2">
                      {group.dice.map((roll, dIdx) => (
                        <View
                          key={dIdx}
                          className="flex flex-row items-center gap-2"
                        >
                          <Text
                            className={cn('text-white text-xl font-bold', {
                              'text-yellow-400': roll.result === roll.diceSize,
                              'text-red-500': roll.result === 1,
                            })}
                          >
                            {roll.result}
                          </Text>

                          {dIdx < group.dice.length - 1 && (
                            <Text className="text-indigo-500 font-black text-xl">
                              +
                            </Text>
                          )}
                        </View>
                      ))}

                      {group.bonuses.length > 0 &&
                        group.bonuses.map((bonus, bIdx) => (
                          <View
                            key={bIdx}
                            className="flex flex-row items-center gap-2"
                          >
                            <Text className="text-indigo-500 font-black text-xl">
                              +
                            </Text>
                            <Text className="text-white text-xl font-bold">
                              {bonus}
                            </Text>
                          </View>
                        ))}

                      <Text className="text-indigo-500 font-black text-xl">
                        =
                      </Text>

                      <Text className="text-white text-xl font-bold">
                        {group.dice.reduce((sum, d) => sum + d.result, 0) +
                          group.bonuses.reduce((sum, b) => sum + b, 0)}
                      </Text>
                    </View>
                    {gIdx < resultGroups.length - 1 && (
                      <View className="h-[1px] w-full bg-white my-1" />
                    )}
                  </View>
                ))}
              </View>
            </Animated.View>
          )}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const Dice = ({
  displayNumber,
  label,
  diceSize,
}: {
  displayNumber: number;
  label?: string;
  diceSize?: number;
}) => (
  <View className="items-center w-1/4 pb-1.5 px-1">
    {label && (
      <Text className="text-indigo-500/60 text-[10px] font-black uppercase w-full text-center">
        {`${label} (d${diceSize})`}
      </Text>
    )}
    <View className="w-20 h-20 rounded-2xl border-2 border-indigo-500/30 bg-indigo-950 items-center justify-center shadow-md">
      <Text
        className={`text-3xl font-black ${
          displayNumber === diceSize
            ? 'text-yellow-400'
            : displayNumber === 1
              ? 'text-red-500'
              : 'text-white'
        }`}
      >
        {displayNumber}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  background: { backgroundColor: 'white' },
  handleIndicator: { backgroundColor: '#6366f1' },
});
