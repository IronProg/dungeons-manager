import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useIsRestoring } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import Constants from 'expo-constants';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import '@/global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Host } from 'react-native-portalize';
import Toast from 'react-native-toast-message';

import { queryClient } from '@/core/queryClient/queryClient';
import { queryPersister } from '@/core/storage';
import { CharacterProvider } from '@/providers/CharacterProvider';
import { TableProvider } from '@/providers/TableProvider';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const isRestoring = useIsRestoring();

  useEffect(() => {
    if (!isRestoring) {
      SplashScreen.hideAsync();
    }
  }, [isRestoring]);

  if (isRestoring) return null;

  return (
    <>
      <StatusBar style="auto" />

      <KeyboardProvider navigationBarTranslucent={true}>
        <GestureHandlerRootView className="flex-1">
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
      </KeyboardProvider>

      <Toast />
    </>
  );
}

export default function RootLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: queryPersister,
        maxAge: 24 * 60 * 60 * 1000,
        buster: Constants.expoConfig?.version ?? '1.0.0',
      }}
    >
      <AppContent />
    </PersistQueryClientProvider>
  );
}
