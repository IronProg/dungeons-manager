import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './global.css';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'core/queryClient';
import { CharacterProvider } from 'providers/CharacterProvider';
import { Navigators } from 'navigators/Navigators';

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <CharacterProvider>
            <BottomSheetModalProvider>
              <Navigators />
            </BottomSheetModalProvider>
          </CharacterProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </>
  );
}
