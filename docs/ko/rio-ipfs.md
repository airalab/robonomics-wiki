---
title: Robonomics IO IPFS
locale: 'ko' 
contributors: [Vourhey]
translated: false
---

It serves downloading and uploading files from/to IPFS network

## Requirements

* `robonomics` [executable](https://github.com/airalab/robonomics/releases)
* Running [IPFS](https://ipfs.io/#install) daemon 

## Write

```
% echo "Hello Robonomics" | ./robonomics io write ipfs
QmQAcvgXmcZEjXGibXGFcqdsvvrnWp3BguuubWhzSBZMXy
```

## Read

```
% echo QmQAcvgXmcZEjXGibXGFcqdsvvrnWp3BguuubWhzSBZMXy | ./robonomics io read ipfs
Hello Robonomics
```

## Remote IPFS node

If your local node is configured differently from defaults or you have a remote node, it's possible to specify it with `--remote` option

```
% echo "Hello Robonomics" | ./robonomics io write ipfs --remote https://ipfs.infura.io:5001/
QmQAcvgXmcZEjXGibXGFcqdsvvrnWp3BguuubWhzSBZMXy
```

The same applies for `read`

