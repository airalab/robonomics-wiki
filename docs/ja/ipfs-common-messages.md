---
title: IPFS Common Messages 
locale: 'ja' 
contributors: [ensrationis, akru]
translated: false
---

## ipfs_common/Filepath.msg

| Field         | Type                  | Description           |
|------------   |-------------------    |--------------------   |
| filepath      | std_msgs/String       | A path to a file      |

## ipfs_common/Multihash.msg

| Field         | Type              | Description                               |
|-----------    |-----------------  |------------------------------------------ |
| multihash     | std_msgs/String   | A wrapper for model and objective fields  |

## ipfs_common/IpfsDownloadFile.srv

**Request**

| Field         | Type                                                  | Description               |
|-------------- |---------------------------------------------------    |------------------------   |
| ipfs_address  | [ipfs_common/Multihash](#ipfs_commonmultihashmsg)     | IPFS hash of a file       |
| file          | [ipfs_common/Filepath](#ipfs_commonfilepathmsg)       | Where to save the file    |

**Response**

| Field         | Type              | Description           |
|-----------    |-----------------  |---------------------  |
| success       | std_msgs/Bool     | Status of execution   |
| error_msg     | std_msgs/String   | Error message         |

## ipfs_common/IpfsUploadFile.srv

**Request**

| Field     | Type                                              | Description                               |
|-------    |-------------------------------------------------  |---------------------------------------    |
| file      | [ipfs_common/Filepath](#ipfs_commonfilepathmsg)   | Path to a file to be uploaded to IPFS     |

**Response**

| Field         | Type                                                  | Description                   |
|-------------- |---------------------------------------------------    |----------------------------   |
| success       | std_msgs/Bool                                         | Status of execution           |
| error_msg     | std_msgs/String                                       | Error message                 |
| ipfs_address  | [ipfs_common/Multihash](#ipfs_commonmultihashmsg)     | IPFS hash of uploaded file    |
