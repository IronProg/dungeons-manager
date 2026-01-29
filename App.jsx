import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerNavigator } from 'navigators/DrawerNavigator';
import './global.css';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import AppProviders from 'providers/CharacterProviders';
import { queryClient } from 'core/queryClient';

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AppProviders>
            <BottomSheetModalProvider>
              <DrawerNavigator />
            </BottomSheetModalProvider>
          </AppProviders>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </>
  );
}
