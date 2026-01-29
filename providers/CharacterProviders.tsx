import { CharactersProvider } from 'providers/CharactersProvider';
import { AttributesProvider } from 'providers/AttributesProvider';
import { SavesProvider } from 'providers/SavesProvider';
import { SkillsProvider } from 'providers/SkillsProvider';
import { GeneralInfoProvider } from 'providers/GeneralInfoProvider';
import { CurrenciesProvider } from 'providers/CurrenciesProvider';
import { AttacksProvider } from 'providers/AttacksProvider';
import { FeaturesProvider } from 'providers/FeaturesProvider';
import { ResourcesProvider } from 'providers/ResourcesProvider';
import { AuthProvider } from 'providers/AuthProvider';
import { ReactElement } from 'react';

export default function AppProviders({ children }: { children: ReactElement }) {
  return (
    <AuthProvider>
      <CharactersProvider>
        <AttributesProvider>
          <SavesProvider>
            <SkillsProvider>
              <GeneralInfoProvider>
                <CurrenciesProvider>
                  <AttacksProvider>
                    <FeaturesProvider>
                      <ResourcesProvider>{children}</ResourcesProvider>
                    </FeaturesProvider>
                  </AttacksProvider>
                </CurrenciesProvider>
              </GeneralInfoProvider>
            </SkillsProvider>
          </SavesProvider>
        </AttributesProvider>
      </CharactersProvider>
    </AuthProvider>
  );
}
