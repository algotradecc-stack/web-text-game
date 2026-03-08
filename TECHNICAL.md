# Technical Notes (技术说明)

This file tracks **technical decisions, implementation notes, and ongoing changes** for the web-based game project.

本文件记录了本网页游戏项目的**技术决策、实现说明与变更记录**。

---

## 1) Project Structure (项目结构)

- `index.html` — main UI layout (scene + status sidebar, buttons).
- `styles.css` — styling and responsive layout.
- `game.js` — core engine and game logic (state, combat, professions, progression).
- `images/` — SVG assets (professions, enemies, scenes).
- `GAME_DESIGN.md` — design document (bilingual Chinese/English).
- `TECHNICAL.md` — this file (technical notes & changes).

---

## 2) Current Engine Architecture (当前引擎架构)

### State management
- A global `state` object tracks player stats, current stage, enemy, skill tree, history log, etc.
- `resetState()` initializes state when starting/restarting the game.

### Scene system
- `story` is a map of scene keys → scene objects.
- Scenes support `text` and `image` as either strings or functions (dynamic content).
- `choices` can be an array or a function returning an array, allowing dynamic button generation.

### Combat system
- Player and enemy take turns.
- Damage formula: `damage = max(1, attack - defense)` plus randomness.
- Skills are defined per profession with `cost`, `effect`, and `text`.
- Leveling triggers stat increases + skill points.

---

## 3) Recent Technical Changes (近期技术变更)

- Added profession system with 3 basic classes (Warrior/Mage/Rogue).
- Added stage/enemy progression and basic turn-based combat.
- Added skill unlock system (skill points, skill learning in camp).
- Added status sidebar to show player stats and recent history.
- Updated the public GitHub Pages deployment (gh-pages branch) to reflect latest commits.
- Updated `index.html` title to match the in-game name and avoid stale cached title behavior.

---

## 4) Next Technical Enhancements (待实现技术增强)

The following items are good next steps to formalize and expand the system:

- **Save/Load**: Persist `state` in `localStorage`.
- **Modularization**: Move logic into separate JS modules (e.g., `engine.js`, `combat.js`, `data.js`).
- **Sound system**: add sound effects and background music.
- **UI improvements**: add animations, HP/MP bars, and more detailed combat log.

---

## 5) How to Track Changes (变更记录建议)

This file can be updated as a change log when technical changes are made. In future, we may add a `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/) format.

本文件可作为技术变更记录。如果你希望更正式的变更日志，也可以新增 `CHANGELOG.md` 并使用 [Keep a Changelog](https://keepachangelog.com/) 格式。
