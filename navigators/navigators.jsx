import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScreenContent } from 'components/ScreenContent';
import { colors } from 'constants/colors';

const Stack = createNativeStackNavigator();

export const Navigators = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: colors.background,
                },
                headerTitleStyle: {
                  color: colors.text
                },
                headerRight: () => (
              <Pressable
                onPress={() => navigation.openDrawer()}
                className="mr-3 active:opacity-60"
              >
                <Ionicons name="settings-outline" size={24} color="#000" />
              </Pressable>
            ),

              }}
            name="Home" component={ScreenContent} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

