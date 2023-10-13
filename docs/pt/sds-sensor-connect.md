---
title: How to Conect SDS011 Sensor

contributors: [tubleronchik]
---

** Aqui está um guia passo a passo sobre como conectar seu sensor à Rede de Sensores Robonomics. Nossos sensores utilizam o firmware Robonomics, que é uma versão aprimorada do firmware sensor.community. Ele inclui sensores adicionais e possui um mecanismo de envio de dados modificado. **

1. Conecte o sensor na tomada para alimentá-lo.
2. A placa criará uma rede Wi-Fi chamada `RobonomicsSensor-xxxxxxxxx`. Conecte-se a ela pelo seu telefone ou computador: você verá a janela de autorização (se não aparecer, abra o navegador e vá para `192.168.4.1`).
3. Selecione sua rede Wi-Fi na lista (ou escreva manualmente se ela não estiver na lista) e preencha o campo de senha.
<robo-wiki-note type="okay" title="INFO">
O sensor só pode ser conectado a uma rede Wi-Fi de 2,4 GHz.
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. Escreva as coordenadas do local onde o sensor será instalado. Você pode obtê-las de qualquer mapa ou obtê-las a partir do endereço usando [este link.](https://www.latlong.net/convert-address-to-lat-long.html)
<robo-wiki-note type="warning" title="WARNING">
As coordenadas do sensor serão exibidas em um mapa publicamente disponível. Se você não quiser mostrar suas informações privadas, escreva próximo, mas não exato.
</robo-wiki-note> 
5. Clique em `Save configuration and restart`. A placa será reiniciada e conectada à rede Wi-Fi especificada.
6. Abra [Mapa de sensores Robonomics](https://sensors.robonomics.network/#/) e encontre o local onde você instalou o sensor. Em alguns minutos, você poderá ver seu sensor com dados no mapa.
<robo-wiki-picture src="sds-sensor-map.png"/>

