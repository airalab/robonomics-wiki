---
title: Lightsout Factory
locale: 'pt' 
contributors: [ValanisZz, GiggleSeagull, Valiento]
translated: true
---

![Lightsout Factory Preview](../images/lightsout-factory/factory_preview_numbers.jpg)

## Project goal
Provide optimized and fully automated factory manufacturing depending on the specified requirements

## Requirements
- FischerTechink factory
- Siemens PLC S7-1200
- 6 additional PLC blocks (SM-1223)
- LattePanda with [Ubuntu 20.04](https://releases.ubuntu.com/20.04/) and [ROS Noetic](http://wiki.ros.org/noetic/Installation) installed
- [modbus](https://github.com/HumaRobotics/modbus)

## Legend
| Block number |           Description           | Amount, pcs |
|--------------|---------------------------------|-------------|
|     0.x      | Warehouse                       |      2      |
|      1       | Simple conveyor                 |      8      |
|      2       | Rotary conveyor                 |      2      |
|     3.1      | Arrival conveyor                |      4      |
|     3.2      | Departure conveyor              |      1      |
|     4.x      | Handler                         |      4      |
|     5.x      | Loader                          |      2      |
|      6       | Color Recognition Block         |      1      |

## Rules
- Factory movement is organised from right to left side
- Right side stands for 0, left side stands for 1
- All handlers (4.x) are just models of various processing machines
- Each block has a tactile or light sensor (except of warehouse storage positioning)

