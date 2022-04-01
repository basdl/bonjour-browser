# 🧬 bonjour-browser

A modern desktop app for browsing MDNS / Bonjour services based on electron and Svelte.

-   🔨 [Developer Mode](#-developer-mode)
-   -   🏁 [Run Project](#-run-project)
-   -   🚀 [Deploy](#-deploy)
-   👨‍💻 [Contributing](#-contributing)
-   🐛 [Known Bugs](https://github.com/basdl/bonjour-browser/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

## 👔 Screenshot

[![](https://raw.githubusercontent.com/basdl/bonjour-browser/main/.github/assets/screenshot.png)](https://raw.githubusercontent.com/basdl/bonjour-browser/main/.github/assets/screenshot.png)

## 🔨 Developer Mode

#### 🏁 Run Project

1. Clone this repository or download [nightly](https://github.com/basdl/bonjour-browser/archive/nightly.zip), [beta](https://github.com/basdl/bonjour-browser/archive/beta.zip) or [stable](https://github.com/basdl/bonjour-browser/archive/main.zip).
2. Run `npm install`
3. Run `npm run dev`
4. Run `npm run dev:electron`

#### 🚀 Deploy

For create desktop application installer (exe, dmg or appImage) run:

-   Windows: `npm run build-win` or `npm run build-win-32bit` or `npm run build-win-nsis`
-   Linux: `npm run build-lnx`
-   Mac: `npm run build-mac` (Only on Apple machine)

...or try build all with: `npm run release`. Installers are available in `build` folder.

## 💫 License

-   Code and Contributions have **MIT License**
-   Images and logos have **CC BY-NC 4.0 License**
-   Documentations and Translations have **CC BY 4.0 License**

###### Copyleft (c) 2022 Bastian Huber
