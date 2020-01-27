const DefaultSettings = {
    "enabled":  true,
    "alerted":  true,
    "notice":   true,
    "messager": true,
    "marker":   true,
    "itemId":  98260,
    "bosses": [
/* ==== Event =============================================================================================== */
        {huntingZoneId: 1023, templateId:     3000, name: "(Ивент) Тень Дуриона"},
        {huntingZoneId: 1023, templateId: 20150805, name: "(Ивент) Тень Дуриона"},
        {huntingZoneId: 1023, templateId: 88888888, name: "(Ивент) Сундук с сокровищами"},
        {huntingZoneId: 1023, templateId: 88888889, name: "(Ивент) Сундук с сокровищами"},
        {huntingZoneId: 1023, templateId:   160341, name: "(Ивент) Дед Мороз"},
        {huntingZoneId: 1023, templateId: 99999997, name: "(Ивент) Толстый Санта"},
        {huntingZoneId: 1023, templateId:   200002, name: "(Ивент) Санта-король"},
        {huntingZoneId: 1023, templateId:   200003, name: "(Ивент) Крошечный Санта"},
        {huntingZoneId: 1023, templateId:     8000, name: "(Ивент) Кайман-бродяга"},
        {huntingZoneId:   26, templateId:     6001, name: "(Ивент) Кайман-бродяга"},
        {huntingZoneId:   27, templateId:     6001, name: "(Ивент) Кайман-бродяга"},
        {huntingZoneId:   29, templateId:     6002, name: "(Ивент) Кайман-бродяга"},
        {huntingZoneId:   30, templateId:     6001, name: "(Ивент) Кайман-бродяга"},
        {huntingZoneId:   38, templateId:     6001, name: "(Ивент) Кайман-бродяга"},
        {huntingZoneId:  181, templateId:     6001, name: "(Ивент) Кайман-бродяга"},
/* ==== South Arun ========================================================================================== */
        {huntingZoneId:   2, templateId: 1271, name: "[Аркадия] Аркун (Дивный лес, Деревня лесорубов)"},
        {huntingZoneId:   3, templateId: 1271, name: "[Аркадия] Аркун (Леса Забвения, Кресцентия)"},
        {huntingZoneId:   5, templateId: 1271, name: "[Аркадия] Аркун (Трясина Туванги)"},
        {huntingZoneId:   6, templateId: 1271, name: "[Аркадия] Аркун (Долина титанов)"},
        {huntingZoneId:   7, templateId: 1271, name: "[Аркадия] Аркун (Небесные холмы)"},
        {huntingZoneId:   4, templateId: 1271, name: "[Остгарат] Иторо (Фирмаунт)"},
        {huntingZoneId:   9, templateId: 1271, name: "[Остгарат] Иторо (Лабиринт Азарела)"},
        {huntingZoneId:  10, templateId: 1271, name: "[Остгарат] Иторо (Остров Серпентис)"},
        {huntingZoneId:  11, templateId: 1271, name: "[Остгарат] Иторо (Грот пиратов, Гавань Головорезов)"},
        {huntingZoneId:  12, templateId: 1271, name: "[Остгарат] Иторо (Остров Мистмур)"},
        {huntingZoneId:  15, templateId: 1271, name: "[Попория] Форета (Утесы Безумия)"},
        {huntingZoneId:  16, templateId: 1271, name: "[Попория] Форета (Долина Клыка, Пополион)"},
        {huntingZoneId:  17, templateId: 1271, name: "[Попория] Форета (Ущелье Параанон)"},
        {huntingZoneId:  23, templateId: 1271, name: "[Попория] Форета (Озеро слез, Пора-Элину)"},
        {huntingZoneId:  18, templateId: 1271, name: "[Вал-Аурэум] Виадун (Исполинские развалины)"},
        {huntingZoneId:  19, templateId: 1271, name: "[Вал-Аурэум] Виадун (Вольноземье)"},
        {huntingZoneId:  21, templateId: 1271, name: "[Вал-Аурэум] Виадун (Утес Василисков, Чебика)"},
        {huntingZoneId:  24, templateId: 1271, name: "[Вал-Аурэум] Виадун (Аурумская дорога, Тулуфан)"},
/* ==== South Shara =========================================================================================== */
        {huntingZoneId:  26, templateId: 1271, name: "[Эссения] Эсат (Блаженное озеро, Тралион)"},
        {huntingZoneId:  27, templateId: 1271, name: "[Эссения] Эсат (Эссенийский хребет)"},
        {huntingZoneId:  28, templateId: 1271, name: "[Эссения] Эсат (Гибельный лес)"},
        {huntingZoneId:  29, templateId: 1271, name: "[Эссения] Эсат (Извечный лес 1)"},
        {huntingZoneId:  29, templateId: 1272, name: "[Эссения] Эсат (Извечный лес 2)"},
        {huntingZoneId:  30, templateId: 1271, name: "[Район Веритас] Вэлса (Убежище Балдера, Бастион)"},
        {huntingZoneId:  31, templateId: 1271, name: "[Вестония] Сторан (Предел Бурь)"},
        {huntingZoneId:  32, templateId: 1271, name: "[Вестония] Сторан (Гора Тираннас, Акарум)"},
        {huntingZoneId:  34, templateId: 1271, name: "[Вестония] Сторан (Морозный предел, Блеклый камень)"},
        {huntingZoneId:  35, templateId: 1271, name: "[Вал-Элениум] Виас (Вирмовое ущелье)"},
        {huntingZoneId:  36, templateId: 1271, name: "[Вал-Элениум] Виас (Тор-Эксул, Эления)"},
        {huntingZoneId:  38, templateId: 1271, name: "[Вал-Элениум] Виас (Каньон Сиенна)"},
        {huntingZoneId:  40, templateId: 1271, name: "[Вал-Палрада] Ваннева (Зона карантина)"},
        {huntingZoneId:  41, templateId: 1271, name: "[Вал-Палрада] Ваннева (Свирепая долина)"},
/* ==== North of Shara ======================================================================================== */
        {huntingZoneId:  45, templateId: 1271, name: "[Вал-Тиркай] Лотика (Питомник аргонов, Аванпост следопытов)"},
        {huntingZoneId:  47, templateId: 1271, name: "[Вал-Тиркай] Лотика (Лес Тиркай)"},
        {huntingZoneId:  48, templateId: 1271, name: "[Район Хелкан] Хелкун (Хановарские предместья, Зульфикарская крепость)"},
        {huntingZoneId:  49, templateId: 1271, name: "[Вал-Кэли] Лоакун (Аргония, Канстрия)"},
        {huntingZoneId:  50, templateId: 1271, name: "[Вал-Кэли] Лоакун (Гранаркус)"},
        {huntingZoneId:  51, templateId: 1271, name: "[Лоркада] Лоакун (Долина пиков)"},
        {huntingZoneId:  52, templateId: 1271, name: "[Лоркада] Лоакун (Долина Проклятых, Хабере)"},
        {huntingZoneId:  54, templateId: 1271, name: "[Силванот] Силвета (Силивуд, Скитера-Фэй)"},
        {huntingZoneId:  55, templateId: 1271, name: "[Силванот] Силвета (Дрожащий лес, Дрэгонфолл)"},
        {huntingZoneId:  56, templateId: 1271, name: "[Силванот] Силвета (Шепчущие леса)"},
        {huntingZoneId:  57, templateId: 1271, name: "[Силванот] Силвета (Амена-Кватла)"},
/* ===== North of Arun ======================================================================================= */
        {huntingZoneId: 172, templateId: 1271, name: "[Вал-Орин] Варэку (Дикарский Предел)"},
        {huntingZoneId: 181, templateId: 1271, name: "[Вал-Орин] Варэку (Экс-Прима)"},
        {huntingZoneId: 182, templateId: 1271, name: "[Вал-Орин] Варэку (Долина Источников)"},
        {huntingZoneId: 183, templateId: 1278, name: "[Вал-Орин] Варэку (Верхний Дозор)"},
        {huntingZoneId: 191, templateId: 1271, name: "[Вал-Орин] Варэку (Аркс-умбра)"},
/* ==== Island of Dawn ======================================================================================== */
        {huntingZoneId:  13, templateId: 1271, name: "[Остров Зари] Бардун (Остров Зари)"},
/* ==== Territory ============================================================================================= */
        {huntingZoneId:  63, templateId: 1278, name: "Веракун (окрестности Велики)"},
        {huntingZoneId:  72, templateId: 1278, name: "Аллума (окрестности Аллемантеи)"},
        {huntingZoneId:  84, templateId: 1278, name: "Кай Тера (окрестности Кайатора)"},
/* ==== Secret store ========================================================================================== */
        {huntingZoneId:  63, templateId: 1271, name: "Тайный Магазин (Велика 1)"},
        {huntingZoneId:  63, templateId: 1279, name: "Тайный Магазин (Велика 2)"},
        {huntingZoneId:  72, templateId: 1271, name: "Тайный Магазин (Аллемантея)"},
        {huntingZoneId:  84, templateId: 1271, name: "Тайный Магазин (Кайатор)"},
        {huntingZoneId: 183, templateId: 1271, name: "Тайный Магазин (Верхний Дозор)"},
/* ==== Goblin Starc ========================================================================================== */
        {huntingZoneId:  63, templateId: 1276, logTime: 0, name: "1-й Гоблин, ответственнвый за доставку (Велика)"},
        {huntingZoneId:  63, templateId: 1284,             name: "1-й Гоблин, ответственнвый за доставку (Велика)"},
        {huntingZoneId:  84, templateId: 1276, logTime: 0, name: "2-ой Гоблин, ответственнвый за доставку (Кайатор)"},
        {huntingZoneId:  72, templateId: 1276, logTime: 0, name: "3-й Гоблин, ответственнвый за доставку (Аллемантея)"},
        {huntingZoneId: 183, templateId: 1276, logTime: 0, name: "4-й Гоблин, ответственнвый за доставку (Верхний Дозор)"},
/* ==== Raid BOSS ============================================================================================ */
        {huntingZoneId:  26, templateId: 5001, logTime: 0, name: "[Блаженное озеро] Ортан"},
        {huntingZoneId:  39, templateId:  501, logTime: 0, name: "[Зона карантина] Хазар"},
        {huntingZoneId:  51, templateId: 4001, logTime: 0, name: "[Долина пиков] Кэлос"},
/* ==== World BOSS =========================================================================================== */
        {huntingZoneId: 10,   templateId: 99,   name: "[Остров Серпентис] Божественный грабитель"},
        {huntingZoneId: 4,    templateId: 5011, name: "[Фирмаунт] Бурный канаш"},
        {huntingZoneId: 38,   templateId: 35,   name: "[Каньон Сиенна] Никсаррас"},
        {huntingZoneId: 57,   templateId: 33,   name: "[Амена-Кватла] Бетсаэль"},
        {huntingZoneId: 51,   templateId: 7011, name: "[Долина пиков] Линифи"},
        {huntingZoneId: 52,   templateId: 9050, name: "[Долина Проклятых] Юнарас"},
/* ==== Escodor elite mobs ======================================================================================== */
        {huntingZoneId: 2020, templateId: 1100, name: "[Эксодор] Элитный высший дракон-преследователь"},
        {huntingZoneId: 2020, templateId: 1101, name: "[Эксодор] Элитный высший дракон-советник"},
        {huntingZoneId: 2020, templateId: 1102, name: "[Эксодор] Элитный высший дракон-покоритель"},
        {huntingZoneId: 2020, templateId: 1200, name: "[Эксодор] Элитный наг-жрец"},
        {huntingZoneId: 2020, templateId: 1201, name: "[Эксодор] Элитный наг-рыцарь"},
        {huntingZoneId: 2020, templateId: 1202, name: "[Эксодор] Элитный наг-пристав"},
        {huntingZoneId: 2020, templateId: 1300, name: "[Эксодор] Манук"},
        {huntingZoneId: 2020, templateId: 1400, name: "[Эксодор] Аксилоп"},
        {huntingZoneId: 2020, templateId: 1500, name: "[Эксодор] Джемезис"},
        {huntingZoneId: 2020, templateId: 1600, name: "[Эксодор] Взбешенный красный лишайник"},
        {huntingZoneId: 2020, templateId: 1601, name: "[Эксодор] Циклоп"},
        {huntingZoneId: 2020, templateId: 1700, name: "[Эксодор] Бэкис"}
    ]
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
    if (from_ver === undefined) {
        // Migrate legacy config file
        return Object.assign(Object.assign({}, DefaultSettings), settings);
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
        switch (to_ver) {
            default:
                let oldsettings = settings
                settings = Object.assign(DefaultSettings, {});
                for (let option in oldsettings) {
                    if (option == "bosses") continue
                    if (settings[option]) {
                        settings[option] = oldsettings[option]
                    }
                }
                break;
        }
        return settings;
    }
}