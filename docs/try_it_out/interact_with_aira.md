# Interact With AIRA

До этого момента вы уже успели поработать отдельно с DApp и прошли установку образа AIRA как виртуальную машину.

В этом разделе мы рассмотрим один из способов установки ПО в аиру и свяжем его с существующим DApp

!!! important

    Вы должны пройти урок установки аиры прежде чем продолжить

!!! tip

    Копировать команды в виртуальную машину аира невозможно, только набирать вручную. Либо можно настроить подключение по ssh

## Package installation

```
git clone https://github.com/vourhey/....
cd <package>
nix build -f release.nix
source result/setup.zsh
rosrun <jsj> hello
```

## DApp 

save your account

go to https://dapp.robonomics.network/#/sensors/airalab/MODEL/ACCOUNT/



