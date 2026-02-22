import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SplashScreen, Stack } from 'expo-router';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from 'core/queryClient/queryClient';

import { KeyboardProvider } from 'react-native-keyboard-controller';

import '../global.css';
import { CharacterProvider } from 'providers/CharacterProvider';

// Impede que a Splash suma antes da hora
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <CharacterProvider>
              <BottomSheetModalProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#fff' },
                  }}
                >
                  <Stack.Screen
                    name="(authenticated)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </BottomSheetModalProvider>
            </CharacterProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </KeyboardProvider>
    </>
  );
}
