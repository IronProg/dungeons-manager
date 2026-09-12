import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { MarkdownStyle } from 'react-native-enriched-markdown';
import { EnrichedMarkdownText } from 'react-native-enriched-markdown';

import { useExpandable } from '@/hooks/useExpandable';
import i18n from '@/i18n';
import type { Spell } from '@/types/character';

const BLACK = '#000000';

export const blackMarkdownStyle: MarkdownStyle = {
  paragraph: { color: BLACK, fontSize: 12 },
  h1: { color: BLACK },
  h2: { color: BLACK },
  h3: { color: BLACK },
  h4: { color: BLACK },
  h5: { color: BLACK },
  h6: { color: BLACK },
  strong: { color: BLACK },
  em: { color: BLACK },
  strikethrough: { color: BLACK },
  underline: { color: BLACK },
  link: { color: BLACK },
  code: { color: BLACK },
  codeBlock: { color: BLACK },
  blockquote: { color: BLACK, borderColor: '#555' },
  list: { color: BLACK, bulletColor: BLACK, markerColor: BLACK },
  table: { color: BLACK, headerTextColor: BLACK, borderColor: '#ccc' },
  inlineMath: { color: BLACK },
  math: { color: BLACK },
  thematicBreak: { color: BLACK },
};

const MAX_HEIGHT = 120;

export const SpellCardDescription = ({ spell }: { spell: Spell }) => {
  const { expanded, onLayout, overflow, toggle } = useExpandable({
    maxHeight: MAX_HEIGHT,
  });

  const styles = buildStyle(expanded);

  return (
    <View className="mt-2">
      <View style={styles.container}>
        <View onLayout={onLayout}>
          <EnrichedMarkdownText
            markdown={spell.description}
            markdownStyle={blackMarkdownStyle}
          />

          {spell.higherLevelDescription && (
            <View className="mt-2">
              <Text className="text-xs font-bold">
                {i18n.t('spells.higherLevelDescription')}:
              </Text>

              <EnrichedMarkdownText
                markdown={spell.higherLevelDescription}
                markdownStyle={blackMarkdownStyle}
              />
            </View>
          )}
        </View>
      </View>

      {overflow && (
        <TouchableOpacity
          onPress={() => toggle()}
          className="mt-2 flex-row justify-center"
        >
          {expanded ? (
            <ChevronUp size={20} color="gray" />
          ) : (
            <ChevronDown size={20} color="gray" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const buildStyle = (expanded: boolean) =>
  StyleSheet.create({
    container: { maxHeight: expanded ? null : MAX_HEIGHT, overflow: 'hidden' },
  });
