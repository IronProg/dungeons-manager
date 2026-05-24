import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { Host } from 'react-native-portalize';

import { queryClient } from 'core/queryClient/queryClient';

import { KeyboardProvider } from 'react-native-keyboard-controller';

import '../global.css';
import { CharacterProvider } from 'providers/CharacterProvider';
import { TableProvider } from 'providers/TableProvider';

// Impede que a Splash suma antes da hora
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StatusBar style="auto" />

      <KeyboardProvider
        statusBarTranslucent={true}
        navigationBarTranslucent={true}
      >
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <CharacterProvider>
              <TableProvider>
                <BottomSheetModalProvider>
                  <Host>
                    <Stack
                      screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: '#fff' },
                      }}
                    >
                      <Stack.Screen name="(authenticated)" />
                    </Stack>
                  </Host>
                </BottomSheetModalProvider>
              </TableProvider>
            </CharacterProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </KeyboardProvider>

      <Toast />
    </>
  );
}
