---
title: System Architecture
contributors: [adeptvin1, timofeev41]
tools:
  - Feecc Analytics frontend
    https://github.com/Multi-Agent-io/feecc-analytics-frontend
  - Feecc Analytics backend
    https://github.com/Multi-Agent-io/feecc-analytics-backend
  - Feecc Workbench frontend
    https://github.com/Multi-Agent-io/feecc-workbench-frontend
  - Feecc Workbench daemon
    https://github.com/Multi-Agent-io/feecc-workbench-daemon
  - Feecc Validator frontend
    https://github.com/Multi-Agent-io/feecc-validator-frontend
  - Feecc Validator backend
    https://github.com/Multi-Agent-io/feecc-validator-backend
  - Feecc IPFS gateway
    https://github.com/Multi-Agent-io/feecc-ipfs-gateway
  - Feecc Print server
    https://github.com/Multi-Agent-io/feecc-print-server
  - Feecc Cameraman
    https://github.com/Multi-Agent-io/feecc-cameraman
  - Feecc HID reader daemon
    https://github.com/Multi-Agent-io/feecc-hid-reader-daemon
---

## Architecture Description

The Feecc platform consists of several services, such as:

### Feecc Analytics

- [feecc-analytics-frontend](https://github.com/Multi-Agent-io/feecc-analytics-frontend)
- [feecc-analytics-backend](https://github.com/Multi-Agent-io/feecc-analytics-backend)

### Feecc Engineer Workbench

- [feecc-workbench-frontend](https://github.com/Multi-Agent-io/feecc-workbench-frontend)
- [feecc-workbench-daemon](https://github.com/Multi-Agent-io/feecc-workbench-daemon)

### Feecc Validator

- [feecc-validator-frontend](https://github.com/Multi-Agent-io/feecc-validator-frontend)
- [feecc-validator-backend](https://github.com/Multi-Agent-io/feecc-validator-backend)

### Feecc other services

- [feecc-ipfs-gateway](https://github.com/Multi-Agent-io/feecc-ipfs-gateway)
- [feecc-print-server](https://github.com/Multi-Agent-io/feecc-print-server)
- [feecc-cameraman](https://github.com/Multi-Agent-io/feecc-cameraman)
- [feecc-hid-reader-daemon](https://github.com/Multi-Agent-io/feecc-hid-reader-daemon)

Each service is responsible for some kind of functionality required for deployment in an enterprise environment.

### Feecc Engineer Workbench

The main task of the Feecc Engineer Workbench is to organize the workspace of the assembly engineer. Depending on the
task the engineer may need the following devices:

- IP or Web camera to organize video recording of the production process.
- RFID reader for identification in the system by personal RFID card.
- Barcode reader for scanning product labels.
- Label printer for labeling the manufactured products.
- Digital sensors collecting data from various devices/stations

Feecc The Engineer's workplace usually consists of the following containers:

- Installation is mandatory on the computer from which the product is assembled:

    - [feecc-workbench-frontend](https://github.com/Multi-Agent-io/feecc-workbench-frontend)
    - [feecc-workbench-daemon](https://github.com/Multi-Agent-io/feecc-workbench-daemon)
    - [feecc-hid-reader-daemon](https://github.com/Multi-Agent-io/feecc-hid-reader-daemon)

- Installation can be carried out both on the computer from which the product is assembled, and on a server or other
  device in the local network:

    - [feecc-ipfs-gateway](https://github.com/Multi-Agent-io/feecc-ipfs-gateway)
    - [feecc-print-server](https://github.com/Multi-Agent-io/feecc-print-server)
    - [feecc-cameraman](https://github.com/Multi-Agent-io/feecc-cameraman)

Figures 1 and 2 show the Feecc Engineer Workplace architecture with decentralized and centralized system organization
topology in a corporate environment.
![architec1](/docs/images/feecc-system-architecture/picture1.png)

<p align="center">
Picture 1 - Feecc Engineer Workbench architecture with decentralized system organization topology in a corporate environment.
</p>

![architec2](/docs/images/feecc-system-architecture/picture2.png)

<p align="center">
Picture 2 - Feecc Engineer Workbench architecture with centralized system organization topology in a corporate environment.
</p>

The choice of topology and the deployment of different combinations depends on a company's existing data network,
installed computers, reliability requirements, centralization or decentralization, and much more. All microservice
applications support the exchange of data over an IP network among themselves.

### Feecc Analytics

The main task of Feecc Analytics is to organize the process of traceability of finished products and their pre-sales
inspection in the product quality control department.

Feecc Analytics depends on the following containers:

- [feecc-analytics-frontend](https://github.com/Multi-Agent-io/feecc-analytics-frontend)
- [feecc-analytics-backend](https://github.com/Multi-Agent-io/feecc-analytics-backend)

And it is usually deployed on a single server with a globally routable IP to access Feecc Analytics from the outside,
but can also be deployed locally.

### Feecc Validator

The main task of the Feecc Validator is to compare data from different data stores in order to validate the integrity of
the digital product certificate.

Feecc Validator depends on the following containers:

- [feecc-validator-frontend](https://github.com/Multi-Agent-io/feecc-validator-frontend)
- [feecc-validator-backend](https://github.com/Multi-Agent-io/feecc-validator-backend)

And it is usually deployed on a single server with a globally routable IP to access the Feecc Validator from the
outside, but can also be deployed locally. 