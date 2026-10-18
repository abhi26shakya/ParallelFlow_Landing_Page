# Font Files

## 1. Dirty Weather
Place your **Dirty Weather** font files in this folder to serve as web fonts:
- `DirtyWeather.woff2`
- `DirtyWeather.ttf`
- `DirtyWeather.otf`

## 2. Lenia Mono
Place any **Lenia Mono** files here if needed:
- `LeniaMono-Regular.woff2` (or `.ttf` / `.otf`)

The CSS in `src/index.css` is configured to look for:
1. System-installed font via `local('Dirty Weather')`
2. Web font files in `/fonts/DirtyWeather.*`
3. System UI fallbacks
