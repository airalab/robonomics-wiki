---
title: コントリビューション
contributors: [positivecrash, ensrationis]
---

Robonomics はオープンソースのプロジェクトで、誰でも簡単に貢献できるようにしたいと考えています。問題の報告、変更の提案、コードやこのドキュメントの改善ができます。変更に関係するリポジトリで issue か pull request を作成してください。

## 主なリポジトリ

- [airalab/robonomics](https://github.com/airalab/robonomics): ランタイムとそのパレット。独自の CONTRIBUTING.md と SECURITY.md があります。
- [airalab/robins](https://github.com/airalab/robins): ツール群。`cps` コマンドラインツールやデバイス用ゲートウェイを含みます。
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): Python ライブラリ。
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): [robonomics.app](https://robonomics.app) の Web アプリ。
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki): この Wiki。
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network): メインの Web サイト。
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy): Robonomics Academy の Web サイト。

## 問題の報告

1. 問題に関係するリポジトリを選びます。
2. バグの場合は、すでに報告されていないか確認します。
3. わかりやすいタイトルと説明を付け、関係する情報をできるだけ多く書きます。
4. この Wiki については、issue テンプレートを使い、修正が必要なページを明記してください。

セキュリティの脆弱性は公開の issue で報告しないでください。[airalab/robonomics](https://github.com/airalab/robonomics) の SECURITY.md に従ってください。GitHub Security Advisories による非公開の報告方法が説明されています。

## ネットワークへの変更の提案

ランタイムとそのパラメーターの変更は、XRT 保有者が決めます。まず [airalab/robonomics](https://github.com/airalab/robonomics/issues) の issue でアイデアを説明し、その後リファレンダムにかけます。[XRT とガバナンス](/docs/xrt-and-governance/#how-to-propose-a-change) を参照してください。

## Pull request

1. タイプミスなどの小さな修正は、issue より pull request のほうが適しています。
2. pull request には問題と解決策を書いてください。関連する issue があればリンクしてください。
3. 空白や書式だけを直す pull request は送らないでください。
4. 周りの文章のスタイル、言語、構成に合わせてください。

## この Wiki の編集

Wiki は Eleventy でビルドしています。Node.js 20、または 22 以降が必要です。

1. [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki) をクローンし、`npm install` と `npm run start` を実行すると、ローカルで表示できます。
2. ページは `src/docs/` にある Markdown ファイルです。各ファイルは frontmatter で始まります: `title`、`contributors` (GitHub のユーザー名)、省略可能な `tools`。
3. サイドバーは `src/_data/sidebar_docs.json` です。項目を追加したら、そのタイトルを `translations/pages/en.json` にも追加してください。

ページのコンポーネントと翻訳の流れは [README](https://github.com/airalab/robonomics-wiki#readme) で説明しています。
