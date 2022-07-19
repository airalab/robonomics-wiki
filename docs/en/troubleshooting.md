---
title: Troubleshooting
locale: 'en' 
contributors: [nakata5321]
translated: true
---

## Couldn't create HRMP channel

It's not possible to create HRMP channel.
#### Solution
Go to **Settings -> Developer** and put next lines:
```
{
"Address": "MultiAddress",
"LookupSource": "MultiAddress",
"AccountInfo": "AccountInfoWithRefCount"
}
```
Save changes and then reload the page with `ctrl+F5` buttons.

## Couldn't send XCM call with datalogXcm
 If you try to send message between parachains and get error like this:

![error_4lesson][im1]

#### Solution

Go to **Settings -> Developer** and put next lines:
```
{
    "Address": "AccountId",
    "LookupSource": "AccountId",
    "AccountInfo": "AccountInfoWithDualRefCount"
}
```

![XCM][im2]

Save changes and then reload the page with `ctrl+F5` buttons.

## Couldn't send tokens between accounts

After submitting get error:

![transfer][im3]

#### Solution

Go to **Settings -> Developer** and put next lines:
```
{
    "Address": "AccountId",
    "LookupSource": "AccountId",
    "AccountInfo": "AccountInfoWithDualRefCount"
}
```



[im1]: <../images/troubleshooting/lesson4_error.jpg>
[im2]: <../images/troubleshooting/XCM.jpg>
[im3]: <../images/troubleshooting/transfer.jpg>
