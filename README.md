<h1 align="center">Packages Update</h1>
<p align="center">📦 A <b>flexible</b> and <b>lightweight</b/> updater for packages

## Why

Allows you to update, customize according to your needs and easily automate mono repositories.

> I plan to expand this project into an **GitHub Actions** project in the future. You can see a prototype [here](https://github.com/wellwelwel/poku/blob/main/.github/workflows/bot_deps-update.yml).

### Some features

- [x] **CLI** and **API** _(**in-code**)_ usage
- [x] Custom rules per dependency
- [x] Global and custom rules per dependency for mono repositories
- [x] Filter and exclude dependencies
- [x] Zero configurations _(unless you want to)_
- [x] Custom `package.json` and configuration files
- [x] Dynamic update according to version operator prefixer per dependency

> And much more.

---

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [CLI](#cli)
  - [API (in-code)](#api-in-code)
  - [Aliases](#aliases)
  - [Configs](#configs)
    - [packageFile](#packagefile)
    - [followPrefix](#followprefix)
    - [filter](#filter)
    - [exclude](#exclude)
    - [peer](#peer)
    - [indentation](#indentation)
    - [registry](#registry)
    - [quiet](#quiet)
    - [checkOnly](#checkonly)
    - [configFile](#configfile)
    - [overrides](#overrides)
- [Examples](#examples)
  - [Update to latest version](#update-to-latest-version)
  - [Update to latest minor version](#update-to-latest-minor-version)
  - [Update to latest patch version](#update-to-latest-patch-version)
  - [Update to greatest version](#update-to-greatest-version)
- [Limitations](#limitations)
- [Acknowledgements](#acknowledgements)

---

## Install

[![Install Size](https://packagephobia.com/badge?p=packages-update)](https://packagephobia.com/result?p=packages-update)

```sh
npm i -D packages-update
```

---

## Usage

### CLI

```sh
npx pu
```

> You can use `latest`, `minor`, `patch` or `major` as the last **CLI** parameter.

### API _(in-code)_

```ts
import { pu } from 'packages-update';

await pu();
```

You can also use all [available options](#configs):

```ts
await pu({
  target: 'latest',
});
```

---

### Aliases

```sh
npx pu
```

```sh
npx packages-update
```

---

### Configs

You can customize the global settings by creating a `.purc.json` config file.

- **CLI** and **API** _(**in-code**)_ options will overwrite the global options.

| Option       | CLI             | Description                                                              | Default Value          |
| ------------ | --------------- | ------------------------------------------------------------------------ | ---------------------- |
| packageFile  | --package-file  | _Relative path to package.json file_                                     | `"./package.json"`     |
| followPrefix | --follow-prefix | _Update dependencies respecting version prefixes_                        | `false`                |
| target       | --target        | _Type of update strategy (e.g., `latest`, `major`, `minor` and `patch`)_ | `"latest"`             |
| filter       | --filter        | _Filter the specified dependencies to include in the update_             | `[]`                   |
| exclude      | --exclude       | _Exclude the specified dependencies to exclude from the update_          | `[]`                   |
| peer         | --peer          | _Update peer dependencies_                                               | `false`                |
| indentation  | --indentation   | _JSON indentation level_                                                 | `2`                    |
| registry     | --registry      | _Specify the registry URL_                                               | `"registry.npmjs.org"` |
| quiet        | --quiet         | _Suppress output messages_                                               | `false`                |
| checkOnly    | --check-only    | _Perform checks without applying updates_                                | `false`                |
| configFile   | --config-file   | _Custom config path_                                                     | `"./.purc.json"`       |
| overrides    |                 | _Override update strategy for specific packages_                         |                        |

---

#### packageFile

##### CLI

```sh
npx pu --package-file="./custom/package.json"
```

##### `.purc.json` and API _(in-code)_

```json
{
  "packageFile": "./custom/package.json"
}
```

---

#### followPrefix

##### CLI

```sh
npx pu --follow-prefix
```

##### `.purc.json` and API _(in-code)_

```json
{
  "followPrefix": true
}
```

---

#### filter

##### CLI

```sh
npx pu --filter=react,vue
```

##### `.purc.json` and API _(in-code)_

```json
{
  "filter": ["react", "vue"]
}
```

---

#### exclude

##### CLI

```sh
npx pu --exclude=react,vue
```

##### `.purc.json` and API _(in-code)_

```json
{
  "exclude": ["react", "vue"]
}
```

---

#### peer

##### CLI

```sh
npx pu --peer
```

##### `.purc.json` and API _(in-code)_

```json
{
  "peer": true
}
```

---

#### indentation

##### CLI

```sh
npx pu --indentation=4
```

##### `.purc.json` and API _(in-code)_

```json
{
  "indentation": 4
}
```

---

#### registry

> `https` only.

##### CLI

```sh
npx pu --registry="registry.custom.org"
```

##### `.purc.json` and API _(in-code)_

```json
{
  "registry": "registry.custom.org"
}
```

---

#### quiet

##### CLI

```sh
npx pu --quiet
```

##### `.purc.json` and API _(in-code)_

```json
{
  "quiet": true
}
```

---

#### checkOnly

##### CLI

```sh
npx pu --check-only
```

##### `.purc.json` and API _(in-code)_

```json
{
  "checkOnly": true
}
```

---

#### configFile

> Not available in the configuration file itself.

##### CLI

```sh
npx pu --config-file=./custom/.purc.json
```

##### API _(in-code)_

```ts
await pu({
  configFile: './custom/.purc.json';
})
```

---

#### overrides

> Not available for **CLI**.

##### `.purc.json` and API _(in-code)_

```json
{
  "overrides": {
    "eslint": {
      "target": "minor"
    },
    "custom-package": {
      "registry": "custom.registry.org"
    }
  }
}
```

---

## Examples

### Update to latest version

Get the default latest version for each package.

```sh
npx pu
npx pu latest
npx pu --target=latest  # alt.
```

> ```sh
> # prettier: ^1.4.2 ➜ ^2.8.1
> # ...
> ```

---

### Update to latest minor version

Get the latest minor version for each package.

```sh
npx pu minor
npx pu --target=minor  # alt.
```

> ```sh
> # prettier: ^1.4.2 ➜ ^1.19.1
> # ...
> ```

---

### Update to latest patch version

Get the latest patch version for each package.

```sh
npx pu patch
npx pu --target=patch  # alt.
```

> ```sh
> # prettier: ^1.4.2 ➜ ^1.4.4
> # ...
> ```

---

### Update to greatest version

Get the highest version for each package, even if it is not the default latest.

```sh
npx pu major
npx pu --target=major  # alt.
```

```sh
# prettier: ^1.4.2 ➜ ^2.8.1
# ...
```

---

## Limitations

- After updating package.json, run `npm i`, `yarn install`, `pnpm install` or `bun install` to install new versions.
- This updater looks the <ins>package.json</ins> for `devDependencies`, `dependencies` and (if configured) `peerDependencies`.
- This updater doesn't search or update for tag and local versions _(alpha, beta, rc, etc.)_.

---

## Acknowledgements

[![Contributors](https://img.shields.io/github/contributors/wellwelwel/packages-update?label=Contributors)](https://github.com/wellwelwel/packages-update/graphs/contributors)
