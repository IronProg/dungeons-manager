# NPC Sheets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an owner-managed NPC library and dedicated NPC sheets that can be deep-copied onto characters.

**Architecture:** Keep NPC server state in React Query through a dedicated `services/npcs` layer. Keep the character sheet integration limited to an add launcher and attached-NPC cards; all NPC display and full-screen editing lives under `components/Npcs` and thin authenticated routes.

**Tech Stack:** Expo Router, React Native, TypeScript, React Query v5, React Hook Form, Zod, NativeWind, Yarn Classic.

**Spec:** `docs/superpowers/specs/2026-09-13-npc-sheets-design.md`

## Global Constraints

- Use the shared `@/core/api/api` client; it camelizes responses and decamelizes request payloads.
- Use `PATCH /npcs/:id`, never the character API, for NPC edits and HP updates.
- Use React Query as the server-state source of truth and invalidate the narrowest affected NPC keys.
- All visible copy must be added to both `i18n/locales/en.ts` and `i18n/locales/pt.ts`.
- Use `@/` imports, NativeWind `className`, explicit types, and no `useMemo`, `useCallback`, or `React.memo`.
- The only NPC bottom sheet is the header launcher with Existing and New. Every data-entry surface is a full-screen route.
- Normal tapping opens an NPC or performs a quick HP update; all non-HP sheet edits require a long press.
- Use Yarn 1.22.22. Finish the complete feature with `yarn lint`.

---

## Planned file structure

| Path | Responsibility |
| --- | --- |
| `types/npc.ts` | Full, summary, nested, and request DTOs for the camel-cased client contract. |
| `core/helpers/npcPayload.ts` | Pure conversion of editor values into valid nested update payloads. |
| `services/npcs/npc.service.ts` | HTTP transport for list, detail, create, patch, delete, and import. |
| `services/npcs/npc.api.tsx` | NPC query-key helpers and typed hooks/mutations. |
| `components/Npcs/Library/*` | Library list/card, name-entry form, and existing-NPC selector. |
| `components/Npcs/Sheet/*` | Read-only display, quick HP controls, cards, and attached-NPC actions. |
| `components/Npcs/Forms/*` | Full-screen general, ability-score, and entry editor forms. |
| `app/(authenticated)/npc-*.tsx` | Thin route wrappers around each NPC feature screen. |
| `components/CharacterSheet/Npcs/*` | Header launcher and character-attached list only. |

### Task 1: NPC domain contract, payload helper, and data hooks

**Files:**
- Create: `types/npc.ts`
- Create: `core/helpers/npcPayload.ts`
- Create: `core/helpers/npcPayload.test.ts`
- Create: `services/npcs/npc.service.ts`
- Create: `services/npcs/npc.api.tsx`

**Interfaces:**
- Produces `Npc`, `NpcSummary`, `NpcEntry`, `NpcAttack`, `NpcDamage`, `NpcCreateParams`, `NpcUpdateParams`, and `NpcImportParams`.
- Produces `npcKeys.library()`, `npcKeys.byCharacter(characterId)`, and `npcKeys.detail(id)`.
- Produces `useGetNpcs`, `useGetNpc`, `useCreateNpcMutation`, `useUpdateNpcMutation`, `useImportNpcMutation`, and `useDestroyNpcMutation`.

- [ ] **Step 1: Write the failing pure payload test**

Create a CommonJS-style isolated test that calls `buildNpcUpdatePayload` with an existing action and one deleted damage. Assert IDs are retained, `_destroy: true` is emitted, and an omitted optional attack is not serialized:

```ts
const { buildNpcUpdatePayload } = require('./npcPayload');

const payload = buildNpcUpdatePayload({
  name: 'Bite',
  entries: [{ id: 7, kind: 'action', title: 'Bite', description: '...', damages: [{ id: 9, deleted: true }] }],
});
if (payload.entriesAttributes?.[0]?.npcDamagesAttributes?.[0]?._destroy !== true) {
  throw new Error('Expected deleted damage payload');
}
```

- [ ] **Step 2: Run the isolated test and verify it fails**

Run: `yarn tsc --module commonjs --target es2020 --rootDir . --outDir /tmp/dm-npc-payload-test core/helpers/npcPayload.ts core/helpers/npcPayload.test.ts && node /tmp/dm-npc-payload-test/core/helpers/npcPayload.test.js`

Expected: compilation or runtime failure because the helper does not exist.

- [ ] **Step 3: Define the camel-cased client contract and payload helper**

Create `types/npc.ts` with the scalar full response fields from the contract, `NpcEntryKind = 'trait' | 'reaction' | 'action' | 'legendaryAction'`, and nested request DTOs named `NpcEntryParams`, `NpcAttackParams`, and `NpcDamageParams`. Implement this pure boundary:

