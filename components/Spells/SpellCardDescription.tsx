import { ChevronDown, ChevronUp } from 'lucide-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { MarkdownStyle } from 'react-native-enriched-markdown';
import { EnrichedMarkdownText } from 'react-native-enriched-markdown';

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

export const SpellCardDescription = ({ spell }: { spell: Spell }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="mt-2">
      {expanded ? (
        <View>
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
          <TouchableOpacity
            onPress={() => setExpanded(false)}
            className="mt-2 flex-row justify-center"
          >
            <ChevronUp size={20} color="gray" />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <EnrichedMarkdownText
            markdown={spell.description}
            markdownStyle={blackMarkdownStyle}
          />

          <TouchableOpacity
            onPress={() => setExpanded(true)}
            className="mt-1 flex-row justify-center"
          >
            <ChevronDown size={20} color="gray" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
