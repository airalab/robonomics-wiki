# Welcome to Robonomics Wiki Repository!

## [EN] How to Help Robonomics Wiki

Robonomics Network is an open-source project and we want to make it easy for anyone to contribute. But before that, please read the rules and suggestions for making a contribution:

* [How to Contribute](/docs/contributing.md)
* [How to Edit Docs](/docs/edit-wiki.md)

If you have any specific questions that are not covered in the articles above, please, open an Issue and describe your suggestion in English.

### How to Deploy Wiki Locally

1. Install [Node.js](https://nodejs.org/en/download/package-manager/).

2. Activate [Yarn Package Manager](https://yarnpkg.com/), shipped with Node.js Corepack:

```
corepack enable
```

3. Clone the wiki repository:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

4. Go to the directory of the repository and run the following commands:

```
cd robonomics-wiki
sudo yarn global add @gridsome/cli
yarn install
```

5. Deploy the wiki locally:

```
gridsome develop
```

> If you have the error `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS`, run the following command:
```
export NODE_OPTIONS=--openssl-legacy-provider
```

## [RU] Как помочь Robonomics Wiki

Robonomics Network — это проект с открытым исходным кодом, и мы хотим, чтобы каждый мог легко внести свой вклад в развитие проекта. Но перед этим, пожалуйста, ознакомьтесь, с правилами и советам о том, как добавлять и редактировать материалы Wiki. 

* [Как стать контрибьютером](/docs/contributing.md)
* [Как редактировать статьи](/docs/edit-wiki.md)

Если у вас есть какие-либо конкретные вопросы, не затронутые в статьях выше, пожалуйста, откройте Issue и опишите свой вопрос на английском языке.

### Как развернуть Wiki локально

1. Установите [Node.js](https://nodejs.org/en/download/package-manager/).

2. Активируйте [Yarn Package Manager](https://yarnpkg.com/), установленный вместе с Node.js Corepack:

```
corepack enable
```

3. Клонируйте репозиторий Wiki:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

4. Перейдите в каталог репозитория и выполните следующие команды:

```
cd robonomics-wiki
sudo yarn global add @gridsome/cli
yarn install
```

5. Разверните Wiki локально:

```
gridsome develop
```

> Если вы столкнулись с ошибкой `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS`, выполните следующую команду:
```
export NODE_OPTIONS=--openssl-legacy-provider
```
