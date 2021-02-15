# Install Sensors Connectivity on Your Own Aira

## Prerequirements

You must have an AIRA instance somewhere

## Install the Package

```
git clone https://github.com/airalab/sensors-connectivity
cd sensors-connectivity
nix build -f release.nix
```

From this point you can run the package with the default configuration file or create a systemd service to launch it automatically

### Edit Configuration File

Assuming you are in the package root directory edit the file:
```
cp config/default.json config/my.json
vim config/my.json
```

Extended description of options is located [here](/docs/configuration-options-description)

### Run Manually

From the package directory:

```
source result/setup.zsh
roslaunch sensors_connectivity agent.launch config:=/root/sensors-connectivity/config/my.json
```

### Run via systemd

Add the following to `/etc/nixos/configuration.nix`:

```
systemd.services.connectivity = {
  requires = [ "roscore.service" ];
  after = ["roscore.service" ];
  wantedBy = [ "multi-user.target" ];
  environment.ROS_MASTER_URI =  "http://localhost:11311";
  script = ''
    source /root/sensors-connectivity/result/setup.bash roslaunch sensors_connectivity agent.launch config:=/root/sensors-connectivity/config/my.json
  '';
  serviceConfig = {
    Restart = "on-failure";
    StartLimitInterval = 0;
    RestartSec = 60;
    User = "root";
  };
};
```

Then

```
nixos-rebuild switch
```

Running

```
systemctl start connectivity.service
```

