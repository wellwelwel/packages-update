<h2 align="center">Packages Update</h2>
<p align="center">📦 A basic <b>updater</b> for packages, <ins>without</ins> any dependencies</p>

### Install

```shell
   npm i packages-update -D
```

<hr />

#### Usage

`npx npu`

<hr />

#### Update to <b>latest</b> version

```shell
   npx npu || npx npu --latest

   # prettier: ^1.4.2 ➜ ^2.8.1
   # ...
```

-  Get the default latest version for each package

<hr />

#### Update to latest <b>major</b> version

```shell
   npx npu --major

   # prettier: ^1.4.2 ➜ ^2.8.1
   # ...
```

-  Get the highest version for each package, even if it is not the default latest

<hr />

#### Update to latest <b>minor</b> version

```shell
   npx npu --minor

   # prettier: ^1.4.2 ➜ ^1.19.1
   # ...
```

-  Get the latest minor version for each package, before the next major version

<hr />

#### Update to latest <b>patch</b> version

```shell
   npx npu --patch

   # prettier: ^1.4.2 ➜ ^1.4.4
   # ...
```

-  Get the latest patch version for each package, before the next minor version

<hr />

#### Only <b>lock current</b> versions

```shell
   npx npu --lock

   # prettier: ^1.4.2 ➜ 1.4.2
   # ...
```

-  Just locks package versions, without checking versions or updating

<hr />

#### Aliases

-  `pu`, `npu`, `packages-update` or `npm-packages-update`:

   ```shell
      npx pu
      npx npu
      npx packages-update
      npx npm-packages-update
   ```

<hr />

#### Notes

-  When update packages, run `npm i` to install new versions 🚀
-  When lock packages, run `npm ci` to install the static versions from `package-lock.json` 🔒
-  This updater looks in <ins>package.json</ins> for `devDependencies` and `dependencies` 🔎
-  This updater doesn't search or update for tag versions _(alpha, beta, rc, etc.)_ 👾

<hr />

#### Credits

| Contributors | GitHub                                                                             |
| ------------ | ---------------------------------------------------------------------------------- |
| Author       | [![wellwelwel](./.github/assets/readme/author.svg)](https://github.com/wellwelwel) |
