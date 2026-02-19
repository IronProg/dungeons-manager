import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';

export type AuthRoutesStack = {
  Login: undefined;
  SignUp: undefined;
};

export type CharacterRoutesStack = {
  CharacterSheet: { characterId: number };
  NewCharacter: undefined;
};

export type AppNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthRoutesStack>,
  DrawerNavigationProp<CharacterRoutesStack>
>;
