<h2 align="center">Packages Update</h2>
<p align="center">📦 A basic <b>updater</b> for packages, <ins>without</ins> any dependencies</p>

### Install

```shell
   npm i packages-update -D
```

<hr />

#### Usage

> `npx npu`,  
> `npx npu --latest`, `npx npu --major`, `npx npu --minor`, `npx npu --patch` and `npx npu --lock`:

<hr />

-  Update to <b>latest</b> version

   ```shell
      npx npu || npx npu --latest

      # prettier: ^1.4.2 ➜ ^2.8.1
      # ...
   ```

   > -  Get the default latest version for each package

<br />

-  Update to latest <b>major</b> version

   ```shell
      npx npu --major

      # prettier: ^1.4.2 ➜ ^2.8.1
      # ...
   ```

   > -  Get the highest version for each package, even if it is not the default latest

<br />

-  Update to latest <b>minor</b> version

   ```shell
      npx npu --minor

      # prettier: ^1.4.2 ➜ ^1.19.1
      # ...
   ```

   > -  Get the latest minor version for each package, before the next major version

<br />

-  Update to latest <b>patch</b> version

   ```shell
      npx npu --patch

      # prettier: ^1.4.2 ➜ ^1.4.4
      # ...
   ```

   > -  Get the latest patch version for each package, before the next minor version

<br />

Then, run `npm i` or `npm i --ignore-scripts` to install new versions 🚀

<hr />

-  Only <b>lock current</b> versions

   ```shell
      npx npu --lock

      # prettier: ^1.4.2 ➜ 1.4.2
      # ...
   ```

   > -  Just locks package versions, without checking versions or updating

<br />

Then, run `npm ci` or `npm ci --ignore-scripts` to install the static versions from `package-lock.json` 🔒

<hr />

### Credits

| Contributors | GitHub                                                                             |
| ------------ | ---------------------------------------------------------------------------------- |
| Author       | [![wellwelwel](./.github/assets/readme/author.svg)](https://github.com/wellwelwel) |
