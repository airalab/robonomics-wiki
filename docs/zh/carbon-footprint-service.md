---
title: 抵消服务

contributors: [tubleronchik]
---

工作示例在视频中：

https://youtu.be/Ha9wN6bjh64

通过燃烧 Statemine 网络中的代币来抵消二氧化碳足迹的服务。
产生的 CO2 计算如下：设备数据（以 Wh 为单位）乘以系数（取决于区域）。 消耗 1 个代币即可覆盖 1 吨 CO2。 [此处](/docs/carbon-footprint-sensor)是连接设备的说明。

## 设想

1. 在 Robonomics 网络的数字孪生中注册一个新设备
2. 在一个时间间隔内从所有设备获取最后的数据并乘以取决于区域的系数
3. 汇总数据并将其转换为二氧化碳吨
4、当前数据减去销毁代币总数
5. 在 Statemine 网络中销毁整数数量的代币
6. 保存本地DB和Datalog中的销毁代币总数 


## 安装中

克隆存储库并编辑配置文件。

```
git clone https://github.com/tubleronchik/service-robonomics-carbon-footprint.git
cd service-robonomics-carbon-footprint
cp config/config_template.yaml config/config.yaml 
```

## 配置说明

不要编辑 `config/config_template.yaml`！

```
robonomics:
  seed: <seed for account in Robonomics Network w这里 Digital Twin will be created>
statemine:
  seed: <seed for admin account with green tokens in Statemine Netowrk>
  endpoint: <statemine endpoint>
  token_id: <id of the token which will be burned>
  ss58_format: <format of address in Polkadot (for Statemine Network is 2)>

service:
  interval: <how often data from devices will be collected>
```

不可再生能源的系数取自[Eurostat](https://ec.europa.eu/eurostat/statistics-explained/index.php?title=File:Renewable_energy_2020_infographic_18-01-2022.jpg)并存储在 `utils/coefficients.py`。

## 发射

```
docker-compose up
```