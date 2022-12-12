<h2 align="center">Packages Update</h2>
<p align="center">🔗 A basic updater for packages, without any dependencies</p>

### Install

```shell
   npm i packages-update -D
```

<hr />

#### Usage

> `npx npu` or `npx npu --major`, `npx npu --minor`, `npx npu --patch` and `npx npu --lock`:

<hr />

-  Update to latest <b>major</b> version

   ```shell
      npx npu || npx npu --major

      # prettier: ^1.4.2 ➜ ^2.8.1
   ```

-  Update to latest <b>minor</b> version

   ```shell
      npx npu --minor

      # prettier: ^1.4.2 ➜ ^1.19.1
   ```

-  Update to latest <b>patch</b> version

   ```shell
      npx npu --patch

      # prettier: ^1.4.2 ➜ ^1.4.4
   ```

Then, run `npm i` or `npm i --ignore-scripts` to install new versions 🚀

<hr />

-  Only <b>lock curreny</b> version

   ```shell
      npx npu --lock

      # prettier: ^1.4.2 ➜ 1.4.2
   ```

Then, run `npm ci` or `npm ci --ignore-scripts` to install the static versions from `package-lock.json` 🔒

<hr />

### Credits

| Contributors | GitHub                                                                             |
| ------------ | ---------------------------------------------------------------------------------- |
| Author       | [![wellwelwel](./.github/assets/readme/author.svg)](https://github.com/wellwelwel) |
