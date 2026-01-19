import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerNavigator } from 'navigators/DrawerNavigator';
import './global.css';
import { CharactersProvider } from 'providers/CharactersProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { AttributesProvider } from 'providers/AttributesProvider';
import { SavesProvider } from 'providers/SavesProvider';
import { SkillsProvider } from 'providers/SkillsProvider';
import { GeneralInfoProvider } from 'providers/GeneralInfoProvider';

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CharactersProvider>
          <AttributesProvider>
            <SavesProvider>
              <SkillsProvider>
                <GeneralInfoProvider>
                  <BottomSheetModalProvider>
                    <DrawerNavigator />
                  </BottomSheetModalProvider>
                </GeneralInfoProvider>
              </SkillsProvider>
            </SavesProvider>
          </AttributesProvider>
        </CharactersProvider>
      </GestureHandlerRootView>
    </>
  );
}
