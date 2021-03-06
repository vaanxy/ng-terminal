# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.6.12](https://github.com/vaanxy/ng-container-terminal/compare/v0.3.2...v0.6.12) (2019-12-17)


### Features

* add ct-vessel-bay component ([01449fc](https://github.com/vaanxy/ng-container-terminal/commit/01449fca5e32519f6e4d3ff129bb72e42fd0a608))
* render option support stroke, strokeWidth, text ([db64378](https://github.com/vaanxy/ng-container-terminal/commit/db643780566812b7a07e53b31a7b51873ed84711))
* **ct-vessel-bay:** support render text ([1fffdd9](https://github.com/vaanxy/ng-container-terminal/commit/1fffdd97dbdc1c3b8950e0468e43137f832061a1))
* **ct-vessel-bay:** update ct-vessel-bay component ([87bb39c](https://github.com/vaanxy/ng-container-terminal/commit/87bb39ce4a12ce900a16876d0f49f38cabef3cf9))
* **ct-yard:** ct-yard support stroke and strokeWidth renderOptions ([0ba0e23](https://github.com/vaanxy/ng-container-terminal/commit/0ba0e234fdd22bcfc0f6694ab631e8f812c21b5d))
* **ct-yard-bay:** support render stroke and strokeWidth ([003e236](https://github.com/vaanxy/ng-container-terminal/commit/003e236afcb3cc3be42034243f60873bfc060c8d))


### Bug Fixes

* <svg> attribute width: Expected length, '-Infinitypx' ([95ab617](https://github.com/vaanxy/ng-container-terminal/commit/95ab6178ce8f81e0a46d0852720a66b7243bee38))
* fix "This might be caused by using 'barrel' index.ts files" problem ([5cd4c07](https://github.com/vaanxy/ng-container-terminal/commit/5cd4c07bcf20dea15b3caeeaf1e08b153162dd2a))
* fix all lint problem ([1f6dec2](https://github.com/vaanxy/ng-container-terminal/commit/1f6dec26c84fbabf30e4cd4ea0a4023f076f72c6))
* fix circlur dependency ([cebf905](https://github.com/vaanxy/ng-container-terminal/commit/cebf90569ffdc1717225980ccac62338c141424a))
* **ct-vessel-bay:** fix 00 row display error ([531bcd2](https://github.com/vaanxy/ng-container-terminal/commit/531bcd2aa2d2e7342b7a4ee14835db31f2f18e5f))
* **ct-vessel-bay:** fix wrong hold cell y offset while deck min tier is less than 82 ([780b79c](https://github.com/vaanxy/ng-container-terminal/commit/780b79c8c0dfb65ac9984a1d11ee847254a73283))
* **ct-vessel-bay:** update layout padding ([4632bee](https://github.com/vaanxy/ng-container-terminal/commit/4632bee8c5ca051f8a730b59257efb8a54676dde))
* **ct-yard:** fix some bugs in ct-yard ([f4cf6f2](https://github.com/vaanxy/ng-container-terminal/commit/f4cf6f2dc9bc0455b2e90ce4d379a0c21288d2bc))
* **ct-yard:** fix some bugs in ct-yard component ([613d751](https://github.com/vaanxy/ng-container-terminal/commit/613d7510242e5732eeb93fded3f02d7d164477c6))
* fix typo file name ([9cd4c8d](https://github.com/vaanxy/ng-container-terminal/commit/9cd4c8d2e7eded483f9c58d784a71245c0a7a640))
* fix vessel-bay wrong attribute ([bd31e45](https://github.com/vaanxy/ng-container-terminal/commit/bd31e45d29a1288d4806ee890e21ce8961854d05))
* remove useless import ([58cee2c](https://github.com/vaanxy/ng-container-terminal/commit/58cee2ce43d1f3d056e56cdc4ae9e77ff3d0d2b9))
* **ct-yard:** new way to extract valid poses ([9396eb5](https://github.com/vaanxy/ng-container-terminal/commit/9396eb5257348f702b50d1673b43c548031fcbde))
* **ct-yard-bay:** update render properies on rect rather than group ([0976e99](https://github.com/vaanxy/ng-container-terminal/commit/0976e9902eb3e1fc5551ab70407e7c877b6fe635))
* **ct-yard-overview:** fix yard overview stroke always render in red ([5a31d42](https://github.com/vaanxy/ng-container-terminal/commit/5a31d42625463c15487917e05901bb88c64e9a70))

## 0.5.2(2019-01-11)

### Features

renderOptions:  support stroke, strokeWidth, text
ct-yard: 提供了 `yardposClick` 替代了原有的 `onYardposClicked` Output，更符合 Angular 规范
ct-yard-bay: 提供了 `yardposClick` 替代了原有的 `onYardposClicked` Output，更符合 Angular 规范

## 0.5.1(2018-12-28)

### Bug Fixed

ct-yard-overview:  fix svg attribute width: Expected length, '-Infinitypx' problem

## 0.5.0(2018-12-25)

### Features

ct-yard-overview: 提供了 `yardContentRender` Output，使得该组件具备了自定义渲染 yard 内部内容的能力
ct-yard-overview: 提供了 `yardClick` 替代了原有的 `onYardClicked` Output，更符合 Angular 规范
ct-yard-overview: 将 `scaleFactor` 移入了 `renderOptions` 中
ct-yard-overview: 使用了 `OnPush` change dection 策略

## 0.4.1(2018-12-03)

### Bug Fixed

移除rxjs-compact, 并修复相关代码

## 0.4.0(2018-12-03)

### Features

兼容Angular^7.0.0版本

## 0.2.0(2018-01-02)

### Features

ct-yard-overview: 完成全场俯瞰概览图组件的基本功能
mock: 添加全场俯瞰概览图的模拟数据


## 0.1.4(2017-12-20)

### Features

ct-yard: 添加RenderOptions, 可配置其填充色等相关内容
ct-yard-bay: 添加RenderOptions, 可配置其填充色等相关内容
