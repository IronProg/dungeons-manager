import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextProps,
} from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from 'core/helpers/cn';
import { ChevronLeft } from 'lucide-react-native';
import colors from 'tailwindcss/colors';

const HEADER_HEIGHT = 56;

export const CustomHeader = ({
  back,
  options,
  navigation,
}: NativeStackHeaderProps) => {
  const {
    headerTitle,
    headerStyle,
    headerTitleStyle,
    headerTitleAlign = 'center',
    headerTintColor = '#000',
    headerLeft,
    headerRight,
    headerBackground,
    headerTransparent,
    headerShadowVisible = true,
    headerBackVisible = true,
    headerBackTitle,
    headerLargeTitle,
    headerLargeTitleStyle,
    title,
    headerShown,
  } = options;

  const { top } = useSafeAreaInsets();

  if (!headerShown) return;

  const resolvedTitle =
    typeof headerTitle === 'string' ? headerTitle : (title ?? '');

  const resolvedTitleElement =
    typeof headerTitle === 'function'
      ? headerTitle({ children: resolvedTitle, tintColor: headerTintColor })
      : null;

  const canGoBack = !!back;
  const showBackButton = canGoBack && headerBackVisible !== false;

  const backgroundStyle = {
    backgroundColor: headerTransparent ? 'transparent' : colors.indigo['600'],
    ...(headerStyle as object),
  };

  const leftElement = headerLeft ? (
    headerLeft({
      canGoBack,
      tintColor: headerTintColor,
      label: headerBackTitle ?? back?.title,
    })
  ) : showBackButton ? (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className="flex-row items-center px-2 gap-0.5"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <ChevronLeft color={headerTintColor} />
    </TouchableOpacity>
  ) : null;

  const rightElement = headerRight
    ? headerRight({ canGoBack, tintColor: headerTintColor })
    : null;

  return (
    <View
      className={cn({ 'shadow-sm': headerShadowVisible })}
      style={[
        { paddingTop: top, minHeight: HEADER_HEIGHT + top },
        backgroundStyle,
      ]}
    >
      <View
        className="shadow-sm py-1 flex-row items-center justify-between"
        style={{ height: HEADER_HEIGHT }}
      >
        <View className="w-20 justify-center items-start z-[1]">
          {leftElement}
        </View>

        <View
          className={cn('flex-1 justify-center', {
            'items-start pl-1': headerTitleAlign === 'left',
            'items-center absolute left-20 right-20':
              headerTitleAlign !== 'left',
          })}
        >
          {resolvedTitleElement ?? (
            <Text
              className="text-[17px] font-semibold"
              style={[{ color: headerTintColor }, headerTitleStyle]}
              numberOfLines={1}
              accessibilityRole="header"
            >
              {resolvedTitle}
            </Text>
          )}
        </View>

        <View
          className="shadow-sm w-20 flex-row items-center flex-end justify-center"
          style={{ height: HEADER_HEIGHT }}
        >
          {rightElement}
        </View>
      </View>

      {/* Large title (iOS-style) */}
      {headerLargeTitle && (
        <View className="px-4 pb-2">
          <Text
            className="text-[34px] font-bold tracking-[0.4]"
            style={[
              { color: headerTintColor },
              headerLargeTitleStyle as TextProps,
            ]}
          >
            {resolvedTitle}
          </Text>
        </View>
      )}

      {/* Custom background (e.g. BlurView) */}
      {headerBackground && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {headerBackground()}
        </View>
      )}
    </View>
  );
};
