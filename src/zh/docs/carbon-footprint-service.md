---
title: 抵消服务

contributors: [tubleronchik]
---

工作示例在视频中：

https://youtu.be/Ha9wN6bjh64

通过在Statemine网络中燃烧代币来抵消二氧化碳足迹的服务。生成的二氧化碳计算如下：设备中的数据（以瓦特时为单位）乘以取决于地区的系数。消耗1个代币可以抵消1吨二氧化碳。[这里](/docs/carbon-footprint-sensor)是连接设备的说明。

## 场景

1. 在Robonomics网络的数字孪生中注册一个新设备
2. 定期获取所有设备的最新数据，并乘以取决于地区的系数
3. 汇总数据并将其转换为二氧化碳吨数
4. 从当前数据中减去燃烧代币的总数
5. 在Statemine网络中燃烧整数数量的代币
6. 在本地数据库和Datalog中保存燃烧代币的总数

## 安装

克隆存储库并编辑配置文件。

```
gir clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## 配置说明

不要编辑 `config/config_template.yaml`！

```
robonomics:
  seed: <在Robonomics网络中创建数字孪生的帐户种子>
statemine:
  seed: <在Statemine网络中具有绿色代币的管理员帐户种子>
  endpoint: <statemine端点>
  token_id: <将要燃烧的代币的ID>
  ss58_format: <Polkadot中地址的格式（对于Statemine网络为2）>

service:
  interval: <多久收集一次设备数据>
```

非可再生能源的系数来自[Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg)，存储在 `utils/coefficients.py` 中。

## 启动

```
docker-compose up
```