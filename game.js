/*
  超時空傳說 3（Web 版）
  - 职业 & 职业树
  - 关卡 & 敌人
  - 战斗与升级
*/

const data = {
  professions: {
    warrior: {
      name: "战士",
      description: "擅长近战与防御，使用剑与斧。",
      base: { hp: 120, mp: 30, atk: 14, def: 6 },
      image: "images/prof_warrior.svg",
      skills: {
        powerStrike: {
          name: "重击",
          description: "消耗 5 点 MP，对敌人造成强力攻击。",
          cost: 5,
          effect: (state) => {
            const dmg = state.player.atk * 2 + 4;
            return { damage: dmg, text: `你使出重击，对敌人造成 ${dmg} 点伤害。` };
          }
        },
        guard: {
          name: "格挡",
          description: "提高防御，减少敌人的下一次伤害。",
          cost: 3,
          effect: (state) => {
            state.player.guard = 1;
            return { damage: 0, text: `你屏气凝神，准备格挡下一次攻击。` };
          }
        }
      }
    },
    mage: {
      name: "法师",
      description: "掌控元素魔法，擅长远程与范围伤害。",
      base: { hp: 80, mp: 80, atk: 8, def: 3 },
      image: "images/prof_mage.svg",
      skills: {
        fireball: {
          name: "火球术",
          description: "消耗 8 点 MP，造成范围火焰伤害。",
          cost: 8,
          effect: (state) => {
            const dmg = state.player.atk * 2 + 6;
            return { damage: dmg, text: `你释放火球，炸裂对敌人造成 ${dmg} 点伤害。` };
          }
        },
        shield: {
          name: "魔法护盾",
          description: "消耗 6 点 MP，形成护盾抵消下一次伤害。",
          cost: 6,
          effect: (state) => {
            state.player.guard = 1;
            return { damage: 0, text: `你让魔法护盾环绕身体，准备抵挡伤害。` };
          }
        }
      }
    },
    rogue: {
      name: "游侠",
      description: "灵巧敏捷，擅长躲闪与突袭。",
      base: { hp: 90, mp: 50, atk: 12, def: 4 },
      image: "images/prof_rogue.svg",
      skills: {
        backstab: {
          name: "背刺",
          description: "消耗 6 点 MP，造成高伤害，有几率造成暴击。",
          cost: 6,
          effect: (state) => {
            const crit = Math.random() < 0.25;
            const dmg = state.player.atk * (crit ? 3 : 2);
            const extra = crit ? "（暴击！）" : "";
            return { damage: dmg, text: `你从侧面突袭，造成 ${dmg} 点伤害${extra}` };
          }
        },
        evade: {
          name: "闪避",
          description: "消耗 4 点 MP，下一次敌人攻击有更高几率被闪避。",
          cost: 4,
          effect: (state) => {
            state.player.evade = 1;
            return { damage: 0, text: `你瞬间移动，准备闪避下一次攻击。` };
          }
        }
      }
    }
  },

  enemies: {
    goblin: {
      name: "哥布林",
      hp: 40,
      atk: 10,
      def: 2,
      image: "images/enemy_goblin.svg",
      description: "粗暴的小妖，喜欢偷袭旅行者。"
    },
    skeleton: {
      name: "骷髅战士",
      hp: 60,
      atk: 12,
      def: 4,
      image: "images/enemy_skeleton.svg",
      description: "被不死魔法复活的战士，行动迟缓却难以击倒。"
    },
    warlock: {
      name: "亡灵法师",
      hp: 80,
      atk: 14,
      def: 2,
      image: "images/enemy_warlock.svg",
      description: "操纵黑暗魔法的术士，擅长诅咒与火焰。"
    }
  },

  stages: [
    { name: "废弃营地", enemy: "goblin", exp: 30 },
    { name: "古老墓穴", enemy: "skeleton", exp: 50 },
    { name: "黑暗祭坛", enemy: "warlock", exp: 80 }
  ]
};

