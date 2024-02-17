# Browser extension skeleton

Browser extension skeleton with eslint, prettier, webpack, typescript, jest, husky, lint-staged, and more.

## Quick start

Clone the repository from `browser-extension-skeleton` branch and navigate to the project directory.

```bash
git clone https://github.com/codelikes/browser-extension-skeleton.git -b master --single-branch my-extension
cd my-extension
```

Install the required version of Node.js (see `.nvmrc` for the required version)

Install the project dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run watch
```

## Development scripts

| Command                       | Description                                                                                                                                                                                                                                                 |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `npm run clean`               | This script removes the `build` and `release` directories, cleaning up any previous build artifacts.                                                                                                                                                        |
| `npm run build:dev`           | This script cleans the project and then builds it in development mode, enabling features like hot-reloading and source maps.                                                                                                                                |
| `npm run build`               | This script cleans the project and then builds it for production, optimizing the code for performance and size.                                                                                                                                             |
| `npm run watch`               | This script cleans the project, then builds it in development mode and watches the source files for changes, rebuilding as necessary.                                                                                                                       |
| `npm run pack`                | This script packs the extension into a distributable format using a custom script located at `utils/pack.js`.                                                                                                                                               |
| `npm run deploy`              | This script deploys the extension using a custom script located at `utils/deploy.js`.                                                                                                                                                                       |
| `npm run test`                | This script runs all tests in the project using Jest.                                                                                                                                                                                                       |
| `npm run test:watch`          | This script runs tests in watch mode, re-running tests as files change.                                                                                                                                                                                     |
| `npm run test:coverage`       | This script generates a code coverage report, helping you understand how much of your code is covered by tests.                                                                                                                                             |
| `npm run prettier`            | This script formats code using Prettier, ensuring a consistent code style across the project. It ignores unknown file types and formats files in the `src`, `tests` directories and root directory with extensions `html`, `css`, `js`, `ts`, `json`, `md`. |
| `npm run lint`                | This script checks the code for errors with ESLint, helping catch potential issues before they become problems. It checks files in the `src` and `tests` directories with extensions `js`, `ts`.                                                            |
| `npm run lint:fix`            | This script automatically fixes some linting errors that ESLint can handle automatically. It fixes files in the `src` and `tests` directories with extensions `js`, `ts`.                                                                                   |
| `npm run update-dependencies` | This script checks and updates project dependencies, helping keep your project up-to-date using `npm-check-updates`.                                                                                                                                        |

## Project structure

```plaintext
├── package.json
├── src # Source files
│  ├── app
│  │  └── features
│  │      ├── background
│  │      │  └── background.js # Service worker background script
│  │      ├── content
│  │      │  └── content.js # Content script
│  │      └── popup # Popup page
│  │          ├── popup.html # Popup page HTML
│  │          ├── popup.js # Popup page script
│  │          └── popup.scss # Popup page styles
│  ├── assets # Static assets
│  │  └── icons
│  │      ├── icon_128.png
│  │      └── icon_32.png
│  └── manifest.json5 # Extension manifest file (`version` and `description` generated from package.json)
├── tests # Test files
│  ├── $schema.json # JSON schema for manifest file
│  └── manifest.test.js # Example simple test for manifest file
└── utils # Utility scripts for development, deployment and packing
```

> was generated using `./utils/tree.sh`

## Deploy extension

### Prerequisites

#### Environment variables

Copy the [`.env.example`](.env.example) file to `.env` and fill in the required environment variables.

```bash
cp .env.example .env
```

#### Generate Google API keys

Open the [How to generate Google API keys](https://github.com/fregante/chrome-webstore-upload-keys/blob/main/readme.md),
follow the instructions, and save the keys in the `.env` file.

```env
GOOGLE_EXTENSION_ID="jfoisdhoghosopowjnnyugwskwq"
GOOGLE_CLIENT_ID="271346519044-2jo34joih288fshqnmd72.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-JwihoYWhhxkooEhpRnqwWmzjwq"
GOOGLE_REFRESH_TOKEN="1//0aFQ1y-Q4mFPoCgFIARVVVAwSDDD-L2Ir05Ifdsd7225D1_q1oFxx8kAs2QWTarnYONjhdioashia26U"
```

### Build and deploy

- Run `npm run build` to build the extension.
- Run `npm run pack` to pack the extension into a distributable format.
- Run `npm run deploy` to deploy the extension.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
