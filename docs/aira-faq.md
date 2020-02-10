# Frequently Asked Questions about AIRA

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