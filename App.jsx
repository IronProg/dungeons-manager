import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerNavigator } from 'navigators/DrawerNavigator';
import './global.css';
import { CharactersProvider } from 'providers/CharactersProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CharactersProvider>
          <BottomSheetModalProvider>
            <DrawerNavigator />
          </BottomSheetModalProvider>
        </CharactersProvider>
      </GestureHandlerRootView>
    </>
  );
}