const elements = {
  sceneText: document.getElementById("sceneText"),
  sceneImage: document.getElementById("sceneImage"),
  choices: document.getElementById("choices"),
  restartBtn: document.getElementById("restartBtn"),
  status: document.getElementById("status")
};

let state;

function resetState() {
  state = {
    player: {
      name: "英雄",
      profession: null,
      level: 1,
      exp: 0,
      hp: 100,
      mp: 50,
      maxHp: 100,
      maxMp: 50,
      atk: 10,
      def: 5,
      skillPoints: 0,
      skills: {},
      guard: 0,
      evade: 0
    },
    currentStage: 0,
    enemy: null,
    lastBattleText: "",
    history: []
  };
}

function setProfession(key) {
  const prof = data.professions[key];
  if (!prof) return;

  state.player.profession = key;
  state.player.maxHp = prof.base.hp;
  state.player.hp = prof.base.hp;
  state.player.maxMp = prof.base.mp;
  state.player.mp = prof.base.mp;
  state.player.atk = prof.base.atk;
  state.player.def = prof.base.def;
  state.player.skillPoints = 1;
  state.player.skills = {};

  addHistory(`选择了职业：${prof.name}`);
}

function addHistory(text) {
  state.history.unshift(text);
  if (state.history.length > 6) state.history.pop();
}

function updateStatus() {
  const p = state.player;
  const prof = p.profession ? data.professions[p.profession] : null;

  const lines = [];
  lines.push(`<strong>职业：</strong> ${prof ? prof.name : "未选择"}`);
  lines.push(`<strong>等级：</strong> ${p.level}  （EXP: ${p.exp}）`);
  lines.push(`<strong>HP：</strong> ${p.hp}/${p.maxHp}`);
  lines.push(`<strong>MP：</strong> ${p.mp}/${p.maxMp}`);
  lines.push(`<strong>攻击：</strong> ${p.atk}  <strong>防御：</strong> ${p.def}`);
  lines.push(`<strong>技能点：</strong> ${p.skillPoints}`);

  if (state.enemy) {
    const e = state.enemy;
    lines.push(`<hr />`);
    lines.push(`<strong>当前敌人：</strong> ${e.name}`);
    lines.push(`<strong>HP：</strong> ${e.hp}`);
  }

  if (state.history.length) {
    lines.push(`<hr />`);
    lines.push(`<strong>最近：</strong>`);
    state.history.forEach((item) => {
      lines.push(`<div class="history">• ${item}</div>`);
    });
  }

  elements.status.innerHTML = lines.join("");
}

function gainExp(amount) {
  state.player.exp += amount;
  const needed = state.player.level * 50;
  if (state.player.exp >= needed) {
    state.player.exp -= needed;
    state.player.level += 1;
    state.player.skillPoints += 1;
    state.player.maxHp += 10;
    state.player.maxMp += 5;
    state.player.hp = state.player.maxHp;
    state.player.mp = state.player.maxMp;
    addHistory(`升级了！现在是 Lv.${state.player.level}`);
  }
}

