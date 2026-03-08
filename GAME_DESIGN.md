# Web Text Adventure — Game Design Document

## 1) Vision / 愿景
A short, browser-based interactive text adventure with light visuals (static SVGs) and branching story paths. The game is designed to be easy to expand, readable, and fun to share.

一个简短的浏览器互动文字冒险游戏，搭配简洁的静态 SVG 图像和分支剧情路径。该游戏设计为易于扩展、易读且便于分享。

### Goals / 目标
- **Fast feedback / 快速反馈**: Play the game instantly in the browser.
- **Expandable story / 可扩展剧情**: Add new scenes and branches without rewriting engine code.
- **Simple art / 简单美术**: Use static SVGs and minimal styling, enabling rapid iteration.

- **快速反馈**：在浏览器中立即试玩。
- **可扩展剧情**：新增场景和分支无需改写引擎代码。
- **简单美术**：使用静态 SVG 和最少样式，便于快速迭代。

---

## 2) Core Gameplay / 核心玩法
- Player chooses a profession and builds a simple skill tree.
- Player advances through stages, fighting enemies and gaining experience.
- Combat is turn-based: attack, defend, or use learned skills.
- Player levels up to gain skill points and become stronger.
- The game loops between camp (safe zone) and battle stages.

- 玩家选择职业并构建一个简单的职业树。
- 玩家通过关卡战斗敌人并获得经验。
- 战斗为回合制：攻击、防御或使用已学技能。
- 升级后可获得技能点，提升属性并解锁更多技能。
- 游戏在营地（安全区）与战斗阶段之间循环。

### Mechanics / 机制
- **Profession / 职业**: Each profession has unique base stats, skills, and visuals.
- **Skill tree / 技能树**: Learn skills using skill points earned by leveling up.
- **Stage / 关卡**: Each stage contains a single enemy encounter with its own stats.
- **Battle / 战斗**: Sequential: player turn → enemy turn → repeat.
- **Progress / 进度**: Win to advance to the next stage and earn exp.
- **State / 状态**: Tracks player stats, equipment, skills, current stage, and battle state.

- **职业**：每个职业拥有不同基础属性、技能和图像。
- **技能树**：通过升级获得技能点来学习技能。
- **关卡**：每个关卡包含一个敌人，敌人拥有独立属性。
- **战斗**：按照回合执行：玩家行动 → 敌人行动 → 重复。
- **进度**：击败敌人后获取经验并推进到下一关。
- **状态**：记录玩家属性、技能、当前关卡和战斗状态。

---

## 3) Current Implementation / 当前实现
- **Engine / 引擎**: `game.js` holds a state machine for scenes, combat, leveling, and professions.
- **UI**: `index.html` provides a main scene view and a side status panel; `styles.css` handles layout + theme.
- **Assets / 资源**: SVG images represent profession icons, enemies, and scene backgrounds.
- **Progression / 进度**: Player stats are persisted in JS state (no storage yet).

- **引擎**：`game.js` 包含场景状态机、战斗逻辑、升级与职业系统。
- **界面**：`index.html` 提供主场景视图和侧边状态栏；`styles.css` 负责布局与主题。
- **资源**：SVG 图像展示职业、敌人与背景场景。
- **进度**：玩家状态保存在 JS 内存中（目前未持久化）。

---

## 4) Story / Narrative Plan / 剧情 / 叙事规划
**Current flow / 当前流程:**
1. `start`: 进入游戏并选择职业。
2. `camp`: 在营地查看状态、休息、查看职业树或出发冒险。
3. `adventure`: 进入当前关卡（敌人战斗）。
4. 战斗回合：玩家行动 → 敌人行动 → 胜利/失败。
5. `victory`: 击败敌人获得经验，推进到下一关。
6. `gameOver`: HP 为 0 触发，需重新开始。

**当前剧情流程：**
1. `start`：进入游戏并选职业。
2. `camp`：在营地查看状态、休息、升级技能或继续冒险。
3. `adventure`：进入关卡并与敌人战斗。
4. 战斗循环：玩家行动 → 敌人行动 → 直到胜利/失败。
5. `victory`：胜利后获得经验，进入下一关。
6. `gameOver`：失败后重新开始。

### Expansion Ideas / 扩展想法
- Add inventory/equipment (weapons, armor, potions).
- Add multiple enemies per stage (small groups/boss fights).
- Add a map with branching stage paths.
- Add persistent unlocks (relics, skills unlocked across runs).
- Add sound effects and music for battle and menus.

- 添加物品/装备系统（武器、防具、药水）。
- 添加多敌人关卡（小队战 / Boss 战）。
- 添加地图与分支路径（选择不同路线）。
- 添加持久解锁（遗物、跨次技能解锁）。
- 添加战斗与菜单音效/音乐。

---

## 5) Extension Checklist (future work) / 扩展清单（未来工作）
- [x] Profession selection + base stats
- [x] Skill learning system (skill points, unlock)
- [x] Stage-based enemy progression
- [x] Turn-based combat loop (attack/defend/skill)
- [x] Leveling and experience growth
- [ ] Item/equipment system (weapon/armor/potions)
- [ ] Multiple enemies per encounter (groups/bosses)
- [ ] Branching stage map + replay paths
- [ ] Persistent unlocks (relics, permanent upgrades)
- [ ] Sound effects / background music
- [ ] Save/load progress (localStorage)

- [x] 职业选择 + 基础属性
- [x] 技能学习系统（技能点、解锁）
- [x] 关卡敌人递进
- [x] 回合制战斗循环（攻击/防御/技能）
- [x] 升级与经验成长
- [ ] 物品/装备系统（武器/防具/药水）
- [ ] 多敌人战斗（队伍/Boss）
- [ ] 分支关卡地图 + 重玩路径
- [ ] 持久解锁（遗物、永久强化）
- [ ] 音效 / 背景音乐
- [ ] 存档/读档（localStorage）

---

## 6) Project Notes / 项目备注
- The game currently deploys via GitHub Pages at: `https://algotradecc-stack.github.io/web-text-game/`
- Core files:
  - `index.html` (UI)
  - `styles.css` (theme)
  - `game.js` (engine)
  - `images/` (assets)

- 游戏当前通过 GitHub Pages 部署：`https://algotradecc-stack.github.io/web-text-game/`
- 核心文件：
  - `index.html`（界面）
  - `styles.css`（主题样式）
  - `game.js`（引擎）
  - `images/`（素材）

---

## 7) How to Collaborate with Prompts / 如何用提示协作
To build the game together, you can provide prompts like:
- “Add item drops and equipment for each enemy.”
- “Add a branching map with two paths to choose from after each victory.”
- “Add a shop in the camp to buy potions and weapons.”

I'll update the design document and game code accordingly.

要一起构建游戏，你可以这样提示我：
- “为每个敌人添加掉落物和装备系统。”
- “添加一个可以在胜利后选择的分支地图。”
- “在营地添加一个商店，可以购买药品和武器。”

我会相应地更新设计文档和游戏代码。
