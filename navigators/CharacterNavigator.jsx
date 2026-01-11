import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { WeaponsAndToolsScreen } from 'Screens/WeaponsAndToolsScreen';
import { CharacterSheetScreen } from 'Screens/CharacterSheetScreen';

const Tab = createMaterialTopTabNavigator();

export const CharacterNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
        tabBarShowLabel: false,
        tabBarShowIcon: false,
        tabBarStyle: {
          height: 0,
        },
      }}
      tabIndex={0}
    >
      <Tab.Screen name="Sheet" component={CharacterSheetScreen} />
      <Tab.Screen name="Details" component={WeaponsAndToolsScreen} />
    </Tab.Navigator>
  );
};
