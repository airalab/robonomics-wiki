---
title: Lightsout Factory
contributors: [ValanisZz, GiggleSeagull, Valiento]
translated: true
---

![Lightsout Factory Preview](../images/lightsout-factory/factory_preview_numbers.jpg)

## Project goal
Provide optimized and fully automated factory manufacturing depending on the specified requirements

##Factory Components:
0.1,0.2 - warehouses
1 (8 pcs) - simple conveyor 
2 (2 pcs) - rotary conveyor
3.1 (4 pcs), 3.2 - receiving and giving conveyors
4.1, 4.2, 4.3, 4.4 -  handlers
4.5 - color recognition block
5.1, 5.2 - loaders

##Description of Lightsout Factory Preview
- Every component moves from right to left 
- Each conveyor has a tactile or light sensor (if the conveyor is initial or final)
- All handlers (4.X) are different

## Requirements:
- FischerTechink factory
- Siemens PLC S7-1200
- 6 additional PLC blocks (SM-1223)
- LattePanda with [Ubuntu 20.04](https://releases.ubuntu.com/20.04/) and [ROS Noetic](http://wiki.ros.org/noetic/Installation) installed
- [modbus](https://github.com/HumaRobotics/modbus)
