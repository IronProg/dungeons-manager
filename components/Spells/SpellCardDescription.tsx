import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EnrichedMarkdownText } from 'react-native-enriched-markdown';

import { blackMarkdownStyle } from '@/constants/markdownStyle';
import { useExpandable } from '@/hooks/useExpandable';
import i18n from '@/i18n';
import type { Spell } from '@/types/character';

const MAX_HEIGHT = 120;

// Spell descriptions sometimes indent paragraphs by four spaces, which Markdown treats as code.
const normalizeDescription = (description: string) =>
  description.replace(/^(?: {4,}|\t+)/gm, '');

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
            markdown={normalizeDescription(spell.description)}
            markdownStyle={blackMarkdownStyle}
            flavor="github"
            md4cFlags={{ latexMath: false }}
          />

          {spell.higherLevelDescription && (
            <View className="mt-2">
              <Text className="text-xs font-bold">
                {i18n.t('spells.higherLevelDescription')}:
              </Text>

              <EnrichedMarkdownText
                markdown={normalizeDescription(spell.higherLevelDescription)}
                markdownStyle={blackMarkdownStyle}
                flavor="github"
                md4cFlags={{ latexMath: false }}
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