```ts
export const buildNpcUpdatePayload = (values: NpcEditorValues): NpcUpdateParams => ({
  ...values.scalars,
  entriesAttributes: values.entries?.map(toEntryParams),
});
```

`toEntryParams` must retain IDs, omit action-only properties for non-actions, omit optional undefined fields, and preserve `_destroy` entries.

- [ ] **Step 4: Re-run the isolated test**

Run the Step 2 command.

Expected: exit code 0.

- [ ] **Step 5: Implement the service and React Query API**

Use the shared client and these exact service signatures:

```ts
fetchAll: (params?: { characterId?: number }) => Promise<NpcSummary[]>
fetch: (id: number) => Promise<Npc>
create: (params: NpcCreateParams) => Promise<Npc>
update: (id: number, params: NpcUpdateParams) => Promise<Npc>
import: (id: number, params?: NpcImportParams) => Promise<Npc>
destroy: (id: number) => Promise<null>
```

Use `api.patch` for update. In mutation `onSuccess`, invalidate the returned NPC's detail plus `npcKeys.library()` and `npcKeys.byCharacter(characterId)` only when that list can contain the record. Route failures through `handleErrorMessage` using `AxiosError<ApiErrorResponse>`.

- [ ] **Step 6: Type-check and commit the foundation**

Run: `yarn tsc --noEmit`

Expected: exit code 0.

```bash
git add types/npc.ts core/helpers/npcPayload.ts core/helpers/npcPayload.test.ts services/npcs
git commit -m "feat: add npc data layer"
```

### Task 2: Localized routes, drawer entry, and NPC library

**Files:**
- Create: `components/Npcs/Library/MyNpcs.tsx`
- Create: `components/Npcs/Library/NpcCard.tsx`
- Create: `components/Npcs/Library/NpcNameForm.tsx`
- Create: `app/(authenticated)/(drawer)/my-npcs.tsx`
- Create: `app/(authenticated)/npc-name.tsx`
- Modify: `components/MainMenu/index.tsx`
- Modify: `app/(authenticated)/(drawer)/_layout.tsx`
- Modify: `app/(authenticated)/_layout.tsx`
- Modify: `i18n/locales/en.ts`
- Modify: `i18n/locales/pt.ts`

**Interfaces:**
- Consumes `useGetNpcs()` and `useCreateNpcMutation()` from Task 1.
- Produces the `/(authenticated)/(drawer)/my-npcs` and `/(authenticated)/npc-name` navigation targets.

- [ ] **Step 1: Add translations in both locales**

Add matching `npcs` keys for `title`, `new`, `addSheet`, `existing`, `copyToMyNpcs`, `noNpcs`, `searchPlaceholder`, `createNamePrompt`, `selectNpc`, `traits`, `reactions`, `actions`, `legendaryActions`, and delete/copy confirmation copy. Keep the object shape identical in English and Portuguese.

- [ ] **Step 2: Add the drawer screen and menu entry**

Register `my-npcs` in the drawer layout with `i18n.t('npcs.title')`. Add a MainMenu item with a relevant Lucide icon and `navigation.navigate('my-npcs')`; do not expose a hidden stack route in the drawer menu.

- [ ] **Step 3: Implement the library list and card**

Mirror `MyCharacters`: use `FlashList`, debounce a local search string, filter `NpcSummary.name` client-side, provide loading/empty/refresh states, and navigate normal taps to:

```ts
router.push({ pathname: '/(authenticated)/npc-sheet', params: { id: item.id.toString() } });
```

Place a New button in the list header that navigates to `npc-name` without `characterId`.

- [ ] **Step 4: Implement the full-screen name form and route**

Use React Hook Form plus Zod to require a trimmed 2–100 character name. Read optional `characterId` from `useLocalSearchParams`; call `create({ name, characterId })`; on success replace the route with `npc-sheet?id=<created id>`. Use `AppKeyboardAvoidingView`, an explicit Save button, and no bottom sheet.

- [ ] **Step 5: Add authenticated stack registrations and verify navigation types**

Register `npc-name` and the future `npc-sheet`, `npc-selector`, `npc-general-form`, `npc-attributes-form`, and `npc-entry-form` stack screens with localized titles and the existing indigo header style. Run: `yarn tsc --noEmit`.

- [ ] **Step 6: Commit the library entry point**

```bash
git add app components/Npcs/Library components/MainMenu/index.tsx i18n/locales
git commit -m "feat: add npc library"
```

### Task 3: Dedicated NPC sheet and quick HP updates

**Files:**
- Create: `components/Npcs/Sheet/MainNpcSheet.tsx`
- Create: `components/Npcs/Sheet/NpcHitPoints.tsx`
- Create: `components/Npcs/Sheet/NpcGeneralInfo.tsx`
- Create: `components/Npcs/Sheet/NpcAttributes.tsx`
- Create: `app/(authenticated)/npc-sheet.tsx`

