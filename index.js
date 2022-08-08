/* eslint-disable no-param-reassign */
const os = require("os");
const Vec3 = require("tera-vec3");

const strings = {
	"ru": {
		"Enable/disable chat messages": "Включить/выключить сообщения в чате",
		"Enable/disable on-screen warning messages": "Включить/выключить сообщения предупреждения на экране",
		"Enable/disable on-screen notification messages": "Включить/выключить сообщения уведомления на экране",
		"Enable/disable send messages to party members": "Включить/выключить отправку сообщений членам группы",
		"Enable/disable NPC Markers": "Включить/выключить маркеры NPC",
		"Enable/disable instant teleport": "Включить/выключить мгновенный телепорт",
		"Enable/disable BAM-HP-Bar feature": "Включить/выключить отображение HP рейдовых боссов",
		"Remove marker from NPC": "Удалить маркер с NPC",
		"Display the spawn times of Mystery Merchants": "Отобразить время появления тайных торговцев",
		"Display Mystery Merchants locations of current zone": "Отобразить список позиций тайных торговцев для текущей зоны",
		"Search for Mystery Merchants in current zone": "Запустить поиск торговцев в текущей зоне",
		"Display the spawn times of World Bosses": "Отобразить время появления мировых боссов",
		"Display World Bosses locations of current zone": "Отобразить список позиций мировых боссов для текущей зоны",
		"Search for World Bosses in current zone": "Запустить поиск мировых боссов в текущей зоне",
		"Display the spawn times of Raid Bosses": "Отобразить время появления рейдовых боссов",
		"Display Raid Bosses locations of current zone": "Отобразить список позиций рейдовых боссов для текущей зоны",
		"Search for Raid Bosses in current zone": "Запустить поиск рейдовых боссов в текущей зоне",
		"Stop search": "Остановить поиск",
		"Teleport to specified location": "Переместиться в указанную позицию",
		"Use command": "Используйте команду",
		"or racial skill for teleport there": "или расовый скил для телепортации туда",
		"Enabled": "Вкл.",
		"Disabled": "Выкл.",
		"Alert messages": "Предупреждения",
		"Notice messages": "Уведомления",
		"Party messages": "Сообщения в группу",
		"Spawn messages": "Сообщения о появлении",
		"Instant teleport": "Мгновенный телепорт",
		"BAM-HP-Bar feature": "Отображение HP рейдовых боссов",
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
		"Location": "Локация",
		"Scan started": "Сканирование начато",
		"Scan stopped": "Сканирование закончено",
		"No positions for this zone": "Нет позиций для этой зоны",
		"NPC is not found": "NPC не найден",
		"channel": "канал",
		"no data": "нет данных",
		"spawned at": "появился в",
		"last": "послед. в",
		"next": "след. в"
	}
};

Number.prototype.leadZero = function(i = 1) {
	return this < 10 * i ? "0".repeat(i) + this : this;
};

Array.prototype.__shuffle = function() {
	for (let i = this.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[this[i], this[j]] = [this[j], this[i]];
	}
	return this;
};

