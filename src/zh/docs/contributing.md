---
title: 参与贡献
contributors: [positivecrash, ensrationis]
---

Robonomics 是一个开源项目，我们希望任何人都能方便地参与贡献。你可以报告问题、提出修改建议、改进代码或本文档。请在变更所属的仓库中提交 issue 或 pull request。

## 主要仓库

- [airalab/robonomics](https://github.com/airalab/robonomics)：运行时及其 pallet。仓库里有自己的 CONTRIBUTING.md 和 SECURITY.md。
- [airalab/robins](https://github.com/airalab/robins)：工具集，包括 `cps` 命令行工具和设备网关。
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface)：Python 库。
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app)：网页应用 [robonomics.app](https://robonomics.app)。
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki)：本 wiki。
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network)：主网站。
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy)：Robonomics Academy 网站。

## 报告问题

1. 选择问题所属的仓库。
2. 如果是 bug，先确认还没有人报告过。
3. 写清楚标题和描述，尽量提供相关信息。
4. 针对本 wiki 的问题，请使用 issue 模板，并写明需要修改的页面。

不要在公开 issue 中报告安全漏洞。请按照 [airalab/robonomics](https://github.com/airalab/robonomics) 中 SECURITY.md 的说明操作：它通过 GitHub Security Advisories 私下报告。

## 对网络提出变更

运行时及其参数的变更由 XRT 持有者决定。先在 [airalab/robonomics](https://github.com/airalab/robonomics/issues) 上提交 issue 描述你的想法，再发起公投。见 [XRT 与治理](/docs/xrt-and-governance/#how-to-propose-a-change)。

## Pull request

1. 对于错别字这类小修改，直接提交 pull request 比提 issue 更好。
2. 在 pull request 中描述问题和解决方案。如果有相关 issue，请附上链接。
3. 不要提交只修改空白或格式的 pull request。
4. 遵循上下文的风格、语言和排版。

## 编辑本 wiki

本 wiki 使用 Eleventy 构建。需要 Node.js 20，或 22 及更新版本。

1. 克隆 [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki)，然后运行 `npm install` 和 `npm run start`，在本地预览。
2. 页面是 `src/docs/` 中的 Markdown 文件。每个文件以 frontmatter 开头：`title`、`contributors`（GitHub 用户名），以及可选的 `tools`。
3. 侧边栏在 `src/_data/sidebar_docs.json` 中。添加条目时，也要把它的标题加到 `translations/pages/en.json` 里。

[README](https://github.com/airalab/robonomics-wiki#readme) 介绍了页面组件和翻译流程。
