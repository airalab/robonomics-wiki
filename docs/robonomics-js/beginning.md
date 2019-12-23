# Introduction

[Robonomics-js](https://github.com/airalab/robonomics-js) is a simple Javascript library for working with Robonomics network

## Installation

```
npm install robonomics-js --save
```

or

```
yarn add robonomics-js
```

CDN

```
<script src="https://cdn.jsdelivr.net/npm/robonomics-js/dist/robonomics.min.js"></script>
```

### Dependencies 

* [Web3](https://github.com/ethereum/web3.js/)
* [Ipfs](https://github.com/ipfs/js-ipfs)


## Initialization


```
    import Robonomics, { MessageProviderIpfsApi } from 'robonomics-js'
    import IPFS from 'ipfs-api'

    const robonomics = new Robonomics({
        provider: new MessageProviderIpfsApi(new IPFS('http://localhost:5001'))
    })

    robonomics.ready().then(() => {
        console.log('robonomics js ready')
        console.log('xrt', robonomics.xrt.address)
        console.log('factory', robonomics.factory.address)
        console.log('lighthouse default', robonomics.lighthouse.address)
    })
```

### Available arguments

* ``web3`` - isn't necessary if [Metamask](http://metamask.io/) is available
* ``account`` - isn't necessary if [Metamask](http://metamask.io/) is available
* ``privateKey`` - optional
* ``provider`` - IPFS HTTP API 
* ``version`` - the latest by default
* ``ens`` - ENS address, [0x314159265dD8dbb310642f98f50C066173C1259b](https://etherscan.io/address/0x314159265dD8dbb310642f98f50C066173C1259b) by default
* ``lighthouse`` - a lighthouse name in ENS, airalab.lighthouse.5.robonomics.eth by default


