<div align="center">
  <img src="./public/cloud.gif" alt="TGS Player Logo" width="250" style="border-radius: 20%">
  
  # 🎭 TGS Player Web Component
  
  ![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
  ![WebAssembly](https://img.shields.io/badge/WebAssembly-654FF0?style=for-the-badge&logo=webassembly&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![Web Components](https://img.shields.io/badge/Web_Components-29ABE2?style=for-the-badge&logo=webcomponents.org&logoColor=white)
</div>

<div align="center">
  <h3>🚀 Легковесный веб-компонент для воспроизведения Telegram стикеров</h3>
</div>

> not an official telegram project

## 🎯 Основные возможности

<div align="center">
<table>
<tr>
<td width="50%">

**⚡ Молниеносная скорость**  
WebAssembly + ~30KB модуль  
`████████████ 100%`

</td>
<td width="50%">

**🎯 Нулевые зависимости**  
Автономная работа  
`████████████ Standalone`

</td>
</tr>
<tr>
<td width="50%">

**🔧 Простое API**  
HTML-атрибуты  
`████████████ Easy`

</td>
<td width="50%">

**🌐 Кроссплатформенность**  
Все браузеры  
`████████████ Universal`

</td>
</tr>
</table>
</div>

## 📋 Описание

TGS Player - это современный веб-компонент для воспроизведения анимированных стикеров Telegram (формат .tgs) прямо в браузере. Использует WebAssembly для максимальной производительности и минимального потребления ресурсов

## 🛠 Функциональность

- 🎬 Воспроизведение TGS (Lottie) анимаций
- ⚡ Аппаратное ускорение через WebAssembly
- 🎮 Настраиваемые элементы управления
- 🔄 Автоматическое воспроизведение
- 👆 Воспроизведение по наведению
- 🔂 Однократное воспроизведение
- 💾 Эффективное кэширование
- 🌐 Поддержка всех современных браузеров

## 📥 Установка

1. Добавьте папку `/js` в корень вашего проекта
2. Скопируйте компонент `TgsSticker.svelte` в папку `src/lib/components/`
3. Подключите компонент в HTML:

```html
<script src="/js/tgs-player.js"></script>
```

## 💻 Использование

### Импорт компонента:
```javascript
import TgsSticker from '$lib/components/TgsSticker.svelte';
```

### Базовое использование:
```svelte
<TgsSticker src="/stickers/animation.tgs" />
```

### Воспроизведение при наведении:
```svelte
<TgsSticker 
    src="/stickers/animation.tgs" 
    autoplay={false}
    playOnHover={true}
/>
```

### Ленивая загрузка с настройками:
```svelte
<TgsSticker 
    src="/stickers/animation.tgs"
    autoplay={false}
    once={false}
    playOnHover={true}
    width="100%"
    height="100%"
    quality={2}
    lazy={true}
/>
```

### Полная конфигурация:
```svelte
<TgsSticker 
    src="/path/to/sticker.tgs"
    autoplay={true}
    once={true}
    playOnHover={false}
    width="64px"
    height="64px"
    quality={2}
    lazy={false}
/>
```

## 📊 Свойства компонента

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `src` | `string` | - | Путь к .tgs файлу ✅ |
| `autoplay` | `boolean` | `true` | Автоматический запуск анимации |
| `once` | `boolean` | `false` | Воспроизвести только один раз |
| `playOnHover` | `boolean` | `false` | Воспроизведение при наведении |
| `width` | `string` | `"64px"` | Ширина компонента |
| `height` | `string` | `"64px"` | Высота компонента |
| `quality` | `number` | `2` | Качество рендеринга (1-3) |
| `lazy` | `boolean` | `false` | Ленивая загрузка при появлении в viewport |

## 🌐 Поддержка браузеров

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" width="48" alt="Chrome"><br>
        <b>Chrome</b><br>
        <sub>v57+</sub>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" width="48" alt="Firefox"><br>
        <b>Firefox</b><br>
        <sub>v52+</sub>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" width="48" alt="Safari"><br>
        <b>Safari</b><br>
        <sub>v11+</sub>
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" width="48" alt="Edge"><br>
        <b>Edge</b><br>
        <sub>v79+</sub>
      </td>
    </tr>
  </table>
</div>

## ⚡ Производительность

- 🚀 Минимальное использование CPU благодаря WebAssembly
- 💾 Небольшой объем памяти
- 🎯 Аппаратное ускорение при наличии
- 🔄 Эффективная система кэширования анимаций

## 📚 Источник кода

За основу проекта были взяты следующие репозитории:

- [**tgs-player**](https://github.com/Negat1v9/tgs-player) - базовый веб-компонент для воспроизведения TGS файлов
- [**durgerKing**](https://t.me/DurgerKingBot) - демо мини-приложение от команды Telegram для демонстрации возможностей TMA

---

<div align="center">
  <h3>✨ Спасибо за интерес к нашему проекту! ✨</h3>
</div>

<div align="center">
  <p>Если вам понравился проект, не забудьте поставить ⭐ звезду на GitHub!</p>
  
  <a href="https://github.com/ysturasp/tgs_emoji_player">
    <img src="https://img.shields.io/github/stars/ysturasp/tgs_emoji_player?style=social" alt="GitHub Stars">
  </a>
</div>

<div align="center">
  <sub>Made with ❤️ by ystuRASP © 2024</sub>
</div>
