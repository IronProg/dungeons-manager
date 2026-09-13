import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NpcActionDetails } from '@/components/Npcs/Sheet/NpcActionDetails';
import { NpcAttributes } from '@/components/Npcs/Sheet/NpcAttributes';
import { NpcGeneralInfo } from '@/components/Npcs/Sheet/NpcGeneralInfo';
import { NpcHitPoints } from '@/components/Npcs/Sheet/NpcHitPoints';
import i18n from '@/i18n';
import type { Npc, NpcEntry, NpcEntryKind } from '@/types/npc';

type MainNpcSheetProps = {
  npc: Npc;
};

type EntrySection = {
  kind: NpcEntryKind;
  title: string;
};

const entrySections: EntrySection[] = [
  { kind: 'trait', title: i18n.t('npcs.traits') },
  { kind: 'reaction', title: i18n.t('npcs.reactions') },
  { kind: 'action', title: i18n.t('npcs.actions') },
  { kind: 'legendaryAction', title: i18n.t('npcs.legendaryActions') },
];

export const MainNpcSheet = ({ npc }: MainNpcSheetProps) => {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const openGeneralForm = () =>
    router.push({
      pathname: '/(authenticated)/npc-general-form',
      params: { id: npc.id.toString() },
    });

  const openAttributesForm = () =>
    router.push({
      pathname: '/(authenticated)/npc-attributes-form',
      params: { id: npc.id.toString() },
    });

  const openEntryForm = (entry: NpcEntry) =>
    router.push({
      pathname: '/(authenticated)/npc-entry-form',
      params: { npcId: npc.id.toString(), entryId: entry.id.toString() },
    });

  const createEntry = (kind: NpcEntryKind) =>
    router.push({
      pathname: '/(authenticated)/npc-entry-form',
      params: { npcId: npc.id.toString(), kind },
    });

  return (
    <ScrollView
      className="flex-1 bg-slate-200"
      contentContainerClassName="p-4"
      contentContainerStyle={{ paddingBottom: bottom + 16 }}
    >
      <View className="bg-white rounded-xl shadow-sm border border-slate-200">
        <TouchableOpacity onLongPress={openGeneralForm} className="px-4 py-5">
          <Text className="text-gray-900 text-2xl font-bold">{npc.name}</Text>
          <Text className="text-indigo-600 text-base font-semibold mt-1">
            {i18n.t('npcs.challengeRating', { rating: npc.challengeRating })}
          </Text>
          {npc.challengeRatingInfo && (
            <Text className="text-gray-500 text-sm mt-2">
              {npc.challengeRatingInfo}
            </Text>
          )}
        </TouchableOpacity>

        <View className="border-t border-slate-200">
          <NpcHitPoints npc={npc} />
        </View>

        <View className="border-t border-slate-200">
          <NpcGeneralInfo npc={npc} onLongPress={openGeneralForm} />
        </View>
      </View>

      <Section title={i18n.t('titles.attributes')}>
        <NpcAttributes npc={npc} onLongPress={openAttributesForm} />
      </Section>

      {entrySections.map((section) => (
        <EntrySectionView
          key={section.kind}
          title={section.title}
          entries={npc.entries.filter((entry) => entry.kind === section.kind)}
          onLongPress={openEntryForm}
          onAdd={() => createEntry(section.kind)}
        />
      ))}
    </ScrollView>
  );
};

const Section = ({
  title,
  children,
  action,
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) => (
  <View className="bg-white rounded-xl mt-4 shadow-sm border border-slate-200">
    <View className="flex-row items-center justify-between px-4 pt-4">
      <Text className="text-gray-900 text-lg font-semibold">{title}</Text>
      {action}
    </View>
    {children}
  </View>
);

const EntrySectionView = ({
  title,
  entries,
  onLongPress,
  onAdd,
}: {
  title: string;
  entries: NpcEntry[];
  onLongPress: (entry: NpcEntry) => void;
  onAdd: () => void;
}) => {
  return (
    <Section
      title={title}
      action={
        <TouchableOpacity
          onPress={onAdd}
          className="rounded-lg bg-indigo-500 px-3 py-2"
          accessibilityLabel={i18n.t('npcs.addEntry', { kind: title })}
        >
          <Text className="text-sm font-semibold text-white">
            {i18n.t('general.add')}
          </Text>
        </TouchableOpacity>
      }
    >
      <View className="px-4 pb-2">
        {entries.length === 0 ? (
          <Text className="text-gray-500 text-sm py-4">
            {i18n.t('general.none')}
          </Text>
        ) : (
          entries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              onLongPress={() => onLongPress(entry)}
              className="border-b border-slate-100 py-4"
            >
              <Text className="text-gray-900 text-base font-semibold">
                {entry.title}
                {entry.cost ? ` (${entry.cost})` : ''}
              </Text>
              <Text className="text-gray-600 text-sm mt-1">
                {entry.description}
              </Text>
              {entry.kind === 'action' && <NpcActionDetails entry={entry} />}
            </TouchableOpacity>
          ))
        )}
      </View>
    </Section>
  );
};