**Interfaces:**
- Consumes `useGetNpc({ id })` and `useUpdateNpcMutation()`.
- Produces a sheet route accepting `id: string` and navigation intents for the three editors in Tasks 5–6.

- [ ] **Step 1: Implement the route loading/error boundary**

Parse `id` with `Number.parseInt`, enable the detail query only for a finite positive ID, and render the existing centered loading/error pattern. Set the stack title from the loaded NPC name.

- [ ] **Step 2: Build display-first sections**

Render identity/challenge rating, general values (AC, speeds, senses, languages), six ability-score cards, and ordered entry sections. Use `TouchableOpacity` only to attach long-press handlers; normal presses on these non-HP fields must not edit.

- [ ] **Step 3: Implement quick HP controls**

Render current HP, normal limit, temporary limit, and temporary HP. Provide direct damage/healing controls that calculate a bounded next `hitPoints` value and call:

```ts
updateNpc({ id: npc.id, params: { hitPoints: nextHitPoints } });
```

Keep the controls pending-safe. Do not reuse the character HP bottom-sheet form.

- [ ] **Step 4: Wire long presses to full-screen editor routes**

Identity/general long press pushes `npc-general-form?id=<id>`, ability scores pushes `npc-attributes-form?id=<id>`, and each entry pushes `npc-entry-form?npcId=<id>&entryId=<id>`. No form component is mounted in a `Portal` or `AdaptiveBottomSheet`.

- [ ] **Step 5: Verify the dedicated sheet**

Run: `yarn tsc --noEmit && yarn lint`

Expected: both commands exit 0.

- [ ] **Step 6: Commit the sheet display**

```bash
git add app/'(authenticated)'/npc-sheet.tsx components/Npcs/Sheet
git commit -m "feat: add npc sheet display"
```

### Task 4: Full-screen general and ability-score editors

**Files:**
- Create: `components/Npcs/Forms/NpcGeneralForm.tsx`
- Create: `components/Npcs/Forms/NpcAttributesForm.tsx`
- Create: `app/(authenticated)/npc-general-form.tsx`
- Create: `app/(authenticated)/npc-attributes-form.tsx`

**Interfaces:**
- Consumes an `Npc` fetched by ID and `useUpdateNpcMutation()`.
- Each form accepts `npc: Npc` and returns with `router.back()` after a successful mutation.

- [ ] **Step 1: Implement the general editor validation**

Use Zod fields matching the contract: name 2–100 chars; non-negative integer AC and ability scores; HP-related values 0–500; non-negative decimal challenge rating; string limits for speed, senses, languages, and challenge-rating info. Prepopulate from the detail response.

- [ ] **Step 2: Implement the general editor screen**

Place controlled inputs in `AppKeyboardAvoidingView`; on save send only changed scalar values through `buildNpcUpdatePayload`/`useUpdateNpcMutation`. Include explicit cancel and save controls; do not embed an editor in the sheet.

- [ ] **Step 3: Implement the six-score editor screen**

Render exactly strength, dexterity, constitution, intelligence, wisdom, and charisma as numeric controlled inputs. On save patch only those six fields. Show each field’s validation message next to its input.

- [ ] **Step 4: Verify and commit**

Run: `yarn tsc --noEmit && yarn lint`

```bash
git add app/'(authenticated)'/npc-general-form.tsx app/'(authenticated)'/npc-attributes-form.tsx components/Npcs/Forms
git commit -m "feat: add npc stat editors"
```

### Task 5: Full-screen trait, reaction, action, and legendary-action editor

**Files:**
- Create: `components/Npcs/Forms/NpcEntryForm.tsx`
- Create: `components/Npcs/Forms/NpcAttackFields.tsx`
- Create: `components/Npcs/Forms/NpcDamageFields.tsx`
- Create: `app/(authenticated)/npc-entry-form.tsx`
- Modify: `components/Npcs/Sheet/MainNpcSheet.tsx`

**Interfaces:**
- Consumes `npcId` and optional `entryId` route params.
- Produces a complete `NpcEntryParams` subtree for `useUpdateNpcMutation({ id: npcId, params })`.

- [ ] **Step 1: Implement kind-dependent form state**

Start new entries as `{ kind: 'trait', title: '', description: '' }`. A kind picker exposes all four API values. Render cost only for `legendaryAction`; clear cost when another kind is selected. Render attack and damages only for `action`; clear both structures when another kind is selected.

- [ ] **Step 2: Implement attack fields**

