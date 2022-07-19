---
title: 로노미크스-JS
locale: 'ko' 
contributors: [Vourhey, arinaml]
translated: true
---

[Robonomics-js](https://github.com/airalab/robonomics-js) 는 Robonomics 네트워크 작업을위한 간단한 자바 스크립트 라이브러리입니다.

## 설치

```
npm install robonomics-js --save
```

또는/나

```
yarn add robonomics-js
```

### 의존성

* [Web3](https://github.com/ethereum/web3.js/) 버전 1.2.4
* [Ipfs](https://github.com/ipfs/js-ipfs) 버전 0.34.0


## 용법

Robonomics 인스턴스를 만듦

```JavaScript
const options = {...};
const robonomics = new Robonomics(options);
```

### 옵션

속성의 대상 :

```
options.web3
```

[web3.js](https://github.com/ethereum/web3.js/)인스턴스 :

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

pubsub 지원과 함께 [js-ipfs](https://github.com/ipfs/js-ipfs) 노드를 사용하는 MessageProviderIpfs의 인스턴스입니다 

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

이것은 메시지에 서명하는 데 사용되는 계정 개체입니다. 계정 주소 (잠금 해제해야 함) 또는 개인 키 (주어진 개인 키에서 주소가 복구 됨)를 지정해야합니다.

옵션 `isSignPrefix`는 접두어를 추가해야하는지 여부를 알려줍니다. 디폴트 `true`입니다.

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

이것은 `ens`계약 객체입니다. 이것은 필수가 아닙니다. 필요한 경우 네트워크가 메인 넷으로 설정되지 않은 경우 계약의 `address`를 지정할 수 있습니다. `suffix`는 사이드 체인의 경우 `sid`, 메인 넷의 경우 `eth`일 수 있습니다. `eth`가 디폴트입니다. `version`은 Robonomics Network의 버전입니다. 디폴트는 배포된 최신 버전입니다.

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

등대의 ENS 이름이며 필요하지 않습니다. 디폴트는 `airalab.lighthouse.5.robonomics.eth`입니다. `airalab`과 같이 이름의 첫부분 만 지정할수 있습니다.

```JavaScript
const options = {
  lighthouse: 'airalab.lighthouse.5.robonomics.eth',
  ...
};
```

전체 초기화가 될때까지 기다려야합니다

```JavaScript
const options = {...};
const robonomics = new Robonomics(options);
robonomics.ready().then(() => {
  console.log('Robonomics instance ready')
})
```

## API

### 메시지

#### 수요

메시지 사양

```JavaScript
const demand = {
  // REQUIRED
  model: "QmSt69qQqGka1qwRRHbdmAWk4nCbsV1mqJwd8cWbEyhf1M",      // ipfs hash of the model 
  objective: "QmSt69qQqGka1qwRRHbdmAWk4nCbsV1mqJwd8cWbEyhf2M",  // ipfs hash of the objective
  token: robonomics.xrt.address,                                // payment token address
  cost: 1,                                                      // cost
  deadline: 9999999,                                            // until which block demand is valid

  // NOT REQUIRED 
  lighthouse: "0x0000000000000000000000000000000000000000",     // lighthouse address, by default the initialization address
  validator: "0x0000000000000000000000000000000000000000",      // validator address if necessary
  validatorFee: 0,                                              // validator fee 
  nonce: 1                                                      // index number 
};
```

`robonomics.sendDemand`

수요 메시지에 서명하고 브로드캐스팅합니다. 책임은 약속으로 반환됩니다

```JavaScript
robonomics.sendDemand(demand).then(liability => {
  console.log(liability.address);
});
```

`robonomics.onDemand`

정의된 모델로 수요 메시지를 수신합니다. 모델이 null이면 모든 수요 메시지를 반환합니다.

```JavaScript
robonomics.onDemand(model, message => {
  console.log(message);
});
```

#### 공급

메시지 사양

```JavaScript
const offer = {
  // REQUIRED 
  model: "QmSt69qQqGka1qwRRHbdmAWk4nCbsV1mqJwd8cWbEyhf1M",      // ipfs hash of the model 
  objective: "QmSt69qQqGka1qwRRHbdmAWk4nCbsV1mqJwd8cWbEyhf2M",  // ipfs hash of the objective
  token: robonomics.xrt.address,                                // payment token address
  cost: 1,                                                      // cost 
  deadline: 9999999,                                            // until which block demand is valid

  // NOT REQUIRED
  lighthouse: "0x0000000000000000000000000000000000000000",     // lighthouse address, by default the initialization address
  lighthouseFee: 0,                                             // lighthouse fee
  validator: "0x0000000000000000000000000000000000000000",      // validator address if necessary
  nonce: 1                                                      // index number 
};
```

`robonomics.sendOffer`

공급 메시지에 서명하고 브로드캐스팅합니다. 책임은 약속으로 반환됩니다

```JavaScript
robonomics.sendOffer(offer).then(liability => {
  console.log(liability.address);
});
```

`robonomics.onOffer`

정의된 모델로 공급 메시지를 수신합니다. 모델이 `null`이면 모든 공급 메시지를 반환합니다

```JavaScript
robonomics.onOffer(model, message => {
  console.log(message);
});
```

#### 결과

메시지 사양

```JavaScript
const result = {
  // REQUIRED 
  liability: "0x0000000000000000000000000000000000000000",  // liability contract address
  success: true,                                            // status of the task
  result: "QmWXk8D1Fh5XFJvBodcWbwgyw9htjc6FJg8qi1YYEoPnrg"  // ipfs hash of the rosbag log file
};
```

`robonomics.sendResult`

결과 메시지에 서명하고 브로드캐스팅합니다

```JavaScript
robonomics.sendResult(result).then(() => {
  console.log("ok");
});
```

`robonomics.onResult`

결과 메시지를 수신합니다. 이 결과는 유효하지 않을 수 있습니다. 유효한 결과는 책임 계약에 저장됩니다

```JavaScript
robonomics.onResult(result => {
  console.log(result);
});
```

### 스마트 계약

#### 책임

`liability.getInfo`

계약의 속성 개체 반환합니다

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

책임이 끝날 때까지 기다립니다. 결과를 반환합니다

```JavaScript
liability.onResult().then(result => {
  console.log(result);
});
```

#### 등대

`robonomics.lighthouse.getInfo`

계약의 속성 개체 반환합니다

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

등대에있는 공급자 목록을 반환합니다

```JavaScript
robonomics.lighthouse.getProviders().then(list => {
  console.log(list);
});
```

##### 새로운 등대 창조

```JavaScript
const minimalFreeze = 1000      // Wn
const timeout = 25              // blocks
const name = 'mylighthouse'     // lighthouse name
robonomics.factory.methods.createLighthouse(minimalFreeze, timeout, name).send({ from: robonomics.account.address })
    .then((tx) => console.log(tx))

robonomics.factory.onLighthouse((lighthouse) => {
    console.log(lighthouse.name)
})
```

##### 공급자되기

사전에 `XRT`토큰에 대해 `approve`를 호출해야합니다.

```JavaScript
const name = "mylighthouse";    // lighthouse name
const stake = 1000;             // Wn
robonomics.lighthouse.methods
  .refill(stake)
  .send({ from: robonomics.account.address })
  .then(tx => console.log(tx));
```

#### 토큰

`robonomics.xrt.getInfo`

토큰의 속성 개체 반환합니다

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

##### 균형 확인

```JavaScript
robonomics.xrt.methods
  .balanceOf(robonomics.account.address)
  .call()
  .then(balance => console.log(balance));
```

##### 허용량 확인

```JavaScript
robonomics.xrt.methods
  .allowance(robonomics.account.address, robonomics.factory.address)
  .call()
  .then(allowance => console.log(allowance));
```

##### 승인

```JavaScript
robonomics.xrt.methods
  .approve(robonomics.lighthouse.address, 100)
  .send({
    from: robonomics.account.address
  })
  .then(tx => console.log(tx));
```

## 링크

- [Website](https://robonomics.network/)
- [Minimal template of dApp](https://github.com/airalab/vue-dapp-robonomics-template)
- [dApp example](https://codesandbox.io/s/robonomics-vue-template-ewuiw)