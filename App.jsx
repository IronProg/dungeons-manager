import { DrawerNavigator } from 'navigators/DrawerNavigator';
import './global.css';
import { CharactersProvider } from 'providers/CharactersProvider';

export default function App() {
  return (
    <>
      <CharactersProvider>
        <DrawerNavigator />
      </CharactersProvider>
    </>
  );
}
