import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
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

import i18n from '@/i18n';

const ROLL_DURATION_MS = 1500;

export type DiceRollSheetHandle = {
  roll: (bonuses: number[], { diceSize }: { diceSize: number }) => void;
  dismiss: () => void;
};

export const DiceRollSheet = forwardRef<
  DiceRollSheetHandle,
  Record<string, unknown>
>((_, ref) => {
  const modalRef = useRef<BottomSheetModalType>(null);
  const [displayNumber, setDisplayNumber] = useState<number | null>(null);
  const [finalRoll, setFinalRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [bonuses, setBonuses] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  // eslint-disable-next-line no-restricted-syntax
  const clearRolling = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (autoCloseTimeoutRef.current) clearTimeout(autoCloseTimeoutRef.current);
  }, []);

  useEffect(() => {
    return () => clearRolling();
  }, [clearRolling]);

  const startRoll = (
    currentBonuses: number[],
    { diceSize }: { diceSize: number },
  ) => {
    clearRolling();
    const result = Math.floor(Math.random() * diceSize) + 1;
    setIsRolling(true);
    setFinalRoll(null);
    setDisplayNumber(null);
    setBonuses(currentBonuses);
    scale.value = 0;
    opacity.value = 0;

    intervalRef.current = setInterval(() => {
      setDisplayNumber(Math.floor(Math.random() * diceSize) + 1);
    }, 80);

    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setIsRolling(false);
      setDisplayNumber(result);
      setFinalRoll(result);

      scale.value = withSequence(
        withSpring(1.3, { duration: 200 }),
        withSpring(1, { duration: 150 }),
      );
      opacity.value = withTiming(1, { duration: 200 });
    }, ROLL_DURATION_MS);
  };

  useImperativeHandle(ref, () => ({
    roll: (newBonuses: number[], { diceSize }: { diceSize: number }) => {
      modalRef.current?.present();
      startRoll(newBonuses, { diceSize });
    },
    dismiss: () => modalRef.current?.dismiss(),
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const resultColor = () => {
    if (finalRoll === null) return 'text-white';
    if (finalRoll === 20) return 'text-yellow-400';
    if (finalRoll === 1) return 'text-red-500';
    const total = finalRoll + bonuses.reduce((acc, curr) => acc + curr, 0);
    if (total >= 15) return 'text-emerald-400';
    return 'text-white';
  };

  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  );

  const handleDismiss = () => {
    clearRolling();
    setIsRolling(false);
    setFinalRoll(null);
    setDisplayNumber(null);
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
      <BottomSheetView>
        <View className="items-center gap-8 px-8 pb-14 pt-6">
          <View className="flex flex-row items-center gap-3">
            <View className="h-1 w-8 bg-indigo-500/60 rounded-full" />
            <Text className="text-indigo-400 text-xs font-black tracking-[0.2em] uppercase">
              {isRolling ? i18n.t('roll.rolling') : i18n.t('roll.result')}
            </Text>
            <View className="h-1 w-8 bg-indigo-500/60 rounded-full" />
          </View>

          <View className="w-44 h-44 rounded-[48px] border-[6px] border-indigo-500/40 bg-indigo-950 items-center justify-center shadow-2xl shadow-indigo-500/40">
            <View className="absolute inset-2 border border-indigo-500/20 rounded-[40px]" />
            <Text
              className={`text-8xl font-black ${isRolling ? 'text-indigo-400/50' : resultColor()}`}
              style={styles.displayText}
            >
              {displayNumber ?? '?'}
            </Text>
          </View>

          {finalRoll !== null && (
            <Animated.View
              style={animatedStyle}
              className="items-center gap-4 w-full"
            >
              <View className="flex flex-row flex-wrap items-center justify-center gap-3 px-6 py-4 bg-indigo-900/40 rounded-[32px] border border-indigo-500/20">
                <Text className="text-white text-2xl font-bold">
                  {finalRoll}
                </Text>

                {bonuses.length > 0 &&
                  bonuses.map((b, i) => (
                    <View key={i} className="flex flex-row items-center gap-2">
                      <Text className="text-indigo-500 font-black text-xl">
                        {b >= 0 ? '+' : '-'}
                      </Text>
                      <Text className="text-white text-2xl font-bold">
                        {Math.abs(b)}
                      </Text>
                    </View>
                  ))}

                <Text className="text-indigo-500 font-black text-xl">=</Text>
                <Text
                  className={`text-6xl font-black ${resultColor()}`}
                  style={styles.resultText}
                >
                  {finalRoll + bonuses.reduce((acc, curr) => acc + curr, 0)}
                </Text>
              </View>

              <View className="flex flex-row items-center gap-4 mt-2">
                {finalRoll === 20 && (
                  <View className="bg-yellow-500/20 px-6 py-2 rounded-full border border-yellow-500/40">
                    <Text className="text-yellow-400 text-xs font-black uppercase tracking-widest">
                      {i18n.t('roll.criticalRoll')}
                    </Text>
                  </View>
                )}
                {finalRoll === 1 && (
                  <View className="bg-red-500/20 px-6 py-2 rounded-full border border-red-500/40">
                    <Text className="text-red-500 text-xs font-black uppercase tracking-widest">
                      {i18n.t('roll.criticalFailure')}
                    </Text>
                  </View>
                )}
              </View>
            </Animated.View>
          )}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  background: { backgroundColor: 'white' },
  handleIndicator: { backgroundColor: '#6366f1' },
  displayText: {
    textShadowColor: 'rgba(99, 102, 241, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  resultText: {
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
});
