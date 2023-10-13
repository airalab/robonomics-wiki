---
title: Actualiza tu Home Assistant OS
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**Este artículo contiene instrucciones para actualizar tu Home Assistant OS existente con la integración de Robonomics.**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## Instalar IPFS Add-on


La integración de Robonomics almacena los datos utilizando un demonio IPFS local, por lo que primero debes instalarlo. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. Existe un [complemento IPFS para Home Assistant](https://github.com/airalab/ipfs-addon). Para instalarlo, ve a `Settings` -> `Add-ons` y presiona el botón `ADD-ON STORE` en la esquina inferior derecha.

2. Presiona en los tres puntos de la esquina superior derecha y elige `Repositories`. Agrega allí el siguiente enlace:

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. Presiona el botón `ADD`.

4. Cierra el administrador de repositorios y actualiza la página. Ahora al final de la página puedes ver el complemento IPFS Daemon.

5. Abre el complemento y presiona ``INSTALL`. Después de la instalación, presiona `START`.

## Instala HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) te permite instalar integraciones personalizadas.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. Antes de comenzar, necesitas instalar un complemento para conectarte al dispositivo de Home Assistant con SSH. En la Tienda de Complementos busca `ssh`. Recomendamos instalar el complemento `SSH & Web Terminal`.

<robo-wiki-note type="warning" title="Warning">

  Si no encuentras el complemento SSH, intenta habilitar el Modo Avanzado en la configuración de tu perfil de usuario. Para hacer esto, haz clic en el icono de perfil en la esquina inferior izquierda y encuentra la opción de Modo Avanzado.

</robo-wiki-note>

2. Elige el complemento y presiona `INSTALL`. Después de que la instalación haya finalizado, ve a la pestaña `Configuración` y agrega una `password` o `authorized_keys`. No olvides guardar esta parte de la configuración.

3. En la pestaña `Info`, presiona `START`. Si deseas ver el complemento en la barra lateral, no olvides habilitar `Show in sidebar`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. Abre el complemento SSH y ejecuta el siguiente comando:

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. Reinicie Home Assistant (puede hacerlo en `Settings`->`System`). 

6. Ahora la Integración HACS estará disponible para agregar en el menú `Integrations`. Ve a Settings`->`Devices & Services`, presiona `Add Integration` y busca HACS.

<robo-wiki-note type="warning" title="Warning">

  Para usar HACS necesitas una cuenta de Github.

</robo-wiki-note>

7. Haz clic en él y sigue las instrucciones de instalación. 

## Instala la Integración de Robonomics

Ahora puedes instalar la Integración de Robonomics usando HACS.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

Abre HACS desde el menú de la barra lateral y navega hasta `Integrations`. Haz clic en `Explore & Download Repositories`, luego busca `Robonomics` y haz clic en el botón `Download` ubicado en la esquina inferior derecha. Una vez que la descarga esté completa, reinicia Home Assistant.