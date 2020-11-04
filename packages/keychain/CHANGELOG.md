# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.15.0 (2020-11-04)


### Features

* further simplify app instructions ([598827d](https://github.com/blockstack/ux/commit/598827d919fb62f9cc5308ebee5eac6acec4e982))





## 0.14.1 (2020-11-03)


### Bug Fixes

* proper glob for lerna packages ([5367055](https://github.com/blockstack/ux/commit/5367055e9c6622dd0a93f97275ab652a9af56bf9))





# 0.14.0 (2020-11-02)


### Bug Fixes

* stencil publishing tweaks ([db45290](https://github.com/blockstack/ux/commit/db45290e6effbae8e91c9f0d2ab3c9d205cca0f0))
* **keychain:** respect specified network ([3c474ce](https://github.com/blockstack/ux/commit/3c474ce6bb274152d72903014716207630ca5fdc))
* attempted fix for [#439](https://github.com/blockstack/ux/issues/439), [#437](https://github.com/blockstack/ux/issues/437) ([d0b31c2](https://github.com/blockstack/ux/commit/d0b31c2239f684e8abd4059503fe8db8f11b0e46))
* bump keychain version ([de7a816](https://github.com/blockstack/ux/commit/de7a816071facc3fc2c8323961a941d722454e6d))
* keychain lib still broken ([1a7fd0c](https://github.com/blockstack/ux/commit/1a7fd0ced01a6ec8bdd31bf84140728e4b1d7e30))
* keychain version ([e1618f6](https://github.com/blockstack/ux/commit/e1618f61b18490e87760b810766beab38e7ef16f))
* remaining broken sidecar urls, fixes [#615](https://github.com/blockstack/ux/issues/615) ([4c26fce](https://github.com/blockstack/ux/commit/4c26fcea34c1603e4ea63d1be7b576b9ccb45a42))
* **app:** use BigNum for fungible post condition amount ([633ac80](https://github.com/blockstack/ux/commit/633ac801b9a0f2f17eadd2dd302b8c4c235233de))
* **keychain:** silently broken build ([f36ab28](https://github.com/blockstack/ux/commit/f36ab28621bcf3bc784d92f948eed0e95e157a26))
* **keychain:** tests ([0d7aaff](https://github.com/blockstack/ux/commit/0d7aaffbbd106bc4541c5c8c2fc2eba43d07ba8c))
* **keychain:** use correct filepath when writing profiles ([fa8098a](https://github.com/blockstack/ux/commit/fa8098ae13973dd5e53303a4b04967a956d8842b))
* profile info not set in authResponse ([9e48475](https://github.com/blockstack/ux/commit/9e4847544e89dc1c8abcebeda6d34dc2bf8a4c7f))
* remove alpha/beta versions from ui, keychain ([81dee96](https://github.com/blockstack/ux/commit/81dee96113f26fa5609dbe753d503c909b98ec5f))
* rpc-client version ([83cf48b](https://github.com/blockstack/ux/commit/83cf48b679fa0938f6550c02472a97400dd009bf))
* **keychain:** use correct filePath, add types for async functions ([7290261](https://github.com/blockstack/ux/commit/7290261a32d4fcea6627f66a76299b38ff7b7eac))
* **keychain:** use filePath for profile uploading ([04c9385](https://github.com/blockstack/ux/commit/04c938591b82ff10f51b2f61401468d579655ee0))
* **keychain:** use synchronous profile upload methods ([3b5bd82](https://github.com/blockstack/ux/commit/3b5bd821ccd45511645ce2c8bb648944ed4663c2))
* add trailing slash to apps storage url, [#356](https://github.com/blockstack/ux/issues/356) ([024c903](https://github.com/blockstack/ux/commit/024c903724e17678dea205d95fcae01aa946e29e))
* alternating address derivation ([edc7b30](https://github.com/blockstack/ux/commit/edc7b304dc96cb99d790c3e9a2db809bc4581d63))
* better lookup for profile location, fixes [#377](https://github.com/blockstack/ux/issues/377) ([f292cc1](https://github.com/blockstack/ux/commit/f292cc13aee3b9b531a64bcb4fa8ed76013c406b))
* fix all eslint and prettier tasks ([217ca35](https://github.com/blockstack/ux/commit/217ca350500dafd45797f15251bee78c787c361a))
* keychain package was behind published version ([acbd4b0](https://github.com/blockstack/ux/commit/acbd4b064db61a60f01ce60ab75f9f2f39456eb8))
* manually fix new eslint bugs ([7650b7a](https://github.com/blockstack/ux/commit/7650b7a753465a1767a70df45ec1a9fbdd9db1d1))
* remove import of d.ts in keychain ([5d5f2eb](https://github.com/blockstack/ux/commit/5d5f2ebf0ccacfb4ee059e69781d935eb9869d34))
* safer logic when fetching profiles, [#322](https://github.com/blockstack/ux/issues/322) ([e0a67fd](https://github.com/blockstack/ux/commit/e0a67fd745f7556846766b912340438eb41d36f6))
* **keychain:** fixes TS error when deriving config key ([08f9b18](https://github.com/blockstack/ux/commit/08f9b1827c8588aeb42a5b90fe1bd4d786509474))
* **wallet:** typo when fetching config ([816e46b](https://github.com/blockstack/ux/commit/816e46b5dc37fa519d4508f647a62f5a85d3177a))


### Features

* add debug mode for transaction signing ([3c66887](https://github.com/blockstack/ux/commit/3c6688714b070a38c2eefe0d93a6218163917c53))
* add fn to generate 24-word phrases ([8e6077b](https://github.com/blockstack/ux/commit/8e6077b5f0c54e7f9916615ee72448bfa4b48d1f))
* dont use popups in mobile, adds method to handle redirect auth ([450f58b](https://github.com/blockstack/ux/commit/450f58bcb5c3431d6b1ac649d19f319da34d9f7f))
* publish public key, [#357](https://github.com/blockstack/ux/issues/357) ([7c0a1bb](https://github.com/blockstack/ux/commit/7c0a1bb0a6966b29a34a62301dace01325ecacb8))
* recursively create identities by looking up username ([d5b20ea](https://github.com/blockstack/ux/commit/d5b20ea4cdb94aa2a92c6096642e9abad467e966))
* refactor connect ui into web components with stencil ([7f65900](https://github.com/blockstack/ux/commit/7f65900fd6f648dcad57502d985b8dc862e7b72f)), closes [#581](https://github.com/blockstack/ux/issues/581) [#604](https://github.com/blockstack/ux/issues/604) [#612](https://github.com/blockstack/ux/issues/612) [#606](https://github.com/blockstack/ux/issues/606) [#613](https://github.com/blockstack/ux/issues/613)
* rename all packages to [@stacks](https://github.com/stacks) ([b56e750](https://github.com/blockstack/ux/commit/b56e750db5b30d4c56e9669285a11db565e8a675))
* restore identities from walletConfig ([61ae914](https://github.com/blockstack/ux/commit/61ae914247c45b46a7c1ef42805a37d51309fc03))





# 0.13.0 (2020-11-02)


### Bug Fixes

* **keychain:** respect specified network ([3c474ce](https://github.com/blockstack/ux/commit/3c474ce6bb274152d72903014716207630ca5fdc))
* keychain lib still broken ([1a7fd0c](https://github.com/blockstack/ux/commit/1a7fd0ced01a6ec8bdd31bf84140728e4b1d7e30))
* remaining broken sidecar urls, fixes [#615](https://github.com/blockstack/ux/issues/615) ([4c26fce](https://github.com/blockstack/ux/commit/4c26fcea34c1603e4ea63d1be7b576b9ccb45a42))
* **app:** use BigNum for fungible post condition amount ([633ac80](https://github.com/blockstack/ux/commit/633ac801b9a0f2f17eadd2dd302b8c4c235233de))
* **keychain:** silently broken build ([f36ab28](https://github.com/blockstack/ux/commit/f36ab28621bcf3bc784d92f948eed0e95e157a26))
* **keychain:** tests ([0d7aaff](https://github.com/blockstack/ux/commit/0d7aaffbbd106bc4541c5c8c2fc2eba43d07ba8c))
* **keychain:** use correct filepath when writing profiles ([fa8098a](https://github.com/blockstack/ux/commit/fa8098ae13973dd5e53303a4b04967a956d8842b))
* add trailing slash to apps storage url, [#356](https://github.com/blockstack/ux/issues/356) ([024c903](https://github.com/blockstack/ux/commit/024c903724e17678dea205d95fcae01aa946e29e))
* alternating address derivation ([edc7b30](https://github.com/blockstack/ux/commit/edc7b304dc96cb99d790c3e9a2db809bc4581d63))
* attempted fix for [#439](https://github.com/blockstack/ux/issues/439), [#437](https://github.com/blockstack/ux/issues/437) ([d0b31c2](https://github.com/blockstack/ux/commit/d0b31c2239f684e8abd4059503fe8db8f11b0e46))
* bump keychain version ([de7a816](https://github.com/blockstack/ux/commit/de7a816071facc3fc2c8323961a941d722454e6d))
* fix all eslint and prettier tasks ([217ca35](https://github.com/blockstack/ux/commit/217ca350500dafd45797f15251bee78c787c361a))
* keychain version ([e1618f6](https://github.com/blockstack/ux/commit/e1618f61b18490e87760b810766beab38e7ef16f))
* rpc-client version ([83cf48b](https://github.com/blockstack/ux/commit/83cf48b679fa0938f6550c02472a97400dd009bf))
* **keychain:** use correct filePath, add types for async functions ([7290261](https://github.com/blockstack/ux/commit/7290261a32d4fcea6627f66a76299b38ff7b7eac))
* **keychain:** use filePath for profile uploading ([04c9385](https://github.com/blockstack/ux/commit/04c938591b82ff10f51b2f61401468d579655ee0))
* **keychain:** use synchronous profile upload methods ([3b5bd82](https://github.com/blockstack/ux/commit/3b5bd821ccd45511645ce2c8bb648944ed4663c2))
* better lookup for profile location, fixes [#377](https://github.com/blockstack/ux/issues/377) ([f292cc1](https://github.com/blockstack/ux/commit/f292cc13aee3b9b531a64bcb4fa8ed76013c406b))
* keychain package was behind published version ([acbd4b0](https://github.com/blockstack/ux/commit/acbd4b064db61a60f01ce60ab75f9f2f39456eb8))
* manually fix new eslint bugs ([7650b7a](https://github.com/blockstack/ux/commit/7650b7a753465a1767a70df45ec1a9fbdd9db1d1))
* profile info not set in authResponse ([9e48475](https://github.com/blockstack/ux/commit/9e4847544e89dc1c8abcebeda6d34dc2bf8a4c7f))
* remove alpha/beta versions from ui, keychain ([81dee96](https://github.com/blockstack/ux/commit/81dee96113f26fa5609dbe753d503c909b98ec5f))
* remove import of d.ts in keychain ([5d5f2eb](https://github.com/blockstack/ux/commit/5d5f2ebf0ccacfb4ee059e69781d935eb9869d34))
* safer logic when fetching profiles, [#322](https://github.com/blockstack/ux/issues/322) ([e0a67fd](https://github.com/blockstack/ux/commit/e0a67fd745f7556846766b912340438eb41d36f6))
* **keychain:** fixes TS error when deriving config key ([08f9b18](https://github.com/blockstack/ux/commit/08f9b1827c8588aeb42a5b90fe1bd4d786509474))
* **wallet:** typo when fetching config ([816e46b](https://github.com/blockstack/ux/commit/816e46b5dc37fa519d4508f647a62f5a85d3177a))


### Features

* add debug mode for transaction signing ([3c66887](https://github.com/blockstack/ux/commit/3c6688714b070a38c2eefe0d93a6218163917c53))
* add fn to generate 24-word phrases ([8e6077b](https://github.com/blockstack/ux/commit/8e6077b5f0c54e7f9916615ee72448bfa4b48d1f))
* dont use popups in mobile, adds method to handle redirect auth ([450f58b](https://github.com/blockstack/ux/commit/450f58bcb5c3431d6b1ac649d19f319da34d9f7f))
* publish public key, [#357](https://github.com/blockstack/ux/issues/357) ([7c0a1bb](https://github.com/blockstack/ux/commit/7c0a1bb0a6966b29a34a62301dace01325ecacb8))
* recursively create identities by looking up username ([d5b20ea](https://github.com/blockstack/ux/commit/d5b20ea4cdb94aa2a92c6096642e9abad467e966))
* refactor connect ui into web components with stencil ([7f65900](https://github.com/blockstack/ux/commit/7f65900fd6f648dcad57502d985b8dc862e7b72f)), closes [#581](https://github.com/blockstack/ux/issues/581) [#604](https://github.com/blockstack/ux/issues/604) [#612](https://github.com/blockstack/ux/issues/612) [#606](https://github.com/blockstack/ux/issues/606) [#613](https://github.com/blockstack/ux/issues/613)
* rename all packages to [@stacks](https://github.com/stacks) ([b56e750](https://github.com/blockstack/ux/commit/b56e750db5b30d4c56e9669285a11db565e8a675))
* restore identities from walletConfig ([61ae914](https://github.com/blockstack/ux/commit/61ae914247c45b46a7c1ef42805a37d51309fc03))





## 0.12.7 (2020-10-05)


### Bug Fixes

* **connect:** use authOrigin from authOptions ([e6602a8](https://github.com/blockstack/ux/commit/e6602a8a559158d3ecf92268495176619d1f340e))





## 0.12.6 (2020-10-05)


### Bug Fixes

* remaining broken sidecar urls, fixes [#615](https://github.com/blockstack/ux/issues/615) ([4c26fce](https://github.com/blockstack/ux/commit/4c26fcea34c1603e4ea63d1be7b576b9ccb45a42))





## 0.12.5 (2020-09-29)


### Bug Fixes

* update node api url ([7c71cc7](https://github.com/blockstack/ux/commit/7c71cc7fd47cdb5626d618be70c953f3bfb9d7f7))





## 0.12.4 (2020-09-25)


### Bug Fixes

* add yarn.lock ([24d88d5](https://github.com/blockstack/ux/commit/24d88d5a29d2a4d3d8acee5ce70cd5ecb3c997c4))





## 0.12.3 (2020-09-16)


### Bug Fixes

* keychain lib still broken ([1a7fd0c](https://github.com/blockstack/ux/commit/1a7fd0ced01a6ec8bdd31bf84140728e4b1d7e30))





## 0.12.2 (2020-09-10)


### Bug Fixes

* **keychain:** use correct filepath when writing profiles ([fa8098a](https://github.com/blockstack/ux/commit/fa8098ae13973dd5e53303a4b04967a956d8842b))





## 0.12.1 (2020-08-21)

**Note:** Version bump only for package @blockstack/keychain





# [0.12.0](https://github.com/blockstack/ux/compare/@blockstack/keychain@0.10.5...@blockstack/keychain@0.12.0) (2020-08-21)


### Bug Fixes

* keychain version ([e1618f6](https://github.com/blockstack/ux/commit/e1618f61b18490e87760b810766beab38e7ef16f))
* rpc-client version ([83cf48b](https://github.com/blockstack/ux/commit/83cf48b679fa0938f6550c02472a97400dd009bf))
* **app:** use BigNum for fungible post condition amount ([633ac80](https://github.com/blockstack/ux/commit/633ac801b9a0f2f17eadd2dd302b8c4c235233de))
* **keychain:** use correct filePath, add types for async functions ([7290261](https://github.com/blockstack/ux/commit/7290261a32d4fcea6627f66a76299b38ff7b7eac))
* **keychain:** use filePath for profile uploading ([04c9385](https://github.com/blockstack/ux/commit/04c938591b82ff10f51b2f61401468d579655ee0))
* **keychain:** use synchronous profile upload methods ([3b5bd82](https://github.com/blockstack/ux/commit/3b5bd821ccd45511645ce2c8bb648944ed4663c2))


### Features

* dont use popups in mobile, adds method to handle redirect auth ([450f58b](https://github.com/blockstack/ux/commit/450f58bcb5c3431d6b1ac649d19f319da34d9f7f))





## 0.10.5 (2020-07-30)


### Bug Fixes

* reset text-align within connect modal, fixes [#458](https://github.com/blockstack/ux/issues/458) ([aecc700](https://github.com/blockstack/ux/commit/aecc70016809c3750d5cde730db4aeaffd52bb98))





## 0.10.4 (2020-07-28)

**Note:** Version bump only for package @blockstack/keychain





## 0.10.3 (2020-07-28)


### Bug Fixes

* cursor pointer on dont show this again, fixes [#508](https://github.com/blockstack/ux/issues/508) ([fe4dcf4](https://github.com/blockstack/ux/commit/fe4dcf418526289685687ad9f4526cd45db85410))





## 0.10.2 (2020-07-27)


### Bug Fixes

* **connect:** pass all data to token ([3f46f60](https://github.com/blockstack/ux/commit/3f46f600cccfeadca381574b2b493709b4bba590))





## 0.10.1 (2020-07-24)


### Bug Fixes

* send to sign in when using showBlockstackConnect, fixes [#507](https://github.com/blockstack/ux/issues/507) ([d7698e8](https://github.com/blockstack/ux/commit/d7698e839e44177e56617701d9df0bca5a60924a))





# 0.10.0 (2020-07-24)


### Features

* better bundle size with esmodules ([2c7046f](https://github.com/blockstack/ux/commit/2c7046f70d2ea10ffd973a4ea816a760ffc26952))





## 0.9.1 (2020-07-24)


### Bug Fixes

* force app icon 100% size in connect modal, fixes [#455](https://github.com/blockstack/ux/issues/455) ([4f69f75](https://github.com/blockstack/ux/commit/4f69f75cf7a153c6511cd200e3d1604e5a049226))





# 0.9.0 (2020-07-23)


### Features

* expose connect, app version ([b90a618](https://github.com/blockstack/ux/commit/b90a618fbeaac0ed998ec5ecd10eda8facdc6e10))





## 0.8.8 (2020-07-22)


### Bug Fixes

* docs not building ([d6acb21](https://github.com/blockstack/ux/commit/d6acb21d6e9d6ca171dbbac13a2cc38e7f68b4b9))





## 0.8.7 (2020-07-22)


### Bug Fixes

* workflow syntax for test-app deployment ([976fe54](https://github.com/blockstack/ux/commit/976fe54ee4e0e28833bad515ceccc5fd7f98df3a))





## 0.8.6 (2020-07-22)

**Note:** Version bump only for package @blockstack/keychain





## 0.7.5 (2020-07-14)


### Bug Fixes

* textStyles not being typed ([2428f69](https://github.com/blockstack/ux/commit/2428f69ddc39f20c566f2686a65959b59f52e9aa))





## 0.7.4 (2020-07-09)

**Note:** Version bump only for package @blockstack/keychain





## 0.7.3 (2020-07-09)

**Note:** Version bump only for package @blockstack/keychain





# 0.7.0 (2020-07-07)


### Features

* add codesandbox ci ([9e903d7](https://github.com/blockstack/ux/commit/9e903d7141c21503339159255cd06fb6701b1e3b))





## 0.6.1 (2020-06-30)

**Note:** Version bump only for package @blockstack/keychain





# [0.6.0](https://github.com/blockstack/ux/compare/@blockstack/keychain@0.4.0...@blockstack/keychain@0.6.0) (2020-06-24)


### Bug Fixes

* attempted fix for [#439](https://github.com/blockstack/ux/issues/439), [#437](https://github.com/blockstack/ux/issues/437) ([d0b31c2](https://github.com/blockstack/ux/commit/d0b31c2239f684e8abd4059503fe8db8f11b0e46))
* bump keychain version ([de7a816](https://github.com/blockstack/ux/commit/de7a816071facc3fc2c8323961a941d722454e6d))
* keychain package was behind published version ([acbd4b0](https://github.com/blockstack/ux/commit/acbd4b064db61a60f01ce60ab75f9f2f39456eb8))


### Features

* add fn to generate 24-word phrases ([8e6077b](https://github.com/blockstack/ux/commit/8e6077b5f0c54e7f9916615ee72448bfa4b48d1f))





# [0.4.0](https://github.com/blockstack/ux/compare/@blockstack/keychain@0.3.5...@blockstack/keychain@0.4.0) (2020-05-15)


### Bug Fixes

* add trailing slash to apps storage url, [#356](https://github.com/blockstack/ux/issues/356) ([024c903](https://github.com/blockstack/ux/commit/024c903724e17678dea205d95fcae01aa946e29e))


### Features

* publish public key, [#357](https://github.com/blockstack/ux/issues/357) ([7c0a1bb](https://github.com/blockstack/ux/commit/7c0a1bb0a6966b29a34a62301dace01325ecacb8))





## [0.3.5](https://github.com/blockstack/ux/compare/@blockstack/keychain@0.3.3...@blockstack/keychain@0.3.5) (2020-05-06)

**Note:** Version bump only for package @blockstack/keychain





## [0.3.3](https://github.com/blockstack/ux/compare/@blockstack/keychain@0.3.2...@blockstack/keychain@0.3.3) (2020-04-30)


### Bug Fixes

* safer logic when fetching profiles, [#322](https://github.com/blockstack/ux/issues/322) ([e0a67fd](https://github.com/blockstack/ux/commit/e0a67fd745f7556846766b912340438eb41d36f6))





## [0.3.2](https://github.com/blockstack/ux/compare/@blockstack/keychain@0.3.1...@blockstack/keychain@0.3.2) (2020-04-17)


### Bug Fixes

* profile info not set in authResponse ([9e48475](https://github.com/blockstack/ux/commit/9e4847544e89dc1c8abcebeda6d34dc2bf8a4c7f))





## [0.3.1](https://github.com/blockstack/ux/compare/@blockstack/keychain@0.3.0-beta.3...@blockstack/keychain@0.3.1) (2020-03-10)


### Bug Fixes

* remove alpha/beta versions from ui, keychain ([81dee96](https://github.com/blockstack/ux/commit/81dee96113f26fa5609dbe753d503c909b98ec5f))





# 0.3.0-beta.3 (2020-03-10)


### Bug Fixes

* **keychain:** fixes TS error when deriving config key ([08f9b18](https://github.com/blockstack/ux/commit/08f9b1827c8588aeb42a5b90fe1bd4d786509474))
* **wallet:** typo when fetching config ([816e46b](https://github.com/blockstack/ux/commit/816e46b5dc37fa519d4508f647a62f5a85d3177a))


### Features

* recursively create identities by looking up username ([d5b20ea](https://github.com/blockstack/ux/commit/d5b20ea4cdb94aa2a92c6096642e9abad467e966))
* restore identities from walletConfig ([61ae914](https://github.com/blockstack/ux/commit/61ae914247c45b46a7c1ef42805a37d51309fc03))





# `@blockstack/keychain` Changelog

## 0.2.3 - 2020/2/4

- Added `Wallet#walletConfig`, which allows storing private settings and information related to the current wallet. Data is stored in Gaia, and is encrypted with a uniquely derived wallet-level private key.

## 0.2.0 - 2020/1/27

- All included in PR [#15](https://github.com/blockstack/blockstack-keychain/pull/15)
- Fetch and store a profile.json
- Register subdomains
- Fetch existing usernames
- Update profile.json `apps` section with the `publish_data` scope

## 0.1.1 - 2019/12/2

- Export `encrypt` and `decrypt` from `index.ts`

## 0.1.0 - 2019/11/25

- Integrate asynchronous code from `blockstack.js`
- Use `tsdx` for deployment
- MVP keychain-related methods
