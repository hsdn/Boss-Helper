# Boss-Helper NG (Mystery Merchant Helper)

Displays information and notifications about spawning of the specified NPCs in the zone (event monster/world boss/guild boss/merchant).
When an NPC spawnins in the visible range, it will be marked with a marker. There are functions of teleport and automatic search for NPCs. Available English and Russian languages (detects automatically).

Отображение информации и уведомлений о появлении указанных NPC в зоне (ивентовый монстр/мировой босс/гильдийный босс/торговец). 
При появлении NPC в видимом диапазоне, он будет отмечен маркером. Имеются функции телепортации и автоматического поиска NPC. Поддерживаются Русский и Английский языки (определяются автоматически).

### Safety

The automatic search function (**scan** command) is easily detectable, therefore, if detected, you can get banned. Use this feature at your own risk!   
Функция автоматического поиска (команда **scan**) является легко детектируемой, следовательно при обнаружении вы можете быть заблокированы. Используйте данную функцию на свой страх и риск!

## Module Commands
Toolbox(/8) | Command Description | Описание команды
--- | --- | ---
**bh** | Enable/disable module (enabled by default). | Включить/выключить модуль (по умолчанию включен).
**bh&nbsp;alert** | Enable/disable on-screen warning messages. | Включить/выключить сообщения предупреждения на экране.
**bh&nbsp;notice** | Enable/disable on-screen notification messages. | Включить/выключить сообщения уведомления на экране.
**bh&nbsp;message** | Enable/disable chat messages. | Включить/выключить сообщения в чате.
**bh&nbsp;party** | Enable/disable send messages to party members. | Включить/выключить отправку сообщений членам группы.
**bh&nbsp;marker** | Enable/disable NPC Markers. | Включить/выключить маркеры NPC.
**bh&nbsp;clear** | Remove marker from NPC. | Удалить маркер с NPC.
**bh&nbsp;teleport** | Enable/disable instant teleport. | Включить/выключить мгновенный телепорт.
**bh&nbsp;hpbar** | Enable/disable BAM-HP-Bar feature. | Включить/выключить отображение HP рейдовых боссов.

### Mystery Merchants
Toolbox(/8) | Command Description | Описание команды
--- | --- | ---
**mm** | Display respawn times of Mystery Merchants. | Отобразить время появления тайных торговцев.
**mm&nbsp;scan** | Search for Mystery Merchants in current zone. | Запустить поиск торговцев в текущей зоне.
**mm&nbsp;stop** | Stop search. | Остановить поиск.
**mm&nbsp;loc** | Display Mystery Merchants locations of current zone. | Отобразить список позиций тайных торговцев для текущей зоны.
**mm&nbsp;to&nbsp;&lt;id&gt;** | Teleport to specified position. | Переместиться в указанную позицию.

* Display respawn times of Mystery Merchants (the **mm** command):   
  ![](https://i.imgur.com/MRSGHDo.png)

### World Bosses
Toolbox(/8) | Command Description | Описание команды
--- | --- | ---
**wb** | Display respawn times of World Bosses. | Отобразить время появления мировых боссов.
**wb&nbsp;scan** | Search for World Bosses in current zone. | Запустить поиск мировых боссов в текущей зоне.
**wb&nbsp;stop** | Stop search. | Остановить поиск.
**wb&nbsp;loc** | Display World Bosses locations of current zone. | Отобразить список позиций мировых боссов для текущей зоны.
**wb&nbsp;to&nbsp;&lt;id&gt;** | Teleport to specified position. | Переместиться в указанную позицию.

* Display respawn times of World Bosses (the **wb** command):   
  ![](https://i.imgur.com/RPXfTFV.png)

### Raid Bosses
Toolbox(/8) | Command Description | Описание команды
--- | --- | ---
**rb** | Display respawn times of Raid Bosses. | Отобразить время появления рейдовых боссов.

* Display respawn times of Raid Bosses (the **rb** command):   
  ![](https://i.imgur.com/A6kpUCK.png)

## More Information

* The module has built-in functionality of Lambda11's BAM-HP-Bar module (with **fixed Ortan**):   
  ![](https://i.imgur.com/kLNyQJL.png)
* Merchant NPC with marker (easily visible in the distance):   
  ![](https://i.imgur.com/tdIJKJv.png)
* All NPC identifiers: https://github.com/neowutran/TeraDpsMeterData/tree/master/monsters
* Merchant spawn locations: https://home.gamer.com.tw/creationCategory.php?owner=d0305011&c=444485

## Credits
- **[ZC](https://github.com/tera-mod)** - Original developer of the Boss-Helper module
- **[Owyn](https://github.com/Owyn)** - Author of the field-boss_time module
- **[Lambda11](https://github.com/Lambda11)** - Author of the bam-hp-bar module
