---
title: Contribuir
contributors: [positivecrash, ensrationis]
---

O Robonomics é um projeto de código aberto, e queremos que qualquer pessoa possa contribuir com facilidade. Você pode relatar um problema, sugerir uma mudança, melhorar o código ou esta documentação. Abra uma issue ou um pull request no repositório ao qual a mudança pertence.

## Repositórios principais

- [airalab/robonomics](https://github.com/airalab/robonomics): o runtime e seus pallets. Tem os próprios CONTRIBUTING.md e SECURITY.md.
- [airalab/robins](https://github.com/airalab/robins): ferramentas, incluindo a ferramenta de linha de comando `cps` e gateways para dispositivos.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): a biblioteca Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): o app web em [robonomics.app](https://robonomics.app).
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki): esta wiki.
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network): o site principal.
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy): o site da Robonomics Academy.

## Relatando problemas

1. Escolha o repositório ao qual a issue pertence.
2. Se for um bug, confira se ele ainda não foi relatado.
3. Escreva um título e uma descrição claros, com o máximo de informação relevante que puder.
4. Para esta wiki, use o modelo de issue e diga qual página precisa de correção.

Não relate vulnerabilidades de segurança em issues públicas. Siga o SECURITY.md do [airalab/robonomics](https://github.com/airalab/robonomics): ele usa relatos privados pelo GitHub Security Advisories.

## Propondo mudanças na rede

Mudanças no runtime e nos seus parâmetros são decididas por quem tem XRT. Primeiro descreva a ideia em uma issue no [airalab/robonomics](https://github.com/airalab/robonomics/issues), depois leve-a a um referendo. Veja [XRT e governança](/docs/xrt-and-governance/#how-to-propose-a-change).

## Pull requests

1. Para correções pequenas, como erros de digitação, um pull request é melhor que uma issue.
2. Descreva o problema e a solução no pull request. Inclua o link da issue relacionada, se houver.
3. Não envie pull requests que só corrigem espaços em branco ou formatação.
4. Siga o estilo, o idioma e a estrutura do texto ao redor.

## Editando esta wiki

A wiki é feita com Eleventy. Você precisa do Node.js 20, ou 22 e mais recentes.

1. Clone o [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki) e rode `npm install` e `npm run start` para servir a wiki localmente.
2. As páginas são arquivos Markdown em `src/docs/`. Cada uma começa com um frontmatter: `title`, `contributors` (nomes de usuário do GitHub) e, opcionalmente, `tools`.
3. A barra lateral é `src/_data/sidebar_docs.json`. Ao adicionar uma entrada, adicione também o título dela em `translations/pages/en.json`.

O [README](https://github.com/airalab/robonomics-wiki#readme) explica os componentes das páginas e o fluxo de tradução.
