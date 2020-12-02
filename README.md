# Boss-Helper (Mystery Merchant Helper)

Displays information and notifications about spawning of the specified NPCs in the zone (event monster/world boss/guild boss/merchant).
When an NPC spawnins in the visible range, it will be marked with a marker. Available English and Russian languages (detects automatically).

Отображение информации и уведомлений о появлении указанных NPC в зоне (ивентовый монстр/мировой босс/гильдейный босс/торговец). 
При появлении NPC в видимом диапазоне, он будет отмечен маркером. Поддерживаются Русский и Английский языки (определяются автоматически).

## Commands / Команды
/8 | Command Description | Описание команды
--- | --- | ---
**boss** | Enable/disable module (enabled by default). | Включить/выключить модуль (по умолчанию включен).
**boss&nbsp;warn** | Enable/disable on-screen warning messages. | Включить/выключить сообщения предупреждения на экране.
**boss&nbsp;notice** | Enable/disable on-screen notification messages. | Включить/выключить сообщения уведомления на экране.
**boss&nbsp;message** | Enable/disable chat messages. | Включить/выключить сообщения в чате.
**boss&nbsp;party** | Enable/disable send messages to party members. | Включить/выключить отправку сообщений членам группы.
**boss&nbsp;mark** | Enable/disable NPC Markers. | Включить/выключить маркеры NPC.
**boss&nbsp;clear** | Remove marker from NPC. | Удалить маркер с NPC.
**boss&nbsp;ask** | Display the spawn times of world bosses and mystery merchants. | Отобразить время появления мировых боссов и тайных торговцев.

## More information / Дополнительная информация

* The module has built-in functionality of https://github.com/Lambda11/bam-hp-bar
* Displays the spawn times of world bosses and mystery merchants (the **boss ask** command):   
  ![](https://i.imgur.com/DgfxH5X.png)
* Merchant NPC with marker (easily visible in the distance):   
  ![](https://i.imgur.com/tdIJKJv.png)
* All NPC identifiers: https://raw.githubusercontent.com/neowutran/TeraDpsMeterData/master/monsters/monsters-EU-EN.xml
* Merchant spawn locations: https://home.gamer.com.tw/creationCategory.php?owner=d0305011&c=444485

## Credits
- **[ZC](https://github.com/tera-mod)** - Original developer of the Boss-Helper module
- **[Owyn](https://github.com/Owyn)** - Author of the field-boss_time module
- **[Lambda11](https://github.com/Lambda11)** - Author of the bam-hp-bar module
