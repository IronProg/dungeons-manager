import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { CharacterNavigator } from './CharacterNavigator';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          options={{
            drawerPosition: 'right',
            title: 'Teste',
            headerStyle: { backgroundColor: '#aa9' },
          }}
          name="Home"
          component={CharacterNavigator}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
