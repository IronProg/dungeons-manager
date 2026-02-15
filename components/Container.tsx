import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = ({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <SafeAreaView className={'flex flex-1 px-2 bg-slate-100'}>
      {children}
    </SafeAreaView>
  );
};
