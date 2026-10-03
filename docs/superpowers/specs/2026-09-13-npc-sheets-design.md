# NPC Sheets Design

## Goal

Add owner-managed NPC sheets that can exist in a personal NPC library or be
attached to a character. An attachment is always an independent deep copy, so
the owner can use the same NPC template for multiple characters without shared
state.

The feature has two entry points:

- **My NPCs**: a drawer screen for the owner's library.
- **Character Main Sheet**: a header add control and an attached-NPC section at
  the end of the sheet.

## API and data model

Introduce client types matching `npc-sheets-contract.md`:

- `NpcSummary` for list rows: `id`, `name`, `challengeRating`, and `hitPoints`.
- `Npc` for a full sheet, including optional `characterId`, HP values, core
  stats, ability scores, challenge-rating data, and ordered entries.
- `NpcEntry`, `NpcAttack`, and `NpcDamage` for the nested combat model.
- Create/update request types that use the API's `entries_attributes`,
  `npc_attack_attributes`, and `npc_damages_attributes` shapes.

Create an `npcs` service that uses the shared API client for:

- library or character-filtered list: `GET /npcs`, optionally with
  `character_id`;
- detail: `GET /npcs/:id`;
- creation: `POST /npcs`;
- partial atomic updates: `PATCH /npcs/:id`;
- deletion: `DELETE /npcs/:id`;
- deep copy: `POST /npcs/:id/import`, optionally with `character_id`.

React Query owns NPC server state. Stable query-key helpers distinguish the
owner library, a specific NPC detail, and an NPC list attached to a character.
Each mutation invalidates only the relevant detail and list keys:

- create invalidates the destination library or attached-character list;
- update invalidates the NPC detail and its current attached-character list,
  when applicable;
- import invalidates the destination library or target-character list;
- delete invalidates the library, source detail, and current attached-character
  list.

Existing API error handling presents failed mutations. Loading, empty, retry,
and pending states are shown in list, selector, and detail surfaces.

## Navigation and lifecycle

Add a **My NPCs** drawer route and menu item. It presents a searchable list of
the current user's library summaries and a New button.

The New action opens a full-screen name-entry route, not a bottom-sheet form.
Submitting a valid name creates an unbound NPC and navigates to that NPC's
dedicated sheet.

The Character Main Sheet header adds an NPC-add control immediately to the
left of Hints. It opens the only NPC bottom sheet: a lightweight chooser titled
"Add NPC Sheet" with side-by-side Existing and New actions.

- **Existing** navigates to a full-screen library selector. Selecting an NPC
  calls its import endpoint with the selected character ID and returns to the
  character sheet, where the new copy appears.
- **New** navigates to the full-screen name-entry route with the selected
  character ID. It creates a new NPC already attached to that character, then
  opens the NPC sheet.

The end of the Character Main Sheet shows compact cards for its attached NPCs.
Tapping a card opens the dedicated NPC sheet. Long-pressing an attached card
opens an action modal with:

- **Copy to My NPCs**, which calls import without `character_id`. This creates
  a separate unbound library copy and leaves the attached source unchanged.
- **Delete**, which uses the existing destructive-confirmation pattern before
  calling destroy.

## Dedicated NPC sheet and editing

The dedicated full-screen NPC sheet is display-first and has sections for:

1. identity and challenge rating;
2. quick HP controls and armor class/speeds/senses/languages;
3. the six ability scores;
4. traits, reactions, actions, and legendary actions.

HP is the sole quick-update area. Its fields follow the same shape as the
character HP fields once the API contract is aligned: current HP, normal limit,
temporary limit, and temporary HP.

Every other editable NPC value opens a full-screen editor only after a long
press. No NPC data-entry editor is a bottom sheet. Editors have explicit save
and cancel actions and return to the refreshed sheet after a successful save.

Entry editors enforce the API's kind-specific fields:

- trait and reaction contain title and description;
- legendary action also requires cost;
- action can contain an optional attack and zero or more damages;
- no non-action entry can expose attack or damage controls.

Nested edits send record IDs for updates and `_destroy` for removals. Attack
names are never collected or sent because the server derives them from the
parent action title.

## Component boundaries

- `services/npcs/` contains transport functions and typed query/mutation hooks.
- `components/Npcs/` contains the library list, selector, name entry, sheet,
  HP controls, entry display, and dedicated editor screens/components.
- The Character Sheet owns only its header launcher and attached-NPC list;
  it consumes NPC hooks rather than duplicating domain logic.
- Routes remain thin Expo Router wrappers around those feature components.

All visible copy is localized in both English and Portuguese. Existing UI
primitives, NativeWind styling, the shared API client, and the existing
confirmation/error-handling conventions are reused.

## Validation

Add focused tests for NPC request/payload construction, particularly nested
entry update/removal and import with or without a destination character. Add
focused UI tests where the existing test setup supports them. Run `yarn lint`
before considering the implementation complete.
