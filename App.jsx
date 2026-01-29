import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerNavigator } from 'navigators/DrawerNavigator';
import './global.css';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'core/queryClient';
import { AuthProvider } from 'providers/AuthProvider';
import { CharacterProvider } from 'providers/CharacterProvider';

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <AuthProvider>
            <CharacterProvider>
              <BottomSheetModalProvider>
                <DrawerNavigator />
              </BottomSheetModalProvider>
            </CharacterProvider>
          </AuthProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </>
  );
}
