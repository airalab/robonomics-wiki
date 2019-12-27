# Robonomics-js

[Robonomics-js](https://github.com/airalab/robonomics-js) is a simple Javascript library for working with Robonomics network

## Installation

```
npm install robonomics-js --save
```

or

```
yarn add robonomics-js
```

### Dependencies 

* [Web3](https://github.com/ethereum/web3.js/) version 1.2.4
* [Ipfs](https://github.com/ipfs/js-ipfs) version 0.34.0


## Usage 

Creates a Robonomics instance

```JavaScript
const options = {...};
const robonomics = new Robonomics(options);
```

### options

The object of properties:

```
options.web3
```

An instance of [web3.js](https://github.com/ethereum/web3.js/):

```JavaScript
// metamask
const options = {
  web3: new Web3(window.ethereum),
  ...
};

// infura
const options = {
  web3: new Web3(
    new Web3.providers.WebsocketProvider(
      "wss://mainnet.infura.io/ws/v3/0b2f2a5026264b57b6d698b480332e89"
    )
  ),
  ...
};
```

```
options.messageProvider
```

This is an instance of MessageProviderIpfs which uses a [js-ipfs](https://github.com/ipfs/js-ipfs) node with pubsub support

```JavaScript
const ipfs = new Ipfs({
  repo: 'robonomics-example',
  relay: {
    enabled: true,
    hop: {
      enabled: true
    }
  },
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
        '/dns4/1.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/',
        '/dns4/2.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/',
        '/dns4/3.wsstar.aira.life/tcp/443/wss/p2p-websocket-star/'
      ]
    },
    Bootstrap: [
      '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
      '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
      '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
      '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
      '/dns4/node0.preload.ipfs.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
      '/dns4/node1.preload.ipfs.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6',
      '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8',
      '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9',
      '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
    ]
  }
})

const options = {
  messageProvider: new MessageProviderIpfs(ipfs),
  ...
};
```

```
options.account
```

This is an account object which will be used to sign messages. It's necessary to specify either account address (that one must be unlocked) or a private key (the address will be recovered from the given private key).

Option `isSignPrefix` tells whether or not a prefix must be appended. Default is `true`.

```JavaScript
const options = {
  account: {
    address: '0x0000000000000000000000000000000000000000',
    privateKey: '0x0000000000000000000000000000000000000000000000000000',
    isSignPrefix: true
  },
  ...
};
```

```
options.ens
```

This is a `ens` contract object. This one is not required. If it's necessary you may specify `address` of the contract if the network is not set to mainnet. `suffix` may be `sid` for sidechain or `eth` for mainnet. `eth` is default. `version` is the version of Robonomics Network. Default is the latest deployed version.

```JavaScript
const options = {
  ens: {
    address: '0x314159265dD8dbb310642f98f50C066173C1259b',
    suffix: 'eth',
    version: 5
  },
  ...
};
```

```
options.lighthouse
```

ENS name of a lighthouse, not required. Default is `airalab.lighthouse.5.robonomics.eth`. It's possible to specify only the first part of the name, like `airalab`.

```JavaScript
const options = {
  lighthouse: 'airalab.lighthouse.5.robonomics.eth',
  ...
};
```

It's necessary to wait until full initialization

```JavaScript
const options = {...};
const robonomics = new Robonomics(options);
robonomics.ready().then(() => {
  console.log('Robonomics instance ready')
})
```

## API

### Messages

#### Demand 

The message specification

```JavaScript
const demand = {
  // REQUIRED
  model: "QmSt69qQqGka1qwRRHbdmAWk4nCbsV1mqJwd8cWbEyhf1M", // ipfs hash of the model 
  objective: "QmSt69qQqGka1qwRRHbdmAWk4nCbsV1mqJwd8cWbEyhf2M", // ipfs hash of the objective
  token: robonomics.xrt.address, // payment token address
  cost: 1, // cost
  deadline: 9999999, // until which block demand is valid

  // NOT REQUIRED 
  lighthouse: "0x0000000000000000000000000000000000000000", // lighthouse address, by default the initialization address
  validator: "0x0000000000000000000000000000000000000000", // validator address if necessary
  validatorFee: 0, // validator fee 
  nonce: 1 // index number 
};
```

`robonomics.sendDemand`

Signing and broadcasting the demand message. A liability is returned as promise

```JavaScript
robonomics.sendDemand(demand).then(liability => {
  console.log(liability.address);
});
```

`robonomics.onDemand`

Слушает сообщения с спросом по указаной модели в качестве первого параметра.
Если первым параметром указать `null`, то будут получены все сообщения спроса на маяке.

```JavaScript
robonomics.onDemand(model, message => {
  console.log(message);
});
```

#### Offer 

The message specification

```JavaScript
const offer = {
  // ОБЯЗАТЕЛЬНЫЕ параметры
  model: "QmSt69qQqGka1qwRRHbdmAWk4nCbsV1mqJwd8cWbEyhf1M", // модель в виде ipfs хеша на rosbag файл
  objective: "QmSt69qQqGka1qwRRHbdmAWk4nCbsV1mqJwd8cWbEyhf2M", // задача в виде ipfs хеша на rosbag файл
  token: robonomics.xrt.address, // адрес токена для оплата
  cost: 1, // стоимость
  deadline: 9999999, // номер блока после которого спрос будет не действителен

  // НЕ ОБЯЗАТЕЛЬНЫЕ параметры
  lighthouse: "0x0000000000000000000000000000000000000000", // адрес маяка, по умолчанию указан адрес маяка при инициализации
  lighthouseFee: 0, // комиссия маяка
  validator: "0x0000000000000000000000000000000000000000", // адрес валидатора, если требуется проверка результата
  nonce: 1 // порядковый номер
};
```

`robonomics.sendOffer`

Подпись и отправка сообщения предложения. В качестве результата получаем обязательство.

```JavaScript
robonomics.sendOffer(offer).then(liability => {
  console.log(liability.address);
});
```

`robonomics.onOffer`

Слушает сообщения с предложениями по указаной модели в качестве первого параметра.
Если первым параметром указать `null`, то будут получены все сообщения предложений на маяке.

```JavaScript
robonomics.onOffer(model, message => {
  console.log(message);
});
```

#### Результат

Фотмат сообщения.

```JavaScript
const result = {
  // ОБЯЗАТЕЛЬНЫЕ параметры
  liability: "0x0000000000000000000000000000000000000000", // адрес контракта обязательства
  success: true, // признак результата работы
  result: "QmWXk8D1Fh5XFJvBodcWbwgyw9htjc6FJg8qi1YYEoPnrg" // результат в виде ipfs хеша на rosbag файл
};
```

`robonomics.sendResult`

Подпись и отправка сообщения предложения.

```JavaScript
robonomics.sendResult(result).then(() => {
  console.log("ok");
});
```

`robonomics.onResult`

Слушает сообщения с результатами в сети. Результат в этих сообщениях нельзя считать валидным. Валидный результат нужно получать из контракта обязательства

```JavaScript
robonomics.onResult(result => {
  console.log(result);
});
```

### Контракты

#### Обязательство

`liability.getInfo`

Вернет объект всех свойств контракта.

```JavaScript
liability.getInfo().then(data => {
  console.log(data);
  /*
  {
    model,
    objective,
    result,
    token,
    cost,
    lighthouseFee,
    validatorFee,
    demandHash,
    offerHash,
    promisor,
    promisee,
    lighthouse,
    validator,
    isSuccess,
    isFinalized
  }
  */
});
```

`liability.onResult`

Ожидает закрытия контрата, вернет результат.

```JavaScript
liability.onResult().then(result => {
  console.log(result);
});
```

#### Маяк

`robonomics.lighthouse.getInfo`

Вернет объект всех свойств контракта.

```JavaScript
robonomics.lighthouse.getInfo().then(data => {
  console.log(data);
  /*
  {
    minimalStake,
    timeoutInBlocks,
    keepAliveBlock,
    marker,
    quota
  }
  */
});
```

`robonomics.lighthouse.getProviders`

Вернет список адресов провайдеров работающих на маяке.

```JavaScript
robonomics.lighthouse.getProviders().then(list => {
  console.log(list);
});
```

##### Создание нового маяка

```JavaScript
const minimalFreeze = 1000 // Wn
const timeout = 25 // blocks
const name = 'mylighthouse' // название маяка
robonomics.factory.methods.createLighthouse(minimalFreeze, timeout, name).send({ from: robonomics.account.address })
    .then((tx) => console.log(tx))

robonomics.factory.onLighthouse((lighthouse) => {
    console.log(lighthouse.name)
})
```

##### Стать провайдером маяка

Предварительно необходимо выполнить `approve` токенов `XRT`

```JavaScript
const name = "mylighthouse"; // название маяка
const stake = 1000; // Wn
robonomics.lighthouse.methods
  .refill(stake)
  .send({ from: robonomics.account.address })
  .then(tx => console.log(tx));
```

#### Токен

`robonomics.xrt.getInfo`

Вернет объект всех свойств контракта.

```JavaScript
robonomics.xrt.getInfo().then(data => {
  console.log(data);
  /*
  {
    name,
    totalSupply,
    decimals,
    symbol
  }
  */
});
```

##### Проверить баланс

```JavaScript
robonomics.xrt.methods
  .balanceOf(robonomics.account.address)
  .call()
  .then(balance => console.log(balance));
```

##### Проверить кол-во одобренных токенов на адрес фабрики

```JavaScript
robonomics.xrt.methods
  .allowance(robonomics.account.address, robonomics.factory.address)
  .call()
  .then(allowance => console.log(allowance));
```

##### Approve токенов на адрес маяка

```JavaScript
robonomics.xrt.methods
  .approve(robonomics.lighthouse.address, 100)
  .send({
    from: robonomics.account.address
  })
  .then(tx => console.log(tx));
```

## Links 

- [Website](https://robonomics.network/)
- [Minimal template of dApp](https://github.com/airalab/vue-dapp-robonomics-template)
- [dApp example](https://codesandbox.io/s/robonomics-vue-template-ewuiw)
