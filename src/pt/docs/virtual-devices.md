---
title: Dispositivos Virtuais

contributors: [nakata5321]
---

**Este artigo irá mostrar como criar dispositivos virtuais em uma casa inteligente, para que você possa ver como a plataforma real se parece.**

## Instalar integração

Para usar dispositivos virtuais, você precisa instalar a ["demo" integração](https://www.home-assistant.io/integrations/demo/).
Para fazer isso, você deve editar o seu arquivo de configuração.

Vá para a pasta de configuração, que você forneceu durante o processo de configuração. Nesta pasta, você encontrará uma pasta
chamada "homeassistant". Entre nela. Abra o arquivo `configuration.yaml` com um editor de texto sob o usuário **root** e insira a seguinte linha nele:

{% codeHelper { copy: true}%}

```
...
# Exemplo de entrada configuration.yaml
demo:
...
```

{% endcodeHelper %}


Depois disso, reinicie o Home Assistant via interface web. Quando a casa inteligente reiniciar, você poderá encontrar todos os dispositivos virtuais nas entidades "demo".
Encontre-os em `Configurações -> Dispositivos e serviços -> Demo`. Todas essas entidades podem ser adicionadas ao seu painel.

{% roboWikiPicture {src:"docs/home-assistant/demo-entities.png", alt:"demo-entities"} %}{% endroboWikiPicture %}