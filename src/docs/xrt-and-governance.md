---
title: XRT and governance
contributors: [Leemo94, ensrationis]
---

XRT is the token of the Robonomics network. You use it to pay for the cloud and to vote on how the network changes. This page covers both.

## What XRT is used for

- **Fees.** Every transaction pays a fee in XRT. All fees and tips go to the collators' pot.
- **Subscriptions.** Today's subscriptions (RWS) are won at auction, and the winning bid is burned. See [Legacy pallets](/docs/legacy-pallets/#rws-subscriptions).
- **Votes.** XRT holders decide on referenda.
- **Collator bond.** A collator candidate bonds XRT. See [Run a collator](/docs/run-collator/).

## Units and supply

- XRT has 9 decimals. 1 XRT = 1,000 Glushkov (mXRT) = 1,000,000 Coase (µXRT).
- The existential deposit is 1 Coase, that is 0.000001 XRT.
- The runtime mints 0.0042 XRT to the author of every block as the collator reward. The tokenomics limits collator emission to at most 25,000 XRT a year.
- The tokenomics caps supply at 5,100,000 XRT. Allocations and the token's life cycle are on the [tokenomics page](https://robonomics.network/tokenomics/).

XRT also exists on Ethereum and on Polkadot Asset Hub. See [XRT on other networks](/docs/xrt-migration/).

## Governance

Robonomics uses standard Polkadot OpenGov. There is no Sudo key: since runtime 52 (October 2026) every privileged change, including runtime upgrades, needs a referendum. Sudo itself was removed by a referendum. There is no council, no fellowship and no treasury track.

A referendum passes when two thresholds are met at the same time:

- **Approval**: the share of "aye" among the votes cast.
- **Support**: the share of all XRT that voted "aye".

Both start high and go down over the decision period. When a referendum passes and holds through its confirm period, the call is enacted.

### Tracks

| | Root | Whitelisted Caller |
|---|---|---|
| Used for | Runtime upgrades and any other privileged call: collator bond and limits, RWS auctions, configuration | A fast track for one specific call that the Core Team has whitelisted |
| Referenda deciding at once | 1 | 10 |
| Decision deposit | 5,000 XRT | 1 XRT |
| Prepare period | 12 hours | 5 minutes |
| Decision period | 14 days | 3 days |
| Confirm period | 24 hours | 20 minutes |
| Minimum enactment delay | 1 hour | 5 minutes |
| Approval | 90% → 51% over the decision period | 99% → 80% |
| Support | 50% → 15% | 2% → 1% |

These are the values in the current runtime. Changing them needs a Root referendum.

### Other deposits

- **Submission deposit:** 10 XRT. Any account can submit a referendum.
- **Preimage deposit:** 100 XRT plus 0.00001 XRT per byte of the call. The runtime code marks these values as placeholders, so they may change.
- A referendum that has not started deciding within 14 days times out.

### Core Team and whitelisting

The Core Team is a small collective of at most 7 members. Only a Root referendum can change its membership.

Whitelisting works like this:

1. The Core Team votes to whitelist the hash of one exact call. At least half of all members must agree. A Core Team motion lasts 3 days.
2. Whitelisting executes nothing. The call still needs a referendum on the Whitelisted Caller track.
3. A call that is not whitelisted cannot pass through the fast track. It can still go through the Root track.

So there are two ways to make a privileged change: a Root referendum, or a whitelisted call plus a fast referendum. Both end in a vote of XRT holders.

## How to propose a change

The steps the team published:

1. Describe the idea in an issue on [airalab/robonomics](https://github.com/airalab/robonomics/issues).
2. Submit a referendum in Polkadot.js Apps, in the Governance section, connected to the Robonomics network.
3. Tell the community about it.

What happens on chain:

1. The call is stored as a preimage (preimage deposit).
2. The referendum is submitted on a track (10 XRT submission deposit).
3. Someone places the decision deposit: 5,000 XRT on Root, 1 XRT on Whitelisted Caller. Anyone can place it.
4. The referendum starts deciding after the prepare period, once the decision deposit is in place and the track has a free slot. Voting then decides it within the decision period.

## How to vote

- Keep your XRT in your own wallet on the Robonomics network. Tokens held on an exchange cannot vote.
- Vote with conviction: lock your XRT for longer to give your vote more weight.

| Lock | Vote weight |
|---|---|
| No lock | 0.1× |
| 7 days | 1× |
| 14 days | 2× |
| 28 days | 3× |
| 56 days | 4× |
| 112 days | 5× |
| 224 days | 6× |

- You can delegate your voting power to another account instead of voting yourself.

Open and past referenda are in Polkadot.js Apps, in the Governance section, when it is connected to the [Robonomics RPC](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer).

## Read more

- [Robonomics 5.0: handing the keys to XRT holders](https://robonomics.network/blog/robonomics-5-0-governance/)
- [Sudo is gone: the Robonomics cloud is now run by its community](https://robonomics.network/blog/robonomics-5-0-sudo-removed/)
- [Forum discussion of the two-track design](https://forum.polkadot.network/t/robonomics-replacing-sudo-with-a-two-track-opengov-sized-for-a-small-community/18719)
