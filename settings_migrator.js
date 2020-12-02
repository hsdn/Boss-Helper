/* eslint-disable no-param-reassign */
const DefaultSettings = {
	"enabled": true,
	"alerted": true,
	"notice": true,
	"messager": true,
	"marker": true,
	"itemId": 88704,
	"logTime": 0,
	"bosses": [
		/* ==== Event =============================================================================================== */
		{
			"huntingZoneId": 26,
			"templateId": 6001,
			"name": "(Event) Caiman Wanderer",
			"name_RU": "(Ивент) Кайман-бродяга"
		},
		{
			"huntingZoneId": 27,
			"templateId": 6001,
			"name": "(Event) Caiman Wanderer",
			"name_RU": "(Ивент) Кайман-бродяга"
		},
		{
			"huntingZoneId": 29,
			"templateId": 6002,
			"name": "(Event) Caiman Wanderer",
			"name_RU": "(Ивент) Кайман-бродяга"
		},
		{
			"huntingZoneId": 30,
			"templateId": 6001,
			"name": "(Event) Caiman Wanderer",
			"name_RU": "(Ивент) Кайман-бродяга"
		},
		{
			"huntingZoneId": 38,
			"templateId": 6001,
			"name": "(Event) Caiman Wanderer",
			"name_RU": "(Ивент) Кайман-бродяга"
		},
		{
			"huntingZoneId": 181,
			"templateId": 6001,
			"name": "(Event) Caiman Wanderer",
			"name_RU": "(Ивент) Кайман-бродяга"
		},
		/* ==== Secret store ========================================================================================== */
		{
			"huntingZoneId": 63,
			"templateId": 1271,
			"name": "Mystery Merchant (Velika 1)",
			"name_RU": "Тайный Магазин (Велика 1)"
		},
		{
			"huntingZoneId": 63,
			"templateId": 1279,
			"name": "Mystery Merchant (Velika 2)",
			"name_RU": "Тайный Магазин (Велика 2)"
		},
		{
			"huntingZoneId": 72,
			"templateId": 1271,
			"name": "Mystery Merchant (Allemantheia)",
			"name_RU": "Тайный Магазин (Аллемантея)"
		},
		{
			"huntingZoneId": 84,
			"templateId": 1271,
			"name": "Mystery Merchant (Kaiator)",
			"name_RU": "Тайный Магазин (Кайатор)"
		},
		{
			"huntingZoneId": 183,
			"templateId": 1271,
			"name": "Mystery Merchant (Highwatch)",
			"name_RU": "Тайный Магазин (Верхний Дозор)"
		},
		/* ==== Goblin Starc ========================================================================================== */
		{
			"huntingZoneId": 72,
			"templateId": 1276,
			"logDiff": 10800,
			"name": "Coin Vendor (Allemantheia)",
			"name_RU": "Гоблин (Аллемантея)"
		},
		{
			"huntingZoneId": 183,
			"templateId": 1276,
			"logDiff": 32400,
			"name": "Coin Vendor (Highwatch)",
			"name_RU": "Гоблин (Верхний Дозор)"
		},
		{
			"huntingZoneId": 63,
			"templateId": 1276,
			"logDiff": 54000,
			"name": "Coin Vendor (Velika)",
			"name_RU": "Гоблин (Велика)"
		},
		{
			"huntingZoneId": 63,
			"templateId": 1284,
			"logDiff": 54000,
			"name": "Coin Vendor (Velika)",
			"name_RU": "Гоблин (Велика)"
		},
		{
			"huntingZoneId": 84,
			"templateId": 1276,
			"logDiff": 75600,
			"name": "Coin Vendor (Kaiator)",
			"name_RU": "Гоблин (Кайатор)"
		},
		/* ==== South Arun ========================================================================================== */
		// Arcadia / Val Aureum (0:50)
		{
			"logDiff": 3000,
			"name": "Arcadia / Val Aureum",
			"name_RU": "Аркадия / Вал-Аурэум"
		},
		{
			"huntingZoneId": 2,
			"templateId": 1271,
			"logDiff": 3000,
			"name": "[Arcadia] Arcun (Fey Forest, Lumbertown)",
			"name_RU": "[Аркадия] Аркун (Дивный лес, Деревня лесорубов)"
		},
		{
			"huntingZoneId": 3,
			"templateId": 1271,
			"logDiff": 3000,
			"name": "[Arcadia] Arcun (Oblivion Woods, Crescentia)",
			"name_RU": "[Аркадия] Аркун (Леса Забвения, Кресцентия)"
		},
		{
			"huntingZoneId": 5,
			"templateId": 1271,
			"logDiff": 3000,
			"name": "[Arcadia] Arcun (Tuwangi Mire)",
			"name_RU": "[Аркадия] Аркун (Трясина Туванги)"
		},
		{
			"huntingZoneId": 6,
			"templateId": 1271,
			"logDiff": 3000,
			"name": "[Arcadia] Arcun (Valley of Titans)",
			"name_RU": "[Аркадия] Аркун (Долина титанов)"
		},
		{
			"huntingZoneId": 7,
			"templateId": 1271,
			"logDiff": 3000,
			"name": "[Arcadia] Arcun (Celestial Hills)",
			"name_RU": "[Аркадия] Аркун (Небесные холмы)"
		},
		{
			"huntingZoneId": 18,
			"templateId": 1271,
			"logDiff": 3000,
			"name": "[Val Aureum] Viadu (Colossal Ruins)",
			"name_RU": "[Вал-Аурэум] Виадун (Исполинские развалины)"
		},
		{
			"huntingZoneId": 19,
			"templateId": 1271,
			"logDiff": 3000,
			"name": "[Val Aureum] Viadu (Freeholds)",
			"name_RU": "[Вал-Аурэум] Виадун (Вольноземье)"
		},
		{
			"huntingZoneId": 21,
			"templateId": 1271,
			"logDiff": 3000,
			"name": "[Val Aureum] Viadu (Basilisk Crag, Chebika)",
			"name_RU": "[Вал-Аурэум] Виадун (Утес Василисков, Чебика)"
		},
		{
			"huntingZoneId": 24,
			"templateId": 1271,
			"logDiff": 3000,
			"name": "[Val Aureum] Viadu (Aurum Road, Tulufan)",
			"name_RU": "[Вал-Аурэум] Виадун (Аурумская дорога, Тулуфан)"
		},
		// Ostgarath / Poporia (1:40)
		{
			"logDiff": 6000,
			"name": "Ostgarath / Poporia",
			"name_RU": "Остгарат / Попория"
		},
		{
			"huntingZoneId": 4,
			"templateId": 1271,
			"logDiff": 6000,
			"name": "[Ostgarath] Eteral (Fyrmount)",
			"name_RU": "[Остгарат] Иторо (Фирмаунт)"
		},
		{
			"huntingZoneId": 9,
			"templateId": 1271,
			"logDiff": 6000,
			"name": "[Ostgarath] Eteral (Ascension Valley, Castanica)",
			"name_RU": "[Остгарат] Иторо (Долина Вознесения, Кастаника)"
		},
		{
			"huntingZoneId": 10,
			"templateId": 1271,
			"logDiff": 6000,
			"name": "[Ostgarath] Eteral (Serpentis Isle)",
			"name_RU": "[Остгарат] Иторо (Остров Серпентис)"
		},
		{
			"huntingZoneId": 11,
			"templateId": 1271,
			"logDiff": 6000,
			"name": "[Ostgarath] Eteral (Jagged Coast, Cutthroat Harbor)",
			"name_RU": "[Остгарат] Иторо (Изрезанный берег, Гавань Головорезов)"
		},
		{
			"huntingZoneId": 12,
			"templateId": 1271,
			"logDiff": 6000,
			"name": "[Ostgarath] Eteral (Mistmoor Island)",
			"name_RU": "[Остгарат] Иторо (Остров Мистмур)"
		},
		{
			"huntingZoneId": 15,
			"templateId": 1271,
			"logDiff": 6000,
			"name": "[Poporia] Foretta (Cliffs of Insanity)",
			"name_RU": "[Попория] Форета (Утесы Безумия)"
		},
		{
			"huntingZoneId": 16,
			"templateId": 1271,
			"logDiff": 6000,
			"name": "[Poporia] Foretta (Vale of the Fang)",
			"name_RU": "[Попория] Форета (Долина Клыка)"
		},
		{
			"huntingZoneId": 17,
			"templateId": 1271,
			"logDiff": 6000,
			"name": "[Poporia] Foretta (Paraanon Ravine, Popolion)",
			"name_RU": "[Попория] Форета (Ущелье Параанон, Пополион)"
		},
		{
			"huntingZoneId": 23,
			"templateId": 1271,
			"logDiff": 6000,
			"name": "[Poporia] Foretta (Lake of Tears, Pora Elinu)",
			"name_RU": "[Попория] Форета (Озеро слез, Пора-Элину)"
		},
		/* ==== South Shara =========================================================================================== */
		// Essenia / Westonia (2:30)
		{
			"logDiff": 9000,
			"name": "Essenia / Westonia",
			"name_RU": "Эссения / Вестония"
		},
		{
			"huntingZoneId": 26,
			"templateId": 1271,
			"logDiff": 9000,
			"name": "[Essenia] Ezart (Blessing Basin, Tralion)",
			"name_RU": "[Эссения] Эсат (Блаженное озеро, Тралион)"
		},
		{
			"huntingZoneId": 27,
			"templateId": 1271,
			"logDiff": 9000,
			"name": "[Essenia] Ezart (Essenian Crest)",
			"name_RU": "[Эссения] Эсат (Эссенийский хребет)"
		},
		{
			"huntingZoneId": 28,
			"templateId": 1271,
			"logDiff": 9000,
			"name": "[Essenia] Ezart (Blightwood)",
			"name_RU": "[Эссения] Эсат (Гибельный лес)"
		},
		{
			"huntingZoneId": 29,
			"templateId": 1271,
			"logDiff": 9000,
			"name": "[Essenia] Ezart (Timeless Woods 1)",
			"name_RU": "[Эссения] Эсат (Извечный лес 1)"
		},
		{
			"huntingZoneId": 29,
			"templateId": 1272,
			"logDiff": 9000,
			"name": "[Essenia] Ezart (Timeless Woods 2)",
			"name_RU": "[Эссения] Эсат (Извечный лес 2)"
		},
		{
			"huntingZoneId": 31,
			"templateId": 1271,
			"logDiff": 9000,
			"name": "[Westonia] Storan (Tempest Reach)",
			"name_RU": "[Вестония] Сторан (Предел Бурь)"
		},
		{
			"huntingZoneId": 32,
			"templateId": 1271,
			"logDiff": 9000,
			"name": "[Westonia] Storan (Mount Tyrannas, Acarum)",
			"name_RU": "[Вестония] Сторан (Гора Тираннас, Акарум)"
		},
		{
			"huntingZoneId": 34,
			"templateId": 1271,
			"logDiff": 9000,
			"name": "[Westonia] Storan (Frost Reach, Bleakrock)",
			"name_RU": "[Вестония] Сторан (Морозный предел, Блеклый камень)"
		},
		// Veritas District / Val Elenium / Val Palrada (3:20)
		{
			"logDiff": 12000,
			"name": "Veritas District / Val Elenium / Val Palrada",
			"name_RU": "Район Веритас / Вал-Элениум / Вал-Палрада"
		},
		{
			"huntingZoneId": 30,
			"templateId": 1271,
			"logDiff": 12000,
			"name": "[Veritas District] Versa (Balder's Refuge, Bastion)",
			"name_RU": "[Район Веритас] Вэлса (Убежище Балдера, Бастион)"
		},
		{
			"huntingZoneId": 35,
			"templateId": 1271,
			"logDiff": 12000,
			"name": "[Val Elenium] Viace (Wyrmgorge, Elenea)",
			"name_RU": "[Вал-Элениум] Виас (Вирмовое ущелье, Эления)"
		},
		{
			"huntingZoneId": 36,
			"templateId": 1271,
			"logDiff": 12000,
			"name": "[Val Elenium] Viace (Tor Exsul)",
			"name_RU": "[Вал-Элениум] Виас (Тор-Эксул)"
		},
		{
			"huntingZoneId": 38,
			"templateId": 1271,
			"logDiff": 12000,
			"name": "[Val Elenium] Viace (Sienna Canyon)",
			"name_RU": "[Вал-Элениум] Виас (Каньон Сиенна)"
		},
		{
			"huntingZoneId": 40,
			"templateId": 1271,
			"logDiff": 12000,
			"name": "[Val Palrada] Vaneva (Quarantine Zone, Frontera)",
			"name_RU": "[Вал-Палрада] Ваннева (Зона карантина, Фронтера)"
		},
		{
			"huntingZoneId": 41,
			"templateId": 1271,
			"logDiff": 12000,
			"name": "[Val Palrada] Vaneva (Feral Valley)",
			"name_RU": "[Вал-Палрада] Ваннева (Свирепая долина)"
		},
		/* ==== North of Shara ======================================================================================== */
		// Sylvanoth / Lorcada (4:10)
		{
			"logDiff": 15000,
			"name": "Sylvanoth / Lorcada",
			"name_RU": "Силванот / Лоркада"
		},
		{
			"huntingZoneId": 51,
			"templateId": 1271,
			"logDiff": 15000,
			"name": "[Lorcada] Loahcun (Vale of Spires)",
			"name_RU": "[Лоркада] Лоакун (Долина пиков)"
		},
		{
			"huntingZoneId": 52,
			"templateId": 1271,
			"logDiff": 15000,
			"name": "[Lorcada] Locarnum (Plain of the Damned, Habere)",
			"name_RU": "[Лоркада] Лоакун (Долина Проклятых, Хабере)"
		},
		{
			"huntingZoneId": 54,
			"templateId": 1271,
			"logDiff": 15000,
			"name": "[Sylvanoth] Silvette (Seeliewood, Scythera Fae)",
			"name_RU": "[Силванот] Силвета (Силивуд, Скитера-Фэй)"
		},
		{
			"huntingZoneId": 55,
			"templateId": 1271,
			"logDiff": 15000,
			"name": "[Sylvanoth] Silvette (Darkquaver Woods, Dragonfall)",
			"name_RU": "[Силванот] Силвета (Дрожащий лес, Дрэгонфолл)"
		},
		{
			"huntingZoneId": 56,
			"templateId": 1271,
			"logDiff": 15000,
			"name": "[Sylvanoth] Silvette (Susurrus Woods)",
			"name_RU": "[Силванот] Силвета (Шепчущие леса)"
		},
		{
			"huntingZoneId": 57,
			"templateId": 1271,
			"logDiff": 15000,
			"name": "[Sylvanoth] Silvette (Amena Quatla)",
			"name_RU": "[Силванот] Силвета (Амена-Кватла)"
		},
		// Helkan District / Val Tirkai / Val Kaeli (5:00)
		{
			"logDiff": 18000,
			"name": "Helkan District / Val Tirkai / Val Kaeli",
			"name_RU": "Район Хелкан / Вал-Тиркай / Вал-Кэли"
		},
		{
			"huntingZoneId": 45,
			"templateId": 1271,
			"logDiff": 18000,
			"name": "[Val Tirkai] Lotica (Thrallhold, Pathfinder Post)",
			"name_RU": "[Вал-Тиркай] Лотика (Питомник аргонов, Аванпост следопытов)"
		},
		{
			"huntingZoneId": 47,
			"templateId": 1271,
			"logDiff": 18000,
			"name": "[Val Tirkai] Lotica (Tirkai Forest)",
			"name_RU": "[Вал-Тиркай] Лотика (Лес Тиркай)"
		},
		{
			"huntingZoneId": 48,
			"templateId": 1271,
			"logDiff": 18000,
			"name": "[Helkan District] Hecurn (Khanovar Front, Zulfikar Fortress)",
			"name_RU": "[Район Хелкан] Хелкун (Хановарские предместья, Зульфикарская крепость)"
		},
		{
			"huntingZoneId": 49,
			"templateId": 1271,
			"logDiff": 18000,
			"name": "[Val Kaeli] Locarnum (Argonea, Kanstria)",
			"name_RU": "[Вал-Кэли] Тезлуар (Аргония, Канстрия)"
		},
		{
			"huntingZoneId": 50,
			"templateId": 1271,
			"logDiff": 18000,
			"name": "[Val Kaeli] Locarnum (Granarkus)",
			"name_RU": "[Вал-Кэли] Тезлуар (Гранаркус)"
		},
		/* ===== North of Arun ======================================================================================= */
		{
			"huntingZoneId": 172,
			"templateId": 1271,
			"name": "[Val Oriyn] Varrek (Savage Reach)",
			"name_RU": "[Вал-Орин] Варэку (Дикарский Предел)"
		},
		{
			"huntingZoneId": 181,
			"templateId": 1271,
			"name": "[Val Oriyn] Varrek (Ex Prima)",
			"name_RU": "[Вал-Орин] Варэку (Экс-Прима)"
		},
		{
			"huntingZoneId": 182,
			"templateId": 1271,
			"name": "[Val Oriyn] Varrek (Spring Valley)",
			"name_RU": "[Вал-Орин] Варэку (Долина Источников)"
		},
		{
			"huntingZoneId": 183,
			"templateId": 1278,
			"name": "[Val Oriyn] Varrek (Highwatch)",
			"name_RU": "[Вал-Орин] Варэку (Верхний Дозор)"
		},
		{
			"huntingZoneId": 191,
			"templateId": 1271,
			"name": "[Val Oriyn] Varrek (Arx Umbra)",
			"name_RU": "[Вал-Орин] Варэку (Аркс-умбра)"
		},
		/* ==== Island of Dawn ======================================================================================== */
		{
			"huntingZoneId": 13,
			"templateId": 1271,
			"name": "Vardung (Island of Dawn)",
			"name_RU": "Бардун (Остров Зари)"
		},
		/* ==== Territory ============================================================================================= */
		{
			"huntingZoneId": 63,
			"templateId": 1278,
			"name": "Petam (around the Velika)",
			"name_RU": "Веракун (окрестности Велики)"
		},
		{
			"huntingZoneId": 72,
			"templateId": 1278,
			"name": "Hemusk (around the Allemantheia)",
			"name_RU": "Аллума (окрестности Аллемантеи)"
		},
		{
			"huntingZoneId": 84,
			"templateId": 1278,
			"name": "Kaylight (around the Kaiator)",
			"name_RU": "Кай Тера (окрестности Кайатора)"
		},
		/* ==== Raid BOSS ============================================================================================ */
		{
			"huntingZoneId": 26,
			"templateId": 5001,
			"logTime": 0,
			"name": "[Essenia] Ortan (Blessing Basin)",
			"name_RU": "[Эссения] Ортан (Блаженное озеро)"
		},
		{
			"huntingZoneId": 39,
			"templateId": 501,
			"logTime": 0,
			"name": "[Val Palrada] Hazard (Quarantine Zone)",
			"name_RU": "[Вал-Палрада] Хазар (Зона карантина)"
		},
		{
			"huntingZoneId": 51,
			"templateId": 4001,
			"logTime": 0,
			"name": "[Lorcada] Cerrus",
			"name_RU": "[Лоркада] Кэлос"
		},
		/* ==== World BOSS =========================================================================================== */
		{
			"huntingZoneId": 10,
			"templateId": 99,
			"logTime": 0,
			"name": "[Serpentis Isle] Divine Reaver",
			"name_RU": "[Остров Серпентис] Божественный грабитель"
		},
		{
			"huntingZoneId": 4,
			"templateId": 5011,
			"logTime": 0,
			"name": "[Fyrmount] Tempest Kanash",
			"name_RU": "[Фирмаунт] Бурный канаш"
		},
		{
			"huntingZoneId": 38,
			"templateId": 35,
			"logTime": 0,
			"name": "[Sienna Canyon] Nyxarras",
			"name_RU": "[Каньон Сиенна] Никсаррас"
		},
		{
			"huntingZoneId": 57,
			"templateId": 33,
			"logTime": 0,
			"name": "[ Amena Quatla] Betsael",
			"name_RU": "[Амена-Кватла] Бетсаэль"
		},
		{
			"huntingZoneId": 51,
			"templateId": 7011,
			"logTime": 0,
			"name": "[Vale of Spires] Linyphi",
			"name_RU": "[Долина пиков] Линифи"
		},
		{
			"huntingZoneId": 52,
			"templateId": 9050,
			"logTime": 0,
			"name": "[Plain of the Damned] Yunaras Snaggletooth",
			"name_RU": "[Долина Проклятых] Юнарас"
		},
		/* ==== Guild BOSS =========================================================================================== */
		{
			"huntingZoneId": 29,
			"templateId": 2001,
			"name": "Anansha (Timeless Woods)",
			"name_RU": "Ананша (Извечный лес)"
		},
		{
			"huntingZoneId": 34,
			"templateId": 2002,
			"name": "Frygaras (Frost Reach)",
			"name_RU": "Фрайгарас (Морозный предел)"
		},
		{
			"huntingZoneId": 34,
			"templateId": 2003,
			"name": "Sabranak (Frost Reach)",
			"name_RU": "Сабранак (Морозный предел)"
		},
		{
			"huntingZoneId": 152,
			"templateId": 2001,
			"name": "Anansha (Велика: Эпоха смуты)",
			"name_RU": "Ананша (Велика: Эпоха смуты)"
		},
		{
			"huntingZoneId": 152,
			"templateId": 2002,
			"name": "Frygaras (Велика: Эпоха смуты)",
			"name_RU": "Фрайгарас (Велика: Эпоха смуты)"
		},
		{
			"huntingZoneId": 152,
			"templateId": 2003,
			"name": "Sabranak (Велика: Эпоха смуты)",
			"name_RU": "Сабранак (Велика: Эпоха смуты)"
		},
		{
			"huntingZoneId": 152,
			"templateId": 7001,
			"name": "Anansha (Велика: Эпоха смуты)",
			"name_RU": "Ананша (Велика: Эпоха смуты)"
		},
		{
			"huntingZoneId": 152,
			"templateId": 7002,
			"name": "Frygaras (Велика: Эпоха смуты)",
			"name_RU": "Фрайгарас (Велика: Эпоха смуты)"
		},
		{
			"huntingZoneId": 152,
			"templateId": 7003,
			"name": "Sabranak (Велика: Эпоха смуты)",
			"name_RU": "Сабранак (Велика: Эпоха смуты)"
		},
		/* ==== Escodor elite mobs ======================================================================================== */
		{
			"huntingZoneId": 2020,
			"templateId": 1100,
			"name": "[Exodor] Supreme Draakon Pursuer",
			"name_RU": "[Эксодор] Элитный высший дракон-преследователь"
		},
		{
			"huntingZoneId": 2020,
			"templateId": 1101,
			"name": "[Exodor] Draakon Guard-Captain",
			"name_RU": "[Эксодор] Элитный высший дракон-советник"
		},
		{
			"huntingZoneId": 2020,
			"templateId": 1102,
			"name": "[Exodor] Supreme Draakon Dominator",
			"name_RU": "[Эксодор] Элитный высший дракон-покоритель"
		},
		{
			"huntingZoneId": 2020,
			"templateId": 1200,
			"name": "[Exodor] Elite Naga Priest",
			"name_RU": "[Эксодор] Элитный наг-жрец"
		},
		{
			"huntingZoneId": 2020,
			"templateId": 1201,
			"name": "[Exodor] Elite Naga Knight",
			"name_RU": "[Эксодор] Элитный наг-рыцарь"
		},
		{
			"huntingZoneId": 2020,
			"templateId": 1202,
			"name": "[Exodor] Elite Naga Executioner",
			"name_RU": "[Эксодор] Элитный наг-пристав"
		},
		{
			"huntingZoneId": 2020,
			"templateId": 1300,
			"name": "[Exodor] Manuk",
			"name_RU": "[Эксодор] Манук"
		},
		{
			"huntingZoneId": 2020,
			"templateId": 1400,
			"name": "[Exodor] Axcellob",
			"name_RU": "[Эксодор] Аксилоп"
		},
		{
			"huntingZoneId": 2020,
			"templateId": 1500,
			"name": "[Exodor] Zemces",
			"name_RU": "[Эксодор] Джемезис"
		},
		{
			"huntingZoneId": 2020,
			"templateId": 1600,
			"name": "[Exodor] Взбешенный красный лишайник",
			"name_RU": "[Эксодор] Взбешенный красный лишайник"
		},
		{
			"huntingZoneId": 2020,
			"templateId": 1601,
			"name": "[Exodor] Thorny Eyestalker",
			"name_RU": "[Эксодор] Циклоп"
		},
		{
			"huntingZoneId": 2020,
			"templateId": 1700,
			"name": "[Exodor] Vekes",
			"name_RU": "[Эксодор] Бэкис" }
	]
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined) {
		// Migrate legacy config file
		return { ...DefaultSettings, ...settings };
	} else if (from_ver === null) {
		// No config file exists, use default settings
		return DefaultSettings;
	} else {
		// Migrate from older version (using the new system) to latest one
		if (from_ver + 1 < to_ver) { // Recursively upgrade in one-version steps
			settings = MigrateSettings(from_ver, from_ver + 1, settings);
			return MigrateSettings(from_ver + 1, to_ver, settings);
		}
		// If we reach this point it's guaranteed that from_ver === to_ver - 1, so we can implement
		// a switch for each version step that upgrades to the next version. This enables us to
		// upgrade from any version to the latest version without additional effort!
		const oldsettings = settings;
		switch (to_ver) {
			default:
				settings = Object.assign(DefaultSettings, {});
				for (const option in oldsettings) {
					if (option == "itemId") continue;
					if (option == "bosses") continue;
					if (settings[option]) {
						settings[option] = oldsettings[option];
					}
				}
				break;
		}
		return settings;
	}
};