# Frequently Asked Questions

## How to see logs from main services?

IPFS in real time:

    journalctl -u ipfs -f

and Liability::

    journalctl -u liability -f

$$ How to check the quantity of IPFS peers?

    ipfs pubsub peers airalab.lighthouse.5.robonomics.eth

## IPFS can't connect to the daemon, what should I do?

Try to specify `--api` option

    ipfs swarm peers --api=/ip4/127.0.0.1/tcp/5001/

