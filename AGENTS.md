# AGENTS.md

Storybook-аддон переключения тем (`sb-theme-switcher`). Публикуется в npm. Основной потребитель — дизайн-система NLMK [ds-2.0](https://github.com/nlmk-group/ds-2.0) (локально: `../ds-2.0`, ветка интеграции `new-lib-connect`).

## Команды

```bash
yarn build        # tsup + scripts/patch-manager-sb8.mjs (правит импорты SB8-бандла)
yarn typecheck    # tsc --noEmit
yarn example      # собрать либу и поднять examples/storybook-10
yarn example:sb9  # то же для examples/storybook-9
yarn example:sb8  # то же для examples/storybook-8
npm pack          # тарбол для локальной проверки в ds-2.0
yarn packing      # npm publish (только по просьбе владельца)
```

`yarn lint` сломан: ESLint 9 не читает старый `.eslintrc.json` (нужна миграция на flat config). Не чините мимоходом — это отдельная задача.

## Архитектура: три контекста исполнения

Код работает в трёх изолированных средах — главный источник багов в прошлом:

| Entry (`src/`)      | Где выполняется                  | Что делает |
|---------------------|----------------------------------|------------|
| `preset.ts`         | Node, при старте Storybook       | Доставляет опции из `main.js` в браузер |
| `manager/index.tsx` | Браузер, окно менеджера          | Кнопка в тулбаре, перекраска UI менеджера |
| `preview/index.ts`  | Браузер, preview-iframe          | `data-theme` на `<html>`, восстановление темы |

Ключевые правила:

- **Совместимость по версиям Storybook**: 8/9/10 поддерживаются, 7 — нет. Билдер менеджера алиасит имена модулей на глобалы: SB 9/10 — `storybook/manager-api`, SB 8 — только `storybook/internal/manager-api`. Поэтому собираются два бандла (`manager` и `manager-sb8`, см. `scripts/patch-manager-sb8.mjs`), а preset в `managerEntries` выбирает нужный по `require('storybook/package.json').version`. Экспорта `./manager` в package.json нет намеренно — иначе SB 9/10 зарегистрируют энтри второй раз.
- **Техосмотр нового мажора Storybook** (например, 11): поставить `storybook@X` во временную папку и посмотреть алиасы менеджер-билдера — `grep -o '"storybook/[a-z/-]*"' node_modules/storybook/dist/manager/globals.js | sort -u` (путь может отличаться, искать файл `globals.js` под `manager`). Если имена изменились — новый бандл + ветка в preset. Затем создать `examples/storybook-X` по образцу существующих и проверить по чек-листу ниже, отдельно убедиться, что при переключении красится сайдбар (ломался в 10.4).
- **Доставка опций** — только через preset-хуки `managerHead`/`previewHead`: они сериализуют опции в `<script>window.__SB_THEME_SWITCHER_OPTIONS__ = ...</script>` для обоих контекстов. Писать в `global` из preset бесполезно — Node-глобалы не попадают в браузер (баг 0.1.x).
- **Рантайм-смена темы менеджера — только через `api.setOptions({ theme })`** (useStorybookApi в tool-компоненте). Один `addons.setConfig({ theme })` перестал перекрашивать сайдбар в SB 10.4+ — ловушка в том, что на SB 10.1 он ещё работает, поэтому регрессию видно только на свежих версиях (баг 0.2.0, исправлен в 0.2.1). setConfig оставлен для начальной темы до буста менеджера.
- **Опции обязаны быть JSON-сериализуемыми** — React-компоненты в `icon` отбрасываются при сериализации (в `main.js` допустимы только SVG-строки; компоненты — только через ручной script в manager-head.html).
- **Никаких runtime `require()` в браузерном коде** — в ESM-сборке под Vite это ReferenceError. Только статические импорты; новые внешние пакеты добавлять в `external` в `tsup.config.ts` (иначе вбандлится копия storybook-рантайма и аддон сломается).
- **Не добавлять `managerEntries`/`config` в preset** — Storybook 7+ сам подхватывает `./manager` и `./preview` из `exports` package.json; дублирование даёт двойную загрузку manager-энтри.
- Чтение window-опций — через `src/options.ts` (`getWindowOptions`/`getStorageKey`), не дублировать.

## Контракт с потребителями

- localStorage: `<storageKey>` = id темы, `<storageKey>-class` = css-класс. Менять формат — breaking change (ds-2.0 использует ключ `nlmk-storybook-theme`, конвенцию `'dark'`/`'light'` id ждут и демо-story).
- `data-theme` на `documentElement` обоих документов — на него завязаны CSS потребителей и `useTheme()`.
- Синхронизация manager → preview: прямая установка атрибута + `postMessage` (`sb-theme-switcher:theme-change`) + событие `storage` для других вкладок.

## Проверка изменений

1. `yarn build && yarn typecheck`.
2. Интеграционно на ds-2.0: `npm pack`, в `../ds-2.0/package.json` указать `"sb-theme-switcher": "file:../storybook-theme-switcher/sb-theme-switcher-<ver>.tgz"`, `yarn install`.
3. **Не запускать `yarn storybook` в ds-2.0** — его prebuild гоняет весь jest-suite и съедает десятки ГБ RAM. Если `.jest-test-results.json` уже есть, поднимать так:
   `NODE_OPTIONS='--max-old-space-size=4096' npx storybook dev -p 6006 --no-open`
4. Что проверять в браузере: кнопка `[title*="тему"]` в тулбаре; после клика `data-theme` меняется на `<html>` менеджера и iframe; ключи в localStorage; тема переживает перезагрузку и открытие `iframe.html` напрямую; docs-страница перекрашивается; консоль без ошибок.
5. Остановить dev-сервер после проверки.

## Демо-гифки

`docs/demo-story.gif` и `docs/demo-docs.gif` вставлены в README. Записаны с `examples/storybook-10` через Playwright: настоящий курсор в скриншоты не попадает, поэтому поверх UI инжектится SVG-стрелка, движение интерполируется по кадрам, клики настоящие (`page.mouse.click`), кадры собираются в GIF пакетом `gifenc` с покадровыми задержками. При изменении UI аддона гифки нужно перезаписать тем же способом.

## Релиз

Бампнуть `version`, дополнить `CHANGELOG.md`, `yarn packing` (или `yarn packing:beta`). После публикации вернуть в ds-2.0 обычную npm-версию вместо `file:`-тарбола.