function roll(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createEnemy(stageIndex) {
  const stage = data.stages[stageIndex];
  const base = data.enemies[stage.enemy];
  return {
    ...base,
    hp: base.hp + stageIndex * 10
  };
}

function calcDamage(attacker, defender, isPlayer = false) {
  const attack = attacker.atk + roll(0, 4);
  let damage = Math.max(1, attack - defender.def);
  if (isPlayer && defender.guard) {
    damage = Math.floor(damage / 2);
  }
  if (!isPlayer && state.player.evade && Math.random() < 0.4) {
    damage = 0;
    addHistory("你闪避了敌人的攻击。");
  }
  return damage;
}

const story = {
  start: {
    text: "你从深处的时空裂隙中醒来，面前是一个破败的营地。记忆模糊，但你能感觉到命运正在召唤。",
    image: "images/start.svg",
    choices: [
      { label: "开始冒险", next: "chooseProfession" }
    ]
  },

  chooseProfession: {
    text: "选择你的职业：",
    image: "images/skilltree.svg",
    choices: [
      {
        label: "战士",
        next: "camp",
        action: () => setProfession("warrior")
      },
      {
        label: "法师",
        next: "camp",
        action: () => setProfession("mage")
      },
      {
        label: "游侠",
        next: "camp",
        action: () => setProfession("rogue")
      }
    ]
  },

  camp: {
    text: () => {
      const prof = data.professions[state.player.profession];
      return `你现在是${prof.name}。${prof.description}\n\n你可以选择前往冒险、查看职业树，或休息恢复。`;
    },
    image: "images/camp.svg",
    choices: () => {
      const options = [
        { label: "前往下一关", next: "adventure" },
        { label: "查看职业树", next: "skillTree" },
        { label: "休息恢复 HP/MP", next: "rest" }
      ];
      return options;
    }
  },

  rest: {
    text: () => {
      state.player.hp = state.player.maxHp;
      state.player.mp = state.player.maxMp;
      addHistory("在营地休息，恢复了 HP/MP。\n");
      return "你在营地休息，恢复了生命与魔力。";
    },
    image: "images/camp.svg",
    choices: [
      { label: "返回营地", next: "camp" }
    ]
  },

  skillTree: {
    text: () => {
      const prof = data.professions[state.player.profession];
      const nodes = Object.entries(prof.skills).map(([key, skill]) => {
        const unlocked = !!state.player.skills[key];
        const cost = skill.cost;
        const status = unlocked ? "已解锁" : `消耗 ${cost} MP`; 
        return `• ${skill.name}：${skill.description}（${status}）`;
      });
      return `职业树：\n${nodes.join("\n")}`;
    },
    image: "images/skilltree.svg",
    choices: () => {
      const prof = data.professions[state.player.profession];
      const options = Object.entries(prof.skills).map(([key, skill]) => {
        const unlocked = !!state.player.skills[key];
        return {
          label: unlocked ? `已学会：${skill.name}` : `学习 ${skill.name}`,
          next: unlocked ? "skillTree" : "learnSkill",
          action: unlocked
            ? null
            : () => {
                if (state.player.skillPoints <= 0) {
                  addHistory("没有足够的技能点。请升级获得更多技能点。");
                } else {
                  state.player.skillPoints -= 1;
                  state.player.skills[key] = true;
                  addHistory(`你学会了技能：${skill.name}。`);
                }
              }
        };
      });
      options.push({ label: "返回营地", next: "camp" });
      return options;
    }
  },

  learnSkill: {
    text: "请选择要学习的技能。",
    image: "images/skilltree.svg",
    choices: [
      { label: "返回职业树", next: "skillTree" }
    ]
  },

  adventure: {
    text: () => {
      const stage = data.stages[state.currentStage];
      state.enemy = createEnemy(state.currentStage);
      addHistory(`遭遇了 ${state.enemy.name}！`);
      return `你踏入“${stage.name}”，一只 ${state.enemy.name} 出现了！\n${state.enemy.description}`;
    },
    image: "images/battle.svg",
    choices: () => {
      const base = [
        { label: "攻击", next: "playerAttack" },
        { label: "防御", next: "playerDefend" },
        { label: "逃跑", next: "flee" }
      ];
      const prof = data.professions[state.player.profession];
      const skillOptions = Object.keys(prof.skills).filter((key) => state.player.skills[key]);
      skillOptions.forEach((skillKey) => {
        const skill = prof.skills[skillKey];
        base.push({ label: skill.name, next: "useSkill", action: () => (state.pendingSkill = skillKey) });
      });
      return base;
    }
  },

  playerAttack: {
    text: () => {
      const damage = calcDamage(state.player, state.enemy, true);
      state.enemy.hp -= damage;
      state.player.guard = 0;
      addHistory(`你攻击了敌人，造成 ${damage} 点伤害。`);

      if (state.enemy.hp <= 0) {
        return "你击败了敌人！";
      }
      return `敌人剩余 HP：${state.enemy.hp}`;
    },
    image: "images/battle.svg",
    choices: () => {
      if (state.enemy.hp <= 0) {
        return [{ label: "收集奖励", next: "victory" }];
      }
      return [{ label: "等待敌人攻击", next: "enemyTurn" }];
    }
  },

  playerDefend: {
    text: () => {
      state.player.guard = 1;
      addHistory("你进入防御状态，减少下一次受到的伤害。");
      return "你准备防御，准备承受敌人的攻击。";
    },
    image: "images/battle.svg",
    choices: () => [{ label: "敌人行动", next: "enemyTurn" }]
  },

  useSkill: {
    text: () => {
      const prof = data.professions[state.player.profession];
      const key = state.pendingSkill;
      const skill = prof.skills[key];
      if (!skill) return "你还没有学习这个技能。";

      if (state.player.mp < skill.cost) {
        addHistory("魔力不足，无法释放技能。");
        return "你没有足够的 MP 来释放这个技能。";
      }

      state.player.mp -= skill.cost;
      const result = skill.effect(state);
      state.enemy.hp -= result.damage;
      addHistory(result.text);

      if (state.enemy.hp <= 0) {
        return "敌人被击败了！";
      }
      return `${result.text}\n敌人剩余 HP：${state.enemy.hp}`;
    },
    image: "images/battle.svg",
    choices: () => {
      if (!state.enemy || state.enemy.hp <= 0) {
        return [{ label: "收集奖励", next: "victory" }];
      }
      return [{ label: "敌人行动", next: "enemyTurn" }];
    }
  },

  enemyTurn: {
    text: () => {
      if (!state.enemy) return "没有敌人了。";

      const damage = calcDamage(state.enemy, state.player, false);
      if (state.player.guard) {
        state.player.guard = 0;
        addHistory("你的防御减轻了部分伤害。");
      }
      if (damage > 0) {
        state.player.hp -= damage;
        addHistory(`敌人攻击你，造成 ${damage} 点伤害。`);
      }

      if (state.player.hp <= 0) {
        return "你被击败了...";
      }
      return `你的 HP 还剩 ${state.player.hp}。`;
    },
    image: "images/battle.svg",
    choices: () => {
      if (state.player.hp <= 0) {
        return [{ label: "重新开始", next: "gameOver" }];
      }
      return [{ label: "继续战斗", next: "adventure" }];
    }
  },

  victory: {
    text: () => {
      const stage = data.stages[state.currentStage];
      gainExp(stage.exp);
      const rewardText = `你获得了 ${stage.exp} 点经验。`;
      addHistory(rewardText);
      state.currentStage += 1;
      state.enemy = null;
      if (state.currentStage >= data.stages.length) {
        return `${rewardText}\n你击败了最终的敌人，完成了冒险！`;
      }
      return `${rewardText}\n你准备继续前进。`;
    },
    image: "images/victory.svg",
    choices: () => {
      if (state.currentStage >= data.stages.length) {
        return [{ label: "再次挑战", next: "start" }];
      }
      return [{ label: "返回营地", next: "camp" }];
    }
  },

  gameOver: {
    text: "你倒下了。即便如此，传说仍在继续。",
    image: "images/gameover.svg",
    choices: [{ label: "重新开始", next: "start" }]
  }
};

function renderScene(key) {
  const scene = story[key];
  if (!scene) {
    console.warn(`Unknown scene: ${key}`);
    return;
  }

  // Compute text and image (supports functions)
  const text = typeof scene.text === "function" ? scene.text() : scene.text;
  const image = typeof scene.image === "function" ? scene.image() : scene.image;

  elements.sceneText.textContent = text;
  elements.sceneImage.src = image;
  elements.sceneImage.alt = text;

  elements.choices.innerHTML = "";
  const choices = typeof scene.choices === "function" ? scene.choices() : scene.choices;
  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.textContent = choice.label;
    button.addEventListener("click", () => {
      if (choice.action) choice.action();
      if (choice.next) renderScene(choice.next);
    });
    elements.choices.appendChild(button);
  });

  updateStatus();
}

function init() {
  resetState();
  renderScene("start");
}

elements.restartBtn.addEventListener("click", () => {
  resetState();
  renderScene("start");
});

init();
