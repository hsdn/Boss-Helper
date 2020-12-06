module.exports = function BossHelper(mod) {
	// const notifier = mod.require ? mod.require.notifier : require("tera-notifier")(mod);
	const MSG = new TeraMessage(mod);

	const strings = {
		"ru": {
			"Enabled": "Вкл.",
			"Disabled": "Выкл.",
			"Alert messages": "Предупреждения",
			"Notice messages": "Уведомления",
			"Party messages": "Сообщения в группу",
			"Spawn messages": "Сообщения о появлении",
			"Position markers": "Отметка позиции",
			"Position markers cleared": "Очищена отметка позиции",
			"Unknown parameter": "Неверный параметр",
			"Raid Boss": "Рейдовый босс",
			"Guild Boss": "Гильдийный босс",
			"World Boss": "Мировой босс",
			"Merchant": "Торговец",
			"Goblin": "Гоблин",
			"Found": "Найден",
			"Spawned": "Появился",
			"Refreshed": "Обновлен",
			"channel": "канал",
			"no data": "нет данных",
			"spawned at": "появился в",
			"next": "след. в",
			"last": "послед. в"
		}
	};

	let mobid = [],
		language = null,
		npc = null,
		sysMsg = null,
		npcID = null,
		npcHunting = 0,
		npcTemplate = 0,
		party = false,
		currentChannel = 0;

	const merchantNames = {};
	const npcs = [...mod.settings.bosses];

	for (let i = 0; i < mod.settings.merchants.regions.length; i++) {
		for (let j = 0; j < mod.settings.merchants.regions[i].npcs.length; j++) {
			npcs.push(mod.settings.merchants.regions[i].npcs[j]);
		}
	}
	for (let i = 0; i < mod.settings.goblins.regions.length; i++) {
		for (let j = 0; j < mod.settings.goblins.regions[i].npcs.length; j++) {
			npcs.push(mod.settings.goblins.regions[i].npcs[j]);
		}
	}

	mod.command.add(["boss", "monster"], (arg) => {
		if (!arg) {
			mod.settings.enabled = !mod.settings.enabled;
			MSG.chat(`Boss-Helper: ${mod.settings.enabled ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
			if (!mod.settings.enabled) {
				for (const i of mobid) {
					despawnItem(i);
				}
			}
		} else {
			switch (arg) {
				case "warn":
					mod.settings.alerted = !mod.settings.alerted;
					MSG.chat(`${M("Alert messages")}: ${mod.settings.alerted ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
					break;
				case "notice":
					mod.settings.notice = !mod.settings.notice;
					MSG.chat(`${M("Notice messages")}: ${mod.settings.notice ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
					break;
				case "party":
					party = !party;
					MSG.chat(`${M("Party messages")}: ${party ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
					break;
				case "message":
					mod.settings.messager = !mod.settings.messager;
					MSG.chat(`${M("Spawn messages")}: ${mod.settings.messager ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
					break;
				case "mark":
					mod.settings.marker = !mod.settings.marker;
					MSG.chat(`${M("Position markers")}: ${mod.settings.marker ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
					break;
				case "clear":
					MSG.chat(`Boss-Helper: ${MSG.TIP(M("Position markers cleared"))}`);
					for (const i of mobid) {
						despawnItem(i);
					}
					break;
				case "ask":
					MSG.chat(`======== ${M("World Boss").toUpperCase()} ========`);
					for (const i of mod.settings.bosses) {
						if (i.logTime == undefined) continue;
						if (![99, 5011, 35, 33, 7011, 9050].includes(i.templateId)) continue;
						const name = getNpcName(i);
						if (i.logTime == 0) {
							MSG.chat(` ${MSG.BLU(name)} ${MSG.YEL(M("no data"))}`);
						} else {
							const nextTime = i.logTime + 5 * 60 * 60 * 1000;
							if (Date.now() < nextTime) {
								MSG.chat(` ${MSG.BLU(name)} ${M("next")} ${MSG.TIP(getTime(nextTime))}`);
							} else {
								MSG.chat(` ${MSG.BLU(name)} ${M("last")} ${MSG.GRY(getTime(nextTime))}`);
							}
						}
					}
					MSG.chat(`======== ${M("Raid Boss").toUpperCase()} ========`);
					for (const i of mod.settings.bosses) {
						if (i.logTime == undefined) continue;
						if (![5001, 501, 4001].includes(i.templateId)) continue;
						const name = getNpcName(i);
						if (i.logTime == 0) {
							MSG.chat(` ${MSG.BLU(name)} ${MSG.YEL(M("no data"))}`);
						} else {
							const nextTime = i.logTime + 5 * 60 * 60 * 1000;
							if (Date.now() < nextTime) {
								MSG.chat(` ${MSG.BLU(name)} ${M("next")} ${MSG.TIP(getTime(nextTime))}`);
							} else {
								MSG.chat(` ${MSG.BLU(name)} ${M("last")} ${MSG.GRY(getTime(nextTime))}`);
							}
						}
					}
					MSG.chat(`======== ${M("Goblin").toUpperCase()} ========`);
					for (const i of mod.settings.goblins.regions) {
						if (i.logDiff == undefined) continue;
						const name = getNpcName(i);
						if (mod.settings.goblins.logTime == 0) {
							MSG.chat(` ${MSG.BLU(name)} ${MSG.YEL(M("no data"))}`);
						} else {
							let nextTime = mod.settings.goblins.logTime + i.logDiff * 1000;
							while (Date.now() > nextTime) {
								nextTime += 24 * 60 * 60 * 1000;
							}
							const lastTime = nextTime - 24 * 60 * 60 * 1000;
							if (lastTime < Date.now() && lastTime + 3 * 60 * 1000 >= Date.now()) {
								MSG.chat(` ${MSG.PIK(merchantNames[i.name] || name)} ${M("spawned at")} ${MSG.TIP(getTime(lastTime))}`);
							} else {
								MSG.chat(` ${MSG.BLU(name)} ${M("next")} ${MSG.TIP(getTime(nextTime))}`);
							}
						}
					}
					MSG.chat(`======== ${M("Merchant").toUpperCase()} ========`);
					for (const i of mod.settings.merchants.regions) {
						if (i.logTime == undefined) continue;
						if (i.logIntervalMin == undefined) continue;
						if (i.logIntervalMax == undefined) continue;
						const name = getNpcName(i);
						if (i.logTime == 0) {
							MSG.chat(` ${MSG.BLU(name)} ${MSG.YEL(M("no data"))}`);
						} else {
							const lastTimeMin = i.logTime + i.logIntervalMin * 1000;
							const lastTimeMax = i.logTime + i.logIntervalMax * 1000;
							if (i.logTime < Date.now() && i.logTime + 30 * 60 * 1000 >= Date.now()) {
								MSG.chat(` ${MSG.PIK(name)} ${M("spawned at")} ${MSG.TIP(getTime(i.logTime))}`);
							} else if (Date.now() < lastTimeMax) {
								MSG.chat(` ${MSG.BLU(name)} ${M("next")} ${MSG.TIP(getTime(lastTimeMin))} ~ ${MSG.TIP(getTime(lastTimeMax))}`);
							} else {
								MSG.chat(` ${MSG.BLU(name)} ${M("last")} ${MSG.GRY(getTime(lastTimeMin))}`);
							}
						}
					}
					for (const i of mod.settings.merchants.regions) {
						if (i.logDiff == undefined && i.logTime == undefined) continue;
						if (i.logIntervalMin != undefined) continue;
						if (i.logIntervalMax != undefined) continue;
						const name = getNpcName(i);
						if (mod.settings.merchants.logTime == 0) {
							MSG.chat(` ${MSG.BLU(name)} ${MSG.YEL(M("no data"))}`);
						} else {
							let nextTime = i.logTime || mod.settings.merchants.logTime + i.logDiff * 1000;
							while (Date.now() > nextTime) {
								nextTime += 5 * 60 * 60 * 1000;
							}
							const lastTime = nextTime - 5 * 60 * 60 * 1000;
							if (lastTime < Date.now() && lastTime + 30 * 60 * 1000 >= Date.now()) {
								MSG.chat(` ${MSG.PIK(merchantNames[i.name] || name)} ${M("spawned at")} ${MSG.TIP(getTime(lastTime))}`);
							} else {
								MSG.chat(` ${MSG.BLU(name)} ${M("next")} ${MSG.TIP(getTime(nextTime))}`);
							}
						}
					}
					break;
				default:
					MSG.chat(`Boss-Helper ${MSG.RED(M("Unknown parameter"))}`);
					break;
			}
		}
	});

	mod.game.on("enter_game", () => {
		if (!mod.settings.language || mod.settings.language == "auto") {
			language = { "0": "en", "1": "kr", "3": "jp", "4": "de", "5": "fr", "7": "tw", "8": "ru" }[mod.game.language] || "en";
		} else {
			language = mod.settings.language;
		}
	});

	mod.game.me.on("change_zone", () => {
		mobid = [];
	});

	mod.hook("S_CURRENT_CHANNEL", 2, (event) => {
		currentChannel = Number(event.channel);
	});

	mod.hook("S_SPAWN_NPC", 11, (event) => {
		if (!mod.settings.enabled) return;

		whichNpc(event.huntingZoneId, event.templateId);
		if (npc) {
			npcHunting = npc.huntingZoneId;
			npcTemplate = npc.templateId;
			if (mod.settings.marker) {
				spawnItem(event.gameId, event.loc);
				mobid.push(event.gameId);
			}
			if (mod.settings.alerted) {
				MSG.alert((`${M("Found")} ${getNpcName(npc)}`), 44);
			}
			if (party) {
				mod.send("C_CHAT", 1, {
					"channel": 21,
					"message": (`${currentChannel} ${M("channel")} - ${M("Found")} ${getNpcName(npc)}`)
				});
			} else if (mod.settings.notice) {
				MSG.raids(`${M("Found")} ${getNpcName(npc)}`);
			}
		}

		if (event.walkSpeed != 240) return;

		switch (event.templateId) {
			case 5001: // Ortan
				event.shapeId = 303730;
				event.huntingZoneId = 434;
				event.templateId = 7000;
				load(event);
				return true;
			case 501: // Hazard
				event.shapeId = 303740;
				event.huntingZoneId = 777;
				event.templateId = 77730;
				load(event);
				return true;
			case 4001: // Cerrus
				event.shapeId = 303750;
				event.huntingZoneId = 994;
				event.templateId = 1000;
				load(event);
				return true;
		}
	});

	mod.hook("S_DESPAWN_NPC", 3, { "order": -100 }, (event) => {
		if (!mobid.includes(event.gameId)) return;

		despawnItem(event.gameId);
		mobid.splice(mobid.indexOf(event.gameId), 1);
	});

	mod.hook("S_NOTIFY_GUILD_QUEST_URGENT", 1, (event) => {
		switch (event.quest) {
			case "@GuildQuest:10005001":
				whichNpc(event.zoneId, 2001);
				break;
			case "@GuildQuest:10006001":
				whichNpc(event.zoneId, 2002);
				break;
			case "@GuildQuest:10007001":
				whichNpc(event.zoneId, 2003);
				break;
		}

		if (npc && event.type == 0) {
			MSG.chat(`${MSG.BLU(M("Guild Boss"))} ${MSG.RED(getNpcName(npc))}`);
			notificationafk(`${M("Guild Boss")} ${getNpcName(npc)}`);
		}

		if (npc && event.type == 1) {
			MSG.chat(`${MSG.BLU(M("Refreshed"))} ${MSG.TIP(getNpcName(npc))}`);
			notificationafk(`${M("Refreshed")} ${getNpcName(npc)}`);
		}
	});

	mod.hook("S_SYSTEM_MESSAGE", 1, (event) => {
		if (!mod.settings.enabled || !mod.settings.messager) return;

		sysMsg = mod.parseSystemMessage(event.message);
		switch (sysMsg.id) {
			case "SMT_FIELDBOSS_APPEAR":
				getNpcMsg(sysMsg.tokens.npcName);
				whichNpc(npcHunting, npcTemplate);
				if (npc) {
					MSG.chat(`${MSG.BLU(M("Spawned"))} ${MSG.RED(getNpcName(npc))}`);
					notificationafk(`${M("Spawned")} ${getNpcName(npc)}`);
				}
				break;
			case "SMT_FIELDBOSS_DIE_GUILD":
			case "SMT_FIELDBOSS_DIE_NOGUILD":
				getNpcMsg(sysMsg.tokens.npcname);
				whichNpc(npcHunting, npcTemplate);
				if (npc) {
					const nextTime = Date.now() + 5 * 60 * 60 * 1000;
					MSG.chat(`${MSG.RED(getNpcName(npc))} ${M("next spawn")} ${MSG.TIP(getTime(nextTime))}`);
					saveTime();
				}
				break;
			case "SMT_WORLDSPAWN_NOTIFY_SPAWN":
				getNpcMsg(sysMsg.tokens.npcName);
				whichNpc(npcHunting, npcTemplate);
				if (npc) {
					if ([1276, 1284].includes(npcTemplate)) {
						MSG.party(`${M("Spawned")} ${getNpcName(npc)}`);
					} else {
						MSG.chat(`${MSG.BLU(M("Spawned"))} ${MSG.PIK(getNpcName(npc))}`);
					}
					notificationafk(`${M("Spawned")} ${getNpcName(npc)}`);
					if (npc.name != undefined) {
						merchantNames[npc.name] = getNpcName(npc);
					}
					saveTime();
				}
				break;
			case "SMT_WORLDSPAWN_NOTIFY_DESPAWN":
				if (npc && npc.name != undefined) {
					delete merchantNames[npc.name];
				}
				break;
			default:
				break;
		}
	});

	function getNpcMsg(id) {
		npcID = id.match(/\d+/ig);
		npcHunting = parseInt(npcID[0]);
		npcTemplate = parseInt(npcID[1]);
	}

	function getNpcName(entry) {
		return entry[`name_${language.toUpperCase()}`] || entry[`name_${language}`] || entry.name;
	}

	function M(string) {
		return strings[language] && strings[language][string] ? strings[language][string] : string;
	}

	function whichNpc(h_ID, t_ID) {
		npc = null;

		if (npcs.find(b => b.huntingZoneId == h_ID && b.templateId == t_ID)) {
			npc = npcs.find(b => b.huntingZoneId == h_ID && b.templateId == t_ID);
		}

		if (npc) {
			for (let i = 0; i < mod.settings.merchants.regions.length; i++) {
				if (mod.settings.merchants.regions[i].npcs.find(b =>
					b.huntingZoneId == npc.huntingZoneId &&
					b.templateId == npc.templateId
				) &&
					mod.settings.merchants.regions[i].name != undefined) {
					npc.name = mod.settings.merchants.regions[i].name;
				}
			}
		}
	}

	function saveTime() {
		if (npc) {
			for (let i = 0; i < mod.settings.merchants.regions.length; i++) {
				if (mod.settings.merchants.regions[i].npcs.find(b =>
					b.huntingZoneId == npc.huntingZoneId &&
					b.templateId == npc.templateId
				)) {
					if (mod.settings.merchants.regions[i].logDiff != undefined) {
						mod.settings.merchants.logTime = Date.now() - (mod.settings.merchants.regions[i].logDiff * 1000);
					}
					if (mod.settings.merchants.regions[i].logTime != undefined) {
						mod.settings.merchants.regions[i].logTime = Date.now();
					}
				}
			}
			for (let i = 0; i < mod.settings.goblins.regions.length; i++) {
				if (mod.settings.goblins.regions[i].npcs.find(b =>
					b.huntingZoneId == npc.huntingZoneId &&
					b.templateId == npc.templateId
				) &&
					mod.settings.goblins.regions[i].logDiff != undefined) {
					mod.settings.goblins.logTime = Date.now() - (mod.settings.goblins.regions[i].logDiff * 1000);
				}
			}
		}

		for (let i = 0; i < mod.settings.bosses.length; i++) {
			if (mod.settings.bosses[i].logTime == undefined) continue;
			if (mod.settings.bosses[i].huntingZoneId != npcHunting) continue;
			if (mod.settings.bosses[i].templateId != npcTemplate) continue;

			mod.settings.bosses[i].logTime = Date.now();
		}
	}

	function getTime(thisTime) {
		const Time = new Date(thisTime);
		return `${add_0(Time.getMonth() + 1) }/${add_0(Time.getDate()) } ${
			add_0(Time.getHours()) }:${add_0(Time.getMinutes())}`;
	}

	function add_0(i) {
		if (i < 10) {
			// eslint-disable-next-line no-param-reassign
			i = `0${i}`;
		}
		return i;
	}

	function spawnItem(gameId, loc) {
		loc.z -= 100;
		mod.send("S_SPAWN_DROPITEM", 9, {
			"gameId": gameId * 10n,
			"loc": loc,
			"item": mod.settings.itemId,
			"amount": 1,
			"expiry": 0,
			"owners": []
		});
	}

	function despawnItem(gameId) {
		mod.send("S_DESPAWN_DROPITEM", 4, {
			"gameId": gameId * 10n
		});
	}

	// BAM-HP-Bar
	const gage_info = {
		"id": 0n,
		"huntingZoneId": 0,
		"templateId": 0,
		"target": 0n,
		"unk1": 0,
		"unk2": 0,
		"curHp": 16000000000n,
		"maxHp": 16000000000n,
		"unk3": 1
	};
	let hooks = [];

	function update_hp() {
		mod.toClient("S_BOSS_GAGE_INFO", 3, gage_info);
	}
	// 0: 0% <= hp < 20%, 1: 20% <= hp < 40%, 2: 40% <= hp < 60%, 3: 60% <= hp < 80%, 4: 80% <= hp < 100%, 5: 100% hp
	function correct_hp(stage) {
		const boss_hp_stage = BigInt(20 * (1 + stage));
		// we missed some part of the fight?
		if (gage_info.curHp * 100n / gage_info.maxHp > boss_hp_stage) {
			gage_info.curHp = gage_info.maxHp * boss_hp_stage / 100n;
			update_hp();
			mod.command.message(`HP <font color="#E69F00">${String(boss_hp_stage)}</font>%`);
		}
	}

	function load(e) {
		gage_info.id = e.gameId;
		gage_info.curHp = gage_info.maxHp;
		correct_hp(e.hpLevel);
		if (e.mode) {
			mod.command.message(`HP ~ <font color="#E69F00">${Math.round((99999999 - e.remainingEnrageTime) / 1000)}</font>`);
		}

		if (e.hpLevel == 5) {
			mod.command.message("HP 100%");
		} else if (e.hpLevel == 0) {
			mod.command.message("HP &lt; <font color=\"#FF0000\">20%</font> !!!");
		}

		if (!hooks.length) {
			setTimeout(update_hp, 1000);
			hook("S_NPC_STATUS", 2, (event) => {
				if (event.gameId === gage_info.id) {
					correct_hp(event.hpLevel);
				}
			});

			hook("S_EACH_SKILL_RESULT", 14, (event) => {
				if (event.target === gage_info.id && event.type === 1) {
					gage_info.curHp -= event.value;
					update_hp();
				}
			});

			hook("S_DESPAWN_NPC", 3, (event) => {
				if (event.gameId === gage_info.id) {
					unload();
				}
			});
		}
	}

	function unload() {
		if (hooks.length) {
			for (const h of hooks) {
				mod.unhook(h);
			}
			hooks = [];
		}
	}

	function hook() {
		hooks.push(mod.hook(...arguments));
	}

	function notificationafk(msg) {
		/*
		notifier.notifyafk({
			"title": "TERA AFK-Notification",
			"message": msg,
			"wait": false,
			"sound": "Notification.IM"
		});
		*/
	}
};

class TeraMessage {
	constructor(mod) {
		this.clr = function(text, hexColor) {
			return `<font color="#${hexColor}">${text}</font>`;
		};

		this.RED = function(text) {
			return `<font color="#FF0000">${text}</font>`;
		};
		this.BLU = function(text) {
			return `<font color="#56B4E9">${text}</font>`;
		};
		this.YEL = function(text) {
			return `<font color="#E69F00">${text}</font>`;
		};
		this.TIP = function(text) {
			return `<font color="#00FFFF">${text}</font>`;
		};
		this.GRY = function(text) {
			return `<font color="#A0A0A0">${text}</font>`;
		};
		this.PIK = function(text) {
			return `<font color="#FF00DC">${text}</font>`;
		};

		this.chat = function(msg) {
			mod.command.message(msg);
		};
		this.party = function(msg) {
			mod.send("S_CHAT", 3, {
				"channel": 21,
				// "name": "TIP",
				"message": msg
			});
		};
		this.raids = function(msg) {
			mod.send("S_CHAT", 3, {
				"channel": 25,
				// "name": "TIP",
				"message": msg
			});
		};
		this.alert = function(msg, type) {
			mod.send("S_DUNGEON_EVENT_MESSAGE", 2, {
				"type": type,
				"chat": false,
				"channel": 0,
				"message": msg
			});
		};
	}
}