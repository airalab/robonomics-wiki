---
title: Frequently Asked Questions about AIRA 
locale: 'ko' 
contributors: [Vourhey]
translated: false
---

## How to see logs from main services?

IPFS in real time:

    journalctl -u ipfs -f

and Liability::

    journalctl -u liability -f

## How to check the quantity of IPFS peers?

    ipfs pubsub peers 

## IPFS can't connect to the daemon, what should I do?

Try to specify `--api` option

    ipfs swarm peers --api=/ip4/127.0.0.1/tcp/5001/

## How to change ethereum address of AIRA?

Delete `keyfile` and `keyfile-psk` in `/var/lib/liability` and restart the service

```
systemctl restart liability
```

## IPFS daemon doesn't start

The error mostly occurs on single-board computers like Raspberry Pi or LattePanda after unexpected electricity lost.

Usually the file `/var/lib/ipfs/api` is corrupted and one may see error:

```
Error: Failed to parse '/var/lib/ipfs/api' file.
  error: failed to parse multiaddr "": empty multiaddr
If you're sure go-ipfs isn't running, you can just delete it.
Otherwise check:
  ps aux | grep ipfs
```

You can delete `/var/lib/ipfs/api` file and restart the service

