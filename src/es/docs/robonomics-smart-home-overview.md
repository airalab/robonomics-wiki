---
title: Visión general de Robonomics Smart Home

contribuyentes: [Fingerling42, nakata5321]
---

## IoT seguro con Blockchain

Para tu hogar inteligente, el mercado moderno de IoT ofrece una amplia gama de soluciones. Pero generalmente estás atado a proveedores de nube centralizados o a costosos gateways propietarios. Como resultado, como usuario siempre dependes del hardware y del proveedor de infraestructura para ejecutar tu sistema inteligente. Al mismo tiempo, tu hogar inteligente no puede ser verdaderamente inteligente sin estadísticas y análisis en la nube.

{% roboWikiVideo {videos:[{src: 'QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type: 'mp4'}, {src: 'QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

**Vemos dos problemas principales con los hogares inteligentes actuales:**

1. No tienes control sobre qué datos compartes con el proveedor o terceros.
2. Tu hogar inteligente es vulnerable a los apagones de los servidores de nube centralizados.

{% roboWikiPicture {src:"docs/home-assistant/ha-problems.png", alt:"imagen"} %}{% endroboWikiPicture %}

Para resolver ambos problemas, te sugerimos probar Robonomics, nuestra nube descentralizada **segura**, **sin servidor** y **futurista**.

{% roboWikiPicture {src:"docs/home-assistant/ha-robonomics.png", alt:"advertencia"} %}{% endroboWikiPicture %}

## Pasos hacia una nube libre de corporaciones

Aquí tienes algunos pasos sencillos para crear un hogar inteligente asequible utilizando Home Assistant como aplicación de comunicación de dispositivos y Robonomics como una plataforma de nube descentralizada libre de corporaciones. Robonomics aprovecha tecnologías Web3 modernas y seguras, garantizando una seguridad mejorada en todo el proceso.

{% roboWikiPicture {src:"docs/home-assistant/OVERVIEW.png", alt:"advertencia"} %}{% endroboWikiPicture %}

## Comienza aquí tu hogar inteligente

Hemos preparado guías detalladas sobre cómo configurar un hogar inteligente en Robonomics. Los pasos pueden variar dependiendo de tu situación específica: si ya tienes un Home Assistant operativo con dispositivos emparejados, o si estás empezando desde cero para establecer tu hogar inteligente.

{% roboWikiGridWrapper {columns: '2', textAlign: center, flexible: true} %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "Para usuarios de Home Assistant", link: "/docs/sub-activate/?topic=Upgrade Home Assistant OS", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "Para nuevos usuarios", link: "/docs/install-smart-home", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}