module.exports = function BossHelper(mod) {
	const notifier = mod.require.notifier;
	const MSG = new TeraMessage(mod);
	const bamHp = new BamHpBar(mod);

	const configuredNpcs = [];
	const spawnedNpcs = new Map();
	const obtainedMerchants = {};
	const playerLocation = new Vec3(0, 0, 0);
	const commands = {
		"world_bosses": "wb",
		"raid_bosses": "rb",
		"merchants": "mm"
	};
	const defaultLanguage = "en";

	let language = defaultLanguage;
	let serverId = null;
	let party = false;
	let fallProtect = false;
	let zoneLocations = {};
	let searchZoneLocations = {};
	let playerChannel = 0;
	let playerTime = 0;
	let lastPos = null;
	let seekPos = 0;

	["world_bosses", "raid_bosses", "others", "merchants", "goblins"].forEach(type =>
		mod.settings[type].regions.forEach(region =>
			region.npcs.forEach(entry =>
				configuredNpcs.push({ type, "region": Object.fromEntries(Object.entries(region).filter(x => x[0] !== "npcs")), ...entry })
			)
		)
	);

	mod.command.add(["bh", "boss"], {
		"help": () => {
			MSG.chat(`${MSG.BLU("bh message")} - ${M("Enable/disable chat messages")}`);
			MSG.chat(`${MSG.BLU("bh alert")} - ${M("Enable/disable on-screen warning messages")}`);
			MSG.chat(`${MSG.BLU("bh notice")} - ${M("Enable/disable on-screen notification messages")}`);
			MSG.chat(`${MSG.BLU("bh party")} - ${M("Enable/disable send messages to party members")}`);
			MSG.chat(`${MSG.BLU("bh marker")} - ${M("Enable/disable NPC Markers")}`);
			MSG.chat(`${MSG.BLU("bh clear")} - ${M("Remove marker from NPC")}`);
			MSG.chat(`${MSG.BLU("bh teleport")} - ${M("Enable/disable instant teleport")}`);
			MSG.chat(`${MSG.BLU("bh hpbar")} - ${M("Enable/disable BAM-HP-Bar feature")}`);
			MSG.chat("========");
			MSG.chat(`${MSG.BLU("mm")} - ${M("Display the spawn times of Mystery Merchants")}`);
			MSG.chat(`${MSG.BLU("mm loc")} - ${M("Display Mystery Merchants locations of current zone")}`);
			MSG.chat(`${MSG.BLU("mm scan")} - ${M("Search for Mystery Merchants in current zone")}`);
			MSG.chat(`${MSG.BLU("mm stop")} - ${M("Stop search")}`);
			MSG.chat(`${MSG.BLU("mm to ") + MSG.YEL("id")} - ${M("Teleport to specified location")}`);
			MSG.chat("========");
			MSG.chat(`${MSG.BLU("rb")} - ${M("Display the spawn times of Raid Bosses")}`);
			MSG.chat(`${MSG.BLU("rb loc")} - ${M("Display Raid Bosses locations of current zone")}`);
			MSG.chat(`${MSG.BLU("rb scan")} - ${M("Search for Raid Bosses in current zone")}`);
			MSG.chat(`${MSG.BLU("rb stop")} - ${M("Stop search")}`);
			MSG.chat(`${MSG.BLU("rb to ") + MSG.YEL("id")} - ${M("Teleport to specified location")}`);
			MSG.chat("========");
			MSG.chat(`${MSG.BLU("wb")} - ${M("Display the spawn times of World Bosses")}`);
			MSG.chat(`${MSG.BLU("wb loc")} - ${M("Display World Bosses locations of current zone")}`);
			MSG.chat(`${MSG.BLU("wb scan")} - ${M("Search for World Bosses in current zone")}`);
			MSG.chat(`${MSG.BLU("wb stop")} - ${M("Stop search")}`);
			MSG.chat(`${MSG.BLU("wb to ") + MSG.YEL("id")} - ${M("Teleport to specified location")}`);
		},
		"alert": () => {
			mod.settings.alert = !mod.settings.alert;
			MSG.chat(`${M("Alert messages")}: ${mod.settings.alert ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
		},
		"notice": () => {
			mod.settings.notice = !mod.settings.notice;
			MSG.chat(`${M("Notice messages")}: ${mod.settings.notice ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
		},
		"party": () => {
			party = !party;
			MSG.chat(`${M("Party messages")}: ${party ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
		},
		"message": () => {
			mod.settings.message = !mod.settings.message;
			MSG.chat(`${M("Spawn messages")}: ${mod.settings.message ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
		},
		"marker": () => {
			mod.settings.marker = !mod.settings.marker;
			MSG.chat(`${M("Position markers")}: ${mod.settings.marker ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
		},
		"clear": () => {
			MSG.chat(`Boss-Helper: ${MSG.TIP(M("Position markers cleared"))}`);
			spawnedNpcs.forEach(key => despawnMarker(key));
		},
		"teleport": () => {
			mod.settings.teleport = !mod.settings.teleport;
			MSG.chat(`${M("Instant teleport")}: ${mod.settings.teleport ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
		},
		"hpbar": () => {
			mod.settings.hpbar = !mod.settings.hpbar;
			MSG.chat(`${M("BAM-HP-Bar feature")}: ${mod.settings.hpbar ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled"))}`);
			if (!mod.settings.hpbar) {
				bamHp.unload();
			}
		},
		"$none": () => {
			mod.settings.enabled = !mod.settings.enabled;
			MSG.chat(mod.settings.enabled ? MSG.BLU(M("Enabled")) : MSG.YEL(M("Disabled")));
			if (!mod.settings.enabled) {
				spawnedNpcs.forEach(key => despawnMarker(key));
				spawnedNpcs.clear();
				stopScan();
			}
		},
		"$default": () => MSG.chat(`${MSG.RED(M("Unknown parameter"))}. ${M("Use command")}: ${MSG.BLU("bh help")}`)
	});

	mod.command.add(commands["merchants"], {
		"to": arg => toZoneLocation("merchants", arg),
		"loc": () => listZoneLocations("merchants"),
		"scan": () => startScan("merchants"),
		"stop": () => stopScan(),
		"$none": () => {
			MSG.chat(`======== ${M("Goblin").toUpperCase()} ========`);

			mod.settings.goblins.regions.forEach(region => {
				if (region.logDiff === undefined) return;
				const name = getName(region);

				if (!mod.settings.goblins.logTime[serverId]) {
					MSG.chat(` ${MSG.BLU(name)} ${MSG.GRY(M("no data"))}`);
				} else {
					let nextTime = mod.settings.goblins.logTime[serverId] + region.logDiff * 1000;

					while (Date.now() > nextTime) {
						nextTime += 24 * 60 * 60 * 1000;
					}

					const lastTime = nextTime - 24 * 60 * 60 * 1000;

					if (lastTime < Date.now() && lastTime + 5 * 60 * 1000 >= Date.now()) {
						MSG.chat(` ${MSG.PIK(name)} ${M("spawned at")} ${MSG.TIP(getTime(lastTime))}`);
					} else {
						MSG.chat(` ${MSG.BLU(name)} ${M("next")} ${MSG.TIP(getTime(nextTime))}`);
					}
				}
			});

			MSG.chat(`======== ${M("Merchant").toUpperCase()} ========`);
			const regionGroups = [];

			mod.settings.merchants.regions.forEach(region => {
				if (region.zoneId === undefined) return;

				let group = undefined;

				if (region.logDiff !== undefined) {
					group = regionGroups.find(m => m.logDiff == region.logDiff);

					if (group) {
						group.zoneIds.push(region.zoneId);
						group.fullName.push(getName(region));
					}
				}

				if (region.logTime !== undefined || !group) {
					regionGroups.push({ ...region, "zoneIds": [region.zoneId], "fullName": [getName(region)] });
				}
			});

			regionGroups.forEach(group => {
				const name = group.fullName.join(" / ");
				const obtainedName = obtainedMerchants[serverId][Object.keys(obtainedMerchants[serverId]).filter(x => group.zoneIds.includes(Number(x)))];

				if (group.logTime !== undefined && group.logIntervalMin !== undefined && group.logIntervalMax !== undefined) {
					if (!group.logTime[serverId]) {
						MSG.chat(` ${MSG.BLU(name)} ${MSG.GRY(M("no data"))}`);
					} else {
						const nextTimeMin = group.logTime[serverId] + group.logIntervalMin * 1000;
						const nextTimeMax = group.logTime[serverId] + group.logIntervalMax * 1000;

						if (group.logTime[serverId] < Date.now() && group.logTime[serverId] + 30 * 60 * 1000 >= Date.now()) {
							MSG.chat(` ${MSG.PIK(obtainedName ? obtainedName.fullName : name)} ${M("spawned at")} ${MSG.TIP(getTime(group.logTime[serverId]))}`);
						} else if (Date.now() < nextTimeMax) {
							if (nextTimeMin == nextTimeMax) {
								MSG.chat(` ${MSG.BLU(name)} ${M("next")} ${MSG.TIP(getTime(nextTimeMin))}`);
							} else {
								MSG.chat(` ${MSG.BLU(name)} ${M("next")} ${MSG.TIP(getTime(nextTimeMin, nextTimeMax))}`);
							}
						} else {
							MSG.chat(` ${MSG.BLU(name)} ${M("last")} ${MSG.GRY(getTime(group.logTime[serverId]))}`);
						}
					}
				} else if (group.logDiff !== undefined) {
					let logTime = mod.settings.merchants.logTime[serverId];

					if (group.logTime !== undefined) {
						logTime = group.logTime[serverId];
					}

					if (!logTime) {
						MSG.chat(` ${MSG.BLU(name)} ${MSG.GRY(M("no data"))}`);
					} else {
						let nextTime = logTime + group.logDiff * 1000;

						while (Date.now() > nextTime) {
							nextTime += 5 * 60 * 60 * 1000;
						}

						const lastTime = nextTime - 5 * 60 * 60 * 1000;

						if (lastTime < Date.now() && lastTime + 30 * 60 * 1000 >= Date.now()) {
							MSG.chat(` ${MSG.PIK(obtainedName ? obtainedName.fullName : name)} ${M("spawned at")} ${MSG.TIP(getTime(lastTime))}`);
						} else {
							MSG.chat(` ${MSG.BLU(name)} ${M("next")} ${MSG.TIP(getTime(nextTime))}`);
						}
					}
				}
			});
		},
		"$default": () => MSG.chat(`${MSG.RED(M("Unknown parameter"))}. ${M("Use command")}: ${MSG.BLU("bh help")}`)
	});

	mod.command.add(commands["world_bosses"], {
		"to": arg => toZoneLocation("world_bosses", arg),
		"loc": () => listZoneLocations("world_bosses"),
		"scan": () => startScan("world_bosses"),
		"stop": () => stopScan(),
		"$none": () => {
			MSG.chat(`======== ${M("World Boss").toUpperCase()} ========`);

			mod.settings.world_bosses.regions.forEach(region =>
				region.npcs.forEach(boss => {
					if (boss.logTime === undefined) return;

					const name = getName(boss);

					if (!boss.logTime[serverId]) {
						MSG.chat(` ${MSG.BLU(name)} ${MSG.GRY(M("no data"))}`);
					} else {
						const nextTime = boss.logTime[serverId] + 5 * 60 * 60 * 1000;

						if (Date.now() < nextTime) {
							MSG.chat(` ${MSG.BLU(name)} ${M("next")} ${MSG.TIP(getTime(nextTime))}`);
						} else {
							MSG.chat(` ${MSG.BLU(name)} ${M("last")} ${MSG.GRY(getTime(boss.logTime[serverId]))}`);
						}
					}
				})
			);
		},
		"$default": () => MSG.chat(`${MSG.RED(M("Unknown parameter"))}. ${M("Use command")}: ${MSG.BLU("bh help")}`)
	});

	mod.command.add(commands["raid_bosses"], {
		"to": arg => toZoneLocation("raid_bosses", arg),
		"loc": () => listZoneLocations("raid_bosses"),
		"scan": () => startScan("raid_bosses"),
		"stop": () => stopScan(),
		"$none": () => {
			MSG.chat(`======== ${M("Raid Boss").toUpperCase()} ========`);

			mod.settings.raid_bosses.regions.forEach(region =>
				region.npcs.forEach(boss => {
					if (boss.logTime === undefined) return;

					const name = getName(boss);

					if (!boss.logTime[serverId]) {
						MSG.chat(` ${MSG.BLU(name)} ${MSG.GRY(M("no data"))}`);
					} else {
						const nextTimeMax = boss.logTime[serverId] + (5 * 60 * 60 + 30 * 60) * 1000;
						const nextTimeMin = nextTimeMax - 60 * 60 * 1000;

						if (Date.now() < nextTimeMax) {
							MSG.chat(` ${MSG.BLU(name)} ${M("next")} ${MSG.TIP(getTime(nextTimeMin, nextTimeMax))}`);
						} else {
							MSG.chat(` ${MSG.BLU(name)} ${M("last")} ${MSG.GRY(getTime(boss.logTime[serverId]))}`);
						}
					}
				})
			);
		},
		"$default": () => MSG.chat(`${MSG.RED(M("Unknown parameter"))}. ${M("Use command")}: ${MSG.BLU("bh help")}`)
	});

	mod.game.on("enter_game", () => {
		if (!mod.settings.language || mod.settings.language == "auto") {
			language = { "0": "en", "1": "kr", "3": "jp", "4": "de", "5": "fr", "7": "tw", "8": "ru" }[mod.game.language] || defaultLanguage;
		} else {
			language = mod.settings.language;
		}

		serverId = mod.game.me.serverId;

		if (obtainedMerchants[serverId] === undefined) {
			obtainedMerchants[serverId] = {};
		}

		migrateConfiguration();
	});

	mod.game.me.on("change_zone", () => {
		spawnedNpcs.clear();
		updateZoneLocations();
	});

	mod.game.on("leave_loading_screen", () => {
		stopScan();
	});

	mod.hook("S_CURRENT_CHANNEL", 2, event => {
		playerChannel = Number(event.channel);
	});

	mod.hook("C_PLAYER_LOCATION", 5, event => {
		if (!mod.settings.enabled) return;

		let correctedTime = false;

		if (playerTime > event.time) {
			event.time = (playerTime + 75);
			correctedTime = true;
		}

		Object.assign(playerLocation, event.dest);

		if (fallProtect && (event.type == 2 || event.type == 10)) {
			fallProtect = false;

			return false;
		}

		if (correctedTime) {
			return true;
		}
	});

	mod.hook("S_SPAWN_NPC", mod.majorPatchVersion >= 101 ? 12 : 11, event => {
		if (!mod.settings.enabled) return;

		const npc = getNpc(event.huntingZoneId, event.templateId);
		let mapLink = null;

		if (npc) {
			spawnedNpcs.set(event.gameId, npc);

			if (npc.type === "merchants" && npc.region.zoneId !== undefined) {
				obtainedMerchants[serverId][npc.region.zoneId] = npc;
			}

			if (searchZoneLocations[npc.type] !== undefined && searchZoneLocations[npc.type][seekPos - 1] !== undefined) {
				mapLink = getMapLink(searchZoneLocations[npc.type][seekPos - 1].map, event.loc, npc.fullName);

				MSG.chat(`${MSG.BLU(M("Found"))} ${mapLink} ${M("Location")} ${MSG.YEL(searchZoneLocations[npc.type][seekPos - 1].index + 1)}`);

				if (!mod.settings.teleport) {
					MSG.chat(`${M("Use command")} ${MSG.BLU(`${commands[npc.type]} to ${searchZoneLocations[npc.type][seekPos - 1].index + 1}`)} ${M("or racial skill for teleport there")}.`);
				}

				stopScan();
			}

			if (mod.settings.marker && (npc.marker === undefined || npc.marker)) {
				mod.setTimeout(() => spawnMarker(event.gameId, event.loc), 1000);
			}

			if (mod.settings.alert && (npc.alert === undefined || npc.alert)) {
				MSG.alert((`${M("Found")} ${npc.fullName}`), 44);
			}

			if (party) {
				mod.send("C_CHAT", 1, {
					"channel": 21,
					"message": (`${playerChannel} ${M("channel")} ${mapLink || npc.fullName}`)
				});
			} else if (mod.settings.notice) {
				MSG.raids(`${M("Found")} ${npc.fullName}`);
			}

			if (mod.settings.hpbar && npc.type === "raid_bosses") {
				return bamHp.spawnNpc(event);
			}

			updateZoneLocations();
		}
	});

	mod.hook("S_DESPAWN_NPC", 3, { "order": -100 }, event => {
		if (!mod.settings.enabled) return;

		const npc = spawnedNpcs.get(event.gameId);

		if (!npc) return;

		if (npc.type === "world_bosses") {
			saveTime(npc);
		}

		despawnMarker(event.gameId);
		spawnedNpcs.delete(event.gameId);
	});

	mod.hook("S_NOTIFY_GUILD_QUEST_URGENT", 1, event => {
		if (!mod.settings.enabled || !mod.settings.message) return;

		let npc = undefined;

		switch (event.quest) {
			case "@GuildQuest:10005001":
				npc = getNpc(event.zoneId, 2001);
				break;

			case "@GuildQuest:10006001":
				npc = getNpc(event.zoneId, 2002);
				break;

			case "@GuildQuest:10007001":
				npc = getNpc(event.zoneId, 2003);
				break;
		}

		if (!npc) return;

		if (event.type == 0) {
			MSG.chat(`${MSG.BLU(M("Guild Boss"))} ${MSG.RED(npc.fullName)}`);
			notificationafk(`${M("Guild Boss")} ${npc.fullName}`);
		}

		if (event.type == 1) {
			MSG.chat(`${MSG.BLU(M("Refreshed"))} ${MSG.TIP(npc.fullName)}`);
			notificationafk(`${M("Refreshed")} ${npc.fullName}`);
		}
	});

	mod.hook("S_SYSTEM_MESSAGE", 1, event => {
		if (!mod.settings.enabled) return;

		const sysMsg = mod.parseSystemMessage(event.message);
		const npcName = sysMsg.tokens.npcName || sysMsg.tokens.npcname;
		let npc = undefined;

		if (npcName) {
			const npcId = npcName.match(/\d+/g);
			npc = getNpc(parseInt(npcId[0]), parseInt(npcId[1]));
		}

		if (!npc) return;

		switch (sysMsg.id) {
			case "SMT_FIELDBOSS_APPEAR":
				if (mod.settings.message) {
					MSG.chat(`${MSG.BLU(M("Spawned"))} ${MSG.RED(npc.fullName)}`);
					notificationafk(`${M("Spawned")} ${npc.fullName}`);
				}
				break;

			case "SMT_FIELDBOSS_DIE_GUILD":
			case "SMT_FIELDBOSS_DIE_NOGUILD":
				if (mod.settings.message) {
					const nextTimeMax = Date.now() + (5 * 60 * 60 + 30 * 60) * 1000;
					const nextTimeMin = nextTimeMax - 60 * 60 * 1000;

					MSG.chat(`${MSG.RED(npc.fullName)} ${M("next")} ${MSG.TIP(getTime(nextTimeMin, nextTimeMax))}`);
				}

				saveTime(npc);
				break;

			case "SMT_WORLDSPAWN_NOTIFY_SPAWN":
				if (mod.settings.message) {
					if (npc.type === "goblins") {
						MSG.party(`${M("Spawned")} ${npc.fullName}`);
					} else {
						MSG.chat(`${MSG.BLU(M("Spawned"))} ${MSG.PIK(npc.fullName)}`);
					}
					notificationafk(`${M("Spawned")} ${npc.fullName}`);
				}

				if (npc.type === "merchants" && npc.region.zoneId !== undefined) {
					obtainedMerchants[serverId][npc.region.zoneId] = npc;
				}

				updateZoneLocations();
				saveTime(npc);
				break;

			case "SMT_WORLDSPAWN_NOTIFY_DESPAWN":
				if (npc.type === "merchants" && npc.region.zoneId !== undefined) {
					delete obtainedMerchants[serverId][npc.region.zoneId];
				}

				updateZoneLocations();
				saveTime(npc, true);
				break;
		}
	});

	function toZoneLocation(npcType, to) {
		if (to && isNumber(to) && zoneLocations[npcType] !== undefined && zoneLocations[npcType][to - 1] !== undefined) {
			teleport(zoneLocations[npcType][to - 1], true);
		}
	}

	function listZoneLocations(npcType) {
		updateZoneLocations();

		if (zoneLocations[npcType] !== undefined && zoneLocations[npcType].length > 0) {
			Object.keys(zoneLocations[npcType]).forEach(key => {
				const mapLink = getMapLink(zoneLocations[npcType][key].map, zoneLocations[npcType][key], zoneLocations[npcType][key].name);
				const found = zoneLocations[npcType][key].search ? ` (${M("Found")})` : "";
				const here = isNearLocation(zoneLocations[npcType][key]) ? " ***" : "";

				MSG.chat(`${MSG.YEL(Number(key) + 1)} - ${mapLink + found + here}`);
			});
		} else {
			MSG.chat(MSG.RED(M("No positions for this zone")));
		}
	}

	function updateZoneLocations() {
		const indexes = {};
		zoneLocations = {};
		searchZoneLocations = {};

		configuredNpcs.forEach(entry => {
			if (entry.locations !== undefined && entry.region !== undefined && entry.region.zoneId == mod.game.me.zone) {
				const search = obtainedMerchants[serverId][mod.game.me.zone] !== undefined && obtainedMerchants[serverId][mod.game.me.zone].huntingZoneId == entry.huntingZoneId;

				if (zoneLocations[entry.type] === undefined) {
					zoneLocations[entry.type] = [];
					indexes[entry.type] = 0;
				}

				if (searchZoneLocations[entry.type] === undefined) {
					searchZoneLocations[entry.type] = [];
				}

				entry.locations.forEach(location => {
					if (search && !isNearLocation(location)) {
						searchZoneLocations[entry.type].push({ "name": getName(entry), "index": indexes[entry.type], ...location });
					}

					zoneLocations[entry.type].push({ "name": getName(entry), "index": indexes[entry.type], search, ...location });

					indexes[entry.type]++;
				});
			}
		});

		Object.keys(searchZoneLocations).forEach(type => {
			if (searchZoneLocations[type].length < 1 && zoneLocations[type] !== undefined) {
				searchZoneLocations[type] = [...zoneLocations[type]];
			}

			if (type === "merchants") {
				searchZoneLocations[type].__shuffle();
			}
		});
	}

	function saveTime(npc, despawn = false) {
		switch (npc.type) {
			case "merchants":
				mod.settings[npc.type].regions.forEach(region => {
					if (region.npcs.find(b => b.huntingZoneId == npc.huntingZoneId && b.templateId == npc.templateId)) {
						if (region.logDiff !== undefined) {
							mod.settings[npc.type].logTime[serverId] = Date.now() - region.logDiff * 1000 - (despawn ? 30 * 60 * 1000 : 0);
						}

						if (region.logTime !== undefined) {
							region.logTime[serverId] = Date.now() - (despawn ? 30 * 60 * 1000 : 0);
						}
					}
				});
				break;

			case "goblins":
				mod.settings[npc.type].regions.forEach(region => {
					if (region.npcs.find(b => b.huntingZoneId == npc.huntingZoneId && b.templateId == npc.templateId) && region.logDiff !== undefined) {
						mod.settings[npc.type].logTime[serverId] = Date.now() - region.logDiff * 1000;
					}
				});
				break;

			case "world_bosses":
			case "raid_bosses":
				mod.settings[npc.type].regions.forEach(region => {
					const boss = region.npcs.find(b => b.huntingZoneId == npc.huntingZoneId && b.templateId == npc.templateId);

					if (boss && boss.logTime !== undefined) {
						boss.logTime[serverId] = Date.now();
					}
				});
		}
	}

	function spawnMarker(gameId, loc) {
		const itemLoc = { ...loc };

		itemLoc.z -= 100;

		mod.send("S_SPAWN_DROPITEM", mod.majorPatchVersion >= 99 ? 9 : 8, {
			"gameId": gameId * 10n,
			"loc": itemLoc,
			"item": mod.settings.itemId,
			"amount": 1,
			"expiry": 0,
			"owners": []
		});
	}

	function despawnMarker(gameId) {
		if (!spawnedNpcs.has(gameId)) return;

		mod.send("S_DESPAWN_DROPITEM", 4, {
			"gameId": gameId * 10n
		});
	}

	function startScan(npcType) {
		if (!mod.settings.enabled) return;

		updateZoneLocations();
		stopScan();

		if (searchZoneLocations[npcType] != undefined && searchZoneLocations[npcType].length > 0) {
			if (lastPos) seekPos = lastPos;

			MSG.chat(`${M("Scan started")} (${searchZoneLocations[npcType].length})...`);
			mod.setInterval(searchNpc, 5000, npcType);
			holdCharacter();
		} else {
			MSG.chat(MSG.RED(M("No positions for this zone")));
			stopScan();
		}
	}

	function searchNpc(npcType) {
		seekPos++;

		if (searchZoneLocations[npcType] != undefined && seekPos <= searchZoneLocations[npcType].length) {
			MSG.chat(`${M("Location")} [${seekPos}/${searchZoneLocations[npcType].length}]: ${MSG.BLU(searchZoneLocations[npcType][seekPos - 1].name)}`);

			teleport(searchZoneLocations[npcType][seekPos - 1], mod.settings.teleport);
			holdCharacter();

			lastPos = seekPos;
		} else {
			MSG.chat(MSG.RED(M("NPC is not found")));
			stopScan();
		}
	}

	function stopScan() {
		if (lastPos) {
			MSG.chat(`${M("Scan stopped")}`);
		}

		mod.clearAllIntervals();
		unholdCharacter();

		lastPos = null;
		seekPos = 0;
	}

	function holdCharacter() {
		mod.send("S_ADMIN_HOLD_CHARACTER", 2, {
			"hold": true
		});
	}

	function unholdCharacter() {
		mod.send("S_CLEAR_ALL_HOLDED_ABNORMALITY", 1, {});
		mod.send("S_ADMIN_HOLD_CHARACTER", 2, {
			"hold": false
		});
	}

	function teleport(newLoc, instant = false) {
		if (!mod.settings.enabled) return;

		let currTime = os.uptime() * 1000 + new Date().getMilliseconds() + 150;

		if (currTime < playerTime) {
			currTime = playerTime + 50;
		}

		fallProtect = true;
		playerTime = currTime;

		const direction = Math.atan2(newLoc.y - playerLocation.y, newLoc.x - playerLocation.x);
		const modLoc = new Vec3(0, 0, 0);

		Object.assign(modLoc, newLoc);
		Object.assign(playerLocation, modLoc);

		modLoc.z += 10;

		mod.send("C_PLAYER_LOCATION", 5, {
			"loc": modLoc,
			"w": direction,
			"lookdirection": direction,
			"dest": modLoc,
			"type": 7,
			"jumpDistance": 0,
			"inShuttle": false,
			"time": playerTime
		});

		if (instant) {
			mod.send("S_INSTANT_MOVE", 3, {
				"gameId": mod.game.me.gameId,
				"loc": modLoc,
				"w": direction
			});
		}
	}

	function isNearLocation(loc, d = 50) {
		return playerLocation.dist3D(new Vec3(loc.x, loc.y, loc.z)) / 25 <= d;
	}

	function getNpc(huntingZoneId, templateId) {
		let npc = undefined;

		if (configuredNpcs.find(b => b.huntingZoneId == huntingZoneId && b.templateId == templateId)) {
			npc = { ...configuredNpcs.find(b => b.huntingZoneId == huntingZoneId && b.templateId == templateId) };
		}

		if (npc) {
			npc.fullName = getName(npc.region) ? `[${getName(npc.region)}] ${getName(npc)}` : getName(npc);
		}

		return npc;
	}

	function getMapLink(map, loc, text) {
		return `<FONT color="#E114"><ChatLinkAction param="3#####${map || "0"}@${mod.game.me.zone}@${loc.x},${loc.y},${loc.z}">&lt;${text}&gt;</ChatLinkAction></FONT>`;
	}

	function getName(entry) {
		return entry[`name_${language.toUpperCase()}`] || entry[`name_${language}`] || entry.name;
	}

	function getTime(thisTimeOne, thisTimeTwo = null) {
		if (thisTimeTwo === null) {
			thisTimeTwo = thisTimeOne;
		}

		const timeOne = new Date(thisTimeOne);
		const timeTwo = new Date(thisTimeTwo);
		const timeStringOne = `${(timeOne.getMonth() + 1).leadZero()}/${timeOne.getDate().leadZero()} ${timeOne.getHours().leadZero()}:${timeOne.getMinutes().leadZero()}`;
		const timeStringTwo = `${(timeTwo.getMonth() + 1).leadZero()}/${timeTwo.getDate().leadZero()} ${timeTwo.getHours().leadZero()}:${timeTwo.getMinutes().leadZero()}`;

		if (thisTimeOne === thisTimeTwo) {
			return timeOne > Date.now() && timeOne < Date.now() + 30 * 60 * 1000 ? MSG.YEL(timeStringOne) : timeStringOne;
		} else if (timeOne > Date.now() && timeOne < Date.now() + 30 * 60 * 1000 || timeTwo > Date.now() && timeTwo < Date.now() + 30 * 60 * 1000) {
			return MSG.YEL(`${timeStringOne} ~ ${timeStringTwo}`);
		} else {
			return `${timeStringOne} ~ ${timeStringTwo}`;
		}
	}

	function isNumber(value) {
		return !isNaN(parseFloat(value)) && !isNaN(value - 0);
	}

	function M(string) {
		return strings[language] && strings[language][string] ? strings[language][string] : string;
	}

	function notificationafk(msg) {
		notifier.notifyafk({
			"title": "TERA AFK-Notification",
			"message": msg,
			"wait": false,
			"sound": "Notification.IM"
		});
	}

	function migrateConfiguration() {
		if (mod.settings.merchants.logTime !== undefined && isNumber(mod.settings.merchants.logTime)) {
			mod.settings.merchants.logTime = { [serverId]: mod.settings.merchants.logTime };
		}

		mod.settings.goblins.regions.forEach(region => {
			if (mod.settings.goblins.logTime !== undefined && isNumber(mod.settings.goblins.logTime)) {
				mod.settings.goblins.logTime = { [serverId]: mod.settings.goblins.logTime };
			}
		});

		mod.settings.merchants.regions.forEach((region, regionIndex) => {
			const entry = mod.settings.merchants.regions[regionIndex];

			if (entry.logTime !== undefined && isNumber(entry.logTime)) {
				entry.logTime = { [serverId]: entry.logTime };
			}
		});

		mod.settings.world_bosses.regions.forEach((region, regionIndex) =>
			region.npcs.forEach((boss, bossIndex) => {
				const entry = mod.settings.world_bosses.regions[regionIndex].npcs[bossIndex];

				if (entry.logTime !== undefined && isNumber(entry.logTime)) {
					entry.logTime = { [serverId]: entry.logTime };
				}
			})
		);

		mod.settings.raid_bosses.regions.forEach((region, regionIndex) =>
			region.npcs.forEach((boss, bossIndex) => {
				const entry = mod.settings.raid_bosses.regions[regionIndex].npcs[bossIndex];

				if (entry.logTime !== undefined && isNumber(entry.logTime)) {
					entry.logTime = { [serverId]: entry.logTime };
				}
			})
		);
	}
};

class BamHpBar {
	constructor(mod, hook = false) {
		this.mod = mod;
		this.msg = new TeraMessage(mod);
		this.hooks = new Set();

		this.gageInfo = {
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

		if (hook) {
			mod.hook("S_SPAWN_NPC", mod.majorPatchVersion >= 101 ? 12 : 11, event => this.spawnNpc(event));
		}
	}

	updateHp() {
		this.mod.send("S_BOSS_GAGE_INFO", 3, this.gageInfo);
	}

	// 0: 0% <= hp < 20%, 1: 20% <= hp < 40%, 2: 40% <= hp < 60%, 3: 60% <= hp < 80%, 4: 80% <= hp < 100%, 5: 100% hp
	correctHp(stage) {
		const bossHpStage = BigInt(20 * (1 + stage));

		if (this.gageInfo.curHp * 100n / this.gageInfo.maxHp > bossHpStage) {
			this.gageInfo.curHp = this.gageInfo.maxHp * bossHpStage / 100n;
			this.updateHp();

			this.msg.chat(`HP ${this.msg.YEL(String(bossHpStage))}%`);
		}
	}

	spawnNpc(e) {
		if (e.walkSpeed != 240) return;

		switch (e.templateId) {
			case 5001: // Ortan
				e.shapeId = 303730;
				e.huntingZoneId = 994;
				e.templateId = 1000; // Nightmare Birchback
				this.load(e);
				return true;

			case 501: // Hazard
				e.shapeId = 303740;
				e.huntingZoneId = 777;
				e.templateId = 77730; // Kerkion
				this.load(e);
				return true;

			case 4001: // Cerrus
				e.shapeId = 303750;
				e.huntingZoneId = 994;
				e.templateId = 1000; // Nightmare Birchback
				this.load(e);
				return true;
		}
	}

	load(e) {
		this.gageInfo.id = e.gameId;
		this.gageInfo.curHp = this.gageInfo.maxHp;

		this.correctHp(e.hpLevel);

		if (e.mode) {
			// this.msg.chat(`You missed ~ ${this.msg.YEL(Math.round((99999999 - e.remainingEnrageTime) / 1000))}  sec. of the fight`);
		}

		if (e.hpLevel == 5) {
			this.msg.chat("HP 100%");
		} else if (e.hpLevel == 0) {
			this.msg.chat(`HP &lt; ${this.msg.RED("20%")} !!!`);
		}

		if (this.hooks.size == 0) {
			this.mod.setTimeout(() => this.updateHp(), 1000);

			this.hook("S_NPC_STATUS", 2, event => {
				if (event.gameId === this.gageInfo.id) {
					this.correctHp(event.hpLevel);
				}
			});

			this.hook("S_EACH_SKILL_RESULT", this.mod.majorPatchVersion >= 110 ? 15 : 14, event => {
				if (event.target === this.gageInfo.id && event.type === 1) {
					this.gageInfo.curHp -= event.value;
					this.updateHp();
				}
			});

			this.hook("S_DESPAWN_NPC", 3, event => {
				if (event.gameId === this.gageInfo.id) {
					this.unload();
				}
			});
		}
	}

	unload() {
		this.hooks.forEach(h => this.mod.unhook(h));
		this.hooks.clear();
	}

	hook() {
		this.hooks.add(this.mod.hook(...arguments));
	}
}

class TeraMessage {
	constructor(mod) {
		this.mod = mod;
	}

	clr(text, hexColor) {
		return `<font color="#${hexColor}">${text}</font>`;
	}

	RED(text) {
		return `<font color="#FF0000">${text}</font>`;
	}

	BLU(text) {
		return `<font color="#56B4E9">${text}</font>`;
	}

	YEL(text) {
		return `<font color="#E69F00">${text}</font>`;
	}

	TIP(text) {
		return `<font color="#00FFFF">${text}</font>`;
	}

	GRY(text) {
		return `<font color="#A0A0A0">${text}</font>`;
	}

	PIK(text) {
		return `<font color="#FF00DC">${text}</font>`;
	}

	chat(msg) {
		this.mod.command.message(msg);
	}

	party(msg) {
		this.mod.send("S_CHAT", this.mod.majorPatchVersion >= 108 ? 4 : 3, {
			"channel": 21,
			"message": msg
		});
	}

	raids(msg) {
		this.mod.send("S_CHAT", this.mod.majorPatchVersion >= 108 ? 4 : 3, {
			"channel": 25,
			"message": msg
		});
	}

	alert(msg, type) {
		this.mod.send("S_DUNGEON_EVENT_MESSAGE", 2, {
			"type": type,
			"chat": false,
			"channel": 0,
			"message": msg
		});
	}
}