For actions, allow zero or one attack. Its form controls `mainAttribute`, `applyProficiency`, `customBonus`, `range`, `properties`, and `description`; never render or submit an attack name. Enforce custom bonus 0–30, range at most 50 characters, properties at most 100, and description at most 1,000.

- [ ] **Step 3: Implement repeatable damage fields**

Support add, edit, and remove damage rows. Each row controls dice amount (1–99), dice size (4/6/8/10/12), optional main attribute, custom bonus (0–99), and kind (at most 30 characters). Mark persisted removals with `_destroy: true` rather than dropping their ID.

- [ ] **Step 4: Submit atomic nested payloads**

For an existing entry, submit `{ entriesAttributes: [entryParams] }`. For a new entry, submit the same shape without entry IDs. Call the update mutation once; do not make independent attack or damage requests. On success, return to the refreshed NPC sheet.

- [ ] **Step 5: Add entry creation affordances and verify**

Add a visible Add action in each entry section of `MainNpcSheet`; it pushes `npc-entry-form?npcId=<id>&kind=<section kind>`. Run: `yarn tsc --noEmit && yarn lint`.

- [ ] **Step 6: Commit nested entry editing**

```bash
git add app/'(authenticated)'/npc-entry-form.tsx components/Npcs/Forms components/Npcs/Sheet/MainNpcSheet.tsx
git commit -m "feat: add npc entry editor"
```

### Task 6: Character-sheet attachment workflow and lifecycle actions

**Files:**
- Create: `components/CharacterSheet/Npcs/NpcAddSheet.tsx`
- Create: `components/CharacterSheet/Npcs/CharacterNpcs.tsx`
- Create: `components/Npcs/Library/NpcSelector.tsx`
- Create: `app/(authenticated)/npc-selector.tsx`
- Modify: `components/CharacterSheet/MainCharacterSheet.tsx`

**Interfaces:**
- Consumes `characterId` from `useCharacter()`, `useGetNpcs({ characterId })`, and `useImportNpcMutation()`.
- `NpcSelector` accepts `characterId: number` and imports its tapped source with `{ characterId }`.

- [ ] **Step 1: Implement the header-only Add NPC Sheet launcher**

Use `AdaptiveBottomSheet` with two side-by-side buttons and title `i18n.t('npcs.addSheet')`. Existing pushes `npc-selector?characterId=<selected id>`; New pushes `npc-name?characterId=<selected id>`. Place this control in `MainCharacterSheet` immediately before `<HintsModal />`. Do not put form inputs in this sheet.

- [ ] **Step 2: Implement the full-screen existing-NPC selector**

Fetch the library list without `characterId`; show summaries in a `FlashList`. Tapping one disables repeat taps, calls `importNpc({ id: sourceId, params: { characterId } })`, invalidates the target list through the mutation hook, and returns to the character sheet. Include loading, empty, retry, and mutation-pending UI.

- [ ] **Step 3: Render attached NPCs at the end of Main Sheet**

After the skills panel, render `CharacterNpcs` using `useGetNpcs({ characterId })`. Its compact cards show name, HP, and challenge rating. Normal tap opens `npc-sheet?id=<id>`.

- [ ] **Step 4: Implement attached-card long-press actions**

Use a modal/action surface with exactly two actions: **Copy to My NPCs** calls `importNpc({ id })` with no destination and leaves the source attached; **Delete** opens `ConfirmationModal` and then calls `destroyNpc({ id })`. Disable actions while their mutation is pending and close the action surface on success.

- [ ] **Step 5: Verify attachment flows and commit**

Run: `yarn tsc --noEmit && yarn lint`

```bash
git add app/'(authenticated)'/npc-selector.tsx components/CharacterSheet/MainCharacterSheet.tsx components/CharacterSheet/Npcs components/Npcs/Library/NpcSelector.tsx
git commit -m "feat: attach npc sheets to characters"
```

### Task 7: Final contract checks and handoff verification

**Files:**
- Modify: any NPC file only if the checks below reveal a defect.

**Interfaces:**
- Verifies the API contract and all routes/hooks created by Tasks 1–6.

- [ ] **Step 1: Re-run the isolated nested-payload test**

Run: `yarn tsc --module commonjs --target es2020 --rootDir . --outDir /tmp/dm-npc-payload-test core/helpers/npcPayload.ts core/helpers/npcPayload.test.ts && node /tmp/dm-npc-payload-test/core/helpers/npcPayload.test.js`

Expected: exit code 0.

- [ ] **Step 2: Run the project checks**

Run: `yarn tsc --noEmit && yarn lint`

Expected: exit code 0.

- [ ] **Step 3: Inspect the final diff for scope and formatting**

Run: `git diff --check HEAD~6..HEAD && git status --short`

Expected: no whitespace errors; only intended NPC feature changes and pre-existing user changes remain.
