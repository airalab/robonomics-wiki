---
title: Troubleshooting 
locale: 'ja' 
contributors: [LoSk-p]
translated: false
---

### Admin socket already exists 

If you can't run yggdrasil with this error:
```bash
Admin socket /var/run/yggdrasil.sock already exists and is in use by another process
```
Try to remove file yggdrasil.sock and run it again:
```bash
sudo rm /var/run/yggdrasil.sock
```

### Can't get lease

If you can't get lease with this error:
```python
Generic exception during check-in:
No lease for resource "body"
    (resuming check-in)
```
Or this error:
```python
Generic exception during check-in:
bosdyn.api.RetainLeaseResponse (LeaseUseError): 
    (resuming check-in)
```

You need to acquire lease (if you have already done it, try again):
```python
lease = lease_client.acquire()
```
